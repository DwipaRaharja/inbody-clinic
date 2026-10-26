// Deterministic unit test for the reveal controllers (npm run
// test:home-reveal — no browser, CDN or Playwright). Fake window,
// fake GSAP, IntersectionObserver, matchMedia and timers make every controller
// decision directly assertable: initial hiding, group stagger, focus reveal,
// scroll restoration, reduced motion and cleanup.
import assert from 'node:assert/strict';
import { initHomeReveal } from '../../js/features/home-reveal.js';
import { initContentReveal } from '../../js/features/content-reveal.js';

// Exercise lifecycle behavior without a browser or CDN dependency. Tiny
// add/remove/emit registry shared by fake root, elements and matchMedia.
class Events {
  listeners = new Map();
  addEventListener(name, callback) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(callback);
  }
  removeEventListener(name, callback) { this.listeners.get(name)?.delete(callback); }
  emit(name, event = {}) { [...this.listeners.get(name) ?? []].forEach(callback => callback(event)); }
}

// Minimal element: rects, children, dataset and querySelector cover every DOM
// read the controllers perform.
class Element extends Events {
  dataset = {};
  properties = {};
  selectors = new Map();
  constructor(top, children = []) { super(); this.top = top; this.children = children; }
  get firstElementChild() { return this.children[0]; }
  getBoundingClientRect() { return { top: this.top, bottom: this.top + 200 }; }
  querySelector(selector) { return this.selectors.get(selector) ?? null; }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [
      ...(selector === '[data-content-reveal]' && child.dataset.contentReveal ? [child] : []),
      ...child.querySelectorAll(selector),
    ]);
  }
  contains(target) { return this === target || this.children.some(child => child.contains(target)); }
}

// Builds a Home-like tree: hero (the data-hero-slider query), a services
// frame with a heading and a list of six cards at growing scroll offsets,
// plus fake GSAP/timers/observers. GSAP is available synchronously in the app;
// this fixture supplies a fake instance, and `reduced` toggles matchMedia.
function fixture({ reduced = false } = {}) {
  const hero = new Element(100);
  const heading = new Element(900);
  const cards = Array.from({ length: 6 }, (_, index) => new Element(1100 + index * 220));
  const list = new Element(1100, cards);
  const services = new Element(900, [heading, list]);
  services.selectors.set('ul', list);
  const root = new Element(0, [hero, services]);
  root.selectors.set('[data-hero-slider]', hero);
  root.selectors.set('[data-section-frame="services"]', services);
  const media = new Events();
  media.matches = reduced;
  const observers = [];
  const animations = [];
  const saved = new Map();
  let contexts = 0;
  const clear = element => { element.properties = {}; };
  const gsap = {
    context(callback) {
      contexts++;
      callback();
      return { add: callback => callback(), revert: () => saved.forEach((properties, element) => { element.properties = { ...properties }; }) };
    },
    set(element, values) {
      if (!saved.has(element)) saved.set(element, { ...element.properties });
      if (values.clearProps) clear(element);
      else Object.assign(element.properties, values);
    },
    to(elements, values) {
      animations.push({ elements, values });
      elements.forEach(clear);
      values.onComplete();
    },
    fromTo(elements, fromValues, values) {
      // Mirror the real method: apply the explicit start frame, then animate.
      elements.forEach(element => this.set(element, fromValues));
      this.to(elements, values);
    },
    killTweensOf() {},
  };
  globalThis.window = {
    innerHeight: 720,
    matchMedia: () => media,
    IntersectionObserver: class {
      observed = new Set();
      disconnected = false;
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe(element) { this.observed.add(element); }
      unobserve(element) { this.observed.delete(element); }
      disconnect() { this.disconnected = true; this.observed.clear(); }
      enter(elements) { this.callback(elements.map(target => ({ target, isIntersecting: true }))); }
    },
    gsap,
  };
  return { root, hero, heading, cards, media, observers, gsap, animations, contexts: () => contexts };
}

// Scenario 1, happy path: initial hide (hero fades, cards rise), group
// stagger, no replay on re-entry, focus reveals instantly, and a switch to
// reduced motion tears everything down with a full GSAP revert.
const active = fixture();
const destroyActive = initHomeReveal(active.root);
const observer = active.observers[0];
assert.equal(active.hero.properties.opacity, 0);
assert.equal(active.cards[0].properties.y, 16);
observer.enter([active.hero]);
observer.enter(active.cards.slice(0, 3));
assert.equal(active.animations.at(-1).elements.length, 3, 'Cards entering together reveal as one staggered group');
assert.equal(active.animations.at(-1).values.stagger, 0.12);
const animationCount = active.animations.length;
observer.enter(active.cards.slice(0, 3));
assert.equal(active.animations.length, animationCount, 'Scrolling back must not replay revealed content');
assert.equal(active.cards[3].dataset.contentRevealState, 'pending');
active.root.emit('focusin', { target: active.cards[3] });
assert.deepEqual(active.cards[3].properties, {}, 'Keyboard focus immediately reveals its target');
assert.equal(active.cards[3].dataset.contentRevealState, 'visible');
active.media.matches = true;
active.media.emit('change');
assert.equal(observer.disconnected, true);
for (const element of [active.hero, active.heading, ...active.cards]) {
  assert.deepEqual(element.properties, {}, 'Changing to reduced motion must restore visible content');
  assert.equal(element.dataset.contentRevealState, undefined);
}
observer.enter(active.cards);
assert.equal(active.animations.length, animationCount, 'Callbacks after cleanup must not animate detached content');
destroyActive();

// Scenario 2, scroll restoration: Back left the hero above the fold, so
// setup must still enrol it; the observer then reveals it in place.
const restored = fixture();
restored.hero.top = -1000;
const destroyRestored = initHomeReveal(restored.root);
assert.equal(restored.hero.properties.opacity, 0, 'Setup must include content above the previous route scroll position');
restored.hero.top = 100;
restored.observers[0].enter([restored.hero]);
assert.equal(restored.hero.dataset.contentRevealState, 'visible', 'The observer reveals the opening content after route scroll restoration');
destroyRestored();

// Scenario 3, reduced motion at mount: no observers, no GSAP context.
const reduced = fixture({ reduced: true });
initHomeReveal(reduced.root)();
assert.equal(reduced.contexts(), 0);
assert.equal(reduced.observers.length, 0);

// Scenario 4, other pages: without the hero slider the Home group list is
// empty and no controller is installed.
const otherPage = fixture();
otherPage.root.selectors.delete('[data-hero-slider]');
initHomeReveal(otherPage.root)();
assert.equal(otherPage.contexts(), 0, 'Pages other than Home must not be animated');

// Clinic and Contact opt in through markup and share Home's lifecycle safeguards.
for (const page of ['clinic', 'contact']) {
  const marked = fixture();
  marked.root.selectors.delete('[data-hero-slider]');
  marked.heading.dataset.contentReveal = 'rise';
  marked.cards.forEach(card => {
    card.dataset.contentReveal = page === 'clinic' ? 'fade' : 'rise';
    card.dataset.contentRevealGroup = page === 'clinic' ? 'clinic-photos' : 'contact-fields';
  });
  const destroy = initContentReveal(marked.root);
  const markedObserver = marked.observers[0];
  assert.equal(marked.heading.properties.y, 16);
  assert.equal(marked.cards[0].properties.y, page === 'clinic' ? undefined : 16);
  markedObserver.enter(marked.cards.slice(0, 3));
  assert.equal(marked.animations.at(-1).elements.length, 3, `${page}: marked siblings share a staggered reveal`);
  marked.root.emit('focusin', { target: marked.cards[5] });
  assert.deepEqual(marked.cards[5].properties, {}, `${page}: focused controls are immediately readable`);
  destroy();
  assert.equal(markedObserver.disconnected, true);
  for (const element of [marked.heading, ...marked.cards]) {
    assert.deepEqual(element.properties, {});
    assert.equal(element.dataset.contentRevealState, undefined);
    assert.ok(element.dataset.contentReveal, 'Cleanup preserves declarative reveal markers');
  }
}

// Scenario 5, declarative opt-in without markers: a page that never marks
// data-content-reveal stays inert even though the helper exists.
const unmarked = fixture();
initContentReveal(unmarked.root)();
assert.equal(unmarked.contexts(), 0, 'Unmarked pages do not initialize the shared controller');
// Restore the host globals touched by the fixture.
delete globalThis.window;
console.log('Passed: Home, Clinic and Contact reveal groups, stagger, once per visit, focus, cleanup and reduced motion with local GSAP.');

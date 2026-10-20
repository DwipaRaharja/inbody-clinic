const controllers = new WeakMap();

function markedGroups(root) {
  const groups = new Map();
  for (const element of root.querySelectorAll('[data-content-reveal]')) {
    const fade = element.dataset.contentReveal === 'fade';
    const name = element.dataset.contentRevealGroup;
    const key = name ? `${name}:${fade}` : element;
    if (!groups.has(key)) groups.set(key, { targets: [], fade });
    groups.get(key).targets.push(element);
  }
  return [...groups.values()];
}

// Only pages that explicitly initialize this controller receive reveal animations.
export function initContentReveal(root, groups) {
  if (!root || !('IntersectionObserver' in window)) return () => {};
  if (controllers.has(root)) return controllers.get(root);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return () => {};

  const script = document.getElementById('gsap-cdn');
  groups ??= markedGroups(root);
  if (!groups.length) return () => {};
  const targets = groups.flatMap(group => group.targets);
  const pending = new Set();
  let context;
  let observer;
  let timeout;
  let stopped = false;

  function stopWaiting() {
    window.clearTimeout(timeout);
    script?.removeEventListener('load', startLate);
    script?.removeEventListener('error', stopWaiting);
  }

  function reveal(elements) {
    if (stopped || !context) return;
    const entering = new Set(elements.filter(element => pending.has(element)));
    for (const element of entering) {
      pending.delete(element);
      observer.unobserve(element);
      element.dataset.contentRevealState = 'revealing';
    }
    for (const group of groups) {
      const batch = group.targets.filter(element => entering.has(element));
      if (!batch.length) continue;
      context.add(() => window.gsap.to(batch, {
        opacity: 1,
        ...(group.fade ? {} : { y: 0 }),
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.12,
        clearProps: group.fade ? 'opacity' : 'opacity,transform',
        onComplete: () => {
          if (!stopped) batch.forEach(element => { element.dataset.contentRevealState = 'visible'; });
        },
      }));
    }
  }

  function start(late = false) {
    stopWaiting();
    const gsap = window.gsap;
    if (stopped || context || motion.matches || !gsap?.context) return;
    observer = new window.IntersectionObserver(entries => {
      reveal(entries.filter(entry => entry.isIntersecting).map(entry => entry.target));
    }, { threshold: 0.15 });

    context = gsap.context(() => {
      for (const group of groups) {
        for (const element of group.targets) {
          const rect = element.getBoundingClientRect();
          // Do not hide content already read while waiting for the optional CDN.
          // Route scroll restoration runs after setup, before the observer fires.
          if (late && rect.top < window.innerHeight) continue;
          pending.add(element);
          element.dataset.contentRevealState = 'pending';
          gsap.set(element, { opacity: 0, ...(group.fade ? {} : { y: 16 }) });
          observer.observe(element);
        }
      }
    }, root);
  }

  function startLate() { start(true); }

  function showInteractedContent(event) {
    if (!context || stopped) return;
    for (const element of targets) {
      if (!['pending', 'revealing'].includes(element.dataset.contentRevealState) || !element.contains(event.target)) continue;
      pending.delete(element);
      observer.unobserve(element);
      window.gsap.killTweensOf(element);
      context.add(() => window.gsap.set(element, { clearProps: 'opacity,transform' }));
      element.dataset.contentRevealState = 'visible';
    }
  }

  function destroy() {
    if (stopped) return;
    stopped = true;
    stopWaiting();
    observer?.disconnect();
    context?.revert();
    targets.forEach(element => { delete element.dataset.contentRevealState; });
    pending.clear();
    root.removeEventListener('focusin', showInteractedContent);
    root.removeEventListener('pointerdown', showInteractedContent, true);
    motion.removeEventListener('change', onMotionChange);
    controllers.delete(root);
  }

  function onMotionChange() { if (motion.matches) destroy(); }
  root.addEventListener('focusin', showInteractedContent);
  root.addEventListener('pointerdown', showInteractedContent, true);
  motion.addEventListener('change', onMotionChange);
  controllers.set(root, destroy);

  if (window.gsap) start();
  else if (script) {
    script.addEventListener('load', startLate, { once: true });
    script.addEventListener('error', stopWaiting, { once: true });
    timeout = window.setTimeout(stopWaiting, 1000);
  }
  return destroy;
}

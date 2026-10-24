// Playwright suite for the home header entrance (npm run test:header). It uses
// the GSAP bundle produced by Vite, then checks normal playback, reduced motion,
// SPA/reload rules and an open mobile menu mid-entrance.
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { preview } from 'vite';

const modulePath = process.env.PLAYWRIGHT_MODULE_PATH;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const html = await readFile(new URL('../../dist/index.html', import.meta.url), 'utf8');
assert.equal(/gsap-cdn|cdn\.jsdelivr\.net\/npm\/gsap/u.test(html), false, 'Built HTML must not load GSAP from a CDN');

let server;
let browser;
const errors = [];
try {
  // Vite preview serves dist/ on a random local port; the browser loads the
  // bundled GSAP chunk from this same local server.
  server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
  const base = html.match(/name="app-base" content="([^"]+)"/u)[1];
  const homeUrl = `http://127.0.0.1:${server.httpServer.address().port}${base}`;
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });

  // Keep external fonts deterministic; the animation library itself is local.
  async function context({ reducedMotion = 'no-preference' } = {}) {
    const result = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion });
    await result.route('https://**/*', async route => {
      return route.fulfill({ body: '', contentType: route.request().url().includes('fonts.googleapis.com') ? 'text/css' : 'text/html' });
    });
    result.on('page', page => page.on('pageerror', error => errors.push(error.message)));
    return result;
  }

  async function ready(page) {
    await page.waitForSelector('#app[data-hydrated="true"]');
  }

  // Reads the current animation state: background scaleY, label opacities and
  // transforms, plus inline styles proving logo/heading stay untouched.
  async function appearance(page) {
    return page.evaluate(() => {
      const background = document.querySelector('[data-contact-background]');
      const contacts = [...document.querySelectorAll('[data-contact-item]')].filter(item => item.getClientRects().length);
      const menus = [...document.querySelectorAll('[data-nav-intro]')].filter(item => item.getClientRects().length);
      const logo = document.querySelector('#navbar img');
      return {
        scaleY: window.gsap ? Number(window.gsap.getProperty(background, 'scaleY')) : 1,
        contacts: contacts.map(item => Number(getComputedStyle(item).opacity)),
        menus: menus.map(item => Number(getComputedStyle(item).opacity)),
        menuTransforms: menus.map(item => getComputedStyle(item).transform),
        logoOpacity: Number(getComputedStyle(logo).opacity),
        logoStyles: [logo, logo.parentElement, logo.closest('nav'), logo.closest('header')].map(item => item.getAttribute('style')),
        headingStyle: document.querySelector('h1').getAttribute('style'),
      };
    });
  }

  // Scenario 1, normal motion: freeze the timeline to assert exact order —
  // background reveals first, labels wait, logo/heading static — then labels
  // fade in place (no transforms), finish fully visible, do not replay during
  // SPA navigation but may once again after a reload.
  const motion = await context();
  const page = await motion.newPage();
  await page.goto(homeUrl);
  await ready(page);
  assert.equal(await page.evaluate(() => Boolean(window.gsap.getById('header-entrance'))), true, 'Entrance must start on the first open');
  // Freeze early in the timeline: background mid-reveal, labels still hidden.
  await page.evaluate(() => { window.gsap.getById('header-entrance').pause(0.21); });
  const backgroundFrame = await appearance(page);
  assert.ok(backgroundFrame.scaleY > 0 && backgroundFrame.scaleY < 1, 'Contact background must reveal first');
  assert.ok(backgroundFrame.contacts.every(value => value === 0), 'Contact labels must wait for the background');
  assert.ok(backgroundFrame.menus.every(value => value === 0), 'Menu labels must wait for the background');
  assert.equal(backgroundFrame.logoOpacity, 1);
  assert.ok(backgroundFrame.logoStyles.every(style => style === null), 'Logo and its containers must stay static');
  assert.equal(backgroundFrame.headingStyle, null, 'Page heading is outside this animation');

  // Freeze mid-timeline: labels fade while the background is already done.
  await page.evaluate(() => { window.gsap.getById('header-entrance').seek(0.64); });
  const textFrame = await appearance(page);
  assert.equal(textFrame.scaleY, 1);
  assert.ok(textFrame.contacts.some(value => value > 0 && value < 1), 'Contact labels must fade in');
  assert.ok(textFrame.menus.some(value => value > 0 && value < 1), 'Navigation labels must fade in');
  assert.ok(textFrame.menuTransforms.every(value => value === 'none'), 'Menu labels must not move');
  // Optional capture for manual design review.
  if (process.env.NAVIGATION_SCREENSHOT_DIR) {
    await mkdir(process.env.NAVIGATION_SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({ path: join(process.env.NAVIGATION_SCREENSHOT_DIR, 'header-intro-fade.png') });
  }
  // Let the timeline finish: every label must end fully opaque.
  await page.evaluate(() => {
    const timeline = window.gsap.getById('header-entrance');
    timeline.seek(timeline.totalDuration());
    window.testHeader = document.getElementById('navbar');
  });
  const complete = await appearance(page);
  assert.ok([...complete.contacts, ...complete.menus].every(value => value === 1));
  // SPA navigation keeps the same header node and leaves no stray tweens —
  // the entrance never replays inside one document.
  await page.locator('#navbar [data-nav-page="about"]').click();
  await page.waitForFunction(() => document.body.dataset.page === 'about');
  assert.equal(await page.evaluate(() => window.testHeader === document.getElementById('navbar')
    && window.gsap.getTweensOf(document.querySelectorAll('[data-contact-item], [data-nav-intro], [data-contact-background]')).length === 0), true, 'SPA navigation must not replay the header entrance');
  // A reload creates a new document, so the entrance may play once again.
  await page.reload();
  await ready(page);
  assert.equal(await page.evaluate(() => Boolean(window.gsap.getById('header-entrance'))), true, 'A new document may play the entrance again');
  // Switching to reduced motion mid-session must restore all labels at once.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => [...document.querySelectorAll('[data-contact-item], [data-nav-intro]')]
    .filter(item => item.getClientRects().length)
    .every(item => getComputedStyle(item).opacity === '1'));
  const interrupted = await appearance(page);
  assert.ok([...interrupted.contacts, ...interrupted.menus].every(value => value === 1), 'Enabling reduced motion restores readable content immediately');
  await motion.close();

  // Scenario 2, reduced motion: content stays readable and no entrance
  // animation is registered, though the local GSAP module is available.
  for (const options of [{ reducedMotion: 'reduce' }]) {
    const fallback = await context(options);
    const fallbackPage = await fallback.newPage();
    await fallbackPage.goto(homeUrl);
    await ready(fallbackPage);
    const state = await appearance(fallbackPage);
    assert.equal(state.scaleY, 1);
    assert.ok([...state.contacts, ...state.menus].every(value => value === 1), 'Fallback header must remain visible');
    assert.equal(await fallbackPage.evaluate(() => Boolean(window.gsap?.getById('header-entrance'))), false);
    await fallback.close();
  }

  // Scenario 3, mid-entrance interaction: opening the mobile menu must not
  // leave its labels invisible once expanded.
  const mobile = await context();
  const mobilePage = await mobile.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto(homeUrl);
  await ready(mobilePage);
  await mobilePage.locator('[data-nav-toggle]').click();
  assert.equal(await mobilePage.locator('[data-nav-toggle]').getAttribute('aria-expanded'), 'true');
  assert.equal(await mobilePage.locator('#navbar [data-nav-page="contact"]').evaluate(element => getComputedStyle(element).opacity), '1', 'Opening mobile navigation during the entrance must show its labels');
  await mobile.close();
  assert.deepEqual(errors, []);
  console.log(`Passed: local GSAP header entrance, background then label fade, static logo/page heading, once per document, mobile interaction and reduced motion at ${base}.`);
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.httpServer.close(resolve));
}

import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { routes } from '../src/routes.js';

// Use a local Playwright installation, or the desktop app's bundled package.
const playwrightModule = process.env.PLAYWRIGHT_MODULE_PATH;
const { chromium } = await import(playwrightModule ? pathToFileURL(playwrightModule).href : 'playwright');
const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const outputRoot = join(projectRoot, 'dist');
const homeHtml = await readFile(join(outputRoot, 'index.html'), 'utf8');
const base = homeHtml.match(/<meta\s+name="app-base"\s+content="([^"]+)"/u)?.[1];
assert.ok(base?.startsWith('/') && base.endsWith('/'), 'Run npm run build before browser tests');
if (process.env.TEST_BASE_PATH) assert.equal(base, process.env.TEST_BASE_PATH, 'Build base differs from TEST_BASE_PATH');
const mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const missingResources = [];
const errors = [];
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  let pathname;
  try {
    if (!url.pathname.startsWith(base)) throw new Error('Outside app base');
    pathname = decodeURIComponent(url.pathname.slice(base.length));
    if (!pathname || pathname.endsWith('/')) pathname += 'index.html';
    const filename = resolve(outputRoot, pathname);
    if (!filename.startsWith(outputRoot + sep)) throw new Error('Outside output directory');
    const content = await readFile(filename);
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(filename)] ?? 'application/octet-stream' });
    response.end(content);
  } catch {
    if (!url.pathname.endsWith('/favicon.ico')) missingResources.push(url.pathname);
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const destinationUrl = path => origin + base + (path === '/' ? '' : path.slice(1));
const pageData = route => ({ page: route.pageId, service: route.serviceId ?? null, speciality: route.specialityId ?? null });
let browser;

async function waitForPage(page, expected) {
  try {
    await page.waitForFunction((data) => document.querySelector('#app[data-hydrated="true"]')
      && Object.entries(data).every(([key, value]) => value === null ? document.body.dataset[key] === undefined : document.body.dataset[key] === value)
      && document.querySelector('#main-content')?.children.length > 0
      && document.querySelector('#main-content[aria-busy="true"]') === null, expected);
  } catch (error) {
    const state = await page.evaluate(() => ({ url: location.href, body: { ...document.body.dataset }, hydrated: document.querySelector('#app')?.dataset.hydrated, contentChildren: document.querySelector('#main-content')?.children.length }));
    throw new Error(`Page did not become ready: ${JSON.stringify({ expected, state, errors })}`, { cause: error });
  }
}

async function clickRoute(page, href, expected) {
  await page.evaluate((destination) => {
    const link = document.createElement('a');
    link.href = destination;
    document.body.append(link);
    link.click();
    link.remove();
  }, href);
  await waitForPage(page, expected);
}

async function assertShell(page) {
  assert.equal(await page.evaluate(() => window.testShell.every((node) => node.isConnected)
    && window.testShell[0] === document.querySelector('#navbar')
    && window.testShell[1] === document.querySelector('#footer')
    && window.testShell[2] === document.querySelector('#main-content')
    && document.querySelectorAll('#navbar').length === 1
    && document.querySelectorAll('#footer').length === 1
    && !window.testEmptyMain), true, 'Navigation must preserve layout nodes and populated content');
}

async function configureContext(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', ...options });
  // Make font/icon/map requests independent of third-party network availability.
  await context.route('https://**/*', async (route) => {
    const url = new URL(route.request().url());
    const iconPath = '/npm/@phosphor-icons/web@2.1.2/';
    if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.endsWith('/gsap.min.js')) {
      // Navigation also works when the optional animation CDN is unavailable.
      await route.abort();
    } else if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.startsWith(iconPath)) {
      const filename = join(projectRoot, 'node_modules/@phosphor-icons/web', url.pathname.slice(iconPath.length));
      await route.fulfill({ body: await readFile(filename), contentType: mimeTypes[extname(filename)] ?? 'application/octet-stream' });
    } else {
      await route.fulfill({ body: '', contentType: url.hostname === 'fonts.googleapis.com' ? 'text/css' : 'text/html' });
    }
  });
  context.on('page', page => {
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && /hydration|hydrated|Minified React error|An error occurred/iu.test(message.text())) errors.push(message.text());
    });
  });
  return context;
}

try {
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
  const context = await configureContext();
  const page = await context.newPage();
  let documentRequests = 0;
  page.on('request', request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentRequests += 1; });
  await page.goto(destinationUrl('/'));
  await waitForPage(page, { page: 'home' });
  await page.evaluate(() => {
    window.testShell = ['navbar', 'footer', 'main-content'].map(id => document.getElementById(id));
    window.testEmptyMain = false;
    new MutationObserver(() => {
      if (!document.querySelector('#main-content')?.children.length) window.testEmptyMain = true;
    }).observe(document.getElementById('app'), { childList: true, subtree: true });
    window.testOldHero = document.querySelector('[data-hero-slider]');
  });

  await page.locator('#navbar [data-nav-page="about"]').click();
  await waitForPage(page, { page: 'about' });
  await assertShell(page);
  assert.equal(await page.locator('#navbar [data-nav-page="about"]').getAttribute('aria-current'), 'page');
  assert.match(await page.title(), /Meet Our Team/);
  assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /people at InBody/);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');

  // Detached feature roots must lose their listeners when React unmounts a page.
  assert.equal(await page.evaluate(() => {
    const before = window.testOldHero.dataset.activeIndex;
    const control = document.createElement('button');
    control.dataset.heroGoTo = '1';
    window.testOldHero.append(control);
    control.click();
    return window.testOldHero.dataset.activeIndex === before;
  }), true, 'Old hero controller must be cleaned up');

  // React routing does not fetch destination HTML; quick clicks must settle on the last route.
  await page.evaluate(() => {
    document.querySelector('#footer [data-nav-page="method"]').click();
    document.querySelector('#navbar [data-nav-page="contact"]').click();
  });
  await waitForPage(page, { page: 'contact' });
  assert.equal(new URL(page.url()).pathname, base + 'pages/contact.html');
  await assertShell(page);

  await page.locator('#contact-form [name="name"]').fill('Rama123');
  assert.equal(await page.locator('#contact-form [name="name"]').inputValue(), 'Rama');
  await page.evaluate(() => { window.testOldName = document.querySelector('#contact-form [name="name"]'); });
  await page.locator('#navbar [data-nav-page="clinic"]').click();
  await waitForPage(page, { page: 'clinic' });
  assert.equal(await page.evaluate(() => {
    window.testOldName.value = 'Test123';
    window.testOldName.dispatchEvent(new Event('input'));
    return window.testOldName.value;
  }), 'Test123', 'Old contact controller must be cleaned up');

  await page.locator('[data-gallery-filter]:not([data-gallery-filter="all"])').first().click();
  assert.ok(await page.locator('[data-gallery-card][hidden]').count() > 0);
  await page.locator('[data-gallery-card]:not([hidden]) [data-gallery-open]').first().click();
  assert.equal(await page.locator('[data-gallery-dialog]').evaluate(dialog => dialog.open), true);
  await page.evaluate(() => { window.testOldDialog = document.querySelector('[data-gallery-dialog]'); history.back(); });
  await waitForPage(page, { page: 'contact' });
  assert.equal(await page.evaluate(() => !window.testOldDialog.open && document.body.style.overflow !== 'hidden'), true);
  await page.evaluate(() => history.forward());
  await waitForPage(page, { page: 'clinic' });

  // History restores scroll; fresh navigation starts at the top.
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await page.waitForFunction(() => window.scrollY === 600);
  await page.locator('#navbar [data-nav-page="about"]').evaluate(link => link.click());
  await waitForPage(page, { page: 'about' });
  await page.waitForFunction(() => window.scrollY === 0);
  await page.evaluate(() => history.back());
  await waitForPage(page, { page: 'clinic' });
  await page.waitForFunction(() => Math.abs(window.scrollY - 600) < 2);

  await page.locator('#footer [data-nav-page="services"]').evaluate(link => link.click());
  await waitForPage(page, { page: 'home' });
  await page.waitForFunction(() => Math.abs(document.getElementById('services').getBoundingClientRect().top - 76) < 10);
  assert.equal(new URL(page.url()).hash, '#services');
  await clickRoute(page, '#main-content', { page: 'home' });
  assert.equal(new URL(page.url()).hash, '#main-content');
  await page.evaluate(() => history.back());
  await page.waitForFunction(() => location.hash === '#services');

  // Exercise all public routes in the same document, including service/speciality changes.
  for (const route of routes) {
    await clickRoute(page, destinationUrl(route.path), pageData(route));
    assert.equal(new URL(page.url()).pathname, new URL(destinationUrl(route.path)).pathname);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.title(), route.title);
    assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), route.description);
    await assertShell(page);
    assert.equal(await page.locator('#navbar').evaluate((navbar, prefix) => [...navbar.querySelectorAll('a[href^="/"]')].every(link => new URL(link.href).pathname.startsWith(prefix)), base), true);
    if (route.specialityId) assert.equal(await page.locator(`[data-nav-speciality="${route.specialityId}"]`).getAttribute('aria-current'), 'page');
  }
  assert.equal(documentRequests, 1, 'Internal navigation must not reload the document');

  // Modifier clicks, new tabs, downloads and external URLs retain browser behavior.
  assert.equal(await page.evaluate((prefix) => {
    const cases = [
      { href: prefix + 'pages/about.html', ctrlKey: true },
      { href: prefix + 'pages/about.html', metaKey: true },
      { href: prefix + 'pages/about.html', shiftKey: true },
      { href: prefix + 'pages/about.html', target: '_blank' },
      { href: prefix + 'pages/about.html', download: true },
      { href: prefix + 'pages/about.html', fullReload: true },
      { href: 'mailto:hello@example.com' },
      { href: 'tel:+123456789' },
      { href: 'https://example.com/' },
    ];
    return cases.every(({ href, target, download, fullReload, ...options }) => {
      const anchor = document.createElement('a');
      anchor.href = href;
      if (target) anchor.target = target;
      if (download) anchor.download = '';
      if (fullReload) anchor.dataset.fullReload = '';
      document.body.append(anchor);
      let intercepted;
      document.addEventListener('click', event => { intercepted = event.defaultPrevented; event.preventDefault(); }, { once: true });
      anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...options }));
      anchor.remove();
      return intercepted === false;
    });
  }, base), true);

  // A plain file server serves deep routes and refreshes; no SPA rewrite is supplied.
  const deepRoute = routes.find(route => route.serviceId === 'post-surgical-recovery');
  await page.goto(destinationUrl(deepRoute.path));
  await waitForPage(page, pageData(deepRoute));
  await page.reload();
  await waitForPage(page, pageData(deepRoute));
  assert.equal(await page.locator('link[rel="stylesheet"][href$=".css"]').count() >= 1, true);
  await page.locator('#navbar [data-nav-page="about"]').click();
  await waitForPage(page, { page: 'about' });
  assert.equal(await page.locator('#navbar img').evaluate(img => new URL(img.src).pathname), base + 'assets/logo/logo.png');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-nav-toggle]').click();
  assert.equal(await page.locator('[data-nav-toggle]').getAttribute('aria-expanded'), 'true');
  await page.locator('#navbar [data-nav-page="contact"]').click();
  await waitForPage(page, { page: 'contact' });
  assert.equal(await page.locator('[data-nav-toggle]').getAttribute('aria-expanded'), 'false');
  await page.locator('[data-nav-toggle]').click();
  await page.locator('[data-services-toggle]').click();
  const bookingLink = page.locator('[data-nav-speciality]').first();
  const bookingUrl = await bookingLink.getAttribute('href');
  assert.equal(new URL(bookingUrl).hostname, 'www.fresha.com', 'Dropdown must open external booking');
  await bookingLink.click();
  await page.waitForURL(bookingUrl);
  await page.goBack();
  await waitForPage(page, { page: 'contact' });
  assert.equal(await page.locator('[data-services-toggle]').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  if (process.env.NAVIGATION_SCREENSHOT_DIR) {
    await mkdir(process.env.NAVIGATION_SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({ path: join(process.env.NAVIGATION_SCREENSHOT_DIR, base === '/' ? 'navigation-root-mobile.png' : 'navigation-subfolder-mobile.png') });
  }
  await page.close();
  await context.close();

  // Prerendered content remains available before React, and with JavaScript disabled.
  const staticContext = await configureContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  for (const route of routes) {
    const response = await staticPage.goto(destinationUrl(route.path), { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200, `${route.path}: static HTML must exist`);
    assert.equal(await staticPage.locator('h1').count(), 1, `${route.path}: H1 must be prerendered`);
    assert.equal(await staticPage.locator('h1').isVisible(), true, `${route.path}: H1 must be visible without JavaScript`);
    assert.ok((await staticPage.locator('#main-content').innerText()).trim().length > 100, `${route.path}: missing static content`);
    assert.equal(await staticPage.title(), route.title);
    assert.equal(await staticPage.locator('#navbar').count(), 1);
    assert.equal(await staticPage.locator('#footer').count(), 1);
    assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${route.path}: desktop overflow`);
  }
  await staticContext.close();

  assert.deepEqual(errors, [], 'Browser JavaScript or hydration errors');
  assert.deepEqual(missingResources, [], 'Missing built local assets');
  console.log(`Passed: ${base} — ${routes.length} React routes, hydration, persistent layout, metadata, feature cleanup, scroll/history, anchors, deep links, refresh, native links, mobile menu and JavaScript-disabled content.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

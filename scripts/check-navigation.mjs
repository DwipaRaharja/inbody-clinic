import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Use a local Playwright installation, or the desktop app's bundled package.
const playwrightModule = process.env.PLAYWRIGHT_MODULE_PATH;
const { chromium } = await import(playwrightModule ? pathToFileURL(playwrightModule).href : 'playwright');
const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const subfolder = '/preview/inbody';
const missingResources = [];
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  let path = decodeURIComponent(url.pathname);
  if (path.startsWith(subfolder + '/')) path = path.slice(subfolder.length);
  if (path.endsWith('/')) path += 'index.html';
  const filename = resolve(projectRoot, '.' + path);
  try {
    if (!filename.startsWith(projectRoot + sep)) throw new Error('Outside project');
    const content = await readFile(filename);
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(filename)] ?? 'application/octet-stream' });
    response.end(content);
  } catch {
    if (!path.endsWith('/favicon.ico')) missingResources.push(url.pathname);
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;

async function htmlFiles(directory, prefix = '') {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) result.push(...await htmlFiles(join(directory, entry.name), name + '/'));
    else if (name.endsWith('.html')) result.push(name);
  }
  return result;
}

async function waitForPage(page, expected) {
  await page.waitForFunction((data) => Object.entries(data).every(([key, value]) => document.body.dataset[key] === value)
    && document.querySelector('#main-content')?.children.length > 0
    && document.querySelector('#main-content[aria-busy="true"]') === null, expected);
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
    && !window.testEmptyMain), true, 'Navigation must preserve layout nodes and populated content');
}

try {
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  // Keep tests independent of third-party network availability.
  await context.route('https://**/*', async (route) => {
    const url = new URL(route.request().url());
    const iconPath = '/npm/@phosphor-icons/web@2.1.2/';
    if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.startsWith(iconPath)) {
      const filename = join(projectRoot, 'node_modules/@phosphor-icons/web', url.pathname.slice(iconPath.length));
      await route.fulfill({ body: await readFile(filename), contentType: mimeTypes[extname(filename)] ?? 'application/octet-stream' });
    } else {
      await route.fulfill({ body: '', contentType: url.hostname === 'fonts.googleapis.com' ? 'text/css' : 'text/html' });
    }
  });
  const routes = ['index.html', ...await htmlFiles(join(projectRoot, 'pages'), 'pages/')];
  const errors = [];

  for (const prefix of ['', subfolder]) {
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    let documentRequests = 0;
    page.on('request', request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentRequests += 1; });
    await page.goto(origin + prefix + '/');
    await page.waitForSelector('[data-hero-slider]');
    await page.evaluate(() => {
      window.testShell = ['navbar', 'footer', 'main-content'].map(id => document.getElementById(id));
      window.testEmptyMain = false;
      new MutationObserver(() => {
        if (!document.querySelector('#main-content')?.children.length) window.testEmptyMain = true;
      }).observe(document.getElementById('app'), { childList: true, subtree: true });
      window.testOldHero = document.querySelector('[data-hero-slider]');
    });

    // A delayed destination keeps the previous page and the URL until it is ready.
    const aboutUrl = origin + prefix + '/pages/about.html';
    await page.route(aboutUrl, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 350));
      await route.continue();
    });
    await page.locator('#navbar [data-nav-page="about"]').click();
    await page.waitForSelector('#main-content[aria-busy="true"]');
    assert.equal(await page.locator('[data-hero-slider]').count(), 1);
    assert.equal(page.url(), origin + prefix + '/');
    await waitForPage(page, { page: 'about' });
    await page.unroute(aboutUrl);
    await assertShell(page);
    assert.equal(await page.locator('#navbar [data-nav-page="about"]').getAttribute('aria-current'), 'page');
    assert.match(await page.title(), /Meet Our Team/);
    assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /people at InBody/);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');

    // The old slider has no live controls after cleanup.
    assert.equal(await page.evaluate(() => {
      const before = window.testOldHero.dataset.activeIndex;
      const control = document.createElement('button');
      control.dataset.heroGoTo = '1';
      window.testOldHero.append(control);
      control.click();
      return window.testOldHero.dataset.activeIndex === before;
    }), true);

    // A late response from a superseded navigation must not replace the newest page.
    const methodUrl = origin + prefix + '/pages/the-inbody-method.html';
    await page.route(methodUrl, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.continue().catch(() => {});
    });
    await page.locator('#footer [data-nav-page="method"]').evaluate(link => link.click());
    await page.waitForSelector('#main-content[aria-busy="true"]');
    await page.locator('#navbar [data-nav-page="contact"]').click();
    await waitForPage(page, { page: 'contact' });
    await page.waitForTimeout(550);
    assert.equal(await page.locator('body').getAttribute('data-page'), 'contact');
    await page.unroute(methodUrl);

    await page.locator('#contact-form [name="name"]').fill('Rama123');
    assert.equal(await page.locator('#contact-form [name="name"]').inputValue(), 'Rama');
    await page.evaluate(() => { window.testOldName = document.querySelector('#contact-form [name="name"]'); });
    await page.locator('#navbar [data-nav-page="clinic"]').click();
    await waitForPage(page, { page: 'clinic' });
    assert.equal(await page.evaluate(() => {
      window.testOldName.value = 'Test123';
      window.testOldName.dispatchEvent(new Event('input'));
      return window.testOldName.value;
    }), 'Test123');

    await page.locator('[data-gallery-filter]:not([data-gallery-filter="all"])').first().click();
    assert.ok(await page.locator('[data-gallery-card][hidden]').count() > 0);
    await page.locator('[data-gallery-card]:not([hidden]) [data-gallery-open]').first().click();
    assert.equal(await page.locator('[data-gallery-dialog]').evaluate(dialog => dialog.open), true);
    await page.evaluate(() => { window.testOldDialog = document.querySelector('[data-gallery-dialog]'); history.back(); });
    await waitForPage(page, { page: 'contact' });
    assert.equal(await page.evaluate(() => !window.testOldDialog.open && document.body.style.overflow !== 'hidden'), true);
    await page.evaluate(() => history.forward());
    await waitForPage(page, { page: 'clinic' });

    // Back restores the previous scroll position; a new route starts at the top.
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
    await page.waitForFunction(() => window.scrollY === 600);
    // Avoid Playwright scrolling the sticky header into view before this click.
    await page.locator('#navbar [data-nav-page="about"]').evaluate(link => link.click());
    await waitForPage(page, { page: 'about' });
    await page.waitForFunction(() => window.scrollY === 0);
    await page.evaluate(() => history.back());
    await waitForPage(page, { page: 'clinic' });
    await page.waitForFunction(() => Math.abs(window.scrollY - 600) < 2);

    // Footer Services leads to Home's section, then same-page anchors also use history.
    await page.locator('#footer [data-nav-page="services"]').evaluate(link => link.click());
    await waitForPage(page, { page: 'home' });
    await page.waitForFunction(() => Math.abs(document.getElementById('services').getBoundingClientRect().top - 76) < 10);
    assert.equal(new URL(page.url()).hash, '#services');
    await clickRoute(page, '#main-content', { page: 'home' });
    assert.equal(new URL(page.url()).hash, '#main-content');
    await page.evaluate(() => history.back());
    await page.waitForFunction(() => location.hash === '#services');

    // Visit every existing entry without creating a new document, at both hosting depths.
    for (const route of routes) {
      const html = await readFile(join(projectRoot, route), 'utf8');
      const expected = Object.fromEntries([...html.matchAll(/data-(page|service|speciality)="([^"]+)"/gu)].map(match => [match[1], match[2]]));
      await clickRoute(page, origin + prefix + '/' + route, expected);
      assert.equal(new URL(page.url()).pathname, prefix + '/' + route);
      assert.equal(await page.locator('h1').count(), 1);
      await assertShell(page);
      assert.equal(await page.locator('#navbar').evaluate((navbar, base) => [...navbar.querySelectorAll('a[href^="/"]')].every(link => new URL(link.href).pathname.startsWith(base)), prefix + '/'), true);
      if (expected.speciality) {
        assert.equal(await page.locator(`[data-nav-speciality="${expected.speciality}"]`).getAttribute('aria-current'), 'page');
      }
    }
    assert.equal(documentRequests, 1, 'Internal navigation must not reload the document');

    // Normal browser actions and non-page links must retain native behavior.
    assert.equal(await page.evaluate(() => {
      const cases = [
        { href: '/pages/about.html', ctrlKey: true },
        { href: '/pages/about.html', metaKey: true },
        { href: '/pages/about.html', shiftKey: true },
        { href: '/pages/about.html', target: '_blank' },
        { href: '/pages/about.html', download: true },
        { href: 'mailto:hello@example.com' },
        { href: 'tel:+123456789' },
        { href: 'https://example.com/' },
      ];
      return cases.every(({ href, target, download, ...options }) => {
        const anchor = document.createElement('a');
        anchor.href = href;
        if (target) anchor.target = target;
        if (download) anchor.download = '';
        document.body.append(anchor);
        let intercepted;
        document.addEventListener('click', event => { intercepted = event.defaultPrevented; event.preventDefault(); }, { once: true });
        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...options }));
        anchor.remove();
        return intercepted === false;
      });
    }), true);

    // Direct nested links and refresh work without a server fallback or rewrite rule.
    const deepLink = origin + prefix + '/pages/services/lymphatic-drainage/post-surgical-recovery.html';
    await page.goto(deepLink);
    await page.waitForSelector('h1');
    await page.reload();
    await page.waitForSelector('h1');
    assert.equal(await page.locator('body').getAttribute('data-service'), 'post-surgical-recovery');
    assert.equal(await page.locator('link[href$="/css/output.css"]').count(), 1);
    await page.locator('#navbar [data-nav-page="about"]').click();
    await waitForPage(page, { page: 'about' });
    assert.equal(await page.locator('#navbar img').evaluate(img => new URL(img.src).pathname), prefix + '/assets/logo/logo.png');

    // Mobile menu closes after navigation, with a single working controller.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('[data-nav-toggle]').click();
    assert.equal(await page.locator('[data-nav-toggle]').getAttribute('aria-expanded'), 'true');
    await page.locator('#navbar [data-nav-page="contact"]').click();
    await waitForPage(page, { page: 'contact' });
    assert.equal(await page.locator('[data-nav-toggle]').getAttribute('aria-expanded'), 'false');
    await page.locator('[data-nav-toggle]').click();
    await page.locator('[data-services-toggle]').click();
    await page.locator('[data-nav-speciality]').first().click();
    await waitForPage(page, { page: 'speciality' });
    assert.equal(await page.locator('[data-services-toggle]').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    if (process.env.NAVIGATION_SCREENSHOT_DIR) {
      await mkdir(process.env.NAVIGATION_SCREENSHOT_DIR, { recursive: true });
      await page.screenshot({ path: join(process.env.NAVIGATION_SCREENSHOT_DIR, prefix ? 'navigation-subfolder-mobile.png' : 'navigation-root-mobile.png') });
    }

    // A failed fetch falls back to the real HTML entry rather than an empty shell.
    await page.route(aboutUrl, route => route.request().resourceType() === 'fetch'
      ? route.fulfill({ status: 503, body: 'Temporarily unavailable' }) : route.continue());
    await clickRoute(page, aboutUrl, { page: 'about' });
    assert.equal(await page.locator('h1').count(), 1);
    await page.close();
    console.log(`Passed: ${prefix || '/'} — ${routes.length} routes, persistent layout, delayed/racing loads, metadata, cleanup, scroll/history, anchors, deep links, refresh, native links, mobile menu and failure fallback.`);
  }
  assert.deepEqual(errors, [], 'Browser JavaScript errors');
  assert.deepEqual(missingResources, [], 'Missing local assets');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

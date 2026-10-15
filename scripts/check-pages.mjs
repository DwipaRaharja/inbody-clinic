import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PageLayout } from '../js/layouts/page-layout.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const siteOrigin = 'https://inbody.test';
const appSource = await readFile(join(projectRoot, 'js/app.js'), 'utf8');
const renderedPages = new Map();
const htmlFiles = (await readdir(projectRoot)).filter(name => name.endsWith('.html'));
const decodeAttribute = value => value.replace(/&(amp|lt|gt|quot|#39);/gu, (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[entity]);

for (const filename of htmlFiles) {
  const html = await readFile(join(projectRoot, filename), 'utf8');
  const pageId = html.match(/<body\s+data-page="([^"]+)"/u)?.[1];
  assert.ok(pageId, `${filename}: missing data-page`);
  assert.ok(appSource.includes(`import('./pages/${pageId}.js')`), `${filename}: page is not registered in app.js`);
  assert.equal((html.match(/src="\.\/js\/app\.js"/gu) ?? []).length, 1, `${filename}: expected one shared entry script`);
  assert.equal((html.match(/href="\.\/css\/output\.css"/gu) ?? []).length, 1, `${filename}: expected one Tailwind stylesheet`);
  assert.ok(/<title>[^<]+<\/title>/u.test(html), `${filename}: missing page title`);
  assert.ok(/name="description"/u.test(html), `${filename}: missing description`);

  const { default: definition } = await import(pathToFileURL(join(projectRoot, `js/pages/${pageId}.js`)));
  const serviceId = html.match(/\sdata-service="([^"]+)"/u)?.[1];
  const page = typeof definition === 'function' ? definition({ serviceId }) : definition;
  assert.equal(page.id, pageId, `${filename}: wrong page descriptor`);
  assert.ok(page.sections.length, `${filename}: no sections`);
  const markup = PageLayout(page);
  const ids = [...markup.matchAll(/\sid="([^"]+)"/gu)].map(match => match[1]);
  const idSet = new Set(ids);
  assert.equal(ids.length, idSet.size, `${filename}: duplicate IDs`);
  assert.equal((markup.match(/<h1[\s>]/gu) ?? []).length, 1, `${filename}: expected one H1`);
  assert.equal((markup.match(/<main[\s>]/gu) ?? []).length, 1, `${filename}: expected one main`);
  assert.ok(markup.includes('<main id="main-content" class="w-full min-w-0"'), `${filename}: main must stay full width`);
  assert.ok(markup.includes('href="#main-content"'), `${filename}: missing skip link`);

  for (const match of markup.matchAll(/\s(?:aria-labelledby|aria-describedby|aria-controls|for)="([^"]+)"/gu)) {
    for (const id of match[1].split(' ')) assert.ok(idSet.has(id), `${filename}: missing accessible target #${id}`);
  }
  for (const section of page.sections) assert.ok(idSet.has(section.id), `${filename}: missing section #${section.id}`);

  const route = filename === 'index.html' ? '/' : `/${filename}`;
  renderedPages.set(route, { filename, html, markup, ids: idSet });
}

for (const [route, { filename, html, markup }] of renderedPages) {
  for (const match of `${html}\n${markup}`.matchAll(/\s(href|src)="(\.\/[^"]+|#[^"]+)"/gu)) {
    const url = new URL(decodeAttribute(match[2]), `${siteOrigin}${route}`);
    const destination = renderedPages.get(url.pathname === '/index.html' ? '/' : url.pathname);
    if (destination) {
      if (url.hash) assert.ok(destination.ids.has(decodeURIComponent(url.hash.slice(1))), `${filename}: broken anchor ${match[2]}`);
    } else {
      assert.ok(!url.hash, `${filename}: anchor destination is not a page: ${match[2]}`);
      await access(join(projectRoot, decodeURIComponent(url.pathname.slice(1))));
    }
  }
}

async function checkImports(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await checkImports(path);
    } else if (entry.name.endsWith('.js')) {
      const source = await readFile(path, 'utf8');
      for (const match of source.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/gu)) {
        if (match[1].startsWith('.')) await access(resolve(dirname(path), match[1]));
      }
    }
  }
}
await checkImports(join(projectRoot, 'js'));
console.log(`Passed: ${renderedPages.size} pages, shared layout, IDs, accessibility targets, links, assets and module imports.`);

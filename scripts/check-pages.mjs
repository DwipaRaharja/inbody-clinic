import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PageLayout } from '../js/layouts/page-layout.js';
import { services } from '../js/data/services/index.js';
import { serviceNavigationGroups } from '../js/data/navigation.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const siteOrigin = 'https://inbody.test';
const appSource = await readFile(join(projectRoot, 'js/app.js'), 'utf8');
const iconStyles = await readFile(join(projectRoot, 'node_modules/@phosphor-icons/web/src/regular/style.css'), 'utf8');
const iconStylesheetUrl = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
const renderedPages = new Map();
assert.deepEqual((await readdir(projectRoot)).filter(name => name.endsWith('.html')), ['index.html'], 'Only the Home entry belongs in the project root');
async function findHtmlFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await findHtmlFiles(join(directory, entry.name), filename));
    else if (entry.name.endsWith('.html')) files.push(filename);
  }
  return files;
}
const htmlFiles = ['index.html', ...await findHtmlFiles(join(projectRoot, 'pages'), 'pages')];
const decodeAttribute = value => value.replace(/&(amp|lt|gt|quot|#39);/gu, (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[entity]);

for (const filename of htmlFiles) {
  const html = await readFile(join(projectRoot, filename), 'utf8');
  const pageId = html.match(/<body\s+data-page="([^"]+)"/u)?.[1];
  assert.ok(pageId, `${filename}: missing data-page`);
  assert.ok(appSource.includes(`import('./pages/${pageId}.js')`), `${filename}: page is not registered in app.js`);
  const rootPrefix = '../'.repeat(filename.split('/').length - 1) || './';
  if (filename !== 'index.html') assert.ok(html.includes(`data-root="${rootPrefix}"`), `${filename}: wrong project root prefix`);
  assert.equal(html.split(`src="${rootPrefix}js/app.js"`).length - 1, 1, `${filename}: expected one shared entry script`);
  assert.equal(html.split(`href="${rootPrefix}css/output.css"`).length - 1, 1, `${filename}: expected one Tailwind stylesheet`);
  assert.ok(!/<base\b/u.test(html), `${filename}: a base element would redirect local section anchors`);
  assert.equal(html.split(`href="${iconStylesheetUrl}"`).length - 1, 1, `${filename}: expected one Phosphor Regular CDN stylesheet`);
  assert.ok(!html.includes('./node_modules/@phosphor-icons/'), `${filename}: icon stylesheets must use the CDN`);
  assert.ok(/<title>[^<]+<\/title>/u.test(html), `${filename}: missing page title`);
  assert.ok(/name="description"/u.test(html), `${filename}: missing description`);

  const { default: definition } = await import(pathToFileURL(join(projectRoot, `js/pages/${pageId}.js`)));
  const serviceId = html.match(/\sdata-service="([^"]+)"/u)?.[1];
  const page = typeof definition === 'function' ? definition({ serviceId }) : definition;
  assert.equal(page.id, pageId, `${filename}: wrong page descriptor`);
  if (pageId === 'service') assert.equal(page.serviceId, serviceId, `${filename}: wrong service data`);
  assert.ok(page.sections.length, `${filename}: no sections`);
  const markup = PageLayout(page, { rootPrefix });
  for (const match of markup.matchAll(/<i\b[^>]*\bclass="([^"]+)"/gu)) {
    const classes = match[1].split(/\s+/u);
    const glyphs = classes.filter(name => name.startsWith('ph-'));
    if (glyphs.length) {
      assert.ok(classes.includes('ph'), `${filename}: missing Regular icon class`);
      for (const glyph of glyphs) assert.ok(iconStyles.includes(`.ph.${glyph}:`), `${filename}: missing Regular icon ${glyph}`);
    }
  }
  assert.ok(!markup.includes('[object Object]') && !markup.includes('undefined'), `${filename}: invalid rendered content`);
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
  renderedPages.set(route, { filename, html, markup, ids: idSet, serviceId });
}

for (const mountPath of ['', '/preview/inbody']) {
  for (const [route, { filename, html, markup }] of renderedPages) {
    for (const match of (html + '\n' + markup).matchAll(/\s(href|src)="((?:\.{1,2}\/|#)[^"]*)"/gu)) {
      const url = new URL(decodeAttribute(match[2]), siteOrigin + mountPath + route);
      assert.ok(url.pathname.startsWith(mountPath + '/'), filename + ': URL escapes the project when hosted in a subfolder');
      const projectPath = url.pathname.slice(mountPath.length);
      const destination = renderedPages.get(projectPath === '/index.html' ? '/' : projectPath);
      if (destination) {
        if (url.hash) assert.ok(destination.ids.has(decodeURIComponent(url.hash.slice(1))), filename + ': broken anchor ' + match[2]);
      } else {
        assert.ok(!url.hash, filename + ': anchor destination is not a page: ' + match[2]);
        await access(join(projectRoot, decodeURIComponent(projectPath.slice(1))));
      }
    }
  }
}

const dropdownServices = serviceNavigationGroups.flatMap(group => group.services);
assert.equal(new Set(dropdownServices.map(service => service.id)).size, dropdownServices.length, 'Service dropdown IDs must be unique');
assert.equal(Object.keys(services).length, dropdownServices.length, 'Every registered service must have a dropdown entry');
for (const item of dropdownServices) {
  assert.ok(item.id && item.href, `${item.label}: missing service page link`);
  const data = services[item.id];
  assert.ok(data && data.id === item.id, `${item.label}: missing or mismatched service data`);
  assert.equal(item.href, data.href, `${item.label}: dropdown and service URLs differ`);
  const route = new URL(item.href, siteOrigin).pathname;
  const page = renderedPages.get(route);
  assert.equal(page?.serviceId, item.id, `${item.label}: wrong HTML service target`);
  const activeLinks = [...page.markup.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/gu)];
  assert.equal(activeLinks.length, 1, `${item.label}: expected one active service link`);
  assert.equal(new URL(decodeAttribute(activeLinks[0][0].match(/\shref="([^"]+)"/u)[1]), siteOrigin + route).pathname, route, item.label + ': wrong active link');

  const icons = [
    ...data.hero.benefits.map(benefit => benefit.icon),
    ...data.expertise.columns.filter(column => column.variant === 'icon-blocks').flatMap(column => column.items.map(block => block.icon)),
  ];
  for (const icon of icons) assert.ok(iconStyles.includes(`.${icon}:`), `${item.label}: missing Phosphor icon ${icon}`);
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
console.log(`Passed: ${renderedPages.size} pages, ${dropdownServices.length} service routes, shared layout, IDs, accessibility targets, root/subfolder links, icons, assets and module imports.`);

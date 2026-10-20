import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes } from '../src/routes.js';
import { services } from '../js/data/services/index.js';
import { serviceNavigationGroups } from '../js/data/navigation.js';
import { specialityCatalog, getSpecialityForService } from '../js/data/specialities/catalog.js';
import { specialities } from '../js/data/specialities/index.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputRoot = resolve(projectRoot, 'dist');
const siteOrigin = 'https://inbody.test';
const iconStyles = await readFile(join(projectRoot, 'node_modules/@phosphor-icons/web/src/regular/style.css'), 'utf8');
const homeHtml = await readFile(join(outputRoot, 'index.html'), 'utf8');
const base = homeHtml.match(/<meta\s+name="app-base"\s+content="([^"]+)"/u)?.[1];
assert.ok(base?.startsWith('/') && base.endsWith('/'), 'Build must expose its absolute app-base');
if (process.env.TEST_BASE_PATH) assert.equal(base, process.env.TEST_BASE_PATH, 'Build base differs from TEST_BASE_PATH');
const renderedPages = new Map();
const decodeAttribute = value => value.replace(/&(amp|lt|gt|quot|apos|#39|#x27);/gu, (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'", '#x27': "'" })[entity]);

async function findHtmlFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = prefix + entry.name;
    if (entry.isDirectory()) files.push(...await findHtmlFiles(join(directory, entry.name), filename + '/'));
    else if (entry.name.endsWith('.html')) files.push(filename);
  }
  return files;
}

assert.equal(routes.length, 24, 'Expected 24 existing public routes');
assert.equal(new Set(routes.map(route => route.path)).size, routes.length, 'Route paths must be unique');
const expectedFiles = routes.map(route => route.path === '/' ? 'index.html' : route.path.slice(1)).sort();
const htmlFiles = (await findHtmlFiles(outputRoot)).filter(filename => filename !== '404.html').sort();
assert.deepEqual(htmlFiles, expectedFiles, 'Every public route needs its own prerendered HTML file');

for (const route of routes) {
  const filename = route.path === '/' ? 'index.html' : route.path.slice(1);
  const html = await readFile(join(outputRoot, filename), 'utf8');
  const title = decodeAttribute(html.match(/<title>([^<]+)<\/title>/u)?.[1] ?? '');
  const description = decodeAttribute(html.match(/<meta\s+name="description"\s+content="([^"]*)"/u)?.[1] ?? '');
  assert.equal(title, route.title, `${filename}: incorrect title`);
  assert.equal(description, route.description, `${filename}: incorrect description`);
  assert.ok(description.length, `${filename}: missing description`);
  assert.ok(html.includes(`name="app-base" content="${base}"`), `${filename}: inconsistent app base`);
  assert.ok(html.includes(`data-page="${route.pageId}"`), `${filename}: wrong page ID`);
  if (route.serviceId) assert.ok(html.includes(`data-service="${route.serviceId}"`), `${filename}: wrong treatment`);
  if (route.specialityId) assert.ok(html.includes(`data-speciality="${route.specialityId}"`), `${filename}: wrong speciality`);
  assert.ok(!/<base\b/u.test(html), `${filename}: a base element would redirect local section anchors`);
  assert.ok(!/\[object Object\]|undefined/u.test(html), `${filename}: invalid rendered content`);
  assert.ok(!/<div\b[^>]*id="app"[^>]*>\s*<\/div>/u.test(html), `${filename}: root must contain prerendered content`);
  assert.ok(/<div\b[^>]*id="app"[^>]*>[\s\S]*<main\b/u.test(html), `${filename}: missing prerendered React app`);
  assert.equal((html.match(/<h1[\s>]/gu) ?? []).length, 1, `${filename}: expected one H1`);
  assert.equal((html.match(/<main[\s>]/gu) ?? []).length, 1, `${filename}: expected one main`);
  assert.equal((html.match(/\sid="navbar"/gu) ?? []).length, 1, `${filename}: expected one navbar shell`);
  assert.equal((html.match(/\sid="footer"/gu) ?? []).length, 1, `${filename}: expected one footer shell`);
  assert.ok(/<main\b[^>]*id="main-content"[^>]*class="[^"]*w-full[^"]*min-w-0/u.test(html), `${filename}: main must stay full width`);
  assert.ok(html.includes('href="#main-content"'), `${filename}: missing skip link`);
  assert.equal((html.match(/<script\b[^>]*type="module"[^>]*src="[^"]+"/gu) ?? []).length, 1, `${filename}: expected one Vite browser entry`);
  assert.ok(/<link\b[^>]*rel="stylesheet"[^>]*href="[^"]+\.css"/u.test(html), `${filename}: missing built stylesheet`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/gu)].map(match => match[1]);
  const idSet = new Set(ids);
  assert.equal(ids.length, idSet.size, `${filename}: duplicate IDs`);
  for (const match of html.matchAll(/\s(?:aria-labelledby|aria-describedby|aria-controls|for)="([^"]+)"/gu)) {
    for (const id of match[1].split(' ')) assert.ok(idSet.has(id), `${filename}: missing accessible target #${id}`);
  }
  for (const match of html.matchAll(/<i\b[^>]*\bclass="([^"]+)"/gu)) {
    const classes = match[1].split(/\s+/u);
    const glyphs = classes.filter(name => name.startsWith('ph-'));
    if (glyphs.length) {
      assert.ok(classes.includes('ph'), `${filename}: missing Regular icon class`);
      for (const glyph of glyphs) assert.ok(iconStyles.includes(`.ph.${glyph}:`), `${filename}: missing Regular icon ${glyph}`);
    }
  }
  renderedPages.set(route.path, { ...route, filename, html, ids: idSet });
}

for (const { path, filename, html } of renderedPages.values()) {
  const pageUrl = siteOrigin + base + (path === '/' ? '' : path.slice(1));
  for (const match of html.matchAll(/\s(href|src)="([^"]+)"/gu)) {
    const value = decodeAttribute(match[2]);
    if (/^(?:data:|mailto:|tel:|javascript:)/u.test(value)) continue;
    const url = new URL(value, pageUrl);
    if (url.origin !== siteOrigin) continue;
    assert.ok(url.pathname.startsWith(base), `${filename}: URL escapes build base: ${value}`);
    const localPath = '/' + url.pathname.slice(base.length);
    const destination = renderedPages.get(localPath === '/index.html' ? '/' : localPath);
    if (destination) {
      if (url.hash) assert.ok(destination.ids.has(decodeURIComponent(url.hash.slice(1))), `${filename}: broken anchor ${value}`);
    } else {
      assert.ok(!url.hash, `${filename}: anchor destination is not a page: ${value}`);
      const target = resolve(outputRoot, decodeURIComponent(localPath.slice(1)));
      assert.ok(target.startsWith(outputRoot + sep), `${filename}: asset escapes output directory`);
      await access(target).catch(() => { throw new Error(`${filename}: missing built asset ${value}`); });
    }
  }
}

const dropdownServices = serviceNavigationGroups.flatMap(group => group.services);
assert.equal(new Set(dropdownServices.map(service => service.id)).size, dropdownServices.length, 'Treatment navigation IDs must be unique');
assert.equal(Object.keys(services).length, dropdownServices.length, 'Every treatment must have navigation data');
for (const item of dropdownServices) {
  const data = services[item.id];
  assert.equal(data?.id, item.id, `${item.label}: missing or mismatched treatment data`);
  assert.equal(item.href, data.href, `${item.label}: navigation and treatment URLs differ`);
  const route = new URL(item.href, siteOrigin).pathname;
  const page = renderedPages.get(route);
  assert.equal(page?.serviceId, item.id, `${item.label}: wrong route target`);
  const parent = getSpecialityForService(item.id);
  const parentLinks = [...page.html.matchAll(/<a\b[^>]*aria-current="location"[^>]*>/gu)];
  assert.equal(parentLinks.length, parent ? 1 : 0, `${item.label}: wrong active parent speciality`);
  if (parent) assert.ok(parentLinks[0][0].includes(`data-nav-speciality="${parent.id}"`), `${item.label}: incorrect parent speciality`);
  assert.equal((page.html.match(/<a\b[^>]*aria-current="page"[^>]*>/gu) ?? []).length, 0, `${item.label}: parent must not be marked as the detail page`);
}

assert.equal(specialityCatalog.length, 6, 'Expected the six client specialities');
assert.equal(Object.keys(specialities).length, 6, 'Every speciality needs detailed content');
assert.equal(new Set(specialityCatalog.map(speciality => speciality.id)).size, 6, 'Speciality IDs must be unique');
for (const speciality of specialityCatalog) {
  const route = new URL(speciality.href, siteOrigin).pathname;
  const page = renderedPages.get(route);
  assert.equal(page?.specialityId, speciality.id, `${speciality.name}: missing route`);
  const activeLinks = [...page.html.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/gu)];
  assert.equal(activeLinks.length, 1, `${speciality.name}: expected one active speciality link`);
  assert.ok(activeLinks[0][0].includes(`data-nav-speciality="${speciality.id}"`), `${speciality.name}: incorrect active link`);
  assert.ok(renderedPages.get('/').html.includes(`href="${base}${route.slice(1)}"`), `${speciality.name}: missing Home card`);
  for (const id of speciality.serviceIds) assert.ok(services[id], `${speciality.name}: unknown related treatment`);
}

const home = renderedPages.get('/');
const about = renderedPages.get('/pages/about.html');
assert.deepEqual(
  [...about.html.matchAll(/<section\b[^>]*\sid="([^"]+)"/gu)].map(match => match[1]),
  ['about', 'expertise', 'team-details', 'method'],
  'About must show the clinicians before expertise, the team and the Method',
);
assert.deepEqual(
  [...about.html.matchAll(/data-clinician="([^"]+)"/gu)].map(match => match[1]),
  ['saila', 'beatriz'],
  'About must include both clinician profiles',
);
assert.ok(about.html.includes('Meet your clinicians'), 'About must start with Meet your clinicians');
assert.ok(!about.html.includes('Two clinicians.'), 'The shared-approach hero is not part of this revision');
const homeSections = [...home.html.matchAll(/<section\b[^>]*\sid="([^"]+)"/gu)].map(match => match[1]);
assert.deepEqual(homeSections, ['hero', 'services', 'method', 'team', 'expect', 'assessment', 'home-contact'], 'Home section order changed');
assert.ok(!/Live Better|A healthier you|Real results/iu.test(home.html), 'Home still contains generic legacy marketing copy');
assert.ok(renderedPages.has('/pages/the-inbody-method.html'), 'Missing Method page');
// This listing was replaced by Advanced Lymphatic Therapy; preserve its existing detail URL.
const unlistedLegacyServices = new Set(['lymphatic-reset-fluid-retention-treatment']);
for (const [id, treatment] of Object.entries(services)) {
  const destination = new URL(treatment.href, siteOrigin).pathname;
  const linked = [...renderedPages.values()].some(page => page.path !== destination && [...page.html.matchAll(/\shref="([^"]+)"/gu)].some(match => {
    const url = new URL(decodeAttribute(match[1]), siteOrigin + base + page.path.slice(1));
    return '/' + url.pathname.slice(base.length) === destination;
  }));
  assert.ok(linked || unlistedLegacyServices.has(id), `${id}: treatment has no incoming page link`);
}

console.log(`Passed: ${renderedPages.size} prerendered React pages at ${base}, metadata, content, route catalog, links, anchors, accessibility targets, icons and built assets.`);

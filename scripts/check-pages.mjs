import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes } from '../src/routes.js';
import { services } from '../js/data/services/index.js';
import { serviceNavigationGroups, specialityNavigationLinks } from '../js/data/navigation.js';
import { specialityCatalog, getSpecialityForService } from '../js/data/specialities/catalog.js';
import { specialities } from '../js/data/specialities/index.js';
import { assessmentBooking } from '../js/data/assessment-booking.js';
import { saila, beatriz } from '../js/data/team.js';

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

assert.equal(routes.length, 23, 'Expected 23 public routes after removing the hormonal skin treatment');
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
const expectedBookingItems = {
  'pregnancy-massage-circulation-support': '26998157',
  'recovery-core-restoration': '24481861',
  'postnatal-lymphatic-drainage': '24481861',
  'post-surgical-recovery': '29617756',
  'clinical-lymphatic-drainage-sydney': '29617377',
  'lipedema-inflammatory-leg-care': '26068782',
  'tmj-jaw-headache-treatment': '24480917',
  'chronic-pain-stress-inflammation': '25827155',
  'clinical-therapeutic-massage-injury-recovery': '29742779',
  'endometriosis-pelvic-pain-support': '26131923',
  'clinical-cellulite-remodelling': '29617957',
  'lymphatic-reset-fluid-retention-treatment': '29617377',
};
assert.deepEqual(Object.keys(expectedBookingItems).sort(), Object.keys(services).sort(), 'Every treatment must have an explicitly verified Fresha selection');
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
  const bookingSection = page.html.match(/<section\b[^>]*\sid="service-contact"[\s\S]*?<\/section>/u)?.[0] ?? '';
  const bookingButton = bookingSection.match(/<a\b[^>]*href="([^"]+)"[^>]*><span>Book an appointment<\/span>/u);
  assert.ok(bookingButton, `${item.label}: missing treatment booking button`);
  assert.equal(decodeAttribute(bookingButton[1]), data.booking?.href, `${item.label}: button must use the treatment-specific Fresha link`);
  const bookingUrl = new URL(data.booking.href);
  assert.equal(bookingUrl.origin, 'https://www.fresha.com', `${item.label}: booking must open Fresha`);
  assert.ok(bookingUrl.pathname.endsWith('/booking'), `${item.label}: must open the booking flow`);
  assert.equal(bookingUrl.searchParams.get('offerItems'), `sv:${expectedBookingItems[item.id]}`, `${item.label}: incorrect selected Fresha treatment`);
  assert.equal(bookingUrl.searchParams.get('pId'), '2642624', `${item.label}: incorrect Fresha partner`);
  assert.ok(!bookingUrl.searchParams.has('cartId'), `${item.label}: do not share a previous visitor's cart`);
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

  const navigation = specialityNavigationLinks.find(link => link.id === speciality.id);
  assert.equal(new URL(navigation.href).hostname, 'www.fresha.com', `${speciality.name}: booking must go to Fresha`);
  const activeHref = decodeAttribute(activeLinks[0][0].match(/href="([^"]+)"/u)?.[1] ?? '');
  assert.equal(activeHref, navigation.href, `${speciality.name}: navbar must use the shared category booking link`);
  const treatmentLinks = [...page.html.matchAll(/<a\b[^>]*data-treatment-card="([^"]+)"[^>]*>/gu)];
  assert.deepEqual(treatmentLinks.map(match => match[1]), specialities[speciality.id].treatments.map(treatment => treatment.id), `${speciality.name}: related treatments must be preserved`);
  for (const [link, id] of treatmentLinks) {
    const treatmentPath = new URL(services[id].href, siteOrigin).pathname;
    assert.equal(decodeAttribute(link.match(/href="([^"]+)"/u)?.[1] ?? ''), base + treatmentPath.slice(1), `${id}: related treatment must open its internal detail page`);
  }
  const bookingSection = page.html.match(/<section\b[^>]*\sid="speciality-booking"[\s\S]*?<\/section>/u)?.[0] ?? '';
  assert.equal((page.html.match(/data-section-frame="speciality-booking"/gu) ?? []).length, 1, `${speciality.name}: expected one category booking CTA`);
  assert.ok(bookingSection.includes('Discuss your'), `${speciality.name}: restore the Discuss your heading`);
  assert.ok(decodeAttribute(bookingSection).includes(specialities[speciality.id].booking.care), `${speciality.name}: missing category heading`);
  assert.ok(decodeAttribute(bookingSection).includes(specialities[speciality.id].booking.description), `${speciality.name}: missing category description`);
  const bookingButton = bookingSection.match(/<a\b[^>]*href="([^"]+)"[^>]*><span>Book an Appointment<\/span>/u);
  assert.equal(decodeAttribute(bookingButton?.[1] ?? ''), navigation.href, `${speciality.name}: CTA must book the same category as the dropdown`);
  assert.ok(!bookingSection.includes('90 min'), `${speciality.name}: remove the assessment duration from the category CTA`);
}

const home = renderedPages.get('/');
const about = renderedPages.get('/pages/about.html');
assert.deepEqual(
  [...about.html.matchAll(/<section\b[^>]*\sid="([^"]+)"/gu)].map(match => match[1]),
  ['about', 'saila-profile', 'beatriz-profile', 'team-details', 'method'],
  'About must show the shared philosophy hero, both therapist profiles, shared team values and the Method',
);
assert.deepEqual(
  [...about.html.matchAll(/data-clinician="([^"]+)"/gu)].map(match => match[1]),
  ['saila', 'beatriz'],
  'About must include both clinician profiles',
);
const aboutTitle = about.html.match(/<h1\b[^>]*id="about-title"[^>]*>([\s\S]*?)<\/h1>/u)?.[1] ?? '';
assert.ok(aboutTitle.includes('One shared philosophy.'), 'About must use the reference hero title');
assert.ok(!about.html.includes('Different experience. A shared approach to your care.'), 'About must use the previous team copy');
for (const clinician of [saila, beatriz]) {
  const profile = about.html.match(new RegExp(`<article\\b[^>]*data-clinician="${clinician.id}"[\\s\\S]*?<\\/article>`, 'u'))?.[0] ?? '';
  const content = decodeAttribute(profile);
  const expectedCopy = [clinician.name, clinician.experience, ...clinician.role.split(' | '), ...(clinician.biography ?? [clinician.summary]), ...clinician.approach];
  for (const item of clinician.expertise) expectedCopy.push(item.title, ...(item.description ? [item.description] : []));
  for (const copy of expectedCopy) assert.ok(content.includes(copy), `${clinician.name}: missing approved profile copy: ${copy}`);
  assert.ok(profile.includes('Meet your therapist'), `${clinician.name}: missing therapist eyebrow`);
}
const homeSections = [...home.html.matchAll(/<section\b[^>]*\sid="([^"]+)"/gu)].map(match => match[1]);
assert.deepEqual(homeSections, ['hero', 'services', 'method', 'team', 'expect', 'home-contact'], 'Home must place assessment inside Services rather than duplicate it below');
const homeServices = home.html.match(/<section\b[^>]*\sid="services"[\s\S]*?<\/section>/u)?.[0] ?? '';
assert.equal(new URL(assessmentBooking.href).searchParams.get('oiid'), 'sv:29617337', 'Assessment booking must use the client-provided service, not another treatment');
assert.ok(homeServices.includes('data-section-frame="assessment"'), 'Home Services must feature the assessment panel');
assert.ok(homeServices.indexOf('data-section-frame="assessment"') < homeServices.indexOf('<ul'), 'Assessment must precede the speciality categories');
assert.equal((home.html.match(/data-section-frame="assessment"/gu) ?? []).length, 1, 'Home must include one assessment panel');
for (const page of renderedPages.values()) {
  const assessmentLink = page.html.match(/<a\b[^>]*\sdata-nav-assessment="[^"]*"[^>]*>/u)?.[0];
  assert.ok(assessmentLink, `${page.filename}: missing first-appointment navigation entry`);
  const assessmentHref = decodeAttribute(assessmentLink.match(/href="([^"]+)"/u)?.[1] ?? '');
  assert.equal(assessmentHref, assessmentBooking.href, `${page.filename}: inconsistent first-appointment link`);
  assert.ok(page.html.indexOf('data-nav-assessment') < page.html.indexOf('data-nav-speciality'), `${page.filename}: first-appointment entry must precede categories`);
  if (['service', 'speciality'].includes(page.pageId)) {
    assert.equal((page.html.match(/data-section-frame="assessment"/gu) ?? []).length, 0, `${page.filename}: treatment and speciality pages use the booking CTA instead of the Start Here section`);
  }
  if (['home', 'method'].includes(page.pageId)) {
    const panelButton = page.html.match(/<a\b[^>]*href="([^"]+)"[^>]*><span>BOOK YOUR FIRST APPOINTMENT<\/span>/u);
    assert.equal(decodeAttribute(panelButton?.[1] ?? ''), assessmentBooking.href, `${page.filename}: assessment button must use the shared booking link`);
    assert.equal((page.html.match(/data-section-frame="assessment"/gu) ?? []).length, 1, `${page.filename}: missing or duplicated assessment panel`);
    for (const copy of [assessmentBooking.question, ...assessmentBooking.paragraphs, assessmentBooking.duration, assessmentBooking.buttonLabel]) {
      assert.ok(decodeAttribute(page.html).includes(copy), `${page.filename}: missing assessment copy: ${copy}`);
    }
    assert.ok(!page.html.includes('Ask about an assessment'), `${page.filename}: outdated assessment enquiry CTA`);
  }
}
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

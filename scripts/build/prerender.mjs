import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import Beasties from 'beasties';
import { renderPageHtml } from './html.mjs';

// Two head jobs ship with every prerendered page:
// 1) Preload the display/body faces that every first paint needs (h1 Cormorant
//    700, heading/h3 Cormorant 600, body Montserrat 400) so the uncached load
//    finishes the font fetch before the fallback face is visible.
// 2) Inline all `@font-face` declarations into head. Beasties turns the
//    stylesheet link into a lazily loaded pattern, and faces that only live in
//    the deferred stylesheet would leave the first paint on the system
//    fallback (text) or tofu (icons), so every face is pinned in head.
//
// File names carry Vite's content hash, so emitted assets are matched by
// pattern instead of hardcoding a URL; the base prefix is read from the
// template's stylesheet link so custom VITE_BASE_PATH deploys keep working.
const PRELOADED_FONT_PATTERNS = [
  /^cormorant-garamond-latin-700-normal-.+\.woff2$/,
  /^cormorant-garamond-latin-600-normal-.+\.woff2$/,
  /^montserrat-latin-400-normal-.+\.woff2$/,
];

function findStylesheetHref(template) {
  return template.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"/u)?.[1] ?? '';
}

async function collectFontHeadTags({ outputRoot, template }) {
  const cssHref = findStylesheetHref(template);
  const base = cssHref ? cssHref.slice(0, cssHref.indexOf('/assets/')) : '';
  const assets = await readdir(resolve(outputRoot, 'assets')).catch(() => []);
  const tags = [];
  for (const pattern of PRELOADED_FONT_PATTERNS) {
    const match = assets.find((name) => pattern.test(name));
    if (match) tags.push(`<link rel="preload" as="font" type="font/woff2" crossorigin href="${base}/assets/${match}" />`);
  }
  if (tags.length < PRELOADED_FONT_PATTERNS.length) console.warn(`[prerender] ${PRELOADED_FONT_PATTERNS.length - tags.length} font preload target(s) missing from dist/assets`);

  const cssFile = cssHref.slice(base.length + '/assets/'.length);
  const css = await readFile(resolve(outputRoot, 'assets', cssFile), 'utf8').catch(() => '');
  // Every face is pinned, including the icon font: beasties inlines the `.ph`
  // icon rules themselves, so a face left in the deferred stylesheet would
  // render private-use content codes as tofu until that stylesheet loads.
  // Declaration cost is ~2 kB; the icon woff2 still downloads on demand
  // because preload hints above remain limited to the three text faces.
  const fontFaceRules = [...css.matchAll(/@font-face\{[^}]*\}/gu)].map((match) => match[0]);
  if (fontFaceRules.length) tags.unshift(`<style>${fontFaceRules.join('')}</style>`);
  return { tags, base };
}

// Beasties inlines every rule that matches the prerendered markup (Tailwind
// utilities are all DOM-matched, so first paint layouts fully from the inline
// CSS) and lazily loads the remainder: interaction states and rules for
// elements not in this page's markup. Fonts are handled by the inlined
// @font-face block + preloads above, so beasties' own font machinery is off to
// avoid duplicate declarations/hints. The stylesheet link becomes a low-
// priority preload that swaps to rel=stylesheet once loaded, with a <noscript>
// fallback for no-JS clients.
function createBeasties({ outputRoot, base }) {
  return new Beasties({
    path: outputRoot,
    publicPath: base,
    reduceInlineStyles: false,
    inlineFonts: false,
    preloadFonts: false,
    preload: 'swap',
  });
}

async function writePage({ path, render, template, outputRoot, siteBaseUrl, fontHeadTags, beasties }) {
  const rendered = render(path);
  let output = renderPageHtml({ template, path, siteBaseUrl, fontHeadTags, ...rendered });
  output = await beasties.process(output);
  const filename = resolve(outputRoot, path === '/' ? 'index.html' : path.slice(1));
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, output);
}

export async function prerenderRoutes({ routes, render, template, outputRoot, siteBaseUrl }) {
  const { tags: fontHeadTags, base } = await collectFontHeadTags({ outputRoot, template });
  const beasties = createBeasties({ outputRoot, base });
  for (const route of routes) {
    await writePage({ path: route.path, render, template, outputRoot, siteBaseUrl, fontHeadTags, beasties });
  }
  await writePage({ path: '/404.html', render, template, outputRoot, siteBaseUrl, fontHeadTags, beasties });
}

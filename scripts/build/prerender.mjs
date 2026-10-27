import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { renderPageHtml } from './html.mjs';

// The display/body faces that every page's first paint needs (h1 Cormorant 700,
// heading/h3 Cormorant 600, body Montserrat 400). Preloading them lets the
// uncached (hard refresh / first visit) load finish the font fetch before the
// first paint, so `font-display: swap` rarely shows the fallback face. File
// names carry Vite's content hash, so match emitted assets by pattern instead
// of hardcoding a URL; base prefix is read from the template's stylesheet link
// so custom VITE_BASE_PATH deploys keep working.
const PRELOADED_FONT_PATTERNS = [
  /^cormorant-garamond-latin-700-normal-.+\.woff2$/,
  /^cormorant-garamond-latin-600-normal-.+\.woff2$/,
  /^montserrat-latin-400-normal-.+\.woff2$/,
];

async function collectFontPreloads({ outputRoot, template }) {
  const cssHref = template.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"/u)?.[1];
  const base = cssHref ? cssHref.slice(0, cssHref.indexOf('/assets/')) : '';
  const assets = await readdir(resolve(outputRoot, 'assets')).catch(() => []);
  const tags = [];
  for (const pattern of PRELOADED_FONT_PATTERNS) {
    const match = assets.find((name) => pattern.test(name));
    if (match) tags.push(`<link rel="preload" as="font" type="font/woff2" crossorigin href="${base}/assets/${match}" />`);
  }
  if (tags.length < PRELOADED_FONT_PATTERNS.length) console.warn(`[prerender] ${PRELOADED_FONT_PATTERNS.length - tags.length} font preload target(s) missing from dist/assets`);
  return tags;
}

async function writePage({ path, render, template, outputRoot, siteBaseUrl, fontPreloads }) {
  const rendered = render(path);
  const output = renderPageHtml({ template, path, siteBaseUrl, fontPreloads, ...rendered });
  const filename = resolve(outputRoot, path === '/' ? 'index.html' : path.slice(1));
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, output);
}

export async function prerenderRoutes({ routes, render, template, outputRoot, siteBaseUrl }) {
  const fontPreloads = await collectFontPreloads({ outputRoot, template });
  for (const route of routes) {
    await writePage({ path: route.path, render, template, outputRoot, siteBaseUrl, fontPreloads });
  }
  await writePage({ path: '/404.html', render, template, outputRoot, siteBaseUrl, fontPreloads });
}

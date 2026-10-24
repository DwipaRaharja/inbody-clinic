// Static generation pipeline for the InBody Clinic website (see README,
// "Alur build — static generation (SSG)"):
//
// 1. Vite client build -- dist/ receives the shell index.html plus JS/CSS
//    bundles; that shell doubles as the template for every page below.
// 2. Vite SSR build -- src/entry-server.jsx is compiled into a runnable
//    .build/ssr/entry-server.js exporting render(path).
// 3. Prerender -- every route from src/routes.js is rendered by React and
//    written to dist/<path>, filling the shell placeholders <!--app-html-->
//    and <!--app-route--> with route markup and per-route SEO tags.
// 4. Hosting extras -- 404.html, copied assets/, .nojekyll, robots.txt, sitemap.xml,
//    robots.txt and sitemap.xml.
//
// src/routes.js is the single source of truth for URLs, page IDs, titles and
// descriptions; this script never invents a page of its own. Absolute URLs
// required by canonical/Open Graph/sitemap come from SITE_URL, not from the
// --base hosting prefix (siteBaseUrl vs. base below).

import { build } from 'vite';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { routes } from '../src/routes.js';
import { clinicContact, clinicMapUrl } from '../js/data/clinic-contact.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
// `--base /repository-name/` picks the hosting prefix baked into asset URLs,
// the shell <meta name="app-base">, and client routing (js/utils/urls.js).
// The default `/` fits a root domain (Hostinger public_html); GitHub Pages
// project sites pass `--base /repository-name/` — `npm run build:pages` does
// exactly that.
const args = process.argv.slice(2);
let base = process.env.VITE_BASE_PATH || '/';
for (let index = 0; index < args.length; index += 1) {
  // Only `--base <path>` is understood; anything else fails loudly instead of
  // quietly publishing the site to the wrong location.
  if (args[index] === '--base' && args[index + 1]) base = args[++index];
  else throw new Error(`Unknown or incomplete argument: ${args[index]}. Use --base /repository-name/.`);
}
// Accepts `/` or segments of letters, digits, `_` and `-`, each ending with `/`.
if (!/^\/(?:[a-z\d_-]+\/)*$/iu.test(base)) throw new Error('Base must be / or an absolute directory path such as /inbody-clinic/.');
// vite.config.js re-reads this env var so both build calls share one base.
process.env.VITE_BASE_PATH = base;

// Canonical/Open Graph/sitemap URLs must be absolute and public, so SITE_URL
// is the hosting address those tags are built from. There is no safe fallback
// (a wrong domain would poison every generated tag), hence the hard error.
const configuredSiteUrl = process.env.SITE_URL?.trim();
if (!configuredSiteUrl) throw new Error('Set SITE_URL to the public HTTPS base URL before building (including any hosting subpath).');
let parsedSiteUrl;
try {
  parsedSiteUrl = new URL(configuredSiteUrl);
} catch {
  throw new Error('SITE_URL must be an absolute HTTPS URL, such as https://example.com or https://example.github.io/repository.');
}
// HTTPS-only and free of credentials/query/fragment: every generated tag
// embeds this string verbatim, so it must already be a clean page base URL.
if (parsedSiteUrl.protocol !== 'https:' || parsedSiteUrl.search || parsedSiteUrl.hash || parsedSiteUrl.username || parsedSiteUrl.password) {
  throw new Error('SITE_URL must be an HTTPS base URL without credentials, query parameters, or a fragment.');
}
// Normalised once: origin plus pathname without a trailing slash, e.g.
// "https://inbodyclinic.com.au" or "https://user.github.io/inbody-clinic".
// Pages prepend their own leading slash, so joining with `path` is safe.
const siteBaseUrl = `${parsedSiteUrl.origin}${parsedSiteUrl.pathname.replace(/\/+$/u, '')}`;

// Client build. Vite bundles React/CSS honouring `base`; dist/index.html is
// the shell whose placeholders get filled per route in writePage() below.
await build({ root: projectRoot, base });
// SSR build. Compiles src/entry-server.jsx into one runnable file so the
// prerender step can call its render(path) without a dev server involved.
await build({
  root: projectRoot,
  base,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: '.build/ssr',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.js' } },
  },
});

// Import the freshly generated SSR bundle. A file URL keeps the dynamic
// import valid on Windows paths and arbitrary project locations.
const { render } = await import(pathToFileURL(resolve(projectRoot, '.build/ssr/entry-server.js')).href);
const outputRoot = resolve(projectRoot, 'dist');
// The shell comes from the just-finished client build; writePage() fills its
// <!--app-html--> (rendered React markup) and <!--app-route--> (hydration
// marker read by src/entry-client.jsx) placeholders.
const template = await readFile(resolve(outputRoot, 'index.html'), 'utf8');
// Escapes HTML-sensitive characters so route copy such as
// "Women’s Health & Advanced Lymphatic Therapy" can never break the markup.
const escape = value => String(value).replace(/[&<>"']/gu, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

// Render one route and write dist/<path> with that route's own metadata.
async function writePage(path) {
  // render(path) runs the React tree on the server. `route` is the metadata
  // object from src/routes.js and is null for paths that are not registered
  // there (only /404.html passes through this pipeline that way).
  const { html, route, documentClasses, bodyClasses } = render(path);
  // Body attributes mirror the state src/App.jsx manages after hydration, so
  // the static HTML already carries the correct classes and page identity.
  const attributes = { class: bodyClasses, 'data-page': route?.pageId ?? 'not-found' };
  if (route?.serviceId) attributes['data-service'] = route.serviceId;
  if (route?.specialityId) attributes['data-speciality'] = route.specialityId;
  // These fallbacks match what src/App.jsx shows for unknown URLs.
  const pageTitle = route?.title ?? 'Page not found | InBody Clinic';
  const pageDescription = route?.description ?? 'Find specialised care and contact information at InBody Clinic.';
  // A single shared MedicalClinic entity is emitted once on every public
  // route. Its business details come from the clinic contact data source.
  const jsonLdTag = route
    ? `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      '@id': `${siteBaseUrl}/#clinic`,
      name: 'InBody Clinic',
      url: `${siteBaseUrl}/`,
      logo: `${siteBaseUrl}/assets/logo/site_logo.png`,
      telephone: clinicContact.phoneHref.replace(/^tel:/u, ''),
      email: clinicContact.email,
      address: { '@type': 'PostalAddress', ...clinicContact.structuredAddress },
      openingHoursSpecification: clinicContact.structuredHours.map(hours => ({
        '@type': 'OpeningHoursSpecification',
        ...hours,
      })),
      hasMap: clinicMapUrl,
      medicalSpecialty: 'https://schema.org/Physiotherapy',
    }).replace(/</gu, '\\u003c')}</script>`
    : null;
  // SEO tag block injected once per page. Canonical and og:url combine the
  // validated SITE_URL with the page path, so stray variants (e.g. a request
  // for /index.html) point to one canonical address instead of competing as
  // duplicate content. og:image becomes absolute even when routes.js stores a
  // root-relative path. Unknown URLs get noindex (+follow) so the 404 file is
  // not indexed, while links on it remain crawlable.
  const seoTags = route
    ? (() => {
      const canonical = `${siteBaseUrl}${path}`;
      const configuredOgImage = route.ogImage ?? '/assets/logo/site_logo.png';
      const ogImage = /^https?:\/\//iu.test(configuredOgImage)
        ? configuredOgImage
        : `${siteBaseUrl}/${configuredOgImage.replace(/^\/+/, '')}`;
      return [
        `<link rel="canonical" href="${escape(canonical)}" />`,
        '<meta property="og:type" content="website" />',
        '<meta property="og:site_name" content="InBody Clinic" />',
        `<meta property="og:title" content="${escape(pageTitle)}" />`,
        `<meta property="og:description" content="${escape(pageDescription)}" />`,
        `<meta property="og:url" content="${escape(canonical)}" />`,
        `<meta property="og:image" content="${escape(ogImage)}" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
        `<meta name="twitter:title" content="${escape(pageTitle)}" />`,
        `<meta name="twitter:description" content="${escape(pageDescription)}" />`,
        `<meta name="twitter:image" content="${escape(ogImage)}" />`,
        jsonLdTag,
      ];
    })()
    : ['<meta name="robots" content="noindex, follow" />'];
  // Every replacer is a function so `$` sequences inside the prerendered
  // markup or metadata stay literal instead of acting as replacement patterns.
  const output = template
    // The complete page body produced by React on the server.
    .replace('<!--app-html-->', () => html)
    // Hydration marker followed by the SEO tag block generated above.
    .replace('<!--app-route-->', () => [`<meta name="app-route" content="${escape(path)}" />`, ...seoTags].join('\n  '))
    // Route title/description overwrite the shell defaults, giving every URL
    // unique metadata with no client JavaScript involved.
    .replace(/<title>[\s\S]*?<\/title>/u, () => `<title>${escape(pageTitle)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/u, () => `<meta name="description" content="${escape(pageDescription)}" />`)
    // Scroll padding design tokens (src/theme.js) applied onto <html>.
    .replace('<html lang="en">', () => `<html lang="en" class="${escape(documentClasses)}">`)
    // Body classes/background plus page/service/speciality identifiers.
    .replace(/<body[^>]*>/u, () => `<body ${Object.entries(attributes).map(([name, value]) => `${name}="${escape(value)}"`).join(' ')}>`);
  // `/` maps to index.html at the host root; any other path keeps its own file
  // (e.g. /pages/about.html → dist/pages/about.html) so direct links and
  // refreshes work on static hosting with no rewrite rules.
  const filename = resolve(outputRoot, path === '/' ? 'index.html' : path.slice(1));
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, output);
}

// Render every registered route, then the shared 404 page. /404.html is not in
// src/routes.js, so render() falls back to the not-found view; GitHub Pages
// serves this file for unknown URLs and Hostinger can wire it via ErrorDocument.
for (const route of routes) await writePage(route.path);
await writePage('/404.html');

// Copy raw media (photos, logo) and write .nojekyll so GitHub Pages treats the
// output as plain files instead of running Jekyll processing over it.
await cp(resolve(projectRoot, 'assets'), resolve(outputRoot, 'assets'), { recursive: true });
await writeFile(resolve(outputRoot, '.nojekyll'), '');

// robots.txt points crawlers at the sitemap; both files use the same
// validated SITE_URL, so they always agree on the canonical host.
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteBaseUrl}/sitemap.xml\n`;
await writeFile(resolve(outputRoot, 'robots.txt'), robots);

// sitemap.xml is generated straight from src/routes.js: adding a page there is
// enough for it to appear in the sitemap; /404.html intentionally stays out.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url>\n    <loc>${escape(`${siteBaseUrl}${route.path}`)}</loc>\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(outputRoot, 'sitemap.xml'), sitemap);
console.log(`Prerendered ${routes.length} pages and 404.html at ${base}. Upload the contents of dist/ to your static host.`);

import { cp, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { escapeHtml } from './utils.mjs';

// Copy public static assets and generate the hosting/crawler files after all
// route HTML has been written to dist/.
export async function writeStaticOutput({ projectRoot, outputRoot, routes, siteBaseUrl }) {
  await cp(resolve(projectRoot, 'assets'), resolve(outputRoot, 'assets'), { recursive: true });
  await writeFile(resolve(outputRoot, '.nojekyll'), '');

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteBaseUrl}/sitemap.xml\n`;
  await writeFile(resolve(outputRoot, 'robots.txt'), robots);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url>\n    <loc>${escapeHtml(`${siteBaseUrl}${route.path}`)}</loc>\n  </url>`).join('\n')}\n</urlset>\n`;
  await writeFile(resolve(outputRoot, 'sitemap.xml'), sitemap);
}

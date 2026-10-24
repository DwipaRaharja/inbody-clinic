import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { renderPageHtml } from './html.mjs';

async function writePage({ path, render, template, outputRoot, siteBaseUrl }) {
  const rendered = render(path);
  const output = renderPageHtml({ template, path, siteBaseUrl, ...rendered });
  const filename = resolve(outputRoot, path === '/' ? 'index.html' : path.slice(1));
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, output);
}

export async function prerenderRoutes({ routes, render, template, outputRoot, siteBaseUrl }) {
  for (const route of routes) {
    await writePage({ path: route.path, render, template, outputRoot, siteBaseUrl });
  }
  await writePage({ path: '/404.html', render, template, outputRoot, siteBaseUrl });
}

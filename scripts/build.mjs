import { build } from 'vite';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { routes } from '../src/routes.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
let base = process.env.VITE_BASE_PATH || '/';
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--base' && args[index + 1]) base = args[++index];
  else throw new Error(`Unknown or incomplete argument: ${args[index]}. Use --base /repository-name/.`);
}
if (!/^\/(?:[a-z\d_-]+\/)*$/iu.test(base)) throw new Error('Base must be / or an absolute directory path such as /inbody-clinic/.');
process.env.VITE_BASE_PATH = base;

await build({ root: projectRoot, base });
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

const { render } = await import(pathToFileURL(resolve(projectRoot, '.build/ssr/entry-server.js')).href);
const outputRoot = resolve(projectRoot, 'dist');
const template = await readFile(resolve(outputRoot, 'index.html'), 'utf8');
const escape = value => String(value).replace(/[&<>"']/gu, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

async function writePage(path) {
  const { html, route, documentClasses, bodyClasses } = render(path);
  const attributes = { class: bodyClasses, 'data-page': route?.pageId ?? 'not-found' };
  if (route?.serviceId) attributes['data-service'] = route.serviceId;
  if (route?.specialityId) attributes['data-speciality'] = route.specialityId;
  const output = template
    .replace('<!--app-html-->', () => html)
    .replace('<!--app-route-->', () => `<meta name="app-route" content="${escape(path)}" />`)
    .replace(/<title>[\s\S]*?<\/title>/u, () => `<title>${escape(route?.title ?? 'Page not found | InBody Clinic')}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/u, () => `<meta name="description" content="${escape(route?.description ?? 'Find specialised care and contact information at InBody Clinic.')}" />`)
    .replace('<html lang="en">', () => `<html lang="en" class="${escape(documentClasses)}">`)
    .replace(/<body[^>]*>/u, () => `<body ${Object.entries(attributes).map(([name, value]) => `${name}="${escape(value)}"`).join(' ')}>`);
  const filename = resolve(outputRoot, path === '/' ? 'index.html' : path.slice(1));
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, output);
}

for (const route of routes) await writePage(route.path);
await writePage('/404.html');
for (const directory of ['assets', 'gallery']) {
  await cp(resolve(projectRoot, directory), resolve(outputRoot, directory), { recursive: true });
}
await writeFile(resolve(outputRoot, '.nojekyll'), '');
console.log(`Prerendered ${routes.length} pages and 404.html at ${base}. Upload the contents of dist/ to your static host.`);

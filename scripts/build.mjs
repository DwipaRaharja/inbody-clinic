// Build entry point: keep npm run build stable while the build work lives in
// focused modules under scripts/build/.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { routes } from '../src/routes.js';
import { getBuildConfig } from './build/config.mjs';
import { buildSite } from './build/vite.mjs';
import { prerenderRoutes } from './build/prerender.mjs';
import { writeStaticOutput } from './build/static-output.mjs';

const config = getBuildConfig();
// vite.config.js reads this for both the client and SSR builds.
process.env.VITE_BASE_PATH = config.base;

const { render } = await buildSite(config);
const template = await readFile(resolve(config.outputRoot, 'index.html'), 'utf8');

await prerenderRoutes({
  routes,
  render,
  template,
  outputRoot: config.outputRoot,
  siteBaseUrl: config.siteBaseUrl,
});

await writeStaticOutput({
  projectRoot: config.projectRoot,
  outputRoot: config.outputRoot,
  routes,
  siteBaseUrl: config.siteBaseUrl,
});

console.log(`Prerendered ${routes.length} pages and 404.html at ${config.base}. Upload the contents of dist/ to your static host.`);

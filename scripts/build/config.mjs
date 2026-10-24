import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

// Resolve the static build settings before running Vite. A single validated
// site base is shared by canonical metadata, JSON-LD, robots.txt and sitemap.
export function getBuildConfig(args = process.argv.slice(2), env = process.env) {
  let base = env.VITE_BASE_PATH || '/';
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--base' && args[index + 1]) base = args[++index];
    else throw new Error(`Unknown or incomplete argument: ${args[index]}. Use --base /repository-name/.`);
  }

  if (!/^\/(?:[a-z\d_-]+\/)*$/iu.test(base)) {
    throw new Error('Base must be / or an absolute directory path such as /inbody-clinic/.');
  }

  const configuredSiteUrl = env.SITE_URL?.trim();
  if (!configuredSiteUrl) {
    throw new Error('Set SITE_URL to the public HTTPS base URL before building (including any hosting subpath).');
  }

  let parsedSiteUrl;
  try {
    parsedSiteUrl = new URL(configuredSiteUrl);
  } catch {
    throw new Error('SITE_URL must be an absolute HTTPS URL, such as https://example.com or https://example.github.io/repository.');
  }

  if (parsedSiteUrl.protocol !== 'https:' || parsedSiteUrl.search || parsedSiteUrl.hash || parsedSiteUrl.username || parsedSiteUrl.password) {
    throw new Error('SITE_URL must be an HTTPS base URL without credentials, query parameters, or a fragment.');
  }

  const siteBaseUrl = `${parsedSiteUrl.origin}${parsedSiteUrl.pathname.replace(/\/+$/u, '')}`;

  return {
    base,
    siteBaseUrl,
    projectRoot,
    outputRoot: resolve(projectRoot, 'dist'),
  };
}

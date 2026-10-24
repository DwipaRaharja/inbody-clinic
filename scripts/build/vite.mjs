import { build } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Build the browser bundle before SSR because its index.html becomes the page
// template. The SSR entry is imported only after Vite has generated it.
export async function buildSite({ projectRoot, base }) {
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

  const serverEntry = resolve(projectRoot, '.build/ssr/entry-server.js');
  return import(pathToFileURL(serverEntry).href);
}

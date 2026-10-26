import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';

export default defineConfig(({ isPreview }) => {
  let base = process.env.VITE_BASE_PATH || '/';
  if (isPreview && !process.env.VITE_BASE_PATH) {
    try {
      base = readFileSync(new URL('./dist/index.html', import.meta.url), 'utf8')
        .match(/<meta name="app-base" content="([^"]+)"/u)?.[1] || base;
    } catch { /* Vite provides the missing-build diagnostic. */ }
  }
  return {
    base,
    plugins: [react(), tailwindcss()],
    publicDir: false,
    build: {
      outDir: 'dist',
      // Split stable third-party code (GSAP) out of the app entry so new
      // deploys keep the vendor cache warm; remaining node_modules join it.
      rolldownOptions: {
        output: {
          advancedChunks: {
            groups: [
              { name: 'gsap', priority: 10, test: /[\\/]node_modules[\\/]gsap[\\/]/ },
              { name: 'vendor', priority: 5, test: /[\\/]node_modules[\\/]/ },
            ],
          },
        },
      },
    },
  };
});

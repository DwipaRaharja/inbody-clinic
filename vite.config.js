import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { visualizer } from 'rollup-plugin-visualizer';

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
    plugins: [react(), tailwindcss(), visualizer({ open: true, gzipSize: true, filename: 'stats.html' })],
    publicDir: false,
    build: { outDir: 'dist' },
  };
});
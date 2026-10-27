import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { basePath, stripBase } from '../js/utils/urls.js';
import { normalizePath } from './routes.js';
import '@phosphor-icons/web/regular';
// Self-hosted fonts (T2): latin subset per weight, same families as the
// --font-display/--font-sans tokens. Replaces the render-blocking Google Fonts
// stylesheet that used to live in index.html.
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
// No italic faces on purpose: the original site's Google Fonts URL declared no
// italic axis, so every `italic` span sheared the upright glyphs (faux oblique).
// Importing real Cormorant italic faces changed those glyphs once more, so we
// keep the synthesized rendering to match the original byte-for-byte look.
import '@fontsource/montserrat/latin-300.css';
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-700.css';
import { gsap } from 'gsap';
import '../css/input.css';

// Keep the existing animation controllers on the same local GSAP instance.
window.gsap = gsap;

const root = document.getElementById('app');
const app = <BrowserRouter basename={basePath}><App /></BrowserRouter>;
const prerenderedPath = document.querySelector('meta[name="app-route"]')?.content;
if (root.hasChildNodes() && prerenderedPath === normalizePath(stripBase(window.location.pathname))) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { basePath, stripBase } from '../js/utils/urls.js';
import { normalizePath } from './routes.js';
import '@phosphor-icons/web/regular';
// Self-hosted variable fonts (T2): one latin woff2 per face replaces the
// nine per-weight stylesheets and the old third-party Google Fonts request.
// Family names must match css/input.css tokens (see css/fonts.css).
import '../css/fonts.css';
import '../css/input.css';
import { gsap } from 'gsap';

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

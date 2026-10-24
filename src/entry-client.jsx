import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { basePath, stripBase } from '../js/utils/urls.js';
import { normalizePath } from './routes.js';
import '@phosphor-icons/web/regular';
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

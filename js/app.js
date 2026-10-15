import { mountPage } from './layouts/page-layout.js';

const pages = {
  home: () => import('./pages/home.js'),
  about: () => import('./pages/about.js'),
  contact: () => import('./pages/contact.js'),
};

const root = document.getElementById('app');

try {
  const loadPage = pages[document.body.dataset.page];
  if (!loadPage) throw new Error(`Unknown page: ${document.body.dataset.page}`);
  const { default: page } = await loadPage();
  mountPage(root, page);
} catch (error) {
  root.setAttribute('role', 'alert');
  root.textContent = 'The page could not be loaded. Please refresh to try again.';
  console.error('Unable to load the page.', error);
}

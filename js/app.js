import { mountPage } from './layouts/page-layout.js';

const pages = {
  home: () => import('./pages/home.js'),
  about: () => import('./pages/about.js'),
  contact: () => import('./pages/contact.js'),
  clinic: () => import('./pages/clinic.js'),
  service: () => import('./pages/service.js'),
  speciality: () => import('./pages/speciality.js'),
  method: () => import('./pages/method.js'),
};

const root = document.getElementById('app');

try {
  const loadPage = pages[document.body.dataset.page];
  if (!loadPage) throw new Error(`Unknown page: ${document.body.dataset.page}`);
  const { default: definition } = await loadPage();
  const page = typeof definition === 'function'
    ? definition({ serviceId: document.body.dataset.service, specialityId: document.body.dataset.speciality })
    : definition;
  mountPage(root, page);
} catch (error) {
  root.setAttribute('role', 'alert');
  root.textContent = 'The page could not be loaded. Please refresh to try again.';
  console.error('Unable to load the page.', error);
}

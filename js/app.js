import { startNavigation } from './navigation.js';

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

async function loadPage(data) {
  if (!Object.hasOwn(pages, data.page)) throw new Error(`Unknown page: ${data.page}`);
  const { default: definition } = await pages[data.page]();
  return typeof definition === 'function'
    ? definition({ serviceId: data.service, specialityId: data.speciality })
    : definition;
}

try {
  await startNavigation({ root, loadPage, siteRoot: new URL('../', import.meta.url) });
} catch (error) {
  root.setAttribute('role', 'alert');
  root.textContent = 'The page could not be loaded. Please refresh to try again.';
  console.error('Unable to load the page.', error);
}

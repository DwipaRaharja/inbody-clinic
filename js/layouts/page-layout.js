import { ContactBar, Navbar, initNavbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { getNavigationLinks, specialityNavigationLinks } from '../data/navigation.js';

const documentClasses = 'scroll-pt-[72px] scroll-smooth tablet:scroll-pt-[76px] nav:scroll-pt-[72px] wide:scroll-pt-[76px] motion-reduce:scroll-auto';
const bodyClasses = 'font-sans text-clinic-navy antialiased [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display **:[-webkit-tap-highlight-color:transparent] **:focus-visible:outline-2 **:focus-visible:outline-offset-5 **:focus-visible:outline-clinic-navy';
const backgroundClasses = { cream: 'bg-clinic-cream', white: 'bg-clinic-white' };
const mountedLayouts = new WeakMap();

function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function Section({ id, className = '', labelledBy, label, render }) {
  const accessibleName = labelledBy
    ? ` aria-labelledby="${escapeAttribute(labelledBy)}"`
    : label ? ` aria-label="${escapeAttribute(label)}"` : '';
  return `<section id="${escapeAttribute(id)}" class="${escapeAttribute(className)}"${accessibleName}>${render()}</section>`;
}

function projectUrls(markup, rootPrefix) {
  // Keep local #anchors on this page; project URLs can use a stable hosting prefix.
  return markup.replace(/\b(href|src)="\.\/([^"\n]*)"/gu, (_, attribute, path) => `${attribute}="${rootPrefix}${path}"`);
}

export function PageContent({ sections }, { rootPrefix = './' } = {}) {
  return projectUrls(sections.map(Section).join('\n'), rootPrefix);
}

export function PageLayout(page, { rootPrefix = './' } = {}) {
  const { id, serviceId, specialityId } = page;
  const markup = `
    <a class="fixed -top-[100px] left-4 z-100 bg-clinic-white px-[18px] py-3 text-clinic-navy focus:top-3" href="#main-content">Skip to main content</a>
    <div id="contact-bar">${ContactBar()}</div>
    <header id="navbar" class="sticky top-0 z-50 bg-clinic-white">${Navbar({ currentPage: id, serviceId, specialityId })}</header>
    <p id="navigation-status" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></p>
    <main id="main-content" class="w-full min-w-0" tabindex="-1">${PageContent(page)}</main>
    <footer id="footer" class="bg-clinic-navy text-clinic-white [&_a]:focus-visible:outline-clinic-white">${Footer({ currentPage: id })}</footer>
  `;
  return projectUrls(markup, rootPrefix);
}

function updateNavigation(root, page, rootPrefix) {
  const links = new Map(getNavigationLinks(page.id).map(link => [link.id, link.href]));
  links.set('method', './pages/the-inbody-method.html');
  for (const link of root.querySelectorAll('[data-nav-page]')) {
    link.setAttribute('href', links.get(link.dataset.navPage).replace(/^\.\//u, rootPrefix));
    if (link.dataset.navPage === page.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  for (const link of root.querySelectorAll('[data-nav-speciality]')) {
    const speciality = specialityNavigationLinks.find(item => item.id === link.dataset.navSpeciality);
    const current = speciality.id === page.specialityId ? 'page'
      : speciality.serviceIds.includes(page.serviceId) ? 'location' : null;
    if (current) link.setAttribute('aria-current', current);
    else link.removeAttribute('aria-current');
  }
}

export function mountPage(root, page, { rootPrefix = document.body.dataset.root ?? './' } = {}) {
  let layout = mountedLayouts.get(root);
  // Render before removing the current content, so render errors cannot leave a blank main.
  const markup = layout ? PageContent(page, { rootPrefix }) : PageLayout(page, { rootPrefix });
  if (layout) {
    layout.cleanup?.();
    root.querySelector('#main-content').innerHTML = markup;
    layout.navbar.close();
    updateNavigation(root, page, rootPrefix);
  } else {
    root.innerHTML = markup;
    layout = { navbar: initNavbar(root.querySelector('#navbar')) };
    mountedLayouts.set(root, layout);
  }

  document.documentElement.classList.add(...documentClasses.split(' '));
  document.body.classList.remove(...Object.values(backgroundClasses));
  document.body.classList.add(...bodyClasses.split(' '), backgroundClasses[page.background] ?? backgroundClasses.cream);
  layout.cleanup = page.init?.(root);
}

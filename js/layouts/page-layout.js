import { ContactBar, Navbar, initNavbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';

const documentClasses = 'scroll-pt-[72px] scroll-smooth tablet:scroll-pt-[76px] nav:scroll-pt-[72px] wide:scroll-pt-[76px] motion-reduce:scroll-auto';
const bodyClasses = 'font-sans text-clinic-navy antialiased [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display **:[-webkit-tap-highlight-color:transparent] **:focus-visible:outline-2 **:focus-visible:outline-offset-5 **:focus-visible:outline-clinic-navy';
const backgroundClasses = { cream: 'bg-clinic-cream', white: 'bg-clinic-white' };

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

export function PageLayout({ id, serviceId, specialityId, sections }, { rootPrefix = './' } = {}) {
  const markup = `
    <a class="fixed -top-[100px] left-4 z-100 bg-clinic-white px-[18px] py-3 text-clinic-navy focus:top-3" href="#main-content">Skip to main content</a>
    <div id="contact-bar">${ContactBar()}</div>
    <header id="navbar" class="sticky top-0 z-50 bg-clinic-white">${Navbar({ currentPage: id, serviceId, specialityId })}</header>
    <main id="main-content" class="w-full min-w-0" tabindex="-1">${sections.map(Section).join('\n')}</main>
    <footer id="footer" class="bg-clinic-navy text-clinic-white [&_a]:focus-visible:outline-clinic-white">${Footer({ currentPage: id })}</footer>
  `;
  // Sections use project-relative URLs; local #anchors stay on the current page.
  return markup.replace(/\b(href|src)="\.\/([^"\n]*)"/gu, (_, attribute, path) => `${attribute}="${rootPrefix}${path}"`);
}

export function mountPage(root, page) {
  document.documentElement.classList.add(...documentClasses.split(' '));
  document.body.classList.add(...bodyClasses.split(' '), backgroundClasses[page.background] ?? backgroundClasses.cream);
  root.innerHTML = PageLayout(page, { rootPrefix: document.body.dataset.root ?? './' });

  initNavbar(root.querySelector('#navbar'));
  page.init?.(root);

  // Section targets are created after the page module loads, so restore direct anchor links.
  if (window.location.hash) {
    let targetId;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
    }
  }
}

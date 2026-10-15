import { BookingButton, bookingHref } from './button.js';
import { icon } from './icons.js';
import { containerClasses, pagePaddingClasses } from '../layouts/container.js';
import { getNavigationLinks, serviceNavigationGroups } from '../data/navigation.js';

const contactClasses = 'inline-flex items-center gap-2 text-[9px] font-medium tablet:text-[10px] nav:text-[12px]';
const contactIconClasses = 'size-[15px] shrink-0 nav:size-[18px]';
const navLinkClasses = "relative w-fit py-[13px] whitespace-nowrap text-[14px] font-medium transition-colors duration-[160ms] hover:text-clinic-sage focus-visible:text-clinic-sage after:pointer-events-none after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none nav:py-0 nav:text-[12px] nav:after:-bottom-1.5 wide:text-[14px]";

function ServicesDropdown(serviceId) {
  return `
    <div class="min-w-0 nav:flex nav:items-center nav:self-stretch" data-services-dropdown>
      <button class="${navLinkClasses} group flex cursor-pointer items-center gap-[7px] text-left aria-expanded:text-clinic-sage aria-expanded:after:scale-x-100" type="button" id="services-toggle" aria-expanded="false" aria-controls="services-dropdown" data-services-toggle>
        Our Services ${icon('chevron', 'size-4 transition-transform duration-300 group-aria-expanded:rotate-180 motion-reduce:transition-none')}
      </button>
      <div class="invisible grid grid-rows-[0fr] opacity-0 [clip-path:inset(0_0_100%_0)] transition-[grid-template-rows,clip-path,opacity,visibility] duration-[0ms,0ms,140ms,0ms] delay-[140ms,140ms,0ms,140ms] data-[open=true]:visible data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 data-[open=true]:[clip-path:inset(0_0_0_0)] data-[open=true]:duration-[360ms,360ms,100ms,0ms] data-[open=true]:delay-0 motion-reduce:transition-none nav:absolute nav:inset-x-8 nav:top-full nav:mx-auto nav:max-w-[1120px] nav:grid-rows-[1fr] wide:inset-x-20" id="services-dropdown" data-open="false" aria-labelledby="services-toggle" aria-hidden="true" inert>
        <div class="min-h-0 overflow-hidden">
          <div class="grid min-w-0 grid-cols-1 gap-x-8 gap-y-6 rounded-[20px] border border-clinic-navy/25 bg-clinic-white px-4 py-6 text-clinic-navy tablet:grid-cols-[1.2fr_1fr] tablet:px-6 tablet:py-8 nav:max-h-[calc(100dvh-136px)] nav:overflow-y-auto nav:overscroll-contain nav:px-8 wide:grid-cols-[1.25fr_1fr_1fr_1fr] wide:gap-x-7 wide:py-10">
            ${serviceNavigationGroups.map(({ title, services }) => `
              <section class="min-w-0" aria-label="${title}">
                <h2 class="whitespace-nowrap pb-2.5 font-display text-[20px] leading-[1.2] font-medium tablet:text-[22px]">${title}</h2>
                <ul class="m-0 list-none p-0">
                  ${services.map(({ id, label, href }) => `
                    <li class="border-t border-clinic-light-grey">
                      <a class="flex min-h-11 items-center py-2.5 text-[12px] leading-[1.25] transition-colors duration-[160ms] hover:text-clinic-sage focus-visible:text-clinic-sage aria-[current=page]:font-semibold aria-[current=page]:text-clinic-sage motion-reduce:transition-none tablet:text-[13px]" href="${href ?? bookingHref}"${id && id === serviceId ? ' aria-current="page"' : ''}>${label}</a>
                    </li>
                  `).join('')}
                </ul>
              </section>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function ContactBar() {
  return `
    <div class="bg-clinic-sage text-clinic-white border-b border-[color:var(--color-clinic-light-sage)]">
      <div class="${containerClasses} flex min-h-[34px] items-center justify-center gap-[22px] tablet:min-h-10 tablet:justify-start nav:min-h-[51px] nav:gap-[34px]">
        <span class="${contactClasses}">${icon('pin', contactIconClasses)}<span>New South Wales, Double Bay</span></span>
        <a class="${contactClasses} max-tablet:hidden hover:underline hover:underline-offset-4" href="mailto:Sailainsua@gmail.com">${icon('mail', contactIconClasses)}<span>Sailainsua@gmail.com</span></a>
        <a class="${contactClasses} max-tablet:hidden hover:underline hover:underline-offset-4" href="tel:+61424912490">${icon('phone', contactIconClasses)}<span>+61 424 912 490</span></a>
      </div>
    </div>
  `;
}

export function Navbar({ currentPage = 'home', serviceId } = {}) {
  return `
    <nav class="${containerClasses} relative z-10 flex min-h-[72px] items-center justify-between gap-8 bg-clinic-white py-[7px] tablet:min-h-[76px] nav:min-h-[72px] nav:gap-5 wide:min-h-[76px] wide:gap-8" aria-label="Main navigation">
      <a class="block shrink-0" href="./" aria-label="InBody Clinic home"><img class="h-auto w-[158px] tablet:w-[170px] wide:w-[184px]" src="./assets/logo/logo.png" alt="InBody Clinic — Woman Health Clinics" width="184" height="58" /></a>
      <button class="group inline-flex size-11 cursor-pointer items-center justify-center text-clinic-navy nav:hidden" data-nav-toggle type="button" aria-label="Open navigation" aria-controls="nav-links" aria-expanded="false">${icon('menu', 'size-[25px] group-aria-expanded:hidden')}${icon('close', 'hidden size-[25px] group-aria-expanded:block')}</button>
      <div class="${pagePaddingClasses} absolute inset-x-0 top-full hidden max-h-[calc(100dvh-108px)] flex-col items-stretch gap-0 overflow-y-auto overscroll-contain bg-clinic-white pt-3 pb-6 shadow-[0_12px_20px_rgb(32_56_88/0.1)] data-[open=true]:flex tablet:max-h-[calc(100dvh-118px)] nav:static nav:flex nav:max-h-none nav:flex-row nav:items-center nav:self-stretch nav:gap-5 nav:overflow-visible nav:p-0 nav:shadow-none wide:gap-[clamp(18px,2.6vw,40px)]" id="nav-links" data-open="false">
        ${getNavigationLinks(currentPage).map(({ id, label, href }) => id === 'services' ? ServicesDropdown(serviceId) : `<a class="${navLinkClasses}" href="${href}"${id === currentPage ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        ${BookingButton('navbar')}
      </div>
    </nav>
  `;
}

export function initNavbar(element) {
  const toggle = element.querySelector('[data-nav-toggle]');
  const links = element.querySelector('#nav-links');
  const services = element.querySelector('[data-services-dropdown]');
  const servicesToggle = element.querySelector('[data-services-toggle]');
  const servicesPanel = element.querySelector('#services-dropdown');
  const desktop = window.matchMedia('(min-width: 56.3125rem)');
  let closeTimer;
  let openedByHover = false;

  const setServicesOpen = (open) => {
    window.clearTimeout(closeTimer);
    servicesToggle.setAttribute('aria-expanded', String(open));
    servicesPanel.dataset.open = String(open);
    servicesPanel.setAttribute('aria-hidden', String(!open));
    servicesPanel.inert = !open;
    if (!open) openedByHover = false;
  };

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    links.dataset.open = String(open);
    if (!open) setServicesOpen(false);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  servicesToggle.addEventListener('click', () => {
    const open = openedByHover || servicesToggle.getAttribute('aria-expanded') !== 'true';
    openedByHover = false;
    setServicesOpen(open);
  });
  services.addEventListener('pointerenter', (event) => {
    if (desktop.matches && event.pointerType === 'mouse') {
      window.clearTimeout(closeTimer);
      if (servicesToggle.getAttribute('aria-expanded') !== 'true') {
        setServicesOpen(true);
        openedByHover = true;
      }
    }
  });
  services.addEventListener('pointerleave', (event) => {
    if (desktop.matches && event.pointerType === 'mouse') {
      closeTimer = window.setTimeout(() => {
        if (!services.contains(document.activeElement)) setServicesOpen(false);
      }, 160);
    }
  });
  services.addEventListener('focusout', (event) => {
    if (!services.contains(event.relatedTarget)) setServicesOpen(false);
  });
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (servicesToggle.getAttribute('aria-expanded') === 'true') {
      setServicesOpen(false);
      servicesToggle.focus();
    } else if (toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!services.contains(event.target)) setServicesOpen(false);
    if (!element.contains(event.target)) setOpen(false);
  });
  desktop.addEventListener('change', () => setOpen(false));
}

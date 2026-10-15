import { BookingButton } from './button.js';
import { icon } from './icons.js';
import { containerClasses, pagePaddingClasses } from './layout.js';

const contactClasses = 'inline-flex items-center gap-2 text-[9px] font-medium tablet:text-[10px] nav:text-[12px]';
const contactIconClasses = 'size-[15px] shrink-0 nav:size-[18px]';
const navLinkClasses = "relative w-fit py-[13px] whitespace-nowrap text-[14px] font-medium transition-colors duration-[160ms] hover:text-clinic-sage focus-visible:text-clinic-sage after:pointer-events-none after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none nav:py-0 nav:text-[12px] nav:after:-bottom-1.5 wide:text-[14px]";

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

export function Navbar() {
  return `
    <nav class="${containerClasses} relative z-10 flex min-h-[72px] items-center justify-between gap-8 bg-clinic-white py-[7px] tablet:min-h-[76px] nav:min-h-[72px] nav:gap-5 wide:min-h-[76px] wide:gap-8" aria-label="Main navigation">
      <a class="block shrink-0" href="./" aria-label="InBody Clinic home"><img class="h-auto w-[158px] tablet:w-[170px] wide:w-[184px]" src="./assets/logo/logo.png" alt="InBody Clinic — Woman Health Clinics" width="184" height="58" /></a>
      <button class="group inline-flex size-11 cursor-pointer items-center justify-center text-clinic-navy nav:hidden" data-nav-toggle type="button" aria-label="Open navigation" aria-controls="nav-links" aria-expanded="false">${icon('menu', 'size-[25px] group-aria-expanded:hidden')}${icon('close', 'hidden size-[25px] group-aria-expanded:block')}</button>
      <div class="${pagePaddingClasses} absolute inset-x-0 top-full hidden max-h-[calc(100dvh-108px)] flex-col items-stretch gap-0 overflow-y-auto bg-clinic-white pt-3 pb-6 shadow-[0_12px_20px_rgb(32_56_88/0.1)] data-[open=true]:flex tablet:max-h-[calc(100dvh-118px)] nav:static nav:flex nav:max-h-none nav:flex-row nav:items-center nav:gap-5 nav:overflow-visible nav:p-0 nav:shadow-none wide:gap-[clamp(18px,2.6vw,40px)]" id="nav-links" data-open="false">
        <a class="${navLinkClasses}" href="#hero" aria-current="page">Home</a>
        <a class="${navLinkClasses}" href="#difference">About</a>
        <a class="${navLinkClasses} inline-flex items-center gap-[7px]" href="#services">Our Services ${icon('chevron', 'size-4')}</a>
        <a class="${navLinkClasses}" href="#difference">Our Clinic</a>
        <a class="${navLinkClasses}" href="mailto:Sailainsua@gmail.com">Contact Us</a>
        ${BookingButton('navbar')}
      </div>
    </nav>
  `;
}

export function initNavbar(element) {
  const toggle = element.querySelector('[data-nav-toggle]');
  const links = element.querySelector('#nav-links');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    links.dataset.open = String(open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!element.contains(event.target)) setOpen(false);
  });
}

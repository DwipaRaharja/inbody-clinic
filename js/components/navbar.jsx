import { useCallback, useEffect, useRef, useState } from 'react';
import { BookingButton } from './button.jsx';
import { Icon } from './icons.jsx';
import { containerClasses, pagePaddingClasses } from '../layouts/container.js';
import { getNavigationLinks, specialityNavigationLinks } from '../data/navigation.js';
import { assetUrl, siteUrl } from '../utils/urls.js';

const contactClasses = 'inline-flex items-center gap-2 text-[9px] font-medium tablet:text-[10px] nav:text-[12px]';
const contactIconClasses = 'size-[15px] shrink-0 nav:size-[18px]';
const navLinkClasses = "relative w-fit py-[13px] whitespace-nowrap text-[14px] font-medium transition-colors duration-[160ms] hover:text-clinic-sage focus-visible:text-clinic-sage after:pointer-events-none after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none nav:py-0 nav:text-[12px] nav:after:-bottom-1.5 wide:text-[14px]";

function ServicesDropdown({ serviceId, specialityId, currentPage, open, servicesRef, servicesToggleRef, onToggle, onPointerEnter, onPointerLeave, onBlur }) {
  return <div ref={servicesRef} className="min-w-0 nav:flex nav:items-center nav:self-stretch" data-services-dropdown onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
    <button ref={servicesToggleRef} className={`${navLinkClasses} group flex cursor-pointer items-center gap-[7px] text-left aria-expanded:text-clinic-sage aria-expanded:after:scale-x-100`} type="button" id="services-toggle" aria-expanded={open} aria-controls="services-dropdown" data-services-toggle data-nav-intro onClick={onToggle}>
      Our Services <Icon name="chevron" className="size-4 transition-transform duration-300 group-aria-expanded:rotate-180 motion-reduce:transition-none" />
    </button>
    <div className="invisible grid grid-rows-[0fr] opacity-0 [clip-path:inset(0_0_100%_0)] transition-[grid-template-rows,clip-path,opacity,visibility] duration-[0ms,0ms,140ms,0ms] delay-[140ms,140ms,0ms,140ms] data-[open=true]:visible data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 data-[open=true]:[clip-path:inset(0_0_0_0)] data-[open=true]:duration-[360ms,360ms,100ms,0ms] data-[open=true]:delay-0 motion-reduce:transition-none nav:absolute nav:inset-x-8 nav:top-full nav:mx-auto nav:max-w-[1120px] nav:grid-rows-[1fr] wide:inset-x-20" id="services-dropdown" data-open={String(open)} aria-labelledby="services-toggle" aria-hidden={!open} inert={!open}>
      <div className="min-h-0 overflow-hidden">
        <div className="min-w-0 rounded-[20px] border border-clinic-navy/25 bg-clinic-white px-4 py-5 text-clinic-navy tablet:px-6 tablet:py-6 nav:max-h-[calc(100dvh-136px)] nav:overflow-y-auto nav:overscroll-contain nav:px-8">
          <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-0 p-0 tablet:grid-cols-2 wide:grid-cols-3">
            {specialityNavigationLinks.map(speciality => {
              const current = speciality.id === specialityId ? 'page' : speciality.serviceIds.includes(serviceId) ? 'location' : undefined;
              return <li key={speciality.id} className="min-w-0 border-b border-clinic-light-grey"><a className="group flex min-h-[100px] items-center justify-between gap-4 py-4 transition-colors hover:text-clinic-sage aria-[current=page]:text-clinic-sage aria-[current=location]:text-clinic-sage motion-reduce:transition-none" data-nav-speciality={speciality.id} href={siteUrl(speciality.href)} aria-current={current}>
                <span className="min-w-0"><span className="block font-display text-[22px] leading-[1.15] font-semibold">{speciality.name}</span><span className="mt-2 block text-[11px] leading-[1.5] text-clinic-navy/70">{speciality.question}</span></span>
                <i className="ph ph-arrow-up-right shrink-0 text-[20px] text-clinic-sage transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </a></li>;
            })}
          </ul>
          <a className="mt-5 inline-flex min-h-10 items-center gap-3 text-[12px] font-medium text-clinic-navy hover:text-clinic-sage" data-nav-page="method" href={siteUrl('./pages/the-inbody-method.html')} aria-current={currentPage === 'method' ? 'page' : undefined}>Our approach: The InBody Method™<i className="ph ph-arrow-right text-[17px]" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </div>;
}

export function ContactBar() {
  return <div className="relative isolate text-clinic-white border-b border-[color:var(--color-clinic-light-sage)]">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-clinic-sage" data-contact-background aria-hidden="true" />
    <div className={`${containerClasses} flex min-h-[34px] items-center justify-center gap-[22px] tablet:min-h-10 tablet:justify-start nav:min-h-[51px] nav:gap-[34px]`}>
      <span className={contactClasses} data-contact-item><Icon name="pin" className={contactIconClasses} /><span>New South Wales, Double Bay</span></span>
      <a className={`${contactClasses} max-tablet:hidden hover:underline hover:underline-offset-4`} href="mailto:Sailainsua@gmail.com" data-contact-item><Icon name="mail" className={contactIconClasses} /><span>Sailainsua@gmail.com</span></a>
      <a className={`${contactClasses} max-tablet:hidden hover:underline hover:underline-offset-4`} href="tel:+61424912490" data-contact-item><Icon name="phone" className={contactIconClasses} /><span>+61 424 912 490</span></a>
    </div>
  </div>;
}

export function Navbar({ currentPage = 'home', serviceId, specialityId } = {}) {
  const [open, updateOpen] = useState(false);
  const [servicesOpen, updateServicesOpen] = useState(false);
  const navbarRef = useRef(null);
  const toggleRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesToggleRef = useRef(null);
  const desktopRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openedByHoverRef = useRef(false);

  const setServicesOpen = useCallback((nextOpen) => {
    clearTimeout(closeTimerRef.current);
    updateServicesOpen(nextOpen);
    if (!nextOpen) openedByHoverRef.current = false;
  }, []);

  const setOpen = useCallback((nextOpen) => {
    updateOpen(nextOpen);
    if (!nextOpen) setServicesOpen(false);
  }, [setServicesOpen]);

  useEffect(() => {
    setOpen(false);
  }, [currentPage, serviceId, specialityId, setOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 56.3125rem)');
    desktopRef.current = desktop;
    const onResize = () => setOpen(false);
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (servicesToggleRef.current?.getAttribute('aria-expanded') === 'true') {
        setServicesOpen(false);
        servicesToggleRef.current.focus();
      } else if (toggleRef.current?.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggleRef.current.focus();
      }
    };
    const onDocumentClick = (event) => {
      if (!servicesRef.current?.contains(event.target)) setServicesOpen(false);
      if (!navbarRef.current?.contains(event.target)) setOpen(false);
    };

    desktop.addEventListener('change', onResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onDocumentClick);
    return () => {
      clearTimeout(closeTimerRef.current);
      desktop.removeEventListener('change', onResize);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocumentClick);
      desktopRef.current = null;
    };
  }, [setOpen, setServicesOpen]);

  const toggleServices = () => {
    const nextOpen = openedByHoverRef.current || !servicesOpen;
    openedByHoverRef.current = false;
    setServicesOpen(nextOpen);
  };
  const enterServices = (event) => {
    if (desktopRef.current?.matches && event.pointerType === 'mouse') {
      clearTimeout(closeTimerRef.current);
      if (!servicesOpen) {
        setServicesOpen(true);
        openedByHoverRef.current = true;
      }
    }
  };
  const leaveServices = (event) => {
    if (desktopRef.current?.matches && event.pointerType === 'mouse') {
      closeTimerRef.current = setTimeout(() => {
        if (!servicesRef.current?.contains(document.activeElement)) setServicesOpen(false);
      }, 160);
    }
  };
  const blurServices = (event) => {
    if (!servicesRef.current?.contains(event.relatedTarget)) setServicesOpen(false);
  };
  const closeOnNavigation = (event) => {
    if (event.target.closest('a')) setOpen(false);
  };

  return <nav ref={navbarRef} className={`${containerClasses} relative z-10 flex min-h-[72px] items-center justify-between gap-8 bg-clinic-white py-[7px] tablet:min-h-[76px] nav:min-h-[72px] nav:gap-5 wide:min-h-[76px] wide:gap-8`} aria-label="Main navigation" onClick={closeOnNavigation}>
    <a className="block shrink-0" href={siteUrl('./')} aria-label="InBody Clinic home"><img className="h-auto w-[158px] tablet:w-[170px] wide:w-[184px]" src={assetUrl('./assets/logo/logo.png')} alt="InBody Clinic — Woman Health Clinics" width="184" height="58" /></a>
    <button ref={toggleRef} className="group inline-flex size-11 cursor-pointer items-center justify-center text-clinic-navy nav:hidden" data-nav-toggle data-nav-intro type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="nav-links" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="menu" className="size-[25px] group-aria-expanded:hidden" /><Icon name="close" className="hidden size-[25px] group-aria-expanded:block" /></button>
    <div className={`${pagePaddingClasses} absolute inset-x-0 top-full hidden max-h-[calc(100dvh-108px)] flex-col items-stretch gap-0 overflow-y-auto overscroll-contain bg-clinic-white pt-3 pb-6 shadow-[0_12px_20px_rgb(32_56_88/0.1)] data-[open=true]:flex tablet:max-h-[calc(100dvh-118px)] nav:static nav:flex nav:max-h-none nav:flex-row nav:items-center nav:self-stretch nav:gap-5 nav:overflow-visible nav:p-0 nav:shadow-none wide:gap-[clamp(18px,2.6vw,40px)]`} id="nav-links" data-open={String(open)}>
      {getNavigationLinks(currentPage).map(({ id, label, href }) => id === 'services'
        ? <ServicesDropdown key={id} serviceId={serviceId} specialityId={specialityId} currentPage={currentPage} open={servicesOpen} servicesRef={servicesRef} servicesToggleRef={servicesToggleRef} onToggle={toggleServices} onPointerEnter={enterServices} onPointerLeave={leaveServices} onBlur={blurServices} />
        : <a key={id} className={navLinkClasses} data-nav-page={id} data-nav-intro href={siteUrl(href)} aria-current={id === currentPage ? 'page' : undefined}>{label}</a>)}
      <BookingButton variant="navbar" />
    </div>
  </nav>;
}

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { ContactBar, Navbar } from '../js/components/navbar.jsx';
import { Footer } from '../js/components/footer.jsx';
import { siteUrl, stripBase } from '../js/utils/urls.js';
import { getRoute, normalizePath } from './routes.js';
import { getPage } from './pages.jsx';
import { documentClasses, bodyClasses, backgroundClasses } from './theme.js';
import { initHeaderEntrance } from '../js/features/header-entrance.js';

const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const scrollPositions = new Map();

function PageSections({ page }) {
  if (!page) return <section className="mx-auto max-w-[1440px] px-8 py-20 tablet:px-20" aria-labelledby="not-found-title">
    <h1 id="not-found-title" className="font-display text-[2.5rem] font-semibold">Page not found</h1>
    <p className="mt-5">The page you are looking for is unavailable.</p>
    <a className="mt-6 inline-block underline" href={siteUrl('./')}>Return to Home</a>
  </section>;
  return page.sections.map(({ id, className, labelledBy, label, render: Content }) => <section key={id} id={id} className={className} aria-labelledby={labelledBy} aria-label={label}>
    <Content />
  </section>);
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const mainRef = useRef(null);
  const entryRef = useRef(location.key);
  const initialRef = useRef(true);
  const route = getRoute(location.pathname);
  const page = useMemo(() => route ? getPage(route) : null, [route]);
  const pageId = route?.pageId ?? 'not-found';
  const title = route?.title ?? 'Page not found | InBody Clinic';
  const description = route?.description ?? 'Find specialised care and contact information at InBody Clinic.';

  useEffect(() => {
    document.getElementById('app').dataset.hydrated = 'true';
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const rememberScroll = () => scrollPositions.set(entryRef.current, { x: window.scrollX, y: window.scrollY });
    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.hasAttribute('data-full-reload')) return;
      const url = new URL(link.href);
      const path = stripBase(url.pathname);
      if (url.origin !== window.location.origin || path === null || !getRoute(path)) return;
      event.preventDefault();
      rememberScroll();
      const destination = normalizePath(path) + url.search + url.hash;
      const current = normalizePath(stripBase(window.location.pathname)) + window.location.search + window.location.hash;
      if (destination === current) {
        const target = findAnchor(url.hash);
        if (target) {
          target.focus({ preventScroll: true });
          target.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }
      navigate(destination);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', rememberScroll, { passive: true });
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', rememberScroll);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [navigate]);

  useBrowserLayoutEffect(() => page?.init?.(mainRef.current), [page]);
  useBrowserLayoutEffect(() => initHeaderEntrance(document.getElementById('app')), []);

  useBrowserLayoutEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    for (const [name, value] of Object.entries({ page: pageId, service: route?.serviceId, speciality: route?.specialityId })) {
      if (value === undefined) delete document.body.dataset[name];
      else document.body.dataset[name] = value;
    }
    document.documentElement.className = documentClasses;
    document.body.className = `${bodyClasses} ${backgroundClasses[page?.background] ?? backgroundClasses.cream}`;
    const initial = initialRef.current;
    initialRef.current = false;
    entryRef.current = location.key;
    const position = navigationType === 'POP' ? scrollPositions.get(location.key) : null;
    if (!initial) mainRef.current.focus({ preventScroll: true });
    if (position) window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
    else if (location.hash) {
      const target = findAnchor(location.hash);
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (!initial) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    scrollPositions.set(location.key, { x: window.scrollX, y: window.scrollY });
  }, [location, navigationType, page, pageId, title, description, route]);

  return <>
    <a className="fixed -top-[100px] left-4 z-100 bg-clinic-white px-[18px] py-3 text-clinic-navy focus:top-3" href="#main-content">Skip to main content</a>
    <div id="contact-bar"><ContactBar /></div>
    <header id="navbar" className="sticky top-0 z-50 bg-clinic-white"><Navbar currentPage={pageId} serviceId={route?.serviceId} specialityId={route?.specialityId} /></header>
    <p id="navigation-status" className="sr-only" role="status" aria-live="polite" aria-atomic="true">{initialRef.current ? '' : `${title} loaded.`}</p>
    <main ref={mainRef} id="main-content" className="w-full min-w-0" tabIndex={-1}>
      <PageSections key={route?.path ?? location.pathname} page={page} />
    </main>
    <footer id="footer" className="bg-clinic-navy text-clinic-white [&_a]:focus-visible:outline-clinic-white"><Footer currentPage={pageId} /></footer>
  </>;
}

function findAnchor(hash) {
  if (!hash) return null;
  try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
}

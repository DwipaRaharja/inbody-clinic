import { mountPage } from './layouts/page-layout.js';

function readEntry(source) {
  return {
    data: { ...source.body.dataset },
    title: source.title,
    description: source.querySelector('meta[name="description"]')?.content ?? '',
  };
}

export async function startNavigation({ root, loadPage, siteRoot }) {
  const rootPrefix = siteRoot.pathname;
  const entries = new Map();
  const positions = new Map();
  let currentUrl = new URL(window.location.href);
  let sequence = 0;
  let entryNumber = 0;
  let pending = null;
  let currentEntry = history.state?.inbody?.id ?? newEntryId();

  function newEntryId() {
    return `${Date.now()}-${++entryNumber}`;
  }

  function pageKey(url) {
    const path = url.pathname === `${rootPrefix}index.html` ? rootPrefix : url.pathname;
    return path + url.search;
  }

  function isInternalPage(url) {
    return url.origin === siteRoot.origin && (url.pathname === rootPrefix
      || url.pathname === `${rootPrefix}index.html`
      || (url.pathname.startsWith(`${rootPrefix}pages/`) && url.pathname.endsWith('.html')));
  }

  function rememberScroll() {
    if (!pending) positions.set(currentEntry, { x: window.scrollX, y: window.scrollY });
  }

  function replaceEntry(position = positions.get(currentEntry)) {
    history.replaceState({ ...history.state, inbody: { id: currentEntry, position } }, '');
  }

  function applyMetadata(entry) {
    document.title = entry.title;
    document.querySelector('meta[name="description"]').content = entry.description;
    for (const name of ['page', 'service', 'speciality', 'root']) {
      if (entry.data[name] === undefined) delete document.body.dataset[name];
      else document.body.dataset[name] = entry.data[name];
    }
  }

  function setBusy(busy) {
    root.querySelector('#main-content').setAttribute('aria-busy', String(busy));
    root.querySelector('#navigation-status').textContent = busy ? 'Loading page…' : `${document.title} loaded.`;
  }

  function positionPage(url, { position, initial = false } = {}) {
    // Commit scroll with the content, before late scroll events can update this history entry.
    if (!initial) root.querySelector('#main-content').focus({ preventScroll: true });
    if (position) {
      window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
    } else if (url.hash) {
      let target;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { /* Invalid hash. */ }
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (!initial) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    positions.set(currentEntry, { x: window.scrollX, y: window.scrollY });
  }

  async function getEntry(url, signal) {
    const key = pageKey(url);
    if (entries.has(key)) return entries.get(key);
    const destination = new URL(url);
    destination.hash = '';
    const response = await fetch(destination, { signal });
    if (!response.ok || !isInternalPage(new URL(response.url))) throw new Error(`Unable to load ${destination.pathname}`);
    const source = new DOMParser().parseFromString(await response.text(), 'text/html');
    if (!source.querySelector('#app') || !source.body.dataset.page || !source.title) {
      throw new Error('The destination is not a clinic page.');
    }
    const entry = readEntry(source);
    entries.set(key, entry);
    return entry;
  }

  async function navigate(url, { traversal = false, state } = {}) {
    rememberScroll();
    const request = ++sequence;
    pending?.abort();
    const controller = new AbortController();
    pending = controller;
    if (traversal) currentEntry = state?.inbody?.id ?? newEntryId();
    const position = traversal ? positions.get(currentEntry) ?? state?.inbody?.position : null;
    setBusy(true);
    try {
      if (pageKey(url) !== pageKey(currentUrl)) {
        const entry = await getEntry(url, controller.signal);
        const page = await loadPage(entry.data);
        if (request !== sequence) return;
        mountPage(root, page, { rootPrefix });
        applyMetadata(entry);
      }
      if (request !== sequence) return;
      if (!traversal && url.href !== window.location.href) {
        replaceEntry();
        currentEntry = newEntryId();
        history.pushState({ inbody: { id: currentEntry } }, '', url);
      } else if (traversal) {
        replaceEntry(position);
      }
      currentUrl = new URL(url);
      positionPage(url, { position });
    } catch (error) {
      if (request !== sequence) return;
      console.error('Unable to navigate; opening the original HTML page.', error);
      // Each route still has a real HTML file, including on GitHub Pages.
      if (traversal) window.location.replace(url.href);
      else window.location.assign(url.href);
    } finally {
      if (request === sequence) {
        pending = null;
        setBusy(false);
      }
    }
  }

  const initial = readEntry(document);
  const page = await loadPage(initial.data);
  // Relative head resources must keep their original URL when pushState changes the path.
  for (const resource of document.querySelectorAll('link[href], script[src]')) {
    const attribute = resource.tagName === 'LINK' ? 'href' : 'src';
    resource.setAttribute(attribute, new URL(resource.getAttribute(attribute), currentUrl).href);
  }
  mountPage(root, page, { rootPrefix });
  entries.set(pageKey(currentUrl), initial);
  history.scrollRestoration = 'manual';
  replaceEntry(history.state?.inbody?.position);
  positionPage(currentUrl, { initial: true, position: history.state?.inbody?.position });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.hasAttribute('data-full-reload')) return;
    const url = new URL(link.href);
    if (!isInternalPage(url)) return;
    event.preventDefault();
    void navigate(url);
  });
  window.addEventListener('popstate', (event) => {
    const url = new URL(window.location.href);
    if (isInternalPage(url)) void navigate(url, { traversal: true, state: event.state });
    else window.location.reload();
  });
  window.addEventListener('scroll', rememberScroll, { passive: true });
  window.addEventListener('pagehide', () => {
    rememberScroll();
    replaceEntry();
  });
}

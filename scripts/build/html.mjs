import { createSeoTags } from './seo.mjs';
import { escapeHtml } from './utils.mjs';

// Fill the Vite shell with server-rendered markup and its route metadata.
export function renderPageHtml({ template, html, path, route, documentClasses, bodyClasses, siteBaseUrl }) {
  const attributes = { class: bodyClasses, 'data-page': route?.pageId ?? 'not-found' };
  if (route?.serviceId) attributes['data-service'] = route.serviceId;
  if (route?.specialityId) attributes['data-speciality'] = route.specialityId;

  const pageTitle = route?.title ?? 'Page not found | InBody Clinic';
  const pageDescription = route?.description ?? 'Find specialised care and contact information at InBody Clinic.';
  const seoTags = createSeoTags({ route, path, siteBaseUrl, pageTitle, pageDescription });

  return template
    .replace('<!--app-html-->', () => html)
    .replace('<!--app-route-->', () => [`<meta name="app-route" content="${escapeHtml(path)}" />`, ...seoTags].join('\n  '))
    .replace(/<title>[\s\S]*?<\/title>/u, () => `<title>${escapeHtml(pageTitle)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/u, () => `<meta name="description" content="${escapeHtml(pageDescription)}" />`)
    .replace('<html lang="en">', () => `<html lang="en" class="${escapeHtml(documentClasses)}">`)
    .replace(/<body[^>]*>/u, () => `<body ${Object.entries(attributes).map(([name, value]) => `${name}="${escapeHtml(value)}"`).join(' ')}>`);
}

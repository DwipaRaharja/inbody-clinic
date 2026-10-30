import { clinicContact, clinicMapUrl } from '../../js/data/clinic-contact.js';
import { escapeHtml } from './utils.mjs';

function createClinicJsonLd(siteBaseUrl) {
  const clinic = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteBaseUrl}/#clinic`,
    name: 'InBody Clinic',
    url: `${siteBaseUrl}/`,
    logo: `${siteBaseUrl}/assets/images/png/logo/site_logo.png`,
    telephone: clinicContact.phoneHref.replace(/^tel:/u, ''),
    email: clinicContact.email,
    address: { '@type': 'PostalAddress', ...clinicContact.structuredAddress },
    openingHoursSpecification: clinicContact.structuredHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      ...hours,
    })),
    hasMap: clinicMapUrl,
    medicalSpecialty: 'https://schema.org/Physiotherapy',
  };

  return `<script type="application/ld+json">${JSON.stringify(clinic).replace(/</gu, '\\u003c')}</script>`;
}

// Produce route-specific crawler metadata. Unknown routes receive only the
// noindex directive; they must not claim a canonical URL or clinic entity.
export function createSeoTags({ route, path, siteBaseUrl, pageTitle, pageDescription }) {
  if (!route) return ['<meta name="robots" content="noindex, follow" />'];

  const canonical = `${siteBaseUrl}${path}`;
  const configuredOgImage = route.ogImage ?? '/assets/images/png/logo/site_logo.png';
  const ogImage = /^https?:\/\//iu.test(configuredOgImage)
    ? configuredOgImage
    : `${siteBaseUrl}/${configuredOgImage.replace(/^\/+/, '')}`;

  return [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="InBody Clinic" />',
    `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(pageDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(pageDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    createClinicJsonLd(siteBaseUrl),
  ];
}

import { specialityCatalog } from './specialities/catalog.js';

export const specialityNavigationLinks = specialityCatalog.map(speciality => ({
  ...speciality,
  name: speciality.id === 'skin-tissue-health' ? 'Cellulite & Tissue Remodelling' : speciality.name,
  href: speciality.bookingHref,
}));

const navigationLinks = [
  { id: 'home', label: 'Home', href: './' },
  { id: 'about', label: 'About', href: './pages/about.html' },
  { id: 'services', label: 'Our Services', footerLabel: 'Our Service', anchor: '#services', chevron: true },
  { id: 'clinic', label: 'Our Clinic', href: './pages/our-clinic.html' },
  { id: 'contact', label: 'Contact Us', href: './pages/contact.html' },
];

export const serviceNavigationGroups = [
  {
    title: 'Pregnancy & Postpartum',
    services: [
      { id: 'pregnancy-massage-circulation-support', label: 'Pregnancy Massage & Circulation Support', href: './pages/services/pregnancy-postpartum/pregnancy-massage-circulation-support.html' },
      { id: 'recovery-core-restoration', label: 'Recovery & Core Restoration', href: './pages/services/pregnancy-postpartum/recovery-core-restoration.html' },
      { id: 'postnatal-lymphatic-drainage', label: 'Postnatal Lymphatic Drainage', href: './pages/services/pregnancy-postpartum/postnatal-lymphatic-drainage.html' },
    ],
  },
  {
    title: 'Lymphatic Drainage',
    services: [
      { id: 'post-surgical-recovery', label: 'Post-Surgical Recovery', href: './pages/services/lymphatic-drainage/post-surgical-recovery.html' },
      { id: 'clinical-lymphatic-drainage-sydney', label: 'Advanced Lymphatic Therapy', href: './pages/services/lymphatic-drainage/clinical-lymphatic-drainage-sydney.html' },
      { id: 'lipedema-inflammatory-leg-care', label: 'Lipedema & Inflammatory Leg Care', href: './pages/services/lymphatic-drainage/lipedema-inflammatory-leg-care.html' },
    ],
  },
  {
    title: 'Pain & TMJ Relief',
    services: [
      { id: 'tmj-jaw-headache-treatment', label: 'TMJ, Jaw & Headache Treatment', href: './pages/services/pain-tmj-relief/tmj-jaw-headache-treatment.html' },
      { id: 'chronic-pain-stress-inflammation', label: 'Chronic Pain, Stress & Inflammation', href: './pages/services/pain-tmj-relief/chronic-pain-stress-inflammation.html' },
      { id: 'clinical-therapeutic-massage-injury-recovery', label: 'Clinical Therapeutic Massage & Injury Recovery', href: './pages/services/pain-tmj-relief/clinical-therapeutic-massage-injury-recovery.html' },
      { id: 'endometriosis-pelvic-pain-support', label: 'Endometriosis & Pelvic Pain Support', href: './pages/services/pain-tmj-relief/endometriosis-pelvic-pain-support.html' },
    ],
  },
  {
    title: 'Body Contouring',
    services: [
      { id: 'clinical-cellulite-remodelling', label: 'Clinical Cellulite Remodelling', href: './pages/services/body-contouring/clinical-cellulite-remodelling.html' },
      { id: 'lymphatic-reset-fluid-retention-treatment', label: 'Lymphatic Reset & Fluid Retention Treatment', href: './pages/services/body-contouring/lymphatic-reset-fluid-retention-treatment.html' },
    ],
  },
];

export function getNavigationLinks(currentPage = 'home') {
  return navigationLinks.map(({ anchor, ...link }) => ({
    ...link,
    href: anchor ? `${currentPage === 'home' ? '' : './'}${anchor}` : link.href,
  }));
}

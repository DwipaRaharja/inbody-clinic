const navigationLinks = [
  { id: 'home', label: 'Home', href: './' },
  { id: 'about', label: 'About', href: './about.html' },
  { id: 'services', label: 'Our Services', footerLabel: 'Our Service', anchor: '#services', chevron: true },
  { id: 'clinic', label: 'Our Clinic', href: './our-clinic.html' },
  { id: 'contact', label: 'Contact Us', href: './contact.html' },
];

export const serviceNavigationGroups = [
  {
    title: 'Pregnancy & Postpartum',
    services: [
      { id: 'pregnancy-massage-circulation-support', label: 'Pregnancy Massage & Circulation Support', href: './pregnancy-massage-circulation-support.html' },
      { id: 'recovery-core-restoration', label: 'Recovery & Core Restoration', href: './recovery-core-restoration.html' },
      { id: 'postnatal-lymphatic-drainage', label: 'Postnatal Lymphatic Drainage', href: './postnatal-lymphatic-drainage.html' },
    ],
  },
  {
    title: 'Lymphatic Drainage',
    services: [
      { id: 'post-surgical-recovery', label: 'Post-Surgical Recovery', href: './post-surgical-recovery.html' },
      { id: 'clinical-lymphatic-drainage-sydney', label: 'Clinical Lymphatic Drainage Sydney', href: './clinical-lymphatic-drainage-sydney.html' },
      { id: 'lipedema-inflammatory-leg-care', label: 'Lipedema & Inflammatory Leg Care', href: './lipedema-inflammatory-leg-care.html' },
    ],
  },
  {
    title: 'Pain & TMJ Relief',
    services: [
      { id: 'tmj-jaw-headache-treatment', label: 'TMJ, Jaw & Headache Treatment', href: './tmj-jaw-headache-treatment.html' },
      { id: 'chronic-pain-stress-inflammation', label: 'Chronic Pain, Stress & Inflammation', href: './chronic-pain-stress-inflammation.html' },
      { id: 'clinical-therapeutic-massage-injury-recovery', label: 'Clinical Therapeutic Massage & Injury Recovery', href: './clinical-therapeutic-massage-injury-recovery.html' },
      { id: 'endometriosis-pelvic-pain-support', label: 'Endometriosis & Pelvic Pain Support', href: './endometriosis-pelvic-pain-support.html' },
    ],
  },
  {
    title: 'Body Contouring',
    services: [
      { id: 'clinical-cellulite-remodelling', label: 'Clinical Cellulite Remodelling', href: './clinical-cellulite-remodelling.html' },
      { id: 'lymphatic-reset-fluid-retention-treatment', label: 'Lymphatic Reset & Fluid Retention Treatment', href: './lymphatic-reset-fluid-retention-treatment.html' },
      { id: 'hormonal-skin-tightening-firmness-treatment', label: 'Hormonal Skin Tightening & Firmness Treatment', href: './hormonal-skin-tightening-firmness-treatment.html' },
    ],
  },
];

export function getNavigationLinks(currentPage = 'home') {
  return navigationLinks.map(({ anchor, ...link }) => ({
    ...link,
    href: anchor ? `${currentPage === 'home' ? '' : './'}${anchor}` : link.href,
  }));
}

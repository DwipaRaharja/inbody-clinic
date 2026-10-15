const navigationLinks = [
  { id: 'home', label: 'Home', href: './' },
  { id: 'about', label: 'About', href: './about.html' },
  { id: 'services', label: 'Our Services', footerLabel: 'Our Service', anchor: '#services', chevron: true },
  { id: 'clinic', label: 'Our Clinic', anchor: '#difference' },
  { id: 'contact', label: 'Contact Us', href: './contact.html' },
];

export const serviceNavigationGroups = [
  {
    title: 'Pregnancy & Postpartum',
    services: [
      { id: 'pregnancy-massage-circulation-support', label: 'Pregnancy Massage & Circulation Support', href: './pregnancy-massage-circulation-support.html' },
      { label: 'Recovery & Core Restoration' },
      { label: 'Postnatal Lymphatic Drainage' },
    ],
  },
  {
    title: 'Lymphatic Drainage',
    services: [
      { label: 'Post-Surgical Recovery' },
      { label: 'Clinical Lymphatic Drainage Sydney' },
      { label: 'Lipedema & Inflammatory Leg Care' },
    ],
  },
  {
    title: 'Pain & TMJ Relief',
    services: [
      { label: 'TMJ, Jaw & Headache Treatment' },
      { label: 'Chronic Pain, Stress & Inflammation' },
      { label: 'Clinical Therapeutic Massage & Injury Recovery' },
      { label: 'Endometriosis & Pelvic Pain Support' },
    ],
  },
  {
    title: 'Body Contouring',
    services: [
      { label: 'Clinical Cellulite Remodelling' },
      { label: 'Lymphatic Reset & Fluid Retention Treatment' },
      { label: 'Hormonal Skin Tightening & Firmness Treatment' },
    ],
  },
];

export function getNavigationLinks(currentPage = 'home') {
  return navigationLinks.map(({ anchor, ...link }) => ({
    ...link,
    href: anchor ? `${currentPage === 'home' ? '' : './'}${anchor}` : link.href,
  }));
}

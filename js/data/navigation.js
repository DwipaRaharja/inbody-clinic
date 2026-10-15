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
      'Pregnancy Massage & Circulation Support',
      'Recovery & Core Restoration',
      'Postnatal Lymphatic Drainage',
    ],
  },
  {
    title: 'Lymphatic Drainage',
    services: [
      'Post-Surgical Recovery',
      'Clinical Lymphatic Drainage Sydney',
      'Lipedema & Inflammatory Leg Care',
    ],
  },
  {
    title: 'Pain & TMJ Relief',
    services: [
      'TMJ, Jaw & Headache Treatment',
      'Chronic Pain, Stress & Inflammation',
      'Clinical Therapeutic Massage & Injury Recovery',
      'Endometriosis & Pelvic Pain Support',
    ],
  },
  {
    title: 'Body Contouring',
    services: [
      'Clinical Cellulite Remodelling',
      'Lymphatic Reset & Fluid Retention Treatment',
      'Hormonal Skin Tightening & Firmness Treatment',
    ],
  },
];

export function getNavigationLinks(currentPage = 'home') {
  return navigationLinks.map(({ anchor, ...link }) => ({
    ...link,
    href: anchor ? `${currentPage === 'home' ? '' : './'}${anchor}` : link.href,
  }));
}

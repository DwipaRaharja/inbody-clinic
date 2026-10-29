import { specialityBookingLinks } from './booking.js';

const catalog = [
  {
    id: 'pre-post-surgical-recovery',
    name: 'Pre & Post-Surgical Recovery',
    question: 'Recovering from surgery?',
    summary: 'Individual care for swelling, scars and tissue recovery before and after surgery.',
    icon: 'ph-first-aid-kit',
    serviceIds: ['post-surgical-recovery'],
  },
  {
    id: 'clinical-lymphatic-care',
    name: 'Clinical Lymphatic Care',
    question: 'Experiencing swelling or heavy legs?',
    summary: 'Specialised lymphatic therapy for swelling, fluid retention and lymphatic-related symptoms.',
    icon: 'ph-leaf',
    serviceIds: ['clinical-lymphatic-drainage-sydney', 'lymphatic-reset-fluid-retention-treatment'],
  },
  {
    id: 'lipedema-lymphoedema-oncology-care',
    name: 'Lipedema, Lymphoedema & Oncology Care',
    question: 'Living with lipedema?',
    summary: 'Conservative support for lipedema, lymphoedema and cancer-related lymphatic symptoms.',
    icon: 'body-contour', svg: true,
    serviceIds: ['lipedema-inflammatory-leg-care'],
  },
  {
    id: 'pregnancy-postpartum-care',
    name: 'Pregnancy & Postpartum Care',
    question: 'Pregnant or recovering after childbirth?',
    summary: 'Personalised support for pregnancy discomfort, swelling, scar care and postpartum recovery.',
    icon: 'pregnancy', svg: true,
    serviceIds: ['pregnancy-massage-circulation-support', 'recovery-core-restoration', 'postnatal-lymphatic-drainage'],
  },
  {
    id: 'tmj-pain-stress-care',
    name: 'TMJ, Pain & Stress Care',
    question: 'Struggling with jaw pain or muscular tension?',
    summary: 'Specialised hands-on care for jaw discomfort, muscular tension and stress-related physical symptoms.',
    icon: 'ph-heartbeat',
    serviceIds: ['tmj-jaw-headache-treatment', 'chronic-pain-stress-inflammation', 'clinical-therapeutic-massage-injury-recovery'],
  },
  {
    id: 'skin-tissue-health',
    name: 'Skin & Tissue Health',
    homeName: 'Cellulite & Tissue remodelling',
    question: 'Concerned about cellulite or tissue changes?',
    summary: 'Clinical care for cellulite, skin texture and changes in connective tissue quality.',
    iconAsset: 'cellulite-remodelling',
    serviceIds: ['clinical-cellulite-remodelling'],
  },
];

export const specialityCatalog = catalog.map(speciality => ({
  ...speciality,
  href: `./pages/specialities/${speciality.id}.html`,
  bookingHref: specialityBookingLinks[speciality.id],
}));

export function getSpecialityForService(serviceId) {
  return specialityCatalog.find(speciality => speciality.serviceIds.includes(serviceId)) ?? null;
}

// Verified against the public Fresha booking flow on 22 October 2026.
// Keep service-specific selection separate from the broader speciality links.
const bookingPage = 'https://www.fresha.com/a/inbody-clinic-womens-health-clinical-lymphatic-care-double-bay-sydney-double-bay-level-1-336-new-south-head-rd-new-south-head-road-spgbnjt8/booking';

const appointments = {
  pregnancy: { offerItemId: '26998157', name: 'Pregnancy Care', durationMinutes: 60 },
  postpartum: { offerItemId: '24481861', name: 'Postpartum Recovery', durationMinutes: 75 },
  surgery: { offerItemId: '29617756', name: 'Pre & Post-Surgical Recovery | 60 min', durationMinutes: 60 },
  lymphatic: { offerItemId: '29617377', name: 'Advanced Lymphatic Therapy | 60 min', durationMinutes: 60 },
  lipedema: { offerItemId: '26068782', name: 'Lymphatic Clinical Management | 60 min', durationMinutes: 60 },
  tmj: { offerItemId: '24480917', name: 'TMJ Therapy – Jaw, Neck & Headache Relief', durationMinutes: 60 },
  myofascial: { offerItemId: '25827155', name: 'Myofascial Pain, Stress & Tension Recovery | 60 min', durationMinutes: 60 },
  massage: { offerItemId: '29742779', name: 'Remedial Massage | Integrated Clinical Bodywork – 60 min', durationMinutes: 60 },
  pelvic: { offerItemId: '26131923', name: 'Pelvic & Abdominal Therapy', durationMinutes: 60 },
  // Fresha currently displays a 70-minute duration for this listing.
  cellulite: { offerItemId: '29617957', name: 'Cellulite & Tissue remodelling', durationMinutes: 70 },
};

const serviceAppointments = {
  'pregnancy-massage-circulation-support': 'pregnancy',
  'recovery-core-restoration': 'postpartum',
  'postnatal-lymphatic-drainage': 'postpartum',
  'post-surgical-recovery': 'surgery',
  'clinical-lymphatic-drainage-sydney': 'lymphatic',
  'lipedema-inflammatory-leg-care': 'lipedema',
  'tmj-jaw-headache-treatment': 'tmj',
  'chronic-pain-stress-inflammation': 'myofascial',
  'clinical-therapeutic-massage-injury-recovery': 'massage',
  'endometriosis-pelvic-pain-support': 'pelvic',
  'clinical-cellulite-remodelling': 'cellulite',
  'lymphatic-reset-fluid-retention-treatment': 'lymphatic',
};

export const serviceBookings = Object.fromEntries(Object.entries(serviceAppointments).map(([serviceId, appointmentId]) => {
  const appointment = appointments[appointmentId];
  return [serviceId, {
    ...appointment,
    href: `${bookingPage}?offerItems=sv%3A${appointment.offerItemId}&pId=2642624`,
  }];
}));

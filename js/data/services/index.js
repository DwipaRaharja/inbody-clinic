import pregnancyMassage from './pregnancy-massage-circulation-support.js';
import recoveryCore from './recovery-core-restoration.js';
import postnatalDrainage from './postnatal-lymphatic-drainage.js';
import postSurgical from './post-surgical-recovery.js';
import clinicalLymphatic from './clinical-lymphatic-drainage-sydney.js';
import lipedema from './lipedema-inflammatory-leg-care.js';
import tmj from './tmj-jaw-headache-treatment.js';
import chronicPain from './chronic-pain-stress-inflammation.js';
import therapeuticMassage from './clinical-therapeutic-massage-injury-recovery.js';
import endometriosis from './endometriosis-pelvic-pain-support.js';
import cellulite from './clinical-cellulite-remodelling.js';
import lymphaticReset from './lymphatic-reset-fluid-retention-treatment.js';
import { serviceBookings } from './booking.js';

export const services = Object.fromEntries([
  pregnancyMassage, recoveryCore, postnatalDrainage, postSurgical,
  clinicalLymphatic, lipedema, tmj, chronicPain,
  therapeuticMassage, endometriosis, cellulite, lymphaticReset,
].map(service => [service.id, { ...service, booking: serviceBookings[service.id] }]));

export function getService(serviceId) {
  return Object.hasOwn(services, serviceId) ? services[serviceId] : null;
}

import { ServiceHero, ServiceOptions, ServiceRecovery, ServiceExpertise, ServiceQuote, ServiceCTA } from '../sections/service/index.js';

/** Compose any service's content using the shared site layout and section renderers. */
export function createServicePage(service) {
  return {
    id: 'service',
    serviceId: service.id,
    background: 'white',
    sections: [
      { id: 'service-hero', className: 'bg-clinic-white', labelledBy: 'service-title', render: () => ServiceHero(service) },
      { id: 'service-options', className: 'bg-clinic-white', labelledBy: 'service-options-title', render: () => ServiceOptions(service) },
      { id: 'service-recovery', className: 'bg-clinic-light-grey', labelledBy: 'service-recovery-title', render: () => ServiceRecovery(service) },
      { id: 'service-expertise', className: 'bg-clinic-white', labelledBy: 'service-expertise-title', render: () => ServiceExpertise(service) },
      { id: 'service-quote', className: 'bg-clinic-white', label: 'Our approach to care', render: () => ServiceQuote(service) },
      { id: 'service-contact', className: 'bg-clinic-light-sage', labelledBy: 'service-cta-title', render: () => ServiceCTA(service) },
    ],
  };
}

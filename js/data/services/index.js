import pregnancyMassage from './pregnancy-massage-circulation-support.js';

export const services = {
  [pregnancyMassage.id]: pregnancyMassage,
};

export function getService(serviceId) {
  return Object.hasOwn(services, serviceId) ? services[serviceId] : null;
}

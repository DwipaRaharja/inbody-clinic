import { getService } from '../data/services/index.js';
import { createServicePage } from '../layouts/service-page.js';

export default function ServicePage({ serviceId } = {}) {
  const service = getService(serviceId);
  if (!service) throw new Error(`Unknown service: ${serviceId}`);
  return createServicePage(service);
}

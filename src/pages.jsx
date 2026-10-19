import home from '../js/pages/home.jsx';
import about from '../js/pages/about.jsx';
import contact from '../js/pages/contact.jsx';
import clinic from '../js/pages/clinic.jsx';
import service from '../js/pages/service.jsx';
import speciality from '../js/pages/speciality.jsx';
import method from '../js/pages/method.jsx';

const definitions = { home, about, contact, clinic, service, speciality, method };

export function getPage(route) {
  const definition = definitions[route.pageId];
  if (!definition) return null;
  return typeof definition === 'function'
    ? definition({ serviceId: route.serviceId, specialityId: route.specialityId })
    : definition;
}

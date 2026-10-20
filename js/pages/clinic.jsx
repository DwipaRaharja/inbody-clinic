import { ClinicIntro, ClinicGallery, ClinicVisit } from '../sections/clinic/index.jsx';
import { initClinicGallery } from '../features/clinic-gallery.js';
import { initContentReveal } from '../features/content-reveal.js';

export default {
  id: 'clinic',
  background: 'white',
  sections: [
    { id: 'clinic', className: 'bg-clinic-light-sage/40', labelledBy: 'clinic-title', render: ClinicIntro },
    { id: 'clinic-gallery', className: 'bg-clinic-white', labelledBy: 'clinic-gallery-title', render: ClinicGallery },
    { id: 'clinic-visit', className: 'bg-clinic-cream', labelledBy: 'clinic-visit-title', render: ClinicVisit },
  ],
  init(root) {
    const destroyGallery = initClinicGallery(root.querySelector('[data-clinic-gallery]'));
    const destroyReveal = initContentReveal(root);
    return () => {
      destroyReveal();
      destroyGallery();
    };
  },
};

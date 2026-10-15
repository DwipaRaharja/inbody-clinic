import { ClinicIntro, ClinicGallery, ClinicVisit } from '../sections/clinic/index.js';
import { initClinicGallery } from '../features/clinic-gallery.js';

export default {
  id: 'clinic',
  background: 'white',
  sections: [
    { id: 'clinic', className: 'bg-clinic-light-sage/40', labelledBy: 'clinic-title', render: ClinicIntro },
    { id: 'clinic-gallery', className: 'bg-clinic-white', labelledBy: 'clinic-gallery-title', render: ClinicGallery },
    { id: 'clinic-visit', className: 'bg-clinic-cream', labelledBy: 'clinic-visit-title', render: ClinicVisit },
  ],
  init(root) {
    initClinicGallery(root.querySelector('[data-clinic-gallery]'));
  },
};

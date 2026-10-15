import { TherapistProfile, TherapistCredentials, TherapistExpertise } from '../sections/about/index.js';

export default {
  id: 'about',
  background: 'cream',
  sections: [
    { id: 'about', className: 'bg-clinic-cream', labelledBy: 'about-title', render: TherapistProfile },
    { id: 'credentials', className: 'bg-clinic-sage text-clinic-white', label: "Saila's clinical experience and background", render: TherapistCredentials },
    { id: 'expertise', className: 'bg-clinic-white', labelledBy: 'expertise-title', render: TherapistExpertise },
  ],
};

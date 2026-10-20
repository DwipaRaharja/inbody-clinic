import { MeetClinicians, TherapistExpertise, TeamDetails } from '../sections/about/index.jsx';
import { MethodPreview } from '../components/care.jsx';

export default {
  id: 'about',
  background: 'cream',
  sections: [
    { id: 'about', className: 'bg-clinic-cream', labelledBy: 'about-title', render: MeetClinicians },
    { id: 'expertise', className: 'bg-clinic-white', labelledBy: 'expertise-title', render: TherapistExpertise },
    { id: 'team-details', className: 'bg-clinic-cream', labelledBy: 'team-details-title', render: TeamDetails },
    { id: 'method', className: 'bg-clinic-light-sage/45', labelledBy: 'method-title', render: MethodPreview },
  ],
};

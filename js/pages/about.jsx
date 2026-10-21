import { AboutHero, SailaProfile, BeatrizProfile, TeamDetails } from '../sections/about/index.jsx';
import { MethodPreview } from '../components/care.jsx';
import { initAboutReveal } from '../features/about-reveal.js';

export default {
  id: 'about',
  background: 'cream',
  sections: [
    { id: 'about', className: 'bg-clinic-cream', labelledBy: 'about-title', render: AboutHero },
    { id: 'saila-profile', className: 'bg-clinic-cream', labelledBy: 'saila-title', render: SailaProfile },
    { id: 'beatriz-profile', className: 'bg-clinic-cream', labelledBy: 'beatriz-title', render: BeatrizProfile },
    { id: 'team-details', className: 'bg-clinic-cream', labelledBy: 'team-details-title', render: TeamDetails },
    { id: 'method', className: 'mt-14 bg-clinic-light-sage/45 tablet:mt-20', labelledBy: 'method-title', render: MethodPreview },
  ],
  init: initAboutReveal,
};

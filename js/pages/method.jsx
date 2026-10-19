import { MethodIntro, MethodPrinciples, MethodPathway, MethodHumanCare, AssessmentCTA } from '../sections/method/index.jsx';

export default {
  id: 'method', background: 'white',
  sections: [
    { id: 'method', className: 'bg-clinic-cream', labelledBy: 'method-page-title', render: MethodIntro },
    { id: 'method-principles', className: 'bg-clinic-white', labelledBy: 'method-principles-title', render: MethodPrinciples },
    { id: 'method-pathway', className: 'bg-clinic-light-sage/45', labelledBy: 'method-pathway-title', render: MethodPathway },
    { id: 'method-human-care', className: 'bg-clinic-white', labelledBy: 'method-human-title', render: MethodHumanCare },
    { id: 'assessment', className: 'bg-clinic-light-sage', labelledBy: 'assessment-title', render: AssessmentCTA },
  ],
};

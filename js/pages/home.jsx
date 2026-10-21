import { Hero } from '../sections/home/hero.jsx';
import { Services } from '../sections/home/services.jsx';
import { MethodPreview, TeamPreview, WhatToExpect } from '../components/care.jsx';
import { HomeContact } from '../sections/home/contact.jsx';
import { initHeroSlider } from '../features/hero-slider.js';
import { initHomeReveal } from '../features/home-reveal.js';

export default {
  id: 'home',
  background: 'cream',
  sections: [
    { id: 'hero', className: 'relative w-full min-w-0 overflow-hidden bg-clinic-white', labelledBy: 'hero-title', render: Hero },
    { id: 'services', className: 'bg-clinic-white', labelledBy: 'services-title', render: Services },
    { id: 'method', className: 'bg-clinic-light-sage/45', labelledBy: 'method-title', render: MethodPreview },
    { id: 'team', className: 'bg-clinic-white', labelledBy: 'team-title', render: TeamPreview },
    { id: 'expect', className: 'bg-clinic-cream', labelledBy: 'expect-title', render: WhatToExpect },
    { id: 'home-contact', className: 'bg-clinic-white', labelledBy: 'home-contact-title', render: HomeContact },
  ],
  init(root) {
    const destroySlider = initHeroSlider(root.querySelector('[data-hero-slider]'));
    const destroyReveal = initHomeReveal(root);
    return () => {
      destroyReveal();
      destroySlider();
    };
  },
};

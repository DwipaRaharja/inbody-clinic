import { ContactIntro, ContactDetailsAndForm } from '../sections/contact/index.jsx';
import { initContactForm } from '../features/contact-form.js';
import { initContentReveal } from '../features/content-reveal.js';

export default {
  id: 'contact',
  background: 'white',
  sections: [
    { id: 'contact', className: 'bg-clinic-cream', labelledBy: 'contact-title', render: ContactIntro },
    { id: 'contact-content', className: 'bg-clinic-white', labelledBy: 'contact-details-title contact-form-title', render: ContactDetailsAndForm },
  ],
  init(root) {
    const destroyForm = initContactForm(root.querySelector('#contact-form'));
    const destroyReveal = initContentReveal(root);
    return () => {
      destroyReveal();
      destroyForm();
    };
  },
};

import { ContactIntro, ContactDetailsAndForm } from '../sections/contact/index.js';
import { initContactForm } from '../features/contact-form.js';

export default {
  id: 'contact',
  background: 'white',
  sections: [
    { id: 'contact', className: 'bg-clinic-light-sage', labelledBy: 'contact-title', render: ContactIntro },
    { id: 'contact-content', className: 'bg-clinic-white', labelledBy: 'contact-details-title contact-form-title', render: ContactDetailsAndForm },
  ],
  init(root) {
    initContactForm(root.querySelector('#contact-form'));
  },
};

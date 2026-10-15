import { Hero } from '../sections/home/hero.js';
import { Services } from '../sections/home/services.js';
import { Difference } from '../sections/home/difference.js';
import { Testimonials } from '../sections/home/testimonials.js';
import { Booking } from '../sections/home/booking.js';
import { initHeroSlider } from '../features/hero-slider.js';

export default {
  id: 'home',
  background: 'cream',
  sections: [
    { id: 'hero', className: 'relative w-full min-w-0 overflow-hidden bg-clinic-white', labelledBy: 'hero-title', render: Hero },
    { id: 'services', className: 'bg-clinic-white', labelledBy: 'services-title', render: Services },
    { id: 'difference', className: 'overflow-hidden bg-clinic-light-sage', labelledBy: 'difference-title', render: Difference },
    { id: 'testimonials', className: 'relative overflow-hidden border-y border-clinic-light-grey bg-clinic-white', labelledBy: 'testimonials-title', render: Testimonials },
    { id: 'booking', className: 'relative overflow-hidden bg-clinic-white', labelledBy: 'booking-title', render: Booking },
  ],
  init(root) {
    initHeroSlider(root.querySelector('[data-hero-slider]'));
  },
};

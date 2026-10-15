import { ContactBar, Navbar, initNavbar } from './components/navbar.js';
import { Hero } from './sections/hero.js';
import { initHeroSlider } from './components/hero-slider.js';
import { Services } from './sections/services.js';
import { Difference } from './sections/difference.js';
import { Testimonials } from './sections/testimonials.js';
import { Booking } from './sections/booking.js';
import { Footer } from './components/footer.js';

document.querySelector('#contact-bar').innerHTML = ContactBar();

const navbar = document.querySelector('#navbar');
navbar.innerHTML = Navbar();
initNavbar(navbar);

const hero = document.querySelector('#hero');
hero.setAttribute('aria-labelledby', 'hero-title');
hero.innerHTML = Hero();
initHeroSlider(hero.querySelector('[data-hero-slider]'));

const sections = [
  { id: 'services', titleId: 'services-title', render: Services },
  { id: 'difference', titleId: 'difference-title', render: Difference },
  { id: 'testimonials', titleId: 'testimonials-title', render: Testimonials },
  { id: 'booking', titleId: 'booking-title', render: Booking },
];

for (const { id, titleId, render } of sections) {
  const section = document.getElementById(id);
  section.setAttribute('aria-labelledby', titleId);
  section.innerHTML = render();
}

document.getElementById('footer').innerHTML = Footer();

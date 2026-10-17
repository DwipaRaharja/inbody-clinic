import { Heading } from '../../components/heading.js';
import { ActionButton } from '../../components/button.js';
import { containerClasses } from '../../layouts/container.js';
import { clinicContact, clinicMapUrl, clinicMapEmbedUrl } from '../../data/clinic-contact.js';

const contactCards = [
  { title: 'Call Us', icon: 'ph-phone', lines: ['Speak with our team', clinicContact.phone], href: clinicContact.phoneHref },
  { title: 'Send Us Mail', icon: 'ph-envelope', lines: [clinicContact.email], href: `mailto:${clinicContact.email}` },
  { title: 'Find the Clinic', icon: 'ph-map-pin', lines: clinicContact.addressLines, href: clinicMapUrl, external: true },
  { title: 'Clinic Hours', icon: 'ph-clock', lines: clinicContact.hours },
];

const fieldClasses = 'block w-full min-w-0 rounded-[3px] border border-clinic-light-grey bg-clinic-white px-5 py-3 text-[14px] leading-[1.5] text-clinic-navy placeholder:text-clinic-navy/70 focus:border-clinic-sage focus:ring-1 focus:ring-clinic-sage tablet:px-7';
const labelClasses = 'mb-3 block text-[14px] leading-[1.4] font-semibold tablet:text-[15px]';

export function ContactIntro() {
  return `<div class="${containerClasses} py-12 text-center tablet:py-14 [&_p.uppercase]:mx-auto" data-section-frame="contact-intro">
    ${Heading({ eyebrow: 'We’re here for you', level: 1, id: 'contact-title', lines: [{ text: 'Contact Us' }] })}
    <p class="mx-auto mt-6 max-w-[760px] text-[14px] leading-[1.75] tablet:text-[15px]">Speak with our team about women’s health, lymphatic therapy, post-surgical recovery or tissue care. Tell us what you need support with and we can help you identify an appropriate starting point.</p>
  </div>`;
}

export function ContactDetailsAndForm() {
  return `<div class="${containerClasses} grid min-w-0 gap-14 py-14 tablet:gap-16 tablet:py-16 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:gap-20 wide:py-[72px]" data-section-frame="contact-content">
    <div class="min-w-0">
      <div class="[&_p.uppercase]:mb-8 [&_p.uppercase]:max-w-none [&_p.uppercase]:text-[12px] tablet:[&_p.uppercase]:text-[14px]">
        ${Heading({ eyebrow: 'A conversation can be a first step', level: 2, size: 'hero', id: 'contact-details-title', lines: [{ text: 'Have Questions?' }] })}
      </div>
      <p class="mt-7 max-w-[48ch] text-[14px] leading-[1.6] tablet:text-[16px]">Your Partner in Women’s Health &amp; Recovery. Reach out to our team and we’ll help you find the right care for your needs.</p>
      <div class="mt-8 grid min-w-0 grid-cols-1 gap-3 tablet:grid-cols-2">
        ${contactCards.map(({ title, icon, lines, href, external }) => {
          const tag = href ? 'a' : 'div';
          return `<${tag} class="min-h-[196px] min-w-0 rounded-lg bg-clinic-cream px-6 py-5 ${href ? 'transition-colors hover:bg-clinic-light-sage/40 motion-reduce:transition-none' : ''}"${href ? ` href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}` : ''}>
            <span class="inline-flex size-12 items-center justify-center rounded-full bg-clinic-white"><i class="ph ${icon} text-[24px]" aria-hidden="true"></i></span>
            <h3 class="mt-2 font-display text-[26px] leading-[1.2] font-semibold tablet:text-[28px]">${title}</h3>
            <p class="mt-2 text-[13px] leading-[1.5] break-words text-clinic-navy/80">${lines.map(line => `<span class="block">${line}</span>`).join('')}</p>
          </${tag}>`;
        }).join('')}
      </div>
      <div class="mt-8 overflow-hidden rounded-lg border border-clinic-light-grey bg-clinic-light-sage">
        <iframe class="block h-[240px] w-full border-0 tablet:h-[220px]" src="${clinicMapEmbedUrl}" title="Google Maps location of InBody Clinic, Level 1, 336 New South Head Road, Double Bay NSW 2028" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <a class="mt-3 inline-flex items-center gap-2 text-[12px] font-medium underline-offset-4 hover:text-clinic-sage hover:underline" href="${clinicMapUrl}" target="_blank" rel="noopener noreferrer">Open in Google Maps<i class="ph ph-arrow-square-out text-[16px]" aria-hidden="true"></i></a>
    </div>
    <div class="min-w-0">
      <div class="[&_p.uppercase]:mb-8 [&_p.uppercase]:max-w-none [&_p.uppercase]:text-[12px] tablet:[&_p.uppercase]:text-[14px]">
        ${Heading({ eyebrow: 'We’d love to hear from you', level: 2, size: 'hero', id: 'contact-form-title', lines: [{ text: 'Get In Touch' }] })}
      </div>
      <p class="mt-7 max-w-[50ch] text-[14px] leading-[1.6] tablet:text-[16px]">Tell us a little about what you’re looking for. Our caring team will be in touch to help you take the next step.</p>
      <form id="contact-form" class="mt-8 grid min-w-0 gap-7" aria-labelledby="contact-form-title" aria-describedby="contact-form-note">
        <div class="grid min-w-0 grid-cols-1 gap-7 tablet:grid-cols-2 tablet:gap-4">
          <div class="min-w-0">
            <label class="${labelClasses}" for="contact-name">Name</label>
            <input class="${fieldClasses} h-[50px]" id="contact-name" name="name" type="text" autocomplete="name" placeholder="Your name" maxlength="120" pattern="[\\p{L}\\p{M} ]*\\p{L}[\\p{L}\\p{M} ]*" title="Use letters and spaces only." required />
          </div>
          <div class="min-w-0">
            <label class="${labelClasses}" for="contact-email">Email</label>
            <input class="${fieldClasses} h-[50px]" id="contact-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" placeholder="you@example.com" maxlength="254" required />
          </div>
        </div>
        <div class="min-w-0">
          <label class="${labelClasses}" for="contact-subject">Subject</label>
          <input class="${fieldClasses} h-[50px]" id="contact-subject" name="subject" type="text" placeholder="How can we help?" maxlength="180" required />
        </div>
        <div class="min-w-0">
          <label class="${labelClasses}" for="contact-message">Message</label>
          <textarea class="${fieldClasses} min-h-[182px] resize-y" id="contact-message" name="message" rows="7" placeholder="Share a little about what you need..." maxlength="3000" required></textarea>
        </div>
        <div>
          ${ActionButton({ label: 'Send message', type: 'submit' })}
          <p class="mt-3 max-w-[46ch] text-[12px] leading-[1.5] text-clinic-navy/75" id="contact-form-note">Your email app will open with your message ready to send.</p>
          <p class="mt-3 text-[12px] leading-[1.5] text-clinic-navy" data-contact-status role="status" aria-live="polite"></p>
        </div>
      </form>
    </div>
  </div>`;
}

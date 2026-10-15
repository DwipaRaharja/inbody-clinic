import { Heading } from '../../components/heading.js';
import { ActionButton } from '../../components/button.js';
import { containerClasses } from '../../layouts/container.js';
import { icon as renderIcon } from '../../components/icons.js';

const specialties = [
  { label: "Women’s Health", icon: 'ph-flower-tulip' },
  { label: 'Dermatofunctional Therapy', icon: 'ph-waves' },
  { label: 'Advanced Lymphatic Care', icon: 'ph-drop' },
];

const credentials = [
  { title: '20+', lines: ['Years of Clinical', 'experience'] },
  { title: 'Spain trained', lines: ['Physiotherapist'] },
  { title: 'Sydney', lines: ['InBody Clinic'] },
  { title: 'Clinical Tutor', lines: ['Mentoring healthcare', 'students'] },
];

const expertise = [
  { title: 'Post-surgical recovery', description: 'Collaborating with Sydney surgeons to support recovery.', icon: 'ph-stethoscope' },
  { title: 'Lymphatic therapy', description: 'Advanced Vodder and Leduc techniques.', icon: 'ph-waves' },
  { title: "Women’s life stages", description: 'Fertility, pregnancy, postpartum and hormonal support.', icon: 'pregnancy', svg: true },
  { title: 'Tissue rehabilitation', description: 'Connective tissue care and recovery.', icon: 'ph-plant' },
];

export function TherapistProfile() {
  return `<div class="${containerClasses} grid min-w-0 items-center gap-10 py-10 tablet:gap-12 tablet:py-12 wide:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] wide:gap-20 wide:py-10" data-section-frame="about">
    <div class="min-w-0">
      <div class="[&_p.uppercase]:flex [&_p.uppercase]:items-center [&_p.uppercase]:gap-2 [&_p.uppercase]:after:w-16 [&_p.uppercase]:after:border-t [&_p.uppercase]:after:border-dashed [&_p.uppercase]:after:content-['']">
        ${Heading({ eyebrow: 'Meet your therapist', level: 1, size: 'profile', id: 'about-title', lines: [{ text: 'Saila Insua López' }] })}
      </div>
      <p class="mt-3 text-[17px] leading-[1.4] font-medium text-clinic-sage tablet:text-[18px]">Spain-trained physiotherapist</p>
      <p class="mt-2.5 max-w-[48ch] text-[14px] leading-[1.4]">With over 20 years of clinical experience, Saila specialises in women’s health, dermatofunctional therapy and advanced lymphatic care.</p>
      <ul class="mt-4 list-none divide-y divide-clinic-light-sage border-y border-clinic-light-sage p-0">
        ${specialties.map(({ label, icon }) => `<li><a class="group flex min-h-[45px] items-center gap-4 py-2 text-[13px] leading-[1.4] transition-colors hover:text-clinic-sage motion-reduce:transition-none tablet:gap-5 tablet:text-[14px]" href="./#services">
          <i class="ph-light ${icon} shrink-0 text-[24px] text-clinic-sage" aria-hidden="true"></i>
          <span class="min-w-0">${label}</span>
          <i class="ph-light ph-caret-right ml-auto shrink-0 text-[18px] text-clinic-sage transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true"></i>
        </a></li>`).join('')}
      </ul>
      <div class="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
        ${ActionButton({ label: 'View services', href: './#services', variant: 'services' })}
        <a class="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium transition-colors hover:text-clinic-sage motion-reduce:transition-none tablet:text-[15px]" href="mailto:Sailainsua@gmail.com"><i class="ph-light ph-envelope text-[24px]" aria-hidden="true"></i><span>Contact Saila</span></a>
      </div>
    </div>
    <img class="aspect-[4/3] w-full min-w-0 rounded-[10px] object-cover object-center wide:h-full wide:min-h-[380px]" src="./assets/images/about/saila.jpg" alt="Saila Insua López at InBody Clinic holding a treatment device in front of the clinic shelves" width="1600" height="1066" fetchpriority="high" />
  </div>`;
}

export function TherapistCredentials() {
  return `<dl class="${containerClasses} grid grid-cols-2 gap-4 py-8 wide:grid-cols-4" data-section-frame="credentials">
    ${credentials.map(({ title, lines }) => `<div class="flex min-h-[132px] min-w-0 flex-col items-center justify-center rounded-[3px] border border-clinic-white/60 px-3 py-5 text-center">
      <dt class="font-display text-[28px] leading-[1.1] font-semibold lining-nums tablet:text-[36px] wide:text-[32px] min-[80rem]:text-[36px] min-[90rem]:text-[40px]">${title}</dt>
      <dd class="mt-2 text-[11px] leading-[1.35] text-clinic-white/90 tablet:text-[12px]">${lines.map(line => `<span class="block">${line}</span>`).join('')}</dd>
    </div>`).join('')}
  </dl>`;
}

export function TherapistExpertise() {
  return `<div class="${containerClasses} grid min-w-0 items-center gap-10 py-14 tablet:py-16 wide:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] wide:gap-20 wide:py-[60px]" data-section-frame="expertise">
    <div class="min-w-0">
      ${Heading({ level: 2, size: 'section', id: 'expertise-title', accentItalic: false, lines: [{ text: 'Experience' }, { text: '& expertise', accent: true }] })}
      <p class="mt-5 max-w-[42ch] text-[14px] leading-[1.4] tablet:text-[16px]">Advanced manual therapy, Vodder and Leduc lymphatic drainage, and INDIBA® radiofrequency technology.</p>
    </div>
    <ul class="grid min-w-0 list-none grid-cols-1 gap-3 p-0 tablet:grid-cols-2">
      ${expertise.map(({ title, description, icon, svg }) => `<li class="flex min-h-[125px] min-w-0 items-center gap-4 rounded-lg bg-clinic-light-grey px-4 py-5">
        ${svg ? renderIcon(icon, 'size-8 shrink-0 stroke-[1.1] text-clinic-sage') : `<i class="ph-light ${icon} shrink-0 text-[32px] text-clinic-sage" aria-hidden="true"></i>`}
        <div class="min-w-0">
          <h3 class="font-sans! text-[13px] leading-[1.35] font-semibold tablet:text-[14px]">${title}</h3>
          <p class="mt-1 text-[12px] leading-[1.55] text-clinic-navy/75">${description}</p>
        </div>
      </li>`).join('')}
    </ul>
  </div>`;
}

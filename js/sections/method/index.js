import { Heading } from '../../components/heading.js';
import { MethodSteps, AssessmentCTA } from '../../components/care.js';
import { containerClasses } from '../../layouts/container.js';
import { methodIntro, methodElements } from '../../data/method.js';
import { team } from '../../data/team.js';
import { escapeHtml as e } from '../../utils/html.js';

export function MethodIntro() {
  return `<div class="${containerClasses} grid min-w-0 gap-9 py-12 tablet:py-16 wide:grid-cols-2 wide:items-center wide:gap-16">
    <div class="min-w-0">${Heading({ eyebrow: 'Our clinical approach', level: 1, id: 'method-page-title', size: 'profile', lines: [{ text: 'The InBody' }, { text: 'Method™', accent: true }] })}
      <p class="mt-6 text-[15px] leading-[1.85]">${e(methodIntro)}</p>
      <p class="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">Advanced training in lymphatic drainage methods, women’s health, dermatofunctional therapy, manual therapy and post-surgical rehabilitation informs our care.</p>
      <p class="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">We bring this knowledge together to create personalised treatment rather than following the same protocol for every patient.</p>
    </div>
    <img class="block aspect-[4/3] w-full rounded-xl object-cover" src="./gallery/WhatsApp Image 2026-10-02 at 10.33.11.jpeg" alt="The clinic reception with seating and illuminated product shelves" width="1536" height="1024" fetchpriority="high" />
  </div>`;
}

export function MethodPrinciples() {
  return `<div class="${containerClasses} py-14 tablet:py-20">
    <div class="grid min-w-0 gap-6 wide:grid-cols-2 wide:gap-20"><div>${Heading({ eyebrow: 'Beyond a treatment name', level: 2, id: 'method-principles-title', size: 'section', lines: [{ text: 'The care behind' }, { text: 'your treatment', accent: true }] })}</div>
      <p class="text-[14px] leading-[1.85] text-clinic-navy/80">Our expertise goes beyond lymphatic drainage. We consider your condition, symptoms, tissue quality and stage of recovery before deciding which treatment is most appropriate. Clinical assessment and specialised hands-on care lead the approach.</p>
    </div>
    <ul class="mt-10 grid list-none grid-cols-1 gap-x-12 gap-y-8 p-0 tablet:grid-cols-2">
      ${methodElements.map(element => `<li class="flex min-w-0 items-start gap-5 border-t border-clinic-light-sage pt-6"><span class="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage/50"><i class="ph ${element.icon} text-[25px]" aria-hidden="true"></i></span><div class="min-w-0"><h3 class="text-[25px] leading-[1.2] font-semibold">${e(element.title)}</h3><p class="mt-3 text-[13px] leading-[1.8] text-clinic-navy/80">${e(element.description)}</p></div></li>`).join('')}
    </ul>
  </div>`;
}

export function MethodPathway() {
  return `<div class="${containerClasses} py-14 tablet:py-20">
    ${Heading({ eyebrow: 'A continuing process', level: 2, id: 'method-pathway-title', size: 'section', lines: [{ text: 'Assess. Personalise.' }, { text: 'Treat. Reassess.', accent: true }] })}
    <p class="mt-5 max-w-[65ch] text-[14px] leading-[1.8] text-clinic-navy/80">Your care is not a fixed sequence of identical treatments. We reassess your response, discuss your needs and adapt the approach over time.</p>
    <div class="mt-9">${MethodSteps()}</div>
  </div>`;
}

export function MethodHumanCare() {
  return `<div class="${containerClasses} grid min-w-0 gap-8 py-14 tablet:py-20 wide:grid-cols-2 wide:gap-20">
    <div>${Heading({ eyebrow: 'Clinical knowledge. Personal care.', level: 2, id: 'method-human-title', size: 'section', lines: [{ text: 'Experience with' }, { text: 'understanding', accent: true }] })}</div>
    <div><p class="text-[15px] leading-[1.85]">${e(team.philosophy)}</p><p class="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">${e(team.sharedCare)}</p><p class="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">We want you to understand your care, feel comfortable asking questions and take an informed part in the decisions about your treatment.</p></div>
  </div>`;
}

export { AssessmentCTA };

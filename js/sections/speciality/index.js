import { Heading } from '../../components/heading.js';
import { ActionButton } from '../../components/button.js';
import { AssessmentCTA } from '../../components/care.js';
import { containerClasses } from '../../layouts/container.js';
import { escapeHtml as e } from '../../utils/html.js';

export function SpecialityHero(speciality) {
  return `<div class="${containerClasses} grid min-w-0 gap-9 py-12 tablet:py-16 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:items-center wide:gap-16">
    <div class="min-w-0"><a class="mb-6 inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase hover:text-clinic-sage" href="./#services"><i class="ph ph-arrow-left" aria-hidden="true"></i>All specialities</a>
      ${Heading({ eyebrow: speciality.name, level: 1, id: 'speciality-title', size: 'profile', lines: speciality.headline.map((text, index) => ({ text, accent: index === 1 })) })}
      <p class="mt-6 max-w-[56ch] text-[14px] leading-[1.85] tablet:text-[15px]">${e(speciality.introduction)}</p>
      <div class="mt-7">${ActionButton({ label: 'Discuss your care', href: './pages/contact.html#contact-form' })}</div>
    </div>
    <img class="block aspect-[4/3] w-full min-w-0 rounded-xl object-cover wide:aspect-[5/4]" src="${e(speciality.image.src)}" alt="${e(speciality.image.alt)}" width="${speciality.image.width}" height="${speciality.image.height}" fetchpriority="high" />
  </div>`;
}

export function SpecialityNeeds(speciality) {
  return `<div class="${containerClasses} grid min-w-0 gap-9 py-14 tablet:py-20 wide:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] wide:gap-20">
    <div>${Heading({ eyebrow: 'Who we can help', level: 2, id: 'speciality-needs-title', size: 'section', lines: [{ text: speciality.question }] })}
      <p class="mt-5 max-w-[45ch] text-[14px] leading-[1.8] text-clinic-navy/80">These are some of the concerns we can discuss with you. Your assessment helps us understand what is relevant to your situation.</p>
    </div>
    <ul class="m-0 grid list-none grid-cols-1 gap-0 divide-y divide-clinic-light-sage border-y border-clinic-light-sage p-0">
      ${speciality.needs.map(need => `<li class="flex items-start gap-4 py-4 text-[14px] leading-[1.7]"><i class="ph ph-check-circle mt-1 shrink-0 text-[20px] text-clinic-sage" aria-hidden="true"></i><span>${e(need)}</span></li>`).join('')}
    </ul>
  </div>`;
}

export function SpecialityApproach(speciality) {
  return `<div class="${containerClasses} grid min-w-0 gap-10 py-14 tablet:py-20 wide:grid-cols-2 wide:gap-20">
    <div>${Heading({ eyebrow: 'The InBody Method™', level: 2, id: 'speciality-approach-title', size: 'section', lines: [{ text: 'Our clinical approach' }] })}
      <p class="mt-6 text-[14px] leading-[1.85]">${e(speciality.approach)}</p>
      <a class="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold underline decoration-clinic-sage underline-offset-4 hover:text-clinic-sage" href="./pages/the-inbody-method.html">Explore The InBody Method™<i class="ph ph-arrow-right" aria-hidden="true"></i></a>
      <h3 class="mt-9 text-[26px] leading-[1.2] font-semibold">When care may be appropriate</h3>
      <p class="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">${e(speciality.timing)}</p>
    </div>
    <div class="min-w-0 rounded-xl bg-clinic-white p-6 tablet:p-8"><h3 class="text-[28px] leading-[1.2] font-semibold">Your treatment may include</h3>
      <p class="mt-3 text-[13px] leading-[1.75] text-clinic-navy/75">Techniques are selected for your assessment and individual needs.</p>
      <ul class="mt-6 list-none divide-y divide-clinic-light-grey p-0">${speciality.techniques.map((technique, index) => `<li class="flex gap-4 py-4 text-[13px] leading-[1.7]"><span class="shrink-0 text-clinic-sage">0${index + 1}</span><span>${e(technique)}</span></li>`).join('')}</ul>
    </div>
  </div>`;
}

export function SpecialityTreatments(speciality) {
  return `<div class="${containerClasses} py-14 tablet:py-20">
    ${Heading({ eyebrow: 'Explore in more detail', level: 2, id: 'speciality-treatments-title', size: 'section', lines: [{ text: 'Related treatment information' }] })}
    <p class="mt-5 max-w-[66ch] text-[14px] leading-[1.8] text-clinic-navy/80">Learn about some of the treatments within this speciality. You can also contact us without choosing a treatment first.</p>
    <ul class="mt-8 grid list-none grid-cols-1 gap-4 p-0 tablet:grid-cols-2 wide:grid-cols-3">
      ${speciality.treatments.map(treatment => `<li class="min-w-0"><a class="group flex h-full flex-col rounded-xl border border-clinic-light-grey p-6 transition-colors hover:border-clinic-sage hover:bg-clinic-cream motion-reduce:transition-none" href="${e(treatment.href)}" aria-labelledby="related-${e(treatment.id)}-title" aria-describedby="related-${e(treatment.id)}-summary" data-treatment-card="${e(treatment.id)}">
        <h3 class="font-display text-[25px] leading-[1.2] font-semibold" id="related-${e(treatment.id)}-title">${e(treatment.name)}</h3>
        <p class="mt-4 text-[13px] leading-[1.8] text-clinic-navy/80" id="related-${e(treatment.id)}-summary">${e(treatment.summary)}</p>
        <span class="mt-auto inline-flex items-center gap-3 pt-6 text-[12px] leading-[1.5] font-medium">View treatment details<i class="ph ph-arrow-right shrink-0 text-[20px] text-clinic-sage transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true"></i></span>
      </a></li>`).join('')}
    </ul>
  </div>`;
}

export function createSpecialityPage(speciality) {
  return {
    id: 'speciality', specialityId: speciality.id, background: 'white',
    sections: [
      { id: 'speciality', className: 'bg-clinic-cream', labelledBy: 'speciality-title', render: () => SpecialityHero(speciality) },
      { id: 'speciality-needs', className: 'bg-clinic-white', labelledBy: 'speciality-needs-title', render: () => SpecialityNeeds(speciality) },
      { id: 'speciality-approach', className: 'bg-clinic-light-sage/40', labelledBy: 'speciality-approach-title', render: () => SpecialityApproach(speciality) },
      { id: 'speciality-treatments', className: 'bg-clinic-white', labelledBy: 'speciality-treatments-title', render: () => SpecialityTreatments(speciality) },
      { id: 'assessment', className: 'bg-clinic-light-sage', labelledBy: 'assessment-title', render: AssessmentCTA },
    ],
  };
}

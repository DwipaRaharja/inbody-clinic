import { Heading } from '../../components/heading.js';
import { icon } from '../../components/icons.js';
import { specialityCatalog } from '../../data/specialities/catalog.js';
import { containerClasses } from '../../layouts/container.js';
import { escapeHtml as e } from '../../utils/html.js';

export function Services() {
  return `<div class="${containerClasses} py-14 tablet:py-20" data-section-frame="services">
    <div class="mx-auto max-w-[900px] text-center [&_p.uppercase]:mx-auto">
      ${Heading({ eyebrow: 'Our specialities', level: 2, size: 'section', id: 'services-title', lines: [{ text: 'How Can We Help?' }] })}
      <p class="mt-4 font-display text-[26px] leading-[1.25] text-clinic-sage tablet:text-[30px]">Specialised care tailored to your needs.</p>
    </div>
    <ul class="mt-12 grid min-w-0 list-none grid-cols-1 gap-x-8 gap-y-12 p-0 tablet:grid-cols-2 tablet:gap-y-14 wide:grid-cols-3 wide:gap-x-12">
      ${specialityCatalog.map(speciality => `<li class="min-w-0">
        <a class="group mx-auto flex h-full w-full max-w-[350px] flex-col items-center text-center" href="${e(speciality.href)}" aria-label="${e(speciality.question)} Explore ${e(speciality.name)}">
          <span class="inline-flex size-20 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage transition-colors group-hover:bg-clinic-light-sage/70 motion-reduce:transition-none wide:size-[88px]">
            ${speciality.svg ? icon(speciality.icon, 'size-[42px] text-clinic-navy [stroke-width:0.85]') : `<i class="ph ${speciality.icon} text-[40px] text-clinic-navy" aria-hidden="true"></i>`}
          </span>
          <h3 class="mt-5 font-sans! text-[16px] leading-[1.45] font-semibold wide:text-[17px]">${e(speciality.question)}</h3>
          <p class="mt-3 text-[13px] leading-[1.6] font-medium text-clinic-navy/85">${e(speciality.name)}</p>
          <p class="mt-3 mb-6 max-w-[36ch] text-[13px] leading-[1.75] text-clinic-navy/80">${e(speciality.summary)}</p>
          <span class="mt-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-clinic-navy/55 transition-colors group-hover:bg-clinic-navy group-hover:text-clinic-white motion-reduce:transition-none" aria-hidden="true"><i class="ph ph-arrow-right text-[25px]"></i></span>
        </a>
      </li>`).join('')}
    </ul>
  </div>`;
}

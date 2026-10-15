import { Heading } from '../../components/heading.js';
import { fullBleedGridClasses, pagePaddingClasses } from '../../layouts/container.js';

const strengths = [
  {
    icon: 'ph-graduation-cap',
    title: 'Specialised Expertise',
    description: "Advanced training in women's health and lymphatic therapy.",
  },
  {
    icon: 'ph-users',
    title: 'Personalised Care',
    description: 'Individualised treatment plans tailored to your goals and lifestyle.',
  },
  {
    icon: 'ph-shield-check',
    title: 'Evidence-Based Treatment',
    description: 'Combining manual therapy and technology for safe, effective, long-lasting results.',
  },
];

export function Difference() {
  return `
    <div class="${fullBleedGridClasses.difference}" data-section-frame="difference">
      <div class="relative isolate col-start-1 row-start-1 min-h-[420px] min-w-0 overflow-hidden wide:col-end-3 wide:min-h-[480px]" data-section-media="difference">
        <img class="absolute inset-0 -z-10 block size-full object-cover object-[60%_center]" src="./assets/images/home/difference.jpg" alt="Black-and-white detail of a woman's shoulder and back wrapped in a soft towel" width="1024" height="735" loading="lazy" />
        <div class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(255_255_255/0.65)_0%,rgb(255_255_255/0)_70%)]" aria-hidden="true"></div>
      </div>
      <div class="relative z-10 col-start-1 row-start-1 min-w-0 py-7 pl-8 tablet:pl-20 nav:py-6 wide:col-start-2" data-section-copy="difference-quote">
          <p class="max-w-[230px] font-display text-[2.125rem] leading-[1.3] font-semibold italic tablet:text-[2.25rem] min-[90rem]:text-[2.5rem]">
            <span class="block">More</span>
            <span class="block">than a</span>
            <span class="block">treatment.</span>
            <span class="block text-clinic-sage">A healthier</span>
            <span class="block text-clinic-sage">you.</span>
          </p>
          <div class="mt-5 h-px w-[70px] bg-clinic-navy/60" aria-hidden="true"></div>
          <p class="mt-4 text-[14px] leading-[1.9] tracking-[0.2em] uppercase">Restore.<br />Rebalance.<br />Reconnected.</p>
      </div>
      <div class="${pagePaddingClasses} row-start-2 min-w-0 bg-clinic-light-sage py-10 wide:col-start-3 wide:row-start-1 wide:pl-8" data-section-copy="difference">
        ${Heading({
          eyebrow: 'The InBody Difference',
          level: 2,
          size: 'compact',
          id: 'difference-title',
          lines: [{ text: 'Specialised care. Real results.' }],
        })}
        <p class="mt-3 max-w-[64ch] text-[14px] leading-[1.35] wide:text-[16px]">We combine advanced clinical knowledge, specialised techniques and modern technology to deliver individualised care for real, lasting change.</p>
        <ul class="mt-7 grid list-none grid-cols-1 gap-7 p-0 tablet:grid-cols-3 tablet:gap-6 nav:gap-5">
          ${strengths.map((strength) => `
            <li>
              <i class="ph ${strength.icon} inline-block text-[34px]" aria-hidden="true"></i>
              <p class="mt-4 text-[14px] leading-[1.2] font-semibold">${strength.title}</p>
              <p class="mt-1 text-[14px] leading-[1.3]">${strength.description}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

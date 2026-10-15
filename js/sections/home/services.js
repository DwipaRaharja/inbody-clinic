import { Heading } from '../../components/heading.js';
import { icon } from '../../components/icons.js';
import { serviceNavigationGroups } from '../../data/navigation.js';
import { containerClasses } from '../../layouts/container.js';

const serviceRoutes = Object.fromEntries(
  serviceNavigationGroups.flatMap(group => group.services).map(service => [service.id, service.href]),
);

const services = [
  {
    title: 'Lymphatic Health',
    icon: 'ph-leaf',
    serviceId: 'clinical-lymphatic-drainage-sydney',
    description: 'Reduce swelling, support circulation and feel lighter.',
  },
  {
    title: 'Lipedema Care',
    icon: 'body-contour',
    svg: true,
    serviceId: 'lipedema-inflammatory-leg-care',
    description: 'Specialised, conservative treatment and long-term support.',
  },
  {
    title: 'Post-Operative Recovery',
    icon: 'ph-flower-lotus',
    serviceId: 'post-surgical-recovery',
    description: 'Recover faster with expert guidance and personalised care.',
  },
  {
    title: 'Pregnancy & Postpartum',
    icon: 'pregnancy',
    svg: true,
    serviceId: 'pregnancy-massage-circulation-support',
    description: 'Support for your body through every stage.',
  },
  {
    title: 'Skin Health & Body Contouring',
    icon: 'skin-health',
    svg: true,
    serviceId: 'clinical-cellulite-remodelling',
    description: 'Improve skin health, reduce cellulite and enhance your confidence.',
  },
  {
    title: "Women's Health Physiotherapy",
    icon: 'pelvic-health',
    svg: true,
    serviceId: 'recovery-core-restoration',
    description: 'Pelvic health, core function and whole-body wellbeing.',
  },
];

export function Services() {
  return `
    <div class="${containerClasses} py-14 tablet:pt-16 tablet:pb-24 wide:pb-[100px]" data-section-frame="services">
      <div class="mx-auto max-w-[1000px] text-center [&_h2_span:last-child]:mt-2 [&_p]:mx-auto">
        ${Heading({
          eyebrow: 'Our Services',
          level: 2,
          size: 'section',
          id: 'services-title',
          accentItalic: false,
          lines: [
            { text: 'Comprehensive care for every stage of' },
            { text: 'your journey.', accent: true },
          ],
        })}
      </div>
      <ul class="mx-auto mt-12 grid w-full min-w-0 list-none grid-cols-1 gap-x-8 gap-y-14 p-0 tablet:mt-16 tablet:grid-cols-2 tablet:gap-y-16 wide:mt-[68px] wide:grid-cols-3 wide:gap-x-14 wide:gap-y-[76px]">
        ${services.map((service) => `
          <li class="mx-auto flex w-full min-w-0 max-w-[330px] flex-col items-center text-center">
            <span class="inline-flex size-20 items-center justify-center rounded-full bg-clinic-light-sage wide:size-[88px]">
              ${service.svg
                ? icon(service.icon, 'size-[42px] text-clinic-navy [stroke-width:0.85]')
                : `<i class="ph ${service.icon} text-[42px] text-clinic-navy" aria-hidden="true"></i>`}
            </span>
            <p class="mt-[18px] text-[16px] leading-[1.3] font-semibold wide:text-[18px]">${service.title}</p>
            <p class="mt-2.5 mb-6 max-w-[330px] text-[14px] leading-[1.35] wide:text-[16px]">${service.description}</p>
            <a class="mt-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-clinic-navy/65 text-clinic-navy transition-colors duration-[160ms] hover:bg-clinic-navy hover:text-clinic-white motion-reduce:transition-none" href="${serviceRoutes[service.serviceId]}" aria-label="Learn more about ${service.title}">
              <i class="ph ph-arrow-right text-[28px]" aria-hidden="true"></i>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

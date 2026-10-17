import { Heading } from '../../components/heading.js';
import { ActionButton } from '../../components/button.js';
import { containerClasses } from '../../layouts/container.js';
import { clinicContact, clinicMapUrl, clinicMapEmbedUrl } from '../../data/clinic-contact.js';
import { escapeHtml as e } from '../../utils/html.js';

export function HomeContact() {
  return `<div class="${containerClasses} grid min-w-0 gap-9 py-14 tablet:py-20 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:items-center wide:gap-20" data-section-frame="home-contact">
    <div class="min-w-0">
      ${Heading({ eyebrow: 'InBody Clinic · Double Bay', level: 2, id: 'home-contact-title', size: 'section', lines: [{ text: 'Visit our clinic' }] })}
      <p class="mt-5 max-w-[52ch] text-[14px] leading-[1.8] text-clinic-navy/80">Discuss your needs with our team, find out about appointments, or plan your visit to our Double Bay clinic.</p>
      <address class="mt-7 grid gap-5 text-[13px] leading-[1.75] not-italic tablet:grid-cols-2">
        <div class="flex items-start gap-3"><i class="ph ph-map-pin mt-1 shrink-0 text-[22px] text-clinic-sage" aria-hidden="true"></i><div><p class="font-semibold">Find us</p><p class="mt-1 text-clinic-navy/80">${clinicContact.addressLines.map(line => e(line)).join('<br />')}</p></div></div>
        <div class="flex items-start gap-3"><i class="ph ph-clock mt-1 shrink-0 text-[22px] text-clinic-sage" aria-hidden="true"></i><div><p class="font-semibold">Clinic hours</p><p class="mt-1 text-clinic-navy/80">${clinicContact.hours.map(line => e(line)).join('<br />')}</p></div></div>
      </address>
      <div class="mt-6 grid gap-3 text-[13px] leading-[1.7]">
        <a class="flex w-fit max-w-full items-center gap-3 hover:text-clinic-sage" href="${e(clinicContact.phoneHref)}"><i class="ph ph-phone shrink-0 text-[21px] text-clinic-sage" aria-hidden="true"></i>${e(clinicContact.phone)}</a>
        <a class="flex w-fit max-w-full items-center gap-3 hover:text-clinic-sage" href="mailto:${e(clinicContact.email)}"><i class="ph ph-envelope shrink-0 text-[21px] text-clinic-sage" aria-hidden="true"></i><span class="break-all">${e(clinicContact.email)}</span></a>
      </div>
      <div class="mt-7 flex flex-wrap items-center gap-5">${ActionButton({ label: 'Contact us', href: './pages/contact.html' })}<a class="inline-flex min-h-10 items-center gap-2 text-[13px] font-medium underline decoration-clinic-sage underline-offset-4 hover:text-clinic-sage" href="./pages/our-clinic.html">Inside our clinic<i class="ph ph-arrow-right" aria-hidden="true"></i></a></div>
    </div>
    <div class="min-w-0"><div class="overflow-hidden rounded-xl border border-clinic-light-grey bg-clinic-light-sage"><iframe class="block h-[320px] w-full border-0 tablet:h-[380px]" src="${e(clinicMapEmbedUrl)}" title="Google Maps location of InBody Clinic in Double Bay" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
      <a class="mt-4 inline-flex items-center gap-2 text-[12px] underline underline-offset-4 hover:text-clinic-sage" href="${e(clinicMapUrl)}" target="_blank" rel="noopener noreferrer">Open in Google Maps<i class="ph ph-arrow-square-out" aria-hidden="true"></i></a>
    </div>
  </div>`;
}

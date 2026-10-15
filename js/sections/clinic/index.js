import { Heading } from '../../components/heading.js';
import { ActionButton } from '../../components/button.js';
import { containerClasses } from '../../layouts/container.js';
import { clinicGalleryFilters, clinicGalleryPhotos } from '../../data/clinic-gallery.js';
import { clinicContact, clinicMapUrl } from '../../data/clinic-contact.js';

function escapeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function ClinicIntro() {
  return `<div class="${containerClasses} py-14 text-center tablet:py-20 [&_p.uppercase]:mx-auto" data-section-frame="clinic-intro">
    ${Heading({
      eyebrow: 'InBody Clinic · Double Bay',
      level: 1,
      id: 'clinic-title',
      size: 'profile',
      lines: [{ text: 'A space to' }, { text: 'feel at ease', accent: true }],
    })}
    <p class="mx-auto mt-6 max-w-[610px] text-[14px] leading-[1.8] text-clinic-navy/85 tablet:text-[15px]">Discover the spaces and thoughtful details behind your visit to InBody Clinic.</p>
  </div>`;
}

function galleryCard(photo) {
  const title = escapeText(photo.title);
  return `<li class="min-w-0" data-gallery-card data-gallery-id="${escapeText(photo.id)}" data-gallery-categories="${escapeText(photo.categories.join(' '))}">
    <button class="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl bg-clinic-light-grey text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clinic-sage" type="button" data-gallery-open="${escapeText(photo.id)}" aria-label="View photo: ${title}">
      <img class="block size-full object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none" src="${escapeText(photo.src)}" alt="${escapeText(photo.alt)}" width="${escapeText(photo.width)}" height="${escapeText(photo.height)}" loading="lazy" decoding="async" />
      <span class="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full bg-clinic-white/95 text-clinic-navy shadow-sm transition-colors group-hover:bg-clinic-white motion-reduce:transition-none" aria-hidden="true"><i class="ph ph-arrows-out text-[20px]"></i></span>
    </button>
    <p class="mt-5 text-[9px] leading-[1.6] font-semibold tracking-[0.15em] text-clinic-sage uppercase tablet:text-[10px]">${escapeText(photo.eyebrow)}</p>
    <h3 class="mt-1.5 font-display text-[26px] leading-[1.15] font-semibold text-clinic-navy tablet:text-[28px]" data-gallery-title>${title}</h3>
    <p class="mt-2 max-w-[42ch] text-[13px] leading-[1.7] text-clinic-navy/75" data-gallery-description>${escapeText(photo.description)}</p>
  </li>`;
}

export function ClinicGallery() {
  const total = clinicGalleryPhotos.length;
  return `<div class="${containerClasses} py-14 tablet:py-20" data-clinic-gallery data-section-frame="clinic-gallery">
    <div class="flex min-w-0 flex-col gap-7 wide:flex-row wide:items-end wide:justify-between wide:gap-8">
      <div class="min-w-0">
        ${Heading({ eyebrow: 'A look inside', level: 2, id: 'clinic-gallery-title', size: 'section', lines: [{ text: 'Inside InBody Clinic' }] })}
        <p class="mt-4 max-w-[50ch] text-[13px] leading-[1.75] text-clinic-navy/75 tablet:text-[14px]">Explore our treatment rooms, equipment and the details that make the clinic feel welcoming.</p>
      </div>
      <div class="flex min-w-0 flex-wrap gap-2 wide:max-w-[510px] wide:justify-end" role="group" aria-label="Filter clinic photos">
        ${clinicGalleryFilters.map(({ id, label }) => `<button class="inline-flex min-h-10 max-w-full cursor-pointer items-center justify-center rounded-full bg-clinic-cream px-4 py-2 text-[11px] leading-[1.5] font-medium tracking-[0.025em] text-clinic-navy transition-colors hover:bg-clinic-light-sage/60 aria-pressed:bg-clinic-sage aria-pressed:text-clinic-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clinic-sage motion-reduce:transition-none tablet:text-[12px]" type="button" data-gallery-filter="${escapeText(id)}" value="${escapeText(id)}" aria-pressed="${id === 'all'}">${escapeText(label)}</button>`).join('')}
      </div>
    </div>
    <p class="mt-7 text-[12px] leading-[1.6] text-clinic-navy/65" data-gallery-count role="status" aria-live="polite">Showing ${total} of ${total} photos</p>
    <ul class="mt-5 grid min-w-0 grid-cols-1 gap-x-6 gap-y-10 tablet:grid-cols-2 wide:grid-cols-3">
      ${clinicGalleryPhotos.map(galleryCard).join('')}
    </ul>
    <dialog class="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1080px] overflow-auto rounded-2xl border-0 bg-clinic-white p-0 text-clinic-navy shadow-2xl backdrop:bg-clinic-navy/80" data-gallery-dialog aria-labelledby="clinic-photo-title">
      <div class="relative">
        <div class="bg-clinic-navy/5"><img class="mx-auto block max-h-[75dvh] w-full object-contain" data-gallery-full-image alt="" /></div>
        <button class="absolute top-4 right-4 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-clinic-white text-clinic-navy shadow-sm transition-colors hover:bg-clinic-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clinic-sage motion-reduce:transition-none" type="button" data-gallery-close aria-label="Close photo" autofocus><i class="ph ph-x text-[24px]" aria-hidden="true"></i></button>
        <div class="px-6 py-6 tablet:px-8">
          <h2 class="font-display text-[28px] leading-[1.2] font-semibold tablet:text-[32px]" id="clinic-photo-title" data-gallery-dialog-title></h2>
          <p class="mt-2 max-w-[70ch] text-[13px] leading-[1.7] text-clinic-navy/75" data-gallery-dialog-description></p>
        </div>
      </div>
    </dialog>
  </div>`;
}

export function ClinicVisit() {
  return `<div class="${containerClasses} grid min-w-0 gap-9 py-14 tablet:py-20 wide:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] wide:items-center wide:gap-20" data-section-frame="clinic-visit">
    <div class="min-w-0">
      ${Heading({ eyebrow: 'InBody Clinic · Double Bay', level: 2, id: 'clinic-visit-title', size: 'section', lines: [{ text: 'Plan your visit' }] })}
      <p class="mt-5 max-w-[48ch] text-[14px] leading-[1.8] text-clinic-navy/80 tablet:text-[15px]">We look forward to welcoming you to our Double Bay clinic. Find our location below, or get in touch if you have a question before your appointment.</p>
      <div class="mt-5">${ActionButton({ label: 'Contact us', href: './contact.html' })}</div>
    </div>
    <div class="min-w-0 rounded-2xl border border-clinic-light-grey bg-clinic-white p-6 tablet:p-8">
      <div class="flex items-start gap-4">
        <span class="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage/40 text-clinic-navy" aria-hidden="true"><i class="ph ph-map-pin text-[23px]"></i></span>
        <div class="min-w-0"><h3 class="text-[13px] leading-[1.5] font-semibold">Find us in Double Bay</h3><p class="mt-2 text-[13px] leading-[1.7] text-clinic-navy/75">${clinicContact.addressLines.map(line => `<span class="block">${escapeText(line)}</span>`).join('')}</p></div>
      </div>
      <div class="mt-6 flex items-start gap-4 border-t border-clinic-light-grey pt-6">
        <span class="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage/40 text-clinic-navy" aria-hidden="true"><i class="ph ph-clock text-[23px]"></i></span>
        <div class="min-w-0"><h3 class="text-[13px] leading-[1.5] font-semibold">Clinic hours</h3><p class="mt-2 text-[13px] leading-[1.7] text-clinic-navy/75">${clinicContact.hours.map(line => `<span class="block">${escapeText(line)}</span>`).join('')}</p></div>
      </div>
      <div class="mt-7">${ActionButton({ label: 'Find the clinic', href: clinicMapUrl })}</div>
    </div>
  </div>`;
}

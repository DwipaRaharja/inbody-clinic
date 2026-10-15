import { Heading } from '../../components/heading.js';
import { BookingButton } from '../../components/button.js';
import { fullBleedGridClasses, pagePaddingClasses } from '../../layouts/container.js';

export function Booking() {
  return `
    <div class="${fullBleedGridClasses.booking} wide:min-h-[260px]" data-section-frame="booking">
      <div class="relative order-1 h-[220px] min-w-0 overflow-hidden tablet:h-[280px] wide:col-start-1 wide:col-end-3 wide:row-start-1 wide:order-none wide:h-auto wide:after:pointer-events-none wide:after:absolute wide:after:inset-0 wide:after:bg-[linear-gradient(90deg,rgb(255_255_255/0)_55%,white_100%)] wide:after:content-['']" data-section-media="booking">
        <img class="absolute inset-0 block size-full object-cover object-[center_60%]" src="./assets/images/home/cta.jpg" alt="Boats on the blue waters of Sydney Harbour with the green hills of Double Bay beyond" width="1024" height="341" loading="lazy" />
      </div>
      <div class="${pagePaddingClasses} min-w-0 py-10 wide:col-start-3 wide:row-start-1 wide:py-8 wide:pl-8" data-section-copy="booking">
        <div class="mx-auto w-full min-w-0 max-w-[390px] wide:mx-0 [&_p.uppercase]:mb-3 [&_p.uppercase]:max-w-none [&_p.uppercase]:text-[11px]">
          ${Heading({
            eyebrow: 'Take the next step',
            level: 2,
            size: 'cta',
            id: 'booking-title',
            lines: [
              { text: 'Your health journey' },
              { text: 'starts here.', accent: true },
            ],
          })}
          <p class="mt-4 mb-[18px] text-[12px] leading-[1.4] wide:text-[13px]">Book a consultation at our clinic and discover personalised care designed around you.</p>
          ${BookingButton()}
        </div>
      </div>
    </div>
  `;
}

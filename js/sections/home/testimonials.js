import { fullBleedGridClasses, pagePaddingClasses } from '../../layouts/container.js';

export function Testimonials() {
  return `
    <div class="${fullBleedGridClasses.testimonials} wide:min-h-[350px]" data-section-frame="testimonials">
      <div class="${pagePaddingClasses} min-w-0 py-12 wide:col-start-2 wide:row-start-1 wide:py-[60px] wide:pr-6" data-section-copy="testimonials">
        <div class="mx-auto w-full max-w-[520px] wide:mx-0">
          <figure class="w-full min-w-0">
            <h2 id="testimonials-title" class="font-sans! text-[11px] leading-[1.6] font-medium tracking-[0.18em] uppercase tablet:text-[13px]">Real women. Real stories.</h2>
            <blockquote class="mt-4 max-w-[475px] font-display text-[30px] leading-[1.25] font-medium italic tablet:text-[32px]">
              <p><span class="mr-1 inline-block align-top text-[48px] leading-[0.8] not-italic" aria-hidden="true">“</span>The care and expertise at InBody have been life-changing. I finally feel like myself again.<span class="ml-1 inline-block align-bottom text-[48px] leading-[0.8] not-italic" aria-hidden="true">”</span></p>
            </blockquote>
            <figcaption class="mt-7 text-[12px] leading-[1.4] font-medium tracking-[0.18em] uppercase tablet:text-[14px]">-Our patient</figcaption>
          </figure>
          <div class="mt-7 flex gap-4" aria-hidden="true">
            <span class="size-2.5 rounded-full border border-clinic-navy bg-clinic-navy"></span>
            <span class="size-2.5 rounded-full border border-clinic-navy"></span>
            <span class="size-2.5 rounded-full border border-clinic-navy"></span>
          </div>
        </div>
      </div>
      <div class="relative h-[250px] min-w-0 overflow-hidden wide:col-start-3 wide:col-end-5 wide:row-start-1 wide:h-auto wide:after:pointer-events-none wide:after:absolute wide:after:inset-0 wide:after:bg-[linear-gradient(90deg,white_0%,rgb(255_255_255/0)_20%)] wide:after:content-['']" data-section-media="testimonials">
        <img class="absolute inset-0 block size-full object-cover object-center" src="./assets/images/home/testimonial.jpg" alt="Sunlit InBody Clinic interior with a vase of fresh greenery on a white table" width="1024" height="341" loading="lazy" />
      </div>
    </div>
  `;
}

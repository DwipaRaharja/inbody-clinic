import { icon } from './icons.js';

export const bookingHref = 'mailto:Sailainsua@gmail.com?subject=Appointment%20enquiry';

const variants = {
  hero: {
    classes: 'gap-3.5 px-[18px] py-3 text-[12px] tablet:px-[21px] tablet:text-[14px]',
    iconClasses: 'size-[22px]',
  },
  navbar: {
    classes: 'mt-3 self-start gap-2.5 px-[18px] py-[13px] text-[12px] nav:mt-0 nav:self-auto nav:px-3 nav:py-2.5 nav:text-[10px] wide:px-[15px] wide:text-[12px]',
    iconClasses: 'size-[18px]',
  },
};

export function BookingButton(variant = 'hero') {
  const styles = variants[variant] ?? variants.hero;
  return `<a class="inline-flex items-center justify-center rounded-full bg-clinic-sage font-sans font-medium leading-[1.25] tracking-[0.045em] text-clinic-white uppercase transition-[filter,transform] duration-[160ms] hover:-translate-y-px hover:brightness-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${styles.classes}" href="${bookingHref}"><span>Book an appointment</span>${icon('arrow', `shrink-0 ${styles.iconClasses}`)}</a>`;
}

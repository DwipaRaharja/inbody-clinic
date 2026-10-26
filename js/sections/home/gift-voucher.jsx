import { Heading } from '../../components/heading.jsx';
import { Icon } from '../../components/icons.jsx';
import { ActionButton } from '../../components/button.jsx';
import { containerClasses } from '../../layouts/container.js';
import { giftVoucherHref } from '../../data/gift-voucher.js';

export function GiftVoucher() {
  return <div className={`${containerClasses} py-6 tablet:py-8 wide:py-10`} data-section-frame="gift-voucher">
    <div className="grid min-w-0 gap-7 rounded-2xl border border-clinic-sage/25 bg-clinic-cream p-6 tablet:gap-8 tablet:p-9 nav:grid-cols-[minmax(0,1fr)_minmax(280px,0.5fr)] nav:items-center wide:gap-12" data-content-reveal="rise">
      <div className="min-w-0">
        <Heading
          eyebrow="A thoughtful gift this Christmas"
          id="gift-voucher-title"
          level={2}
          size="compact"
          lines={[
            { text: 'Give the gift of' },
            { text: 'wellbeing this Christmas.', accent: true },
          ]}
        />
        <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.8] text-clinic-navy/80 tablet:text-[15px]">Give someone special a little time for personalised care and wellbeing with an InBody Clinic gift voucher. Purchase online through Fresha.</p>
      </div>
      <div className="min-w-0 rounded-xl bg-clinic-white p-5 tablet:p-6">
        <div className="mb-5 flex min-w-0 items-center gap-3">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage text-clinic-navy" aria-hidden="true"><Icon name="gift" className="size-6" /></span>
          <span className="min-w-0">
            <span className="block text-[9px] leading-[1.6] font-medium tracking-[0.12em] text-clinic-sage uppercase">InBody Clinic</span>
            <span className="block font-display text-[24px] leading-[1.2] font-semibold text-clinic-navy tablet:text-[26px]">Gift Vouchers</span>
          </span>
        </div>
        <div className="[&_a]:w-full [&_a]:font-light">
          <ActionButton label="Buy a Gift Voucher" href={giftVoucherHref} variant="contact" target="_blank" rel="noopener noreferrer" ariaLabel="Buy a Gift Voucher (opens in a new tab)" />
        </div>
      </div>
    </div>
  </div>;
}

import { Fragment } from "react";
import { assetUrl, siteUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { ActionButton } from "../../components/button.jsx";
import { containerClasses } from "../../layouts/container.js";
import { clinicContact, clinicMapUrl, clinicMapEmbedUrl } from "../../data/clinic-contact.js";
export function HomeContact() {
  return <div className={`${containerClasses} grid min-w-0 gap-9 py-14 tablet:py-20 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:items-center wide:gap-20`} data-section-frame="home-contact">
    <div className="min-w-0">
      <Heading eyebrow="InBody Clinic · Double Bay" level={2} id="home-contact-title" size="section" lines={[{ text: "Visit our clinic" }]} />
      <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.8] text-clinic-navy/80">Discuss your needs with our team, find out about appointments, or plan your visit to our Double Bay clinic.</p>
      <address className="mt-7 grid gap-5 text-[13px] leading-[1.75] not-italic tablet:grid-cols-2">
        <div className="flex items-start gap-3"><i className="ph ph-map-pin mt-1 shrink-0 text-[22px] text-clinic-sage" aria-hidden="true"></i><div><p className="font-semibold">Find us</p><p className="mt-1 text-clinic-navy/80">{clinicContact.addressLines.map((line, index) => <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>)}</p></div></div>
        <div className="flex items-start gap-3"><i className="ph ph-clock mt-1 shrink-0 text-[22px] text-clinic-sage" aria-hidden="true"></i><div><p className="font-semibold">Clinic hours</p><p className="mt-1 text-clinic-navy/80">{clinicContact.hours.map((line, index) => <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>)}</p></div></div>
      </address>
      <div className="mt-6 grid gap-3 text-[13px] leading-[1.7]">
        <a className="flex w-fit max-w-full items-center gap-3 hover:text-clinic-sage" href={siteUrl(clinicContact.phoneHref)}><i className="ph ph-phone shrink-0 text-[21px] text-clinic-sage" aria-hidden="true"></i>{clinicContact.phone}</a>
        <a className="flex w-fit max-w-full items-center gap-3 hover:text-clinic-sage" href={siteUrl(`mailto:${clinicContact.email}`)}><i className="ph ph-envelope shrink-0 text-[21px] text-clinic-sage" aria-hidden="true"></i><span className="break-all">{clinicContact.email}</span></a>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-5"><ActionButton label="Contact us" href="./pages/contact.html" /><a className="inline-flex min-h-10 items-center gap-2 text-[13px] font-medium underline decoration-clinic-sage underline-offset-4 hover:text-clinic-sage" href={siteUrl("./pages/our-clinic.html")}>Inside our clinic<i className="ph ph-arrow-right" aria-hidden="true"></i></a></div>
    </div>
    <div className="min-w-0"><div className="overflow-hidden rounded-xl border border-clinic-light-grey bg-clinic-light-sage"><iframe className="block h-[320px] w-full border-0 tablet:h-[380px]" src={assetUrl(clinicMapEmbedUrl)} title="Google Maps location of InBody Clinic in Double Bay" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe></div>
      <a className="mt-4 inline-flex items-center gap-2 text-[12px] underline underline-offset-4 hover:text-clinic-sage" href={siteUrl(clinicMapUrl)} target="_blank" rel="noopener noreferrer">Open in Google Maps<i className="ph ph-arrow-square-out" aria-hidden="true"></i></a>
    </div>
  </div>;
}

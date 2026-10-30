import { assetUrl, siteUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { ActionButton, BookingButton } from "../../components/button.jsx";
import { containerClasses } from "../../layouts/container.js";
import { getSpecialityForService } from "../../data/specialities/catalog.js";
import { HeroPicture } from "../../components/hero-picture.jsx";
function paragraphs(value) {
  return Array.isArray(value) ? value : [value];
}
function ServiceImage({ image = {}, hero = false }) {
  const fitClass = image.fit === "contain" ? "object-contain" : "object-cover";
  const positionStyle = image.position ? { objectPosition: image.position } : undefined;
  const width = Number(image.width ?? image.w);
  const height = Number(image.height ?? image.h);
  const dimensions = Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0 ? { width: Math.round(width), height: Math.round(height) } : {};
  const hasWebp = Boolean(image.webp?.length);
  return <HeroPicture image={image} className={hasWebp ? `block w-full min-w-0 overflow-hidden rounded-[10px] ${hero ? "aspect-[3/2]" : "aspect-[9/10]"}` : undefined} imgClassName={hasWebp ? `block size-full ${fitClass}` : `block w-full min-w-0 ${hero ? "aspect-[3/2]" : ""} rounded-[10px] ${fitClass}`} imgStyle={positionStyle} fetchPriority={hero ? "high" : undefined} loading={hero ? undefined : "lazy"} decoding="async" {...dimensions} />;
}
function ServiceBenefit({ icon, label }) {
  const iconClass = /^ph-[a-z0-9-]+$/.test(icon) ? icon : "ph-heart";
  return <li className="flex min-w-0 items-start gap-3">
    <i className={`ph ${iconClass} shrink-0 text-[22px] leading-none text-clinic-sage`} aria-hidden="true"></i>
    <span className="min-w-0 text-[10px] leading-[1.4] text-clinic-navy/80 tablet:text-[11px]">{label}</span>
  </li>;
}
function numberLabel(index) {
  return String(index + 1).padStart(2, "0");
}
// Each section receives the same service record, so new services only need data.
export function ServiceHero(service) {
  const { hero } = service;
  const speciality = getSpecialityForService(service.id);
  return <div className={`${containerClasses} grid min-w-0 items-center gap-9 py-10 tablet:gap-12 tablet:py-12 wide:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] wide:gap-16 wide:py-12`} data-section-frame="service-hero">
    <div className="min-w-0">
      <a className="mb-5 inline-flex max-w-full items-start gap-2 text-[11px] leading-[1.6] text-clinic-navy/75 hover:text-clinic-sage" href={siteUrl(speciality ? speciality.href : "./#services")}><i className="ph ph-arrow-left mt-0.5 shrink-0" aria-hidden="true"></i><span>{speciality ? speciality.name : "Explore our specialities"}</span></a>
      <div className="[&_p.uppercase]:mb-4 [&_p.uppercase]:text-[10px] [&_p.uppercase]:font-semibold [&_p.uppercase]:tracking-[0.12em] [&_p.uppercase]:text-clinic-sage tablet:[&_p.uppercase]:text-[11px]">
        <Heading eyebrow={hero.eyebrow} lines={hero.lines} level={1} id="service-title" size="profile" />
      </div>
      {hero.subEyebrow || service.category ? <p className="mt-4 text-[9px] leading-[1.6] font-semibold tracking-[0.1em] text-clinic-sage uppercase tablet:text-[10px]">{hero.subEyebrow ?? `InBody Clinic · ${service.category}`}</p> : ""}
      {paragraphs(hero.description).map((paragraph) => <p key={paragraph} className="mt-5 max-w-[43ch] text-[13px] leading-[1.75] text-clinic-navy/85 tablet:text-[14px]">{paragraph}</p>)}
      <div className="mt-5 [&_a]:min-w-[230px] [&_a]:tracking-[0.1em] [&_a]:font-semibold">
        <ActionButton label="Learn more" href="#service-options" />
      </div>
      <ul className="mt-7 grid min-w-0 list-none grid-cols-1 gap-4 p-0 min-[26rem]:grid-cols-3 tablet:mt-8 tablet:gap-5">
        {(hero.benefits ?? []).map((benefit, index) => <ServiceBenefit key={index} {...benefit} />)}
      </ul>
    </div>
    <div className="min-w-0"><ServiceImage image={service.images.hero} hero /></div>
  </div>;
}
export function ServiceOptions(service) {
  const { options } = service;
  return <div className={`${containerClasses} grid min-w-0 items-start gap-9 py-10 tablet:gap-12 tablet:py-12 wide:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] wide:gap-16`} data-section-frame="service-options">
    <div className="min-w-0"><ServiceImage image={service.images.treatment} /></div>
    <div className="min-w-0 wide:pt-2">
      <div className="[&_p.uppercase]:mb-4 [&_p.uppercase]:text-[10px] [&_p.uppercase]:font-semibold [&_p.uppercase]:tracking-[0.12em] [&_p.uppercase]:text-clinic-sage tablet:[&_p.uppercase]:text-[11px]">
        <Heading eyebrow={options.eyebrow} lines={options.lines} level={2} id="service-options-title" size="section" />
      </div>
      <div className="mt-5 space-y-6 text-[13px] leading-[1.8] text-clinic-navy/85 tablet:text-[14px]">
        {(options.paragraphs ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <ol className="mt-5 list-none divide-y divide-clinic-light-sage p-0">
        {(options.items ?? []).map((item, index) => <li key={index} className="flex min-w-0 items-baseline gap-6 py-3">
          <span className="shrink-0 text-[17px] leading-[1.4] font-medium tabular-nums" aria-hidden="true">{numberLabel(index)}</span>
          <span className="min-w-0 text-[13px] leading-[1.6] text-clinic-navy/85 tablet:text-[14px]">{item}</span>
        </li>)}
      </ol>
    </div>
  </div>;
}
export function ServiceRecovery(service) {
  const { recovery } = service;
  return <div className={`${containerClasses} py-10 tablet:py-12`} data-section-frame="service-recovery">
    <div className="mx-auto max-w-[610px] text-center [&_p.uppercase]:mx-auto [&_p.uppercase]:mb-3 [&_p.uppercase]:max-w-none [&_p.uppercase]:text-[10px] [&_p.uppercase]:font-semibold [&_p.uppercase]:tracking-[0.12em] [&_p.uppercase]:text-clinic-sage tablet:[&_p.uppercase]:text-[11px]">
      <Heading eyebrow={recovery.eyebrow} lines={recovery.lines} level={2} id="service-recovery-title" size="section" />
      <p className="mx-auto mt-4 max-w-[52ch] text-[13px] leading-[1.8] text-clinic-navy/75 tablet:text-[14px]">{recovery.description}</p>
    </div>
    <ol className="mt-8 grid min-w-0 list-none grid-cols-1 gap-4 p-0 tablet:grid-cols-3">
      {(recovery.steps ?? []).map((step, index) => <li key={`${index}-${step.title}`} className="flex min-w-0 flex-col items-center rounded-[10px] bg-clinic-white px-6 py-6 text-center tablet:px-5 tablet:py-7">
        <span className="text-[26px] leading-none font-semibold text-clinic-sage tabular-nums" aria-hidden="true">{numberLabel(index)}</span>
        <h3 className="mt-4 max-w-[16ch] font-display text-[26px] leading-[1.05] font-semibold italic tablet:text-[28px]">{step.title}</h3>
        {step.description ? <p className="mt-3 max-w-[31ch] text-[12px] leading-[1.45] text-clinic-navy/75 tablet:text-[13px]">{step.description}</p> : ""}
      </li>)}
    </ol>
  </div>;
}
function ServiceExpertiseList({ column }) {
  return <ol className="mt-6 grid list-none gap-4 p-0">
    {(column.items ?? []).map((item, index) => <li key={index} className="flex min-w-0 items-center gap-5 rounded-[12px] bg-clinic-light-grey px-4 py-4 tablet:gap-6">
      <span className="shrink-0 font-display text-[26px] leading-none font-semibold italic tabular-nums" aria-hidden="true">{numberLabel(index)}</span>
      <span className="min-w-0 text-[12px] leading-[1.4] text-clinic-navy/85 tablet:text-[13px]">{item}</span>
    </li>)}
  </ol>;
}
export function ServiceExpertise(service) {
  const { expertise } = service;
  return <div className={`${containerClasses} pt-10 pb-6 tablet:pt-12 tablet:pb-8`} data-section-frame="service-expertise">
    <div className="mx-auto max-w-[730px] text-center">
      <Heading lines={expertise.lines} level={2} id="service-expertise-title" size="section" />
      {expertise.description ? paragraphs(expertise.description).map((paragraph) => <p key={paragraph} className="mx-auto mt-4 max-w-[58ch] text-[13px] leading-[1.8] text-clinic-navy/85 tablet:text-[14px]">{paragraph}</p>) : ""}
    </div>
    <div className="mt-10 grid min-w-0 items-start gap-6 wide:relative wide:grid-cols-2 wide:gap-12 wide:before:pointer-events-none wide:before:absolute wide:before:inset-y-0 wide:before:left-1/2 wide:before:w-px wide:before:bg-clinic-light-grey wide:before:content-['']">
      {(expertise.columns ?? []).map((column) => <article key={column.title} className="min-w-0 rounded-[20px] border border-clinic-navy/10 bg-clinic-white px-5 py-7 shadow-[0_12px_28px_rgb(32_56_88/0.07)] tablet:px-8 tablet:py-8">
        <h3 className="text-center font-display text-[28px] leading-[1.15] font-semibold italic tablet:text-[32px]">{column.title}</h3>
        <p className="mt-3 text-center text-[11px] leading-[1.6] font-medium tracking-[0.08em] text-clinic-navy/75 italic tablet:text-[12px]">{column.subtitle}</p>
        <ServiceExpertiseList column={column} />
      </article>)}
    </div>
    {expertise.note ? <p className="mx-auto mt-8 max-w-[85ch] text-center text-[13px] leading-[1.8] text-clinic-navy/85 tablet:text-[14px]">{expertise.note}</p> : ""}
  </div>;
}
export function ServiceQuote(service) {
  return <div className={`${containerClasses} pt-14 pb-7 tablet:pt-20 tablet:pb-8`} data-section-frame="service-quote">
    <blockquote className="mx-auto max-w-[1000px] text-center text-[12px] leading-[1.7] text-clinic-navy/90 tablet:text-[13px]">
      <p>“{service.quote}”</p>
    </blockquote>
  </div>;
}
export function ServiceCTA(service) {
  const { cta } = service;
  return <div className={`${containerClasses} flex min-w-0 flex-col items-start gap-6 py-10 tablet:py-12 wide:flex-row wide:items-center wide:justify-between wide:gap-10`} data-section-frame="service-cta">
    <div className="min-w-0">
      <Heading lines={cta.lines} level={2} id="service-cta-title" size="cta" inline={true} />
      <p className="mt-4 text-[13px] leading-[1.65] text-clinic-navy/85 tablet:text-[14px]">{cta.description}</p>
    </div>
    <div className="max-w-full shrink-0"><BookingButton variant="contact" href={service.booking.href} /></div>
  </div>;
}

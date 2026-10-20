import { assetUrl, siteUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { ActionButton } from "../../components/button.jsx";
import { containerClasses } from "../../layouts/container.js";
import { Icon } from "../../components/icons.jsx";
import { team, beatriz } from "../../data/team.js";
const specialties = [
  {
    label: "Women’s Health",
    icon: "ph-flower-tulip",
    href: "./pages/services/pain-tmj-relief/endometriosis-pelvic-pain-support.html"
  },
  {
    label: "Dermatofunctional Therapy",
    icon: "ph-waves",
    href: "./pages/specialities/skin-tissue-health.html"
  },
  {
    label: "Advanced Lymphatic Care",
    icon: "ph-drop",
    href: "./pages/specialities/clinical-lymphatic-care.html"
  }
];
const credentials = [
  {
    title: "20+",
    lines: ["Years of Clinical", "experience"]
  },
  {
    title: "Spain trained",
    lines: ["Physiotherapist"]
  },
  {
    title: "Sydney",
    lines: ["InBody Clinic"]
  },
  {
    title: "Clinical Tutor",
    lines: ["Mentoring healthcare", "students"]
  }
];
const expertise = [
  {
    title: "Post-surgical recovery",
    description: "Collaborating with Sydney surgeons to support recovery.",
    icon: "ph-stethoscope"
  },
  {
    title: "Lymphatic therapy",
    description: "Advanced Vodder and Leduc techniques.",
    icon: "ph-waves"
  },
  {
    title: "Women’s life stages",
    description: "Fertility, pregnancy, postpartum and hormonal support.",
    icon: "pregnancy",
    svg: true
  },
  {
    title: "Tissue rehabilitation",
    description: "Connective tissue care and recovery.",
    icon: "ph-plant"
  }
];
export function TherapistProfile() {
  return <div className={`${containerClasses} grid min-w-0 items-center gap-10 py-10 tablet:gap-12 tablet:py-12 wide:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] wide:gap-20 wide:py-10`} data-section-frame="about">
    <div className="min-w-0">
      <div className="[&_p.uppercase]:flex [&_p.uppercase]:items-center [&_p.uppercase]:gap-2 [&_p.uppercase]:after:w-16 [&_p.uppercase]:after:border-t [&_p.uppercase]:after:border-dashed [&_p.uppercase]:after:content-['']">
        <Heading eyebrow="Meet our team" level={1} size="profile" id="about-title" lines={[{ text: "Saila Insua López" }]} />
      </div>
      <p className="mt-3 text-[17px] leading-[1.4] font-medium text-clinic-sage tablet:text-[18px]">Spain-trained physiotherapist</p>
      <p className="mt-2.5 max-w-[48ch] text-[14px] leading-[1.4]">With over 20 years of clinical experience, Saila specialises in women’s health, dermatofunctional therapy and advanced lymphatic care.</p>
      <ul className="mt-4 list-none divide-y divide-clinic-light-sage border-y border-clinic-light-sage p-0">
        {specialties.map(({ label, icon, href }) => <li key={label}><a className="group flex min-h-[45px] items-center gap-4 py-2 text-[13px] leading-[1.4] transition-colors hover:text-clinic-sage motion-reduce:transition-none tablet:gap-5 tablet:text-[14px]" href={siteUrl(href)}>
          <i className={`ph ${icon} shrink-0 text-[24px] text-clinic-sage`} aria-hidden="true"></i>
          <span className="min-w-0">{label}</span>
          <i className="ph ph-caret-right ml-auto shrink-0 text-[18px] text-clinic-sage transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true"></i>
        </a></li>)}
      </ul>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
        <ActionButton label="View services" href="./#services" variant="services" />
        <a className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium transition-colors hover:text-clinic-sage motion-reduce:transition-none tablet:text-[15px]" href={siteUrl("mailto:Sailainsua@gmail.com")}><i className="ph ph-envelope text-[24px]" aria-hidden="true"></i><span>Contact Saila</span></a>
      </div>
    </div>
    <img className="aspect-[4/3] w-full min-w-0 rounded-[10px] object-cover object-center wide:h-full wide:min-h-[380px]" src={assetUrl("./assets/images/about/saila.jpg")} alt="Saila Insua López at InBody Clinic holding a treatment device in front of the clinic shelves" width="1600" height="1066" fetchPriority="high" />
  </div>;
}
export function TherapistCredentials() {
  return <dl className={`${containerClasses} grid grid-cols-2 gap-4 py-8 wide:grid-cols-4`} data-section-frame="credentials">
    {credentials.map(({ title, lines }) => <div key={title} className="flex min-h-[132px] min-w-0 flex-col items-center justify-center rounded-[3px] border border-clinic-white/60 px-3 py-5 text-center">
      <dt className="font-display text-[28px] leading-[1.1] font-semibold lining-nums tablet:text-[36px] wide:text-[32px] min-[80rem]:text-[36px] min-[90rem]:text-[40px]">{title}</dt>
      <dd className="mt-2 text-[11px] leading-[1.35] text-clinic-white/90 tablet:text-[12px]">{lines.map((line) => <span key={line} className="block">{line}</span>)}</dd>
    </div>)}
  </dl>;
}
export function TherapistExpertise() {
  return <div className={`${containerClasses} grid min-w-0 items-center gap-10 py-14 tablet:py-16 wide:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] wide:gap-20 wide:py-[60px]`} data-section-frame="expertise">
    <div className="min-w-0">
      <Heading level={2} size="section" id="expertise-title" accentItalic={false} lines={[{ text: "Experience" }, {
    text: "& expertise",
    accent: true
  }]} />
      <p className="mt-5 max-w-[42ch] text-[14px] leading-[1.7] tablet:text-[16px]">Individual assessment and specialised hands-on therapy inform Saila’s care, including Vodder and Leduc lymphatic drainage techniques. Therapeutic technology may support treatment when appropriate.</p>
    </div>
    <ul className="grid min-w-0 list-none grid-cols-1 gap-3 p-0 tablet:grid-cols-2">
      {expertise.map(({ title, description, icon, svg }) => <li key={title} className="flex min-h-[125px] min-w-0 items-center gap-4 rounded-lg bg-clinic-light-grey px-4 py-5">
        {svg ? <Icon name={icon} className="size-8 shrink-0 stroke-[1.1] text-clinic-sage" /> : <i className={`ph ${icon} shrink-0 text-[32px] text-clinic-sage`} aria-hidden="true"></i>}
        <div className="min-w-0">
          <h3 className="font-sans! text-[13px] leading-[1.35] font-semibold tablet:text-[14px]">{title}</h3>
          <p className="mt-1 text-[12px] leading-[1.55] text-clinic-navy/75">{description}</p>
        </div>
      </li>)}
    </ul>
  </div>;
}
export function BeatrizProfile() {
  return <div className={`${containerClasses} grid min-w-0 gap-9 py-14 tablet:gap-12 tablet:py-16 wide:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] wide:items-start wide:gap-16 wide:py-20`} data-section-frame="beatriz">
    <figure className="min-w-0 wide:sticky wide:top-[108px]">
      <img className="block h-auto w-full rounded-[10px]" src={assetUrl(beatriz.image.src)} alt={beatriz.image.alt} width={beatriz.image.width} height={beatriz.image.height} loading="lazy" />
    </figure>
    <div className="min-w-0">
      <Heading eyebrow="Meet our team" level={2} size="profile" id="beatriz-title" lines={[{ text: beatriz.name }]} />
      <p className="mt-4 text-[15px] leading-[1.65] font-medium text-clinic-navy/80 tablet:text-[16px]">{beatriz.role}</p>
      <p className="mt-4 inline-block rounded-full bg-clinic-light-sage px-4 py-2 text-[12px] leading-[1.5] font-semibold text-clinic-navy">{beatriz.experience}</p>
      <div className="mt-6 space-y-4 text-[14px] leading-[1.85] text-clinic-navy/85 tablet:text-[15px]">
        {beatriz.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <h3 className="mt-8 font-display text-[28px] leading-[1.2] font-semibold tablet:text-[30px]">Areas of Expertise</h3>
      <ul className="mt-5 list-none divide-y divide-clinic-sage/25 border-y border-clinic-sage/25 p-0">
        {beatriz.expertise.map(({ title, description }) => <li key={title} className="flex min-w-0 items-start gap-3 py-4 text-[13px] leading-[1.75] tablet:text-[14px]">
          <i className="ph ph-check-circle mt-1 shrink-0 text-[19px] text-clinic-sage" aria-hidden="true" />
          <p className="min-w-0"><strong className="font-semibold">{title}</strong><span> – {description}</span></p>
        </li>)}
      </ul>
      <h3 className="mt-8 font-display text-[28px] leading-[1.2] font-semibold tablet:text-[30px]">Her Approach</h3>
      <div className="mt-5 space-y-4 text-[14px] leading-[1.85] text-clinic-navy/85 tablet:text-[15px]">
        {beatriz.approach.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <p className="mt-7 border-t border-clinic-sage/25 pt-6 font-display text-[24px] leading-[1.4] font-medium text-clinic-navy tablet:text-[26px]">{beatriz.closing}</p>
    </div>
  </div>;
}
export function TeamDetails() {
  return <div className={`${containerClasses} grid min-w-0 items-center gap-9 py-14 tablet:gap-12 tablet:py-16 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:gap-20 wide:py-20`} data-section-frame="team-details">
    <figure className="min-w-0">
      <img className="block h-auto w-full rounded-[10px]" src={assetUrl(team.detailImage.src)} alt={team.detailImage.alt} width={team.detailImage.width} height={team.detailImage.height} loading="lazy" />
      <figcaption className="mt-4 text-[10px] leading-[1.6] font-medium tracking-[0.12em] text-clinic-navy/70 uppercase">InBody Clinic · Double Bay</figcaption>
    </figure>
    <div className="min-w-0">
      <Heading eyebrow="Experience, education & shared values" level={2} size="section" id="team-details-title" lines={[{ text: "The team behind" }, { text: "InBody Clinic" }]} />
      <p className="mt-6 text-[14px] leading-[1.85] text-clinic-navy/90 tablet:text-[15px]">{team.introduction}</p>
      <p className="mt-4 text-[13px] leading-[1.85] text-clinic-navy/85 tablet:text-[14px]">{team.philosophy}</p>
      <p className="mt-4 text-[13px] leading-[1.85] text-clinic-navy/85 tablet:text-[14px]">{team.sharedCare}</p>
      <div className="mt-7"><ActionButton label="Contact our team" href="./pages/contact.html" /></div>
    </div>
  </div>;
}

import { assetUrl, siteUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { ActionButton } from "../../components/button.jsx";
import { containerClasses } from "../../layouts/container.js";
import { Icon } from "../../components/icons.jsx";
import { team, saila, beatriz } from "../../data/team.js";

const clinicians = [saila, beatriz];
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
function ClinicianProfile({ clinician, index }) {
  return <article id={clinician.id} className="grid min-w-0 gap-y-5 nav:row-span-7 nav:grid-rows-subgrid" aria-labelledby={`${clinician.id}-title`} data-clinician={clinician.id}>
    <figure className="m-0 min-w-0 overflow-hidden rounded-[10px]" data-clinician-photo>
      <img className="block aspect-[4/3] w-full object-cover object-[center_45%] nav:aspect-[9/5]" src={assetUrl(clinician.image.src)} alt={clinician.image.alt} width={clinician.image.width} height={clinician.image.height} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
    </figure>
    <header className="min-w-0" data-clinician-heading>
      <p className="mb-2 text-[10px] leading-[1.6] font-semibold tracking-[0.2em] text-clinic-navy/65 uppercase">0{index + 1} / {clinician.id}</p>
      <h2 id={`${clinician.id}-title`} className="font-display text-[34px] leading-[1.12] font-semibold tracking-[-0.018em] text-clinic-navy tablet:text-[40px] nav:text-[36px] wide:text-[42px]">{clinician.name}</h2>
      <p className="mt-2 text-[13px] leading-[1.7] tablet:text-[14px]">
        {clinician.role.split(' | ').map(line => <span key={line} className="block">{line}</span>)}
        {clinician.profileFocus && <span className="block">{clinician.profileFocus}</span>}
      </p>
    </header>
    <p className="flex items-center gap-3 text-[12px] leading-[1.6] tablet:text-[13px]" data-clinician-experience><span className="h-px w-8 shrink-0 bg-clinic-sage" aria-hidden="true" />{clinician.experience}</p>
    <p className="text-[13px] leading-[1.8] text-clinic-navy/90 tablet:text-[14px]" data-clinician-summary>{clinician.summary}</p>
    <div className="min-w-0" data-clinician-focus>
      <h3 className="font-sans! text-[11px] leading-[1.5] font-semibold tracking-[0.2em] uppercase">Clinical focus</h3>
      <ul className="mt-3 list-none divide-y divide-clinic-sage/30 border-t border-clinic-sage/30 p-0">
        {clinician.expertise.map(({ title, href }) => <li key={title} className="flex min-h-11 items-start gap-4 py-2.5 text-[13px] leading-[1.7] tablet:text-[14px]">
          <span className="mt-[7px] size-2.5 shrink-0 rounded-full bg-clinic-sage" aria-hidden="true" />
          {href ? <a className="min-w-0 underline-offset-4 transition-colors hover:text-clinic-sage hover:underline motion-reduce:transition-none" href={siteUrl(href)}>{title}</a> : <span className="min-w-0">{title}</span>}
        </li>)}
      </ul>
    </div>
    <div className="min-w-0 pt-1" data-clinician-approach>
      <h3 className="font-sans! text-[11px] leading-[1.5] font-semibold tracking-[0.2em] uppercase">Her approach</h3>
      <p className="mt-3 text-[13px] leading-[1.8] text-clinic-navy/90 tablet:text-[14px]">{clinician.approachSummary}</p>
    </div>
    <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 pt-1" data-clinician-actions>
      <ActionButton label="View services" href="./#services" />
      <a className="inline-flex min-h-11 items-center gap-2 text-[12px] leading-[1.5] underline decoration-clinic-sage/60 underline-offset-4 transition-colors hover:text-clinic-sage motion-reduce:transition-none tablet:text-[13px]" href={siteUrl(clinician.contactHref)}><i className="ph ph-envelope shrink-0 text-[21px]" aria-hidden="true" /><span>{clinician.contactLabel}</span></a>
    </div>
  </article>;
}

export function MeetClinicians() {
  return <div className={`${containerClasses} pt-10 pb-14 tablet:pt-12 tablet:pb-20`} data-section-frame="about">
    <div className="mb-8 flex min-w-0 flex-col gap-4 nav:mb-10 nav:flex-row nav:items-center nav:gap-6">
      <Heading level={1} size="profile" id="about-title" lines={[{ text: 'Meet your clinicians' }]} />
      <span className="hidden h-px min-w-8 flex-1 bg-clinic-sage/60 nav:block" aria-hidden="true" />
      <p className="max-w-[36ch] text-[12px] leading-[1.7] text-clinic-navy/85">Different experience. A shared approach to your care.</p>
    </div>
    <div className="relative grid min-w-0 grid-cols-1 gap-y-12 nav:grid-cols-2 nav:gap-x-12 nav:gap-y-5 nav:before:pointer-events-none nav:before:absolute nav:before:inset-y-0 nav:before:left-1/2 nav:before:w-px nav:before:bg-clinic-sage/30 wide:gap-x-16">
      {clinicians.map((clinician, index) => <ClinicianProfile key={clinician.id} clinician={clinician} index={index} />)}
    </div>
  </div>;
}
export function TherapistExpertise() {
  return <div className={`${containerClasses} grid min-w-0 items-center gap-10 py-14 tablet:py-16 wide:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] wide:gap-20 wide:py-[60px]`} data-section-frame="expertise">
    <div className="min-w-0">
      <Heading level={2} size="section" id="expertise-title" accentItalic={false} lines={[{ text: "Experience" }, {
    text: "& expertise",
    accent: true
  }]} />
      <p className="mt-5 max-w-[42ch] text-[14px] leading-[1.7] tablet:text-[16px]">Individual assessment and specialised hands-on therapy inform Saila’s care, including Vodder and Leduc lymphatic drainage techniques. Therapeutic technology may support treatment when appropriate.</p>
      <p className="mt-4 max-w-[48ch] text-[13px] leading-[1.8] text-clinic-navy/80">Saila is a Spain-trained physiotherapist based in Sydney and a clinical tutor mentoring healthcare students.</p>
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

import { assetUrl, siteUrl } from '../../utils/urls.js';
import { HeroPicture } from '../../components/hero-picture.jsx';
import { Heading } from '../../components/heading.jsx';
import { ActionButton } from '../../components/button.jsx';
import { containerClasses } from '../../layouts/container.js';
import { team, saila, beatriz } from '../../data/team.js';

const panelClasses = 'min-w-0 rounded-[22px] border border-clinic-sage/20 bg-clinic-white p-6 tablet:p-8 wide:p-10';
const bodyClasses = 'text-[13px] leading-[1.85] text-clinic-navy/80 tablet:text-[14px]';
const sailaFocus = [
  { title: 'Post-surgical recovery', description: 'Collaborating with Sydney surgeons to support recovery.' },
  { title: 'Lymphatic therapy', description: 'Advanced Vodder and Leduc techniques.' },
  { title: 'Women’s life stages', description: 'Fertility, pregnancy, postpartum and hormonal support.' },
  { title: 'Tissue rehabilitation', description: 'Connective tissue care and recovery.' },
];
const clinicianFacts = {
  saila: [
    { title: '20+', detail: 'Years of clinical experience' },
    { title: 'Women’s Health', detail: 'Physiotherapy specialist' },
    { title: 'Founder & Clinical Director', detail: 'InBody Clinic, Sydney' },
    { title: 'Clinical Placement Tutor', detail: 'Universidad Francisco de Vitoria' },
  ],
  beatriz: [
    { title: '22+', detail: 'Years of clinical experience' },
    { title: 'Chile trained', detail: 'Physiotherapist' },
    { title: 'Australia', detail: 'Remedial Massage Therapist' },
    { title: 'InBody Method™', detail: 'Personalised care' },
  ],
};

function Eyebrow({ children, className = '' }) {
  return <p className={`text-[9px] leading-[1.7] font-semibold tracking-[0.17em] uppercase tablet:text-[10px] ${className}`}>{children}</p>;
}

function ProfileActions({ clinician }) {
  return <div className="mt-6 flex min-w-0 flex-wrap items-center gap-3 border-t border-clinic-sage/20 pt-5" data-clinician-actions>
    <ActionButton label="View services" href="./#services" />
    <a className="inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full border border-clinic-sage/20 bg-clinic-cream px-4 py-2.5 text-[11px] leading-[1.5] transition-colors hover:bg-clinic-light-sage/50 motion-reduce:transition-none tablet:text-[12px]" href={siteUrl(clinician.contactHref)}>
      <i className="ph ph-envelope shrink-0 text-[17px]" aria-hidden="true" /><span>{clinician.contactLabel}</span>
    </a>
  </div>;
}

function TherapistPortrait({ clinician, index }) {
  return <div className={`min-w-0 ${index === 1 ? 'nav:col-start-2 nav:row-start-1' : ''}`} data-clinician-media>
    <figure className="m-0 overflow-hidden rounded-[22px] bg-clinic-navy" data-clinician-photo>
      <HeroPicture image={clinician.image} className="block aspect-[9/10] w-full" imgClassName={`block ${clinician.image.webp?.length ? 'size-full' : 'aspect-[9/10] w-full'} object-cover ${clinician.id === 'beatriz' ? 'object-[56%_center]' : 'object-center'}`} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
      <figcaption className="flex min-w-0 items-center justify-between gap-4 px-5 py-5 text-clinic-white tablet:px-6">
        <div className="min-w-0">
          <Eyebrow className="text-clinic-light-sage">Meet your therapist</Eyebrow>
          <p className="mt-1 font-display text-[25px] leading-[1.1] font-semibold tablet:text-[28px]">{clinician.name}</p>
          <p className="mt-1 text-[10px] leading-[1.5] text-clinic-white/75">{clinician.role.split(' | ')[0]}</p>
        </div>
        <div className="shrink-0 border-l border-clinic-white/15 pl-4 text-right" aria-label={clinician.experience}>
          <p className="font-display text-[27px] leading-none font-semibold text-clinic-light-sage">{index === 0 ? '20+' : '22+'}</p>
          <p className="mt-1 text-[8px] leading-[1.5] tracking-[0.12em] uppercase">Years exp.</p>
        </div>
      </figcaption>
    </figure>
    <dl className="mt-4 grid min-w-0 grid-cols-2 gap-3" data-clinician-facts>
      {clinicianFacts[clinician.id].map(({ title, detail }) => <div key={title} className="flex min-h-24 min-w-0 flex-col justify-center rounded-[16px] border border-clinic-sage/20 bg-clinic-white p-4 text-clinic-navy tablet:min-h-[104px] tablet:p-5">
        <dt className="font-display text-[20px] leading-[1.15] font-semibold tablet:text-[25px]">{title}</dt>
        <dd className="mt-1 text-[10px] leading-[1.6] tablet:text-[11px]">{detail}</dd>
      </div>)}
    </dl>
  </div>;
}

function BiographyCard({ clinician }) {
  return <div className={panelClasses} data-clinician-biography>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Eyebrow>Meet your therapist</Eyebrow>
    </div>
    <header className="mt-4" data-clinician-heading>
      <h2 id={`${clinician.id}-title`} className="font-display text-[36px] leading-[1.08] font-semibold tracking-[-0.018em] tablet:text-[44px] wide:text-[50px]">{clinician.name}</h2>
      <p className="mt-2 text-[12px] leading-[1.7] text-clinic-navy/80 tablet:text-[13px]">{clinician.role}</p>
    </header>
    <div className={`mt-5 space-y-4 ${bodyClasses}`} data-clinician-summary>
      {(clinician.biography ?? [clinician.summary]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </div>
    {clinician.id === 'saila' && <ul className="mt-5 grid list-none grid-cols-1 gap-2 p-0 min-[48rem]:grid-cols-3 nav:grid-cols-1 wide:grid-cols-3" data-clinician-focus>
      {clinician.expertise.map(({ title, href }) => <li key={title} className="min-w-0">
        <a className="flex h-full min-h-16 items-center gap-2 rounded-[14px] border border-clinic-sage/15 bg-clinic-cream px-3 py-3 text-[10px] leading-[1.6] font-semibold transition-colors hover:bg-clinic-light-sage/50 motion-reduce:transition-none tablet:text-[11px]" href={siteUrl(href)}><span className="size-1.5 shrink-0 rounded-full bg-clinic-sage" aria-hidden="true" />{title}</a>
      </li>)}
    </ul>}
    <ProfileActions clinician={clinician} />
  </div>;
}

function ExpertiseGrid({ items }) {
  return <ol className="mt-5 grid min-w-0 list-none grid-cols-1 gap-3 p-0 tablet:grid-cols-2 nav:grid-cols-1 wide:grid-cols-2">
    {items.map(({ title, description }, index) => <li key={title} className={`flex min-w-0 items-start gap-3 rounded-[16px] border border-clinic-sage/15 bg-clinic-cream p-4 tablet:p-5 ${items.length % 2 === 1 && index === items.length - 1 ? 'tablet:col-span-2 nav:col-span-1 wide:col-span-2' : ''}`}>
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-clinic-sage/15 bg-clinic-white text-[10px] text-clinic-navy/65" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <h4 className="font-sans! text-[12px] leading-[1.6] font-semibold tablet:text-[13px]">{title}</h4>
        <p className="mt-1 text-[11px] leading-[1.75] text-clinic-navy/75 tablet:text-[12px]">{description}</p>
      </div>
    </li>)}
  </ol>;
}

function ExpertiseCard({ clinician }) {
  const isSaila = clinician.id === 'saila';
  return <div className={panelClasses} data-clinician-expertise>
    <div className="border-b border-clinic-sage/20 pb-4">
      <Eyebrow>{isSaila ? 'Clinical focus · Saila Insua López' : 'Beatriz · Clinical modalities'}</Eyebrow>
      <h3 className="mt-2 font-display text-[30px] leading-[1.15] font-semibold tablet:text-[34px]">{isSaila ? <>Experience <em className="font-normal text-clinic-sage">&amp; expertise</em></> : <>Areas of <em className="font-normal text-clinic-sage">Expertise</em></>}</h3>
      {isSaila && <div className={`mt-4 space-y-3 ${bodyClasses}`} data-clinician-approach>{clinician.approach.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>}
    </div>
    <ExpertiseGrid items={isSaila ? sailaFocus : clinician.expertise} />
  </div>;
}

function ApproachCard({ clinician }) {
  return <div className="min-w-0 rounded-[22px] bg-clinic-navy p-6 text-clinic-white tablet:p-8 wide:p-10" data-clinician-approach>
    <Eyebrow className="text-clinic-light-sage">Personalised care · The InBody Method™</Eyebrow>
    <h3 className="mt-3 font-display text-[30px] leading-[1.15] font-semibold tablet:text-[34px]">Her <em className="font-normal text-clinic-light-sage">Approach</em></h3>
    <div className="mt-4 space-y-4 text-[13px] leading-[1.85] text-clinic-white/90 tablet:text-[14px]">
      {clinician.approach.map((paragraph, index) => <p key={paragraph} className={index === 0 ? 'font-semibold' : undefined}>{paragraph}</p>)}
    </div>
  </div>;
}

function ClinicianSection({ clinician, index }) {
  return <div className={`${containerClasses} ${index === 0 ? 'pt-14 tablet:pt-20' : 'pt-16 tablet:pt-24'}`} data-section-frame={clinician.id}>
    <article id={clinician.id} className="min-w-0" aria-labelledby={`${clinician.id}-title`} data-clinician={clinician.id}>
      <div className="mb-7 flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 border-b border-clinic-sage/20 pb-4 tablet:mb-8">
        <span className="font-display text-[16px] font-semibold text-clinic-sage italic" aria-hidden="true">0{index + 1} / 02</span>
        <Eyebrow>Meet your therapist</Eyebrow>
        <p className="ml-auto text-[9px] leading-[1.6] tracking-[0.1em] text-clinic-navy/65 uppercase tablet:text-[10px]">{clinician.role}</p>
      </div>
      <div className={`grid min-w-0 items-start gap-6 wide:gap-8 ${index === 0 ? 'nav:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]' : 'nav:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]'}`}>
        <TherapistPortrait clinician={clinician} index={index} />
        <div className={`grid min-w-0 gap-5 ${index === 1 ? 'nav:col-start-1 nav:row-start-1' : ''}`} data-clinician-content>
          <BiographyCard clinician={clinician} />
          <ExpertiseCard clinician={clinician} />
          {index === 1 && <ApproachCard clinician={clinician} />}
        </div>
      </div>
    </article>
  </div>;
}

export function AboutHero() {
  return <div className="relative isolate overflow-hidden border-b border-clinic-sage/20">
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-35" style={{ backgroundImage: 'linear-gradient(to right, #879f9b12 1px, transparent 1px), linear-gradient(to bottom, #879f9b12 1px, transparent 1px)', backgroundSize: '44px 44px' }} aria-hidden="true" />
    <div className={`${containerClasses} grid min-w-0 items-center gap-8 py-12 tablet:py-16 nav:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] nav:gap-14 wide:py-20`} data-section-frame="about">
      <div className="min-w-0">
        <div className="mb-7 inline-flex rounded-full border border-clinic-sage/15 bg-clinic-white px-5 py-2"><Eyebrow>Our clinical team</Eyebrow></div>
        <Heading level={1} size="profile" id="about-title" lines={[{ text: 'One shared philosophy.' }, { segments: [{ text: 'Personalised care. ', accent: true }, { text: 'The InBody Method™.' }] }]} />
      </div>
      <div className="min-w-0 rounded-[20px] border border-clinic-sage/20 bg-clinic-white p-6 tablet:p-7">
        <div className="flex items-center gap-4">
          <p className="shrink-0 font-display text-[42px] leading-none font-semibold tablet:text-[48px]">42+</p>
          <Eyebrow className="border-l border-clinic-sage/30 pl-4">Combined years of<br />clinical experience</Eyebrow>
        </div>
        <p className="mt-4 text-[12px] leading-[1.85] text-clinic-navy/75">{team.summary}</p>
      </div>
    </div>
  </div>;
}

export function SailaProfile() { return <ClinicianSection clinician={saila} index={0} />; }
export function BeatrizProfile() { return <ClinicianSection clinician={beatriz} index={1} />; }

export function TeamDetails() {
  return <div className={`${containerClasses} pt-16 tablet:pt-24`} data-section-frame="team-details">
    <div className="grid min-w-0 items-stretch gap-6 border-t border-clinic-sage/20 pt-10 nav:grid-cols-2 wide:gap-8 tablet:pt-12">
      <figure className="m-0 flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-clinic-sage/20 bg-clinic-white">
        <div className="relative aspect-[3/2] nav:aspect-auto nav:min-h-0 nav:flex-1">
          <img className="absolute inset-0 block h-full w-full object-cover object-center" src={assetUrl(team.detailImage.src)} alt={team.detailImage.alt} width={team.detailImage.width} height={team.detailImage.height} loading="lazy" />
        </div>
        <figcaption className="shrink-0 px-6 py-5 tablet:px-7">
          <p className="font-display text-[26px] leading-[1.2] font-semibold">Saila &amp; Beatriz</p>
          <p className="mt-1 text-[9px] leading-[1.7] tracking-[0.14em] text-clinic-navy/65 uppercase tablet:text-[10px]">InBody Clinic · Double Bay</p>
        </figcaption>
      </figure>
      <div className={panelClasses}>
        <Heading eyebrow="Experience, education & shared values" level={2} size="compact" id="team-details-title" lines={[{ text: 'The team behind' }, { text: 'InBody Clinic', accent: true }]} />
        <div className={`mt-6 space-y-4 ${bodyClasses}`}>
          {[team.introduction, team.philosophy, team.sharedCare].map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mt-6 border-t border-clinic-sage/20 pt-5"><ActionButton label="Contact our team" href="./pages/contact.html" /></div>
      </div>
    </div>
  </div>;
}

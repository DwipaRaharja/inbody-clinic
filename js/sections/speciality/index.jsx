import { assetUrl, siteUrl } from "../../utils/urls.js";
import { HeroPicture } from "../../components/hero-picture.jsx";
import { Heading } from "../../components/heading.jsx";
import { ActionButton } from "../../components/button.jsx";
import { containerClasses } from "../../layouts/container.js";
import { initSpecialityReveal } from "../../features/care-reveal.js";
function paragraphs(value) {
  return Array.isArray(value) ? value : [value];
}
export function SpecialityHero(speciality) {
  return <div className={`${containerClasses} grid min-w-0 gap-9 py-12 tablet:py-16 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:items-center wide:gap-16`}>
    <div className="min-w-0"><a className="mb-6 inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase hover:text-clinic-sage" href={siteUrl("./#services")}><i className="ph ph-arrow-left" aria-hidden="true"></i>All specialities</a>
      <Heading eyebrow={speciality.name} level={1} id="speciality-title" size="profile" lines={speciality.headline.map((text, index) => ({
    text,
    accent: index === 1
  }))} />
      {paragraphs(speciality.introduction).map((paragraph) => <p key={paragraph} className="mt-6 max-w-[56ch] text-[14px] leading-[1.85] tablet:text-[15px]">{paragraph}</p>)}
      <div className="mt-7"><ActionButton label="Book an appointment" href={speciality.bookingHref} /></div>
    </div>
    <HeroPicture image={speciality.image} className="block aspect-[4/3] w-full min-w-0 overflow-hidden rounded-xl wide:aspect-[5/4]" imgClassName={`block ${speciality.image.webp?.length ? 'size-full' : 'aspect-[4/3] w-full min-w-0'} object-cover`} fetchPriority="high" />
  </div>;
}
export function SpecialityNeeds(speciality) {
  return <div className={`${containerClasses} grid min-w-0 gap-9 py-14 tablet:py-20 wide:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] wide:gap-20`}>
    <div><Heading eyebrow="Who we can help" level={2} id="speciality-needs-title" size="section" lines={[{ text: speciality.needsHeading ?? speciality.question }]} />
      <p className="mt-5 max-w-[45ch] text-[14px] leading-[1.8] text-clinic-navy/80">{speciality.needsIntroduction ?? "These are some of the concerns we can discuss with you. Your assessment helps us understand what is relevant to your situation."}</p>
    </div>
    <ul className="m-0 grid list-none grid-cols-1 gap-0 divide-y divide-clinic-light-sage border-y border-clinic-light-sage p-0">
      {speciality.needs.map((need) => <li key={need} className="flex items-start gap-4 py-4 text-[14px] leading-[1.7]"><i className="ph ph-check-circle mt-1 shrink-0 text-[20px] text-clinic-sage" aria-hidden="true"></i><span>{need}</span></li>)}
    </ul>
  </div>;
}
export function SpecialityApproach(speciality) {
  return <div className={`${containerClasses} grid min-w-0 gap-10 py-14 tablet:py-20 wide:grid-cols-2 wide:gap-20`}>
    <div><Heading eyebrow="The InBody Method™" level={2} id="speciality-approach-title" size="section" lines={[{ text: speciality.approachHeading ?? "Our clinical approach" }]} />
      {paragraphs(speciality.approach).map((paragraph) => <p key={paragraph} className="mt-6 text-[14px] leading-[1.85]">{paragraph}</p>)}
      <a className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold underline decoration-clinic-sage underline-offset-4 hover:text-clinic-sage" href={siteUrl("./pages/the-inbody-method.html")}>Explore The InBody Method™<i className="ph ph-arrow-right" aria-hidden="true"></i></a>
      <h3 className="mt-9 text-[26px] leading-[1.2] font-semibold">When care may be appropriate</h3>
      {paragraphs(speciality.timing).map((paragraph) => <p key={paragraph} className="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">{paragraph}</p>)}
    </div>
    <div className="min-w-0 rounded-xl bg-clinic-white p-6 tablet:p-8"><h3 className="text-[28px] leading-[1.2] font-semibold">Your treatment may include</h3>
      <p className="mt-3 text-[13px] leading-[1.75] text-clinic-navy/75">{speciality.techniquesIntroduction ?? "Techniques are selected for your assessment and individual needs."}</p>
      <ul className="mt-6 list-none divide-y divide-clinic-light-grey p-0">{speciality.techniques.map((technique, index) => <li key={technique} className="flex gap-4 py-4 text-[13px] leading-[1.7]"><span className="shrink-0 text-clinic-sage">0{index + 1}</span><span>{technique}</span></li>)}</ul>
    </div>
  </div>;
}
export function SpecialityTreatments(speciality) {
  return <div className={`${containerClasses} py-14 tablet:py-20`}>
    <Heading eyebrow="Explore in more detail" level={2} id="speciality-treatments-title" size="section" lines={[{ text: "Related treatment information" }]} />
    <p className="mt-5 max-w-[66ch] text-[14px] leading-[1.8] text-clinic-navy/80">Learn about some of the treatments within this speciality. You can also contact us without choosing a treatment first.</p>
    <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 tablet:grid-cols-2 wide:grid-cols-3">
      {speciality.treatments.map((treatment) => <li key={treatment.id} className="min-w-0"><a className="group flex h-full flex-col rounded-xl border border-clinic-light-grey p-6 transition-colors hover:border-clinic-sage hover:bg-clinic-cream motion-reduce:transition-none" href={siteUrl(treatment.href)} aria-labelledby={`related-${treatment.id}-title`} aria-describedby={`related-${treatment.id}-summary`} data-treatment-card={treatment.id}>
        <h3 className="font-display text-[25px] leading-[1.2] font-semibold" id={`related-${treatment.id}-title`}>{treatment.name}</h3>
        <p className="mt-4 text-[13px] leading-[1.8] text-clinic-navy/80" id={`related-${treatment.id}-summary`}>{treatment.summary}</p>
        <span className="mt-auto inline-flex items-center gap-3 pt-6 text-[12px] leading-[1.5] font-medium">View treatment details<i className="ph ph-arrow-right shrink-0 text-[20px] text-clinic-sage transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true"></i></span>
      </a></li>)}
    </ul>
  </div>;
}
export function SpecialityBookingCTA(speciality) {
  return <div className={`${containerClasses} flex min-w-0 flex-col items-start gap-6 py-10 tablet:py-12 wide:flex-row wide:items-center wide:justify-between wide:gap-10`} data-section-frame="speciality-booking">
    <div className="min-w-0">
      <Heading lines={[{ text: "Discuss your" }, { text: speciality.booking.care, accent: true }]} level={2} id="speciality-booking-title" size="cta" inline={true} />
      <p className="mt-4 text-[13px] leading-[1.65] text-clinic-navy/85 tablet:text-[14px]">{speciality.booking.description}</p>
    </div>
    <div className="max-w-full shrink-0"><ActionButton label="Book an Appointment" href={speciality.bookingHref} variant="contact" /></div>
  </div>;
}
export function createSpecialityPage(speciality) {
  return {
    id: "speciality",
    specialityId: speciality.id,
    background: "white",
    init: initSpecialityReveal,
    sections: [
      {
        id: "speciality",
        className: "bg-clinic-cream",
        labelledBy: "speciality-title",
        render: () => <SpecialityHero {...speciality} />
      },
      {
        id: "speciality-needs",
        className: "bg-clinic-white",
        labelledBy: "speciality-needs-title",
        render: () => <SpecialityNeeds {...speciality} />
      },
      {
        id: "speciality-approach",
        className: "bg-clinic-light-sage/40",
        labelledBy: "speciality-approach-title",
        render: () => <SpecialityApproach {...speciality} />
      },
      {
        id: "speciality-treatments",
        className: "bg-clinic-white",
        labelledBy: "speciality-treatments-title",
        render: () => <SpecialityTreatments {...speciality} />
      },
      {
        id: "speciality-booking",
        className: "bg-clinic-light-sage",
        labelledBy: "speciality-booking-title",
        render: () => <SpecialityBookingCTA {...speciality} />
      }
    ]
  };
}

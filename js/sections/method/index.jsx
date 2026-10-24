import { assetUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { MethodSteps, AssessmentCTA } from "../../components/care.jsx";
import { containerClasses } from "../../layouts/container.js";
import { methodElements } from "../../data/method.js";
import { team } from "../../data/team.js";
export function MethodIntro() {
  return <div className={`${containerClasses} grid min-w-0 gap-8 py-10 tablet:gap-10 tablet:py-14 wide:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] wide:gap-x-16 wide:gap-y-8 wide:py-16`}>
      <div className="min-w-0 wide:col-start-1 wide:row-start-1">
        <Heading level={1} id="method-page-title" size="profile" lines={[{ text: "The InBody" }, { text: "Method™", accent: true }]} />
        <p className="mt-5 max-w-[34ch] font-display text-[26px] leading-[1.35] font-medium text-clinic-sage tablet:text-[30px]">Born from experience. Driven by passion. Created for women.</p>
        <p className="mt-5 text-[14px] leading-[1.85] text-clinic-navy/85 tablet:text-[15px]">The InBody Method™ is the result of over 20 years of clinical experience, continuous learning and a genuine passion for women’s health and wellbeing.</p>
      </div>
      <picture className="block aspect-[4/3] w-full min-w-0 overflow-hidden rounded-xl wide:sticky wide:top-[108px] wide:col-start-2 wide:row-span-2 wide:row-start-1 wide:self-start">
        <source srcSet={assetUrl("./assets/gallery/clinic_reception.webp")} type="image/webp" />
        <img className="block size-full object-cover" src={assetUrl("./assets/gallery/clinic_reception.jpeg")} alt="The clinic reception with seating and illuminated product shelves" width="1536" height="1024" fetchPriority="high" />
      </picture>
    <div className="min-w-0 text-[14px] leading-[1.85] text-clinic-navy/85 tablet:text-[15px] wide:col-start-1 wide:row-start-2">
      <p>Our journey began in physiotherapy, including the founding of a specialised women’s health clinic in Madrid. Through years of advanced training and clinical practice across Europe and Chile, we have developed expertise in pelvic health, pregnancy and postpartum care, clinical lymphatic drainage, lipedema, dermatofunctional therapy and recovery following plastic and reconstructive surgery.</p>
      <p className="mt-5">We are women. We are mothers. And we understand that every stage of a woman’s life brings different needs.</p>
      <p className="mt-5">Our professional knowledge and personal experiences inspired us to create more than a treatment clinic a space where women feel heard, understood and genuinely cared for.</p>
      <div className="mt-10 tablet:mt-12">
        <Heading level={2} size="compact" lines={[{ text: "Your Body Is Unique." }, { text: "Your Treatment Should Be Too.", accent: true }]} />
      </div>
      <p className="mt-6">At InBody Clinic, we don’t follow one-size-fits-all protocols.</p>
      <p className="mt-5">We listen, assess and adapt every treatment to your individual needs, combining specialised hands-on techniques, clinical reasoning and advanced therapeutic technologies when appropriate.</p>
      <p className="mt-5">What makes our method different isn’t one particular technique, but the experience, knowledge and care behind every treatment.</p>
      <p className="mt-5">Because exceptional care is not just about what we do. It’s about knowing why, when and how to do it for you.</p>
      <p className="mt-8 border-t border-clinic-sage/30 pt-6 font-display text-[24px] leading-[1.45] text-clinic-navy tablet:text-[28px]">The InBody Method™ Experience, knowledge and care. Uniquely tailored to you.</p>
    </div>
  </div>;
}
export function MethodPrinciples() {
  return <div className={`${containerClasses} py-14 tablet:py-20`}>
    <div className="grid min-w-0 gap-6 wide:grid-cols-2 wide:gap-20"><div><Heading eyebrow="Beyond a treatment name" level={2} id="method-principles-title" size="section" lines={[{ text: "The care behind" }, {
    text: "your treatment",
    accent: true
  }]} /></div>
      <p className="text-[14px] leading-[1.85] text-clinic-navy/80">Our expertise goes beyond lymphatic drainage. We consider your condition, symptoms, tissue quality and stage of recovery before deciding which treatment is most appropriate. Clinical assessment and specialised hands-on care lead the approach.</p>
    </div>
    <ul className="mt-10 grid list-none grid-cols-1 gap-x-12 gap-y-8 p-0 tablet:grid-cols-2">
      {methodElements.map((element) => <li key={element.title} className="flex min-w-0 items-start gap-5 border-t border-clinic-light-sage pt-6"><span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage/50"><i className={`ph ${element.icon} text-[25px]`} aria-hidden="true"></i></span><div className="min-w-0"><h3 className="text-[25px] leading-[1.2] font-semibold">{element.title}</h3><p className="mt-3 text-[13px] leading-[1.8] text-clinic-navy/80">{element.description}</p></div></li>)}
    </ul>
  </div>;
}
export function MethodPathway() {
  return <div className={`${containerClasses} py-14 tablet:py-20`}>
    <Heading eyebrow="A continuing process" level={2} id="method-pathway-title" size="section" lines={[{ text: "Assess. Personalise." }, {
    text: "Treat. Reassess.",
    accent: true
  }]} />
    <p className="mt-5 max-w-[65ch] text-[14px] leading-[1.8] text-clinic-navy/80">Your care is not a fixed sequence of identical treatments. We reassess your response, discuss your needs and adapt the approach over time.</p>
    <div className="mt-9"><MethodSteps /></div>
  </div>;
}
export function MethodHumanCare() {
  return <div className={`${containerClasses} grid min-w-0 gap-8 py-14 tablet:py-20 wide:grid-cols-2 wide:gap-20`}>
    <div><Heading eyebrow="Clinical knowledge. Personal care." level={2} id="method-human-title" size="section" lines={[{ text: "Experience with" }, {
    text: "understanding",
    accent: true
  }]} /></div>
    <div><p className="text-[15px] leading-[1.85]">{team.philosophy}</p><p className="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">{team.sharedCare}</p><p className="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">We want you to understand your care, feel comfortable asking questions and take an informed part in the decisions about your treatment.</p></div>
  </div>;
}
export { AssessmentCTA };

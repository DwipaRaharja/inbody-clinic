import { Fragment } from "react";
import { assetUrl } from "../utils/urls.js";
import { Heading } from "./heading.jsx";
import { ActionButton } from "./button.jsx";
import { containerClasses } from "../layouts/container.js";
import { methodIntro, methodSteps, visitSteps } from "../data/method.js";
import { team } from "../data/team.js";
export function MethodSteps() {
  return <ol className="grid auto-rows-fr list-none grid-cols-1 gap-y-10 p-0 wide:grid-cols-4 wide:gap-x-10" aria-label="Assess, personalise, treat, reassess">
      {methodSteps.map((step, index) => <li key={step.title} className="relative min-w-0 rounded-xl border border-clinic-sage/20 bg-clinic-white p-6">
        <span className="block text-[11px] font-medium tracking-[0.16em] text-clinic-navy/55">0{index + 1}</span>
        <h3 className="mt-6 font-display text-[30px] leading-[1.15] font-semibold text-clinic-navy">{step.title}</h3>
        <p className="mt-3 max-w-[34ch] text-[13px] leading-[1.85] text-clinic-navy/80 wide:text-[14px]">{step.description}</p>
        {index < methodSteps.length - 1 ? <Fragment><span className="pointer-events-none absolute top-full left-1/2 flex h-10 w-6 -translate-x-1/2 items-center justify-center text-clinic-sage wide:hidden" aria-hidden="true"><i className="ph ph-arrow-down text-[24px]"></i></span>
        <span className="pointer-events-none absolute top-1/2 left-full hidden h-6 w-10 -translate-y-1/2 items-center justify-center text-clinic-sage wide:flex" aria-hidden="true"><i className="ph ph-arrow-right text-[24px]"></i></span></Fragment> : ""}
      </li>)}
    </ol>;
}
export function MethodPreview({ id = "method-title" } = {}) {
  return <div className={`${containerClasses} py-14 tablet:py-20`} data-section-frame="method">
    <div className="grid min-w-0 gap-8 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:items-start wide:gap-20">
      <div><Heading eyebrow="Our clinical approach" level={2} id={id} size="section" lines={[{ text: "The InBody" }, {
    text: "Method™",
    accent: true
  }]} /></div>
      <div className="min-w-0"><p className="text-[15px] leading-[1.8]">{methodIntro}</p>
        <p className="mt-4 text-[14px] leading-[1.8] text-clinic-navy/80">We assess your condition, symptoms, tissue quality and stage of recovery to choose the most appropriate care. Our expertise goes beyond lymphatic drainage.</p>
        <p className="mt-4 text-[14px] leading-[1.8] text-clinic-navy/80">Specialised hands-on therapy comes together with personalised advice, ongoing review and therapeutic technology when appropriate.</p>
        <div className="mt-6"><ActionButton label="Explore our method" href="./pages/the-inbody-method.html" /></div>
      </div>
    </div>
    <div className="mt-10 tablet:mt-12"><MethodSteps /></div>
  </div>;
}
export function TeamPreview({ id = "team-title", level = 2 } = {}) {
  return <div className={`${containerClasses} grid min-w-0 gap-9 py-14 tablet:py-20 wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:items-center wide:gap-20`} data-section-frame="team">
    <div className="relative min-w-0 overflow-hidden rounded-xl bg-clinic-light-sage/30">
      <img className="block aspect-[5/4] w-full object-cover object-center wide:aspect-[4/5] wide:object-[40%_center]" src={assetUrl(team.image.src)} alt={team.image.alt} width={team.image.width} height={team.image.height} loading="lazy" />
    </div>
    <div className="min-w-0">
      <Heading eyebrow="Experience, education & expertise" level={level} id={id} size={level === 1 ? "profile" : "section"} lines={[{ text: "Meet Our Team" }]} />
      <p className="mt-6 text-[14px] leading-[1.85] tablet:text-[15px]">{team.introduction}</p>
      <p className="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">{team.philosophy}</p>
      <p className="mt-4 text-[14px] leading-[1.85] text-clinic-navy/80">{team.sharedCare}</p>
      <div className="mt-7"><ActionButton label={level === 1 ? "The InBody Method™" : "Meet our team"} href={level === 1 ? "./pages/the-inbody-method.html" : "./pages/about.html"} /></div>
    </div>
  </div>;
}
export function WhatToExpect({ id = "expect-title" } = {}) {
  return <div className={`${containerClasses} py-14 tablet:py-20`} data-section-frame="expect">
    <div className="mx-auto max-w-[760px] text-center [&_p.uppercase]:mx-auto">
      <Heading eyebrow="Your visit, explained" level={2} id={id} size="section" lines={[{ text: "What to Expect" }]} />
      <p className="mx-auto mt-5 max-w-[60ch] text-[14px] leading-[1.8] text-clinic-navy/80">You bring your questions and concerns. We take time to understand them and explain an approach shaped around your needs.</p>
    </div>
    <ol className="mt-10 grid list-none grid-cols-1 gap-5 p-0 tablet:grid-cols-2 wide:mt-12 wide:grid-cols-4">
      {visitSteps.map((step, index) => <li key={step.title} className="min-w-0 rounded-xl border border-clinic-light-grey bg-clinic-white p-6 tablet:p-7">
        <span className="text-[12px] font-medium tracking-[0.12em] text-clinic-sage">0{index + 1}</span>
        <h3 className="mt-5 text-[26px] leading-[1.15] font-semibold">{step.title}</h3>
        <p className="mt-4 text-[13px] leading-[1.8] text-clinic-navy/80">{step.description}</p>
      </li>)}
    </ol>
  </div>;
}
export function AssessmentCTA({ id = "assessment-title" } = {}) {
  return <div className={`${containerClasses} grid min-w-0 gap-7 py-14 tablet:py-16 wide:grid-cols-[minmax(0,1fr)_auto] wide:items-center wide:gap-16`} data-section-frame="assessment">
    <div className="min-w-0"><Heading eyebrow="An individual starting point" level={2} id={id} size="section" lines={[{ text: "Not sure what to book?" }, {
    text: "Start here.",
    accent: true
  }]} />
      <p className="mt-5 max-w-[65ch] text-[14px] leading-[1.8]">An initial assessment and personalised treatment session helps us understand your needs and recommend an appropriate approach. You do not need to choose a technique first.</p>
    </div>
    <div className="min-w-0 wide:max-w-[300px]"><ActionButton label="Ask about an assessment" href="./pages/contact.html#contact-form" variant="contact" />
      <p className="mt-3 max-w-[40ch] text-[12px] leading-[1.65] text-clinic-navy/75">Contact our team to discuss appointments and the care you are looking for.</p>
    </div>
  </div>;
}

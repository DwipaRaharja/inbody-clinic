import { Fragment } from "react";
import { assetUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { ActionButton } from "../../components/button.jsx";
import { containerClasses, fullBleedGridClasses, pagePaddingClasses } from "../../layouts/container.js";
import { heroSlides } from "../../data/hero-slides.js";
function BenefitText({ text }) {
  return String(text).split(/<br\s*\/?\s*>/i).map((line, index) => <Fragment key={index}>{index > 0 && <br />}{line}</Fragment>);
}
function HeroBenefits({ benefits, vertical = false }) {
  const listClasses = vertical ? "grid w-full min-w-0 list-none grid-cols-3 gap-3.5 p-0 wide:grid-cols-1 wide:gap-5" : "mt-7 grid w-full max-w-[490px] min-w-0 list-none grid-cols-3 gap-3.5 p-0 tablet:mt-[31px] tablet:gap-5";
  return <ul className={listClasses} aria-label="Our approach">
    {benefits.map((benefit) => <li key={benefit.icon} className={`flex min-w-0 flex-col items-center gap-2.5 text-center tablet:gap-[13px] ${vertical ? "wide:flex-row wide:gap-5 wide:text-left" : ""}`}>
      <i className={`ph ${benefit.icon} inline-flex size-8 shrink-0 items-center justify-center text-[32px] text-clinic-navy tablet:size-[38px] tablet:text-[38px]`} aria-hidden="true"></i>
      <span className="text-[11px] leading-[1.2] font-medium text-clinic-navy tablet:text-[12px] wide:text-[14px]">{vertical ? <Fragment><span className="wide:hidden"><BenefitText text={benefit.label} /></span><span className="hidden wide:inline"><BenefitText text={benefit.inlineLabel} /></span></Fragment> : <BenefitText text={benefit.label} />}</span>
    </li>)}
  </ul>;
}
function HeroImage({ slide, primary, className }) {
  return <img className={`absolute inset-0 block size-full object-cover ${className}`} src={assetUrl(slide.image.src)} alt={slide.image.alt} width={slide.image.width} height={slide.image.height} fetchPriority={primary ? "high" : undefined} decoding={primary ? undefined : "async"} />;
}
export function HeroSlide({ slide, index = 0 }) {
  const primary = index === 0;
  const headingId = primary ? "hero-title" : `hero-title-${index + 1}`;
  const editorial = slide.layout === "image-bottom";
  const reversed = slide.layout === "image-left";
  const heading = <Heading eyebrow={slide.eyebrow} level={primary ? 1 : 2} size="hero" id={headingId} lines={slide.lines} />;
  const slideClasses = "col-start-1 row-start-1 w-full min-w-0 bg-clinic-white translate-x-full data-[position=active]:translate-x-0 data-[position=exit]:-translate-x-full motion-safe:[[data-animate=true]_&]:transition-transform motion-safe:[[data-animate=true]_&]:duration-700 motion-safe:[[data-animate=true]_&]:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none wide:min-h-[clamp(620px,57.4vw,826px)]";
  const content = editorial ? <Fragment>
    <div className={`${containerClasses} grid min-w-0 gap-8 pt-[43px] pb-8 tablet:py-10 wide:grid-cols-[minmax(0,2.2fr)_minmax(220px,1fr)] wide:gap-14`} data-section-copy="hero">
      <div className="min-w-0">
        {heading}
        <p className="mt-5 mb-6 max-w-[70ch] text-[13px] leading-[1.65] tablet:text-[14px] tablet:leading-[1.4] wide:text-[16px]">{slide.description}</p>
        <ActionButton label="Book an appointment" href="./pages/contact.html" />
      </div>
      <div className="min-w-0 wide:pt-4"><HeroBenefits benefits={slide.benefits} vertical /></div>
    </div>
    <div className="relative min-h-[320px] min-w-0 overflow-hidden tablet:min-h-[360px] wide:min-h-[300px]" data-section-media="hero">
      <HeroImage slide={slide} primary={primary} className="object-[50%_30%] wide:object-[50%_25%]" />
    </div></Fragment> : <Fragment>
    <div className={`${pagePaddingClasses} min-w-0 pt-[43px] pb-[25px] tablet:py-14 wide:row-start-1 wide:pt-[clamp(72px,7.4vw,106px)] wide:pb-[72px] ${reversed ? "wide:col-start-3 wide:pl-10" : "wide:col-start-2 wide:pr-0"}`} data-section-copy="hero">
      <div className="mx-auto w-full min-w-0 max-w-[600px] wide:mx-0">
        {heading}
        <p className="mt-5 mb-6 max-w-[475px] text-left text-[13px] leading-[1.65] font-normal tablet:mt-[22px] tablet:mb-[30px] tablet:text-[14px] tablet:leading-[1.4] wide:text-[16px]">{slide.description}</p>
        <ActionButton label="Book an appointment" href="./pages/contact.html" />
        <HeroBenefits benefits={slide.benefits} />
      </div>
    </div>
    <div className={`relative -mt-2 h-[clamp(320px,65vw,520px)] min-w-0 overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,white_0%,rgb(255_255_255/0)_25%)] after:content-[''] wide:row-start-1 wide:mt-0 wide:h-auto ${reversed ? "wide:col-start-1 wide:col-end-3 wide:after:bg-[linear-gradient(270deg,white_0%,rgb(255_255_255/0)_20%)]" : "wide:col-start-3 wide:col-end-5 wide:after:bg-[linear-gradient(90deg,white_0%,rgb(255_255_255/0.5)_8%,rgb(255_255_255/0)_24%)]"}`} data-section-media="hero">
      <HeroImage slide={slide} primary={primary} className={reversed ? "object-[45%_center] wide:object-[45%_top]" : "object-[48%_center] wide:object-[40%_center] min-[90rem]:object-[40%_top]"} />
    </div></Fragment>;
  return <article className={`${slideClasses} ${editorial ? "grid grid-rows-[auto_1fr]" : fullBleedGridClasses.hero}`} data-hero-slide={slide.id} data-position={primary ? "active" : "next"} data-section-frame="hero" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}: ${slide.lines.map((line) => line.text).join(" ")}`} aria-hidden={primary ? undefined : true} inert={!primary}>
    {content}
  </article>;
}
export function Hero() {
  return <div className="relative w-full min-w-0 overflow-hidden" data-hero-slider data-animate="false" data-active-index="0" role="region" aria-roledescription="carousel" aria-label="InBody Clinic highlights">
    <div className="isolate grid w-full min-w-0">{heroSlides.map((slide, index) => <HeroSlide key={slide.id} slide={slide} index={index} />)}</div>
    <p className="sr-only" data-hero-status aria-live="polite" aria-atomic="true"></p>
  </div>;
}

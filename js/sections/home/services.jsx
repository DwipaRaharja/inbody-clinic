import { siteUrl } from "../../utils/urls.js";
import { Heading } from "../../components/heading.jsx";
import { Icon } from "../../components/icons.jsx";
import { specialityCatalog } from "../../data/specialities/catalog.js";
import { containerClasses } from "../../layouts/container.js";
export function Services() {
  return <div className={`${containerClasses} py-14 tablet:py-20`} data-section-frame="services">
    <div className="mx-auto max-w-[900px] text-center [&_p.uppercase]:mx-auto">
      <Heading eyebrow="Our specialities" level={2} size="section" id="services-title" lines={[{ text: "How Can We Help?" }]} />
      <p className="mt-4 font-display text-[26px] leading-[1.25] text-clinic-sage tablet:text-[30px]">Specialised care tailored to your needs.</p>
    </div>
    <ul className="mt-12 grid min-w-0 list-none grid-cols-1 gap-x-8 gap-y-12 p-0 tablet:grid-cols-2 tablet:gap-y-14 wide:grid-cols-3 wide:gap-x-12">
      {specialityCatalog.map((speciality) => <li key={speciality.id} className="min-w-0">
        <a className="group mx-auto flex h-full w-full max-w-[350px] flex-col items-center text-center" href={siteUrl(speciality.href)} aria-label={`${speciality.question} Explore ${speciality.name}`}>
          <span className="inline-flex size-20 shrink-0 items-center justify-center rounded-full bg-clinic-light-sage transition-colors group-hover:bg-clinic-light-sage/70 motion-reduce:transition-none wide:size-[88px]">
            {speciality.svg ? <Icon name={speciality.icon} className="size-[42px] text-clinic-navy [stroke-width:0.85]" /> : <i className={`ph ${speciality.icon} text-[40px] text-clinic-navy`} aria-hidden="true"></i>}
          </span>
          <h3 className="mt-5 font-sans! text-[16px] leading-[1.45] font-semibold wide:text-[17px]">{speciality.question}</h3>
          <p className="mt-3 text-[13px] leading-[1.6] font-medium text-clinic-navy/85">{speciality.name}</p>
          <p className="mt-3 mb-6 max-w-[36ch] text-[13px] leading-[1.75] text-clinic-navy/80">{speciality.summary}</p>
          <span className="mt-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-clinic-navy/55 transition-colors group-hover:bg-clinic-navy group-hover:text-clinic-white motion-reduce:transition-none" aria-hidden="true"><i className="ph ph-arrow-right text-[25px]"></i></span>
        </a>
      </li>)}
    </ul>
  </div>;
}

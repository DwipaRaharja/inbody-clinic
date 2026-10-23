import { containerClasses } from '../layouts/container.js';
import { getNavigationLinks } from '../data/navigation.js';
import { assetUrl, siteUrl } from '../utils/urls.js';

// Replace the social app homepages with clinic profile URLs when available.
export const footerSocialLinks = [
  { name: 'Facebook', icon: 'ph-facebook-logo', href: 'https://www.facebook.com/' },
  { name: 'TikTok', icon: 'ph-tiktok-logo', href: 'https://www.tiktok.com/' },
  { name: 'Email', icon: 'ph-envelope', href: 'mailto:Sailainsua@gmail.com' },
  { name: 'WhatsApp', icon: 'ph-whatsapp-logo', href: 'https://wa.me/61424912490' },
  { name: 'Instagram', icon: 'ph-instagram-logo', href: 'https://www.instagram.com/' },
];

function SocialIcon({ name, icon, href }) {
  const classes = 'inline-flex size-7 shrink-0 items-center justify-center text-[26px]';
  const glyph = <i className={`ph ${icon}`} aria-hidden="true" />;
  if (!href) return <span className={classes} role="img" aria-label={name} title={name}>{glyph}</span>;
  const external = href.startsWith('https://');
  return <a className={`${classes} transition-colors duration-[160ms] hover:text-clinic-light-sage motion-reduce:transition-none`} href={siteUrl(href)} aria-label={name} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{glyph}</a>;
}

export function Footer({ currentPage = 'home' } = {}) {
  return <div className={`${containerClasses} grid gap-8 py-10 tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-x-8 tablet:gap-y-6 wide:grid-cols-[240px_minmax(0,1fr)_300px] wide:gap-x-6 wide:py-6`}>
    <div>
      <a className="inline-block" href={siteUrl('./')} aria-label="InBody Clinic home">
        <img className="h-auto w-[235px] max-w-full" src={assetUrl('./assets/logo/site_logo.png')} alt="InBody Clinic — Woman Health Clinics" width="235" height="78" loading="lazy" />
      </a>
      <p className="mt-2.5 text-[10px] leading-[1.4]">©2026 InBody Clinic, All Right Reserved.</p>
    </div>
    <div className="pt-1">
      <nav aria-label="Footer navigation">
        <ul className="flex list-none flex-wrap items-center gap-x-6 gap-y-4 p-0 text-[13px] leading-[1.6] wide:justify-between wide:gap-x-3">
          {getNavigationLinks(currentPage).map(({ id, label, footerLabel, href }) => <li key={id}><a className="whitespace-nowrap transition-colors duration-[160ms] hover:text-clinic-light-sage motion-reduce:transition-none" data-nav-page={id} href={siteUrl(href)} aria-current={id === currentPage ? 'page' : undefined}>{footerLabel ?? label}</a></li>)}
        </ul>
      </nav>
      <div className="mt-6 flex items-center gap-2" role="group" aria-label="Social media and contact">
        {footerSocialLinks.map(link => <SocialIcon key={link.name} {...link} />)}
      </div>
    </div>
    <div className="self-start border-t border-clinic-white/60 pt-6 tablet:col-span-2 wide:col-span-1 wide:min-h-[84px] wide:border-t-0 wide:border-l wide:pt-2 wide:pl-[30px]">
      <p className="flex items-center gap-2 text-[10px] leading-[1.6] tracking-[0.2em] uppercase">Double Bay <span className="h-4 w-px bg-clinic-white" aria-hidden="true" /> Sydney</p>
      <p className="mt-5 text-[10px] leading-[1.6] tracking-[0.18em] uppercase">Clinical expertise. Personalised care.</p>
      <a className="mt-3 inline-flex items-center gap-2 text-[11px] leading-[1.6] hover:text-clinic-light-sage" data-nav-page="method" href={siteUrl('./pages/the-inbody-method.html')} aria-current={currentPage === 'method' ? 'page' : undefined}>The InBody Method™<i className="ph ph-arrow-right" aria-hidden="true" /></a>
    </div>
  </div>;
}

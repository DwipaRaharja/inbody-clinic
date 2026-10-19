import { containerClasses } from '../layouts/container.js';
import { getNavigationLinks } from '../data/navigation.js';

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
  const glyph = `<i class="ph ${icon}" aria-hidden="true"></i>`;
  if (!href) {
    return `<span class="${classes}" role="img" aria-label="${name}" title="${name}">${glyph}</span>`;
  }
  const external = href.startsWith('https://');
  return `<a class="${classes} transition-colors duration-[160ms] hover:text-clinic-light-sage motion-reduce:transition-none" href="${href}" aria-label="${name}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${glyph}</a>`;
}

export function Footer({ currentPage = 'home' } = {}) {
  return `
    <div class="${containerClasses} grid gap-8 py-10 tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-x-8 tablet:gap-y-6 wide:grid-cols-[240px_minmax(0,1fr)_300px] wide:gap-x-6 wide:py-6">
      <div>
        <a class="inline-block" href="./" aria-label="InBody Clinic home">
          <img class="h-auto w-[235px] max-w-full" src="./assets/logo/logo.png" alt="InBody Clinic — Woman Health Clinics" width="235" height="78" loading="lazy" />
        </a>
        <p class="mt-2.5 text-[10px] leading-[1.4]">©2026 InBody Clinic, All Right Reserved.</p>
      </div>
      <div class="pt-1">
        <nav aria-label="Footer navigation">
          <ul class="flex list-none flex-wrap items-center gap-x-6 gap-y-4 p-0 text-[13px] leading-[1.6] wide:justify-between wide:gap-x-3">
            ${getNavigationLinks(currentPage).map(({ id, label, footerLabel, href }) => `<li><a class="whitespace-nowrap transition-colors duration-[160ms] hover:text-clinic-light-sage motion-reduce:transition-none" data-nav-page="${id}" href="${href}"${id === currentPage ? ' aria-current="page"' : ''}>${footerLabel ?? label}</a></li>`).join('')}
          </ul>
        </nav>
        <div class="mt-6 flex items-center gap-2" role="group" aria-label="Social media and contact">
          ${footerSocialLinks.map(SocialIcon).join('')}
        </div>
      </div>
      <div class="self-start border-t border-clinic-white/60 pt-6 tablet:col-span-2 wide:col-span-1 wide:min-h-[84px] wide:border-t-0 wide:border-l wide:pt-2 wide:pl-[30px]">
        <p class="flex items-center gap-2 text-[10px] leading-[1.6] tracking-[0.2em] uppercase">Double Bay <span class="h-4 w-px bg-clinic-white" aria-hidden="true"></span> Sydney</p>
        <p class="mt-5 text-[10px] leading-[1.6] tracking-[0.18em] uppercase">Clinical expertise. Personalised care.</p>
        <a class="mt-3 inline-flex items-center gap-2 text-[11px] leading-[1.6] hover:text-clinic-light-sage" data-nav-page="method" href="./pages/the-inbody-method.html"${currentPage === 'method' ? ' aria-current="page"' : ''}>The InBody Method™<i class="ph ph-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
  `;
}

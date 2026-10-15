function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

/** Shared section heading, with an optional italic accent for each line. */
export function Heading({ eyebrow = '', lines = [], level = 2, id = '', size = 'default', accentItalic = true, inline = false }) {
  const tag = [1, 2, 3, 4, 5, 6].includes(level) ? `h${level}` : 'h2';
  const titleClasses = size === 'profile'
    ? 'text-[2.5rem] leading-[1.08] font-semibold tablet:text-[3rem] wide:text-[3.25rem] min-[90rem]:text-[3.5rem]'
    : tag === 'h1' || size === 'hero'
    ? 'text-[2.5rem] leading-[1.08] font-bold min-[30rem]:text-[3.25rem] tablet:text-[2.75rem] tablet:leading-[1.15] nav:text-[3.25rem] wide:text-[3.75rem] min-[90rem]:text-[4.5rem]'
    : tag === 'h2'
      ? ({
        section: 'text-[2.125rem] leading-[1.2] font-semibold tablet:text-[2.5rem] wide:text-[3rem]',
        compact: 'text-[2rem] leading-[1.15] font-semibold wide:text-[2.25rem] min-[90rem]:text-[2.5rem]',
        cta: 'text-[2rem] leading-[1.05] font-semibold wide:text-[2.125rem] min-[90rem]:text-[2.25rem]',
      }[size] ?? 'text-[2rem] leading-[1.15] font-semibold wide:text-[2.5rem] min-[90rem]:text-[3rem]')
      : 'text-[1.5rem] leading-[1.2] font-semibold wide:text-[1.75rem] min-[90rem]:text-[2rem]';
  return `
    <div>
      ${eyebrow ? `<p class="mb-[18px] text-[9px] leading-[1.6] font-medium tracking-[0.17em] uppercase tablet:mb-[22px] tablet:max-w-[330px] tablet:text-[10px] tablet:tracking-[0.2em] nav:max-w-none nav:text-[13px]">${escapeText(eyebrow)}</p>` : ''}
      <${tag}${id ? ` id="${escapeText(id)}"` : ''} class="m-0 font-display tracking-[-0.018em] text-clinic-navy ${titleClasses}">
        ${lines.map(({ text, accent = false, segments }) => {
          const content = Array.isArray(segments)
            ? segments.map(({ text: segmentText, accent: segmentAccent = false }) => `<span${segmentAccent ? ` class="text-clinic-sage${accentItalic ? ' italic' : ''}"` : ''}>${escapeText(segmentText)}</span>`).join('')
            : escapeText(text);
          return `<span class="${inline ? 'inline' : 'block'}${accent ? ` text-clinic-sage${accentItalic ? ' italic' : ''}` : ''}">${content}</span>`;
        }).join(inline ? ' ' : '')}
      </${tag}>
    </div>
  `;
}

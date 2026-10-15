const paths = {
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  pin: '<path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
  phone: '<path d="m7 3 3 5-3 3c1.6 3.2 3.8 5.4 7 7l3-3 5 3c-1 3-3 4-5.5 3.2C9.5 19 5 14.5 2.8 7.5 2 5 4 3 7 3Z"/>',
  leaf: '<path d="M6 26C1 14 9 5 27 3c1 17-5 24-16 22"/><path d="M3 31 23 9M10 22l-1-8m7 3 7-1"/>',
  heart: '<path d="M16 28S3 20 3 11a7 7 0 0 1 13-3 7 7 0 0 1 13 3c0 9-13 17-13 17Z"/>',
  people: '<circle cx="16" cy="11" r="4"/><path d="M8 27v-3a8 8 0 0 1 16 0v3M6 6a4 4 0 0 0 0 8m20-8a4 4 0 0 1 0 8M2 23v-2a6 6 0 0 1 5-6m23 8v-2a6 6 0 0 0-5-6"/>',
  pregnancy: `
    <path d="M15.1 7.3c1.2-2.7-.9-4.6-2.8-4.8-2.5-.4-4.2 1.4-4.1 3.9.1 1.5-1 2.4-1.7 3.6-1.3 2.2-.5 4 1.9 4.6"/>
    <path d="M8.4 14.6c-.3-2.7.5-3.5 1.5-4.5.9-.8.9-1.7 1-2.4.1-.5.4-.6.9-.6 1-.1 2-.6 2.6-1.5.7 1.8.2 3.5-.8 4.1-.5.3-.9.3-1.5.1-.6 1.5.3 1.8 1.2 2.1 1.5.4 2.1 1.3 1.8 2.6"/>
    <path d="m13.4 15.3 1.3-.6c2.2-.1 3.4 2.2 3 4.6l-.7 2.1H7.7l1.4-3.9"/>
    <path d="M8.4 14.6c0 3.5 2 5.5 8.5 6.8M8.4 14.6h2.7"/>
    <path d="M11.1 12.9v3.8c.6 1.1 1.3 2 2.4 2.6.7-.2 1.7-.4 2.4.3l-.6.3 1.9.5m-1.4.1 1.3.3m-1.5.1 1.4.3"/>
  `,
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
};

export function icon(name, className = '') {
  const viewBox = ['leaf', 'heart', 'people'].includes(name) ? '0 0 32 32' : '0 0 24 24';
  return `<svg class="${className}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? ''}</svg>`;
}

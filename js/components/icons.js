const paths = {
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  pin: '<path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
  phone: '<path d="m7 3 3 5-3 3c1.6 3.2 3.8 5.4 7 7l3-3 5 3c-1 3-3 4-5.5 3.2C9.5 19 5 14.5 2.8 7.5 2 5 4 3 7 3Z"/>',
  leaf: '<path d="M6 26C1 14 9 5 27 3c1 17-5 24-16 22"/><path d="M3 31 23 9M10 22l-1-8m7 3 7-1"/>',
  heart: '<path d="M16 28S3 20 3 11a7 7 0 0 1 13-3 7 7 0 0 1 13 3c0 9-13 17-13 17Z"/>',
  people: '<circle cx="16" cy="11" r="4"/><path d="M8 27v-3a8 8 0 0 1 16 0v3M6 6a4 4 0 0 0 0 8m20-8a4 4 0 0 1 0 8M2 23v-2a6 6 0 0 1 5-6m23 8v-2a6 6 0 0 0-5-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
};

export function icon(name, className = '') {
  const viewBox = ['leaf', 'heart', 'people'].includes(name) ? '0 0 32 32' : '0 0 24 24';
  return `<svg class="${className}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? ''}</svg>`;
}

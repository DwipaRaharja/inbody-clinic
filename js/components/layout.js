// Center page content at a maximum of 1440px; section backgrounds stay full width.
export const pageWidthClasses = 'box-border mx-auto w-full min-w-0 max-w-[1440px]';
export const pagePaddingClasses = 'px-8 tablet:px-20';
export const containerClasses = `${pageWidthClasses} ${pagePaddingClasses}`;

// The middle tracks bound copy to 1440px; media may span the outer tracks.
// Percentages preserve each split below 1440px without relying on 100vw.
export const fullBleedGridClasses = {
  hero: 'grid w-full min-w-0 grid-cols-1 wide:grid-cols-[minmax(0,1fr)_minmax(0,min(50%,720px))_minmax(0,min(50%,720px))_minmax(0,1fr)]',
  difference: 'grid w-full min-w-0 grid-cols-1 wide:grid-cols-[minmax(0,1fr)_minmax(0,min(40.3%,580.32px))_minmax(0,min(59.7%,859.68px))_minmax(0,1fr)]',
  testimonials: 'grid w-full min-w-0 grid-cols-1 wide:grid-cols-[minmax(0,1fr)_minmax(0,min(46%,662.4px))_minmax(0,min(54%,777.6px))_minmax(0,1fr)]',
  booking: 'grid w-full min-w-0 grid-cols-1 wide:grid-cols-[minmax(0,1fr)_minmax(0,min(64%,921.6px))_minmax(0,min(36%,518.4px))_minmax(0,1fr)]',
};

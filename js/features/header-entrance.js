// GSAP is imported into the client bundle by src/entry-client.jsx.
export function initHeaderEntrance(root) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!root || reducedMotion.matches) return () => {};

  let context;
  let stopped = false;
  let frame;

  function stop() {
    stopped = true;
    if (frame !== undefined) {
      cancelAnimationFrame(frame);
      frame = undefined;
    }
    context?.revert();
  }

  function start() {
    const gsap = window.gsap;
    if (stopped || reducedMotion.matches || !gsap?.context) return;
    const background = root.querySelector('[data-contact-background]');
    const visible = element => element.getClientRects().length > 0;
    const contactItems = [...root.querySelectorAll('[data-contact-item]')].filter(visible);
    const menuItems = [...root.querySelectorAll('[data-nav-intro]')].filter(visible);
    if (!background) return;

    context = gsap.context(() => {
      // Hide only the selected labels during the background reveal; the logo
      // and the navbar container keep their normal position and visibility.
      gsap.set([...contactItems, ...menuItems], { opacity: 0 });
      const timeline = gsap.timeline({ id: 'header-entrance', defaults: { ease: 'power2.out' } });
      timeline.fromTo(background,
        { scaleY: 0, transformOrigin: '50% 0%' },
        { scaleY: 1, duration: 0.42, clearProps: 'transform,transformOrigin' });
      if (contactItems.length) timeline.to(contactItems,
        { opacity: 1, duration: 0.4, stagger: 0.06, clearProps: 'opacity' }, 0.42);
      if (menuItems.length) timeline.to(menuItems,
        { opacity: 1, duration: 0.4, stagger: 0.04, clearProps: 'opacity' }, 0.54);
    }, root);
  }

  function schedule() {
    // Two frames out: begin after the first paint instead of stacking layout
    // reads on React's hydration commit (same pattern as hero-slider.js).
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(start);
    });
  }

  // Interaction takes priority over an entrance still playing or loading.
  root.addEventListener('pointerdown', stop, { once: true, capture: true });
  root.addEventListener('keydown', stop, { once: true, capture: true });
  const onMotionChange = () => { if (reducedMotion.matches) stop(); };
  reducedMotion.addEventListener('change', onMotionChange);

  schedule();

  return () => {
    stop();
    root.removeEventListener('pointerdown', stop, true);
    root.removeEventListener('keydown', stop, true);
    reducedMotion.removeEventListener('change', onMotionChange);
  };
}

import { initContentReveal } from './content-reveal.js';

// Select groups from Home's existing layout; shared components stay unchanged.
export function initHomeReveal(root) {
  if (!root?.querySelector('[data-hero-slider]')) return () => {};
  const groups = [];
  const add = (elements, fade = false) => {
    const targets = [...elements].filter(Boolean);
    if (targets.length) groups.push({ targets, fade });
  };
  const frame = name => root.querySelector(`[data-section-frame="${name}"]`);
  const listItems = element => element?.querySelector('ol, ul')?.children ?? [];

  // Fade the carousel once, never its individual slides or their transforms.
  add([root.querySelector('[data-hero-slider]')], true);
  add([frame('services')?.firstElementChild]);
  add(frame('services')?.querySelector('ul')?.children ?? []);
  add([frame('method')?.firstElementChild]);
  add(listItems(frame('method')));
  add([frame('team')?.children[0]], true);
  add([frame('team')?.children[1]]);
  add([frame('expect')?.firstElementChild]);
  add(listItems(frame('expect')));
  add(frame('assessment')?.children ?? []);
  add([frame('home-contact')?.children[0]]);
  add([frame('home-contact')?.children[1]], true);
  return initContentReveal(root, groups);
}

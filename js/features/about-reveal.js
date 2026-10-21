import { initContentReveal } from './content-reveal.js';

// Animate existing cards as units, without nesting reveal targets or changing layout.
export function initAboutReveal(root) {
  if (!root?.querySelector('[data-clinician]')) return () => {};
  const groups = [];
  const add = (elements, fade = false) => {
    const targets = [...elements].filter(Boolean);
    if (targets.length) groups.push({ targets, fade });
  };
  const frame = name => root.querySelector(`[data-section-frame="${name}"]`);

  add(frame('about')?.children ?? []);

  for (const profile of root.querySelectorAll('[data-clinician]')) {
    add([profile.firstElementChild]);
    add([profile.querySelector('[data-clinician-photo]')], true);
    add(profile.querySelector('[data-clinician-facts]')?.children ?? []);
    add(profile.querySelector('[data-clinician-content]')?.children ?? []);
  }

  const team = frame('team-details')?.firstElementChild;
  add([team?.children[0]], true);
  add([team?.children[1]]);

  const method = frame('method');
  add([method?.firstElementChild]);
  add(method?.querySelector('ol')?.children ?? []);

  return initContentReveal(root, groups);
}

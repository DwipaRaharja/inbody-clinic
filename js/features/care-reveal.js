import { initContentReveal } from './content-reveal.js';

// Select existing layout elements without adding wrappers or changing their classes.
function layoutGroups(root) {
  const groups = [];
  const add = (elements, fade = false) => {
    const targets = [...elements].filter(Boolean);
    if (targets.length) groups.push({ targets, fade });
  };
  return {
    groups,
    add,
    frame: name => root?.querySelector(`[data-section-frame="${name}"]`),
    section: id => root?.querySelector(`#${id}`)?.firstElementChild,
  };
}

export function initServiceReveal(root) {
  const { groups, add, frame } = layoutGroups(root);
  const hero = frame('service-hero');
  add([hero?.children[0]]);
  add([hero?.children[1]], true);

  const options = frame('service-options');
  add([options?.children[0]], true);
  const optionsCopy = options?.children[1];
  add([...(optionsCopy?.children ?? [])].slice(0, 2));
  add(optionsCopy?.querySelector('ol')?.children ?? []);

  const recovery = frame('service-recovery');
  add([recovery?.firstElementChild]);
  add(recovery?.querySelector('ol')?.children ?? []);

  const expertise = frame('service-expertise');
  add([expertise?.firstElementChild]);
  // Animate complete cards, keeping their headings and numbered lists together.
  add(expertise?.querySelectorAll('article') ?? []);
  add([expertise?.children[2]]);
  add([frame('service-quote')?.querySelector('blockquote')]);
  add(frame('service-cta')?.children ?? []);
  return initContentReveal(root, groups);
}

export function initSpecialityReveal(root) {
  const { groups, add, frame, section } = layoutGroups(root);
  const hero = section('speciality');
  add([hero?.children[0]]);
  add([hero?.children[1]], true);

  const needs = section('speciality-needs');
  add([needs?.children[0]]);
  add(needs?.querySelector('ul')?.children ?? []);
  add(section('speciality-approach')?.children ?? []);

  const treatments = section('speciality-treatments');
  add([...(treatments?.children ?? [])].slice(0, 2));
  add(treatments?.querySelector('ul')?.children ?? []);
  add(frame('speciality-booking')?.children ?? []);
  return initContentReveal(root, groups);
}

export function initMethodReveal(root) {
  const { groups, add, frame, section } = layoutGroups(root);
  const intro = section('method');
  add([intro?.children[0]]);
  // Fade only the sticky image; its grid position and sticky behavior stay intact.
  add([intro?.children[1]], true);
  add(intro?.children[2]?.children ?? []);

  const principles = section('method-principles');
  add([principles?.firstElementChild]);
  add(principles?.querySelector('ul')?.children ?? []);

  const pathway = section('method-pathway');
  add([...(pathway?.children ?? [])].slice(0, 2));
  add(pathway?.querySelector('ol')?.children ?? []);
  add(section('method-human-care')?.children ?? []);
  add(frame('assessment')?.children ?? []);
  return initContentReveal(root, groups);
}

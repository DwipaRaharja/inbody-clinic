const benefits = [
  { icon: 'ph-leaf', label: 'Evidence-Based<br />Care', inlineLabel: 'Evidence-Based Care' },
  { icon: 'ph-heart', label: 'Personalised<br />Treatment', inlineLabel: 'Personalised Treatment' },
  { icon: 'ph-users-three', label: 'A Holistic<br />Approach', inlineLabel: 'A Holistic Approach' },
];

export const heroSlides = [
  {
    id: 'expert-care',
    layout: 'image-right',
    eyebrow: 'Science. Experience. A healthier you.',
    lines: [
      { text: "Women's Health." },
      { text: 'Advanced Lymphatic Therapy.' },
      { text: 'Specialised Care.', accent: true },
    ],
    description: 'Personalised, evidence-based care to help you feel stronger, lighter, and more like you at every stage of life.',
    image: {
      src: './assets/images/home/hero.jpg',
      alt: 'InBody Clinic practitioner beside a treatment device in the clinic',
      width: 1024,
      height: 670,
    },
    benefits,
  },
  {
    id: 'lymphatic-care',
    layout: 'image-left',
    eyebrow: 'Specialised lymphatic care',
    lines: [
      { text: 'Move Better.' },
      { text: 'Feel Lighter.' },
      { text: 'Live Better.', accent: true },
    ],
    description: 'Specialised lymphatic care designed to support circulation, reduce swelling, and help your body feel its best.',
    image: {
      src: './assets/images/home/hero-2.jpg',
      alt: 'Two InBody Clinic practitioners reviewing a personalised care plan together on a tablet',
      width: 530,
      height: 588,
    },
    benefits,
  },
  {
    id: 'personalised-care',
    layout: 'image-bottom',
    eyebrow: "Women's health & wellbeing",
    lines: [
      { text: 'Care Designed' },
      { text: 'Around You.', accent: true },
    ],
    description: 'Personalised treatment and expert guidance to support your health, confidence, and wellbeing through every stage of life.',
    image: {
      src: './assets/images/home/hero-3.jpg',
      alt: 'An InBody Clinic practitioner welcoming patients in the clinic',
      width: 1024,
      height: 318,
    },
    benefits,
  },
];

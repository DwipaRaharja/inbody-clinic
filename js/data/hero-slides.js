const benefits = [
  { icon: 'ph-leaf', label: 'Individual<br />Assessment', inlineLabel: 'Individual Assessment' },
  { icon: 'ph-heart', label: 'Specialised<br />Hands-On Care', inlineLabel: 'Specialised Hands-On Care' },
  { icon: 'ph-users-three', label: 'Personalised<br />Treatment', inlineLabel: 'Personalised Treatment' },
];

export const heroSlides = [
  {
    id: 'expert-care',
    layout: 'image-right',
    eyebrow: 'Specialised clinical care · Double Bay',
    lines: [
      { text: "Women's Health." },
      { text: 'Advanced Lymphatic Therapy.' },
      { text: 'Specialised Care.', accent: true },
    ],
    description: 'Personalised clinical care combining specialised hands-on therapy, extensive clinical experience and advanced technology when appropriate.',
    image: {
      src: './assets/images/home/home_slider_1.jpg',
      alt: 'Saila Insua López standing beside an INDIBA treatment device in the clinic',
      width: 1550,
      height: 1014,
    },
    benefits,
  },
  {
    id: 'lymphatic-care',
    layout: 'image-left',
    eyebrow: 'Lymphatic therapy & recovery',
    lines: [
      { text: 'Understand Your Needs.' },
      { text: 'Personalise Your Care.', accent: true },
    ],
    description: 'Specialised hands-on care for swelling, lymphatic symptoms and post-surgical recovery, guided by individual assessment and ongoing review.',
    image: {
      src: './assets/images/home/home_slider_2.jpg',
      alt: 'Two InBody Clinic practitioners reviewing a personalised care plan together on a tablet',
      width: 1600,
      height: 1066,
    },
    benefits,
  },
  {
    id: 'personalised-care',
    layout: 'image-bottom',
    eyebrow: 'The InBody Method™',
    lines: [
      { text: 'Clinical Knowledge.' },
      { text: 'Individual Care.', accent: true },
    ],
    description: 'Women’s health, post-surgical recovery and tissue health: a personalised approach combining clinical experience, specialised manual therapy and technology when appropriate.',
    image: {
      src: './assets/images/home/home_slider_3.jpg',
      alt: 'The InBody Clinic team standing together beside an INDIBA treatment device',
      width: 1536,
      height: 1024,
    },
    benefits,
  },
];

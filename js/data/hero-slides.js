import { imageAsset } from '../utils/image-assets.js';
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
      src: imageAsset('home/home_slider_1.jpg'),
      webp: [
        { src: imageAsset('home/home_slider_1-720.webp'), width: 720 },
        { src: imageAsset('home/home_slider_1-1440.webp'), width: 1440 },
      ],
      sizes: '(min-width: 68.8125rem) min(50vw, 720px), 100vw',
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
      src: imageAsset('home/home_slider_2.jpg'),
      webp: [
        { src: imageAsset('home/home_slider_2-720.webp'), width: 720 },
        { src: imageAsset('home/home_slider_2-1440.webp'), width: 1440 },
      ],
      sizes: '(min-width: 68.8125rem) min(50vw, 720px), 100vw',
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
      src: imageAsset('home/home_slider_3.jpg'),
      webp: [
        { src: imageAsset('home/home_slider_3-720.webp'), width: 720 },
        { src: imageAsset('home/home_slider_3-1440.webp'), width: 1440 },
      ],
      sizes: '100vw',
      alt: 'The InBody Clinic team standing together beside an INDIBA treatment device',
      width: 1536,
      height: 1024,
    },
    benefits,
  },
];

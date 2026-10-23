const imageDirectory = './assets/images/services/Lymphatic Drainage/Lipedema & Inflammatory Leg Care/';

export default {
  id: 'lipedema-inflammatory-leg-care',
  name: 'Lipedema & Inflammatory Leg Care',
  summary: 'Conservative care for heavy or painful legs associated with lipedema, with an individual approach to swelling and tissue sensitivity.',
  href: './pages/services/lymphatic-drainage/lipedema-inflammatory-leg-care.html',
  category: 'Lymphatic Drainage',
  images: {
    hero: {
      src: `${imageDirectory}lipedema_inflammatory_leg_care_hero.jpeg`,
      alt: 'An InBody Clinic therapist providing hands-on treatment to a patient’s bent leg',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: `${imageDirectory}lipedema_inflammatory_leg_care_treatment.webp`,
      alt: 'A group of women standing together with their arms around one another',
      width: 612,
      height: 408,
    },
  },
  hero: {
    eyebrow: 'Lipedema & Inflammatory Leg Care',
    lines: [
      { text: 'Relief for Heavy,' },
      { text: 'Painful and', segments: [{ text: 'Painful ' }, { text: 'and', accent: true }] },
      { text: 'Swollen Legs', accent: true },
    ],
    subEyebrow: 'InBody Clinic · Lymphatic Drainage',
    description: 'If your legs feel heavy, swollen, or tender, even with diet and exercise, it may be related to lipedema, a chronic inflammatory and lymphatic condition.',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-drop', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Lipedema care',
    lines: [{ text: 'Understanding' }, { text: 'Lipedema Symptoms', accent: true }],
    paragraphs: [
      'After pregnancy and childbirth, many women notice swelling, fluid retention or a feeling of heaviness. Hormonal changes, fatigue, reduced circulation and procedures such as a C-section can make recovery feel slower and less comfortable.',
    ],
    items: ['Easy bruising', 'Heavy or painful legs', 'Tissue that feels tender to touch', 'Swelling that worsens throughout the day'],
  },
  recovery: {
    eyebrow: 'Targeted leg health',
    lines: [{ text: 'Long-Term Management' }, { text: '& Leg Health', accent: true }],
    description: 'The goal is to reduce swelling and inflammation, improve tissue mobility, and support long-term management of lipedema and leg health',
    steps: [
      {
        title: 'Reduce Swelling & Inflammation',
        description: 'Targeted clinical strategies to calm chronic inflammation and alleviate excess fluid accumulation',
      },
      {
        title: 'Improve Tissue Mobility',
        description: 'Hands-on therapies designed to release myofascial restrictions and enhance comfort',
      },
      {
        title: 'Long-Term Health',
        description: 'Evidence-based guidance and lasting support adapted to each stage of lipoedema',
      },
    ],
  },
  expertise: {
    lines: [{ text: 'Treatment Pathways &' }, { text: 'Clinical Expertise', accent: true }],
    columns: [
      {
        title: 'Treatment Approaches',
        subtitle: 'Treatment Focuses On :',
        items: [
          'Clinical lymphatic drainage',
          'Myofascial tissue techniques',
          'INDIBA radiofrequency to improve circulation and tissue metabolism',
          'Guidance on appropriate compression therapy to support lymphatic function and reduce swelling',
          'Personalised treatment strategies to reduce heaviness and discomfort',
        ],
      },
      {
        title: 'What You Can Expect',
        subtitle: 'Many Patient Notice :',
        items: [
          'Physiotherapist trained in Leduc and Vodder lymphatic methods, with 20+ years of experience in women’s health and lymphatic conditions',
          'Evidence-based, personalised treatments adapted to each stage of lipoedema',
          'Support throughout your journey, including specialised pre and post-surgery care',
          'Compassionate, professional care with a focus on lasting wellbeing',
        ],
      },
    ],
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'lymphatic drainage care', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

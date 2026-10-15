const imageDirectory = './assets/images/services/Lymphatic Drainage/Clinical Lymphatic Drainage Sydney/';

export default {
  id: 'clinical-lymphatic-drainage-sydney',
  name: 'Clinical Lymphatic Drainage Sydney',
  href: './clinical-lymphatic-drainage-sydney.html',
  category: 'Lymphatic Drainage',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp-Image-2025-10-12-at-19.38.17-1024x683.webp`,
      alt: 'An InBody Clinic therapist providing hands-on treatment to a patient’s back',
      width: 1024,
      height: 683,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp-Image-2025-10-12-at-19.38.17-1-1024x683.webp`,
      alt: 'An InBody Clinic therapist providing gentle treatment to a patient’s upper arm',
      width: 1024,
      height: 683,
    },
  },
  hero: {
    eyebrow: 'Clinical Lymphatic Drainage Sydney',
    lines: [{ text: 'Clinical Lymphatic' }, { text: 'Drainage Sydney', accent: true }],
    subEyebrow: 'InBody Clinic · Lymphatic Drainage',
    description: 'Do you often feel swollen, heavy, or puffy, even when you eat well and exercise?',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Understanding lymphatic drainage',
    lines: [{ text: 'When lymphatic' }, { text: 'circulation slows', accent: true }],
    paragraphs: [
      'When lymphatic circulation slows, excess fluid accumulates in the tissues, creating swelling, heaviness, and a sensation of internal pressure.',
    ],
    items: [
      'Back and pelvic discomfort',
      'Leg swelling and fluid retention',
      'Rib restriction and breathing fatigue',
      'Muscular tension and overload',
      'Hormonal bloating before menstruation',
      'Swelling after travel or long flights',
      'Persistent tissue congestion or inflammation',
    ],
  },
  recovery: {
    eyebrow: 'Personalised treatment options',
    lines: [{ text: 'Benefit of' }, { text: 'Lymphatic Drainage', accent: true }],
    description: 'At InBody Clinic, clinical lymphatic drainage uses precise Vodder and Leduc techniques to gently stimulate lymphatic flow and restore tissue balance.',
    steps: [
      {
        title: 'Reduce Swelling & Fluid Retention',
        description: 'Decrease inflammatory congestion',
      },
      {
        title: 'Improve Lymphatic Circulation',
        description: 'Support circulation and tissue oxygenation',
      },
      {
        title: 'Relieve Heaviness',
        description: 'Relieve heaviness in the legs, abdomen, and face.',
      },
    ],
  },
  expertise: {
    lines: [{ text: 'Treatment Pathways &' }, { text: 'Clinical Expertise', accent: true }],
    columns: [
      {
        title: 'Restoring Balance',
        subtitle: 'Treatment Focuses On :',
        items: [
          'Reduce swelling and fluid retention',
          'Improve lymphatic circulation',
          'Relieve heaviness in the legs, abdomen, and face',
          'Decrease inflammatory congestion',
          'Support circulation and tissue oxygenation',
        ],
      },
      {
        title: 'How This Treatment Helps',
        subtitle: 'Many Patient Notice :',
        items: [
          'Heavy legs at the end of the day & fluid retention in the legs or thighs',
          'Abdominal bloating, swelling, and hormonal bloating before menstruation',
          'Facial puffiness (especially in the morning) and persistent tissue congestion',
          'Gentle, rhythmic, and highly specific treatment using precise Vodder and Leduc techniques',
        ],
      },
    ],
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'lymphatic drainage care', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './contact.html#contact-form',
  },
};

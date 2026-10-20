const imageDirectory = './assets/images/services/Lymphatic Drainage/Clinical Lymphatic Drainage Sydney/';

export default {
  id: 'clinical-lymphatic-drainage-sydney',
  name: 'Advanced Lymphatic Therapy',
  summary: 'Specialised Lymphatic Drainage & Personalised Fluid Management in Double Bay, Sydney',
  href: './pages/services/lymphatic-drainage/clinical-lymphatic-drainage-sydney.html',
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
    eyebrow: 'Advanced Lymphatic Therapy',
    lines: [{ text: 'Advanced Lymphatic' }, { text: 'Therapy', accent: true }],
    subEyebrow: 'InBody Clinic · Lymphatic Drainage',
    description: [
      'Specialised Lymphatic Drainage & Personalised Fluid Management in Double Bay, Sydney',
      'At InBody Clinic, we provide advanced clinical lymphatic therapy designed to help manage swelling, fluid retention, heavy legs and lymphatic-related concerns.',
      'Unlike a standard lymphatic massage, our approach begins with a personalised assessment to understand your symptoms, medical history and individual needs.',
      'Using The InBody Method™, we combine specialised Manual Lymphatic Drainage based on the Vodder and Leduc methods with additional therapeutic techniques when clinically appropriate.',
    ],
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Advanced Lymphatic Therapy',
    lines: [{ text: 'How Can We' }, { text: 'Help?', accent: true }],
    paragraphs: [
      'Our personalised treatments may be suitable for:',
    ],
    items: [
      'Fluid retention and general swelling',
      'Heavy, tired or swollen legs',
      'Hormonal-related fluid changes',
      'Pregnancy and postpartum swelling',
      'Perimenopause and menopause-related fluid retention',
      'Abdominal swelling and discomfort associated with fluid retention',
      'Travel-related swelling',
      'Lymphatic concerns associated with lipedema',
      'Selected lymphatic concerns following surgery or cancer treatment',
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
    lines: [{ text: 'Our Approach' }, { text: 'The InBody Method™', accent: true }],
    description: [
      'Every treatment starts with understanding your body.',
      'Following an individual assessment, we develop a treatment approach adapted to your symptoms, clinical presentation and therapeutic goals.',
    ],
    columns: [
      {
        title: 'Specialised Manual Therapy',
        subtitle: 'Your treatment may include:',
        items: [
          'Manual Lymphatic Drainage (Vodder & Leduc) – specialised, gentle techniques supporting lymphatic fluid movement.',
          'Abdominal & Diaphragmatic Techniques – incorporated when appropriate as part of personalised treatment.',
          'Specialised Manual & Myofascial Therapy – to address associated muscular tension and tissue restrictions.',
        ],
      },
      {
        title: 'Therapeutic Technologies',
        subtitle: 'When clinically appropriate',
        items: [
          'INDIBA® Radiofrequency – incorporated when clinically appropriate as an additional tissue-focused therapy.',
          'Intermittent Pneumatic Compression – to assist with fluid management in selected cases.',
        ],
      },
    ],
    note: 'Not every treatment requires every technique. We select the most appropriate approach based on your individual needs, medical history and any contraindications.',
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'lymphatic drainage care', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

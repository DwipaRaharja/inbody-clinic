const imageDirectory = './assets/images/services/Lymphatic Drainage/Post-Surgical Recovery/';

export default {
  id: 'post-surgical-recovery',
  name: 'Post-Surgical Recovery',
  href: './pages/services/lymphatic-drainage/post-surgical-recovery.html',
  category: 'Lymphatic Drainage',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp-Image-2025-10-12-at-19.36.09-1-1536x1024.webp`,
      alt: 'An InBody Clinic therapist applying black medical tape to a patient’s abdomen',
      width: 1536,
      height: 1024,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp-Image-2025-10-12-at-19.36.09-1536x1024.webp`,
      alt: 'A close view of a therapist applying supportive tape across a patient’s abdomen',
      width: 1536,
      height: 1024,
    },
  },
  hero: {
    eyebrow: 'Post - Surgical Recovery',
    lines: [{ text: 'Healing Takes' }, { text: 'Thoughtful Support', accent: true }],
    subEyebrow: 'InBody Clinic · Lymphatic Drainage',
    description: 'Gentle, personalised support after plastic or reconstructive surgery, shaped around your procedure and stage of healing.',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Your body after surgery',
    lines: [{ text: 'Understanding Your' }, { text: 'Body’s Recovery', accent: true }],
    paragraphs: [
      'Without appropriate care, patients may experience prolonged swelling, fluid retention, tissue fibrosis, and delayed recovery.',
    ],
    items: ['Prolonged swelling', 'Fluid retention', 'Tissue fibrosis & scar tightness', 'Delayed recovery'],
  },
  recovery: {
    eyebrow: 'Gentle support for recovery',
    lines: [{ text: 'Gentle, Tailored Care' }, { text: 'for Every Step', accent: true }],
    description: 'Post-surgical treatments at InBody Clinic are exceptionally gentle and never intended to be painful. Care is fully personalised and adapted to each patient, the type of surgery, and the specific stage of healing.',
    steps: [
      {
        title: 'Exceptionally Gentle',
        description: 'Never intended to be painful, ensuring maximum comfort during your recovery.',
      },
      {
        title: 'Fully Personalised',
        description: 'Carefully adapted to your specific surgery, individual needs, and healing stage',
      },
      {
        title: 'Natural Healing',
        description: 'Safely supports tissue recovery while respecting your surgical structures',
      },
    ],
  },
  expertise: {
    lines: [{ text: 'Your Pathway' }, { text: 'to Healing', accent: true }],
    description: 'Each recovery program is carefully adapted to your surgery and monitored throughout the healing process.',
    columns: [
      {
        title: 'Support Circulation',
        subtitle: 'Treatment May Include :',
        items: [
          'Clinical lymphatic drainage',
          'Medical taping to reduce swelling',
          'Scar therapy',
          'Low-level laser therapy',
          'INDIBA radiofrequency',
          'Clinical electrotherapy',
        ],
      },
      {
        title: 'What You Can Expect',
        subtitle: 'Many Patient Notice :',
        items: ['Reduced swelling', 'Improved comfort', 'Better scar quality', 'Softer, mobile tissues', 'Faster recovery'],
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

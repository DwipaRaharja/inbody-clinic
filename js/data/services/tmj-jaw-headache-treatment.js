const imageDirectory = './assets/images/services/Pain & TMJ Relief/Ease the tension\u2028feel more at ease-tamplate-1/';

export default {
  id: 'tmj-jaw-headache-treatment',
  name: 'TMJ, Jaw & Headache Treatment',
  href: './tmj-jaw-headache-treatment.html',
  category: 'Pain & TMJ Relief',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.32.59.jpeg`,
      alt: 'Saila treating a patient’s jaw with a handheld device at InBody Clinic',
      width: 1600,
      height: 1068,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.01 (2).jpeg`,
      alt: 'Saila providing gentle manual treatment around a patient’s jaw and neck',
      width: 1600,
      height: 1068,
    },
  },
  hero: {
    eyebrow: 'TMJ, Jaw & Headache Treatment ',
    lines: [{ text: 'Ease The Tension' }, { text: 'Feel More At Ease', accent: true }],
    subEyebrow: 'InBody Clinic · TMJ & Jaw Care',
    description: 'Gentle, targeted care to help ease jaw tension, stress-related clenching and headaches, supporting greater comfort in everyday life.',
    benefits: [
      { icon: 'ph-hand-heart', label: 'Care shaped around you' },
      { icon: 'ph-shield-check', label: 'Clinically guided care' },
      { icon: 'ph-leaf', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'When tension builds',
    lines: [{ text: 'Jaw tension affects more' }, { text: 'than your smile', accent: true }],
    paragraphs: [
      'Stress, teeth clenching and tension in the neck can contribute to jaw discomfort, headaches and restricted movement. These symptoms may affect everyday activities and overall comfort.',
    ],
    items: [
      'Tension headaches or migraines',
      'Jaw clicking or locking',
      'Tightness when opening the mouth',
      'Neck and shoulder tension',
    ],
  },
  recovery: {
    eyebrow: 'Gentle support for relief',
    lines: [{ text: 'Care that helps you' }, { text: 'feel more at ease', accent: true }],
    description: 'Our clinical approach focuses on releasing tension in the jaw, neck and surrounding muscles while supporting circulation and comfortable movement.',
    steps: [
      {
        title: 'Ease jaw tension',
        description: 'Help release tightness in the jaw muscles caused by stress and clenching.',
      },
      {
        title: 'Support jaw mobility',
        description: 'Encourage more comfortable jaw movement through targeted muscle release.',
      },
      {
        title: 'Relieve head & neck strain',
        description: 'Help reduce tension associated with headaches and neck discomfort.',
      },
    ],
  },
  expertise: {
    lines: [{ text: 'The Protocol &' }, { text: 'Ideal Candidates', accent: true }],
    description: 'Each session combines clinical techniques designed to ease pain, improve tissue mobility, and support circulation and recovery.',
    columns: [
      {
        title: 'The Protocol Combines',
        subtitle: 'Treatment May Include :',
        items: [
          'Clinical manual therapy',
          'Intra-oral jaw muscle release',
          'Lymphatic techniques to reduce inflammatory congestion',
          'INDIBA radiofrequency to support circulation and tissue recovery',
        ],
      },
      {
        title: 'Ideal If You Notice',
        subtitle: 'Many Patients Notice :',
        items: [
          'Tension headaches or migraines',
          'Jaw clicking or locking',
          'Tightness when opening the mouth',
          'Neck and shoulder tension',
          'Stress-related jaw clenching',
        ],
      },
    ],
  },
  quote: 'Treatment focuses on releasing tension across the jaw and neck while supporting circulation and reducing inflammation. Many patients report less jaw tension, fewer headaches, and improved jaw mobility.',
  cta: {
    lines: [{ text: 'Start Your' }, { text: 'Jaw Care Journey', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './contact.html#contact-form',
  },
};

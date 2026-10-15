const imageDirectory = './assets/images/services/Pregnancy & Postpartum/POSTNATAL LYMPHATIC DRAINAGE/';

export default {
  id: 'pregnancy-massage-circulation-support',
  name: 'Pregnancy Massage & Circulation Support',
  href: './pregnancy-massage-circulation-support.html',
  category: 'Pregnancy & Postpartum',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.06 (2).jpeg`,
      alt: 'A therapist providing hands-on care during an InBody Clinic treatment session',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.09.jpeg`,
      alt: 'An InBody Clinic therapist working with a patient in a treatment room',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Pregnancy Massage & Circulation Support',
    lines: [{ text: 'Feel supported.' }, { text: 'Move with ease.', accent: true }],
    description: 'Personalised pregnancy massage to support comfort, ease muscular tension and care for your changing body.',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Personalised treatment options',
    lines: [{ text: 'Care chosen for' }, { text: 'your comfort', accent: true }],
    paragraphs: [
      'Pregnancy brings changes in posture, muscles and circulation. You may notice tension in your back or pelvis, tired legs or a changing sense of comfort.',
      'Your session is adapted to your needs and stage of pregnancy, with a focus on:',
    ],
    items: ['Pregnancy massage', 'Circulation support', 'Muscular tension care', 'Comfort and positioning'],
  },
  recovery: {
    eyebrow: 'A personalised care framework',
    lines: [{ text: 'Support at' }, { text: 'your pace', accent: true }],
    description: 'Care evolves with you, shaped around your comfort and changing needs.',
    steps: [
      { title: 'Start with you', description: 'Share how you feel and what matters to you.' },
      { title: 'Care for your comfort', description: 'A considered session centred on your needs.' },
      { title: 'Adapt as you change', description: 'Review your comfort as your pregnancy progresses.' },
    ],
  },
  expertise: {
    lines: [{ text: 'Treatment Pathways &' }, { text: 'Clinical Expertise', accent: true }],
    columns: [
      {
        title: 'Treatment Approaches',
        subtitle: 'Personalised care and considered techniques.',
        items: [
          'An individual discussion of your needs',
          'Massage adapted to your stage of pregnancy',
          'Comfortable, supported positioning',
          'Attention to areas of muscular tension',
          'Ongoing review of your care',
        ],
      },
      {
        title: 'What You Can Expect',
        subtitle: 'Your comfort at the centre of each session.',
        items: [
          'Time to share how your body feels',
          'A plan shaped around your comfort',
          'A calm, considered treatment session',
          'Clear discussion of your next steps',
        ],
      },
    ],
  },
  quote: 'Care that listens to your body, with comfort at the centre of every session.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'Pregnancy & Postpartum', accent: true }],
    description: 'Talk to our team about care during your pregnancy.',
    label: 'Contact the Clinic',
    href: './contact.html#contact-form',
  },
};

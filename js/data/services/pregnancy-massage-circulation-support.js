const imageDirectory = './assets/images/services/Pregnancy & Postpartum/Pregnancy Massage & Circulation Support/';

export default {
  id: 'pregnancy-massage-circulation-support',
  name: 'Pregnancy Massage & Circulation Support',
  href: './pregnancy-massage-circulation-support.html',
  category: 'Pregnancy & Postpartum',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.32.55 (1).jpeg`,
      alt: 'Saila providing hands-on care to a patient lying on a treatment bed at InBody Clinic',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.32.55.jpeg`,
      alt: 'Saila standing beside a patient resting on a treatment bed in the clinic',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Pregnancy Massage & Circulation Support',
    lines: [{ text: 'Comfort through' }, { text: 'every change', accent: true }],
    subEyebrow: 'InBody Clinic · Pregnancy & Postpartum',
    description: 'Pregnancy massage and circulation support, thoughtfully tailored to help ease physical tension and support your changing body.',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Support for your changing body',
    lines: [{ text: 'Care that meets you' }, { text: 'where you are', accent: true }],
    paragraphs: [
      'As pregnancy progresses, postural changes and the growing uterus can place additional demands on muscles, joints and circulation. A personalised session focuses on comfort, mobility and the areas that need support.',
      'Your therapist will take time to understand how you are feeling and adapt the treatment to your needs.',
    ],
    items: [
      'Back and pelvic discomfort',
      'Leg swelling and fluid retention',
      'Rib restriction and breathing fatigue',
      'Rib restriction and breathing fatigue',
    ],
  },
  recovery: {
    eyebrow: 'Treatment focus',
    lines: [{ text: 'More ease in' }, { text: 'your day', accent: true }],
    description: 'Clinical pregnancy massage may help support comfort and movement through the physical changes of pregnancy.',
    steps: [
      { title: 'Circulation & Oxygen Support', description: 'Improve circulation and oxygen delivery while clinical pregnancy massage focuses on supporting the body through physical changes' },
      { title: 'Fluid & Swelling Relief', description: 'Reduce fluid retention and swelling, especially for leg swelling and fluid retention during pregnancy.' },
      { title: 'Muscular & Pelvic Comfort', description: 'Relieve back and pelvic pain, release muscular tension, and support postural balance and comfort.' },
    ],
  },
  expertise: {
    lines: [{ text: 'Treatment Pathways &' }, { text: 'Clinical Expertise', accent: true }],
    columns: [
      {
        title: 'Treatment Approaches',
        subtitle: 'Treatment Focuses On:',
        items: [
          'Clinical pregnancy massage focusing on improving circulation',
          'Reducing tissue tension and supporting the body through physical changes',
          'Managing stress placed on muscles, joints, and circulation',
          'Addressing postural changes and hormonal adaptations',
          'A clinically guided approach designed for the physiological demands of pregnancy',
        ],
      },
      {
        title: 'What You Can Expect',
        subtitle: 'Many Patient Notice:',
        items: [
          'Relieve back and pelvic pain and discomfort',
          'Reduce leg swelling, fluid retention, and muscular tension',
          'Improve circulation, oxygen delivery, and ease breathing fatigue',
          'Support postural balance, comfort, and prepare your body safely for labour',
        ],
      },
    ],
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'Pregnancy & Postpartum', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './contact.html#contact-form',
  },
};

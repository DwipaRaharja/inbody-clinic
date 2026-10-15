const imageDirectory = './assets/images/services/Pain & TMJ Relief/Endometriosis & Pelvic Pain Support/';

export default {
  id: 'endometriosis-pelvic-pain-support',
  name: 'Endometriosis & Pelvic Pain Support',
  href: './endometriosis-pelvic-pain-support.html',
  category: 'Pain & TMJ Relief',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.02 (3).jpeg`,
      alt: 'Saila explaining pelvic anatomy with an anatomical model at InBody Clinic',
      width: 1600,
      height: 1068,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.04.jpeg`,
      alt: 'An InBody Clinic therapist treating a patient’s abdomen with a handheld device',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Endometriosis & Pelvic Pain Support',
    lines: [{ text: 'Feel Supported' }, { text: 'Find More Comfort', accent: true }],
    subEyebrow: 'InBody Clinic · Pelvic Pain Care',
    description: 'Gentle clinical care designed to ease pelvic discomfort, reduce inflammation, and improve tissue mobility, supporting long-term pelvic health and everyday comfort.',
    benefits: [
      { icon: 'ph-drop', label: 'Pelvic Comfort' },
      { icon: 'ph-arrows-clockwise', label: 'Tissue Mobility' },
      { icon: 'ph-shield-check', label: 'Pelvic Wellbeing' },
    ],
  },
  options: {
    eyebrow: 'When pelvic pain persists',
    lines: [{ text: 'Pelvic pain can affect' }, { text: 'everyday wellbeing', accent: true }],
    paragraphs: [
      'Persistent pelvic pain can affect comfort and daily activities. Women may experience deep pelvic discomfort, pain during intimacy, menstrual-related inflammation, or pressure and tension around the pelvis.',
    ],
    items: [
      'Deep pelvic discomfort',
      'Pain during intimacy',
      'Menstrual-related inflammation',
      'Pelvic pressure or lower back tension',
    ],
  },
  recovery: {
    eyebrow: 'Gentle support for pelvic health',
    lines: [{ text: 'Care That Supports' }, { text: 'Pelvic Wellbeing', accent: true }],
    description: 'Treatment focuses on reducing inflammation, improving pelvic tissue mobility, and calming pain sensitivity to support long-term pelvic health.',
    steps: [
      {
        title: 'Reduce Inflammation',
        description: 'Help manage inflammation and ease discomfort in the pelvic region.',
      },
      {
        title: 'Improve Tissue Mobility',
        description: 'Support pelvic tissue movement and flexibility for greater physical comfort.',
      },
      {
        title: 'Calm Pain Sensitivity',
        description: 'Help address pelvic tension and heightened pain sensitivity through targeted clinical care.',
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
          'Specialised pelvic manual therapy',
          'Clinical lymphatic drainage',
          'INDIBA radiofrequency to improve circulation and tissue healing',
          'Breathing and pelvic stability retraining',
        ],
      },
      {
        title: 'Ideal If You Notice',
        subtitle: 'Many Patient Notice :',
        items: [
          'Deep pelvic discomfort',
          'Pain during intimacy',
          'Menstrual-related inflammation, pelvic heaviness, or lower back tension',
        ],
      },
    ],
  },
  quote: 'Care may include specialised pelvic manual therapy, clinical lymphatic drainage, INDIBA radiofrequency, and breathing and pelvic stability retraining to support pelvic health and tissue recovery.',
  cta: {
    lines: [{ text: 'Start Your' }, { text: 'Pelvic Care Journey', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './contact.html#contact-form',
  },
};

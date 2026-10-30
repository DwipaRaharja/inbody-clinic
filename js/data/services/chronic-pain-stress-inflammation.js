import { imageAsset } from '../../utils/image-assets.js';
const imageDirectory = 'services/Pain & TMJ Relief/Chronic Pain, Stress & Inflammation Therapy/';

export default {
  id: 'chronic-pain-stress-inflammation',
  name: 'Chronic Pain, Stress & Inflammation',
  summary: 'Personalised care for persistent pain, muscular stiffness and stress-related physical tension, guided by your comfort and individual needs.',
  href: './pages/services/pain-tmj-relief/chronic-pain-stress-inflammation.html',
  category: 'Pain & TMJ Relief',
  images: {
    hero: {
      src: imageAsset(`${imageDirectory}chronic_pain_stress_inflammation_hero.jpeg`),
      alt: 'Saila providing hands-on abdominal treatment to a patient at InBody Clinic',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: imageAsset(`${imageDirectory}chronic_pain_stress_inflammation_treatment.jpeg`),
      alt: 'An InBody Clinic therapist using a handheld device to treat a patient’s back',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Chronic Pain, Stress & Inflammation Therapy ',
    lines: [{ text: 'Find relief' }, { text: 'feel more restored', accent: true }],
    subEyebrow: 'InBody Clinic · Women’s Pain Support',
    description: 'A gentle clinical treatment designed to ease persistent pain, calm the nervous system, and support the body through stress and inflammation.',
    benefits: [
      { icon: 'ph-drop', label: 'Fluid Retention' },
      { icon: 'ph-arrows-horizontal', label: 'Circulation Boost' },
      { icon: 'ph-shield-check', label: 'Tissue Balance' },
    ],
  },
  options: {
    eyebrow: 'When stress and pain linger',
    lines: [{ text: 'Pain and stress can affect' }, { text: 'everyday wellbeing', accent: true }],
    paragraphs: [
      'Prolonged stress can slow circulation, contribute to tissue congestion, and increase pain sensitivity, affecting daily comfort and recovery.',
    ],
    items: [
      'Chronic muscular pain or stiffness',
      'Stress-related tension in the neck, jaw, or back',
      'Persistent inflammation or fluid retention',
      'Fatigue and poor sleep linked to stress',
    ],
  },
  recovery: {
    eyebrow: 'Gentle support for recovery',
    lines: [{ text: 'Care that helps you' }, { text: 'feel more at ease', accent: true }],
    description: 'Treatment aims to reduce pain, regulate the nervous system, and support tissue function for greater everyday comfort.',
    steps: [
      {
        title: 'Heightened Pain Sensitivity',
        description: 'Prolonged stress may make the nervous system more sensitive to pain.',
      },
      {
        title: 'Slower Tissue Recovery',
        description: 'Ongoing stress may slow circulation and affect normal tissue function.',
      },
      {
        title: 'Inflammatory Congestion',
        description: 'Fluid retention and tissue congestion may contribute to physical discomfort.',
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
          'Clinical therapeutic massage',
          'Myofascial release to reduce fascial restriction and improve tissue mobility',
          'Medical lymphatic drainage to reduce inflammatory congestion',
          'INDIBA® radiofrequency (448 kHz) to stimulate microcirculation and cellular metabolism',
        ],
      },
      {
        title: 'Ideal If You Notice',
        subtitle: 'Many Patients Notice :',
        items: [
          'Chronic muscular pain or stiffness',
          'Stress-related tension in the neck, jaw, or back',
          'Persistent inflammation, fluid retention, fatigue, or poor sleep',
          'Fatigue and poor sleep linked to stress',
        ],
      },
    ],
  },
  quote: 'Treatment addresses not only the painful area but also the stress and inflammatory processes that may contribute to ongoing discomfort.',
  cta: {
    lines: [{ text: 'Start Your' }, { text: 'Recovery Journey', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

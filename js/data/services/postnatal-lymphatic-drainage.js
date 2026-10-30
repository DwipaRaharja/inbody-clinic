import { imageAsset } from '../../utils/image-assets.js';
const postnatalImageDirectory = 'services/Pregnancy & Postpartum/POSTNATAL LYMPHATIC DRAINAGE/';

export default {
  id: 'postnatal-lymphatic-drainage',
  name: 'Postnatal Lymphatic Drainage',
  summary: 'Gentle lymphatic care after childbirth, focused on swelling, fluid retention and a feeling of heaviness during postnatal recovery.',
  href: './pages/services/pregnancy-postpartum/postnatal-lymphatic-drainage.html',
  category: 'Pregnancy & Postpartum',
  images: {
    hero: {
      src: imageAsset(`${postnatalImageDirectory}postnatal_lymphatic_drainage_hero.jpeg`),
      alt: 'Electrotherapy pads on a patient’s abdomen during a postnatal treatment at InBody Clinic',
      width: 1024,
      height: 1536,
      position: '50% 85%',
    },
    treatment: {
      src: imageAsset(`${postnatalImageDirectory}postnatal_lymphatic_drainage_treatment.jpeg`),
      alt: 'An InBody Clinic therapist treating a patient’s abdomen with a handheld device',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Postnatal Lymphatic Drainage',
    lines: [{ text: 'Feel lighter' }, { text: 'move freely', accent: true }],
    description: 'A gentle, considered treatment to support circulation and help ease the feeling of heaviness after pregnancy and childbirth.',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-baby', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Your body after birth',
    lines: [
      { text: 'Every recovery' },
      {
        text: 'has its own rhythm',
        segments: [{ text: 'has ' }, { text: 'its own rhythm', accent: true }],
      },
    ],
    paragraphs: [
      'After pregnancy and childbirth, many women notice swelling, fluid retention or a feeling of heaviness. Hormonal changes, fatigue, reduced circulation and procedures such as a C-section can make recovery feel slower and less comfortable.',
    ],
    items: [
      'Swollen legs, ankles or feet',
      'Abdominal fluid retention or bloating',
      'Heavy ortired legs',
      'Post-birth tissue congestion',
    ],
  },
  recovery: {
    eyebrow: 'Gentle support for recovery',
    lines: [
      { text: 'Care that helps you' },
      {
        text: 'feel more at ease',
        segments: [{ text: 'feel ' }, { text: 'more at ease', accent: true }],
      },
    ],
    description: 'Postnatal lymphatic drainage is a gentle clinical technique designed to support lymphatic circulation and help the body manage excess fluid.',
    steps: [
      {
        title: 'Support circulation',
        description: 'Encourage lymphatic flow and the movement of excess fluid',
      },
      {
        title: 'Ease the heaviness',
        description: 'Help relieve the feeling of swelling and tiredness in the legs',
      },
      {
        title: 'Make space to rest',
        description: 'Support relaxation and comfort during postnatal recovery',
      },
    ],
  },
  expertise: {
    lines: [{ text: 'Treatment Pathways &' }, { text: 'Clinical Expertise', accent: true }],
    columns: [
      {
        title: 'Treatment Approaches',
        subtitle: 'Structured recovery & tailored modalities :',
        items: [
          'Swollen legs, ankles, or feet',
          'Abdominal fluid retention or bloating',
          'A sensation of heavy or tired legs',
          'General tissue congestion after birth',
        ],
      },
      {
        title: 'What You Can Expect',
        subtitle: 'Treatment can help :',
        items: [
          'Reduce postpartum swelling and fluid retention',
          'Improve lymphatic circulation',
          'Relieve heaviness in the legs',
          'Support C-section recovery and tissue healing',
          'Promote overall postnatal recovery and relaxation',
        ],
      },
    ],
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'Pregnancy & Postpartum', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

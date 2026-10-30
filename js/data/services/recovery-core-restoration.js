import { imageAsset } from '../../utils/image-assets.js';
const imageDirectory = 'services/Pregnancy & Postpartum/Recovery & Core Restoration/';

export default {
  id: 'recovery-core-restoration',
  name: 'Recovery & Core Restoration',
  summary: 'Postpartum rehabilitation focused on deep core activation, abdominal wall support and a steadier return to everyday movement.',
  href: './pages/services/pregnancy-postpartum/recovery-core-restoration.html',
  category: 'Pregnancy & Postpartum',
  images: {
    hero: {
      src: imageAsset(`${imageDirectory}recovery_core_restoration_hero.jpeg`),
      alt: 'A therapist explaining a treatment to a patient resting on a treatment bed',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: imageAsset(`${imageDirectory}recovery_core_restoration_treatment.jpeg`),
      alt: 'A therapist applying pink supportive tape to a patient’s abdomen',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Recovery & Core Restoration',
    lines: [{ text: 'Rebuild your' }, { text: 'inner strength', accent: true }],
    subEyebrow: 'InBody Clinic · Pregnancy & Postpartum',
    description: 'A structured recovery program to support deep core activation, abdominal wall function and a steadier return to everyday movement after pregnancy.',
    benefits: [
      { icon: 'ph-heart', label: 'Care shaped around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-person-simple-tai-chi', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Personalised treatment options',
    lines: [{ text: 'Tools chosen for' }, { text: 'your recovery', accent: true }],
    paragraphs: [
      'After childbirth, some women notice that their abdomen feels weak or unstable, or that it still looks pregnant months after delivery. These changes may relate to diastasis recti, reduced core activation or connective tissue tension. CoreRestore® is a structured postpartum recovery program designed around your needs and stage of healing.',
      'When indicated, supportive techniques can be included in your plan and selected for your needs and stage of recovery :',
    ],
    items: ['Clinical lymphatic drainage', 'Myofascial tissue techniques', 'Compression therapy', 'Symptom management'],
  },
  recovery: {
    eyebrow: 'A guide restoration framework',
    lines: [{ text: 'Recovery at' }, { text: 'your pace', accent: true }],
    description: 'Manual therapy and personalised rehabilitation are adapted to each stage of healing. The pathway below shows the areas your plan may work through over time.',
    steps: [
      {
        title: 'Reconnect with your core',
        description: 'Build awareness and encourage deep core activation, including the transversus abdominis.',
      },
      {
        title: 'Restore abdominal support',
        description: 'Address abdominal wall function and connective tissue tension with an individualised approach.',
      },
      {
        title: 'Develop stability',
        description: 'Work toward better postural control and functional stability for everyday movement.',
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
          'Manual therapy adapted to each stage of healing',
          'Personalised rehabilitation program',
          'INDIBA radiofrequency to improve tissue quality and collagen response',
          'Personalised clinical electrotherapy to enhance deep muscle activation',
          'Low-level laser therapy to support C-section scar healing',
        ],
      },
      {
        title: 'What You Can Expect',
        subtitle: 'CoreRestore® program focus & outcomes :',
        items: [
          'Deep core activation',
          'Abdominal wall support & posture functional stability',
          'Rebuilding connective tissue tension (linea alba) & addressing diastasis recti',
          'Recover core strength, improve stability, and feel more confident in your body again',
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

const imageDirectory = './assets/images/services/Pain & TMJ Relief/Clinical Therapeutic Massage & Injury Recovery/';

export default {
  id: 'clinical-therapeutic-massage-injury-recovery',
  name: 'Clinical Therapeutic Massage & Injury Recovery',
  href: './pages/services/pain-tmj-relief/clinical-therapeutic-massage-injury-recovery.html',
  category: 'Pain & TMJ Relief',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp-Image-2025-09-04-at-13.43.19.webp`,
      alt: 'A therapist providing hands-on massage to a patient’s back',
      width: 612,
      height: 408,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.08 (1).jpeg`,
      alt: 'An InBody Clinic therapist treating a patient’s leg with a handheld device',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Clinical Therapeutic Massage & Injury Recovery',
    lines: [{ text: 'Ease The Pain' }, { text: 'Move More Freely', accent: true }],
    subEyebrow: 'InBody Clinic · Pain & Injury Recovery',
    description: 'A structured clinical treatment designed to ease muscular pain, improve restricted movement, and support recovery from injuries, helping you move with greater comfort.',
    benefits: [
      { icon: 'ph-drop', label: 'Pain Relief' },
      { icon: 'ph-arrows-clockwise', label: 'Better Mobility' },
      { icon: 'ph-shield-check', label: 'Injury Recovery' },
    ],
  },
  options: {
    eyebrow: 'When pain affects movement',
    lines: [{ text: 'Pain and injury can affect' }, { text: 'everyday movement', accent: true }],
    paragraphs: [
      'Muscular pain, injuries, and physical strain can make everyday movement uncomfortable. Clinical therapeutic massage is designed to address musculoskeletal pain, movement restrictions, and recovery needs.',
    ],
    items: [
      'Neck and back pain',
      'Shoulder or hip discomfort',
      'Sports injuries or muscle strains',
      'Plantar fasciitis or postural overload',
    ],
  },
  recovery: {
    eyebrow: 'Targeted support for recovery',
    lines: [{ text: 'Care That Helps You' }, { text: 'Move More Freely', accent: true }],
    description: 'A personalised clinical approach combining targeted manual techniques to reduce pain, restore mobility, and support tissue recovery.',
    steps: [
      {
        title: 'Reduce Pain',
        description: 'Help ease muscular discomfort and tension through targeted clinical therapy.',
      },
      {
        title: 'Restore Mobility',
        description: 'Support joint movement and tissue flexibility to improve everyday comfort.',
      },
      {
        title: 'Support Recovery',
        description: 'Encourage circulation and tissue repair to support recovery from physical strain and injury.',
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
          'Remedial and deep tissue therapy',
          'Myofascial release and trigger point therapy',
          'Joint mobilisation and dry needling when appropriate',
          'INDIBA radiofrequency to support tissue repair and circulation',
        ],
      },
      {
        title: 'Ideal If You Notice',
        subtitle: 'Many Patients Notice :',
        items: [
          'Persistent neck, back, shoulder, or hip pain',
          'Sports injuries or muscle strains',
          'Plantar fasciitis or postural overload',
        ],
      },
    ],
  },
  quote: 'Treatment may include remedial and deep tissue therapy, myofascial release, trigger point therapy, joint mobilisation, dry needling when appropriate, and INDIBA radiofrequency to support tissue repair and circulation.',
  cta: {
    lines: [{ text: 'Start Your' }, { text: 'Recovery Journey', accent: true }],
    description: 'Ask about support for swelling, fluid retention and heavy legs',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

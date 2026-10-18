const imageDirectory = './assets/images/services/Body Contouring/Lymphatic Reset & Fluid Retention Treatment/';

export default {
  id: 'lymphatic-reset-fluid-retention-treatment',
  name: 'Lymphatic Reset & Fluid Retention Treatment',
  summary: 'Care for persistent fluid retention and heavy legs, combining lymphatic drainage with additional clinical therapies when appropriate.',
  href: './pages/services/body-contouring/lymphatic-reset-fluid-retention-treatment.html',
  category: 'Body Contouring',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.06 (2).jpeg`,
      alt: 'A therapist providing manual abdominal treatment to a patient resting on a treatment bed',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.33.07 (1).jpeg`,
      alt: 'Close-up of a therapist using a handheld treatment applicator on a patient’s skin',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Lymphatic Reset & Fluid Retention Treatment',
    lines: [
      { text: 'Reduce Swelling, Heavy' },
      { segments: [{ text: 'Legs & ' }, { text: 'Tissue Congestion', accent: true }] },
    ],
    subEyebrow: 'InBody Clinic · Body Contouring',
    description: 'Many women experience persistent swelling, fluid retention, or a constant feeling of heaviness in the body. Stress, hormonal changes, sedentary lifestyle, or circulatory slowdown can overload the lymphatic system, reducing its ability to remove excess fluid and metabolic waste.',
    benefits: [
      { icon: 'ph-drop', label: 'Fluid Retention' },
      { icon: 'ph-arrows-clockwise', label: 'Circulation Boost' },
      { icon: 'ph-stack', label: 'Tissue Balance' },
    ],
  },
  options: {
    eyebrow: 'Clinical treatment protocol',
    lines: [
      { segments: [{ text: 'Recommended if ' }, { text: 'you', accent: true }] },
      { text: 'experience', accent: true },
    ],
    paragraphs: ['Targeted clinical therapy designed to address fluid build-up, heaviness, and circulation slowdown:'],
    items: ['Swollen legs or ankles', 'Persistent fluid retention', 'Body heaviness', 'Inflammatory tissue congestion'],
  },
  recovery: {
    eyebrow: 'Personalised treatment options',
    lines: [{ text: 'The Protocol Integrates' }],
    description: 'This treatment is designed to stimulate lymphatic flow and restore tissue balance.',
    steps: [
      { title: 'INDIBA radiofrequency', description: 'to activate circulation' },
      { title: 'Personalised clinical electrotherapy', description: 'A natural reduction in collagen production affects firmness and structural support.' },
      { title: 'Personalised clinical electrotherapy', description: 'to support lymphatic stimulation and tissue metabolism' },
    ],
  },
  expertise: {
    lines: [{ text: 'The Protocol & Patient' }, { text: 'Outcomes' }],
    columns: [
      {
        title: 'The Protocol Integrates',
        subtitle: 'Treatment May Include:',
        items: [
          'Clinical lymphatic drainage',
          'INDIBA radiofrequency to activate circulation',
          'Personalised clinical electrotherapy to support lymphatic stimulation and tissue metabolism',
          'Specialised botanical formulations from GERnétic International',
        ],
      },
      {
        title: 'Patient Outcomes',
        subtitle: 'Many patients report feeling:',
        items: ['Lighter', 'Less swollen', 'Deeply relaxed after treatment'],
      },
    ],
  },
  quote: 'Many patients report feeling lighter, less swollen, and deeply relaxed',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'Body Contouring', accent: true }],
    description: 'Ask how our clinical therapies can support circulation, skin elasticity, and natural body renewal.',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

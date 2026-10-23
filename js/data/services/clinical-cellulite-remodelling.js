const imageDirectory = './assets/images/services/Body Contouring/Clinical Cellulite Remodelling/';

export default {
  id: 'clinical-cellulite-remodelling',
  name: 'Clinical Cellulite Remodelling',
  summary: 'Clinical care for visible cellulite and uneven skin texture, with treatment selected for your connective tissue condition and individual needs.',
  href: './pages/services/body-contouring/clinical-cellulite-remodelling.html',
  category: 'Body Contouring',
  images: {
    hero: {
      src: `${imageDirectory}clinical_cellulite_remodelling_hero.jpg`,
      alt: 'Close-up of a therapist applying a treatment device to a patient’s abdomen',
      width: 1600,
      height: 1066,
    },
    treatment: {
      src: `${imageDirectory}clinical_cellulite_remodelling_treatment.jpg`,
      alt: 'A therapist providing hands-on tissue care with a treatment device to a patient’s thigh',
      width: 1600,
      height: 1066,
    },
  },
  hero: {
    eyebrow: 'Clinical Cellulite Remodelling',
    lines: [
      { text: 'Treatment for' },
      { text: 'Cellulite, Fluid' },
      { segments: [{ text: 'Retention & ' }, { text: 'Tissue', accent: true }] },
      { text: 'Congestion', accent: true },
    ],
    subEyebrow: 'InBody Clinic · Body Contouring',
    description: 'Cellulite is rarely just fat. It is often associated with poor circulation, lymphatic stagnation, and connective tissue fibrosis. When fluids accumulate and connective tissue becomes rigid, the skin may develop visible dimpling and uneven texture.',
    benefits: [
      { icon: 'ph-heart', label: 'Care built around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-hand-heart', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Targeted indications',
    lines: [{ segments: [{ text: 'Ideal If ' }, { text: 'You Notice', accent: true }] }],
    paragraphs: ['Cellulite is rarely just fat. It is often associated with poor circulation, lymphatic stagnation, and connective tissue fibrosis.'],
    items: ['Visible cellulite', 'Swollen or heavy legs', 'Fluid retention', 'Uneven skin texture', 'Stubborn areas'],
  },
  recovery: {
    eyebrow: 'Adapted protocols',
    lines: [{ text: 'Different Types of' }, { text: 'Cellulite We Address', accent: true }],
    description: 'The protocol is adapted to address different types of cellulite, working on the entire tissue environment to progressively remodel the skin.',
    steps: [
      { title: 'Edematous Cellulite', description: 'Never intended to be painful, ensuring maximum comfort during your recovery.' },
      { title: 'Fibrous Cellulite', description: 'Carefully adapted to your specific surgery, individual needs, and healing stage.' },
      { title: 'Hormonal Cellulite', description: 'Safely supports tissue recovery while respecting your surgical structures.' },
    ],
  },
  expertise: {
    lines: [{ text: 'The Treatment &' }, { text: 'What to Expect', accent: true }],
    columns: [
      {
        title: 'Clinical Protocol',
        subtitle: 'The treatment combines:',
        items: [
          'Clinical lymphatic drainage',
          'Connective tissue massage',
          'INDIBA radiofrequency to stimulate circulation and collagen',
          'Targeted botanical formulations from GERnétic International',
        ],
      },
      {
        title: 'Treatment Approaches',
        subtitle: 'Treatment Outcome & Process:',
        items: [
          'Restoring Tissue Health',
          'This treatment works on the entire tissue environment, improving circulation and reducing congestion to progressively remodel the skin.',
          'Over time, tissues feel lighter, smoother, and less congested.',
        ],
      },
    ],
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'Body Contouring', accent: true }],
    description: 'Ask how our clinical therapies can support circulation, skin elasticity, and natural body renewal.',
    label: 'Contact the Clinic',
    href: './pages/contact.html#contact-form',
  },
};

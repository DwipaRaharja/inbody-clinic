const imageDirectory = './assets/images/services/Body Contouring/Clinical Cellulite Remodelling/';

export default {
  id: 'clinical-cellulite-remodelling',
  name: 'Clinical Cellulite Remodelling',
  href: './clinical-cellulite-remodelling.html',
  category: 'Body Contouring',
  images: {
    hero: {
      src: `${imageDirectory}23fc0f3102d3c6f596bd16a19ecab8d1e2dbfa05-750x605-1.avif`,
      alt: 'Illustration of a woman holding her abdomen, with a red area highlighting discomfort',
      width: 750,
      height: 605,
      fit: 'contain',
    },
    treatment: {
      src: `${imageDirectory}WhatsApp Image 2026-10-02 at 10.32.57.jpeg`,
      alt: 'Two InBody Clinic therapists reviewing a tablet together in the treatment room',
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
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
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
        variant: 'icon-blocks',
        items: [
          { icon: 'ph-target', label: 'Headline:', description: 'Restoring Tissue Health' },
          { icon: 'ph-heartbeat', label: 'Deskripsi:', description: 'This treatment works on the entire tissue environment, improving circulation and reducing congestion to progressively remodel the skin.' },
          { icon: 'ph-check-circle', label: 'Hasil:', description: 'Over time, tissues feel lighter, smoother, and less congested.' },
        ],
      },
    ],
  },
  quote: 'The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves.',
  cta: {
    lines: [{ text: 'Discuss your' }, { text: 'Body Contouring', accent: true }],
    description: 'Ask how our clinical therapies can support circulation, skin elasticity, and natural body renewal.',
    label: 'Contact the Clinic',
    href: './contact.html#contact-form',
  },
};

const imageDirectory = './assets/images/services/Body Contouring/Hormonal Skin Tightening & Firmness Treatment/';

export default {
  id: 'hormonal-skin-tightening-firmness-treatment',
  name: 'Hormonal Skin Tightening & Firmness Treatment',
  summary: 'Care for changes in skin firmness and elasticity during hormonal transitions, including pregnancy, postpartum recovery and menopause.',
  href: './pages/services/body-contouring/hormonal-skin-tightening-firmness-treatment.html',
  category: 'Body Contouring',
  images: {
    hero: {
      src: `${imageDirectory}WhatsApp-Image-2025-10-12-at-19.38.17-1-1024x683.webp`,
      alt: 'A therapist providing upper-body manual therapy to a patient at InBody Clinic',
      width: 1024,
      height: 683,
    },
    treatment: {
      src: `${imageDirectory}WhatsApp-Image-2025-10-12-at-19.38.17-1024x683.webp`,
      alt: 'A therapist applying hands-on treatment to a patient’s shoulder and upper back',
      width: 1024,
      height: 683,
    },
  },
  hero: {
    eyebrow: 'Hormonal Skin Tightening & Firmness Treatment',
    lines: [
      { text: 'Support for Skin' },
      { segments: [{ text: 'Firmness & ' }, { text: 'Hormonal', accent: true }] },
      { text: 'Body Changes', accent: true },
    ],
    subEyebrow: 'InBody Clinic · Body Contouring',
    description: 'During phases such as pregnancy, postpartum recovery, menopause, or hormonal transitions, the skin and connective tissues can change significantly. This treatment supports deep tissue revitalisation and skin regeneration.',
    benefits: [
      { icon: 'ph-heart', label: 'Care built around you' },
      { icon: 'ph-sparkle', label: 'Clinically guided care' },
      { icon: 'ph-circle', label: 'Gentle, considered approach' },
    ],
  },
  options: {
    eyebrow: 'Hormonal body changes',
    lines: [{ text: 'Understanding Changes' }, { text: 'in Your Skin', accent: true }],
    paragraphs: ['Women often notice shifts in skin tone, elasticity, and firmness across different life stages:'],
    items: ['Loss of skin firmness', 'Reduced elasticity', 'Thinning or fragile skin', 'Changes in body texture'],
  },
  recovery: {
    eyebrow: 'The science of skin aging',
    lines: [{ text: 'Key Factors Behind' }, { text: 'Tissue Changes', accent: true }],
    description: 'These changes are often linked to collagen decline, slower cellular regeneration, and reduced circulation.',
    steps: [
      { title: 'Collagen Decline', description: 'A natural reduction in collagen production affects firmness and structural support.' },
      { title: 'Slower Cellular Regeneration', description: "The skin's renewal cycle slows down, impacting resilience and density." },
      { title: 'Reduced Circulation', description: 'Decreased blood and nutrient delivery impacts tissue vitality and skin tone.' },
    ],
  },
  expertise: {
    lines: [
      { segments: [{ text: 'The Protocol & ' }, { text: 'Ideal', accent: true }] },
      { text: 'Candidates', accent: true },
    ],
    description: 'For optimal physiological tissue remodeling, a structured program of 6–8 sessions is recommended.',
    columns: [
      {
        title: 'The Protocol Combines',
        subtitle: 'Treatment May Includes:',
        items: [
          'Specialised manual therapy',
          'INDIBA radiofrequency to stimulate fibroblasts and collagen',
          'Personalised clinical electrotherapy to enhance tissue stimulation and regeneration',
          'Regenerative skincare from GERnétic International',
        ],
      },
      {
        title: 'Ideal If You Notice',
        subtitle: 'Many Patient Notice:',
        items: [
          'Skin laxity after pregnancy',
          'Loss of firmness during menopause',
          'Reduced skin density or elasticity',
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

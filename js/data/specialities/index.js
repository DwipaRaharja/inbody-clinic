import { specialityCatalog } from './catalog.js';
import { services } from '../services/index.js';

const details = {
  'pre-post-surgical-recovery': {
    booking: {
      care: 'surgical recovery care',
      description: 'Ask about support with preparation for surgery, swelling, scars and tissue recovery.',
    },
    headline: ['Care before surgery.', 'Support through recovery.'],
    introduction: 'Personalised clinical care for people preparing for or recovering from plastic and reconstructive surgery. We consider your procedure, tissue condition and stage of recovery when planning treatment.',
    needs: ['Preparation for plastic or reconstructive surgery', 'Recovery following liposuction or abdominoplasty', 'Recovery following breast surgery or a facelift', 'Swelling and bruising', 'Scars, fibrosis and tissue restrictions', 'Functional recovery after a procedure'],
    approach: 'Your recovery is individual. We assess symptoms, tissue quality and stage of healing to select the most appropriate support, then reassess and adapt your plan as you progress.',
    techniques: ['Specialised hands-on treatment', 'Lymphatic therapy where appropriate', 'Scar and tissue care', 'Therapeutic technology when appropriate', 'Personalised recovery and self-care advice'],
    timing: 'Care may be relevant while preparing for a procedure or at different stages after surgery. An individual assessment helps us understand the support that is appropriate for your stage of recovery.',
    imageService: 'post-surgical-recovery',
    image: {
      src: './assets/images/specialities/pre-post-surgical-recovery/pre_post_surgical_recovery_hero.jpg',
      webp: [
        { src: './assets/images/specialities/pre-post-surgical-recovery/pre_post_surgical_recovery_hero-720.webp', width: 720 },
        { src: './assets/images/specialities/pre-post-surgical-recovery/pre_post_surgical_recovery_hero-1440.webp', width: 1440 },
      ],
      sizes: '(min-width: 68.8125rem) min(55vw, 704px), 100vw',
      alt: 'A clinician explaining supportive taping to a patient during a recovery treatment',
      width: 1600,
      height: 1066,
    },
  },
  'clinical-lymphatic-care': {
    booking: {
      care: 'lymphatic drainage care',
      description: 'Ask about support for swelling, fluid retention and heavy legs.',
    },
    headline: ['Understanding swelling.', 'Personalising your care.'],
    introduction: 'Specialised clinical lymphatic care for people experiencing swelling, fluid retention, heavy legs and lymphatic-related symptoms. Treatment begins with understanding your individual concerns.',
    needs: [
      'General Swelling & Fluid Retention',
      'Puffy Face, Eyes & Hands',
      'Heavy & Swollen Legs',
      'Chronic Inflammation & Swelling',
      'Hormonal & Menopause-Related Swelling',
      'Pregnancy & Postpartum Swelling',
      'Abdominal Swelling',
      'Venous Insufficiency',
      'Travel-Related Swelling',
    ],
    approach: 'We look beyond a treatment name. Your symptoms, tissue quality and individual needs inform a personalised programme, with ongoing review of your response to care.',
    techniques: ['Specialised Manual Lymphatic Drainage', 'Individual clinical assessment', 'Personalised hands-on treatment', 'Therapeutic technology when appropriate', 'Recovery and self-care advice'],
    timing: 'If swelling, fluid retention or heavy legs are affecting your comfort, an assessment can help identify the clinical care that fits your needs. You do not need to choose a particular technique before contacting us.',
    imageService: 'lymphatic-reset-fluid-retention-treatment',
    treatments: [services['clinical-lymphatic-drainage-sydney']],
  },
  'lipedema-lymphoedema-oncology-care': {
    booking: {
      care: 'lymphatic condition care',
      description: 'Ask about personalised support for lipedema, lymphoedema and cancer-related lymphatic concerns.',
    },
    headline: ['Care for your symptoms.', 'Support for your needs.'],
    introduction: 'Specialised conservative care for people with lipedema, lymphoedema and lymphatic complications associated with cancer treatment. Our approach focuses on symptom management, education and tissue care.',
    needs: ['Living with lipedema', 'Living with lymphoedema', 'Lymphatic complications associated with cancer treatment', 'Support with symptom management', 'Tissue care and understanding individual needs'],
    approach: 'We listen to your experience and assess your condition, symptoms and tissue quality. Your plan is individualised, with education and ongoing reassessment as part of care.',
    techniques: ['Individual clinical assessment', 'Specialised conservative lymphatic care', 'Personalised hands-on treatment', 'Tissue care and self-care education', 'Ongoing review and adaptation'],
    timing: 'Contact the clinic to discuss your condition and the support you are looking for. The initial assessment helps establish whether our conservative care is appropriate for your individual needs.',
    imageService: 'lipedema-inflammatory-leg-care',
  },
  'pregnancy-postpartum-care': {
    booking: {
      care: 'pregnancy & postpartum care',
      description: 'Ask about support for pregnancy discomfort, swelling and recovery after childbirth.',
    },
    headline: ['Care during pregnancy.', 'Support after childbirth.'],
    introduction: 'Specialised, individual care throughout pregnancy and after childbirth, with support for discomfort, swelling, tissue recovery and postpartum rehabilitation.',
    needs: ['Pelvic and back discomfort during pregnancy', 'Swelling and a sensation of heavy legs', 'Birth preparation', 'C-section scar care', 'Abdominal tissue recovery', 'Postpartum rehabilitation support', 'Diastasis recti (abdominal separation)'],
    approach: 'As women and mothers ourselves, we understand the importance of feeling heard and supported. We assess your symptoms, tissue quality and stage of pregnancy or postpartum recovery to personalise treatment.',
    techniques: ['Pregnancy massage and specialised manual therapy', 'Lymphatic care when appropriate', 'Birth preparation support', 'C-section scar and abdominal tissue care', 'Personalised postpartum rehabilitation support'],
    timing: 'Your needs can change during pregnancy and after childbirth. An assessment provides a starting point for care that reflects your current symptoms and stage of recovery.',
    imageService: 'pregnancy-massage-circulation-support',
    image: {
      src: './assets/images/specialities/pregnancy-postpartum-care/pregnancy_postpartum_care_hero.jpeg',
      webp: [
        { src: './assets/images/specialities/pregnancy-postpartum-care/pregnancy_postpartum_care_hero-720.webp', width: 720 },
        { src: './assets/images/specialities/pregnancy-postpartum-care/pregnancy_postpartum_care_hero-1024.webp', width: 1024 },
      ],
      sizes: '(min-width: 68.8125rem) min(55vw, 704px), 100vw',
      alt: 'A clinician providing hands-on abdominal care during a pregnancy and postpartum treatment',
      width: 1024,
      height: 1536,
    },
  },
  'tmj-pain-stress-care': {
    booking: {
      care: 'jaw pain & tension care',
      description: 'Ask about support for jaw discomfort, headaches and stress-related muscular tension.',
    },
    headline: ['Understanding tension.', 'Care shaped around you.'],
    introduction: 'Specialised hands-on care for jaw pain, bruxism, muscular-tension headaches, neck discomfort and persistent muscular tension, including stress-related physical symptoms.',
    needs: ['Jaw pain and TMJ discomfort', 'Bruxism', 'Headaches associated with muscular tension', 'Neck discomfort', 'Persistent muscular tension', 'Stress-related physical symptoms'],
    approach: 'We consider your symptoms and the way tension affects your everyday comfort. Your assessment guides an individual approach to manual treatment, with review and adaptation over time.',
    techniques: ['Specialised manual therapy', 'Myofascial techniques', 'Intra-oral treatment when appropriate', 'Individual clinical assessment', 'Personalised self-care advice and reassessment'],
    timing: 'If jaw discomfort or muscular tension is affecting your daily life, contact our team to discuss an assessment. The treatment approach is selected for your symptoms rather than a fixed protocol.',
    imageService: 'tmj-jaw-headache-treatment',
    imageVariant: 'treatment',
  },
  'skin-tissue-health': {
    booking: {
      care: 'skin & tissue care',
      description: 'Ask about personalised care for cellulite, skin texture, firmness and tissue mobility.',
    },
    headline: ['Cellulite &', 'Tissue remodelling'],
    introduction: [
      'Personalised dermatofunctional care to improve skin texture, tissue quality, firmness and mobility.',
      'At InBody Clinic, we understand that changes in skin and connective tissue can be influenced by hormonal fluctuations, ageing, pregnancy, weight changes, surgery and medical treatments.',
      'Our approach goes beyond traditional body-contouring treatments. We combine clinical assessment, specialised hands-on techniques and advanced therapeutic technologies to address your individual tissue concerns.',
    ],
    needsHeading: 'How Can We Help?',
    needsIntroduction: 'Our personalised treatments are designed for:',
    needs: [
      'Cellulite & uneven skin texture – changes in skin appearance and connective tissue structure.',
      'Fluid retention & tissue congestion – swelling, heaviness and localised fluid accumulation.',
      'Fibrosis & tissue restrictions – areas of thickened tissue, adhesions or reduced tissue mobility.',
      'Loss of firmness & elasticity – changes in skin and connective tissue quality.',
      'Post-pregnancy & weight-loss changes – altered skin texture, elasticity and tissue mobility.',
      'Perimenopause & menopause – hormonal-related changes in skin firmness and connective tissue.',
      'Post-oncological tissue changes – scar tissue, fibrosis, tightness and reduced tissue mobility following cancer surgery, radiotherapy or other oncological treatments.',
    ],
    approachHeading: 'Our Approach',
    approach: [
      'Every treatment begins with a comprehensive, personalised clinical assessment.',
      'We evaluate your skin and connective tissue, tissue mobility, relevant medical history and individual concerns to determine the most appropriate treatment approach.',
    ],
    techniquesIntroduction: 'Depending on your assessment, treatment may combine:',
    techniques: [
      'Specialised manual therapy – to address tissue restrictions and improve mobility.',
      'Clinical lymphatic drainage – to support fluid management and reduce swelling when appropriate.',
      'INDIBA® Radiofrequency – incorporated when clinically appropriate as part of tissue-focused care.',
      'Low-Level Laser Therapy (LLLT) – selected for specific tissue rehabilitation goals.',
      'Electrotherapy – tailored to individual therapeutic needs.',
      'Intermittent Pneumatic Compression – to support fluid management when indicated.',
    ],
    timing: [
      'Our treatments are adapted to your tissue condition, medical history and personal goals rather than following a standard body-contouring protocol.',
      'For clients recovering from cancer treatment, care is adapted to their oncological history, current health status and any medical precautions, with medical clearance or multidisciplinary coordination when required.',
    ],
    image: {
      src: './assets/images/specialities/skin-tissue-health/skin_tissue_health_hero.jpg',
      webp: [
        { src: './assets/images/specialities/skin-tissue-health/skin_tissue_health_hero-720.webp', width: 720 },
        { src: './assets/images/specialities/skin-tissue-health/skin_tissue_health_hero-1440.webp', width: 1440 },
      ],
      sizes: '(min-width: 68.8125rem) min(55vw, 704px), 100vw',
      alt: 'An InBody Clinic therapist providing hands-on tissue care with a treatment device to a patient’s thigh',
      width: 1600,
      height: 1066,
    },
    treatments: [{
      ...services['clinical-cellulite-remodelling'],
      name: 'Cellulite & Tissue remodelling',
      summary: 'Personalised dermatofunctional care to improve skin texture, tissue quality, firmness and mobility.',
    }],
  },
};

export const specialities = Object.fromEntries(specialityCatalog.map(speciality => {
  const detail = details[speciality.id];
  return [speciality.id, {
    ...speciality, ...detail,
    image: detail.image ?? services[detail.imageService].images[detail.imageVariant ?? 'hero'],
    treatments: detail.treatments ?? speciality.serviceIds.map(id => services[id]),
  }];
}));

export function getSpeciality(id) {
  return Object.hasOwn(specialities, id) ? specialities[id] : null;
}

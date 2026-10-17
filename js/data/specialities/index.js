import { specialityCatalog } from './catalog.js';
import { services } from '../services/index.js';

const details = {
  'pre-post-surgical-recovery': {
    headline: ['Care before surgery.', 'Support through recovery.'],
    introduction: 'Personalised clinical care for people preparing for or recovering from plastic and reconstructive surgery. We consider your procedure, tissue condition and stage of recovery when planning treatment.',
    needs: ['Preparation for plastic or reconstructive surgery', 'Recovery following liposuction or abdominoplasty', 'Recovery following breast surgery or a facelift', 'Swelling and bruising', 'Scars, fibrosis and tissue restrictions', 'Functional recovery after a procedure'],
    approach: 'Your recovery is individual. We assess symptoms, tissue quality and stage of healing to select the most appropriate support, then reassess and adapt your plan as you progress.',
    techniques: ['Specialised hands-on treatment', 'Lymphatic therapy where appropriate', 'Scar and tissue care', 'Therapeutic technology when appropriate', 'Personalised recovery and self-care advice'],
    timing: 'Care may be relevant while preparing for a procedure or at different stages after surgery. An individual assessment helps us understand the support that is appropriate for your stage of recovery.',
    imageService: 'post-surgical-recovery',
  },
  'clinical-lymphatic-care': {
    headline: ['Understanding swelling.', 'Personalising your care.'],
    introduction: 'Specialised clinical lymphatic care for people experiencing swelling, fluid retention, heavy legs and lymphatic-related symptoms. Treatment begins with understanding your individual concerns.',
    needs: ['Swelling and fluid retention', 'A sensation of heavy legs', 'Lymphatic-related symptoms', 'Changes in tissue comfort or quality', 'Understanding the right approach for your needs'],
    approach: 'We look beyond a treatment name. Your symptoms, tissue quality and individual needs inform a personalised programme, with ongoing review of your response to care.',
    techniques: ['Specialised Manual Lymphatic Drainage', 'Individual clinical assessment', 'Personalised hands-on treatment', 'Therapeutic technology when appropriate', 'Recovery and self-care advice'],
    timing: 'If swelling, fluid retention or heavy legs are affecting your comfort, an assessment can help identify the clinical care that fits your needs. You do not need to choose a particular technique before contacting us.',
    imageService: 'lymphatic-reset-fluid-retention-treatment',
  },
  'lipedema-lymphoedema-oncology-care': {
    headline: ['Care for your symptoms.', 'Support for your needs.'],
    introduction: 'Specialised conservative care for people with lipedema, lymphoedema and lymphatic complications associated with cancer treatment. Our approach focuses on symptom management, education and tissue care.',
    needs: ['Living with lipedema', 'Living with lymphoedema', 'Lymphatic complications associated with cancer treatment', 'Support with symptom management', 'Tissue care and understanding individual needs'],
    approach: 'We listen to your experience and assess your condition, symptoms and tissue quality. Your plan is individualised, with education and ongoing reassessment as part of care.',
    techniques: ['Individual clinical assessment', 'Specialised conservative lymphatic care', 'Personalised hands-on treatment', 'Tissue care and self-care education', 'Ongoing review and adaptation'],
    timing: 'Contact the clinic to discuss your condition and the support you are looking for. The initial assessment helps establish whether our conservative care is appropriate for your individual needs.',
    imageService: 'lipedema-inflammatory-leg-care',
  },
  'pregnancy-postpartum-care': {
    headline: ['Care during pregnancy.', 'Support after childbirth.'],
    introduction: 'Specialised, individual care throughout pregnancy and after childbirth, with support for discomfort, swelling, tissue recovery and postpartum rehabilitation.',
    needs: ['Pelvic and back discomfort during pregnancy', 'Swelling and a sensation of heavy legs', 'Birth preparation', 'C-section scar care', 'Abdominal tissue recovery', 'Postpartum rehabilitation support'],
    approach: 'As women and mothers ourselves, we understand the importance of feeling heard and supported. We assess your symptoms, tissue quality and stage of pregnancy or postpartum recovery to personalise treatment.',
    techniques: ['Pregnancy massage and specialised manual therapy', 'Lymphatic care when appropriate', 'Birth preparation support', 'C-section scar and abdominal tissue care', 'Personalised postpartum rehabilitation support'],
    timing: 'Your needs can change during pregnancy and after childbirth. An assessment provides a starting point for care that reflects your current symptoms and stage of recovery.',
    imageService: 'pregnancy-massage-circulation-support',
  },
  'tmj-pain-stress-care': {
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
    headline: ['Clinical care for skin.', 'Attention to your tissues.'],
    introduction: 'Dermatofunctional care considers the health and quality of your skin and connective tissues. We support people experiencing cellulite, fibrosis, tissue restrictions and changes in skin texture.',
    needs: ['Cellulite and changes in skin texture', 'Fibrosis and tissue restrictions', 'Changes in connective tissue quality', 'Tissue changes following pregnancy', 'Skin and tissue changes after weight loss', 'Changes associated with menopause'],
    approach: 'We assess tissue quality, symptoms and your individual concerns to understand the support that is appropriate. Dermatofunctional expertise brings a clinical perspective to skin and tissue care.',
    techniques: ['Individual skin and tissue assessment', 'Specialised hands-on therapy', 'Personalised tissue care', 'Therapeutic technology when appropriate', 'Self-care advice and ongoing reassessment'],
    timing: 'An assessment can help you understand changes in your skin and connective tissues, and discuss which care may suit your needs following pregnancy, weight loss, menopause or other tissue changes.',
    imageService: 'clinical-cellulite-remodelling',
    imageVariant: 'treatment',
  },
};

export const specialities = Object.fromEntries(specialityCatalog.map(speciality => {
  const detail = details[speciality.id];
  return [speciality.id, {
    ...speciality, ...detail,
    image: services[detail.imageService].images[detail.imageVariant ?? 'hero'],
    treatments: speciality.serviceIds.map(id => services[id]),
  }];
}));

export function getSpeciality(id) {
  return Object.hasOwn(specialities, id) ? specialities[id] : null;
}

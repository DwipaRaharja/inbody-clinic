import { getSpeciality } from '../data/specialities/index.js';
import { createSpecialityPage } from '../sections/speciality/index.jsx';

export default function SpecialityPage({ specialityId } = {}) {
  const speciality = getSpeciality(specialityId);
  if (!speciality) throw new Error(`Unknown speciality: ${specialityId}`);
  return createSpecialityPage(speciality);
}

export const clinicContact = {
  email: 'Sailainsua@gmail.com',
  phone: '+61 424 912 490',
  phoneHref: 'tel:+61424912490',
  addressLines: ['Level 1, 336 New South', 'Head Rd, Double Bay', 'NSW 2028'],
  mapQuery: 'InBody Clinic, Level 1, 336 New South Head Road, Double Bay NSW 2028, Australia',
  hours: ['Weekdays', '9:00 am – 7:00 pm'],
};

export const clinicMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicContact.mapQuery)}`;
export const clinicMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(clinicContact.mapQuery)}&z=16&output=embed`;

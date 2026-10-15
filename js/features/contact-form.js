import { clinicContact } from '../data/clinic-contact.js';

function lettersAndSpaces(value) {
  return value.normalize('NFC').replace(/[^\p{L}\p{M} ]/gu, '');
}

export function buildContactMailto({ name, email, subject, message }) {
  const cleanSubject = String(subject).trim().replace(/[\r\n]+/g, ' ');
  const body = [
    `Name: ${String(name).trim()}`,
    `Email: ${String(email).trim()}`,
    '',
    String(message).trim(),
  ].join('\r\n');
  return `mailto:${clinicContact.email}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(body)}`;
}

export function initContactForm(form) {
  const status = form.querySelector('[data-contact-status]');
  const nameInput = form.querySelector('[name="name"]');
  const sanitizeName = () => {
    const value = nameInput.value;
    const cleanValue = lettersAndSpaces(value);
    if (value === cleanValue) return;

    const start = nameInput.selectionStart;
    const end = nameInput.selectionEnd;
    nameInput.value = cleanValue;
    if (start !== null && end !== null) {
      nameInput.setSelectionRange(
        lettersAndSpaces(value.slice(0, start)).length,
        lettersAndSpaces(value.slice(0, end)).length,
      );
    }
  };

  nameInput.addEventListener('input', (event) => {
    if (!event.isComposing) sanitizeName();
  });
  nameInput.addEventListener('compositionend', sanitizeName);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sanitizeName();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    if (status) {
      status.textContent = 'Your email draft is ready. Send it from your email app, or contact us using the email link on this page.';
    }
    window.location.href = buildContactMailto(values);
  });
}

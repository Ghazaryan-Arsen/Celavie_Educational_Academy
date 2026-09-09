import { getWordCount, isValidEmail, isValidPhone, parseAge } from './validation';
import type { NiceExchangeFormData } from '../types/niceExchange';

export const createEmptyNiceExchangeForm = (): NiceExchangeFormData => ({
  firstName: '',
  lastName: '',
  age: '',
  school: '',
  email: '',
  phone: '',
  country: '',
  currentLanguageLevel: 'A1',
  motivationEssay: '',
  parentName: '',
  parentPhone: '',
  acceptedTerms: false,
});

export const validateNiceExchangeForm = (formData: NiceExchangeFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const age = parseAge(formData.age);

  if (!formData.firstName.trim()) errors.firstName = 'First name is required';
  if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
  if (age === null || age < 14 || age > 99) errors.age = 'Age must be between 14 and 99';
  if (age !== null && age < 18 && !formData.parentName.trim()) {
    errors.parentName = 'Parent name is required for applicants under 18';
  }
  if (!formData.school.trim()) errors.school = 'School or university name is required';
  if (!isValidEmail(formData.email)) errors.email = 'Valid email address is required';
  if (!isValidPhone(formData.phone)) errors.phone = 'Valid phone number is required';
  if (!formData.country.trim()) errors.country = 'Country of residence is required';
  if (!formData.currentLanguageLevel.trim()) errors.currentLanguageLevel = 'Language level is required';

  const wordCount = getWordCount(formData.motivationEssay);
  if (wordCount < 300 || wordCount > 500) {
    errors.motivationEssay = `Essay must be between 300 and 500 words (Current word count: ${wordCount})`;
  }

  if (!isValidPhone(formData.parentPhone)) errors.parentPhone = 'Valid parent phone number is required';
  if (!formData.acceptedTerms) errors.acceptedTerms = 'You must accept the terms and conditions';

  return errors;
};

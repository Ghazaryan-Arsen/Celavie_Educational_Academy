import { getWordCount, isValidEmail, isValidPhone, isValidPersonName, isValidAge } from './validation';
import type { NiceExchangeFormData } from '../types/niceExchange';

export const createEmptyNiceExchangeForm = (): NiceExchangeFormData => ({
  firstName: '',
  lastName: '',
  age: '',
  school: '',
  email: '',
  phone: '',
  country: '',
  currentLanguageLevel: '',
  motivationEssay: '',
  parentName: '',
  parentPhone: '',
  acceptedTerms: false,
});

export const validateNiceExchangeForm = (formData: NiceExchangeFormData): Record<string, string> => {
  const errors: Record<string, string> = {};


  if (!isValidPersonName(formData.firstName)) errors.firstName = 'Enter a valid first name without digits.';
  if (!isValidPersonName(formData.lastName)) errors.lastName = 'Enter a valid last name without digits.';
  if (!isValidAge(formData.age)) errors.age = 'Age must be a whole number between 11 and 99.';
  if (!isValidPersonName(formData.parentName)) errors.parentName = 'Enter a valid parent name without digits.';
  if (!formData.school.trim() || formData.school.trim().length > 150) errors.school = 'School is required and must be 150 characters or fewer';
  if (!isValidEmail(formData.email)) errors.email = 'Valid email address is required';
  if (!isValidPhone(formData.phone)) errors.phone = 'Please enter a valid Armenian phone number.';
  if (!formData.country.trim()) errors.country = 'Country of residence is required';
  if (!['A1', 'A2', 'B1', 'B2', 'C1'].includes(formData.currentLanguageLevel)) errors.currentLanguageLevel = 'Language level is required';

  const wordCount = getWordCount(formData.motivationEssay);
  if (wordCount > 0 && (wordCount < 300 || wordCount > 500)) {
    errors.motivationEssay = `Motivation essay must contain 300-500 words, or be left empty. (Current word count: ${wordCount})`;
  }

  if (!isValidPhone(formData.parentPhone)) errors.parentPhone = 'Please enter a valid Armenian phone number.';
  if (formData.acceptedTerms !== true) errors.acceptedTerms = 'You must accept the terms and conditions';

  return errors;
};

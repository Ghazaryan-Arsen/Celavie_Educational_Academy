import { supabase } from './supabase';
import { getWordCount, isValidEmail, isValidPhone, parseAge } from './validation';
import type {
  NiceExchangeApplicationInsert,
  NiceExchangeFormData,
} from '../types/niceExchange';

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

export const toNiceExchangeApplicationInsert = (
  formData: NiceExchangeFormData
): NiceExchangeApplicationInsert => {
  const age = parseAge(formData.age);
  if (age === null) throw new Error('Age must be numeric');

  return {
    first_name: formData.firstName.trim(),
    last_name: formData.lastName.trim(),
    age,
    school: formData.school.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    country: formData.country.trim(),
    language_level: formData.currentLanguageLevel,
    motivation_essay: formData.motivationEssay.trim(),
    parent_name: formData.parentName.trim() || null,
    parent_phone: formData.parentPhone.trim(),
    terms_accepted: formData.acceptedTerms,
    status: 'pending',
  };
};

export const submitNiceExchangeApplication = async (
  formData: NiceExchangeFormData
): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase is not configured. The application was not submitted.');
  }

  let timeoutId: number | undefined;
  try {
    const submission = supabase
      .from('nice_exchange_applications')
      .insert(toNiceExchangeApplicationInsert(formData));
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = window.setTimeout(() => reject(new Error('Nice Exchange submission timed out')), 20000);
    });
    const { error } = await Promise.race([submission, timeout]);

    if (error) throw error;
  } finally {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  }
};

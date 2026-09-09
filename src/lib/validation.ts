export const isValidEmail = (value: string): boolean => {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPersonName = (value: string): boolean =>
  /\p{L}/u.test(value) && /^[\p{L}\p{M} '\u2019-]+$/u.test(value.trim());

export const isValidAge = (value: string): boolean => isAgeInRange(value, 11, 99);

export const validateCourseApplicant = (form: {
  firstName: string; lastName: string; age: string; email: string; phone: string; notes?: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!isValidPersonName(form.firstName)) errors.firstName = 'Enter a valid first name without digits.';
  if (!isValidPersonName(form.lastName)) errors.lastName = 'Enter a valid last name without digits.';
  if (!isValidAge(form.age)) errors.age = 'Age must be a whole number between 11 and 99.';
  if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address (maximum 254 characters).';
  if (!isValidPhone(form.phone)) errors.phone = 'Please enter a valid Armenian phone number.';
  if ((form.notes?.trim().length ?? 0) > 1000) errors.notes = 'Message must be 1000 characters or fewer.';
  return errors;
};

// Armenian mobile destination codes; six subscriber digits follow the code.
// Source: https://www.ituob.org/issues/1267-en/
export const isValidPhone = (value: string): boolean => {
  const normalized = value.replace(/[\s()-]/g, '');
  return /^(?:\+374|0)(?:33|41|43|44|55|77|88|91|93|94|95|96|97|98|99)\d{6}$/.test(normalized);
};

export const parseAge = (value: string): number | null => {
  const normalized = value.trim();
  if (!/^\d+$/.test(normalized)) return null;

  const parsed = Number.parseInt(normalized, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export const isAgeInRange = (value: string, min: number, max: number): boolean => {
  const age = parseAge(value);
  return age !== null && age >= min && age <= max;
};

export const getWordCount = (value: string): number => value.trim().split(/\s+/).filter(Boolean).length;

export const isFutureDateAtLeast = (value: string, daysInFuture: number): boolean => {
  if (!value) return false;

  const selected = new Date(value);
  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + daysInFuture);

  return selected >= minimumDate;
};

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidPhone = (value: string): boolean => {
  const normalized = value.trim();
  const digitCount = (normalized.match(/\d/g) || []).length;
  return digitCount >= 7 && digitCount <= 20 && /^[\d+()\s-]+$/.test(normalized);
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

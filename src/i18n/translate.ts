import catalog from './catalog.json';
import type { Language } from './useLanguage';
export type TranslationKey = keyof typeof catalog;
const dictionary: Record<string, string[]> = catalog;
const indexes = { hy: 0, ru: 1, fr: 2 } as const;
// Only display strings are localized. Objects, React elements, field values and IDs remain intact.
export function translate<T>(value: T, language: Language): T {
  if (typeof value !== 'string' || language === 'en') return value;
  const normalized = value.replace(/\s+/g, ' ').trim();
  const entry = dictionary[normalized];
  if (entry) return value.replace(normalized, entry[indexes[language]]) as T;
  const essay = normalized.match(/^Motivation essay must contain 300-500 words, or be left empty\. \(Current word count: (\d+)\)$/);
  if (essay) return translate('Motivation essay must contain 300-500 words, or be left empty. Current word count: {count}', language).replace('{count}', essay[1]) as T;
  return value;
}

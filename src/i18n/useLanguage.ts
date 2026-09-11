import { createContext, useContext } from 'react';
import { translate } from './translate';
export type Language = 'hy' | 'en' | 'ru' | 'fr';
export const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'hy', setLanguage: () => {} });
export const useLanguage = () => useContext(LanguageContext);
export function useT() {
  const { language } = useLanguage();
  return <T,>(value: T): T => translate(value, language);
}

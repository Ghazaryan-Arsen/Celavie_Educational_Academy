import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext } from './useLanguage';
import type { Language } from './useLanguage';
const STORAGE_KEY = 'celavie.language';
const valid = (value: unknown): value is Language => ['hy', 'en', 'ru', 'fr'].includes(String(value));
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); return valid(saved) ? saved : 'hy'; } catch { return 'hy'; }
  });
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const value = useMemo(() => ({ language, setLanguage: (next: Language) => {
    if (!valid(next)) return;
    setLanguage(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Preference remains in memory when storage is unavailable. */ }
  } }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

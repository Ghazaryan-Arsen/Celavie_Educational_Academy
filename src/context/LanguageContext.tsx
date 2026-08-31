import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Language, siteTranslations, type SiteTranslation } from '../translations/siteTranslations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteTranslation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('celavie_lang');
    if (saved && (saved === 'en' || saved === 'hy' || saved === 'ru' || saved === 'fr')) {
      return saved as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('celavie_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = siteTranslations[language] || siteTranslations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

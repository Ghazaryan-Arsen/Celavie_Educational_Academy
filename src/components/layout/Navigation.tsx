import { useT, useLanguage } from '../../i18n/useLanguage';
import type { Language } from '../../i18n/useLanguage';
import { BrandLogo } from '../ui/BrandLogo';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'HY', name: 'Հայերեն', flag: '🇦🇲', label: 'HY 🇦🇲' },
  { code: 'EN', name: 'English', flag: '🇬🇧', label: 'EN 🇬🇧' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺', label: 'RU 🇷🇺' },
  { code: 'FR', name: 'Français', flag: '🇫🇷', label: 'FR 🇫🇷' },
];

export const Navigation: React.FC = () => {
  const t = useT();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentLang = LANGUAGES.find(lang => lang.code.toLowerCase() === language)!;
  const setCurrentLang = (lang: LanguageOption) => setLanguage(lang.code.toLowerCase() as Language);

  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close language switcher dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node) && !mobileLangRef.current?.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setLangDropdownOpen(false); setMobileMenuOpen(false); } };
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', escape); };
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3.5 border-b border-[#4aabb8]/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => handleScrollTo('top')}
          className="flex items-center space-x-3 group text-left focus:outline-none cursor-pointer"
        >
          <BrandLogo />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => handleScrollTo('courses')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >{t("Courses")}</button>
          <button
            onClick={() => handleScrollTo('nice')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >{t("Nice Program")}</button>
          <button
            onClick={() => handleScrollTo('why')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >{t("Why Us")}</button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >{t("Contact")}</button>
        </nav>

        {/* Desktop Controls (Language Switcher + CTA Button) */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full border border-[#4aabb8]/20 bg-white/80 hover:bg-white text-xs font-semibold text-[#222222] hover:border-[#4aabb8]/40 transition-all shadow-xs cursor-pointer focus:outline-none"
              aria-label={t("Select Language Desktop")}
              aria-expanded={langDropdownOpen}
            >
              <span className="text-base leading-none">{t(currentLang.flag)}</span>
              <span>{t(currentLang.code)}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#222222]/60 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#4aabb8]/20 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4aabb8]">{t("Language / Լեզու")}</div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#4aabb8]/10 transition-colors cursor-pointer ${
                      currentLang.code === lang.code ? 'text-[#2b7a85] font-bold bg-[#4aabb8]/5' : 'text-[#222222]/80'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base leading-none">{t(lang.flag)}</span>
                      <span lang={lang.code.toLowerCase()}>{lang.name}</span>
                    </div>
                    {currentLang.code === lang.code && <Check className="w-3.5 h-3.5 text-[#4aabb8]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleScrollTo('register')}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#4aabb8] text-white font-medium text-sm hover:bg-[#2b7a85] transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
          >{t("Register Now")}</button>
        </div>

        {/* Mobile Controls (Lang button + Menu toggle) */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Mobile Language Switcher Trigger */}
          <div className="relative" ref={mobileLangRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#4aabb8]/20 bg-white/90 text-xs font-semibold text-[#222222] shadow-xs cursor-pointer focus:outline-none"
              aria-label={t("Select Language Mobile")}
              aria-expanded={langDropdownOpen}
            >
              <span className="text-sm leading-none">{t(currentLang.flag)}</span>
              <span>{t(currentLang.code)}</span>
              <ChevronDown className={`w-3 h-3 text-[#222222]/60 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#4aabb8]/20 shadow-xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4aabb8]">{t("Language")}</div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#4aabb8]/10 transition-colors cursor-pointer ${
                      currentLang.code === lang.code ? 'text-[#2b7a85] font-bold bg-[#4aabb8]/5' : 'text-[#222222]/80'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base leading-none">{t(lang.flag)}</span>
                      <span lang={lang.code.toLowerCase()}>{lang.name}</span>
                    </div>
                    {currentLang.code === lang.code && <Check className="w-3.5 h-3.5 text-[#4aabb8]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#222222] hover:text-[#4aabb8] focus:outline-none"
            aria-label={t("Toggle menu")}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-[#4aabb8]/10 px-6 pt-4 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleScrollTo('courses')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >{t("Courses")}</button>
            <button
              onClick={() => handleScrollTo('nice')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >{t("Nice Program")}</button>
            <button
              onClick={() => handleScrollTo('why')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >{t("Why Us")}</button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >{t("Contact")}</button>
          </nav>

          <div className="pt-2 border-t border-[#4aabb8]/10 flex flex-col space-y-3">
            <button
              onClick={() => handleScrollTo('register')}
              className="w-full py-3 rounded-full bg-[#4aabb8] text-white font-medium text-sm hover:bg-[#2b7a85] transition-colors text-center shadow-md"
            >{t("Register Now")}</button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { LANGUAGE_COURSES, SMM_COURSES } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { type Language } from '../../translations/siteTranslations';

export const Navigation: React.FC = () => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<LanguageOption>(LANGUAGES[0]);

  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  // Click outside to close language switcher dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const languagesList: { code: Language; label: string }[] = [
    { code: 'hy', label: 'Հայերեն' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(0,0,0,0.08)] shadow-xs">
      <Container className="flex items-center justify-between h-20">
        {/* Brand Logo */}
        <button onClick={() => handleScrollTo('hero')} className="flex items-center space-x-3 group text-left">
          <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xl tracking-tight shadow-md group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
            C
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[rgb(38,38,38)] block leading-tight">
              CELAVIE
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">
              Educational Academy
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-6">
          <button
            onClick={() => handleScrollTo('hero')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => handleScrollTo('courses')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            {t.nav.courses}
          </button>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCoursesDropdownOpen(true)}
            onMouseLeave={() => setCoursesDropdownOpen(false)}
          >
            <button
              onClick={() => handleScrollTo('courses')}
              className="flex items-center space-x-1 text-sm font-semibold py-2 text-gray-600 hover:text-black transition-colors"
            >
              <span>{t.nav.explore}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black" />
            </button>

            {coursesDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-[8px] shadow-xl border border-[rgba(0,0,0,0.1)] py-3 px-4 z-50 animate-fade-in grid gap-4">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Globe className="w-3.5 h-3.5 text-black" />
                    <span>{t.nav.languageCourses}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LANGUAGE_COURSES.map((course) => (
                      <Link
                        key={course.id}
                        to={`/courses/${course.slug}`}
                        className="text-xs font-medium text-gray-700 hover:text-black hover:bg-[rgba(0,0,0,0.04)] px-2 py-1.5 rounded transition flex items-center space-x-1.5"
                      >
                        <span>{course.flagEmoji}</span>
                        <span>{course.language}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[rgba(0,0,0,0.06)] pt-3">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-black" />
                    <span>{t.nav.smmAcademy}</span>
                  </div>
                  <div className="space-y-1">
                    {SMM_COURSES.map((smm) => (
                      <Link
                        key={smm.id}
                        to={`/courses/smm/${smm.tier}`}
                        className="text-xs font-medium text-gray-700 hover:text-black hover:bg-[rgba(0,0,0,0.04)] px-2 py-1 rounded transition flex items-center justify-between"
                      >
                        <span>{smm.title}</span>
                        <span className="text-[10px] text-gray-400 capitalize">{smm.tier}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleScrollTo('gallery')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            {t.nav.gallery}
          </button>

          <button
            onClick={() => handleScrollTo('nice-exchange')}
            className="text-sm font-semibold flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,215,0,0.2)] text-black hover:bg-[#FFD700] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.niceExchange}</span>
          </button>

          <button
            onClick={() => handleScrollTo('about')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            {t.nav.about}
          </button>

          <button
            onClick={() => handleScrollTo('faq')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            {t.nav.faq}
          </button>
        </nav>

        {/* Global Language Switcher & Register CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Global Language Pill Bar */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full border border-gray-200">
            {languagesList.map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition ${
                  language === item.code
                    ? 'bg-black text-white shadow-xs'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button variant="primary" size="md" onClick={() => handleScrollTo('register')}>
            {t.nav.registerNow}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Mobile Language Switcher Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="text-xs font-bold bg-gray-100 text-black border border-gray-300 rounded-full px-2 py-1 mr-1 focus:outline-none"
          >
            {languagesList.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[rgba(0,0,0,0.08)] bg-white px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleScrollTo('hero')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleScrollTo('courses')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              {t.nav.courses}
            </button>
            <button
              onClick={() => handleScrollTo('gallery')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => handleScrollTo('nice-exchange')}
              className="text-left text-base font-bold text-black bg-[#FFD700] px-3 py-2 rounded-md inline-block mt-1"
            >
              {t.nav.niceExchange}
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleScrollTo('faq')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              {t.nav.faq}
            </button>
          </nav>

          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <Button variant="primary" className="w-full" onClick={() => handleScrollTo('register')}>
              {t.nav.registerNow}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

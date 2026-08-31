import React from 'react';
import { Container } from '../ui/Container';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFD700] text-black flex items-center justify-center font-bold text-lg">
                C
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                CELAVIE Educational Academy
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FFD700]">{t.footer.explore}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#courses" className="hover:text-white transition">{t.nav.courses}</a></li>
              <li><a href="#gallery" className="hover:text-white transition">{t.nav.gallery}</a></li>
              <li><a href="#nice-exchange" className="hover:text-white transition">{t.nav.niceExchange}</a></li>
              <li><a href="#about" className="hover:text-white transition">{t.nav.about}</a></li>
              <li><a href="#register" className="hover:text-white transition">{t.nav.registerNow}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FFD700]">{t.footer.contact}</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 Yerevan, Armenia</p>
              <p>📞 +374 00 00 00 00</p>
              <p>✉️ info@celavie.academy</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-300 transition">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

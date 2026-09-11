import { useT } from '../../i18n/useLanguage';
import { BrandLogo } from '../ui/BrandLogo';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig, PHONE_HREF } from '../../config/site';
import { Phone, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useT();
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') { navigate('/#' + id); return; }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <BrandLogo />
            </div>

            <p className="text-sm text-white/70 max-w-md font-sans leading-relaxed">
              {t(siteConfig.description)}
            </p>

            <div className="space-y-3 pt-2 text-sm text-white/80">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#4aabb8] shrink-0" />
                <span>{t(siteConfig.contact.address)}</span>
              </div>
<div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#4aabb8] shrink-0" />
                <a href={PHONE_HREF} className="hover:text-[#4aabb8] transition-colors">
                  {t(siteConfig.contact.phone)}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">{t("Quick Navigation")}</h4>
            <ul className="space-y-2.5 text-sm font-medium text-white/70">
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >{t("Courses & Programs")}</button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nice')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >{t("Nice Exchange Program")}</button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >{t("Why CELAVIE")}</button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('register')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >{t("Course Registration")}</button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >{t("FAQ & Support")}</button>
              </li>
            </ul>
          </div>

          {/* Academic Directions */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">{t("Academic Focus")}</h4>
            <p className="text-sm text-white/70 leading-relaxed font-sans">{t("Specialized conversational training in 10+ foreign languages (French, English, German, Spanish, Italian, Russian, Armenian, Korean, Chinese, Japanese) and 3 tiers of Social Media Marketing.")}</p>
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('register')}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#4aabb8] text-white font-semibold text-xs hover:bg-[#2b7a85] transition-all shadow-md cursor-pointer"
              >{t("Register For a Batch Now")}</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-4"><Link to="/about">{t("About Us")}</Link><Link to="/services">{t("Services")}</Link><Link to="/contact">{t("Contact")}</Link><Link to="/privacy">{t("Privacy Policy")}</Link><Link to="/terms">{t("Terms of Service")}</Link></div><p>{t("©")}{' '}{t(new Date().getFullYear())}{' '}{t("CELAVIE Educational Academy. All rights reserved.")}</p>
          <button
            onClick={() => scrollToSection('top')}
            className="inline-flex items-center space-x-1.5 hover:text-[#4aabb8] transition-colors cursor-pointer"
          >
            <span>{t("Back to top")}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

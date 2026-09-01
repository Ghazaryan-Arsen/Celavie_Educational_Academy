import React from 'react';
import { siteConfig } from '../../config/site';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
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
              <span className="grid place-items-center w-10 h-10 rounded-full bg-[#4aabb8] text-white font-bold text-lg shadow-md">
                C
              </span>
              <div>
                <span className="font-heading text-xl font-bold tracking-tight text-white block">
                  CELAVIE Academy
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-[#4aabb8] block">
                  @CELAVIE_ACADEMY
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-md font-sans leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="space-y-3 pt-2 text-sm text-white/80">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#4aabb8] shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#4aabb8] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#4aabb8] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#4aabb8] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#4aabb8] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-white/70">
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >
                  Courses & Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nice')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >
                  Nice Exchange Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >
                  Why CELAVIE
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('register')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >
                  Course Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-[#4aabb8] transition-colors cursor-pointer"
                >
                  FAQ & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Directions */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              Academic Focus
            </h4>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Specialized conversational training in 10+ foreign languages (French, English, German, Spanish, Italian, Russian, Armenian, Korean, Chinese, Japanese) and 3 tiers of Social Media Marketing.
            </p>
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('register')}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#4aabb8] text-white font-semibold text-xs hover:bg-[#2b7a85] transition-all shadow-md cursor-pointer"
              >
                Register For a Batch Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} CELAVIE Educational Academy. All rights reserved.</p>
          <button
            onClick={() => scrollToSection('top')}
            className="inline-flex items-center space-x-1.5 hover:text-[#4aabb8] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

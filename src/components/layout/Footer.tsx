import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { siteConfig } from '../../config/site';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgb(38,38,38)] text-white pt-16 pb-12 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xl tracking-tight">
                C
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                CELAVIE ACADEMY
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex items-center space-x-3 text-sm text-gray-300 pt-2">
              <MapPin className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>{siteConfig.contact.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>{siteConfig.contact.phone}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Academy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/nice-exchange" className="text-gray-400 hover:text-[#FFD700] transition-colors flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Nice Exchange</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Languages
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 grid grid-cols-2 gap-x-2">
              <li><Link to="/courses/french" className="hover:text-white">French</Link></li>
              <li><Link to="/courses/english" className="hover:text-white">English</Link></li>
              <li><Link to="/courses/italian" className="hover:text-white">Italian</Link></li>
              <li><Link to="/courses/spanish" className="hover:text-white">Spanish</Link></li>
              <li><Link to="/courses/german" className="hover:text-white">German</Link></li>
              <li><Link to="/courses/russian" className="hover:text-white">Russian</Link></li>
              <li><Link to="/courses/armenian" className="hover:text-white">Armenian</Link></li>
              <li><Link to="/courses/korean" className="hover:text-white">Korean</Link></li>
              <li><Link to="/courses/chinese" className="hover:text-white">Chinese</Link></li>
              <li><Link to="/courses/japanese" className="hover:text-white">Japanese</Link></li>
            </ul>
          </div>

          {/* SMM & Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              SMM & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses/smm/starter" className="text-gray-400 hover:text-white transition-colors">
                  SMM Starter
                </Link>
              </li>
              <li>
                <Link to="/courses/smm/pro" className="text-gray-400 hover:text-white transition-colors">
                  SMM Pro
                </Link>
              </li>
              <li>
                <Link to="/courses/smm/expert" className="text-gray-400 hover:text-white transition-colors">
                  SMM Expert
                </Link>
              </li>
              <li className="pt-3 border-t border-gray-700">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} CELAVIE Educational Academy. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-gray-300">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms</Link>
            <Link to="/contact" className="hover:text-gray-300">Support</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

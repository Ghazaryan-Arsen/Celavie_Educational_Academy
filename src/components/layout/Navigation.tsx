import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#4aabb8] text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            C
          </div>
          <div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#222222] block leading-tight">
              CELAVIE Academy
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#4aabb8] block">
              @CELAVIE_ACADEMY
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => handleScrollTo('courses')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >
            Courses
          </button>
          <button
            onClick={() => handleScrollTo('nice')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >
            Nice Program
          </button>
          <button
            onClick={() => handleScrollTo('why')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >
            Why Us
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="text-sm font-medium text-[#222222]/80 hover:text-[#4aabb8] transition-colors focus:outline-none cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => handleScrollTo('register')}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#4aabb8] text-white font-medium text-sm hover:bg-[#2b7a85] transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
          >
            Register Now
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#222222] hover:text-[#4aabb8] focus:outline-none"
            aria-label="Toggle menu"
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
            >
              Courses
            </button>
            <button
              onClick={() => handleScrollTo('nice')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >
              Nice Program
            </button>
            <button
              onClick={() => handleScrollTo('why')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >
              Why Us
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="text-left text-base font-medium text-[#222222] hover:text-[#4aabb8] py-1"
            >
              Contact
            </button>
          </nav>
          <div className="pt-2 border-t border-[#4aabb8]/10">
            <button
              onClick={() => handleScrollTo('register')}
              className="w-full py-3 rounded-full bg-[#4aabb8] text-white font-medium text-sm hover:bg-[#2b7a85] transition-colors text-center shadow-md"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

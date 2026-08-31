import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { LANGUAGE_COURSES, SMM_COURSES } from '../../data/mockData';

export const Navigation: React.FC = () => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
            Home
          </button>

          <button
            onClick={() => handleScrollTo('courses')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            Courses
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
              <span>Explore</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black" />
            </button>

            {coursesDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-[8px] shadow-xl border border-[rgba(0,0,0,0.1)] py-3 px-4 z-50 animate-fade-in grid gap-4">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Globe className="w-3.5 h-3.5 text-black" />
                    <span>Language Courses</span>
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
                    <span>SMM Academy</span>
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
            Gallery
          </button>

          <button
            onClick={() => handleScrollTo('nice-exchange')}
            className="text-sm font-semibold flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,215,0,0.2)] text-black hover:bg-[#FFD700] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nice Exchange</span>
          </button>

          <button
            onClick={() => handleScrollTo('about')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            About
          </button>

          <button
            onClick={() => handleScrollTo('faq')}
            className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="primary" size="md" onClick={() => handleScrollTo('register')}>
            Register Now
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
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
              Home
            </button>
            <button
              onClick={() => handleScrollTo('courses')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              Courses
            </button>
            <button
              onClick={() => handleScrollTo('gallery')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              Gallery
            </button>
            <button
              onClick={() => handleScrollTo('nice-exchange')}
              className="text-left text-base font-bold text-black bg-[#FFD700] px-3 py-2 rounded-md inline-block mt-1"
            >
              Nice Exchange Program
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              About Us
            </button>
            <button
              onClick={() => handleScrollTo('faq')}
              className="text-left text-base font-semibold text-gray-800 hover:text-black"
            >
              FAQ
            </button>
          </nav>

          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <Button variant="primary" className="w-full" onClick={() => handleScrollTo('register')}>
              Register for Course
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

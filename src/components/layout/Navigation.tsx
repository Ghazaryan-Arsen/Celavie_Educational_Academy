import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { LANGUAGE_COURSES, SMM_COURSES } from '../../data/mockData';

export const Navigation: React.FC = () => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(0,0,0,0.08)] shadow-xs">
      <Container className="flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
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
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-semibold transition-colors ${
              isActive('/') ? 'text-black underline underline-offset-8 decoration-2' : 'text-gray-600 hover:text-black'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-semibold transition-colors ${
              isActive('/about') ? 'text-black underline underline-offset-8 decoration-2' : 'text-gray-600 hover:text-black'
            }`}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`text-sm font-semibold transition-colors ${
              isActive('/services') ? 'text-black underline underline-offset-8 decoration-2' : 'text-gray-600 hover:text-black'
            }`}
          >
            Services
          </Link>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCoursesDropdownOpen(true)}
            onMouseLeave={() => setCoursesDropdownOpen(false)}
          >
            <button
              className={`flex items-center space-x-1 text-sm font-semibold py-2 transition-colors ${
                location.pathname.startsWith('/courses') ? 'text-black underline underline-offset-8 decoration-2' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span>Courses</span>
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

          <Link
            to="/nice-exchange"
            className={`text-sm font-semibold flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-colors ${
              isActive('/nice-exchange')
                ? 'bg-[#FFD700] text-black font-bold'
                : 'bg-[rgba(255,215,0,0.2)] text-black hover:bg-[#FFD700]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nice Exchange</span>
          </Link>

          <Link
            to="/contact"
            className={`text-sm font-semibold transition-colors ${
              isActive('/contact') ? 'text-black underline underline-offset-8 decoration-2' : 'text-gray-600 hover:text-black'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link to="/register">
            <Button variant="primary" size="md">
              Apply Now
            </Button>
          </Link>
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
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-800 hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-800 hover:text-black"
            >
              About Us
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-800 hover:text-black"
            >
              Services
            </Link>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Language Courses
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGE_COURSES.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-gray-700 flex items-center space-x-1.5 py-1"
                  >
                    <span>{course.flagEmoji}</span>
                    <span>{course.language}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                SMM Courses
              </span>
              <div className="space-y-1.5">
                {SMM_COURSES.map((smm) => (
                  <Link
                    key={smm.id}
                    to={`/courses/smm/${smm.tier}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-gray-700 block py-1"
                  >
                    {smm.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/nice-exchange"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-black bg-[#FFD700] px-3 py-2 rounded-md inline-block text-center mt-2"
            >
              Nice Exchange Program
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-800 hover:text-black"
            >
              Contact Us
            </Link>
          </nav>

          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Register for Course
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

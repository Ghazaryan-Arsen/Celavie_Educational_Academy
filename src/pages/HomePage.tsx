import React, { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CourseCard } from '../components/domain/CourseCard';
import { TestimonialCard } from '../components/domain/TestimonialCard';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { RegistrationStepper } from '../components/ui/RegistrationStepper';
import { LANGUAGE_COURSES, SMM_COURSES, TESTIMONIALS, FAQS } from '../data/mockData';
import { validateCourseApplicant } from '../lib/validation';
import {
  createEmptyNiceExchangeForm,
  validateNiceExchangeForm,
} from '../lib/niceExchange';
import { submitRegistration } from '../lib/registration';
import type { RegistrationFormData } from '../types/registration';
import {
  Globe,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Target,
  MapPin,
  Star,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Course filter tabs: 'all' | 'language' | 'smm'
  const [courseFilter, setCourseFilter] = useState<'all' | 'language' | 'smm'>('all');

  // Nice Exchange Embedded Application state
  const [niceForm, setNiceForm] = useState(createEmptyNiceExchangeForm);
  const [niceErrors, setNiceErrors] = useState<Record<string, string>>({});
  const [niceSubmitted, setNiceSubmitted] = useState(false);
  const [niceLoading, setNiceLoading] = useState(false);
  const niceSubmissionInProgress = useRef(false);

  const handleNiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (niceSubmissionInProgress.current) return;

    const validationErrors = validateNiceExchangeForm(niceForm);
    setNiceErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    niceSubmissionInProgress.current = true;
    setNiceLoading(true);

    try {
      await submitRegistration('nice', niceForm);
      setNiceSubmitted(true);
    } catch (error) {
      console.error('Nice Exchange application submission failed', error);
      setNiceErrors({ form: 'Your application could not be submitted. Please check your connection and try again.' });
    } finally {
      setNiceLoading(false);
      niceSubmissionInProgress.current = false;
    }
  };

  // Inline Registration State
  const allCourses = [...LANGUAGE_COURSES, ...SMM_COURSES];
  const [regStep, setRegStep] = useState<number>(1);
  const [regCategory, setRegCategory] = useState('');
  const [regCourseId, setRegCourseId] = useState<string>('');
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    acceptedTerms: false,
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const selectedRegCourse = allCourses.find((c) => c.id === regCourseId && c.category === regCategory);

  const courseSubmissionInProgress = useRef(false);

  const handleRegNextStep2 = () => {
    const errs = validateCourseApplicant(regForm);

    setRegErrors(errs);
    if (Object.keys(errs).length === 0) {
      setRegStep(3);
    }
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (courseSubmissionInProgress.current) return;
    const errs = validateCourseApplicant(regForm);
    if (Object.keys(errs).length > 0) {
      setRegErrors(errs);
      setRegStep(2);
      return;
    }

    if (regForm.acceptedTerms !== true) {
      errs.acceptedTerms = 'You must accept the enrollment terms and conditions';
    }

    setRegErrors(errs);
    if (Object.keys(errs).length > 0) return;

    courseSubmissionInProgress.current = true;
    setRegLoading(true);

    try {
      const course = selectedRegCourse;
      if (!course) throw new Error('Please select a valid course.');

      const registrationData: RegistrationFormData = {
        fullName: `${regForm.firstName.trim()} ${regForm.lastName.trim()}`,
        phone: regForm.phone.trim(),
        email: regForm.email.trim(),
        message: '',
        ...(course.category === 'smm'
          ? { smmProgram: course.id }
          : { language: course.language, level: course.level }),
      };
      await submitRegistration(course.category, registrationData);


      setRegLoading(false);
      setRegSubmitted(true);
    } catch (error) {
      setRegLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during registration. Please try again.';
      setRegErrors({ form: errorMessage });
      console.error('Registration submission failed:', error);
    } finally {
      courseSubmissionInProgress.current = false;
    }
  };

  const generalFaqs = FAQS.filter(
    (f) => f.category === 'general' || f.category === 'registration' || f.category === 'nice-exchange'
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredCourses =
    courseFilter === 'all'
      ? allCourses
      : courseFilter === 'language'
      ? LANGUAGE_COURSES
      : SMM_COURSES;

  return (
    <div className="flex flex-col bg-white text-[#222222]">
      {/* 1. HERO SECTION (#top) */}
      <section id="top" className="order-1 relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-[#4aabb8]/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-[#4aabb8]/5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="primary" className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                CELAVIE EDUCATIONAL ACADEMY » @CELAVIE_ACADEMY
              </Badge>

              <h1
                className="font-heading font-medium text-[#222222] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
              >
                International Standard Education with CELAVIE
              </h1>

              <p className="text-base sm:text-lg text-[#222222]/70 leading-relaxed max-w-2xl font-sans">
                Master 10+ foreign languages and high-converting SMM marketing strategies. Join our exclusive exchange programs in Nice, France and elevate your career.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full px-8 py-3.5 shadow-md hover:shadow-lg font-semibold cursor-pointer"
                  onClick={() => scrollToSection('register')}
                >
                  Start Learning Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-3.5 font-semibold cursor-pointer"
                  onClick={() => scrollToSection('courses')}
                >
                  Explore Programs
                </Button>
              </div>

              {/* Key Metrics Grid */}
              <div className="pt-8 border-t border-[#4aabb8]/15 grid grid-cols-3 gap-6">
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#4aabb8] block">10+</span>
                  <span className="text-xs text-[#222222]/60 uppercase font-semibold tracking-wider">Foreign Languages</span>
                </div>
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#222222] block">100%</span>
                  <span className="text-xs text-[#222222]/60 uppercase font-semibold tracking-wider">Native Tutors</span>
                </div>
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#4aabb8] block">Nice, FR</span>
                  <span className="text-xs text-[#222222]/60 uppercase font-semibold tracking-wider">Summer Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden border border-[#4aabb8]/20 shadow-card group">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                  alt="CELAVIE Educational Academy Students"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#4aabb8] text-white flex items-center justify-center font-bold text-lg">
                      C
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-[#222222] text-sm">CELAVIE Language & SMM Center</h4>
                      <p className="text-xs text-[#222222]/70">Enrollments open for upcoming trimester</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE TICKER BAR */}
      <section className="order-2 py-6 border-y border-[#4aabb8]/10 bg-white overflow-hidden">
        <div className="relative flex">
          <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • 10+ Foreign Languages
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • SMM Professional Academy
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • Summer Exchange in Nice, France
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • Certified Tutors & Native Speakers
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • Interactive Speaking Clubs
            </span>
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12" aria-hidden="true">
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • 10+ Foreign Languages
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • SMM Professional Academy
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • Summer Exchange in Nice, France
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • Certified Tutors & Native Speakers
            </span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">
              • Interactive Speaking Clubs
            </span>
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION (#courses) */}
      <section id="courses" className="order-5 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">
              OUR COURSES
            </span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Choose Your Academic Path
            </h2>
            <p className="mt-3 text-base text-[#222222]/70 font-sans">
              From beginner conversational foreign languages to advanced digital social media strategies, choose a program tailored to your personal goals.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-8">
              <button
                onClick={() => setCourseFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  courseFilter === 'all'
                    ? 'bg-[#4aabb8] text-white shadow-sm'
                    : 'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10'
                }`}
              >
                All Courses ({allCourses.length})
              </button>
              <button
                onClick={() => setCourseFilter('language')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  courseFilter === 'language'
                    ? 'bg-[#4aabb8] text-white shadow-sm'
                    : 'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10'
                }`}
              >
                Foreign Languages ({LANGUAGE_COURSES.length})
              </button>
              <button
                onClick={() => setCourseFilter('smm')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  courseFilter === 'smm'
                    ? 'bg-[#4aabb8] text-white shadow-sm'
                    : 'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10'
                }`}
              >
                SMM Academy ({SMM_COURSES.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. NICE EXCHANGE PROGRAM SHOWCASE (#nice) */}
      <section id="nice" className="order-3 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] shadow-card group">
            <span className="inline-block relative w-full aspect-[16/9] sm:aspect-[21/9] transition-transform duration-700 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1400"
                alt="Nice Promenade des Anglais"
                className="w-full h-full object-cover"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8 sm:p-12">
              <div className="max-w-2xl text-white space-y-4">
                <Badge variant="accent" className="bg-[#4aabb8] text-white border-none px-3 py-1 font-bold">
                  Exclusive Program 🇫🇷
                </Badge>
                <h2 className="font-heading text-3xl sm:text-5xl font-medium">Discover Nice, France</h2>
                <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed">
                  Immerse yourself in authentic French culture along the Côte d'Azur. Practice French daily with welcoming host families while exploring Nice.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection('nice-register')}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-white text-[#222222] font-semibold text-sm hover:bg-[#4aabb8] hover:text-white transition-all shadow-md cursor-pointer"
                  >
                    Apply for Nice Program <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NICE PROGRAM APPLICATION FORM (#nice-register) */}
      <section id="nice-register" className="order-4 py-20 sm:py-28 bg-[#f3f6f7]/50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#4aabb8]/20 bg-white p-8 sm:p-12 shadow-card">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">
                NICE EXCHANGE PROGRAM
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-medium text-[#222222]">
                Apply for the French Riviera Cultural Immersion
              </h2>
              <p className="mt-2 text-sm text-[#222222]/70 font-sans">
                Submit your application for review by our exchange coordination committee.
              </p>
            </div>

            {niceSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#4aabb8]/10 text-[#2b7a85] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-[#222222]">
                  Application Submitted Successfully!
                </h3>
                <p className="text-sm text-[#222222]/70 max-w-lg mx-auto">
                  Thank you for applying to the CELAVIE Nice Exchange Program. Our exchange coordination committee will review your application and contact you via email within 48 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNiceSubmitted(false);
                    setNiceForm(createEmptyNiceExchangeForm());
                    setNiceErrors({});
                  }}
                  className="rounded-full"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleNiceSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="First Name"
                    required
                    value={niceForm.firstName}
                    onChange={(e) => setNiceForm({ ...niceForm, firstName: e.target.value })}
                    error={niceErrors.firstName}
                  />
                  <Input
                    label="Last Name"
                    required
                    value={niceForm.lastName}
                    onChange={(e) => setNiceForm({ ...niceForm, lastName: e.target.value })}
                    error={niceErrors.lastName}
                  />
                  <Input
                    label="Age"
                    type="number"
                        min={11}
                        max={99}
                    required
                    value={niceForm.age}
                    onChange={(e) => setNiceForm({ ...niceForm, age: e.target.value })}
                    error={niceErrors.age}
                    helperText="Must be 14 or older"
                  />
                  <Input
                    label="School / University / Organization"
                    required
                    value={niceForm.school}
                    onChange={(e) => setNiceForm({ ...niceForm, school: e.target.value })}
                    error={niceErrors.school}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={niceForm.email}
                    onChange={(e) => setNiceForm({ ...niceForm, email: e.target.value })}
                    error={niceErrors.email}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    value={niceForm.phone}
                    onChange={(e) => setNiceForm({ ...niceForm, phone: e.target.value })}
                    error={niceErrors.phone}
                  />
                  <Input
                    label="Country of Residence"
                    required
                    value={niceForm.country}
                    onChange={(e) => setNiceForm({ ...niceForm, country: e.target.value })}
                    error={niceErrors.country}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  <Select
                    label="Current French/English Level"
                    value={niceForm.currentLanguageLevel}
                    onChange={(e) => setNiceForm({ ...niceForm, currentLanguageLevel: e.target.value })}
                    error={niceErrors.currentLanguageLevel}
                    required
                    options={[
                      { value: 'A1', label: 'A1 Beginner' },
                      { value: 'A2', label: 'A2 Elementary' },
                      { value: 'B1', label: 'B1 Intermediate' },
                      { value: 'B2', label: 'B2 Upper Intermediate' },
                      { value: 'C1', label: 'C1 Advanced' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Parent Name"
                    required
                    value={niceForm.parentName}
                    onChange={(e) => setNiceForm({ ...niceForm, parentName: e.target.value })}
                    error={niceErrors.parentName}
                  />
                  <Input
                    label="Parent Phone Number"
                    required
                    value={niceForm.parentPhone}
                    onChange={(e) => setNiceForm({ ...niceForm, parentPhone: e.target.value })}
                    error={niceErrors.parentPhone}
                  />
                </div>

                <Textarea
                  label="Motivation Essay (300-500 words, Optional)"
                  rows={5}
                  value={niceForm.motivationEssay}
                  onChange={(e) => setNiceForm({ ...niceForm, motivationEssay: e.target.value })}
                  error={niceErrors.motivationEssay}
                  helperText="Describe why you want to participate in the Nice Exchange program."
                />

                {niceErrors.form && <p className="text-sm text-red-600 font-medium">{niceErrors.form}</p>}

                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={niceForm.acceptedTerms}
                      onChange={(e) => setNiceForm({ ...niceForm, acceptedTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#4aabb8] focus:ring-[#4aabb8]"
                    />
                    <span className="text-xs text-[#222222]/80">
                      I agree to the Exchange Terms of Service & Code of Conduct.
                    </span>
                  </label>
                  {niceErrors.acceptedTerms && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{niceErrors.acceptedTerms}</p>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full py-3.5 font-semibold cursor-pointer"
                  disabled={niceLoading}
                >
                  {niceLoading ? 'Submitting Application...' : 'Submit Nice Application'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US BENEFITS SECTION (#why) */}
      <section id="why" className="order-6 py-20 sm:py-28 bg-[#f3f6f7]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">
              WHY CELAVIE
            </span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Why Study With Us
            </h2>
            <p className="mt-3 text-base text-[#222222]/70 font-sans">
              We provide immersive learning methodologies, certified native instructors, and guaranteed career advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">International Standards</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">
                Curriculum mapped to CEFR European frameworks and international social media standards.
              </p>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">Certified Native Team</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">
                Learn directly from experienced native linguists and active digital marketing managers.
              </p>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">Practical Focus</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">
                Over 80% practical speaking exercises, real brand campaigns, and interactive speaking clubs.
              </p>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">Nice Exchange Program</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">
                Direct summer immersion programs on the French Riviera with host family accommodations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="order-7 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85] flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-[#4aabb8] text-[#4aabb8]" />
              <Star className="w-3.5 h-3.5 fill-[#4aabb8] text-[#4aabb8]" />
              <Star className="w-3.5 h-3.5 fill-[#4aabb8] text-[#4aabb8]" />
              <Star className="w-3.5 h-3.5 fill-[#4aabb8] text-[#4aabb8]" />
              <Star className="w-3.5 h-3.5 fill-[#4aabb8] text-[#4aabb8]" />
            </span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Stories from Our Graduates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. COURSE REGISTRATION SECTION (#register) */}
      <section id="register" className="order-8 py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">
              COURSE ENROLLMENT
            </span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Register For a Course
            </h2>
            <p className="mt-2 text-sm text-[#222222]/70 font-sans">
              Select your course and complete registration in 3 simple steps.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-[2rem] border border-[#4aabb8]/20 bg-white shadow-card">
            {!regSubmitted && (
              <RegistrationStepper
                steps={['Select Program', 'Student Info', 'Review & Submit']}
                currentStep={regStep}
              />
            )}

            {regSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#4aabb8]/10 text-[#2b7a85] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-[#222222]">
                  Registration Completed!
                </h3>
                <p className="text-sm text-[#222222]/70 max-w-md mx-auto">
                  Your registration has been received. We will follow up with course and schedule details at <strong>{regForm.email}</strong>.
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setRegSubmitted(false);
                    setRegForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    acceptedTerms: false,
  });
                    setRegCategory('');
                    setRegCourseId('');
                    setRegErrors({});
                    setRegLoading(false);
                    setRegStep(1);
                  }}
                  className="rounded-full px-8 py-3"
                >
                  Register Another Student
                </Button>
              </div>
            ) : (
              <div>
                {regStep === 1 && (
                  <div className="space-y-6 pt-6">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">
                      Step 1: Choose Your Course Category
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (regCategory !== 'language') setRegCourseId('');
                          setRegCategory('language');
                        }}
                        className={`p-6 rounded-[1.25rem] border text-left transition-all cursor-pointer ${
                          regCategory === 'language'
                            ? 'border-[#4aabb8] bg-[#4aabb8]/5 ring-2 ring-[#4aabb8]'
                            : 'border-[#4aabb8]/15 hover:border-[#4aabb8]/40'
                        }`}
                      >
                        <Globe className="w-6 h-6 text-[#4aabb8] mb-3" />
                        <h4 className="font-heading font-bold text-[#222222] text-lg">Foreign Languages</h4>
                        <span className="text-xs text-[#2b7a85] font-semibold mt-1 block">10+ Available →</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (regCategory !== 'smm') setRegCourseId('');
                          setRegCategory('smm');
                        }}
                        className={`p-6 rounded-[1.25rem] border text-left transition-all cursor-pointer ${
                          regCategory === 'smm'
                            ? 'border-[#4aabb8] bg-[#4aabb8]/5 ring-2 ring-[#4aabb8]'
                            : 'border-[#4aabb8]/15 hover:border-[#4aabb8]/40'
                        }`}
                      >
                        <TrendingUp className="w-6 h-6 text-[#4aabb8] mb-3" />
                        <h4 className="font-heading font-bold text-[#222222] text-lg">SMM Academy</h4>
                        <span className="text-xs text-[#2b7a85] font-semibold mt-1 block">3 Professional Tiers →</span>
                      </button>
                    </div>

                    <Select
                      label="Select Specific Course Batch"
                      value={regCourseId}
                      error={regErrors.course}
                      onChange={(e) => setRegCourseId(e.target.value)}
                      options={allCourses.filter((c) => c.category === regCategory).map((c) => ({
                        value: c.id,
                        label: `${c.title} (${c.level})`,
                      }))}
                    />

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full rounded-full py-3.5 font-semibold cursor-pointer"
                      onClick={() => { if (selectedRegCourse) { setRegErrors({}); setRegStep(2); } else setRegErrors({ course: 'Please select a course to proceed' }); }}
                    >
                      Continue to Personal Info
                    </Button>
                  </div>
                )}

                {regStep === 2 && (
                  <div className="space-y-6 pt-6">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">
                      Step 2: Student Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        required
                        value={regForm.firstName}
                        onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                        error={regErrors.firstName}
                      />
                      <Input
                        label="Last Name"
                        required
                        value={regForm.lastName}
                        onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                        error={regErrors.lastName}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        error={regErrors.email}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        error={regErrors.phone}
                      />
                      <Input
                        label="Age"
                        type="number"
                        min={11}
                        max={99}
                        required
                        value={regForm.age}
                        onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                        error={regErrors.age}
                      />
                    </div>

                    <div className="flex justify-between items-center space-x-4 pt-4 border-t border-[#4aabb8]/15">
                      <Button variant="outline" onClick={() => setRegStep(1)} className="rounded-full">
                        Back
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-3.5 font-semibold cursor-pointer"
                        onClick={handleRegNextStep2}
                      >
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                )}

                {regStep === 3 && (
                  <form onSubmit={handleRegSubmit} className="space-y-6 pt-6">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">
                      Step 3: Review & Submit Registration
                    </h3>

                    {regErrors.form && (
                      <p role="alert" className="text-sm text-red-600">{regErrors.form}</p>
                    )}

                    <div className="p-5 bg-[#f3f6f7] rounded-[1rem] border border-[#4aabb8]/20">
                      <span className="text-[11px] text-[#4aabb8] uppercase font-bold tracking-wider block">
                        Selected Program
                      </span>
                      <span className="font-heading text-xl font-bold text-[#222222]">{selectedRegCourse?.title}</span>
                    </div>

                    <div className="p-5 bg-[#f3f6f7] rounded-[1rem] border border-[#4aabb8]/20 space-y-2">
                      <span className="text-[11px] text-[#4aabb8] uppercase font-bold tracking-wider block">
                        Student Information
                      </span>
                      <p className="text-sm text-[#222222]"><strong>Name:</strong> {regForm.firstName} {regForm.lastName}</p>
                      <p className="text-sm text-[#222222]"><strong>Email:</strong> {regForm.email}</p>
                      <p className="text-sm text-[#222222]"><strong>Phone:</strong> {regForm.phone}</p>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={regForm.acceptedTerms}
                          onChange={(e) => setRegForm({ ...regForm, acceptedTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 text-[#4aabb8] focus:ring-[#4aabb8] rounded"
                        />
                        <span className="text-xs text-[#222222]/80">
                          I agree to the enrollment terms and conditions.
                        </span>
                      </label>
                      {regErrors.acceptedTerms && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{regErrors.acceptedTerms}</p>
                      )}
                    </div>

                    <div className="flex justify-between space-x-4 pt-4 border-t border-[#4aabb8]/15">
                      <Button type="button" variant="outline" onClick={() => setRegStep(2)} className="rounded-full">
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-3.5 font-semibold cursor-pointer"
                        disabled={regLoading}
                      >
                        {regLoading ? 'Submitting Registration...' : 'Submit Registration'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section id="faq" className="order-9 py-20 sm:py-28 bg-[#f3f6f7]/40">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Questions & Answers
            </h2>
          </div>

          <FAQAccordion items={generalFaqs} />
        </div>
      </section>
    </div>
  );
};

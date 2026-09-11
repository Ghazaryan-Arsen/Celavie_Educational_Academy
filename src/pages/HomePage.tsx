import { BrandLogo } from '../components/ui/BrandLogo';
import { useT } from '../i18n/useLanguage';
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
  const t = useT();
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
        'Your registration could not be submitted. Please check your connection and try again.';
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
              <Badge variant="primary" className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">{t("CELAVIE EDUCATIONAL ACADEMY » @CELAVIE_ACADEMY")}</Badge>

              <h1
                className="font-heading font-medium text-[#222222] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
              >{t("International Standard Education with CELAVIE")}</h1>

              <p className="text-base sm:text-lg text-[#222222]/70 leading-relaxed max-w-2xl font-sans">{t("Master 10+ foreign languages and high-converting SMM marketing strategies. Join our exclusive exchange programs in Nice, France and elevate your career.")}</p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full px-8 py-3.5 shadow-md hover:shadow-lg font-semibold cursor-pointer"
                  onClick={() => scrollToSection('register')}
                >{t("Start Learning Now")}</Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-3.5 font-semibold cursor-pointer"
                  onClick={() => scrollToSection('courses')}
                >{t("Explore Programs")}</Button>
              </div>

              {/* Key Metrics Grid */}
              <div className="pt-8 border-t border-[#4aabb8]/15 grid grid-cols-3 gap-6">
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#4aabb8] block">{t("10+")}</span>
                  <span className="text-xs text-[#222222]/60 uppercase font-semibold tracking-wider">{t("Foreign Languages")}</span>
                </div>
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#222222] block">{t("100%")}</span>
                  <span className="text-xs text-[#222222]/60 uppercase font-semibold tracking-wider">{t("Native Tutors")}</span>
                </div>
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#4aabb8] block">{t("Nice, FR")}</span>
                  <span className="text-xs text-[#222222]/60 uppercase font-semibold tracking-wider">{t("Summer Exchange")}</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden border border-[#4aabb8]/20 shadow-card group">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                  alt={t("CELAVIE Educational Academy Students")}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <BrandLogo />
                    <div>
                      <h4 className="font-heading font-bold text-[#222222] text-sm">{t("CELAVIE Language & SMM Center")}</h4>
                      <p className="text-xs text-[#222222]/70">{t("Enrollments open for upcoming trimester")}</p>
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
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• 10+ Foreign Languages")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• SMM Professional Academy")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• Summer Exchange in Nice, France")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• Certified Tutors & Native Speakers")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• Interactive Speaking Clubs")}</span>
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12" aria-hidden="true">
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• 10+ Foreign Languages")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• SMM Professional Academy")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• Summer Exchange in Nice, France")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• Certified Tutors & Native Speakers")}</span>
            <span className="font-heading text-lg sm:text-xl text-[#222222]/60 whitespace-nowrap">{t("• Interactive Speaking Clubs")}</span>
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION (#courses) */}
      <section id="courses" className="order-5 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">{t("OUR COURSES")}</span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >{t("Choose Your Academic Path")}</h2>
            <p className="mt-3 text-base text-[#222222]/70 font-sans">{t("From beginner conversational foreign languages to advanced digital social media strategies, choose a program tailored to your personal goals.")}</p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-8">
              <button
                onClick={() => setCourseFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  courseFilter === 'all'
                    ? 'bg-[#4aabb8] text-white shadow-sm'
                    : 'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10'
                }`}
              >{t("All Courses (")}{t(allCourses.length)}{t(")")}</button>
              <button
                onClick={() => setCourseFilter('language')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  courseFilter === 'language'
                    ? 'bg-[#4aabb8] text-white shadow-sm'
                    : 'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10'
                }`}
              >{t("Foreign Languages (")}{t(LANGUAGE_COURSES.length)}{t(")")}</button>
              <button
                onClick={() => setCourseFilter('smm')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  courseFilter === 'smm'
                    ? 'bg-[#4aabb8] text-white shadow-sm'
                    : 'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10'
                }`}
              >{t("SMM Academy (")}{t(SMM_COURSES.length)}{t(")")}</button>
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
            <span className="inline-block relative w-full min-h-[440px] sm:min-h-0 aspect-[16/9] sm:aspect-[21/9] transition-transform duration-700 group-hover:scale-105">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1400"
                alt={t("Nice Promenade des Anglais")}
                className="w-full h-full object-cover"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-5 sm:p-12">
              <div className="max-w-2xl text-white space-y-4">
                <Badge variant="accent" className="bg-[#4aabb8] text-white border-none px-3 py-1 font-bold">{t("Exclusive Program 🇫🇷")}</Badge>
                <h2 className="font-heading text-3xl sm:text-5xl font-medium">{t("Discover Nice, France")}</h2>
                <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed">{t("Immerse yourself in authentic French culture along the Côte d'Azur. Practice French daily with welcoming host families while exploring Nice.")}</p>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection('nice-register')}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-white text-[#222222] font-semibold text-sm hover:bg-[#4aabb8] hover:text-white transition-all shadow-md cursor-pointer"
                  >{t("Apply for Nice Program")}<ArrowRight className="w-4 h-4 ml-2" />
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
          <div className="relative overflow-hidden rounded-[2rem] border border-[#4aabb8]/20 bg-white p-5 sm:p-12 shadow-card">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">{t("NICE EXCHANGE PROGRAM")}</span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-medium text-[#222222]">{t("Apply for the French Riviera Cultural Immersion")}</h2>
              <p className="mt-2 text-sm text-[#222222]/70 font-sans">{t("Submit your application for review by our exchange coordination committee.")}</p>
            </div>

            {niceSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#4aabb8]/10 text-[#2b7a85] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-[#222222]">{t("Application Submitted Successfully!")}</h3>
                <p className="text-sm text-[#222222]/70 max-w-lg mx-auto">{t("Thank you for applying to the CELAVIE Nice Exchange Program. Our exchange coordination committee will review your application and contact you via email within 48 hours.")}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNiceSubmitted(false);
                    setNiceForm(createEmptyNiceExchangeForm());
                    setNiceErrors({});
                  }}
                  className="rounded-full"
                >{t("Submit Another Application")}</Button>
              </div>
            ) : (
              <form onSubmit={handleNiceSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label={t("First Name")}
                    required
                    value={niceForm.firstName}
                    onChange={(e) => setNiceForm({ ...niceForm, firstName: e.target.value })}
                    error={t(niceErrors.firstName)}
                  />
                  <Input
                    label={t("Last Name")}
                    required
                    value={niceForm.lastName}
                    onChange={(e) => setNiceForm({ ...niceForm, lastName: e.target.value })}
                    error={t(niceErrors.lastName)}
                  />
                  <Input
                    label={t("Age")}
                    type="number"
                        min={11}
                        max={99}
                    required
                    value={niceForm.age}
                    onChange={(e) => setNiceForm({ ...niceForm, age: e.target.value })}
                    error={t(niceErrors.age)}
                    helperText={t("Age: 11–99")}
                  />
                  <Input
                    label={t("School / University / Organization")}
                    required
                    value={niceForm.school}
                    onChange={(e) => setNiceForm({ ...niceForm, school: e.target.value })}
                    error={t(niceErrors.school)}
                  />
                  <Input
                    label={t("Email Address")}
                    type="email"
                    required
                    value={niceForm.email}
                    onChange={(e) => setNiceForm({ ...niceForm, email: e.target.value })}
                    error={t(niceErrors.email)}
                  />
                  <Input
                    label={t("Phone Number")}
                    type="tel"
                    required
                    value={niceForm.phone}
                    onChange={(e) => setNiceForm({ ...niceForm, phone: e.target.value })}
                    error={t(niceErrors.phone)}
                  />
                  <Input
                    label={t("Country of Residence")}
                    required
                    value={niceForm.country}
                    onChange={(e) => setNiceForm({ ...niceForm, country: e.target.value })}
                    error={t(niceErrors.country)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  <Select
                    label={t("Current French/English Level")}
                    value={niceForm.currentLanguageLevel}
                    onChange={(e) => setNiceForm({ ...niceForm, currentLanguageLevel: e.target.value })}
                    error={t(niceErrors.currentLanguageLevel)}
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
                    label={t("Parent Name")}
                    required
                    value={niceForm.parentName}
                    onChange={(e) => setNiceForm({ ...niceForm, parentName: e.target.value })}
                    error={t(niceErrors.parentName)}
                  />
                  <Input
                    label={t("Parent Phone Number")}
                    required
                    value={niceForm.parentPhone}
                    onChange={(e) => setNiceForm({ ...niceForm, parentPhone: e.target.value })}
                    error={t(niceErrors.parentPhone)}
                  />
                </div>

                <Textarea
                  label={t("Motivation Essay (300-500 words, Optional)")}
                  rows={5}
                  value={niceForm.motivationEssay}
                  onChange={(e) => setNiceForm({ ...niceForm, motivationEssay: e.target.value })}
                  error={t(niceErrors.motivationEssay)}
                  helperText={t("Describe why you want to participate in the Nice Exchange program.")}
                />

                {niceErrors.form && <p className="text-sm text-red-600 font-medium">{t(niceErrors.form)}</p>}

                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={niceForm.acceptedTerms}
                      onChange={(e) => setNiceForm({ ...niceForm, acceptedTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#4aabb8] focus:ring-[#4aabb8]"
                    />
                    <span className="text-xs text-[#222222]/80">{t("I agree to the Exchange Terms of Service & Code of Conduct.")}</span>
                  </label>
                  {niceErrors.acceptedTerms && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{t(niceErrors.acceptedTerms)}</p>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full py-3.5 font-semibold cursor-pointer"
                  disabled={niceLoading}
                >
                  {t(niceLoading ? 'Submitting Application...' : 'Submit Nice Application')}
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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">{t("WHY CELAVIE")}</span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >{t("Why Study With Us")}</h2>
            <p className="mt-3 text-base text-[#222222]/70 font-sans">{t("We provide immersive learning methodologies, certified native instructors, and guaranteed career advancement.")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">{t("International Standards")}</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">{t("Curriculum mapped to CEFR European frameworks and international social media standards.")}</p>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">{t("Certified Native Team")}</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">{t("Learn directly from experienced native linguists and active digital marketing managers.")}</p>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">{t("Practical Focus")}</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">{t("Over 80% practical speaking exercises, real brand campaigns, and interactive speaking clubs.")}</p>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-white border border-[#4aabb8]/15 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4aabb8]/10 text-[#4aabb8] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-3">{t("Nice Exchange Program")}</h3>
              <p className="text-sm text-[#222222]/70 leading-relaxed font-sans">{t("Direct summer immersion programs on the French Riviera with host family accommodations.")}</p>
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
            >{t("Stories from Our Graduates")}</h2>
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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">{t("COURSE ENROLLMENT")}</span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >{t("Register For a Course")}</h2>
            <p className="mt-2 text-sm text-[#222222]/70 font-sans">{t("Select your course and complete registration in 3 simple steps.")}</p>
          </div>

          <div className="p-5 sm:p-12 rounded-[2rem] border border-[#4aabb8]/20 bg-white shadow-card">
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
                <h3 className="font-heading text-3xl font-bold text-[#222222]">{t("Registration Completed!")}</h3>
                <p className="text-sm text-[#222222]/70 max-w-md mx-auto">{t("Your registration has been received. We will follow up with course and schedule details at")}<strong>{regForm.email}</strong>{t(".")}</p>
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
                >{t("Register Another Student")}</Button>
              </div>
            ) : (
              <div>
                {regStep === 1 && (
                  <div className="space-y-6 pt-6">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">{t("Step 1: Choose Your Course Category")}</h3>

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
                        <h4 className="font-heading font-bold text-[#222222] text-lg">{t("Foreign Languages")}</h4>
                        <span className="text-xs text-[#2b7a85] font-semibold mt-1 block">{t("10+ Available →")}</span>
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
                        <h4 className="font-heading font-bold text-[#222222] text-lg">{t("SMM Academy")}</h4>
                        <span className="text-xs text-[#2b7a85] font-semibold mt-1 block">{t("3 Professional Tiers →")}</span>
                      </button>
                    </div>

                    <Select
                      label={t("Select Specific Course Batch")}
                      value={regCourseId}
                      error={t(regErrors.course)}
                      onChange={(e) => setRegCourseId(e.target.value)}
                      options={allCourses.filter((c) => c.category === regCategory).map((c) => ({
                        value: c.id,
                        label: `${t(c.title)} (${t(c.level)})`,
                      }))}
                    />

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full rounded-full py-3.5 font-semibold cursor-pointer"
                      onClick={() => { if (selectedRegCourse) { setRegErrors({}); setRegStep(2); } else setRegErrors({ course: 'Please select a course to proceed' }); }}
                    >{t("Continue to Personal Info")}</Button>
                  </div>
                )}

                {regStep === 2 && (
                  <div className="space-y-6 pt-6">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">{t("Step 2: Student Details")}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={t("First Name")}
                        required
                        value={regForm.firstName}
                        onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                        error={t(regErrors.firstName)}
                      />
                      <Input
                        label={t("Last Name")}
                        required
                        value={regForm.lastName}
                        onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                        error={t(regErrors.lastName)}
                      />
                      <Input
                        label={t("Email Address")}
                        type="email"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        error={t(regErrors.email)}
                      />
                      <Input
                        label={t("Phone Number")}
                        type="tel"
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        error={t(regErrors.phone)}
                      />
                      <Input
                        label={t("Age")}
                        type="number"
                        min={11}
                        max={99}
                        required
                        value={regForm.age}
                        onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                        error={t(regErrors.age)}
                      />
                    </div>

                    <div className="flex justify-between items-center space-x-4 pt-4 border-t border-[#4aabb8]/15">
                      <Button variant="outline" onClick={() => setRegStep(1)} className="rounded-full">{t("Back")}</Button>
                      <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-3.5 font-semibold cursor-pointer"
                        onClick={handleRegNextStep2}
                      >{t("Continue to Review")}</Button>
                    </div>
                  </div>
                )}

                {regStep === 3 && (
                  <form onSubmit={handleRegSubmit} className="space-y-6 pt-6">
                    <h3 className="font-heading text-xl font-bold text-[#222222]">{t("Step 3: Review & Submit Registration")}</h3>

                    {regErrors.form && (
                      <p role="alert" className="text-sm text-red-600">{t(regErrors.form)}</p>
                    )}

                    <div className="p-5 bg-[#f3f6f7] rounded-[1rem] border border-[#4aabb8]/20">
                      <span className="text-[11px] text-[#4aabb8] uppercase font-bold tracking-wider block">{t("Selected Program")}</span>
                      <span className="font-heading text-xl font-bold text-[#222222]">{t(selectedRegCourse?.title)}</span>
                    </div>

                    <div className="p-5 bg-[#f3f6f7] rounded-[1rem] border border-[#4aabb8]/20 space-y-2">
                      <span className="text-[11px] text-[#4aabb8] uppercase font-bold tracking-wider block">{t("Student Information")}</span>
                      <p className="text-sm text-[#222222]"><strong>{t("Name:")}</strong> {regForm.firstName} {regForm.lastName}</p>
                      <p className="text-sm text-[#222222]"><strong>{t("Email:")}</strong> {regForm.email}</p>
                      <p className="text-sm text-[#222222]"><strong>{t("Phone:")}</strong> {regForm.phone}</p>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={regForm.acceptedTerms}
                          onChange={(e) => setRegForm({ ...regForm, acceptedTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 text-[#4aabb8] focus:ring-[#4aabb8] rounded"
                        />
                        <span className="text-xs text-[#222222]/80">{t("I agree to the enrollment terms and conditions.")}</span>
                      </label>
                      {regErrors.acceptedTerms && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{t(regErrors.acceptedTerms)}</p>
                      )}
                    </div>

                    <div className="flex justify-between space-x-4 pt-4 border-t border-[#4aabb8]/15">
                      <Button type="button" variant="outline" onClick={() => setRegStep(2)} className="rounded-full">{t("Back")}</Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-3.5 font-semibold cursor-pointer"
                        disabled={regLoading}
                      >
                        {t(regLoading ? 'Submitting Registration...' : 'Submit Registration')}
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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2b7a85]">{t("FREQUENTLY ASKED QUESTIONS")}</span>
            <h2
              className="mt-3 font-heading font-medium text-[#222222] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >{t("Questions & Answers")}</h2>
          </div>

          <FAQAccordion items={generalFaqs} />
        </div>
      </section>
    </div>
  );
};

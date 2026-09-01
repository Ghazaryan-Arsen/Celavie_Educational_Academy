import React, { useState } from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Button } from '../components/ui/Button';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CourseCard } from '../components/domain/CourseCard';
import { TestimonialCard } from '../components/domain/TestimonialCard';
import { ImageGallery } from '../components/ui/ImageGallery';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RegistrationStepper } from '../components/ui/RegistrationStepper';
import { NiceExchangeSection } from '../components/domain/NiceExchangeSection';
import { LANGUAGE_COURSES, SMM_COURSES, TESTIMONIALS, FAQS, GALLERY_IMAGES } from '../data/mockData';
import { siteConfig } from '../config/site';
import { Globe, TrendingUp, CheckCircle2, CreditCard, Landmark, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [courseTab, setCourseTab] = useState<'languages' | 'smm'>('languages');

  // Inline Course Registration State
  const allCourses = [...LANGUAGE_COURSES, ...SMM_COURSES];
  const [regStep, setRegStep] = useState<number>(1);
  const [regCourseId, setRegCourseId] = useState<string>(allCourses[0].id);
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    parentGuardianName: '',
    paymentMethod: 'card' as 'card' | 'bank_transfer' | 'payment_plan',
    acceptedTerms: false,
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const selectedRegCourse = allCourses.find((c) => c.id === regCourseId) || allCourses[0];

  const handleRegNextStep2 = () => {
    const errs: Record<string, string> = {};
    if (!regForm.firstName.trim()) errs.firstName = t.errors.firstNameRequired;
    if (!regForm.lastName.trim()) errs.lastName = t.errors.lastNameRequired;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regForm.email.trim() || !emailRegex.test(regForm.email)) {
      errs.email = t.errors.emailInvalid;
    }
    if (!regForm.phone.trim() || regForm.phone.length < 7) {
      errs.phone = t.errors.phoneInvalid;
    }

    const ageNum = parseInt(regForm.age, 10);
    if (!regForm.age || isNaN(ageNum) || ageNum < 11 || ageNum > 99) {
      errs.age = t.errors.ageMin;
    }
    if (ageNum < 18 && !regForm.parentGuardianName.trim()) {
      errs.parentGuardianName = t.errors.parentNameRequired;
    }

    setRegErrors(errs);
    if (Object.keys(errs).length === 0) {
      setRegStep(3);
    }
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!regForm.acceptedTerms) {
      errs.acceptedTerms = t.errors.termsRequired;
    }
    if (regForm.paymentMethod === 'card') {
      if (!regForm.cardNumber.trim() || regForm.cardNumber.replaceAll(' ', '').length < 15) {
        errs.cardNumber = t.errors.cardNumberInvalid;
      }
      if (!regForm.cardExpiry.trim()) errs.cardExpiry = t.errors.cardExpiryRequired;
      if (!regForm.cardCvc.trim() || regForm.cardCvc.length < 3) errs.cardCvc = t.errors.cardCvcInvalid;
    }

    setRegErrors(errs);
    if (Object.keys(errs).length === 0) {
      setRegLoading(true);
      setTimeout(() => {
        setRegLoading(false);
        setRegSubmitted(true);
      }, 1000);
    }
  };

  const generalFaqs = FAQS.filter((f) => f.category === 'general' || f.category === 'registration' || f.category === 'nice-exchange');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-gray-900">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative bg-[#1A1A1A] text-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs uppercase tracking-widest text-[#FFD700] font-bold">
                {t.hero.badge}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight text-white">
                {t.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-sans">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none rounded-full px-8 py-3"
                  onClick={() => scrollToSection('register')}
                >
                  {t.hero.selectCourse}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3"
                  onClick={() => scrollToSection('nice-exchange')}
                >
                  {t.hero.niceExchangeBtn}
                </Button>
              </div>

              {/* Metrics */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
                <div>
                  <span className="text-2xl lg:text-3xl font-bold text-white block">10+</span>
                  <span className="text-xs text-gray-400 uppercase font-medium">{t.hero.metricsLanguages}</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-3xl font-bold text-[#FFD700] block">100%</span>
                  <span className="text-xs text-gray-400 uppercase font-medium">{t.hero.metricsSpeakers}</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-3xl font-bold text-white block">Nice, FR</span>
                  <span className="text-xs text-gray-400 uppercase font-medium">{t.hero.metricsExchange}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[16px] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                  alt="CELAVIE Educational Academy Students"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COURSES SECTION */}
      <SectionWrapper id="courses" bg="white" className="py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
            {t.courses.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[rgb(38,38,38)]">
            {t.courses.title}
          </h2>

          {/* Toggle Tabs */}
          <div className="inline-flex p-1.5 bg-gray-100 rounded-full border border-gray-200 mt-4">
            <button
              onClick={() => setCourseTab('languages')}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition ${
                courseTab === 'languages'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {t.courses.tabLanguages}
            </button>
            <button
              onClick={() => setCourseTab('smm')}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition ${
                courseTab === 'smm'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {t.courses.tabSMM}
            </button>
          </div>
        </div>

        {courseTab === 'languages' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LANGUAGE_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SMM_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* 3. GALLERY SECTION */}
      <SectionWrapper id="gallery" bg="gray" className="py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            {t.gallery.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-black">
            {t.gallery.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {t.gallery.subtitle}
          </p>
        </div>

        <ImageGallery images={GALLERY_IMAGES} columns={3} />
      </SectionWrapper>

      {/* 4. NICE EXCHANGE PROGRAM APPLICATION SECTION */}
      <NiceExchangeSection id="nice-exchange" />

      {/* 5. ABOUT ACADEMY & STUDENT STORIES */}
      <SectionWrapper id="about" bg="gray" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 relative">
            <div className="rounded-[16px] overflow-hidden border-2 border-gray-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="CELAVIE Educational Academy Leadership"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
              {t.about.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base text-gray-700 leading-relaxed font-sans">
              {t.about.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-[8px] border border-gray-200">
                <span className="text-2xl font-bold text-black block">{siteConfig.metrics.studentsEnrolled}</span>
                <span className="text-xs text-gray-500 uppercase">{t.about.graduates}</span>
              </div>
              <div className="p-4 bg-white rounded-[8px] border border-gray-200">
                <span className="text-2xl font-bold text-[#38B6FF] block">{siteConfig.metrics.successRate}</span>
                <span className="text-xs text-gray-500 uppercase">{t.about.successRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {t.about.storiesBadge}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-black">
              {t.about.storiesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 6. REGISTER NOW INLINE STEPPER */}
      <SectionWrapper id="register" bg="white" className="py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
            {t.register.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-black">
            {t.register.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {t.register.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-[16px] border border-gray-200 shadow-xl text-left">
          {!regSubmitted && (
            <RegistrationStepper
              steps={[t.register.step1, t.register.step2, t.register.step3]}
              currentStep={regStep}
            />
          )}

          {regSubmitted ? (
            <div className="py-10 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-black">{t.register.successTitle}</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {t.register.successDesc}
              </p>
              <Button variant="primary" onClick={() => setRegSubmitted(false)}>
                {t.register.registerAnother}
              </Button>
            </div>
          ) : (
            <div>
              {regStep === 1 && (
                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-black">{t.register.step1}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        const langCourse = LANGUAGE_COURSES[0];
                        setRegCourseId(langCourse.id);
                      }}
                      className={`p-6 rounded-[12px] border text-left transition ${
                        LANGUAGE_COURSES.some((c) => c.id === regCourseId)
                          ? 'border-[#38B6FF] bg-blue-50/50 ring-2 ring-[#38B6FF]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Globe className="w-6 h-6 text-[#38B6FF] mb-3" />
                      <h4 className="font-bold text-black text-base">{t.register.directionLanguage}</h4>
                      <span className="text-xs text-[#38B6FF] font-semibold mt-1 block">10+ →</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const smmCourse = SMM_COURSES[0];
                        setRegCourseId(smmCourse.id);
                      }}
                      className={`p-6 rounded-[12px] border text-left transition ${
                        SMM_COURSES.some((c) => c.id === regCourseId)
                          ? 'border-[#38B6FF] bg-blue-50/50 ring-2 ring-[#38B6FF]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <TrendingUp className="w-6 h-6 text-[#38B6FF] mb-3" />
                      <h4 className="font-bold text-black text-base">{t.register.directionSMM}</h4>
                      <span className="text-xs text-[#38B6FF] font-semibold mt-1 block">Pro →</span>
                    </button>
                  </div>

                  <Select
                    label={t.register.selectSpecific}
                    value={regCourseId}
                    onChange={(e) => setRegCourseId(e.target.value)}
                    options={allCourses.map((c) => ({
                      value: c.id,
                      label: `${c.title} — ${c.price}`,
                    }))}
                  />

                  <Button variant="primary" size="lg" className="w-full font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none" onClick={() => setRegStep(2)}>
                    {t.register.continuePersonalInfo}
                  </Button>
                </div>
              )}

              {regStep === 2 && (
                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-black">{t.register.step2}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={t.niceExchange.firstName}
                      required
                      value={regForm.firstName}
                      onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                      error={regErrors.firstName}
                    />
                    <Input
                      label={t.niceExchange.lastName}
                      required
                      value={regForm.lastName}
                      onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                      error={regErrors.lastName}
                    />
                    <Input
                      label={t.niceExchange.email}
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      error={regErrors.email}
                    />
                    <Input
                      label={t.niceExchange.phone}
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      error={regErrors.phone}
                    />
                    <Input
                      label={t.niceExchange.age}
                      type="number"
                      required
                      value={regForm.age}
                      onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                      error={regErrors.age}
                    />
                    {parseInt(regForm.age, 10) < 18 && (
                      <Input
                        label={t.niceExchange.parentName}
                        required
                        value={regForm.parentGuardianName}
                        onChange={(e) => setRegForm({ ...regForm, parentGuardianName: e.target.value })}
                        error={regErrors.parentGuardianName}
                      />
                    )}
                  </div>

                  <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                    <Button variant="outline" onClick={() => setRegStep(1)}>
                      {t.register.back}
                    </Button>
                    <Button variant="primary" size="lg" className="font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none" onClick={handleRegNextStep2}>
                      {t.register.continuePayment}
                    </Button>
                  </div>
                </div>
              )}

              {regStep === 3 && (
                <form onSubmit={handleRegSubmit} className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-black">{t.register.step3}</h3>

                  <div className="p-4 bg-gray-50 rounded-[8px] border border-gray-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold block">Selected Program</span>
                      <span className="text-base font-bold text-black">{selectedRegCourse.title}</span>
                    </div>
                    <span className="text-xl font-bold text-black">{selectedRegCourse.price}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, paymentMethod: 'card' })}
                      className={`p-3 rounded-[6px] border text-left flex items-center space-x-2 transition ${
                        regForm.paymentMethod === 'card'
                          ? 'border-black bg-black/5 font-bold'
                          : 'border-gray-200'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-black" />
                      <span className="text-xs">{t.register.paymentCard}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, paymentMethod: 'bank_transfer' })}
                      className={`p-3 rounded-[6px] border text-left flex items-center space-x-2 transition ${
                        regForm.paymentMethod === 'bank_transfer'
                          ? 'border-black bg-black/5 font-bold'
                          : 'border-gray-200'
                      }`}
                    >
                      <Landmark className="w-4 h-4 text-black" />
                      <span className="text-xs">{t.register.paymentBank}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, paymentMethod: 'payment_plan' })}
                      className={`p-3 rounded-[6px] border text-left flex items-center space-x-2 transition ${
                        regForm.paymentMethod === 'payment_plan'
                          ? 'border-black bg-black/5 font-bold'
                          : 'border-gray-200'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4 text-black" />
                      <span className="text-xs">{t.register.paymentPlan}</span>
                    </button>
                  </div>

                  {regForm.paymentMethod === 'card' && (
                    <div className="p-4 rounded-[6px] border border-gray-200 bg-gray-50 space-y-4">
                      <Input
                        label={t.register.cardNumber}
                        placeholder="4000 0000 0000 0000"
                        value={regForm.cardNumber}
                        onChange={(e) => setRegForm({ ...regForm, cardNumber: e.target.value })}
                        error={regErrors.cardNumber}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label={t.register.cardExpiry}
                          placeholder="MM/YY"
                          value={regForm.cardExpiry}
                          onChange={(e) => setRegForm({ ...regForm, cardExpiry: e.target.value })}
                          error={regErrors.cardExpiry}
                        />
                        <Input
                          label={t.register.cardCvc}
                          placeholder="123"
                          type="password"
                          maxLength={4}
                          value={regForm.cardCvc}
                          onChange={(e) => setRegForm({ ...regForm, cardCvc: e.target.value })}
                          error={regErrors.cardCvc}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={regForm.acceptedTerms}
                        onChange={(e) => setRegForm({ ...regForm, acceptedTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 text-black focus:ring-black rounded"
                      />
                      <span className="text-xs text-gray-700">
                        {t.register.acceptTerms}
                      </span>
                    </label>
                    {regErrors.acceptedTerms && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{regErrors.acceptedTerms}</p>
                    )}
                  </div>

                  <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                    <Button type="button" variant="outline" onClick={() => setRegStep(2)}>
                      {t.register.back}
                    </Button>
                    <Button type="submit" variant="accent" size="lg" className="font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none" disabled={regLoading}>
                      {regLoading ? t.register.processing : t.register.completeRegistration}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* 7. FAQ SECTION */}
      <SectionWrapper id="faq" bg="gray" className="py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            {t.faq.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-black">
            {t.faq.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={generalFaqs} />
        </div>
      </SectionWrapper>
    </div>
  );
};

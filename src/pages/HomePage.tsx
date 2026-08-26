import React, { useState } from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CourseCard } from '../components/domain/CourseCard';
import { TestimonialCard } from '../components/domain/TestimonialCard';
import { ImageGallery } from '../components/ui/ImageGallery';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { RegistrationStepper } from '../components/ui/RegistrationStepper';
import { LANGUAGE_COURSES, SMM_COURSES, TESTIMONIALS, FAQS, GALLERY_IMAGES } from '../data/mockData';
import { siteConfig } from '../config/site';
import { Globe, TrendingUp, Sparkles, CheckCircle2, Award, Home, Calendar, HeartHandshake, CreditCard, Landmark, PhoneCall } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [courseTab, setCourseTab] = useState<'languages' | 'smm'>('languages');

  // Nice Exchange Embedded Application state
  const [niceForm, setNiceForm] = useState({
    firstName: '',
    lastName: '',
    parentGuardianName: '',
    age: '',
    school: '',
    email: '',
    phone: '',
    country: '',
    frenchLevel: 'A1',
    preferredDate: '',
    duration: '2_weeks',
    accommodation: 'host_family',
    essay: '',
    dietaryRestrictions: '',
    emergencyContact: '',
    acceptedTerms: false,
  });
  const [niceErrors, setNiceErrors] = useState<Record<string, string>>({});
  const [niceSubmitted, setNiceSubmitted] = useState(false);
  const [niceLoading, setNiceLoading] = useState(false);

  const handleNiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!niceForm.firstName.trim()) errs.firstName = 'First name is required';
    if (!niceForm.lastName.trim()) errs.lastName = 'Last name is required';

    const ageNum = parseInt(niceForm.age, 10);
    if (!niceForm.age || isNaN(ageNum) || ageNum < 14 || ageNum > 99) {
      errs.age = 'Age must be between 14 and 99';
    }
    if (ageNum < 18 && !niceForm.parentGuardianName.trim()) {
      errs.parentGuardianName = 'Parent or guardian full name is required for applicants under 18';
    }
    if (!niceForm.school.trim()) errs.school = 'School or university name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!niceForm.email.trim() || !emailRegex.test(niceForm.email)) {
      errs.email = 'Valid email address is required';
    }
    if (!niceForm.phone.trim() || niceForm.phone.length < 7) {
      errs.phone = 'Valid phone number is required';
    }
    if (!niceForm.country.trim()) errs.country = 'Country of residence is required';

    if (!niceForm.preferredDate) {
      errs.preferredDate = 'Preferred start date is required';
    } else {
      const selected = new Date(niceForm.preferredDate);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 14);
      if (selected < minDate) {
        errs.preferredDate = 'Start date must be at least 2 weeks in the future';
      }
    }

    const wordCount = niceForm.essay.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 300 || wordCount > 500) {
      errs.essay = `Essay must be between 300 and 500 words (Current word count: ${wordCount})`;
    }

    if (!niceForm.emergencyContact.trim()) {
      errs.emergencyContact = 'Emergency contact details are required';
    }
    if (!niceForm.acceptedTerms) {
      errs.acceptedTerms = 'You must accept the terms and conditions';
    }

    setNiceErrors(errs);
    if (Object.keys(errs).length === 0) {
      setNiceLoading(true);
      setTimeout(() => {
        setNiceLoading(false);
        setNiceSubmitted(true);
      }, 1000);
    }
  };

  // Inline Registration State
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
    if (!regForm.firstName.trim()) errs.firstName = 'First name is required';
    if (!regForm.lastName.trim()) errs.lastName = 'Last name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regForm.email.trim() || !emailRegex.test(regForm.email)) {
      errs.email = 'Valid email is required';
    }
    if (!regForm.phone.trim() || regForm.phone.length < 7) {
      errs.phone = 'Valid phone number is required';
    }

    const ageNum = parseInt(regForm.age, 10);
    if (!regForm.age || isNaN(ageNum) || ageNum < 12 || ageNum > 99) {
      errs.age = 'Age must be between 12 and 99';
    }
    if (ageNum < 18 && !regForm.parentGuardianName.trim()) {
      errs.parentGuardianName = 'Parent/guardian name is required for under-18 students';
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
      errs.acceptedTerms = 'You must accept the enrollment terms and conditions';
    }
    if (regForm.paymentMethod === 'card') {
      if (!regForm.cardNumber.trim() || regForm.cardNumber.replaceAll(' ', '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!regForm.cardExpiry.trim()) errs.cardExpiry = 'Expiry date required (MM/YY)';
      if (!regForm.cardCvc.trim() || regForm.cardCvc.length < 3) errs.cardCvc = 'Valid CVC required';
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
                FOREIGN LANGUAGE CENTER & SMM ACADEMY
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight text-white">
                Lilith Babayan Academy
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-sans">
                Master global foreign languages and high-impact social media marketing with expert native tutors. Take part in our exclusive Nice Exchange program in France.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none rounded-full px-8 py-3"
                  onClick={() => scrollToSection('register')}
                >
                  Select Course
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3"
                  onClick={() => scrollToSection('nice-exchange')}
                >
                  Nice Exchange Program
                </Button>
              </div>

              {/* Metrics */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
                <div>
                  <span className="text-2xl lg:text-3xl font-bold text-white block">10+</span>
                  <span className="text-xs text-gray-400 uppercase font-medium">Foreign Languages</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-3xl font-bold text-[#FFD700] block">100%</span>
                  <span className="text-xs text-gray-400 uppercase font-medium">Native Speakers</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-3xl font-bold text-white block">Nice, FR</span>
                  <span className="text-xs text-gray-400 uppercase font-medium">Summer Exchange</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[16px] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                  alt="Lilith Babayan Academy Students"
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
            OUR ACADEMIC DIRECTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[rgb(38,38,38)]">
            Explore Foreign Languages & SMM Tiers
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
              Foreign Languages (10+)
            </button>
            <button
              onClick={() => setCourseTab('smm')}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition ${
                courseTab === 'smm'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              SMM Training (3 Tiers)
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
            ATMOSPHERE & MOMENTS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-black">
            Life at Lilith Babayan Academy
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Take a glance into our vibrant learning spaces, speaking clubs, and exchange trips.
          </p>
        </div>

        <ImageGallery images={GALLERY_IMAGES} columns={3} />
      </SectionWrapper>

      {/* 4. NICE EXCHANGE PROGRAM APPLICATION */}
      <SectionWrapper id="nice-exchange" bg="white" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="accent" className="px-3 py-1 font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-black inline" />
              Summer Cultural Immersion 🇫🇷
            </Badge>

            <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
              The Nice Exchange Program in France
            </h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-sans">
              Combine intensive spoken French education with authentic Mediterranean living. Stay with welcoming French host families or private residences while enjoying guided cultural excursions across the French Riviera.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3 p-3 rounded-[8px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <Home className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">Verified Host Families & Housing</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-[8px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <Calendar className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">2 to 8 Weeks Flexible Durations</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-[8px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <Award className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">20 Hours/Week Intensive French</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-[8px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <HeartHandshake className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">24/7 On-Site Support Staff</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[16px] overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
                alt="Nice Promenade des Anglais"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Embedded Application Form */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[16px] border border-gray-200 shadow-lg text-left">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
              REGISTRATION FOR NICE APPLICANTS
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-black">
              Apply for the Nice Exchange Program
            </h3>
            <p className="text-sm text-gray-600">
              Please fill in your application details. Dates must be at least 2 weeks in advance.
            </p>
          </div>

          {niceSubmitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-black">Application Submitted Successfully!</h4>
              <p className="text-sm text-gray-700 max-w-lg mx-auto">
                Thank you for applying to the Nice Exchange Program. Our exchange coordination committee will review your application essay and contact you via email within 48 hours.
              </p>
              <Button variant="outline" onClick={() => setNiceSubmitted(false)}>
                Submit Another Application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleNiceSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                  value={niceForm.age}
                  onChange={(e) => setNiceForm({ ...niceForm, age: e.target.value })}
                  error={niceErrors.age}
                  helperText="Must be 14 or older"
                />
                {parseInt(niceForm.age, 10) < 18 && (
                  <Input
                    label="Parent / Guardian Full Name"
                    required
                    value={niceForm.parentGuardianName}
                    onChange={(e) => setNiceForm({ ...niceForm, parentGuardianName: e.target.value })}
                    error={niceErrors.parentGuardianName}
                    helperText="Required for under-18 applicants"
                  />
                )}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Current French Level"
                  value={niceForm.frenchLevel}
                  onChange={(e) => setNiceForm({ ...niceForm, frenchLevel: e.target.value })}
                  options={[
                    { value: 'A1', label: 'A1 Beginner' },
                    { value: 'A2', label: 'A2 Elementary' },
                    { value: 'B1', label: 'B1 Intermediate' },
                    { value: 'B2', label: 'B2 Upper Intermediate' },
                    { value: 'C1', label: 'C1 Advanced' },
                  ]}
                />

                <Input
                  label="Preferred Start Date"
                  type="date"
                  required
                  value={niceForm.preferredDate}
                  onChange={(e) => setNiceForm({ ...niceForm, preferredDate: e.target.value })}
                  error={niceErrors.preferredDate}
                  helperText="Must be at least 2 weeks in advance"
                />

                <Select
                  label="Duration"
                  value={niceForm.duration}
                  onChange={(e) => setNiceForm({ ...niceForm, duration: e.target.value })}
                  options={[
                    { value: '2_weeks', label: '2 Weeks Immersion' },
                    { value: '4_weeks', label: '4 Weeks Immersion' },
                    { value: '8_weeks', label: '8 Weeks Full Season' },
                  ]}
                />

                <Select
                  label="Accommodation Preference"
                  value={niceForm.accommodation}
                  onChange={(e) => setNiceForm({ ...niceForm, accommodation: e.target.value })}
                  options={[
                    { value: 'host_family', label: 'French Host Family (Meals Included)' },
                    { value: 'student_residence', label: 'Student Residence Apartment' },
                    { value: 'self_arranged', label: 'Self-Arranged Housing' },
                  ]}
                />
              </div>

              <Textarea
                label="Motivation Essay (300 - 500 words)"
                required
                rows={6}
                value={niceForm.essay}
                onChange={(e) => setNiceForm({ ...niceForm, essay: e.target.value })}
                error={niceErrors.essay}
                helperText="Describe why you want to participate in the Nice Exchange program."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Dietary Restrictions / Allergies (Optional)"
                  value={niceForm.dietaryRestrictions}
                  onChange={(e) => setNiceForm({ ...niceForm, dietaryRestrictions: e.target.value })}
                />
                <Input
                  label="Emergency Contact (Name & Phone)"
                  required
                  value={niceForm.emergencyContact}
                  onChange={(e) => setNiceForm({ ...niceForm, emergencyContact: e.target.value })}
                  error={niceErrors.emergencyContact}
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={niceForm.acceptedTerms}
                    onChange={(e) => setNiceForm({ ...niceForm, acceptedTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-black focus:ring-black"
                  />
                  <span className="text-xs text-gray-700">
                    I agree to the Exchange Terms of Service & Code of Conduct.
                  </span>
                </label>
                {niceErrors.acceptedTerms && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{niceErrors.acceptedTerms}</p>
                )}
              </div>

              <Button variant="accent" size="lg" className="w-full font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white" disabled={niceLoading}>
                {niceLoading ? 'Submitting Application...' : 'Submit Nice Application'}
              </Button>
            </form>
          )}
        </div>
      </SectionWrapper>

      {/* 5. ABOUT ACADEMY & STUDENT STORIES */}
      <SectionWrapper id="about" bg="gray" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 relative">
            <div className="rounded-[16px] overflow-hidden border-2 border-gray-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Lilith Babayan Founder"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
              ABOUT US
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
              Lilith Babayan Educational Academy
            </h2>

            <p className="text-base text-gray-700 leading-relaxed font-sans">
              Founded by Lilith Babayan, our academy brings together a passionate community of foreign language educators and digital marketing pioneers. We believe language learning is not just about grammar—it's about opening new life paths and cultural connections.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-[8px] border border-gray-200">
                <span className="text-2xl font-bold text-black block">{siteConfig.metrics.studentsEnrolled}</span>
                <span className="text-xs text-gray-500 uppercase">Graduates Worldwide</span>
              </div>
              <div className="p-4 bg-white rounded-[8px] border border-gray-200">
                <span className="text-2xl font-bold text-[#38B6FF] block">{siteConfig.metrics.successRate}</span>
                <span className="text-xs text-gray-500 uppercase">Fluency & Career Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              STUDENT STORIES
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-black">
              What Our Graduates Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 6. REGISTER NOW INLINE STEPPER */}
      <SectionWrapper id="register" bg="white" className="py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
            REGISTER NOW
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-black">
            Register for a course
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Three simple steps to start your learning journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-[16px] border border-gray-200 shadow-xl text-left">
          {!regSubmitted && (
            <RegistrationStepper
              steps={['Choose a direction', 'Personal Info', 'Payment']}
              currentStep={regStep}
            />
          )}

          {regSubmitted ? (
            <div className="py-10 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-black">Registration Successful!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                A confirmation email with enrollment details has been sent to <strong>{regForm.email}</strong>.
              </p>
              <Button variant="primary" onClick={() => setRegSubmitted(false)}>
                Register for Another Course
              </Button>
            </div>
          ) : (
            <div>
              {regStep === 1 && (
                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-black">Choose a direction</h3>

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
                      <h4 className="font-bold text-black text-base">Foreign language</h4>
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
                      <h4 className="font-bold text-black text-base">SMM training</h4>
                      <span className="text-xs text-[#38B6FF] font-semibold mt-1 block">Pro →</span>
                    </button>
                  </div>

                  <Select
                    label="Select Specific Course Batch"
                    value={regCourseId}
                    onChange={(e) => setRegCourseId(e.target.value)}
                    options={allCourses.map((c) => ({
                      value: c.id,
                      label: `${c.title} — ${c.price}`,
                    }))}
                  />

                  <Button variant="primary" size="lg" className="w-full font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none" onClick={() => setRegStep(2)}>
                    Continue to Personal Info
                  </Button>
                </div>
              )}

              {regStep === 2 && (
                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-black">Step 2: Student Information</h3>

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
                      required
                      value={regForm.age}
                      onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                      error={regErrors.age}
                    />
                    {parseInt(regForm.age, 10) < 18 && (
                      <Input
                        label="Parent / Guardian Full Name"
                        required
                        value={regForm.parentGuardianName}
                        onChange={(e) => setRegForm({ ...regForm, parentGuardianName: e.target.value })}
                        error={regErrors.parentGuardianName}
                      />
                    )}
                  </div>

                  <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                    <Button variant="outline" onClick={() => setRegStep(1)}>
                      Back
                    </Button>
                    <Button variant="primary" size="lg" className="font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none" onClick={handleRegNextStep2}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {regStep === 3 && (
                <form onSubmit={handleRegSubmit} className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-black">Step 3: Payment & Summary</h3>

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
                      <span className="text-xs">Credit Card</span>
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
                      <span className="text-xs">Bank Transfer</span>
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
                      <span className="text-xs">Payment Plan</span>
                    </button>
                  </div>

                  {regForm.paymentMethod === 'card' && (
                    <div className="p-4 rounded-[6px] border border-gray-200 bg-gray-50 space-y-4">
                      <Input
                        label="Card Number"
                        placeholder="4000 0000 0000 0000"
                        value={regForm.cardNumber}
                        onChange={(e) => setRegForm({ ...regForm, cardNumber: e.target.value })}
                        error={regErrors.cardNumber}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={regForm.cardExpiry}
                          onChange={(e) => setRegForm({ ...regForm, cardExpiry: e.target.value })}
                          error={regErrors.cardExpiry}
                        />
                        <Input
                          label="CVC"
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
                        I agree to the enrollment terms and conditions.
                      </span>
                    </label>
                    {regErrors.acceptedTerms && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{regErrors.acceptedTerms}</p>
                    )}
                  </div>

                  <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                    <Button type="button" variant="outline" onClick={() => setRegStep(2)}>
                      Back
                    </Button>
                    <Button type="submit" variant="accent" size="lg" className="font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none" disabled={regLoading}>
                      {regLoading ? 'Processing Enrollment...' : 'Complete Registration'}
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
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Have questions regarding enrollment, schedules, or payment methods?
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={generalFaqs} />
        </div>
      </SectionWrapper>
    </div>
  );
};

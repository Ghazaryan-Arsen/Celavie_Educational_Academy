import React, { useState } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Sparkles, CheckCircle2, Home, Calendar, Award, HeartHandshake, Globe } from 'lucide-react';
import { type Language, niceTranslations } from '../../translations/niceExchange';

interface NiceExchangeSectionProps {
  id?: string;
}

export const NiceExchangeSection: React.FC<NiceExchangeSectionProps> = ({ id = 'nice-exchange' }) => {
  const [lang, setLang] = useState<Language>('en');
  const t = niceTranslations[lang];

  const [niceForm, setNiceForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    school: '',
    email: '',
    phone: '',
    country: '',
    frenchLevel: 'A1',
    englishLevel: 'A1',
    parentName: '',
    parentPhone: '',
    essay: '',
    acceptedTerms: false,
  });

  const [niceErrors, setNiceErrors] = useState<Record<string, string>>({});
  const [niceSubmitted, setNiceSubmitted] = useState(false);
  const [niceLoading, setNiceLoading] = useState(false);

  const levelOptions = [
    { value: 'A1', label: t.levels.a1 },
    { value: 'A2', label: t.levels.a2 },
    { value: 'B1', label: t.levels.b1 },
    { value: 'B2', label: t.levels.b2 },
    { value: 'C1', label: t.levels.c1 },
    { value: 'C2', label: t.levels.c2 },
  ];

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!niceForm.firstName.trim()) errs.firstName = t.errors.firstNameRequired;
    if (!niceForm.lastName.trim()) errs.lastName = t.errors.lastNameRequired;

    const ageNum = parseInt(niceForm.age, 10);
    if (!niceForm.age || isNaN(ageNum) || ageNum < 11) {
      errs.age = t.errors.ageMin;
    }

    if (!niceForm.school.trim()) errs.school = t.errors.schoolRequired;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!niceForm.email.trim() || !emailRegex.test(niceForm.email)) {
      errs.email = t.errors.emailInvalid;
    }

    if (!niceForm.phone.trim() || niceForm.phone.length < 7) {
      errs.phone = t.errors.phoneInvalid;
    }

    if (!niceForm.country.trim()) errs.country = t.errors.countryRequired;
    if (!niceForm.frenchLevel) errs.frenchLevel = t.errors.frenchLevelRequired;
    if (!niceForm.englishLevel) errs.englishLevel = t.errors.englishLevelRequired;
    if (!niceForm.parentName.trim()) errs.parentName = t.errors.parentNameRequired;
    if (!niceForm.parentPhone.trim() || niceForm.parentPhone.length < 7) {
      errs.parentPhone = t.errors.parentPhoneRequired;
    }

    const wordCount = niceForm.essay.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 300 || wordCount > 500) {
      errs.essay = t.errors.essayWords(wordCount);
    }

    if (!niceForm.acceptedTerms) {
      errs.acceptedTerms = t.errors.termsRequired;
    }

    setNiceErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepared Supabase insertion data structure:
    const submissionData = {
      first_name: niceForm.firstName,
      last_name: niceForm.lastName,
      age: parseInt(niceForm.age, 10),
      organization: niceForm.school,
      email: niceForm.email,
      phone: niceForm.phone,
      country: niceForm.country,
      french_level: niceForm.frenchLevel,
      english_level: niceForm.englishLevel,
      parent_name: niceForm.parentName,
      parent_phone: niceForm.parentPhone,
      motivation_essay: niceForm.essay,
      terms_accepted: niceForm.acceptedTerms,
    };

    console.log('Nice Exchange Application Submission Payload Prepared:', submissionData);

    setNiceLoading(true);
    setTimeout(() => {
      setNiceLoading(false);
      setNiceSubmitted(true);
    }, 1000);
  };

  return (
    <SectionWrapper id={id} bg="white" className="py-16 md:py-20">
      {/* Intro Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
        <div className="lg:col-span-7 space-y-6 text-left">
          <Badge variant="accent" className="px-3 py-1 font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-black inline" />
            {t.badge}
          </Badge>

          <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
            {t.sectionTitle}
          </h2>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed font-sans">
            {t.sectionSubtitle}
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

      {/* Embedded Compact Application Form */}
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-[16px] border border-gray-200 shadow-lg text-left relative">
        {/* Language Switcher */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-black" />
            <span>Language / Լեզու / Язык / Langue</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-gray-100 p-1 rounded-lg">
            {(
              [
                { code: 'hy', label: 'Հայերեն' },
                { code: 'en', label: 'English' },
                { code: 'ru', label: 'Русский' },
                { code: 'fr', label: 'Français' },
              ] as const
            ).map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  lang === item.code
                    ? 'bg-black text-white shadow-xs'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-8 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B6FF]">
            REGISTRATION FOR NICE APPLICANTS
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-black">
            {t.formTitle}
          </h3>
          <p className="text-xs md:text-sm text-gray-600">
            {t.formSubtitle}
          </p>
        </div>

        {niceSubmitted ? (
          <div className="py-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-black">{t.successTitle}</h4>
            <p className="text-sm text-gray-700 max-w-lg mx-auto">
              {t.successMessage}
            </p>
            <Button variant="outline" onClick={() => setNiceSubmitted(false)}>
              {t.submitAnotherButton}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleNiceSubmit} className="space-y-4">
            {/* 2-Column Grid Pairings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input
                label={t.firstNameLabel}
                required
                value={niceForm.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, firstName: e.target.value })}
                error={niceErrors.firstName}
              />
              <Input
                label={t.lastNameLabel}
                required
                value={niceForm.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, lastName: e.target.value })}
                error={niceErrors.lastName}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input
                label={t.ageLabel}
                type="number"
                required
                value={niceForm.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, age: e.target.value })}
                error={niceErrors.age}
              />
              <Input
                label={t.schoolLabel}
                required
                value={niceForm.school}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, school: e.target.value })}
                error={niceErrors.school}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input
                label={t.emailLabel}
                type="email"
                required
                value={niceForm.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, email: e.target.value })}
                error={niceErrors.email}
              />
              <Input
                label={t.phoneLabel}
                type="tel"
                required
                value={niceForm.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, phone: e.target.value })}
                error={niceErrors.phone}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input
                label={t.countryLabel}
                required
                value={niceForm.country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, country: e.target.value })}
                error={niceErrors.country}
              />
              <Select
                label={t.frenchLevelLabel}
                value={niceForm.frenchLevel}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNiceForm({ ...niceForm, frenchLevel: e.target.value })}
                options={levelOptions}
                error={niceErrors.frenchLevel}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Select
                label={t.englishLevelLabel}
                value={niceForm.englishLevel}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNiceForm({ ...niceForm, englishLevel: e.target.value })}
                options={levelOptions}
                error={niceErrors.englishLevel}
              />
              <Input
                label={t.parentNameLabel}
                required
                value={niceForm.parentName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, parentName: e.target.value })}
                error={niceErrors.parentName}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input
                label={t.parentPhoneLabel}
                type="tel"
                required
                value={niceForm.parentPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, parentPhone: e.target.value })}
                error={niceErrors.parentPhone}
              />
              <div className="hidden md:block" />
            </div>

            {/* Motivation Essay - Full Width */}
            <div className="pt-2">
              <Textarea
                label={t.essayLabel}
                required
                rows={5}
                value={niceForm.essay}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNiceForm({ ...niceForm, essay: e.target.value })}
                error={niceErrors.essay}
                helperText={t.essayHelperText}
              />
            </div>

            {/* Terms Checkbox - Full Width */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={niceForm.acceptedTerms}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiceForm({ ...niceForm, acceptedTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-black focus:ring-black"
                />
                <span className="text-xs text-gray-700">
                  {t.termsText}{' '}
                  <a href="/terms" target="_blank" className="font-bold underline text-black">
                    {t.termsLink}
                  </a>.
                </span>
              </label>
              {niceErrors.acceptedTerms && (
                <p className="mt-1 text-xs text-red-600 font-medium">{niceErrors.acceptedTerms}</p>
              )}
            </div>

            {/* Submit Button - Full Width */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full font-bold bg-[#38B6FF] hover:bg-[#2AA0E6] text-white border-none py-3"
                disabled={niceLoading}
              >
                {niceLoading ? t.submittingButton : t.submitButton}
              </Button>
            </div>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
};

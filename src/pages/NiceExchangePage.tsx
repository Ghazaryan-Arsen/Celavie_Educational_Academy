import { submitRegistration } from '../lib/registration';
import React, { useRef, useState } from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { ImageGallery } from '../components/ui/ImageGallery';
import {
  createEmptyNiceExchangeForm,
  validateNiceExchangeForm,
} from '../lib/niceExchange';
import { Sparkles, CheckCircle2, Calendar, Home, Award, HeartHandshake } from 'lucide-react';

export const NiceExchangePage: React.FC = () => {
  const [formData, setFormData] = useState(createEmptyNiceExchangeForm);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submissionInProgress = useRef(false);

  const niceGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
      alt: 'Nice Promenade des Anglais',
      caption: 'Strolling along the Mediterranean coast',
    },
    {
      url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800',
      alt: 'Old Town Nice (Vieux Nice)',
      caption: 'Charming pastel streets and open-air markets',
    },
    {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
      alt: 'French Language Workshop',
      caption: 'Small group interactive conversational workshops',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInProgress.current) return;

    const validationErrors = validateNiceExchangeForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    submissionInProgress.current = true;
    setLoading(true);

    try {
      await submitRegistration('nice', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Nice Exchange application submission failed', error);
      setErrors({ form: 'Your application could not be submitted. Please check your connection and try again.' });
    } finally {
      setLoading(false);
      submissionInProgress.current = false;
    }
  };

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb items={[{ label: 'Nice Exchange Program' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <SectionWrapper bg="white" className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="accent" className="px-3 py-1 font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-black inline" />
              Summer Cultural Immersion 🇫🇷
            </Badge>

            <h1 className="text-3xl md:text-5xl font-black text-black leading-tight">
              The Nice Exchange Program in Nice, France
            </h1>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Combine intensive spoken French education with authentic Mediterranean living. Stay with welcoming French host families or private residences while enjoying guided cultural excursions across the French Riviera.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3 p-3 rounded-[6px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <Home className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">Verified Host Families & Housing</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-[6px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <Calendar className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">2 to 8 Weeks Flexible Durations</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-[6px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <Award className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">20 Hours/Week Intensive French</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-[6px] bg-gray-50 border border-[rgba(0,0,0,0.06)]">
                <HeartHandshake className="w-5 h-5 text-black shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">24/7 On-Site Support Staff</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[12px] overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
                alt="Nice France Promenade"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Gallery */}
      <SectionWrapper bg="gray">
        <div className="text-left mb-8 space-y-2">
          <Badge variant="secondary">Life in Nice</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            Immersion Experience Gallery
          </h2>
        </div>
        <ImageGallery images={niceGalleryImages} columns={3} />
      </SectionWrapper>

      {/* Application Form */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="accent" className="uppercase font-bold">
              Official Application
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">
              Apply for Nice Exchange
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
              Please complete all required fields. Applicants under 18 require parent or guardian authorization.
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-sm text-left">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-black">Application Submitted Successfully!</h3>
                <p className="text-base text-gray-700 max-w-lg mx-auto leading-relaxed">
                  Thank you for applying to the CELAVIE Nice Exchange Program. Our exchange coordination committee will review your application essay and contact you via email within 48 hours.
                </p>
                <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 max-w-md mx-auto text-xs text-gray-600 space-y-1">
                  <p><strong>Applicant Email:</strong> {formData.email}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(createEmptyNiceExchangeForm());
                    setErrors({});
                  }}
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-2 mb-4">
                    1. Applicant Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      error={errors.firstName}
                    />
                    <Input
                      label="Last Name"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      error={errors.lastName}
                    />
                    <Input
                      label="Age"
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      error={errors.age}
                      helperText="Must be 14 or older"
                    />
                    {parseInt(formData.age, 10) < 18 && (
                      <Input
                        label="Parent Name"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        error={errors.parentName}
                        helperText="Required for applicants under 18"
                      />
                    )}
                    <Input
                      label="School / University / Organization"
                      required
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      error={errors.school}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={errors.phone}
                    />
                    <Input
                      label="Country of Residence"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      error={errors.country}
                    />
                  </div>
                </div>

                {/* Program Preferences */}
                <div>
                  <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-2 mb-4">
                    2. Program Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <Select
                      label="Current French/English Level"
                      value={formData.currentLanguageLevel}
                      onChange={(e) => setFormData({ ...formData, currentLanguageLevel: e.target.value })}
                      error={errors.currentLanguageLevel}
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
                </div>

                {/* Parent Information & Motivation Essay */}
                <div>
                  <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-2 mb-4">
                    3. Parent Information & Motivation Essay
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Parent Name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      error={errors.parentName}
                      placeholder="e.g. Jane Doe"
                    />

                    <Input
                      label="Parent Phone Number"
                      required
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      error={errors.parentPhone}
                      placeholder="e.g. +33 6 00 00 00 00"
                    />
                  </div>

                  <Textarea
                    label="Motivation Essay (300 - 500 words)"
                    required
                    rows={8}
                    value={formData.motivationEssay}
                    onChange={(e) => setFormData({ ...formData, motivationEssay: e.target.value })}
                    error={errors.motivationEssay}
                    helperText="Explain why you wish to participate in the Nice Exchange program and what goals you hope to achieve."
                  />
                </div>

                {errors.form && <p className="text-sm text-red-600 font-medium">{errors.form}</p>}

                {/* Terms Acceptance */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptedTerms}
                      onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-xs md:text-sm text-gray-700">
                      I certify that all information provided is accurate and I agree to the{' '}
                      <a href="/terms" className="text-black font-bold underline" target="_blank">
                        Terms of Service
                      </a>{' '}
                      and Exchange Conduct Code.
                    </span>
                  </label>
                  {errors.acceptedTerms && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.acceptedTerms}</p>
                  )}
                </div>

                <Button variant="accent" size="lg" className="w-full font-bold" disabled={loading}>
                  {loading ? 'Submitting Application...' : 'Submit Official Application'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

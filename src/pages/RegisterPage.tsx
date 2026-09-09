import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RegistrationStepper } from '../components/ui/RegistrationStepper';
import { LANGUAGE_COURSES, SMM_COURSES } from '../data/mockData';
import { validateCourseApplicant } from '../lib/validation';
import { submitRegistration } from '../lib/registration';
import type { RegistrationFormData } from '../types/registration';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const allCourses = [...LANGUAGE_COURSES, ...SMM_COURSES];

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get('course') || '';

  const [category, setCategory] = useState([...LANGUAGE_COURSES, ...SMM_COURSES].find((c) => c.id === initialCourseId)?.category || '');
  const [step, setStep] = useState<number>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    notes: '',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);


  const selectedCourse = allCourses.find((c) => c.id === selectedCourseId && c.category === category);

  useEffect(() => {
    if (searchParams.get('course')) {
      const course = allCourses.find((c) => c.id === searchParams.get('course'));
      setSelectedCourseId(course?.id || '');
      setCategory(course?.category || '');
    }
  }, [searchParams]);

  // Step 1 Validation
  const handleNextStep1 = () => {
    if (!selectedCourse) {
      setErrors({ course: 'Please select a course to proceed' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  // Step 2 Validation
  const courseSubmissionInProgress = useRef(false);

  const handleNextStep2 = () => {
    const errs = validateCourseApplicant(formData);

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(3);
    }
  };

  // Step 3 Submission
  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (courseSubmissionInProgress.current) return;
    const errs = validateCourseApplicant(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStep(2);
      return;
    }

    if (formData.acceptedTerms !== true) {
      errs.acceptedTerms = 'You must accept the enrollment terms and conditions';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    courseSubmissionInProgress.current = true;
    setLoading(true);

    try {
      const course = selectedCourse;
      if (!course) throw new Error('Please select a valid course.');

      const registrationData: RegistrationFormData = {
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.notes.trim(),
        ...(course.category === 'smm'
          ? { smmProgram: course.id }
          : { language: course.language, level: course.level }),
      };
      await submitRegistration(course.category, registrationData);


      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during registration. Please try again.';
      setErrors({ form: errorMessage });
      console.error('Registration submission failed:', error);
    } finally {
      courseSubmissionInProgress.current = false;
    }
  };

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb items={[{ label: 'Course Registration' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto text-left">
          <div className="text-center mb-8 space-y-2">
            <Badge variant="secondary" className="uppercase font-bold">
              Enrollment Form
            </Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black">
              Register for Your Course
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Complete your enrollment in 3 simple steps.
            </p>
          </div>

          {!submitted && (
            <RegistrationStepper
              steps={['Select Program', 'Student Info', 'Review & Submit']}
              currentStep={step}
            />
          )}

          <div className="bg-white p-6 md:p-8 rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-sm mt-6">
            {submitted ? (
              <div className="py-10 text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-extrabold text-black">Registration Successful!</h2>
                <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
                  Your registration has been received by CELAVIE Educational Academy. We will follow up with course and schedule details at <strong>{formData.email}</strong>.
                </p>

                <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-left text-xs text-gray-700 max-w-md mx-auto space-y-1.5">
                  <p><strong>Enrolled Course:</strong> {selectedCourse?.title}</p>
                  <p><strong>Student Name:</strong> {formData.firstName} {formData.lastName}</p>
                </div>

                <div className="pt-4 flex justify-center space-x-4">
                  <Link to="/">
                    <Button variant="primary">Return to Home</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                {/* STEP 1: COURSE SELECTION */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-black">Step 1: Choose Your Program</h3>
                    <Select
                      label="Program Category"
                      value={category}
                      onChange={(e) => { setCategory(e.target.value); setSelectedCourseId(''); }}
                      options={[
                        { value: 'language', label: 'Languages' },
                        { value: 'smm', label: 'SMM' },
                      ]}
                    />
                    <Select
                      label="Select Course"
                      value={selectedCourseId}
                      error={errors.course}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      options={allCourses.filter((c) => c.category === category).map((c) => ({
                        value: c.id,
                        label: `${c.title} (${c.level})`,
                      }))}
                    />

                    {selectedCourse && (
                    <div className="p-4 rounded-[6px] bg-gray-50 border border-[rgba(0,0,0,0.08)] flex items-start space-x-4">
                      <img
                        src={selectedCourse?.image}
                        alt={selectedCourse?.title}
                        className="w-20 h-20 rounded object-cover shrink-0"
                      />
                      <div>
                        <Badge variant="primary" className="mb-1">{selectedCourse?.category}</Badge>
                        <h4 className="text-base font-bold text-black">{selectedCourse?.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{selectedCourse?.description}</p>
                      </div>
                    </div>

                    )}

                    <Button variant="primary" size="lg" className="w-full font-bold" onClick={handleNextStep1}>
                      Continue to Personal Information
                    </Button>
                  </div>
                )}

                {/* STEP 2: PERSONAL INFORMATION */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-black">Step 2: Student Details</h3>

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
                        label="Student Age"
                        type="number"
                        min={11}
                        max={99}
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        error={errors.age}
                      />
                    </div>

                    <Input
                      label="Additional Notes / Preferred Batch Time (Optional)"
                      value={formData.notes}
                      maxLength={1000}
                      error={errors.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Prefer evening classes"
                    />

                    <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button variant="primary" size="lg" className="font-bold" onClick={handleNextStep2}>
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: REVIEW & SUBMIT */}
                {step === 3 && (
                  <form onSubmit={handleSubmitRegistration} className="space-y-6">
                    <h3 className="text-lg font-bold text-black">Step 3: Review & Submit Registration</h3>

                    {/* Form-level error display */}
                    {errors.form && (
                      <div className="p-4 rounded-[6px] bg-red-50 border border-red-200 flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-900">Registration Error</p>
                          <p className="text-xs text-red-800 mt-1">{errors.form}</p>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-gray-50 rounded-[6px] border border-[rgba(0,0,0,0.08)]">
                      <span className="text-xs text-gray-500 uppercase font-bold block">Selected Program</span>
                      <span className="text-base font-bold text-black">{selectedCourse?.title}</span>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-[6px] border border-[rgba(0,0,0,0.08)] space-y-2">
                      <span className="text-xs text-gray-500 uppercase font-bold block">Student Information</span>
                      <p className="text-sm text-black"><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                      <p className="text-sm text-black"><strong>Email:</strong> {formData.email}</p>
                      <p className="text-sm text-black"><strong>Phone:</strong> {formData.phone}</p>
                    </div>

                    {/* Terms */}
                    <div className="pt-2">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptedTerms}
                          onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 text-black focus:ring-black rounded"
                        />
                        <span className="text-xs text-gray-700">
                          I agree to CELAVIE Academy's{' '}
                          <a href="/terms" target="_blank" className="font-bold underline text-black">
                            Terms of Service
                          </a>{' '}
                          and enrollment policies.
                        </span>
                      </label>
                      {errors.acceptedTerms && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.acceptedTerms}</p>
                      )}
                    </div>

                    <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" variant="accent" size="lg" className="font-bold" disabled={loading}>
                        {loading ? 'Submitting Registration...' : 'Submit Registration'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

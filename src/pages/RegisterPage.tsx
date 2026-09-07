import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RegistrationStepper } from '../components/ui/RegistrationStepper';
import { LANGUAGE_COURSES, SMM_COURSES } from '../data/mockData';
import { isValidEmail, isValidPhone, parseAge } from '../lib/validation';
import { CheckCircle2, CreditCard, Landmark, PhoneCall } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get('course') || LANGUAGE_COURSES[0].id;

  const [step, setStep] = useState<number>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    parentGuardianName: '',
    notes: '',
    paymentMethod: 'card' as 'card' | 'bank_transfer' | 'payment_plan',
    acceptedTerms: false,
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const allCourses = [...LANGUAGE_COURSES, ...SMM_COURSES];
  const selectedCourse = allCourses.find((c) => c.id === selectedCourseId) || allCourses[0];

  useEffect(() => {
    if (searchParams.get('course')) {
      setSelectedCourseId(searchParams.get('course')!);
    }
  }, [searchParams]);

  // Step 1 Validation
  const handleNextStep1 = () => {
    if (!selectedCourseId) {
      setErrors({ course: 'Please select a course to proceed' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  // Step 2 Validation
  const handleNextStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      errs.email = 'Valid email is required';
    }

    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      errs.phone = 'Valid phone number is required';
    }

    const ageNum = parseAge(formData.age);
    if (!formData.age || ageNum === null || ageNum < 12 || ageNum > 99) {
      errs.age = 'Age must be between 12 and 99';
    }

    if (ageNum !== null && ageNum < 18 && !formData.parentGuardianName.trim()) {
      errs.parentGuardianName = 'Parent or guardian name is required for under-18 students';
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(3);
    }
  };

  // Step 3 Submission
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!formData.acceptedTerms) {
      errs.acceptedTerms = 'You must accept the enrollment terms and conditions';
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replaceAll(' ', '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExpiry.trim()) errs.cardExpiry = 'Expiry date required (MM/YY)';
      if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) errs.cardCvc = 'Valid CVC required';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    // Simulate database registration & payment processing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
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
              steps={['Select Course', 'Personal Details', 'Tuition & Confirmation']}
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
                  Welcome to CELAVIE Educational Academy. A confirmation email with course access details and schedule details has been sent to <strong>{formData.email}</strong>.
                </p>

                <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-left text-xs text-gray-700 max-w-md mx-auto space-y-1.5">
                  <p><strong>Enrolled Course:</strong> {selectedCourse.title}</p>
                  <p><strong>Student Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Payment Status:</strong> Confirmed ({formData.paymentMethod.replace('_', ' ')})</p>
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
                      label="Select Course"
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      options={allCourses.map((c) => ({
                        value: c.id,
                        label: c.title,
                      }))}
                    />

                    <div className="p-4 rounded-[6px] bg-gray-50 border border-[rgba(0,0,0,0.08)] flex items-start space-x-4">
                      <img
                        src={selectedCourse.image}
                        alt={selectedCourse.title}
                        className="w-20 h-20 rounded object-cover shrink-0"
                      />
                      <div>
                        <Badge variant="primary" className="mb-1">{selectedCourse.category}</Badge>
                        <h4 className="text-base font-bold text-black">{selectedCourse.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{selectedCourse.description}</p>
                      </div>
                    </div>

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
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        error={errors.age}
                      />
                      {parseInt(formData.age, 10) < 18 && (
                        <Input
                          label="Parent / Guardian Full Name"
                          required
                          value={formData.parentGuardianName}
                          onChange={(e) => setFormData({ ...formData, parentGuardianName: e.target.value })}
                          error={errors.parentGuardianName}
                          helperText="Required for under-18 registrants"
                        />
                      )}
                    </div>

                    <Input
                      label="Additional Notes / Preferred Batch Time (Optional)"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Prefer evening classes"
                    />

                    <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button variant="primary" size="lg" className="font-bold" onClick={handleNextStep2}>
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PAYMENT & CONFIRMATION */}
                {step === 3 && (
                  <form onSubmit={handleSubmitRegistration} className="space-y-6">
                    <h3 className="text-lg font-bold text-black">Step 3: Tuition Payment & Order Summary</h3>

                    <div className="p-4 bg-gray-50 rounded-[6px] border border-[rgba(0,0,0,0.08)]">
                      <span className="text-xs text-gray-500 uppercase font-bold block">Selected Program</span>
                      <span className="text-base font-bold text-black">{selectedCourse.title}</span>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Select Payment Method</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                          className={`p-3 rounded-[6px] border text-left flex items-center space-x-2.5 transition ${
                            formData.paymentMethod === 'card'
                              ? 'border-black bg-black/5 ring-2 ring-black font-bold'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <CreditCard className="w-5 h-5 text-black" />
                          <span className="text-xs md:text-sm">Credit / Debit Card</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                          className={`p-3 rounded-[6px] border text-left flex items-center space-x-2.5 transition ${
                            formData.paymentMethod === 'bank_transfer'
                              ? 'border-black bg-black/5 ring-2 ring-black font-bold'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <Landmark className="w-5 h-5 text-black" />
                          <span className="text-xs md:text-sm">Bank Transfer</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: 'payment_plan' })}
                          className={`p-3 rounded-[6px] border text-left flex items-center space-x-2.5 transition ${
                            formData.paymentMethod === 'payment_plan'
                              ? 'border-black bg-black/5 ring-2 ring-black font-bold'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <PhoneCall className="w-5 h-5 text-black" />
                          <span className="text-xs md:text-sm">Request Payment Plan</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Fields */}
                    {formData.paymentMethod === 'card' && (
                      <div className="p-4 rounded-[6px] border border-gray-200 bg-gray-50/50 space-y-4">
                        <Input
                          label="Cardholder Number"
                          placeholder="4000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          error={errors.cardNumber}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiration Date"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                            error={errors.cardExpiry}
                          />
                          <Input
                            label="Security Code (CVC)"
                            placeholder="123"
                            type="password"
                            maxLength={4}
                            value={formData.cardCvc}
                            onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                            error={errors.cardCvc}
                          />
                        </div>
                      </div>
                    )}

                    {/* Bank Transfer info */}
                    {formData.paymentMethod === 'bank_transfer' && (
                      <div className="p-4 rounded-[6px] bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
                        <p className="font-bold">Bank Transfer Wire Instructions:</p>
                        <p>Bank Name: Crédit Agricole Riviera</p>
                        <p>IBAN: [CONFIGURED_IBAN]</p>
                        <p>BIC/SWIFT: [CONFIGURED_SWIFT]</p>
                        <p className="text-gray-600 pt-1">Please reference your full name in the wire description.</p>
                      </div>
                    )}

                    {/* Payment Plan info */}
                    {formData.paymentMethod === 'payment_plan' && (
                      <div className="p-4 rounded-[6px] bg-amber-50 border border-amber-100 text-xs text-amber-900 space-y-1">
                        <p className="font-bold">Flexible Installment Payment Plan:</p>
                        <p>Our financial office will contact you to set up 3 or 4 monthly installments without interest fees.</p>
                      </div>
                    )}

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
                        {loading ? 'Processing Enrollment...' : 'Complete Registration'}
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

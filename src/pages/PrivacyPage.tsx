import React from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';

export const PrivacyPage: React.FC = () => {
  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <h1 className="text-3xl font-extrabold text-black">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: January 2025</p>

          <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-lg font-bold text-black">1. Information We Collect</h3>
              <p>
                CELAVIE Educational Academy collects personal information necessary to deliver educational courses and process program applications. This includes names, contact details, dates of birth, payment details (processed securely via external providers like Stripe), and application essays.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-black">2. Use of Information</h3>
              <p>
                We use collected information solely to process registrations, manage class rosters, facilitate student communication, process payments, and coordinate host family accommodations for the Nice Exchange program.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-black">3. Data Protection & Security</h3>
              <p>
                We implement strict security measures and Row Level Security (RLS) standards. Credit card details are never stored directly on our servers or databases.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-black">4. Contact Us</h3>
              <p>
                If you have questions regarding your personal data or privacy rights, please contact our data protection officer at our official email address.
              </p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

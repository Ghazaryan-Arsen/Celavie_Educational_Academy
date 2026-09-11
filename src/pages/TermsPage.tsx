import { useT } from '../i18n/useLanguage';
import React from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';

export const TermsPage: React.FC = () => {
  const t = useT();
  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Terms of Service' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <h1 className="text-3xl font-extrabold text-black">{t("Terms of Service")}</h1>
          <p className="text-sm text-gray-500">{t("Last updated: January 2025")}</p>

          <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("1. Course Enrollment & Attendance")}</h2>
              <p>{t("By enrolling in a language or SMM course at CELAVIE Educational Academy, students agree to adhere to attendance schedules, complete assigned coursework, and follow code-of-conduct guidelines.")}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("2. Nice Exchange Program Conditions")}</h2>
              <p>{t("Applicants under the age of 18 must provide written parent or guardian consent. Program dates must be booked at least 2 weeks in advance. Full terms regarding housing, emergency contacts, and code of conduct apply.")}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("3. Tuition & Refund Policy")}</h2>
              <p>{t("Tuition fees are due prior to course start dates unless a installment payment plan is approved. Refunds are governed by our standard 14-day cancellation policy prior to the start of classes.")}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("4. Intellectual Property")}</h2>
              <p>{t("All course materials, video lectures, workbooks, and SMM frameworks remain the sole intellectual property of CELAVIE Educational Academy.")}</p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

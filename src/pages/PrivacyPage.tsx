import { useT } from '../i18n/useLanguage';
import React from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';

export const PrivacyPage: React.FC = () => {
  const t = useT();
  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <h1 className="text-3xl font-extrabold text-black">{t("Privacy Policy")}</h1>
          <p className="text-sm text-gray-500">{t("Last updated: January 2025")}</p>

          <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("1. Information We Collect")}</h2>
              <p>{t("CELAVIE collects the information you enter in registration and application forms, including names, age, contact details, school, country, language level, parent details and optional messages or motivation essays.")}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("2. Use of Information")}</h2>
              <p>{t("We use the information you submit to process course registrations and Nice Exchange applications and to contact you about your chosen program.")}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("3. Data Protection & Security")}</h2>
              <p>{t("Registration information is sent to our registration service for processing, stored in application spreadsheets and used for confirmation emails. This website does not collect payment card details.")}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-black">{t("4. Contact Us")}</h2>
              <p>{t("For questions about your personal information, contact CELAVIE by phone at 095 400 288.")}</p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

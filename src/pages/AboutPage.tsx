import { useT } from '../i18n/useLanguage';
import React from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Award, Globe, ShieldCheck, Heart, Users, Target } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const t = useT();
  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'About Us' }]} />
        </div>
      </div>

      {/* Hero */}
      <SectionWrapper bg="white" className="py-16 md:py-24">
        <div className="max-w-3xl text-left space-y-4">
          <Badge variant="secondary" className="uppercase font-bold">{t("About CELAVIE Educational Academy")}</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-[rgb(38,38,38)] leading-tight">{t("Empowering Global Minds Through Language & Digital Excellence")}</h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">{t("Founded with a passion for cross-cultural communication and digital empowerment, CELAVIE Educational Academy provides premier language education, specialized SMM courses, and immersive cultural exchange programs.")}</p>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper bg="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-xs text-left space-y-3">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-black">{t("Our Mission")}</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t("To break down language and cultural barriers through accessible, high-impact educational programs that combine practical fluency, digital skills, and real-world immersion opportunities.")}</p>
          </div>

          <div className="bg-white p-8 rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-xs text-left space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#4aabb8] text-black flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-black">{t("Our Vision")}</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t("To be the premier international academy bridging specialized online education with unforgettable real-world cultural immersion in Nice, France and beyond.")}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Founder / Founding Info */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-[12px] overflow-hidden border border-[rgba(0,0,0,0.1)] shadow-md">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt={t("Academy Founder")}
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 text-left space-y-6">
            <Badge variant="accent" className="uppercase font-bold">{t("Founder & Leadership")}</Badge>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[rgb(38,38,38)]">{t("Built on Excellence & Integrity")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-black shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-black">{t("Certified Educators")}</h4>
                  <p className="text-xs text-gray-500">{t("Native language tutors and active marketing agency veterans.")}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-black shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-black">{t("CEFR Aligned")}</h4>
                  <p className="text-xs text-gray-500">{t("Standardized language curriculum following international CEFR levels.")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper bg="gray">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <Badge variant="secondary">{t("What Drives Us")}</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">{t("Our Core Values")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <Heart className="w-8 h-8 text-black mb-4" />
            <h2 className="text-lg font-bold text-black mb-2">{t("Student-Centric Care")}</h2>
            <p className="text-sm text-gray-600">{t("Personalized feedback, small cohort sizes, and genuine mentorship for every student.")}</p>
          </div>

          <div className="bg-white p-6 rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <Globe className="w-8 h-8 text-black mb-4" />
            <h2 className="text-lg font-bold text-black mb-2">{t("Cultural Respect")}</h2>
            <p className="text-sm text-gray-600">{t("Fostering deep intercultural understanding and authentic language immersion experiences.")}</p>
          </div>

          <div className="bg-white p-6 rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <Users className="w-8 h-8 text-black mb-4" />
            <h2 className="text-lg font-bold text-black mb-2">{t("Practical Outcomes")}</h2>
            <p className="text-sm text-gray-600">{t("Focusing on real-world spoken fluency, job-ready SMM portfolios, and official exam results.")}</p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

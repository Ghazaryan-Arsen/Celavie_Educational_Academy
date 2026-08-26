import React from 'react';
import { Link } from 'react-router-dom';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CourseCard } from '../components/domain/CourseCard';
import { TestimonialCard } from '../components/domain/TestimonialCard';
import { LANGUAGE_COURSES, SMM_COURSES, TESTIMONIALS, FAQS } from '../data/mockData';
import { siteConfig } from '../config/site';
import { Globe, TrendingUp, Sparkles, CheckCircle, Award, ArrowRight, Users, BookOpen, Star } from 'lucide-react';

export const HomePage: React.FC = () => {
  const featuredLanguages = LANGUAGE_COURSES.slice(0, 6);
  const featuredSMM = SMM_COURSES;
  const generalFaqs = FAQS.filter((f) => f.category === 'general' || f.category === 'registration');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-[#FFD700]_1px,transparent_1px] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="accent" className="px-3 py-1 text-xs uppercase font-bold tracking-wider">
                ✨ World-Class Education & Cultural Immersion
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Master Global Languages & Digital Marketing at <span className="text-[#FFD700]">CELAVIE</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                Elevate your skills through 10 global language programs, expert Social Media Marketing courses, and our flagship summer immersion program in Nice, France.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link to="/register">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold">
                    Explore Programs & Apply
                  </Button>
                </Link>
                <Link to="/nice-exchange">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    <Sparkles className="w-4 h-4 mr-2 text-[#FFD700]" />
                    Nice Exchange Program
                  </Button>
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 border-t border-gray-800 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="text-2xl lg:text-3xl font-black text-white block">10+</span>
                  <span className="text-xs text-gray-400">Global Languages</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-3xl font-black text-[#FFD700] block">100%</span>
                  <span className="text-xs text-gray-400">Native Instructors</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-3xl font-black text-white block">Nice, FR</span>
                  <span className="text-xs text-gray-400">Summer Exchange</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[12px] overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                  alt="CELAVIE Students Learning"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-left space-y-1">
                    <Badge variant="accent" className="mb-1">Featured Program</Badge>
                    <h3 className="text-lg font-bold text-white">Nice Exchange 2025</h3>
                    <p className="text-xs text-gray-300">Live & learn on the French Riviera</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Statistics Section */}
      <SectionWrapper bg="gray" className="py-12 border-b border-[rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <Users className="w-6 h-6 mx-auto mb-2 text-black" />
            <span className="text-2xl md:text-3xl font-extrabold text-black block">
              {siteConfig.metrics.studentsEnrolled}
            </span>
            <span className="text-xs text-gray-500 font-medium">Students Graduated</span>
          </div>

          <div className="p-4 bg-white rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-black" />
            <span className="text-2xl md:text-3xl font-extrabold text-black block">13+</span>
            <span className="text-xs text-gray-500 font-medium">Specialized Courses</span>
          </div>

          <div className="p-4 bg-white rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <Star className="w-6 h-6 mx-auto mb-2 text-[#FFD700]" />
            <span className="text-2xl md:text-3xl font-extrabold text-black block">
              {siteConfig.metrics.successRate}
            </span>
            <span className="text-xs text-gray-500 font-medium">Satisfaction Rate</span>
          </div>

          <div className="p-4 bg-white rounded-[8px] border border-[rgba(0,0,0,0.06)] shadow-xs">
            <Award className="w-6 h-6 mx-auto mb-2 text-black" />
            <span className="text-2xl md:text-3xl font-extrabold text-black block">
              {siteConfig.metrics.expertInstructors}
            </span>
            <span className="text-xs text-gray-500 font-medium">Native Tutors & Experts</span>
          </div>
        </div>
      </SectionWrapper>

      {/* Language Courses Overview */}
      <SectionWrapper bg="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left space-y-2">
            <Badge variant="secondary" className="uppercase font-bold">
              <Globe className="w-3.5 h-3.5 mr-1 text-black inline" />
              Language Academy
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
              Master 10 Global Languages
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              From beginner foundations to advanced fluency, our language tracks prepare you for international study, travel, and career success.
            </p>
          </div>
          <Link to="/services" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="font-semibold">
              View All Languages <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredLanguages.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>

      {/* SMM Section */}
      <SectionWrapper bg="gray">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left space-y-2">
            <Badge variant="accent" className="uppercase font-bold">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-black inline" />
              Digital Marketing Academy
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
              Social Media Marketing (SMM) Programs
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              Practical, project-based marketing training designed to launch your social media career or scale your digital agency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredSMM.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>

      {/* Nice Exchange Spotlight */}
      <SectionWrapper bg="accent" className="relative overflow-hidden border-y border-[#FFD700]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="primary" className="px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#FFD700] inline" />
              Flagship Summer Immersion
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight">
              The Nice Exchange Program in Nice, France 🇫🇷
            </h2>
            <p className="text-base text-gray-800 leading-relaxed">
              Experience authentic French language immersion on the stunning French Riviera. Combine daily interactive language instruction with guided cultural excursions, host family stays, and Mediterranean beach activities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-sm font-semibold text-black">
                <CheckCircle className="w-5 h-5 text-black shrink-0" />
                <span>Host Family or Residence Housing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-black">
                <CheckCircle className="w-5 h-5 text-black shrink-0" />
                <span>Daily Guided Excursions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-black">
                <CheckCircle className="w-5 h-5 text-black shrink-0" />
                <span>20 Hours/Week Intensive Spoken French</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-black">
                <CheckCircle className="w-5 h-5 text-black shrink-0" />
                <span>Open for Ages 14+ & Adults</span>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/nice-exchange">
                <Button variant="primary" size="lg" className="font-bold">
                  Apply for Nice Exchange <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[12px] overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
                alt="Nice Promenade des Anglais"
                className="w-full h-[320px] object-cover"
              />
              <div className="p-4 text-center bg-black text-white">
                <p className="text-sm font-bold">Nice, French Riviera • Summer Season</p>
                <p className="text-xs text-gray-300">Limited Cohort Seats Available</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper bg="white">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="secondary">Student Success Stories</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
            What Our Students Say
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Read real experiences from language learners and SMM academy graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper bg="gray">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="secondary">Questions & Answers</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Have questions about enrollment, schedules, or payments? Find answers below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={generalFaqs} />
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper bg="dark" className="text-center py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready to Start Your Educational Journey?
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">
            Enroll today in our language courses or SMM academy, or submit an application for our Nice Exchange summer program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Link to="/register">
              <Button variant="accent" size="lg" className="font-bold w-full sm:w-auto">
                Register Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                Contact Admissions
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

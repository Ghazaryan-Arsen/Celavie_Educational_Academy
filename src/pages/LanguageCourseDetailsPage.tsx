import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Timeline } from '../components/ui/Timeline';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CourseCard } from '../components/domain/CourseCard';
import { CourseOverviewCard } from '../components/domain/CourseOverviewCard';
import { TestimonialCard } from '../components/domain/TestimonialCard';
import { LANGUAGE_COURSES, TESTIMONIALS } from '../data/mockData';
import { CheckCircle2, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const LanguageCourseDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = LANGUAGE_COURSES.find((c) => c.slug === slug?.toLowerCase());

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const relatedCourses = LANGUAGE_COURSES.filter((c) => c.id !== course.id).slice(0, 3);
  const relevantTestimonials = TESTIMONIALS.slice(0, 2);

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: 'Language Courses', href: '/services' },
              { label: `${course.language} Course` },
            ]}
          />
        </div>
      </div>

      {/* Hero & Overview */}
      <SectionWrapper bg="white" className="py-10 md:py-16">
        <CourseOverviewCard course={course} />
      </SectionWrapper>

      {/* What You'll Learn */}
      <SectionWrapper bg="gray">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">Curriculum Objectives</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
              What You'll Learn in {course.language}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYouWillLearn.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-xs flex items-start space-x-3"
              >
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-medium text-gray-800 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CEFR Level Structure */}
      <SectionWrapper bg="white">
        <div className="text-left max-w-4xl space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">CEFR Standard</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Standardized Proficiency Levels Covered
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Our curriculum strictly follows the Common European Framework of Reference for Languages.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {course.cefrLevels.map((lvl, idx) => (
              <Badge key={idx} variant="primary" className="px-4 py-2 text-sm font-semibold">
                {lvl}
              </Badge>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Learning Path */}
      <SectionWrapper bg="gray">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">Step-by-Step Progress</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Your Learning Path
            </h2>
          </div>

          <Timeline steps={course.learningPath} />
        </div>
      </SectionWrapper>

      {/* Schedule & Timing */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">Class Batches</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Upcoming Live Class Schedules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {course.schedule.map((sch, idx) => (
              <div key={idx} className="p-5 rounded-[8px] border border-[rgba(0,0,0,0.1)] bg-gray-50 flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-black shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block">Batch {idx + 1}</span>
                  <span className="text-sm font-bold text-gray-800">{sch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Nice Exchange Add-on Spotlight (if French) */}
      {course.niceExchangeAddon && (
        <SectionWrapper bg="accent" className="border-y border-[#FFD700]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-8 space-y-4">
              <Badge variant="primary" className="px-3 py-1">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#FFD700] inline" />
                Exclusive French Immersion Add-on
              </Badge>
              <h2 className="text-2xl md:text-3xl font-black text-black">
                Combine with the Nice Summer Exchange Program 🇫🇷
              </h2>
              <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                As a student in our French Language course, you qualify for direct priority placement in our summer immersion program on the French Riviera in Nice. Practice real spoken French with local host families.
              </p>
            </div>
            <div className="md:col-span-4 text-right">
              <Link to="/nice-exchange">
                <Button variant="primary" size="lg" className="w-full font-bold">
                  Apply for Nice Exchange <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* Testimonials */}
      <SectionWrapper bg="white">
        <div className="text-left space-y-2 mb-8">
          <Badge variant="secondary">Student Reviews</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            What Graduates Say About Our Language Program
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relevantTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ */}
      {course.faq.length > 0 && (
        <SectionWrapper bg="gray">
          <div className="text-left space-y-2 mb-8 max-w-3xl">
            <Badge variant="secondary">Course FAQ</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl">
            <FAQAccordion items={course.faq} />
          </div>
        </SectionWrapper>
      )}

      {/* Related Courses */}
      <SectionWrapper bg="white">
        <div className="text-left space-y-2 mb-8">
          <Badge variant="secondary">Explore More</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            Other Popular Languages
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper bg="dark" className="text-center py-14">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Start Learning {course.language} Today
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Join our next cohort and gain authentic language confidence.
          </p>
          <Link to={`/register?course=${course.id}`} className="inline-block pt-2">
            <Button variant="accent" size="lg" className="font-bold">
              Enroll in {course.language} Course
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
};

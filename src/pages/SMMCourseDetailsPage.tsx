import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CourseCard } from '../components/domain/CourseCard';
import { CourseOverviewCard } from '../components/domain/CourseOverviewCard';
import { TestimonialCard } from '../components/domain/TestimonialCard';
import { SMM_COURSES, TESTIMONIALS } from '../data/mockData';
import { CheckCircle2, TrendingUp, Rocket, Briefcase, Layers } from 'lucide-react';

export const SMMCourseDetailsPage: React.FC = () => {
  const { tier } = useParams<{ tier: string }>();
  const course = SMM_COURSES.find((c) => c.tier === tier?.toLowerCase());

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const relatedCourses = SMM_COURSES.filter((c) => c.id !== course.id);
  const relevantTestimonials = TESTIMONIALS.filter((t) => t.courseName.includes('SMM'));

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: 'SMM Academy', href: '/services' },
              { label: `SMM ${course.tier.toUpperCase()}` },
            ]}
          />
        </div>
      </div>

      {/* Hero & Overview */}
      <SectionWrapper bg="white" className="py-10 md:py-16">
        <CourseOverviewCard course={course} />
      </SectionWrapper>

      {/* What You'll Master */}
      <SectionWrapper bg="gray">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="accent" className="uppercase font-bold">
              Core Competencies
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
              What You'll Master in SMM {course.tier.toUpperCase()}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYouWillMaster.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-xs flex items-start space-x-3"
              >
                <TrendingUp className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-medium text-gray-800 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Detailed Curriculum */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">Module Breakdown</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Comprehensive Curriculum
            </h2>
          </div>

          <div className="space-y-4">
            {course.curriculum.map((mod, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-[8px] border border-[rgba(0,0,0,0.08)]">
                <div className="flex items-center space-x-2 mb-3">
                  <Layers className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-bold text-black">{mod.module}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-[rgba(0,0,0,0.06)]">
                  {mod.topics.map((top, tidx) => (
                    <div key={tidx} className="flex items-center space-x-2 text-xs md:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>{top}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Real-World Projects */}
      <SectionWrapper bg="gray">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">Hands-on Experience</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Real-World Projects & Portfolio Building
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              You won't just learn theory. You will build tangible client assets during the program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.realWorldProjects.map((proj, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[8px] border border-[rgba(0,0,0,0.08)] flex items-start space-x-4">
                <Rocket className="w-6 h-6 text-black shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-black uppercase mb-1">Project #{idx + 1}</h4>
                  <p className="text-sm md:text-base text-gray-700 font-medium">{proj}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Career Outcomes */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl text-left space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">Career Advancement</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Target Career Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.careerOutcomes.map((out, idx) => (
              <div key={idx} className="p-5 rounded-[8px] bg-emerald-50/50 border border-emerald-100 flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-semibold text-emerald-950">{out}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      {relevantTestimonials.length > 0 && (
        <SectionWrapper bg="gray">
          <div className="text-left space-y-2 mb-8">
            <Badge variant="secondary">Student Feedback</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              What SMM Graduates Achieved
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relevantTestimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* FAQ */}
      {course.faq.length > 0 && (
        <SectionWrapper bg="white">
          <div className="text-left space-y-2 mb-8 max-w-3xl">
            <Badge variant="secondary">Tier FAQ</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl">
            <FAQAccordion items={course.faq} />
          </div>
        </SectionWrapper>
      )}

      {/* Related SMM Tiers */}
      <SectionWrapper bg="gray">
        <div className="text-left space-y-2 mb-8">
          <Badge variant="secondary">Compare Tiers</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            Other SMM Tiers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper bg="dark" className="text-center py-14">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Ready to Master SMM {course.tier.toUpperCase()}?
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Enroll today and gain high-demand digital marketing skills.
          </p>
          <Link to={`/register?course=${course.id}`} className="inline-block pt-2">
            <Button variant="accent" size="lg" className="font-bold">
              Enroll in SMM {course.tier.toUpperCase()}
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
};

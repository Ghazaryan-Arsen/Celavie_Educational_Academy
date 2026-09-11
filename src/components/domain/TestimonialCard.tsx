import { useT } from '../../i18n/useLanguage';
import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const t = useT();
  return (
    <div className="bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] p-6 shadow-xs flex flex-col justify-between h-full relative group hover:border-[rgba(0,0,0,0.2)] transition-all">
      <Quote className="w-8 h-8 text-[rgba(0,0,0,0.05)] absolute top-4 right-4 group-hover:text-[rgba(0,0,0,0.1)] transition-colors" />

      <div>
        <div className="flex items-center space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'fill-[#4aabb8] text-[#4aabb8]' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        <p className="text-sm md:text-base text-gray-700 italic leading-relaxed mb-6">{t("\"")}{t(testimonial.comment)}{t("\"")}</p>
      </div>

      <div className="flex items-center space-x-3 pt-4 border-t border-[rgba(0,0,0,0.05)]">
        <img
          src={testimonial.avatar}
          alt={t(testimonial.name)}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
          loading="lazy"
        />
        <div>
          <h4 className="text-sm font-bold text-[rgb(38,38,38)] leading-tight">{t(testimonial.name)}</h4>
          <p className="text-xs text-gray-500">{t(testimonial.role)}</p>
          <span className="text-[10px] text-gray-400 font-medium block">{t(testimonial.courseName)}</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Award, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Course } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { COURSE_TRANSLATIONS } from '../../translations/courseTranslations';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { language, t } = useLanguage();
  const isLanguage = course.category === 'language';
  const targetLink = isLanguage
    ? `/courses/${course.slug}`
    : `/courses/smm/${course.slug}`;

  const localizedText = COURSE_TRANSLATIONS[language]?.[course.id];
  const title = localizedText?.title || course.title;
  const description = localizedText?.description || course.description;
  const level = localizedText?.level || course.level;
  const duration = localizedText?.duration || course.duration;

  return (
    <div className="bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={course.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {isLanguage ? (
            <Badge variant="primary" className="shadow-xs">
              <span className="mr-1">{course.flagEmoji}</span>
              {course.language}
            </Badge>
          ) : (
            <Badge variant="accent" className="shadow-xs uppercase">
              SMM {course.tier}
            </Badge>
          )}
        </div>
        {'niceExchangeAddon' in course && course.niceExchangeAddon && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent" className="flex items-center space-x-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>Nice Program</span>
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {duration}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Award className="w-3.5 h-3.5 mr-1" />
              {level}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[rgb(38,38,38)] group-hover:text-black transition-colors mb-2 line-clamp-1">
            {title}
          </h3>

          <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        <div>
          <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block uppercase font-medium">Starting at</span>
              <span className="text-lg font-extrabold text-black">{course.price}</span>
            </div>
            <Link to={targetLink}>
              <span className="inline-flex items-center text-xs md:text-sm font-bold text-black hover:underline group-hover:translate-x-1 transition-transform">
                {t.courses.viewDetails} <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

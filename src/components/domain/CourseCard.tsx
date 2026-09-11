import { useT } from '../../i18n/useLanguage';
import { Link } from 'react-router-dom';
import React from 'react';
import { Clock, Award, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const t = useT();
  const isLanguage = course.category === 'language';

  return (
    <div className="group relative bg-white rounded-[1.5rem] border border-[#4aabb8]/15 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={t(course.title)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {isLanguage ? (
            <Badge variant="accent" className="bg-[#4aabb8] text-white border-none shadow-sm">
              <span className="mr-1.5 font-normal">{t(course.flagEmoji)}</span>
              {t(course.language)}
            </Badge>
          ) : (
            <Badge variant="accent" className="bg-[#4aabb8] text-white border-none uppercase shadow-sm">{t("SMM")}{' '}{t(course.tier)}
            </Badge>
          )}
        </div>

        {'niceExchangeAddon' in course && course.niceExchangeAddon && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 backdrop-blur-md text-[#2b7a85] border-none shadow-sm flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#4aabb8]" />
              <span className="text-[11px] font-semibold">{t("Nice Option")}</span>
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 text-xs font-medium text-[#222222]/60 mb-3">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-[#4aabb8]" />
              {t(course.duration)}
            </span>
            <span>{t("•")}</span>
            <span className="flex items-center">
              <Award className="w-3.5 h-3.5 mr-1 text-[#4aabb8]" />
              {t(course.level)}
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold text-[#222222] group-hover:text-[#4aabb8] transition-colors mb-2 break-words">
            <Link to={isLanguage ? `/courses/${course.slug}` : `/courses/smm/${course.tier}`}>{t(course.title)}</Link>
          </h3>

          <p className="text-sm text-[#222222]/70 leading-relaxed mb-6 line-clamp-2">
            {t(course.description)}
          </p>
        </div>

      </div>
    </div>
  );
};

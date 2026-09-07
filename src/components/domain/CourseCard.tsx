import React from 'react';
import { Clock, Award, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const isLanguage = course.category === 'language';

  return (
    <div className="group relative bg-white rounded-[1.5rem] border border-[#4aabb8]/15 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {isLanguage ? (
            <Badge variant="accent" className="bg-[#4aabb8] text-white border-none shadow-sm">
              <span className="mr-1.5 font-normal">{course.flagEmoji}</span>
              {course.language}
            </Badge>
          ) : (
            <Badge variant="accent" className="bg-[#4aabb8] text-white border-none uppercase shadow-sm">
              SMM {course.tier}
            </Badge>
          )}
        </div>

        {'niceExchangeAddon' in course && course.niceExchangeAddon && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 backdrop-blur-md text-[#2b7a85] border-none shadow-sm flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#4aabb8]" />
              <span className="text-[11px] font-semibold">Nice Option</span>
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
              {course.duration}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Award className="w-3.5 h-3.5 mr-1 text-[#4aabb8]" />
              {course.level}
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold text-[#222222] group-hover:text-[#4aabb8] transition-colors mb-2 line-clamp-1">
            {course.title}
          </h3>

          <p className="text-sm text-[#222222]/70 leading-relaxed mb-6 line-clamp-2">
            {course.description}
          </p>
        </div>

      </div>
    </div>
  );
};

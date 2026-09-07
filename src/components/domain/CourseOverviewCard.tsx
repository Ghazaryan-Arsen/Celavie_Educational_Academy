import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Clock, Globe, Award, Sparkles, Check } from 'lucide-react';
import type { Course } from '../../types';

interface CourseOverviewCardProps {
  course: Course;
}

export const CourseOverviewCard: React.FC<CourseOverviewCardProps> = ({ course }) => {
  const isLanguage = course.category === 'language';

  return (
    <div className="bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6 pb-6 border-b border-[rgba(0,0,0,0.08)]">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="secondary" className="uppercase">
              {course.category}
            </Badge>
            {isLanguage && <Badge variant="primary">{course.language}</Badge>}
            {'tier' in course && <Badge variant="accent" className="uppercase">{course.tier} Tier</Badge>}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[rgb(38,38,38)]">
            {course.title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">{course.subtitle}</p>
        </div>

        <div className="bg-[rgba(0,0,0,0.02)] p-4 rounded-[6px] border border-[rgba(0,0,0,0.05)] text-center shrink-0 min-w-[180px] flex items-center">
          <Link to={`/register?course=${course.id}`} className="block w-full">
            <Button variant="primary" className="w-full" size="sm">
              Enroll Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-[6px] bg-[rgba(0,0,0,0.03)] flex items-center space-x-3">
          <Clock className="w-5 h-5 text-black shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Duration</span>
            <span className="text-xs md:text-sm font-semibold text-black">{course.duration}</span>
          </div>
        </div>

        <div className="p-3 rounded-[6px] bg-[rgba(0,0,0,0.03)] flex items-center space-x-3">
          <Award className="w-5 h-5 text-black shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Level</span>
            <span className="text-xs md:text-sm font-semibold text-black">{course.level}</span>
          </div>
        </div>

        <div className="p-3 rounded-[6px] bg-[rgba(0,0,0,0.03)] flex items-center space-x-3">
          <Globe className="w-5 h-5 text-black shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Format</span>
            <span className="text-xs md:text-sm font-semibold text-black">Live Online</span>
          </div>
        </div>

        <div className="p-3 rounded-[6px] bg-[rgba(0,0,0,0.03)] flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-[#FFD700] shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Certificate</span>
            <span className="text-xs md:text-sm font-semibold text-black">Official Certificate</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Key Features Included</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {course.features.map((feat, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

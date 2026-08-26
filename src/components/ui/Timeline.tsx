import React from 'react';

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div className="relative border-l-2 border-[rgba(0,0,0,0.1)] ml-4 md:ml-6 space-y-8 py-2">
      {steps.map((item) => (
        <div key={item.step} className="relative pl-6 md:pl-8 group">
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-md transition-transform group-hover:scale-110">
            {item.step}
          </div>
          <div className="bg-white p-4 md:p-5 rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-xs">
            <h4 className="text-base md:text-lg font-bold text-[rgb(38,38,38)] mb-1">
              {item.title}
            </h4>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

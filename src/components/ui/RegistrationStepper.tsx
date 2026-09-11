import { useT } from '../../i18n/useLanguage';
import React from 'react';
import { Check } from 'lucide-react';

interface RegistrationStepperProps {
  steps: string[];
  currentStep: number;
}

export const RegistrationStepper: React.FC<RegistrationStepperProps> = ({ steps, currentStep }) => {
  const t = useT();
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[rgba(0,0,0,0.1)] -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative z-10 bg-white px-2">
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                  isCompleted
                    ? 'bg-black text-white border-black'
                    : isCurrent
                    ? 'bg-[#4aabb8] text-black border-black'
                    : 'bg-white text-gray-400 border-[rgba(0,0,0,0.2)]'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium transition-colors ${
                  isCurrent ? 'text-black font-bold' : 'text-gray-500'
                }`}
              >
                {t(label)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

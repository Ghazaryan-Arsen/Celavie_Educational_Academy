import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQAccordionItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
  allowMultiple?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="border border-[rgba(0,0,0,0.1)] rounded-[8px] bg-white overflow-hidden transition-all shadow-xs"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left font-semibold text-[rgb(38,38,38)] hover:bg-[rgba(0,0,0,0.02)] transition focus:outline-none focus:ring-2 focus:ring-[rgb(0,0,0)]"
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-5 md:px-5 text-sm md:text-base text-gray-600 border-t border-[rgba(0,0,0,0.05)] pt-3 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

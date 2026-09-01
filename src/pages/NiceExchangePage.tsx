import React from 'react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { NiceExchangeSection } from '../components/domain/NiceExchangeSection';

export const NiceExchangePage: React.FC = () => {
  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb items={[{ label: 'Nice Exchange Program' }]} />
        </div>
      </div>

      {/* Main Nice Exchange Content & Form */}
      <NiceExchangeSection />
    </div>
  );
};

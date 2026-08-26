import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  courseId?: string;
  isPopular?: boolean;
  ctaText?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  courseId,
  isPopular = false,
  ctaText = 'Get Started',
}) => {
  return (
    <div
      className={`bg-white rounded-[8px] border p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative ${
        isPopular
          ? 'border-black shadow-xl ring-2 ring-black scale-102 z-10'
          : 'border-[rgba(0,0,0,0.1)] shadow-xs hover:shadow-md'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="accent" className="px-4 py-1 text-xs uppercase tracking-wider font-extrabold shadow-sm">
            Most Popular
          </Badge>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-[rgb(38,38,38)] mb-2">{title}</h3>
        <p className="text-xs md:text-sm text-gray-500 min-h-[40px] leading-relaxed mb-6">
          {description}
        </p>

        <div className="mb-6">
          <span className="text-3xl md:text-4xl font-black text-black">{price}</span>
          <span className="text-xs text-gray-400 font-medium ml-1">/ program</span>
        </div>

        <div className="space-y-3 pt-6 border-t border-[rgba(0,0,0,0.06)] mb-8">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
            What's included
          </span>
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs md:text-sm text-gray-700">
              <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <Link to={courseId ? `/register?course=${courseId}` : '/register'}>
        <Button
          variant={isPopular ? 'primary' : 'outline'}
          className="w-full"
          size="md"
        >
          {ctaText}
        </Button>
      </Link>
    </div>
  );
};

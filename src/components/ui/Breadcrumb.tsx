import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs md:text-sm text-gray-500 py-3 ${className}`}>
      <ol className="flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li>
          <Link to="/" className="flex items-center text-gray-500 hover:text-black transition-colors">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400" />
            {item.href ? (
              <Link to={item.href} className="text-gray-500 hover:text-black transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-black truncate max-w-[200px] md:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

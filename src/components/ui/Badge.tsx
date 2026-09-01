import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  const variants = {
    primary: 'bg-[rgb(0,0,0)] text-white',
    secondary: 'bg-[rgba(0,0,0,0.08)] text-[rgb(38,38,38)]',
    accent: 'bg-[#FFD700] text-black font-semibold',
    outline: 'border border-[rgba(0,0,0,0.2)] text-[rgb(38,38,38)] bg-transparent',
    success: 'bg-green-100 text-green-800 border border-green-200',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide',
          variants[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
};

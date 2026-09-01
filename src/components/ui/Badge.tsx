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
    primary: 'bg-[#4aabb8]/10 text-[#2b7a85] border border-[#4aabb8]/20',
    secondary: 'bg-[#f3f6f7] text-[#222222]',
    accent: 'bg-[#4aabb8] text-white font-semibold shadow-xs',
    outline: 'border border-[#4aabb8]/30 text-[#2b7a85] bg-transparent',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors',
          variants[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
};

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full cursor-pointer';

  const variants = {
    primary:
      'bg-[#4aabb8] text-white hover:bg-[#2b7a85] active:bg-[#2b7a85] focus:ring-[#4aabb8] shadow-sm hover:shadow-md',
    secondary:
      'bg-[#f3f6f7] text-[#222222] hover:bg-[#4aabb8]/10 hover:text-[#4aabb8] focus:ring-[#4aabb8]',
    outline:
      'border border-[#222222]/20 bg-transparent text-[#222222] hover:bg-[#4aabb8]/10 hover:border-[#4aabb8] hover:text-[#4aabb8] focus:ring-[#4aabb8]',
    ghost:
      'bg-transparent text-[#222222] hover:bg-[#4aabb8]/10 hover:text-[#4aabb8] focus:ring-[#4aabb8]',
    accent:
      'bg-[#4aabb8] text-white hover:bg-[#2b7a85] focus:ring-[#4aabb8] shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base font-semibold',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

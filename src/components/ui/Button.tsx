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
    'inline-flex items-center justify-center font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md';

  const variants = {
    primary:
      'bg-[rgb(0,0,0)] text-white hover:bg-[rgb(38,38,38)] active:bg-black focus:ring-[rgb(0,0,0)]',
    secondary:
      'bg-[rgba(0,0,0,0.05)] text-[rgb(38,38,38)] hover:bg-[rgba(0,0,0,0.1)] focus:ring-[rgb(38,38,38)]',
    outline:
      'border border-[rgba(0,0,0,0.2)] bg-transparent text-[rgb(38,38,38)] hover:bg-[rgba(0,0,0,0.05)] focus:ring-[rgb(0,0,0)]',
    ghost:
      'bg-transparent text-[rgb(38,38,38)] hover:bg-[rgba(0,0,0,0.05)] focus:ring-[rgb(0,0,0)]',
    accent:
      'bg-[#FFD700] text-[rgb(0,0,0)] hover:bg-[#e6c200] focus:ring-[#FFD700]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
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

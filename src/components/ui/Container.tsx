import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(clsx('max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full', className))}
      {...props}
    >
      {children}
    </div>
  );
};

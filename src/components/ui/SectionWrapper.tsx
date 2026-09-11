import { useT } from '../../i18n/useLanguage';
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Container } from './Container';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  bg?: 'white' | 'gray' | 'dark' | 'accent';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  containerClassName,
  bg = 'white',
  ...props
}) => {
  const t = useT();
  const bgClasses = {
    white: 'bg-white text-charcoal',
    gray: 'bg-[rgba(0,0,0,0.02)] border-y border-[rgba(0,0,0,0.05)] text-charcoal',
    dark: 'bg-[rgb(38,38,38)] text-white',
    accent: 'bg-[rgba(255,215,0,0.1)] text-charcoal',
  };

  return (
    <section id={id} className={twMerge(clsx('py-12 md:py-16 lg:py-20', bgClasses[bg], className))} {...props}>
      <Container className={containerClassName}>{t(children)}</Container>
    </section>
  );
};

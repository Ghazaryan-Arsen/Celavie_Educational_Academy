import { useT } from '../../i18n/useLanguage';
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
  const t = useT();
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-semibold text-[rgb(38,38,38)] mb-1.5">
            {t(label)} {props.required && <span className="text-red-500">{t("*")}</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={error ? textareaId + '-error' : helperText ? textareaId + '-help' : undefined}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 rounded-[6px] border text-sm text-[rgb(38,38,38)] bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(0,0,0)] focus:border-transparent transition min-h-[100px]',
              error ? 'border-red-500 ring-1 ring-red-500' : 'border-[rgba(0,0,0,0.15)]',
              className
            )
          )}
          {...props}
        />
        {error ? (
          <p id={textareaId + '-error'} role="alert" className="mt-1 text-xs text-red-600 font-medium">{t(error)}</p>
        ) : helperText ? (
          <p id={textareaId + '-help'} className="mt-1 text-xs text-gray-500">{t(helperText)}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

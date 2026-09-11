import { useT } from '../../i18n/useLanguage';
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder = 'Select an option', className, id, ...props }, ref) => {
  const t = useT();
    const generatedId = React.useId();
    const selectId = id || generatedId;
    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-semibold text-[rgb(38,38,38)] mb-1.5">
            {t(label)} {props.required && <span className="text-red-500">{t("*")}</span>}
          </label>
        )}
        <select
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? selectId + '-error' : undefined}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 rounded-[6px] border text-sm text-[rgb(38,38,38)] bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(0,0,0)] focus:border-transparent transition',
              error ? 'border-red-500 ring-1 ring-red-500' : 'border-[rgba(0,0,0,0.15)]',
              className
            )
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {t(placeholder)}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.label)}
            </option>
          ))}
        </select>
        {error && <p id={selectId + '-error'} role="alert" className="mt-1 text-xs text-red-600 font-medium">{t(error)}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

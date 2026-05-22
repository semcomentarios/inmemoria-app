'use client';

import React from 'react';
import clsx from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-in-dark mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 border-2 rounded-lg',
            'bg-white text-in-dark placeholder-gray-400',
            'focus:outline-none focus:border-in-gold transition-colors',
            error ? 'border-red-500' : 'border-gray-200',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {helperText && <p className="text-gray-500 text-xs mt-1">{helperText}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

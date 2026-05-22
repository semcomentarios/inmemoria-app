'use client';

import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'font-inter font-semibold rounded-lg transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          fullWidth && 'w-full',
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          {
            'bg-in-gold text-in-dark hover:bg-opacity-90': variant === 'primary',
            'border-2 border-in-gold text-in-gold hover:bg-in-gold hover:text-in-dark':
              variant === 'secondary',
            'text-in-gold hover:bg-in-gold hover:bg-opacity-10': variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        {loading ? '...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

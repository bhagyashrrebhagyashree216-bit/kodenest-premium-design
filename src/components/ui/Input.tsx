import React, { forwardRef } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-body-sm',
  md: 'px-4 py-3 text-body',
  lg: 'px-5 py-4 text-body-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = true,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'rounded border bg-white font-sans transition-all duration-150 ease-in-out outline-none placeholder:text-text-muted';
    const stateStyles = error
      ? 'border-accent focus:border-accent'
      : 'border-border focus:border-accent';
    const disabledStyles = disabled
      ? 'bg-border-light cursor-not-allowed opacity-60'
      : '';
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-body-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${sizeStyles[size]} ${stateStyles} ${disabledStyles} ${widthStyles} ${className}`}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-2 text-body-sm text-accent">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-body-sm text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

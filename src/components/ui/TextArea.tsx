import React, { forwardRef } from 'react';

export type TextAreaSize = 'sm' | 'md' | 'lg';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: TextAreaSize;
  fullWidth?: boolean;
  rows?: number;
}

const sizeStyles: Record<TextAreaSize, string> = {
  sm: 'px-3 py-2 text-body-sm',
  md: 'px-4 py-3 text-body',
  lg: 'px-5 py-4 text-body-lg',
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = true,
      rows = 4,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'rounded border bg-white font-sans transition-all duration-150 ease-in-out outline-none placeholder:text-text-muted resize-y';
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
        <textarea
          ref={ref}
          rows={rows}
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

TextArea.displayName = 'TextArea';

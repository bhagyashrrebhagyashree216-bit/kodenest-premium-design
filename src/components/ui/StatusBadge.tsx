import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md';

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-accent/10 text-accent border-accent/20',
  neutral: 'bg-border-light text-text-muted border-border',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-3 py-1 text-caption',
  md: 'px-4 py-1.5 text-body-sm',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center rounded border font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

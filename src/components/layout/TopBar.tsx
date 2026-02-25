import React from 'react';

export type StatusType = 'not-started' | 'in-progress' | 'shipped';

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: StatusType;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  'not-started': {
    label: 'Not Started',
    className: 'bg-border-light text-text-muted border border-border',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-accent/10 text-accent border border-accent/20',
  },
  'shipped': {
    label: 'Shipped',
    className: 'bg-success/10 text-success border border-success/20',
  },
};

export const TopBar: React.FC<TopBarProps> = ({
  projectName,
  currentStep,
  totalSteps,
  status,
}) => {
  const statusStyle = statusConfig[status];

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-10">
      {/* Left: Project Name */}
      <div className="flex items-center">
        <span className="font-serif text-heading-sm text-text-primary">
          {projectName}
        </span>
      </div>

      {/* Center: Progress Indicator */}
      <div className="flex items-center gap-3">
        <span className="text-body-sm text-text-muted">Step</span>
        <span className="font-sans text-body text-text-primary font-medium">
          {currentStep} / {totalSteps}
        </span>
      </div>

      {/* Right: Status Badge */}
      <div className="flex items-center">
        <span
          className={`px-4 py-1.5 rounded text-body-sm font-medium ${statusStyle.className}`}
        >
          {statusStyle.label}
        </span>
      </div>
    </header>
  );
};

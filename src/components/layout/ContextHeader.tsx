import React from 'react';

interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  headline,
  subtext,
}) => {
  return (
    <div className="py-10 px-10 border-b border-border">
      <h1 className="font-serif text-heading-lg text-text-primary mb-4 max-w-text">
        {headline}
      </h1>
      <p className="font-sans text-body-lg text-text-secondary max-w-text leading-relaxed">
        {subtext}
      </p>
    </div>
  );
};

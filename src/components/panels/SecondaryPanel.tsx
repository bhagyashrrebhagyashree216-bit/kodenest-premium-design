import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface SecondaryPanelProps {
  stepExplanation: string;
  promptText: string;
  onCopyPrompt?: () => void;
  onBuildInLovable?: () => void;
  onItWorked?: () => void;
  onError?: () => void;
  onAddScreenshot?: () => void;
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({
  stepExplanation,
  promptText,
  onCopyPrompt,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    onCopyPrompt?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[30%] min-w-[320px] bg-white border-l border-border flex flex-col">
      {/* Step Explanation */}
      <div className="p-6 border-b border-border">
        <h3 className="font-serif text-heading-sm text-text-primary mb-4">
          Step Explanation
        </h3>
        <p className="text-body text-text-secondary leading-relaxed">
          {stepExplanation}
        </p>
      </div>

      {/* Prompt Box */}
      <div className="flex-1 p-6 overflow-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Copyable Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background border border-border rounded p-4 mb-4">
              <pre className="text-body-sm text-text-primary font-mono whitespace-pre-wrap break-words">
                {promptText}
              </pre>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="w-full"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Prompt
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="md"
            onClick={onBuildInLovable}
            className="w-full"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Build in Lovable
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={onItWorked}
              className="w-full"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              It Worked
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={onError}
              className="w-full"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Error
            </Button>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={onAddScreenshot}
            className="w-full"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Add Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};

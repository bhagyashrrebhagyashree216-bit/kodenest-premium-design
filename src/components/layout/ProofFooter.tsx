import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  proof: string;
  isComplete: boolean;
}

interface ProofFooterProps {
  items?: ChecklistItem[];
  onProofSubmit?: (id: string, proof: string) => void;
}

const defaultItems: ChecklistItem[] = [
  { id: 'ui', label: 'UI Built', proof: '', isComplete: false },
  { id: 'logic', label: 'Logic Working', proof: '', isComplete: false },
  { id: 'test', label: 'Test Passed', proof: '', isComplete: false },
  { id: 'deploy', label: 'Deployed', proof: '', isComplete: false },
];

export const ProofFooter: React.FC<ProofFooterProps> = ({
  items = defaultItems,
  onProofSubmit,
}) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(items);

  const handleProofChange = (id: string, value: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, proof: value } : item
      )
    );
  };

  const handleToggleComplete = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
    const item = checklist.find((i) => i.id === id);
    if (item && onProofSubmit) {
      onProofSubmit(id, item.proof);
    }
  };

  return (
    <footer className="bg-white border-t border-border py-6 px-10">
      <div className="flex items-start gap-10">
        <span className="text-body-sm text-text-muted font-medium uppercase tracking-wide pt-3">
          Proof Checklist
        </span>
        <div className="flex-1 flex flex-wrap gap-8">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-start gap-4 min-w-[240px]">
              <button
                onClick={() => handleToggleComplete(item.id)}
                className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all duration-150 ease-in-out ${
                  item.isComplete
                    ? 'bg-success border-success text-white'
                    : 'border-border bg-white hover:border-text-secondary'
                }`}
              >
                {item.isComplete && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <div className="flex flex-col gap-2">
                <span
                  className={`text-body font-medium ${
                    item.isComplete ? 'text-success' : 'text-text-primary'
                  }`}
                >
                  {item.label}
                </span>
                <input
                  type="text"
                  placeholder="Add proof..."
                  value={item.proof}
                  onChange={(e) => handleProofChange(item.id, e.target.value)}
                  className="w-48 px-3 py-1.5 text-body-sm border border-border rounded bg-background focus:outline-none focus:border-accent transition-all duration-150 ease-in-out"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

import { useState } from 'react';
import {
  TopBar,
  ContextHeader,
  ProofFooter,
  SecondaryPanel,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  StatusBadge,
} from './components';
import type { StatusType } from './components';

function App() {
  const [status, setStatus] = useState<StatusType>('in-progress');
  const [currentStep] = useState(1);

  const samplePrompt = `Create a user authentication flow with the following requirements:

1. Email/password login form
2. Password validation (min 8 chars, 1 uppercase, 1 number)
3. Error handling with clear messages
4. Loading states for all async operations
5. Success redirect to dashboard

Use React Hook Form for validation and React Query for API calls.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={currentStep}
        totalSteps={12}
        status={status}
      />

      {/* Context Header */}
      <ContextHeader
        headline="Design System Foundation"
        subtext="Establish the core visual language, component library, and interaction patterns that will govern the entire product experience."
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Primary Workspace (70%) */}
        <main className="flex-1 p-10 overflow-auto">
          <div className="max-w-4xl">
            {/* Component Showcase */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Component Library Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Buttons */}
                  <div>
                    <h4 className="text-body-sm font-medium text-text-muted mb-3 uppercase tracking-wide">
                      Buttons
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">Primary Button</Button>
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="primary" size="sm">
                        Small Button
                      </Button>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div>
                    <h4 className="text-body-sm font-medium text-text-muted mb-3 uppercase tracking-wide">
                      Inputs
                    </h4>
                    <div className="space-y-4 max-w-md">
                      <Input
                        label="Email Address"
                        placeholder="user@example.com"
                        helperText="We'll never share your email with anyone."
                      />
                      <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error="Password must be at least 8 characters"
                      />
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div>
                    <h4 className="text-body-sm font-medium text-text-muted mb-3 uppercase tracking-wide">
                      Status Badges
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <StatusBadge variant="default">Default</StatusBadge>
                      <StatusBadge variant="success">Success</StatusBadge>
                      <StatusBadge variant="warning">Warning</StatusBadge>
                      <StatusBadge variant="neutral">Neutral</StatusBadge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Empty State Example */}
            <Card>
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-border-light flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-text-primary mb-2">
                  No Components Selected
                </h3>
                <p className="text-body text-text-secondary max-w-text mx-auto mb-6">
                  Select a component from the sidebar to view its documentation,
                  props, and usage examples.
                </p>
                <Button variant="secondary" size="sm">
                  Browse Components
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Secondary Panel (30%) */}
        <SecondaryPanel
          stepExplanation="This step establishes the foundational design tokens including colors, typography, spacing, and component primitives. These tokens ensure visual consistency across the entire application."
          promptText={samplePrompt}
          onCopyPrompt={() => console.log('Prompt copied')}
          onBuildInLovable={() => console.log('Build in Lovable')}
          onItWorked={() => setStatus('shipped')}
          onError={() => console.log('Error reported')}
          onAddScreenshot={() => console.log('Screenshot added')}
        />
      </div>

      {/* Proof Footer */}
      <ProofFooter
        onProofSubmit={(id, proof) =>
          console.log(`Proof submitted for ${id}:`, proof)
        }
      />
    </div>
  );
}

export default App;

const TEST_CHECKLIST_KEY = 'placement_prep_test_checklist';

export interface TestItem {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
}

export interface TestChecklist {
  items: TestItem[];
  lastUpdated: string;
}

const DEFAULT_TEST_ITEMS: TestItem[] = [
  {
    id: 'jd-required',
    label: 'JD required validation works',
    hint: 'Go to JD Analyzer, try clicking Analyze with empty JD. Should be blocked.',
    checked: false,
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Paste a JD with less than 200 characters. Amber warning should appear.',
    checked: false,
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze a JD with various skills. Check they appear in correct categories (Core CS, Web, etc.).',
    checked: false,
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Try Amazon (Enterprise) vs UnknownStartup. Round count and types should differ.',
    checked: false,
  },
  {
    id: 'score-deterministic',
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice. Base score should be identical.',
    checked: false,
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On results page, toggle skills. Score should update +2/-2 immediately.',
    checked: false,
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, refresh page. Changes should remain.',
    checked: false,
  },
  {
    id: 'history-load',
    label: 'History saves and loads correctly',
    hint: 'Check History page. Previous analyses should be listed with correct scores.',
    checked: false,
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click Copy buttons. Clipboard should have correct plan/checklist/questions.',
    checked: false,
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open browser DevTools. Navigate through all pages. No red errors should appear.',
    checked: false,
  },
];

export function getTestChecklist(): TestChecklist {
  try {
    const stored = localStorage.getItem(TEST_CHECKLIST_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as TestChecklist;
      // Validate structure
      if (parsed.items && Array.isArray(parsed.items) && parsed.items.length === 10) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load test checklist:', error);
  }
  
  // Return default if no valid stored data
  return {
    items: DEFAULT_TEST_ITEMS.map(item => ({ ...item })),
    lastUpdated: new Date().toISOString(),
  };
}

export function saveTestChecklist(checklist: TestChecklist): void {
  try {
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify({
      ...checklist,
      lastUpdated: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to save test checklist:', error);
  }
}

export function toggleTestItem(itemId: string): void {
  const checklist = getTestChecklist();
  const item = checklist.items.find(i => i.id === itemId);
  if (item) {
    item.checked = !item.checked;
    saveTestChecklist(checklist);
  }
}

export function resetTestChecklist(): void {
  saveTestChecklist({
    items: DEFAULT_TEST_ITEMS.map(item => ({ ...item })),
    lastUpdated: new Date().toISOString(),
  });
}

export function getCheckedCount(): number {
  const checklist = getTestChecklist();
  return checklist.items.filter(item => item.checked).length;
}

export function isAllTestsPassed(): boolean {
  return getCheckedCount() === 10;
}

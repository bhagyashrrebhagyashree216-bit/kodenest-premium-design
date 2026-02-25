import type { AnalysisResult, SkillConfidence } from './skillExtractor';

const STORAGE_KEY = 'placement_prep_history';

export interface HistoryEntry extends AnalysisResult {}

// Validation error type
export interface HistoryLoadResult {
  entries: HistoryEntry[];
  corruptedCount: number;
  errorMessage?: string;
}

// Validate that an entry matches the expected schema
function isValidEntry(entry: unknown): entry is HistoryEntry {
  if (!entry || typeof entry !== 'object') return false;
  
  const e = entry as Record<string, unknown>;
  
  // Required fields
  if (typeof e.id !== 'string') return false;
  if (typeof e.createdAt !== 'string') return false;
  if (typeof e.updatedAt !== 'string') return false;
  if (typeof e.company !== 'string') return false;
  if (typeof e.role !== 'string') return false;
  if (typeof e.jdText !== 'string') return false;
  if (!e.extractedSkills || typeof e.extractedSkills !== 'object') return false;
  if (!Array.isArray(e.roundMapping)) return false;
  if (!Array.isArray(e.checklist)) return false;
  if (!Array.isArray(e.plan7Days)) return false;
  if (!Array.isArray(e.questions)) return false;
  if (typeof e.baseScore !== 'number') return false;
  if (!e.skillConfidenceMap || typeof e.skillConfidenceMap !== 'object') return false;
  if (typeof e.finalScore !== 'number') return false;
  
  return true;
}

export function saveAnalysis(result: AnalysisResult): void {
  try {
    const existing = getHistory();
    const updated = [result, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save analysis:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    
    // Filter out corrupted entries
    const validEntries: HistoryEntry[] = [];
    let corruptedCount = 0;
    
    for (const entry of parsed) {
      if (isValidEntry(entry)) {
        validEntries.push(entry);
      } else {
        corruptedCount++;
      }
    }
    
    // Store corruption info for UI to display
    if (corruptedCount > 0) {
      localStorage.setItem(`${STORAGE_KEY}_corrupted`, JSON.stringify({
        count: corruptedCount,
        timestamp: new Date().toISOString(),
      }));
    }
    
    return validEntries;
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
}

export function getCorruptionInfo(): { count: number; message: string } | null {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_corrupted`);
    if (!stored) return null;
    
    const info = JSON.parse(stored);
    return {
      count: info.count || 0,
      message: 'One saved entry couldn\'t be loaded. Create a new analysis.',
    };
  } catch {
    return null;
  }
}

export function clearCorruptionInfo(): void {
  localStorage.removeItem(`${STORAGE_KEY}_corrupted`);
}

export function getAnalysisById(id: string): HistoryEntry | null {
  const history = getHistory();
  return history.find(entry => entry.id === id) || null;
}

export function deleteAnalysis(id: string): void {
  try {
    const existing = getHistory();
    const filtered = existing.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete analysis:', error);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_corrupted`);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

export function getLatestAnalysis(): HistoryEntry | null {
  const history = getHistory();
  return history.length > 0 ? history[0] : null;
}

// Update analysis with skill confidence changes - updates finalScore and updatedAt
export function updateAnalysis(
  id: string,
  skillConfidenceMap: Record<string, SkillConfidence>,
  finalScore: number
): void {
  try {
    const existing = getHistory();
    const updated = existing.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          skillConfidenceMap,
          finalScore,
          updatedAt: new Date().toISOString(),
        };
      }
      return entry;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update analysis:', error);
  }
}

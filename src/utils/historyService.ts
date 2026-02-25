import type { AnalysisResult } from './skillExtractor';

const STORAGE_KEY = 'placement_prep_history';

export interface HistoryEntry extends AnalysisResult {}

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
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
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
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

export function getLatestAnalysis(): HistoryEntry | null {
  const history = getHistory();
  return history.length > 0 ? history[0] : null;
}

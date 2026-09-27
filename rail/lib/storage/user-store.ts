'use client';

const DRAFT_PREFIX = 'dsa_code_draft_';
const HINTS_PREFIX = 'dsa_hints_unlocked_';
const SOL_PREFIX = 'dsa_sol_unlocked_';

export const userStore = {
  getCodeDraft(problemSlug: string, language: string, defaultCode: string): string {
    if (typeof window === 'undefined') return defaultCode;
    const key = `${DRAFT_PREFIX}${problemSlug}_${language}`;
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : defaultCode;
  },

  saveCodeDraft(problemSlug: string, language: string, code: string): void {
    if (typeof window === 'undefined') return;
    const key = `${DRAFT_PREFIX}${problemSlug}_${language}`;
    localStorage.setItem(key, code);
  },

  getUnlockedHints(problemSlug: string): number {
    if (typeof window === 'undefined') return 0;
    const key = `${HINTS_PREFIX}${problemSlug}`;
    const val = localStorage.getItem(key);
    return val ? parseInt(val, 10) : 0;
  },

  unlockHint(problemSlug: string, hintIndex: number): number {
    if (typeof window === 'undefined') return hintIndex;
    const key = `${HINTS_PREFIX}${problemSlug}`;
    const current = this.getUnlockedHints(problemSlug);
    const updated = Math.max(current, hintIndex);
    localStorage.setItem(key, updated.toString());
    return updated;
  },

  isSolutionUnlocked(problemSlug: string): boolean {
    if (typeof window === 'undefined') return false;
    const key = `${SOL_PREFIX}${problemSlug}`;
    return localStorage.getItem(key) === 'true';
  },

  unlockSolution(problemSlug: string): void {
    if (typeof window === 'undefined') return;
    const key = `${SOL_PREFIX}${problemSlug}`;
    localStorage.setItem(key, 'true');
  }
};


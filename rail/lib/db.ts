import fs from 'fs';
import path from 'path';
import {
  TOPICS,
  COMPANIES,
  PROBLEMS,
  TopicItem,
  CompanyItem,
  ProblemItem,
} from './dsa-data';

export interface UserProgressRecord {
  problemId: string;
  problemSlug: string;
  status: 'UNSOLVED' | 'ATTEMPTED' | 'SOLVED' | 'MASTERED';
  bestIndependence: number; // 0 to 100
  hintsRevealed: number;
  solutionRevealed: boolean;
  attemptsCount: number;
  solvedAt?: string;
  lastAttemptedAt: string;
  timeSpentSeconds: number;
}

export interface SubmissionRecord {
  id: string;
  problemSlug: string;
  problemTitle: string;
  language: string;
  code: string;
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
  runtimeMs: number;
  memoryKb: number;
  hintsUsedCount: number;
  independence: number;
  createdAt: string;
}

export interface RevisionRecord {
  id: string;
  problemSlug: string;
  problemTitle: string;
  topicSlug: string;
  category: 'NEEDS_REVISION' | 'FREQUENTLY_FAILED' | 'SOLVED_WITH_HINTS' | 'SOLVED_SLOWLY' | 'MASTERED';
  intervalDays: number; // 1, 3, 7, 14, 30
  nextReviewDate: string;
  reviewCount: number;
  notes?: string;
}

export interface MockInterviewRecord {
  id: string;
  targetCompany: string;
  difficulty: string;
  durationMinutes: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  score?: number;
  feedback?: string;
  startedAt: string;
  completedAt?: string;
  problems: {
    slug: string;
    title: string;
    difficulty: string;
    status: 'SOLVED' | 'UNSOLVED';
    timeSpentSec: number;
    hintsUsed: number;
  }[];
}

interface AppState {
  problems: ProblemItem[];
  userProgress: Record<string, UserProgressRecord>;
  submissions: SubmissionRecord[];
  bookmarks: string[]; // problem slugs
  notes: Record<string, string>; // problemSlug -> content
  revisionQueue: RevisionRecord[];
  mockInterviews: MockInterviewRecord[];
  userStats: {
    xp: number;
    streak: number;
    lastActiveDate: string;
    targetCompany: string;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const STATE_FILE = path.join(DATA_DIR, 'app-state.json');

function initializeState(): AppState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Merge with base problems so any new curated ones are always present
      const existingSlugs = new Set(parsed.problems?.map((p: ProblemItem) => p.slug) || []);
      const mergedProblems = [...(parsed.problems || [])];
      for (const p of PROBLEMS) {
        if (!existingSlugs.has(p.slug)) {
          mergedProblems.push(p);
        }
      }
      parsed.problems = mergedProblems;
      return parsed;
    }
  } catch (err) {
    console.error('Error reading state file, using initial state', err);
  }

  const initialState: AppState = {
    problems: PROBLEMS,
    userProgress: {
      'two-sum': {
        problemId: 'prob-two-sum',
        problemSlug: 'two-sum',
        status: 'SOLVED',
        bestIndependence: 100,
        hintsRevealed: 0,
        solutionRevealed: false,
        attemptsCount: 1,
        solvedAt: new Date(Date.now() - 86400000).toISOString(),
        lastAttemptedAt: new Date(Date.now() - 86400000).toISOString(),
        timeSpentSeconds: 420
      },
      'valid-parentheses': {
        problemId: 'prob-valid-parentheses',
        problemSlug: 'valid-parentheses',
        status: 'SOLVED',
        bestIndependence: 75,
        hintsRevealed: 1,
        solutionRevealed: false,
        attemptsCount: 2,
        solvedAt: new Date().toISOString(),
        lastAttemptedAt: new Date().toISOString(),
        timeSpentSeconds: 610
      }
    },
    submissions: [
      {
        id: 'sub-1',
        problemSlug: 'two-sum',
        problemTitle: 'Two Sum',
        language: 'python',
        code: `class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen: return [seen[diff], i]\n            seen[num] = i\n        return []`,
        status: 'ACCEPTED',
        runtimeMs: 48,
        memoryKb: 17200,
        hintsUsedCount: 0,
        independence: 100,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'sub-2',
        problemSlug: 'valid-parentheses',
        problemTitle: 'Valid Parentheses',
        language: 'python',
        code: `class Solution:\n    def isValid(self, s):\n        st = []\n        m = {')':'(', '}':'{', ']':'['}\n        for c in s:\n            if c in m:\n                if not st or st.pop() != m[c]: return False\n            else: st.append(c)\n        return not st`,
        status: 'ACCEPTED',
        runtimeMs: 36,
        memoryKb: 16800,
        hintsUsedCount: 1,
        independence: 75,
        createdAt: new Date().toISOString()
      }
    ],
    bookmarks: ['two-sum', 'coin-change'],
    notes: {
      'two-sum': 'Remember: Checking for complement before inserting prevents matching the element with itself!'
    },
    revisionQueue: [
      {
        id: 'rev-1',
        problemSlug: 'valid-parentheses',
        problemTitle: 'Valid Parentheses',
        topicSlug: 'stacks-queues',
        category: 'SOLVED_WITH_HINTS',
        intervalDays: 3,
        nextReviewDate: new Date(Date.now() + 3 * 86400000).toISOString(),
        reviewCount: 1,
        notes: 'Used Hint 1 for conceptual stack trigger. Practice closing bracket edge cases.'
      }
    ],
    mockInterviews: [
      {
        id: 'mock-1',
        targetCompany: 'Amazon',
        difficulty: 'Standard SDE-1',
        durationMinutes: 60,
        status: 'COMPLETED',
        score: 88,
        feedback: 'Strong problem solving on Valid Parentheses. Good syntax control. Fast time to solve.',
        startedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        completedAt: new Date(Date.now() - 2 * 86400000 + 45 * 60000).toISOString(),
        problems: [
          {
            slug: 'two-sum',
            title: 'Two Sum',
            difficulty: 'Easy',
            status: 'SOLVED',
            timeSpentSec: 420,
            hintsUsed: 0
          },
          {
            slug: 'valid-parentheses',
            title: 'Valid Parentheses',
            difficulty: 'Easy',
            status: 'SOLVED',
            timeSpentSec: 610,
            hintsUsed: 1
          }
        ]
      }
    ],
    userStats: {
      xp: 450,
      streak: 5,
      lastActiveDate: new Date().toISOString().split('T')[0],
      targetCompany: 'Amazon'
    }
  };

  saveState(initialState);
  return initialState;
}

function saveState(state: AppState) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save state to disk', err);
  }
}

// Global cached state in server memory
let state: AppState = initializeState();

export const db = {
  // Topics
  getTopics(): TopicItem[] {
    return TOPICS;
  },

  getTopicBySlug(slug: string): TopicItem | undefined {
    return TOPICS.find((t) => t.slug === slug);
  },

  // Companies
  getCompanies(): CompanyItem[] {
    return COMPANIES;
  },

  getCompanyBySlug(slug: string): CompanyItem | undefined {
    return COMPANIES.find((c) => c.slug === slug);
  },

  // Problems
  getProblems(filters?: {
    topic?: string;
    difficulty?: string;
    company?: string;
    status?: string;
    search?: string;
    pattern?: string;
  }): ProblemItem[] {
    let list = state.problems;

    if (filters?.topic) {
      list = list.filter((p) => p.topicSlug === filters.topic);
    }

    if (filters?.difficulty && filters.difficulty !== 'All') {
      list = list.filter((p) => p.difficulty.toLowerCase() === filters.difficulty?.toLowerCase());
    }

    if (filters?.company && filters.company !== 'All') {
      list = list.filter((p) =>
        p.companies.some((c) => c.companySlug.toLowerCase() === filters.company?.toLowerCase())
      );
    }

    if (filters?.pattern && filters.pattern !== 'All') {
      list = list.filter((p) =>
        p.patterns.some((pat) => pat.toLowerCase().includes(filters.pattern!.toLowerCase()))
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topicSlug.toLowerCase().includes(q) ||
          p.subtopic.toLowerCase().includes(q) ||
          p.companies.some((c) => c.companyName.toLowerCase().includes(q)) ||
          p.patterns.some((pat) => pat.toLowerCase().includes(q))
      );
    }

    if (filters?.status) {
      if (filters.status === 'Solved') {
        list = list.filter((p) => state.userProgress[p.slug]?.status === 'SOLVED');
      } else if (filters.status === 'Unsolved') {
        list = list.filter((p) => !state.userProgress[p.slug] || state.userProgress[p.slug]?.status !== 'SOLVED');
      } else if (filters.status === 'Bookmarked') {
        list = list.filter((p) => state.bookmarks.includes(p.slug));
      } else if (filters.status === 'Revision') {
        const revSlugs = state.revisionQueue.map((r) => r.problemSlug);
        list = list.filter((p) => revSlugs.includes(p.slug));
      }
    }

    return list;
  },

  getProblemBySlug(slug: string): ProblemItem | undefined {
    return state.problems.find((p) => p.slug === slug);
  },

  createProblem(problem: ProblemItem): ProblemItem {
    state.problems.push(problem);
    saveState(state);
    return problem;
  },

  updateProblem(slug: string, updates: Partial<ProblemItem>): ProblemItem | undefined {
    const idx = state.problems.findIndex((p) => p.slug === slug);
    if (idx === -1) return undefined;
    state.problems[idx] = { ...state.problems[idx], ...updates };
    saveState(state);
    return state.problems[idx];
  },

  deleteProblem(slug: string): boolean {
    const prevLen = state.problems.length;
    state.problems = state.problems.filter((p) => p.slug !== slug);
    if (state.problems.length !== prevLen) {
      saveState(state);
      return true;
    }
    return false;
  },

  // User Progress
  getUserProgress(): Record<string, UserProgressRecord> {
    return state.userProgress;
  },

  getProblemProgress(slug: string): UserProgressRecord | undefined {
    return state.userProgress[slug];
  },

  recordHintUsed(slug: string, hintIndex: number): UserProgressRecord {
    const existing = state.userProgress[slug] || {
      problemId: slug,
      problemSlug: slug,
      status: 'ATTEMPTED',
      bestIndependence: 100,
      hintsRevealed: 0,
      solutionRevealed: false,
      attemptsCount: 0,
      lastAttemptedAt: new Date().toISOString(),
      timeSpentSeconds: 0
    };

    existing.hintsRevealed = Math.max(existing.hintsRevealed, hintIndex);
    existing.lastAttemptedAt = new Date().toISOString();

    // Deduct independence: 0 hints = 100%, 1 hint = 75%, 2 hints = 50%, 3-4 hints = 40%
    if (existing.hintsRevealed === 1) existing.bestIndependence = Math.min(existing.bestIndependence, 75);
    else if (existing.hintsRevealed === 2) existing.bestIndependence = Math.min(existing.bestIndependence, 50);
    else if (existing.hintsRevealed >= 3) existing.bestIndependence = Math.min(existing.bestIndependence, 40);

    state.userProgress[slug] = existing;
    saveState(state);
    return existing;
  },

  recordSolutionRevealed(slug: string): UserProgressRecord {
    const existing = state.userProgress[slug] || {
      problemId: slug,
      problemSlug: slug,
      status: 'ATTEMPTED',
      bestIndependence: 100,
      hintsRevealed: 4,
      solutionRevealed: true,
      attemptsCount: 0,
      lastAttemptedAt: new Date().toISOString(),
      timeSpentSeconds: 0
    };

    existing.solutionRevealed = true;
    existing.bestIndependence = 25; // Reveal solution -> 25% independence (needs practice)
    existing.lastAttemptedAt = new Date().toISOString();

    state.userProgress[slug] = existing;

    // Auto add to revision queue
    const problem = state.problems.find((p) => p.slug === slug);
    if (problem && !state.revisionQueue.some((r) => r.problemSlug === slug)) {
      state.revisionQueue.push({
        id: `rev-${Date.now()}`,
        problemSlug: slug,
        problemTitle: problem.title,
        topicSlug: problem.topicSlug,
        category: 'NEEDS_REVISION',
        intervalDays: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        reviewCount: 0,
        notes: 'Solution was viewed. Revise independently tomorrow.'
      });
    }

    saveState(state);
    return existing;
  },

  recordSubmission(sub: Omit<SubmissionRecord, 'id' | 'createdAt'>): SubmissionRecord {
    const newSub: SubmissionRecord = {
      ...sub,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    state.submissions.unshift(newSub);

    // Update problem progress
    const prev = state.userProgress[sub.problemSlug] || {
      problemId: sub.problemSlug,
      problemSlug: sub.problemSlug,
      status: 'ATTEMPTED',
      bestIndependence: sub.independence,
      hintsRevealed: sub.hintsUsedCount,
      solutionRevealed: false,
      attemptsCount: 0,
      lastAttemptedAt: new Date().toISOString(),
      timeSpentSeconds: 0
    };

    prev.attemptsCount += 1;
    prev.lastAttemptedAt = new Date().toISOString();

    if (sub.status === 'ACCEPTED') {
      prev.status = 'SOLVED';
      prev.solvedAt = new Date().toISOString();
      prev.bestIndependence = Math.max(prev.bestIndependence, sub.independence);

      // Award XP
      state.userStats.xp += sub.independence >= 90 ? 50 : 30;

      // Handle Revision Queue item if mastered
      const revItem = state.revisionQueue.find((r) => r.problemSlug === sub.problemSlug);
      if (revItem) {
        if (sub.independence === 100) {
          revItem.category = 'MASTERED';
          revItem.intervalDays = Math.min(revItem.intervalDays * 2, 30);
          revItem.nextReviewDate = new Date(Date.now() + revItem.intervalDays * 86400000).toISOString();
          revItem.reviewCount += 1;
        }
      }
    } else {
      // Failed submission -> if attempts >= 3, flag for revision
      if (prev.attemptsCount >= 3) {
        const problem = state.problems.find((p) => p.slug === sub.problemSlug);
        if (problem && !state.revisionQueue.some((r) => r.problemSlug === sub.problemSlug)) {
          state.revisionQueue.push({
            id: `rev-${Date.now()}`,
            problemSlug: sub.problemSlug,
            problemTitle: problem.title,
            topicSlug: problem.topicSlug,
            category: 'FREQUENTLY_FAILED',
            intervalDays: 1,
            nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
            reviewCount: 0,
            notes: `Failed ${prev.attemptsCount} times. Core concept review required.`
          });
        }
      }
    }

    state.userProgress[sub.problemSlug] = prev;
    saveState(state);
    return newSub;
  },

  getSubmissions(problemSlug?: string): SubmissionRecord[] {
    if (problemSlug) {
      return state.submissions.filter((s) => s.problemSlug === problemSlug);
    }
    return state.submissions;
  },

  // Bookmarks & Notes
  getBookmarks(): string[] {
    return state.bookmarks;
  },

  toggleBookmark(slug: string): boolean {
    if (state.bookmarks.includes(slug)) {
      state.bookmarks = state.bookmarks.filter((s) => s !== slug);
      saveState(state);
      return false;
    } else {
      state.bookmarks.push(slug);
      saveState(state);
      return true;
    }
  },

  getNote(slug: string): string {
    return state.notes[slug] || '';
  },

  saveNote(slug: string, content: string): void {
    state.notes[slug] = content;
    saveState(state);
  },

  // Revision Queue
  getRevisionQueue(): RevisionRecord[] {
    return state.revisionQueue;
  },

  addToRevision(record: Omit<RevisionRecord, 'id'>): RevisionRecord {
    const existingIdx = state.revisionQueue.findIndex((r) => r.problemSlug === record.problemSlug);
    const newRecord: RevisionRecord = {
      ...record,
      id: `rev-${Date.now()}`
    };
    if (existingIdx !== -1) {
      state.revisionQueue[existingIdx] = newRecord;
    } else {
      state.revisionQueue.push(newRecord);
    }
    saveState(state);
    return newRecord;
  },

  completeRevision(id: string): void {
    const item = state.revisionQueue.find((r) => r.id === id);
    if (item) {
      item.reviewCount += 1;
      item.intervalDays = Math.min(item.intervalDays * 2, 30);
      item.nextReviewDate = new Date(Date.now() + item.intervalDays * 86400000).toISOString();
      if (item.reviewCount >= 3) {
        item.category = 'MASTERED';
      }
      saveState(state);
    }
  },

  // Mock Interviews
  getMockInterviews(): MockInterviewRecord[] {
    return state.mockInterviews;
  },

  createMockInterview(company: string, difficulty: string, durationMinutes: number): MockInterviewRecord {
    // Select 2 or 3 curated problems for company
    const companyItem = COMPANIES.find((c) => c.name.toLowerCase() === company.toLowerCase() || c.slug === company.toLowerCase());
    const matchedSlugs = companyItem?.curatedProblemSlugs || ['two-sum', 'valid-parentheses', 'coin-change'];
    const selectedProblems = state.problems
      .filter((p) => matchedSlugs.includes(p.slug))
      .slice(0, 2)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        status: 'UNSOLVED' as const,
        timeSpentSec: 0,
        hintsUsed: 0
      }));

    const newInterview: MockInterviewRecord = {
      id: `mock-${Date.now()}`,
      targetCompany: company,
      difficulty,
      durationMinutes,
      status: 'IN_PROGRESS',
      startedAt: new Date().toISOString(),
      problems: selectedProblems
    };

    state.mockInterviews.unshift(newInterview);
    saveState(state);
    return newInterview;
  },

  completeMockInterview(
    id: string,
    results: {
      score: number;
      feedback: string;
      problems: {
        slug: string;
        title: string;
        difficulty: string;
        status: 'SOLVED' | 'UNSOLVED';
        timeSpentSec: number;
        hintsUsed: number;
      }[];
    }
  ): MockInterviewRecord | undefined {
    const interview = state.mockInterviews.find((m) => m.id === id);
    if (!interview) return undefined;
    interview.status = 'COMPLETED';
    interview.score = results.score;
    interview.feedback = results.feedback;
    interview.completedAt = new Date().toISOString();
    interview.problems = results.problems;

    state.userStats.xp += Math.round(results.score * 1.5);
    saveState(state);
    return interview;
  },

  // User Stats
  getUserStats() {
    return state.userStats;
  },

  // Content Freshness Monitor for Admin CMS
  getContentFreshness() {
    return {
      totalCuratedProblems: state.problems.length,
      outdatedCompanySources: [
        {
          company: 'Goldman Sachs',
          topic: 'Dynamic Programming',
          lastVerified: '2024-Q2',
          status: 'Review Recommended (>6 months old)'
        },
        {
          company: 'Apple',
          topic: 'Linked Lists',
          lastVerified: '2024-Q2',
          status: 'Review Recommended'
        }
      ],
      highConfidenceCount: state.problems.reduce(
        (acc, p) => acc + p.companies.filter((c) => c.confidenceLevel === 'HIGH').length,
        0
      ),
      communityReportedCount: state.problems.reduce(
        (acc, p) => acc + p.companies.filter((c) => c.confidenceLevel === 'COMMUNITY_REPORTED').length,
        0
      ),
      allTestCasesPassing: true
    };
  }
};


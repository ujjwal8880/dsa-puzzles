'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserProgress, QuestionProgress, XPEvent } from '@/types/gamification';
import type { LearningStep } from '@/types/question';
import { getLevelFromXP, getTodayString, isToday, isYesterday, generateId } from '@/lib/utils';
import { ACHIEVEMENTS } from '@/data/achievements';
import { ALL_QUESTIONS } from '@/data/questions';

interface ProgressState extends UserProgress {
  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  // Actions
  completeStep: (questionSlug: string, step: LearningStep, xp: number) => void;
  startQuestion: (questionSlug: string) => void;
  solveQuestion: (questionSlug: string, hintsUsed: number, timeTaken: number) => void;
  addXP: (amount: number, label: string, questionSlug?: string) => void;
  updateStreak: () => void;
  setLearningMode: (mode: UserProgress['learningMode']) => void;
  checkAchievements: () => void;
  getQuestionProgress: (slug: string) => QuestionProgress | undefined;
  isStepCompleted: (slug: string, step: LearningStep) => boolean;
  resetAll: () => void;
}

const initialProgress: UserProgress = {
  totalXP: 0,
  level: 1,
  levelTitle: 'Curious Beginner',
  streak: 0,
  lastActiveDate: '',
  solvedQuestions: {},
  achievements: [],
  xpHistory: [],
  learningMode: 'explorer',
  currentPath: undefined,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialProgress,
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),

      addXP: (amount, label, questionSlug) => {
        const event: XPEvent = {
          id: generateId(),
          type: 'puzzle_complete',
          label,
          amount,
          timestamp: Date.now(),
          questionSlug,
        };
        set((state) => {
          const newXP = state.totalXP + amount;
          const { level, title } = getLevelFromXP(newXP);
          return {
            totalXP: newXP,
            level,
            levelTitle: title,
            xpHistory: [event, ...state.xpHistory.slice(0, 99)],
          };
        });
      },

      updateStreak: () => {
        const today = getTodayString();
        const { lastActiveDate } = get();
        if (isToday(lastActiveDate)) return;
        set((state) => ({
          streak: isYesterday(lastActiveDate) ? state.streak + 1 : 1,
          lastActiveDate: today,
        }));
      },

      startQuestion: (questionSlug) => {
        set((state) => {
          const existing = state.solvedQuestions[questionSlug];
          if (existing) return state;
          return {
            solvedQuestions: {
              ...state.solvedQuestions,
              [questionSlug]: {
                slug: questionSlug,
                status: 'in_progress',
                steps: {},
                hintsUsed: 0,
                attempts: 0,
                xpEarned: 0,
                isPerfect: false,
              },
            },
          };
        });
      },

      completeStep: (questionSlug, step, xp) => {
        set((state) => {
          const qp = state.solvedQuestions[questionSlug] ?? {
            slug: questionSlug,
            status: 'in_progress' as const,
            steps: {},
            hintsUsed: 0,
            attempts: 0,
            xpEarned: 0,
            isPerfect: false,
          };
          return {
            solvedQuestions: {
              ...state.solvedQuestions,
              [questionSlug]: {
                ...qp,
                steps: { ...qp.steps, [step]: true },
                xpEarned: qp.xpEarned + xp,
              },
            },
          };
        });
        get().addXP(xp, `Completed ${step}`, questionSlug);
        get().updateStreak();
        get().checkAchievements();
      },

      solveQuestion: (questionSlug, hintsUsed, timeTaken) => {
        const isPerfect = hintsUsed === 0;
        set((state) => {
          const qp = state.solvedQuestions[questionSlug] ?? {
            slug: questionSlug,
            status: 'in_progress' as const,
            steps: {},
            hintsUsed: 0,
            attempts: 0,
            xpEarned: 0,
            isPerfect: false,
          };
          return {
            solvedQuestions: {
              ...state.solvedQuestions,
              [questionSlug]: {
                ...qp,
                status: 'solved',
                hintsUsed,
                attempts: qp.attempts + 1,
                solvedAt: Date.now(),
                bestTime: qp.bestTime ? Math.min(qp.bestTime, timeTaken) : timeTaken,
                isPerfect,
              },
            },
          };
        });
        if (isPerfect) {
          get().addXP(50, 'Perfect Solve!', questionSlug);
        }
      },

      setLearningMode: (mode) => set({ learningMode: mode }),

      checkAchievements: () => {
        const state = get();
        const newUnlocks: string[] = [];
        const solved = Object.values(state.solvedQuestions).filter((q) => q.status === 'solved').length;
        const perfects = Object.values(state.solvedQuestions).filter((q) => q.isPerfect).length;

        for (const achievement of ACHIEVEMENTS) {
          if (state.achievements.includes(achievement.id)) continue;
          const { condition } = achievement;
          let unlocked = false;
          if (condition.type === 'questions_solved' && solved >= condition.threshold) unlocked = true;
          if (condition.type === 'perfect_solves' && perfects >= condition.threshold) unlocked = true;
          if (condition.type === 'streak_days' && state.streak >= condition.threshold) unlocked = true;
          if (condition.type === 'xp_total' && state.totalXP >= condition.threshold) unlocked = true;
          if (unlocked) newUnlocks.push(achievement.id);
        }

        if (newUnlocks.length > 0) {
          set((s) => ({ achievements: [...s.achievements, ...newUnlocks] }));
        }
      },

      getQuestionProgress: (slug) => get().solvedQuestions[slug],

      isStepCompleted: (slug, step) => {
        return get().solvedQuestions[slug]?.steps[step] === true;
      },

      resetAll: () => set(initialProgress),
    }),
    {
      name: 'dsa-puzzles-progress',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const questionMap = new Map(ALL_QUESTIONS.map((q) => [q.slug, q]));
          const migrated: typeof state.solvedQuestions = {};
          for (const [slug, progress] of Object.entries(state.solvedQuestions)) {
            const q = questionMap.get(slug);
            const hasCoding = !!q?.codeChallenge;
            const codingDone = progress.steps?.coding === true;
            if (progress.status === 'in_progress') {
              // Promote to solved only if the correct terminal step is done
              const isSolved = hasCoding ? codingDone : progress.steps?.puzzle === true;
              migrated[slug] = isSolved ? { ...progress, status: 'solved' } : progress;
            } else if (progress.status === 'solved' && hasCoding && !codingDone) {
              // Demote: was marked solved before coding was required
              migrated[slug] = { ...progress, status: 'in_progress' };
            } else {
              migrated[slug] = progress;
            }
          }
          state.solvedQuestions = migrated;
          state.setHasHydrated(true);
        }
      },
    }
  )
);

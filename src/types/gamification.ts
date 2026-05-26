export interface XPEvent {
  id: string;
  type: 'puzzle_complete' | 'hint_avoided' | 'perfect_solve' | 'streak' | 'first_attempt' | 'speed_solve';
  label: string;
  amount: number;
  timestamp: number;
  questionSlug?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: AchievementCondition;
  unlockedAt?: number;
}

export interface AchievementCondition {
  type: 'questions_solved' | 'streak_days' | 'category_complete' | 'perfect_solves' | 'xp_total' | 'hint_free';
  threshold: number;
  category?: string;
}

export interface UserProgress {
  totalXP: number;
  level: number;
  levelTitle: string;
  streak: number;
  lastActiveDate: string; // ISO date string
  solvedQuestions: Record<string, QuestionProgress>;
  achievements: string[]; // achievement ids
  xpHistory: XPEvent[];
  learningMode: 'explorer' | 'engineer' | 'interview';
  currentPath?: string;
}

export interface QuestionProgress {
  slug: string;
  status: 'not_started' | 'in_progress' | 'solved' | 'mastered';
  steps: Partial<Record<string, boolean>>; // step id -> completed
  hintsUsed: number;
  attempts: number;
  xpEarned: number;
  solvedAt?: number;
  bestTime?: number; // ms
  isPerfect: boolean;
}

export type LevelTitle =
  | 'Curious Beginner'
  | 'Pattern Spotter'
  | 'Algorithm Apprentice'
  | 'Logic Craftsman'
  | 'Code Architect'
  | 'DSA Artisan'
  | 'Pattern Master'
  | 'Interview Slayer'
  | 'FAANG Ready'
  | 'Principal Engineer';

export const LEVEL_THRESHOLDS: { xp: number; title: LevelTitle }[] = [
  { xp: 0, title: 'Curious Beginner' },
  { xp: 200, title: 'Pattern Spotter' },
  { xp: 500, title: 'Algorithm Apprentice' },
  { xp: 1000, title: 'Logic Craftsman' },
  { xp: 2000, title: 'Code Architect' },
  { xp: 3500, title: 'DSA Artisan' },
  { xp: 5500, title: 'Pattern Master' },
  { xp: 8000, title: 'Interview Slayer' },
  { xp: 12000, title: 'FAANG Ready' },
  { xp: 20000, title: 'Principal Engineer' },
];

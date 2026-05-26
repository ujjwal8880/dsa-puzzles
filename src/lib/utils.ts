import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LEVEL_THRESHOLDS, type LevelTitle } from '@/types/gamification';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLevelFromXP(xp: number): { level: number; title: LevelTitle; progress: number; nextXP: number } {
  let level = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      level = i;
      break;
    }
  }
  const current = LEVEL_THRESHOLDS[level];
  const next = LEVEL_THRESHOLDS[Math.min(level + 1, LEVEL_THRESHOLDS.length - 1)];
  const progress = level === LEVEL_THRESHOLDS.length - 1 ? 1 : (xp - current.xp) / (next.xp - current.xp);
  return { level: level + 1, title: current.title, progress, nextXP: next.xp };
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toString();
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'text-emerald-400';
    case 'medium': return 'text-amber-400';
    case 'hard': return 'text-rose-400';
    default: return 'text-slate-400';
  }
}

export function getDifficultyBg(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isToday(dateString: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
}

export function isYesterday(dateString: string): boolean {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return dateString === yesterday;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

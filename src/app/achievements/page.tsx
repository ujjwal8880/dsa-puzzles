'use client';

import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useProgressStore } from '@/stores/progressStore';
import { ACHIEVEMENTS } from '@/data/achievements';
import { cn } from '@/lib/utils';
import { staggerContainer, scaleIn } from '@/lib/animations';

const RARITY_STYLES = {
  common: { border: 'border-slate-500/30', bg: 'bg-slate-500/5', badge: 'bg-slate-500/20 text-slate-400', label: 'Common' },
  rare: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', badge: 'bg-blue-500/20 text-blue-400', label: 'Rare' },
  epic: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', badge: 'bg-purple-500/20 text-purple-400', label: 'Epic' },
  legendary: { border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', badge: 'bg-yellow-500/20 text-yellow-400', label: 'Legendary' },
};

export default function AchievementsPage() {
  const { achievements: unlocked, totalXP, streak, solvedQuestions } = useProgressStore();

  const solved = Object.values(solvedQuestions).filter(
    (q) => q.status === 'solved' || q.status === 'mastered'
  ).length;

  const perfect = Object.values(solvedQuestions).filter((q) => q.isPerfect).length;

  const getProgress = (achievement: typeof ACHIEVEMENTS[number]): number => {
    const { condition } = achievement;
    switch (condition.type) {
      case 'questions_solved': return Math.min(solved / condition.threshold, 1);
      case 'perfect_solves': return Math.min(perfect / condition.threshold, 1);
      case 'streak_days': return Math.min(streak / condition.threshold, 1);
      case 'xp_total': return Math.min(totalXP / condition.threshold, 1);
      default: return 0;
    }
  };

  const getProgressLabel = (achievement: typeof ACHIEVEMENTS[number]): string => {
    const { condition } = achievement;
    switch (condition.type) {
      case 'questions_solved': return `${solved}/${condition.threshold} solved`;
      case 'perfect_solves': return `${perfect}/${condition.threshold} perfect`;
      case 'streak_days': return `${streak}/${condition.threshold} days`;
      case 'xp_total': return `${totalXP}/${condition.threshold} XP`;
      default: return '';
    }
  };

  const unlockedCount = unlocked.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={24} className="text-amber-400" />
            <h1 className="text-3xl font-bold text-[#e8e8f0]">Achievements</h1>
          </div>
          <p className="text-[#6b6b8a]">
            {unlockedCount} of {totalCount} unlocked
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Achievements grid */}
        {(['legendary', 'epic', 'rare', 'common'] as const).map((rarity) => {
          const rarityAchievements = ACHIEVEMENTS.filter((a) => a.rarity === rarity);
          if (rarityAchievements.length === 0) return null;
          const style = RARITY_STYLES[rarity];

          return (
            <div key={rarity} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${style.badge}`}>
                  {style.label}
                </span>
                <span className="text-xs text-[#6b6b8a]">
                  {rarityAchievements.filter((a) => unlocked.includes(a.id)).length}/{rarityAchievements.length}
                </span>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 gap-3"
              >
                {rarityAchievements.map((achievement) => {
                  const isUnlocked = unlocked.includes(achievement.id);
                  const progress = getProgress(achievement);
                  const progressLabel = getProgressLabel(achievement);

                  return (
                    <motion.div
                      key={achievement.id}
                      variants={scaleIn}
                      className={cn(
                        'relative p-4 rounded-2xl border transition-all',
                        isUnlocked ? `${style.bg} ${style.border}` : 'bg-[#111118] border-[#1e1e2e] opacity-60'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
                          isUnlocked ? style.bg : 'bg-[#16161f]',
                          !isUnlocked && 'grayscale opacity-50'
                        )}>
                          {isUnlocked ? achievement.icon : <Lock size={18} className="text-[#3d3d5c]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-semibold text-[#e8e8f0]">{achievement.title}</h3>
                            {isUnlocked && <span className="text-emerald-400 text-xs">✓</span>}
                          </div>
                          <p className="text-xs text-[#6b6b8a] leading-relaxed">{achievement.description}</p>

                          {!isUnlocked && progress > 0 && (
                            <div className="mt-2">
                              <div className="h-1 bg-[#1e1e2e] rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-indigo-500/60 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress * 100}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              </div>
                              <p className="text-[10px] text-[#3d3d5c] mt-1">{progressLabel}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

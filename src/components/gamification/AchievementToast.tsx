'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { ACHIEVEMENTS } from '@/data/achievements';

const RARITY_COLORS = {
  common: 'border-slate-500/30 bg-slate-500/10',
  rare: 'border-blue-500/30 bg-blue-500/10',
  epic: 'border-purple-500/30 bg-purple-500/10',
  legendary: 'border-yellow-500/30 bg-yellow-500/10',
};

export function AchievementToast() {
  const { pendingAchievement, dismissAchievement } = useUIStore();
  const achievement = pendingAchievement ? ACHIEVEMENTS.find((a) => a.id === pendingAchievement) : null;

  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(dismissAchievement, 4000);
    return () => clearTimeout(t);
  }, [achievement, dismissAchievement]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {achievement && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border bg-[#0a0a0f] shadow-2xl ${RARITY_COLORS[achievement.rarity]}`}
          >
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <p className="text-xs text-[#6b6b8a] font-medium uppercase tracking-wider">Achievement Unlocked</p>
              <p className="text-sm font-bold text-[#e8e8f0]">{achievement.title}</p>
              <p className="text-xs text-[#6b6b8a]">{achievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

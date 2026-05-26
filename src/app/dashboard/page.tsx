'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Star, Trophy, Target, Zap, BookOpen, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgressStore } from '@/stores/progressStore';
import { ALL_QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { getLevelFromXP, getDifficultyBg, formatXP } from '@/lib/utils';
import { staggerContainer, fadeUp, scaleIn } from '@/lib/animations';

export default function DashboardPage() {
  const { totalXP, streak, level, achievements, solvedQuestions, xpHistory, learningMode } = useProgressStore();
  const { progress, nextXP, title } = getLevelFromXP(totalXP);

  const solved = Object.values(solvedQuestions).filter((q) => q.status === 'solved' || q.status === 'mastered');
  const inProgress = Object.values(solvedQuestions).filter((q) => q.status === 'in_progress');
  const perfect = solved.filter((q) => q.isPerfect);

  const recentActivity = xpHistory.slice(0, 5);

  const categoryProgress = CATEGORIES.map((cat) => {
    const catQs = ALL_QUESTIONS.filter((q) => q.category === cat.id);
    const solvedCount = catQs.filter((q) => {
      const p = solvedQuestions[q.slug];
      return p?.status === 'solved' || p?.status === 'mastered';
    }).length;
    return { ...cat, solvedCount, total: catQs.length };
  }).filter((c) => c.total > 0);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {/* Level card */}
          <motion.div variants={scaleIn} className="col-span-2 sm:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-indigo-400 fill-indigo-400" />
              <span className="text-xs text-[#6b6b8a]">Level {level}</span>
            </div>
            <p className="text-lg font-bold text-[#e8e8f0] mb-1">{title}</p>
            <ProgressBar value={progress * 100} color="indigo" className="mb-1" />
            <p className="text-[10px] text-[#6b6b8a]">{formatXP(totalXP)} / {formatXP(nextXP)} XP</p>
          </motion.div>

          <motion.div variants={scaleIn} className="p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e]">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-orange-400" />
              <span className="text-xs text-[#6b6b8a]">Streak</span>
            </div>
            <p className="text-3xl font-black text-[#e8e8f0]">{streak}</p>
            <p className="text-xs text-[#6b6b8a] mt-1">days</p>
          </motion.div>

          <motion.div variants={scaleIn} className="p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-xs text-[#6b6b8a]">Solved</span>
            </div>
            <p className="text-3xl font-black text-[#e8e8f0]">{solved.length}</p>
            <p className="text-xs text-[#6b6b8a] mt-1">of {ALL_QUESTIONS.length}</p>
          </motion.div>

          <motion.div variants={scaleIn} className="p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e]">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-amber-400" />
              <span className="text-xs text-[#6b6b8a]">Achievements</span>
            </div>
            <p className="text-3xl font-black text-[#e8e8f0]">{achievements.length}</p>
            <p className="text-xs text-[#6b6b8a] mt-1">unlocked</p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Category progress */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-[#e8e8f0] mb-4">Category Progress</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              {categoryProgress.map((cat, i) => (
                <motion.div key={cat.id} variants={fadeUp} className="p-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-medium text-[#e8e8f0]">{cat.name}</span>
                    </div>
                    <span className="text-xs text-[#6b6b8a]">
                      {cat.solvedCount}/{cat.total}
                    </span>
                  </div>
                  <ProgressBar
                    value={cat.solvedCount}
                    max={cat.total}
                    color={cat.solvedCount === cat.total ? 'emerald' : 'indigo'}
                    animated
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Recent XP */}
            <div>
              <h2 className="text-lg font-bold text-[#e8e8f0] mb-4">Recent Activity</h2>
              <div className="flex flex-col gap-2">
                {recentActivity.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#111118] border border-[#1e1e2e] text-center">
                    <BookOpen size={24} className="text-[#3d3d5c] mx-auto mb-2" />
                    <p className="text-sm text-[#6b6b8a]">No activity yet</p>
                    <Link href="/learn" className="text-xs text-indigo-400 hover:underline">Start solving →</Link>
                  </div>
                ) : recentActivity.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#111118] border border-[#1e1e2e]"
                  >
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-indigo-400" />
                      <span className="text-xs text-[#e8e8f0]">{event.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-400">+{event.amount}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="p-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              <h3 className="text-sm font-semibold text-[#e8e8f0] mb-3">Stats</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Perfect solves', value: perfect.length, icon: Star },
                  { label: 'In progress', value: inProgress.length, icon: Clock },
                  { label: 'Total XP', value: formatXP(totalXP), icon: Zap },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#6b6b8a]">
                      <Icon size={12} />
                      {label}
                    </div>
                    <span className="text-xs font-semibold text-[#e8e8f0]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            {solved.length < ALL_QUESTIONS.length && (
              <Link
                href="/learn"
                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium hover:bg-indigo-600/15 transition-colors"
              >
                <Target size={14} />
                Continue Learning →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompletion } from '@ai-sdk/react';
import {
  ArrowRight, Puzzle, Zap, Trophy, BookOpen, Play, Star, Mail,
  Building2, Sparkles, RefreshCw, Brain, Code2, Eye, CheckCircle2, Lightbulb,
} from 'lucide-react';
import { staggerContainer, fadeUp, scaleIn } from '@/lib/animations';
import { ALL_QUESTIONS } from '@/data/questions';
import { getDifficultyBg, cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/progressStore';
import type { QuestionSet } from '@/types/question';

// ─── Constants ────────────────────────────────────────────────────────────────

const SET_BADGE_STYLES: Record<QuestionSet, string> = {
  blind75: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  top150: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  neetcode150: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};
const SET_LABELS: Record<QuestionSet, string> = {
  blind75: 'Blind 75',
  top150: 'Top 150',
  neetcode150: 'NeetCode 150',
};
const COMPANY_COLORS: Record<string, string> = {
  'Amazon': 'text-orange-400', 'Google': 'text-blue-400', 'Meta': 'text-blue-300',
  'Microsoft': 'text-sky-400', 'Apple': 'text-slate-300', 'Bloomberg': 'text-purple-400',
  'LinkedIn': 'text-cyan-400', 'Adobe': 'text-rose-400',
  'Goldman Sachs': 'text-emerald-400', 'DoorDash': 'text-red-400',
};

const FEATURES = [
  {
    icon: Puzzle,
    title: 'Puzzles First, Always',
    description: 'Every algorithm taught through visual interaction before you see a single line of code. Intuition before syntax.',
    color: 'text-indigo-400', bg: 'bg-indigo-500/10',
  },
  {
    icon: Brain,
    title: 'Build Real Intuition',
    description: 'Progressive hints reveal the "aha moment." Understand why the algorithm works — not just how to write it.',
    color: 'text-amber-400', bg: 'bg-amber-500/10',
  },
  {
    icon: Eye,
    title: 'Visual Dry Runs',
    description: 'Step-by-step animated traces show the algorithm executing on real input. Watch it click into place.',
    color: 'text-violet-400', bg: 'bg-violet-500/10',
  },
  {
    icon: Code2,
    title: 'Code It Yourself',
    description: 'Write your solution in an in-browser editor and run it against real test cases. No setup. No excuses.',
    color: 'text-emerald-400', bg: 'bg-emerald-500/10',
  },
  {
    icon: Trophy,
    title: 'Interview Ready',
    description: 'Complexity analysis, edge cases, follow-up questions. Every question covers what FAANG interviewers actually ask.',
    color: 'text-amber-400', bg: 'bg-amber-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI When You\'re Stuck',
    description: 'Stuck? Get a Socratic nudge — guiding questions that lead you toward the answer without giving it away.',
    color: 'text-pink-400', bg: 'bg-pink-500/10',
  },
];

const CONFETTI_DOTS = [
  { x: '8%', color: '#6366f1', delay: 0, size: 5 },
  { x: '20%', color: '#10b981', delay: 0.06, size: 4 },
  { x: '33%', color: '#f59e0b', delay: 0.03, size: 6 },
  { x: '48%', color: '#ec4899', delay: 0.09, size: 4 },
  { x: '62%', color: '#6366f1', delay: 0.04, size: 5 },
  { x: '75%', color: '#10b981', delay: 0.07, size: 4 },
  { x: '86%', color: '#f59e0b', delay: 0.02, size: 5 },
  { x: '93%', color: '#ec4899', delay: 0.11, size: 3 },
];

const STEPS = [
  { num: '01', label: 'Solve the Puzzle', desc: 'Interactive visual challenge — no code required', icon: Puzzle, color: 'text-indigo-400', border: 'border-indigo-500/20', glow: 'bg-indigo-500/5' },
  { num: '02', label: 'Build Intuition', desc: 'Progressive hints reveal the core insight', icon: Lightbulb, color: 'text-amber-400', border: 'border-amber-500/20', glow: 'bg-amber-500/5' },
  { num: '03', label: 'Watch the Trace', desc: 'Animated step-by-step execution on real input', icon: Eye, color: 'text-violet-400', border: 'border-violet-500/20', glow: 'bg-violet-500/5' },
  { num: '04', label: 'Write the Code', desc: 'In-browser editor. Run tests. Ship it.', icon: Code2, color: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'bg-emerald-500/5' },
];

// ─── Hero Mini Puzzle (Two Sum) ───────────────────────────────────────────────

const TWO_SUM_NUMBERS = [2, 7, 11, 15];
const TWO_SUM_TARGET = 9;

const COMPANIES = [
  { name: 'Amazon', color: 'text-orange-400' },
  { name: 'Google', color: 'text-blue-400' },
  { name: 'Meta', color: 'text-sky-400' },
  { name: 'Microsoft', color: 'text-sky-300' },
  { name: 'Apple', color: 'text-slate-300' },
  { name: 'Bloomberg', color: 'text-purple-400' },
  { name: 'LinkedIn', color: 'text-cyan-400' },
  { name: 'Adobe', color: 'text-rose-400' },
  { name: 'Stripe', color: 'text-violet-400' },
  { name: 'Uber', color: 'text-slate-200' },
  { name: 'Airbnb', color: 'text-pink-400' },
  { name: 'Netflix', color: 'text-red-400' },
  { name: 'Goldman Sachs', color: 'text-emerald-400' },
  { name: 'DoorDash', color: 'text-red-300' },
];

function CompanyMarquee() {
  const doubled = [...COMPANIES, ...COMPANIES];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
      <p className="text-center text-[10px] text-[#3d3d5c] uppercase tracking-[3px] mb-4">Questions asked at</p>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-8 w-max">
          {doubled.map((c, i) => (
            <span key={i} className={cn('text-sm font-semibold whitespace-nowrap', c.color)}>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroPuzzle() {
  const [selected, setSelected] = useState<number[]>([]);
  const [phase, setPhase] = useState<'idle' | 'wrong' | 'solved' | 'revealed'>('idle');

  const handleSelect = (idx: number) => {
    if (phase === 'solved' || phase === 'revealed') return;

    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
      setPhase('idle');
      return;
    }

    const next = [...selected, idx];

    if (next.length === 2) {
      const sum = TWO_SUM_NUMBERS[next[0]] + TWO_SUM_NUMBERS[next[1]];
      if (sum === TWO_SUM_TARGET) {
        setSelected(next);
        setPhase('solved');
        setTimeout(() => setPhase('revealed'), 900);
      } else {
        setSelected(next);
        setPhase('wrong');
        setTimeout(() => { setSelected([]); setPhase('idle'); }, 700);
      }
    } else {
      setSelected(next);
    }
  };

  const isSolvedOrRevealed = phase === 'solved' || phase === 'revealed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-sm mx-auto mt-8"
    >
      <div className={cn(
        'relative rounded-2xl bg-[#111118] border overflow-hidden transition-all duration-500',
        isSolvedOrRevealed ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)]' : 'border-[#1e1e2e]',
      )}>
        {isSolvedOrRevealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 bg-emerald-500/[0.03] pointer-events-none" />
        )}
        {/* Confetti burst on solve */}
        {phase === 'revealed' && (
          <div className="absolute inset-x-0 top-0 h-24 pointer-events-none overflow-hidden">
            {CONFETTI_DOTS.map((dot, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, y: 60 }}
                animate={{ opacity: 0, y: 0 }}
                transition={{ delay: dot.delay, duration: 0.9, ease: 'easeOut' }}
                className="absolute rounded-full"
                style={{ left: dot.x, bottom: 0, width: dot.size, height: dot.size, backgroundColor: dot.color }}
              />
            ))}
          </div>
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-indigo-600/20 flex items-center justify-center">
                <Puzzle size={11} className="text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-[#e8e8f0]">Two Sum</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">EASY</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">Blind 75</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#4a4a6a]">target =</span>
              <span className="text-sm font-bold text-indigo-400">9</span>
            </div>
          </div>

          {/* Number cards */}
          <div className="flex gap-3 justify-center mb-5">
            {TWO_SUM_NUMBERS.map((num, idx) => {
              const isSel = selected.includes(idx);
              const isWrong = phase === 'wrong' && isSel;
              const isSolvedCard = isSolvedOrRevealed && isSel;
              const isDimmed = isSolvedOrRevealed && !isSel;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  animate={
                    isWrong ? { x: [-3, 3, -3, 3, 0] } :
                      isSolvedCard ? { scale: [1, 1.12, 1.05] } : {}
                  }
                  transition={isWrong ? { duration: 0.28 } : { duration: 0.3 }}
                  whileHover={!isSolvedOrRevealed && !isSel ? { scale: 1.08, y: -2 } : {}}
                  whileTap={!isSolvedOrRevealed ? { scale: 0.93 } : {}}
                  className={cn(
                    'w-16 h-16 rounded-2xl font-black text-2xl border-2 transition-all duration-200 cursor-pointer select-none',
                    isDimmed && 'opacity-20',
                    isWrong && 'bg-rose-500/15 border-rose-500/50 text-rose-400',
                    isSolvedCard && 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 animate-pulse-glow',
                    isSel && !isWrong && !isSolvedCard && 'bg-indigo-500/15 border-indigo-500/55 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]',
                    !isSel && !isDimmed && 'bg-[#0d0d13] border-[#2a2a3e] text-[#e8e8f0] hover:border-indigo-500/50 hover:shadow-[0_0_12px_rgba(99,102,241,0.15)] hover:text-indigo-200'
                  )}
                >
                  {num}
                </motion.button>
              );
            })}
          </div>

          {/* Status */}
          <div className="min-h-[56px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 'idle' && selected.length === 0 && (
                <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-xs text-[#6b6b8a] text-center"
                >
                  Pick two numbers that add up to <span className="text-indigo-400 font-semibold">9</span>
                </motion.p>
              )}
              {phase === 'idle' && selected.length === 1 && (
                <motion.p key="one" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-indigo-400 text-center"
                >
                  <span className="font-bold">{TWO_SUM_NUMBERS[selected[0]]}</span> + ? = 9 → pick one more
                </motion.p>
              )}
              {phase === 'wrong' && (
                <motion.p key="wrong" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-rose-400 text-center"
                >
                  {TWO_SUM_NUMBERS[selected[0]] + TWO_SUM_NUMBERS[selected[1]]} ≠ 9 — try again
                </motion.p>
              )}
              {phase === 'solved' && (
                <motion.div key="solved" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative text-center"
                >
                  <p className="text-sm font-bold text-emerald-400">
                    🎉 {TWO_SUM_NUMBERS[selected[0]]} + {TWO_SUM_NUMBERS[selected[1]]} = 9
                  </p>
                  <motion.span
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400 pointer-events-none whitespace-nowrap"
                  >
                    +50 Intuition XP ✨
                  </motion.span>
                </motion.div>
              )}
              {phase === 'revealed' && (
                <motion.div key="revealed" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full relative"
                >
                  {/* XP float */}
                  <motion.span
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -28 }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    className="absolute -top-6 right-0 text-xs font-bold text-amber-400 pointer-events-none whitespace-nowrap"
                  >
                    +50 Intuition XP ✨
                  </motion.span>
                  {/* Solved message */}
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm font-bold text-emerald-400 text-center mb-2"
                  >
                    🎉 Nice! You solved Two Sum
                  </motion.p>
                  {/* Pattern reveal */}
                  <div className="flex items-center justify-center mb-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30"
                    >
                      <span className="text-sm">💡</span>
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">Pattern unlocked: Pair Matching</span>
                    </motion.div>
                  </div>
                  {/* Mini AI nudge teaser */}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-xl bg-[#0d0d13] border border-indigo-500/15 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles size={9} className="text-indigo-400" />
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">AI would have nudged</span>
                    </div>
                    <p className="text-[11px] text-[#8888aa] italic leading-relaxed">
                      "What if you could look up each number's complement in O(1) time?"
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Solved CTA strip */}
        <AnimatePresence>
          {phase === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="border-t border-emerald-500/20 bg-emerald-500/5 px-5 py-3 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 size={11} /> Ready for the full puzzle?
                </span>
                <Link href="/problem/two-sum"
                  className="flex items-center gap-1.5 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group"
                >
                  Continue Full Puzzle <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {phase === 'idle' && selected.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="text-center text-[10px] text-[#2d2d45] mt-2"
        >
          ↑ every question starts like this
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { val: `${ALL_QUESTIONS.length}+`, label: 'Puzzles' },
    { val: '20', label: 'Patterns' },
    { val: 'Blind 75', label: 'Covered' },
    { val: 'Top 150', label: 'Covered' },
    { val: 'Free', label: 'No Login' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6"
    >
      <div className="flex items-stretch justify-center rounded-2xl bg-[#111118] border border-[#1e1e2e] divide-x divide-[#1e1e2e] overflow-hidden">
        {stats.map((s) => (
          <div key={s.val} className="flex flex-col items-center px-5 sm:px-8 py-4 flex-1 min-w-0">
            <span className="text-base sm:text-lg font-bold text-[#e8e8f0] leading-none">{s.val}</span>
            <span className="text-[9px] sm:text-[10px] text-[#4a4a6a] mt-1 whitespace-nowrap">{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Credibility Strip ────────────────────────────────────────────────────────

const CREDIBILITY_ITEMS = [
  { icon: '🏆', label: 'Top Interview 150', sub: 'Amazon, Google & more' },
  { icon: '🎯', label: 'Blind 75', sub: 'All patterns covered' },
  { icon: '🏢', label: 'Company-Tagged', sub: '10+ FAANG companies' },
  { icon: '🎬', label: 'Visual Dry Runs', sub: 'Step-by-step traces' },
  { icon: '✨', label: 'AI Hints', sub: 'Socratic, not spoilers' },
];

function CredibilityStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-4"
    >
      <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {CREDIBILITY_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xl shrink-0">{item.icon}</span>
            <div>
              <p className="text-xs font-semibold text-[#e8e8f0] leading-none">{item.label}</p>
              <p className="text-[10px] text-[#4a4a6a] mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── AI Demo ─────────────────────────────────────────────────────────────────

function AIDemoSection() {
  const demoProblems = useMemo(() => {
    const pool = ALL_QUESTIONS.filter(
      (q) => (q.difficulty === 'easy' || q.difficulty === 'medium') && q.intuitionSummary
    );
    const seed = Math.floor(Date.now() / 86_400_000);
    const shuffled = [...pool].sort((a, b) => {
      const ha = (a.slug.charCodeAt(0) * 31 + seed) % 97;
      const hb = (b.slug.charCodeAt(0) * 31 + seed) % 97;
      return ha - hb;
    });
    return shuffled.slice(0, 3);
  }, []);

  const [selected, setSelected] = useState(0);
  const [asked, setAsked] = useState(false);
  const problem = demoProblems[selected];

  const { complete, completion, isLoading, error, setCompletion } = useCompletion({
    api: '/api/hint',
    streamProtocol: 'text',
  });

  const getHint = async (idx?: number) => {
    const p = demoProblems[idx ?? selected];
    setAsked(true);
    setCompletion('');
    await complete('', {
      body: {
        title: p.title,
        description: p.descriptions.explorer,
        patternName: p.patternName,
        engineType: p.engineType,
        category: p.category,
      },
    });
  };

  const switchProblem = (idx: number) => {
    setSelected(idx);
    setAsked(false);
    setCompletion('');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-indigo-500/5 via-[#111118] to-pink-500/5 border border-indigo-500/20 p-6 sm:p-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold text-pink-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
            AI Guide
          </span>
          <span className="text-[10px] text-[#4a4a6a]">— for when you're stuck, not instead of thinking</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#e8e8f0] mb-1">
          Nudges, not answers
        </h2>
        <p className="text-[#6b6b8a] text-sm mb-6">
          Pick a problem. The AI asks you a question instead of solving it for you.
        </p>

        {/* Comparison card */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          <div className="rounded-2xl bg-rose-500/5 border border-rose-500/15 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">❌</span>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wide">Other platforms</span>
            </div>
            <p className="text-[11px] text-[#6b6b8a] italic leading-relaxed mb-1.5">
              "Use a HashMap to store each number's complement as you iterate."
            </p>
            <p className="text-[10px] text-[#4a4a6a]">Gives the answer. You copy it. You forget it next week.</p>
          </div>
          <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">✅</span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">DSA Puzzles AI</span>
            </div>
            <p className="text-[11px] text-[#c8c8d8] italic leading-relaxed mb-1.5">
              "What if you could remember every number you've seen — what would you look up?"
            </p>
            <p className="text-[10px] text-[#6b6b8a]">Guides you to the insight. You build it. You own it forever.</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {demoProblems.map((p, i) => (
            <button key={p.slug} onClick={() => switchProblem(i)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all cursor-pointer',
                selected === i
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-[#111118] border-[#1e1e2e] text-[#6b6b8a] hover:text-[#e8e8f0] hover:border-[#2a2a3e]'
              )}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-[#0d0d13] border border-[#1e1e2e] p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${getDifficultyBg(problem.difficulty)}`}>{problem.difficulty}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 font-medium">{problem.patternName}</span>
          </div>
          <h3 className="text-[#e8e8f0] font-semibold mb-1">{problem.title}</h3>
          <p className="text-sm text-[#6b6b8a] leading-relaxed">{problem.descriptions.explorer}</p>
        </div>

        <AnimatePresence mode="wait">
          {!asked ? (
            <motion.button key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => getHint()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer"
            >
              <Sparkles size={14} />
              Ask for a nudge
            </motion.button>
          ) : (
            <motion.div key="hint" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-indigo-500/5 border border-indigo-500/20 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={10} /> AI Nudge
                </span>
                {!isLoading && (
                  <button onClick={() => getHint()}
                    className="flex items-center gap-1 text-[10px] text-[#6b6b8a] hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <RefreshCw size={10} /> Try again
                  </button>
                )}
              </div>
              {error ? (
                <p className="text-rose-400 text-xs">Couldn't reach AI — try again in a moment.</p>
              ) : (
                <p className="text-sm text-[#c8c8d8] leading-relaxed">
                  {completion}
                  {isLoading && <span className="inline-block w-1 h-3.5 bg-indigo-400 ml-0.5 animate-pulse rounded-sm align-middle" />}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LandingPage() {
  const { solvedQuestions } = useProgressStore();

  const featuredQuestions = useMemo(() => {
    const solvedSlugs = new Set(
      Object.entries(solvedQuestions)
        .filter(([, p]) => p.status === 'solved')
        .map(([slug]) => slug)
    );
    const implemented = ALL_QUESTIONS.filter(
      (q) => (q.codeSolutions?.length || q.codeChallenge) && (q.difficulty === 'easy' || q.difficulty === 'medium')
    );
    const unsolved = implemented.filter((q) => !solvedSlugs.has(q.slug));
    const pool = unsolved.length >= 6 ? unsolved : implemented;
    const seed = solvedSlugs.size;
    return [...pool]
      .sort((a, b) => ((a.slug.charCodeAt(0) * 31 + seed) % 97) - ((b.slug.charCodeAt(0) * 31 + seed) % 97))
      .slice(0, 6);
  }, [solvedQuestions]);

  const firstEasySlug = ALL_QUESTIONS.find((q) => q.difficulty === 'easy')?.slug ?? ALL_QUESTIONS[0].slug;

  const solvedCount = Object.values(solvedQuestions).filter((p) => p.status === 'solved').length;
  const hasStarted = solvedCount > 0;
  const nextUnsolved = ALL_QUESTIONS.find((q) => !solvedQuestions[q.slug] || solvedQuestions[q.slug].status !== 'solved');
  const ctaSlug = hasStarted ? (nextUnsolved?.slug ?? firstEasySlug) : firstEasySlug;
  const ctaLabel = hasStarted ? `Continue Solving` : 'Solve Your First Puzzle';
  const ctaSubLabel = hasStarted ? `${solvedCount} solved — keep going` : null;

  return (
    <div className="min-h-screen grid-bg">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-40 border-b border-[#1e1e2e] bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xs font-bold">⌘</span>
            </div>
            <span className="font-semibold text-[#e8e8f0]">DSA<span className="text-indigo-400">Puzzles</span></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/learn" className="hidden sm:block text-sm text-[#6b6b8a] hover:text-[#e8e8f0] transition-colors">
              Browse Questions
            </Link>
            <Link href={`/problem/${ctaSlug}`}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              {hasStarted ? 'Continue' : 'Solve a Puzzle'}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-4 text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="flex flex-col items-center gap-5"
        >
          <motion.div variants={scaleIn}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium"
          >
            <Star size={10} className="fill-indigo-400" />
            Intuition first · Code second · AI when stuck
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[68px] font-black tracking-tight leading-[1.05]"
          >
            <span className="text-[#e8e8f0]">Stop memorizing LeetCode.</span>
            <br />
            <span className="gradient-text">Start building intuition.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#6b6b8a] max-w-lg leading-relaxed">
            Learn DSA through interactive puzzles, AI-guided hints, visual dry runs, and{' '}
            <span className="text-[#e8e8f0]">real interview patterns.</span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center">
            <Link href={`/problem/${ctaSlug}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Puzzle size={16} />
              <span className="flex flex-col items-start leading-tight">
                <span>{ctaLabel}</span>
                {ctaSubLabel && <span className="text-[11px] text-indigo-200 font-normal">{ctaSubLabel}</span>}
              </span>
            </Link>
            <Link href="/learn"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#111118] hover:bg-[#16161f] border border-[#1e1e2e] hover:border-[#2a2a3e] text-[#e8e8f0] font-semibold text-base transition-all"
            >
              Browse {ALL_QUESTIONS.length}+ Questions
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-2 flex-wrap justify-center">
            {[
              { label: '150+ Questions', color: 'bg-indigo-400' },
              { label: 'Top Interview 150', color: 'bg-amber-400' },
              { label: 'Blind 75', color: 'bg-violet-400' },
              { label: 'AI-Guided Hints', color: 'bg-pink-400' },
              { label: 'Free Forever', color: 'bg-emerald-400' },
            ].map((badge) => (
              <span key={badge.label}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#111118] border border-[#1e1e2e] text-[#6b6b8a]"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badge.color} shrink-0`} />
                {badge.label}
              </span>
            ))}
          </motion.div>

          {/* Interactive mini puzzle */}
          <HeroPuzzle />
        </motion.div>
      </section>

      {/* ── Company Marquee ── */}
      <CompanyMarquee />

      {/* ── Stats Bar ── */}
      <StatsBar />

      {/* ── Credibility Strip ── */}
      <CredibilityStrip />

      {/* ── How It Works ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-[#e8e8f0] mb-3">How It Works</h2>
          <p className="text-[#6b6b8a]">
            Every question follows the same four-step flow.
            <span className="text-pink-400/70 text-xs ml-2">AI hints available throughout ✦</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 items-center">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={cn(
                    'relative p-5 rounded-2xl border transition-colors h-full',
                    step.glow, step.border, 'hover:opacity-90'
                  )}
                >
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-3', `bg-current/10`)}>
                    <Icon size={15} className={step.color} />
                  </div>
                  <span className={`text-2xl font-black ${step.color} opacity-20 absolute top-4 right-4`}>{step.num}</span>
                  <h3 className="text-[#e8e8f0] font-semibold mb-1 text-sm">{step.label}</h3>
                  <p className="text-[#6b6b8a] text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={14} className="hidden lg:block text-[#2d2d45] justify-self-center" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* ── AI Demo ── */}
      <AIDemoSection />

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-[#e8e8f0] mb-3">Everything you need to level up</h2>
          <p className="text-[#6b6b8a]">Built different from every DSA platform you've tried before</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e] hover:border-indigo-500/30 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] hover:-translate-y-0.5 hover:bg-[#13131c] transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={f.color} />
                </div>
                <div>
                  <h3 className="text-[#e8e8f0] font-semibold mb-1 text-sm">{f.title}</h3>
                  <p className="text-[#6b6b8a] text-xs leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Featured Questions ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#e8e8f0]">Start Here</h2>
            <p className="text-[#6b6b8a] text-sm mt-1">Handpicked — easy &amp; medium, not yet solved</p>
          </div>
          <Link href="/learn" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {featuredQuestions.map((q, i) => {
            const topCompany = q.companies?.[0];
            const companyColor = topCompany ? (COMPANY_COLORS[topCompany] ?? 'text-[#6b6b8a]') : null;
            return (
              <motion.div key={q.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/problem/${q.slug}`}
                  className="group flex flex-col gap-3 p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e] hover:border-indigo-500/40 hover:bg-[#13131c] hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#4a4a6a] font-medium mb-0.5">LC #{q.leetcodeNumber}</p>
                      <h3 className="text-[#e8e8f0] font-semibold text-base group-hover:text-indigo-300 transition-colors leading-snug">
                        {q.title}
                      </h3>
                      {q.questionSets && q.questionSets.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap mt-1">
                          {q.questionSets.map((set) => (
                            <span key={set} className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${SET_BADGE_STYLES[set]}`}>
                              {SET_LABELS[set]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyBg(q.difficulty)} shrink-0`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b6b8a] leading-relaxed line-clamp-2">{q.intuitionSummary}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-md text-xs bg-[#0d0d15] border border-[#2a2a3e] text-[#6b6b8a] truncate">
                        {q.patternName}
                      </span>
                      <span className="text-xs text-indigo-400/70 shrink-0">+{q.xpRewards.puzzle} XP</span>
                    </div>
                    {topCompany && companyColor && (
                      <span className={`flex items-center gap-1 text-[10px] font-medium shrink-0 ${companyColor}`}>
                        <Building2 size={9} />{topCompany}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-[#111118] to-violet-600/10 border border-indigo-500/25 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-black text-[#e8e8f0] mb-4 leading-tight relative">
            {hasStarted
              ? 'Keep the momentum going'
              : <>Ready to stop memorizing<br />and start understanding?</>}
          </h2>
          <p className="text-[#6b6b8a] mb-8 text-base sm:text-lg max-w-sm mx-auto relative">
            {hasStarted
              ? `You've solved ${solvedCount} puzzle${solvedCount === 1 ? '' : 's'}. Intuition compounds — every puzzle makes the next one easier.`
              : 'One puzzle at a time. Build the intuition that makes interviews easy.'}
          </p>
          <Link href={`/problem/${ctaSlug}`}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Puzzle size={18} />
            {hasStarted ? ctaLabel : 'Start First Puzzle'}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-[10px] font-bold">⌘</span>
            </div>
            <span className="font-semibold text-[#e8e8f0] text-sm">DSA<span className="text-indigo-400">Puzzles</span></span>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs text-[#e8e8f0] font-medium">Built for developers who want to understand, not memorize.</p>
            <p className="text-xs text-[#4a4a6a]">by <span className="text-[#6b6b8a]">Ujjwal Singhal</span></p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/in/ujjwalsinghal" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#6b6b8a] hover:text-indigo-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76.97 0 1.75.79 1.75 1.76 0 .97-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.88v1.5h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v6.45z" />
                </svg>
                LinkedIn
              </a>
              <span className="text-[#3d3d5c]">·</span>
              <a href="mailto:ujjwalsinghal19@gmail.com"
                className="flex items-center gap-1.5 text-xs text-[#6b6b8a] hover:text-indigo-400 transition-colors"
              >
                <Mail size={13} />
                ujjwalsinghal19@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2">
            <a href="https://github.com/ujjwal8880/dsa-puzzles" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#6b6b8a] hover:text-[#e8e8f0] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              ujjwal8880/dsa-puzzles
            </a>
            <p className="text-xs text-[#3d3d5c]">Open source · No login required · Free forever</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

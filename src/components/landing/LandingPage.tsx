'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompletion } from '@ai-sdk/react';
import { ArrowRight, Puzzle, Zap, Trophy, BookOpen, Play, Star, Mail, Building2, Sparkles, RefreshCw } from 'lucide-react';
import { staggerContainer, fadeUp, scaleIn, slideRight } from '@/lib/animations';
import { ALL_QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { getDifficultyBg, cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/progressStore';
import type { QuestionSet } from '@/types/question';

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

const FEATURES = [
  {
    icon: Puzzle,
    title: 'Learn by Playing',
    description: 'Every concept taught through interactive puzzles first. No boring code-first approach.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Zap,
    title: 'Build Intuition',
    description: 'Progressive hints reveal the "aha moment" before you ever see the code.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Trophy,
    title: 'Gamified Progress',
    description: 'XP, streaks, achievements. Learning DSA should feel like leveling up in a game.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: BookOpen,
    title: 'Interview Ready',
    description: 'Complexity analysis, follow-ups, edge cases. Everything a FAANG interviewer will ask.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Hints',
    description: 'Stuck? Get a Socratic nudge from AI — guiding questions that lead you to the answer without spoiling it.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Play,
    title: 'Code It Yourself',
    description: 'Write your solution in an in-browser editor and run it against real test cases to verify correctness.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
];

const STEPS = [
  { num: '01', label: 'Solve Puzzle', desc: 'Visual, interactive challenge — no code yet', color: 'text-indigo-400' },
  { num: '02', label: 'Ask AI', desc: 'Stuck? Get a Socratic nudge powered by AI', color: 'text-pink-400', ai: true },
  { num: '03', label: 'Dry Run', desc: 'Step-by-step animated trace of the algorithm', color: 'text-violet-400' },
  { num: '04', label: 'Code It', desc: 'Write the solution and run test cases', color: 'text-emerald-400' },
];

const COMPANY_COLORS: Record<string, string> = {
  'Amazon': 'text-orange-400',
  'Google': 'text-blue-400',
  'Meta': 'text-blue-300',
  'Microsoft': 'text-sky-400',
  'Apple': 'text-slate-300',
  'Bloomberg': 'text-purple-400',
  'LinkedIn': 'text-cyan-400',
  'Adobe': 'text-rose-400',
  'Goldman Sachs': 'text-emerald-400',
  'DoorDash': 'text-red-400',
};

export function LandingPage() {
  const { solvedQuestions } = useProgressStore();

  const featuredQuestions = useMemo(() => {
    const solvedSlugs = new Set(
      Object.entries(solvedQuestions)
        .filter(([, p]) => p.status === 'solved')
        .map(([slug]) => slug)
    );

    // Pool: implemented easy/medium questions not yet solved
    const implemented = ALL_QUESTIONS.filter(
      (q) => (q.codeSolutions?.length || q.codeChallenge) && (q.difficulty === 'easy' || q.difficulty === 'medium')
    );
    const unsolved = implemented.filter((q) => !solvedSlugs.has(q.slug));
    const pool = unsolved.length >= 6 ? unsolved : implemented;

    // Stable shuffle seeded by count of solved (changes when user finishes questions)
    const seed = solvedSlugs.size;
    const shuffled = [...pool].sort((a, b) => {
      const ha = ((a.slug.charCodeAt(0) * 31 + seed) % 97);
      const hb = ((b.slug.charCodeAt(0) * 31 + seed) % 97);
      return ha - hb;
    });

    return shuffled.slice(0, 6);
  }, [solvedQuestions]);

  return (
    <div className="min-h-screen grid-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-[#1e1e2e] bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xs font-bold">⌘</span>
            </div>
            <span className="font-semibold text-[#e8e8f0]">
              DSA<span className="text-indigo-400">Puzzles</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/learn" className="hidden sm:block text-sm text-[#6b6b8a] hover:text-[#e8e8f0] transition-colors">
              Browse Questions
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              Start Learning
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium">
            <Star size={11} className="fill-indigo-400" />
            Duolingo × LeetCode × AI — Learn Algorithms Through Play
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            <span className="text-[#e8e8f0]">Master DSA</span>
            <br />
            <span className="gradient-text">Through Puzzles</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-[#6b6b8a] max-w-xl leading-relaxed">
            Stop memorizing solutions. Start building intuition. Interactive puzzles teach you{' '}
            <em className="text-[#e8e8f0]">why</em> algorithms work — before you ever see the code.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href={`/problem/${ALL_QUESTIONS.find((q) => q.difficulty === 'easy')?.slug ?? ALL_QUESTIONS[0].slug}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={16} className="fill-white" />
              Start Free
            </Link>
            <Link
              href="/learn"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#111118] hover:bg-[#16161f] border border-[#1e1e2e] hover:border-[#2a2a3e] text-[#e8e8f0] font-semibold text-base transition-all"
            >
              Browse Questions
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6b6b8a] flex-wrap justify-center">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> No signup required</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> {ALL_QUESTIONS.length} puzzles</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Free forever</span>
          </motion.div>
        </motion.div>
      </section>

      {/* AI Demo */}
      <AIDemoSection />

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-[#e8e8f0] mb-3">How It Works</h2>
          <p className="text-[#6b6b8a]">Every question follows the same learning flow — with AI built in</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 items-center">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={cn(
                  'relative p-5 rounded-2xl border transition-colors h-full',
                  step.ai
                    ? 'bg-gradient-to-br from-pink-500/8 to-indigo-500/5 border-pink-500/25 hover:border-pink-500/40'
                    : 'bg-[#111118] border-[#1e1e2e] hover:border-[#2a2a3e]'
                )}
              >
                {step.ai && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[9px] text-pink-400 font-semibold uppercase tracking-wider">
                    <Sparkles size={8} />AI
                  </span>
                )}
                <span className={`text-3xl font-black ${step.color} opacity-30`}>{step.num}</span>
                <h3 className="text-[#e8e8f0] font-semibold mt-2 mb-1">{step.label}</h3>
                <p className="text-[#6b6b8a] text-sm">{step.desc}</p>
              </motion.div>
              {i < STEPS.length - 1 && (
                <ArrowRight size={16} className="hidden lg:block text-[#3d3d5c] justify-self-center" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 [&>*:last-child:nth-child(3n+1)]:lg:col-start-2">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e] hover:border-[#2a2a3e] transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={f.color} />
                </div>
                <div>
                  <h3 className="text-[#e8e8f0] font-semibold mb-1">{f.title}</h3>
                  <p className="text-[#6b6b8a] text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured questions */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#e8e8f0]">Start Here</h2>
            <p className="text-[#6b6b8a] text-sm mt-1">Handpicked for you — easy &amp; medium, not yet solved</p>
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
              <motion.div
                key={q.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/problem/${q.slug}`}
                  className="group flex flex-col gap-3 p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e] hover:border-indigo-500/30 hover:bg-[#16161f] hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#4a4a6a] font-medium mb-0.5">LC #{q.leetcodeNumber}</p>
                        <h3 className="text-[#e8e8f0] font-semibold text-sm group-hover:text-indigo-300 transition-colors leading-snug">
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
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyBg(q.difficulty)} shrink-0`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b6b8a] leading-relaxed line-clamp-2">
                    {q.intuitionSummary}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-md text-xs bg-[#0d0d15] border border-[#2a2a3e] text-[#6b6b8a] truncate">
                        {q.patternName}
                      </span>
                      <span className="text-xs text-indigo-400/70 shrink-0">+{q.xpRewards.puzzle} XP</span>
                    </div>
                    {topCompany && companyColor && (
                      <span className={`flex items-center gap-1 text-[10px] font-medium shrink-0 ${companyColor}`}>
                        <Building2 size={9} />
                        {topCompany}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-12 rounded-3xl bg-indigo-600/5 border border-indigo-500/20"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-[#e8e8f0] mb-4">
            Ready to think like an engineer?
          </h2>
          <p className="text-[#6b6b8a] mb-8 text-lg">
            Start with a puzzle. Build intuition. Ace the interview.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]"
          >
            Start Solving Now
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-[10px] font-bold">⌘</span>
            </div>
            <span className="font-semibold text-[#e8e8f0] text-sm">
              DSA<span className="text-indigo-400">Puzzles</span>
            </span>
          </div>

          {/* Creator */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs text-[#6b6b8a]">Built by <span className="text-[#e8e8f0] font-semibold">Ujjwal Singhal</span></p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ujjwalsinghal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#6b6b8a] hover:text-indigo-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76.97 0 1.75.79 1.75 1.76 0 .97-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.88v1.5h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v6.45z" />
                </svg>
                LinkedIn
              </a>
              <span className="text-[#3d3d5c]">·</span>
              <a
                href="mailto:ujjwalsinghal19@gmail.com"
                className="flex items-center gap-1.5 text-xs text-[#6b6b8a] hover:text-indigo-400 transition-colors"
              >
                <Mail size={13} />
                ujjwalsinghal19@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2">
            <a
              href="https://github.com/ujjwal8880/dsa-puzzles"
              target="_blank"
              rel="noopener noreferrer"
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

function AIDemoSection() {
  const demoProblems = useMemo(() => {
    const pool = ALL_QUESTIONS.filter(
      (q) => (q.difficulty === 'easy' || q.difficulty === 'medium') && q.intuitionSummary
    );
    // Stable random shuffle seeded by day so it changes daily but stays consistent per session
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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-indigo-500/5 via-[#111118] to-pink-500/5 border border-indigo-500/20 p-6 sm:p-10"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
            <Sparkles size={15} className="text-indigo-400" />
          </div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Live AI Demo</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#e8e8f0] mb-1">See the AI nudge in action</h2>
        <p className="text-[#6b6b8a] text-sm mb-8">Pick a problem. Get a real hint — no answers, just the right push.</p>

        {/* Problem picker */}
        <div className="flex gap-2 flex-wrap mb-6">
          {demoProblems.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => switchProblem(i)}
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

        {/* Problem card */}
        <div className="rounded-2xl bg-[#0d0d13] border border-[#1e1e2e] p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${getDifficultyBg(problem.difficulty)}`}>{problem.difficulty}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 font-medium">{problem.patternName}</span>
          </div>
          <h3 className="text-[#e8e8f0] font-semibold mb-1">{problem.title}</h3>
          <p className="text-sm text-[#6b6b8a] leading-relaxed">{problem.descriptions.explorer}</p>
        </div>

        {/* AI hint area */}
        <AnimatePresence mode="wait">
          {!asked ? (
            <motion.button
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => getHint()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer"
            >
              <Sparkles size={14} />
              Ask AI for a nudge
            </motion.button>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-indigo-500/5 border border-indigo-500/20 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={10} />
                  AI Nudge
                </span>
                {!isLoading && (
                  <button
                    onClick={() => getHint()}
                    className="flex items-center gap-1 text-[10px] text-[#6b6b8a] hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <RefreshCw size={10} />
                    Try again
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

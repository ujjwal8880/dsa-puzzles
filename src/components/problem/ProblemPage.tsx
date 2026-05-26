'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { LearningFlow } from '@/components/learning/LearningFlow';
import { XPToastLayer } from '@/components/gamification/XPToast';
import { AchievementToast } from '@/components/gamification/AchievementToast';
import type { QuestionConfig, QuestionSet } from '@/types/question';
import { getDifficultyBg } from '@/lib/utils';

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

interface ProblemPageProps {
  question: QuestionConfig;
}

export function ProblemPage({ question }: ProblemPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Problem header */}
      <div className="border-b border-[#1e1e2e] bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-[#6b6b8a] mb-3">
            <Link href="/learn" className="hover:text-[#e8e8f0] transition-colors">Questions</Link>
            <ChevronRight size={12} />
            <span className="text-[#e8e8f0]">{question.title}</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <h1 className="text-xl font-bold text-[#e8e8f0]">{question.title}</h1>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getDifficultyBg(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                  {question.questionSets?.map((set) => (
                    <span key={set} className={`px-2 py-0.5 rounded-md text-xs font-medium border ${SET_BADGE_STYLES[set]}`}>
                      {SET_LABELS[set]}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-[#6b6b8a]">
                  <span>#{question.leetcodeNumber}</span>
                  <span>·</span>
                  <span>{question.patternName}</span>
                  <span>·</span>
                  {question.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-[#16161f] border border-[#1e1e2e]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={`https://leetcode.com/problems/${question.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#6b6b8a] hover:text-[#e8e8f0] bg-[#111118] border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all shrink-0"
            >
              LeetCode
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Main learning area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-[#111118] border border-[#1e1e2e] overflow-hidden min-h-[600px] flex flex-col"
        >
          <LearningFlow question={question} />
        </motion.div>
      </div>

      {/* Gamification overlays */}
      <XPToastLayer />
      <AchievementToast />
    </div>
  );
}

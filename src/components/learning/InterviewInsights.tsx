'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Target, MessageSquare, GitBranch, Zap } from 'lucide-react';
import type { InterviewInsight } from '@/types/question';
import { staggerContainer, fadeUp } from '@/lib/animations';

interface InterviewInsightsProps {
  insights: InterviewInsight;
}

export function InterviewInsights({ insights }: InterviewInsightsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {/* Brute vs Optimal */}
      <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15">
          <p className="text-xs text-rose-400 font-medium mb-1">Brute Force</p>
          <p className="text-[#e8e8f0] text-sm leading-relaxed mb-2">{insights.bruteForce.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-rose-400 font-mono">{insights.bruteForce.complexity.time}</span>
            <span className="text-[#3d3d5c]">time</span>
            <span className="text-[#3d3d5c]">·</span>
            <span className="text-rose-400/70 font-mono">{insights.bruteForce.complexity.space}</span>
            <span className="text-[#3d3d5c]">space</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
          <p className="text-xs text-emerald-400 font-medium mb-1">Optimal Solution</p>
          <p className="text-[#e8e8f0] text-sm leading-relaxed mb-2">{insights.optimized.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-mono">{insights.optimized.complexity.time}</span>
            <span className="text-[#3d3d5c]">time</span>
            <span className="text-[#3d3d5c]">·</span>
            <span className="text-emerald-400/70 font-mono">{insights.optimized.complexity.space}</span>
            <span className="text-[#3d3d5c]">space</span>
          </div>
        </div>
      </motion.div>

      {/* Common Mistakes */}
      {insights.commonMistakes.length > 0 && (
      <motion.div variants={fadeUp} className="p-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} className="text-amber-400" />
          <h4 className="text-sm font-semibold text-[#e8e8f0]">Common Mistakes</h4>
        </div>
        <ul className="flex flex-col gap-2">
          {insights.commonMistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#6b6b8a]">
              <span className="text-amber-400 mt-0.5">⚠</span>
              {m}
            </li>
          ))}
        </ul>
      </motion.div>
      )}

      {/* Edge Cases */}
      {insights.edgeCases.length > 0 && (
      <motion.div variants={fadeUp} className="p-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
        <div className="flex items-center gap-2 mb-3">
          <Target size={14} className="text-violet-400" />
          <h4 className="text-sm font-semibold text-[#e8e8f0]">Edge Cases to Test</h4>
        </div>
        <ul className="flex flex-col gap-2">
          {insights.edgeCases.map((e, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#6b6b8a]">
              <span className="text-violet-400 mt-0.5">◈</span>
              {e}
            </li>
          ))}
        </ul>
      </motion.div>
      )}

      {/* Follow-up Questions */}
      {insights.followUps.length > 0 && (
      <motion.div variants={fadeUp} className="p-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={14} className="text-blue-400" />
          <h4 className="text-sm font-semibold text-[#e8e8f0]">Interviewer Follow-ups</h4>
        </div>
        <ul className="flex flex-col gap-2">
          {insights.followUps.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#6b6b8a]">
              <span className="text-blue-400 mt-0.5">→</span>
              {f}
            </li>
          ))}
        </ul>
      </motion.div>
      )}

      {/* Pro Tips */}
      {insights.interviewerTips.length > 0 && (
      <motion.div variants={fadeUp} className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-indigo-400" />
          <h4 className="text-sm font-semibold text-[#e8e8f0]">Pro Interview Tips</h4>
        </div>
        <ul className="flex flex-col gap-2">
          {insights.interviewerTips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#6b6b8a]">
              <span className="text-indigo-400 mt-0.5">💡</span>
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
      )}
    </motion.div>
  );
}

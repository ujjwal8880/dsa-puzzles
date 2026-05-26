'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, GitMerge, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Interval {
  id: string;
  start: number;
  end: number;
  label: string;
  color?: string;
}

interface TimelineEngineProps {
  config: {
    intervals: Interval[];
    instruction: string;
    mode: 'merge' | 'insert' | 'non-overlapping';
    correctAnswer: number[][];
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

const SCALE = 14; // pixels per unit
const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

function doOverlap(a: number[], b: number[]) {
  return a[0] <= b[1] && b[0] <= a[1];
}

export function TimelineEngine({ config, onSolve }: TimelineEngineProps) {
  const [mergedGroups, setMergedGroups] = useState<string[][]>(
    config.intervals.map((iv) => [iv.id])
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const maxEnd = Math.max(...config.intervals.map((iv) => iv.end)) + 2;

  const getMergeResult = useCallback(() => {
    return mergedGroups
      .map((group) => {
        const ivs = group.map((id) => config.intervals.find((iv) => iv.id === id)!);
        return [Math.min(...ivs.map((iv) => iv.start)), Math.max(...ivs.map((iv) => iv.end))];
      })
      .sort((a, b) => a[0] - b[0]);
  }, [mergedGroups, config.intervals]);

  const handleAutoMerge = useCallback(() => {
    const sorted = [...config.intervals].sort((a, b) => a.start - b.start);
    const groups: string[][] = [];

    for (const iv of sorted) {
      if (groups.length === 0) {
        groups.push([iv.id]);
        continue;
      }
      const lastGroup = groups[groups.length - 1];
      const lastIds = lastGroup;
      const lastMaxEnd = Math.max(
        ...lastIds.map((id) => config.intervals.find((i) => i.id === id)!.end)
      );
      if (iv.start <= lastMaxEnd) {
        lastGroup.push(iv.id);
      } else {
        groups.push([iv.id]);
      }
    }
    setMergedGroups(groups);
  }, [config.intervals]);

  const handleSubmit = useCallback(() => {
    const myResult = getMergeResult();
    const expected = config.correctAnswer;

    const correct =
      myResult.length === expected.length &&
      myResult.every((r, i) => r[0] === expected[i][0] && r[1] === expected[i][1]);

    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);
    setTimeout(() => onSolve(correct, 0), 600);
  }, [getMergeResult, config.correctAnswer, onSolve]);

  const reset = () => {
    setMergedGroups(config.intervals.map((iv) => [iv.id]));
    setSubmitted(false);
    setResult(null);
  };

  const mergedResult = getMergeResult();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Timeline ruler */}
      <div className="w-full bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 overflow-x-auto">
        {/* Ruler */}
        <div className="relative mb-4" style={{ width: `${maxEnd * SCALE}px`, height: '20px' }}>
          {Array.from({ length: maxEnd + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: `${i * SCALE}px` }}
            >
              <div className={cn('w-px', i % 5 === 0 ? 'h-3 bg-[#2a2a3e]' : 'h-2 bg-[#1e1e2e]')} />
              {i % 5 === 0 && <span className="text-[9px] text-[#3d3d5c] mt-0.5">{i}</span>}
            </div>
          ))}
        </div>

        {/* Original intervals */}
        <div className="relative" style={{ width: `${maxEnd * SCALE}px`, height: `${config.intervals.length * 36 + 8}px` }}>
          {config.intervals.map((iv, idx) => (
            <motion.div
              key={iv.id}
              className="absolute h-8 rounded-lg flex items-center justify-center text-xs font-semibold text-white shadow-lg cursor-pointer"
              style={{
                left: `${iv.start * SCALE}px`,
                width: `${(iv.end - iv.start) * SCALE}px`,
                top: `${idx * 36}px`,
                backgroundColor: COLORS[idx % COLORS.length],
                opacity: 0.85,
              }}
              whileHover={{ opacity: 1, scale: 1.02 }}
            >
              [{iv.start},{iv.end}]
            </motion.div>
          ))}
        </div>

        {/* Merged result preview */}
        <div className="mt-4 border-t border-[#1e1e2e] pt-4">
          <p className="text-xs text-[#6b6b8a] mb-2">Your merged result:</p>
          <div className="relative" style={{ width: `${maxEnd * SCALE}px`, height: '40px' }}>
            {mergedResult.map((iv, idx) => (
              <motion.div
                key={idx}
                layout
                className="absolute h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{
                  left: `${iv[0] * SCALE}px`,
                  width: `${(iv[1] - iv[0]) * SCALE}px`,
                  backgroundColor: COLORS[idx % COLORS.length],
                }}
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
              >
                [{iv[0]},{iv[1]}]
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Merge result display */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {mergedResult.map((iv, i) => (
          <motion.span
            key={i}
            layout
            className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-mono"
          >
            [{iv[0]},{iv[1]}]
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'px-5 py-2.5 rounded-xl border text-sm font-semibold',
              result === 'correct'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            )}
          >
            {result === 'correct'
              ? `✓ Correct! ${mergedResult.length} merged interval${mergedResult.length !== 1 ? 's' : ''}`
              : `✗ Expected ${config.correctAnswer.length} intervals. Try clicking Auto-Merge for the hint.`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>Reset</Button>
        <Button variant="secondary" size="sm" onClick={handleAutoMerge} icon={<GitMerge size={13} />}>
          Auto-Merge
        </Button>
        <Button variant="primary" size="md" onClick={handleSubmit} disabled={submitted}>
          {result === 'correct' ? <><Check size={14} /> Correct!</> : 'Submit'}
        </Button>
      </div>
    </div>
  );
}

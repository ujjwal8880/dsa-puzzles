'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface StateEngineConfig {
  n: number;
  instruction: string;
  mode: string;
  correctAnswer: number;
}

interface StateEngineProps {
  config: StateEngineConfig;
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function StateEngine({ config, onSolve }: StateEngineProps) {
  const { n } = config;

  // dp[0] = 1, dp[1] = 1 are pre-filled; user fills dp[2..n]
  const initial = Array.from({ length: n + 1 }, (_, i) =>
    i <= 1 ? String(i === 0 ? 1 : 1) : ''
  );

  const [values, setValues] = useState<string[]>(initial);
  const [submitted, setSubmitted] = useState<boolean[]>(Array(n + 1).fill(false));
  const [correct, setCorrect] = useState<(boolean | null)[]>(Array(n + 1).fill(null));
  const [done, setDone] = useState(false);
  const [activeCell, setActiveCell] = useState<number | null>(null);

  const expectedDp = useCallback(() => {
    const dp = [1, 1];
    for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp;
  }, [n]);

  const handleChange = (i: number, val: string) => {
    if (i <= 1 || submitted[i]) return;
    const next = [...values];
    next[i] = val.replace(/[^0-9]/g, '');
    setValues(next);
  };

  const handleSubmitCell = (i: number) => {
    if (i <= 1 || submitted[i]) return;
    const dp = expectedDp();
    const isCorrect = parseInt(values[i]) === dp[i];
    const nextSubmitted = [...submitted];
    const nextCorrect = [...correct];
    nextSubmitted[i] = true;
    nextCorrect[i] = isCorrect;
    setSubmitted(nextSubmitted);
    setCorrect(nextCorrect);

    if (i === n && isCorrect) {
      setDone(true);
      setTimeout(() => onSolve(true, 0), 700);
    }
  };

  const reset = () => {
    setValues(initial);
    setSubmitted(Array(n + 1).fill(false));
    setCorrect(Array(n + 1).fill(null));
    setDone(false);
    setActiveCell(null);
  };

  const allPreviousCorrect = (i: number) => {
    for (let j = 2; j < i; j++) {
      if (!submitted[j] || !correct[j]) return false;
    }
    return true;
  };

  const dp = expectedDp();

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Staircase visual */}
      <div className="flex items-end justify-center gap-0.5 h-20 select-none">
        {Array.from({ length: n }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            style={{ height: `${((i + 1) / n) * 100}%` }}
            className={cn(
              'w-8 rounded-t-sm origin-bottom transition-colors',
              done
                ? 'bg-emerald-500/40 border border-emerald-500/30'
                : 'bg-indigo-500/20 border border-indigo-500/20'
            )}
          />
        ))}
      </div>

      {/* DP recurrence reminder */}
      <div className="px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e] text-xs text-[#6b6b8a] font-mono text-center">
        <span className="text-indigo-300">dp[i]</span>
        {' = '}
        <span className="text-violet-300">dp[i-1]</span>
        {' + '}
        <span className="text-pink-300">dp[i-2]</span>
        <span className="text-[#3d3d5c] ml-3">base: dp[0]=1, dp[1]=1</span>
      </div>

      {/* DP Table */}
      <div className="flex items-start gap-2 flex-wrap justify-center">
        {Array.from({ length: n + 1 }, (_, i) => {
          const isBase = i <= 1;
          const isSubmitted = submitted[i];
          const isCorrectCell = correct[i];
          const isActive = activeCell === i;
          const unlocked = i <= 1 || allPreviousCorrect(i);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xs text-[#3d3d5c] font-mono">dp[{i}]</span>
              <div
                className={cn(
                  'relative w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all',
                  isBase && 'bg-indigo-500/10 border-indigo-500/30',
                  !isBase && !isSubmitted && !isActive && unlocked && 'bg-[#111118] border-[#1e1e2e] hover:border-[#2a2a3e] cursor-text',
                  !isBase && !isSubmitted && !unlocked && 'bg-[#0a0a0f] border-[#16161f] opacity-40',
                  isSubmitted && isCorrectCell && 'bg-emerald-500/10 border-emerald-500/40',
                  isSubmitted && !isCorrectCell && 'bg-rose-500/10 border-rose-500/40',
                  isActive && !isSubmitted && 'border-indigo-500 bg-indigo-500/10',
                )}
              >
                {isBase ? (
                  <span className="text-sm font-bold font-mono text-indigo-300">{i === 0 ? 1 : 1}</span>
                ) : isSubmitted ? (
                  <span className={cn(
                    'text-sm font-bold font-mono',
                    isCorrectCell ? 'text-emerald-300' : 'text-rose-300'
                  )}>
                    {values[i]}
                  </span>
                ) : unlocked ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    value={values[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onFocus={() => setActiveCell(i)}
                    onBlur={() => setActiveCell(null)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitCell(i); }}
                    className="w-full h-full text-center text-sm font-bold font-mono bg-transparent text-[#e8e8f0] outline-none rounded-xl"
                    placeholder="?"
                  />
                ) : (
                  <span className="text-[#3d3d5c] text-lg">?</span>
                )}
                {isSubmitted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      'absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]',
                      isCorrectCell ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    )}
                  >
                    {isCorrectCell ? '✓' : '✗'}
                  </motion.div>
                )}
              </div>
              {!isBase && unlocked && !isSubmitted && (
                <button
                  onClick={() => handleSubmitCell(i)}
                  disabled={!values[i]}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  check
                </button>
              )}
              {isSubmitted && !isCorrectCell && (
                <span className="text-[10px] text-[#6b6b8a]">
                  was {dp[i]}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Hint: show previous two for current cell */}
      {activeCell !== null && activeCell >= 2 && !submitted[activeCell] && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e] text-xs text-[#6b6b8a] font-mono"
          >
            dp[{activeCell}] = dp[{activeCell - 1}] + dp[{activeCell - 2}]{' '}
            {submitted[activeCell - 1] && correct[activeCell - 1] && submitted[activeCell - 2] && correct[activeCell - 2] && (
              <span className="text-indigo-300">
                = {values[activeCell - 1]} + {values[activeCell - 2]} = {parseInt(values[activeCell - 1] || '0') + parseInt(values[activeCell - 2] || '0')}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Done banner */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center gap-2"
          >
            <Check size={16} />
            f({n}) = {config.correctAnswer} ways to climb {n} stairs!
          </motion.div>
        )}
      </AnimatePresence>

      <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
        Reset
      </Button>
    </div>
  );
}

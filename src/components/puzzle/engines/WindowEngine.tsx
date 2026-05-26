'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface WindowEngineProps {
  config: {
    sequence: (string | number)[];
    windowConstraint: { type: 'no-repeat' | 'sum-equals' | 'max-sum'; value?: number };
    instruction: string;
    mode: string;
    correctAnswer: { start: number; end: number; length: number };
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function WindowEngine({ config, onSolve }: WindowEngineProps) {
  const n = config.sequence.length;
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [maxFound, setMaxFound] = useState<{ start: number; end: number } | null>(null);

  const windowSize = right - left + 1;
  const windowItems = config.sequence.slice(left, right + 1);

  const hasNoDuplicates = (arr: (string | number)[]) => new Set(arr).size === arr.length;
  const currentValid = config.windowConstraint.type === 'no-repeat' ? hasNoDuplicates(windowItems) : true;

  const expandRight = useCallback(() => {
    if (right < n - 1) setRight((r) => r + 1);
  }, [right, n]);

  const shrinkLeft = useCallback(() => {
    if (left < right) setLeft((l) => l + 1);
  }, [left, right]);

  const expandLeft = useCallback(() => {
    if (left > 0) setLeft((l) => l - 1);
  }, [left]);

  const shrinkRight = useCallback(() => {
    if (right > left) setRight((r) => r - 1);
  }, [right, left]);

  const markBest = useCallback(() => {
    setMaxFound({ start: left, end: right });
  }, [left, right]);

  const handleSubmit = useCallback(() => {
    // Use the explicitly marked best window, or fall back to current window (must be valid)
    const answer = maxFound ?? (currentValid ? { start: left, end: right } : null);
    if (!answer) return; // current window has repeats and no best marked

    const correct = answer.end - answer.start + 1 === config.correctAnswer.length;

    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);

    if (correct) {
      setTimeout(() => onSolve(true, 0), 600);
    } else {
      setTimeout(() => {
        setResult(null);
        setSubmitted(false);
      }, 1400);
    }
  }, [maxFound, left, right, currentValid, config.correctAnswer, onSolve]);

  const reset = useCallback(() => {
    setLeft(0);
    setRight(2);
    setSubmitted(false);
    setResult(null);
    setMaxFound(null);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Sequence with window overlay */}
      <div className="w-full overflow-x-auto py-8">
        {/* Centering wrapper — keeps the relative container shrink-wrapped to content */}
        <div className="flex justify-center">
          <div className="relative flex items-center gap-1 py-3">
            {/* Window bracket highlight */}
            <motion.div
              className={cn(
                'absolute inset-y-0 rounded-xl border-2 transition-colors duration-200 pointer-events-none',
                currentValid
                  ? 'bg-indigo-500/10 border-indigo-500/60'
                  : 'bg-rose-500/10 border-rose-500/60'
              )}
              style={{
                left: `${left * 52}px`,
                width: `${windowSize * 52 - 4}px`,
              }}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            />

            {/* Max found bracket */}
            {maxFound && (
              <motion.div
                className="absolute rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 pointer-events-none"
                style={{
                  left: `${maxFound.start * 52}px`,
                  width: `${(maxFound.end - maxFound.start + 1) * 52 - 4}px`,
                  top: 0,
                  bottom: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            {config.sequence.map((item, i) => {
            const inWindow = i >= left && i <= right;
            const isDuplicate =
              inWindow &&
              config.windowConstraint.type === 'no-repeat' &&
              windowItems.filter((w) => w === item).length > 1;

            return (
              <motion.div
                key={i}
                layout
                className={cn(
                  'relative w-12 h-12 rounded-xl border font-bold text-lg flex items-center justify-center z-10 transition-all duration-200',
                  inWindow && !isDuplicate && 'bg-[#111118] border-indigo-500/40 text-indigo-200',
                  inWindow && isDuplicate && 'bg-rose-500/15 border-rose-500 text-rose-300',
                  !inWindow && 'bg-[#0a0a0f] border-[#1e1e2e] text-[#3d3d5c]',
                )}
              >
                {item}
                {isDuplicate && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold"
                  >
                    ✗
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Window info */}
      <div className="flex items-center gap-4 text-sm">
        <div className="px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e] font-mono text-xs">
          <span className="text-[#6b6b8a]">window[</span>
          <span className="text-emerald-400">{left}</span>
          <span className="text-[#6b6b8a]">..</span>
          <span className="text-amber-400">{right}</span>
          <span className="text-[#6b6b8a]">]</span>
          <span className="text-[#e8e8f0] ml-2">= &quot;{windowItems.join('')}&quot;</span>
        </div>
        <div className={cn(
          'px-3 py-1.5 rounded-lg text-xs font-medium border',
          currentValid
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        )}>
          size: {windowSize} {currentValid ? '✓ valid' : '✗ has repeat'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="secondary" size="sm" onClick={expandLeft} disabled={left === 0} icon={<ChevronLeft size={13} />}>
            Expand Left
          </Button>
          <Button variant="secondary" size="sm" onClick={expandRight} disabled={right === n - 1} iconRight={<ChevronRight size={13} />}>
            Expand Right
          </Button>
          <Button variant="ghost" size="sm" onClick={shrinkLeft} disabled={left >= right}>
            Shrink Left →
          </Button>
          <Button variant="ghost" size="sm" onClick={shrinkRight} disabled={right <= left}>
            ← Shrink Right
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={markBest}
            disabled={!currentValid}
            className="flex-1"
          >
            Mark as Best ({windowSize})
          </Button>
        </div>

        {maxFound && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-400 flex items-center gap-1"
          >
            <Check size={12} />
            Best window marked: length {maxFound.end - maxFound.start + 1}
          </motion.div>
        )}
      </div>

      {/* Submit */}
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
            {result === 'correct' ? `✓ Correct! Longest window = ${config.correctAnswer.length} characters` : `✗ Not the longest valid window. Keep searching — find a longer no-repeat stretch and mark it as best.`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>Reset</Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={submitted || (!maxFound && !currentValid)}
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}

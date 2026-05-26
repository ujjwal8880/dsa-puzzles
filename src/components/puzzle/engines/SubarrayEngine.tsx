'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SubarrayEngineProps {
  config: {
    array: (number | string)[];
    instruction: string;
    mode: 'max-sum' | 'max-product' | 'palindrome';
    correctValue: number;
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

function computeValue(arr: (number | string)[], mode: string): number {
  if (mode === 'max-sum') return (arr as number[]).reduce((a, b) => a + b, 0);
  if (mode === 'max-product') return (arr as number[]).reduce((a, b) => (a as number) * (b as number), 1) as number;
  if (mode === 'palindrome') return arr.length;
  return 0;
}

function checkPalindrome(arr: (number | string)[]): boolean {
  const s = arr.map(String);
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}

export function SubarrayEngine({ config, onSolve }: SubarrayEngineProps) {
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const handleClick = useCallback((i: number) => {
    if (submitted) return;
    if (start === null) {
      setStart(i);
    } else if (end === null) {
      if (i === start) {
        setStart(null);
      } else {
        setStart(Math.min(start, i));
        setEnd(Math.max(start, i));
      }
    } else {
      setStart(i);
      setEnd(null);
    }
  }, [start, end, submitted]);

  const hasRange = start !== null && end !== null;
  const selection = hasRange
    ? config.array.slice(start, end! + 1)
    : start !== null
      ? [config.array[start]]
      : [];

  const currentValue = selection.length > 0 ? computeValue(selection, config.mode) : null;
  const palindromeOk = config.mode !== 'palindrome' || checkPalindrome(selection);

  const handleSubmit = useCallback(() => {
    if (!hasRange) return;
    const correct = currentValue === config.correctValue && palindromeOk;
    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);
    if (correct) {
      setTimeout(() => onSolve(true, 0), 600);
    } else {
      setTimeout(() => { setResult(null); setSubmitted(false); }, 1300);
    }
  }, [hasRange, currentValue, config.correctValue, palindromeOk, onSolve]);

  const reset = () => { setStart(null); setEnd(null); setSubmitted(false); setResult(null); };

  const inRange = (i: number) =>
    start !== null && end !== null ? i >= start && i <= end : i === start;

  const label = config.mode === 'max-sum' ? 'sum' : config.mode === 'max-product' ? 'product' : 'length';

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>
      <p className="text-xs text-[#3d3d5c]">
        Click a cell to set the <span className="text-emerald-400">start</span>, then click another to set the <span className="text-rose-400">end</span>.
      </p>

      {/* Array */}
      <div className="w-full overflow-x-auto py-4">
        <div className="flex justify-center">
          <div className="relative flex items-center gap-1 py-2">
            {hasRange && (
              <motion.div
                className="absolute inset-y-0 rounded-xl border-2 border-indigo-500/60 bg-indigo-500/10 pointer-events-none"
                style={{ left: `${start! * 52}px`, width: `${(end! - start! + 1) * 52 - 4}px` }}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              />
            )}
            {config.array.map((val, i) => (
              <motion.button
                key={i}
                onClick={() => handleClick(i)}
                whileHover={!submitted ? { scale: 1.06 } : {}}
                whileTap={!submitted ? { scale: 0.95 } : {}}
                className={cn(
                  'relative w-12 h-12 rounded-xl border font-bold text-base flex items-center justify-center z-10 transition-all duration-200 cursor-pointer',
                  hasRange && inRange(i)
                    ? 'bg-[#111118] border-indigo-500/40 text-indigo-200'
                    : i === start && !hasRange
                      ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-500/20'
                      : 'bg-[#0a0a0f] border-[#1e1e2e] text-[#3d3d5c] hover:border-indigo-500/30 hover:text-[#6b6b8a]'
                )}
              >
                {val}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Live value display */}
      <div className="min-h-10 flex items-center">
        {selection.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e] text-sm font-mono"
          >
            <span className="text-[#6b6b8a]">[{selection.join(', ')}]</span>
            <span className="text-[#3d3d5c]">→</span>
            <span className="font-semibold text-indigo-300">{label} = {currentValue}</span>
            {config.mode === 'palindrome' && selection.length > 1 && (
              <span className={palindromeOk ? 'text-emerald-400 text-xs' : 'text-rose-400 text-xs'}>
                {palindromeOk ? '✓ palindrome' : '✗ not a palindrome'}
              </span>
            )}
          </motion.div>
        ) : (
          <span className="text-xs text-[#3d3d5c]">
            {start !== null ? 'Now click the end of your selection' : 'Click any element to begin'}
          </span>
        )}
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
              ? `✓ Correct! Best ${label} = ${config.correctValue}`
              : config.mode === 'palindrome' && !palindromeOk
                ? '✗ That selection is not a palindrome. Try again.'
                : `✗ Not optimal — there's a subarray with a better ${label}. Keep exploring.`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>Reset</Button>
        <Button variant="primary" size="md" onClick={handleSubmit} disabled={!hasRange || submitted}>
          Submit
        </Button>
      </div>
    </div>
  );
}

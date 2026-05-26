'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SearchEngineProps {
  config: {
    array: number[];
    target: number;
    instruction: string;
    mode: string;
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function SearchEngine({ config, onSolve }: SearchEngineProps) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(config.array.length - 1);
  const [guesses, setGuesses] = useState<{ mid: number; result: 'high' | 'low' | 'found' }[]>([]);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);

  const mid = Math.floor((left + right) / 2);
  const midValue = config.array[mid];

  const guess = useCallback(() => {
    if (solved || failed) return;

    if (midValue === config.target) {
      setGuesses((g) => [...g, { mid, result: 'found' }]);
      setSolved(true);
      setTimeout(() => onSolve(true, 0), 600);
      return;
    }

    if (left > right) {
      setFailed(true);
      setTimeout(() => onSolve(false, 0), 600);
      return;
    }

    if (midValue < config.target) {
      setGuesses((g) => [...g, { mid, result: 'low' }]);
      setLeft(mid + 1);
    } else {
      setGuesses((g) => [...g, { mid, result: 'high' }]);
      setRight(mid - 1);
    }
  }, [left, right, mid, midValue, config.target, solved, failed, onSolve]);

  const reset = useCallback(() => {
    setLeft(0);
    setRight(config.array.length - 1);
    setGuesses([]);
    setSolved(false);
    setFailed(false);
  }, [config.array.length]);

  const visitedIndices = guesses.map((g) => g.mid);
  const activeRange = Array.from({ length: right - left + 1 }, (_, i) => left + i);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center">
        <p className="text-[#6b6b8a] text-sm mb-2">{config.instruction}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e]">
          <span className="text-[#6b6b8a] text-sm">target =</span>
          <span className="text-xl font-bold text-indigo-400">{config.target}</span>
        </div>
      </div>

      {/* Array visualization */}
      <div className="w-full overflow-x-auto py-4">
        <div className="flex items-end justify-center gap-2 min-w-max mx-auto">
          {config.array.map((val, i) => {
            const isActive = i >= left && i <= right;
            const isMid = i === mid && !solved;
            const isVisited = visitedIndices.includes(i) && !isMid;
            const isSolved = solved && i === mid;
            const isFailed = failed;

            return (
              <div key={i} className="flex flex-col items-center gap-1">
                {/* Pointer labels */}
                <div className="h-5 flex items-center justify-center gap-1">
                  {i === left && <span className="text-[10px] text-emerald-400 font-mono">L</span>}
                  {i === right && <span className="text-[10px] text-amber-400 font-mono">R</span>}
                  {isMid && <span className="text-[10px] text-indigo-400 font-mono">M</span>}
                </div>

                <motion.div
                  layout
                  animate={{
                    scale: isMid ? 1.1 : 1,
                    y: isMid ? -4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'w-12 h-12 rounded-xl border font-bold text-lg flex items-center justify-center transition-colors duration-300',
                    !isActive && !isVisited && 'bg-[#0a0a0f] border-[#1e1e2e] text-[#2a2a3e]',
                    isActive && !isMid && 'bg-[#111118] border-[#2a2a3e] text-[#6b6b8a]',
                    isMid && 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/30',
                    isVisited && 'bg-[#16161f] border-[#2a2a3e] text-[#3d3d5c]',
                    isSolved && 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/30',
                  )}
                >
                  {val}
                </motion.div>

                <span className="text-[10px] text-[#3d3d5c] font-mono">{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current state */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e]">
          <span className="text-emerald-400 font-mono text-xs">left</span>
          <span className="text-[#e8e8f0] font-bold">{left}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e]">
          <span className="text-indigo-400 font-mono text-xs">mid</span>
          <span className="text-[#e8e8f0] font-bold">{mid}</span>
          <span className="text-[#6b6b8a] text-xs">({midValue})</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e]">
          <span className="text-amber-400 font-mono text-xs">right</span>
          <span className="text-[#e8e8f0] font-bold">{right}</span>
        </div>
      </div>

      {/* Guess log */}
      <div className="w-full flex flex-wrap justify-center gap-2">
        <AnimatePresence>
          {guesses.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border',
                g.result === 'found' && 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                g.result === 'low' && 'bg-amber-500/10 border-amber-500/30 text-amber-400',
                g.result === 'high' && 'bg-rose-500/10 border-rose-500/30 text-rose-400',
              )}
            >
              {g.result === 'found' && <Check size={10} />}
              {g.result === 'low' && <ChevronUp size={10} />}
              {g.result === 'high' && <ChevronDown size={10} />}
              nums[{g.mid}]={config.array[g.mid]}
              {g.result === 'low' && ' → move left pointer up'}
              {g.result === 'high' && ' → move right pointer down'}
              {g.result === 'found' && ' → FOUND!'}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
          Reset
        </Button>
        {!solved && !failed && left <= right && (
          <Button variant="primary" size="md" onClick={guess}>
            Guess mid ({midValue})
          </Button>
        )}
        {failed && (
          <p className="text-rose-400 text-sm">Target not found — search space exhausted</p>
        )}
      </div>
    </div>
  );
}

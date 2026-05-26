'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HouseRobberEngineProps {
  config: {
    houses: number[];
    instruction: string;
    mode: 'linear' | 'circular';
    correctValue: number;
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

function hasAdjacent(sel: Set<number>, n: number, circular: boolean): boolean {
  for (const i of sel) {
    if (sel.has(i + 1)) return true;
    if (circular && sel.has(0) && sel.has(n - 1)) return true;
  }
  return false;
}

export function HouseRobberEngine({ config, onSolve }: HouseRobberEngineProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const n = config.houses.length;
  const conflict = hasAdjacent(selected, n, config.mode === 'circular');
  const total = Array.from(selected).reduce((s, i) => s + config.houses[i], 0);

  const toggle = useCallback((i: number) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (conflict || selected.size === 0) return;
    const correct = total === config.correctValue;
    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);
    if (correct) {
      setTimeout(() => onSolve(true, 0), 600);
    } else {
      setTimeout(() => { setResult(null); setSubmitted(false); }, 1300);
    }
  }, [conflict, selected, total, config.correctValue, onSolve]);

  const reset = () => { setSelected(new Set()); setSubmitted(false); setResult(null); };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>
      {config.mode === 'circular' && (
        <p className="text-xs text-amber-400/70 bg-amber-500/5 border border-amber-500/15 px-3 py-1.5 rounded-lg">
          ⚠ Circular layout — first and last houses are also neighbors
        </p>
      )}

      {/* Houses */}
      <div className="w-full overflow-x-auto py-2">
        <div className="flex justify-center gap-3 min-w-fit mx-auto flex-wrap">
          {config.houses.map((val, i) => {
            const isSel = selected.has(i);
            const adjConflict = isSel && (
              selected.has(i - 1) || selected.has(i + 1) ||
              (config.mode === 'circular' && ((i === 0 && selected.has(n - 1)) || (i === n - 1 && selected.has(0))))
            );

            return (
              <motion.button
                key={i}
                onClick={() => toggle(i)}
                whileHover={!submitted ? { scale: 1.06, y: -2 } : {}}
                whileTap={!submitted ? { scale: 0.95 } : {}}
                className={cn(
                  'flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border-2 min-w-[64px] transition-all duration-200 cursor-pointer',
                  adjConflict
                    ? 'bg-rose-500/15 border-rose-500 text-rose-300'
                    : isSel
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/15'
                      : 'bg-[#111118] border-[#1e1e2e] text-[#6b6b8a] hover:border-indigo-500/30 hover:text-[#e8e8f0]'
                )}
              >
                <Home
                  size={18}
                  className={adjConflict ? 'text-rose-400' : isSel ? 'text-emerald-400' : 'text-[#3d3d5c]'}
                />
                <span className="font-bold text-xl leading-none">${val}</span>
                <span className="text-[9px] opacity-50">house {i}</span>
                {isSel && !adjConflict && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center"
                  >
                    <span className="text-white text-[8px]">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Total */}
      <div className="min-h-10 flex items-center">
        {selected.size > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              'px-4 py-2 rounded-xl border text-sm font-mono',
              conflict
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                : 'bg-[#111118] border-[#1e1e2e] text-[#e8e8f0]'
            )}
          >
            {conflict
              ? '⚠ Adjacent houses selected — can\'t rob neighbors!'
              : <>Total loot: <span className="text-emerald-400 font-bold">${total}</span></>
            }
          </motion.div>
        ) : (
          <span className="text-xs text-[#3d3d5c]">Click houses to rob them</span>
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
              ? `✓ Correct! Maximum loot = $${config.correctValue}`
              : `✗ Not the maximum. Try a different combination of non-adjacent houses.`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>Reset</Button>
        <Button variant="primary" size="md" onClick={handleSubmit} disabled={selected.size === 0 || conflict || submitted}>
          Submit
        </Button>
      </div>
    </div>
  );
}

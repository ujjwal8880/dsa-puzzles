'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, TrendingUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface TwoPointerEngineProps {
  config: {
    array: number[];
    instruction: string;
    mode: 'two-sum-sorted' | 'container-water' | 'three-sum' | 'palindrome' | 'buy-sell';
    target?: number;
    correctBuyIndex?: number;
    correctSellIndex?: number;
    label?: string;
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function TwoPointerEngine({ config, onSolve }: TwoPointerEngineProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const n = config.array.length;
  const maxVal = Math.max(...config.array);

  const handleSelect = (i: number) => {
    if (submitted) return;
    if (config.mode === 'buy-sell') {
      setSelected((prev) => {
        if (prev.includes(i)) return prev.filter((s) => s !== i);
        if (prev.length >= 2) return [prev[1], i];
        return [...prev, i].sort((a, b) => a - b);
      });
    }
  };

  const handleSubmit = useCallback(() => {
    if (selected.length < 2) return;
    const [buyIdx, sellIdx] = selected;

    let correct = false;
    if (config.mode === 'buy-sell') {
      const profit = config.array[sellIdx] - config.array[buyIdx];
      const maxProfit = config.array[config.correctSellIndex!] - config.array[config.correctBuyIndex!];
      correct = profit === maxProfit && buyIdx < sellIdx;
    }

    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);
    if (correct) {
      setTimeout(() => onSolve(true, 0), 600);
    } else {
      setTimeout(() => {
        setResult(null);
        setSubmitted(false);
        setSelected([]);
      }, 1200);
    }
  }, [selected, config, onSolve]);

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
    setResult(null);
  };

  const buyIdx = selected[0];
  const sellIdx = selected[1];
  const profit = selected.length === 2 ? config.array[sellIdx] - config.array[buyIdx] : null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Price chart */}
      <div className="w-full bg-[#111118] border border-[#1e1e2e] rounded-2xl p-4 sm:p-6 overflow-x-auto">
        <div className="flex items-end justify-center gap-2 h-40 min-w-fit mx-auto">
          {config.array.map((val, i) => {
            const heightPct = (val / maxVal) * 100;
            const isBuy = i === buyIdx;
            const isSell = i === sellIdx;
            const isInRange = buyIdx !== undefined && sellIdx !== undefined && i > buyIdx && i < sellIdx;

            return (
              <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => handleSelect(i)}>
                <AnimatePresence>
                  {(isBuy || isSell) && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded',
                        isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      )}
                    >
                      {isBuy ? 'BUY' : 'SELL'}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  layout
                  animate={{
                    backgroundColor: isBuy
                      ? 'rgb(16 185 129 / 0.8)'
                      : isSell
                        ? 'rgb(239 68 68 / 0.8)'
                        : isInRange
                          ? 'rgb(99 102 241 / 0.3)'
                          : 'rgb(42 42 62 / 0.8)',
                    scale: isBuy || isSell ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-8 rounded-t-lg relative"
                  style={{ height: `${heightPct}%`, minHeight: '8px' }}
                >
                  {isBuy && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                  )}
                  {isSell && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50" />
                  )}
                </motion.div>
                <span className="text-[10px] text-[#6b6b8a] font-mono">{val}</span>
                <span className="text-[9px] text-[#3d3d5c]">d{i}</span>
              </div>
            );
          })}
        </div>

        {/* Profit indicator */}
        {profit !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border',
              profit > 0
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            )}
          >
            <TrendingUp size={14} />
            Profit: ${profit} (buy @ {config.array[buyIdx]}, sell @ {config.array[sellIdx]})
          </motion.div>
        )}
      </div>

      <p className="text-xs text-[#6b6b8a]">Click a bar to select buy day, then sell day</p>

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
              ? `✓ Correct! Max profit = $${config.array[config.correctSellIndex!] - config.array[config.correctBuyIndex!]}`
              : '✗ Not the maximum profit. Try buying at the lowest point!'}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>Reset</Button>
        <Button variant="primary" size="md" onClick={handleSubmit} disabled={selected.length < 2 || submitted}>
          {result === 'correct' ? <><Check size={14} /> Correct!</> : 'Submit Trade'}
        </Button>
      </div>
    </div>
  );
}

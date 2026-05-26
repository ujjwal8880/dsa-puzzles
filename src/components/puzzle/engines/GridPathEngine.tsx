'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface GridPathEngineProps {
  config: {
    grid: number[][];
    instruction: string;
    mode: 'min-sum' | 'obstacles';
    correctValue: number;
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function GridPathEngine({ config, onSolve }: GridPathEngineProps) {
  const rows = config.grid.length;
  const cols = config.grid[0].length;

  const [path, setPath] = useState<[number, number][]>([[0, 0]]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const isObstacle = (r: number, c: number) =>
    config.mode === 'obstacles' && config.grid[r][c] === 1;

  const last = path[path.length - 1];
  const inPath = (r: number, c: number) => path.some(([pr, pc]) => pr === r && pc === c);
  const isLast = (r: number, c: number) => last[0] === r && last[1] === c;
  const canReach = (r: number, c: number) =>
    (r === last[0] && c === last[1] + 1) || (r === last[0] + 1 && c === last[1]);

  const handleClick = useCallback((r: number, c: number) => {
    if (submitted || isObstacle(r, c)) return;
    if (isLast(r, c) && path.length > 1) {
      setPath(p => p.slice(0, -1));
      return;
    }
    if (!canReach(r, c) || inPath(r, c)) return;
    setPath(p => [...p, [r, c]]);
  }, [path, submitted]);

  const pathSum = config.mode === 'min-sum'
    ? path.reduce((s, [r, c]) => s + config.grid[r][c], 0)
    : path.length;

  const reachedEnd = isLast(rows - 1, cols - 1);

  const handleSubmit = useCallback(() => {
    if (!reachedEnd) return;
    const correct = pathSum === config.correctValue;
    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);
    if (correct) {
      setTimeout(() => onSolve(true, 0), 600);
    } else {
      setTimeout(() => { setResult(null); setSubmitted(false); setPath([[0, 0]]); }, 1400);
    }
  }, [reachedEnd, pathSum, config.correctValue, onSolve]);

  const reset = () => { setPath([[0, 0]]); setSubmitted(false); setResult(null); };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>
      <p className="text-xs text-[#3d3d5c]">
        Click cells to build your path (right or down only). Click the last cell to undo a step.
      </p>

      {/* Grid */}
      <div className="flex flex-col gap-1">
        {config.grid.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((val, c) => {
              const obstacle = isObstacle(r, c);
              const selected = inPath(r, c);
              const last_ = isLast(r, c);
              const start = r === 0 && c === 0;
              const end = r === rows - 1 && c === cols - 1;
              const reachable = !obstacle && !submitted && (last_ || canReach(r, c));

              return (
                <motion.button
                  key={c}
                  onClick={() => handleClick(r, c)}
                  whileHover={reachable && !last_ ? { scale: 1.08 } : {}}
                  className={cn(
                    'w-12 h-12 rounded-xl border-2 font-bold text-sm flex items-center justify-center relative transition-all duration-200',
                    obstacle
                      ? 'bg-[#1a1a2e] border-[#2a2a3e] text-[#3d3d5c] cursor-not-allowed'
                      : end && selected
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200 cursor-pointer shadow-lg shadow-emerald-500/20'
                        : last_ && !end
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 cursor-pointer shadow-lg shadow-indigo-500/20'
                          : selected
                            ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300 cursor-pointer'
                            : reachable
                              ? 'bg-[#111118] border-[#2a2a3e] text-[#6b6b8a] hover:border-indigo-500/40 hover:text-[#e8e8f0] cursor-pointer'
                              : 'bg-[#0a0a0f] border-[#1e1e2e] text-[#2a2a3e] cursor-not-allowed'
                  )}
                >
                  {obstacle ? (
                    <span className="text-[#3d3d5c] text-lg">✕</span>
                  ) : (
                    config.mode === 'min-sum' ? val : null
                  )}
                  {start && <span className="absolute top-0.5 left-1 text-[8px] text-indigo-400 font-normal">S</span>}
                  {end && <span className="absolute top-0.5 right-1 text-[8px] text-emerald-400 font-normal">E</span>}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Path info */}
      <div className="min-h-10 flex items-center">
        {config.mode === 'min-sum' && (
          <div className="px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e] text-sm font-mono">
            <span className="text-[#6b6b8a]">Path sum: </span>
            <span className="text-indigo-300 font-bold">{pathSum}</span>
            {reachedEnd && <span className="ml-2 text-emerald-400 text-xs">✓ reached end</span>}
          </div>
        )}
        {config.mode === 'obstacles' && (
          <div className="px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e] text-sm">
            {reachedEnd
              ? <span className="text-emerald-400">✓ Found a valid path!</span>
              : <span className="text-[#6b6b8a]">Navigate to the bottom-right corner</span>
            }
          </div>
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
              ? `✓ Correct! Minimum path sum = ${config.correctValue}`
              : `✗ Not the minimum path. There's a cheaper route — try again.`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>Reset</Button>
        <Button variant="primary" size="md" onClick={handleSubmit} disabled={!reachedEnd || submitted}>
          Submit Path
        </Button>
      </div>
    </div>
  );
}

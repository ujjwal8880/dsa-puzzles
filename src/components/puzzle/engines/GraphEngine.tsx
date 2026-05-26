'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface GraphEngineConfig {
  grid: string[][];
  instruction: string;
  mode: string;
  correctAnswer: number;
}

interface GraphEngineProps {
  config: GraphEngineConfig;
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

const ISLAND_COLORS = [
  { bg: 'bg-indigo-500/30', border: 'border-indigo-500/60', text: 'text-indigo-300' },
  { bg: 'bg-emerald-500/30', border: 'border-emerald-500/60', text: 'text-emerald-300' },
  { bg: 'bg-amber-500/30', border: 'border-amber-500/60', text: 'text-amber-300' },
  { bg: 'bg-violet-500/30', border: 'border-violet-500/60', text: 'text-violet-300' },
  { bg: 'bg-rose-500/30', border: 'border-rose-500/60', text: 'text-rose-300' },
];

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

export function GraphEngine({ config, onSolve }: GraphEngineProps) {
  const { grid } = config;
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  // cellIsland[r][c] = island index (0-indexed), -1 = water, -2 = land unvisited
  const initCellIsland = () =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => (grid[r][c] === '1' ? -2 : -1))
    );

  const [cellIsland, setCellIsland] = useState<number[][]>(initCellIsland);
  const [islandCount, setIslandCount] = useState(0);
  const [allVisited, setAllVisited] = useState(false);
  const [done, setDone] = useState(false);
  const [animating, setAnimating] = useState<string | null>(null);

  const floodFill = useCallback(
    (startR: number, startC: number) => {
      if (cellIsland[startR][startC] !== -2 || animating) return;

      const newCellIsland = cellIsland.map((row) => [...row]);
      const islandIdx = islandCount;
      const queue: [number, number][] = [[startR, startC]];
      const visited = new Set<string>();

      while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        const key = `${r},${c}`;
        if (visited.has(key)) continue;
        if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
        if (newCellIsland[r][c] !== -2) continue;
        visited.add(key);
        newCellIsland[r][c] = islandIdx;
        for (const [dr, dc] of DIRS) queue.push([r + dr, c + dc]);
      }

      const newCount = islandCount + 1;
      setCellIsland(newCellIsland);
      setIslandCount(newCount);
      setAnimating(`${startR},${startC}`);
      setTimeout(() => setAnimating(null), 400);

      const stillUnvisited = newCellIsland.some((row) => row.some((v) => v === -2));
      if (!stillUnvisited) {
        setAllVisited(true);
        if (newCount === config.correctAnswer) {
          setDone(true);
          setTimeout(() => onSolve(true, 0), 700);
        }
      }
    },
    [cellIsland, islandCount, rows, cols, config.correctAnswer, animating, onSolve]
  );

  const reset = () => {
    setCellIsland(initCellIsland());
    setIslandCount(0);
    setAllVisited(false);
    setDone(false);
    setAnimating(null);
  };

  const cellSize = cols <= 5 ? 48 : cols <= 8 ? 40 : 32;

  return (
    <div className="flex flex-col gap-5 items-center w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-[#6b6b8a]">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-[#1e3a2f] border border-emerald-800 inline-block" />
          Land (click to explore)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-[#0a0a0f] border border-[#1e1e2e] inline-block" />
          Water
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-indigo-500/30 border border-indigo-500/60 inline-block" />
          Explored
        </span>
      </div>

      {/* Grid */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}
      >
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const islandIdx = cellIsland[r][c];
            const isWater = islandIdx === -1;
            const isUnvisited = islandIdx === -2;
            const isExplored = islandIdx >= 0;
            const color = isExplored ? ISLAND_COLORS[islandIdx % ISLAND_COLORS.length] : null;

            return (
              <motion.button
                key={`${r},${c}`}
                style={{ width: cellSize, height: cellSize }}
                whileHover={isUnvisited ? { scale: 1.1 } : {}}
                whileTap={isUnvisited ? { scale: 0.95 } : {}}
                onClick={() => floodFill(r, c)}
                className={cn(
                  'rounded-lg border font-mono text-xs font-bold flex items-center justify-center transition-all',
                  isWater && 'bg-[#0a0a0f] border-[#1e1e2e] text-[#2a2a3e] cursor-default',
                  isUnvisited && 'bg-[#1e3a2f] border-emerald-800/60 text-emerald-600 cursor-pointer hover:bg-[#1e4a35] hover:border-emerald-600/60',
                  isExplored && color && `${color.bg} ${color.border} ${color.text}`,
                )}
              >
                {isWater ? '~' : isUnvisited ? '1' : '✓'}
              </motion.button>
            );
          })
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[#6b6b8a]">Islands found:</span>
          <motion.span
            key={islandCount}
            initial={{ scale: 1.5, color: '#818cf8' }}
            animate={{ scale: 1, color: '#e8e8f0' }}
            className="font-bold font-mono text-[#e8e8f0]"
          >
            {islandCount}
          </motion.span>
        </div>
        {allVisited && !done && (
          <span className="text-amber-400 text-xs">Expected {config.correctAnswer}</span>
        )}
      </div>

      {/* Instructions */}
      {!allVisited && islandCount === 0 && (
        <p className="text-xs text-[#6b6b8a] text-center max-w-sm">
          Click any green land cell to start a DFS flood fill. Each click explores one connected island.
        </p>
      )}

      {!allVisited && islandCount > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#6b6b8a] text-center"
        >
          Keep clicking unexplored land cells to find remaining islands.
        </motion.p>
      )}

      {/* Island color legend */}
      {islandCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {Array.from({ length: islandCount }, (_, i) => {
            const color = ISLAND_COLORS[i % ISLAND_COLORS.length];
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn('px-2.5 py-1 rounded-lg text-xs font-medium border', color.bg, color.border, color.text)}
              >
                Island {i + 1}
              </motion.span>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center gap-2"
          >
            <Check size={16} />
            Correct! {config.correctAnswer} islands found via DFS flood fill.
          </motion.div>
        )}
      </AnimatePresence>

      <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
        Reset
      </Button>
    </div>
  );
}

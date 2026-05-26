'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface TreeNode {
  val: number;
  left?: number | null;
  right?: number | null;
  x: number; // 0-1 fractional position
  y: number; // depth level
}

interface TreeEngineConfig {
  nodes: TreeNode[];
  p: number;
  q: number;
  instruction: string;
  mode: string;
  correctAnswer: number;
}

interface TreeEngineProps {
  config: TreeEngineConfig;
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function TreeEngine({ config, onSolve }: TreeEngineProps) {
  const { nodes, p, q, correctAnswer } = config;

  const nodeMap = new Map(nodes.map((n) => [n.val, n]));
  const root = nodes[0];

  const [currentVal, setCurrentVal] = useState<number>(root.val);
  const [path, setPath] = useState<number[]>([root.val]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [done, setDone] = useState(false);

  const currentNode = nodeMap.get(currentVal)!;

  const handleNavLeft = () => {
    if (!currentNode.left || done) return;
    const next = currentNode.left;
    setCurrentVal(next);
    setPath([...path, next]);
  };

  const handleNavRight = () => {
    if (!currentNode.right || done) return;
    const next = currentNode.right;
    setCurrentVal(next);
    setPath([...path, next]);
  };

  const handleSelectLCA = () => {
    const isCorrect = currentVal === correctAnswer;
    setResult(isCorrect ? 'correct' : 'wrong');
    setDone(true);
    setTimeout(() => onSolve(isCorrect, 0), isCorrect ? 700 : 1200);
  };

  const reset = () => {
    setCurrentVal(root.val);
    setPath([root.val]);
    setResult(null);
    setDone(false);
  };

  // Hint logic for BST LCA
  const hint = (() => {
    const cur = currentVal;
    const isLeftCase = p < cur && q < cur;
    const isRightCase = p > cur && q > cur;
    if (isLeftCase) return `Both ${p} and ${q} < ${cur} → go left`;
    if (isRightCase) return `Both ${p} and ${q} > ${cur} → go right`;
    return `${p} and ${q} are on opposite sides of ${cur} → this is the LCA!`;
  })();

  const treeH = Math.max(180, (Math.max(...nodes.map((n) => n.y)) + 1) * 60);

  return (
    <div className="flex flex-col gap-5 items-center w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Targets */}
      <div className="flex items-center gap-4">
        <div className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-mono font-bold">
          p = {p}
        </div>
        <span className="text-[#3d3d5c]">and</span>
        <div className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-mono font-bold">
          q = {q}
        </div>
      </div>

      {/* Tree SVG */}
      <div
        className="relative w-full rounded-xl border border-[#1e1e2e] bg-[#111118] overflow-hidden"
        style={{ height: treeH }}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {nodes.map((node) => {
            const parentVals = nodes.filter(
              (n) => n.left === node.val || n.right === node.val
            );
            return parentVals.map((parent) => (
              <line
                key={`${parent.val}-${node.val}`}
                x1={`${parent.x * 100}%`}
                y1={parent.y * 56 + 22}
                x2={`${node.x * 100}%`}
                y2={node.y * 56 + 22}
                stroke={path.includes(node.val) && path.includes(parent.val) ? '#4f46e5' : '#2a2a3e'}
                strokeWidth={path.includes(node.val) && path.includes(parent.val) ? 2 : 1.5}
              />
            ));
          })}
        </svg>

        {nodes.map((node) => {
          const isCurrent = node.val === currentVal;
          const isOnPath = path.includes(node.val) && node.val !== currentVal;
          const isP = node.val === p;
          const isQ = node.val === q;
          const isAnswer = node.val === correctAnswer && done && result === 'correct';

          return (
            <motion.div
              key={node.val}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: nodes.indexOf(node) * 0.04 }}
              className={cn(
                'absolute w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm -translate-x-1/2 -translate-y-1/2 transition-all',
                isCurrent && !done && 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-lg shadow-indigo-500/30 scale-110',
                isCurrent && done && result === 'correct' && 'bg-emerald-500/30 border-emerald-400 text-emerald-200',
                isCurrent && done && result === 'wrong' && 'bg-rose-500/30 border-rose-400 text-rose-200',
                isOnPath && !isCurrent && 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
                !isCurrent && !isOnPath && 'bg-[#16161f] border-[#2a2a3e] text-[#6b6b8a]',
                isAnswer && 'bg-emerald-500/30 border-emerald-400 text-emerald-200',
              )}
              style={{
                left: `${node.x * 100}%`,
                top: node.y * 56 + 22,
              }}
            >
              {node.val}
              {(isP || isQ) && (
                <span
                  className={cn(
                    'absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold',
                    isP ? 'bg-violet-500 text-white' : 'bg-pink-500 text-white'
                  )}
                >
                  {isP ? 'p' : 'q'}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Hint */}
      {!done && (
        <motion.div
          key={currentVal}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 rounded-xl bg-[#111118] border border-[#1e1e2e] text-xs text-[#6b6b8a] text-center max-w-sm"
        >
          <span className="text-indigo-300 font-semibold">At node {currentVal}: </span>
          {hint}
        </motion.div>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'px-6 py-3 rounded-xl border font-semibold text-sm flex items-center gap-2',
              result === 'correct'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            )}
          >
            {result === 'correct' ? (
              <><Check size={16} /> LCA({p}, {q}) = {correctAnswer}! Correct path.</>
            ) : (
              <>✗ Not quite — the LCA is {correctAnswer}. One of the targets is an ancestor of the other!</>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {!done && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNavLeft}
            disabled={!currentNode.left}
            icon={<ChevronLeft size={14} />}
          >
            Go Left ({currentNode.left ?? '—'})
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSelectLCA}
          >
            <Check size={14} />
            This is the LCA!
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNavRight}
            disabled={!currentNode.right}
          >
            Go Right ({currentNode.right ?? '—'})
            <ChevronRight size={14} />
          </Button>
        </div>
      )}

      {/* Path breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-[#6b6b8a]">
        <span>Path:</span>
        {path.map((v, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={10} className="text-[#3d3d5c]" />}
            <span className={cn('font-mono font-bold', v === currentVal ? 'text-indigo-300' : 'text-[#6b6b8a]')}>
              {v}
            </span>
          </span>
        ))}
      </div>

      <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
        Reset
      </Button>
    </div>
  );
}

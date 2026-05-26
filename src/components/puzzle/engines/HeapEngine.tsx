'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HeapEngineConfig {
  elements: number[];
  k: number;
  instruction: string;
  mode: string;
  correctAnswer: number;
}

interface HeapEngineProps {
  config: HeapEngineConfig;
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

// Min-heap helpers
function heapPush(heap: number[], val: number): number[] {
  const h = [...heap, val];
  let i = h.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (h[parent] > h[i]) { [h[parent], h[i]] = [h[i], h[parent]]; i = parent; }
    else break;
  }
  return h;
}

function heapPop(heap: number[]): [number[], number] {
  if (heap.length === 0) return [heap, -1];
  const h = [...heap];
  const min = h[0];
  const last = h.pop()!;
  if (h.length > 0) {
    h[0] = last;
    let i = 0;
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let smallest = i;
      if (l < h.length && h[l] < h[smallest]) smallest = l;
      if (r < h.length && h[r] < h[smallest]) smallest = r;
      if (smallest === i) break;
      [h[i], h[smallest]] = [h[smallest], h[i]];
      i = smallest;
    }
  }
  return [h, min];
}

// Build tree positions for heap visualization
function heapPositions(size: number): { x: number; y: number }[] {
  return Array.from({ length: size }, (_, i) => {
    const depth = Math.floor(Math.log2(i + 1));
    const pos = i - (Math.pow(2, depth) - 1);
    const total = Math.pow(2, depth);
    const x = (pos + 0.5) / total;
    return { x, y: depth };
  });
}

export function HeapEngine({ config, onSolve }: HeapEngineProps) {
  const { elements, k } = config;
  const [heap, setHeap] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [poppedLog, setPoppedLog] = useState<{ val: number; reason: string }[]>([]);
  const [lastAdded, setLastAdded] = useState<number | null>(null);
  const [lastPopped, setLastPopped] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const processNext = useCallback(() => {
    if (step >= elements.length || done) return;
    const val = elements[step];
    setLastAdded(val);
    setLastPopped(null);

    let newHeap = heapPush(heap, val);
    let newLog = [...poppedLog];

    if (newHeap.length > k) {
      const [afterPop, popped] = heapPop(newHeap);
      newHeap = afterPop;
      setLastPopped(popped);
      newLog = [...newLog, { val: popped, reason: `heap size exceeded k=${k}, popped min` }];
    }

    setHeap(newHeap);
    setPoppedLog(newLog);
    setStep(step + 1);

    if (step + 1 >= elements.length) {
      setDone(true);
      setTimeout(() => onSolve(true, 0), 800);
    }
  }, [step, elements, heap, k, poppedLog, done, onSolve]);

  const reset = () => {
    setHeap([]);
    setStep(0);
    setPoppedLog([]);
    setLastAdded(null);
    setLastPopped(null);
    setDone(false);
  };

  const positions = heapPositions(heap.length);
  const maxDepth = heap.length > 0 ? Math.floor(Math.log2(heap.length)) : 0;
  const treeH = Math.max(120, (maxDepth + 1) * 52);

  return (
    <div className="flex flex-col gap-5 items-center w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Input array */}
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs text-[#6b6b8a] uppercase tracking-wider text-center">Input Array</p>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {elements.map((el, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'w-10 h-10 rounded-lg border font-mono font-bold text-sm flex items-center justify-center transition-all',
                i < step && 'bg-[#16161f] border-[#2a2a3e] text-[#3d3d5c]',
                i === step && !done && 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20',
                i > step && 'bg-[#111118] border-[#1e1e2e] text-[#e8e8f0]',
              )}
            >
              {el}
            </motion.div>
          ))}
        </div>
        {step < elements.length && (
          <p className="text-xs text-center text-[#6b6b8a]">
            Next: add <span className="text-indigo-300 font-mono font-bold">{elements[step]}</span> to min-heap
          </p>
        )}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Min-heap tree visualization */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#6b6b8a] uppercase tracking-wider">Min-Heap (size k={k})</p>
            <span className="text-xs font-mono text-indigo-400">{heap.length}/{k}</span>
          </div>
          <div
            className="relative rounded-xl border border-[#1e1e2e] bg-[#111118] overflow-hidden"
            style={{ height: Math.max(120, treeH) }}
          >
            {heap.length === 0 ? (
              <p className="absolute inset-0 flex items-center justify-center text-xs text-[#3d3d5c] italic">empty</p>
            ) : (
              <>
                {/* Edges */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  {heap.map((_, i) => {
                    if (i === 0) return null;
                    const parent = Math.floor((i - 1) / 2);
                    const childPos = positions[i];
                    const parentPos = positions[parent];
                    const w = 100, h = treeH;
                    const x1 = parentPos.x * w;
                    const y1 = parentPos.y * 48 + 20;
                    const x2 = childPos.x * w;
                    const y2 = childPos.y * 48 + 20;
                    return (
                      <line
                        key={i}
                        x1={`${x1}%`} y1={y1} x2={`${x2}%`} y2={y2}
                        stroke="#2a2a3e" strokeWidth={1.5}
                      />
                    );
                  })}
                </svg>
                {/* Nodes */}
                {heap.map((val, i) => {
                  const pos = positions[i];
                  const isMin = i === 0;
                  const isNew = val === lastAdded && i === heap.length - 1 && !done;
                  return (
                    <motion.div
                      key={`${i}-${val}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={cn(
                        'absolute w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs -translate-x-1/2 -translate-y-1/2',
                        isMin && 'bg-rose-500/20 border-rose-500/60 text-rose-300',
                        !isMin && isNew && 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300',
                        !isMin && !isNew && 'bg-[#16161f] border-[#2a2a3e] text-[#e8e8f0]',
                        done && isMin && 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300',
                      )}
                      style={{ left: `${pos.x * 100}%`, top: pos.y * 48 + 20 }}
                    >
                      {val}
                    </motion.div>
                  );
                })}
              </>
            )}
          </div>
          {heap.length > 0 && (
            <p className="text-xs text-center text-[#6b6b8a]">
              heap top (min) = <span className={cn('font-mono font-bold', done ? 'text-emerald-300' : 'text-rose-300')}>{heap[0]}</span>
              {done && <span className="text-emerald-400 ml-2">← {k}{k === 1 ? 'st' : k === 2 ? 'nd' : k === 3 ? 'rd' : 'th'} largest!</span>}
            </p>
          )}
        </div>

        {/* Pop log */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#6b6b8a] uppercase tracking-wider">Evicted (too small)</p>
          <div className="min-h-[120px] rounded-xl border border-[#1e1e2e] bg-[#111118] p-3 flex flex-col gap-1.5 overflow-y-auto">
            <AnimatePresence>
              {poppedLog.length === 0 && (
                <p className="text-xs text-[#3d3d5c] italic">nothing evicted yet</p>
              )}
              {poppedLog.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xs font-mono rounded px-2 py-1 bg-rose-500/10 text-rose-400"
                >
                  <ChevronRight size={10} className="shrink-0" />
                  <span className="font-bold">{entry.val}</span>
                  <span className="text-rose-400/60 text-[10px]">evicted</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {lastPopped !== null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-rose-400 text-center"
            >
              Popped <span className="font-mono font-bold">{lastPopped}</span> (too small for top-{k})
            </motion.p>
          )}
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center gap-2"
          >
            <Check size={16} />
            The {k}{k === 1 ? 'st' : k === 2 ? 'nd' : k === 3 ? 'rd' : 'th'} largest element is{' '}
            <span className="font-mono font-bold">{config.correctAnswer}</span>!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
          Reset
        </Button>
        {!done && step < elements.length && (
          <Button variant="primary" size="md" onClick={processNext}>
            Add <span className="font-mono ml-1 text-indigo-200">{elements[step]}</span> to heap
          </Button>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ListNode {
  id: string;
  val: number;
}

export interface LinkedListEngineConfig {
  nodes: ListNode[];
  instruction: string;
  mode: 'reverse' | 'find-middle' | 'cycle' | 'remove-nth' | 'identify-head';
  correctAnswer: string; // node id OR 'yes'/'no' for cycle mode
  n?: number;             // for remove-nth
  hasCycle?: boolean;     // renders a loopback arrow
  cycleLabel?: string;    // optional extra note
}

interface LinkedListEngineProps {
  config: LinkedListEngineConfig;
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function LinkedListEngine({ config, onSolve }: LinkedListEngineProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [attempts, setAttempts] = useState(0);

  const evaluate = useCallback(
    (answerId: string) => {
      if (status === 'correct') return;
      const correct = answerId === config.correctAnswer;
      setSelected(answerId);
      setAttempts((a) => a + 1);
      setStatus(correct ? 'correct' : 'wrong');
      if (correct) {
        setTimeout(() => onSolve(true, 0), 700);
      } else {
        setTimeout(() => {
          setStatus('idle');
          setSelected(null);
        }, 900);
      }
    },
    [config.correctAnswer, onSolve, status]
  );

  const reset = useCallback(() => {
    setSelected(null);
    setStatus('idle');
  }, []);

  const isCycleMode = config.mode === 'cycle';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Instruction */}
      <p className="text-sm text-[#6b6b8a] text-center max-w-md">{config.instruction}</p>

      {config.n !== undefined && (
        <div className="px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-mono">
          n = {config.n}
        </div>
      )}

      {/* Linked list visualisation */}
      <div className="flex items-center flex-wrap justify-center gap-1 py-4">
        {config.nodes.map((node, idx) => {
          const isSelected = selected === node.id;
          const isCorrect = status === 'correct' && isSelected;
          const isWrong = status === 'wrong' && isSelected;

          return (
            <div key={node.id} className="flex items-center gap-1">
              <motion.button
                whileHover={!isCycleMode && status !== 'correct' ? { scale: 1.08 } : {}}
                whileTap={!isCycleMode && status !== 'correct' ? { scale: 0.94 } : {}}
                onClick={() => !isCycleMode && evaluate(node.id)}
                disabled={isCycleMode || status === 'correct'}
                className={cn(
                  'w-12 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-base transition-all duration-200 relative',
                  !isSelected && !isCycleMode &&
                    'bg-[#111118] border-[#2a2a3e] text-[#e8e8f0] hover:border-indigo-500/50 hover:bg-indigo-500/5 cursor-pointer',
                  isCycleMode && 'bg-[#111118] border-[#2a2a3e] text-[#e8e8f0] cursor-default',
                  isCorrect && 'bg-emerald-500/15 border-emerald-400 text-emerald-300',
                  isWrong && 'bg-rose-500/15 border-rose-400 text-rose-300',
                  isSelected && status === 'idle' && 'bg-indigo-500/15 border-indigo-400 text-indigo-300',
                )}
              >
                {node.val}
                {isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
                  >
                    <Check size={10} className="text-white" />
                  </motion.div>
                )}
                {isWrong && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"
                  >
                    <X size={10} className="text-white" />
                  </motion.div>
                )}
              </motion.button>

              {idx < config.nodes.length - 1 ? (
                <ArrowRight size={14} className="text-[#3d3d5c] shrink-0" />
              ) : (
                <div className="flex items-center gap-1">
                  {config.hasCycle ? (
                    <span className="text-amber-400/60 text-xs ml-1 font-mono">→ (cycle)</span>
                  ) : (
                    <>
                      <ArrowRight size={14} className="text-[#3d3d5c] shrink-0" />
                      <span className="text-[#4a4a6a] text-xs font-mono">null</span>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cycle mode buttons */}
      {isCycleMode && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => evaluate('yes')}
            disabled={status === 'correct'}
            className="px-6 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-600/30 transition-colors disabled:opacity-40"
          >
            ✓ Has Cycle
          </button>
          <button
            onClick={() => evaluate('no')}
            disabled={status === 'correct'}
            className="px-6 py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-400 text-sm font-semibold hover:bg-rose-600/30 transition-colors disabled:opacity-40"
          >
            ✕ No Cycle
          </button>
        </div>
      )}

      {/* Click hint */}
      {!isCycleMode && status !== 'correct' && (
        <p className="text-xs text-[#4a4a6a]">Click the correct node</p>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border',
              status === 'correct'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400',
            )}
          >
            {status === 'correct' ? <Check size={14} /> : <X size={14} />}
            {status === 'correct' ? 'Correct! Well done.' : 'Not quite — try again!'}
          </motion.div>
        )}
      </AnimatePresence>

      {attempts > 1 && status === 'idle' && (
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={13} />}>
            Reset
          </Button>
          <p className="text-xs text-[#4a4a6a]">{attempts} attempts — check the hints tab</p>
        </div>
      )}
    </div>
  );
}

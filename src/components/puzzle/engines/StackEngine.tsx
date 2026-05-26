'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, RefreshCw, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface StackOperation {
  char: string;
  action: 'push' | 'pop';
  description: string;
}

interface StackEngineProps {
  config: {
    sequence: string[];
    instruction: string;
    mode: string;
    operations: StackOperation[];
    correctFinalState: 'empty' | 'non-empty';
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

const PAIRS: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
const OPENERS = new Set(['(', '{', '[']);
const CLOSERS = new Set([')', '}', ']']);

export function StackEngine({ config, onSolve }: StackEngineProps) {
  const [stack, setStack] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<{ op: 'push' | 'pop' | 'mismatch'; char: string; stack: string[] }[]>([]);
  const [isMismatch, setIsMismatch] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<'valid' | 'invalid' | null>(null);

  const processNext = useCallback(() => {
    if (currentIndex >= config.sequence.length || isMismatch) return;

    const char = config.sequence[currentIndex];
    const newIndex = currentIndex + 1;

    if (OPENERS.has(char)) {
      const newStack = [...stack, char];
      setStack(newStack);
      setHistory((h) => [...h, { op: 'push', char, stack: newStack }]);
      setCurrentIndex(newIndex);
    } else if (CLOSERS.has(char)) {
      if (stack.length === 0 || stack[stack.length - 1] !== PAIRS[char]) {
        setIsMismatch(true);
        setHistory((h) => [...h, { op: 'mismatch', char, stack }]);
        setResult('invalid');
        setCompleted(true);
        setTimeout(() => onSolve(false, 0), 800);
        return;
      }
      const newStack = stack.slice(0, -1);
      setStack(newStack);
      setHistory((h) => [...h, { op: 'pop', char, stack: newStack }]);
      setCurrentIndex(newIndex);
    }

    if (newIndex >= config.sequence.length) {
      const isValid = stack.length === 1 ? (OPENERS.has(char) ? false : true) : true;
      // final check after this op
    }
  }, [currentIndex, stack, config.sequence, isMismatch, onSolve]);

  const finalize = useCallback(() => {
    const isValid = stack.length === 0 && !isMismatch;
    setResult(isValid ? 'valid' : 'invalid');
    setCompleted(true);
    setTimeout(() => onSolve(isValid, 0), 600);
  }, [stack, isMismatch, onSolve]);

  const reset = useCallback(() => {
    setStack([]);
    setCurrentIndex(0);
    setHistory([]);
    setIsMismatch(false);
    setCompleted(false);
    setResult(null);
  }, []);

  const canFinalize = currentIndex >= config.sequence.length && !completed;
  const canProcess = currentIndex < config.sequence.length && !isMismatch && !completed;
  const currentChar = config.sequence[currentIndex];

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-2xl mx-auto">
      <p className="text-[#6b6b8a] text-sm text-center">{config.instruction}</p>

      {/* Input sequence */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {config.sequence.map((char, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              'w-10 h-10 rounded-lg border font-mono font-bold text-lg flex items-center justify-center transition-all',
              i < currentIndex && 'bg-[#16161f] border-[#2a2a3e] text-[#3d3d5c]',
              i === currentIndex && !isMismatch && 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20',
              i === currentIndex && isMismatch && 'bg-rose-600/20 border-rose-500 text-rose-300',
              i > currentIndex && 'bg-[#111118] border-[#1e1e2e] text-[#6b6b8a]',
            )}
          >
            {char}
          </motion.div>
        ))}
      </div>

      {/* Arrow indicator */}
      {currentChar && !completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm"
        >
          <ChevronRight size={14} className="text-indigo-400" />
          <span className="text-[#6b6b8a]">
            {OPENERS.has(currentChar) ? (
              <span className="flex items-center gap-1">
                <ArrowDown size={12} className="text-emerald-400" />
                PUSH <span className="font-mono font-bold text-emerald-400 mx-1">{currentChar}</span> onto stack
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ArrowUp size={12} className="text-rose-400" />
                POP and match <span className="font-mono font-bold text-rose-400 mx-1">{PAIRS[currentChar]}</span>
              </span>
            )}
          </span>
        </motion.div>
      )}

      {/* Main area: stack + history */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stack visualization */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-[#6b6b8a] uppercase tracking-wider">Stack</p>
          <div className="w-full min-h-[160px] rounded-xl border border-[#1e1e2e] bg-[#111118] flex flex-col-reverse items-center justify-start p-3 gap-2 overflow-hidden">
            <AnimatePresence>
              {stack.length === 0 && (
                <p className="text-xs text-[#3d3d5c] italic">empty</p>
              )}
              {stack.map((char, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'w-10 h-10 rounded-lg font-mono font-bold text-lg flex items-center justify-center',
                    i === stack.length - 1
                      ? 'bg-indigo-600/20 border border-indigo-500/50 text-indigo-300'
                      : 'bg-[#16161f] border border-[#2a2a3e] text-[#6b6b8a]'
                  )}
                >
                  {char}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {stack.length > 0 && (
            <p className="text-xs text-[#6b6b8a]">
              top: <span className="font-mono text-indigo-400">{stack[stack.length - 1]}</span>
            </p>
          )}
        </div>

        {/* History log */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#6b6b8a] uppercase tracking-wider">Log</p>
          <div className="min-h-[160px] rounded-xl border border-[#1e1e2e] bg-[#111118] p-3 flex flex-col gap-1 overflow-y-auto">
            <AnimatePresence>
              {history.length === 0 && (
                <p className="text-xs text-[#3d3d5c] italic">no operations yet</p>
              )}
              {history.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'flex items-center gap-2 text-xs font-mono rounded px-2 py-1',
                    h.op === 'push' && 'bg-emerald-500/10 text-emerald-400',
                    h.op === 'pop' && 'bg-rose-500/10 text-rose-400',
                    h.op === 'mismatch' && 'bg-rose-600/20 text-rose-300',
                  )}
                >
                  {h.op === 'push' && '↓ PUSH'}
                  {h.op === 'pop' && '↑ POP'}
                  {h.op === 'mismatch' && '✗ MISMATCH'}
                  <span className="font-bold">{h.char}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Result banner */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'px-6 py-3 rounded-xl border font-semibold text-sm',
              result === 'valid' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            )}
          >
            {result === 'valid' ? '✓ Valid — stack is empty! All brackets matched.' : '✗ Invalid — bracket mismatch or unclosed brackets.'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
          Reset
        </Button>
        {canProcess && (
          <Button variant="primary" size="md" onClick={processNext}>
            Process <span className="font-mono ml-1 text-indigo-200">{currentChar}</span>
          </Button>
        )}
        {canFinalize && (
          <Button variant="primary" size="md" onClick={finalize}>
            <Check size={16} />
            Check Final State
          </Button>
        )}
      </div>
    </div>
  );
}

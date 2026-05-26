'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { highlight, scaleIn, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface MatchingItem {
  id: string;
  value: number | string;
  label?: string;
}

interface MatchingEngineProps {
  config: {
    items: MatchingItem[];
    target: number | string;
    instruction: string;
    correctAnswer: string[];
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function MatchingEngine({ config, onSolve }: MatchingEngineProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [state, setState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [wrongItems, setWrongItems] = useState<string[]>([]);

  const toggleSelect = useCallback((id: string) => {
    if (state !== 'idle') return;
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 2) return [...prev.slice(1), id];
      return [...prev, id];
    });
    setWrongItems([]);
  }, [state]);

  const handleCheck = useCallback(() => {
    if (selected.length !== 2) return;
    const isCorrect =
      selected.every((id) => config.correctAnswer.includes(id)) &&
      config.correctAnswer.every((id) => selected.includes(id));

    setAttempts((a) => a + 1);

    if (isCorrect) {
      setState('correct');
      setTimeout(() => onSolve(true, 0), 600);
    } else {
      setState('wrong');
      setWrongItems(selected);
      setTimeout(() => {
        setState('idle');
        setSelected([]);
        setWrongItems([]);
      }, 1000);
    }
  }, [selected, config.correctAnswer, onSolve]);

  const reset = useCallback(() => {
    setSelected([]);
    setState('idle');
    setWrongItems([]);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Target display */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-[#6b6b8a] text-sm mb-2">{config.instruction}</p>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#111118] border border-[#1e1e2e]">
          <span className="text-[#6b6b8a] text-sm">target =</span>
          <span className="text-2xl font-bold text-indigo-400">{config.target}</span>
        </div>
      </motion.div>

      {/* Number cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-3"
      >
        {config.items.map((item) => {
          const isSelected = selected.includes(item.id);
          const isWrong = wrongItems.includes(item.id);
          const isCorrect = state === 'correct' && selected.includes(item.id);

          return (
            <motion.button
              key={item.id}
              variants={scaleIn}
              animate={
                isCorrect ? 'correct' : isWrong ? 'wrong' : isSelected ? 'active' : 'idle'
              }
              custom={highlight}
              whileHover={state === 'idle' ? { scale: 1.05 } : {}}
              whileTap={state === 'idle' ? { scale: 0.95 } : {}}
              onClick={() => toggleSelect(item.id)}
              className={cn(
                'relative w-20 h-20 rounded-2xl border-2 font-bold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 px-1',
                !isSelected && !isWrong && 'bg-[#111118] border-[#2a2a3e] text-[#e8e8f0] hover:border-indigo-500/50 hover:bg-[#16161f]',
                isSelected && state === 'idle' && !isWrong && 'bg-indigo-600/15 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20',
                isWrong && 'bg-rose-600/15 border-rose-500 text-rose-300',
                isCorrect && 'bg-emerald-600/15 border-emerald-500 text-emerald-300',
              )}
            >
              <span className="text-2xl leading-none">{item.value}</span>
              {item.label && (
                <span className="text-[8px] font-normal text-[#6b6b8a] text-center leading-tight line-clamp-2 w-full">
                  {item.label}
                </span>
              )}
              {isSelected && state === 'idle' && !isWrong && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center"
                >
                  <Check size={10} className="text-white" />
                </motion.div>
              )}
              {isWrong && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center"
                >
                  <X size={10} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Selection preview */}
      <div className="flex items-center gap-3 h-10">
        <AnimatePresence mode="wait">
          {selected.length === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16161f] border border-[#2a2a3e] text-sm text-[#e8e8f0]"
            >
              {config.items.find((i) => i.id === selected[0])?.value}
              <span className="text-[#6b6b8a]">+</span>
              {config.items.find((i) => i.id === selected[1])?.value}
              <span className="text-[#6b6b8a]">=</span>
              <span className={cn(
                'font-bold',
                (Number(config.items.find((i) => i.id === selected[0])?.value) + Number(config.items.find((i) => i.id === selected[1])?.value)) === config.target
                  ? 'text-emerald-400' : 'text-rose-400'
              )}>
                {Number(config.items.find((i) => i.id === selected[0])?.value) + Number(config.items.find((i) => i.id === selected[1])?.value)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          icon={<RefreshCw size={14} />}
          disabled={selected.length === 0}
        >
          Reset
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleCheck}
          disabled={selected.length !== 2 || state !== 'idle'}
        >
          {state === 'correct' ? (
            <>
              <Check size={16} className="text-emerald-300" />
              Correct!
            </>
          ) : 'Check Answer'}
        </Button>
      </div>

      {attempts > 0 && state === 'idle' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-[#6b6b8a]"
        >
          {attempts} attempt{attempts !== 1 ? 's' : ''} — try using the hints above
        </motion.p>
      )}
    </div>
  );
}

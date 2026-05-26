'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface PatternOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface PatternEngineProps {
  config: {
    problemStatement: string;
    options: PatternOption[];
    correctPattern: string;
    explanation: string;
    followUp?: string;
  };
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function PatternEngine({ config, onSolve }: PatternEngineProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [wrongShake, setWrongShake] = useState(false);

  const handleSelect = (id: string) => {
    if (submitted) return;
    setSelected(id);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    const correct = selected === config.correctPattern;
    setResult(correct ? 'correct' : 'wrong');
    setSubmitted(true);
    if (correct) {
      setTimeout(() => onSolve(true, 0), 2000);
    } else {
      setWrongShake(true);
      setTimeout(() => {
        setSelected(null);
        setSubmitted(false);
        setResult(null);
        setWrongShake(false);
      }, 1800);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      {/* Problem statement */}
      <div className="rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] p-4 sm:p-5">
        <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-2">Problem</p>
        <p className="text-[#c8c8d8] text-sm leading-relaxed">{config.problemStatement}</p>
      </div>

      <p className="text-center text-[#6b6b8a] text-sm">
        Which algorithmic pattern is the key insight for solving this?
      </p>

      {/* Pattern cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {config.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = submitted && opt.id === config.correctPattern;
          const isWrong = submitted && isSelected && opt.id !== config.correctPattern;

          return (
            <motion.button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              whileHover={!submitted ? { scale: 1.03 } : {}}
              whileTap={!submitted ? { scale: 0.97 } : {}}
              animate={isWrong && wrongShake ? { x: [0, -7, 7, -5, 5, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={cn(
                'flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 text-center transition-all duration-200',
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 cursor-default'
                  : isWrong
                    ? 'bg-rose-500/10 border-rose-500 text-rose-300'
                    : isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-[#e8e8f0] cursor-pointer'
                      : submitted
                        ? 'bg-[#0a0a0f] border-[#1a1a2e] text-[#2d2d4a] cursor-default'
                        : 'bg-[#0d0d14] border-[#1e1e2e] text-[#a8a8c0] hover:border-indigo-500/50 hover:bg-[#111118] hover:text-[#e8e8f0] cursor-pointer'
              )}
            >
              <span className="text-2xl leading-none">{opt.icon}</span>
              <span className="text-[11px] font-semibold leading-tight">{opt.label}</span>
              <span className="text-[9px] text-current opacity-60 leading-snug">{opt.description}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence mode="wait">
        {submitted && result === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-4"
          >
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
              Why this pattern works
            </p>
            <p className="text-[#c8c8d8] text-sm leading-relaxed">{config.explanation}</p>
            {config.followUp && (
              <p className="text-[#6b6b8a] text-xs mt-2 leading-relaxed border-t border-[#1e1e2e] pt-2">
                {config.followUp}
              </p>
            )}
          </motion.div>
        )}
        {submitted && result === 'wrong' && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-rose-500/5 border border-rose-500/20 p-3"
          >
            <p className="text-rose-400 text-sm text-center">Not quite — think about what structure the problem has. Try again.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={!selected || submitted}
        >
          Confirm Pattern
        </Button>
      </div>
    </div>
  );
}

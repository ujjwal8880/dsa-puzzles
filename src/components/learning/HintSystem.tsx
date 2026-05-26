'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Hint } from '@/types/question';
import { cn } from '@/lib/utils';
import { track } from '@vercel/analytics';

interface HintSystemProps {
  hints: Hint[];
  mode: 'explorer' | 'engineer' | 'interview';
  questionSlug?: string;
  difficulty?: string;
  category?: string;
}

export function HintSystem({ hints, mode, questionSlug, difficulty, category }: HintSystemProps) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const revealHint = (id: number, hintNumber: number) => {
    if (!revealed.includes(id)) {
      setRevealed((r) => [...r, id]);
      track('hint_revealed', {
        hint_number: hintNumber,
        question: questionSlug ?? 'unknown',
        difficulty: difficulty ?? 'unknown',
        category: category ?? 'unknown',
      });
    }
  };

  const canReveal = (index: number) => {
    if (index === 0) return true;
    return revealed.includes(hints[index - 1].id);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <Lightbulb size={16} className="text-amber-400" />
        <h3 className="text-sm font-semibold text-[#e8e8f0]">Hints</h3>
        <span className="text-xs text-[#6b6b8a]">
          ({revealed.length}/{hints.length} revealed)
        </span>
      </div>

      {hints.map((hint, index) => {
        const isRevealed = revealed.includes(hint.id);
        const isAvailable = canReveal(index);

        return (
          <motion.div
            key={hint.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'rounded-xl border transition-all duration-200',
              isRevealed && 'bg-amber-500/5 border-amber-500/20',
              !isRevealed && isAvailable && 'bg-[#111118] border-[#1e1e2e] hover:border-[#2a2a3e] cursor-pointer',
              !isRevealed && !isAvailable && 'bg-[#111118]/50 border-[#1e1e2e]/50 opacity-50',
            )}
          >
            {isRevealed ? (
              <div className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 text-xs font-bold shrink-0 mt-0.5">
                    Hint {index + 1}
                  </span>
                  <p className="text-[#e8e8f0] text-sm leading-relaxed">{hint.text}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => isAvailable && revealHint(hint.id, index + 1)}
                disabled={!isAvailable}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <span className="text-[#6b6b8a] text-sm flex items-center gap-2">
                  {isAvailable ? (
                    <>
                      <Lightbulb size={14} className="text-amber-400/50" />
                      Reveal Hint {index + 1}
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      Unlock Hint {index + 1} first
                    </>
                  )}
                </span>
                {isAvailable && <ChevronDown size={14} className="text-[#3d3d5c]" />}
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

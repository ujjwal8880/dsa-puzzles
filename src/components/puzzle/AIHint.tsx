'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Sparkles, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { track } from '@vercel/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionConfig } from '@/types/question';
import { cn } from '@/lib/utils';

interface AIHintProps {
  question: QuestionConfig;
}

export function AIHint({ question }: AIHintProps) {
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState(false);

  const { complete, completion, isLoading, error } = useCompletion({
    api: '/api/hint',
    streamProtocol: 'text',
  });

  const fetchHint = async () => {
    setOpen(true);
    setAsked(true);
    track('ai_hint_requested', {
      question: question.slug,
      difficulty: question.difficulty,
      category: question.category,
      pattern: question.patternName,
    });
    await complete('', {
      body: {
        title: question.title,
        description: question.descriptions.explorer,
        patternName: question.patternName,
        engineType: question.engineType,
        category: question.category,
      },
    });
  };

  const ask = async () => {
    if (asked) {
      setOpen((v) => !v);
      return;
    }
    await fetchHint();
  };

  return (
    <div className="w-full">
      <button
        onClick={ask}
        disabled={isLoading}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer',
          isLoading
            ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-400/50 cursor-not-allowed'
            : 'bg-indigo-500/8 border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-indigo-200'
        )}
      >
        <Sparkles size={13} className={isLoading ? 'animate-pulse' : ''} />
        {isLoading ? 'Thinking…' : asked ? (open ? 'Hide AI nudge' : 'Show AI nudge') : 'Ask AI for a nudge'}
        {asked && !isLoading && (open ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}
      </button>

      <AnimatePresence>
        {open && (completion || error) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-sm text-[#c8c8d8] leading-relaxed">
              {error ? (
                <span className="text-rose-400 text-xs">Couldn't reach AI — make sure ANTHROPIC_API_KEY is set in .env.local.</span>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider mr-2">AI Nudge</span>
                      {completion}
                      {isLoading && <span className="inline-block w-1 h-3 bg-indigo-400 ml-0.5 animate-pulse rounded-sm" />}
                    </div>
                    {!isLoading && completion && (
                      <button
                        onClick={fetchHint}
                        title="Get a different nudge"
                        className="shrink-0 p-1 rounded-lg text-[#6b6b8a] hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors cursor-pointer"
                      >
                        <RefreshCw size={11} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

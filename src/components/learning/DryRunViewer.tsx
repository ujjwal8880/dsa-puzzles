'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { DryRunStep } from '@/types/question';
import { cn } from '@/lib/utils';

interface DryRunViewerProps {
  steps: DryRunStep[];
  onComplete?: () => void;
}

export function DryRunViewer({ steps, onComplete }: DryRunViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const goNext = () => {
    if (isLast) {
      onComplete?.();
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const goPrev = () => setCurrentStep((s) => Math.max(0, s - 1));
  const reset = () => { setCurrentStep(0); setPlaying(false); };

  return (
    <div className="flex flex-col gap-5">
      {/* Step progress */}
      <div className="flex items-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i < currentStep ? 'bg-indigo-500/50' : '',
              i === currentStep ? 'bg-indigo-500 flex-1' : 'bg-[#1e1e2e]',
              i > currentStep ? 'bg-[#1e1e2e]' : '',
              i !== currentStep ? 'w-6' : 'flex-1',
            )}
          />
        ))}
      </div>

      {/* Step display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Step header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs text-indigo-400 font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <p className="text-[#e8e8f0] text-sm mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          {/* State visualization */}
          {(() => {
            const stateArray = Array.isArray(step.state.array) ? (step.state.array as number[]) : null;
            const stateHashmap = step.state.hashmap && typeof step.state.hashmap === 'object'
              ? (step.state.hashmap as Record<string, unknown>)
              : null;
            const pointers = step.pointers ?? {};

            return (
              <div className="rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] p-4 font-mono text-sm">
                {step.annotation && (
                  <pre className="text-emerald-400 text-sm whitespace-pre-wrap leading-relaxed">
                    {step.annotation}
                  </pre>
                )}

                {stateArray && (
                  <div className="mt-3 flex items-center gap-1 flex-wrap">
                    <span className="text-[#6b6b8a] text-xs mr-2">array:</span>
                    {stateArray.map((val, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          backgroundColor: step.highlight?.includes(i)
                            ? 'rgba(99,102,241,0.25)'
                            : 'rgba(17,17,24,0.8)',
                          borderColor: step.highlight?.includes(i)
                            ? 'rgba(99,102,241,0.6)'
                            : 'rgba(42,42,62,0.8)',
                        }}
                        className="w-10 h-10 rounded-lg border flex items-center justify-center font-bold text-sm"
                        style={{ color: step.highlight?.includes(i) ? '#a5b4fc' : '#6b6b8a' }}
                      >
                        {val}
                      </motion.div>
                    ))}
                  </div>
                )}

                {Object.keys(pointers).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(pointers).map(([name, val]) => (
                      <span key={name} className="px-2 py-1 rounded-md bg-[#16161f] text-xs">
                        <span className="text-amber-400">{name}</span>
                        <span className="text-[#6b6b8a]"> = </span>
                        <span className="text-[#e8e8f0]">{String(val)}</span>
                      </span>
                    ))}
                  </div>
                )}

                {stateHashmap && Object.keys(stateHashmap).length > 0 && (
                  <div className="mt-3">
                    <span className="text-[#6b6b8a] text-xs">hashmap: </span>
                    <span className="text-amber-300">
                      {'{'}
                      {Object.entries(stateHashmap).map(([k, v], i, arr) => (
                        <span key={k}>
                          <span className="text-emerald-400">{k}</span>
                          <span className="text-[#6b6b8a]">: </span>
                          <span className="text-indigo-300">{String(v)}</span>
                          {i < arr.length - 1 && <span className="text-[#6b6b8a]">, </span>}
                        </span>
                      ))}
                      {'}'}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          icon={<RotateCcw size={13} />}
        >
          Restart
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={goPrev}
            disabled={isFirst}
            icon={<ChevronLeft size={14} />}
          >
            Prev
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={goNext}
            iconRight={isLast ? undefined : <ChevronRight size={14} />}
          >
            {isLast ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

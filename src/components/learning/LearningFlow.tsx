'use client';

import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Puzzle, Lightbulb, Play, BarChart2, BookOpen, Terminal, MessageSquare,
  Lock, CheckCircle2, Zap
} from 'lucide-react';
import type { QuestionConfig, LearningStep } from '@/types/question';
import { useProgressStore } from '@/stores/progressStore';
import { useUIStore } from '@/stores/uiStore';
import { PuzzleRenderer } from '@/components/puzzle/PuzzleRenderer';
import { HintSystem } from './HintSystem';
import { DryRunViewer } from './DryRunViewer';
import { ComplexityViz } from './ComplexityViz';
import { CodeViewer } from './CodeViewer';
import { CodeChallenge } from './CodeChallenge';
import { InterviewInsights } from './InterviewInsights';
import { AIHint } from '@/components/puzzle/AIHint';
import { cn } from '@/lib/utils';
import { pageTransition } from '@/lib/animations';
import { track } from '@vercel/analytics';

interface StepDef {
  id: LearningStep;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  xp: number;
  conditional?: (q: QuestionConfig) => boolean;
}

const STEPS: StepDef[] = [
  { id: 'puzzle', label: 'Puzzle', icon: Puzzle, xp: 0 },
  { id: 'hints', label: 'Hints', icon: Lightbulb, xp: 0 },
  { id: 'dry-run', label: 'Dry Run', icon: Play, xp: 0 },
  { id: 'complexity', label: 'Complexity', icon: BarChart2, xp: 20 },
  { id: 'coding', label: 'Code It', icon: Terminal, xp: 150, conditional: (q) => !!q.codeChallenge },
  { id: 'code', label: 'Solution', icon: BookOpen, xp: 0 },
  { id: 'interview', label: 'Interview', icon: MessageSquare, xp: 30 },
];

interface LearningFlowProps {
  question: QuestionConfig;
}

export function LearningFlow({ question }: LearningFlowProps) {
  const { currentStep, setCurrentStep, triggerXPPop, triggerConfetti } = useUIStore();
  const { completeStep, isStepCompleted, startQuestion, solveQuestion, _hasHydrated } = useProgressStore();

  const visibleSteps = STEPS.filter((s) => !s.conditional || s.conditional(question));

  useEffect(() => {
    startQuestion(question.slug);
    setCurrentStep('puzzle');
  }, [question.slug, startQuestion, setCurrentStep]);

  const isUnlocked = (stepId: LearningStep): boolean => {
    if (stepId === 'puzzle') return true;
    const stepIndex = visibleSteps.findIndex((s) => s.id === stepId);
    if (stepIndex <= 0) return true;
    // Each step requires previous to be visited (puzzle requires solve, rest just navigable)
    if (stepId === 'hints') return _hasHydrated && isStepCompleted(question.slug, 'puzzle');
    return true;
  };

  const handleStepComplete = useCallback((step: LearningStep, xp: number) => {
    if (!isStepCompleted(question.slug, step)) {
      completeStep(question.slug, step, xp);
      track('step_completed', {
        step,
        question: question.slug,
        difficulty: question.difficulty,
        category: question.category,
      });
      if (xp > 0) {
        triggerXPPop({
          amount: xp,
          label: `${step} complete`,
          x: typeof window !== 'undefined' ? window.innerWidth / 2 - 40 : 400,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
        });
      }
    }
  }, [question.slug, question.difficulty, question.category, completeStep, triggerXPPop, isStepCompleted]);

  const goToNext = useCallback((currentId: LearningStep) => {
    const idx = visibleSteps.findIndex((s) => s.id === currentId);
    if (idx < visibleSteps.length - 1) {
      setCurrentStep(visibleSteps[idx + 1].id);
    }
  }, [visibleSteps, setCurrentStep]);

  const handlePuzzleSolve = useCallback((correct: boolean, hintsUsed = 0) => {
    if (correct) {
      if (!question.codeChallenge) {
        solveQuestion(question.slug, hintsUsed, 0);
      }
      handleStepComplete('puzzle', question.xpRewards.puzzle);
      track('puzzle_solved', {
        question: question.slug,
        difficulty: question.difficulty,
        category: question.category,
        hints_used: hintsUsed,
      });
      triggerConfetti();
      setTimeout(() => goToNext('puzzle'), 800);
    }
  }, [solveQuestion, question.slug, question.codeChallenge, question.difficulty, question.category, handleStepComplete, question.xpRewards.puzzle, triggerConfetti, goToNext]);

  const handleCodingSolve = useCallback((passed: number, total: number) => {
    if (passed === total) {
      solveQuestion(question.slug, 0, 0);
      handleStepComplete('coding', question.xpRewards.coding ?? 150);
      track('coding_solved', {
        question: question.slug,
        difficulty: question.difficulty,
        category: question.category,
        tests_passed: passed,
      });
      triggerConfetti();
    }
  }, [solveQuestion, question.slug, question.difficulty, question.category, handleStepComplete, question.xpRewards.coding, triggerConfetti]);

  const stepXP = (stepId: LearningStep): number => {
    if (stepId === 'code') return question.xpRewards.code ?? 50;
    if (stepId === 'hints') return question.xpRewards.hints ?? 20;
    if (stepId === 'dry-run') return question.xpRewards.dryRun ?? 30;
    return visibleSteps.find((s) => s.id === stepId)?.xp ?? 0;
  };

  const ContinueBtn = ({ from }: { from: LearningStep }) => (
    <button
      onClick={() => {
        handleStepComplete(from, stepXP(from));
        goToNext(from);
      }}
      className="self-end mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
    >
      Continue
      <span className="text-indigo-200 text-xs">→</span>
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Step tabs */}
      <div className="border-b border-[#1e1e2e] bg-[#0a0a0f] shrink-0">
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {visibleSteps.map((step) => {
            const isActive = currentStep === step.id;
            const isDone = _hasHydrated && isStepCompleted(question.slug, step.id);
            const unlocked = isUnlocked(step.id);
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => unlocked && setCurrentStep(step.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 min-w-fit',
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent',
                  isDone && !isActive && 'text-emerald-400/70 hover:text-emerald-400',
                  !isActive && !isDone && unlocked && 'text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#111118]',
                  !unlocked && 'text-[#3d3d5c] cursor-not-allowed',
                )}
                disabled={!unlocked}
              >
                {isDone ? (
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                ) : !unlocked ? (
                  <Lock size={12} className="shrink-0" />
                ) : (
                  <Icon size={13} className="shrink-0" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
                {step.xp > 0 && !isDone && isActive && (
                  <span className="flex items-center gap-0.5 text-[9px] text-indigo-400/60 font-normal">
                    <Zap size={8} />{step.xp}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-5 sm:p-6 flex flex-col gap-4"
          >

            {/* PUZZLE */}
            {currentStep === 'puzzle' && (
              <>
                <StepHeader
                  title="Puzzle"
                  description={question.descriptions.explorer}
                  xp={question.xpRewards.puzzle}
                  icon={Puzzle}
                />
                <PuzzleRenderer question={question} onSolve={(correct, hintsUsed) => handlePuzzleSolve(correct, hintsUsed)} />
                <AIHint question={question} />
              </>
            )}

            {/* HINTS */}
            {currentStep === 'hints' && (
              <div className="flex flex-col gap-4">
                <StepHeader
                  title="Build Intuition"
                  description="Reveal hints to understand the core insight before looking at code."
                  xp={question.xpRewards.hints}
                  icon={Lightbulb}
                />
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
                  <p className="text-sm text-indigo-300 font-semibold mb-1">{question.patternName}</p>
                  <p className="text-sm text-[#6b6b8a]">{question.intuitionSummary}</p>
                </div>
                <HintSystem hints={question.hints} mode="explorer" questionSlug={question.slug} difficulty={question.difficulty} category={question.category} />
                <ContinueBtn from="hints" />
              </div>
            )}

            {/* DRY RUN */}
            {currentStep === 'dry-run' && (
              <div className="flex flex-col gap-4">
                <StepHeader
                  title="Step-by-Step Trace"
                  description="Watch the algorithm execute on a concrete example, step by step."
                  xp={question.xpRewards.dryRun}
                  icon={Play}
                />
                <DryRunViewer
                  steps={question.dryRunSteps}
                  onComplete={() => {
                    handleStepComplete('dry-run', question.xpRewards.dryRun);
                    goToNext('dry-run');
                  }}
                />
              </div>
            )}

            {/* COMPLEXITY */}
            {currentStep === 'complexity' && (
              <div className="flex flex-col gap-4">
                <StepHeader
                  title="Time & Space Complexity"
                  description="Understand the performance characteristics of this algorithm."
                  xp={20}
                  icon={BarChart2}
                />
                <ComplexityViz complexity={question.complexity} />
                <ContinueBtn from="complexity" />
              </div>
            )}

            {/* SOLUTION CODE (read-only) */}
            {currentStep === 'code' && (
              <div className="flex flex-col gap-4">
                <StepHeader
                  title="Reference Solution"
                  description="Compare with your approach. See how the optimal solution is written."
                  xp={question.xpRewards.code}
                  icon={BookOpen}
                />
                <CodeViewer solutions={question.codeSolutions} />
                <ContinueBtn from="code" />
              </div>
            )}

            {/* CODING CHALLENGE (interactive editor) */}
            {currentStep === 'coding' && question.codeChallenge && (
              <div className="flex flex-col gap-4">
                <StepHeader
                  title="Write Your Solution"
                  description="Now code it yourself. Run against test cases to verify."
                  xp={question.xpRewards.coding ?? 150}
                  icon={Terminal}
                />
                <CodeChallenge
                  config={question.codeChallenge}
                  onSolve={handleCodingSolve}
                />
                {_hasHydrated && isStepCompleted(question.slug, 'coding') && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">All tests passing!</p>
                      <p className="text-xs text-[#6b6b8a]">You&apos;ve earned +{question.xpRewards.coding ?? 150} XP</p>
                    </div>
                  </motion.div>
                )}
                <ContinueBtn from="coding" />
              </div>
            )}

            {/* INTERVIEW */}
            {currentStep === 'interview' && (
              <div className="flex flex-col gap-4">
                <StepHeader
                  title="Interview Insights"
                  description="Everything an interviewer might ask — brute force, edge cases, follow-ups."
                  xp={30}
                  icon={MessageSquare}
                />
                <InterviewInsights insights={question.interviewInsights} />
                <button
                  onClick={() => handleStepComplete('interview', 30)}
                  disabled={_hasHydrated && isStepCompleted(question.slug, 'interview')}
                  className="self-end flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
                >
                  <CheckCircle2 size={14} />
                  {_hasHydrated && isStepCompleted(question.slug, 'interview') ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepHeader({
  title,
  description,
  xp,
  icon: Icon,
}: {
  title: string;
  description: string;
  xp: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <Icon size={14} className="text-indigo-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#e8e8f0]">{title}</h3>
          <p className="text-xs text-[#6b6b8a] mt-0.5 leading-relaxed max-w-lg">{description}</p>
        </div>
      </div>
      {xp > 0 && (
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/15 text-xs text-indigo-400 font-medium shrink-0">
          <Zap size={10} />+{xp} XP
        </div>
      )}
    </div>
  );
}

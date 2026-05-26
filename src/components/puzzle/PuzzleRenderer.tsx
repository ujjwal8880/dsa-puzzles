'use client';

import type { QuestionConfig } from '@/types/question';
import { MatchingEngine } from './engines/MatchingEngine';
import { StackEngine } from './engines/StackEngine';
import { SearchEngine } from './engines/SearchEngine';
import { WindowEngine } from './engines/WindowEngine';
import { TwoPointerEngine } from './engines/TwoPointerEngine';
import { TimelineEngine } from './engines/TimelineEngine';
import { StateEngine } from './engines/StateEngine';
import { HeapEngine } from './engines/HeapEngine';
import { GraphEngine } from './engines/GraphEngine';
import { TreeEngine } from './engines/TreeEngine';
import { LinkedListEngine } from './engines/LinkedListEngine';
import { SubarrayEngine } from './engines/SubarrayEngine';
import { HouseRobberEngine } from './engines/HouseRobberEngine';
import { GridPathEngine } from './engines/GridPathEngine';
import { PatternEngine } from './engines/PatternEngine';

interface PuzzleRendererProps {
  question: QuestionConfig;
  onSolve: (correct: boolean, hintsUsed: number) => void;
}

export function PuzzleRenderer({ question, onSolve }: PuzzleRendererProps) {
  const config = question.puzzleConfig as Record<string, unknown>;

  // Stub / coming-soon questions
  if (config.mode === 'coming-soon') {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-3xl">
          🧩
        </div>
        <div>
          <p className="text-[#e8e8f0] font-semibold text-lg mb-1">{question.title}</p>
          <p className="text-[#6b6b8a] text-sm max-w-sm">{question.intuitionSummary}</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
          🔨 Interactive puzzle coming soon
        </div>
        <button
          onClick={() => onSolve(true, 0)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          Skip to Hints →
        </button>
      </div>
    );
  }

  switch (question.engineType) {
    case 'matching':
      return <MatchingEngine config={config as Parameters<typeof MatchingEngine>[0]['config']} onSolve={onSolve} />;
    case 'stack':
      return <StackEngine config={config as Parameters<typeof StackEngine>[0]['config']} onSolve={onSolve} />;
    case 'search':
      return <SearchEngine config={config as Parameters<typeof SearchEngine>[0]['config']} onSolve={onSolve} />;
    case 'window':
      return <WindowEngine config={config as Parameters<typeof WindowEngine>[0]['config']} onSolve={onSolve} />;
    case 'two-pointer':
      return <TwoPointerEngine config={config as Parameters<typeof TwoPointerEngine>[0]['config']} onSolve={onSolve} />;
    case 'timeline':
      return <TimelineEngine config={config as Parameters<typeof TimelineEngine>[0]['config']} onSolve={onSolve} />;
    case 'state':
      return <StateEngine config={config as unknown as Parameters<typeof StateEngine>[0]['config']} onSolve={onSolve} />;
    case 'heap':
      return <HeapEngine config={config as unknown as Parameters<typeof HeapEngine>[0]['config']} onSolve={onSolve} />;
    case 'graph':
      return <GraphEngine config={config as unknown as Parameters<typeof GraphEngine>[0]['config']} onSolve={onSolve} />;
    case 'tree':
      return <TreeEngine config={config as unknown as Parameters<typeof TreeEngine>[0]['config']} onSolve={onSolve} />;
    case 'linked-list':
      return <LinkedListEngine config={config as unknown as Parameters<typeof LinkedListEngine>[0]['config']} onSolve={onSolve} />;
    case 'subarray':
      return <SubarrayEngine config={config as unknown as Parameters<typeof SubarrayEngine>[0]['config']} onSolve={onSolve} />;
    case 'house-robber':
      return <HouseRobberEngine config={config as unknown as Parameters<typeof HouseRobberEngine>[0]['config']} onSolve={onSolve} />;
    case 'grid-path':
      return <GridPathEngine config={config as unknown as Parameters<typeof GridPathEngine>[0]['config']} onSolve={onSolve} />;
    case 'pattern':
      return <PatternEngine config={config as unknown as Parameters<typeof PatternEngine>[0]['config']} onSolve={onSolve} />;
    default:
      return (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="text-4xl">🚧</div>
          <p className="text-[#6b6b8a] text-sm">
            The <span className="text-indigo-400 font-mono">{question.engineType}</span> engine is coming soon.
          </p>
        </div>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Core question type system — every question in the app is powered by this
// ─────────────────────────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category =
  | 'array-string'
  | 'two-pointers'
  | 'sliding-window'
  | 'matrix'
  | 'hashmap'
  | 'intervals'
  | 'stack'
  | 'linked-list'
  | 'binary-tree'
  | 'bst'
  | 'graph'
  | 'trie'
  | 'heap'
  | 'backtracking'
  | 'divide-conquer'
  | 'binary-search'
  | 'dynamic-programming'
  | 'bit-manipulation'
  | 'math'
  | 'greedy';

export type EngineType =
  | 'matching'       // Two Sum, Group Anagrams — drag/drop value matching
  | 'search'         // Binary Search — range guessing
  | 'window'         // Sliding Window — resize/move window
  | 'tree'           // Tree traversals — click-order
  | 'graph'          // BFS/DFS — maze/grid traversal
  | 'heap'           // Priority Queue — reorder elements
  | 'timeline'       // Intervals — drag timeline segments
  | 'stack'          // Stack — push/pop simulator
  | 'state'          // DP — fill state table
  | 'two-pointer'    // Two pointers — move cursors
  | 'sort'           // Sorting algorithms — swap visualizer
  | 'linked-list'    // Linked List — pointer manipulation
  | 'subarray'       // Subarray selection — click start/end to pick optimal range
  | 'house-robber'   // Non-adjacent selection — maximize by skipping neighbors
  | 'grid-path'      // Grid path tracing — click right/down to minimum sum
  | 'pattern';       // Pattern recognition — identify which algorithm pattern fits

export type LearningMode = 'explorer' | 'engineer' | 'interview';

export interface Hint {
  id: number;
  text: string;
  visual?: HintVisual;
  xpCost: number;
}

export interface HintVisual {
  type: 'highlight' | 'annotation' | 'diagram';
  data: unknown;
}

export interface DryRunStep {
  id: number;
  description: string;
  state: Record<string, unknown>;
  highlight?: number[];   // indices to highlight in array
  pointers?: Record<string, number>;
  activeNodes?: string[];
  annotation?: string;
}

export interface CodeSolution {
  language: 'javascript' | 'typescript' | 'python' | 'java';
  code: string;
  notes?: string;
}

export interface ComplexityInfo {
  time: string;
  space: string;
  timeExplanation: string;
  spaceExplanation: string;
  visualization?: 'linear' | 'logarithmic' | 'quadratic' | 'nlogn';
}

export interface InterviewInsight {
  bruteForce: {
    description: string;
    complexity: ComplexityInfo;
  };
  optimized: {
    description: string;
    complexity: ComplexityInfo;
  };
  followUps: string[];
  edgeCases: string[];
  commonMistakes: string[];
  interviewerTips: string[];
}

export interface PuzzleValidation {
  validate: (answer: unknown) => boolean;
  partialCredit?: (answer: unknown) => number; // 0-1
  errorMessage?: (answer: unknown) => string;
}

export type QuestionSet = 'blind75' | 'top150' | 'neetcode150';

export interface QuestionConfig {
  id: string;
  slug: string;
  leetcodeNumber: number;
  title: string;
  category: Category;
  difficulty: Difficulty;
  engineType: EngineType;
  tags: string[];
  questionSets: QuestionSet[];
  companies?: string[]; // top companies that ask this question

  // Mode-specific descriptions
  descriptions: {
    explorer: string;
    engineer: string;
    interview: string;
  };

  // The puzzle engine receives this as its config
  puzzleConfig: Record<string, unknown>;

  hints: Hint[];
  dryRunSteps: DryRunStep[];
  complexity: ComplexityInfo;
  codeSolutions: CodeSolution[];
  interviewInsights: InterviewInsight;

  codeChallenge?: CodeChallenge;

  xpRewards: {
    puzzle: number;
    hints: number;
    dryRun: number;
    code: number;
    coding?: number;
  };

  // Learning metadata
  prerequisites: string[]; // other question slugs
  relatedPatterns: string[];
  intuitionSummary: string;
  patternName: string;
}

export interface CategoryMeta {
  id: Category;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  questionCount: number;
  estimatedHours: number;
  prerequisites: Category[];
}

export type LearningStep =
  | 'puzzle'
  | 'hints'
  | 'dry-run'
  | 'complexity'
  | 'code'
  | 'coding'
  | 'interview';

export interface StepMeta {
  id: LearningStep;
  label: string;
  shortLabel: string;
  description: string;
  xpReward: number;
  unlockRequires?: LearningStep;
}

export interface QuestionTestCase {
  input: unknown[];
  expected: unknown;
  description: string;
}

export interface CodeChallenge {
  functionName: string;
  starterCode: Record<string, string>; // language → starter
  testCases: QuestionTestCase[];
  unorderedResult?: boolean; // true for problems where [0,1] === [1,0]
}

// Per-engine puzzle config types
// Each engine gets its own strongly-typed config

export interface MatchingPuzzleConfig {
  items: MatchingItem[];
  target: number | string;
  instruction: string;
  mode: 'two-sum' | 'anagram' | 'complement';
  allowMultiple?: boolean;
}

export interface MatchingItem {
  id: string;
  value: number | string;
  label?: string;
  color?: string;
}

export interface SearchPuzzleConfig {
  array: number[];
  target: number;
  instruction: string;
  mode: 'binary' | 'rotated' | 'insert-position';
}

export interface WindowPuzzleConfig {
  sequence: (string | number)[];
  windowConstraint: WindowConstraint;
  instruction: string;
  mode: 'longest-unique' | 'max-sum' | 'min-window';
}

export interface WindowConstraint {
  type: 'no-repeat' | 'sum-equals' | 'contains-all';
  value?: number | string[];
}

export interface StackPuzzleConfig {
  sequence: string[];
  instruction: string;
  mode: 'parentheses' | 'monotonic' | 'evaluate';
  operations?: StackOperation[];
}

export interface StackOperation {
  char: string;
  action: 'push' | 'pop' | 'peek';
  description: string;
}

export interface TreePuzzleConfig {
  tree: TreeNode;
  instruction: string;
  mode: 'inorder' | 'preorder' | 'postorder' | 'bfs' | 'lca' | 'path-sum';
  targets?: string[];
}

export interface TreeNode {
  id: string;
  value: number | string | null;
  left?: TreeNode;
  right?: TreeNode;
  highlighted?: boolean;
}

export interface GraphPuzzleConfig {
  grid?: GridCell[][];
  adjacencyList?: Record<string, string[]>;
  start: string;
  targets?: string[];
  instruction: string;
  mode: 'bfs' | 'dfs' | 'islands' | 'shortest-path';
}

export interface GridCell {
  id: string;
  type: 'empty' | 'wall' | 'water' | 'land' | 'start' | 'end';
  row: number;
  col: number;
}

export interface HeapPuzzleConfig {
  elements: HeapElement[];
  k: number;
  instruction: string;
  mode: 'kth-largest' | 'top-k' | 'merge-k';
  heapType: 'min' | 'max';
}

export interface HeapElement {
  id: string;
  value: number;
  label?: string;
}

export interface TimelinePuzzleConfig {
  intervals: Interval[];
  instruction: string;
  mode: 'merge' | 'insert' | 'non-overlapping';
}

export interface Interval {
  id: string;
  start: number;
  end: number;
  label?: string;
  color?: string;
}

export interface TwoPointerPuzzleConfig {
  array: number[];
  instruction: string;
  mode: 'two-sum-sorted' | 'container-water' | 'three-sum' | 'palindrome';
  target?: number;
}

export interface StatePuzzleConfig {
  problem: string;
  initialState: number | number[];
  transitions: StateTransition[];
  instruction: string;
  mode: 'climbing-stairs' | 'coin-change' | 'knapsack' | 'lcs';
  tableSize?: [number, number];
}

export interface StateTransition {
  from: string;
  to: string;
  label: string;
  condition?: string;
}

// Union of all puzzle configs
export type PuzzleConfig =
  | MatchingPuzzleConfig
  | SearchPuzzleConfig
  | WindowPuzzleConfig
  | StackPuzzleConfig
  | TreePuzzleConfig
  | GraphPuzzleConfig
  | HeapPuzzleConfig
  | TimelinePuzzleConfig
  | TwoPointerPuzzleConfig
  | StatePuzzleConfig;

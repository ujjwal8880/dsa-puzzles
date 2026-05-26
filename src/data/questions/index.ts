import type { QuestionConfig } from '@/types/question';
import { twoSum } from './two-sum';
import { validParentheses } from './valid-parentheses';
import { binarySearch } from './binary-search';
import { bestTimeStocks } from './best-time-stocks';
import { longestSubstring } from './longest-substring';
import { mergeIntervals } from './merge-intervals';
import { climbingStairs } from './climbing-stairs';
import { numberOfIslands } from './number-of-islands';
import { lcaBst } from './lca-bst';
import { kthLargest } from './kth-largest';
import { BLIND75_STUBS } from './blind75-stubs';
import { TOP150_STUBS } from './top150-stubs';
import { ARRAY_STRING_COMPLETE } from './complete/batch-1-array-string';
import { POINTERS_GREEDY_STACK_COMPLETE } from './complete/batch-2-pointers-greedy-stack';
import { LINKED_LIST_TREES_COMPLETE } from './complete/batch-3-linked-list-trees';
import { TREES_ADVANCED_COMPLETE } from './complete/batch-4a-trees-advanced';
import { GRAPHS_COMPLETE } from './complete/batch-4b-graphs';
import { BACKTRACK_SEARCH_HEAP_COMPLETE } from './complete/batch-5-backtrack-search-heap';
import { DP_COMPLETE } from './complete/batch-6a-dp';
import { BITS_COMPLETE } from './complete/batch-6b-bits';
import { MATH_INTERVALS_COMPLETE } from './complete/batch-6c-math-intervals';
import { HASHMAP_STRING_COMPLETE } from './complete/batch-6d-hashmap-string';
import { DP_MISC_COMPLETE } from './complete/batch-6e-dp-misc';
import { MISC_COMPLETE } from './complete/batch-7-misc';

// Fully implemented questions — listed here take precedence over stubs
const IMPLEMENTED: QuestionConfig[] = [
  twoSum,
  validParentheses,
  binarySearch,
  bestTimeStocks,
  longestSubstring,
  mergeIntervals,
  climbingStairs,
  numberOfIslands,
  lcaBst,
  kthLargest,
  ...ARRAY_STRING_COMPLETE,
  ...POINTERS_GREEDY_STACK_COMPLETE,
  ...LINKED_LIST_TREES_COMPLETE,
  ...TREES_ADVANCED_COMPLETE,
  ...GRAPHS_COMPLETE,
  ...BACKTRACK_SEARCH_HEAP_COMPLETE,
  ...DP_COMPLETE,
  ...BITS_COMPLETE,
  ...MATH_INTERVALS_COMPLETE,
  ...HASHMAP_STRING_COMPLETE,
  ...DP_MISC_COMPLETE,
  ...MISC_COMPLETE,
];

// Deduplicate: later entries win (IMPLEMENTED already has precedence)
const seenSlugs = new Set<string>();
const dedupedImplemented = IMPLEMENTED.filter((q) => {
  if (seenSlugs.has(q.slug)) return false;
  seenSlugs.add(q.slug);
  return true;
});

// Stubs fill in anything not yet implemented
const allStubs = [...BLIND75_STUBS, ...TOP150_STUBS];
const stubs = allStubs.filter((q) => {
  if (seenSlugs.has(q.slug)) return false;
  seenSlugs.add(q.slug);
  return true;
});

export const ALL_QUESTIONS: QuestionConfig[] = [...dedupedImplemented, ...stubs];

export const QUESTIONS_BY_SLUG = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.slug, q])
) as Record<string, QuestionConfig>;

export const QUESTIONS_BY_CATEGORY = ALL_QUESTIONS.reduce<Record<string, QuestionConfig[]>>(
  (acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  },
  {}
);

export const BLIND75_QUESTIONS = ALL_QUESTIONS.filter((q) => q.questionSets.includes('blind75'));
export const TOP150_QUESTIONS = ALL_QUESTIONS.filter((q) => q.questionSets.includes('top150'));

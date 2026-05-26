import type { QuestionConfig } from '@/types/question';

export const mergeIntervals: QuestionConfig = {
  id: 'merge-intervals',
  slug: 'merge-intervals',
  leetcodeNumber: 56,
  title: 'Merge Intervals',
  category: 'intervals',
  difficulty: 'medium',
  engineType: 'timeline',
  tags: ['intervals', 'sorting', 'greedy'],
  descriptions: {
    explorer: 'You have calendar events on a timeline. Some overlap! Can you merge the overlapping ones into single blocks?',
    engineer: 'Sort intervals by start time. Merge current with last merged if start ≤ last end. Greedy O(n log n).',
    interview: 'Sort by start. Iterate: if current.start <= merged.last.end → extend end. Else push new interval. O(n log n) sort dominates.',
  },
  puzzleConfig: {
    intervals: [
      { id: 'a', start: 1, end: 3, label: '[1,3]', color: '#6366f1' },
      { id: 'b', start: 2, end: 6, label: '[2,6]', color: '#8b5cf6' },
      { id: 'c', start: 8, end: 10, label: '[8,10]', color: '#a78bfa' },
      { id: 'd', start: 15, end: 18, label: '[15,18]', color: '#c4b5fd' },
    ],
    instruction: 'Drag overlapping intervals together to merge them. What are the final merged intervals?',
    mode: 'merge',
    correctAnswer: [[1, 6], [8, 10], [15, 18]],
  },
  hints: [
    { id: 1, text: 'If you sort by start time, overlapping intervals are always adjacent. Two intervals overlap when the second\'s start ≤ first\'s end.', xpCost: 0 },
    { id: 2, text: 'Process sorted intervals one by one. Keep a "current merge" result. Extend its end if the next interval overlaps.', xpCost: 0 },
    { id: 3, text: 'if (current.start <= result.last.end): result.last.end = max(result.last.end, current.end). Else: push current as new.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Input: [[1,3],[2,6],[8,10],[15,18]]. Already sorted by start.',
      state: { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [], i: -1 },
      annotation: 'Sort by start time first',
    },
    {
      id: 2,
      description: 'Take [1,3]. Merged is empty → push [1,3].',
      state: { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,3]], i: 0 },
      highlight: [0],
      annotation: 'merged = [[1,3]]',
    },
    {
      id: 3,
      description: '[2,6]: start=2 ≤ last end=3 → overlap! Extend: end = max(3,6) = 6.',
      state: { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,6]], i: 1 },
      highlight: [0, 1],
      annotation: 'MERGE → [1,6]\nmerged = [[1,6]]',
    },
    {
      id: 4,
      description: '[8,10]: start=8 > last end=6 → no overlap. Push [8,10].',
      state: { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,6],[8,10]], i: 2 },
      highlight: [2],
      annotation: 'No overlap → push\nmerged = [[1,6],[8,10]]',
    },
    {
      id: 5,
      description: '[15,18]: start=15 > last end=10 → no overlap. Push [15,18]. Done.',
      state: { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,6],[8,10],[15,18]], i: 3, done: true },
      highlight: [3],
      annotation: 'Result: [[1,6],[8,10],[15,18]] ✓',
    },
  ],
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
    timeExplanation: 'Sorting dominates at O(n log n). The merge pass is O(n).',
    spaceExplanation: 'Output array stores merged intervals.',
    visualization: 'nlogn',
  },
  codeSolutions: [
        {
      language: 'python',
      code: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Compare every pair of intervals for overlap.',
      complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'All pairs comparison', spaceExplanation: 'Result array', visualization: 'quadratic' },
    },
    optimized: {
      description: 'Sort + single pass greedy merge.',
      complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Sort dominates', spaceExplanation: 'Output array', visualization: 'nlogn' },
    },
    followUps: [
      'Insert Interval (LC 57) — insert then merge',
      'Meeting Rooms (LC 252) — can a person attend all meetings?',
      'Meeting Rooms II (LC 253) — minimum meeting rooms needed',
    ],
    edgeCases: ['Single interval', 'All intervals overlap → one output', 'Already non-overlapping'],
    commonMistakes: [
      'Not sorting before merging',
      'Using last[1] = end instead of last[1] = max(last[1], end) — misses A containing B',
    ],
    interviewerTips: [
      'The sort is key. After sorting by start, overlapping intervals are always consecutive.',
      'Mention the "A contains B" edge case where B\'s end < A\'s end',
    ],
  },
  xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60 },
  prerequisites: [],
  relatedPatterns: ['Interval Scheduling', 'Sweep Line'],
  intuitionSummary: 'Sorting by start ensures overlapping intervals are adjacent. Then greedily extend or push.',
  patternName: 'Sort + Greedy Merge',
  questionSets: ['blind75', 'top150'],
  companies: ['Google', 'Meta', 'Amazon', 'LinkedIn', 'Microsoft'],
};

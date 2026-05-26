import type { QuestionConfig } from '@/types/question';

export const climbingStairs: QuestionConfig = {
  id: 'climbing-stairs',
  slug: 'climbing-stairs',
  leetcodeNumber: 70,
  title: 'Climbing Stairs',
  category: 'dynamic-programming',
  difficulty: 'easy',
  engineType: 'state',
  tags: ['dp', 'fibonacci', 'memoization'],
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Google', 'Apple', 'Adobe', 'Bloomberg'],
  descriptions: {
    explorer: 'You can climb 1 or 2 stairs at a time. How many ways to reach the top?',
    engineer: 'Classic Fibonacci DP. f(n) = f(n-1) + f(n-2). Build the table bottom-up.',
    interview: 'State: dp[i] = ways to reach step i. Recurrence: dp[i] = dp[i-1] + dp[i-2]. Base cases: dp[0]=dp[1]=1.',
  },
  puzzleConfig: {
    n: 6,
    instruction: 'Fill in the DP table. dp[0]=1 (one way to stand at base), dp[1]=1 (one way to step to stair 1). Fill dp[2] through dp[6].',
    mode: 'climbing-stairs',
    correctAnswer: 13,
  },
  hints: [
    { id: 1, text: 'To reach stair i, you came from stair i-1 (one step) OR stair i-2 (two steps).', xpCost: 0 },
    { id: 2, text: 'dp[i] = dp[i-1] + dp[i-2]. This is the Fibonacci sequence starting from dp[0]=1, dp[1]=1.', xpCost: 0 },
    { id: 3, text: 'dp[2]=2, dp[3]=3, dp[4]=5, dp[5]=8, dp[6]=13. Notice the Fibonacci pattern!', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Base cases: 1 way to reach stair 0 (do nothing), 1 way to reach stair 1 (one step).',
      state: { dp: [1, 1, '?', '?', '?', '?', '?'], n: 6 },
      highlight: [0, 1],
      annotation: 'dp[0]=1, dp[1]=1',
    },
    {
      id: 2,
      description: 'dp[2] = dp[1] + dp[0] = 1 + 1 = 2. Either take 2 steps from 0, or 1 step from 1.',
      state: { dp: [1, 1, 2, '?', '?', '?', '?'], n: 6 },
      highlight: [2],
      annotation: 'dp[2] = 1+1 = 2',
    },
    {
      id: 3,
      description: 'dp[3] = dp[2] + dp[1] = 2 + 1 = 3.',
      state: { dp: [1, 1, 2, 3, '?', '?', '?'], n: 6 },
      highlight: [3],
      annotation: 'dp[3] = 2+1 = 3',
    },
    {
      id: 4,
      description: 'dp[4] = dp[3] + dp[2] = 3 + 2 = 5.',
      state: { dp: [1, 1, 2, 3, 5, '?', '?'], n: 6 },
      highlight: [4],
      annotation: 'dp[4] = 3+2 = 5',
    },
    {
      id: 5,
      description: 'dp[5] = dp[4] + dp[3] = 5 + 3 = 8.',
      state: { dp: [1, 1, 2, 3, 5, 8, '?'], n: 6 },
      highlight: [5],
      annotation: 'dp[5] = 5+3 = 8',
    },
    {
      id: 6,
      description: 'dp[6] = dp[5] + dp[4] = 8 + 5 = 13. Answer: 13 ways to climb 6 stairs!',
      state: { dp: [1, 1, 2, 3, 5, 8, 13], n: 6 },
      highlight: [6],
      annotation: 'dp[6] = 8+5 = 13 ✓',
    },
  ],
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
    timeExplanation: 'Single pass filling dp table from 2 to n.',
    spaceExplanation: 'Only need previous two values — can optimize to O(1) space.',
    visualization: 'linear',
  },
  codeSolutions: [
    {
      language: 'javascript',
      code: `function climbStairs(n) {
  if (n <= 1) return 1;

  let prev2 = 1, prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
      notes: 'O(1) space — only track last two values instead of full dp array.',
    },
        {
      language: 'python',
      code: `def climbStairs(n: int) -> int:
    if n <= 1:
        return 1

    prev2, prev1 = 1, 1

    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2

    return prev1`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Recursive: f(n) = f(n-1) + f(n-2) with no memoization.',
      complexity: { time: 'O(2ⁿ)', space: 'O(n)', timeExplanation: 'Exponential branching', spaceExplanation: 'Recursion stack depth n', visualization: 'quadratic' },
    },
    optimized: {
      description: 'Bottom-up DP with O(1) space: just track the last two Fibonacci values.',
      complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single loop', spaceExplanation: 'Two variables', visualization: 'linear' },
    },
    followUps: [
      'Generalize: what if you can climb 1, 2, or 3 stairs?',
      'Can you use matrix exponentiation to solve in O(log n)?',
      'House Robber is the same recurrence with a different story.',
    ],
    edgeCases: [
      'n = 0 (return 1 or 0 depending on definition)',
      'n = 1 (exactly 1 way)',
      'n = 2 (two ways: [1,1] or [2])',
    ],
    commonMistakes: [
      'Off-by-one in base cases — dp[0] vs dp[1]',
      'Not recognizing this IS the Fibonacci sequence',
      'Using full array when two variables suffice',
    ],
    interviewerTips: [
      'Start by stating the recurrence before writing code',
      'Mention the space optimization from O(n) to O(1)',
      'Connect to Fibonacci — shows pattern recognition',
    ],
  },
  codeChallenge: {
    functionName: 'climbStairs',
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Your solution here

}`,
    },
    testCases: [
      { input: [2], expected: 2, description: 'n=2: [1,1] or [2] = 2 ways' },
      { input: [3], expected: 3, description: 'n=3: [1,1,1], [1,2], [2,1] = 3 ways' },
      { input: [4], expected: 5, description: 'n=4: 5 ways' },
      { input: [5], expected: 8, description: 'n=5: 8 ways' },
      { input: [1], expected: 1, description: 'n=1: exactly 1 way' },
      { input: [10], expected: 89, description: 'n=10: 89 ways' },
    ],
  },
  xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
  prerequisites: [],
  relatedPatterns: ['Fibonacci DP', 'House Robber', 'Decode Ways'],
  intuitionSummary: 'To reach stair n: you came from n-1 (1 step) or n-2 (2 steps). f(n) = f(n-1) + f(n-2).',
  patternName: 'Fibonacci DP',
};

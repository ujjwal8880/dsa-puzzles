import type { QuestionConfig } from '@/types/question';

export const longestSubstring: QuestionConfig = {
  id: 'longest-substring',
  slug: 'longest-substring-without-repeating-characters',
  leetcodeNumber: 3,
  title: 'Longest Substring Without Repeating Characters',
  category: 'sliding-window',
  difficulty: 'medium',
  engineType: 'window',
  tags: ['sliding-window', 'hashmap', 'string', 'two-pointer'],
  descriptions: {
    explorer: 'You\'re looking for the longest stretch of characters in a word where no letter repeats. Like finding the longest "no-repeat zone" in the string!',
    engineer: 'Sliding window with a set/map. Expand right. When duplicate found, shrink from left until no duplicate. Track max window size.',
    interview: 'Classic sliding window. Use a hashmap to store character → last seen index. When duplicate found, jump left pointer to max(left, lastSeen[char]+1).',
  },
  puzzleConfig: {
    sequence: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
    windowConstraint: { type: 'no-repeat' },
    instruction: 'Drag the window to find the longest stretch with no repeating characters',
    mode: 'longest-unique',
    correctAnswer: { start: 0, end: 2, length: 3 },
  },
  hints: [
    { id: 1, text: 'Think of a window sliding over the string. Expand it right. When a repeat enters, shrink from the left.', xpCost: 0 },
    { id: 2, text: 'Use a set to track characters currently in the window. When the new char is already in the set, remove from left until it\'s gone.', xpCost: 0 },
    { id: 3, text: 'Optimization: instead of inching left one by one, use a map to jump left directly past the previous occurrence of the duplicate.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'String: "abcabcbb". left=0, right=0, window={}, maxLen=0.',
      state: { s: 'abcabcbb', left: 0, right: 0, charMap: {}, maxLen: 0 },
      highlight: [],
      annotation: 'left=0, right=0',
    },
    {
      id: 2,
      description: 'Expand: "abc" → no repeats. Window [0,2], maxLen=3.',
      state: { s: 'abcabcbb', left: 0, right: 2, charMap: { a: 0, b: 1, c: 2 }, maxLen: 3 },
      highlight: [0, 1, 2],
      pointers: { left: 0, right: 2 },
      annotation: 'window="abc", maxLen=3',
    },
    {
      id: 3,
      description: 'right=3, char=\'a\'. \'a\' seen at index 0. Jump left to max(left, 0+1)=1.',
      state: { s: 'abcabcbb', left: 1, right: 3, charMap: { a: 3, b: 1, c: 2 }, maxLen: 3 },
      highlight: [1, 2, 3],
      pointers: { left: 1, right: 3 },
      annotation: 'duplicate \'a\'\nleft jumps to 1\nwindow="bca"',
    },
    {
      id: 4,
      description: 'Continue expanding. Window "bca" then "cab" then "abc" — all length 3. maxLen stays 3.',
      state: { s: 'abcabcbb', left: 2, right: 5, charMap: { a: 3, b: 4, c: 5 }, maxLen: 3 },
      highlight: [2, 3, 4, 5],
      pointers: { left: 2, right: 5 },
      annotation: 'maxLen=3 (unchanged)',
    },
    {
      id: 5,
      description: 'Final answer: maxLen = 3. (window "abc" or "bca" or "cab")',
      state: { s: 'abcabcbb', left: 5, right: 7, charMap: { b: 7, c: 5 }, maxLen: 3, done: true },
      highlight: [],
      annotation: 'Return 3 ✓',
    },
  ],
  complexity: {
    time: 'O(n)',
    space: 'O(min(m, n))',
    timeExplanation: 'Each character is visited at most twice (once by right, once by left).',
    spaceExplanation: 'm = character set size. At most 26 for lowercase letters.',
    visualization: 'linear',
  },
  codeSolutions: [
        {
      language: 'python',
      code: `def lengthOfLongestSubstring(s: str) -> int:
    char_index = {}
    max_len = 0
    left = 0

    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1

        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Check every substring for duplicates.',
      complexity: { time: 'O(n³)', space: 'O(min(n,m))', timeExplanation: 'O(n²) substrings, O(n) check each', spaceExplanation: 'Set for uniqueness check', visualization: 'quadratic' },
    },
    optimized: {
      description: 'Sliding window with index map. O(n).',
      complexity: { time: 'O(n)', space: 'O(min(m,n))', timeExplanation: 'Each char visited at most twice', spaceExplanation: 'Map stores last index per char', visualization: 'linear' },
    },
    followUps: [
      'Longest Substring with at most K distinct characters',
      'Minimum Window Substring',
      'Permutation in String',
    ],
    edgeCases: ['Empty string (return 0)', 'All same characters "aaaa" (return 1)', 'All unique characters (return n)'],
    commonMistakes: [
      'Not checking if the previous occurrence is within the current window (charIndex >= left)',
      'Off-by-one: window size is right - left + 1',
    ],
    interviewerTips: [
      'The left = max(left, lastSeen + 1) trick avoids shrinking past the current window',
      'Set-based solution is O(2n) worst case vs O(n) for map — worth mentioning',
    ],
  },
  xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60 },
  prerequisites: ['two-sum'],
  relatedPatterns: ['Sliding Window', 'Variable Window'],
  intuitionSummary: 'The window slides right expanding the search. When a repeat enters, the left wall moves right to evict it.',
  patternName: 'Variable Sliding Window',
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Adobe', 'Google', 'Meta', 'Microsoft'],
};

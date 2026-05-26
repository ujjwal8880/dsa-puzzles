import type { QuestionConfig } from '@/types/question';

export const twoSum: QuestionConfig = {
  id: 'two-sum',
  slug: 'two-sum',
  leetcodeNumber: 1,
  title: 'Two Sum',
  category: 'hashmap',
  difficulty: 'easy',
  engineType: 'matching',
  tags: ['hashmap', 'array', 'complement'],
  descriptions: {
    explorer: 'Find two numbers in the list that add up to the magic target number!',
    engineer: 'Given an array and a target, find two indices whose values sum to target. Use a hashmap for O(n) time.',
    interview: 'Classic hashmap complement lookup. For each element x, check if (target - x) exists in the map. Single pass O(n) time, O(n) space.',
  },
  puzzleConfig: {
    items: [
      { id: 'a', value: 2, label: '2' },
      { id: 'b', value: 7, label: '7' },
      { id: 'c', value: 11, label: '11' },
      { id: 'd', value: 15, label: '15' },
    ],
    target: 9,
    instruction: 'Select two numbers that add up to 9',
    mode: 'two-sum',
    correctAnswer: ['a', 'b'],
  },
  hints: [
    { id: 1, text: 'For each number, what would its "partner" need to be to reach the target?', xpCost: 0 },
    { id: 2, text: 'If target is 9 and you see 2, you need 7. Can you instantly check if 7 exists?', xpCost: 0 },
    { id: 3, text: 'A hashmap stores each number as you scan. Look up the complement (target - current) before storing.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Start with an empty hashmap. Begin scanning array.',
      state: { array: [2, 7, 11, 15], hashmap: {}, current: -1, target: 9 },
      highlight: [],
      pointers: {},
      annotation: 'map = {}',
    },
    {
      id: 2,
      description: 'Visit nums[0] = 2. Complement = 9 - 2 = 7. Is 7 in map? No. Store 2 → index 0.',
      state: { array: [2, 7, 11, 15], hashmap: { 2: 0 }, current: 0, target: 9 },
      highlight: [0],
      pointers: { i: 0 },
      annotation: 'complement = 7 → not found\nmap = {2: 0}',
    },
    {
      id: 3,
      description: 'Visit nums[1] = 7. Complement = 9 - 7 = 2. Is 2 in map? YES! Return [map[2], 1] = [0, 1].',
      state: { array: [2, 7, 11, 15], hashmap: { 2: 0 }, current: 1, target: 9, found: true },
      highlight: [0, 1],
      pointers: { i: 1 },
      annotation: 'complement = 2 → FOUND at index 0\nReturn [0, 1] ✓',
    },
  ],
  complexity: {
    time: 'O(n)',
    space: 'O(n)',
    timeExplanation: 'Single pass through the array. Each hashmap lookup is O(1).',
    spaceExplanation: 'Hashmap stores at most n elements.',
    visualization: 'linear',
  },
  codeSolutions: [
        {
      language: 'python',
      code: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]

        seen[num] = i

    return []`,
    },
    {
      language: 'java',
      code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }

        map.put(nums[i], i);
    }

    return new int[]{};
}`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Nested loops: for each element, check every other element.',
      complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops', spaceExplanation: 'No extra space', visualization: 'quadratic' },
    },
    optimized: {
      description: 'Single pass hashmap. Store complement as you go.',
      complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single loop', spaceExplanation: 'Hashmap storage', visualization: 'linear' },
    },
    followUps: [
      'What if the array is sorted? (Two pointer, O(1) space)',
      'What if you need all pairs that sum to target?',
      'Three Sum — extend the pattern',
      'What if values can be negative?',
    ],
    edgeCases: [
      'Same element used twice? (e.g., nums = [3, 3], target = 6)',
      'No solution exists (problem guarantees one exists)',
      'Empty array',
    ],
    commonMistakes: [
      'Using indexOf in brute force (still O(n²))',
      'Storing value before checking complement — misses [3,3] case',
      'Off-by-one in index tracking',
    ],
    interviewerTips: [
      'Ask: can indices repeat? Can values repeat?',
      'Mention sorted alternative before jumping to hashmap',
      'Space/time tradeoff discussion shows depth',
    ],
  },
  codeChallenge: {
    functionName: 'twoSum',
    unorderedResult: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here

}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your solution here

}`,
      python: `def twoSum(nums, target):
    # Your solution here
    pass`,
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'Basic case: [2,7,11,15], target=9' },
      { input: [[3, 2, 4], 6], expected: [1, 2], description: 'Not consecutive: [3,2,4], target=6' },
      { input: [[3, 3], 6], expected: [0, 1], description: 'Duplicate values: [3,3], target=6' },
      { input: [[1, 5, 3, 7, 2], 9], expected: [3, 4], description: 'Multiple pairs possible: target=9 (7+2)' },
      { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], description: 'Negative numbers: target=-8' },
    ],
  },
  xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
  prerequisites: [],
  relatedPatterns: ['Complement Lookup', 'Two Sum Sorted', 'Three Sum'],
  intuitionSummary: 'Instead of asking "does any pair sum to target?", flip it: "for each number, does its complement exist?"',
  patternName: 'Complement Hashmap',
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Microsoft'],
};

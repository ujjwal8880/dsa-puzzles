import type { QuestionConfig } from '@/types/question';

export const binarySearch: QuestionConfig = {
  id: 'binary-search',
  slug: 'binary-search',
  leetcodeNumber: 704,
  title: 'Binary Search',
  category: 'binary-search',
  difficulty: 'easy',
  engineType: 'search',
  tags: ['binary-search', 'array', 'divide-conquer'],
  descriptions: {
    explorer: 'A number is hiding in a sorted list. You get to guess — I\'ll tell you if it\'s higher, lower, or exact. Can you find it in as few guesses as possible?',
    engineer: 'Classic binary search on a sorted array. Maintain [left, right] window. Compare mid to target. Eliminate half each step.',
    interview: 'O(log n) by halving the search space. The template: left=0, right=n-1, while(left<=right), mid = left + (right-left)/2.',
  },
  puzzleConfig: {
    array: [-1, 0, 3, 5, 9, 12],
    target: 9,
    instruction: 'Find 9 using binary search. Select the middle element of the current search range.',
    mode: 'binary',
    correctSequence: [2, 4],
  },
  hints: [
    { id: 1, text: 'The array is sorted. If the middle element is too small, which half can you eliminate?', xpCost: 0 },
    { id: 2, text: 'Every guess eliminates HALF the remaining elements. After 3 guesses on 8 elements, you have at most 1 left.', xpCost: 0 },
    { id: 3, text: 'Template: left=0, right=end. mid = (left+right)/2. If nums[mid] < target: left=mid+1. If > target: right=mid-1. If == target: done.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Array: [-1, 0, 3, 5, 9, 12]. Target = 9. Set left=0, right=5.',
      state: { array: [-1, 0, 3, 5, 9, 12], left: 0, right: 5, mid: -1, target: 9, found: false },
      highlight: [],
      pointers: { left: 0, right: 5 },
      annotation: 'left=0, right=5',
    },
    {
      id: 2,
      description: 'mid = (0+5)/2 = 2. nums[2] = 3. 3 < 9 → move left pointer right of mid.',
      state: { array: [-1, 0, 3, 5, 9, 12], left: 0, right: 5, mid: 2, target: 9, found: false },
      highlight: [2],
      pointers: { left: 0, right: 5, mid: 2 },
      annotation: 'nums[2]=3 < 9\nleft = mid+1 = 3',
    },
    {
      id: 3,
      description: 'Now left=3, right=5. mid = (3+5)/2 = 4. nums[4] = 9. Found!',
      state: { array: [-1, 0, 3, 5, 9, 12], left: 3, right: 5, mid: 4, target: 9, found: true },
      highlight: [3, 4, 5],
      pointers: { left: 3, right: 5, mid: 4 },
      annotation: 'nums[4]=9 === 9\nRETURN 4 ✓',
    },
  ],
  complexity: {
    time: 'O(log n)',
    space: 'O(1)',
    timeExplanation: 'Each iteration halves the search space. For n=1,000,000 only ~20 iterations needed.',
    spaceExplanation: 'Only three pointers regardless of array size.',
    visualization: 'logarithmic',
  },
  codeSolutions: [
        {
      language: 'python',
      code: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Linear scan from left to right.',
      complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Scan every element', spaceExplanation: 'Constant space', visualization: 'linear' },
    },
    optimized: {
      description: 'Binary search. Halve search space every iteration.',
      complexity: { time: 'O(log n)', space: 'O(1)', timeExplanation: 'Logarithmic halvings', spaceExplanation: 'Only 3 pointers', visualization: 'logarithmic' },
    },
    followUps: [
      'Search in Rotated Sorted Array (LC 33)',
      'Find First and Last Position (LC 34)',
      'Search Insert Position (LC 35)',
      'How would you apply binary search to non-array problems? (e.g., capacity ships)',
    ],
    edgeCases: ['Target not in array (return -1)', 'Single element array', 'Target at first/last position'],
    commonMistakes: [
      'Using (left + right) / 2 which overflows in languages with fixed int size',
      'Using left < right instead of left <= right (misses single element)',
      'Wrong pointer update: left = mid vs left = mid + 1 causes infinite loop',
    ],
    interviewerTips: [
      'Memorize the template. It\'s the same for all binary search variants.',
      'Always derive mid as left + (right-left)/2',
      'The condition (left <= right) handles the single-element case',
    ],
  },
  codeChallenge: {
    functionName: 'search',
    starterCode: {
      javascript: `/**
 * @param {number[]} nums - sorted array
 * @param {number} target
 * @return {number} index or -1
 */
function search(nums, target) {
  // Your solution here

}`,
      typescript: `function search(nums: number[], target: number): number {
  // Your solution here

}`,
      python: `def search(nums, target):
    # Your solution here
    pass`,
    },
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, description: 'Target found: 9 at index 4' },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, description: 'Target not found: 2' },
      { input: [[5], 5], expected: 0, description: 'Single element, found' },
      { input: [[5], 3], expected: -1, description: 'Single element, not found' },
      { input: [[1, 2, 3, 4, 5], 1], expected: 0, description: 'Target at first index' },
      { input: [[1, 2, 3, 4, 5], 5], expected: 4, description: 'Target at last index' },
    ],
  },
  xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
  prerequisites: [],
  relatedPatterns: ['Binary Search on Answer', 'Rotated Array Search'],
  intuitionSummary: 'Sorted array = you can always eliminate half. Each guess is a strategic question: "Too high or too low?"',
  patternName: 'Divide & Eliminate',
  questionSets: ['blind75', 'top150'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'],
};

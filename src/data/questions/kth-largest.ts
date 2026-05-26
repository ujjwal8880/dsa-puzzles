import type { QuestionConfig } from '@/types/question';

export const kthLargest: QuestionConfig = {
  id: 'kth-largest',
  slug: 'kth-largest-element-in-an-array',
  leetcodeNumber: 215,
  title: 'Kth Largest Element in an Array',
  category: 'heap',
  difficulty: 'medium',
  engineType: 'heap',
  tags: ['heap', 'quickselect', 'sorting'],
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Meta', 'Google', 'Apple', 'Bloomberg'],
  descriptions: {
    explorer: 'Build a priority queue that always holds the top K candidates!',
    engineer: 'Maintain a min-heap of size k. Anything smaller than the current minimum gets evicted. Heap top = kth largest.',
    interview: 'Min-heap of size k: O(n log k). QuickSelect: O(n) average but O(n²) worst case. Prefer heap for stable performance.',
  },
  puzzleConfig: {
    elements: [3, 2, 1, 5, 6, 4],
    k: 2,
    instruction: 'Process each element into a min-heap of size k=2. When heap exceeds k, pop the minimum. The heap top after all elements = 2nd largest.',
    mode: 'heap',
    correctAnswer: 5,
  },
  hints: [
    { id: 1, text: 'A min-heap always keeps the smallest element at the top. We want to track the k LARGEST elements.', xpCost: 0 },
    { id: 2, text: 'If heap has more than k elements, pop the minimum — it can\'t be kth largest. Whatever remains in the heap are the k largest.', xpCost: 0 },
    { id: 3, text: 'After processing [3,2,1,5,6,4] with k=2: heap = [5,6], top = 5 = 2nd largest.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Start with empty heap. Add 3. Heap: [3].',
      state: { heap: [3], evicted: [], current: 3 },
      highlight: [0],
      annotation: 'heap = [3], size=1 ≤ k=2',
    },
    {
      id: 2,
      description: 'Add 2. Heap: [2,3] (min-heap, 2 is root). Size=2=k, no eviction.',
      state: { heap: [2, 3], evicted: [], current: 2 },
      highlight: [1],
      annotation: 'heap = [2,3], size=2 = k',
    },
    {
      id: 3,
      description: 'Add 1. Heap becomes [1,3,2], size=3 > k=2. Pop min=1. Heap: [2,3].',
      state: { heap: [2, 3], evicted: [1], current: 1 },
      highlight: [2],
      annotation: 'added 1, popped 1\nheap = [2,3]',
    },
    {
      id: 4,
      description: 'Add 5. Heap: [2,3,5], size=3 > k=2. Pop min=2. Heap: [3,5].',
      state: { heap: [3, 5], evicted: [1, 2], current: 5 },
      highlight: [3],
      annotation: 'added 5, popped 2\nheap = [3,5]',
    },
    {
      id: 5,
      description: 'Add 6. Heap: [3,5,6], size=3 > k=2. Pop min=3. Heap: [5,6].',
      state: { heap: [5, 6], evicted: [1, 2, 3], current: 6 },
      highlight: [4],
      annotation: 'added 6, popped 3\nheap = [5,6]',
    },
    {
      id: 6,
      description: 'Add 4. Heap: [4,6,5], size=3 > k=2. Pop min=4. Heap: [5,6]. Done! Top = 5 = 2nd largest.',
      state: { heap: [5, 6], evicted: [1, 2, 3, 4], current: 4 },
      highlight: [5],
      annotation: 'added 4, popped 4\nheap = [5,6]\ntop = 5 ✓',
    },
  ],
  complexity: {
    time: 'O(n log k)',
    space: 'O(k)',
    timeExplanation: 'n push operations, each O(log k) for a heap of size k.',
    spaceExplanation: 'Heap stores at most k+1 elements at any time.',
    visualization: 'nlogn',
  },
  codeSolutions: [
    {
      language: 'javascript',
      code: `// Using a simulated min-heap with a sorted array (interview-friendly)
function findKthLargest(nums, k) {
  // Min-heap simulation: maintain sorted array of size k
  const heap = [];

  for (const num of nums) {
    heap.push(num);
    heap.sort((a, b) => a - b); // sort ascending = min at index 0
    if (heap.length > k) heap.shift(); // remove min
  }

  return heap[0]; // smallest in the top-k = kth largest
}

// Production version with proper heap would be O(n log k):
// Use a priority queue library or implement a min-heap class`,
      notes: 'Simplified version for interviews. A real min-heap gives O(n log k) vs O(nk) for array sort.',
    },
        {
      language: 'python',
      code: `import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    # Min-heap of size k
    heap = []

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]  # kth largest`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Sort the array descending, return element at index k-1.',
      complexity: { time: 'O(n log n)', space: 'O(1)', timeExplanation: 'Comparison sort', spaceExplanation: 'In-place sort', visualization: 'nlogn' },
    },
    optimized: {
      description: 'Min-heap of size k: process n elements with O(log k) each. QuickSelect is O(n) average.',
      complexity: { time: 'O(n log k)', space: 'O(k)', timeExplanation: 'n heap ops at O(log k) each', spaceExplanation: 'Heap holds at most k elements', visualization: 'nlogn' },
    },
    followUps: [
      'Kth Smallest? (same approach, max-heap instead)',
      'Stream of numbers — can you always answer kth largest query? (Yes, with heap)',
      'Top K Frequent Elements — combine with hashmap',
      'K Closest Points to Origin — euclidean distance + heap',
    ],
    edgeCases: [
      'k = 1 (maximum element)',
      'k = nums.length (minimum element)',
      'Duplicate elements',
      'All elements are the same',
    ],
    commonMistakes: [
      'Using max-heap instead of min-heap (max-heap would work but needs full sort)',
      'Off-by-one: kth largest is at index k-1 in sorted-desc array',
      'Not handling duplicates correctly in QuickSelect',
    ],
    interviewerTips: [
      'Know both heap and QuickSelect — explain tradeoffs',
      'Heap: O(n log k) time, O(k) space, stable. QuickSelect: O(n) avg but O(n²) worst.',
      'If k << n, heap wins. If k ≈ n, QuickSelect or sort wins.',
    ],
  },
  codeChallenge: {
    functionName: 'findKthLargest',
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  // Your solution here

}`,
    },
    testCases: [
      { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5, description: 'k=2 in [3,2,1,5,6,4]' },
      { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4, description: 'k=4 with duplicates' },
      { input: [[1], 1], expected: 1, description: 'Single element' },
      { input: [[7, 6, 5, 4, 3, 2, 1], 1], expected: 7, description: 'k=1 (maximum)' },
      { input: [[1, 2, 3, 4, 5], 5], expected: 1, description: 'k=n (minimum)' },
      { input: [[2, 2, 2, 2], 2], expected: 2, description: 'All duplicates' },
    ],
  },
  xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 50, coding: 150 },
  prerequisites: [],
  relatedPatterns: ['Min-Heap of Size K', 'QuickSelect', 'Top K Pattern'],
  intuitionSummary: 'Maintain a min-heap of size k. When size exceeds k, pop the min. After all elements, the top of the heap is the kth largest.',
  patternName: 'Min-Heap of Size K',
};

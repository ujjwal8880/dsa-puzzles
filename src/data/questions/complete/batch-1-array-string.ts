import type { QuestionConfig } from '@/types/question';

export const ARRAY_STRING_COMPLETE: QuestionConfig[] = [
  // ─── 1. Contains Duplicate (217) ──────────────────────────────────────────
  {
    id: 'contains-duplicate',
    slug: 'contains-duplicate',
    leetcodeNumber: 217,
    title: 'Contains Duplicate',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['hashmap', 'array', 'set'],
    questionSets: ['blind75'],
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Can you spot if any number appears more than once in the list?',
      engineer: 'Given an integer array, return true if any value appears at least twice. Use a Set for O(n) time.',
      interview: 'Classic Set membership check. Insert each element; if it is already present, return true. Or compare Set size to array length after inserting all elements.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3 },
        { id: 'b', value: 1 },
        { id: 'c', value: 4 },
        { id: 'd', value: 1 },
        { id: 'e', value: 5 },
        { id: 'f', value: 9 },
      ],
      target: 2,
      instruction: 'Array [3,1,4,1,5,9]: which two elements are duplicates of each other?',
      correctAnswer: ['b', 'd'],
    },
    hints: [
      { id: 1, text: 'If you put every number in a container that rejects duplicates, what does the final size tell you?', xpCost: 0 },
      { id: 2, text: 'A Set only stores unique values. If nums.length > new Set(nums).size, at least one duplicate exists.', xpCost: 0 },
      { id: 3, text: 'Single-pass alternative: add each element to a Set as you scan. If the element is already in the Set before insertion, return true immediately.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1, 2, 3, 1]. Create an empty Set.',
        state: { nums: [1, 2, 3, 1], seen: [], i: -1 },
        highlight: [],
        annotation: 'seen = {}',
      },
      {
        id: 2,
        description: 'i=0, nums[0]=1. 1 not in seen → add it.',
        state: { nums: [1, 2, 3, 1], seen: [1], i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'seen = {1}',
      },
      {
        id: 3,
        description: 'i=1, nums[1]=2. 2 not in seen → add it.',
        state: { nums: [1, 2, 3, 1], seen: [1, 2], i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'seen = {1, 2}',
      },
      {
        id: 4,
        description: 'i=2, nums[2]=3. 3 not in seen → add it.',
        state: { nums: [1, 2, 3, 1], seen: [1, 2, 3], i: 2 },
        highlight: [2],
        pointers: { i: 2 },
        annotation: 'seen = {1, 2, 3}',
      },
      {
        id: 5,
        description: 'i=3, nums[3]=1. 1 IS in seen → duplicate found! Return true.',
        state: { nums: [1, 2, 3, 1], seen: [1, 2, 3], i: 3, found: true },
        highlight: [0, 3],
        pointers: { i: 3 },
        annotation: '1 already in seen → return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Single pass through the array. Each Set lookup and insertion is O(1) average.',
      spaceExplanation: 'Set stores at most n distinct elements.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

// One-liner alternative:
// return nums.length !== new Set(nums).size;`,
        notes: 'Early-exit single pass is slightly faster than the one-liner for large arrays with early duplicates.',
      },
      {
        language: 'python',
        code: `def containsDuplicate(nums: list[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# One-liner: return len(nums) != len(set(nums))`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Nested loops: for each element, check every other element for equality.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops', spaceExplanation: 'No extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Single-pass with a Set. Insert and check in O(1) per element.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'One loop, O(1) Set ops', spaceExplanation: 'Set holds up to n elements', visualization: 'linear' },
      },
      followUps: [
        'Contains Duplicate II — duplicate within k distance (sliding window + Set)',
        'Contains Duplicate III — duplicate within k distance and value within t (sorted set / buckets)',
        'What if the array is sorted? (Compare adjacent elements, O(1) space)',
        'Find all duplicates in an array (LeetCode 442 — cycle marking trick)',
      ],
      edgeCases: [
        'Empty array → return false',
        'Single element → return false',
        'All same elements → return true immediately on second element',
        'Very large numbers (integer overflow not an issue in JS/Python but relevant in C++)',
      ],
      commonMistakes: [
        'Using indexOf inside a loop — still O(n²) because indexOf is O(n)',
        'Forgetting that the Set one-liner creates the full Set before comparing — no early exit',
        'Off-by-one: checking after insertion instead of before (misses the duplicate)',
      ],
      interviewerTips: [
        'Mention the sorted-array O(1) space approach before defaulting to Set',
        'The one-liner is elegant but lacks early exit — worth discussing the trade-off',
        'Ask: can we modify the input? Sorting in-place gives O(n log n) time, O(1) space',
      ],
    },
    codeChallenge: {
      functionName: 'containsDuplicate',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 1]], expected: true, description: 'Has duplicate: [1,2,3,1]' },
        { input: [[1, 2, 3, 4]], expected: false, description: 'No duplicates: [1,2,3,4]' },
        { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true, description: 'Multiple duplicates' },
        { input: [[1]], expected: false, description: 'Single element' },
        { input: [[-1, -1, 2, 3]], expected: true, description: 'Negative duplicates' },
        { input: [[0, 0]], expected: true, description: 'Two zeros' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['HashSet Lookup', 'Frequency Count', 'Two Sum'],
    intuitionSummary: 'Put every value in a Set. If size < length, there is a duplicate.',
    patternName: 'HashSet Lookup',
  },

  // ─── 2. Product of Array Except Self (238) ────────────────────────────────
  {
    id: 'product-except-self',
    slug: 'product-of-array-except-self',
    leetcodeNumber: 238,
    title: 'Product of Array Except Self',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'prefix', 'suffix', 'product'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft', 'Meta', 'LinkedIn'],
    descriptions: {
      explorer: 'For each position, find the product of every other number in the array — without using the number at that position!',
      engineer: 'Build prefix-product and suffix-product arrays. answer[i] = prefix[i] * suffix[i]. Achievable in O(n) time, O(1) extra space by using the output array as the prefix pass.',
      interview: 'Two-pass prefix × suffix. First pass fills output with left products. Second pass multiplies in right products with a running variable. No division, O(n) time, O(1) extra space (output array does not count).',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'prefix product' },
        { id: 'b', value: 4, label: 'suffix product' },
        { id: 'c', value: 8, label: '8' },
        { id: 'd', value: 24, label: '24' },
      ],
      target: 6,
      instruction: 'Array [1,2,3,4]: for index 2, what are the prefix product (all elements before it) and suffix product (all elements after it)?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The answer for index i is (product of everything to the left of i) × (product of everything to the right of i).', xpCost: 0 },
      { id: 2, text: 'Compute left products in one forward pass, storing them in the output array. Then do a backward pass multiplying in the right products with a running variable.', xpCost: 0 },
      { id: 3, text: 'Initialize output[0]=1 (nothing to its left). For left pass: output[i] = output[i-1] * nums[i-1]. For right pass: track suffix=1 and multiply output[i] *= suffix; suffix *= nums[i].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1, 2, 3, 4]. Initialize output = [1, 1, 1, 1].',
        state: { nums: [1, 2, 3, 4], output: [1, 1, 1, 1], pass: 'init' },
        highlight: [],
        annotation: 'output = [1,1,1,1]',
      },
      {
        id: 2,
        description: 'Left pass: output[i] = product of nums[0..i-1]. output[1]=1, output[2]=1*2=2, output[3]=1*2*3=6.',
        state: { nums: [1, 2, 3, 4], output: [1, 1, 2, 6], pass: 'left', prefix: 6 },
        highlight: [0, 1, 2, 3],
        annotation: 'Left products: [1, 1, 2, 6]',
      },
      {
        id: 3,
        description: 'Right pass with suffix=1. i=3: output[3] *= 1 → 6; suffix *= 4 → 4.',
        state: { nums: [1, 2, 3, 4], output: [1, 1, 2, 6], suffix: 4, i: 3 },
        highlight: [3],
        pointers: { i: 3 },
        annotation: 'output[3]=6, suffix=4',
      },
      {
        id: 4,
        description: 'i=2: output[2] *= 4 → 8; suffix *= 3 → 12.',
        state: { nums: [1, 2, 3, 4], output: [1, 1, 8, 6], suffix: 12, i: 2 },
        highlight: [2],
        pointers: { i: 2 },
        annotation: 'output[2]=8, suffix=12',
      },
      {
        id: 5,
        description: 'i=1: output[1] *= 12 → 12; suffix *= 2 → 24. i=0: output[0] *= 24 → 24. Done.',
        state: { nums: [1, 2, 3, 4], output: [24, 12, 8, 6], suffix: 24, done: true },
        highlight: [0, 1],
        annotation: 'Final: [24, 12, 8, 6] ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Two linear passes over the array.',
      spaceExplanation: 'Only a single running suffix variable; output array is not counted as extra space per problem constraints.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const output = new Array(n).fill(1);

  // Left pass: output[i] = product of nums[0..i-1]
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    output[i] = prefix;
    prefix *= nums[i];
  }

  // Right pass: multiply in product of nums[i+1..n-1]
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= suffix;
    suffix *= nums[i];
  }

  return output;
}`,
        notes: 'Two passes, no division, O(1) extra space. The output array itself is not counted.',
      },
      {
        language: 'python',
        code: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    output = [1] * n

    prefix = 1
    for i in range(n):
        output[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        output[i] *= suffix
        suffix *= nums[i]

    return output`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each index, multiply all other elements in a nested loop.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops', spaceExplanation: 'No extra space beyond output', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Two-pass prefix × suffix product. Left products stored in output, right products applied via running variable.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Two linear passes', spaceExplanation: 'Output array only (constant extra variables)', visualization: 'linear' },
      },
      followUps: [
        'What if division was allowed? (compute total product, divide by each element — but handle zeros)',
        'What if the array contains zeros? (one zero → all outputs are 0 except that index; two zeros → all outputs are 0)',
        'Maximum Product Subarray — related product-tracking pattern',
        'Can you do it in a single pass? (No — you need full left context before you can apply right context)',
      ],
      edgeCases: [
        'Array contains a single zero — only the zero-index position gets a nonzero result',
        'Array contains two or more zeros — entire output is zeros',
        'Array of length 2 — each element is just the other element',
        'Negative numbers — products can be negative; algorithm handles them identically',
      ],
      commonMistakes: [
        'Using division and not handling the zero case (divide by zero crash)',
        'Allocating separate prefix and suffix arrays — correct but uses O(n) space unnecessarily',
        'Forgetting to initialize prefix/suffix to 1 (boundary: nothing to the left of index 0)',
      ],
      interviewerTips: [
        'The O(1) space solution always impresses — mention it proactively after stating the O(n) space version',
        'Zeros are the hardest edge case; bring them up yourself before the interviewer does',
        'This pattern (prefix and suffix passes) recurs in Trapping Rain Water and other problems',
      ],
    },
    codeChallenge: {
      functionName: 'productExceptSelf',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], description: 'Basic: [1,2,3,4]' },
        { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], description: 'Contains zero: [-1,1,0,-3,3]' },
        { input: [[2, 3]], expected: [3, 2], description: 'Two elements' },
        { input: [[1, 0]], expected: [0, 1], description: 'One zero at end' },
        { input: [[-2, -3, 4]], expected: [-12, -8, 6], description: 'Negatives present' },
        { input: [[1, 1, 1, 1]], expected: [1, 1, 1, 1], description: 'All ones' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['contains-duplicate'],
    relatedPatterns: ['Prefix Product', 'Suffix Scan', 'Two-Pass Array'],
    intuitionSummary: 'For each index, answer = product of all elements to its left × product of all to its right.',
    patternName: 'Prefix × Suffix',
  },

  // ─── 3. Maximum Subarray (53) ─────────────────────────────────────────────
  {
    id: 'max-subarray',
    slug: 'maximum-subarray',
    leetcodeNumber: 53,
    title: 'Maximum Subarray',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'subarray',
    tags: ['array', 'dp', 'kadane', 'greedy'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft', 'LinkedIn', 'Adobe'],
    descriptions: {
      explorer: 'Find the contiguous subarray (at least one number) that has the largest sum!',
      engineer: "Kadane's Algorithm: maintain a running sum. If it goes negative, reset to 0. At each step update the global max.",
      interview: "Kadane's: currentSum = max(nums[i], currentSum + nums[i]). maxSum = max(maxSum, currentSum). Single pass O(n) time, O(1) space.",
    },
    puzzleConfig: {
      array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
      mode: 'max-sum',
      correctValue: 6,
      instruction: 'Array [-2,1,-3,4,-1,2,1,-5,4]: click the start then end of the contiguous subarray with the largest sum.',
    },
    hints: [
      { id: 1, text: 'Scan left to right keeping a running sum. If the running sum becomes negative it can only hurt future subarrays — reset it to 0.', xpCost: 0 },
      { id: 2, text: 'At each position: currentSum = currentSum + nums[i]. If currentSum < 0, reset to 0. Track maxSum throughout.', xpCost: 0 },
      { id: 3, text: "Kadane's key insight: a subarray ending at index i either starts fresh at i, or extends the best subarray ending at i-1. So currentSum = max(nums[i], currentSum + nums[i]).", xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [-2,1,-3,4,-1,2,1,-5,4]. currentSum=0, maxSum=-Infinity.',
        state: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentSum: 0, maxSum: -Infinity, i: -1 },
        highlight: [],
        annotation: 'currentSum=0, maxSum=-∞',
      },
      {
        id: 2,
        description: 'i=0: num=-2. currentSum=0+(-2)=-2 < 0 → reset to 0. maxSum=max(-∞,-2)=-2.',
        state: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentSum: 0, maxSum: -2, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'currentSum=0 (reset), maxSum=-2',
      },
      {
        id: 3,
        description: 'i=1: num=1. currentSum=0+1=1. maxSum=max(-2,1)=1.',
        state: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentSum: 1, maxSum: 1, i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'currentSum=1, maxSum=1',
      },
      {
        id: 4,
        description: 'i=2: num=-3. currentSum=1+(-3)=-2 < 0 → reset to 0. i=3: num=4. currentSum=0+4=4. maxSum=4.',
        state: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentSum: 4, maxSum: 4, i: 3 },
        highlight: [3],
        pointers: { i: 3 },
        annotation: 'currentSum=4, maxSum=4',
      },
      {
        id: 5,
        description: 'i=4..6: currentSum goes 4→3→5→6. maxSum=6. i=7: -5 pulls to 1. i=8: +4=5. Final maxSum=6.',
        state: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentSum: 5, maxSum: 6, done: true },
        highlight: [3, 4, 5, 6],
        annotation: 'Subarray [4,-1,2,1] sums to 6. Return 6 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only two extra variables: currentSum and maxSum.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous subarray or start fresh
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
        notes: "Initializing with nums[0] handles all-negative arrays correctly. The max(nums[i], currentSum + nums[i]) form is Kadane's cleanest expression.",
      },
      {
        language: 'python',
        code: `def maxSubArray(nums: list[int]) -> int:
    max_sum = nums[0]
    current_sum = nums[0]

    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Check all subarrays: for each (i, j) pair compute sum and track maximum.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'O(n²) pairs; O(1) prefix sum trick reduces inner loop', spaceExplanation: 'No extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: "Kadane's Algorithm: single pass, extend or restart subarray at each element.",
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One loop', spaceExplanation: 'Two scalar variables', visualization: 'linear' },
      },
      followUps: [
        'Return the subarray itself (track start and end indices)',
        'Maximum Sum Circular Subarray (LeetCode 918) — total sum minus minimum subarray',
        'Maximum Product Subarray — track both max and min',
        'Divide and conquer approach — O(n log n) but interesting for parallel computation',
      ],
      edgeCases: [
        'All negative numbers — return the single largest element',
        'Single element — return it',
        'All same positive number — sum of entire array',
        'Alternating large positives and small negatives',
      ],
      commonMistakes: [
        "Initializing maxSum to 0 — wrong for all-negative arrays (e.g., [-3,-1,-2] should return -1, not 0)",
        'Resetting currentSum to 0 when negative — correct, but initializing maxSum to 0 breaks all-negative case',
        'Not handling single-element arrays',
      ],
      interviewerTips: [
        "Kadane's is a classic — explain the key decision: extend or restart. Interviewers love this framing.",
        'Mention the divide-and-conquer alternative (O(n log n)) to show algorithmic breadth',
        "If asked to return indices, track startTemp when currentSum resets and update start/end when maxSum updates",
      ],
    },
    codeChallenge: {
      functionName: 'maxSubArray',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, description: 'Classic: subarray [4,-1,2,1]=6' },
        { input: [[1]], expected: 1, description: 'Single element' },
        { input: [[5, 4, -1, 7, 8]], expected: 23, description: 'All mostly positive' },
        { input: [[-1, -2, -3, -4]], expected: -1, description: 'All negative — return largest' },
        { input: [[-2, -1]], expected: -1, description: 'Two negatives' },
        { input: [[0, -1, 2]], expected: 2, description: 'Zero in array' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['best-time-stocks'],
    relatedPatterns: ["Kadane's Algorithm", 'Greedy Scan', 'Maximum Product Subarray'],
    intuitionSummary: 'Track running sum. Reset to 0 when it goes negative. Track global max.',
    patternName: "Kadane's Algorithm",
  },

  // ─── 4. Maximum Product Subarray (152) ───────────────────────────────────
  {
    id: 'max-product-subarray',
    slug: 'maximum-product-subarray',
    leetcodeNumber: 152,
    title: 'Maximum Product Subarray',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'subarray',
    tags: ['array', 'dp', 'product', 'greedy'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'LinkedIn', 'Apple'],
    descriptions: {
      explorer: 'Find the contiguous subarray that has the largest product. Watch out — negatives can flip everything!',
      engineer: 'Track both maxProduct and minProduct at each step. A negative number flips max↔min. At each element: new values are max/min of (num, maxPrev*num, minPrev*num).',
      interview: 'Two running variables: curMax and curMin. At each step, curMax = max(num, curMax*num, curMin*num). curMin = min(same). Update globalMax. The min tracks the most negative product in case a future negative makes it the maximum.',
    },
    puzzleConfig: {
      array: [2, 3, -2, 4],
      mode: 'max-product',
      correctValue: 6,
      instruction: 'Array [2,3,-2,4]: click the start then end of the subarray with the largest product. Careful — negatives can flip the sign!',
    },
    hints: [
      { id: 1, text: 'This is like Maximum Subarray but for products. The tricky part: a large negative can become the maximum if multiplied by another negative.', xpCost: 0 },
      { id: 2, text: 'Track both the maximum AND minimum product ending at each index. When you see a negative number, swap max and min before multiplying.', xpCost: 0 },
      { id: 3, text: 'At each element: candidates are (num alone, curMax*num, curMin*num). New curMax = max of all three. New curMin = min of all three. Update globalMax with curMax.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [2, 3, -2, 4]. curMax=1, curMin=1, globalMax=-Infinity.',
        state: { nums: [2, 3, -2, 4], curMax: 1, curMin: 1, globalMax: -Infinity },
        highlight: [],
        annotation: 'curMax=1, curMin=1',
      },
      {
        id: 2,
        description: 'i=0, num=2. candidates: 2, 1*2=2, 1*2=2. curMax=2, curMin=2, globalMax=2.',
        state: { nums: [2, 3, -2, 4], curMax: 2, curMin: 2, globalMax: 2, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'curMax=2, curMin=2, globalMax=2',
      },
      {
        id: 3,
        description: 'i=1, num=3. candidates: 3, 2*3=6, 2*3=6. curMax=6, curMin=3, globalMax=6.',
        state: { nums: [2, 3, -2, 4], curMax: 6, curMin: 3, globalMax: 6, i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'curMax=6, curMin=3, globalMax=6',
      },
      {
        id: 4,
        description: 'i=2, num=-2. candidates: -2, 6*(-2)=-12, 3*(-2)=-6. curMax=max(-2,-12,-6)=-2. curMin=min=-12. globalMax stays 6.',
        state: { nums: [2, 3, -2, 4], curMax: -2, curMin: -12, globalMax: 6, i: 2 },
        highlight: [2],
        pointers: { i: 2 },
        annotation: 'curMax=-2, curMin=-12, globalMax=6',
      },
      {
        id: 5,
        description: 'i=3, num=4. candidates: 4, -2*4=-8, -12*4=-48. curMax=4, curMin=-48. globalMax=max(6,4)=6. Return 6.',
        state: { nums: [2, 3, -2, 4], curMax: 4, curMin: -48, globalMax: 6, done: true },
        highlight: [3],
        annotation: 'Subarray [2,3] gives product 6. Return 6 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only three scalar variables: curMax, curMin, globalMax.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {
  let curMax = nums[0];
  let curMin = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    // Multiplying by a negative swaps max and min
    const tempMax = Math.max(num, curMax * num, curMin * num);
    const tempMin = Math.min(num, curMax * num, curMin * num);
    curMax = tempMax;
    curMin = tempMin;
    globalMax = Math.max(globalMax, curMax);
  }

  return globalMax;
}`,
        notes: 'Use tempMax/tempMin to avoid using the updated curMax when computing curMin in the same iteration.',
      },
      {
        language: 'python',
        code: `def maxProduct(nums: list[int]) -> int:
    cur_max = nums[0]
    cur_min = nums[0]
    global_max = nums[0]

    for num in nums[1:]:
        candidates = (num, cur_max * num, cur_min * num)
        cur_max, cur_min = max(candidates), min(candidates)
        global_max = max(global_max, cur_max)

    return global_max`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Check all subarrays: for each (i,j) compute product and track maximum.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops over all subarrays', spaceExplanation: 'Constant extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Track curMax and curMin simultaneously. Negatives swap the roles of max and min.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Three scalar variables', visualization: 'linear' },
      },
      followUps: [
        'What if the array can have zeros? (Reset curMax and curMin to 1 on zero — or handle via candidates including num itself)',
        'Maximum Sum Circular Subarray — analogous circular variant',
        'Return the subarray itself (track indices)',
        'What is the minimum product subarray?',
      ],
      edgeCases: [
        'Contains zero — splits the subarray; algorithm handles via num-alone candidate',
        'All negative numbers with even count — product of all is the answer',
        'All negative numbers with odd count — drop one end element',
        'Single element',
      ],
      commonMistakes: [
        'Forgetting to use temp variables — updating curMax before computing curMin corrupts the result',
        'Initializing globalMax to 0 — wrong for all-negative arrays',
        'Not including num alone as a candidate — misses the "start fresh" case',
      ],
      interviewerTips: [
        'The key insight to highlight: negatives can turn a very negative product into a very positive one — so track the minimum too',
        'Connect to Kadane\'s: same "extend or restart" decision, but for products with the extra negative-flip complexity',
        'Zeros naturally "reset" the subarray because num alone (which is 0) becomes the new curMax and curMin',
      ],
    },
    codeChallenge: {
      functionName: 'maxProduct',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[2, 3, -2, 4]], expected: 6, description: 'Classic: [2,3] gives 6' },
        { input: [[-2, 0, -1]], expected: 0, description: 'Zero present' },
        { input: [[-2, 3, -4]], expected: 24, description: 'Two negatives: product of all = 24' },
        { input: [[2, -5, -2, -4, 3]], expected: 24, description: 'Mixed: [-5,-2,-4,3] = 120? No: best is [-2,-4,3]=24' },
        { input: [[-1]], expected: -1, description: 'Single negative element' },
        { input: [[0, 2]], expected: 2, description: 'Zero and positive' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['max-subarray'],
    relatedPatterns: ['Track Max & Min', "Kadane's Algorithm", 'Two Running Variables'],
    intuitionSummary: 'Negatives flip max to min and vice versa. Track both max and min product at each step.',
    patternName: 'Track Max & Min',
  },

  // ─── 5. Longest Palindromic Substring (5) ────────────────────────────────
  {
    id: 'longest-palindrome',
    slug: 'longest-palindromic-substring',
    leetcodeNumber: 5,
    title: 'Longest Palindromic Substring',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'subarray',
    tags: ['string', 'dp', 'expand-around-center', 'two-pointer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Adobe', 'Bloomberg'],
    descriptions: {
      explorer: 'Find the longest substring that reads the same forwards and backwards!',
      engineer: 'Expand around center: for each index (and each gap between indices), expand outward while characters match. Track the longest palindrome found.',
      interview: 'Expand-around-center: 2n-1 centers (n odd-length, n-1 even-length). For each center expand while s[l]==s[r]. Track max length and update result. O(n²) time, O(1) space.',
    },
    puzzleConfig: {
      array: ['b', 'a', 'b', 'a', 'd'],
      mode: 'palindrome',
      correctValue: 3,
      instruction: 'String "b a b a d": click the start then end character of the longest palindromic substring.',
    },
    hints: [
      { id: 1, text: 'Every palindrome has a center — either a single character (odd length) or a gap between two equal characters (even length). Try expanding outward from each possible center.', xpCost: 0 },
      { id: 2, text: 'Write a helper that takes a left and right pointer and expands while s[left] == s[right]. It returns the length of the palindrome found.', xpCost: 0 },
      { id: 3, text: 'Call the helper twice per index: once with (i, i) for odd-length palindromes and once with (i, i+1) for even-length. Take the maximum of both. O(n²) time, O(1) space — better than DP which needs O(n²) space.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: "babad". Check center at index 0 (char \'b\'): expand (0,0) → only "b", len=1.',
        state: { s: 'babad', center: 0, best: 'b' },
        highlight: [0],
        annotation: 'center=0, best="b"',
      },
      {
        id: 2,
        description: 'Center at index 1 (char \'a\'): expand (1,1) → s[0]=\'b\', s[2]=\'b\' match → palindrome "bab", len=3.',
        state: { s: 'babad', center: 1, best: 'bab', l: 0, r: 2 },
        highlight: [0, 1, 2],
        pointers: { l: 0, r: 2 },
        annotation: 'center=1, "bab" (len=3)',
      },
      {
        id: 3,
        description: 'Even center between index 1–2 (\'a\',\'b\'): s[1]≠s[2] → no palindrome of length 2 here.',
        state: { s: 'babad', center: '1-2', best: 'bab' },
        highlight: [1, 2],
        annotation: 'a≠b, skip',
      },
      {
        id: 4,
        description: 'Center at index 2 (\'b\'): expand (2,2) → s[1]=\'a\', s[3]=\'a\' match → "aba", len=3. Tie with "bab".',
        state: { s: 'babad', center: 2, best: 'bab', l: 1, r: 3 },
        highlight: [1, 2, 3],
        pointers: { l: 1, r: 3 },
        annotation: 'center=2, "aba" (len=3, tie)',
      },
      {
        id: 5,
        description: 'Centers 3 and 4 yield only length-1 palindromes. Final answer: "bab" (or "aba" — both valid).',
        state: { s: 'babad', best: 'bab', done: true },
        highlight: [0, 1, 2],
        annotation: 'Return "bab" ✓',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      timeExplanation: 'For each of the 2n-1 centers we expand at most n/2 times.',
      spaceExplanation: 'Only a few pointer variables; no auxiliary array needed unlike the DP approach.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  let start = 0;
  let maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        maxLen = r - l + 1;
        start = l;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd-length palindromes
    expand(i, i + 1); // even-length palindromes
  }

  return s.substring(start, start + maxLen);
}`,
        notes: 'Tracking start index and maxLen avoids string slicing inside the inner loop.',
      },
      {
        language: 'python',
        code: `def longestPalindrome(s: str) -> str:
    start, max_len = 0, 1

    def expand(l, r):
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > max_len:
                max_len = r - l + 1
                start = l
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)      # odd
        expand(i, i + 1)  # even

    return s[start:start + max_len]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Check every substring: O(n²) substrings × O(n) palindrome check = O(n³).',
        complexity: { time: 'O(n³)', space: 'O(1)', timeExplanation: 'All pairs × palindrome verification', spaceExplanation: 'Constant extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Expand around each of the 2n-1 centers. O(n²) time, O(1) space.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: '2n-1 centers, each expands at most n/2 times', spaceExplanation: 'Only index variables', visualization: 'quadratic' },
      },
      followUps: [
        "Manacher's Algorithm — O(n) time palindrome finding",
        'Palindromic Substrings (LC 647) — count instead of find longest',
        'Palindrome Partitioning — DP on palindrome checks',
        'Longest Palindromic Subsequence (LC 516) — subsequence, not substring',
      ],
      edgeCases: [
        'Single character — return it',
        'Two same characters "aa" — return "aa"',
        'All same characters "aaaa" — return entire string',
        'No palindrome longer than 1 (e.g., "abcd") — return first character',
      ],
      commonMistakes: [
        'Forgetting to handle even-length palindromes (calling expand(i,i) only)',
        'Off-by-one in substring extraction: use start to start+maxLen, not start+maxLen-1',
        'Updating start/maxLen inside the while loop after expanding past the valid palindrome boundary',
      ],
      interviewerTips: [
        "Mention Manacher's algorithm exists — even if you don't implement it, it shows awareness of optimal solutions",
        'The DP approach (O(n²) time and space) is correct but the expand-around-center is strictly better in space',
        'Clarify: return the substring itself or its length? Problem asks for substring',
      ],
    },
    codeChallenge: {
      functionName: 'longestPalindrome',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['babad'], expected: 'bab', description: 'Classic: "bab" or "aba" both valid' },
        { input: ['cbbd'], expected: 'bb', description: 'Even-length palindrome: "bb"' },
        { input: ['a'], expected: 'a', description: 'Single character' },
        { input: ['racecar'], expected: 'racecar', description: 'Entire string is palindrome' },
        { input: ['abcba'], expected: 'abcba', description: 'Odd full palindrome' },
        { input: ['abcd'], expected: 'a', description: 'No palindrome longer than 1' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['palindromic-substrings'],
    relatedPatterns: ['Expand Around Center', 'Two Pointer', 'Palindrome DP'],
    intuitionSummary: 'For each character (and gap), expand outward as long as characters match. Track the longest expansion.',
    patternName: 'Expand Around Center',
  },

  // ─── 6. Palindromic Substrings (647) ─────────────────────────────────────
  {
    id: 'palindromic-substrings',
    slug: 'palindromic-substrings',
    leetcodeNumber: 647,
    title: 'Palindromic Substrings',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['string', 'dp', 'expand', 'two-pointer'],
    questionSets: ['blind75'],
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Count how many substrings of a string are palindromes. Every single character counts!',
      engineer: 'Expand around center for both odd and even length palindromes. Increment count for every successful expansion.',
      interview: 'Same expand-around-center as LC 5. For each of 2n-1 centers, count how many palindromes expand successfully. Total count = sum of all expansions across all centers.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'length 1' },
        { id: 'b', value: 2, label: 'length 2' },
        { id: 'c', value: 3, label: 'length 3' },
        { id: 'd', value: 6, label: '6' },
      ],
      target: 3,
      instruction: "String 'aaa': what are the two shortest distinct palindrome substring lengths that appear in this string?",
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Every single character is a palindrome. Start your count at n (one per character), then count additional palindromes formed by expansion.', xpCost: 0 },
      { id: 2, text: 'Use the same expand-around-center technique as Longest Palindromic Substring, but instead of tracking the maximum, increment a counter for every valid expansion.', xpCost: 0 },
      { id: 3, text: 'For each center (n odd + n-1 even = 2n-1 centers total), while s[l]==s[r]: count++, l--, r++. Each successful step finds one more palindrome.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: "abc". Initialize count=0. Will check all centers.',
        state: { s: 'abc', count: 0 },
        highlight: [],
        annotation: 'count=0',
      },
      {
        id: 2,
        description: 'Center i=0 (\'a\'): expand(0,0) → "a" matches → count=1. Cannot expand further.',
        state: { s: 'abc', count: 1 },
        highlight: [0],
        annotation: '"a" → count=1',
      },
      {
        id: 3,
        description: 'Even center (0,1): s[0]=\'a\' ≠ s[1]=\'b\' → no palindrome. Center i=1 (\'b\'): expand(1,1) → "b" → count=2. Expand (0,2): s[0]=\'a\' ≠ s[2]=\'c\' → stop.',
        state: { s: 'abc', count: 2 },
        highlight: [1],
        annotation: '"b" → count=2',
      },
      {
        id: 4,
        description: 'Even center (1,2): s[1]=\'b\' ≠ s[2]=\'c\' → no palindrome. Center i=2 (\'c\'): expand(2,2) → "c" → count=3.',
        state: { s: 'abc', count: 3 },
        highlight: [2],
        annotation: '"c" → count=3',
      },
      {
        id: 5,
        description: 'All centers checked. Result: 3 palindromic substrings ("a","b","c").',
        state: { s: 'abc', count: 3, done: true },
        highlight: [],
        annotation: 'Return 3 ✓',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      timeExplanation: '2n-1 centers, each expanding at most n/2 times.',
      spaceExplanation: 'Only a counter and loop variables.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @return {number}
 */
function countSubstrings(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd-length palindromes
    expand(i, i + 1); // even-length palindromes
  }

  return count;
}`,
        notes: 'Increment count inside the while loop — each successful step is a distinct palindrome.',
      },
      {
        language: 'python',
        code: `def countSubstrings(s: str) -> int:
    count = 0

    def expand(l, r):
        nonlocal count
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)      # odd
        expand(i, i + 1)  # even

    return count`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Check every substring for palindrome property. O(n²) substrings × O(n) check = O(n³).',
        complexity: { time: 'O(n³)', space: 'O(1)', timeExplanation: 'Nested loops plus check', spaceExplanation: 'Constant space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Expand around center: count one palindrome per successful expansion step.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: '2n-1 centers, O(n) expansion each', spaceExplanation: 'Only scalar variables', visualization: 'quadratic' },
      },
      followUps: [
        'Longest Palindromic Substring (LC 5) — find instead of count',
        'Palindrome Partitioning (LC 131) — partition string into palindromes',
        "Manacher's Algorithm — O(n) counting using previously computed palindrome radii",
        'Count palindromic subsequences (harder DP problem)',
      ],
      edgeCases: [
        'Single character — answer is 1',
        'All same characters "aaa" — answer is n*(n+1)/2 (every substring is a palindrome)',
        'No palindromes longer than 1 — answer equals n',
      ],
      commonMistakes: [
        'Not calling expand for even-length centers — misses palindromes like "aa", "abba"',
        'Counting each palindrome multiple times by checking both from center and from brute-force',
        "Forgetting single characters: they're valid palindromes and the expand loop handles them on the very first iteration",
      ],
      interviewerTips: [
        'Relate this directly to LC 5 — same technique, different objective (count vs. find longest)',
        'The DP approach works too: dp[i][j] = true if s[i..j] is palindrome. Count all dp[i][j]=true. But it uses O(n²) space.',
        "For interviewers who push for O(n): mention Manacher's algorithm by name even if you can't code it from memory",
      ],
    },
    codeChallenge: {
      functionName: 'countSubstrings',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
function countSubstrings(s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['abc'], expected: 3, description: 'No palindromes > length 1: "a","b","c"' },
        { input: ['aaa'], expected: 6, description: '"a","a","a","aa","aa","aaa"' },
        { input: ['aba'], expected: 4, description: '"a","b","a","aba"' },
        { input: ['a'], expected: 1, description: 'Single character' },
        { input: ['abba'], expected: 6, description: '"a","b","b","a","bb","abba"' },
        { input: ['racecar'], expected: 10, description: 'Classic palindrome word' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['longest-palindrome'],
    relatedPatterns: ['Expand Count', 'Expand Around Center', 'Palindrome DP'],
    intuitionSummary: 'Expand from each center. Count every valid palindrome found during expansion.',
    patternName: 'Expand Count',
  },

  // ─── 7. Group Anagrams (49) ───────────────────────────────────────────────
  {
    id: 'group-anagrams',
    slug: 'group-anagrams',
    leetcodeNumber: 49,
    title: 'Group Anagrams',
    category: 'hashmap',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['hashmap', 'string', 'sorting', 'frequency'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Apple', 'Uber'],
    descriptions: {
      explorer: 'Group words together that are made of the same letters, just scrambled differently!',
      engineer: 'Sort each string to produce a canonical key. Use the sorted form as a hashmap key to group anagrams together. O(n·k log k) time where k is max string length.',
      interview: 'Sorted-key grouping. For each string, sort its characters to get the canonical form. Use that as a Map key. Alternative: use a frequency count array of 26 chars as the key (avoids sorting, O(n·k) total).',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'group A' },
        { id: 'b', value: 1, label: 'group B' },
        { id: 'c', value: 1, label: 'group C' },
        { id: 'd', value: 2, label: '2 groups' },
      ],
      target: 2,
      instruction: "Words ['eat','tea','tan']: how many distinct anagram groups are there, and which group counts add up to that total?",
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Two strings are anagrams if and only if they contain exactly the same characters with the same frequencies. What transformation makes anagrams identical?', xpCost: 0 },
      { id: 2, text: "Sorting a string produces its canonical form. 'eat', 'tea', 'ate' all sort to 'aet'. Use this as a hashmap key.", xpCost: 0 },
      { id: 3, text: "Alternative key for O(n*k) instead of O(n*k log k): use a character frequency tuple, e.g. '1#0#0#...' for 26 letters. Group strings by this frequency signature.", xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: ["eat","tea","tan","ate","nat","bat"]. Initialize empty hashmap.',
        state: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], map: {} },
        highlight: [],
        annotation: 'map = {}',
      },
      {
        id: 2,
        description: '"eat" → sorted "aet". map["aet"] = ["eat"].',
        state: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], map: { aet: ['eat'] } },
        highlight: [0],
        annotation: 'map = {aet: ["eat"]}',
      },
      {
        id: 3,
        description: '"tea" → sorted "aet". map["aet"] already exists → push "tea". "tan" → sorted "ant" → new group.',
        state: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], map: { aet: ['eat', 'tea'], ant: ['tan'] } },
        highlight: [1, 2],
        annotation: 'map = {aet: ["eat","tea"], ant: ["tan"]}',
      },
      {
        id: 4,
        description: '"ate" → "aet" → push. "nat" → "ant" → push. "bat" → "abt" → new group.',
        state: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], map: { aet: ['eat', 'tea', 'ate'], ant: ['tan', 'nat'], abt: ['bat'] } },
        highlight: [3, 4, 5],
        annotation: 'All strings grouped',
      },
      {
        id: 5,
        description: 'Return Object.values(map): [["eat","tea","ate"],["tan","nat"],["bat"]].',
        state: { result: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']], done: true },
        highlight: [],
        annotation: 'Return 3 groups ✓',
      },
    ],
    complexity: {
      time: 'O(n · k log k)',
      space: 'O(n · k)',
      timeExplanation: 'n strings each sorted in O(k log k) where k is the max string length.',
      spaceExplanation: 'Storing all strings in the hashmap: O(n·k) total characters.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}`,
        notes: 'For O(n*k) instead of O(n*k log k), build a 26-character frequency array as the key instead of sorting.',
      },
      {
        language: 'python',
        code: `from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each string, compare against all others to find anagrams. Group them.',
        complexity: { time: 'O(n² · k)', space: 'O(n · k)', timeExplanation: 'All pairs × string comparison', spaceExplanation: 'Storing all groups', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sort each string to get canonical key. Group by key in a hashmap.',
        complexity: { time: 'O(n · k log k)', space: 'O(n · k)', timeExplanation: 'n strings, each sorted in O(k log k)', spaceExplanation: 'All strings stored in map', visualization: 'nlogn' },
      },
      followUps: [
        'Use frequency array as key instead of sorting — reduces to O(n·k) time',
        'Valid Anagram (LC 242) — the single-pair version of this problem',
        'Find All Anagrams in a String (LC 438) — sliding window + frequency matching',
        'What if strings can contain Unicode characters beyond ASCII?',
      ],
      edgeCases: [
        'Empty string input — map key is "" (empty sorted string)',
        'Single string — returns [[that string]]',
        'All strings are anagrams of each other — one group',
        'No two strings are anagrams — n groups of size 1',
      ],
      commonMistakes: [
        'Using a plain object as a map in JS — keys must be strings, and object has prototype properties that can conflict',
        'Not accounting for case sensitivity (problem uses lowercase only, but worth clarifying)',
        'Sorting in-place and modifying the original string (sort a copy)',
      ],
      interviewerTips: [
        'Proactively mention the O(n·k) frequency-count alternative — shows deeper thinking',
        'Discuss trade-offs: sorting is simpler to code; frequency key is faster asymptotically',
        'Ask: should groups be in any particular order? (Problem says no)',
      ],
    },
    codeChallenge: {
      functionName: 'groupAnagrams',
      starterCode: {
        javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']], description: 'Classic example' },
        { input: [['']], expected: [['']], description: 'Empty string' },
        { input: [['a']], expected: [['a']], description: 'Single character' },
        { input: [['abc', 'cba', 'bca']], expected: [['abc', 'cba', 'bca']], description: 'All anagrams' },
        { input: [['ab', 'ba', 'cd', 'dc']], expected: [['ab', 'ba'], ['cd', 'dc']], description: 'Two anagram groups' },
      ],
      unorderedResult: true,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['valid-anagram'],
    relatedPatterns: ['Sorted Key Grouping', 'Frequency Count', 'Hashmap Bucketing'],
    intuitionSummary: 'Anagrams have identical sorted forms. Use sorted string as hashmap key to group them.',
    patternName: 'Sorted Key Grouping',
  },

  // ─── 8. Valid Anagram (242) ───────────────────────────────────────────────
  {
    id: 'valid-anagram',
    slug: 'valid-anagram',
    leetcodeNumber: 242,
    title: 'Valid Anagram',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['hashmap', 'string', 'frequency', 'sorting'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Bloomberg'],
    descriptions: {
      explorer: 'Are these two words made of exactly the same letters? Check if one is a scrambled version of the other!',
      engineer: 'Count character frequencies in both strings. If any frequency differs (or lengths differ), return false. O(n) time, O(1) space (26 letters).',
      interview: 'Frequency count with a single array of size 26. Increment for s, decrement for t. If any value is nonzero at the end, return false. O(n) time, O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: "'a' in s" },
        { id: 'b', value: 3, label: "'a' in t" },
        { id: 'c', value: 1, label: "'n' in each" },
        { id: 'd', value: 1, label: "'g' in each" },
      ],
      target: 6,
      instruction: "'anagram' vs 'nagaram': select the frequency counts of the same character in each string that confirm they are anagrams.",
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Two strings are anagrams if they have the same characters with the same counts. What is the quickest way to compare character counts?', xpCost: 0 },
      { id: 2, text: 'Create a count array of size 26. Increment for each character in s, decrement for each character in t. If all counts are zero, they are anagrams.', xpCost: 0 },
      { id: 3, text: 'Short-circuit: if s.length !== t.length, return false immediately. Then a single pass over both strings (same loop, index by same i) is enough.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: s="anagram", t="nagaram". Lengths both 7 — proceed. Initialize count[26] = all zeros.',
        state: { s: 'anagram', t: 'nagaram', counts: {}, i: -1 },
        highlight: [],
        annotation: 'counts = {all 0}',
      },
      {
        id: 2,
        description: 'Process s: a+3, n+1, g+1, r+1, m+1. counts = {a:3, n:1, g:1, r:1, m:1}.',
        state: { s: 'anagram', counts: { a: 3, n: 1, g: 1, r: 1, m: 1 } },
        highlight: [],
        annotation: 'After s: {a:3,n:1,g:1,r:1,m:1}',
      },
      {
        id: 3,
        description: 'Process t: n-1, a-1, g-1, a-1, r-1, a-1, m-1.',
        state: { t: 'nagaram', counts: { a: 2, n: 0, g: 0, r: 0, m: 0 } },
        highlight: [],
        annotation: 'After partial t: {a:2,...}',
      },
      {
        id: 4,
        description: 'After processing all of t: counts = {a:0, n:0, g:0, r:0, m:0} — all zeros.',
        state: { counts: { a: 0, n: 0, g: 0, r: 0, m: 0 }, allZero: true },
        highlight: [],
        annotation: 'All counts = 0 → anagram!',
      },
      {
        id: 5,
        description: 'All counts are zero → return true.',
        state: { result: true, done: true },
        highlight: [],
        annotation: 'Return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through both strings of length n.',
      spaceExplanation: 'Fixed-size array of 26 characters — constant regardless of input size.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}`,
        notes: 'charCodeAt - 97 maps \'a\'→0, \'b\'→1, ... \'z\'→25. Processing both strings in one loop is slightly more cache-friendly.',
      },
      {
        language: 'python',
        code: `from collections import Counter

def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)

# Manual approach:
# def isAnagram(s, t):
#     if len(s) != len(t): return False
#     count = [0] * 26
#     for a, b in zip(s, t):
#         count[ord(a) - ord('a')] += 1
#         count[ord(b) - ord('a')] -= 1
#     return all(c == 0 for c in count)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Sort both strings and compare. O(n log n) time, O(n) or O(1) space.',
        complexity: { time: 'O(n log n)', space: 'O(1)', timeExplanation: 'Sorting dominates', spaceExplanation: 'In-place sort possible', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Frequency count array of size 26. Single pass, O(n) time, O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One pass through both strings', spaceExplanation: 'Fixed 26-element array', visualization: 'linear' },
      },
      followUps: [
        'What if inputs contain Unicode characters? (Use a Map instead of a fixed 26-array)',
        'Group Anagrams (LC 49) — apply this check at scale with grouping',
        'Find All Anagrams in a String (LC 438) — sliding window variant',
        'Minimum number of character swaps to make t an anagram of s',
      ],
      edgeCases: [
        'Different lengths — return false immediately',
        'Both empty strings — they are anagrams of each other',
        'Same string — is an anagram of itself',
        'Strings with repeated characters like "aab" vs "aba"',
      ],
      commonMistakes: [
        'Forgetting the length check — without it, "a" and "aa" would incorrectly pass',
        'Using a Map/object when a 26-element array is simpler and faster for lowercase ASCII',
        'Sorting approach: forgetting that JavaScript sort() mutates the array',
      ],
      interviewerTips: [
        'Mention both the sort approach (simpler code) and the frequency count approach (better time complexity)',
        'For Unicode follow-up, switch from array to Map — same logic, just different key lookup',
        'The single-loop trick (process both strings simultaneously) demonstrates clean coding instincts',
      ],
    },
    codeChallenge: {
      functionName: 'isAnagram',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['anagram', 'nagaram'], expected: true, description: 'Classic anagram' },
        { input: ['rat', 'car'], expected: false, description: 'Not an anagram' },
        { input: ['', ''], expected: true, description: 'Both empty strings' },
        { input: ['a', 'a'], expected: true, description: 'Single identical characters' },
        { input: ['ab', 'a'], expected: false, description: 'Different lengths' },
        { input: ['aab', 'aba'], expected: true, description: 'Repeated character rearrangement' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Frequency Count', 'Sorted Key Grouping', 'Character Map'],
    intuitionSummary: 'Count character frequencies in both strings. If counts match for every character, they are anagrams.',
    patternName: 'Frequency Count',
  },

  // ─── 9. Encode and Decode Strings (271) ──────────────────────────────────
  {
    id: 'encode-decode',
    slug: 'encode-and-decode-strings',
    leetcodeNumber: 271,
    title: 'Encode and Decode Strings',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['string', 'design', 'encoding'],
    questionSets: ['blind75'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    descriptions: {
      explorer: 'Design a way to convert a list of words into a single string and back — even if the words contain any characters!',
      engineer: 'Length-prefix encoding: for each string, prepend its length and a delimiter (e.g. "4#word"). Decoding reads the length, then slices exactly that many characters.',
      interview: 'Encode: join as length + "#" + word for each string. Decode: scan for "#", read length before it, slice exactly that many characters after "#", advance pointer. The "#" delimiter is safe because the length tells us exactly where the next string ends.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 4, label: '"lint"' },
        { id: 'b', value: 4, label: '"code"' },
        { id: 'c', value: 8, label: '8' },
        { id: 'd', value: 2, label: '2' },
      ],
      target: 8,
      instruction: "Encode/Decode Strings ['lint','code']: what length prefix would you prepend to each word so the decoder knows exactly where each word ends?",
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'You cannot use a simple separator like "," because strings might contain commas. You need a scheme that is unambiguous regardless of string content.', xpCost: 0 },
      { id: 2, text: 'Prefix each string with its length and a delimiter: "4#test" means "take 4 characters after the #". This is unambiguous because length is always numeric.', xpCost: 0 },
      { id: 3, text: 'Encode: result = strings.map(s => s.length + "#" + s).join(""). Decode: scan for "#", read the integer before it as length, slice the next [length] characters as the next string.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Encode ["lint","code","love","you"]. Prefix each with length#.',
        state: { input: ['lint', 'code', 'love', 'you'], encoded: '' },
        highlight: [],
        annotation: 'Building encoded string',
      },
      {
        id: 2,
        description: '"lint" → "4#lint". "code" → "4#code". "love" → "4#love". "you" → "3#you".',
        state: { encoded: '4#lint4#code4#love3#you' },
        highlight: [],
        annotation: 'encoded = "4#lint4#code4#love3#you"',
      },
      {
        id: 3,
        description: 'Decode: i=0. Find "#" at position 1. Length=4. Slice s[2..5]="lint". i=2+4=6.',
        state: { s: '4#lint4#code4#love3#you', i: 6, decoded: ['lint'] },
        highlight: [],
        annotation: 'decoded=["lint"], i=6',
      },
      {
        id: 4,
        description: 'i=6. Find "#" at i+1=7. Length=4. Slice s[8..11]="code". i=8+4=12.',
        state: { s: '4#lint4#code4#love3#you', i: 12, decoded: ['lint', 'code'] },
        highlight: [],
        annotation: 'decoded=["lint","code"], i=12',
      },
      {
        id: 5,
        description: 'Continue: "love" extracted at i=12→18, "you" at i=18→end. Return ["lint","code","love","you"].',
        state: { decoded: ['lint', 'code', 'love', 'you'], done: true },
        highlight: [],
        annotation: 'Return original list ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Encoding and decoding each touch every character once.',
      spaceExplanation: 'Encoded string has the same total character count plus O(n) length prefixes.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * Encodes a list of strings to a single string.
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs) {
  return strs.map(s => s.length + '#' + s).join('');
}

/**
 * Decodes a single string to a list of strings.
 * @param {string} s
 * @return {string[]}
 */
function decode(s) {
  const result = [];
  let i = 0;

  while (i < s.length) {
    // Find the '#' delimiter
    let j = i;
    while (s[j] !== '#') j++;

    const len = parseInt(s.slice(i, j), 10);
    result.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }

  return result;
}`,
        notes: 'The length-prefix scheme handles strings with any content including "#" characters, because the length tells us exactly where the string ends.',
      },
      {
        language: 'python',
        code: `def encode(strs: list[str]) -> str:
    return ''.join(f'{len(s)}#{s}' for s in strs)

def decode(s: str) -> list[str]:
    result = []
    i = 0
    while i < len(s):
        j = s.index('#', i)
        length = int(s[i:j])
        result.append(s[j + 1: j + 1 + length])
        i = j + 1 + length
    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Use a unique delimiter like "|". Fails if strings contain that delimiter.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Linear join/split', spaceExplanation: 'Output string', visualization: 'linear' },
      },
      optimized: {
        description: 'Length-prefix encoding: "len#string". The delimiter is always safe because the numeric length unambiguously bounds the string.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'One pass encode, one pass decode', spaceExplanation: 'Encoded string + result array', visualization: 'linear' },
      },
      followUps: [
        'What if strings can contain non-ASCII / binary data? (Escaping approach or use a fixed-width 4-byte length header)',
        'Chunked transfer encoding in HTTP uses a similar length-prefix scheme',
        'Serialize and Deserialize Binary Tree (LC 297) — similar encoding design problem',
        'Design a protocol to send multiple images over a network — same problem at byte level',
      ],
      edgeCases: [
        'Empty string in the list — "0#" encodes/decodes correctly',
        'String containing "#" characters — length prefix handles it without ambiguity',
        'Empty list — encode returns "", decode returns []',
        'Strings with numbers like "42" — still safe because we look for "#" not just digits',
      ],
      commonMistakes: [
        'Using a simple delimiter without escaping — breaks when strings contain the delimiter',
        'Parsing the length with a fixed-width field — works but less elegant than reading until "#"',
        'Not advancing i by the correct amount during decoding (off-by-one on j+1)',
      ],
      interviewerTips: [
        'The design question is the real point — explain WHY simple delimiters fail and why length-prefix is robust',
        'Mention that HTTP chunked transfer encoding uses the same idea — shows real-world connection',
        'Ask: are strings guaranteed to be ASCII? Non-ASCII strings have multi-byte characters that affect length vs. byte-length',
      ],
    },
    codeChallenge: {
      functionName: 'encode',
      starterCode: {
        javascript: `/**
 * Encodes a list of strings to a single string.
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs) {
  // Your solution here
}

/**
 * Decodes a single string to a list of strings.
 * @param {string} s
 * @return {string[]}
 */
function decode(s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [['lint', 'code', 'love', 'you']], expected: ['lint', 'code', 'love', 'you'], description: 'Basic round-trip' },
        { input: [['', 'hello', '']], expected: ['', 'hello', ''], description: 'Empty strings in list' },
        { input: [['has#hash', 'normal']], expected: ['has#hash', 'normal'], description: 'String containing delimiter #' },
        { input: [['']], expected: [''], description: 'Single empty string' },
        { input: [['a', 'b', 'c']], expected: ['a', 'b', 'c'], description: 'Single-character strings' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['valid-anagram'],
    relatedPatterns: ['Length-Prefix Encoding', 'String Design', 'Protocol Design'],
    intuitionSummary: 'Prefix each string with its length + a delimiter. Decoding reads length first, then exactly that many characters.',
    patternName: 'Length-Prefix Encoding',
  },

  // ─── 10. Minimum Window Substring (76) ───────────────────────────────────
  {
    id: 'minimum-window',
    slug: 'minimum-window-substring',
    leetcodeNumber: 76,
    title: 'Minimum Window Substring',
    category: 'sliding-window',
    difficulty: 'hard',
    engineType: 'window',
    tags: ['sliding-window', 'hashmap', 'string', 'two-pointer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Uber'],
    descriptions: {
      explorer: 'Find the smallest window in a string that contains all the characters of a target string!',
      engineer: 'Expand right until window contains all required characters. Then shrink from left to minimize while still valid. Track minimum valid window seen.',
      interview: 'Two-pointer with need/have counters. Expand right adding chars; when have==need (all t chars covered at required frequency), record window and shrink from left until condition breaks. O(n+m) time.',
    },
    puzzleConfig: {
      sequence: ['A','D','O','B','E','C','O','D','E','B','A','N','C'],
      windowConstraint: { type: 'no-repeat' },
      instruction: 'String "ADOBECODEBANC", target="ABC". Find the minimum window containing all of A, B, C.',
      mode: 'min-window',
      correctAnswer: { start: 9, end: 12, length: 4 },
    },
    hints: [
      { id: 1, text: 'Expand the right pointer until your window contains all characters of t. Once valid, try shrinking from the left to find a smaller valid window.', xpCost: 0 },
      { id: 2, text: 'Use two hashmaps: one for required character counts in t, one for current window counts. Track how many distinct characters are fully satisfied ("have" vs "need").', xpCost: 0 },
      { id: 3, text: 'Key optimization: only update "have" when the window count of a char exactly reaches the required count. Shrink left while have==need, updating minimum window each time.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: s="ADOBECODEBANC", t="ABC". need={A:1,B:1,C:1}, have=0, need_count=3.',
        state: { s: 'ADOBECODEBANC', t: 'ABC', need: { A: 1, B: 1, C: 1 }, have: 0, need_count: 3, window: {}, left: 0, right: -1 },
        highlight: [],
        annotation: 'have=0, need=3',
      },
      {
        id: 2,
        description: 'Expand right: A(have=1)→D→O→B(have=2)→E→C(have=3). Window "ADOBEC" is first valid window.',
        state: { window: { A: 1, D: 1, O: 1, B: 1, E: 1, C: 1 }, have: 3, left: 0, right: 5, minWindow: 'ADOBEC' },
        highlight: [0, 1, 2, 3, 4, 5],
        pointers: { left: 0, right: 5 },
        annotation: 'First valid: "ADOBEC" len=6',
      },
      {
        id: 3,
        description: 'Shrink left: remove A at index 0 → have drops to 2 (A count drops below required). Stop shrinking.',
        state: { window: { A: 0, D: 1, O: 1, B: 1, E: 1, C: 1 }, have: 2, left: 1, right: 5 },
        highlight: [1, 2, 3, 4, 5],
        pointers: { left: 1, right: 5 },
        annotation: 'Removed A, have=2',
      },
      {
        id: 4,
        description: 'Continue right: O→D→E→B→A (have=3). Window "DOBECODEBA" then shrink. After shrinking reach "BANC".',
        state: { window: { B: 1, A: 1, N: 1, C: 1 }, have: 3, left: 9, right: 12, minWindow: 'BANC' },
        highlight: [9, 10, 11, 12],
        pointers: { left: 9, right: 12 },
        annotation: 'New min: "BANC" len=4',
      },
      {
        id: 5,
        description: 'Shrink left from index 9: remove B → have=2. End of s. Return "BANC".',
        state: { result: 'BANC', done: true },
        highlight: [9, 10, 11, 12],
        annotation: 'Return "BANC" ✓',
      },
    ],
    complexity: {
      time: 'O(n + m)',
      space: 'O(m)',
      timeExplanation: 'Each character is added and removed from the window at most once. m = |t|, n = |s|.',
      spaceExplanation: 'Two hashmaps storing at most |charset| distinct characters.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  if (t.length > s.length) return '';

  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  const window = new Map();
  let have = 0;
  const needCount = need.size; // distinct chars needed

  let minLen = Infinity;
  let minStart = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);

    // Check if this char's requirement is now met
    if (need.has(c) && window.get(c) === need.get(c)) {
      have++;
    }

    // Shrink from left while window is valid
    while (have === needCount) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
        have--;
      }
      left++;
    }
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}`,
        notes: 'Using need.size (distinct character count) instead of total character count as the "fully covered" threshold is the key efficiency insight.',
      },
      {
        language: 'python',
        code: `from collections import Counter

def minWindow(s: str, t: str) -> str:
    if len(t) > len(s):
        return ''

    need = Counter(t)
    window = {}
    have, need_count = 0, len(need)
    min_len, min_start = float('inf'), 0
    left = 0

    for right, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            have += 1

        while have == need_count:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_start = left
            window[s[left]] -= 1
            if s[left] in need and window[s[left]] < need[s[left]]:
                have -= 1
            left += 1

    return '' if min_len == float('inf') else s[min_start:min_start + min_len]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Check all substrings of s. For each, verify if it contains all chars of t.',
        complexity: { time: 'O(n² · m)', space: 'O(m)', timeExplanation: 'O(n²) substrings × O(m) check', spaceExplanation: 'Hashmap for t', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sliding window with have/need counters. Expand right, shrink left when valid.',
        complexity: { time: 'O(n + m)', space: 'O(m)', timeExplanation: 'Each char added/removed once', spaceExplanation: 'Two hashmaps for t chars', visualization: 'linear' },
      },
      followUps: [
        'Smallest Range Covering Elements from K Lists (LC 632) — generalization of this pattern',
        'Find All Anagrams in a String (LC 438) — fixed-size window variant',
        'Permutation in String (LC 567) — fixed-size window checking permutation',
        'What if we need to find all minimum windows? (Collect all instead of tracking min)',
      ],
      edgeCases: [
        't is longer than s — return empty string immediately',
        't has repeated characters like "AA" — window must contain at least two As',
        's == t — return s',
        'No valid window exists — return empty string',
      ],
      commonMistakes: [
        'Using total character count instead of distinct satisfied characters as the "valid" check — makes shrinking more complex',
        'Not decrementing have correctly when shrinking removes a character that was exactly meeting its requirement',
        'Off-by-one in substring extraction',
      ],
      interviewerTips: [
        'The have/need pattern (counting satisfied constraints, not total chars) is reusable across many sliding window problems',
        'Be explicit about when have increments: only when window[c] exactly equals need[c], not when it exceeds',
        'Test with t="AA" — forces the interviewer to see you handle frequencies, not just presence',
      ],
    },
    codeChallenge: {
      functionName: 'minWindow',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC', description: 'Classic: minimum window is "BANC"' },
        { input: ['a', 'a'], expected: 'a', description: 's equals t' },
        { input: ['a', 'aa'], expected: '', description: 't longer than s' },
        { input: ['aa', 'aa'], expected: 'aa', description: 'Repeated character in t' },
        { input: ['AABC', 'ABC'], expected: 'ABC', description: 'Window at the end' },
        { input: ['xyz', 'z'], expected: 'z', description: 'Single character target' },
      ],
    },
    xpRewards: { puzzle: 180, hints: 30, dryRun: 50, code: 80, coding: 200 },
    prerequisites: ['longest-substring'],
    relatedPatterns: ['Shrink When Valid', 'Variable Sliding Window', 'Have/Need Counter'],
    intuitionSummary: 'Expand right until window contains all required chars. Then shrink from left to find minimum.',
    patternName: 'Shrink When Valid',
  },

  // ─── 11. Set Matrix Zeroes (73) ──────────────────────────────────────────
  {
    id: 'set-matrix-zeroes',
    slug: 'set-matrix-zeroes',
    leetcodeNumber: 73,
    title: 'Set Matrix Zeroes',
    category: 'matrix',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['matrix', 'in-place', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google', 'Adobe'],
    descriptions: {
      explorer: 'If a cell in the grid is zero, set its entire row and column to zero. Do it without using extra space!',
      engineer: 'Use the first row and first column as flag arrays. First pass: mark which rows/cols need zeroing. Second pass: apply zeroes. Third pass: zero first row/col if needed.',
      interview: 'In-place using the matrix itself as storage. Use matrix[i][0] to flag row i and matrix[0][j] to flag column j. Handle the first row and first column separately with two boolean flags.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'row 1' },
        { id: 'b', value: 1, label: 'col 1' },
        { id: 'c', value: 0, label: '0' },
        { id: 'd', value: 2, label: '2' },
      ],
      target: 2,
      instruction: 'Matrix contains a zero — which row and column indices identify the cell that triggers zeroing of its entire row and column?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The naive O(m+n) space approach: record which rows and columns contain zeros in two sets, then zero them out. Can you do better?', xpCost: 0 },
      { id: 2, text: 'Use the first row as a flag for which columns need zeroing, and the first column as a flag for which rows need zeroing. But first check if row 0 or col 0 themselves contain zeros.', xpCost: 0 },
      { id: 3, text: 'Step 1: record whether first row and first column contain a zero. Step 2: use matrix[0][j] and matrix[i][0] as flags. Step 3: zero flagged rows and cols. Step 4: handle first row and col based on flags from Step 1.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [[1,1,1],[1,0,1],[1,1,1]]. Zero found at (1,1). Check: first row has zero? No. First col has zero? No.',
        state: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]], firstRowZero: false, firstColZero: false },
        highlight: [],
        annotation: 'firstRowZero=false, firstColZero=false',
      },
      {
        id: 2,
        description: 'Pass 1: scan inner cells. matrix[1][1]=0 → set matrix[1][0]=0 (flag row 1) and matrix[0][1]=0 (flag col 1).',
        state: { matrix: [[1, 0, 1], [0, 0, 1], [1, 1, 1]], flagsSet: true },
        highlight: [],
        annotation: 'Flags: row 1 and col 1 marked',
      },
      {
        id: 3,
        description: 'Pass 2: for each inner cell (i≥1, j≥1), if matrix[i][0]=0 or matrix[0][j]=0, set to 0. Row 1 and col 1 cells get zeroed.',
        state: { matrix: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
        highlight: [],
        annotation: 'Inner cells updated',
      },
      {
        id: 4,
        description: 'Pass 3: handle first row (firstRowZero=false, skip) and first col (firstColZero=false, skip).',
        state: { matrix: [[1, 0, 1], [0, 0, 0], [1, 0, 1]], done: true },
        highlight: [],
        annotation: 'First row/col unchanged',
      },
      {
        id: 5,
        description: 'Final matrix: [[1,0,1],[0,0,0],[1,0,1]]. Row 1 and column 1 are zeroed.',
        state: { matrix: [[1, 0, 1], [0, 0, 0], [1, 0, 1]], done: true },
        highlight: [],
        annotation: 'Return [[1,0,1],[0,0,0],[1,0,1]] ✓',
      },
    ],
    complexity: {
      time: 'O(m × n)',
      space: 'O(1)',
      timeExplanation: 'Three passes over the matrix, each O(m×n).',
      spaceExplanation: 'No extra arrays; flags stored in-place in the first row and column.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 * @return {void} Modify matrix in-place.
 */
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  let firstRowZero = false;
  let firstColZero = false;

  // Check if first row/col originally have zeros
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) firstRowZero = true;
  }
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) firstColZero = true;
  }

  // Use first row/col as flags for inner cells
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Zero out inner cells based on flags
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Zero first row and col if originally had zeros
  if (firstRowZero) {
    for (let j = 0; j < n; j++) matrix[0][j] = 0;
  }
  if (firstColZero) {
    for (let i = 0; i < m; i++) matrix[i][0] = 0;
  }
}`,
        notes: 'The first row/col must be handled last because they serve as flag storage during the main pass.',
      },
      {
        language: 'python',
        code: `def setZeroes(matrix: list[list[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    if first_row_zero:
        for j in range(n): matrix[0][j] = 0
    if first_col_zero:
        for i in range(m): matrix[i][0] = 0`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Record all (row, col) positions of zeros first, then zero each found row and column.',
        complexity: { time: 'O(m × n)', space: 'O(m + n)', timeExplanation: 'Two passes over matrix', spaceExplanation: 'Sets for zero rows and columns', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Use first row and column as flag storage. Two boolean variables handle the flags for those rows/cols themselves.',
        complexity: { time: 'O(m × n)', space: 'O(1)', timeExplanation: 'Multiple passes but all O(m×n)', spaceExplanation: 'Two extra booleans only', visualization: 'quadratic' },
      },
      followUps: [
        'Game of Life (LC 289) — similar in-place state encoding pattern',
        'What if you need to propagate zeros diagonally too?',
        'What if the matrix is very large and zeros are sparse? (Collect positions, zero lazily)',
        'Rotate Image — another in-place matrix manipulation',
      ],
      edgeCases: [
        'Entire first row is zeros — firstRowZero=true, zero entire first row at the end',
        'Matrix is a single cell with zero — set to zero (already is)',
        'No zeros in matrix — return unchanged',
        'All zeros — return all zeros',
      ],
      commonMistakes: [
        'Zeroing the first row/col during the flag pass — corrupts the flags you still need',
        'Not checking whether the first row/col themselves contained original zeros',
        'Confusing row flag (matrix[i][0]) with column flag (matrix[0][j])',
      ],
      interviewerTips: [
        'Always start with the O(m+n) space approach and explain before optimizing — shows systematic thinking',
        'The order of operations is critical — emphasize: flags first, inner cells second, first row/col last',
        'This is an "in-place encoding" pattern that appears in Game of Life and other problems',
      ],
    },
    codeChallenge: {
      functionName: 'setZeroes',
      starterCode: {
        javascript: `/**
 * @param {number[][]} matrix
 * @return {void}
 */
function setZeroes(matrix) {
  // Your solution here (modify in-place)
}`,
      },
      testCases: [
        { input: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]], description: 'Single zero at center' },
        { input: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]], expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]], description: 'Zeros in first row' },
        { input: [[[1]]], expected: [[1]], description: '1×1 matrix no zero' },
        { input: [[[0]]], expected: [[0]], description: '1×1 matrix with zero' },
        { input: [[[1, 2], [3, 0]]], expected: [[1, 0], [0, 0]], description: 'Zero in last cell' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['contains-duplicate'],
    relatedPatterns: ['First Row/Col as Flags', 'In-Place Encoding', 'Matrix Traversal'],
    intuitionSummary: 'Use the first row and column as flag storage. Mark which rows/cols need zeroing, then apply in a second pass.',
    patternName: 'First Row/Col as Flags',
  },

  // ─── 12. Spiral Matrix (54) ───────────────────────────────────────────────
  {
    id: 'spiral-matrix',
    slug: 'spiral-matrix',
    leetcodeNumber: 54,
    title: 'Spiral Matrix',
    category: 'matrix',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['matrix', 'simulation', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google', 'Bloomberg'],
    descriptions: {
      explorer: 'Read all the numbers in a matrix going in a spiral — right, down, left, up — until you collect every element!',
      engineer: 'Maintain four boundaries: top, bottom, left, right. Traverse each side in order and shrink the boundary inward. Repeat until all elements are collected.',
      interview: 'Boundary simulation: traverse right (top row), down (right col), left (bottom row), up (left col). After each pass shrink the corresponding boundary. Guard against single-row/col edge cases.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1' },
        { id: 'b', value: 5, label: '5' },
        { id: 'c', value: 9, label: '9' },
        { id: 'd', value: 3, label: '3' },
      ],
      target: 6,
      instruction: 'Matrix [[1,2,3],[4,5,6],[7,8,9]]: what are the first and last values visited when you traverse the matrix in spiral order?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Imagine peeling the outer ring of the matrix. Each peel gives you: the top row left-to-right, the right column top-to-bottom, the bottom row right-to-left, the left column bottom-to-top.', xpCost: 0 },
      { id: 2, text: 'Track four boundaries: top, bottom, left, right. After each direction traversal, shrink the respective boundary inward (top++, bottom--, left++, right--).',  xpCost: 0 },
      { id: 3, text: 'After traversing right (top row), increment top. After down (right col), decrement right. After left (bottom row), decrement bottom. After up (left col), increment left. Guard: check top<=bottom and left<=right before each pass.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [[1,2,3],[4,5,6],[7,8,9]]. top=0, bottom=2, left=0, right=2.',
        state: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], top: 0, bottom: 2, left: 0, right: 2, result: [] },
        highlight: [],
        annotation: 'top=0,bot=2,left=0,right=2',
      },
      {
        id: 2,
        description: 'Traverse right (top row): 1,2,3. top++ → top=1.',
        state: { top: 1, bottom: 2, left: 0, right: 2, result: [1, 2, 3] },
        highlight: [0, 1, 2],
        annotation: 'result=[1,2,3], top=1',
      },
      {
        id: 3,
        description: 'Traverse down (right col, rows 1–2): 6,9. right-- → right=1.',
        state: { top: 1, bottom: 2, left: 0, right: 1, result: [1, 2, 3, 6, 9] },
        highlight: [],
        annotation: 'result=[1,2,3,6,9], right=1',
      },
      {
        id: 4,
        description: 'Traverse left (bottom row, cols 1–0): 8,7. bottom-- → bottom=1.',
        state: { top: 1, bottom: 1, left: 0, right: 1, result: [1, 2, 3, 6, 9, 8, 7] },
        highlight: [],
        annotation: 'result=[1,2,3,6,9,8,7], bottom=1',
      },
      {
        id: 5,
        description: 'Traverse up (left col, rows 1–1): 4. left++ → left=1. Now traverse right: 5. All 9 elements collected.',
        state: { result: [1, 2, 3, 6, 9, 8, 7, 4, 5], done: true },
        highlight: [],
        annotation: 'Return [1,2,3,6,9,8,7,4,5] ✓',
      },
    ],
    complexity: {
      time: 'O(m × n)',
      space: 'O(1)',
      timeExplanation: 'Every element is visited exactly once.',
      spaceExplanation: 'Only four boundary variables (output array is required).',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse right
    for (let j = left; j <= right; j++) result.push(matrix[top][j]);
    top++;

    // Traverse down
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;

    // Traverse left (guard against single-row case)
    if (top <= bottom) {
      for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
      bottom--;
    }

    // Traverse up (guard against single-column case)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
}`,
        notes: 'The top<=bottom and left<=right guards before left/up traversal prevent double-counting single rows or columns.',
      },
      {
        language: 'python',
        code: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1

        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1

        if top <= bottom:
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1

        if left <= right:
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1

    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Track visited cells with a boolean matrix and simulate direction changes.',
        complexity: { time: 'O(m × n)', space: 'O(m × n)', timeExplanation: 'Visit every cell', spaceExplanation: 'Visited matrix', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Shrinking boundary simulation. No visited array needed.',
        complexity: { time: 'O(m × n)', space: 'O(1)', timeExplanation: 'Every element visited once', spaceExplanation: 'Four boundary integers', visualization: 'quadratic' },
      },
      followUps: [
        'Spiral Matrix II (LC 59) — fill a matrix in spiral order',
        'Spiral Matrix III (LC 885) — walk spirally from a starting cell on an r×c grid',
        'Print all elements of a matrix in diagonal order',
        'What if the matrix is not square?',
      ],
      edgeCases: [
        'Single row matrix — traverse right only',
        'Single column matrix — traverse down only',
        'Single element — return [matrix[0][0]]',
        '1×n or m×1 matrix — only one direction is ever taken',
      ],
      commonMistakes: [
        'Missing the guards for left and up passes — double-counts when only one row or column remains',
        'Incorrect boundary shrinking order — top and right shrink before checking bottom and left',
        'Using visited array when boundary shrinking is sufficient',
      ],
      interviewerTips: [
        'Walk through a 3×3 example AND a 1×4 example to demonstrate the single-row edge case handling',
        'Mention the visited-array approach first as brute force, then optimize to boundaries',
        'The boundary approach naturally handles non-square matrices — point this out',
      ],
    },
    codeChallenge: {
      functionName: 'spiralOrder',
      starterCode: {
        javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5], description: '3×3 matrix' },
        { input: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], description: '3×4 matrix' },
        { input: [[[1]]], expected: [1], description: 'Single element' },
        { input: [[[1, 2]]], expected: [1, 2], description: 'Single row' },
        { input: [[[1], [2]]], expected: [1, 2], description: 'Single column' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['set-matrix-zeroes'],
    relatedPatterns: ['Shrink Boundaries', 'Matrix Simulation', 'Layer Peeling'],
    intuitionSummary: 'Maintain top/bottom/left/right boundaries. Traverse each side in order, then shrink the boundary inward.',
    patternName: 'Shrink Boundaries',
  },

  // ─── 13. Rotate Image (48) ────────────────────────────────────────────────
  {
    id: 'rotate-image',
    slug: 'rotate-image',
    leetcodeNumber: 48,
    title: 'Rotate Image',
    category: 'matrix',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['matrix', 'in-place', 'math'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google', 'Facebook'],
    descriptions: {
      explorer: 'Rotate a square grid 90 degrees clockwise — without using extra space!',
      engineer: 'Transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row. Two simple passes achieve the 90° clockwise rotation in-place.',
      interview: 'Step 1: transpose — swap matrix[i][j] and matrix[j][i] for all i<j. Step 2: reverse each row. Result is a 90° clockwise rotation. Mathematical proof: rotating 90° CW = transpose + reverse rows.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'row 0' },
        { id: 'b', value: 2, label: 'col 2' },
        { id: 'c', value: 7, label: '7' },
        { id: 'd', value: 3, label: '3' },
      ],
      target: 2,
      instruction: '90° clockwise rotation: the element originally at [0,0] lands at a new position. What are its new row and column indices?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Try tracing where a single element goes. Element at (i,j) ends up at (j, n-1-i) after 90° clockwise rotation. Can you find two simpler operations that compose to this?', xpCost: 0 },
      { id: 2, text: 'A transpose sends (i,j) → (j,i). Then reversing each row sends (j,i) → (j, n-1-i). Combined: (i,j) → (j, n-1-i). That is exactly a 90° clockwise rotation!', xpCost: 0 },
      { id: 3, text: 'For the transpose: loop i from 0 to n-1, j from i+1 to n-1, swap matrix[i][j] with matrix[j][i]. For row reversal: use two-pointer swap within each row.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [[1,2,3],[4,5,6],[7,8,9]]. Step 1: Transpose — swap all (i,j) with (j,i) where i<j.',
        state: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], step: 'before-transpose' },
        highlight: [],
        annotation: 'Original matrix',
      },
      {
        id: 2,
        description: 'Transpose: (0,1)↔(1,0): 2↔4. (0,2)↔(2,0): 3↔7. (1,2)↔(2,1): 6↔8. Result: [[1,4,7],[2,5,8],[3,6,9]].',
        state: { matrix: [[1, 4, 7], [2, 5, 8], [3, 6, 9]], step: 'after-transpose' },
        highlight: [],
        annotation: 'After transpose: [[1,4,7],[2,5,8],[3,6,9]]',
      },
      {
        id: 3,
        description: 'Step 2: Reverse each row. Row 0: [1,4,7] → [7,4,1].',
        state: { matrix: [[7, 4, 1], [2, 5, 8], [3, 6, 9]], step: 'row0-reversed' },
        highlight: [],
        annotation: 'Row 0 reversed',
      },
      {
        id: 4,
        description: 'Row 1: [2,5,8] → [8,5,2]. Row 2: [3,6,9] → [9,6,3].',
        state: { matrix: [[7, 4, 1], [8, 5, 2], [9, 6, 3]], step: 'all-reversed' },
        highlight: [],
        annotation: 'All rows reversed',
      },
      {
        id: 5,
        description: 'Final: [[7,4,1],[8,5,2],[9,6,3]]. Each column of the original is now a row, reversed — a 90° clockwise rotation.',
        state: { matrix: [[7, 4, 1], [8, 5, 2], [9, 6, 3]], done: true },
        highlight: [],
        annotation: 'Return [[7,4,1],[8,5,2],[9,6,3]] ✓',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      timeExplanation: 'Transpose touches each of n² elements once. Row reversal touches each n² element once.',
      spaceExplanation: 'All swaps are in-place; only temp variables for swapping.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 * @return {void} Modify matrix in-place.
 */
function rotate(matrix) {
  const n = matrix.length;

  // Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`,
        notes: 'For 90° counter-clockwise: reverse each row first, then transpose. For 180°: reverse each row and then reverse the matrix itself.',
      },
      {
        language: 'python',
        code: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)

    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for row in matrix:
        row.reverse()`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Copy matrix to a new matrix, placing each element at its rotated position.',
        complexity: { time: 'O(n²)', space: 'O(n²)', timeExplanation: 'Visit every element', spaceExplanation: 'Extra matrix', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Transpose then reverse rows. In-place, O(n²) time, O(1) space.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Two passes over n² elements', spaceExplanation: 'In-place swaps only', visualization: 'quadratic' },
      },
      followUps: [
        '90° counter-clockwise: reverse each row first, then transpose',
        '180° rotation: transpose twice, or reverse the matrix (reverse each row, then reverse row order)',
        'Rotate non-square matrices (not possible in-place)',
        'Four-cell cycle rotation — avoids two separate passes (harder to code correctly)',
      ],
      edgeCases: [
        '1×1 matrix — no change needed',
        '2×2 matrix — 4 swaps for transpose, 2 reversals',
        'Already-rotated matrix — works correctly, just produces further rotation',
      ],
      commonMistakes: [
        'Swapping all (i,j) pairs including j<i — reverses the transpose (visit only i<j)',
        'Doing operations in wrong order — reverse rows then transpose gives 90° CCW, not CW',
        'Using matrix[j][i] before the swap in languages without tuple unpacking',
      ],
      interviewerTips: [
        'Derive the transformation mathematically: (i,j) → (j, n-1-i). Then decompose into transpose + reverse.',
        'Mention the counter-clockwise variant — shows you understand the math, not just the recipe',
        'The four-cell cycle approach (rotate 4 cells at a time without separate transpose step) is an advanced alternative',
      ],
    },
    codeChallenge: {
      functionName: 'rotate',
      starterCode: {
        javascript: `/**
 * @param {number[][]} matrix
 * @return {void}
 */
function rotate(matrix) {
  // Your solution here (modify in-place)
}`,
      },
      testCases: [
        { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]], description: '3×3 rotation' },
        { input: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]], expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]], description: '4×4 rotation' },
        { input: [[[1]]], expected: [[1]], description: '1×1 matrix' },
        { input: [[[1, 2], [3, 4]]], expected: [[3, 1], [4, 2]], description: '2×2 rotation' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['set-matrix-zeroes'],
    relatedPatterns: ['Transpose + Reflect', 'In-Place Matrix Manipulation', 'Mathematical Decomposition'],
    intuitionSummary: 'Transpose the matrix (swap [i][j] with [j][i]), then reverse each row.',
    patternName: 'Transpose + Reflect',
  },

  // ─── 14. Search a 2D Matrix (74) ─────────────────────────────────────────
  {
    id: 'search-2d-matrix',
    slug: 'search-a-2d-matrix',
    leetcodeNumber: 74,
    title: 'Search a 2D Matrix',
    category: 'matrix',
    difficulty: 'medium',
    engineType: 'search',
    tags: ['binary-search', 'matrix', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google'],
    descriptions: {
      explorer: 'Find a target number in a sorted grid where each row continues from the last — like one long sorted list wrapped into rows!',
      engineer: 'Treat the m×n matrix as a flat sorted array of length m*n. Binary search on index [0, m*n-1]. Convert mid to (row, col) using integer division and modulo.',
      interview: 'Binary search on the flattened view. mid index converts to row = mid // n and col = mid % n. O(log(m*n)) = O(log m + log n) time.',
    },
    puzzleConfig: {
      array: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60],
      target: 3,
      instruction: 'Matrix [[1,3,5,7],[10,11,16,20],[23,30,34,60]] flattened is a sorted array. Binary search for target=3.',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'The matrix has a special property: each row starts with a number greater than the last number of the previous row. This means if you "flatten" the matrix, it forms a single sorted array.', xpCost: 0 },
      { id: 2, text: 'Binary search on indices 0 to m*n-1. Convert the midpoint index to matrix coordinates: row = Math.floor(mid / n), col = mid % n.', xpCost: 0 },
      { id: 3, text: 'Standard binary search: if matrix[row][col] === target return true. If < target, left = mid+1. If > target, right = mid-1. O(log(mn)) time, O(1) space.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3. m=3, n=4. left=0, right=11.',
        state: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3, left: 0, right: 11 },
        highlight: [],
        annotation: 'Flat range [0..11], target=3',
      },
      {
        id: 2,
        description: 'mid=5. row=5//4=1, col=5%4=1. matrix[1][1]=11. 11 > 3 → right = mid-1 = 4.',
        state: { left: 0, right: 4, mid: 5, row: 1, col: 1, val: 11 },
        highlight: [],
        pointers: { left: 0, right: 4, mid: 5 },
        annotation: 'mid=5 → (1,1)=11 > 3 → right=4',
      },
      {
        id: 3,
        description: 'mid=2. row=2//4=0, col=2%4=2. matrix[0][2]=5. 5 > 3 → right = mid-1 = 1.',
        state: { left: 0, right: 1, mid: 2, row: 0, col: 2, val: 5 },
        highlight: [],
        pointers: { left: 0, right: 1, mid: 2 },
        annotation: 'mid=2 → (0,2)=5 > 3 → right=1',
      },
      {
        id: 4,
        description: 'mid=0. row=0, col=0. matrix[0][0]=1. 1 < 3 → left = mid+1 = 1.',
        state: { left: 1, right: 1, mid: 0, row: 0, col: 0, val: 1 },
        highlight: [],
        annotation: 'mid=0 → (0,0)=1 < 3 → left=1',
      },
      {
        id: 5,
        description: 'mid=1. row=0, col=1. matrix[0][1]=3. 3 === 3 → return true!',
        state: { left: 1, right: 1, mid: 1, row: 0, col: 1, val: 3, found: true },
        highlight: [],
        annotation: 'mid=1 → (0,1)=3 === target → return true ✓',
      },
    ],
    complexity: {
      time: 'O(log(m × n))',
      space: 'O(1)',
      timeExplanation: 'Binary search over m*n elements. log(m*n) = log(m) + log(n).',
      spaceExplanation: 'Only three pointer variables.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) return true;
    if (val < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}`,
        notes: 'The key insight: because the matrix is globally sorted (each row continues from the previous), it behaves as a flat sorted array.',
      },
      {
        language: 'python',
        code: `def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1

    while left <= right:
        mid = (left + right) // 2
        val = matrix[mid // n][mid % n]
        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan through every element.',
        complexity: { time: 'O(m × n)', space: 'O(1)', timeExplanation: 'Visit every cell', spaceExplanation: 'No extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Binary search on flattened index. O(log(mn)) time, O(1) space.',
        complexity: { time: 'O(log(m × n))', space: 'O(1)', timeExplanation: 'Binary search halves search space each iteration', spaceExplanation: 'Three pointers', visualization: 'logarithmic' },
      },
      followUps: [
        'Search a 2D Matrix II (LC 240) — rows and columns individually sorted but first element not > last of previous row. Use staircase search from top-right.',
        'What if the matrix is very large (too large for m*n integer)? (Use BigInt or long arithmetic)',
        'Find the k-th smallest element in a sorted matrix',
        'Count elements less than target in a sorted matrix',
      ],
      edgeCases: [
        'Target smaller than matrix[0][0] — return false',
        'Target larger than last element — return false',
        '1×1 matrix — direct comparison',
        'Target at the very last cell',
      ],
      commonMistakes: [
        'Confusing this problem with LC 240 — LC 74 has a globally sorted matrix, LC 240 does not',
        'Integer overflow when computing m*n for very large matrices (use BigInt if needed)',
        'Off-by-one: right = m*n - 1, not m*n',
      ],
      interviewerTips: [
        'Distinguish LC 74 (globally sorted — use binary search) from LC 240 (row/col sorted — use staircase search)',
        'The row/col conversion trick (mid//n, mid%n) is a useful idiom worth memorizing',
        'You could also binary search for the row first, then binary search within the row — same complexity but slightly more code',
      ],
    },
    codeChallenge: {
      functionName: 'searchMatrix',
      starterCode: {
        javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], expected: true, description: 'Target in first row' },
        { input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], expected: false, description: 'Target not in matrix' },
        { input: [[[1]], 1], expected: true, description: '1×1 matrix found' },
        { input: [[[1]], 2], expected: false, description: '1×1 matrix not found' },
        { input: [[[1, 1]], 0], expected: false, description: 'Target smaller than all elements' },
        { input: [[[1, 3, 5], [7, 9, 11]], 9], expected: true, description: 'Target in second row' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['binary-search'],
    relatedPatterns: ['Binary Search Flattened', 'Index Conversion', 'Binary Search Variants'],
    intuitionSummary: 'Treat the matrix as a flattened sorted array. Convert mid index to row/col using division and modulo.',
    patternName: 'Binary Search Flattened',
  },

  // ─── 15. Merge Sorted Array (88) ─────────────────────────────────────────
  {
    id: 'merge-sorted-array',
    slug: 'merge-sorted-array',
    leetcodeNumber: 88,
    title: 'Merge Sorted Array',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['array', 'two-pointer', 'sorting', 'in-place'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Facebook'],
    descriptions: {
      explorer: 'Merge two sorted arrays into one sorted array. The trick: work backwards from the end so you never overwrite data you still need!',
      engineer: 'Three pointers: p1 starts at m-1 (end of nums1 data), p2 at n-1 (end of nums2), p3 at m+n-1 (end of nums1 total). Compare from the back and place the larger element at p3.',
      interview: 'Merge from the back to avoid overwriting unread elements. p1=m-1, p2=n-1, p3=m+n-1. While p2 >= 0: if p1 >= 0 and nums1[p1] > nums2[p2], place nums1[p1] at p3; else place nums2[p2]. The remaining nums2 elements copy directly if p1 exhausted first.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'nums1 pointer' },
        { id: 'b', value: 2, label: 'nums2 pointer' },
        { id: 'c', value: 5, label: '5' },
        { id: 'd', value: 1, label: '1' },
      ],
      target: 4,
      instruction: 'Merge [1,2,3] into [1,2,3,0,0,0] with [2,5,6]. To merge in-place without overwriting unread data, where should each pointer start?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'If you merge from the front, you overwrite nums1 elements before reading them. What if you merge from the back instead?', xpCost: 0 },
      { id: 2, text: 'Place the largest element at position m+n-1. Compare the last real element of nums1 (at index m-1) with the last element of nums2 (at index n-1). Place whichever is larger.', xpCost: 0 },
      { id: 3, text: 'Three pointers: p1=m-1, p2=n-1, p3=m+n-1. Loop while p2>=0. If p1>=0 and nums1[p1]>nums2[p2], copy nums1[p1--] to nums1[p3--]; else copy nums2[p2--] to nums1[p3--]. Any remaining nums2 elements copy directly.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums1=[1,2,3,0,0,0] (m=3), nums2=[2,5,6] (n=3). p1=2, p2=2, p3=5.',
        state: { nums1: [1, 2, 3, 0, 0, 0], nums2: [2, 5, 6], p1: 2, p2: 2, p3: 5 },
        highlight: [],
        pointers: { p1: 2, p2: 2, p3: 5 },
        annotation: 'p1=2, p2=2, p3=5',
      },
      {
        id: 2,
        description: 'nums1[2]=3 vs nums2[2]=6. 6>3 → nums1[5]=6. p2=1, p3=4.',
        state: { nums1: [1, 2, 3, 0, 0, 6], nums2: [2, 5, 6], p1: 2, p2: 1, p3: 4 },
        highlight: [5],
        pointers: { p1: 2, p2: 1, p3: 4 },
        annotation: 'Place 6, p2=1,p3=4',
      },
      {
        id: 3,
        description: 'nums1[2]=3 vs nums2[1]=5. 5>3 → nums1[4]=5. p2=0, p3=3.',
        state: { nums1: [1, 2, 3, 0, 5, 6], nums2: [2, 5, 6], p1: 2, p2: 0, p3: 3 },
        highlight: [4],
        pointers: { p1: 2, p2: 0, p3: 3 },
        annotation: 'Place 5, p2=0,p3=3',
      },
      {
        id: 4,
        description: 'nums1[2]=3 vs nums2[0]=2. 3>2 → nums1[3]=3. p1=1, p3=2.',
        state: { nums1: [1, 2, 3, 3, 5, 6], nums2: [2, 5, 6], p1: 1, p2: 0, p3: 2 },
        highlight: [3],
        pointers: { p1: 1, p2: 0, p3: 2 },
        annotation: 'Place 3, p1=1,p3=2',
      },
      {
        id: 5,
        description: 'nums1[1]=2 vs nums2[0]=2. Equal → place nums2[0]=2. p2=-1 → loop ends. nums1=[1,2,2,3,5,6].',
        state: { nums1: [1, 2, 2, 3, 5, 6], done: true },
        highlight: [0, 1, 2, 3, 4, 5],
        annotation: 'Return [1,2,2,3,5,6] ✓',
      },
    ],
    complexity: {
      time: 'O(m + n)',
      space: 'O(1)',
      timeExplanation: 'Each element is placed exactly once.',
      spaceExplanation: 'In-place; three pointer variables only.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
function merge(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p3 = m + n - 1;

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p3--] = nums1[p1--];
    } else {
      nums1[p3--] = nums2[p2--];
    }
  }
  // If p1 >= 0, those elements are already in place
}`,
        notes: "When p2 is exhausted first, any remaining nums1 elements are already in their correct positions. No extra copy needed.",
      },
      {
        language: 'python',
        code: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    p1, p2, p3 = m - 1, n - 1, m + n - 1
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p3] = nums1[p1]
            p1 -= 1
        else:
            nums1[p3] = nums2[p2]
            p2 -= 1
        p3 -= 1`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Copy nums2 into the end of nums1, then sort nums1.',
        complexity: { time: 'O((m+n) log(m+n))', space: 'O(1)', timeExplanation: 'Sorting dominates', spaceExplanation: 'In-place sort', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Three-pointer merge from the back. O(m+n) time, O(1) space.',
        complexity: { time: 'O(m + n)', space: 'O(1)', timeExplanation: 'Each element placed once', spaceExplanation: 'Three pointer variables', visualization: 'linear' },
      },
      followUps: [
        'Merge K Sorted Lists (LC 23) — generalize to k arrays using a heap',
        'What if nums1 did not have extra space? (Would need O(m+n) space)',
        'Sort Colors (LC 75) — Dutch National Flag, similar in-place partitioning',
        'Merge Sorted Array with duplicates — same algorithm handles naturally',
      ],
      edgeCases: [
        'm=0 — nums1 is all zeros, just copy nums2',
        'n=0 — nums1 is already sorted, return as-is',
        'All nums2 elements smaller than all nums1 elements — p1 always wins first',
        'Identical elements across both arrays',
      ],
      commonMistakes: [
        'Merging from the front and overwriting unread nums1 elements',
        'Forgetting to copy remaining nums2 elements (not an issue with the back-fill approach, but is if you loop while p1>=0 instead of p2>=0)',
        'Off-by-one: p1 starts at m-1 (last valid element), not m',
      ],
      interviewerTips: [
        'Ask: are duplicates allowed? Does not change the algorithm but shows attention to detail',
        'Explain WHY merging from the back avoids overwriting: the empty slots at the end of nums1 will always be available for placement',
        'This is one of the cleanest two-pointer patterns — code it without bugs under pressure',
      ],
    },
    codeChallenge: {
      functionName: 'merge',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
function merge(nums1, m, nums2, n) {
  // Your solution here (modify nums1 in-place)
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expected: [1, 2, 2, 3, 5, 6], description: 'Classic merge' },
        { input: [[1], 1, [], 0], expected: [1], description: 'Empty nums2' },
        { input: [[0], 0, [1], 1], expected: [1], description: 'Empty nums1 data' },
        { input: [[2, 0], 1, [1], 1], expected: [1, 2], description: 'nums2 element smaller' },
        { input: [[1, 2, 0, 0], 2, [3, 4], 2], expected: [1, 2, 3, 4], description: 'nums2 all larger' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Three-Pointer Merge from End', 'In-Place Two Pointer', 'Merge Pattern'],
    intuitionSummary: 'Start from the end of both arrays. Compare from the back and place the larger element at the last position of nums1.',
    patternName: 'Three-Pointer Merge from End',
  },

  // ─── 16. Remove Element (27) ─────────────────────────────────────────────
  {
    id: 'remove-element',
    slug: 'remove-element',
    leetcodeNumber: 27,
    title: 'Remove Element',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['array', 'two-pointer', 'in-place'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google'],
    descriptions: {
      explorer: 'Remove all instances of a value from an array in-place. Return how many non-matching elements remain.',
      engineer: 'Write pointer k tracks the next position for a valid element. For each element, if it is not the target value, write it to nums[k] and increment k. Return k.',
      interview: 'Single-pass slow-fast pointer. k (write) starts at 0. For each i (read), if nums[i] != val, copy nums[i] to nums[k], k++. Return k. O(n) time, O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'index 0' },
        { id: 'b', value: 1, label: 'index 1' },
        { id: 'c', value: 2, label: 'index 2' },
        { id: 'd', value: 3, label: 'index 3' },
      ],
      target: 1,
      instruction: 'Remove all 3s from [3,2,2,3] in-place. Which indices hold the valid elements that remain after removal?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'You do not need to physically remove elements. Just overwrite target values with non-target values and return the count of non-target elements.', xpCost: 0 },
      { id: 2, text: 'Use a write pointer k starting at 0. Scan with read pointer i. When nums[i] != val, copy it to nums[k] and increment k.', xpCost: 0 },
      { id: 3, text: 'If the target value is rare, consider swapping the current element with the last unprocessed element (shrink from the right) to minimize writes.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[3,2,2,3], val=3. k=0 (write pointer).',
        state: { nums: [3, 2, 2, 3], val: 3, k: 0, i: -1 },
        highlight: [],
        pointers: { k: 0 },
        annotation: 'k=0, val=3',
      },
      {
        id: 2,
        description: 'i=0: nums[0]=3==val → skip. k stays 0.',
        state: { nums: [3, 2, 2, 3], k: 0, i: 0 },
        highlight: [0],
        pointers: { k: 0, i: 0 },
        annotation: 'Skip 3',
      },
      {
        id: 3,
        description: 'i=1: nums[1]=2≠val → nums[0]=2, k=1.',
        state: { nums: [2, 2, 2, 3], k: 1, i: 1 },
        highlight: [0, 1],
        pointers: { k: 1, i: 1 },
        annotation: 'Write 2 at k=0',
      },
      {
        id: 4,
        description: 'i=2: nums[2]=2≠val → nums[1]=2, k=2.',
        state: { nums: [2, 2, 2, 3], k: 2, i: 2 },
        highlight: [1, 2],
        pointers: { k: 2, i: 2 },
        annotation: 'Write 2 at k=1',
      },
      {
        id: 5,
        description: 'i=3: nums[3]=3==val → skip. Return k=2. First 2 elements are [2,2].',
        state: { nums: [2, 2, 2, 3], k: 2, done: true },
        highlight: [0, 1],
        annotation: 'Return 2 ✓ (nums[0..1]=[2,2])',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only the write pointer k.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  let k = 0; // write pointer

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k++] = nums[i];
    }
  }

  return k;
}`,
        notes: 'The order of elements not equal to val is preserved. If order does not matter and val is rare, swapping with the last element and shrinking right pointer minimizes writes.',
      },
      {
        language: 'python',
        code: `def removeElement(nums: list[int], val: int) -> int:
    k = 0
    for num in nums:
        if num != val:
            nums[k] = num
            k += 1
    return k`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Copy all non-val elements to a new array and return its length.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single scan', spaceExplanation: 'New array', visualization: 'linear' },
      },
      optimized: {
        description: 'In-place write pointer. Overwrite target values with non-target values.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'One extra variable', visualization: 'linear' },
      },
      followUps: [
        'Remove Duplicates from Sorted Array (LC 26) — similar write pointer, different condition',
        'Move Zeroes (LC 283) — same pattern but must preserve zeros at the end',
        'What if you want to minimize the number of element assignments? (Swap-from-right approach)',
        'Remove Nth Node from End of List — linked list analogue',
      ],
      edgeCases: [
        'All elements equal val — return 0',
        'No elements equal val — return n (no writes)',
        'val not in nums — same as above',
        'Single element array',
      ],
      commonMistakes: [
        'Using splice() in a loop — O(n²) due to shifting',
        'Forgetting that the problem wants in-place modification and a count, not a new array',
        'Using the wrong condition: nums[i] !== val (keep) not nums[i] === val (skip)',
      ],
      interviewerTips: [
        'Point out the two approaches: write-forward (preserves order) and swap-with-end (minimizes writes)',
        'The write pointer pattern is the foundation for Remove Duplicates and Move Zeroes — frame it as a general technique',
        'Clarify: does element order matter beyond the first k elements? (Problem says no)',
      ],
    },
    codeChallenge: {
      functionName: 'removeElement',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  // Your solution here (modify in-place, return count)
}`,
      },
      testCases: [
        { input: [[3, 2, 2, 3], 3], expected: 2, description: 'Remove 3s, 2 elements remain' },
        { input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5, description: 'Remove 2s, 5 elements remain' },
        { input: [[1], 1], expected: 0, description: 'Single element removed' },
        { input: [[1], 2], expected: 1, description: 'Val not present' },
        { input: [[2, 2, 2], 2], expected: 0, description: 'All elements removed' },
        { input: [[1, 2, 3, 4], 5], expected: 4, description: 'No matching elements' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Slow-Fast Pointer Overwrite', 'Write Pointer', 'In-Place Filter'],
    intuitionSummary: 'Use a slow pointer to track the position for the next valid element. Fast pointer scans ahead and copies non-target values.',
    patternName: 'Slow-Fast Pointer Overwrite',
  },

  // ─── 17. Remove Duplicates from Sorted Array (26) ─────────────────────────
  {
    id: 'remove-duplicates-sorted-array',
    slug: 'remove-duplicates-from-sorted-array',
    leetcodeNumber: 26,
    title: 'Remove Duplicates from Sorted Array',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['array', 'two-pointer', 'in-place'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Remove duplicate numbers from a sorted array in-place. Each number should appear only once!',
      engineer: 'Write pointer k starts at 1 (first element is always unique). Advance k only when you see a new value different from the previous unique element.',
      interview: 'Single-pass write pointer. k=1. For i from 1 to n-1: if nums[i] != nums[i-1], copy nums[i] to nums[k] and k++. Return k. The sorted property guarantees duplicates are adjacent.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1' },
        { id: 'b', value: 2, label: '2' },
        { id: 'c', value: 2, label: '2' },
        { id: 'd', value: 1, label: '1' },
      ],
      target: 3,
      instruction: 'Array [1,1,2]: after removing duplicates in-place, what are the unique values remaining in the array?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Because the array is sorted, all duplicates of a value are adjacent. You only need to compare each element to its immediate predecessor.', xpCost: 0 },
      { id: 2, text: 'Keep a write pointer k starting at 1. Scan from index 1. Whenever nums[i] != nums[i-1] (a new unique value), write it to nums[k] and advance k.', xpCost: 0 },
      { id: 3, text: 'Equivalently: k starts at 1. For i=1..n-1: if nums[i] != nums[k-1], set nums[k]=nums[i], k++. This compares against the last written unique value rather than the previous input value.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,1,2]. k=1 (first element always kept).',
        state: { nums: [1, 1, 2], k: 1, i: 1 },
        highlight: [0],
        pointers: { k: 1, i: 1 },
        annotation: 'k=1 (nums[0]=1 kept)',
      },
      {
        id: 2,
        description: 'i=1: nums[1]=1 == nums[0]=1 → duplicate, skip.',
        state: { nums: [1, 1, 2], k: 1, i: 1 },
        highlight: [1],
        pointers: { k: 1, i: 1 },
        annotation: 'Skip duplicate 1',
      },
      {
        id: 3,
        description: 'i=2: nums[2]=2 != nums[1]=1 → new value. Write nums[1]=2, k=2.',
        state: { nums: [1, 2, 2], k: 2, i: 2 },
        highlight: [1, 2],
        pointers: { k: 2, i: 2 },
        annotation: 'Write 2 at k=1',
      },
      {
        id: 4,
        description: 'Loop ends. Return k=2. nums[0..1]=[1,2] are the unique elements.',
        state: { nums: [1, 2, 2], k: 2, done: true },
        highlight: [0, 1],
        annotation: 'Return 2 ✓ (nums[0..1]=[1,2])',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only the write pointer k.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let k = 1; // write pointer (first element always kept)

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k++] = nums[i];
    }
  }

  return k;
}`,
        notes: 'Compare against nums[i-1] (previous input element) since the array is sorted and duplicates are adjacent.',
      },
      {
        language: 'python',
        code: `def removeDuplicates(nums: list[int]) -> int:
    if not nums:
        return 0
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[k] = nums[i]
            k += 1
    return k`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Use a Set to track seen values, collect unique elements into a new array.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'One pass', spaceExplanation: 'Set + result array', visualization: 'linear' },
      },
      optimized: {
        description: 'Write pointer leveraging sorted property. No extra space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'One pointer variable', visualization: 'linear' },
      },
      followUps: [
        'Remove Duplicates from Sorted Array II (LC 80) — allow at most 2 duplicates',
        'Remove Element (LC 27) — remove a specific value instead of duplicates',
        'Remove Duplicates from Sorted List (LC 83) — same idea on linked list',
        'What if the array is unsorted? (Sort first O(n log n), or use a Set O(n) space)',
      ],
      edgeCases: [
        'Empty array — return 0',
        'Single element — return 1',
        'All same elements [1,1,1] — return 1',
        'Already all unique [1,2,3] — return n',
      ],
      commonMistakes: [
        'Using a Set for a sorted array — correct but wastes the sorted property',
        'Comparing nums[i] to nums[k-1] (last written) vs nums[i-1] (previous input) — both work when sorted, but the k-1 form generalizes better to LC 80',
        'Starting k at 0 instead of 1 — causes index out of bounds or incorrect result',
      ],
      interviewerTips: [
        'The comparison nums[i] != nums[k-1] (last written unique) is the form to use — it directly extends to the "allow at most 2" follow-up by changing to nums[k-2]',
        'Confirm the sorted assumption aloud — this is what makes adjacent comparison correct',
        'For unsorted input, mention sorting first (O(n log n)) or using a Set (O(n) space)',
      ],
    },
    codeChallenge: {
      functionName: 'removeDuplicates',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  // Your solution here (modify in-place, return count of unique elements)
}`,
      },
      testCases: [
        { input: [[1, 1, 2]], expected: 2, description: 'One duplicate: return 2' },
        { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5, description: 'Multiple duplicates: return 5' },
        { input: [[1]], expected: 1, description: 'Single element' },
        { input: [[1, 2, 3]], expected: 3, description: 'No duplicates' },
        { input: [[1, 1, 1]], expected: 1, description: 'All same' },
        { input: [[-3, -1, -1, 0, 2, 2]], expected: 4, description: 'Negative numbers with duplicates' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['remove-element'],
    relatedPatterns: ['Write Pointer for Unique Values', 'Slow-Fast Pointer Overwrite', 'Sorted Array Property'],
    intuitionSummary: 'Use a write pointer. Advance it only when you encounter a value different from the previous unique element.',
    patternName: 'Write Pointer for Unique Values',
  },

  // ─── 18. Remove Duplicates from Sorted Array II (80) ──────────────────────
  {
    id: 'remove-duplicates-sorted-array-ii',
    slug: 'remove-duplicates-from-sorted-array-ii',
    leetcodeNumber: 80,
    title: 'Remove Duplicates from Sorted Array II',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'two-pointer', 'in-place'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptions: {
      explorer: 'Like the previous problem, but now each number can appear at most twice. Remove any extras in-place!',
      engineer: 'Write pointer k starts at 2. For each element at index i, copy it to nums[k] only if nums[i] != nums[k-2] (the element written two positions ago). This allows at most two copies.',
      interview: 'Generalized write pointer. k=2. For i >= 2: if nums[i] != nums[k-2], write nums[i] to nums[k++]. The nums[k-2] comparison ensures at most 2 occurrences in the output. Works because array is sorted.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'count of 1s' },
        { id: 'b', value: 2, label: 'count of 2s' },
        { id: 'c', value: 1, label: 'count of 3s' },
        { id: 'd', value: 5, label: 'result length' },
      ],
      target: 4,
      instruction: '[1,1,1,2,2,3]: each element may appear at most twice. Which two element counts in the result have reached the maximum allowed?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'In LC 26 (allow 1), you checked nums[i] != nums[k-1]. For allow-2, what index do you compare against?', xpCost: 0 },
      { id: 2, text: 'Compare nums[i] against nums[k-2]. If they differ, the current element is safe to include (at most 2 identical elements can appear before k-2 in the output).', xpCost: 0 },
      { id: 3, text: 'Start k=2 and i=2 (first 2 elements always kept). For i in [2..n-1]: if nums[i] != nums[k-2], nums[k++]=nums[i]. Generalizes to "allow at most j" by comparing nums[k-j].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,1,1,2,2,3]. k=2. First two elements always kept.',
        state: { nums: [1, 1, 1, 2, 2, 3], k: 2, i: 2 },
        highlight: [0, 1],
        pointers: { k: 2, i: 2 },
        annotation: 'k=2, keep first 2',
      },
      {
        id: 2,
        description: 'i=2: nums[2]=1. nums[k-2]=nums[0]=1. 1==1 → skip (would be 3rd copy).',
        state: { nums: [1, 1, 1, 2, 2, 3], k: 2, i: 2 },
        highlight: [2],
        pointers: { k: 2, i: 2 },
        annotation: 'Skip 3rd "1"',
      },
      {
        id: 3,
        description: 'i=3: nums[3]=2. nums[k-2]=nums[0]=1. 2≠1 → write nums[2]=2, k=3.',
        state: { nums: [1, 1, 2, 2, 2, 3], k: 3, i: 3 },
        highlight: [2, 3],
        pointers: { k: 3, i: 3 },
        annotation: 'Write 2 at k=2',
      },
      {
        id: 4,
        description: 'i=4: nums[4]=2. nums[k-2]=nums[1]=1. 2≠1 → write nums[3]=2, k=4.',
        state: { nums: [1, 1, 2, 2, 2, 3], k: 4, i: 4 },
        highlight: [3, 4],
        pointers: { k: 4, i: 4 },
        annotation: 'Write 2nd "2" at k=3',
      },
      {
        id: 5,
        description: 'i=5: nums[5]=3. nums[k-2]=nums[2]=2. 3≠2 → write nums[4]=3, k=5. Return k=5. nums[0..4]=[1,1,2,2,3].',
        state: { nums: [1, 1, 2, 2, 3, 3], k: 5, done: true },
        highlight: [0, 1, 2, 3, 4],
        annotation: 'Return 5 ✓ (nums[0..4]=[1,1,2,2,3])',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only the write pointer k.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  let k = 2; // First 2 elements always kept

  for (let i = 2; i < nums.length; i++) {
    // Allow if current value differs from what was written 2 positions ago
    if (nums[i] !== nums[k - 2]) {
      nums[k++] = nums[i];
    }
  }

  return Math.min(k, nums.length);
}`,
        notes: 'To generalize to "at most j copies": start k=j and i=j, compare nums[i] != nums[k-j].',
      },
      {
        language: 'python',
        code: `def removeDuplicates(nums: list[int]) -> int:
    k = 2
    for i in range(2, len(nums)):
        if nums[i] != nums[k - 2]:
            nums[k] = nums[i]
            k += 1
    return min(k, len(nums))`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Count occurrences of each value with a hashmap, then rebuild the first k slots.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Two passes', spaceExplanation: 'HashMap + count storage', visualization: 'linear' },
      },
      optimized: {
        description: 'Write pointer comparing k-2. Pure O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'One pointer variable', visualization: 'linear' },
      },
      followUps: [
        'Generalize to "at most k copies" — change starting index and comparison offset to k',
        'Remove Duplicates from Sorted Array (LC 26) — allow-1 version',
        'Remove Duplicates from Sorted List II (LC 82) — linked list with full removal of duplicates',
        'What is the in-place solution for unsorted array with allow-at-most-k constraint?',
      ],
      edgeCases: [
        'Array shorter than 2 elements — return nums.length as-is',
        'All same elements [1,1,1,1] — return 2',
        'No element appears more than twice — return n',
        'Two elements, both same [5,5] — return 2',
      ],
      commonMistakes: [
        'Starting k and i at 1 instead of 2 — incorrect boundary, misses the first pair',
        'Forgetting that the comparison is against the output array (nums[k-2]), not the input (nums[i-2])',
        "Not handling arrays shorter than 2 — k=2 would return 2 for a 1-element array if you don't guard",
      ],
      interviewerTips: [
        'Connect explicitly to LC 26: "The only change is nums[k-1] → nums[k-2] and starting indices 2 instead of 1"',
        'The generalization pattern (compare against nums[k-j] for allow-at-most-j) is a powerful insight to share',
        'This is a rare problem where the key insight is just one index offset — highlight that elegance',
      ],
    },
    codeChallenge: {
      functionName: 'removeDuplicates',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  // Your solution here — allow at most 2 of each element
}`,
      },
      testCases: [
        { input: [[1, 1, 1, 2, 2, 3]], expected: 5, description: 'Classic: return 5' },
        { input: [[0, 0, 1, 1, 1, 1, 2, 3, 3]], expected: 7, description: 'Multiple over-duplicated values' },
        { input: [[1, 1]], expected: 2, description: 'Exactly two of same value' },
        { input: [[1, 1, 1]], expected: 2, description: 'Three of same value — keep 2' },
        { input: [[1, 2, 3]], expected: 3, description: 'No duplicates' },
        { input: [[1]], expected: 1, description: 'Single element' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['remove-duplicates-sorted-array'],
    relatedPatterns: ['Allow At Most Two', 'Write Pointer Generalization', 'Sorted Array Property'],
    intuitionSummary: 'Allow each element at most twice. Compare the current element with the element two positions behind the write pointer.',
    patternName: 'Allow At Most Two',
  },

  // ─── 19. Majority Element (169) ──────────────────────────────────────────
  {
    id: 'majority-element',
    slug: 'majority-element',
    leetcodeNumber: 169,
    title: 'Majority Element',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['array', 'hashmap', 'voting', 'divide-conquer'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Find the number that appears more than half the time in the array. Can you find it without counting everything?',
      engineer: 'Boyer-Moore Voting Algorithm: maintain a candidate and a count. Increment for the candidate, decrement for all others. The surviving candidate is the majority element.',
      interview: 'Boyer-Moore: candidate=nums[0], count=1. For each subsequent element: if count==0, reset candidate. If element==candidate, count++; else count--. Guaranteed correct because majority element appears > n/2 times.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 2, label: '2' },
        { id: 'c', value: 1, label: '1' },
        { id: 'd', value: 1, label: '1' },
      ],
      target: 4,
      instruction: '[2,2,1,1,2]: which element appears more than n/2 times? Select any two occurrences of it.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The majority element appears more than n/2 times. Even if every other element "voted against" it, the majority element would still win.', xpCost: 0 },
      { id: 2, text: 'Boyer-Moore Voting: keep a candidate. When you see the candidate, increment a counter. When you see anything else, decrement. When counter hits 0, pick a new candidate.', xpCost: 0 },
      { id: 3, text: 'The intuition: each "cancellation" (count--) removes one majority element and one non-majority element. Since majority > n/2, after all cancellations, the majority element survives as the candidate.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[2,2,1,1,1,2,2]. candidate=2, count=1.',
        state: { nums: [2, 2, 1, 1, 1, 2, 2], candidate: 2, count: 1, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'candidate=2, count=1',
      },
      {
        id: 2,
        description: 'i=1: nums[1]=2==candidate → count=2.',
        state: { candidate: 2, count: 2, i: 1 },
        highlight: [1],
        annotation: 'count=2',
      },
      {
        id: 3,
        description: 'i=2: nums[2]=1≠candidate → count=1. i=3: 1≠2 → count=0.',
        state: { candidate: 2, count: 0, i: 3 },
        highlight: [2, 3],
        annotation: 'count=0 (two cancellations)',
      },
      {
        id: 4,
        description: 'i=4: count==0 → new candidate=1, count=1.',
        state: { candidate: 1, count: 1, i: 4 },
        highlight: [4],
        annotation: 'New candidate=1, count=1',
      },
      {
        id: 5,
        description: 'i=5: 2≠1 → count=0. i=6: count==0 → candidate=2, count=1. Return 2.',
        state: { candidate: 2, count: 1, i: 6, done: true },
        highlight: [5, 6],
        annotation: 'Candidate=2. Return 2 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only candidate and count variables.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }

  return candidate;
}`,
        notes: 'The problem guarantees a majority element exists. If it did not, we would need a second pass to verify the candidate.',
      },
      {
        language: 'python',
        code: `def majorityElement(nums: list[int]) -> int:
    candidate, count = nums[0], 1
    for num in nums[1:]:
        if count == 0:
            candidate, count = num, 1
        elif num == candidate:
            count += 1
        else:
            count -= 1
    return candidate`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Sort the array — the middle element is always the majority element.',
        complexity: { time: 'O(n log n)', space: 'O(1)', timeExplanation: 'Sort dominates', spaceExplanation: 'In-place sort', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Boyer-Moore Voting. Single pass, O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One pass', spaceExplanation: 'Two scalar variables', visualization: 'linear' },
      },
      followUps: [
        'Majority Element II (LC 229) — elements appearing more than n/3 times (use 2 candidates)',
        'What if the majority element is not guaranteed? (Add a second verification pass)',
        'Find element appearing most frequently (different problem — use hashmap)',
        'Prove Boyer-Moore correctness: the majority element can be "cancelled" at most (n-count(majority)) times, which leaves at least 1 surviving',
      ],
      edgeCases: [
        'Single element — return it',
        'All same elements — return that element',
        'Majority element at the very end',
        'What if no majority element exists (undefined behavior per problem — but add a verification pass in practice)',
      ],
      commonMistakes: [
        'Forgetting to reset count to 1 when a new candidate is picked (count=1, not count=0)',
        'Using hashmap when Boyer-Moore is expected — shows lack of O(1) space awareness',
        'Not understanding why the algorithm is correct — practice the cancellation intuition',
      ],
      interviewerTips: [
        'Know three solutions: hashmap O(n)/O(n), sort O(n log n)/O(1), Boyer-Moore O(n)/O(1)',
        'Boyer-Moore is the intended solution — interviewers will probe whether you know it',
        'The mathematical proof (cancellation argument) is worth reciting briefly to show depth',
      ],
    },
    codeChallenge: {
      functionName: 'majorityElement',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3, 2, 3]], expected: 3, description: '3 appears twice in array of 3' },
        { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2, description: '2 appears 4 times in array of 7' },
        { input: [[1]], expected: 1, description: 'Single element' },
        { input: [[1, 1, 1, 1, 2]], expected: 1, description: 'Majority element is dominant' },
        { input: [[6, 5, 5]], expected: 5, description: 'Majority not first element' },
        { input: [[1, 2, 1]], expected: 1, description: '1 appears twice' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Boyer-Moore Voting', 'Cancellation Argument', 'Frequency Tracking'],
    intuitionSummary: 'Maintain a candidate and a count. Increment count for the candidate, decrement for others. The candidate at the end is the majority element.',
    patternName: 'Boyer-Moore Voting',
  },

  // ─── 20. Rotate Array (189) ───────────────────────────────────────────────
  {
    id: 'rotate-array',
    slug: 'rotate-array',
    leetcodeNumber: 189,
    title: 'Rotate Array',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'in-place', 'math', 'two-pointer'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Rotate an array to the right by k steps. The last k elements wrap around to the front!',
      engineer: 'Three-reversal trick: reverse the whole array, then reverse the first k elements, then reverse the rest. k %= n first to handle k >= n.',
      interview: 'Reverse entire array: [1,2,3,4,5,6,7] → [7,6,5,4,3,2,1]. Reverse first k: [5,6,7,4,3,2,1]. Reverse remaining: [5,6,7,1,2,3,4]. O(n) time, O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 4, label: 'index 4' },
        { id: 'b', value: 3, label: 'index 3' },
        { id: 'c', value: 3, label: 'k = 3' },
        { id: 'd', value: 7, label: 'n = 7' },
      ],
      target: 7,
      instruction: 'Rotate [1,2,3,4,5,6,7] right by k=3. After rotation, what were the original indices of the new first and last elements?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'After rotating right by k, the last k elements become the first k. Can you achieve this with reversals?', xpCost: 0 },
      { id: 2, text: 'Reverse the entire array. Now the last k elements (which should go to the front) are at the front but in reverse order. Reverse the first k to fix their order. Reverse the rest to fix the remaining order.', xpCost: 0 },
      { id: 3, text: 'Step 1: k %= n (handles k >= n). Step 2: reverse(0, n-1). Step 3: reverse(0, k-1). Step 4: reverse(k, n-1). Three passes, O(n) total, O(1) space.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,2,3,4,5,6,7], k=3. k%=7 → k=3. Reverse entire array.',
        state: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3, step: 'before' },
        highlight: [],
        annotation: 'k=3, reverse all',
      },
      {
        id: 2,
        description: 'After reverse all: [7,6,5,4,3,2,1].',
        state: { nums: [7, 6, 5, 4, 3, 2, 1], step: 'reversed-all' },
        highlight: [0, 1, 2, 3, 4, 5, 6],
        annotation: '[7,6,5,4,3,2,1]',
      },
      {
        id: 3,
        description: 'Reverse first k=3 elements: [7,6,5] → [5,6,7]. Array: [5,6,7,4,3,2,1].',
        state: { nums: [5, 6, 7, 4, 3, 2, 1], step: 'reversed-first-k' },
        highlight: [0, 1, 2],
        annotation: 'Reverse [0..2]: [5,6,7,4,3,2,1]',
      },
      {
        id: 4,
        description: 'Reverse remaining elements [k..n-1]: [4,3,2,1] → [1,2,3,4]. Array: [5,6,7,1,2,3,4].',
        state: { nums: [5, 6, 7, 1, 2, 3, 4], step: 'reversed-rest', done: true },
        highlight: [3, 4, 5, 6],
        annotation: 'Reverse [3..6]: [5,6,7,1,2,3,4] ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Three reversal passes, each O(n). Total is O(n).',
      spaceExplanation: 'Reversals are in-place; no extra array.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
function rotate(nums, k) {
  const n = nums.length;
  k %= n; // Handle k >= n

  function reverse(l, r) {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }

  reverse(0, n - 1);  // Reverse entire array
  reverse(0, k - 1);  // Reverse first k elements
  reverse(k, n - 1);  // Reverse remaining elements
}`,
        notes: 'k %= n is critical — without it, k=7 on a 7-element array would reverse incorrectly. Three reversals is an O(1) space classic.',
      },
      {
        language: 'python',
        code: `def rotate(nums: list[int], k: int) -> None:
    n = len(nums)
    k %= n

    def reverse(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            r -= 1

    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Rotate one step at a time, k times. Store the last element and shift everything right.',
        complexity: { time: 'O(n × k)', space: 'O(1)', timeExplanation: 'k rotations of O(n) each', spaceExplanation: 'One temp variable', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Three-reversal trick. O(n) time, O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Three passes, each O(n)', spaceExplanation: 'In-place reversals', visualization: 'linear' },
      },
      followUps: [
        'Rotate string — same concept, return new string (LeetCode 796)',
        'Left rotation by k: reverse first k, reverse rest k..n-1, reverse all',
        'Rotate a 2D matrix (LC 48) — different rotation problem',
        'Find minimum in rotated sorted array (LC 153) — inverse: undo a rotation to locate pivot',
      ],
      edgeCases: [
        'k=0 — no rotation',
        'k==n — full rotation, same as original',
        'k > n — k %= n before reversals',
        'Single element array — no change',
        'k=1 — last element moves to front',
      ],
      commonMistakes: [
        'Forgetting k %= n — causes index out of bounds or wrong result for k >= n',
        'Wrong order: must reverse all first, then first k, then remaining — not the other way',
        'Off-by-one: reverse(0, k-1) uses k-1 (not k) as the right boundary',
      ],
      interviewerTips: [
        'The O(n) extra space solution (copy last k elements, shift, copy back) is simpler — mention it as a stepping stone',
        'The three-reversal proof is elegant: explain why reversing all then reversing two halves achieves the rotation',
        'Ask: left rotation or right rotation? This problem is right; left rotation would swap steps 2 and 3',
      ],
    },
    codeChallenge: {
      functionName: 'rotate',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
function rotate(nums, k) {
  // Your solution here (modify in-place)
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], description: 'Classic: rotate right by 3' },
        { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], description: 'Negative numbers, k=2' },
        { input: [[1, 2], 3], expected: [2, 1], description: 'k > n: k%2=1 rotation' },
        { input: [[1], 0], expected: [1], description: 'k=0, no rotation' },
        { input: [[1, 2, 3], 3], expected: [1, 2, 3], description: 'Full rotation k=n' },
        { input: [[1, 2, 3, 4], 1], expected: [4, 1, 2, 3], description: 'Rotate by 1' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['remove-element'],
    relatedPatterns: ['Reverse Three Times', 'In-Place Array Manipulation', 'Math Rotation'],
    intuitionSummary: 'Reverse the whole array, then reverse the first k elements, then reverse the rest. Three reversals achieve the rotation.',
    patternName: 'Reverse Three Times',
  },
];

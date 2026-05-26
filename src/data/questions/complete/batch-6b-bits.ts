import type { QuestionConfig } from '@/types/question';

export const BITS_COMPLETE: QuestionConfig[] = [
  // ─── 1. Sum of Two Integers ───────────────────────────────────────────────────
  {
    id: 'sum-two-integers',
    slug: 'sum-of-two-integers',
    leetcodeNumber: 371,
    title: 'Sum of Two Integers',
    category: 'bit-manipulation',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['bit-manipulation', 'math'],
    questionSets: ['blind75'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Add two integers without using the + or - operators. Use bitwise tricks to simulate binary addition.',
      engineer: 'XOR gives sum without carry; AND shifted left gives the carry. Repeat until carry is zero — that is the result.',
      interview: 'Loop: sum = a ^ b (XOR, no carry), carry = (a & b) << 1. Set a = sum, b = carry. Repeat while b != 0. O(1) time since integers are 32-bit.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'a=1 (01)' },
        { id: 'b', value: 2, label: 'b=2 (10)' },
        { id: 'c', value: 3, label: '3 (11)' },
        { id: 'd', value: 0, label: 'carry = 0' },
      ],
      target: 3,
      instruction: 'Add without + or −: a=1, b=2. Which two inputs produce a zero carry when XOR-ed, yielding the sum directly?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'XOR of two bits gives the sum without carry: 1^1=0, 0^1=1, 1^0=1, 0^0=0. This is exactly binary addition ignoring carry.', xpCost: 0 },
      { id: 2, text: 'AND of two bits is 1 only when both are 1, which is exactly when a carry is generated. Shift left by 1 to carry it to the next position.', xpCost: 0 },
      { id: 3, text: 'Repeat a=a^b, b=(a&b)<<1 (compute both before updating!) until b=0. Handle negative numbers: use & 0xFFFFFFFF mask in languages without 32-bit overflow.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'getSum(3, 5). a=3 (011), b=5 (101). Compute XOR: 011^101=110=6. Compute carry: (011&101)<<1=(001)<<1=010=2.',
        state: { a: 3, b: 5, a_bin: '011', b_bin: '101', xor: 6, carry: 2 },
        annotation: 'a XOR b = 6, carry = 2',
      },
      {
        id: 2,
        description: 'Iteration 2: a=6 (110), b=2 (010). XOR: 110^010=100=4. Carry: (110&010)<<1=(010)<<1=100=4.',
        state: { a: 6, b: 2, a_bin: '110', b_bin: '010', xor: 4, carry: 4 },
        annotation: 'a=4, b=4 — carry still non-zero',
      },
      {
        id: 3,
        description: 'Iteration 3: a=4 (100), b=4 (100). XOR: 100^100=000=0. Carry: (100&100)<<1=(100)<<1=1000=8.',
        state: { a: 4, b: 4, a_bin: '100', b_bin: '100', xor: 0, carry: 8 },
        annotation: 'a=0, b=8',
      },
      {
        id: 4,
        description: 'Iteration 4: a=0 (0000), b=8 (1000). XOR: 0^8=8. Carry: (0&8)<<1=0.',
        state: { a: 0, b: 8, xor: 8, carry: 0 },
        annotation: 'a=8, b=0 — carry is 0, done!',
      },
      {
        id: 5,
        description: 'b=0, loop ends. Return a=8. Correct: 3+5=8.',
        state: { result: 8 },
        annotation: 'Answer: 8',
      },
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'Integers are 32-bit; carry can propagate at most 32 positions, so the loop runs at most 32 times — constant.',
      spaceExplanation: 'Only a handful of variables; no extra data structures.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
        notes: 'JavaScript handles negative integers with 32-bit two\'s complement automatically in bitwise ops, so no masking is needed here.',
      },
      {
        language: 'python',
        code: `def getSum(a: int, b: int) -> int:
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF
    while b & MASK:
        carry = ((a & b) << 1) & MASK
        a = (a ^ b) & MASK
        b = carry
    # Convert from unsigned 32-bit back to signed if needed
    return a if a <= MAX else ~(a ^ MASK)`,
        notes: 'Python integers are arbitrary precision, so we must mask to 32 bits and sign-convert at the end.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Convert to strings or use recursion with +1/-1 increments — technically avoids + but is O(|a|+|b|) and defeats the purpose.',
        complexity: {
          time: 'O(|a|+|b|)',
          space: 'O(1)',
          timeExplanation: 'Incrementing one number towards the other takes proportional steps.',
          spaceExplanation: 'Constant extra space.',
        },
      },
      optimized: {
        description: 'Bitwise simulation: XOR accumulates bits, AND+shift accumulates carries. Loop until no carry remains.',
        complexity: {
          time: 'O(1)',
          space: 'O(1)',
          timeExplanation: 'Bounded by 32-bit integer width — at most 32 iterations.',
          spaceExplanation: 'Three variables regardless of input.',
        },
      },
      followUps: [
        'Can you implement subtraction using the same approach?',
        'Extend to handle arbitrary-precision big integers.',
        'How would you implement multiplication using only bit operations?',
      ],
      edgeCases: [
        'getSum(0, 0) → 0',
        'getSum(-1, 1) → 0 (carry chain collapses)',
        'getSum(INT_MIN, -1) → overflow in some languages',
        'One or both inputs are negative',
      ],
      commonMistakes: [
        'Computing carry after updating a (must save carry = (a & b) << 1 before a = a ^ b)',
        'Forgetting to mask to 32 bits in Python — Python integers are unbounded',
        'Using the same variable for both carry and the new a without a temp',
      ],
      interviewerTips: [
        'Explain why XOR = sum without carry and AND = carry before coding',
        'Trace through a small example like getSum(1, 3) to show carry propagation',
        'Mention that this works in O(1) because integers are a fixed width',
      ],
    },
    codeChallenge: {
      functionName: 'getSum',
      starterCode: {
        javascript: `/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function getSum(a, b) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [1, 2], expected: 3, description: 'getSum(1, 2) → 3' },
        { input: [-1, 1], expected: 0, description: 'getSum(-1, 1) → 0' },
        { input: [3, 5], expected: 8, description: 'getSum(3, 5) → 8' },
        { input: [-10, 4], expected: -6, description: 'getSum(-10, 4) → -6' },
        { input: [0, 0], expected: 0, description: 'getSum(0, 0) → 0' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['XOR Tricks', 'Bit Carry Propagation', 'Two\'s Complement'],
    intuitionSummary: 'Binary addition is XOR (sum bits) plus carry from AND shifted left. Repeat until the carry is zero.',
    patternName: 'XOR + Carry Bit Addition',
  },

  // ─── 2. Number of 1 Bits ─────────────────────────────────────────────────────
  {
    id: 'number-1-bits',
    slug: 'number-of-1-bits',
    leetcodeNumber: 191,
    title: 'Number of 1 Bits',
    category: 'bit-manipulation',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['bit-manipulation', 'divide-and-conquer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Apple', 'Microsoft', 'Amazon', 'Google', 'Bloomberg'],
    descriptions: {
      explorer: 'Count the number of set bits (1s) in the binary representation of an integer — also known as the Hamming weight.',
      engineer: 'The trick n & (n-1) clears the lowest set bit of n. Count how many times you can do this before n reaches zero.',
      interview: 'Two approaches: (1) right-shift and check LSB 32 times — O(32); (2) n &= (n-1) to clear lowest set bit — O(popcount). Both O(1) for 32-bit integers.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'bit position 0' },
        { id: 'b', value: 2, label: 'bit position 1' },
        { id: 'c', value: 8, label: 'bit position 3' },
        { id: 'd', value: 3, label: '3' },
      ],
      target: 3,
      instruction: 'n=11 (binary 1011): which two lowest set-bit values do you encounter first when scanning from bit 0 upward?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'n & (n-1) always removes the lowest set bit. For example, 12 (1100) & 11 (1011) = 8 (1000) — the lowest set bit (bit 2) is gone.', xpCost: 0 },
      { id: 2, text: 'Count how many times you apply n &= (n-1) before n becomes 0. That count equals the number of 1 bits.', xpCost: 0 },
      { id: 3, text: 'Alternative: loop 32 times, check n & 1 for each bit, then unsigned right-shift n >>>= 1. Same O(1) time, slightly more predictable.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'hammingWeight(11). n=11 in binary is 1011. Count=0.',
        state: { n: 11, n_bin: '1011', count: 0 },
        annotation: 'Start: n=11, 3 set bits total',
      },
      {
        id: 2,
        description: 'Iteration 1: n & (n-1) = 1011 & 1010 = 1010 = 10. Count=1.',
        state: { n: 10, n_bin: '1010', count: 1 },
        highlight: [0],
        annotation: 'Cleared bit 0 (LSB)',
      },
      {
        id: 3,
        description: 'Iteration 2: n & (n-1) = 1010 & 1001 = 1000 = 8. Count=2.',
        state: { n: 8, n_bin: '1000', count: 2 },
        highlight: [1],
        annotation: 'Cleared bit 1',
      },
      {
        id: 4,
        description: 'Iteration 3: n & (n-1) = 1000 & 0111 = 0000 = 0. Count=3.',
        state: { n: 0, n_bin: '0000', count: 3 },
        highlight: [3],
        annotation: 'Cleared bit 3 — n is now 0',
      },
      {
        id: 5,
        description: 'n=0, loop ends. Return count=3. Correct: 11 = 1011 has three 1 bits.',
        state: { result: 3 },
        annotation: 'Answer: 3',
      },
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'The n&(n-1) loop runs at most as many times as there are set bits, bounded by 32 for a 32-bit integer.',
      spaceExplanation: 'Only a counter variable — constant extra space.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= (n - 1); // clear lowest set bit
    count++;
  }
  return count;
}`,
        notes: 'n &= (n-1) is a classic Kernighan\'s bit counting trick. Each iteration removes exactly one set bit.',
      },
      {
        language: 'python',
        code: `def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Convert to binary string and count \'1\' characters, or right-shift 32 times checking LSB each time.',
        complexity: {
          time: 'O(32) = O(1)',
          space: 'O(1)',
          timeExplanation: 'Always 32 iterations for a 32-bit integer.',
          spaceExplanation: 'Constant space for the counter.',
        },
      },
      optimized: {
        description: 'Kernighan\'s trick: n &= (n-1) clears the lowest set bit — loop only runs popcount(n) times.',
        complexity: {
          time: 'O(k) where k = number of set bits',
          space: 'O(1)',
          timeExplanation: 'Exactly k iterations, where k ≤ 32.',
          spaceExplanation: 'One counter variable.',
        },
      },
      followUps: [
        'Hamming Distance (LC 461) — XOR then count set bits',
        'What if this function is called millions of times? (use a lookup table for 16-bit chunks)',
        'How does this change for 64-bit integers?',
      ],
      edgeCases: [
        'n=0 → 0 set bits',
        'n=2147483647 (all bits set except MSB) → 30',
        'n treated as unsigned: 2^32-1 = 4294967295 has 32 set bits',
      ],
      commonMistakes: [
        'Using >> instead of >>> in JavaScript — right-shift sign-extends for negative numbers',
        'Forgetting that n is treated as an unsigned 32-bit integer per the problem',
        'Off-by-one in bit-shift loop (should shift 32 times, not 31)',
      ],
      interviewerTips: [
        'Ask the interviewer whether the input should be treated as signed or unsigned',
        'Mention both approaches (shift-and-check vs n&(n-1)) and explain why the latter is faster for sparse bit patterns',
        'Point out that popcount is a single CPU instruction on modern hardware',
      ],
    },
    codeChallenge: {
      functionName: 'hammingWeight',
      starterCode: {
        javascript: `/**
 * @param {number} n - a positive integer
 * @return {number}
 */
function hammingWeight(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [11], expected: 3, description: 'hammingWeight(11) = hammingWeight(0b1011) → 3' },
        { input: [128], expected: 1, description: 'hammingWeight(128) = hammingWeight(0b10000000) → 1' },
        { input: [2147483645], expected: 30, description: 'hammingWeight(2147483645) → 30' },
        { input: [0], expected: 0, description: 'hammingWeight(0) → 0' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Kernighan Bit Count', 'Hamming Distance', 'Bit Mask'],
    intuitionSummary: 'n & (n-1) strips the lowest set bit each time. Count those operations until n reaches zero.',
    patternName: 'Clear Lowest Set Bit',
  },

  // ─── 3. Counting Bits ────────────────────────────────────────────────────────
  {
    id: 'counting-bits',
    slug: 'counting-bits',
    leetcodeNumber: 338,
    title: 'Counting Bits',
    category: 'bit-manipulation',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['bit-manipulation', 'dynamic-programming'],
    questionSets: ['blind75'],
    companies: ['Amazon', 'Google', 'Apple', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Return an array where each element ans[i] is the number of 1 bits in the binary representation of i, for i from 0 to n.',
      engineer: 'DP with bit shift: dp[i] = dp[i >> 1] + (i & 1). Shifting right drops the LSB; add 1 if the LSB was set.',
      interview: 'dp[i] = dp[i>>1] + (i&1). This works because i and i>>1 differ by only the LSB. Build answer in O(n) with O(n) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'countBits[1]' },
        { id: 'b', value: 1, label: 'countBits[2]' },
        { id: 'c', value: 2, label: 'countBits[3]' },
        { id: 'd', value: 2, label: 'countBits[5]' },
      ],
      target: 2,
      instruction: 'Counting bits dp: which two dp values seed the recurrence countBits[i] = countBits[i>>1] + (i&1) for all i ≥ 3?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Right-shifting i by 1 (i >> 1) removes the least significant bit. The popcount of i is the popcount of (i>>1) plus whether the LSB of i is 1.', xpCost: 0 },
      { id: 2, text: 'So dp[i] = dp[i >> 1] + (i & 1). Since i >> 1 < i, it has already been computed by the time we reach i.', xpCost: 0 },
      { id: 3, text: 'Alternatively use dp[i] = dp[i & (i-1)] + 1 (clear lowest set bit + 1). Both give O(n) total with a single pass.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=5. Initialize dp=[0,0,0,0,0,0]. dp[0]=0 (base case: 0 has no set bits).',
        state: { dp: [0, 0, 0, 0, 0, 0] },
        annotation: 'Base case dp[0]=0',
      },
      {
        id: 2,
        description: 'i=1: dp[1>>1]+(1&1)=dp[0]+1=0+1=1. dp[1]=1.',
        state: { dp: [0, 1, 0, 0, 0, 0], i: 1 },
        highlight: [1],
        annotation: '1 in binary = 1 → 1 set bit',
      },
      {
        id: 3,
        description: 'i=2: dp[2>>1]+(2&1)=dp[1]+0=1+0=1. dp[2]=1.',
        state: { dp: [0, 1, 1, 0, 0, 0], i: 2 },
        highlight: [2],
        annotation: '2 in binary = 10 → 1 set bit',
      },
      {
        id: 4,
        description: 'i=3: dp[3>>1]+(3&1)=dp[1]+1=1+1=2. dp[3]=2.',
        state: { dp: [0, 1, 1, 2, 0, 0], i: 3 },
        highlight: [3],
        annotation: '3 in binary = 11 → 2 set bits',
      },
      {
        id: 5,
        description: 'i=4: dp[4>>1]+(4&1)=dp[2]+0=1. i=5: dp[5>>1]+(5&1)=dp[2]+1=2. dp=[0,1,1,2,1,2].',
        state: { dp: [0, 1, 1, 2, 1, 2], i: 5, result: [0, 1, 1, 2, 1, 2] },
        highlight: [4, 5],
        annotation: 'Answer: [0,1,1,2,1,2]',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Single pass from 0 to n; each dp[i] computed in O(1).',
      spaceExplanation: 'Output array of size n+1 (this counts as the required output, not extra space).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp;
}`,
      },
      {
        language: 'python',
        code: `def countBits(n: int) -> list[int]:
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each number 0..n, call hammingWeight (or built-in popcount). O(n log n) or O(32n) = O(n).',
        complexity: {
          time: 'O(n * 32) = O(n)',
          space: 'O(n)',
          timeExplanation: 'Each of n numbers requires up to 32 bit-checks.',
          spaceExplanation: 'Output array of size n+1.',
        },
      },
      optimized: {
        description: 'DP recurrence dp[i]=dp[i>>1]+(i&1): reuse previously computed results, single O(n) pass.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'One O(1) operation per index.',
          spaceExplanation: 'Output array — unavoidable.',
        },
      },
      followUps: [
        'What if you need only a specific range, not 0..n?',
        'Generalize: count bits set in base-k representation.',
        'How would you solve this problem if the numbers were given in a stream?',
      ],
      edgeCases: [
        'n=0 → [0]',
        'n=1 → [0,1]',
        'Large n — ensure array allocation is efficient',
      ],
      commonMistakes: [
        'Using i>>1 as floor division without understanding it removes LSB',
        'Confusing i&1 (LSB check) with i%2 — both work but & is idiomatic here',
        'Returning dp with the wrong length (must be n+1 elements, indices 0..n)',
      ],
      interviewerTips: [
        'Interviewers want the O(n) DP solution, not O(n log n) brute force',
        'Explain the recurrence clearly: "shifting right removes LSB, so popcount is just popcount(i>>1) plus that bit"',
        'Mention that dp[i & (i-1)] + 1 is an equally valid alternative recurrence',
      ],
    },
    codeChallenge: {
      functionName: 'countBits',
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {number[]}
 */
function countBits(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [2], expected: [0, 1, 1], description: 'countBits(2) → [0,1,1]' },
        { input: [5], expected: [0, 1, 1, 2, 1, 2], description: 'countBits(5) → [0,1,1,2,1,2]' },
        { input: [0], expected: [0], description: 'countBits(0) → [0]' },
        { input: [1], expected: [0, 1], description: 'countBits(1) → [0,1]' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['number-1-bits'],
    relatedPatterns: ['DP on Bits', 'Popcount DP', 'Kernighan Bit Count'],
    intuitionSummary: 'Right-shifting removes the LSB; the popcount of i is just the popcount of i>>1 plus whether the LSB was 1.',
    patternName: 'DP Popcount Recurrence',
  },

  // ─── 4. Missing Number ───────────────────────────────────────────────────────
  {
    id: 'missing-number',
    slug: 'missing-number',
    leetcodeNumber: 268,
    title: 'Missing Number',
    category: 'bit-manipulation',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['bit-manipulation', 'array', 'hash-table', 'math', 'sorting'],
    questionSets: ['blind75'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Given an array containing n distinct numbers in the range [0, n], find the one number that is missing.',
      engineer: 'Math approach: expected sum = n*(n+1)/2, subtract actualSum. XOR approach: XOR all indices 0..n and all values — the missing number is what remains.',
      interview: 'Gauss formula: return n*(n+1)/2 - sum(nums). Or XOR: xor all indices 0..n and all nums values; pairs cancel leaving the missing number. Both O(n) time O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 6, label: 'expected sum' },
        { id: 'b', value: 4, label: 'actual sum' },
        { id: 'c', value: 2, label: '2' },
        { id: 'd', value: 3, label: 'n=3' },
      ],
      target: 10,
      instruction: '[3,0,1]: to find the missing number, which two sums do you need to compute and compare?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The array should contain every integer from 0 to n exactly once. The expected sum of 0+1+...+n is n*(n+1)/2.', xpCost: 0 },
      { id: 2, text: 'Subtract the actual sum of the array from the expected sum. The difference is the missing number.', xpCost: 0 },
      { id: 3, text: 'XOR approach: XOR all indices 0..n together with all array values. Every present number XORs with its matching index and cancels; only the missing number\'s index survives.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'missingNumber([3,0,1]). n=3. Expected sum = 3*4/2 = 6.',
        state: { nums: [3, 0, 1], n: 3, expected: 6 },
        annotation: 'Gauss sum for n=3 is 6',
      },
      {
        id: 2,
        description: 'Actual sum = 3+0+1 = 4.',
        state: { nums: [3, 0, 1], n: 3, expected: 6, actualSum: 4 },
        highlight: [0, 1, 2],
        annotation: 'Sum of array elements',
      },
      {
        id: 3,
        description: 'Missing = expected - actual = 6 - 4 = 2.',
        state: { expected: 6, actualSum: 4, missing: 2 },
        annotation: 'Answer: 2',
      },
      {
        id: 4,
        description: 'XOR verification: XOR(0^1^2^3) ^ XOR(3^0^1) = (0^1^2^3^3^0^1) = 2. Pairs cancel: 0^0=0, 1^1=0, 3^3=0; 2 remains.',
        state: { xorIndices: '0^1^2^3', xorValues: '3^0^1', result: 2 },
        annotation: 'XOR approach also gives 2',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass to compute the sum (or XOR); n*(n+1)/2 is O(1).',
      spaceExplanation: 'No extra data structures — only a running sum or XOR accumulator.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((sum, x) => sum + x, 0);
  return expected - actual;
}`,
        notes: 'Gauss formula solution. XOR alternative: let xor = nums.length; for (let i = 0; i < nums.length; i++) xor ^= i ^ nums[i]; return xor;',
      },
      {
        language: 'python',
        code: `def missingNumber(nums: list[int]) -> int:
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Sort the array and scan for the gap. Or use a hash set and check which of 0..n is absent.',
        complexity: {
          time: 'O(n log n)',
          space: 'O(1) sort / O(n) hash set',
          timeExplanation: 'Sorting dominates; hash set scan is O(n) but uses O(n) space.',
          spaceExplanation: 'Sort is in-place O(1); hash set needs O(n).',
        },
      },
      optimized: {
        description: 'Gauss formula: expected minus actual = missing. Or XOR all indices and values — every present number cancels.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'One pass to sum or XOR all elements.',
          spaceExplanation: 'Single accumulator variable.',
        },
      },
      followUps: [
        'What if there are two missing numbers? (LC 765 / bit tricks with XOR grouping)',
        'What if numbers are in range [1, n] instead of [0, n]?',
        'What if there can be duplicates? (then need sum and sum-of-squares or hash)',
      ],
      edgeCases: [
        'missingNumber([0]) → 1 (only element is 0, n=1 is missing)',
        'missingNumber([1]) → 0 (0 is missing)',
        'Missing number is 0 or n (boundary cases)',
      ],
      commonMistakes: [
        'Integer overflow when computing n*(n+1)/2 for very large n (use BigInt or long in typed languages)',
        'Confusing n (length) with the range — range is [0, n], so expected has n+1 numbers',
        'XOR approach: forgetting to XOR with n itself (the extra index beyond the array)',
      ],
      interviewerTips: [
        'Both math and XOR approaches are acceptable — mention both and let the interviewer choose',
        'The XOR approach is elegant: "every number XORs with itself and disappears, only the missing one remains"',
        'Point out the overflow concern proactively to show attention to detail',
      ],
    },
    codeChallenge: {
      functionName: 'missingNumber',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3, 0, 1]], expected: 2, description: 'missingNumber([3,0,1]) → 2' },
        { input: [[0, 1]], expected: 2, description: 'missingNumber([0,1]) → 2' },
        { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8, description: 'missingNumber([9,6,4,2,3,5,7,0,1]) → 8' },
        { input: [[0]], expected: 1, description: 'missingNumber([0]) → 1' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Gauss Sum', 'XOR Cancellation', 'Find Duplicate / Missing'],
    intuitionSummary: 'The expected sum minus the actual sum equals the missing value. XOR-based approach works by cancellation.',
    patternName: 'Gauss Sum / XOR Cancellation',
  },

  // ─── 5. Reverse Bits ─────────────────────────────────────────────────────────
  {
    id: 'reverse-bits',
    slug: 'reverse-bits',
    leetcodeNumber: 190,
    title: 'Reverse Bits',
    category: 'bit-manipulation',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['bit-manipulation', 'divide-and-conquer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Apple', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Reverse the bits of a given 32-bit unsigned integer. The least significant bit becomes the most significant, and vice versa.',
      engineer: 'Loop 32 times: shift result left by 1, OR in the current LSB of n, then right-shift n by 1. After 32 iterations the bits are reversed.',
      interview: '32-iteration loop: result = (result << 1) | (n & 1); n >>>= 1. Use unsigned right shift in JavaScript. Returns a 32-bit unsigned integer.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 5, label: '0101' },
        { id: 'b', value: 10, label: '1010' },
        { id: 'c', value: 3, label: '0011' },
        { id: 'd', value: 7, label: '0111' },
      ],
      target: 15,
      instruction: 'Reverse the 32-bit binary representation of 5 (0101). What are the input and the correct reversed-bits output?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of building the result bit by bit from right to left. At each step, shift result left (making room), then OR in the current LSB of n.', xpCost: 0 },
      { id: 2, text: 'n & 1 extracts the LSB of n. n >>>= 1 (unsigned right shift) discards that LSB. Do this 32 times.', xpCost: 0 },
      { id: 3, text: 'Must do exactly 32 iterations even if n becomes 0 early, to ensure leading zeros in n become trailing zeros in result.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'reverseBits(43261596). Binary: 00000010100101000001111010011100. result=0.',
        state: { n: 43261596, n_bin: '00000010100101000001111010011100', result: 0, iteration: 0 },
        annotation: '32-bit input',
      },
      {
        id: 2,
        description: 'Iterations 1-8: extract LSBs 0,0,1,1,1,0,0,1 from right. Result accumulates: 10011100 from MSB position.',
        state: { iteration: 8, result_so_far: '10011100 building in MSB area', bits_extracted: [0,0,1,1,1,0,0,1] },
        annotation: 'First 8 bits extracted from right of n',
      },
      {
        id: 3,
        description: 'Continue all 32 iterations. Each iteration: result <<= 1, result |= (n & 1), n >>>= 1.',
        state: { iteration: 32, operation: 'result = (result << 1) | (n & 1); n >>>= 1;' },
        annotation: '32 total iterations',
      },
      {
        id: 4,
        description: 'After 32 iterations: result = 964176192. Binary: 00111001000000101001010000000000.',
        state: { result: 964176192, result_bin: '00111001000000101001010000000000' },
        annotation: 'Bits are now reversed',
      },
      {
        id: 5,
        description: 'Return result = 964176192. Verify: the reversed binary of 00000010100101000001111010011100 is 00111001000000101001010000000000 = 964176192.',
        state: { answer: 964176192 },
        annotation: 'Answer: 964176192',
      },
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'Always exactly 32 iterations — constant regardless of input.',
      spaceExplanation: 'Only a result variable; no extra memory.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result * 2 + (n & 1)) >>> 0; // >>> 0 keeps it unsigned 32-bit
    n >>>= 1;
  }
  return result >>> 0;
}`,
        notes: 'Use >>> 0 to force unsigned 32-bit interpretation in JavaScript. Using << 1 can cause sign issues; multiplying by 2 then >>> 0 is safer.',
      },
      {
        language: 'python',
        code: `def reverseBits(n: int) -> int:
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Convert to binary string (zero-padded to 32 chars), reverse it, parse back to integer.',
        complexity: {
          time: 'O(32) = O(1)',
          space: 'O(32) = O(1)',
          timeExplanation: 'Fixed 32-character string operations.',
          spaceExplanation: 'Fixed-size string buffer.',
        },
      },
      optimized: {
        description: 'Bit manipulation: extract LSB of n into MSB of result each iteration, 32 times.',
        complexity: {
          time: 'O(1)',
          space: 'O(1)',
          timeExplanation: '32 constant-time bitwise operations.',
          spaceExplanation: 'Single result variable.',
        },
      },
      followUps: [
        'What if called many times? Cache results in a map from 8-bit chunks — only 256 possible inputs.',
        'Implement using a divide-and-conquer approach swapping bit groups (parallel prefix approach).',
        'How would you reverse bits in a 64-bit integer?',
      ],
      edgeCases: [
        'n=0 → 0 (all zeros reversed is still all zeros)',
        'n=4294967295 (all 32 bits set) → 4294967295',
        'n=1 → 2147483648 (LSB becomes MSB)',
      ],
      commonMistakes: [
        'Using >> (signed) instead of >>> (unsigned) right shift in JavaScript — sign bit would be replicated',
        'Not running exactly 32 iterations — early termination misses leading zeros that become trailing zeros',
        'Forgetting >>> 0 to coerce result to unsigned 32-bit in JavaScript',
      ],
      interviewerTips: [
        'Clarify that the input is treated as unsigned 32-bit — JavaScript by default uses signed 32-bit in bitwise ops',
        'Mention the 8-bit lookup table optimization for repeated calls',
        'The divide-and-conquer swap approach is a good follow-up to discuss',
      ],
    },
    codeChallenge: {
      functionName: 'reverseBits',
      starterCode: {
        javascript: `/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
function reverseBits(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [43261596], expected: 964176192, description: 'reverseBits(43261596) → 964176192' },
        { input: [4294967293], expected: 3221225471, description: 'reverseBits(4294967293) → 3221225471' },
        { input: [0], expected: 0, description: 'reverseBits(0) → 0' },
        { input: [1], expected: 2147483648, description: 'reverseBits(1) → 2147483648 (bit 0 → bit 31)' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['number-1-bits'],
    relatedPatterns: ['Bit Reversal', 'Bit Extraction', 'Unsigned Shift'],
    intuitionSummary: 'Feed bits from LSB of n into MSB of result one at a time, exactly 32 times.',
    patternName: 'Bit Reversal via Shift and OR',
  },

  // ─── 6. Add Binary ───────────────────────────────────────────────────────────
  {
    id: 'add-binary',
    slug: 'add-binary',
    leetcodeNumber: 67,
    title: 'Add Binary',
    category: 'bit-manipulation',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['bit-manipulation', 'math', 'string', 'simulation'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Add two binary numbers represented as strings and return the result as a binary string.',
      engineer: 'Walk both strings from right to left with a carry variable. At each position: sum = bit_a + bit_b + carry; append sum%2 to result; carry = sum/2. Prepend remaining carry.',
      interview: 'Two-pointer from end: sum = (a[i]-\'0\') + (b[j]-\'0\') + carry. Append sum%2, carry = sum>>1. O(max(m,n)) time, O(max(m,n)) space for result.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '"11" in decimal' },
        { id: 'b', value: 1, label: '"1" in decimal' },
        { id: 'c', value: 4, label: 'sum' },
        { id: 'd', value: 100, label: '"100"' },
      ],
      target: 4,
      instruction: 'Add binary strings "11" and "1". What are the decimal values of each input you are summing?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Start from the rightmost characters of both strings and work left, exactly like manual binary addition on paper.', xpCost: 0 },
      { id: 2, text: 'At each position, sum = digit_a + digit_b + carry. The new bit is sum % 2 (or sum & 1), and the new carry is sum >> 1 (or Math.floor(sum/2)).', xpCost: 0 },
      { id: 3, text: 'After exhausting both strings, if carry is still 1 prepend "1" to the result. Build the result string in reverse, then reverse it at the end.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'addBinary("11","1"). i=1 (last of "11"), j=0 (last of "1"), carry=0, result="".',
        state: { a: '11', b: '1', i: 1, j: 0, carry: 0, result: '' },
        annotation: 'Start from rightmost digits',
      },
      {
        id: 2,
        description: 'Column 1: sum = a[1](1) + b[0](1) + carry(0) = 2. bit=2%2=0, carry=2>>1=1. Prepend "0".',
        state: { a_digit: 1, b_digit: 1, carry_in: 0, sum: 2, bit: 0, carry_out: 1, result: '0' },
        highlight: [1, 0],
        annotation: '1+1=10 in binary: bit=0, carry=1',
      },
      {
        id: 3,
        description: 'Column 2: i=0, j exhausted. sum = a[0](1) + 0 + carry(1) = 2. bit=0, carry=1. Prepend "0".',
        state: { a_digit: 1, b_digit: 0, carry_in: 1, sum: 2, bit: 0, carry_out: 1, result: '00' },
        highlight: [0],
        annotation: '1+0+1=10: bit=0, carry=1',
      },
      {
        id: 4,
        description: 'Both strings exhausted. carry=1 → prepend "1". result="100".',
        state: { carry: 1, result: '100' },
        annotation: 'Remaining carry becomes MSB',
      },
      {
        id: 5,
        description: 'Return "100". Verify: 11 (3) + 1 = 4 = 100 in binary. Correct.',
        state: { answer: '100' },
        annotation: 'Answer: "100"',
      },
    ],
    complexity: {
      time: 'O(max(m, n))',
      space: 'O(max(m, n))',
      timeExplanation: 'We scan at most max(len_a, len_b) + 1 positions.',
      spaceExplanation: 'Output string is at most max(m,n)+1 characters.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function addBinary(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = '';

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(a[i--]) : 0;
    const digitB = j >= 0 ? parseInt(b[j--]) : 0;
    const sum = digitA + digitB + carry;
    result = (sum % 2).toString() + result;
    carry = Math.floor(sum / 2);
  }

  return result || '0';
}`,
      },
      {
        language: 'python',
        code: `def addBinary(a: str, b: str) -> str:
    i, j = len(a) - 1, len(b) - 1
    carry = 0
    result = []
    while i >= 0 or j >= 0 or carry:
        digit_a = int(a[i]) if i >= 0 else 0
        digit_b = int(b[j]) if j >= 0 else 0
        total = digit_a + digit_b + carry
        result.append(str(total % 2))
        carry = total // 2
        i -= 1
        j -= 1
    return ''.join(reversed(result)) or '0'`,
        notes: 'Use a list and reverse at end to avoid O(n^2) string concatenation.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Parse both strings as integers, add them, convert back to binary string. Fails for very large inputs exceeding int/long range.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'Parsing and conversion each take O(n).',
          spaceExplanation: 'Output string of length O(n).',
        },
      },
      optimized: {
        description: 'Simulate column-by-column binary addition from right to left with a carry bit.',
        complexity: {
          time: 'O(max(m, n))',
          space: 'O(max(m, n))',
          timeExplanation: 'Single pass through the longer string.',
          spaceExplanation: 'Result string of length at most max(m,n)+1.',
        },
      },
      followUps: [
        'Add Binary II (LC 1150-like) — what if the strings are very long and you can\'t use BigInt?',
        'Multiply two binary strings (LC 43 analog for binary)',
        'How would you extend this to hexadecimal addition?',
      ],
      edgeCases: [
        'addBinary("0","0") → "0"',
        'One string is much longer than the other',
        'Result has a carry beyond the MSB of both inputs (e.g., "1"+"1" → "10")',
      ],
      commonMistakes: [
        'Prepending to a string in a loop is O(n²) in some languages — build array and reverse instead',
        'Forgetting to handle the final carry after the main loop',
        'Not returning "0" for the edge case where result is empty (shouldn\'t happen but safe guard)',
      ],
      interviewerTips: [
        'This is a good warm-up problem; interviewers expect clean code and edge case awareness',
        'Mention that parsing to integer fails for arbitrarily large inputs',
        'Show you know string building efficiently (append + reverse vs. prepend)',
      ],
    },
    codeChallenge: {
      functionName: 'addBinary',
      starterCode: {
        javascript: `/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function addBinary(a, b) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['11', '1'], expected: '100', description: 'addBinary("11","1") → "100"' },
        { input: ['1010', '1011'], expected: '10101', description: 'addBinary("1010","1011") → "10101"' },
        { input: ['0', '0'], expected: '0', description: 'addBinary("0","0") → "0"' },
        { input: ['1', '111'], expected: '1000', description: 'addBinary("1","111") → "1000"' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['sum-two-integers'],
    relatedPatterns: ['String Simulation', 'Carry Propagation', 'Two Pointer from End'],
    intuitionSummary: 'Binary addition works column by column from right to left — just like decimal, but carry happens at 2 not 10.',
    patternName: 'Column-by-Column Addition with Carry',
  },

  // ─── 7. Single Number II ─────────────────────────────────────────────────────
  {
    id: 'single-number-ii',
    slug: 'single-number-ii',
    leetcodeNumber: 137,
    title: 'Single Number II',
    category: 'bit-manipulation',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['bit-manipulation', 'array'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Every element in the array appears three times except for one. Find the element that appears only once.',
      engineer: 'Count set bits at each of 32 positions across all numbers. Each position\'s count mod 3 gives the corresponding bit of the unique element.',
      interview: 'For each bit position 0..31: sum all nums\' bit at that position, take sum%3. Reconstruct integer from those 32 remainder bits. O(32n)=O(n) time, O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 3, label: '3' },
        { id: 'c', value: 6, label: '6' },
        { id: 'd', value: 1, label: '1' },
      ],
      target: 5,
      instruction: '[2,2,3,2]: every number appears exactly three times except one. Which value repeats three times, and which appears only once?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'If every number appeared three times, the count of set bits at every position would be divisible by 3. The unique number contributes 1 extra bit at each of its set positions.', xpCost: 0 },
      { id: 2, text: 'So for each bit position 0..31, sum all bits at that position, take mod 3. The result (0 or 1) is the unique number\'s bit at that position.', xpCost: 0 },
      { id: 3, text: 'Reconstruct the answer by shifting each bit into its correct position. Handle negative numbers: if bit 31 is set in C++/Java, the number is negative (two\'s complement).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'singleNumber([2,2,3,2]). In binary: 2=010, 2=010, 3=011, 2=010.',
        state: { nums: [2, 2, 3, 2], binaries: ['010', '010', '011', '010'] },
        annotation: 'Convert all numbers to binary',
      },
      {
        id: 2,
        description: 'Bit position 0 (LSB): 0+0+1+0=1. 1%3=1. Unique number has bit 0 = 1.',
        state: { position: 0, bits: [0, 0, 1, 0], sum: 1, mod3: 1 },
        highlight: [0],
        annotation: 'Position 0: sum=1, 1%3=1',
      },
      {
        id: 3,
        description: 'Bit position 1: 1+1+1+1=4. 4%3=1. Unique number has bit 1 = 1.',
        state: { position: 1, bits: [1, 1, 1, 1], sum: 4, mod3: 1 },
        highlight: [1],
        annotation: 'Position 1: sum=4, 4%3=1',
      },
      {
        id: 4,
        description: 'Bit position 2 and above: all zeros. sum=0, 0%3=0.',
        state: { position: '2+', bits: [0, 0, 0, 0], sum: 0, mod3: 0 },
        annotation: 'Higher positions: all 0',
      },
      {
        id: 5,
        description: 'Reconstruct: bit1=1, bit0=1 → 11 in binary = 3. Return 3.',
        state: { result_bits: '11', result: 3 },
        annotation: 'Answer: 3 (appears once; 2 appears 3 times)',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'We iterate over 32 bit positions, each requiring a pass over n numbers: O(32n) = O(n).',
      spaceExplanation: 'Only a result integer and loop variables — no extra arrays.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function singleNumber(nums) {
  let result = 0;
  for (let bit = 0; bit < 32; bit++) {
    let sum = 0;
    for (const n of nums) {
      sum += (n >> bit) & 1;
    }
    if (sum % 3 !== 0) {
      result |= (1 << bit);
    }
  }
  // Convert from unsigned 32-bit to signed if bit 31 is set
  return result | 0;
}`,
        notes: 'result | 0 converts to signed 32-bit integer. Alternatively use two accumulators (ones, twos) for an elegant single-pass solution.',
      },
      {
        language: 'python',
        code: `def singleNumber(nums: list[int]) -> int:
    result = 0
    for bit in range(32):
        total = sum((n >> bit) & 1 for n in nums) % 3
        if total:
            result |= total << bit
    # Handle 32-bit signed overflow
    if result >= (1 << 31):
        result -= (1 << 32)
    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Use a hash map to count occurrences, then return the key with count 1.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'Single pass to build frequency map.',
          spaceExplanation: 'Hash map stores up to n/3 + 1 unique keys.',
        },
      },
      optimized: {
        description: 'Bit counting: sum bit at each position, take mod 3. Or use two-variable state machine (ones, twos) for a slick O(n) single pass.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: '32 passes of O(n) each = O(n).',
          spaceExplanation: 'Only integer variables, no extra memory.',
        },
      },
      followUps: [
        'What if every element appears k times except one? Generalize to mod k.',
        'Single Number III (LC 260): two elements appear once, rest appear twice.',
        'Implement using the elegant ones/twos state machine approach.',
      ],
      edgeCases: [
        'Negative numbers — bit 31 set in 32-bit two\'s complement',
        'singleNumber([1,1,1,4]) → 4',
        'The unique number is 0',
      ],
      commonMistakes: [
        'Forgetting to sign-extend the result for negative unique numbers',
        'Using XOR (works only when elements repeat an even number of times, not 3)',
        'Not handling all 32 bit positions — stopping early misses sign bit',
      ],
      interviewerTips: [
        'Start with the hash map O(n) space solution, then optimize to O(1) space',
        'Mention the two-variable state machine (ones ^= n; twos |= ones & n; mask = ~(ones & twos); ones &= mask; twos &= mask) as the elegant follow-up',
        'Emphasize this pattern generalizes: for "k times except one", accumulate bits mod k',
      ],
    },
    codeChallenge: {
      functionName: 'singleNumber',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[2, 2, 3, 2]], expected: 3, description: 'singleNumber([2,2,3,2]) → 3' },
        { input: [[0, 1, 0, 1, 0, 1, 99]], expected: 99, description: 'singleNumber([0,1,0,1,0,1,99]) → 99' },
        { input: [[1, 1, 1, 4]], expected: 4, description: 'singleNumber([1,1,1,4]) → 4' },
        { input: [[-2, -2, 1, 1, -3, 1, -3, -3, -2]], expected: -2, description: 'singleNumber with negative unique element' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-1-bits'],
    relatedPatterns: ['Bit Count Mod K', 'XOR Cancellation', 'State Machine Bits'],
    intuitionSummary: 'Count bits at each position across all numbers; if a position\'s count isn\'t divisible by 3, the unique number has that bit set.',
    patternName: 'Bit Count Modulo K',
  },

  // ─── 8. Bitwise AND of Numbers Range ─────────────────────────────────────────
  {
    id: 'bitwise-and-range',
    slug: 'bitwise-and-of-numbers-range',
    leetcodeNumber: 201,
    title: 'Bitwise AND of Numbers Range',
    category: 'bit-manipulation',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['bit-manipulation'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Find the bitwise AND of all numbers between left and right (inclusive). The result is the common prefix of the binary representations.',
      engineer: 'Right-shift both numbers until they are equal. Track how many times you shifted. Left-shift the common value back by that count.',
      interview: 'Shift left and right together right until left==right (count shifts). Return left << count. This isolates the common binary prefix. O(log n) time.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 4, label: 'AND result' },
        { id: 'b', value: 5, label: 'range start' },
        { id: 'c', value: 7, label: 'range end' },
        { id: 'd', value: 3, label: 'range length' },
      ],
      target: 9,
      instruction: 'Bitwise AND of all numbers in range [5,7]: what is the AND result, and what is the range start that shares the common binary prefix?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'AND of a range is zero whenever two consecutive numbers differ in the bit that is being AND-ed. The only bits that survive are those in the common prefix.', xpCost: 0 },
      { id: 2, text: 'Right-shift both left and right by 1, incrementing a counter, until left == right. You\'ve found the common prefix.', xpCost: 0 },
      { id: 3, text: 'Return left << count (or right << count — they\'re equal). The trailing bits (below the common prefix) are all zero because the range covers consecutive values that flip those bits.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'rangeBitwiseAnd(5, 7). In binary: 5=101, 6=110, 7=111. AND all: 101 & 110 & 111 = 100 = 4.',
        state: { left: 5, right: 7, left_bin: '101', right_bin: '111' },
        annotation: '5=101, 6=110, 7=111',
      },
      {
        id: 2,
        description: 'Shift 1: left=5>>1=2, right=7>>1=3, count=1. left(2) != right(3), keep shifting.',
        state: { left: 2, right: 3, count: 1 },
        annotation: 'Still differ, continue',
      },
      {
        id: 3,
        description: 'Shift 2: left=2>>1=1, right=3>>1=1, count=2. left(1) == right(1), stop.',
        state: { left: 1, right: 1, count: 2 },
        annotation: 'Common prefix found: 1',
      },
      {
        id: 4,
        description: 'Return left << count = 1 << 2 = 4. Binary: 100.',
        state: { common_prefix: 1, shift_count: 2, result: 4, result_bin: '100' },
        annotation: 'Answer: 4',
      },
      {
        id: 5,
        description: 'Verify: 5&6&7 = 101&110&111. Bit 0: 1&0&1=0. Bit 1: 0&1&1=0. Bit 2: 1&1&1=1. Result = 100 = 4. Correct.',
        state: { answer: 4 },
        annotation: 'Verified: 4',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'We shift at most 32 times (log₂ of max value), and each shift is O(1).',
      spaceExplanation: 'Only the shift counter and modified left/right — constant space.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function rangeBitwiseAnd(left, right) {
  let count = 0;
  while (left !== right) {
    left >>= 1;
    right >>= 1;
    count++;
  }
  return left << count;
}`,
      },
      {
        language: 'python',
        code: `def rangeBitwiseAnd(left: int, right: int) -> int:
    count = 0
    while left != right:
        left >>= 1
        right >>= 1
        count += 1
    return left << count`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'AND all numbers from left to right in a loop. Correct but O(right - left) which can be up to 2^31.',
        complexity: {
          time: 'O(right - left)',
          space: 'O(1)',
          timeExplanation: 'One AND operation per number in the range.',
          spaceExplanation: 'Single accumulator variable.',
        },
      },
      optimized: {
        description: 'Find common binary prefix by right-shifting both until equal, then shift back. O(log n).',
        complexity: {
          time: 'O(log n)',
          space: 'O(1)',
          timeExplanation: 'At most 32 shifts for 32-bit integers.',
          spaceExplanation: 'Three variables: modified left, right, and count.',
        },
      },
      followUps: [
        'What is the bitwise OR of all numbers in a range?',
        'Can you solve it without using a shift counter? (Brian Kernighan\'s trick on right: right &= left)',
        'How does this change for a range of floating point numbers?',
      ],
      edgeCases: [
        'rangeBitwiseAnd(0, 0) → 0',
        'rangeBitwiseAnd(1, 2147483647) → 0 (range spans all values, LSB and everything else gets cleared)',
        'left == right → return left directly (no shifting needed)',
      ],
      commonMistakes: [
        'Brute forcing the loop — TLE for large ranges like [0, 2^31-1]',
        'Left-shifting more than 31 positions can cause overflow in 32-bit languages',
        'Forgetting that if left becomes 0, the result is 0 (an early exit optimization)',
      ],
      interviewerTips: [
        'Explain why the common prefix survives: any bit below the common prefix is 0 in at least one number in the range',
        'Mention the alternative: right &= (right - 1) until right <= left (Kernighan on right boundary)',
        'This problem is a good test of binary number intuition — drawing 5,6,7 in binary helps explain it',
      ],
    },
    codeChallenge: {
      functionName: 'rangeBitwiseAnd',
      starterCode: {
        javascript: `/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function rangeBitwiseAnd(left, right) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [5, 7], expected: 4, description: 'rangeBitwiseAnd(5,7) → 4' },
        { input: [0, 0], expected: 0, description: 'rangeBitwiseAnd(0,0) → 0' },
        { input: [1, 2147483647], expected: 0, description: 'rangeBitwiseAnd(1,2147483647) → 0' },
        { input: [6, 7], expected: 6, description: 'rangeBitwiseAnd(6,7) → 6 (110 & 111 = 110)' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['reverse-bits'],
    relatedPatterns: ['Common Binary Prefix', 'Range AND', 'Bit Shift'],
    intuitionSummary: 'AND of a range keeps only the common binary prefix — bits that differ across the range always AND to zero.',
    patternName: 'Common Binary Prefix via Right Shift',
  },

  // ─── 9. Pow(x, n) ────────────────────────────────────────────────────────────
  {
    id: 'pow-x-n',
    slug: 'powx-n',
    leetcodeNumber: 50,
    title: 'Pow(x, n)',
    category: 'math',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['math', 'recursion', 'divide-and-conquer'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Implement pow(x, n), which calculates x raised to the power n (x^n), efficiently — without multiplying x by itself n times.',
      engineer: 'Fast exponentiation: x^n = (x^(n/2))^2. If n is odd, multiply one extra x. If n is negative, compute 1 / x^(-n). This halves the problem each time → O(log n).',
      interview: 'Recursive: if n==0 return 1; half = pow(x, n/2); result = half*half; if n%2 != 0 result *= x; handle n<0 by using 1/x and |n|. O(log n) time.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 5, label: 'n/2' },
        { id: 'b', value: 32, label: 'half-power' },
        { id: 'c', value: 10, label: 'n=10' },
        { id: 'd', value: 1024, label: 'final result' },
      ],
      target: 37,
      instruction: 'Pow(2.0, 10): fast exponentiation halves the problem each step. What is n/2, and what does 2 raised to that half-exponent equal?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'x^n = (x^(n/2))^2. This halves the problem every step, giving O(log n) multiplications instead of O(n).', xpCost: 0 },
      { id: 2, text: 'If n is odd, you need one extra multiplication: x^n = x * (x^(n//2))^2. Check n % 2 != 0 after computing half.', xpCost: 0 },
      { id: 3, text: 'For negative n: x^n = (1/x)^(-n). Transform x = 1/x, n = -n, but watch for n = Integer.MIN_VALUE (overflow when negating). Use long or handle separately.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'myPow(2, 10). n=10, positive. No sign handling needed. Call stack begins.',
        state: { x: 2, n: 10 },
        annotation: 'n=10, even',
      },
      {
        id: 2,
        description: 'n=10 → half = myPow(2,5). n=5 → half = myPow(2,2). n=2 → half = myPow(2,1). n=1 → half = myPow(2,0) = 1. Return 1*1*2 = 2.',
        state: { call: 'myPow(2,1)', half: 1, result: 2 },
        annotation: 'Base levels resolve: pow(2,0)=1, pow(2,1)=2',
      },
      {
        id: 3,
        description: 'myPow(2,2): half=myPow(2,1)=2. n=2 even. result = 2*2 = 4.',
        state: { call: 'myPow(2,2)', half: 2, result: 4 },
        annotation: '2^2 = 4',
      },
      {
        id: 4,
        description: 'myPow(2,5): half=myPow(2,2)=4. n=5 odd. result = 4*4*2 = 32.',
        state: { call: 'myPow(2,5)', half: 4, result: 32 },
        annotation: '2^5 = 32 (4*4*2 because n is odd)',
      },
      {
        id: 5,
        description: 'myPow(2,10): half=myPow(2,5)=32. n=10 even. result = 32*32 = 1024.',
        state: { call: 'myPow(2,10)', half: 32, result: 1024 },
        annotation: 'Answer: 1024',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(log n)',
      timeExplanation: 'n is halved each recursive call — depth is log₂(n).',
      spaceExplanation: 'Recursive call stack of depth O(log n). Iterative version achieves O(1) space.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  const half = myPow(x, Math.floor(n / 2));
  if (n % 2 === 0) {
    return half * half;
  } else {
    return half * half * x;
  }
}`,
        notes: 'JavaScript numbers are 64-bit floats so integer overflow from -n is not an issue. In Java/C++ use long for n to handle Integer.MIN_VALUE.',
      },
      {
        language: 'python',
        code: `def myPow(x: float, n: int) -> float:
    if n == 0:
        return 1.0
    if n < 0:
        x = 1 / x
        n = -n
    half = myPow(x, n // 2)
    if n % 2 == 0:
        return half * half
    else:
        return half * half * x`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Multiply x by itself n times. O(n) multiplications — too slow for n up to 2^31.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'n multiplications for x^n.',
          spaceExplanation: 'Single accumulator.',
        },
      },
      optimized: {
        description: 'Fast exponentiation (exponentiation by squaring): halve n each step, square the base. O(log n) multiplications.',
        complexity: {
          time: 'O(log n)',
          space: 'O(log n) recursive / O(1) iterative',
          timeExplanation: 'n is halved log₂(n) times.',
          spaceExplanation: 'Recursive stack depth log n; iterative approach uses constant space.',
        },
      },
      followUps: [
        'Implement iteratively to achieve O(1) space (inspect bits of n from LSB to MSB).',
        'Super Pow (LC 372) — compute x^n mod 1337.',
        'How would you handle extremely large n that doesn\'t fit in a 64-bit integer?',
      ],
      edgeCases: [
        'n = 0 → 1 for any x (including x=0)',
        'n = Integer.MIN_VALUE → negating causes overflow in Java/C++; use long',
        'x = 0, n < 0 → mathematically undefined (division by zero)',
        'x = 1 or x = -1 → result is always ±1 regardless of n',
      ],
      commonMistakes: [
        'Integer overflow when negating n = Integer.MIN_VALUE (use long in Java/C++)',
        'Not handling n=0 base case (should return 1)',
        'Forgetting the extra *x multiply for odd n',
        'Using Math.round instead of Math.floor for n/2 — must floor-divide',
      ],
      interviewerTips: [
        'Ask the interviewer to confirm the constraints on n — especially whether n can be Integer.MIN_VALUE',
        'Mention the iterative version (bit-inspection of n) as a follow-up for O(1) space',
        'Trace through myPow(2,10) quickly to show halving: 10→5→2→1→0',
      ],
    },
    codeChallenge: {
      functionName: 'myPow',
      starterCode: {
        javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [2.0, 10], expected: 1024.0, description: 'myPow(2.00000, 10) → 1024.0' },
        { input: [2.0, -2], expected: 0.25, description: 'myPow(2.00000, -2) → 0.25' },
        { input: [2.1, 3], expected: 9.261000000000001, description: 'myPow(2.10000, 3) → 9.261000000000001' },
        { input: [1.0, 2147483647], expected: 1.0, description: 'myPow(1.0, 2147483647) → 1.0' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['Exponentiation by Squaring', 'Divide and Conquer', 'Recursion'],
    intuitionSummary: 'Square the result when you halve the exponent — this turns O(n) multiplications into O(log n).',
    patternName: 'Fast Exponentiation (Exponentiation by Squaring)',
  },
];

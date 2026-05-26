import type { QuestionConfig } from '@/types/question';

export const MATH_INTERVALS_COMPLETE: QuestionConfig[] = [
  // ─── 1. Palindrome Number (9) ────────────────────────────────────────────────
  {
    id: 'palindrome-number',
    slug: 'palindrome-number',
    leetcodeNumber: 9,
    title: 'Palindrome Number',
    category: 'math',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['math', 'palindrome', 'two-pointers'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Apple', 'Bloomberg', 'Adobe'],
    descriptions: {
      explorer: 'Is a number the same forwards and backwards? Negative numbers and numbers ending in 0 (except 0 itself) never are.',
      engineer: 'Reverse only the second half of the number and compare with the first half — no string conversion, no overflow risk.',
      interview: 'Early exit: negatives and non-zero multiples of 10 return false. Reverse digits until reversed >= x, then compare x === reversed or x === Math.floor(reversed/10) for odd-length numbers.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 1, label: 'first digit: 1'},
        {id: 'b', value: 1, label: 'last digit: 1 (equal → palindrome)'},
        {id: 'c', value: 2, label: 'middle digit: 2'},
        {id: 'd', value: 0, label: 'not a palindrome'},
      ],
      target: 2,
      instruction: '121: a palindrome reads the same forwards and backwards. Select the FIRST and LAST digits (both equal 1).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Negative numbers are never palindromes. Numbers ending in 0 (except 0 itself) are never palindromes — a leading 0 would be invalid.', xpCost: 0 },
      { id: 2, text: 'Reverse digits of x one by one into "reversed". Stop when reversed >= x. You have consumed exactly the second half.', xpCost: 0 },
      { id: 3, text: 'For even-length numbers compare x === reversed. For odd-length, the middle digit is in reversed, so compare x === Math.floor(reversed / 10).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'x=121. x > 0 and x % 10 !== 0 (ends in 1), so continue. Initialize reversed=0.',
        state: { x: 121, reversed: 0 },
        annotation: 'Passes early-exit checks',
      },
      {
        id: 2,
        description: 'reversed < x (0 < 121). Pop last digit: digit=121%10=1. reversed=0*10+1=1. x=Math.floor(121/10)=12.',
        state: { x: 12, reversed: 1 },
        highlight: [0],
        annotation: 'First digit moved: reversed=1, x=12',
      },
      {
        id: 3,
        description: 'reversed < x (1 < 12). Pop last digit: digit=12%10=2. reversed=1*10+2=12. x=Math.floor(12/10)=1.',
        state: { x: 1, reversed: 12 },
        highlight: [1],
        annotation: 'Second digit moved: reversed=12, x=1',
      },
      {
        id: 4,
        description: 'reversed >= x (12 >= 1). Stop loop. 121 has odd length: check x === Math.floor(reversed/10) → 1 === Math.floor(12/10) → 1 === 1. True!',
        state: { x: 1, reversed: 12, check: '1 === floor(12/10) → 1 === 1', result: true },
        annotation: 'Middle digit discarded; palindrome confirmed',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'We process only half the digits; the number of digits is log₁₀(n).',
      spaceExplanation: 'Only two integer variables — no auxiliary data structures.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  // Negative numbers and non-zero multiples of 10 can never be palindromes
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let reversed = 0;
  while (reversed < x) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // Even length: x === reversed
  // Odd length: middle digit is in reversed; discard it
  return x === reversed || x === Math.floor(reversed / 10);
}`,
        notes: 'Avoids string conversion entirely. Reversing only the second half prevents integer overflow.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Convert the number to a string and use a two-pointer approach to compare characters from both ends.',
        complexity: {
          time: 'O(log n)',
          space: 'O(log n)',
          timeExplanation: 'String has O(log n) characters; two-pointer scan is linear over that.',
          spaceExplanation: 'String representation uses O(log n) space.',
          visualization: 'logarithmic',
        },
      },
      optimized: {
        description: 'Reverse only the second half of the integer. Compare first half with reversed second half without any string conversion.',
        complexity: {
          time: 'O(log n)',
          space: 'O(1)',
          timeExplanation: 'Half the digits are processed; digit count is log₁₀(n).',
          spaceExplanation: 'Constant extra variables only.',
          visualization: 'logarithmic',
        },
      },
      followUps: [
        'What if you could not convert the number to a string?',
        'How would you check if a linked list is a palindrome?',
        'Palindrome check for very large numbers stored as strings?',
      ],
      edgeCases: [
        'x=0 → true (single digit zero is a palindrome)',
        'x < 0 → always false',
        'x ending in 0 (e.g., 10, 100) → false unless x=0',
        'Single digit 1–9 → all true',
      ],
      commonMistakes: [
        'Forgetting the special case x=0 when excluding multiples of 10',
        'Comparing x === reversed instead of also checking x === Math.floor(reversed/10) for odd-length numbers',
        'Reversing the full number and risking integer overflow',
      ],
      interviewerTips: [
        'Ask up front: "Can I convert to a string?" — the optimal solution avoids it',
        'Explain why reversing only half is sufficient and avoids overflow',
        'Enumerate early-exit conditions before the main loop',
      ],
    },
    codeChallenge: {
      functionName: 'isPalindrome',
      starterCode: {
        javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [121], expected: true, description: '121 is a palindrome' },
        { input: [-121], expected: false, description: 'Negative number → false' },
        { input: [10], expected: false, description: 'Ends in 0 but is not 0 → false' },
        { input: [0], expected: true, description: '0 is a palindrome' },
        { input: [1221], expected: true, description: '1221 — even-length palindrome' },
      ],
    },
    xpRewards: { puzzle: 50, hints: 20, dryRun: 30, code: 40, coding: 80 },
    prerequisites: [],
    relatedPatterns: ['Two Pointers', 'Math', 'Digit Reversal'],
    intuitionSummary: 'Reversing only the second half of the number lets you compare halves directly without overflow or string conversion.',
    patternName: 'Half-Reversal Palindrome Check',
  },

  // ─── 2. Plus One (66) ───────────────────────────────────────────────────────
  {
    id: 'plus-one',
    slug: 'plus-one',
    leetcodeNumber: 66,
    title: 'Plus One',
    category: 'math',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['math', 'array', 'digit-manipulation'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Apple', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'A large integer is stored as an array of digits. Add one to it. The tricky part: what happens when every digit is 9?',
      engineer: 'Iterate from the last digit backwards. If a digit is less than 9, increment it and return. Otherwise set it to 0 and carry the 1. If you exit the loop, all digits were 9 — prepend a 1.',
      interview: 'O(n) scan from right. Increment digit if < 9, return immediately. Set to 0 if 9 (carry). If loop finishes, unshift 1. Classic carry propagation.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 1, label: 'hundreds: 1 (unchanged)'},
        {id: 'b', value: 3, label: 'tens: 2+1=3 (carry from 9)'},
        {id: 'c', value: 0, label: 'units: 9+1=10, carry over → 0'},
        {id: 'd', value: 130, label: 'result: 130'},
      ],
      target: 4,
      instruction: '[1,2,9] + 1 = [1,3,0]: 9+1=10 carries into tens place. Select the unchanged hundreds digit and the new tens digit.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Start from the last index. If digits[i] < 9, just increment it and return — no carry needed.', xpCost: 0 },
      { id: 2, text: 'If digits[i] === 9, set it to 0 and continue the loop leftward. This propagates the carry.', xpCost: 0 },
      { id: 3, text: 'If you finish the loop without returning, all digits were 9 (e.g., [9,9,9]). Prepend 1: return [1, ...digits] or unshift(1).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'digits=[1,2,3]. Start at i=2 (last index). digits[2]=3 < 9.',
        state: { digits: [1, 2, 3], i: 2 },
        highlight: [2],
        annotation: 'Last digit is < 9 — no carry',
      },
      {
        id: 2,
        description: 'digits[2]++ → digits[2]=4. Return immediately.',
        state: { digits: [1, 2, 4], result: [1, 2, 4] },
        highlight: [2],
        annotation: 'Increment and return [1,2,4]',
      },
      {
        id: 3,
        description: 'Bonus trace — digits=[9,9,9]. i=2: digits[2]=9 → set to 0, continue. i=1: digits[1]=9 → set to 0, continue. i=0: digits[0]=9 → set to 0, continue.',
        state: { digits: [0, 0, 0], i: -1 },
        highlight: [0, 1, 2],
        annotation: 'All 9s become 0s — need to prepend 1',
      },
      {
        id: 4,
        description: 'Loop exhausted without returning. All were 9s. Prepend 1: result=[1,0,0,0].',
        state: { digits: [1, 0, 0, 0], result: [1, 0, 0, 0] },
        annotation: 'Prepend 1 — the number grew one digit',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single right-to-left pass over the digits array; at most n iterations.',
      spaceExplanation: 'Mutates in place. The all-9s edge case creates one extra element — considered O(1) extra space.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0; // carry
  }
  // All digits were 9 — need an extra leading 1
  digits.unshift(1);
  return digits;
}`,
        notes: 'In-place mutation. The unshift handles the all-9s overflow case cleanly.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Convert the digit array to a BigInt (or string), add 1, convert back to array. Works but uses extra memory and is slower.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'String conversion and splitting are both O(n).',
          spaceExplanation: 'O(n) for the intermediate string.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Iterate from right to left: increment if < 9 and return; set to 0 and continue otherwise. Prepend 1 if the loop completes.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'Single pass; most cases exit early after one step.',
          spaceExplanation: 'Mutates in place; no auxiliary array needed.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Add K instead of 1 — generalize to arbitrary carry propagation',
        'What if the digits were stored in reverse (least-significant first)?',
        'LC 2 — Add Two Numbers represented as linked lists',
      ],
      edgeCases: [
        '[9] → [1,0]',
        '[9,9,9] → [1,0,0,0]',
        '[0] → [1]',
        'Single non-9 digit → immediate increment',
      ],
      commonMistakes: [
        'Forgetting to handle the all-9s case after the loop',
        'Using push(1) instead of unshift(1) — push appends to the end',
        'Converting to a number — large digit arrays overflow Number.MAX_SAFE_INTEGER',
      ],
      interviewerTips: [
        'Confirm the all-9s edge case is handled — it is the only O(n) case',
        'Mention that most real inputs exit after the first iteration',
        'Ask if in-place mutation is acceptable before modifying the input array',
      ],
    },
    codeChallenge: {
      functionName: 'plusOne',
      starterCode: {
        javascript: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOne(digits) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3]], expected: [1, 2, 4], description: '[1,2,3]+1 → [1,2,4]' },
        { input: [[9, 9, 9]], expected: [1, 0, 0, 0], description: 'All 9s overflow → [1,0,0,0]' },
        { input: [[4, 3, 2, 1]], expected: [4, 3, 2, 2], description: '[4,3,2,1]+1 → [4,3,2,2]' },
        { input: [[9]], expected: [1, 0], description: '[9]+1 → [1,0]' },
      ],
    },
    xpRewards: { puzzle: 50, hints: 20, dryRun: 30, code: 40, coding: 80 },
    prerequisites: [],
    relatedPatterns: ['Carry Propagation', 'Array In-place Mutation'],
    intuitionSummary: 'Scan from the end: a non-9 digit absorbs the carry immediately; a 9 becomes 0 and passes the carry left. Only all-9s inputs need a new leading digit.',
    patternName: 'Right-to-Left Carry Propagation',
  },

  // ─── 3. Factorial Trailing Zeroes (172) ─────────────────────────────────────
  {
    id: 'factorial-trailing-zeroes',
    slug: 'factorial-trailing-zeroes',
    leetcodeNumber: 172,
    title: 'Factorial Trailing Zeroes',
    category: 'math',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['math', 'factorial', 'counting'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Bloomberg', 'Apple', 'Microsoft'],
    descriptions: {
      explorer: 'Trailing zeroes in n! come from factors of 10 = 2×5. There are always more 2s than 5s, so just count factors of 5 in 1…n.',
      engineer: 'Sum floor(n/5) + floor(n/25) + floor(n/125) + … until the term is 0. Each term counts multiples of 5^k that contribute an extra factor of 5.',
      interview: 'O(log n) time. Count = sum of floor(n / 5^k) for k=1,2,3,… Each power of 5 contributes additional factors. No need to compute n! itself.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 5, label: 'floor(25/5)=5: factors of 5'},
        {id: 'b', value: 1, label: 'floor(25/25)=1: factors of 25'},
        {id: 'c', value: 6, label: 'total trailing zeros: 6'},
        {id: 'd', value: 2, label: 'floor(25/125)=0... wrong'},
      ],
      target: 6,
      instruction: 'n=25: trailing zeros = count of factor 5s. floor(25/5)+floor(25/25) = 5+1 = 6. Select these two counts.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'A trailing zero requires one factor of 2 and one factor of 5. Since factors of 2 are plentiful, just count factors of 5 in 1…n.', xpCost: 0 },
      { id: 2, text: 'floor(n/5) counts multiples of 5. But 25 contributes two 5s, 125 contributes three, etc. Divide by 5 repeatedly until the quotient is 0.', xpCost: 0 },
      { id: 3, text: 'Algorithm: count=0; while n > 0: n = floor(n/5); count += n. Return count.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=30. Count trailing zeroes in 30!. We need factors of 5 in 1…30. Initialize count=0.',
        state: { n: 30, count: 0 },
        annotation: 'Trailing zeroes = factors of 5 in n!',
      },
      {
        id: 2,
        description: 'n = floor(30/5) = 6. count += 6 → count=6. This accounts for multiples of 5: 5,10,15,20,25,30.',
        state: { n: 6, count: 6 },
        annotation: '6 multiples of 5 in 1..30',
      },
      {
        id: 3,
        description: 'n = floor(6/5) = 1. count += 1 → count=7. This accounts for the extra 5 in 25 (= 5²).',
        state: { n: 1, count: 7 },
        annotation: '25 contributes a second factor of 5',
      },
      {
        id: 4,
        description: 'n = floor(1/5) = 0. Loop ends. Return count=7.',
        state: { n: 0, count: 7, result: 7 },
        annotation: '30! has 7 trailing zeroes',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'We divide n by 5 repeatedly; the loop runs log₅(n) times.',
      spaceExplanation: 'Only two integer variables regardless of n.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n) {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}`,
        notes: 'No need to compute n! — only the count of factors of 5 matters.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Compute n! and count trailing zeroes by dividing by 10 until the number is not divisible. Infeasible for large n due to astronomical number size.',
        complexity: {
          time: 'O(n)',
          space: 'O(n digits)',
          timeExplanation: 'Computing n! requires n multiplications; the number grows to n*log(n) digits.',
          spaceExplanation: 'Storing n! requires O(n log n) bits.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Mathematical insight: count factors of 5 using sum of floor(n/5^k). Each division step handles powers of 5 contributing extra factors.',
        complexity: {
          time: 'O(log n)',
          space: 'O(1)',
          timeExplanation: 'Dividing by 5 each iteration means log₅(n) iterations total.',
          spaceExplanation: 'Constant space — two integer variables.',
          visualization: 'logarithmic',
        },
      },
      followUps: [
        'How many trailing zeroes in n! in base 7 instead of base 10?',
        'Count factors of a prime p in n! — generalize to any prime.',
        'How many digits does n! have? (use Stirling\'s approximation or Legendre\'s formula)',
      ],
      edgeCases: [
        'n=0 → 0 (0! = 1, no trailing zeroes)',
        'n=4 → 0 (no factor of 5 in 1..4)',
        'n=25 → 6 (25 contributes two factors of 5)',
        'n=125 → 31 (125 contributes three factors of 5)',
      ],
      commonMistakes: [
        'Counting only floor(n/5) and forgetting higher powers (25, 125, …)',
        'Trying to compute n! directly — overflows for n > ~170',
        'Counting factors of 2 instead of (or in addition to) factors of 5',
      ],
      interviewerTips: [
        'Ask the candidate why we count 5s and not 2s',
        'Check if they handle n=25 correctly — the classic "extra 5" case',
        'The iterative loop is cleaner than computing 5^k explicitly',
      ],
    },
    codeChallenge: {
      functionName: 'trailingZeroes',
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [5], expected: 1, description: '5! = 120 → 1 trailing zero' },
        { input: [30], expected: 7, description: '30! has 7 trailing zeroes' },
        { input: [0], expected: 0, description: '0! = 1 → 0 trailing zeroes' },
        { input: [25], expected: 6, description: '25 contributes two factors of 5 → 6' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 20, dryRun: 40, code: 60, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Prime Factorization', 'Legendre\'s Formula', 'Math Counting'],
    intuitionSummary: 'Every trailing zero needs a 5×2 pair. Since 2s are abundant, count only the 5s. Multiples of 25, 125, … each contribute extra 5s, so divide n by 5 repeatedly.',
    patternName: 'Factor of 5 Counting',
  },

  // ─── 4. Sqrt(x) (69) ────────────────────────────────────────────────────────
  {
    id: 'sqrt-x',
    slug: 'sqrtx',
    leetcodeNumber: 69,
    title: 'Sqrt(x)',
    category: 'math',
    difficulty: 'easy',
    engineType: 'search',
    tags: ['math', 'binary-search'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Bloomberg', 'Apple', 'Facebook'],
    descriptions: {
      explorer: 'Find the integer square root of x — the largest integer m such that m*m ≤ x. No floating point needed!',
      engineer: 'Binary search on the answer space [0, x]. Find the largest m where m*m ≤ x. Maintain a "result" variable updated whenever mid*mid ≤ x.',
      interview: 'Binary search: lo=0, hi=x. While lo<=hi: mid=(lo+hi)>>1. If mid*mid<=x, result=mid, lo=mid+1. Else hi=mid-1. Return result. O(log x) time, O(1) space.',
    },
    puzzleConfig: {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      target: 3,
      instruction: 'Sqrt(9)=3. Use binary search on [1..9] to find the integer square root of 9.',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'The answer lies in [0, x]. Use binary search: mid = Math.floor((lo + hi) / 2).', xpCost: 0 },
      { id: 2, text: 'If mid*mid <= x, mid is a valid candidate — save it as the current best and search right (lo = mid+1).', xpCost: 0 },
      { id: 3, text: 'If mid*mid > x, mid is too large — search left (hi = mid-1). Return result when lo > hi.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'x=8. Binary search in [0, 8]. result=0. lo=0, hi=8.',
        state: { x: 8, lo: 0, hi: 8, result: 0 },
        annotation: 'Initial search space',
      },
      {
        id: 2,
        description: 'mid=4. 4*4=16 > 8 → too large. hi=mid-1=3.',
        state: { x: 8, lo: 0, hi: 3, mid: 4, result: 0 },
        highlight: [4],
        annotation: '16 > 8, search left half',
      },
      {
        id: 3,
        description: 'mid=1. 1*1=1 <= 8 → valid candidate. result=1. lo=mid+1=2.',
        state: { x: 8, lo: 2, hi: 3, mid: 1, result: 1 },
        highlight: [1],
        annotation: 'result=1, search right',
      },
      {
        id: 4,
        description: 'mid=2. 2*2=4 <= 8 → valid candidate. result=2. lo=mid+1=3.',
        state: { x: 8, lo: 3, hi: 3, mid: 2, result: 2 },
        highlight: [2],
        annotation: 'result=2, search right',
      },
      {
        id: 5,
        description: 'mid=3. 3*3=9 > 8 → too large. hi=mid-1=2. lo(3) > hi(2). Loop ends.',
        state: { x: 8, lo: 3, hi: 2, mid: 3, result: 2 },
        highlight: [3],
        annotation: 'Loop ends — return result=2',
      },
    ],
    complexity: {
      time: 'O(log x)',
      space: 'O(1)',
      timeExplanation: 'Binary search halves the search space each iteration; loop runs O(log x) times.',
      spaceExplanation: 'Only lo, hi, mid, result variables — constant space.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number} x
 * @return {number}
 */
function mySqrt(x) {
  if (x < 2) return x; // 0 → 0, 1 → 1

  let lo = 1, hi = Math.floor(x / 2), result = 0;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const sq = mid * mid;
    if (sq === x) return mid;
    if (sq < x) {
      result = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}`,
        notes: 'Upper bound hi=x/2 (safe since sqrt(x) <= x/2 for x >= 4). mid*mid could overflow 32-bit int for huge x but is fine in JS (IEEE 754 double).',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan from 0 upward: return i-1 when i*i > x. O(sqrt(x)) time.',
        complexity: {
          time: 'O(sqrt(x))',
          space: 'O(1)',
          timeExplanation: 'Iterates from 0 up to sqrt(x).',
          spaceExplanation: 'Single loop variable.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Binary search on [0, x/2]. Track the last valid mid where mid*mid <= x.',
        complexity: {
          time: 'O(log x)',
          space: 'O(1)',
          timeExplanation: 'Search space halves every iteration.',
          spaceExplanation: 'Constant extra variables.',
          visualization: 'logarithmic',
        },
      },
      followUps: [
        'Newton\'s method: x_{n+1} = (x_n + x/x_n) / 2 — converges in O(log log x) iterations',
        'What about computing sqrt to a certain decimal precision?',
        'LC 367 — Valid Perfect Square (is sqrt(num) exactly an integer?)',
      ],
      edgeCases: [
        'x=0 → 0',
        'x=1 → 1',
        'x=2 → 1 (floor of 1.41…)',
        'x=2147395599 → 46339 (near INT_MAX)',
      ],
      commonMistakes: [
        'Off-by-one: not saving result when mid*mid < x and blindly returning mid',
        'Overflow: mid*mid can overflow 32-bit int — use BigInt or (hi = x/2) in other languages',
        'Wrong initial hi: hi=x instead of hi=x/2 wastes an early iteration',
      ],
      interviewerTips: [
        'Ask if Newton\'s method is acceptable — shows mathematical depth',
        'Verify the candidate handles x=0 and x=1 without entering the loop',
        'Check they understand why hi=x/2 is a valid upper bound',
      ],
    },
    codeChallenge: {
      functionName: 'mySqrt',
      starterCode: {
        javascript: `/**
 * @param {number} x
 * @return {number}
 */
function mySqrt(x) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [4], expected: 2, description: 'sqrt(4) = 2' },
        { input: [8], expected: 2, description: 'sqrt(8) = 2 (floor)' },
        { input: [0], expected: 0, description: 'sqrt(0) = 0' },
        { input: [1], expected: 1, description: 'sqrt(1) = 1' },
        { input: [2147395599], expected: 46339, description: 'Large input near INT_MAX' },
      ],
    },
    xpRewards: { puzzle: 50, hints: 20, dryRun: 30, code: 40, coding: 80 },
    prerequisites: ['binary-search'],
    relatedPatterns: ['Binary Search on Answer', 'Math', "Newton's Method"],
    intuitionSummary: 'Binary search on the answer space [0, x]: always keep track of the last valid mid where mid*mid ≤ x — that is the floor of the square root.',
    patternName: 'Binary Search on Answer Space',
  },

  // ─── 5. Roman to Integer (13) ───────────────────────────────────────────────
  {
    id: 'roman-to-integer',
    slug: 'roman-to-integer',
    leetcodeNumber: 13,
    title: 'Roman to Integer',
    category: 'math',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['math', 'hash-table', 'string'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Roman numerals usually add up their values left to right. But when a smaller value precedes a larger one (IV, IX, XC…) you subtract instead of add!',
      engineer: 'Build a symbol→value map. Scan left to right. If the current symbol\'s value is less than the next symbol\'s value, subtract; otherwise add.',
      interview: 'O(n) single pass. Map: I=1 V=5 X=10 L=50 C=100 D=500 M=1000. For each char i, if val[i] < val[i+1] subtract val[i], else add val[i].',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 50, label: 'L=50'},
        {id: 'b', value: 8, label: 'VIII=5+3=8'},
        {id: 'c', value: 5, label: 'V=5'},
        {id: 'd', value: 58, label: 'total=58'},
      ],
      target: 58,
      instruction: '"LVIII": L=50, VIII=8. Select these two components that sum to 58.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Create a map: {I:1, V:5, X:10, L:50, C:100, D:500, M:1000}.', xpCost: 0 },
      { id: 2, text: 'Iterate over the string. If the current symbol\'s value is strictly less than the next symbol\'s value, subtract the current value from the total.', xpCost: 0 },
      { id: 3, text: 'Otherwise add the current value. The last character always adds. Sum everything up and return.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: "MCMXCIV". Map: I=1 V=5 X=10 L=50 C=100 D=500 M=1000. result=0.',
        state: { s: 'MCMXCIV', result: 0, i: 0 },
        annotation: 'Start scan',
      },
      {
        id: 2,
        description: 'i=0 M(1000): next is C(100). 1000 >= 100 → add. result=1000.',
        state: { s: 'MCMXCIV', result: 1000, i: 0, curr: 'M', currVal: 1000, nextVal: 100 },
        highlight: [0],
        annotation: 'M → +1000',
      },
      {
        id: 3,
        description: 'i=1 C(100): next is M(1000). 100 < 1000 → subtract. result=1000-100=900.',
        state: { s: 'MCMXCIV', result: 900, i: 1, curr: 'C', currVal: 100, nextVal: 1000 },
        highlight: [1],
        annotation: 'CM = 900 (subtraction rule)',
      },
      {
        id: 4,
        description: 'i=2 M(1000): next is X(10). 1000 >= 10 → add. result=900+1000=1900.',
        state: { s: 'MCMXCIV', result: 1900, i: 2, curr: 'M', currVal: 1000, nextVal: 10 },
        highlight: [2],
        annotation: 'M → +1000',
      },
      {
        id: 5,
        description: 'i=3 X(10): next is C(100). 10 < 100 → subtract. result=1900-10=1890.',
        state: { s: 'MCMXCIV', result: 1890, i: 3, curr: 'X', currVal: 10, nextVal: 100 },
        highlight: [3],
        annotation: 'XC = 90 (subtraction rule)',
      },
      {
        id: 6,
        description: 'i=4 C(100): next is I(1). 100 >= 1 → add. result=1890+100=1990.',
        state: { s: 'MCMXCIV', result: 1990, i: 4, curr: 'C', currVal: 100, nextVal: 1 },
        highlight: [4],
        annotation: 'C → +100',
      },
      {
        id: 7,
        description: 'i=5 I(1): next is V(5). 1 < 5 → subtract. result=1990-1=1989.',
        state: { s: 'MCMXCIV', result: 1989, i: 5, curr: 'I', currVal: 1, nextVal: 5 },
        highlight: [5],
        annotation: 'IV = 4 (subtraction rule)',
      },
      {
        id: 8,
        description: 'i=6 V(5): last character → always add. result=1989+5=1994. Return 1994.',
        state: { s: 'MCMXCIV', result: 1994, i: 6, curr: 'V', currVal: 5 },
        highlight: [6],
        annotation: 'Final answer: 1994',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single left-to-right pass over the string of length n (at most 15 chars for valid roman numerals, so effectively O(1)).',
      spaceExplanation: 'Fixed-size symbol map (7 entries) and a single accumulator.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const curr = val[s[i]];
    const next = val[s[i + 1]] ?? 0;
    if (curr < next) {
      result -= curr;
    } else {
      result += curr;
    }
  }

  return result;
}`,
        notes: 'The nullish coalescing ?? 0 handles the last character safely without a bounds check.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same single-pass approach — there is no meaningful brute force that is different since the problem has a natural O(n) solution.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'Single pass over up to 15 characters.',
          spaceExplanation: 'Constant map of 7 symbols.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Left-to-right scan: subtract current value when smaller than next, add otherwise. Single pass, O(1) space.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'One pass; roman numerals have bounded length (≤ 15).',
          spaceExplanation: 'Fixed 7-entry map plus one accumulator.',
          visualization: 'linear',
        },
      },
      followUps: [
        'LC 12 — Integer to Roman (reverse direction)',
        'Validate whether a string is a valid roman numeral',
        'Extend to roman numeral arithmetic (addition, subtraction)',
      ],
      edgeCases: [
        '"I" → 1 (single character)',
        '"IV" → 4 (classic subtraction)',
        '"IX" → 9',
        '"MCMXCIV" → 1994 (multiple subtractions)',
        '"III" → 3 (simple addition only)',
      ],
      commonMistakes: [
        'Checking current vs previous instead of current vs next — gives wrong subtraction logic',
        'Out-of-bounds access on the last character — use ?? 0 or i+1 < length guard',
        'Building a map of two-character subtractive pairs — works but is more verbose',
      ],
      interviewerTips: [
        'The cleaner insight is comparing adjacent characters, not hardcoding "IV", "IX", etc.',
        'Point out the problem has a natural O(n) solution — no optimization needed',
        'Ask if the candidate can name all 6 subtractive cases',
      ],
    },
    codeChallenge: {
      functionName: 'romanToInt',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['III'], expected: 3, description: '"III" → 3' },
        { input: ['MCMXCIV'], expected: 1994, description: '"MCMXCIV" → 1994' },
        { input: ['LVIII'], expected: 58, description: '"LVIII" → 58' },
        { input: ['IV'], expected: 4, description: '"IV" → 4 (subtraction)' },
        { input: ['IX'], expected: 9, description: '"IX" → 9 (subtraction)' },
      ],
    },
    xpRewards: { puzzle: 50, hints: 20, dryRun: 30, code: 40, coding: 80 },
    prerequisites: [],
    relatedPatterns: ['Hash Map', 'String Scanning', 'Greedy'],
    intuitionSummary: 'Roman numerals are additive except when a smaller symbol precedes a larger one. One left-to-right pass with a next-character lookahead handles all cases.',
    patternName: 'Adjacent Comparison Scan',
  },

  // ─── 6. Integer to Roman (12) ───────────────────────────────────────────────
  {
    id: 'integer-to-roman',
    slug: 'integer-to-roman',
    leetcodeNumber: 12,
    title: 'Integer to Roman',
    category: 'math',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['math', 'string', 'greedy'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Bloomberg', 'Google', 'Apple', 'Microsoft'],
    descriptions: {
      explorer: 'Convert a number to its Roman numeral form. The greedy trick: always use the largest symbol that fits, including the special subtractive pairs like CM, XC, IV.',
      engineer: 'Build a descending list of (value, symbol) pairs including all 13 combinations. Greedily subtract the largest fitting value and append its symbol.',
      interview: 'Greedy O(1): fixed table of 13 (value, symbol) pairs in descending order. While num > 0: find largest value <= num, append symbol, subtract value.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 50, label: '50 → L'},
        {id: 'b', value: 5, label: '5 → V'},
        {id: 'c', value: 3, label: '3 → III'},
        {id: 'd', value: 8, label: '8 → VIII'},
      ],
      target: 55,
      instruction: '58 → "LVIII": select the FIRST two numeral components: L(50) and V(5).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Build a table of 13 pairs in descending order: (1000,M),(900,CM),(500,D),(400,CD),(100,C),(90,XC),(50,L),(40,XL),(10,X),(9,IX),(5,V),(4,IV),(1,I).', xpCost: 0 },
      { id: 2, text: 'Iterate over the table. While num >= value, append symbol to result and subtract value from num.', xpCost: 0 },
      { id: 3, text: 'The inner while loop handles repeated symbols (e.g., 3000 → "MMM"). Move to the next table entry when num < current value.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'num=1994. Check 1000 (M): 1994 >= 1000 → append "M", num=994.',
        state: { num: 994, result: 'M' },
        annotation: 'M fits once',
      },
      {
        id: 2,
        description: 'num=994. Check 900 (CM): 994 >= 900 → append "CM", num=94.',
        state: { num: 94, result: 'MCM' },
        annotation: 'CM fits once (subtractive pair)',
      },
      {
        id: 3,
        description: 'num=94. Check 500,400,100 — all > 94. Check 90 (XC): 94 >= 90 → append "XC", num=4.',
        state: { num: 4, result: 'MCMXC' },
        annotation: 'XC fits once',
      },
      {
        id: 4,
        description: 'num=4. Check 50,40,10,9,5 — all > 4. Check 4 (IV): 4 >= 4 → append "IV", num=0.',
        state: { num: 0, result: 'MCMXCIV' },
        annotation: 'IV fits once',
      },
      {
        id: 5,
        description: 'num=0. Loop ends. Return "MCMXCIV".',
        state: { num: 0, result: 'MCMXCIV', answer: 'MCMXCIV' },
        annotation: 'Final answer: MCMXCIV',
      },
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'The table has exactly 13 entries; the input is bounded (1–3999), so the total iterations are bounded by a constant.',
      spaceExplanation: 'Fixed-size lookup table and result string of at most 15 characters.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number} num
 * @return {string}
 */
function intToRoman(num) {
  const table = [
    [1000, 'M'],  [900, 'CM'], [500, 'D'],  [400, 'CD'],
    [100,  'C'],  [90,  'XC'], [50,  'L'],  [40,  'XL'],
    [10,   'X'],  [9,   'IX'], [5,   'V'],  [4,   'IV'],
    [1,    'I'],
  ];

  let result = '';
  for (const [value, symbol] of table) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}`,
        notes: 'Including all 13 pairs (6 additive + 6 subtractive + M) makes the greedy work without any special-case logic.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same greedy approach — the problem has a natural O(1) greedy solution because the input domain is bounded (1–3999).',
        complexity: {
          time: 'O(1)',
          space: 'O(1)',
          timeExplanation: 'Bounded input → bounded iterations.',
          spaceExplanation: 'Fixed-size table and output string.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Greedy descent through a 13-entry descending table including all subtractive pairs. Inner while loop appends repeated symbols.',
        complexity: {
          time: 'O(1)',
          space: 'O(1)',
          timeExplanation: 'At most 15 symbols in any valid roman numeral (e.g., 3888 = "MMMDCCCLXXXVIII").',
          spaceExplanation: 'Constant-size lookup table.',
          visualization: 'linear',
        },
      },
      followUps: [
        'LC 13 — Roman to Integer (reverse direction)',
        'Extend to roman numeral system beyond 3999',
        'What if only the 7 standard symbols were in the table (no subtractive pairs)? How would the logic change?',
      ],
      edgeCases: [
        '1 → "I"',
        '4 → "IV" (not "IIII")',
        '9 → "IX"',
        '3999 → "MMMCMXCIX" (max value)',
        '3 → "III" (repeated symbol)',
      ],
      commonMistakes: [
        'Forgetting to include the 6 subtractive pairs in the table',
        'Using a simple 7-symbol map and trying to handle subtractions manually — messier',
        'Off-by-one: using > instead of >= in the while condition',
      ],
      interviewerTips: [
        'Ask why all 13 pairs are included — the insight is that subtractive pairs are just values like any other',
        'The inner while loop elegantly handles repeated symbols without needing an outer for-loop counter',
        'Check if the candidate knows the input is bounded to 1–3999',
      ],
    },
    codeChallenge: {
      functionName: 'intToRoman',
      starterCode: {
        javascript: `/**
 * @param {number} num
 * @return {string}
 */
function intToRoman(num) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [3], expected: 'III', description: '3 → "III"' },
        { input: [1994], expected: 'MCMXCIV', description: '1994 → "MCMXCIV"' },
        { input: [58], expected: 'LVIII', description: '58 → "LVIII"' },
        { input: [9], expected: 'IX', description: '9 → "IX"' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 20, dryRun: 40, code: 60, coding: 100 },
    prerequisites: ['roman-to-integer'],
    relatedPatterns: ['Greedy', 'Lookup Table', 'String Building'],
    intuitionSummary: 'Include all 13 value-symbol pairs (including subtractive ones) in descending order, then greedily subtract the largest fitting value and append its symbol.',
    patternName: 'Greedy Lookup Table',
  },

  // ─── 7. Insert Interval (57) ────────────────────────────────────────────────
  {
    id: 'insert-interval',
    slug: 'insert-interval',
    leetcodeNumber: 57,
    title: 'Insert Interval',
    category: 'intervals',
    difficulty: 'medium',
    engineType: 'timeline',
    tags: ['intervals', 'array', 'greedy'],
    questionSets: ['blind75', 'top150'],
    companies: ['Google', 'Amazon', 'Facebook', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'You have a sorted list of non-overlapping intervals. Insert a new interval and merge any overlapping ones to keep the list non-overlapping.',
      engineer: 'Three-phase scan: (1) add all intervals that end before newInterval starts; (2) merge all overlapping intervals into newInterval; (3) add remaining intervals.',
      interview: 'O(n). Phase 1: while intervals[i].end < newInterval.start, push. Phase 2: while intervals[i].start <= newInterval.end, expand newInterval. Push. Phase 3: push rest.',
    },
    puzzleConfig: {
      intervals: [
        {id: 'a', start: 1, end: 3, label: '[1,3]'},
        {id: 'b', start: 2, end: 5, label: '[2,5] NEW'},
        {id: 'c', start: 6, end: 9, label: '[6,9]'},
      ],
      instruction: 'Insert [2,5] into [[1,3],[6,9]]. Merge overlapping intervals.',
      mode: 'merge',
      correctAnswer: [[1, 5], [6, 9]],
    },
    hints: [
      { id: 1, text: 'Phase 1: while the current interval ends before the new interval starts (intervals[i][1] < newInterval[0]), add it to result unchanged.', xpCost: 0 },
      { id: 2, text: 'Phase 2: while the current interval starts before or when the new interval ends (intervals[i][0] <= newInterval[1]), merge by expanding newInterval: take min of starts, max of ends.', xpCost: 0 },
      { id: 3, text: 'After phase 2, push the merged newInterval. Phase 3: append all remaining intervals unchanged.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'intervals=[[1,3],[6,9]], newInterval=[2,5]. i=0. Phase 1: does [1,3] end before 2 starts? 3 < 2? No. Skip to phase 2.',
        state: { intervals: [[1,3],[6,9]], newInterval: [2,5], result: [], i: 0, phase: 1 },
        annotation: '[1,3] overlaps with [2,5] — skip phase 1',
      },
      {
        id: 2,
        description: 'Phase 2: i=0. Does [1,3] start before 5 ends? 1 <= 5? Yes. Merge: newInterval=[min(2,1), max(5,3)]=[1,5]. i=1.',
        state: { intervals: [[1,3],[6,9]], newInterval: [1,5], result: [], i: 1, phase: 2 },
        highlight: [0],
        annotation: 'Merge [1,3] into new interval → [1,5]',
      },
      {
        id: 3,
        description: 'Phase 2: i=1. Does [6,9] start before 5 ends? 6 <= 5? No. Exit phase 2. Push merged interval [1,5].',
        state: { intervals: [[1,3],[6,9]], newInterval: [1,5], result: [[1,5]], i: 1, phase: 2 },
        annotation: '[6,9] does not overlap — push [1,5]',
      },
      {
        id: 4,
        description: 'Phase 3: i=1. Push [6,9]. i=2. Loop ends.',
        state: { intervals: [[1,3],[6,9]], newInterval: [1,5], result: [[1,5],[6,9]], i: 2, phase: 3 },
        highlight: [1],
        annotation: 'Append remaining: [6,9]',
      },
      {
        id: 5,
        description: 'Return [[1,5],[6,9]].',
        state: { result: [[1,5],[6,9]], answer: [[1,5],[6,9]] },
        annotation: 'Final merged intervals',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Each interval is visited exactly once across the three phases.',
      spaceExplanation: 'Output array holds at most n+1 intervals.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // Phase 1: add all intervals that come before newInterval
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Phase 2: merge all overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Phase 3: add all remaining intervals
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}`,
        notes: 'Three clean phases. Phase 2 merges by expanding newInterval in-place — no extra variables needed.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Insert the new interval into the sorted array, then run the standard merge-intervals algorithm.',
        complexity: {
          time: 'O(n log n)',
          space: 'O(n)',
          timeExplanation: 'Inserting into sorted position is O(n); then merge is O(n log n) sort + O(n) scan.',
          spaceExplanation: 'O(n) for output.',
          visualization: 'nlogn',
        },
      },
      optimized: {
        description: 'Three-phase single pass: copy non-overlapping left intervals, merge all overlapping intervals into newInterval, copy non-overlapping right intervals.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'Single left-to-right pass; each interval handled once.',
          spaceExplanation: 'Result array of at most n+1 intervals.',
          visualization: 'linear',
        },
      },
      followUps: [
        'LC 56 — Merge Intervals (general merge without a designated "new" interval)',
        'What if the intervals list is not sorted?',
        'Delete an interval from a sorted non-overlapping list',
      ],
      edgeCases: [
        'Empty intervals list → return [newInterval]',
        'New interval absorbed entirely inside an existing one → [[1,5]], [2,3] → [[1,5]]',
        'New interval extends beyond all existing intervals',
        'New interval overlaps all intervals',
      ],
      commonMistakes: [
        'Wrong overlap condition: should be intervals[i][0] <= newInterval[1] (<=, not <)',
        'Forgetting to push the merged newInterval between phases 2 and 3',
        'Mutating the input intervals array instead of building a result array',
      ],
      interviewerTips: [
        'The three-phase structure is the key insight — make sure the candidate articulates all three',
        'Verify the overlap condition: two intervals overlap iff start_a <= end_b AND start_b <= end_a',
        'Ask what changes if the input could be unsorted',
      ],
    },
    codeChallenge: {
      functionName: 'insert',
      starterCode: {
        javascript: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1,3],[6,9]], [2,5]], expected: [[1,5],[6,9]], description: 'Insert [2,5] — merges with [1,3]' },
        { input: [[[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]], expected: [[1,2],[3,10],[12,16]], description: 'Insert [4,8] — merges 3 intervals' },
        { input: [[], [5,7]], expected: [[5,7]], description: 'Empty list — just return newInterval' },
        { input: [[[1,5]], [2,3]], expected: [[1,5]], description: 'New interval fully contained' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 20, dryRun: 40, code: 60, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Intervals', 'Three-Phase Scan', 'Greedy Merge'],
    intuitionSummary: 'Three phases: copy intervals ending before the new one, merge all overlapping intervals into the new one by expanding its bounds, then copy the rest.',
    patternName: 'Three-Phase Interval Insertion',
  },

  // ─── 8. Non-overlapping Intervals (435) ─────────────────────────────────────
  {
    id: 'non-overlapping-intervals',
    slug: 'non-overlapping-intervals',
    leetcodeNumber: 435,
    title: 'Non-overlapping Intervals',
    category: 'intervals',
    difficulty: 'medium',
    engineType: 'timeline',
    tags: ['intervals', 'greedy', 'sorting', 'dynamic-programming'],
    questionSets: ['blind75', 'top150'],
    companies: ['Google', 'Amazon', 'Facebook', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'Given a list of intervals, find the minimum number to remove so that the rest do not overlap. Think of scheduling: keep as many non-overlapping events as possible.',
      engineer: 'Greedy: sort by end time. Greedily keep the interval with the earliest end. If the next interval\'s start is before the current end, it overlaps — count it as removed.',
      interview: 'Sort by end. Track prevEnd. For each interval: if start >= prevEnd, keep it (update prevEnd). Else remove it (count++). Total removed = count. O(n log n).',
    },
    puzzleConfig: {
      intervals: [
        {id: 'a', start: 1, end: 2, label: '[1,2]'},
        {id: 'b', start: 2, end: 3, label: '[2,3]'},
        {id: 'c', start: 3, end: 4, label: '[3,4]'},
        {id: 'd', start: 1, end: 3, label: '[1,3] REMOVE'},
      ],
      instruction: 'Minimum intervals to remove to make non-overlapping. Result: keep [[1,2],[2,3],[3,4]] by removing [1,3].',
      mode: 'merge',
      correctAnswer: [[1, 2], [2, 3], [3, 4]],
    },
    hints: [
      { id: 1, text: 'Sort intervals by end time. Greedy insight: always keep the interval that ends earliest — it leaves the most room for future intervals.', xpCost: 0 },
      { id: 2, text: 'Track prevEnd (end of the last kept interval). For each interval: if interval.start >= prevEnd, keep it and update prevEnd. Otherwise, it overlaps — increment removal count.', xpCost: 0 },
      { id: 3, text: 'The answer is the removal count. Equivalently, answer = n - (number of intervals kept).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'intervals=[[1,2],[2,3],[3,4],[1,3]]. Sort by end: [[1,2],[2,3],[1,3],[3,4]]. prevEnd=-Infinity, removed=0.',
        state: { intervals: [[1,2],[2,3],[1,3],[3,4]], prevEnd: -Infinity, removed: 0 },
        annotation: 'Sorted by end time',
      },
      {
        id: 2,
        description: 'i=0: [1,2]. start=1 >= prevEnd=-Inf → keep. prevEnd=2.',
        state: { intervals: [[1,2],[2,3],[1,3],[3,4]], prevEnd: 2, removed: 0, i: 0 },
        highlight: [0],
        annotation: 'Keep [1,2], prevEnd=2',
      },
      {
        id: 3,
        description: 'i=1: [2,3]. start=2 >= prevEnd=2 → keep. prevEnd=3.',
        state: { intervals: [[1,2],[2,3],[1,3],[3,4]], prevEnd: 3, removed: 0, i: 1 },
        highlight: [1],
        annotation: 'Keep [2,3], prevEnd=3',
      },
      {
        id: 4,
        description: 'i=2: [1,3]. start=1 < prevEnd=3 → overlaps! Remove it. removed=1.',
        state: { intervals: [[1,2],[2,3],[1,3],[3,4]], prevEnd: 3, removed: 1, i: 2 },
        highlight: [2],
        annotation: '[1,3] overlaps — remove it',
      },
      {
        id: 5,
        description: 'i=3: [3,4]. start=3 >= prevEnd=3 → keep. prevEnd=4.',
        state: { intervals: [[1,2],[2,3],[1,3],[3,4]], prevEnd: 4, removed: 1, i: 3 },
        highlight: [3],
        annotation: 'Keep [3,4], prevEnd=4',
      },
      {
        id: 6,
        description: 'Loop ends. Return removed=1.',
        state: { result: 1, answer: 1 },
        annotation: 'Minimum 1 removal needed',
      },
    ],
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)',
      timeExplanation: 'Sorting dominates at O(n log n); the greedy scan is O(n).',
      spaceExplanation: 'Sort in-place plus a few scalar variables.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
  // Sort by end time — keep intervals that end earliest
  intervals.sort((a, b) => a[1] - b[1]);

  let removed = 0;
  let prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      // No overlap — keep this interval
      prevEnd = end;
    } else {
      // Overlap — remove this interval
      removed++;
    }
  }

  return removed;
}`,
        notes: 'Sorting by end time is the key greedy insight. We never need to explicitly choose which interval to remove — just count the ones we skip.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all subsets of intervals, find the largest non-overlapping subset, answer = n − size. Exponential time.',
        complexity: {
          time: 'O(2^n)',
          space: 'O(n)',
          timeExplanation: 'Checking all subsets.',
          spaceExplanation: 'Recursion / subset tracking.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Greedy: sort by end time, scan once keeping the earliest-ending non-overlapping interval. Count skipped intervals.',
        complexity: {
          time: 'O(n log n)',
          space: 'O(1)',
          timeExplanation: 'Sort is O(n log n); greedy scan is O(n).',
          spaceExplanation: 'In-place sort plus scalar variables.',
          visualization: 'nlogn',
        },
      },
      followUps: [
        'LC 452 — Minimum Number of Arrows to Burst Balloons (very similar greedy)',
        'What if you wanted to return the minimum set of intervals to remove, not just the count?',
        'Weighted interval scheduling — maximize total weight of non-overlapping intervals',
      ],
      edgeCases: [
        '[[1,2],[2,3]] → 0 (touching endpoints do not overlap)',
        '[[1,2],[1,2],[1,2]] → 2 (all identical)',
        'Single interval → 0',
        'All mutually overlapping → n−1',
      ],
      commonMistakes: [
        'Sorting by start time instead of end time — start-time greedy is incorrect here',
        'Using start > prevEnd instead of >= — touching intervals should not count as overlapping',
        'Counting kept intervals and subtracting from n instead of directly counting removed',
      ],
      interviewerTips: [
        'Justify why sorting by end time is correct — earliest deadline first is a classic greedy proof',
        'Verify the boundary condition: [1,2] and [2,3] do NOT overlap (start >= prevEnd uses >=)',
        'This is equivalent to Activity Selection Problem from classical CS',
      ],
    },
    codeChallenge: {
      functionName: 'eraseOverlapIntervals',
      starterCode: {
        javascript: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1,2],[2,3],[3,4],[1,3]]], expected: 1, description: 'Remove 1: the [1,3] interval' },
        { input: [[[1,2],[1,2],[1,2]]], expected: 2, description: 'All identical — remove 2' },
        { input: [[[1,2],[2,3]]], expected: 0, description: 'Touching but not overlapping — remove 0' },
      ],
    },
    xpRewards: { puzzle: 75, hints: 20, dryRun: 40, code: 60, coding: 100 },
    prerequisites: ['insert-interval'],
    relatedPatterns: ['Greedy', 'Interval Scheduling', 'Activity Selection'],
    intuitionSummary: 'Sort by end time and greedily keep the interval that ends earliest — this maximizes room for future intervals. Count the ones you skip.',
    patternName: 'Greedy Interval Scheduling',
  },

  // ─── 9. Meeting Rooms (252) ──────────────────────────────────────────────────
  {
    id: 'meeting-rooms',
    slug: 'meeting-rooms',
    leetcodeNumber: 252,
    title: 'Meeting Rooms',
    category: 'intervals',
    difficulty: 'easy',
    engineType: 'timeline',
    tags: ['intervals', 'array', 'sorting'],
    questionSets: ['blind75'],
    companies: ['Facebook', 'Google', 'Bloomberg', 'Amazon', 'Microsoft'],
    descriptions: {
      explorer: 'Given a list of meeting time intervals, determine if a person can attend ALL of them — i.e., no two meetings overlap.',
      engineer: 'Sort by start time. Then check each consecutive pair: if the next meeting starts before the previous one ends, there is a conflict — return false.',
      interview: 'O(n log n). Sort by start. Iterate from i=1: if intervals[i][0] < intervals[i-1][1], return false. If loop completes, return true.',
    },
    puzzleConfig: {
      intervals: [
        {id: 'a', start: 0, end: 30, label: 'Meeting A [0,30]'},
        {id: 'b', start: 5, end: 10, label: 'Meeting B [5,10]'},
        {id: 'c', start: 15, end: 20, label: 'Meeting C [15,20]'},
      ],
      instruction: 'Meetings [[0,30],[5,10],[15,20]]: they overlap (A overlaps B and C). Visualize the timeline to see conflicts.',
      mode: 'merge',
      correctAnswer: [[0, 30]],
    },
    hints: [
      { id: 1, text: 'Sort the intervals by their start time. If no two consecutive intervals overlap, then no two intervals overlap at all.', xpCost: 0 },
      { id: 2, text: 'After sorting, scan consecutive pairs. If intervals[i][0] < intervals[i-1][1], meeting i starts before meeting i-1 ends — they overlap.', xpCost: 0 },
      { id: 3, text: 'Return false on the first conflict found. If you reach the end without conflict, return true. Handle the empty array edge case upfront.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'intervals=[[0,30],[5,10],[15,20]]. Sort by start: [[0,30],[5,10],[15,20]] (already sorted by start).',
        state: { intervals: [[0,30],[5,10],[15,20]] },
        annotation: 'Sorted by start time',
      },
      {
        id: 2,
        description: 'i=1: [5,10]. Does 5 (start) < 30 (prevEnd)? Yes → conflict! Return false.',
        state: { intervals: [[0,30],[5,10],[15,20]], i: 1, currStart: 5, prevEnd: 30, conflict: true },
        highlight: [0, 1],
        annotation: '[5,10] starts before [0,30] ends — overlap!',
      },
      {
        id: 3,
        description: 'Return false — person cannot attend all meetings.',
        state: { result: false },
        annotation: 'At least one conflict exists',
      },
    ],
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)',
      timeExplanation: 'Sorting dominates at O(n log n); the conflict scan is O(n).',
      spaceExplanation: 'In-place sort plus a loop index.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals) {
  if (!intervals || intervals.length === 0) return true;
  // Handle edge case: single empty interval [[]]
  if (intervals.length === 1 && intervals[0].length === 0) return true;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    // If current meeting starts before previous meeting ends, conflict
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}`,
        notes: 'Sort by start time then a single consecutive-pair scan. Touching intervals ([1,2],[2,3]) are allowed — use < not <=.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Check every pair of meetings for overlap. O(n²) time.',
        complexity: {
          time: 'O(n²)',
          space: 'O(1)',
          timeExplanation: 'n*(n-1)/2 pairs checked.',
          spaceExplanation: 'Constant space.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Sort by start time, then scan consecutive pairs. After sorting, an overlap can only occur between adjacent intervals.',
        complexity: {
          time: 'O(n log n)',
          space: 'O(1)',
          timeExplanation: 'Sort is O(n log n); scan is O(n).',
          spaceExplanation: 'In-place sort — no extra array.',
          visualization: 'nlogn',
        },
      },
      followUps: [
        'LC 253 — Meeting Rooms II: minimum number of conference rooms needed',
        'What if meetings have a 10-minute buffer between them?',
        'What if meetings are recurring (weekly)? How do you check for conflicts?',
      ],
      edgeCases: [
        '[] → true (no meetings)',
        '[[]] → true (empty interval edge case)',
        'Single meeting → true',
        '[[1,2],[2,3]] → true (touching endpoints are OK)',
        '[[0,30],[5,10]] → false',
      ],
      commonMistakes: [
        'Using <= instead of < for the overlap check — touching intervals should be allowed',
        'Forgetting to sort before scanning — unsorted pairs can miss conflicts',
        'Not handling the empty input or [[]] edge case',
      ],
      interviewerTips: [
        'Ask whether touching intervals count as overlapping — typically they do not',
        'LC 252 is often followed by LC 253 in the same interview',
        'After solving, ask the candidate to also solve the "how many rooms?" variant',
      ],
    },
    codeChallenge: {
      functionName: 'canAttendMeetings',
      starterCode: {
        javascript: `/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[0,30],[5,10],[15,20]]], expected: false, description: '[5,10] overlaps with [0,30] → false' },
        { input: [[[7,10],[2,4]]], expected: true, description: 'Non-overlapping after sort → true' },
        { input: [[[]]], expected: true, description: 'Edge case: empty interval → true' },
        { input: [[[5,8],[9,15]]], expected: true, description: 'Adjacent meetings with gap → true' },
      ],
    },
    xpRewards: { puzzle: 50, hints: 20, dryRun: 30, code: 40, coding: 80 },
    prerequisites: [],
    relatedPatterns: ['Intervals', 'Sorting', 'Greedy'],
    intuitionSummary: 'Sort meetings by start time. After sorting, overlap can only happen between adjacent pairs — a single linear scan suffices.',
    patternName: 'Sort and Scan Intervals',
  },
];

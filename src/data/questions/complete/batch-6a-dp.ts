import type { QuestionConfig } from '@/types/question';

export const DP_COMPLETE: QuestionConfig[] = [
  // ─── 1. Coin Change ──────────────────────────────────────────────────────────
  {
    id: 'coin-change',
    slug: 'coin-change',
    leetcodeNumber: 322,
    title: 'Coin Change',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'pattern',
    tags: ['dynamic-programming', 'array', 'breadth-first-search'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Goldman Sachs'],
    descriptions: {
      explorer: 'You have coins of different denominations and a target amount. What is the fewest coins needed to make that amount?',
      engineer: 'Classic unbounded knapsack DP. dp[i] = min coins to make amount i. For each amount, try every coin and take the minimum.',
      interview: 'Bottom-up DP: dp[0]=0, dp[i]=Infinity. For each amount i and each coin c, dp[i]=min(dp[i], dp[i-c]+1). O(amount*coins) time.',
    },
    puzzleConfig: {
      problemStatement: 'You have coins of denominations [1, 5, 10, 25] and a target amount of 30. Return the fewest number of coins needed to make that amount. If it is not possible, return -1.',
      correctPattern: 'dynamic-programming',
      options: [
        { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧮', description: 'Build optimal solutions from subproblems' },
        { id: 'greedy', label: 'Greedy', icon: '💰', description: 'Always pick the largest coin first' },
        { id: 'bfs', label: 'BFS', icon: '🌊', description: 'Explore states level by level' },
        { id: 'two-pointers', label: 'Two Pointers', icon: '👆', description: 'Move cursors toward each other' },
        { id: 'binary-search', label: 'Binary Search', icon: '🔍', description: 'Halve the search space each step' },
        { id: 'backtracking', label: 'Backtracking', icon: '🌲', description: 'Explore all combos, prune dead ends' },
      ],
      explanation: 'Each sub-amount has optimal substructure: dp[i] = min(dp[i-c] + 1) for each coin c ≤ i. Subproblems overlap — dp[5] is reused when computing dp[6], dp[10], dp[15]. That overlap is the DP signal. Greedy fails here: coins=[1,3,4], amount=6 → greedy picks 4+1+1 (3 coins) but DP finds 3+3 (2 coins).',
      followUp: 'Build bottom-up: dp[0]=0, dp[1..amount]=∞. For each amount i, try every coin c: dp[i] = min(dp[i], dp[i-c] + 1).',
    },
    hints: [
      { id: 1, text: 'Initialize dp[0]=0 (zero coins to make 0). Initialize everything else to Infinity (impossible).', xpCost: 0 },
      { id: 2, text: 'For each amount i from 1 to amount, try every coin. If coin <= i, then dp[i] = min(dp[i], dp[i-coin]+1).', xpCost: 0 },
      { id: 3, text: 'After filling the table, dp[amount] holds your answer. If it is still Infinity, return -1.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'coins=[1,5,11], amount=15. Initialize dp array of size 16. dp[0]=0, dp[1..15]=Infinity.',
        state: { dp: [0,'Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf'] },
        annotation: 'Base case: dp[0]=0',
      },
      {
        id: 2,
        description: 'i=1: try coin=1 → dp[1]=min(Inf, dp[0]+1)=1. dp[1]=1.',
        state: { dp: [0,1,'Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf','Inf'], i: 1 },
        highlight: [1],
        annotation: 'dp[1]=1',
      },
      {
        id: 3,
        description: 'i=5: try coin=1 → dp[4]+1=5, try coin=5 → dp[0]+1=1. dp[5]=1.',
        state: { dp: [0,1,2,3,4,1,2,3,4,5,2,1,2,3,4,3], i: 5 },
        highlight: [5],
        annotation: 'dp[5]=1 (one coin of 5)',
      },
      {
        id: 4,
        description: 'i=11: try coin=1 → dp[10]+1=3, try coin=5 → dp[6]+1=3, try coin=11 → dp[0]+1=1. dp[11]=1.',
        state: { dp: [0,1,2,3,4,1,2,3,4,5,2,1,2,3,4,3], i: 11 },
        highlight: [11],
        annotation: 'dp[11]=1 (one coin of 11)',
      },
      {
        id: 5,
        description: 'i=15: try coin=1→dp[14]+1=4, coin=5→dp[10]+1=3, coin=11→dp[4]+1=5. dp[15]=3.',
        state: { dp: [0,1,2,3,4,1,2,3,4,5,2,1,2,3,4,3], i: 15, answer: 3 },
        highlight: [15],
        annotation: 'Answer: dp[15]=3 (11+1+1+1 or 5+5+5)',
      },
    ],
    complexity: {
      time: 'O(amount * n)',
      space: 'O(amount)',
      timeExplanation: 'For each of the (amount+1) states, we try each of the n coins.',
      spaceExplanation: 'dp array of size amount+1.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive DFS trying all coin combinations for each amount — exponential due to overlapping subproblems.',
        complexity: { time: 'O(S^n)', space: 'O(S)', timeExplanation: 'S=amount, n=coins. Exponential branching.', spaceExplanation: 'Recursion stack depth S.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up DP: iterate over all amounts, update each using every valid coin. Classic unbounded knapsack.',
        complexity: { time: 'O(amount * n)', space: 'O(amount)', timeExplanation: 'Two nested loops: amount × coins.', spaceExplanation: 'Single dp array of size amount+1.', visualization: 'quadratic' },
      },
      followUps: [
        'Coin Change II (LC 518) — count the number of ways, not minimum coins',
        'What if you need to reconstruct the actual coins used?',
        'What if each coin can only be used once? (0/1 knapsack variant)',
      ],
      edgeCases: [
        'amount=0 → return 0',
        'No combination possible → return -1',
        'Single coin that exactly equals amount',
      ],
      commonMistakes: [
        'Initializing dp to 0 instead of Infinity (makes min logic wrong)',
        'Using dp[amount] === -1 check instead of === Infinity before returning -1',
        'Off-by-one: array size should be amount+1',
      ],
      interviewerTips: [
        'Clarify whether each coin can be used multiple times (unbounded vs 0/1 knapsack)',
        'Mention BFS also works — each level adds one more coin',
        'Point out dp[0]=0 is the key base case that seeds the entire computation',
      ],
    },
    codeChallenge: {
      functionName: 'coinChange',
      starterCode: {
        javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 5, 11], 15], expected: 3, description: 'coins=[1,5,11], amount=15 → 3 (5+5+5)' },
        { input: [[1, 2, 5], 11], expected: 3, description: 'coins=[1,2,5], amount=11 → 3 (5+5+1)' },
        { input: [[2], 3], expected: -1, description: 'Impossible: coins=[2], amount=3' },
        { input: [[1], 0], expected: 0, description: 'amount=0 → 0 coins' },
        { input: [[186, 419, 83, 408], 6249], expected: 20, description: 'Large amount with varied coins' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['climbing-stairs'],
    relatedPatterns: ['Unbounded Knapsack', 'Bottom-up DP', 'Coin Change II'],
    intuitionSummary: 'Each amount builds on smaller amounts — the minimum coins for amount i is 1 plus the minimum coins for (i minus any valid coin).',
    patternName: 'Unbounded Knapsack DP',
  },

  // ─── 2. Longest Increasing Subsequence ───────────────────────────────────────
  {
    id: 'longest-increasing-subsequence',
    slug: 'longest-increasing-subsequence',
    leetcodeNumber: 300,
    title: 'Longest Increasing Subsequence',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array', 'binary-search'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Adobe'],
    descriptions: {
      explorer: 'Find the length of the longest subsequence of a list where every element is strictly greater than the one before it.',
      engineer: 'dp[i] = LIS ending at index i. For each i, look back at all j<i where nums[j]<nums[i] and take max(dp[j])+1.',
      interview: 'O(n²) DP: dp[i]=max(dp[j]+1) for all j<i with nums[j]<nums[i], dp[i] starts at 1. Answer is max(dp). O(n log n) with patience sort.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 5, label: '5' },
        { id: 'c', value: 3, label: '3' },
        { id: 'd', value: 4, label: '4' },
      ],
      target: 7,
      instruction: '[10,9,2,5,3,7,101,18]: which two values can start a valid longest increasing subsequence?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Every element is an LIS of length 1 by itself. Initialize all dp[i]=1.', xpCost: 0 },
      { id: 2, text: 'For each index i, scan all j<i. If nums[j]<nums[i], the LIS at j can be extended: dp[i]=max(dp[i], dp[j]+1).', xpCost: 0 },
      { id: 3, text: 'The answer is not dp[n-1] — it is max over all dp[i], since the longest subsequence might end anywhere.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[10,9,2,5,3,7,101,18]. Initialize dp=[1,1,1,1,1,1,1,1].',
        state: { nums: [10,9,2,5,3,7,101,18], dp: [1,1,1,1,1,1,1,1] },
        annotation: 'All LIS start at 1',
      },
      {
        id: 2,
        description: 'i=3 (nums[3]=5): j=2 (nums[2]=2 < 5) → dp[3]=max(1, dp[2]+1)=2.',
        state: { nums: [10,9,2,5,3,7,101,18], dp: [1,1,1,2,1,1,1,1], i: 3, j: 2 },
        highlight: [2, 3],
        annotation: 'dp[3]=2: subsequence [2,5]',
      },
      {
        id: 3,
        description: 'i=5 (nums[5]=7): j=2 (val=2<7,dp=1→2), j=3 (val=5<7,dp=2→3), j=4 (val=3<7,dp=1→2). dp[5]=3.',
        state: { nums: [10,9,2,5,3,7,101,18], dp: [1,1,1,2,2,3,1,1], i: 5 },
        highlight: [2, 3, 4, 5],
        annotation: 'dp[5]=3: subsequence [2,5,7] or [2,3,7]',
      },
      {
        id: 4,
        description: 'i=6 (nums[6]=101): all previous values < 101. Best predecessor is i=5 (dp=3). dp[6]=4.',
        state: { nums: [10,9,2,5,3,7,101,18], dp: [1,1,1,2,2,3,4,1], i: 6 },
        highlight: [5, 6],
        annotation: 'dp[6]=4: [2,5,7,101]',
      },
      {
        id: 5,
        description: 'Final dp=[1,1,1,2,2,3,4,4]. max(dp)=4. Answer: 4.',
        state: { dp: [1,1,1,2,2,3,4,4], answer: 4 },
        annotation: 'LIS length = 4',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(n)',
      timeExplanation: 'For each of n elements, scan all previous elements.',
      spaceExplanation: 'dp array of size n.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function lengthOfLIS(nums) {
  const n = nums.length;
  if (n === 0) return 0;

  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Generate all 2^n subsequences, check each for strictly increasing, track maximum length.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'All subsets enumerated.', spaceExplanation: 'Recursion stack.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'O(n log n) with patience sorting / binary search: maintain a tails array where tails[i] is the smallest tail of all LIS of length i+1.',
        complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Binary search over tails array for each element.', spaceExplanation: 'tails array of size at most n.', visualization: 'nlogn' },
      },
      followUps: [
        'Reconstruct the actual subsequence (track parent pointers)',
        'Longest Non-Decreasing Subsequence (allow equal elements)',
        'Russian Doll Envelopes (LC 354) — 2D LIS variant',
      ],
      edgeCases: [
        'All elements equal → LIS = 1',
        'Already sorted in ascending order → LIS = n',
        'Sorted descending → LIS = 1',
      ],
      commonMistakes: [
        'Returning dp[n-1] instead of max(dp) — LIS might end before the last element',
        'Using <= instead of < (must be strictly increasing)',
        'Forgetting to initialize dp[i]=1 for each element',
      ],
      interviewerTips: [
        'Start with O(n²) DP, then mention O(n log n) patience sort as a follow-up',
        'Clarify strictly increasing vs non-decreasing',
        'Patience sorting is elegant but explain the invariant: tails[i] is the minimum possible tail for LIS of length i+1',
      ],
    },
    codeChallenge: {
      functionName: 'lengthOfLIS',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, description: '[10,9,2,5,3,7,101,18] → 4' },
        { input: [[0, 1, 0, 3, 2, 3]], expected: 4, description: '[0,1,0,3,2,3] → 4' },
        { input: [[7, 7, 7, 7, 7]], expected: 1, description: 'All equal → 1' },
        { input: [[1, 3, 6, 7, 9, 4, 10, 5, 6]], expected: 6, description: 'Mixed → 6' },
        { input: [[1]], expected: 1, description: 'Single element → 1' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['coin-change'],
    relatedPatterns: ['DP on sequences', 'Patience Sorting', 'Russian Doll Envelopes'],
    intuitionSummary: 'dp[i] stores the best LIS ending exactly at position i — built by looking back at all smaller predecessors.',
    patternName: 'LIS DP',
  },

  // ─── 3. Word Break ───────────────────────────────────────────────────────────
  {
    id: 'word-break',
    slug: 'word-break',
    leetcodeNumber: 139,
    title: 'Word Break',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'hash-table', 'string', 'trie', 'memoization'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'Apple'],
    descriptions: {
      explorer: 'Given a string and a dictionary of words, can you segment the string into a sequence of dictionary words?',
      engineer: 'dp[i] = can we form s[0..i). For each end index i, check all start indices j where dp[j]=true and s[j..i] is in the dict.',
      interview: 'Boolean DP: dp[0]=true (empty string). For each i from 1 to n, for each j from 0 to i: if dp[j] and s[j:i] in wordSet, dp[i]=true.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 4, label: '"leet"' },
        { id: 'b', value: 4, label: '"code"' },
        { id: 'c', value: 8, label: '"leetcode"' },
        { id: 'd', value: 3, label: '"lee"' },
      ],
      target: 8,
      instruction: '"leetcode" with wordDict=["leet","code"]: which two word lengths mark a valid segmentation split point?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'dp[0]=true: the empty prefix is always "segmented". dp[1..n]=false initially.', xpCost: 0 },
      { id: 2, text: 'For each position i, check all splits j<i. If dp[j] is true AND s[j..i] is in the wordDict, then dp[i]=true.', xpCost: 0 },
      { id: 3, text: 'Use a Set for the word dictionary to get O(1) lookups. Once dp[i] is set to true, no need to keep checking that i.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's="leetcode", wordDict=["leet","code"]. dp=[true,false,false,false,false,false,false,false,false].',
        state: { s: 'leetcode', dp: [true,false,false,false,false,false,false,false,false] },
        annotation: 'dp[0]=true: empty prefix',
      },
      {
        id: 2,
        description: 'i=4: j=0 → dp[0]=true, s[0..4]="leet" ∈ dict. Set dp[4]=true.',
        state: { dp: [true,false,false,false,true,false,false,false,false], i: 4, j: 0, word: 'leet' },
        highlight: [0, 4],
        annotation: 'dp[4]=true: "leet" found',
      },
      {
        id: 3,
        description: 'i=5,6,7: j scan finds no match. dp[5]=dp[6]=dp[7]=false.',
        state: { dp: [true,false,false,false,true,false,false,false,false], i: 7 },
        annotation: 'No match for partial words',
      },
      {
        id: 4,
        description: 'i=8: j=4 → dp[4]=true, s[4..8]="code" ∈ dict. Set dp[8]=true.',
        state: { dp: [true,false,false,false,true,false,false,false,true], i: 8, j: 4, word: 'code' },
        highlight: [4, 8],
        annotation: 'dp[8]=true: "leet"+"code"',
      },
      {
        id: 5,
        description: 'Return dp[8]=true. "leetcode" can be segmented as "leet"+"code".',
        state: { dp: [true,false,false,false,true,false,false,false,true], answer: true },
        annotation: 'Answer: true',
      },
    ],
    complexity: {
      time: 'O(n² * m)',
      space: 'O(n)',
      timeExplanation: 'n² pairs (i,j) × O(m) for substring extraction and set lookup where m = avg word length.',
      spaceExplanation: 'dp array of size n+1 plus the word set.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break; // no need to check further j values for this i
      }
    }
  }

  return dp[n];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive DFS: try every prefix that is in the dictionary, recurse on the remainder. Exponential without memoization.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'Exponential without memoization.', spaceExplanation: 'Recursion stack depth n.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up boolean DP with a word set. dp[i] encodes whether s[0..i) is fully segmentable.',
        complexity: { time: 'O(n² * m)', space: 'O(n + k)', timeExplanation: 'n² substrings, m for slice+set lookup.', spaceExplanation: 'dp array + word set of total chars k.', visualization: 'quadratic' },
      },
      followUps: [
        'Word Break II (LC 140) — return all valid segmentations',
        'What if wordDict is very large? Use a Trie for faster prefix lookups',
        'Can you do it with BFS? (treat indices as nodes, wordDict as edges)',
      ],
      edgeCases: [
        'Empty string → true',
        'No valid segmentation → false',
        'Word dictionary contains single characters',
        'Overlapping words in dictionary',
      ],
      commonMistakes: [
        'dp array size n instead of n+1 (need dp[0] as base case)',
        'Not using a Set → O(k) dict lookup per check instead of O(1)',
        'Substring indices off by one when calling s.slice(j, i)',
      ],
      interviewerTips: [
        'Ask about constraints on string and dictionary size to pick best approach',
        'For Word Break II, memoization (top-down) is often cleaner than bottom-up',
        'Mention the Trie optimization when dictionary is large and has many common prefixes',
      ],
    },
    codeChallenge: {
      functionName: 'wordBreak',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['leetcode', ['leet', 'code']], expected: true, description: '"leetcode" → "leet"+"code"' },
        { input: ['applepenapple', ['apple', 'pen']], expected: true, description: '"applepenapple" → "apple"+"pen"+"apple"' },
        { input: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], expected: false, description: '"catsandog" → false' },
        { input: ['cars', ['car', 'ca', 'rs']], expected: true, description: '"cars" → "ca"+"rs"' },
        { input: ['a', ['b']], expected: false, description: 'No match → false' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['coin-change'],
    relatedPatterns: ['Boolean DP', 'Trie', 'Memoized DFS'],
    intuitionSummary: 'dp[i] answers "can we reach position i?" — we reach i if we were at some earlier position j and the word s[j..i] exists.',
    patternName: 'Reachability DP',
  },

  // ─── 4. Combination Sum IV ────────────────────────────────────────────────────
  {
    id: 'combination-sum-iv',
    slug: 'combination-sum-iv',
    leetcodeNumber: 377,
    title: 'Combination Sum IV',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array'],
    questionSets: ['blind75'],
    companies: ['Google', 'Amazon', 'Meta', 'Lyft'],
    descriptions: {
      explorer: 'Count how many different ordered sequences of numbers from an array sum to a given target. [1,2] and [2,1] are counted separately!',
      engineer: 'dp[t] = number of ordered sequences summing to t. For each t, sum dp[t-num] for all nums ≤ t. Order matters, so iterate target outer, nums inner.',
      interview: 'Unbounded knapsack but counting ordered arrangements (permutations not combinations). dp[0]=1, dp[t]+=dp[t-num] for each num ≤ t.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1' },
        { id: 'b', value: 3, label: '3' },
        { id: 'c', value: 4, label: '4' },
        { id: 'd', value: 7, label: '7' },
      ],
      target: 4,
      instruction: 'nums=[1,2,3], target=4: which two values from the list can combine (with order mattering) to reach the target?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'dp[0]=1: there is exactly one way to reach 0 (use nothing). This seeds the entire recursion.', xpCost: 0 },
      { id: 2, text: 'For each target t, add dp[t-num] for every num in nums where num ≤ t. The ORDER matters so loop target outer, nums inner.', xpCost: 0 },
      { id: 3, text: 'Contrast with Coin Change (count min coins) and Coin Change II (count unordered combinations) — this one counts ordered sequences.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,2,3], target=4. dp=[1,0,0,0,0]. dp[0]=1 (one way to form 0).',
        state: { dp: [1, 0, 0, 0, 0] },
        annotation: 'Base case dp[0]=1',
      },
      {
        id: 2,
        description: 'dp[1]: +dp[1-1]=dp[0]=1. dp[1]=1. (sequence: [1])',
        state: { dp: [1, 1, 0, 0, 0], t: 1 },
        highlight: [1],
        annotation: 'dp[1]=1',
      },
      {
        id: 3,
        description: 'dp[2]: +dp[2-1]=1, +dp[2-2]=1. dp[2]=2. ([1,1] and [2])',
        state: { dp: [1, 1, 2, 0, 0], t: 2 },
        highlight: [2],
        annotation: 'dp[2]=2',
      },
      {
        id: 4,
        description: 'dp[3]: +dp[2]=2, +dp[1]=1, +dp[0]=1. dp[3]=4. ([1,1,1],[1,2],[2,1],[3])',
        state: { dp: [1, 1, 2, 4, 0], t: 3 },
        highlight: [3],
        annotation: 'dp[3]=4',
      },
      {
        id: 5,
        description: 'dp[4]: +dp[3]=4, +dp[2]=2, +dp[1]=1. dp[4]=7. Answer: 7.',
        state: { dp: [1, 1, 2, 4, 7], t: 4, answer: 7 },
        highlight: [4],
        annotation: 'Answer: dp[4]=7',
      },
    ],
    complexity: {
      time: 'O(target * n)',
      space: 'O(target)',
      timeExplanation: 'For each of target+1 values, iterate over all n nums.',
      spaceExplanation: 'dp array of size target+1.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function combinationSum4(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let t = 1; t <= target; t++) {
    for (const num of nums) {
      if (num <= t) {
        dp[t] += dp[t - num];
      }
    }
  }

  return dp[target];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS/recursion: branch on every num for each remaining amount. Exponential without memoization.',
        complexity: { time: 'O(n^target)', space: 'O(target)', timeExplanation: 'Exponential branching.', spaceExplanation: 'Recursion stack depth.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up DP iterating target outer and nums inner — this ordering ensures permutations are counted (order matters).',
        complexity: { time: 'O(target * n)', space: 'O(target)', timeExplanation: 'Two loops: target × nums length.', spaceExplanation: 'dp array of size target+1.', visualization: 'quadratic' },
      },
      followUps: [
        'What if negative numbers are allowed? (requires upper bound on sequence length)',
        'Coin Change II (LC 518) — count unordered combinations (swap loop order)',
        'Can you handle very large targets with big integers?',
      ],
      edgeCases: [
        'target=0 → 1',
        'No num ≤ target → 0',
        'All nums > target → 0',
      ],
      commonMistakes: [
        'Swapping loop order (nums outer, target inner) — counts unordered combinations instead',
        'dp[0]=0 instead of 1 — kills all subsequent calculations',
        'Confusing this with Combination Sum (LC 39) which returns actual arrays',
      ],
      interviewerTips: [
        'The critical insight is loop order: target-outer means order matters (permutations); nums-outer means order does not (combinations)',
        'Ask: do [1,2] and [2,1] count as distinct sequences?',
        'This is effectively counting paths to a target in a DAG',
      ],
    },
    codeChallenge: {
      functionName: 'combinationSum4',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function combinationSum4(nums, target) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3], 4], expected: 7, description: '[1,2,3] target=4 → 7 sequences' },
        { input: [[9], 3], expected: 0, description: 'No way to reach 3 with [9]' },
        { input: [[1, 2, 3], 0], expected: 1, description: 'target=0 → 1 (empty sequence)' },
        { input: [[2, 1, 3], 35], expected: 1132436852, description: 'Large target result' },
        { input: [[3, 1, 2], 5], expected: 13, description: '[3,1,2] target=5 → 13' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['coin-change'],
    relatedPatterns: ['Unbounded Knapsack', 'Counting DP', 'Permutation vs Combination'],
    intuitionSummary: 'Counting ordered sequences is like counting paths — dp[t] accumulates all the ways to arrive at exactly t by adding one number at a time.',
    patternName: 'Ordered Counting DP',
  },

  // ─── 5. House Robber ─────────────────────────────────────────────────────────
  {
    id: 'house-robber',
    slug: 'house-robber',
    leetcodeNumber: 198,
    title: 'House Robber',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'house-robber',
    tags: ['dynamic-programming', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Airbnb', 'LinkedIn'],
    descriptions: {
      explorer: 'You are a robber on a street of houses. You cannot rob two adjacent houses. What is the maximum amount you can steal?',
      engineer: 'For each house, decide: rob it (prev-prev + current) or skip it (prev). dp[i] = max money up to house i.',
      interview: 'dp[i]=max(dp[i-2]+nums[i], dp[i-1]). Optimize space to two variables: prev2 and prev1, updated as you scan left to right.',
    },
    puzzleConfig: {
      houses: [2, 7, 9, 3, 1],
      mode: 'linear',
      correctValue: 12,
      instruction: 'Houses in a row — you cannot rob two adjacent houses. Click houses to rob them and maximize your total loot.',
    },
    hints: [
      { id: 1, text: 'At each house you have two choices: rob it (take nums[i] + best from two houses back) or skip it (take best from previous house).', xpCost: 0 },
      { id: 2, text: 'dp[i] = max(dp[i-2] + nums[i], dp[i-1]). Base cases: dp[0]=nums[0], dp[1]=max(nums[0],nums[1]).', xpCost: 0 },
      { id: 3, text: 'You only need the previous two values, so you can reduce space to O(1) with two variables: prev2 and prev1.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[2,7,9,3,1]. dp[0]=2 (rob only house 0). dp[1]=max(2,7)=7 (rob house 1 is better).',
        state: { nums: [2,7,9,3,1], dp: [2, 7, 0, 0, 0] },
        highlight: [0, 1],
        annotation: 'Base cases',
      },
      {
        id: 2,
        description: 'i=2: rob (dp[0]+nums[2]=2+9=11) vs skip (dp[1]=7). dp[2]=11.',
        state: { nums: [2,7,9,3,1], dp: [2, 7, 11, 0, 0], i: 2 },
        highlight: [2],
        annotation: 'Rob house 2: 2+9=11',
      },
      {
        id: 3,
        description: 'i=3: rob (dp[1]+nums[3]=7+3=10) vs skip (dp[2]=11). dp[3]=11.',
        state: { nums: [2,7,9,3,1], dp: [2, 7, 11, 11, 0], i: 3 },
        highlight: [3],
        annotation: 'Skip house 3: 11 is better',
      },
      {
        id: 4,
        description: 'i=4: rob (dp[2]+nums[4]=11+1=12) vs skip (dp[3]=11). dp[4]=12.',
        state: { nums: [2,7,9,3,1], dp: [2, 7, 11, 11, 12], i: 4 },
        highlight: [4],
        annotation: 'Rob house 4: 12',
      },
      {
        id: 5,
        description: 'Answer: dp[4]=12. Optimal: rob houses 0,2,4 → 2+9+1=12.',
        state: { dp: [2,7,11,11,12], answer: 12, robbed: [0,2,4] },
        annotation: 'Answer: 12',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'Only two variables needed (prev2, prev1).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all 2^n subsets of houses, filter out those with adjacent pairs, find maximum sum.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'Exponential subset enumeration.', spaceExplanation: 'Recursion stack.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'O(n) DP with O(1) space: at each house, the answer is max(rob it + prev-prev, skip it = prev).',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single linear scan.', spaceExplanation: 'Two scalar variables.', visualization: 'linear' },
      },
      followUps: [
        'House Robber II (LC 213) — houses arranged in a circle',
        'House Robber III (LC 337) — houses arranged in a binary tree',
        'What if you could skip at most 2 adjacent houses?',
      ],
      edgeCases: [
        'Single house → rob it',
        'Two houses → rob the larger',
        'All zeros → return 0',
      ],
      commonMistakes: [
        'Using dp array when two variables suffice',
        'Off-by-one in base cases (not handling n=1 or n=2 separately)',
        'Initializing prev1=nums[1] instead of max(nums[0],nums[1])',
      ],
      interviewerTips: [
        'This is a gateway DP problem — if they struggle, explore recursion+memo first then convert',
        'The two-variable optimization is worth mentioning to show space awareness',
        'Lead into House Robber II/III as follow-ups to test circular/tree DP',
      ],
    },
    codeChallenge: {
      functionName: 'rob',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 1]], expected: 4, description: '[1,2,3,1] → 4 (rob 1+3)' },
        { input: [[2, 7, 9, 3, 1]], expected: 12, description: '[2,7,9,3,1] → 12 (rob 2+9+1)' },
        { input: [[1]], expected: 1, description: 'Single house → 1' },
        { input: [[2, 1]], expected: 2, description: 'Two houses → rob larger' },
        { input: [[0, 0, 0, 0]], expected: 0, description: 'All zeros → 0' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['climbing-stairs'],
    relatedPatterns: ['Linear DP', 'Space-optimized DP', 'House Robber II'],
    intuitionSummary: 'At each step the choice is binary: rob this house (plus grandparent) or skip (inherit parent) — whichever is larger.',
    patternName: 'Adjacent Skip DP',
  },

  // ─── 6. House Robber II ───────────────────────────────────────────────────────
  {
    id: 'house-robber-ii',
    slug: 'house-robber-ii',
    leetcodeNumber: 213,
    title: 'House Robber II',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'house-robber',
    tags: ['dynamic-programming', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber', 'Adobe'],
    descriptions: {
      explorer: 'Like House Robber, but the houses form a circle — the first and last house are neighbors. Robbing both would trigger an alarm!',
      engineer: 'Since first and last cannot both be robbed, run the linear House Robber twice: once on nums[0..n-2] and once on nums[1..n-1]. Take the max.',
      interview: 'Split the circular constraint: robLinear(nums[0..n-2]) vs robLinear(nums[1..n-1]). Max of the two is the answer. O(n) time, O(1) space.',
    },
    puzzleConfig: {
      houses: [2, 3, 2],
      mode: 'circular',
      correctValue: 3,
      instruction: 'Houses form a circle — first and last are also neighbors. Click to rob non-adjacent houses for maximum loot.',
    },
    hints: [
      { id: 1, text: 'In a circle, house 0 and house n-1 are adjacent — you cannot rob both. So either rob house 0 (exclude last) or rob house n-1 (exclude first).', xpCost: 0 },
      { id: 2, text: 'Run the standard linear House Robber on two subarrays: nums[0..n-2] and nums[1..n-1]. The answer is max of both results.', xpCost: 0 },
      { id: 3, text: 'Edge case: n=1 → return nums[0] (only one house, no circular conflict).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,2,3,1], n=4. Cannot rob both index 0 and index 3. Split into two sub-problems.',
        state: { nums: [1,2,3,1], subA: [1,2,3], subB: [2,3,1] },
        annotation: 'Two independent linear problems',
      },
      {
        id: 2,
        description: 'robLinear([1,2,3]): dp[0]=1, dp[1]=max(1,2)=2, dp[2]=max(2, 1+3)=4. Result: 4.',
        state: { sub: [1,2,3], dp: [1,2,4], result: 4 },
        highlight: [0, 2],
        annotation: 'Exclude last house: rob 1+3=4',
      },
      {
        id: 3,
        description: 'robLinear([2,3,1]): dp[0]=2, dp[1]=max(2,3)=3, dp[2]=max(3, 2+1)=3. Result: 3.',
        state: { sub: [2,3,1], dp: [2,3,3], result: 3 },
        highlight: [1],
        annotation: 'Exclude first house: rob 3',
      },
      {
        id: 4,
        description: 'Answer = max(4, 3) = 4. Rob houses at indices 0 and 2.',
        state: { resultA: 4, resultB: 3, answer: 4 },
        annotation: 'Answer: 4',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Two linear passes through the array.',
      spaceExplanation: 'Two variables per linear pass.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function robLinear(arr) {
    let prev2 = 0, prev1 = 0;
    for (const num of arr) {
      const curr = Math.max(prev1, prev2 + num);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }

  return Math.max(
    robLinear(nums.slice(0, nums.length - 1)),
    robLinear(nums.slice(1))
  );
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Generate all valid subsets (no adjacent, no first+last both included) and find max sum.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'Exponential subset enumeration.', spaceExplanation: 'Recursion stack.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Break circular dependency by solving two linear subproblems: exclude first house or exclude last house.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Two O(n) linear passes.', spaceExplanation: 'Constant extra space per pass.', visualization: 'linear' },
      },
      followUps: [
        'House Robber III (LC 337) — houses in a binary tree',
        'What if houses are arranged in a k-cycle? (generalized circular DP)',
        'What if you must rob at least one house?',
      ],
      edgeCases: [
        'n=1 → return nums[0]',
        'n=2 → return max(nums[0], nums[1])',
        'All equal values → rob every other house',
      ],
      commonMistakes: [
        'Not handling n=1 edge case (slice(0,-1) returns empty array)',
        'Slicing to include/exclude wrong indices',
        'Calling robLinear without handling edge cases like empty arrays',
      ],
      interviewerTips: [
        'Key insight: in any optimal solution, either the first or the last house (or neither) is robbed — never both',
        'This "reduce to two simpler problems" pattern appears in many circular array problems',
        'Ask: what if there are exactly 2 houses? Must handle separately since they are adjacent in both directions',
      ],
    },
    codeChallenge: {
      functionName: 'rob',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[2, 3, 2]], expected: 3, description: '[2,3,2] circle → 3' },
        { input: [[1, 2, 3, 1]], expected: 4, description: '[1,2,3,1] circle → 4' },
        { input: [[1, 2, 3]], expected: 3, description: '[1,2,3] circle → 3' },
        { input: [[1]], expected: 1, description: 'Single house → 1' },
        { input: [[1, 2]], expected: 2, description: 'Two houses → max(1,2)=2' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['house-robber'],
    relatedPatterns: ['Circular Array DP', 'Divide into Linear Subproblems'],
    intuitionSummary: 'The circular constraint means first and last conflict — solve two independent linear problems (include first, include last) and take the max.',
    patternName: 'Circular Linear DP Split',
  },

  // ─── 7. Unique Paths ─────────────────────────────────────────────────────────
  {
    id: 'unique-paths',
    slug: 'unique-paths',
    leetcodeNumber: 62,
    title: 'Unique Paths',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'math', 'combinatorics'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Bloomberg'],
    descriptions: {
      explorer: 'A robot starts at the top-left of an m×n grid and wants to reach the bottom-right. It can only move right or down. How many unique paths are there?',
      engineer: 'dp[i][j] = number of ways to reach cell (i,j). dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row and column are all 1s.',
      interview: 'Grid DP: paths to (i,j) = paths from above + paths from left. First row/col = 1 (only one way to reach edge cells). O(mn) time and space (optimize to O(n)).',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 6, label: '6' },
        { id: 'c', value: 28, label: '28' },
        { id: 'd', value: 8, label: '8' },
      ],
      target: 8,
      instruction: 'm=3, n=7 grid (move only right or down): how many moves of each direction are needed to reach the bottom-right corner?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Any cell in the first row can only be reached by moving right repeatedly — just one way. Same for the first column (only moving down).', xpCost: 0 },
      { id: 2, text: 'For all other cells: dp[i][j] = dp[i-1][j] + dp[i][j-1]. You can arrive from above or from the left.', xpCost: 0 },
      { id: 3, text: 'You can optimize space to O(n) by using a 1D dp array and updating it row by row: dp[j] += dp[j-1].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'm=3 rows, n=3 cols. Initialize first row and first column to 1.',
        state: { dp: [[1,1,1],[1,0,0],[1,0,0]] },
        annotation: 'Edge cells: only one path',
      },
      {
        id: 2,
        description: 'dp[1][1] = dp[0][1] + dp[1][0] = 1+1 = 2.',
        state: { dp: [[1,1,1],[1,2,0],[1,0,0]], i: 1, j: 1 },
        highlight: [4],
        annotation: 'dp[1][1]=2',
      },
      {
        id: 3,
        description: 'dp[1][2] = dp[0][2] + dp[1][1] = 1+2 = 3.',
        state: { dp: [[1,1,1],[1,2,3],[1,0,0]], i: 1, j: 2 },
        annotation: 'dp[1][2]=3',
      },
      {
        id: 4,
        description: 'dp[2][1] = dp[1][1] + dp[2][0] = 2+1 = 3. dp[2][2] = dp[1][2]+dp[2][1]=3+3=6.',
        state: { dp: [[1,1,1],[1,2,3],[1,3,6]], i: 2, j: 2 },
        annotation: 'dp[2][2]=6',
      },
      {
        id: 5,
        description: 'Answer: dp[2][2]=6. For a 3×3 grid there are 6 unique paths.',
        state: { dp: [[1,1,1],[1,2,3],[1,3,6]], answer: 6 },
        annotation: 'Answer: 6',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(n)',
      timeExplanation: 'Fill every cell in the m×n grid once.',
      spaceExplanation: 'Optimize to a single row dp array of size n.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function uniquePaths(m, n) {
  // Space-optimized: single row
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive DFS from top-left: at each cell try moving right and down. Exponential without memoization.',
        complexity: { time: 'O(2^(m+n))', space: 'O(m+n)', timeExplanation: 'Exponential branching at each cell.', spaceExplanation: 'Recursion stack depth m+n.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up DP with a single row array. Also solvable in O(1) space with combinatorics: C(m+n-2, m-1).',
        complexity: { time: 'O(m * n)', space: 'O(n)', timeExplanation: 'Visit every cell once.', spaceExplanation: 'Single row array of size n.', visualization: 'quadratic' },
      },
      followUps: [
        'Unique Paths II (LC 63) — grid with obstacles',
        'Minimum Path Sum (LC 64) — find the path with minimum sum',
        'O(1) math solution: C(m+n-2, n-1) — explain why',
      ],
      edgeCases: [
        'm=1 or n=1 → exactly 1 path (can only go in one direction)',
        'm=n=1 → 1 path (already at destination)',
      ],
      commonMistakes: [
        'Not initializing first row/column to 1',
        'Off-by-one: dp size should be m×n not (m-1)×(n-1)',
        'Forgetting the combinatorics shortcut: C(m+n-2, n-1)',
      ],
      interviewerTips: [
        'Mention the math solution C(m+n-2, n-1) to show breadth — total steps is m+n-2, choose n-1 to be right moves',
        'The space optimization (1D array) is a good demonstration of DP insight',
        'Lead into Unique Paths II to test obstacle handling',
      ],
    },
    codeChallenge: {
      functionName: 'uniquePaths',
      starterCode: {
        javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [3, 7], expected: 28, description: '3×7 grid → 28 paths' },
        { input: [3, 2], expected: 3, description: '3×2 grid → 3 paths' },
        { input: [7, 3], expected: 28, description: '7×3 grid → 28 paths' },
        { input: [1, 1], expected: 1, description: '1×1 grid → 1' },
        { input: [3, 3], expected: 6, description: '3×3 grid → 6' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['climbing-stairs'],
    relatedPatterns: ['Grid DP', 'Combinatorics', 'Unique Paths II'],
    intuitionSummary: 'Each cell is reachable only from the left or from above — paths simply accumulate along the grid edges and fill inward.',
    patternName: 'Grid Path DP',
  },

  // ─── 8. Decode Ways ──────────────────────────────────────────────────────────
  {
    id: 'decode-ways',
    slug: 'decode-ways',
    leetcodeNumber: 91,
    title: 'Decode Ways',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'string'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Facebook', 'Microsoft', 'Lyft', 'Salesforce'],
    descriptions: {
      explorer: 'A message was encoded by mapping A=1, B=2, ..., Z=26. Given a numeric string, how many ways can you decode it?',
      engineer: 'dp[i] = ways to decode s[0..i). Add dp[i-1] if s[i-1] is a valid 1-digit code, add dp[i-2] if s[i-2..i] is a valid 2-digit code (10-26).',
      interview: 'Bottom-up DP. dp[0]=1 (empty). For each i: if s[i-1]!="0" add dp[i-1]. If s[i-2..i] in "10".."26" add dp[i-2]. O(n) time, O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1' },
        { id: 'b', value: 2, label: '2' },
        { id: 'c', value: 3, label: '3' },
        { id: 'd', value: 9, label: '9' },
      ],
      target: 3,
      instruction: '"226": the DP recurrence builds dp[3] from two previous subproblems. Which two dp values feed into dp[3]?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'dp[0]=1 (empty string has one way to decode). dp[1]=1 if s[0]!="0", else 0.', xpCost: 0 },
      { id: 2, text: 'For each position i: if s[i-1] is "1"-"9" (not "0"), dp[i]+=dp[i-1] (use as single digit). If s[i-2..i] is "10"-"26", dp[i]+=dp[i-2].', xpCost: 0 },
      { id: 3, text: 'A "0" must always be paired with the digit before it (only "10" and "20" are valid). A standalone "0" means 0 ways.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's="226". dp=[1,0,0,0]. dp[0]=1 (empty base case).',
        state: { s: '226', dp: [1, 0, 0, 0] },
        annotation: 'dp[0]=1: empty string',
      },
      {
        id: 2,
        description: 'i=1: s[0]="2" ≠ "0" → dp[1]+=dp[0]=1. dp[1]=1.',
        state: { dp: [1, 1, 0, 0], i: 1 },
        highlight: [1],
        annotation: 'dp[1]=1: "2"→B',
      },
      {
        id: 3,
        description: 'i=2: s[1]="2" ≠ "0" → dp[2]+=dp[1]=1. s[0..2]="22" in [10,26] → dp[2]+=dp[0]=1. dp[2]=2.',
        state: { dp: [1, 1, 2, 0], i: 2 },
        highlight: [2],
        annotation: 'dp[2]=2: "2","2" or "22"',
      },
      {
        id: 4,
        description: 'i=3: s[2]="6" ≠ "0" → dp[3]+=dp[2]=2. s[1..3]="26" in [10,26] → dp[3]+=dp[1]=1. dp[3]=3.',
        state: { dp: [1, 1, 2, 3], i: 3 },
        highlight: [3],
        annotation: 'dp[3]=3: "2","2","6" or "22","6" or "2","26"',
      },
      {
        id: 5,
        description: 'Answer: dp[3]=3. Three decodings: "B","B","F" | "V","F" | "B","Z".',
        state: { dp: [1,1,2,3], answer: 3, decodings: ['BBF','VF','BZ'] },
        annotation: 'Answer: 3',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the string.',
      spaceExplanation: 'Optimize to two variables (prev2, prev1) instead of full dp array.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function numDecodings(s) {
  if (!s || s[0] === '0') return 0;

  let prev2 = 1; // dp[i-2]
  let prev1 = 1; // dp[i-1]

  for (let i = 2; i <= s.length; i++) {
    let curr = 0;

    // 1-digit decode
    if (s[i - 1] !== '0') {
      curr += prev1;
    }

    // 2-digit decode
    const twoDigit = parseInt(s.slice(i - 2, i), 10);
    if (twoDigit >= 10 && twoDigit <= 26) {
      curr += prev2;
    }

    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive DFS: at each position try taking 1 or 2 characters, recurse on the rest. Exponential without memoization.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'Binary branching at each position.', spaceExplanation: 'Recursion stack depth n.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up DP with O(1) space: only two previous values needed, similar to Fibonacci.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single linear scan.', spaceExplanation: 'Two scalar variables.', visualization: 'linear' },
      },
      followUps: [
        'Decode Ways II (LC 639) — wildcard "*" can be any digit 1-9',
        'What if the encoding goes beyond 26? (adjust two-digit range)',
        'Return the actual decoded strings (backtracking)',
      ],
      edgeCases: [
        '"0" alone → 0 ways',
        '"06" → 0 (leading zero)',
        '"10" → 1 ("J")',
        '"30" → 0 (30 > 26, standalone "0" invalid)',
      ],
      commonMistakes: [
        'Not handling "0" — a "0" cannot be decoded as a single digit',
        'Two-digit check: must be 10-26, not 01-26 (leading zeros invalid)',
        'parseInt vs string comparison for the two-digit range check',
      ],
      interviewerTips: [
        'Very similar to Fibonacci/Climbing Stairs — the recurrence is the same structure',
        'Walk through "10", "20", "30" edge cases to test understanding of the "0" rule',
        'Decode Ways II with wildcards is a great hard follow-up',
      ],
    },
    codeChallenge: {
      functionName: 'numDecodings',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['12'], expected: 2, description: '"12" → 2 ways: "AB" or "L"' },
        { input: ['226'], expected: 3, description: '"226" → 3 ways' },
        { input: ['06'], expected: 0, description: '"06" → 0 (leading zero)' },
        { input: ['10'], expected: 1, description: '"10" → 1 way: "J"' },
        { input: ['11106'], expected: 2, description: '"11106" → 2 ways' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['climbing-stairs', 'house-robber'],
    relatedPatterns: ['Fibonacci-style DP', 'String DP', 'Decode Ways II'],
    intuitionSummary: 'Like climbing stairs but with validity constraints — each position looks back 1 or 2 steps, adding counts only when the digit(s) form a valid letter.',
    patternName: 'Fibonacci-style String DP',
  },

  // ─── 9. Triangle ─────────────────────────────────────────────────────────────
  {
    id: 'triangle',
    slug: 'triangle',
    leetcodeNumber: 120,
    title: 'Triangle',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Adobe', 'Oracle'],
    descriptions: {
      explorer: 'Given a triangle of numbers, find the minimum path sum from top to bottom. At each step you can move to an adjacent number in the row below.',
      engineer: 'Bottom-up DP: start from the last row and work upward. dp[j] = triangle[i][j] + min(dp[j], dp[j+1]) at each row.',
      interview: 'In-place bottom-up from last row: dp = copy of last row. For each row above, dp[j] = triangle[i][j] + min(dp[j], dp[j+1]). O(n²) time O(n) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 3, label: '3' },
        { id: 'c', value: 4, label: '4' },
        { id: 'd', value: 5, label: '5' },
      ],
      target: 5,
      instruction: 'Triangle [[2],[3,4],[6,5,7],[4,1,8,3]]: which two values form the top of the minimum-cost root-to-leaf path?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Start from the bottom row. Each cell in the row above it inherits the minimum of the two cells directly below it, plus its own value.', xpCost: 0 },
      { id: 2, text: 'dp[j] = triangle[i][j] + min(dp[j], dp[j+1]). Process rows from second-to-last up to row 0.', xpCost: 0 },
      { id: 3, text: 'You can modify the triangle in place (saving space) or use a separate 1D dp array initialized to the last row.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'triangle=[[2],[3,4],[6,5,7],[4,1,8,3]]. Start: dp=[4,1,8,3] (copy of last row).',
        state: { triangle: [[2],[3,4],[6,5,7],[4,1,8,3]], dp: [4,1,8,3] },
        annotation: 'Bottom row is base',
      },
      {
        id: 2,
        description: 'Row 2 ([6,5,7]): dp[0]=6+min(4,1)=7, dp[1]=5+min(1,8)=6, dp[2]=7+min(8,3)=10. dp=[7,6,10].',
        state: { dp: [7, 6, 10], row: 2 },
        annotation: 'Process row 2',
      },
      {
        id: 3,
        description: 'Row 1 ([3,4]): dp[0]=3+min(7,6)=9, dp[1]=4+min(6,10)=10. dp=[9,10].',
        state: { dp: [9, 10], row: 1 },
        annotation: 'Process row 1',
      },
      {
        id: 4,
        description: 'Row 0 ([2]): dp[0]=2+min(9,10)=11. dp=[11].',
        state: { dp: [11], row: 0 },
        annotation: 'Process row 0',
      },
      {
        id: 5,
        description: 'Answer: dp[0]=11. Path is 2→3→5→1.',
        state: { answer: 11, path: [2,3,5,1] },
        annotation: 'Answer: 11',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(n)',
      timeExplanation: 'Process all cells in the triangle: 1+2+...+n = n²/2.',
      spaceExplanation: '1D dp array of size n (bottom row length).',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function minimumTotal(triangle) {
  const n = triangle.length;
  const dp = [...triangle[n - 1]]; // copy last row

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
    }
  }

  return dp[0];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS from top: at each row explore both adjacent elements in the row below. Exponential paths without memoization.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'Binary branching at each of n rows.', spaceExplanation: 'Recursion stack depth n.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up DP starting from the last row. Reuse a 1D array, updating in place to avoid 2D storage.',
        complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'n rows with up to n elements each.', spaceExplanation: '1D dp array of size n.', visualization: 'quadratic' },
      },
      followUps: [
        'Top-down DP: dp[i][j] = min path from (0,0) to (i,j)',
        'What if you need to return the actual path, not just the sum?',
        'Minimum Path Sum (LC 64) — same concept on a rectangular grid',
      ],
      edgeCases: [
        'Single row triangle → return that single element',
        'All negative values → minimum is still valid',
        'Triangle with only one path',
      ],
      commonMistakes: [
        'Going top-down and missing that dp[j+1] might not yet be updated',
        'Mutating the input triangle instead of copying',
        'Off-by-one: inner loop should go j from 0 to i (inclusive), not j to row.length',
      ],
      interviewerTips: [
        'Bottom-up is more intuitive here — ask the candidate to try top-down first then optimize',
        'In-place modification of the triangle saves the copy but mutates input — discuss trade-off',
        '"Adjacent" in triangle means indices j and j+1 in the next row, which is the key constraint',
      ],
    },
    codeChallenge: {
      functionName: 'minimumTotal',
      starterCode: {
        javascript: `/**
 * @param {number[][]} triangle
 * @return {number}
 */
function minimumTotal(triangle) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[2],[3,4],[6,5,7],[4,1,8,3]]], expected: 11, description: 'Example triangle → 11' },
        { input: [[[-1],[2,3],[1,-1,-3]]], expected: -1, description: 'Negative values → -1' },
        { input: [[[1],[2,3]]], expected: 3, description: 'Two-row triangle → 3' },
        { input: [[[5]]], expected: 5, description: 'Single element → 5' },
        { input: [[[1],[2,3],[4,5,6]]], expected: 7, description: '1→2→4=7' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['unique-paths'],
    relatedPatterns: ['Bottom-up Grid DP', '1D Space Optimization'],
    intuitionSummary: 'Work from the bottom up — each cell propagates the best (minimum) cost from below, so the top cell accumulates the global minimum path.',
    patternName: 'Bottom-up Triangle DP',
  },

  // ─── 10. Minimum Path Sum ────────────────────────────────────────────────────
  {
    id: 'minimum-path-sum',
    slug: 'minimum-path-sum',
    leetcodeNumber: 64,
    title: 'Minimum Path Sum',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'grid-path',
    tags: ['dynamic-programming', 'array', 'matrix'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'Snapchat'],
    descriptions: {
      explorer: 'Find the path from the top-left to the bottom-right of a grid that has the smallest total sum. You can only move right or down.',
      engineer: 'dp[i][j] = min cost to reach (i,j). dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). First row/col are cumulative sums.',
      interview: 'Standard grid DP. Modify in place or use O(n) extra space. dp[i][j]=grid[i][j]+min(from_above, from_left). Return dp[m-1][n-1].',
    },
    puzzleConfig: {
      grid: [[1,3,1],[1,5,1],[4,2,1]],
      mode: 'min-sum',
      correctValue: 7,
      instruction: 'Navigate from top-left (S) to bottom-right (E), moving only right or down. Find the path with the minimum total sum.',
    },
    hints: [
      { id: 1, text: 'First row: dp[0][j] = dp[0][j-1] + grid[0][j] (can only come from the left). First column: dp[i][0] = dp[i-1][0] + grid[i][0].', xpCost: 0 },
      { id: 2, text: 'For all other cells: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).', xpCost: 0 },
      { id: 3, text: 'You can modify the grid in place to save space, or use a separate dp array. The answer is dp[m-1][n-1].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'grid=[[1,3,1],[1,5,1],[4,2,1]]. Fill first row: dp[0]=[1,4,5] (cumulative sum).',
        state: { dp: [[1,4,5],[0,0,0],[0,0,0]] },
        annotation: 'First row: cumulative',
      },
      {
        id: 2,
        description: 'First col: dp[1][0]=1+1=2, dp[2][0]=4+2=6.',
        state: { dp: [[1,4,5],[2,0,0],[6,0,0]] },
        annotation: 'First col: cumulative',
      },
      {
        id: 3,
        description: 'dp[1][1]=5+min(4,2)=7. dp[1][2]=1+min(5,7)=6.',
        state: { dp: [[1,4,5],[2,7,6],[6,0,0]] },
        highlight: [4,5],
        annotation: 'Row 1 filled',
      },
      {
        id: 4,
        description: 'dp[2][1]=2+min(7,6)=8. dp[2][2]=1+min(6,8)=7.',
        state: { dp: [[1,4,5],[2,7,6],[6,8,7]] },
        highlight: [7,8],
        annotation: 'Row 2 filled',
      },
      {
        id: 5,
        description: 'Answer: dp[2][2]=7. Optimal path: 1→3→1→1→1=7.',
        state: { dp: [[1,4,5],[2,7,6],[6,8,7]], answer: 7, path: '1→3→1→1→1' },
        annotation: 'Answer: 7',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(1)',
      timeExplanation: 'Every cell filled exactly once.',
      spaceExplanation: 'Modify grid in place — no extra space needed.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;

  // Fill first row
  for (let j = 1; j < n; j++) {
    grid[0][j] += grid[0][j - 1];
  }
  // Fill first column
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0];
  }
  // Fill the rest
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }

  return grid[m - 1][n - 1];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS exploring all right/down paths from top-left to bottom-right, tracking minimum total.',
        complexity: { time: 'O(2^(m+n))', space: 'O(m+n)', timeExplanation: 'Exponential without memoization.', spaceExplanation: 'Recursion stack depth.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'In-place DP: grid[i][j] += min(above, left). Reuses the input grid as the dp table.',
        complexity: { time: 'O(m * n)', space: 'O(1)', timeExplanation: 'Single pass over all cells.', spaceExplanation: 'In-place modification.', visualization: 'quadratic' },
      },
      followUps: [
        'Unique Paths (LC 62) — count paths instead of minimum sum',
        'What if you need to reconstruct the actual path?',
        'What if you can also move up or left? (different problem — no longer DP)',
      ],
      edgeCases: [
        '1×1 grid → return grid[0][0]',
        '1×n or m×1 grid → only one path (sum of all cells)',
        'Grid with zeros',
      ],
      commonMistakes: [
        'Not initializing first row and column before inner cells',
        'Modifying input grid when problem asks to not mutate (create a copy)',
        'Using max instead of min',
      ],
      interviewerTips: [
        'In-place modification is a clean optimization — mention it explicitly and discuss the trade-off of mutating input',
        'Path reconstruction requires backtracking from dp[m-1][n-1] choosing the smaller of dp[i-1][j] and dp[i][j-1]',
        'Closely related to Unique Paths — same grid structure, different operation (sum vs count)',
      ],
    },
    codeChallenge: {
      functionName: 'minPathSum',
      starterCode: {
        javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function minPathSum(grid) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1,3,1],[1,5,1],[4,2,1]]], expected: 7, description: '3×3 grid → 7' },
        { input: [[[1,2,3],[4,5,6]]], expected: 12, description: '2×3 grid → 12' },
        { input: [[[1]]], expected: 1, description: '1×1 grid → 1' },
        { input: [[[1,2],[1,1]]], expected: 3, description: '2×2 → 3 (1+1+1)' },
        { input: [[[1,3,1],[1,5,1],[4,2,1]]], expected: 7, description: 'Same as first — verify' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['unique-paths'],
    relatedPatterns: ['Grid DP', 'In-place DP', 'Path Sum'],
    intuitionSummary: 'The cheapest way to reach any cell is the cell value plus the cheaper of the two ways to arrive (from above or from the left).',
    patternName: 'Grid Cost DP',
  },

  // ─── 11. Unique Paths II ──────────────────────────────────────────────────────
  {
    id: 'unique-paths-ii',
    slug: 'unique-paths-ii',
    leetcodeNumber: 63,
    title: 'Unique Paths II',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array', 'matrix'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Uber'],
    descriptions: {
      explorer: 'Like Unique Paths, but some cells are blocked by obstacles. Count unique paths from top-left to bottom-right that avoid all obstacles.',
      engineer: 'Same grid DP as Unique Paths, but set dp[i][j]=0 when obstacleGrid[i][j]==1. dp[i][j] = dp[i-1][j]+dp[i][j-1] otherwise.',
      interview: 'O(mn) DP. If cell is obstacle, dp[i][j]=0. First row/col: stop at first obstacle (all cells after it are 0). Inner cells: sum of top and left.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'route A' },
        { id: 'b', value: 1, label: 'route B' },
        { id: 'c', value: 0, label: 'blocked' },
        { id: 'd', value: 2, label: 'total' },
      ],
      target: 2,
      instruction: 'Grid 3×3 with an obstacle at (1,1): how many distinct paths from top-left to bottom-right avoid the obstacle?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'When you encounter an obstacle, set dp[i][j]=0 — no path can go through it.', xpCost: 0 },
      { id: 2, text: 'For first row and first column, once you hit an obstacle, all subsequent cells in that row/col become 0 (path blocked).', xpCost: 0 },
      { id: 3, text: 'If the start (0,0) or end (m-1,n-1) is an obstacle, return 0 immediately.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'grid=[[0,0,0],[0,1,0],[0,0,0]]. dp[0]=[1,1,1], dp[1][0]=1, dp[2][0]=1.',
        state: { dp: [[1,1,1],[1,0,0],[1,0,0]], note: 'First row and col initialized' },
        annotation: 'Edges set to 1 (no obstacle in edges)',
      },
      {
        id: 2,
        description: 'dp[1][1]: obstacle! Set dp[1][1]=0.',
        state: { dp: [[1,1,1],[1,0,0],[1,0,0]], i: 1, j: 1, obstacle: true },
        highlight: [4],
        annotation: 'Obstacle at (1,1) → 0',
      },
      {
        id: 3,
        description: 'dp[1][2]=dp[0][2]+dp[1][1]=1+0=1.',
        state: { dp: [[1,1,1],[1,0,1],[1,0,0]], i: 1, j: 2 },
        highlight: [5],
        annotation: 'dp[1][2]=1',
      },
      {
        id: 4,
        description: 'dp[2][1]=dp[1][1]+dp[2][0]=0+1=1. dp[2][2]=dp[1][2]+dp[2][1]=1+1=2.',
        state: { dp: [[1,1,1],[1,0,1],[1,1,2]], i: 2 },
        highlight: [7, 8],
        annotation: 'dp[2][2]=2',
      },
      {
        id: 5,
        description: 'Answer: dp[2][2]=2. Two paths go around the obstacle.',
        state: { dp: [[1,1,1],[1,0,1],[1,1,2]], answer: 2 },
        annotation: 'Answer: 2',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(1)',
      timeExplanation: 'Every cell processed once.',
      spaceExplanation: 'Modify the obstacle grid in place.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length, n = obstacleGrid[0].length;

  if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) return 0;

  obstacleGrid[0][0] = 1;

  // First column
  for (let i = 1; i < m; i++) {
    obstacleGrid[i][0] = obstacleGrid[i][0] === 1 ? 0 : obstacleGrid[i-1][0];
  }
  // First row
  for (let j = 1; j < n; j++) {
    obstacleGrid[0][j] = obstacleGrid[0][j] === 1 ? 0 : obstacleGrid[0][j-1];
  }
  // Fill rest
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        obstacleGrid[i][j] = 0;
      } else {
        obstacleGrid[i][j] = obstacleGrid[i-1][j] + obstacleGrid[i][j-1];
      }
    }
  }

  return obstacleGrid[m-1][n-1];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS from top-left, skip obstacle cells, count paths reaching bottom-right.',
        complexity: { time: 'O(2^(m+n))', space: 'O(m+n)', timeExplanation: 'Exponential without memoization.', spaceExplanation: 'Recursion stack.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Same DP as Unique Paths — obstacle cells get 0, effectively blocking their contribution.',
        complexity: { time: 'O(m * n)', space: 'O(1)', timeExplanation: 'All cells visited once.', spaceExplanation: 'In-place obstacle grid reuse.', visualization: 'quadratic' },
      },
      followUps: [
        'Unique Paths (LC 62) — no obstacles baseline',
        'Minimum Path Sum (LC 64) — find minimum cost path',
        'What if obstacles can appear/disappear dynamically?',
      ],
      edgeCases: [
        'Start or end cell is an obstacle → 0',
        'Obstacle in only row or only column → 0',
        'No obstacles → same as Unique Paths',
      ],
      commonMistakes: [
        'Forgetting to check if start or end cell is blocked',
        'Not zeroing out subsequent first-row/col cells after an obstacle',
        'Mutating grid without handling the obstacle=1 check before the dp formula',
      ],
      interviewerTips: [
        'Ask: is the input grid allowed to be mutated? If not, allocate separate dp array',
        'The obstacle check is just dp[i][j]=0 — cleaner than a separate conditional branch for the DP formula',
        'Contrast with Unique Paths to show the minimal change needed',
      ],
    },
    codeChallenge: {
      functionName: 'uniquePathsWithObstacles',
      starterCode: {
        javascript: `/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
function uniquePathsWithObstacles(obstacleGrid) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[0,0,0],[0,1,0],[0,0,0]]], expected: 2, description: 'Center obstacle → 2 paths' },
        { input: [[[0,1],[0,0]]], expected: 1, description: 'Top-right obstacle → 1' },
        { input: [[[1,0]]], expected: 0, description: 'Start blocked → 0' },
        { input: [[[0,0],[0,1]]], expected: 0, description: 'End blocked → 0' },
        { input: [[[0,0,0],[0,0,0],[0,0,0]]], expected: 6, description: 'No obstacles → 6 (same as 3×3 Unique Paths)' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['unique-paths'],
    relatedPatterns: ['Grid DP', 'Obstacle Handling'],
    intuitionSummary: 'Obstacles simply zero out a cell — the DP formula is identical to Unique Paths, with one extra check per cell.',
    patternName: 'Obstacle Grid DP',
  },

  // ─── 12. Edit Distance ───────────────────────────────────────────────────────
  {
    id: 'edit-distance',
    slug: 'edit-distance',
    leetcodeNumber: 72,
    title: 'Edit Distance',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'string'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'LinkedIn'],
    descriptions: {
      explorer: 'What is the minimum number of insert, delete, or replace operations to convert one word into another?',
      engineer: 'dp[i][j] = min edits to convert word1[0..i) to word2[0..j). If chars match: dp[i-1][j-1]. Else: 1+min(insert=dp[i][j-1], delete=dp[i-1][j], replace=dp[i-1][j-1]).',
      interview: 'Classic 2D DP. Base: dp[i][0]=i, dp[0][j]=j. Transition: chars match → inherit diagonal; else 1+min(left,top,diagonal). O(mn) time and space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1 operation' },
        { id: 'b', value: 2, label: '2 operations' },
        { id: 'c', value: 3, label: '3 operations' },
        { id: 'd', value: 5, label: '5' },
      ],
      target: 3,
      instruction: '"horse" → "ros": which two edit-distance sub-costs combine to give the total minimum operations?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'dp[i][0]=i (delete i chars to reach empty string). dp[0][j]=j (insert j chars to form word2 prefix of length j).', xpCost: 0 },
      { id: 2, text: 'If word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1] (no operation needed). Otherwise: dp[i][j]=1+min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]).', xpCost: 0 },
      { id: 3, text: 'The three options are: insert (dp[i][j-1]+1), delete (dp[i-1][j]+1), replace (dp[i-1][j-1]+1). Picture the 2D table filling row by row.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'word1="horse"(len=5), word2="ros"(len=3). dp[i][0]=i, dp[0][j]=j.',
        state: { dp: [[0,1,2,3],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], word1: 'horse', word2: 'ros' },
        annotation: 'Base cases: deletions and insertions',
      },
      {
        id: 2,
        description: 'dp[1][1]: h≠r → 1+min(dp[0][1]=1, dp[1][0]=1, dp[0][0]=0) = 1.',
        state: { dp: [[0,1,2,3],[1,1,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], i:1,j:1 },
        annotation: 'Replace h→r',
      },
      {
        id: 3,
        description: 'dp[2][1]: o==o → dp[1][0]=1. dp[2][1]=1.',
        state: { dp: [[0,1,2,3],[1,1,2,3],[2,1,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], i:2,j:1 },
        annotation: 'Match o==o',
      },
      {
        id: 4,
        description: 'dp[3][2]: r==o? No. 1+min(dp[3][1], dp[2][2], dp[2][1]). Continuing row by row...',
        state: { dp: [[0,1,2,3],[1,1,2,3],[2,1,1,2],[3,2,1,2],[4,3,2,1],[5,4,3,2]], partial: true },
        annotation: 'Filling in progress',
      },
      {
        id: 5,
        description: 'Answer: dp[5][3]=3. Operations: horse→rorse (replace h→r), rorse→rose (delete r), rose→ros (delete e).',
        state: { dp: [[0,1,2,3],[1,1,2,3],[2,1,1,2],[3,2,1,2],[4,3,2,1],[5,4,3,2]], answer: 3 },
        annotation: 'Answer: 3',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(m * n)',
      timeExplanation: 'Fill every cell in an (m+1)×(n+1) table.',
      spaceExplanation: '2D dp table. Can be reduced to O(n) using rolling rows.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i][j - 1],     // insert
          dp[i - 1][j],     // delete
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }

  return dp[m][n];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive: if chars match, recurse on (i-1,j-1). Else try all three operations and take min+1. Exponential without memoization.',
        complexity: { time: 'O(3^(m+n))', space: 'O(m+n)', timeExplanation: 'Three choices at each mismatch.', spaceExplanation: 'Recursion stack.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Bottom-up 2D DP. Can optimize to O(n) space using only the current and previous rows.',
        complexity: { time: 'O(m * n)', space: 'O(m * n)', timeExplanation: 'All (m+1)(n+1) cells computed once.', spaceExplanation: '2D table; reducible to O(n) with rolling array.', visualization: 'quadratic' },
      },
      followUps: [
        'Return the actual edit operations (backtrack through dp table)',
        'What if insert/delete/replace have different costs?',
        'Longest Common Subsequence (LC 1143) — related DP problem',
      ],
      edgeCases: [
        'Either string empty → length of the other',
        'Same strings → 0',
        'Completely different strings of same length → length (all replacements)',
      ],
      commonMistakes: [
        'Forgetting base cases dp[i][0]=i and dp[0][j]=j',
        'Wrong order: insert is dp[i][j-1], delete is dp[i-1][j] (easy to mix up)',
        'Using word1[i] instead of word1[i-1] (1-indexed dp vs 0-indexed string)',
      ],
      interviewerTips: [
        'Draw the 2D table on a whiteboard — it makes the recurrence visual and clear',
        'Define insert/delete from the perspective of word1 transforming into word2',
        'O(n) space optimization using two rows is worth mentioning for senior candidates',
      ],
    },
    codeChallenge: {
      functionName: 'minDistance',
      starterCode: {
        javascript: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['horse', 'ros'], expected: 3, description: '"horse"→"ros" = 3' },
        { input: ['intention', 'execution'], expected: 5, description: '"intention"→"execution" = 5' },
        { input: ['', 'abc'], expected: 3, description: 'Empty → "abc" = 3 inserts' },
        { input: ['abc', ''], expected: 3, description: '"abc" → empty = 3 deletes' },
        { input: ['abc', 'abc'], expected: 0, description: 'Same strings → 0' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['longest-common-subsequence'],
    relatedPatterns: ['2D String DP', 'LCS', 'Sequence Alignment'],
    intuitionSummary: 'Each cell (i,j) stores the cheapest transformation — matching chars are free (diagonal), mismatches cost 1 plus the cheapest prior state.',
    patternName: 'String Edit DP',
  },

  // ─── 13. Maximal Square ───────────────────────────────────────────────────────
  {
    id: 'maximal-square',
    slug: 'maximal-square',
    leetcodeNumber: 221,
    title: 'Maximal Square',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array', 'matrix'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Snapchat', 'Apple'],
    descriptions: {
      explorer: 'Find the largest square containing only 1s in a binary matrix and return its area.',
      engineer: 'dp[i][j] = side length of largest all-1s square with bottom-right corner at (i,j). If grid="1": dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).',
      interview: 'Key insight: dp[i][j] is the side of the largest square whose bottom-right is (i,j). It equals 1+min of three neighbors. Return max².',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 4, label: '4' },
        { id: 'c', value: 1, label: '1' },
        { id: 'd', value: 3, label: '3' },
      ],
      target: 6,
      instruction: 'Binary matrix: what are the side length and area of the largest all-1s square you can find?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'If grid[i][j]="0", dp[i][j]=0 (no square here). If "1" and on the border (row 0 or col 0), dp[i][j]=1.', xpCost: 0 },
      { id: 2, text: 'For interior "1" cells: dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]). This is the bottleneck — the smallest of the three neighbors limits the square size.', xpCost: 0 },
      { id: 3, text: 'Track the maximum dp value seen. Return max * max (area). The min of three neighbors is the key insight — imagine why a 2×2 square requires all four corners to be 1.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'grid=[[1,0,1,0],[1,0,1,1],[1,1,1,1],[1,0,0,1]]. All "0" cells get dp=0. Border "1" cells get dp=1.',
        state: { dp: [[1,0,1,0],[1,0,1,1],[1,1,1,1],[1,0,0,1]], maxSide: 1 },
        annotation: 'Border and zeros initialized',
      },
      {
        id: 2,
        description: 'dp[1][2]: grid="1". min(dp[0][2]=1, dp[1][1]=0, dp[0][1]=0)=0. dp[1][2]=1+0=1.',
        state: { i: 1, j: 2, neighbors: { top:1, left:0, diag:0 }, dp12: 1 },
        annotation: 'Limited by neighbor 0',
      },
      {
        id: 3,
        description: 'dp[2][2]: grid="1". min(dp[1][2]=1, dp[2][1]=1, dp[1][1]=0)=0. dp[2][2]=1.',
        state: { i: 2, j: 2, dp22: 1 },
        annotation: 'Still limited by diagonal',
      },
      {
        id: 4,
        description: 'dp[2][3]: grid="1". min(dp[1][3]=1, dp[2][2]=1, dp[1][2]=1)=1. dp[2][3]=2. maxSide=2.',
        state: { dp23: 2, maxSide: 2 },
        highlight: [11],
        annotation: 'Square of side 2 found!',
      },
      {
        id: 5,
        description: 'After full scan: maxSide=2. Answer: 2²=4.',
        state: { maxSide: 2, answer: 4 },
        annotation: 'Answer: 4 (2×2 square)',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(m * n)',
      timeExplanation: 'Every cell computed once.',
      spaceExplanation: '2D dp table; reducible to O(n) with a single row.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maximalSquare(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  let maxSide = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For every cell (i,j), expand to check all possible square sizes — O(mn·min(m,n)²) brute force.',
        complexity: { time: 'O(m²n²)', space: 'O(1)', timeExplanation: 'For each cell, try every square size.', spaceExplanation: 'No extra space.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'DP where dp[i][j] = side of largest square ending at (i,j). The min-of-three-neighbors recurrence is the key insight.',
        complexity: { time: 'O(m * n)', space: 'O(m * n)', timeExplanation: 'Single pass over all cells.', spaceExplanation: '2D table reducible to O(n).', visualization: 'quadratic' },
      },
      followUps: [
        'Maximal Rectangle (LC 85) — find largest rectangle of 1s (harder, uses histogram)',
        'Count Square Submatrices (LC 1277) — count all squares, not just largest',
        'What if the matrix is very large but sparse (few 1s)?',
      ],
      edgeCases: [
        'All zeros → 0',
        'All ones → min(m,n)² area',
        'Single cell "1" → 1',
      ],
      commonMistakes: [
        'Returning maxSide instead of maxSide² (question asks for area)',
        'Using 1D dp and forgetting to save the diagonal value before overwriting',
        'Comparing "1" (string) vs 1 (integer) — matrix values are strings',
      ],
      interviewerTips: [
        'The min-of-three intuition: to extend a k×k square to (k+1)×(k+1), all three neighbors must have side ≥ k',
        'Maximal Rectangle (LC 85) is the hard follow-up using a histogram approach',
        'Space optimization: store only previous row + a single variable for the diagonal',
      ],
    },
    codeChallenge: {
      functionName: 'maximalSquare',
      starterCode: {
        javascript: `/**
 * @param {character[][]} matrix
 * @return {number}
 */
function maximalSquare(matrix) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]], expected: 4, description: '4×5 matrix → 4 (2×2 square)' },
        { input: [[['0','1'],['1','0']]], expected: 1, description: 'Diagonal 1s → 1 (no 2×2 square)' },
        { input: [[['0']]], expected: 0, description: 'Single 0 → 0' },
        { input: [[['1']]], expected: 1, description: 'Single 1 → 1' },
        { input: [[['1','1','1'],['1','1','1'],['1','1','1']]], expected: 9, description: 'All 1s 3×3 → 9' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['unique-paths'],
    relatedPatterns: ['2D DP', 'Min-of-neighbors', 'Maximal Rectangle'],
    intuitionSummary: 'dp[i][j] is the side length of the largest square ending here — limited by the smallest of three adjacent squares (top, left, diagonal).',
    patternName: 'Square Extension DP',
  },

  // ─── 14. Maximum Sum Circular Subarray ────────────────────────────────────────
  {
    id: 'max-sum-circular-subarray',
    slug: 'maximum-sum-circular-subarray',
    leetcodeNumber: 918,
    title: 'Maximum Sum Circular Subarray',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array', 'divide-and-conquer', 'queue'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'Bloomberg'],
    descriptions: {
      explorer: 'Find the maximum sum subarray in a circular array — the subarray can wrap around from the end back to the beginning.',
      engineer: 'max(Kadane result, totalSum - minSubarray). The wrap-around case picks the best from both ends = total minus the minimum middle. Edge: if all negative, return Kadane only.',
      interview: 'Two cases: non-wrapping (standard Kadane) or wrapping (totalSum - minKadane). If all elements negative, wrapping result = 0 which is wrong — use Kadane result only.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '3' },
        { id: 'b', value: 3, label: '3' },
        { id: 'c', value: 0, label: '0' },
        { id: 'd', value: 2, label: '2' },
      ],
      target: 6,
      instruction: '[1,-2,3,-2]: what are the maximum subarray sums for the non-circular case and the circular (wrap-around) case?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'A circular subarray either does NOT wrap around (standard Kadane problem) or DOES wrap (the selected elements span the array end and start).', xpCost: 0 },
      { id: 2, text: 'For the wrap-around case: the sum equals totalSum - (minimum contiguous subarray sum). The minimum subarray is the middle part that was NOT selected.', xpCost: 0 },
      { id: 3, text: 'Edge case: if all elements are negative, maxSubarray (Kadane) returns the largest negative, but totalSum - minSubarray would return 0. Always return max(maxSum, totalSum - minSum) unless maxSum < 0.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[5,-3,5]. totalSum=7. Run Kadane for maxSubarray.',
        state: { nums: [5,-3,5], totalSum: 7 },
        annotation: 'Start: compute total and max subarray',
      },
      {
        id: 2,
        description: 'Kadane: curMax=0. i=0: curMax=max(0,5)=5. i=1: curMax=max(0,5-3)=2. i=2: curMax=max(0,2+5)=7. maxSum=7.',
        state: { maxSum: 7, path: 'entire array' },
        annotation: 'Kadane result: 7',
      },
      {
        id: 3,
        description: 'Min subarray (Kadane for minimum): curMin=0. i=0: curMin=min(0,5)=0→keep 0. i=1: curMin=min(0,-3)=-3. i=2: curMin=min(0,-3+5)=0→reset. minSum=-3.',
        state: { minSum: -3 },
        annotation: 'Min subarray: -3',
      },
      {
        id: 4,
        description: 'Wrap result = totalSum - minSum = 7-(-3) = 10. This selects [5,5] wrapping around.',
        state: { wrapSum: 10 },
        annotation: 'Wrap-around: 10',
      },
      {
        id: 5,
        description: 'maxSum=7 > 0, so answer = max(maxSum, wrapSum) = max(7,10) = 10.',
        state: { maxSum: 7, wrapSum: 10, answer: 10 },
        annotation: 'Answer: 10',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Two linear passes (one for max subarray, one for min subarray, or combined in one pass).',
      spaceExplanation: 'Constant extra variables.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxSubarraySumCircular(nums) {
  let totalSum = 0;
  let maxSum = nums[0], curMax = 0;
  let minSum = nums[0], curMin = 0;

  for (const num of nums) {
    curMax = Math.max(curMax + num, num);
    maxSum = Math.max(maxSum, curMax);

    curMin = Math.min(curMin + num, num);
    minSum = Math.min(minSum, curMin);

    totalSum += num;
  }

  // If all numbers are negative, maxSum is the largest single element
  // totalSum - minSum would be 0 (empty array), which is invalid
  return maxSum > 0 ? Math.max(maxSum, totalSum - minSum) : maxSum;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all O(n²) subarrays including wrapping ones. Sum each in O(n) → O(n³) total.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'O(n²) subarrays with O(1) running sum.', spaceExplanation: 'No extra space.', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Run Kadane twice simultaneously — once for max, once for min. Wrap case = totalSum - minSubarray.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass computing max, min, and total.', spaceExplanation: 'Four scalar variables.', visualization: 'linear' },
      },
      followUps: [
        'Maximum Sum Subarray (LC 53) — standard Kadane, no circular',
        'What if you need to return the subarray itself, not just the sum?',
        'What if you can pick at most k elements from the circular array?',
      ],
      edgeCases: [
        'All negative → largest single element (Kadane result)',
        'All positive → sum of all (either maxSum or totalSum-0)',
        'Single element → return that element',
        'Mix with zeros → handled naturally',
      ],
      commonMistakes: [
        'Not handling the all-negative edge case (totalSum - minSum = 0 is invalid for non-empty arrays)',
        'Initializing curMax/curMin to 0 instead of the running approach',
        'Forgetting to initialize maxSum/minSum to nums[0] (not 0)',
      ],
      interviewerTips: [
        'The key insight: a circular subarray is either a regular subarray, or everything EXCEPT a middle part',
        'The all-negative edge case is the classic trap — probe for it explicitly',
        'Can be done in a single pass by running both Kadane variants simultaneously',
      ],
    },
    codeChallenge: {
      functionName: 'maxSubarraySumCircular',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubarraySumCircular(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, -2, 3, -2]], expected: 3, description: '[1,-2,3,-2] → 3 (subarray [3])' },
        { input: [[5, -3, 5]], expected: 10, description: '[5,-3,5] → 10 (wrap: 5+5)' },
        { input: [[-3, -2, -3]], expected: -2, description: 'All negative → -2' },
        { input: [[3, -1, 2, -1]], expected: 4, description: '[3,-1,2,-1] → 4 (3-1+2)' },
        { input: [[3, -2, 2, -3]], expected: 3, description: '[3,-2,2,-3] → 3 (wrap: 3 alone or 3+start)' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['maximum-subarray'],
    relatedPatterns: ['Kadane\'s Algorithm', 'Circular Array', 'Max/Min DP'],
    intuitionSummary: 'A circular subarray is either a standard subarray (Kadane) or the complement of the minimum subarray — take the maximum of both cases.',
    patternName: 'Circular Kadane DP',
  },
];

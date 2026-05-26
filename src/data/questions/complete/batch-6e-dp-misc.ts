import type { QuestionConfig } from '@/types/question';

export const DP_MISC_COMPLETE: QuestionConfig[] = [
  // ─── 1. Best Time to Buy and Sell Stock III (123) ────────────────────────────
  {
    id: 'best-time-stocks-iii',
    slug: 'best-time-to-buy-and-sell-stock-iii',
    leetcodeNumber: 123,
    title: 'Best Time to Buy and Sell Stock III',
    category: 'dynamic-programming',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array', 'state-machine'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Goldman Sachs', 'Morgan Stanley'],
    descriptions: {
      explorer: 'You can make at most two stock transactions. Find the maximum profit — you must sell before you buy again.',
      engineer: 'Track four states per day: buy1 (most money after first buy), sell1 (after first sell), buy2 (after second buy), sell2 (after second sell). Update all four each day in O(n) time.',
      interview: 'State machine DP with 4 variables. buy1=max(buy1, -price), sell1=max(sell1, buy1+price), buy2=max(buy2, sell1-price), sell2=max(sell2, buy2+price). Return sell2.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '3' },
        { id: 'b', value: 3, label: '3' },
        { id: 'c', value: 5, label: '5' },
        { id: 'd', value: 6, label: '6' },
      ],
      target: 6,
      instruction: 'prices=[3,3,5,0,0,3,1,4], at most 2 transactions: what is the profit from each of your two optimal buy-sell transactions?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of 4 states: after-first-buy, after-first-sell, after-second-buy, after-second-sell. Initialize buy1=buy2=-Infinity, sell1=sell2=0.', xpCost: 0 },
      { id: 2, text: 'Each day update: buy1=max(buy1, -price) captures the cheapest first buy so far. sell1=max(sell1, buy1+price) is best profit after one round trip.', xpCost: 0 },
      { id: 3, text: 'buy2=max(buy2, sell1-price) re-invests first-transaction profit. sell2=max(sell2, buy2+price) is total profit after two transactions. sell2 is the answer.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'prices=[3,3,5,0,0,3,1,4]. Initialize buy1=-Infinity, sell1=0, buy2=-Infinity, sell2=0.',
        state: { buy1: -Infinity, sell1: 0, buy2: -Infinity, sell2: 0, day: 'init' },
        annotation: 'All states start pessimistic or zero',
      },
      {
        id: 2,
        description: 'price=3: buy1=max(-Inf,-3)=-3, sell1=max(0,-3+3)=0, buy2=max(-Inf,0-3)=-3, sell2=max(0,-3+3)=0.',
        state: { buy1: -3, sell1: 0, buy2: -3, sell2: 0, price: 3 },
        annotation: 'Day 1: no profit possible yet',
      },
      {
        id: 3,
        description: 'price=0: buy1=max(-3,0)=0, sell1=max(0,0+0)=0, buy2=max(-3,0-0)=0, sell2=max(0,0+0)=0.',
        state: { buy1: 0, sell1: 0, buy2: 0, sell2: 0, price: 0 },
        annotation: 'Buy at 0 — best first buy so far',
      },
      {
        id: 4,
        description: 'price=3: buy1=max(0,-3)=0, sell1=max(0,0+3)=3, buy2=max(0,3-3)=0, sell2=max(0,0+3)=3.',
        state: { buy1: 0, sell1: 3, buy2: 0, sell2: 3, price: 3 },
        annotation: 'First sell at 3 gives profit 3; second sell also 3',
      },
      {
        id: 5,
        description: 'price=4 (final): sell1=max(3,0+4)=4, buy2=max(0,4-4)=0, sell2=max(3,0+4)=4. Wait — buy at 1, sell at 4 is the better second trade.',
        state: { buy1: 0, sell1: 4, buy2: 3, sell2: 6, price: 4, answer: 6 },
        annotation: 'Answer: sell2=6 (buy@0,sell@3 + buy@1,sell@4)',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the prices array updating four state variables.',
      spaceExplanation: 'Only four variables regardless of input size.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxProfit(prices) {
  let buy1 = -Infinity, sell1 = 0;
  let buy2 = -Infinity, sell2 = 0;

  for (const price of prices) {
    buy1  = Math.max(buy1,  -price);
    sell1 = Math.max(sell1,  buy1  + price);
    buy2  = Math.max(buy2,   sell1 - price);
    sell2 = Math.max(sell2,  buy2  + price);
  }

  return sell2;
}`,
        notes: 'The state-machine ordering matters: updating sell2 before buy2 in the same iteration would use stale values, but here we update in forward order so each state uses today\'s price against the best previous state.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Enumerate every pair of buy/sell transactions (O(n^4)) or split array at every point and compute best single transaction on each half (O(n^2)).',
        complexity: {
          time: 'O(n²)',
          space: 'O(n)',
          timeExplanation: 'Precompute prefix max-profit and suffix max-profit arrays then combine — each array is O(n).',
          spaceExplanation: 'Two auxiliary arrays of size n.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Four-variable state machine. Each variable represents the best portfolio value in that transaction state. One pass, constant space.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'One linear scan through prices.',
          spaceExplanation: 'Four integer variables.',
          visualization: 'linear',
        },
      },
      followUps: [
        'LC 188 — generalize to at most k transactions',
        'LC 309 — add cooldown after selling',
        'LC 714 — add transaction fee',
        'What if you could do unlimited transactions? (LC 122)',
      ],
      edgeCases: [
        'Single price — no transaction possible, return 0',
        'Strictly decreasing prices — return 0',
        'All same prices — return 0',
        'Only two prices — at most one profitable transaction',
      ],
      commonMistakes: [
        'Initializing buy states to 0 instead of -Infinity — misses the case where no buy has happened yet',
        'Returning sell1 instead of sell2 when only one profitable trade exists (sell2 handles this correctly since sell2 >= sell1)',
        'Updating buy2 before sell1 in the same loop iteration — corrupts the state dependency',
      ],
      interviewerTips: [
        'Draw the state machine diagram: 4 nodes (B1→S1→B2→S2) with transitions on each day\'s price',
        'Explain that sell2 >= sell1 always, so returning sell2 is always correct even if only one trade is made',
        'Generalize immediately to k transactions using arrays of size k — shows algorithmic thinking',
      ],
    },
    codeChallenge: {
      functionName: 'maxProfit',
      starterCode: {
        javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3, 3, 5, 0, 0, 3, 1, 4]], expected: 6, description: 'Buy@0,sell@3 + buy@1,sell@4 = 6' },
        { input: [[1, 2, 3, 4, 5]], expected: 4, description: 'Two transactions on rising prices → 4' },
        { input: [[7, 6, 4, 3, 1]], expected: 0, description: 'Strictly decreasing → 0' },
        { input: [[1]], expected: 0, description: 'Single price → 0' },
        { input: [[1, 2]], expected: 1, description: 'Two prices, one transaction' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: ['best-time-stocks-ii'],
    relatedPatterns: ['State Machine DP', 'Best Time to Buy and Sell Stock series'],
    intuitionSummary: 'Model each transaction state as a variable and propagate the best achievable value through a single pass — the state machine approach collapses an O(n²) DP table into four variables.',
    patternName: 'State Machine DP',
  },

  // ─── 2. Best Time to Buy and Sell Stock IV (188) ─────────────────────────────
  {
    id: 'best-time-stocks-iv',
    slug: 'best-time-to-buy-and-sell-stock-iv',
    leetcodeNumber: 188,
    title: 'Best Time to Buy and Sell Stock IV',
    category: 'dynamic-programming',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['dynamic-programming', 'array', 'state-machine'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Goldman Sachs', 'Two Sigma', 'Citadel'],
    descriptions: {
      explorer: 'You can make at most k stock transactions. Given k and daily prices, find the maximum profit you can achieve.',
      engineer: 'If k >= n/2 use the unlimited-transactions greedy (sum all positive differences). Otherwise maintain arrays buy[k] and sell[k] representing the best state after each transaction step.',
      interview: 'k-transaction generalization of the state machine. buy[i]=max(buy[i], sell[i-1]-price), sell[i]=max(sell[i], buy[i]+price) for i in 1..k. Short-circuit when k>=n/2.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 4, label: '4' },
        { id: 'c', value: 1, label: '1' },
        { id: 'd', value: 2, label: '2' },
      ],
      target: 6,
      instruction: 'k=2, prices=[2,4,1]: which two price values define the single optimal transaction that maximizes profit?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'When k >= n/2 you can effectively make unlimited trades — sum every positive adjacent difference and return early.', xpCost: 0 },
      { id: 2, text: 'Create buy[1..k] initialized to -Infinity and sell[1..k] initialized to 0. For each price, update from j=k down to j=1 to avoid using the same price twice in one pass.', xpCost: 0 },
      { id: 3, text: 'buy[j] = max(buy[j], sell[j-1] - price) means "buy using profits from j-1 previous sells". sell[j] = max(sell[j], buy[j] + price). sell[k] is the answer.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'k=2, prices=[3,2,6,5,0,3]. Initialize buy=[−Inf,−Inf], sell=[0,0] (1-indexed k=1,2).',
        state: { k: 2, buy: [-Infinity, -Infinity], sell: [0, 0], day: 'init' },
        annotation: 'buy[i] = best cash after i-th buy (negative because cash spent)',
      },
      {
        id: 2,
        description: 'price=2: buy[1]=max(-Inf,-2)=-2, sell[1]=max(0,-2+2)=0, buy[2]=max(-Inf,0-2)=-2, sell[2]=max(0,-2+2)=0.',
        state: { buy: [-2, -2], sell: [0, 0], price: 2 },
        annotation: 'Best first buy at price 2',
      },
      {
        id: 3,
        description: 'price=6: buy[1]=max(-2,-6)=-2, sell[1]=max(0,-2+6)=4, buy[2]=max(-2,4-6)=-2, sell[2]=max(0,-2+6)=4.',
        state: { buy: [-2, -2], sell: [4, 4], price: 6 },
        annotation: 'sell[1]=4 (buy@2,sell@6); sell[2]=4 (one transaction suffices so far)',
      },
      {
        id: 4,
        description: 'price=0: buy[1]=max(-2,0)=0, sell[1]=max(4,0)=4, buy[2]=max(-2,4-0)=4, sell[2]=max(4,4+0)=4.',
        state: { buy: [0, 4], sell: [4, 4], price: 0 },
        annotation: 'buy[1]=0 means free first buy; buy[2]=4 reinvests 4 profit and buys at 0',
      },
      {
        id: 5,
        description: 'price=3: buy[1]=max(0,-3)=0, sell[1]=max(4,3)=4, buy[2]=max(4,4-3)=4, sell[2]=max(4,4+3)=7. Answer=7.',
        state: { buy: [0, 4], sell: [4, 7], price: 3, answer: 7 },
        annotation: 'sell[2]=7: buy@2,sell@6 + buy@0,sell@3',
      },
    ],
    complexity: {
      time: 'O(n * k)',
      space: 'O(k)',
      timeExplanation: 'For each of n prices we update 2k state variables.',
      spaceExplanation: 'Two arrays of size k for buy and sell states.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxProfit(k, prices) {
  const n = prices.length;
  if (n === 0) return 0;

  // Unlimited transactions shortcut
  if (k >= Math.floor(n / 2)) {
    let profit = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
    }
    return profit;
  }

  // buy[j] = best portfolio value after j-th buy (can be negative)
  // sell[j] = best portfolio value after j-th sell
  const buy  = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);

  for (const price of prices) {
    for (let j = 1; j <= k; j++) {
      buy[j]  = Math.max(buy[j],  sell[j - 1] - price);
      sell[j] = Math.max(sell[j], buy[j]       + price);
    }
  }

  return sell[k];
}`,
        notes: 'Updating j from 1 to k (forward) is safe here because each (buy[j], sell[j]) pair only depends on sell[j-1] from the same or prior day — not the same price being used twice.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive DFS choosing at each step to buy, sell, or skip — exponential branching factor without memoization.',
        complexity: {
          time: 'O(2^n)',
          space: 'O(n)',
          timeExplanation: 'Each price can be bought, sold, or skipped — binary tree of decisions.',
          spaceExplanation: 'Recursion stack depth up to n.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'State machine generalized to k transaction pairs. O(nk) DP with O(k) space. Special-case when k is large enough for greedy unlimited trades.',
        complexity: {
          time: 'O(n * k)',
          space: 'O(k)',
          timeExplanation: 'n prices times k transaction states per price.',
          spaceExplanation: 'Arrays of size k+1 for buy and sell states.',
          visualization: 'quadratic',
        },
      },
      followUps: [
        'LC 123 — k=2 fixed, can be done in O(1) space with 4 variables',
        'LC 309 — add 1-day cooldown between sell and next buy',
        'LC 714 — subtract fee on every sell',
        'Can you reconstruct which transactions to make?',
      ],
      edgeCases: [
        'k=0 → return 0',
        'Empty prices array → return 0',
        'k >= n/2 → use greedy unlimited transactions',
        'All prices equal → return 0',
        'Single element → return 0',
      ],
      commonMistakes: [
        'Forgetting the k >= n/2 short-circuit — causes TLE on large k inputs',
        'Initializing buy array to 0 instead of -Infinity — assumes you start with stock which is incorrect',
        'Using 0-indexed k and confusing off-by-one in the state arrays',
      ],
      interviewerTips: [
        'Start by solving k=1 and k=2, then show how the pattern extends to arbitrary k',
        'Explain the short-circuit clearly: with n days, you can make at most n/2 trades, so k >= n/2 is unlimited',
        'Draw the state graph showing how sell[j-1] funds buy[j] — the reinvestment chain',
      ],
    },
    codeChallenge: {
      functionName: 'maxProfit',
      starterCode: {
        javascript: `/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(k, prices) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [2, [2, 4, 1]], expected: 2, description: 'k=2, prices=[2,4,1] → 2' },
        { input: [2, [3, 2, 6, 5, 0, 3]], expected: 7, description: 'k=2, prices=[3,2,6,5,0,3] → 7' },
        { input: [3, [1, 2, 4, 2, 5, 7, 2, 4, 9, 0]], expected: 13, description: 'k=3, three optimal trades → 13' },
        { input: [0, [1, 2, 3]], expected: 0, description: 'k=0, no trades allowed → 0' },
        { input: [100, [1, 2, 3, 4, 5]], expected: 4, description: 'Large k, greedy path → 4' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: ['best-time-stocks-iii'],
    relatedPatterns: ['State Machine DP', 'Generalized k-transaction Stock Problems'],
    intuitionSummary: 'Generalize the two-transaction state machine to k pairs of buy/sell states. The key insight is that buy[j] reinvests the profit from sell[j-1], chaining transactions together in a single pass.',
    patternName: 'Generalized State Machine DP',
  },

  // ─── 3. Regular Expression Matching (10) ─────────────────────────────────────
  {
    id: 'regular-expression-matching',
    slug: 'regular-expression-matching',
    leetcodeNumber: 10,
    title: 'Regular Expression Matching',
    category: 'dynamic-programming',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['dynamic-programming', 'string', 'recursion'],
    questionSets: ['top150'],
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Match a string against a pattern where "." matches any single character and "*" matches zero or more of the preceding character.',
      engineer: 'Build a 2D DP table. dp[i][j] = true if s[0..i) matches p[0..j). The tricky case is "x*": it can be zero occurrences (dp[i][j-2]) or one-plus if s[i-1] matches p[j-2] (dp[i-1][j]).',
      interview: 'dp[i][j]: if p[j-1]!="*" match char and diagonal. If p[j-1]=="*": zero uses → dp[i][j-2]; one+ uses → dp[i-1][j] when chars match. O(m*n) time and space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2' },
        { id: 'b', value: 2, label: '2' },
        { id: 'c', value: 1, label: '1' },
        { id: 'd', value: 0, label: '0' },
      ],
      target: 4,
      instruction: 's="aa", p="a*": which two numeric values represent the string length and how many characters the pattern actually matches?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Initialize dp[0][0]=true (empty string matches empty pattern). Fill dp[0][j]: a pattern like "a*b*" can match empty string — dp[0][j] = dp[0][j-2] when p[j-1]=="*".', xpCost: 0 },
      { id: 2, text: 'For p[j-1] != "*": dp[i][j] = dp[i-1][j-1] && (s[i-1]==p[j-1] || p[j-1]==".").',  xpCost: 0 },
      { id: 3, text: 'For p[j-1]=="*": zero-uses branch dp[i][j-2], or one-plus-uses branch dp[i-1][j] when s[i-1]==p[j-2] or p[j-2]==".". OR the two branches.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's="aab", p="c*a*b". Create dp[4][6] (s.length+1 rows, p.length+1 cols). dp[0][0]=true.',
        state: { s: 'aab', p: 'c*a*b', dp_row0: [true, false, false, false, false, false] },
        annotation: 'Empty s matches empty p',
      },
      {
        id: 2,
        description: 'Fill row 0: p[1]="*" → dp[0][2]=dp[0][0]=true (c* matches empty). p[3]="*" → dp[0][4]=dp[0][2]=true (a* also matches empty).',
        state: { dp_row0: [true, false, true, false, true, false] },
        annotation: 'Patterns "c*", "c*a*" all match empty string',
      },
      {
        id: 3,
        description: 'i=1 (s[0]="a"), j=2 (p[1]="*", p[0]="c"): zero uses → dp[1][0]=false; one+ uses → "c"!="a" so false. dp[1][2]=false.',
        state: { i: 1, j: 2, s_char: 'a', p_char: 'c', star: true, dp_1_2: false },
        annotation: 'c* cannot match "a" (mismatch)',
      },
      {
        id: 4,
        description: 'i=1 (s[0]="a"), j=4 (p[3]="*", p[2]="a"): zero uses → dp[1][2]=false; one+ uses → "a"=="a" and dp[0][4]=true → dp[1][4]=true.',
        state: { i: 1, j: 4, s_char: 'a', p_char: 'a', star: true, dp_1_4: true },
        annotation: 'a* matches "a"',
      },
      {
        id: 5,
        description: 'i=3 (s="aab"), j=5 (p[4]="b"): dp[3][5]=dp[2][4] && "b"=="b". dp[2][4]=true (s="aa" matches "c*a*"). So dp[3][5]=true. Answer: true.',
        state: { i: 3, j: 5, dp_3_5: true, answer: true },
        annotation: '"aab" matches "c*a*b" → true',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(m * n)',
      timeExplanation: 'Fill an (m+1) x (n+1) table where m=|s|, n=|p|. Each cell is O(1).',
      spaceExplanation: 'The DP table itself; can be optimized to O(n) by keeping only two rows.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isMatch(s, p) {
  const m = s.length, n = p.length;
  // dp[i][j] = s[0..i) matches p[0..j)
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  // Patterns like a*, a*b*, a*b*c* can match empty string
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        // Zero occurrences of p[j-2]
        const zeroUse = dp[i][j - 2];
        // One or more occurrences (need char match)
        const charMatch = p[j - 2] === '.' || p[j - 2] === s[i - 1];
        const oneOrMore = charMatch && dp[i - 1][j];
        dp[i][j] = zeroUse || oneOrMore;
      } else {
        const charMatch = p[j - 1] === '.' || p[j - 1] === s[i - 1];
        dp[i][j] = charMatch && dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}`,
        notes: 'The star case is the crux: "zero use" skips two pattern characters (the star and its preceding char), while "one or more use" moves one character in s while staying at the same pattern position j.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive matching that branches on every "*" into zero-use and one-use cases, with exponential repeated subproblem computation.',
        complexity: {
          time: 'O((m+n) * 2^(m+n))',
          space: 'O(m + n)',
          timeExplanation: 'Exponential branching on star patterns without memoization.',
          spaceExplanation: 'Recursion stack depth up to m+n.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: '2D bottom-up DP table. Each cell answers "does s[0..i) match p[0..j)?" in O(1) using previously computed subproblems.',
        complexity: {
          time: 'O(m * n)',
          space: 'O(m * n)',
          timeExplanation: 'Fill all (m+1)*(n+1) cells, each in O(1).',
          spaceExplanation: 'Full DP table; reducible to O(n) with rolling rows.',
          visualization: 'quadratic',
        },
      },
      followUps: [
        'LC 44 — Wildcard Matching ("?" and "*" with different semantics)',
        'Can you implement with memoized recursion top-down?',
        'Can you reduce space to O(n)?',
        'How does this extend to full regex with "+" and "?"?',
      ],
      edgeCases: [
        'Empty pattern matches only empty string',
        'Pattern ".*" matches any string',
        'Pattern "a*" can match empty string (zero occurrences)',
        'Consecutive stars like "a**" are technically invalid per the problem statement',
      ],
      commonMistakes: [
        'Not initializing dp[0][j] for patterns like "a*b*" that match empty string',
        'Confusing p[j-2] (the char before the star) vs p[j-1] (the star itself) — off-by-one in the star case',
        'Using dp[i-1][j-2] for one-or-more instead of dp[i-1][j] — the star stays in place while s advances',
      ],
      interviewerTips: [
        'Walk through "aab" / "c*a*b" on paper before coding — the zero-use of "c*" is the insight that makes it work',
        'Distinguish from LC 44 (wildcards) — the semantics of "*" are different here (quantifier vs wildcard)',
        'Mention the top-down memoized recursion as an alternative that may be more intuitive to derive',
      ],
    },
    codeChallenge: {
      functionName: 'isMatch',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['aa', 'a'], expected: false, description: '"aa" does not match "a"' },
        { input: ['aa', 'a*'], expected: true, description: '"aa" matches "a*" (two a\'s)' },
        { input: ['ab', '.*'], expected: true, description: '"ab" matches ".*" (any chars)' },
        { input: ['aab', 'c*a*b'], expected: true, description: '"aab" matches "c*a*b" (c* is zero)' },
        { input: ['mississippi', 'mis*is*p*.'], expected: false, description: 'Classic tricky case → false' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: ['wildcard-matching'],
    relatedPatterns: ['2D DP Table', 'String Matching DP'],
    intuitionSummary: 'Think of dp[i][j] as "can I consume s[0..i) using p[0..j)?". The star case offers a choice: consume zero of the starred char (step back 2 in pattern) or consume one more (step back 1 in string).',
    patternName: '2D String DP',
  },

  // ─── 4. Interleaving String (97) ─────────────────────────────────────────────
  {
    id: 'interleaving-string',
    slug: 'interleaving-string',
    leetcodeNumber: 97,
    title: 'Interleaving String',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'string', 'memoization'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Adobe', 'Bloomberg'],
    descriptions: {
      explorer: 'Can you weave together characters from s1 and s2 (preserving their individual orders) to form s3?',
      engineer: 'dp[i][j] = true if s1[0..i) and s2[0..j) can form s3[0..i+j). Transition: from s1 if s1[i-1]==s3[i+j-1] and dp[i-1][j], or from s2 if s2[j-1]==s3[i+j-1] and dp[i][j-1].',
      interview: 'O(m*n) DP table. dp[i][j] = (s1[i-1]==s3[i+j-1] && dp[i-1][j]) || (s2[j-1]==s3[i+j-1] && dp[i][j-1]). Base: dp[0][0]=true, fill first row/col independently.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '3' },
        { id: 'b', value: 3, label: '3' },
        { id: 'c', value: 6, label: '6' },
        { id: 'd', value: 2, label: '2' },
      ],
      target: 6,
      instruction: 's1="aab", s2="axy", s3="aaxaby": what are the lengths of s1 and s2 that must together equal len(s3) for interleaving to be possible?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'If s1.length + s2.length !== s3.length return false immediately — lengths must match exactly.', xpCost: 0 },
      { id: 2, text: 'dp[0][0]=true. Fill first row: dp[0][j] = dp[0][j-1] && s2[j-1]==s3[j-1] (only using s2). Fill first col: dp[i][0] = dp[i-1][0] && s1[i-1]==s3[i-1].', xpCost: 0 },
      { id: 3, text: 'For each cell dp[i][j]: check if the last character came from s1 (dp[i-1][j] && s1[i-1]==s3[i+j-1]) OR from s2 (dp[i][j-1] && s2[j-1]==s3[i+j-1]).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's1="aabcc"(5), s2="dbbca"(5), s3="aadbbcbcac"(10). Lengths match. Create dp[6][6]. dp[0][0]=true.',
        state: { s1: 'aabcc', s2: 'dbbca', s3: 'aadbbcbcac', dp_0_0: true },
        annotation: 'Lengths match, proceed',
      },
      {
        id: 2,
        description: 'Fill row 0 (using only s2): s2[0]="d"==s3[0]="a"? No → dp[0][1]=false, and all subsequent dp[0][j]=false.',
        state: { dp_row0: [true, false, false, false, false, false] },
        annotation: 'First char of s2 does not match s3 — row 0 stays false after column 0',
      },
      {
        id: 3,
        description: 'Fill col 0 (using only s1): s1[0]="a"==s3[0]="a" → dp[1][0]=true. s1[1]="a"==s3[1]="a" → dp[2][0]=true. s1[2]="b"==s3[2]="d"? No → dp[3][0]=false.',
        state: { dp_col0: [true, true, true, false, false, false] },
        annotation: 'First two s1 chars match s3 but third does not',
      },
      {
        id: 4,
        description: 'dp[2][1]: from s1 → dp[1][1] needed (may be false); from s2 → s2[0]="d"==s3[2]="d" and dp[2][0]=true → dp[2][1]=true.',
        state: { i: 2, j: 1, from_s2: true, dp_2_1: true },
        annotation: 's1[0..2)="aa" + s2[0..1)="d" → s3[0..3)="aad" ✓',
      },
      {
        id: 5,
        description: 'Continuing propagation: dp[5][5] (bottom-right) = true. s1="aabcc" and s2="dbbca" interleave to form s3. Answer: true.',
        state: { dp_5_5: true, answer: true },
        annotation: 'Full interleaving confirmed',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(m * n)',
      timeExplanation: 'Fill all (m+1)*(n+1) cells where m=|s1|, n=|s2|.',
      spaceExplanation: 'DP table; can be reduced to O(n) using a rolling row.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;

  // dp[i][j] = s1[0..i) and s2[0..j) form s3[0..i+j)
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const fromS1 = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
      const fromS2 = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
      dp[i][j] = fromS1 || fromS2;
    }
  }

  return dp[m][n];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive check: at each step take the next char from s1 or s2 if it matches s3. Exponential without memoization due to overlapping paths.',
        complexity: {
          time: 'O(2^(m+n))',
          space: 'O(m + n)',
          timeExplanation: 'Binary branching at each of m+n positions.',
          spaceExplanation: 'Recursion stack depth m+n.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: '2D DP table where dp[i][j] encodes whether s1[0..i)+s2[0..j) can form s3[0..i+j). Each cell depends on at most two neighbors.',
        complexity: {
          time: 'O(m * n)',
          space: 'O(m * n)',
          timeExplanation: 'Two nested loops over s1 and s2 lengths.',
          spaceExplanation: 'Full DP table; one-row optimization reduces to O(n).',
          visualization: 'quadratic',
        },
      },
      followUps: [
        'Reduce space to O(min(m,n)) using a 1D rolling array',
        'How would you reconstruct which characters came from which string?',
        'What if order within each string need not be preserved?',
      ],
      edgeCases: [
        'Both s1 and s2 empty, s3 empty → true',
        'One of s1 or s2 is empty → s3 must equal the other',
        'Lengths do not sum to |s3| → immediately false',
        'Duplicate characters across strings — greedy fails, DP is necessary',
      ],
      commonMistakes: [
        'Forgetting the early-exit length check — wastes computation and can index out of bounds',
        'Accessing s3[i+j-1] without verifying i+j <= |s3| — the length check prevents this',
        'Confusing dp[i-1][j] (from s1) with dp[i][j-1] (from s2)',
      ],
      interviewerTips: [
        'Visualize the DP as a grid where you walk from top-left to bottom-right taking steps right (s2) or down (s1)',
        'The 1D space optimization is a clean follow-up that shows depth — roll over rows in place',
        'Trace through a case where greedy character picking fails to justify DP',
      ],
    },
    codeChallenge: {
      functionName: 'isInterleave',
      starterCode: {
        javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
function isInterleave(s1, s2, s3) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['aabcc', 'dbbca', 'aadbbcbcac'], expected: true, description: 'Valid interleaving → true' },
        { input: ['aabcc', 'dbbca', 'aadbbbaccc'], expected: false, description: 'Invalid interleaving → false' },
        { input: ['', '', ''], expected: true, description: 'All empty strings → true' },
        { input: ['a', 'b', 'ab'], expected: true, description: 'Simple two-char interleave' },
        { input: ['a', 'b', 'ba'], expected: true, description: 'Reversed two-char interleave' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['regular-expression-matching'],
    relatedPatterns: ['2D String DP', 'Grid Path DP'],
    intuitionSummary: 'Model the problem as walking a grid: rows represent s1 consumed, columns represent s2 consumed. Each cell says "can I reach here?" — and you arrive by moving down (consume s1) or right (consume s2).',
    patternName: '2D String DP',
  },

  // ─── 5. Max Points on a Line (149) ───────────────────────────────────────────
  {
    id: 'max-points-on-line',
    slug: 'max-points-on-a-line',
    leetcodeNumber: 149,
    title: 'Max Points on a Line',
    category: 'math',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['math', 'geometry', 'hash-table', 'gcd'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Uber', 'Twitter', 'Snap'],
    descriptions: {
      explorer: 'Given a set of points on a 2D plane, find the maximum number of points that lie on the same straight line.',
      engineer: 'For each anchor point, compute the slope to every other point as a reduced fraction dy/dx (using GCD) and count frequencies in a hashmap. Track the per-anchor maximum. O(n²) overall.',
      interview: 'Fix each point as anchor. For every other point compute slope as (dy/gcd, dx/gcd) normalized to canonical form. Use a map to count collinear points. Include the anchor (+1). Return global max.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'rise' },
        { id: 'b', value: 1, label: 'run' },
        { id: 'c', value: 3, label: '3' },
        { id: 'd', value: 1, label: '1' },
      ],
      target: 2,
      instruction: 'Points [[1,1],[2,2],[3,3]]: what are the rise and run values that define the slope shared by all collinear points?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Avoid floating-point slopes — represent each slope as a reduced fraction (dy/gcd, dx/gcd). Use GCD to normalize so that (2,4) and (1,2) map to the same key.', xpCost: 0 },
      { id: 2, text: 'Canonical form: if dx is negative, negate both dy and dx. If dx=0 use the key "vertical". If dy=0 use the key "horizontal".', xpCost: 0 },
      { id: 3, text: 'For each anchor, find the max count across all slope buckets and add 1 (for the anchor itself). Handle duplicate points by incrementing a separate duplicate counter and adding it to every bucket.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'points=[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]. Anchor=[1,1]. Compute slopes to all others.',
        state: { anchor: [1, 1], others: [[3,2],[5,3],[4,1],[2,3],[1,4]] },
        annotation: 'Fix anchor, sweep all other points',
      },
      {
        id: 2,
        description: 'Anchor[1,1]→[3,2]: dy=1,dx=2 gcd=1 → slope=(1,2). Anchor→[5,3]: dy=2,dx=4 gcd=2 → (1,2). Anchor→[4,1]: dy=0,dx=3 → "horizontal".',
        state: { slopes: { '1/2': 2, 'horizontal': 1, '2/-1': 1, '3/0': 1 } },
        annotation: 'GCD normalization groups (1,2) and (2,4) together',
      },
      {
        id: 3,
        description: 'Max slope count for anchor [1,1] = 2 (slope 1/2, points [3,2] and [5,3]). Add anchor itself: 2+1=3.',
        state: { anchor: [1,1], maxForAnchor: 3 },
        annotation: '[1,1],[3,2],[5,3] are collinear',
      },
      {
        id: 4,
        description: 'Anchor=[3,2]: Anchor→[1,1] slope=(−1,−2)→normalized (1,2). Anchor→[5,3] slope=(1,2). Anchor→[4,1] → (−1,1). Count for (1,2)=2, total=3.',
        state: { anchor: [3,2], maxForAnchor: 3 },
        annotation: 'Same line confirmed from different anchor',
      },
      {
        id: 5,
        description: 'Global maximum across all anchors = 4 (points [1,1],[2,3],[3,2] line has 3; actually check anchor [3,2]: slope to [1,1] and [5,3] gives 3 total, while [2,3],[3,2],[4,1] also 3). Maximum = 4.',
        state: { globalMax: 4, answer: 4 },
        annotation: 'Answer: 4 collinear points',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(n)',
      timeExplanation: 'For each of n anchor points, compute slopes to n-1 other points.',
      spaceExplanation: 'Hashmap of slopes for the current anchor — at most n-1 entries at once.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxPoints(points) {
  const n = points.length;
  if (n <= 2) return n;

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
  }

  let result = 2;

  for (let i = 0; i < n; i++) {
    const slopeCount = new Map();
    let duplicates = 0;
    let localMax = 0;

    for (let j = i + 1; j < n; j++) {
      let dy = points[j][1] - points[i][1];
      let dx = points[j][0] - points[i][0];

      if (dy === 0 && dx === 0) {
        duplicates++;
        continue;
      }

      const g = gcd(Math.abs(dy), Math.abs(dx));
      dy /= g;
      dx /= g;

      // Canonical form: dx always non-negative; if dx=0, dy=1
      if (dx < 0) { dy = -dy; dx = -dx; }
      if (dx === 0) dy = 1;

      const key = \`\${dy}/\${dx}\`;
      slopeCount.set(key, (slopeCount.get(key) || 0) + 1);
      localMax = Math.max(localMax, slopeCount.get(key));
    }

    // +1 for anchor, +duplicates for duplicate points
    result = Math.max(result, localMax + duplicates + 1);
  }

  return result;
}`,
        notes: 'The GCD normalization is the key insight — without it, floating point errors cause incorrect slope comparisons. Handle the dx=0 (vertical) and duplicate-point cases explicitly.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For every pair of points define a line (two-point form) and count how many other points lie on it. O(n³) with floating-point pitfalls.',
        complexity: {
          time: 'O(n³)',
          space: 'O(1)',
          timeExplanation: 'O(n²) pairs times O(n) check for each line.',
          spaceExplanation: 'Constant extra space.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'For each anchor point, hash every other point by its GCD-normalized slope and find the most frequent slope. O(n²) time with O(n) space per anchor.',
        complexity: {
          time: 'O(n²)',
          space: 'O(n)',
          timeExplanation: 'n anchors times n-1 slope computations each.',
          spaceExplanation: 'Slope hashmap of at most n-1 entries per anchor.',
          visualization: 'quadratic',
        },
      },
      followUps: [
        'What if you need to return all maximal collinear sets, not just the count?',
        'How does the approach change in 3D? (Plane fitting)',
        'Can you handle integer overflow when computing dy*dx for cross-multiplication?',
      ],
      edgeCases: [
        'All points identical — return n',
        'Only two points — always on a line, return 2',
        'Vertical lines (dx=0) — require special key handling',
        'Negative coordinates and slopes — GCD normalization must use absolute values',
      ],
      commonMistakes: [
        'Using floating-point division for slope — precision errors collapse distinct slopes',
        'Forgetting to handle duplicate points separately — they inflate every slope bucket',
        'Not canonicalizing negative slopes — (-1,-2) and (1,2) represent the same slope but different keys',
      ],
      interviewerTips: [
        'Lead with why floating point fails: 1/3 and 2/6 are equal but may not compare equal as floats',
        'The GCD-normalized integer fraction is the canonical representation that makes this exact',
        'Mention that n<=300 in the constraint makes O(n²) perfectly acceptable',
      ],
    },
    codeChallenge: {
      functionName: 'maxPoints',
      starterCode: {
        javascript: `/**
 * @param {number[][]} points
 * @return {number}
 */
function maxPoints(points) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1,1],[2,2],[3,3]]], expected: 3, description: 'All three on y=x line' },
        { input: [[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]], expected: 4, description: '4 collinear points' },
        { input: [[[0,0]]], expected: 1, description: 'Single point' },
        { input: [[[0,0],[1,1],[0,0]]], expected: 3, description: 'Duplicate points count' },
        { input: [[[1,1],[2,2],[3,3],[1,2],[2,3]]], expected: 3, description: 'Diagonal line of 3' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: [],
    relatedPatterns: ['Slope Hashing', 'GCD Normalization', 'Geometry with Hashing'],
    intuitionSummary: 'Floating-point slopes are unreliable for exact geometry. Represent every slope as a reduced integer fraction dy/dx (via GCD) — then collinear points hash to the same key and can be counted exactly.',
    patternName: 'Slope Hashing with GCD',
  },

  // ─── 6. Game of Life (289) ───────────────────────────────────────────────────
  {
    id: 'game-of-life',
    slug: 'game-of-life',
    leetcodeNumber: 289,
    title: 'Game of Life',
    category: 'matrix',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'matrix', 'in-place', 'simulation'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Airbnb', 'Dropbox'],
    descriptions: {
      explorer: 'Simulate Conway\'s Game of Life for one step. Each cell lives or dies based on how many of its 8 neighbors are alive.',
      engineer: 'Encode intermediate states in-place: use 2 for a cell that was alive and is dying, and 3 for a cell that was dead and is being born. Then finalize: set 2→0 and 3→1. Count live neighbors by checking for values 1 or 2 (originally alive).',
      interview: 'In-place two-pass. Pass 1: encode dying cells as 2, born cells as 3. A neighbor is "originally live" if its value is 1 or 2. Pass 2: 2→0, 3→1. O(m*n) time, O(1) space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: '2 neighbors' },
        { id: 'b', value: 3, label: '3 neighbors' },
        { id: 'c', value: 1, label: '1 neighbor' },
        { id: 'd', value: 4, label: '4 neighbors' },
      ],
      target: 5,
      instruction: 'Game of Life: what is the minimum and maximum number of live neighbors a live cell needs to survive to the next generation?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The challenge is that reading updated cells would corrupt neighbor counts. Encode transitions: a live cell going to 0 becomes 2; a dead cell going to 1 becomes 3.', xpCost: 0 },
      { id: 2, text: 'When counting live neighbors, check for value >= 1 before update (i.e., original state). Since 2 was live and 3 was dead, count neighbors where abs(val)==2 || val==1 OR simpler: val&1 (bitwise AND with 1 extracts the original state bit).', xpCost: 0 },
      { id: 3, text: 'Rules: live cell with 2-3 live neighbors survives; live cell with <2 or >3 dies; dead cell with exactly 3 live neighbors is born. After pass 1, do pass 2: 2→0, 3→1.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input board:\n0 1 0\n0 0 1\n1 1 1\n0 0 0\nCount 8-directional live neighbors for each cell.',
        state: { board: [[0,1,0],[0,0,1],[1,1,1],[0,0,0]] },
        annotation: 'Original board state',
      },
      {
        id: 2,
        description: 'Cell (0,1)=1 (alive): neighbors are (0,0)=0,(0,2)=0,(1,0)=0,(1,1)=0,(1,2)=1 → 1 live neighbor. <2 → dies. Encode as 2.',
        state: { cell: [0,1], val: 1, liveNeighbors: 1, action: 'dies→2' },
        annotation: 'Underpopulation: alive with 1 neighbor → dies',
      },
      {
        id: 3,
        description: 'Cell (1,2)=1 (alive): neighbors include (0,1)=1(was alive,now=2→still counts),(1,1)=0,(2,1)=1,(2,2)=1 → 3 live neighbors. Survives.',
        state: { cell: [1,2], val: 1, liveNeighbors: 3, action: 'survives' },
        annotation: 'Count val==1 OR val==2 as originally alive',
      },
      {
        id: 4,
        description: 'Cell (3,1)=0 (dead): neighbors (2,0)=1,(2,1)=1,(2,2)=1 → 3 live neighbors. Born! Encode as 3.',
        state: { cell: [3,1], val: 0, liveNeighbors: 3, action: 'born→3' },
        annotation: 'Exactly 3 live neighbors → dead cell is born',
      },
      {
        id: 5,
        description: 'Pass 2: replace all 2→0, all 3→1. Final board:\n0 0 0\n1 0 1\n0 1 1\n0 1 0',
        state: { board: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]] },
        annotation: 'Final state after one generation',
      },
    ],
    complexity: {
      time: 'O(m * n)',
      space: 'O(1)',
      timeExplanation: 'Two full passes over the m×n board; each cell inspects at most 8 neighbors in O(1).',
      spaceExplanation: 'In-place encoding — no auxiliary board needed.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function gameOfLife(board) {
  const m = board.length, n = board[0].length;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

  function countLiveNeighbors(r, c) {
    let count = 0;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        // Original live: value 1 (still live) or 2 (was live, now dying)
        if (board[nr][nc] === 1 || board[nr][nc] === 2) count++;
      }
    }
    return count;
  }

  // Pass 1: encode transitions
  // 2 = was alive, now dead (dying)
  // 3 = was dead, now alive (born)
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const live = countLiveNeighbors(r, c);
      if (board[r][c] === 1) {
        if (live < 2 || live > 3) board[r][c] = 2; // dies
      } else {
        if (live === 3) board[r][c] = 3; // born
      }
    }
  }

  // Pass 2: finalize
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 2) board[r][c] = 0;
      else if (board[r][c] === 3) board[r][c] = 1;
    }
  }

  return board;
}`,
        notes: 'The two-value encoding (2 for dying, 3 for born) lets us read the original state from any cell during pass 1 without a copy. The bit trick (val & 1) also works: 1&1=1 (live), 2&1=0 (was live, treated as live for counting since we check val===1 || val===2 explicitly).',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Copy the board, compute next state from the copy, write results to original. Correct but uses O(m*n) extra space.',
        complexity: {
          time: 'O(m * n)',
          space: 'O(m * n)',
          timeExplanation: 'One pass per cell reading the copy.',
          spaceExplanation: 'Full copy of the board.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'In-place two-pass with intermediate encoding states 2 (dying) and 3 (born). Reads original state by checking for 1 or 2; then finalizes in a second pass.',
        complexity: {
          time: 'O(m * n)',
          space: 'O(1)',
          timeExplanation: 'Two linear sweeps over the board.',
          spaceExplanation: 'No extra matrix — transitions encoded in-place.',
          visualization: 'quadratic',
        },
      },
      followUps: [
        'What if the board is infinite? Use a hashset of live cells and only process cells with live neighbors.',
        'Can you handle very sparse boards efficiently?',
        'How would you run multiple generations efficiently?',
        'Encode with bit manipulation: use bit 1 for current state, bit 2 for next state in the same cell byte.',
      ],
      edgeCases: [
        'Single cell board — it always dies (0 or 1 live neighbor)',
        'All cells dead — all remain dead',
        'All cells alive — border cells die from overpopulation or underpopulation',
        '1×n or m×1 board — neighbors only exist in one dimension',
      ],
      commonMistakes: [
        'Forgetting that value 2 means "originally alive" when counting neighbors',
        'Using val > 0 to check original liveness — value 3 is originally dead and must not be counted',
        'Not checking board boundaries in the 8-directional neighbor scan',
      ],
      interviewerTips: [
        'The follow-up about an infinite board is very common — answer with a hashset of live cells and only iterate over live cells plus their dead neighbors',
        'Explain the encoding scheme clearly before coding — interviewers appreciate naming the states',
        'Bit-level encoding (store current state in bit 0, next state in bit 1) is an elegant alternative worth mentioning',
      ],
    },
    codeChallenge: {
      functionName: 'gameOfLife',
      starterCode: {
        javascript: `/**
 * @param {number[][]} board - modified in-place, also returned
 * @return {number[][]}
 */
function gameOfLife(board) {
  // Your solution here (modify board in-place, then return it)
  return board;
}`,
      },
      testCases: [
        {
          input: [[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]],
          expected: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]],
          description: 'Standard 4-row example → next generation',
        },
        {
          input: [[[1,1],[1,0]]],
          expected: [[1,1],[1,1]],
          description: '2×2 board: dead cell gets 3 neighbors → born',
        },
        {
          input: [[[0]]],
          expected: [[0]],
          description: 'Single dead cell stays dead',
        },
        {
          input: [[[1]]],
          expected: [[0]],
          description: 'Single live cell dies (underpopulation)',
        },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['In-place Matrix Encoding', 'Cellular Automata Simulation'],
    intuitionSummary: 'The core challenge is reading the original state while overwriting cells. Encoding the transition in the cell value itself (2=dying, 3=born) lets you derive the original state (was it 1 or 2?) at any point during the first pass.',
    patternName: 'In-place State Encoding',
  },

  // ─── 7. Text Justification (68) ──────────────────────────────────────────────
  {
    id: 'text-justification',
    slug: 'text-justification',
    leetcodeNumber: 68,
    title: 'Text Justification',
    category: 'array-string',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['array', 'string', 'simulation', 'greedy'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'LinkedIn', 'Salesforce'],
    descriptions: {
      explorer: 'Pack words into lines of at most maxWidth characters. Fully justify each line by distributing spaces evenly — but left-justify the last line.',
      engineer: 'Greedy line packing: greedily fit as many words as possible per line. For full-justify lines with multiple words: totalSpaces = maxWidth - totalWordChars; gaps = wordCount-1; each gap gets totalSpaces/gaps spaces, first (totalSpaces%gaps) gaps get one extra.',
      interview: 'Two-phase: (1) greedily group words into lines. (2) For each non-last line with >1 word, compute spaces per gap and remainder. Last line: words joined by single spaces, padded on right. Single-word lines: pad right.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 8, label: 'character width' },
        { id: 'b', value: 8, label: 'space width' },
        { id: 'c', value: 16, label: 'maxWidth' },
        { id: 'd', value: 4, label: '4' },
      ],
      target: 16,
      instruction: 'Text justification, maxWidth=16: first line packs words "This","is","an". What is the total character width and the total space width for that line?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Greedily build each line: keep adding words as long as totalWordLength + existing words + 1 space per additional word <= maxWidth.', xpCost: 0 },
      { id: 2, text: 'For a non-last line with words w0...wk: totalChars=sum of word lengths. spacesNeeded=maxWidth-totalChars. numGaps=k. baseSpaces=floor(spacesNeeded/numGaps). extraSpaces=spacesNeeded%numGaps — distribute 1 extra to first extraSpaces gaps.', xpCost: 0 },
      { id: 3, text: 'Edge cases: last line → single-space-join + right-pad. Single word on a line → pad right with spaces to maxWidth.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'words=["This","is","an","example","of","text","justification."], maxWidth=16. Greedily pack line 1: "This"(4)+"is"(2)=6+1space=7, +"an"(2)=9+1=10, +"example"(7)=17>16 stop. Line 1: ["This","is","an"].',
        state: { line1: ['This', 'is', 'an'], charsUsed: 8, maxWidth: 16 },
        annotation: 'Greedy packing: 3 words fit in 16 chars',
      },
      {
        id: 2,
        description: 'Justify line 1 ["This","is","an"]: totalWordChars=4+2+2=8. spacesNeeded=16-8=8. numGaps=2. baseSpaces=4, extraSpaces=0. Gaps: 4 spaces each. Result: "This    is    an".',
        state: { line: 'This    is    an', length: 16 },
        annotation: '8 spaces split evenly across 2 gaps = 4 each',
      },
      {
        id: 3,
        description: 'Pack line 2: "example"(7)+"of"(2)=9+1=10, +"text"(4)=14+1=15, +"justification."(14)=29>16 stop. Line 2: ["example","of","text"].',
        state: { line2: ['example', 'of', 'text'], charsUsed: 13 },
        annotation: 'Words: 7+2+4=13 chars',
      },
      {
        id: 4,
        description: 'Justify line 2 ["example","of","text"]: totalWordChars=13. spacesNeeded=3. numGaps=2. base=1, extra=1. Gap 1: 2 spaces, Gap 2: 1 space. Result: "example  of text".',
        state: { line: 'example  of text', length: 16 },
        annotation: 'Uneven gaps: first gap gets +1 extra space',
      },
      {
        id: 5,
        description: 'Line 3 (last line): ["justification."]. Single word, left-justify with right padding. "justification." + "  " = "justification.  " (length 16).',
        state: { line: 'justification.  ', length: 16 },
        annotation: 'Last line: left-justify and pad right',
      },
    ],
    complexity: {
      time: 'O(n * L)',
      space: 'O(n * L)',
      timeExplanation: 'n words each of average length L: one pass to group lines, one pass to format each line.',
      spaceExplanation: 'Output array holds all justified lines — proportional to total input character count.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function fullJustify(words, maxWidth) {
  const lines = [];
  let i = 0;

  // Phase 1: greedy line grouping
  while (i < words.length) {
    let lineLen = words[i].length;
    let j = i + 1;
    while (j < words.length && lineLen + 1 + words[j].length <= maxWidth) {
      lineLen += 1 + words[j].length;
      j++;
    }
    lines.push(words.slice(i, j));
    i = j;
  }

  // Phase 2: format each line
  const result = [];
  for (let k = 0; k < lines.length; k++) {
    const lineWords = lines[k];
    const isLast = k === lines.length - 1;
    const totalChars = lineWords.reduce((s, w) => s + w.length, 0);
    const numGaps = lineWords.length - 1;

    if (isLast || numGaps === 0) {
      // Left-justify: join with single spaces, pad right
      const joined = lineWords.join(' ');
      result.push(joined + ' '.repeat(maxWidth - joined.length));
    } else {
      const totalSpaces = maxWidth - totalChars;
      const base = Math.floor(totalSpaces / numGaps);
      const extra = totalSpaces % numGaps;
      let line = lineWords[0];
      for (let g = 0; g < numGaps; g++) {
        line += ' '.repeat(base + (g < extra ? 1 : 0));
        line += lineWords[g + 1];
      }
      result.push(line);
    }
  }

  return result;
}`,
        notes: 'The "extra spaces go to the left" rule means: for gaps 0..numGaps-1, the first (totalSpaces % numGaps) gaps each get one additional space. This is cleaner as a loop index check (g < extra).',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same algorithmic approach — there is no simpler correct algorithm. The "brute force" mistake is handling justification with nested loops that are hard to reason about.',
        complexity: {
          time: 'O(n * L)',
          space: 'O(n * L)',
          timeExplanation: 'Linear in total characters.',
          spaceExplanation: 'Output stored in result array.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Clean two-phase implementation: greedy line grouping then per-line formatting with explicit gap computation. No unnecessary string concatenation in loops.',
        complexity: {
          time: 'O(n * L)',
          space: 'O(n * L)',
          timeExplanation: 'Each word and each character is processed a constant number of times.',
          spaceExplanation: 'Output array proportional to total input length.',
          visualization: 'linear',
        },
      },
      followUps: [
        'What if you want to minimize the "raggedness" (unevenness of line lengths) instead of greedy?',
        'How would you handle words longer than maxWidth?',
        'Can you do this in a streaming fashion (one line at a time)?',
      ],
      edgeCases: [
        'Single word on a line — no gaps to distribute spaces, just right-pad',
        'Last line — always left-justified regardless of word count',
        'Word length exactly equals maxWidth — that word gets its own line with no padding needed',
        'All words fit on one line and it is the last — left-justify',
      ],
      commonMistakes: [
        'Applying full justification to the last line — it must always be left-justified',
        'Off-by-one in greedy packing: the gap between k words takes k-1 spaces minimum',
        'Distributing extra spaces from the right instead of the left — problem specifies leftmost gaps get the extra space',
      ],
      interviewerTips: [
        'Separate the packing logic from the formatting logic — cleaner and easier to debug',
        'Walk through the space distribution formula (base, extra) before coding to demonstrate mathematical clarity',
        'Handle single-word lines as a special case of "last line" logic',
      ],
    },
    codeChallenge: {
      functionName: 'fullJustify',
      starterCode: {
        javascript: `/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
function fullJustify(words, maxWidth) {
  // Your solution here
}`,
      },
      testCases: [
        {
          input: [['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16],
          expected: ['This    is    an', 'example  of text', 'justification.  '],
          description: 'Standard example from LeetCode',
        },
        {
          input: [['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16],
          expected: ['What   must   be', 'acknowledgment  ', 'shall be        '],
          description: 'Word longer than half maxWidth forces its own line',
        },
        {
          input: [['Science', 'is', 'what', 'we', 'understand', 'well', 'enough', 'to', 'explain', 'to', 'a', 'computer,', 'art', 'is', 'everything', 'else', 'we', 'do'], 20],
          expected: ['Science  is  what we', 'understand      well', 'enough to explain to', 'a  computer,  art is', 'everything  else  we', 'do                  '],
          description: 'Longer realistic example',
        },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: [],
    relatedPatterns: ['Greedy Line Packing', 'String Formatting'],
    intuitionSummary: 'Two separate concerns: (1) greedily pack as many words as fit per line, (2) distribute the leftover spaces as evenly as possible across gaps, with leftmost gaps absorbing any remainder. Keep them cleanly separated in code.',
    patternName: 'Greedy Pack + Distribute',
  },

  // ─── 8. Substring with Concatenation of All Words (30) ───────────────────────
  {
    id: 'substring-concatenation',
    slug: 'substring-with-concatenation-of-all-words',
    leetcodeNumber: 30,
    title: 'Substring with Concatenation of All Words',
    category: 'sliding-window',
    difficulty: 'hard',
    engineType: 'window',
    tags: ['hash-table', 'string', 'sliding-window'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'ByteDance'],
    descriptions: {
      explorer: 'All words have the same length. Find all starting indices where a substring is a concatenation of all given words (in any order, each used exactly once).',
      engineer: 'Since all words have equal length w, use w sliding windows offset by 0..w-1. Each window slides by word-at-a-time (step=w). Maintain a word frequency map; a shrinking left pointer removes words that overflow their count.',
      interview: 'O(n * w) total. For each of w offsets, slide a word-granularity window of total length k*w. Use two maps: required (word counts) and current window. Shrink left when a word exceeds count or is unknown.',
    },
    puzzleConfig: {
      sequence: ['b','a','r','f','o','o','t','h','e','f','o','o','b','a','r','m','a','n'],
      windowConstraint: { type: 'no-repeat' },
      instruction: '"barfoothefoobarman", words=["foo","bar"]: find the starting window that contains a valid concatenation of all words.',
      mode: 'word-concat',
      correctAnswer: { start: 0, end: 5, length: 6 },
    },
    hints: [
      { id: 1, text: 'All words have the same length w. Any valid substring has length exactly k*w where k is the number of words. For small inputs a brute-force O(n*k*w) check works.', xpCost: 0 },
      { id: 2, text: 'For the optimized approach, run w independent sliding windows — one for each starting offset 0..w-1. Within each window, advance by word-granularity steps.', xpCost: 0 },
      { id: 3, text: 'Maintain a current-window word map. If a word is not in the required set, or its count exceeds the required count, advance the left pointer (by one word at a time) until the window is valid again.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's="barfoothefoobarman", words=["foo","bar"]. w=3, k=2, totalLen=6. Build wordCount: {foo:1, bar:1}.',
        state: { s: 'barfoothefoobarman', words: ['foo','bar'], w: 3, k: 2, wordCount: { foo: 1, bar: 1 } },
        annotation: 'All words length 3',
      },
      {
        id: 2,
        description: 'Offset=0, left=0, right=0. Read word at right: s[0..3)="bar" ∈ wordCount. windowCount={bar:1}, wordsFound=1. Advance right to 3.',
        state: { offset: 0, left: 0, right: 3, windowCount: { bar: 1 }, wordsFound: 1 },
        annotation: 'First word "bar" matched',
      },
      {
        id: 3,
        description: 'right=3, read s[3..6)="foo" ∈ wordCount. windowCount={bar:1,foo:1}, wordsFound=2 == k. Record index left=0. Advance left by w=3.',
        state: { offset: 0, left: 0, right: 6, windowCount: { bar: 1, foo: 1 }, wordsFound: 2, result: [0] },
        annotation: 'Valid window at index 0',
      },
      {
        id: 4,
        description: 'Continue sliding. Eventually right reaches index 9: s[9..12)="foo", s[12..15)="bar". left=9, wordsFound=2. Record index 9.',
        state: { left: 9, right: 15, windowCount: { foo: 1, bar: 1 }, wordsFound: 2, result: [0, 9] },
        annotation: 'Valid window at index 9',
      },
      {
        id: 5,
        description: 'Continue scanning; no more full valid windows found. Final result: [0, 9].',
        state: { result: [0, 9] },
        annotation: 'Two valid starting indices',
      },
    ],
    complexity: {
      time: 'O(n * w)',
      space: 'O(k)',
      timeExplanation: 'w independent sliding window passes each taking O(n/w) word-steps; each step is O(w) for the hash key, giving O(n) per pass and O(n*w) total. In practice this is O(n) when w is small.',
      spaceExplanation: 'Two hashmaps of at most k word entries each.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function findSubstring(s, words) {
  if (!s || !words || words.length === 0) return [];

  const w = words[0].length;    // word length (all equal)
  const k = words.length;       // number of words
  const totalLen = w * k;
  const n = s.length;
  const result = [];

  // Build required frequency map
  const wordCount = new Map();
  for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  }

  // Run w independent sliding windows
  for (let offset = 0; offset < w; offset++) {
    const windowCount = new Map();
    let left = offset;
    let wordsFound = 0;

    for (let right = offset; right + w <= n; right += w) {
      const word = s.substring(right, right + w);

      if (wordCount.has(word)) {
        windowCount.set(word, (windowCount.get(word) || 0) + 1);
        wordsFound++;

        // Shrink window if this word appears too many times
        while (windowCount.get(word) > wordCount.get(word)) {
          const leftWord = s.substring(left, left + w);
          windowCount.set(leftWord, windowCount.get(leftWord) - 1);
          wordsFound--;
          left += w;
        }

        // Check if we have a valid window
        if (wordsFound === k) {
          result.push(left);
          // Slide left by one word to continue searching
          const leftWord = s.substring(left, left + w);
          windowCount.set(leftWord, windowCount.get(leftWord) - 1);
          wordsFound--;
          left += w;
        }
      } else {
        // Unknown word — reset the window from right+w
        windowCount.clear();
        wordsFound = 0;
        left = right + w;
      }
    }
  }

  return result;
}`,
        notes: 'The w-offset trick is the key optimization: instead of one character-granularity scan, we do w word-granularity scans that collectively cover every possible starting position. This avoids redundant work when words overlap modulo w.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For every starting index i in 0..n-totalLen, extract k substrings of length w and check if they form an anagram of the word list. O(n*k*w) time.',
        complexity: {
          time: 'O(n * k * w)',
          space: 'O(k)',
          timeExplanation: 'n positions, each requiring a k-word frequency check costing O(k*w) for hashing.',
          spaceExplanation: 'Two hashmaps of k entries.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'w sliding windows over the string (one per possible offset mod w), each advancing by word-length steps. Amortized O(n) per window due to the sliding window shrink logic.',
        complexity: {
          time: 'O(n * w)',
          space: 'O(k)',
          timeExplanation: 'w windows each of size O(n/w) word-steps with O(w) string ops per step.',
          spaceExplanation: 'Two hashmaps with at most k entries.',
          visualization: 'linear',
        },
      },
      followUps: [
        'What if words can have different lengths? (Much harder — use suffix automaton or Aho-Corasick)',
        'What if duplicate words are allowed in the word list?',
        'Can you parallelize the w independent window scans?',
      ],
      edgeCases: [
        'Empty string or empty words array → return []',
        'Single word in words → check every w-length substring',
        'Duplicate words in the words array — frequency map handles this correctly',
        'totalLen > s.length → no valid window possible',
      ],
      commonMistakes: [
        'Using a character-level sliding window instead of word-level — loses the O(n) amortization benefit',
        'Forgetting to reset the window when an unknown word is encountered mid-scan',
        'Not deduplicating words in wordCount — each word may appear multiple times in the list',
      ],
      interviewerTips: [
        'Explain why the w-offset windows together cover all n starting positions: position i has offset i%w, so it is handled by window number i%w',
        'Walk through what "reset on unknown word" saves: it skips right to the next valid potential start',
        'The duplicate-word case is a good stress test to walk through to show mastery of the frequency map logic',
      ],
    },
    codeChallenge: {
      functionName: 'findSubstring',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
function findSubstring(s, words) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['barfoothefoobarman', ['foo', 'bar']], expected: [0, 9], description: '"barfoothefoobarman", ["foo","bar"] → [0,9]' },
        { input: ['wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']], expected: [], description: 'No valid concatenation → []' },
        { input: ['barfoofoobarthefoobarman', ['bar', 'foo', 'the']], expected: [6, 9, 12], description: 'Three starting indices' },
        { input: ['', ['foo']], expected: [], description: 'Empty string → []' },
        { input: ['aaa', ['a', 'a']], expected: [0, 1], description: 'Duplicate words in list' },
      ],
      unorderedResult: true,
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: ['minimum-window-substring'],
    relatedPatterns: ['Sliding Window', 'Word-Level Window', 'Frequency Map'],
    intuitionSummary: 'Since all words have equal length w, the problem reduces to a word-frequency matching problem. Run w independent word-granularity sliding windows — one per offset mod w — to cover all starting positions efficiently.',
    patternName: 'Word-Level Sliding Window',
  },

  // ─── 9. Insert Delete GetRandom O(1) (380) ────────────────────────────────────
  {
    id: 'insert-delete-getrandom',
    slug: 'insert-delete-getrandom-o1',
    leetcodeNumber: 380,
    title: 'Insert Delete GetRandom O(1)',
    category: 'hashmap',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'hash-table', 'math', 'design', 'randomized'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Twitter', 'Lyft'],
    descriptions: {
      explorer: 'Design a data structure that supports insert, remove, and getRandom — all in O(1) average time. getRandom must return each element with equal probability.',
      engineer: 'Store values in an array for O(1) random access. Store a hashmap from value to array index for O(1) lookup and deletion. To delete: swap target with last element, update the moved element\'s index in the map, then pop the array.',
      interview: 'Array + hashmap(value→index). insert: append and store index. remove: swap with last, update map[lastValue]=removedIndex, delete map[removedValue], pop. getRandom: return arr[Math.floor(Math.random()*arr.length)].',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1' },
        { id: 'b', value: 2, label: '2' },
        { id: 'c', value: 1, label: '1' },
        { id: 'd', value: 1, label: '1' },
      ],
      target: 3,
      instruction: 'RandomizedSet: after insert(1) and insert(2), which two values currently live in the set?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'getRandom in O(1) requires an array — you need to generate a random index in [0, size). A hashmap alone has no O(1) random access.', xpCost: 0 },
      { id: 2, text: 'The bottleneck is O(1) remove from an array. The trick: swap the target element with the last element, then pop. Update the swapped element\'s new index in the hashmap.', xpCost: 0 },
      { id: 3, text: 'Edge case in remove: if the element to remove is already the last element, skip the swap and just update the map and pop.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Initial state: arr=[], map={}.',
        state: { arr: [], map: {} },
        annotation: 'Empty data structure',
      },
      {
        id: 2,
        description: 'insert(1): arr=[1], map={1:0}. insert(2): arr=[1,2], map={1:0,2:1}. insert(3): arr=[1,2,3], map={1:0,2:1,3:2}.',
        state: { arr: [1, 2, 3], map: { 1: 0, 2: 1, 3: 2 } },
        annotation: 'Three inserts; each appends and records index',
      },
      {
        id: 3,
        description: 'remove(2): idx=map[2]=1. last=arr[2]=3. Swap: arr[1]=3, arr[2]=2. Update map[3]=1 (moved index). Delete map[2]. Pop arr. arr=[1,3], map={1:0,3:1}.',
        state: { arr: [1, 3], map: { 1: 0, 3: 1 } },
        annotation: 'Swap-with-last enables O(1) remove',
      },
      {
        id: 4,
        description: 'getRandom: pick random index in [0,2). Say index=1 → return arr[1]=3. Each element has 50% probability.',
        state: { arr: [1, 3], randomIndex: 1, returned: 3 },
        annotation: 'Uniform random via random array index',
      },
      {
        id: 5,
        description: 'remove(3): idx=map[3]=1. It IS the last element (idx == arr.length-1). Skip swap, just delete map[3], pop. arr=[1], map={1:0}.',
        state: { arr: [1], map: { 1: 0 } },
        annotation: 'Last-element removal: no swap needed',
      },
    ],
    complexity: {
      time: 'O(1) average',
      space: 'O(n)',
      timeExplanation: 'Insert: amortized O(1) array append + O(1) map write. Remove: O(1) map lookup + O(1) swap + O(1) pop. getRandom: O(1) random index + O(1) array access.',
      spaceExplanation: 'Array and hashmap each of size n (number of elements currently stored).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `class RandomizedSet {
  constructor() {
    this.arr = [];          // stores values
    this.map = new Map();   // value → index in arr
  }

  /** @param {number} val @return {boolean} */
  insert(val) {
    if (this.map.has(val)) return false;
    this.arr.push(val);
    this.map.set(val, this.arr.length - 1);
    return true;
  }

  /** @param {number} val @return {boolean} */
  remove(val) {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val);
    const last = this.arr[this.arr.length - 1];

    // Swap target with last element
    this.arr[idx] = last;
    this.map.set(last, idx);

    // Remove the last position
    this.arr.pop();
    this.map.delete(val);

    return true;
  }

  /** @return {number} */
  getRandom() {
    const idx = Math.floor(Math.random() * this.arr.length);
    return this.arr[idx];
  }
}`,
        notes: 'The swap-and-pop trick works even when val === last (the element to remove is already at the end): arr[idx]=last is a no-op, map.set(last, idx) sets the same key to the same value, then pop and delete clean up correctly.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Using only a Set or Map: insert and remove are O(1), but getRandom requires iterating to the k-th element which is O(n).',
        complexity: {
          time: 'O(n) for getRandom',
          space: 'O(n)',
          timeExplanation: 'Must iterate through the set/map to reach a random position.',
          spaceExplanation: 'One data structure of size n.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Array + hashmap combination. The array enables O(1) random access; the hashmap enables O(1) lookup for insert/remove. Swap-and-pop solves the "O(1) remove from middle" challenge.',
        complexity: {
          time: 'O(1) average',
          space: 'O(n)',
          timeExplanation: 'All three operations are O(1) amortized (array append is amortized O(1)).',
          spaceExplanation: 'Array and map together store each element exactly once.',
          visualization: 'linear',
        },
      },
      followUps: [
        'LC 381 — allow duplicates (RandomizedCollection)',
        'What if you need O(1) worst-case (not amortized) for insert? (Pre-allocate array)',
        'How does this change if getRandom should return with non-uniform weights?',
      ],
      edgeCases: [
        'insert duplicate value → return false without modifying state',
        'remove non-existent value → return false',
        'remove the last element in the array — swap-with-self is a no-op, still works',
        'Single element remaining — getRandom always returns it',
      ],
      commonMistakes: [
        'Forgetting to update map[last] after swapping last into the removed slot',
        'Checking val === last before the swap to add a special case — not needed, the general code handles it',
        'Using delete arr[idx] (sets to undefined) instead of swap-and-pop',
      ],
      interviewerTips: [
        'Lead with the insight that getRandom forces you to use an array, then explain why arrays have O(n) remove and how swap-and-pop solves it',
        'Trace through a concrete remove-last-element example to show the general swap code handles it without a special case',
        'Follow up with LC 381 (duplicates) — requires a Set of indices per value instead of a single index',
      ],
    },
    codeChallenge: {
      functionName: 'RandomizedSet',
      starterCode: {
        javascript: `class RandomizedSet {
  constructor() {
    // Your initialization here
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    // Your solution here
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    // Your solution here
  }

  /**
   * @return {number}
   */
  getRandom() {
    // Your solution here
  }
}`,
      },
      testCases: [
        {
          input: [['insert', 'remove', 'insert', 'getRandom', 'remove', 'insert', 'getRandom'], [1, 2, 2, null, 1, 2, null]],
          expected: [true, false, true, 2, true, false, 2],
          description: 'Standard operation sequence: insert 1 (true), remove 2 (false-not present), insert 2 (true), getRandom (must be 2 since only 2 inserted), remove 1 (true), insert 2 (false-duplicate), getRandom (must be 2)',
        },
        {
          input: [['insert', 'insert', 'insert', 'remove', 'insert'], [0, 1, 2, 1, 1]],
          expected: [true, true, true, true, true],
          description: 'Insert 0,1,2; remove 1 (swaps with 2); insert 1 again → all return true',
        },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['Array + Hashmap Design', 'Swap-and-Pop', 'Randomized Data Structures'],
    intuitionSummary: 'The fundamental tension: arrays give O(1) random access (needed for getRandom) but O(n) middle removal; hashmaps give O(1) lookup but no random access. Combine them: array for values + hashmap for index lookup. The swap-and-pop trick makes removal O(1) without leaving holes.',
    patternName: 'Array + HashMap Design',
  },
];

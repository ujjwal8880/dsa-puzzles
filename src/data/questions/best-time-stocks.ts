import type { QuestionConfig } from '@/types/question';

export const bestTimeStocks: QuestionConfig = {
  id: 'best-time-stocks',
  slug: 'best-time-to-buy-and-sell-stock',
  leetcodeNumber: 121,
  title: 'Best Time to Buy & Sell Stock',
  category: 'array-string',
  difficulty: 'easy',
  engineType: 'two-pointer',
  tags: ['array', 'greedy', 'sliding-window'],
  descriptions: {
    explorer: 'You can see stock prices for the coming days. Pick one day to buy, one day later to sell. When should you buy and sell for maximum profit?',
    engineer: 'Track minimum price seen so far. At each step compute profit = price - minSoFar. Update maxProfit. One pass O(n).',
    interview: 'Greedy single pass. Min price tracks the optimal buy day. For each subsequent day, check if selling gives new max profit. Classic "Kadane\'s-adjacent" pattern.',
  },
  puzzleConfig: {
    array: [7, 1, 5, 3, 6, 4],
    instruction: 'Click the best day to buy (lowest) and best day to sell (highest profit after buying)',
    mode: 'buy-sell',
    target: 5,
    correctBuyIndex: 1,
    correctSellIndex: 4,
    label: 'Price ($)',
  },
  hints: [
    { id: 1, text: 'You must buy before you sell. Scanning left to right, what\'s the cheapest price you\'ve seen so far?', xpCost: 0 },
    { id: 2, text: 'At each day, profit = today\'s price minus the cheapest price seen before today. Track the maximum such profit.', xpCost: 0 },
    { id: 3, text: 'Two variables: minPrice (buy candidate) and maxProfit. Update minPrice when you find a cheaper day. Update maxProfit = max(maxProfit, price - minPrice).', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Prices: [7, 1, 5, 3, 6, 4]. minPrice = ∞, maxProfit = 0.',
      state: { prices: [7, 1, 5, 3, 6, 4], minPrice: Infinity, maxProfit: 0, i: -1 },
      highlight: [],
      annotation: 'minPrice=∞, maxProfit=0',
    },
    {
      id: 2,
      description: 'Day 0: price=7. 7 < ∞ → minPrice=7. Profit = 7-7=0.',
      state: { prices: [7, 1, 5, 3, 6, 4], minPrice: 7, maxProfit: 0, i: 0 },
      highlight: [0],
      pointers: { i: 0 },
      annotation: 'minPrice=7, maxProfit=0',
    },
    {
      id: 3,
      description: 'Day 1: price=1. 1 < 7 → minPrice=1. Profit = 1-1=0.',
      state: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 0, i: 1 },
      highlight: [1],
      pointers: { i: 1 },
      annotation: 'minPrice=1, maxProfit=0',
    },
    {
      id: 4,
      description: 'Day 2: price=5. 5 > 1 → no new min. Profit = 5-1=4 > 0 → maxProfit=4.',
      state: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 4, i: 2 },
      highlight: [2],
      pointers: { i: 2 },
      annotation: 'minPrice=1, maxProfit=4',
    },
    {
      id: 5,
      description: 'Day 4: price=6. Profit = 6-1=5 > 4 → maxProfit=5. Best: buy day 1, sell day 4.',
      state: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 5, i: 4 },
      highlight: [1, 4],
      pointers: { i: 4 },
      annotation: 'minPrice=1, maxProfit=5 ✓',
    },
  ],
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
    timeExplanation: 'Single pass. No nested loops.',
    spaceExplanation: 'Only two extra variables: minPrice and maxProfit.',
    visualization: 'linear',
  },
  codeSolutions: [
        {
      language: 'python',
      code: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)

    return max_profit`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Try all buy/sell pairs. O(n²).',
      complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops for all pairs', spaceExplanation: 'No extra space', visualization: 'quadratic' },
    },
    optimized: {
      description: 'Track running minimum. O(n).',
      complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Two variables', visualization: 'linear' },
    },
    followUps: [
      'Buy and Sell Stock II (unlimited transactions)',
      'Buy and Sell Stock III (at most 2 transactions)',
      'Buy and Sell Stock with Cooldown',
    ],
    edgeCases: ['All decreasing prices (return 0)', 'Single element', 'All same price'],
    commonMistakes: ['Allowing sell before buy', 'Not handling the no-profit case (return 0 not negative)'],
    interviewerTips: [
      'This is actually a simplified Kadane\'s algorithm variant',
      'Mention the unlimited-transactions follow-up unprompted — shows pattern depth',
    ],
  },
  xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50 },
  prerequisites: [],
  relatedPatterns: ['Kadane\'s Algorithm', 'Greedy Scan'],
  intuitionSummary: 'You don\'t need to find the best pair upfront. Track the cheapest price seen so far and maximize profit greedily.',
  patternName: 'Greedy Running Min',
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Meta', 'Goldman Sachs', 'Google', 'Microsoft'],
};

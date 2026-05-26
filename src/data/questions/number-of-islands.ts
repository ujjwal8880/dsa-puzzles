import type { QuestionConfig } from '@/types/question';

export const numberOfIslands: QuestionConfig = {
  id: 'number-of-islands',
  slug: 'number-of-islands',
  leetcodeNumber: 200,
  title: 'Number of Islands',
  category: 'graph',
  difficulty: 'medium',
  engineType: 'graph',
  tags: ['graph', 'dfs', 'bfs', 'union-find'],
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Meta', 'Google', 'Bloomberg', 'DoorDash'],
  descriptions: {
    explorer: 'Find all the islands in the grid! Click each land mass to explore it.',
    engineer: 'Count connected components of 1s. DFS/BFS flood-fills each island and marks cells visited.',
    interview: 'Classic DFS/BFS graph problem. O(m×n) time and space. Can also solve with Union-Find for online queries.',
  },
  puzzleConfig: {
    grid: [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ],
    instruction: 'Click on any unvisited land cell (green) to flood-fill that island. Count how many distinct islands exist.',
    mode: 'flood-fill',
    correctAnswer: 3,
  },
  hints: [
    { id: 1, text: 'An island is a group of connected "1" cells (4-directionally: up, down, left, right).', xpCost: 0 },
    { id: 2, text: 'For each unvisited land cell, run DFS to mark ALL connected land as visited. Each DFS invocation = 1 island.', xpCost: 0 },
    { id: 3, text: 'In this grid: top-left 4 cells = island 1, center cell = island 2, bottom-right 2 cells = island 3. Total: 3.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Start scanning. Find (0,0) = "1" — unvisited land. Begin DFS from here.',
      state: { grid: 'see puzzle', current: [0, 0], islandCount: 0 },
      highlight: [0],
      annotation: 'island count = 0',
    },
    {
      id: 2,
      description: 'DFS from (0,0): visits (0,0), (0,1), (1,0), (1,1). All marked visited. Island 1 found.',
      state: { grid: 'see puzzle', visited: [[0,0],[0,1],[1,0],[1,1]], islandCount: 1 },
      highlight: [0, 1],
      annotation: 'island 1 = 4 cells',
    },
    {
      id: 3,
      description: 'Continue scan. Find (2,2) = "1" — unvisited. DFS finds just this one cell. Island 2.',
      state: { grid: 'see puzzle', visited: [[2,2]], islandCount: 2 },
      highlight: [2],
      annotation: 'island 2 = 1 cell',
    },
    {
      id: 4,
      description: 'Continue scan. Find (3,3) = "1" — unvisited. DFS finds (3,3) and (3,4). Island 3. Done!',
      state: { grid: 'see puzzle', visited: [[3,3],[3,4]], islandCount: 3 },
      highlight: [3, 4],
      annotation: 'island 3 = 2 cells\ntotal = 3 ✓',
    },
  ],
  complexity: {
    time: 'O(m × n)',
    space: 'O(m × n)',
    timeExplanation: 'Each cell is visited at most once. DFS/BFS total = m×n.',
    spaceExplanation: 'DFS call stack in worst case (all land) = m×n depth. Visited array = m×n.',
    visualization: 'linear',
  },
  codeSolutions: [
    {
      language: 'javascript',
      code: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (grid[r][c] !== '1') return;

    grid[r][c] = '0'; // mark visited

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,
      notes: 'Modifies input grid to mark visited cells. Use a visited set if input must be preserved.',
    },
        {
      language: 'python',
      code: `def numIslands(grid: list[list[str]]) -> int:
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if not (0 <= r < rows and 0 <= c < cols) or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)

    return count`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Same DFS approach — there is no meaningful brute force. BFS vs DFS are both optimal.',
      complexity: { time: 'O(m×n)', space: 'O(m×n)', timeExplanation: 'All cells visited once', spaceExplanation: 'Queue or stack', visualization: 'linear' },
    },
    optimized: {
      description: 'DFS with in-place marking. For dynamic grids: Union-Find for O(α) per query.',
      complexity: { time: 'O(m×n)', space: 'O(1)', timeExplanation: 'Each cell visited once', spaceExplanation: 'In-place modification avoids extra visited array', visualization: 'linear' },
    },
    followUps: [
      'What if the grid is too large to fit in memory?',
      'Islands in a stream of cells arriving one at a time? (Union-Find)',
      'Max area of island — same pattern, track size during DFS',
      'Count distinct islands by shape (encode DFS path as string)',
    ],
    edgeCases: [
      'Empty grid',
      'All water (return 0)',
      'All land (return 1)',
      'Single cell grid',
      'L-shaped or U-shaped islands',
    ],
    commonMistakes: [
      'Forgetting to mark cells visited during DFS (infinite loop)',
      'Using diagonal neighbors (problem uses 4-directional only)',
      'Modifying the original grid when it should be preserved',
    ],
    interviewerTips: [
      'Mention BFS as an alternative (avoids stack overflow on large grids)',
      'Discuss Union-Find for dynamic "add cell" queries',
      'Off-by-one bounds check is a common error to call out',
    ],
  },
  codeChallenge: {
    functionName: 'numIslands',
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // Your solution here

}`,
    },
    testCases: [
      {
        input: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]],
        expected: 1,
        description: '4x5 grid: 1 large island',
      },
      {
        input: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]],
        expected: 3,
        description: '4x5 grid: 3 islands',
      },
      {
        input: [[['0','0','0'],['0','0','0']]],
        expected: 0,
        description: 'All water: 0 islands',
      },
      {
        input: [[['1']]],
        expected: 1,
        description: 'Single land cell: 1 island',
      },
      {
        input: [[['1','0','1'],['0','1','0'],['1','0','1']]],
        expected: 5,
        description: 'Checkerboard pattern: 5 islands',
      },
    ],
  },
  xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 50, coding: 150 },
  prerequisites: [],
  relatedPatterns: ['DFS Flood Fill', 'BFS Level Order', 'Union Find'],
  intuitionSummary: 'For each unvisited land cell, DFS to mark all connected land as visited. Count each DFS invocation.',
  patternName: 'DFS Flood Fill',
};

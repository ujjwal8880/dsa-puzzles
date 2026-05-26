import type { QuestionConfig } from '@/types/question';

export const BACKTRACK_SEARCH_HEAP_COMPLETE: QuestionConfig[] = [
  // ─── 1. Combination Sum ───────────────────────────────────────────────────
  {
    id: 'combination-sum',
    slug: 'combination-sum',
    leetcodeNumber: 39,
    title: 'Combination Sum',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['backtracking', 'dfs', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Find all combinations of numbers from a list that add up to a target. You can reuse any number as many times as you like!',
      engineer: 'DFS with a running sum. Pass a start index to avoid duplicate combinations. A candidate can be reused, so recurse with the same index.',
      interview: 'Backtracking with a start index. At each step either include candidates[i] again or move to i+1. Prune when sum > target.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '3 (used in combo [3,2,2])' },
        { id: 'b', value: 7, label: '7 (complete combo by itself)' },
        { id: 'c', value: 2, label: '2 (used multiple times)' },
        { id: 'd', value: 5, label: '2+3=5 (partial sum)' },
      ],
      target: 10,
      instruction: 'candidates=[2,3,7], target=7. Which two values can EACH form a valid combination summing to 7? 3 (as part of [3,2,2]) and 7 (as [7] alone). Their values sum to 10.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of a DFS tree where each node adds one candidate to a running combination. What is the base case?', xpCost: 0 },
      { id: 2, text: 'To avoid duplicate combinations like [2,3] and [3,2], always recurse with an index >= current index — never go backwards.', xpCost: 0 },
      { id: 3, text: 'When runningSum === target, push a copy of the current path. When runningSum > target, prune (return). Otherwise loop from startIndex to end.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'candidates=[2,3,6,7], target=7. Call dfs(start=0, current=[], sum=0).',
        state: { candidates: [2,3,6,7], target: 7, current: [], sum: 0, results: [] },
        annotation: 'Start DFS',
      },
      {
        id: 2,
        description: 'Pick candidates[0]=2 three times: dfs(0,[2],2) → dfs(0,[2,2],4) → dfs(0,[2,2,2],6) → dfs(0,[2,2,2,2],8). Sum 8>7, backtrack.',
        state: { current: [2,2,2], sum: 6, next: 2 },
        annotation: 'Prune at sum=8',
      },
      {
        id: 3,
        description: 'From [2,2,2] pick candidates[1]=3: sum=6+3=9>7, prune. Move start forward — no more useful picks from [2,2,2].',
        state: { current: [2,2,2], sum: 6, tried: 3, pruned: true },
        annotation: 'Backtrack to [2,2]',
      },
      {
        id: 4,
        description: 'From [2,2] (sum=4) pick candidates[1]=3: sum=4+3=7 == target. FOUND! Push [2,2,3].',
        state: { current: [2,2,3], sum: 7, results: [[2,2,3]] },
        annotation: 'Result: [2,2,3]',
      },
      {
        id: 5,
        description: 'Continue DFS. Eventually from [] pick candidates[3]=7: sum=7 == target. Push [7].',
        state: { current: [7], sum: 7, results: [[2,2,3],[7]] },
        annotation: 'Result: [7]',
      },
      {
        id: 6,
        description: 'DFS exhausted. Final answer: [[2,2,3],[7]].',
        state: { results: [[2,2,3],[7]], done: true },
        annotation: 'Return all combinations',
      },
    ],
    complexity: {
      time: 'O(n^(t/m))',
      space: 'O(t/m)',
      timeExplanation: 'n candidates, t = target, m = smallest candidate. Recursion tree depth is at most t/m with branching factor n.',
      spaceExplanation: 'Recursion stack depth is at most t/m.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function combinationSum(candidates, target) {
  const results = [];

  function dfs(start, current, sum) {
    if (sum === target) {
      results.push([...current]);
      return;
    }
    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      dfs(i, current, sum + candidates[i]); // i not i+1, allow reuse
      current.pop();
    }
  }

  dfs(0, [], 0);
  return results;
}`,
      },
      {
        language: 'python',
        code: `def combinationSum(candidates, target):
    results = []

    def dfs(start, current, total):
        if total == target:
            results.append(list(current))
            return
        if total > target:
            return
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            dfs(i, current, total + candidates[i])
            current.pop()

    dfs(0, [], 0)
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Generate all possible combinations (with repetition) up to length target/min and filter those summing to target.',
        complexity: { time: 'O(n^(t/m))', space: 'O(t/m)', timeExplanation: 'Exponential in worst case', spaceExplanation: 'Stack depth', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Backtracking with start index prevents reordered duplicates. Sorting candidates allows early pruning.',
        complexity: { time: 'O(n^(t/m))', space: 'O(t/m)', timeExplanation: 'Same asymptotic but pruning reduces constant', spaceExplanation: 'Stack depth', visualization: 'quadratic' },
      },
      followUps: [
        'Combination Sum II (LC 40) — each number used once, skip duplicates',
        'Combination Sum III (LC 216) — pick exactly k numbers from 1-9',
        'What if candidates contain duplicates? (sort + skip same value at same depth)',
      ],
      edgeCases: [
        'Single candidate equal to target',
        'All candidates larger than target → empty result',
        'target = 0 → [[]] (one empty combination)',
      ],
      commonMistakes: [
        'Using i+1 instead of i in the recursive call — prevents reuse',
        'Not copying the current array when adding to results (push current instead of [...current])',
        'Forgetting to backtrack (pop after recursion)',
      ],
      interviewerTips: [
        'Ask: can candidates have duplicates? This determines whether to sort + skip',
        'Explain why start index prevents [2,3] and [3,2] both appearing',
        'Mention that sorting enables earlier pruning when sum + candidates[i] > target',
      ],
    },
    codeChallenge: {
      functionName: 'combinationSum',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[2,3,6,7], 7], expected: [[2,2,3],[7]], description: 'Basic: [2,3,6,7] target=7' },
        { input: [[2,3,5], 8], expected: [[2,2,2,2],[2,3,3],[3,5]], description: '[2,3,5] target=8' },
        { input: [[2], 1], expected: [], description: 'No solution possible' },
        { input: [[1], 1], expected: [[1]], description: 'Single candidate equals target' },
        { input: [[1,2], 4], expected: [[1,1,1,1],[1,1,2],[2,2]], description: '[1,2] target=4' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['two-sum'],
    relatedPatterns: ['Backtracking', 'DFS with start index', 'Combination Sum II'],
    intuitionSummary: 'DFS where each call either reuses the same candidate or moves forward — the start index is the key to avoiding duplicate combinations.',
    patternName: 'Backtracking with Start Index',
  },

  // ─── 2. Word Search ───────────────────────────────────────────────────────
  {
    id: 'word-search',
    slug: 'word-search',
    leetcodeNumber: 79,
    title: 'Word Search',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'pattern',
    tags: ['backtracking', 'dfs', 'matrix', 'grid'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Search for a hidden word in a letter grid by connecting adjacent cells (up, down, left, right). Each cell can only be used once!',
      engineer: 'DFS from each cell matching word[0]. Mark visited by mutating the board (replace with #). Restore on backtrack.',
      interview: 'O(m*n*4^L) DFS with in-place visited marking. For each starting cell, DFS matching characters. Backtrack by restoring the cell.',
    },
    puzzleConfig: {
      problemStatement: 'Given an m×n grid of characters and a string word, return true if the word exists in the grid. The word must be formed by sequentially adjacent cells (horizontally or vertically). Each cell may only be used once per path.',
      correctPattern: 'dfs-backtracking',
      options: [
        { id: 'dfs-backtracking', label: 'DFS / Backtracking', icon: '🌲', description: 'Explore all paths, undo visited on failure' },
        { id: 'bfs', label: 'BFS', icon: '🌊', description: 'Level-by-level shortest-path exploration' },
        { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧮', description: 'Build solutions from subproblems' },
        { id: 'sliding-window', label: 'Sliding Window', icon: '🪟', description: 'Expand/shrink a window over a sequence' },
        { id: 'binary-search', label: 'Binary Search', icon: '🔍', description: 'Divide and search on sorted input' },
        { id: 'hash-map', label: 'Hash Map', icon: '🗂️', description: 'Store values for O(1) lookup' },
      ],
      explanation: 'From every cell matching word[0], try all 4 directions recursively. Mark each cell visited (replace with \'#\') so it isn\'t reused on the same path. On failure, restore the cell (backtrack) and try the next direction. This explore-all-choices-with-undo structure is the definition of backtracking.',
      followUp: 'BFS fails here because it tracks visited cells globally — it would wrongly block a cell used on one path from being used on a completely different path. Backtracking restores each cell after its path fails.',
    },
    hints: [
      { id: 1, text: 'Try starting DFS from every cell. At each step, explore all 4 neighbors that match the next character.', xpCost: 0 },
      { id: 2, text: 'To mark a cell as visited without extra space, temporarily replace it with a sentinel like "#". Restore it on backtrack.', xpCost: 0 },
      { id: 3, text: 'Base case: if index === word.length, you found the full word. If out of bounds, wrong character, or "#" cell, return false.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'board[0][0]="A" matches word[0]. Start DFS from (0,0), mark as visited (#).',
        state: { row: 0, col: 0, idx: 0, char: 'A', board: [['#','B','C','E'],['S','F','C','S'],['A','D','E','E']] },
        annotation: 'board[0][0] → "#"',
      },
      {
        id: 2,
        description: 'Look for word[1]="B" from (0,0). Right neighbor (0,1)="B" matches. Move to (0,1), mark #.',
        state: { row: 0, col: 1, idx: 1, char: 'B', board: [['#','#','C','E'],['S','F','C','S'],['A','D','E','E']] },
        annotation: '(0,1) → "#"',
      },
      {
        id: 3,
        description: 'Look for word[2]="C" from (0,1). Right neighbor (0,2)="C" matches. Move to (0,2), mark #.',
        state: { row: 0, col: 2, idx: 2, char: 'C', board: [['#','#','#','E'],['S','F','C','S'],['A','D','E','E']] },
        annotation: '(0,2) → "#"',
      },
      {
        id: 4,
        description: 'Look for word[3]="C" from (0,2). Down neighbor (1,2)="C" matches. Move to (1,2), mark #.',
        state: { row: 1, col: 2, idx: 3, char: 'C', board: [['#','#','#','E'],['S','F','#','S'],['A','D','E','E']] },
        annotation: '(1,2) → "#"',
      },
      {
        id: 5,
        description: 'Look for word[4]="E" from (1,2). Down neighbor (2,2)="E" matches. Move to (2,2), mark #.',
        state: { row: 2, col: 2, idx: 4, char: 'E', board: [['#','#','#','E'],['S','F','#','S'],['A','D','#','E']] },
        annotation: '(2,2) → "#"',
      },
      {
        id: 6,
        description: 'Look for word[5]="D" from (2,2). Left neighbor (2,1)="D" matches. idx=6 == word.length → return true!',
        state: { row: 2, col: 1, idx: 5, char: 'D', found: true },
        annotation: 'FOUND: return true',
      },
    ],
    complexity: {
      time: 'O(m * n * 4^L)',
      space: 'O(L)',
      timeExplanation: 'Start DFS from each of m*n cells; each DFS explores up to 4^L paths where L = word length.',
      spaceExplanation: 'Recursion stack depth equals word length L.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    const temp = board[r][c];
    board[r][c] = '#'; // mark visited

    const found =
      dfs(r + 1, c, idx + 1) ||
      dfs(r - 1, c, idx + 1) ||
      dfs(r, c + 1, idx + 1) ||
      dfs(r, c - 1, idx + 1);

    board[r][c] = temp; // restore
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,
      },
      {
        language: 'python',
        code: `def exist(board, word):
    rows, cols = len(board), len(board[0])

    def dfs(r, c, idx):
        if idx == len(word): return True
        if not (0 <= r < rows and 0 <= c < cols): return False
        if board[r][c] != word[idx]: return False

        temp, board[r][c] = board[r][c], '#'
        found = (dfs(r+1,c,idx+1) or dfs(r-1,c,idx+1) or
                 dfs(r,c+1,idx+1) or dfs(r,c-1,idx+1))
        board[r][c] = temp
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try every cell as start, use a separate visited set.',
        complexity: { time: 'O(m*n*4^L)', space: 'O(m*n)', timeExplanation: 'All starts, all paths', spaceExplanation: 'Visited set', visualization: 'quadratic' },
      },
      optimized: {
        description: 'In-place marking eliminates the visited set. Same time complexity but O(L) space.',
        complexity: { time: 'O(m*n*4^L)', space: 'O(L)', timeExplanation: 'Same — in-place marking does not change time', spaceExplanation: 'Recursion stack only', visualization: 'quadratic' },
      },
      followUps: [
        'Word Search II (LC 212) — find all words from a dictionary using Trie pruning',
        'What if you could reuse cells? (Remove the visited check)',
        'How would you parallelize the search?',
      ],
      edgeCases: [
        'Word longer than total cells → impossible',
        'Board with one cell',
        'Word that backtracks on itself (e.g., "ABBA" in a line)',
      ],
      commonMistakes: [
        'Forgetting to restore the cell after backtracking',
        'Checking board[r][c] after bounds check fails (should check bounds first)',
        'Off-by-one: idx === word.length should return true before character check',
      ],
      interviewerTips: [
        'The in-place mark trick is the key insight — avoids O(m*n) visited set',
        'Early termination: if character counts in board < word counts, return false immediately',
        'For Word Search II, mention Trie — trying each word separately is too slow',
      ],
    },
    codeChallenge: {
      functionName: 'exist',
      starterCode: {
        javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"], expected: true, description: 'ABCCED found in grid' },
        { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"], expected: true, description: 'SEE found in grid' },
        { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"], expected: false, description: 'ABCB not found (would reuse B)' },
        { input: [[["a"]], "a"], expected: true, description: 'Single cell match' },
        { input: [[["a","b"],["c","d"]], "abdc"], expected: true, description: 'Serpentine path' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-of-islands'],
    relatedPatterns: ['DFS on Grid', 'Backtracking', 'Word Search II'],
    intuitionSummary: 'DFS from every cell, using in-place marking to track visited cells. Restore on backtrack to allow other paths to use the same cell.',
    patternName: 'DFS with In-Place Visited Marking',
  },

  // ─── 3. Letter Combinations of a Phone Number ────────────────────────────
  {
    id: 'letter-combinations-phone-number',
    slug: 'letter-combinations-phone-number',
    leetcodeNumber: 17,
    title: 'Letter Combinations of a Phone Number',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['backtracking', 'dfs', 'string', 'hashmap'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'On an old phone keypad, each number maps to 2-3 letters. Given a sequence of digits, find every possible word they could spell!',
      engineer: 'DFS branching on each digit\'s letters. At each level pick one letter for the current digit and recurse to the next digit.',
      interview: 'Backtracking over digits. For digit at index i, iterate its mapped letters, append to path, recurse to i+1, backtrack. O(4^n * n) time.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '"2" maps to 3 letters (a,b,c)' },
        { id: 'b', value: 3, label: '"3" maps to 3 letters (d,e,f)' },
        { id: 'c', value: 9, label: 'total: 3×3=9 combinations' },
        { id: 'd', value: 6, label: 'wrong: 3+3=6' },
      ],
      target: 6,
      instruction: '"23": each digit maps to 3 letters. Select the letter counts per digit that you MULTIPLY to get total combinations.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Build a map from digit to letters: "2"→"abc", "3"→"def", etc. Then think of each digit position as a level in a decision tree.', xpCost: 0 },
      { id: 2, text: 'At each level of recursion, loop through the letters for digits[index]. Append the letter to current path, recurse, then backtrack (remove it).', xpCost: 0 },
      { id: 3, text: 'Base case: when index === digits.length, push current path (joined) to results. The branching factor is at most 4 (for 7 and 9).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'digits="23". Map: 2→abc, 3→def. Call dfs(index=0, path=[]).',
        state: { digits: '23', map: { '2': 'abc', '3': 'def' }, path: [], results: [] },
        annotation: 'Start DFS',
      },
      {
        id: 2,
        description: 'index=0, digit="2", letters="abc". Pick "a". path=["a"]. Recurse to index=1.',
        state: { index: 0, digit: '2', path: ['a'] },
        annotation: 'Branch on "a"',
      },
      {
        id: 3,
        description: 'index=1, digit="3", letters="def". Pick "d". path=["a","d"]. Recurse to index=2.',
        state: { index: 1, digit: '3', path: ['a','d'] },
        annotation: 'Branch on "d"',
      },
      {
        id: 4,
        description: 'index=2 === digits.length. Push "ad" to results. Backtrack.',
        state: { results: ['ad'], path: ['a'] },
        annotation: 'Collect "ad"',
      },
      {
        id: 5,
        description: 'Continue: "ae", "af" collected. Backtrack to root. Pick "b" from "2". Collect "bd","be","bf". Then "c" → "cd","ce","cf".',
        state: { results: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
        annotation: 'All 9 combinations',
      },
      {
        id: 6,
        description: 'Final answer: ["ad","ae","af","bd","be","bf","cd","ce","cf"].',
        state: { done: true, results: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
        annotation: '3 × 3 = 9 combinations',
      },
    ],
    complexity: {
      time: 'O(4^n * n)',
      space: 'O(n)',
      timeExplanation: 'At most 4 letters per digit; building each combination takes O(n). With n digits: O(4^n * n).',
      spaceExplanation: 'Recursion stack depth is n (number of digits). Output excluded.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function letterCombinations(digits) {
  if (!digits.length) return [];

  const map = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz',
  };

  const results = [];

  function dfs(index, path) {
    if (index === digits.length) {
      results.push(path.join(''));
      return;
    }
    for (const ch of map[digits[index]]) {
      path.push(ch);
      dfs(index + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return results;
}`,
      },
      {
        language: 'python',
        code: `def letterCombinations(digits):
    if not digits: return []
    mapping = {'2':'abc','3':'def','4':'ghi','5':'jkl',
               '6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    results = []

    def dfs(index, path):
        if index == len(digits):
            results.append(''.join(path))
            return
        for ch in mapping[digits[index]]:
            path.append(ch)
            dfs(index + 1, path)
            path.pop()

    dfs(0, [])
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Iterative: start with [""], for each digit expand each existing combination with all letters of that digit.',
        complexity: { time: 'O(4^n * n)', space: 'O(4^n * n)', timeExplanation: 'Same as backtracking', spaceExplanation: 'All intermediate strings stored', visualization: 'quadratic' },
      },
      optimized: {
        description: 'DFS with a mutable path array (join only at leaf). Same complexity but better constant due to avoiding string concatenation in each call.',
        complexity: { time: 'O(4^n * n)', space: 'O(n)', timeExplanation: 'Branching factor ≤ 4, depth n', spaceExplanation: 'Stack + current path', visualization: 'quadratic' },
      },
      followUps: [
        'How would you handle "1" or "0" (no letters)?',
        'Return combinations in lexicographic order — already natural if map is sorted',
        'Generate Parentheses (LC 22) — similar DFS branching structure',
      ],
      edgeCases: [
        'Empty string input → return []',
        'Single digit → return just its letters',
        'Digit "7" or "9" has 4 letters',
      ],
      commonMistakes: [
        'Not returning [] for empty input',
        'String concatenation inside recursion instead of using a mutable array',
        'Not popping from path after recursion (forgetting to backtrack)',
      ],
      interviewerTips: [
        'This is a clean backtracking template — the map setup shows attention to detail',
        'Discuss iterative BFS approach vs recursive DFS',
        'Mention that digits "0" and "1" map to nothing in the original phone keypad',
      ],
    },
    codeChallenge: {
      functionName: 'letterCombinations',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['23'], expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'], description: 'digits="23"' },
        { input: [''], expected: [], description: 'Empty string returns []' },
        { input: ['2'], expected: ['a','b','c'], description: 'Single digit' },
        { input: ['79'], expected: ['wp','wq','wr','ws','xp','xq','xr','xs','yp','yq','yr','ys','zp','zq','zr','zs'], description: '4-letter digits' },
        { input: ['234'], expected: ['adg','adh','adi','aeg','aeh','aei','afg','afh','afi','bdg','bdh','bdi','beg','beh','bei','bfg','bfh','bfi','cdg','cdh','cdi','ceg','ceh','cei','cfg','cfh','cfi'], description: 'Three digits' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['Backtracking', 'DFS Branching', 'Combination Generation'],
    intuitionSummary: 'Each digit is a level in the decision tree. At each level, branch on every possible letter for that digit.',
    patternName: 'DFS Decision Tree',
  },

  // ─── 4. Permutations ──────────────────────────────────────────────────────
  {
    id: 'permutations',
    slug: 'permutations',
    leetcodeNumber: 46,
    title: 'Permutations',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['backtracking', 'dfs', 'array'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'LinkedIn', 'Apple'],
    descriptions: {
      explorer: 'Find every possible ordering of a list of unique numbers. For [1,2,3] there are 6 different arrangements!',
      engineer: 'Swap-based backtracking: fix position i by swapping nums[i] with each nums[j] (j≥i), recurse to i+1, then swap back.',
      interview: 'Two approaches: (1) swap backtracking O(n*n!), (2) used[] array. Collect when index===n. n! permutations each length n → O(n*n!) total.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1 (first element chosen)' },
        { id: 'b', value: 2, label: '2 (second element chosen)' },
        { id: 'c', value: 6, label: 'total: 3! = 6 permutations' },
        { id: 'd', value: 3, label: '3 choices for first position' },
      ],
      target: 3,
      instruction: '[1,2,3]: one permutation is [1,2,3]. Select the FIRST and SECOND elements of this permutation.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of building a permutation position by position. For the first spot you have n choices, for the second n-1, and so on.', xpCost: 0 },
      { id: 2, text: 'The swap trick: for position i, swap nums[i] with nums[j] for every j from i to end, recurse to i+1, then swap back to restore order.', xpCost: 0 },
      { id: 3, text: 'Alternatively, maintain a "used" boolean array. Build path by adding each unused number; backtrack by marking unused again.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,2,3]. Call dfs(start=0). At start=0, swap nums[0] with nums[0],[1],[2] in turn.',
        state: { nums: [1,2,3], start: 0, results: [] },
        annotation: 'Three choices for position 0',
      },
      {
        id: 2,
        description: 'Fix nums[0]=1 (swap with itself). Recurse to start=1. At start=1 swap [1] with [1],[2].',
        state: { nums: [1,2,3], start: 1 },
        annotation: 'Position 0 fixed as 1',
      },
      {
        id: 3,
        description: 'Fix nums[1]=2. Recurse to start=2. start===nums.length → push [1,2,3].',
        state: { nums: [1,2,3], start: 2, results: [[1,2,3]] },
        annotation: 'Collect [1,2,3]',
      },
      {
        id: 4,
        description: 'Backtrack. Swap nums[1] with nums[2]: nums=[1,3,2]. Recurse to start=2 → push [1,3,2].',
        state: { nums: [1,3,2], start: 2, results: [[1,2,3],[1,3,2]] },
        annotation: 'Collect [1,3,2]',
      },
      {
        id: 5,
        description: 'Restore nums=[1,2,3]. Backtrack to start=0. Swap nums[0] with nums[1]: nums=[2,1,3]. Continue similarly.',
        state: { nums: [2,1,3], start: 1 },
        annotation: 'Position 0 fixed as 2',
      },
      {
        id: 6,
        description: 'All 6 permutations collected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]].',
        state: { results: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]], done: true },
        annotation: 'n! = 6 permutations',
      },
    ],
    complexity: {
      time: 'O(n * n!)',
      space: 'O(n)',
      timeExplanation: 'There are n! permutations each of length n. Stack depth is n.',
      spaceExplanation: 'Recursion stack is O(n). Output excluded.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function permute(nums) {
  const results = [];

  function dfs(start) {
    if (start === nums.length) {
      results.push([...nums]);
      return;
    }
    for (let j = start; j < nums.length; j++) {
      [nums[start], nums[j]] = [nums[j], nums[start]]; // swap
      dfs(start + 1);
      [nums[start], nums[j]] = [nums[j], nums[start]]; // restore
    }
  }

  dfs(0);
  return results;
}`,
      },
      {
        language: 'python',
        code: `def permute(nums):
    results = []

    def dfs(start):
        if start == len(nums):
            results.append(list(nums))
            return
        for j in range(start, len(nums)):
            nums[start], nums[j] = nums[j], nums[start]
            dfs(start + 1)
            nums[start], nums[j] = nums[j], nums[start]

    dfs(0)
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Used-array approach: build path by picking each unused element, mark used, recurse, unmark.',
        complexity: { time: 'O(n * n!)', space: 'O(n)', timeExplanation: 'n! leaves, each path length n', spaceExplanation: 'Stack + used array', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Swap-based backtracking: no extra "used" array needed. Swap into position, recurse, swap back.',
        complexity: { time: 'O(n * n!)', space: 'O(n)', timeExplanation: 'Same — swapping does not reduce work', spaceExplanation: 'Stack only', visualization: 'quadratic' },
      },
      followUps: [
        'Permutations II (LC 47) — input has duplicates, skip same value at same depth',
        'Next Permutation (LC 31) — find the next lexicographic permutation in-place',
        'Permutation Sequence (LC 60) — find the k-th permutation directly',
      ],
      edgeCases: [
        'Single element → [[element]]',
        'All same elements with duplicates variant',
        'Empty array → [[]]',
      ],
      commonMistakes: [
        'Not restoring swap after recursion',
        'Pushing nums directly without spread copy — all results point to same array',
        'Starting j from 0 instead of start — generates duplicates',
      ],
      interviewerTips: [
        'The swap trick is elegant and avoids extra space — mention both approaches',
        'For Permutations II, sort first then skip if nums[j]===nums[j-1] and j>start',
        'This pattern appears in scheduling, anagram generation, and combinatorics problems',
      ],
    },
    codeChallenge: {
      functionName: 'permute',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], description: '[1,2,3] → 6 permutations' },
        { input: [[0,1]], expected: [[0,1],[1,0]], description: '[0,1] → 2 permutations' },
        { input: [[1]], expected: [[1]], description: 'Single element' },
        { input: [[1,2]], expected: [[1,2],[2,1]], description: 'Two elements' },
        { input: [[1,2,3,4]], expected: [[1,2,3,4],[1,2,4,3],[1,3,2,4],[1,3,4,2],[1,4,2,3],[1,4,3,2],[2,1,3,4],[2,1,4,3],[2,3,1,4],[2,3,4,1],[2,4,1,3],[2,4,3,1],[3,1,2,4],[3,1,4,2],[3,2,1,4],[3,2,4,1],[3,4,1,2],[3,4,2,1],[4,1,2,3],[4,1,3,2],[4,2,1,3],[4,2,3,1],[4,3,1,2],[4,3,2,1]], description: '[1,2,3,4] → 24 permutations' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['combination-sum'],
    relatedPatterns: ['Swap Backtracking', 'Permutations II', 'Next Permutation'],
    intuitionSummary: 'Fix each position by swapping the current element with every element to its right, recurse for the rest, then swap back.',
    patternName: 'Swap-Based Backtracking',
  },

  // ─── 5. Subsets ───────────────────────────────────────────────────────────
  {
    id: 'subsets',
    slug: 'subsets',
    leetcodeNumber: 78,
    title: 'Subsets',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['backtracking', 'dfs', 'array', 'bit-manipulation'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Find every possible subset (group of elements) from a list, including the empty set and the full set!',
      engineer: 'DFS with include/exclude choices. At each index, branch: include nums[i] and recurse, OR skip and recurse. Collect at every node.',
      interview: 'Two approaches: (1) include/exclude DFS — collect current path at every call, O(2^n * n). (2) Bit masking: 2^n subsets, each bit = include/exclude.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'index 0: element 1' },
        { id: 'b', value: 1, label: 'index 1: element 2' },
        { id: 'c', value: 2, label: 'index 2: element 3' },
        { id: 'd', value: 7, label: 'subset count: 8 (= 2^3)' },
      ],
      target: 1,
      instruction: 'nums=[1,2,3]: select the indices of elements in the subset [1,2].',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'For each element you make a binary choice: include it or exclude it. With n elements there are 2^n combinations of choices.', xpCost: 0 },
      { id: 2, text: 'DFS: at each index, push current path to results, then try including nums[index] and recurse to index+1, then backtrack.', xpCost: 0 },
      { id: 3, text: 'You collect results at EVERY node (not just leaves). Passing start index ensures you never revisit earlier elements, generating each unique subset once.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,2,3]. Call dfs(0,[]). Immediately push [] to results.',
        state: { nums: [1,2,3], current: [], results: [[]] },
        annotation: 'Collect [] (empty set)',
      },
      {
        id: 2,
        description: 'Include nums[0]=1. path=[1], push [1]. Recurse to index=1.',
        state: { current: [1], results: [[], [1]] },
        annotation: 'Collect [1]',
      },
      {
        id: 3,
        description: 'Include nums[1]=2. path=[1,2], push [1,2]. Recurse to index=2.',
        state: { current: [1,2], results: [[], [1], [1,2]] },
        annotation: 'Collect [1,2]',
      },
      {
        id: 4,
        description: 'Include nums[2]=3. path=[1,2,3], push [1,2,3]. index=3=end, return. Backtrack to [1,2], then to [1].',
        state: { current: [1,2,3], results: [[], [1], [1,2], [1,2,3]] },
        annotation: 'Collect [1,2,3], backtrack',
      },
      {
        id: 5,
        description: 'From path=[1], skip 2, include nums[2]=3: path=[1,3], push [1,3]. Backtrack to []. Then include 2 from root: collect [2],[2,3],[3].',
        state: { current: [1,3], results: [[], [1], [1,2], [1,2,3], [1,3]] },
        annotation: 'Collect [1,3]',
      },
      {
        id: 6,
        description: 'All 8 subsets: [],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3].',
        state: { results: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]], done: true },
        annotation: '2^3 = 8 subsets',
      },
    ],
    complexity: {
      time: 'O(2^n * n)',
      space: 'O(n)',
      timeExplanation: '2^n subsets, each takes O(n) to copy. Stack depth is O(n).',
      spaceExplanation: 'Recursion stack depth is O(n). Output excluded.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function subsets(nums) {
  const results = [];

  function dfs(start, current) {
    results.push([...current]);

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      dfs(i + 1, current);
      current.pop();
    }
  }

  dfs(0, []);
  return results;
}`,
      },
      {
        language: 'python',
        code: `def subsets(nums):
    results = []

    def dfs(start, current):
        results.append(list(current))
        for i in range(start, len(nums)):
            current.append(nums[i])
            dfs(i + 1, current)
            current.pop()

    dfs(0, [])
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Bit masking: iterate all 2^n bitmasks; for each, include element if corresponding bit is set.',
        complexity: { time: 'O(2^n * n)', space: 'O(2^n * n)', timeExplanation: '2^n masks, n bits each', spaceExplanation: 'All subsets stored', visualization: 'quadratic' },
      },
      optimized: {
        description: 'DFS with start index — collect at every node rather than only at leaves.',
        complexity: { time: 'O(2^n * n)', space: 'O(n)', timeExplanation: 'Same 2^n subsets', spaceExplanation: 'Stack only', visualization: 'quadratic' },
      },
      followUps: [
        'Subsets II (LC 90) — input has duplicates, skip duplicate at same depth level',
        'Combination Sum (LC 39) — subsets restricted to a target sum',
        'Count distinct subsets with a given XOR value',
      ],
      edgeCases: [
        'Empty array → [[]]',
        'Array with one element → [[],[element]]',
        'Subsets II requires sorting to detect and skip duplicates',
      ],
      commonMistakes: [
        'Collecting only at leaves (missing intermediate subsets)',
        'Not copying current array before pushing (all results reference same array)',
        'Using i+1 in Combination Sum instead of i — accidentally preventing reuse',
      ],
      interviewerTips: [
        'Subsets is the foundation of many backtracking problems — know it cold',
        'The DFS "collect at every node" vs "collect at leaves" distinction is key',
        'Bit masking approach is clean and worth mentioning as an alternative',
      ],
    },
    codeChallenge: {
      functionName: 'subsets',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3]], expected: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]], description: '[1,2,3] → 8 subsets' },
        { input: [[0]], expected: [[],[0]], description: 'Single element' },
        { input: [[1,2]], expected: [[],[1],[2],[1,2]], description: '[1,2] → 4 subsets' },
        { input: [[3,1,2]], expected: [[],[3],[1],[2],[3,1],[3,2],[1,2],[3,1,2]], description: 'Unsorted input' },
        { input: [[1,2,3,4]], expected: [[],[1],[2],[3],[4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[1,2,3],[1,2,4],[1,3,4],[2,3,4],[1,2,3,4]], description: '[1,2,3,4] → 16 subsets' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['combination-sum'],
    relatedPatterns: ['Backtracking', 'Subsets II', 'Power Set'],
    intuitionSummary: 'Every node in the DFS tree represents a valid subset — collect immediately, not just at leaves.',
    patternName: 'Collect-at-Every-Node DFS',
  },

  // ─── 6. Combinations ──────────────────────────────────────────────────────
  {
    id: 'combinations',
    slug: 'combinations',
    leetcodeNumber: 77,
    title: 'Combinations',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['backtracking', 'dfs', 'combinatorics'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Adobe'],
    descriptions: {
      explorer: 'Given numbers 1 to n, find all ways to choose exactly k of them. Order does not matter — (1,2) and (2,1) are the same combination.',
      engineer: 'DFS from start=1. Include i and recurse to i+1 with k-1 remaining. Prune when remaining numbers < k still needed.',
      interview: 'Backtracking with pruning. Loop i from start to n-(k-len)+1 (key pruning). O(C(n,k) * k) time.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1 (first element of [1,2])' },
        { id: 'b', value: 2, label: '2 (second element of [1,2])' },
        { id: 'c', value: 3, label: '3 (element of [1,3])' },
        { id: 'd', value: 6, label: 'total C(4,2)=6 combinations' },
      ],
      target: 3,
      instruction: 'n=4, k=2: select the TWO elements of the smallest valid combination [1,2].',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of it as Subsets but only collect when path length equals k. Start from 1 and pick numbers in increasing order to avoid duplicates.', xpCost: 0 },
      { id: 2, text: 'Prune early: if remaining numbers (n - i + 1) is less than numbers still needed (k - current.length), there is no point continuing.', xpCost: 0 },
      { id: 3, text: 'Loop i from start to n-(k-current.length)+1. This tight bound eliminates branches that can never fill k spots, massively cutting the search space.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=4, k=2. Call dfs(start=1, current=[]). Loop i from 1 to 4-(2-0)+1=3.',
        state: { n: 4, k: 2, current: [], i_range: '1..3', results: [] },
        annotation: 'Pruned upper bound = n-k+1 = 3',
      },
      {
        id: 2,
        description: 'Pick i=1. current=[1]. Recurse dfs(2,[1]). Need 1 more. Loop i from 2 to 4-(2-1)+1=4.',
        state: { current: [1], start: 2, i_range: '2..4' },
        annotation: 'One slot filled, need 1 more',
      },
      {
        id: 3,
        description: 'Pick i=2. current=[1,2]. len==k → push [1,2]. Backtrack. Pick i=3 → push [1,3]. Pick i=4 → push [1,4].',
        state: { results: [[1,2],[1,3],[1,4]] },
        annotation: 'Collect [1,2],[1,3],[1,4]',
      },
      {
        id: 4,
        description: 'Back at root. Pick i=2. current=[2]. Loop i from 3 to 4. Collect [2,3],[2,4].',
        state: { results: [[1,2],[1,3],[1,4],[2,3],[2,4]] },
        annotation: 'Collect [2,3],[2,4]',
      },
      {
        id: 5,
        description: 'Pick i=3. current=[3]. Loop i from 4 to 4. Collect [3,4].',
        state: { results: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] },
        annotation: 'Collect [3,4]',
      },
      {
        id: 6,
        description: 'All C(4,2)=6 combinations: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]].',
        state: { done: true, results: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] },
        annotation: 'C(4,2) = 6',
      },
    ],
    complexity: {
      time: 'O(C(n,k) * k)',
      space: 'O(k)',
      timeExplanation: 'C(n,k) combinations each of length k to copy.',
      spaceExplanation: 'Stack depth is k.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function combine(n, k) {
  const results = [];

  function dfs(start, current) {
    if (current.length === k) {
      results.push([...current]);
      return;
    }
    // Pruning: only go up to n - (k - current.length) + 1
    const limit = n - (k - current.length) + 1;
    for (let i = start; i <= limit; i++) {
      current.push(i);
      dfs(i + 1, current);
      current.pop();
    }
  }

  dfs(1, []);
  return results;
}`,
      },
      {
        language: 'python',
        code: `def combine(n, k):
    results = []

    def dfs(start, current):
        if len(current) == k:
            results.append(list(current))
            return
        limit = n - (k - len(current)) + 1
        for i in range(start, limit + 1):
            current.append(i)
            dfs(i + 1, current)
            current.pop()

    dfs(1, [])
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Generate all subsets and filter those of length k. No pruning.',
        complexity: { time: 'O(2^n * n)', space: 'O(n)', timeExplanation: 'All 2^n subsets generated', spaceExplanation: 'Stack depth', visualization: 'quadratic' },
      },
      optimized: {
        description: 'DFS with upper bound pruning: only iterate i up to n-(k-current.length)+1.',
        complexity: { time: 'O(C(n,k) * k)', space: 'O(k)', timeExplanation: 'Exact number of valid combinations * copy cost', spaceExplanation: 'Stack = k deep', visualization: 'quadratic' },
      },
      followUps: [
        'Combination Sum (LC 39) — combinations summing to a target, with reuse',
        'Subsets (LC 78) — all sizes, not just k',
        'What is the k-th combination in lexicographic order?',
      ],
      edgeCases: [
        'k=0 → [[]]',
        'k=n → [[1,2,...,n]]',
        'k>n → [] (impossible)',
      ],
      commonMistakes: [
        'Iterating i up to n instead of n-k+1 (missing the key pruning)',
        'Collecting at every node instead of only when length===k',
        'Using n-k+len as limit instead of n-(k-len)+1',
      ],
      interviewerTips: [
        'The pruning bound n-(k-len)+1 is the most important optimization — explain it clearly',
        'Contrast with Subsets: same structure, different collection condition',
        'Mention that itertools.combinations in Python uses essentially this algorithm',
      ],
    },
    codeChallenge: {
      functionName: 'combine',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function combine(n, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [4, 2], expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]], description: 'C(4,2)=6 combinations' },
        { input: [1, 1], expected: [[1]], description: 'n=1, k=1' },
        { input: [4, 3], expected: [[1,2,3],[1,2,4],[1,3,4],[2,3,4]], description: 'C(4,3)=4 combinations' },
        { input: [5, 1], expected: [[1],[2],[3],[4],[5]], description: 'k=1, each element alone' },
        { input: [3, 3], expected: [[1,2,3]], description: 'k=n, only one combination' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['subsets'],
    relatedPatterns: ['Backtracking with Pruning', 'Combination Sum', 'Subsets'],
    intuitionSummary: 'Subsets restricted to size k, with an early-exit upper bound that prevents exploring impossible branches.',
    patternName: 'Bounded DFS with Pruning',
  },

  // ─── 7. Generate Parentheses ──────────────────────────────────────────────
  {
    id: 'generate-parentheses',
    slug: 'generate-parentheses',
    leetcodeNumber: 22,
    title: 'Generate Parentheses',
    category: 'backtracking',
    difficulty: 'medium',
    engineType: 'pattern',
    tags: ['backtracking', 'dfs', 'string', 'recursion'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Uber'],
    descriptions: {
      explorer: 'Generate all valid combinations of n pairs of parentheses. Every opening bracket must eventually be closed, and no closing can come before its matching opener!',
      engineer: 'DFS building a string. Add "(" if open < n. Add ")" if close < open. Collect when both == n.',
      interview: 'Backtracking with open/close counters. Valid state: open<=n, close<=open. O(4^n / sqrt(n)) — nth Catalan number of results.',
    },
    puzzleConfig: {
      problemStatement: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses. For n=3, the answer has 5 strings: "((())) ", "(()()), "(()()) ", "()(()) ", "()()()".',
      correctPattern: 'dfs-backtracking',
      options: [
        { id: 'dfs-backtracking', label: 'DFS / Backtracking', icon: '🌲', description: 'Build choices one at a time, prune invalid states' },
        { id: 'stack', label: 'Stack', icon: '📚', description: 'LIFO structure to validate brackets' },
        { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧮', description: 'Combine solutions from smaller subproblems' },
        { id: 'hash-map', label: 'Hash Map', icon: '🗂️', description: 'Cache previously computed results' },
        { id: 'two-pointers', label: 'Two Pointers', icon: '👆', description: 'Move two cursors simultaneously' },
        { id: 'binary-search', label: 'Binary Search', icon: '🔍', description: 'Halve the search space each step' },
      ],
      explanation: 'Build the string character by character. At each step choose \'(\' or \')\' — but only when valid: add \'(\' if open < n, add \')\' if close < open. Collect when both reach n. This is the canonical backtracking shape: enumerate valid choices, recurse into each, collect leaves.',
      followUp: 'The output count is the nth Catalan number (~4ⁿ/n^1.5), so the algorithm is inherently exponential — every valid string must be generated. Pruning just avoids generating invalid ones.',
    },
    hints: [
      { id: 1, text: 'Track how many "(" and ")" you\'ve placed. You can add "(" any time open < n. You can only add ")" when close < open (ensures validity).', xpCost: 0 },
      { id: 2, text: 'Two recursive calls at each step: one adding "(", one adding ")". Each is only called when it\'s valid to do so. Collect when open==close==n.', xpCost: 0 },
      { id: 3, text: 'The decision tree has at most 2n levels with branching factor 2. Only valid states are explored — the constraints "open<=n" and "close<open" ensure every collected string is valid.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=3. Start with dfs(open=0, close=0, path="").',
        state: { n: 3, open: 0, close: 0, path: '', results: [] },
        annotation: 'Both counters start at 0',
      },
      {
        id: 2,
        description: 'open(0)<n(3): add "(". dfs(1,0,"("). Again: add "(". dfs(2,0,"(("). Again: add "(". dfs(3,0,"(((").',
        state: { open: 3, close: 0, path: '(((' },
        annotation: 'Fill all opens first',
      },
      {
        id: 3,
        description: 'open==n, cannot add more "(". close(0)<open(3): add ")". dfs(3,1,"((()"). Continue adding ")" until close==open.',
        state: { open: 3, close: 3, path: '((()))' },
        annotation: 'Collect "((()))"',
      },
      {
        id: 4,
        description: 'Backtrack. Follow path with "(()": add ")": "(())", then "(": "(()(", then ")": "(()()". close==open==3 → collect "(()())".',
        state: { path: '(()())', results: ['((()))', '(()())'] },
        annotation: 'Collect "(()())"',
      },
      {
        id: 5,
        description: 'Continue backtracking. Collect "(())()", "()(())", "()()()".',
        state: { results: ['((()))', '(()())', '(())()', '()(())', '()()()'] },
        annotation: '5th Catalan number = 5',
      },
      {
        id: 6,
        description: 'All 5 valid combinations for n=3 collected.',
        state: { done: true, results: ['((()))', '(()())', '(())()', '()(())', '()()()'] },
        annotation: 'Catalan(3) = 5',
      },
    ],
    complexity: {
      time: 'O(4^n / sqrt(n))',
      space: 'O(n)',
      timeExplanation: 'Number of valid parentheses strings is the nth Catalan number ≈ 4^n / (n^1.5 * sqrt(π)).',
      spaceExplanation: 'Stack depth is 2n, so O(n).',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function generateParenthesis(n) {
  const results = [];

  function dfs(open, close, path) {
    if (open === n && close === n) {
      results.push(path);
      return;
    }
    if (open < n) {
      dfs(open + 1, close, path + '(');
    }
    if (close < open) {
      dfs(open, close + 1, path + ')');
    }
  }

  dfs(0, 0, '');
  return results;
}`,
      },
      {
        language: 'python',
        code: `def generateParenthesis(n):
    results = []

    def dfs(open_count, close_count, path):
        if open_count == n and close_count == n:
            results.append(path)
            return
        if open_count < n:
            dfs(open_count + 1, close_count, path + '(')
        if close_count < open_count:
            dfs(open_count, close_count + 1, path + ')')

    dfs(0, 0, '')
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Generate all 2^(2n) strings of "(" and ")" and validate each with a stack.',
        complexity: { time: 'O(2^(2n) * n)', space: 'O(n)', timeExplanation: 'Exponential strings, each O(n) to validate', spaceExplanation: 'Stack for validation', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Constrained DFS: only branch into valid states. Open count and close count guard every recursive call.',
        complexity: { time: 'O(4^n / sqrt(n))', space: 'O(n)', timeExplanation: 'nth Catalan number of results', spaceExplanation: 'Recursion depth 2n', visualization: 'quadratic' },
      },
      followUps: [
        'Remove Invalid Parentheses (LC 301) — BFS/backtracking to remove minimum',
        'Longest Valid Parentheses (LC 32) — DP/stack approach',
        'Valid Parentheses (LC 20) — stack-based validation',
      ],
      edgeCases: [
        'n=0 → [""] (empty string is valid)',
        'n=1 → ["()"]',
        'Large n — output grows as Catalan numbers',
      ],
      commonMistakes: [
        'Checking close <= open instead of close < open — generates invalid strings',
        'Not checking open < n before adding "(" — can overshoot',
        'Building string with mutable array without restoring on backtrack (use string concatenation to avoid this)',
      ],
      interviewerTips: [
        'The two guards (open<n and close<open) guarantee every generated string is valid — no validation needed',
        'Mention Catalan numbers — it shows mathematical depth',
        'Contrast with the brute-force generate-and-validate approach',
      ],
    },
    codeChallenge: {
      functionName: 'generateParenthesis',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [3], expected: ['((()))','(()())','(())()','()(())','()()()'], description: 'n=3 → 5 valid combinations' },
        { input: [1], expected: ['()'], description: 'n=1' },
        { input: [2], expected: ['(())','()()'], description: 'n=2' },
        { input: [4], expected: ['(((())))','((()()))','((())())','((()))()','(()(()))','(()()())','(()())()','(())(())','(())()()','()((())) ','()((()))','()(()())','()(())()','()()(())','()()()()'], description: 'n=4 → 14 combinations' },
        { input: [0], expected: [''], description: 'n=0 → empty string' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['subsets'],
    relatedPatterns: ['Backtracking with Constraints', 'Catalan Numbers', 'Valid Parentheses'],
    intuitionSummary: 'Two guards replace any need for validation: add "(" only when open count is less than n, add ")" only when close count is less than open count.',
    patternName: 'Constrained DFS with Guards',
  },

  // ─── 8. N-Queens II ───────────────────────────────────────────────────────
  {
    id: 'n-queens-ii',
    slug: 'n-queens-ii',
    leetcodeNumber: 52,
    title: 'N-Queens II',
    category: 'backtracking',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['backtracking', 'dfs', 'matrix', 'combinatorics'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Goldman Sachs'],
    descriptions: {
      explorer: 'Place n chess queens on an n×n board so that no two queens attack each other. Queens attack in rows, columns, and diagonals — count all valid arrangements!',
      engineer: 'Row-by-row DFS. Track used cols, diag1 (r-c), and diag2 (r+c) in sets. For each row, try every column not in any conflict set.',
      interview: 'Backtracking. Three sets track conflicts: cols, diag1 (r-c constant for same diagonal), diag2 (r+c constant for same anti-diagonal). O(n!) time.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'queen in row 0, col 1' },
        { id: 'b', value: 3, label: 'queen in row 1, col 3' },
        { id: 'c', value: 2, label: 'number of solutions: 2' },
        { id: 'd', value: 4, label: 'n=4, board size' },
      ],
      target: 4,
      instruction: '4-Queens: one solution places queens at columns [1,3,0,2]. Select the column positions for rows 0 and 1.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Place exactly one queen per row (row-by-row DFS). For each row, try all columns and skip those attacking previously placed queens.', xpCost: 0 },
      { id: 2, text: 'Three conflict checks: same column (col in usedCols), same diagonal (r-c in diag1), same anti-diagonal (r+c in diag2). These are O(1) with sets.', xpCost: 0 },
      { id: 3, text: 'When row===n all queens placed. Count+1. The key insight: diag1 = r-c is unique per diagonal; diag2 = r+c is unique per anti-diagonal.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=4. Place queen in row 0. Try col=0: usedCols={0}, diag1={0-0=0}, diag2={0+0=0}. Recurse to row 1.',
        state: { row: 0, col: 0, usedCols: [0], diag1: [0], diag2: [0] },
        annotation: 'Q at (0,0)',
      },
      {
        id: 2,
        description: 'Row 1: col=0 (col conflict), col=1 (diag2: 1+1=2 vs 0+0=0, ok; diag1: 1-1=0 conflict!), col=2 (ok). Place at (1,2).',
        state: { row: 1, col: 2, usedCols: [0,2], diag1: [0,-1], diag2: [0,3] },
        annotation: 'Q at (1,2)',
      },
      {
        id: 3,
        description: 'Row 2: col=0 (diag2 0+0=0 conflict), col=1 (check: col ok, diag1 2-1=1 ok, diag2 2+1=3 conflict!), col=3 (all ok). Place at (2,3).',
        state: { row: 2, col: 3, usedCols: [0,2,3], diag1: [0,-1,-1], diag2: [0,3,5] },
        annotation: 'Q at (2,3)',
      },
      {
        id: 4,
        description: 'Row 3: all cols conflict. Backtrack. Undo (2,3). Try col=3 in row 2 — no more options. Backtrack to row 1.',
        state: { row: 1, backtracking: true },
        annotation: 'Dead end, backtrack',
      },
      {
        id: 5,
        description: 'After full exploration, n=4 yields 2 valid configurations. First: queens at (0,1),(1,3),(2,0),(3,2). Second: (0,2),(1,0),(2,3),(3,1).',
        state: { count: 2, configs: ['(0,1)(1,3)(2,0)(3,2)', '(0,2)(1,0)(2,3)(3,1)'] },
        annotation: 'totalNQueens(4) = 2',
      },
      {
        id: 6,
        description: 'totalNQueens(1)=1, totalNQueens(4)=2, totalNQueens(8)=92.',
        state: { done: true, results: { 1: 1, 4: 2, 8: 92 } },
        annotation: 'Return count only',
      },
    ],
    complexity: {
      time: 'O(n!)',
      space: 'O(n)',
      timeExplanation: 'At most n choices for row 0, n-1 for row 1, etc. Conflict pruning reduces actual work significantly.',
      spaceExplanation: 'Three sets each at most size n, plus recursion stack of depth n.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); // r - c
  const diag2 = new Set(); // r + c

  function dfs(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      dfs(row + 1);
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  dfs(0);
  return count;
}`,
      },
      {
        language: 'python',
        code: `def totalNQueens(n):
    count = 0
    cols, diag1, diag2 = set(), set(), set()

    def dfs(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            dfs(row + 1)
            cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)

    dfs(0)
    return count`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all n^n placements (one per cell per row). Check validity of each full board.',
        complexity: { time: 'O(n^n)', space: 'O(n)', timeExplanation: 'n choices per row, n rows', spaceExplanation: 'Recursion stack', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Row-by-row backtracking with O(1) conflict detection via three sets. Prunes invalid columns immediately.',
        complexity: { time: 'O(n!)', space: 'O(n)', timeExplanation: 'n! — conflict pruning eliminates most branches', spaceExplanation: 'Sets of size ≤ n, stack depth n', visualization: 'quadratic' },
      },
      followUps: [
        'N-Queens I (LC 51) — return actual board configurations, not just count',
        'Can you use bitmasks instead of sets for O(1) ops with smaller constants?',
        'How does the count grow? (1,1,0,2,10,4,40,92 for n=1..8)',
      ],
      edgeCases: [
        'n=1 → 1 (trivially place one queen)',
        'n=2 and n=3 → 0 (no valid configurations)',
        'n=0 → 1 (empty board, empty solution)',
      ],
      commonMistakes: [
        'Using r-c and r+c incorrectly — double-check which diagonal is which',
        'Forgetting to delete from sets after backtracking',
        'N-Queens I variant: building the board row incorrectly with queen position',
      ],
      interviewerTips: [
        'The diag1=r-c, diag2=r+c trick is the core insight — explain why it works',
        'For n=8, there are 92 solutions — this is a well-known combinatorics fact',
        'Bitmask optimization (using integers instead of sets) reduces constant factor significantly',
      ],
    },
    codeChallenge: {
      functionName: 'totalNQueens',
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {number}
 */
function totalNQueens(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [1], expected: 1, description: 'n=1 → 1 solution' },
        { input: [4], expected: 2, description: 'n=4 → 2 solutions' },
        { input: [5], expected: 10, description: 'n=5 → 10 solutions' },
        { input: [6], expected: 4, description: 'n=6 → 4 solutions' },
        { input: [8], expected: 92, description: 'n=8 → 92 solutions' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 50, code: 80, coding: 200 },
    prerequisites: ['combination-sum', 'permutations'],
    relatedPatterns: ['Backtracking with Constraint Sets', 'N-Queens I', 'Constraint Satisfaction'],
    intuitionSummary: 'Three O(1) sets track column, diagonal, and anti-diagonal conflicts. Row-by-row placement ensures at most one queen per row automatically.',
    patternName: 'Constraint-Set Backtracking',
  },

  // ─── 9. Word Search II ────────────────────────────────────────────────────
  {
    id: 'word-search-ii',
    slug: 'word-search-ii',
    leetcodeNumber: 212,
    title: 'Word Search II',
    category: 'trie',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['backtracking', 'trie', 'dfs', 'matrix'],
    questionSets: ['blind75'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Airbnb'],
    descriptions: {
      explorer: 'Given a letter grid and a list of words, find which words can be spelled by following a path of adjacent cells (no cell reused).',
      engineer: 'Build a Trie from all words. DFS from each cell, traversing Trie simultaneously. When a Trie node marks end-of-word, collect. Remove found words from Trie to avoid duplicates.',
      interview: 'Trie + DFS. Insert all words into Trie. DFS from each cell, following Trie edges. Prune when no Trie child matches. O(m*n*4^L) where L = max word length.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '"eat": 3 chars, found at row 0,1' },
        { id: 'b', value: 4, label: '"oath": 4 chars, found at row 3,2,1,0' },
        { id: 'c', value: 3, label: '"pea": 3 chars, NOT found' },
        { id: 'd', value: 4, label: '"rain": 4 chars, NOT found' },
      ],
      target: 7,
      instruction: 'Board word search: select the TWO words that ARE found in the board (words=["oath","pea","eat","rain"]).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Running Word Search (LC 79) for each word separately is too slow. Build a Trie from all words so the DFS can prune entire branches at once.', xpCost: 0 },
      { id: 2, text: 'DFS from each cell, moving through the Trie simultaneously. If there is no Trie child for board[r][c], prune that branch entirely.', xpCost: 0 },
      { id: 3, text: 'When a Trie node has node.word set, add that word to results. Then clear node.word to avoid adding duplicates. Also prune Trie nodes that have no children after removal.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Build Trie from ["oath","pea","eat","rain"]. Insert each word character by character.',
        state: { words: ['oath','pea','eat','rain'], trieBuilt: true },
        annotation: 'Trie ready',
      },
      {
        id: 2,
        description: 'Start DFS from each cell. At (0,1)="e": Trie has child "e" (from "eat"). DFS deeper.',
        state: { cell: [0,1], char: 'e', trieChild: true },
        annotation: 'DFS from (0,1)',
      },
      {
        id: 3,
        description: 'From (0,1)="e", go to (1,3)="a" (Trie has "e→a"). From (1,3)="a", go to (1,2)="t". node.word="eat" → collect "eat".',
        state: { path: [[0,1],[1,3],[1,2]], word: 'eat', results: ['eat'] },
        annotation: 'Found "eat"',
      },
      {
        id: 4,
        description: 'Continue DFS. At (1,3)="o": Trie has "o" from "oath". Follow o→a→t→h. All found along adjacent path? Check (1,3)→(2,3)→... eventually find "oath".',
        state: { word: 'oath', results: ['eat','oath'] },
        annotation: 'Found "oath"',
      },
      {
        id: 5,
        description: '"pea" and "rain" have no complete path on this board. DFS prunes when Trie child missing.',
        state: { checked: ['pea','rain'], found: false },
        annotation: 'Pruned by Trie',
      },
      {
        id: 6,
        description: 'Final result: ["eat","oath"]. Order may vary.',
        state: { results: ['eat','oath'], done: true },
        annotation: 'Return found words',
      },
    ],
    complexity: {
      time: 'O(m * n * 4^L)',
      space: 'O(W * L)',
      timeExplanation: 'DFS from each of m*n cells; each DFS path is at most 4^L where L = max word length. Trie pruning prevents exploring dead-end branches.',
      spaceExplanation: 'Trie stores W words each of length up to L. W = number of words.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function findWords(board, words) {
  // Build Trie
  const root = {};
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node['$'] = word; // store word at end node
  }

  const rows = board.length;
  const cols = board[0].length;
  const results = [];

  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const ch = board[r][c];
    if (ch === '#' || !node[ch]) return;

    const next = node[ch];
    if (next['$']) {
      results.push(next['$']);
      delete next['$']; // avoid duplicates
    }

    board[r][c] = '#'; // mark visited
    dfs(r + 1, c, next);
    dfs(r - 1, c, next);
    dfs(r, c + 1, next);
    dfs(r, c - 1, next);
    board[r][c] = ch; // restore
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return results;
}`,
      },
      {
        language: 'python',
        code: `def findWords(board, words):
    root = {}
    for word in words:
        node = root
        for ch in word:
            node = node.setdefault(ch, {})
        node['$'] = word

    rows, cols = len(board), len(board[0])
    results = []

    def dfs(r, c, node):
        if not (0 <= r < rows and 0 <= c < cols): return
        ch = board[r][c]
        if ch == '#' or ch not in node: return
        nxt = node[ch]
        if '$' in nxt:
            results.append(nxt['$'])
            del nxt['$']
        board[r][c] = '#'
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc, nxt)
        board[r][c] = ch

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)
    return results`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Run Word Search (LC 79) for each word independently.',
        complexity: { time: 'O(W * m * n * 4^L)', space: 'O(L)', timeExplanation: 'W words each needing full board DFS', spaceExplanation: 'Stack depth L', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Trie-based combined DFS. All words searched simultaneously; Trie edges prune dead-end paths.',
        complexity: { time: 'O(m * n * 4^L)', space: 'O(W * L)', timeExplanation: 'Single DFS pass for all words, Trie prunes', spaceExplanation: 'Trie size', visualization: 'quadratic' },
      },
      followUps: [
        'Word Search (LC 79) — single word version',
        'Can you prune Trie nodes with no children after collecting a word?',
        'What if words share many prefixes? (Trie becomes even more valuable)',
      ],
      edgeCases: [
        'Word list has duplicates — delete from Trie after finding to avoid duplicate results',
        'Word longer than total board cells → impossible',
        'Single-cell board',
      ],
      commonMistakes: [
        'Not deleting found words from Trie — causes duplicates when the same word path is reachable',
        'Forgetting to restore board cell after DFS (backtracking)',
        'Building Trie incorrectly — storing word at wrong node',
      ],
      interviewerTips: [
        'Start by explaining why LC 79 repeated per word is O(W*m*n*4^L) then show the Trie improvement',
        'The delete-after-find optimization is often overlooked but crucial for correctness',
        'Trie pruning is the crux: mention that node[ch] check prunes entire subtrees',
      ],
    },
    codeChallenge: {
      functionName: 'findWords',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]], expected: ["eat","oath"], description: 'Standard board — find oath and eat' },
        { input: [[["a","b"],["c","d"]], ["abdc","abcd"]], expected: ["abdc"], description: 'One word follows valid path, one does not' },
        { input: [[["a"]], ["a"]], expected: ["a"], description: 'Single cell board' },
        { input: [[["a","b"],["c","d"]], ["abcd","abdc","acbd","acdb","adbc","adcb"]], expected: ["abdc","acbd"], description: 'Multiple snaking paths' },
        { input: [[["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]], ["oa","oat","oath","oath"]], expected: ["oa","oat","oath","oath"], description: 'Prefix words all present' },
      ],
    },
    xpRewards: { puzzle: 180, hints: 20, dryRun: 60, code: 100, coding: 250 },
    prerequisites: ['word-search', 'implement-trie'],
    relatedPatterns: ['Trie + DFS', 'Word Search', 'Prefix Tree Pruning'],
    intuitionSummary: 'Build a Trie from all words, then run a single DFS that navigates the board and the Trie simultaneously — pruning any board path not in the Trie.',
    patternName: 'Trie-Guided Board DFS',
  },

  // ─── 10. Find Minimum in Rotated Sorted Array ─────────────────────────────
  {
    id: 'find-minimum-rotated-sorted-array',
    slug: 'find-minimum-rotated-sorted-array',
    leetcodeNumber: 153,
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'binary-search',
    difficulty: 'medium',
    engineType: 'search',
    tags: ['binary-search', 'array', 'divide-conquer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Facebook', 'Apple'],
    descriptions: {
      explorer: 'A sorted array was rotated at some pivot. Find the smallest element without scanning the whole array — use the sorted structure!',
      engineer: 'Binary search. If nums[mid] > nums[right], minimum is in the right half. Otherwise it is in the left half (including mid). O(log n).',
      interview: 'Classic binary search variant. One half is always sorted. Compare nums[mid] to nums[right] to determine which half contains the pivot (minimum).',
    },
    puzzleConfig: {
      array: [1, 2, 3, 4, 5],
      target: 1,
      instruction: 'Rotated array [3,4,5,1,2]: the minimum element is 1. Binary search on the conceptual sorted array to find it.',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'In a rotated sorted array, at least one half is always sorted. The minimum is at the rotation pivot.', xpCost: 0 },
      { id: 2, text: 'Compare nums[mid] to nums[right]. If nums[mid] > nums[right], the pivot (minimum) must be in the right half. Move left = mid + 1.', xpCost: 0 },
      { id: 3, text: 'If nums[mid] <= nums[right], the right half is sorted and the minimum is in the left half (could be mid itself). Move right = mid.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[3,4,5,1,2]. left=0, right=4. mid=2, nums[mid]=5.',
        state: { nums: [3,4,5,1,2], left: 0, right: 4, mid: 2, midVal: 5 },
        highlight: [0, 2, 4],
        pointers: { left: 0, mid: 2, right: 4 },
      },
      {
        id: 2,
        description: 'nums[mid]=5 > nums[right]=2. Minimum is in right half. Set left = mid+1 = 3.',
        state: { nums: [3,4,5,1,2], left: 3, right: 4, decision: 'minimum in right half' },
        highlight: [3, 4],
        pointers: { left: 3, right: 4 },
        annotation: 'left = 3',
      },
      {
        id: 3,
        description: 'left=3, right=4. mid=3, nums[mid]=1. nums[mid]=1 <= nums[right]=2. Minimum is in left (including mid). Set right = mid = 3.',
        state: { nums: [3,4,5,1,2], left: 3, right: 3, decision: 'include mid, right half sorted' },
        highlight: [3],
        pointers: { left: 3, right: 3 },
        annotation: 'right = 3',
      },
      {
        id: 4,
        description: 'left === right = 3. Loop ends. Return nums[left] = nums[3] = 1.',
        state: { nums: [3,4,5,1,2], left: 3, right: 3, answer: 1 },
        highlight: [3],
        annotation: 'Minimum = 1',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'Binary search halves the search space each iteration.',
      spaceExplanation: 'Only left, right, mid pointers needed.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1; // minimum is in right half
    } else {
      right = mid; // minimum is in left half (could be mid)
    }
  }

  return nums[left];
}`,
      },
      {
        language: 'python',
        code: `def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan to find minimum.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Visit every element', spaceExplanation: 'Constant extra space', visualization: 'linear' },
      },
      optimized: {
        description: 'Binary search exploiting the rotated sorted structure.',
        complexity: { time: 'O(log n)', space: 'O(1)', timeExplanation: 'Halve search space each step', spaceExplanation: 'No extra space', visualization: 'logarithmic' },
      },
      followUps: [
        'Find Minimum in Rotated Sorted Array II (LC 154) — handles duplicates (worst case O(n))',
        'Search in Rotated Sorted Array (LC 33) — find a target instead of minimum',
        'What if the array has no rotation? (Still works correctly)',
      ],
      edgeCases: [
        'Not rotated (already sorted) → minimum at index 0',
        'Rotated by exactly 1 position',
        'Single element array',
        'Two elements',
      ],
      commonMistakes: [
        'Comparing to nums[left] instead of nums[right] — leads to incorrect logic',
        'Using right = mid - 1 instead of right = mid — skips the potential minimum at mid',
        'Integer overflow: use (left+right)>>>1 or Math.floor((left+right)/2)',
      ],
      interviewerTips: [
        'Why compare to right and not left? Because the right bound always converges toward the answer.',
        'The invariant: nums[left..right] always contains the minimum.',
        'Mention LC 154 (with duplicates) — there you must use right-- when nums[mid]===nums[right].',
      ],
    },
    codeChallenge: {
      functionName: 'findMin',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3,4,5,1,2]], expected: 1, description: 'Rotated at index 3' },
        { input: [[4,5,6,7,0,1,2]], expected: 0, description: 'Rotated at index 4' },
        { input: [[11,13,15,17]], expected: 11, description: 'Not rotated' },
        { input: [[2,1]], expected: 1, description: 'Two elements, rotated' },
        { input: [[1]], expected: 1, description: 'Single element' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['binary-search'],
    relatedPatterns: ['Binary Search on Rotated Array', 'Search in Rotated Array'],
    intuitionSummary: 'Compare mid to right to determine which half is sorted, and which half contains the unsorted pivot (minimum).',
    patternName: 'Binary Search on Rotated Array',
  },

  // ─── 11. Search in Rotated Sorted Array ───────────────────────────────────
  {
    id: 'search-in-rotated-sorted-array',
    slug: 'search-in-rotated-sorted-array',
    leetcodeNumber: 33,
    title: 'Search in Rotated Sorted Array',
    category: 'binary-search',
    difficulty: 'medium',
    engineType: 'search',
    tags: ['binary-search', 'array', 'divide-conquer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Apple'],
    descriptions: {
      explorer: 'A sorted array was rotated. Find a target value\'s index — or return -1 if it\'s absent. You must solve it in O(log n) time!',
      engineer: 'Binary search. Determine which half is sorted, then check if target falls in that sorted half. Adjust bounds accordingly.',
      interview: 'Identify which half is sorted using nums[left]<=nums[mid]. If target is in sorted half, search there; otherwise search other half. O(log n).',
    },
    puzzleConfig: {
      array: [0, 1, 2, 4, 5, 6, 7],
      target: 0,
      instruction: 'Rotated sorted array [4,5,6,7,0,1,2], target=0. Binary search on the sorted representation to find target 0.',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'In any binary split of a rotated array, at least one half is contiguously sorted. Determine which half is sorted by comparing nums[left] and nums[mid].', xpCost: 0 },
      { id: 2, text: 'If nums[left] <= nums[mid], the left half is sorted. Check if target is in [nums[left], nums[mid]]. If yes, search left; else search right.', xpCost: 0 },
      { id: 3, text: 'If nums[left] > nums[mid], the right half is sorted. Check if target is in [nums[mid], nums[right]]. If yes, search right; else search left.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[4,5,6,7,0,1,2], target=0. left=0, right=6. mid=3, nums[mid]=7.',
        state: { nums: [4,5,6,7,0,1,2], target: 0, left: 0, right: 6, mid: 3, midVal: 7 },
        highlight: [0, 3, 6],
        pointers: { left: 0, mid: 3, right: 6 },
      },
      {
        id: 2,
        description: 'nums[left]=4 <= nums[mid]=7 → left half [4,5,6,7] is sorted. Is target 0 in [4,7]? No. Search right half: left = mid+1 = 4.',
        state: { left: 4, right: 6, decision: 'left sorted, target not in left' },
        highlight: [4, 5, 6],
        pointers: { left: 4, right: 6 },
        annotation: 'left = 4',
      },
      {
        id: 3,
        description: 'left=4, right=6. mid=5, nums[mid]=1. nums[left]=0 <= nums[mid]=1 → left half [0,1] sorted. Is 0 in [0,1]? Yes. Search left: right = mid = 5.',
        state: { left: 4, right: 5, decision: 'left sorted, target in [0,1]' },
        highlight: [4, 5],
        pointers: { left: 4, right: 5 },
        annotation: 'right = 5',
      },
      {
        id: 4,
        description: 'left=4, right=5. mid=4, nums[mid]=0. nums[mid] == target. Return 4.',
        state: { left: 4, right: 5, mid: 4, midVal: 0, found: true, answer: 4 },
        highlight: [4],
        annotation: 'Found at index 4',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'Binary search: halve the search space each iteration.',
      spaceExplanation: 'Only pointer variables used.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`,
      },
      {
        language: 'python',
        code: `def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:  # left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan through the array.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Check every element', spaceExplanation: 'No extra space', visualization: 'linear' },
      },
      optimized: {
        description: 'Binary search identifying the sorted half each iteration to direct the search.',
        complexity: { time: 'O(log n)', space: 'O(1)', timeExplanation: 'Halve search space each step', spaceExplanation: 'Pointer variables only', visualization: 'logarithmic' },
      },
      followUps: [
        'Search in Rotated Sorted Array II (LC 81) — handles duplicates',
        'Find Minimum in Rotated Sorted Array (LC 153) — find pivot instead of target',
        'What if you do not know the array is rotated?',
      ],
      edgeCases: [
        'Target not in array → -1',
        'Not rotated array',
        'Two-element array',
        'Target at rotation point',
      ],
      commonMistakes: [
        'Using strict inequality: nums[left] < nums[mid] misses when left==mid (single element half)',
        'Checking target range incorrectly — must be nums[left]<=target && target<nums[mid] (note the < on right)',
        'Missing the equal case when left == mid',
      ],
      interviewerTips: [
        'Walk through a case where left==mid carefully — the <= matters',
        'Distinguish from Find Minimum: here we terminate when nums[mid]==target',
        'Mention LC 81 (duplicates): when nums[left]==nums[mid] we must do left++ (worst case O(n))',
      ],
    },
    codeChallenge: {
      functionName: 'search',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[4,5,6,7,0,1,2], 0], expected: 4, description: 'Target at rotation point' },
        { input: [[4,5,6,7,0,1,2], 3], expected: -1, description: 'Target not in array' },
        { input: [[1], 0], expected: -1, description: 'Single element, not found' },
        { input: [[1], 1], expected: 0, description: 'Single element, found' },
        { input: [[5,1,3], 3], expected: 2, description: 'Target in right sorted half' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['find-minimum-rotated-sorted-array'],
    relatedPatterns: ['Binary Search on Rotated Array', 'Find Minimum Rotated'],
    intuitionSummary: 'One half is always sorted. Check if target falls within the sorted half; if so, search there; otherwise search the other half.',
    patternName: 'Identify Sorted Half Binary Search',
  },

  // ─── 12. Search Insert Position ───────────────────────────────────────────
  {
    id: 'search-insert-position',
    slug: 'search-insert-position',
    leetcodeNumber: 35,
    title: 'Search Insert Position',
    category: 'binary-search',
    difficulty: 'easy',
    engineType: 'search',
    tags: ['binary-search', 'array'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Adobe'],
    descriptions: {
      explorer: 'Find where a number is (or should be inserted) in a sorted array. No duplicates, no scanning — use binary search!',
      engineer: 'Standard binary search. If found, return mid. If not found, return left — it converges to the insertion position.',
      interview: 'Textbook binary search. When loop exits (left > right), left is the smallest index where nums[left] >= target — the correct insertion point.',
    },
    puzzleConfig: {
      array: [1, 3, 5, 6],
      target: 5,
      instruction: 'Sorted array [1,3,5,6], target=5. Binary search to find its index (or insert position).',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'Run binary search. If you find the target, return its index immediately.', xpCost: 0 },
      { id: 2, text: 'If the loop ends without finding the target, where does "left" point? It is always at the first element larger than target — the correct insertion spot.', xpCost: 0 },
      { id: 3, text: 'Invariant: at the end of binary search, left > right and nums[right] < target <= nums[left]. So left is the answer.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,3,5,6], target=5. left=0, right=3. mid=1, nums[1]=3.',
        state: { nums: [1,3,5,6], target: 5, left: 0, right: 3, mid: 1, midVal: 3 },
        highlight: [0, 1, 3],
        pointers: { left: 0, mid: 1, right: 3 },
      },
      {
        id: 2,
        description: 'nums[1]=3 < target=5. Search right half: left = 2.',
        state: { left: 2, right: 3 },
        highlight: [2, 3],
        pointers: { left: 2, right: 3 },
        annotation: 'left = 2',
      },
      {
        id: 3,
        description: 'mid=2, nums[2]=5 === target. Return 2.',
        state: { mid: 2, midVal: 5, found: true, answer: 2 },
        highlight: [2],
        annotation: 'Found at index 2',
      },
      {
        id: 4,
        description: 'Example: target=2 in [1,3,5,6]. Binary search: mid=1→3>2→right=0. mid=0→1<2→left=1. left>right → return left=1.',
        state: { nums: [1,3,5,6], target: 2, result: 1 },
        annotation: 'Insertion point = 1',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'Binary search halves the range each iteration.',
      spaceExplanation: 'Only pointer variables.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left; // insertion position
}`,
      },
      {
        language: 'python',
        code: `def searchInsert(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return left`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan: find first index where nums[i] >= target.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Scan until found', spaceExplanation: 'No extra space', visualization: 'linear' },
      },
      optimized: {
        description: 'Binary search. Return left when loop ends — it is the insertion point.',
        complexity: { time: 'O(log n)', space: 'O(1)', timeExplanation: 'Halve search space each step', spaceExplanation: 'Pointer variables only', visualization: 'logarithmic' },
      },
      followUps: [
        'Find First and Last Position (LC 34) — two binary searches',
        'What if duplicates exist? (Use leftmost binary search)',
        'lower_bound / upper_bound C++ STL equivalents',
      ],
      edgeCases: [
        'Target smaller than all elements → return 0',
        'Target larger than all elements → return n',
        'Empty array → return 0',
      ],
      commonMistakes: [
        'Returning right instead of left at the end',
        'Using left < right (without =) — may miss single-element arrays',
        'Not handling empty input',
      ],
      interviewerTips: [
        'The key insight: when loop exits, left > right and left is the smallest index ≥ target',
        'This is the building block for many binary search problems',
        'Python bisect.bisect_left does exactly this',
      ],
    },
    codeChallenge: {
      functionName: 'searchInsert',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,3,5,6], 5], expected: 2, description: 'Target found at index 2' },
        { input: [[1,3,5,6], 2], expected: 1, description: 'Insert between 1 and 3' },
        { input: [[1,3,5,6], 7], expected: 4, description: 'Insert after all elements' },
        { input: [[1,3,5,6], 0], expected: 0, description: 'Insert before all elements' },
        { input: [[1], 1], expected: 0, description: 'Single element, found' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 40, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Binary Search', 'Lower Bound', 'Find First and Last Position'],
    intuitionSummary: 'Standard binary search — when the loop exits without finding the target, the left pointer sits at the correct insertion index.',
    patternName: 'Binary Search Insertion Point',
  },

  // ─── 13. Find Peak Element ────────────────────────────────────────────────
  {
    id: 'find-peak-element',
    slug: 'find-peak-element',
    leetcodeNumber: 162,
    title: 'Find Peak Element',
    category: 'binary-search',
    difficulty: 'medium',
    engineType: 'search',
    tags: ['binary-search', 'array', 'divide-conquer'],
    questionSets: ['top150'],
    companies: ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'A peak element is one that is greater than its neighbors. Find ANY peak in the array — there may be multiple but you only need one!',
      engineer: 'Binary search: if nums[mid] < nums[mid+1], a peak exists on the right side. Otherwise a peak exists on the left side (including mid).',
      interview: 'Binary search on a property rather than a value. The slope direction at mid tells you which side has a peak. O(log n). Any valid peak accepted.',
    },
    puzzleConfig: {
      array: [1, 2, 3, 4, 5],
      target: 3,
      instruction: '[1,2,3,1]: peak element = 3 (nums[i] > nums[i±1]). Binary search: if mid < right, peak is right; else peak is left. Find 3.',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'A peak must exist because the array is considered -∞ at both ends. If you go uphill from any point, you will eventually hit a peak.', xpCost: 0 },
      { id: 2, text: 'If nums[mid] < nums[mid+1], the right side is going uphill, so there is definitely a peak to the right. Move left = mid+1.', xpCost: 0 },
      { id: 3, text: 'If nums[mid] >= nums[mid+1], the right is downhill (or flat). The peak is at mid or to its left. Move right = mid. Converge to the peak.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,2,3,1]. left=0, right=3. mid=1. nums[1]=2 < nums[2]=3 → peak is right. left=2.',
        state: { nums: [1,2,3,1], left: 0, right: 3, mid: 1, comparison: '2 < 3' },
        highlight: [1, 2],
        pointers: { left: 0, mid: 1, right: 3 },
        annotation: 'Uphill → go right',
      },
      {
        id: 2,
        description: 'left=2, right=3. mid=2. nums[2]=3 > nums[3]=1 → peak is at mid or left. right=2.',
        state: { nums: [1,2,3,1], left: 2, right: 2, comparison: '3 > 1' },
        highlight: [2],
        pointers: { left: 2, right: 2 },
        annotation: 'Downhill → go left (including mid)',
      },
      {
        id: 3,
        description: 'left===right=2. Loop ends. Return 2.',
        state: { left: 2, right: 2, answer: 2 },
        highlight: [2],
        annotation: 'Peak at index 2',
      },
      {
        id: 4,
        description: 'Verify: nums[2]=3 > nums[1]=2 and nums[2]=3 > nums[3]=1. Confirmed peak.',
        state: { nums: [1,2,3,1], peakIdx: 2, peakVal: 3, verified: true },
        annotation: '3 > neighbors 2,1 ✓',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'Binary search on slope direction — halves the range each iteration.',
      spaceExplanation: 'Pointer variables only.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1; // ascending slope, peak to the right
    } else {
      right = mid; // descending slope, peak at mid or left
    }
  }

  return left; // left === right
}`,
      },
      {
        language: 'python',
        code: `def findPeakElement(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2
        if nums[mid] < nums[mid + 1]:
            left = mid + 1
        else:
            right = mid

    return left`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan: check each element against its neighbors.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Visit each element', spaceExplanation: 'No extra space', visualization: 'linear' },
      },
      optimized: {
        description: 'Binary search on gradient direction. Moving toward the uphill side guarantees finding a peak.',
        complexity: { time: 'O(log n)', space: 'O(1)', timeExplanation: 'Binary search', spaceExplanation: 'Pointers only', visualization: 'logarithmic' },
      },
      followUps: [
        'Find Peak in 2D Matrix (LC 1901) — binary search on rows/columns',
        'What if you need ALL peaks? (Linear scan required)',
        'Does this work if multiple peaks exist? (Yes — finds any one peak)',
      ],
      edgeCases: [
        'Single element is always a peak (neighbors are -∞)',
        'Strictly ascending array — peak is last element',
        'Strictly descending array — peak is first element',
      ],
      commonMistakes: [
        'Using nums[mid] <= nums[mid+1] (instead of <) — may loop infinitely on flat regions',
        'Using left <= right (instead of <) — goes out of bounds checking mid+1',
        'Returning right instead of left (they are equal at end anyway)',
      ],
      interviewerTips: [
        'The key insight: slope direction at mid tells you which side MUST have a peak',
        'Boundaries are treated as -∞, guaranteeing a peak exists',
        'Problem says "neighbors not equal" — simplifies the no-duplicate assumption',
      ],
    },
    codeChallenge: {
      functionName: 'findPeakElement',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3,1]], expected: 2, description: 'Peak at index 2' },
        { input: [[1,2,1,3,5,6,4]], expected: 5, description: 'Peak at index 5 (also valid: index 1)' },
        { input: [[1]], expected: 0, description: 'Single element' },
        { input: [[1,2]], expected: 1, description: 'Two elements, peak at end' },
        { input: [[3,2,1]], expected: 0, description: 'Descending — peak at start' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 50, coding: 120 },
    prerequisites: ['binary-search', 'find-minimum-rotated-sorted-array'],
    relatedPatterns: ['Binary Search on Property', 'Gradient Direction Search'],
    intuitionSummary: 'Binary search on the slope: moving toward the ascending side guarantees reaching a peak.',
    patternName: 'Slope-Direction Binary Search',
  },

  // ─── 14. Find First and Last Position ─────────────────────────────────────
  {
    id: 'find-first-last-position',
    slug: 'find-first-last-position',
    leetcodeNumber: 34,
    title: 'Find First and Last Position of Element in Sorted Array',
    category: 'binary-search',
    difficulty: 'medium',
    engineType: 'search',
    tags: ['binary-search', 'array'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'LinkedIn'],
    descriptions: {
      explorer: 'Find the first and last index of a target value in a sorted array. If it appears multiple times, find the full range!',
      engineer: 'Two binary searches: leftmost (bias left when nums[mid]==target) and rightmost (bias right). Each is O(log n).',
      interview: 'Two binary searches. For leftmost: when nums[mid]==target set right=mid. For rightmost: set left=mid. Return [first, last] or [-1,-1]. O(log n).',
    },
    puzzleConfig: {
      array: [5, 7, 7, 8, 8, 10],
      target: 8,
      instruction: 'nums=[5,7,7,8,8,10], target=8. Binary search finds target. The target appears at indices 3 and 4.',
      mode: 'binary',
    },
    hints: [
      { id: 1, text: 'A single binary search finds ONE occurrence. Run it twice — once biased left (to find first) and once biased right (to find last).', xpCost: 0 },
      { id: 2, text: 'Leftmost: when nums[mid]==target, do NOT return — instead set right=mid-1 to keep searching left. Store the found index.', xpCost: 0 },
      { id: 3, text: 'Rightmost: when nums[mid]==target, do NOT return — set left=mid+1 to keep searching right. Store found index. After both searches, return [first, last].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[5,7,7,8,8,10], target=8. Run leftmost binary search.',
        state: { nums: [5,7,7,8,8,10], target: 8, searchType: 'leftmost', left: 0, right: 5 },
        annotation: 'Find first occurrence',
      },
      {
        id: 2,
        description: 'mid=2, nums[2]=7<8 → left=3. mid=4, nums[4]=8==target → right=3, first=4. mid=3, nums[3]=8==target → right=2, first=3. left>right. first=3.',
        state: { first: 3, left: 3, right: 2, done: true },
        highlight: [3],
        annotation: 'First = 3',
      },
      {
        id: 3,
        description: 'Run rightmost binary search: left=0, right=5.',
        state: { searchType: 'rightmost', left: 0, right: 5 },
        annotation: 'Find last occurrence',
      },
      {
        id: 4,
        description: 'mid=2, nums[2]=7<8 → left=3. mid=4, nums[4]=8==target → left=5, last=4. mid=5, nums[5]=10>8 → right=4. left>right. last=4.',
        state: { last: 4, left: 5, right: 4, done: true },
        highlight: [4],
        annotation: 'Last = 4',
      },
      {
        id: 5,
        description: 'Return [first, last] = [3, 4].',
        state: { answer: [3, 4], done: true },
        annotation: 'Result: [3,4]',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
      timeExplanation: 'Two binary searches, each O(log n).',
      spaceExplanation: 'Pointer variables only.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function searchRange(nums, target) {
  function findFirst() {
    let left = 0, right = nums.length - 1, idx = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        idx = mid;
        right = mid - 1; // bias left
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return idx;
  }

  function findLast() {
    let left = 0, right = nums.length - 1, idx = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        idx = mid;
        left = mid + 1; // bias right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return idx;
  }

  return [findFirst(), findLast()];
}`,
      },
      {
        language: 'python',
        code: `def searchRange(nums, target):
    def find_first():
        left, right, idx = 0, len(nums)-1, -1
        while left <= right:
            mid = (left+right)//2
            if nums[mid] == target:
                idx = mid; right = mid-1
            elif nums[mid] < target:
                left = mid+1
            else:
                right = mid-1
        return idx

    def find_last():
        left, right, idx = 0, len(nums)-1, -1
        while left <= right:
            mid = (left+right)//2
            if nums[mid] == target:
                idx = mid; left = mid+1
            elif nums[mid] < target:
                left = mid+1
            else:
                right = mid-1
        return idx

    return [find_first(), find_last()]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Linear scan: find first occurrence from left, last from right.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Two linear passes', spaceExplanation: 'No extra space', visualization: 'linear' },
      },
      optimized: {
        description: 'Two binary searches with bias: leftmost and rightmost occurrence.',
        complexity: { time: 'O(log n)', space: 'O(1)', timeExplanation: '2 * O(log n) = O(log n)', spaceExplanation: 'Pointer variables', visualization: 'logarithmic' },
      },
      followUps: [
        'Search Insert Position (LC 35) — simpler variant, single binary search',
        'Count occurrences of target: last - first + 1',
        'Implement lower_bound and upper_bound generically',
      ],
      edgeCases: [
        'Target not in array → [-1, -1]',
        'All elements equal target',
        'Single occurrence',
        'Empty array',
      ],
      commonMistakes: [
        'Returning immediately when nums[mid]==target — finds one occurrence but not first/last',
        'Setting right=mid instead of right=mid-1 in leftmost search — may loop infinitely',
        'Forgetting to initialize idx=-1 (wrong answer when target absent)',
      ],
      interviewerTips: [
        'The "don\'t return, keep searching" trick is the key — clearly explain the bias direction',
        'Can merge into one helper with a flag parameter for direction',
        'Counting occurrences is a direct follow-up: last-first+1',
      ],
    },
    codeChallenge: {
      functionName: 'searchRange',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[5,7,7,8,8,10], 8], expected: [3,4], description: 'Target appears twice' },
        { input: [[5,7,7,8,8,10], 6], expected: [-1,-1], description: 'Target not in array' },
        { input: [[], 0], expected: [-1,-1], description: 'Empty array' },
        { input: [[1,1,1,1,1], 1], expected: [0,4], description: 'All elements match target' },
        { input: [[2,4,5,5,5,5,7], 5], expected: [2,5], description: 'Four consecutive occurrences' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 130 },
    prerequisites: ['search-insert-position'],
    relatedPatterns: ['Binary Search with Bias', 'Lower Bound / Upper Bound'],
    intuitionSummary: 'Run binary search twice with different biases: bias left to find the first occurrence, bias right to find the last.',
    patternName: 'Biased Binary Search',
  },

  // ─── 15. Top K Frequent Elements ──────────────────────────────────────────
  {
    id: 'top-k-frequent-elements',
    slug: 'top-k-frequent-elements',
    leetcodeNumber: 347,
    title: 'Top K Frequent Elements',
    category: 'heap',
    difficulty: 'medium',
    engineType: 'heap',
    tags: ['heap', 'hashmap', 'bucket-sort', 'frequency'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Find the k most frequently occurring numbers in an array. If 1 appears 3 times and 2 appears 2 times and k=1, the answer is [1]!',
      engineer: 'Count frequencies with a hashmap. Use a min-heap of size k: if heap.size > k, pop the minimum. What remains are the top k elements.',
      interview: 'Two approaches: min-heap of size k (O(n log k)), or bucket sort by frequency (O(n)). Bucket sort uses array indexed by count — optimal.',
    },
    puzzleConfig: {
      elements: [3, 2, 1],
      k: 2,
      instruction: 'nums=[1,1,1,2,2,3], k=2: frequencies are {1:3, 2:2, 3:1}. Find the 2nd largest frequency using a min-heap of size 2.',
      mode: 'kth-largest',
      correctAnswer: 2,
    },
    hints: [
      { id: 1, text: 'First count each element\'s frequency with a hashmap. Then you need the k elements with the highest counts.', xpCost: 0 },
      { id: 2, text: 'Min-heap approach: maintain a heap of size k. For each (element, freq) pair, push to heap; if size > k, pop the minimum. Remaining k elements are the answer.', xpCost: 0 },
      { id: 3, text: 'Bucket sort: create an array of n+1 buckets where buckets[freq] holds elements with that frequency. Scan from the end to collect top k elements. O(n) time!', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[1,1,1,2,2,3], k=2. Count frequencies: {1:3, 2:2, 3:1}.',
        state: { nums: [1,1,1,2,2,3], k: 2, freqMap: { 1: 3, 2: 2, 3: 1 } },
        annotation: 'Build frequency map',
      },
      {
        id: 2,
        description: 'Bucket sort: buckets[1]=[3], buckets[2]=[2], buckets[3]=[1]. Array indexed by frequency.',
        state: { buckets: { 1: [3], 2: [2], 3: [1] } },
        annotation: 'Index = frequency',
      },
      {
        id: 3,
        description: 'Scan from high frequency down. buckets[3]=[1]. result=[1]. k remaining=1.',
        state: { result: [1], remaining: 1, bucket: 3 },
        annotation: 'Pick from freq=3',
      },
      {
        id: 4,
        description: 'buckets[2]=[2]. result=[1,2]. remaining=0. Done.',
        state: { result: [1,2], remaining: 0, done: true },
        annotation: 'Pick from freq=2',
      },
      {
        id: 5,
        description: 'Return [1,2]. These are the 2 most frequent elements.',
        state: { answer: [1,2] },
        annotation: 'Top K = [1,2]',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Hashmap O(n), bucket array O(n), single pass scan O(n). No sort or heap needed.',
      spaceExplanation: 'Frequency map and bucket array both O(n).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function topKFrequent(nums, k) {
  // Count frequencies
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }

  // Bucket sort: index = frequency
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  // Collect top k from highest frequency buckets
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}`,
      },
      {
        language: 'python',
        code: `def topKFrequent(nums, k):
    freq = {}
    for n in nums:
        freq[n] = freq.get(n, 0) + 1

    buckets = [[] for _ in range(len(nums) + 1)]
    for num, count in freq.items():
        buckets[count].append(num)

    result = []
    for i in range(len(buckets)-1, -1, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Sort by frequency descending, take first k.',
        complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Sort all unique elements by frequency', spaceExplanation: 'Freq map + sorted array', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Bucket sort by frequency. O(n) time and space.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Counting + bucket indexing — no comparison sort', spaceExplanation: 'Map + bucket array', visualization: 'linear' },
      },
      followUps: [
        'Top K Frequent Words (LC 692) — sort by frequency then alphabetically',
        'Sort Characters By Frequency (LC 451)',
        'K Closest Points to Origin (LC 973) — heap-based K selection',
      ],
      edgeCases: [
        'k === unique element count → return all',
        'All elements same frequency → any k elements valid',
        'k = 1 → single most frequent',
      ],
      commonMistakes: [
        'Using sort-based solution and claiming O(n) — sort is O(n log n)',
        'Off-by-one in bucket array size (needs length n+1 to index by count up to n)',
        'Min-heap: forgetting to pop when size > k',
      ],
      interviewerTips: [
        'Start with the heap solution, then offer bucket sort as O(n) improvement',
        'The bucket sort insight is the "wow" moment — index by frequency, not value',
        'Mention that QuickSelect also achieves O(n) average but is more complex',
      ],
    },
    codeChallenge: {
      functionName: 'topKFrequent',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,1,1,2,2,3], 2], expected: [1,2], description: 'k=2 most frequent' },
        { input: [[1], 1], expected: [1], description: 'Single element' },
        { input: [[1,2,3,4,4,4,5,5], 2], expected: [4,5], description: 'k=2 with tie at freq 1' },
        { input: [[4,1,-1,2,-1,2,3], 2], expected: [-1,2], description: 'Negative numbers' },
        { input: [[1,1,1,2,2,3,3,3,3], 1], expected: [3], description: 'k=1 most frequent' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['two-sum'],
    relatedPatterns: ['Heap / Priority Queue', 'Bucket Sort', 'Frequency Count'],
    intuitionSummary: 'Frequency bucketing: create an array indexed by frequency, then collect from the high end. Avoids any sorting.',
    patternName: 'Frequency Bucket Sort',
  },

  // ─── 16. Find Median from Data Stream ─────────────────────────────────────
  {
    id: 'find-median-data-stream',
    slug: 'find-median-data-stream',
    leetcodeNumber: 295,
    title: 'Find Median from Data Stream',
    category: 'heap',
    difficulty: 'hard',
    engineType: 'pattern',
    tags: ['heap', 'two-heaps', 'design', 'data-stream'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple'],
    descriptions: {
      explorer: 'Numbers arrive one by one. At any point, you need to instantly find the median of all numbers seen so far. Design a data structure for this!',
      engineer: 'Maintain a max-heap (lower half) and min-heap (upper half). Always balance so sizes differ by at most 1. Median is the top of the larger heap or average of both tops.',
      interview: 'Two-heap approach: maxHeap for lower half, minHeap for upper half. Rebalance after each add. Median is O(1). Add is O(log n).',
    },
    puzzleConfig: {
      problemStatement: 'Design a data structure that supports: addNum(num) — adds a number from a data stream; findMedian() — returns the median of all numbers added so far. The median should be computed in O(1) time.',
      correctPattern: 'two-heaps',
      options: [
        { id: 'two-heaps', label: 'Two Heaps', icon: '⛰️', description: 'Max-heap (lower half) + min-heap (upper half)' },
        { id: 'binary-search', label: 'Binary Search', icon: '🔍', description: 'Re-sort and bisect on every query' },
        { id: 'sliding-window', label: 'Sliding Window', icon: '🪟', description: 'Maintain a fixed-size window' },
        { id: 'hash-map', label: 'Hash Map', icon: '🗂️', description: 'Count frequencies of each number' },
        { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧮', description: 'Build optimal answers bottom-up' },
        { id: 'stack', label: 'Stack / Monotonic', icon: '📚', description: 'Track elements in insertion order' },
      ],
      explanation: 'Split numbers into a lower half (max-heap) and upper half (min-heap), kept balanced so sizes differ by at most 1. The median is the top of the larger heap, or the average of both tops if equal. Each insert is O(log n); findMedian is O(1) — no sorting needed.',
      followUp: 'Balancing rule: always push to maxHeap first, then pop its top to minHeap. If minHeap grows larger, pop from minHeap back to maxHeap. This keeps the boundary between halves correct.',
    },
    hints: [
      { id: 1, text: 'If the data were sorted, the median is the middle element. Keep two halves: a max-heap for the lower half and a min-heap for the upper half.', xpCost: 0 },
      { id: 2, text: 'After inserting: push to maxHeap, then pop from maxHeap and push to minHeap. If minHeap is larger, pop from minHeap back to maxHeap. This keeps heaps balanced.', xpCost: 0 },
      { id: 3, text: 'If sizes are equal, median = (maxHeap.top + minHeap.top) / 2. If maxHeap has one more element, median = maxHeap.top. Always maintain maxHeap.size >= minHeap.size.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'addNum(1): push 1 to maxHeap=[1]. Push maxHeap.top=1 to minHeap=[1]. minHeap.size > maxHeap.size → push minHeap.top=1 back to maxHeap=[1]. minHeap=[].',
        state: { maxHeap: [1], minHeap: [], step: 'addNum(1)' },
        annotation: 'maxHeap=[1], minHeap=[]',
      },
      {
        id: 2,
        description: 'findMedian(): maxHeap.size(1) > minHeap.size(0) → return maxHeap.top = 1.',
        state: { maxHeap: [1], minHeap: [], median: 1 },
        annotation: 'Median = 1',
      },
      {
        id: 3,
        description: 'addNum(2): push 2 to maxHeap=[2,1] (max-heap). Pop max(2) to minHeap=[2]. Equal sizes. maxHeap=[1], minHeap=[2].',
        state: { maxHeap: [1], minHeap: [2], step: 'addNum(2)' },
        annotation: 'maxHeap=[1], minHeap=[2]',
      },
      {
        id: 4,
        description: 'findMedian(): equal sizes → return (maxHeap.top + minHeap.top)/2 = (1+2)/2 = 1.5.',
        state: { maxHeap: [1], minHeap: [2], median: 1.5 },
        annotation: 'Median = 1.5',
      },
      {
        id: 5,
        description: 'addNum(3): push 3 to maxHeap → pop max=3 to minHeap=[2,3]. minHeap larger → pop min=2 to maxHeap=[2,1]. maxHeap=[2,1], minHeap=[3].',
        state: { maxHeap: [2,1], minHeap: [3], step: 'addNum(3)' },
        annotation: 'maxHeap=[2,1], minHeap=[3]',
      },
      {
        id: 6,
        description: 'findMedian(): maxHeap.size(2) > minHeap.size(1) → return maxHeap.top = 2.',
        state: { median: 2, done: true },
        annotation: 'Median = 2',
      },
    ],
    complexity: {
      time: 'O(log n) addNum, O(1) findMedian',
      space: 'O(n)',
      timeExplanation: 'Each addNum does at most 3 heap operations (push/pop) each O(log n). findMedian just reads tops.',
      spaceExplanation: 'Two heaps storing all n elements.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `// JavaScript doesn't have a built-in heap, so we implement a simple one.
class MinHeap {
  constructor() { this.h = []; }
  push(v) {
    this.h.push(v);
    this._bubbleUp(this.h.length - 1);
  }
  pop() {
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length > 0) { this.h[0] = last; this._siftDown(0); }
    return top;
  }
  top() { return this.h[0]; }
  size() { return this.h.length; }
  _bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] > this.h[i]) { [this.h[p], this.h[i]] = [this.h[i], this.h[p]]; i = p; } else break;
    }
  }
  _siftDown(i) {
    const n = this.h.length;
    while (true) {
      let s = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.h[l] < this.h[s]) s = l;
      if (r < n && this.h[r] < this.h[s]) s = r;
      if (s === i) break;
      [this.h[s], this.h[i]] = [this.h[i], this.h[s]]; i = s;
    }
  }
}

class MaxHeap extends MinHeap {
  push(v) { super.push(-v); }
  pop() { return -super.pop(); }
  top() { return -super.top(); }
}

class MedianFinder {
  constructor() {
    this.lo = new MaxHeap(); // lower half
    this.hi = new MinHeap(); // upper half
  }

  addNum(num) {
    this.lo.push(num);
    this.hi.push(this.lo.pop()); // ensure lo.top <= hi.top
    if (this.hi.size() > this.lo.size()) {
      this.lo.push(this.hi.pop()); // rebalance
    }
  }

  findMedian() {
    if (this.lo.size() > this.hi.size()) return this.lo.top();
    return (this.lo.top() + this.hi.top()) / 2;
  }
}`,
      },
      {
        language: 'python',
        code: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (store negated)
        self.hi = []  # min-heap

    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Keep a sorted list. Insert in O(n). findMedian in O(1).',
        complexity: { time: 'O(n) add, O(1) find', space: 'O(n)', timeExplanation: 'Insertion into sorted array is O(n)', spaceExplanation: 'Store all elements', visualization: 'linear' },
      },
      optimized: {
        description: 'Two heaps: maxHeap for lower half, minHeap for upper half. Balance after each insert.',
        complexity: { time: 'O(log n) add, O(1) find', space: 'O(n)', timeExplanation: 'Heap operations O(log n)', spaceExplanation: 'All elements in two heaps', visualization: 'logarithmic' },
      },
      followUps: [
        'What if 99% of numbers are in [0,100]? (Bucket the common range, heap for outliers)',
        'Sliding window median (LC 480) — remove from heap, more complex rebalancing',
        'Can you do O(1) insert? (No, you need O(log n) to maintain order)',
      ],
      edgeCases: [
        'Single number → return that number',
        'Two numbers → average',
        'All same numbers',
        'Large stream of numbers',
      ],
      commonMistakes: [
        'Not rebalancing — heaps become wildly unequal and median is wrong',
        'Comparing sizes in wrong order (maintaining hi.size >= lo.size instead of lo >= hi)',
        'JavaScript lacks native heap — must implement or use a library',
      ],
      interviewerTips: [
        'Invariant: lo.size == hi.size OR lo.size == hi.size + 1. Median is always computable in O(1).',
        'The "push to lo, pop to hi, rebalance" pattern ensures lo.top <= hi.top always',
        'Mention the follow-up: what if you also need to remove numbers? (Lazy deletion with a hash set)',
      ],
    },
    codeChallenge: {
      functionName: 'MedianFinder',
      starterCode: {
        javascript: `/**
 * MedianFinder class: addNum(num) and findMedian()
 */
class MedianFinder {
  constructor() {
    // Your initialization here
  }

  /** @param {number} num */
  addNum(num) {
    // Your solution here
  }

  /** @return {number} */
  findMedian() {
    // Your solution here
  }
}`,
      },
      testCases: [
        { input: [['addNum', 'findMedian'], [[1], []]], expected: [null, 1], description: 'Single element median' },
        { input: [['addNum', 'addNum', 'findMedian'], [[1], [2], []]], expected: [null, null, 1.5], description: 'Two element average' },
        { input: [['addNum', 'addNum', 'addNum', 'findMedian'], [[1], [2], [3], []]], expected: [null, null, null, 2], description: 'Three elements, middle is median' },
        { input: [['addNum', 'addNum', 'addNum', 'addNum', 'findMedian'], [[5], [3], [8], [1], []]], expected: [null, null, null, null, 4], description: 'Four elements: median is avg of two middles' },
        { input: [['addNum', 'findMedian', 'addNum', 'findMedian'], [[6], [], [10], []]], expected: [null, 6, null, 8], description: 'Interleaved add and find' },
      ],
    },
    xpRewards: { puzzle: 160, hints: 20, dryRun: 60, code: 100, coding: 200 },
    prerequisites: ['top-k-frequent-elements'],
    relatedPatterns: ['Two Heaps', 'Data Stream', 'Sliding Window Median'],
    intuitionSummary: 'Partition the stream into lower and upper halves using a max-heap and min-heap. Keep them balanced so the median is always accessible in O(1).',
    patternName: 'Two-Heap Partition',
  },

  // ─── 17. IPO ──────────────────────────────────────────────────────────────
  {
    id: 'ipo',
    slug: 'ipo',
    leetcodeNumber: 502,
    title: 'IPO',
    category: 'heap',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['heap', 'greedy', 'sorting'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'Apple'],
    descriptions: {
      explorer: 'You can complete at most k projects. Each project requires a minimum capital. After completing a project you earn its profit. Start with w capital. Maximize final capital!',
      engineer: 'Greedy + two heaps. Min-heap by capital to unlock projects; max-heap by profit to pick the best available. Repeat k times.',
      interview: 'Sort by capital, use pointer to push affordable projects to a max-heap. Each of k rounds: push all newly affordable projects, then pop the highest-profit one. O(n log n).',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: '1st project: profit=1, capital=0' },
        { id: 'b', value: 3, label: '2nd project: profit=3, capital=1' },
        { id: 'c', value: 2, label: 'alternative 2nd: profit=2, capital=1' },
        { id: 'd', value: 4, label: 'final wealth: 4' },
      ],
      target: 4,
      instruction: 'IPO: k=2, w=0. Select the TWO projects to maximize wealth (profits=[1,2,3], capital=[0,1,1]).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Greedy key: always pick the highest-profit project you can currently afford. This never causes you to miss a better future pick.', xpCost: 0 },
      { id: 2, text: 'Sort projects by capital. Maintain a "available" max-heap (by profit). Each round: unlock all projects with capital <= w, then pick the max-profit one.', xpCost: 0 },
      { id: 3, text: 'Use a min-heap sorted by capital for the pending projects. Each round: pop from it while capital[top] <= w and push profit to a max-heap. Then pop max-heap and add to w.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'k=2, w=0. Projects: [(capital=0,profit=1),(capital=1,profit=2),(capital=1,profit=3)]. Sort by capital: [(0,1),(1,2),(1,3)].',
        state: { k: 2, w: 0, projects: [[0,1],[1,2],[1,3]], round: 0 },
        annotation: 'Sorted by capital',
      },
      {
        id: 2,
        description: 'Round 1: Push projects with capital<=0 to max-heap. Only (0,1) qualifies. maxHeap=[1]. Pop max=1. w=0+1=1.',
        state: { w: 1, maxHeap: [], round: 1 },
        annotation: 'w = 1 after round 1',
      },
      {
        id: 3,
        description: 'Round 2: Push projects with capital<=1 to max-heap. Both (1,2) and (1,3) qualify. maxHeap=[3,2]. Pop max=3. w=1+3=4.',
        state: { w: 4, maxHeap: [2], round: 2 },
        annotation: 'w = 4 after round 2',
      },
      {
        id: 4,
        description: 'k=2 rounds completed. Final capital = 4.',
        state: { finalCapital: 4, done: true },
        annotation: 'Result: 4',
      },
    ],
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)',
      timeExplanation: 'Sorting O(n log n). Each project pushed/popped from heap once — O(n log n) total heap ops.',
      spaceExplanation: 'Two heaps store at most n projects.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;

  // Min-heap by capital (sorted projects not yet unlocked)
  const pending = profits
    .map((p, i) => [capital[i], p])
    .sort((a, b) => a[0] - b[0]);

  // Max-heap by profit (available projects)
  // Using a simple array sorted in descending order for illustration
  // In production use a proper max-heap
  class MaxHeap {
    constructor() { this.h = []; }
    push(v) {
      this.h.push(v);
      let i = this.h.length - 1;
      while (i > 0) {
        const p = (i-1)>>1;
        if (this.h[p] < this.h[i]) { [this.h[p],this.h[i]]=[this.h[i],this.h[p]]; i=p; } else break;
      }
    }
    pop() {
      const top = this.h[0], last = this.h.pop();
      if (this.h.length) {
        this.h[0] = last;
        let i = 0, n = this.h.length;
        while (true) {
          let s=i,l=2*i+1,r=2*i+2;
          if(l<n&&this.h[l]>this.h[s]) s=l;
          if(r<n&&this.h[r]>this.h[s]) s=r;
          if(s===i) break;
          [this.h[s],this.h[i]]=[this.h[i],this.h[s]]; i=s;
        }
      }
      return top;
    }
    size() { return this.h.length; }
  }

  const maxHeap = new MaxHeap();
  let idx = 0;

  for (let round = 0; round < k; round++) {
    // Unlock all affordable projects
    while (idx < n && pending[idx][0] <= w) {
      maxHeap.push(pending[idx][1]);
      idx++;
    }
    if (maxHeap.size() === 0) break; // can't do more projects
    w += maxHeap.pop();
  }

  return w;
}`,
      },
      {
        language: 'python',
        code: `import heapq

def findMaximizedCapital(k, w, profits, capital):
    pending = sorted(zip(capital, profits))  # min by capital
    available = []  # max-heap (negate profits)
    idx = 0

    for _ in range(k):
        while idx < len(pending) and pending[idx][0] <= w:
            heapq.heappush(available, -pending[idx][1])
            idx += 1
        if not available:
            break
        w += -heapq.heappop(available)

    return w`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Each round scan all projects, pick highest-profit affordable one.',
        complexity: { time: 'O(k * n)', space: 'O(1)', timeExplanation: 'k rounds, each O(n) scan', spaceExplanation: 'No extra data structure', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sort by capital + two-heap greedy. Unlock projects incrementally, always pick max profit.',
        complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Sort + n heap push/pops', spaceExplanation: 'Heaps store all projects', visualization: 'nlogn' },
      },
      followUps: [
        'What if k is very large (> n)? (At most n projects can be done)',
        'What if completing a project changes other projects\' capital requirements?',
        'Task Scheduler (LC 621) — another greedy scheduling problem',
      ],
      edgeCases: [
        'w already enough for all projects — do the k most profitable',
        'k > n — can only do n projects',
        'No affordable project at start — return w unchanged',
      ],
      commonMistakes: [
        'Not sorting by capital before scanning — may push unaffordable projects',
        'Using min-heap for available projects (should be max-heap for profit)',
        'Not handling the case where maxHeap is empty (no affordable projects)',
      ],
      interviewerTips: [
        'Key insight: always taking the highest available profit is greedy-optimal (matroid property)',
        'The two-heap structure elegantly separates "can I afford it?" from "which is best?"',
        'Mention that this is the "scheduling to maximize reward" greedy pattern',
      ],
    },
    codeChallenge: {
      functionName: 'findMaximizedCapital',
      starterCode: {
        javascript: `/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
function findMaximizedCapital(k, w, profits, capital) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [2, 0, [1,2,3], [0,1,1]], expected: 4, description: 'k=2, w=0 → 0+1+3=4' },
        { input: [3, 0, [1,2,3], [0,1,2]], expected: 6, description: 'k=3, do all projects' },
        { input: [1, 0, [1,2,3], [1,1,2]], expected: 0, description: 'k=1 but no affordable project' },
        { input: [2, 1, [1,2,3], [1,1,2]], expected: 6, description: 'Start w=1, unlock two' },
        { input: [3, 0, [1,2,3], [0,0,0]], expected: 6, description: 'All projects affordable, do top 3' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 50, code: 80, coding: 200 },
    prerequisites: ['top-k-frequent-elements'],
    relatedPatterns: ['Greedy + Heap', 'Two-Heap Scheduling', 'Project Selection'],
    intuitionSummary: 'Unlock projects greedily (as capital grows) and always pick the highest-profit available project — two heaps make this efficient.',
    patternName: 'Unlock-and-Pick Greedy',
  },

  // ─── 18. Find K Pairs with Smallest Sums ──────────────────────────────────
  {
    id: 'find-k-pairs-smallest-sums',
    slug: 'find-k-pairs-smallest-sums',
    leetcodeNumber: 373,
    title: 'Find K Pairs with Smallest Sums',
    category: 'heap',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['heap', 'two-pointers', 'array'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Uber'],
    descriptions: {
      explorer: 'Given two sorted arrays, find the k pairs (one from each array) with the smallest sums. A pair is (u, v) where u is from nums1 and v is from nums2.',
      engineer: 'Initialize min-heap with (nums1[i], nums2[0]) for all i in nums1. Each pop gives the next smallest pair; push (nums1[i], nums2[j+1]) as next candidate.',
      interview: 'Heap of initial candidates. When you pop (i, j), push (i, j+1). Avoids processing all O(m*n) pairs. O(k log k) time.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'nums1[0]=1 (all k pairs use this)' },
        { id: 'b', value: 2, label: 'nums2[0]=2 (smallest, in 1st pair)' },
        { id: 'c', value: 7, label: 'nums1[1]=7 (in 4th pair [7,2])' },
        { id: 'd', value: 3, label: 'k=3 pairs' },
      ],
      target: 3,
      instruction: 'nums1=[1,7,11], nums2=[2,4,6], k=3. The k=3 smallest sum pairs all use nums1[0]=1. Select nums1[0] and nums2[0] forming the SMALLEST pair.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The smallest sum must use nums1[0] and nums2[0]. After that, the next candidates come from advancing either index.', xpCost: 0 },
      { id: 2, text: 'Initialize the heap with pairs (nums1[i], nums2[0]) for every i. This covers all possible "best first" starts. When you pop (i,j), push (i, j+1).', xpCost: 0 },
      { id: 3, text: 'Use the heap to always extract the globally smallest available sum. After popping pair at (i,j), the next best from that i-row is (i, j+1). Push it if j+1 is valid.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums1=[1,7,11], nums2=[2,4,6], k=3. Initialize heap with (1+2,[0,0]), (7+2,[1,0]), (11+2,[2,0]) = sums 3,9,13.',
        state: { heap: [[3,0,0],[9,1,0],[13,2,0]], k: 3, results: [] },
        annotation: 'Heap: 3 initial pairs',
      },
      {
        id: 2,
        description: 'Pop minimum sum=3 → pair [1,2] (indices [0,0]). Push next from row 0: (1+4,[0,1]) = sum 5. Results=[[1,2]].',
        state: { heap: [[5,0,1],[9,1,0],[13,2,0]], results: [[1,2]] },
        annotation: 'Pop [1,2], push sum=5',
      },
      {
        id: 3,
        description: 'Pop minimum sum=5 → pair [1,4] (indices [0,1]). Push (1+6,[0,2]) = sum 7. Results=[[1,2],[1,4]].',
        state: { heap: [[7,0,2],[9,1,0],[13,2,0]], results: [[1,2],[1,4]] },
        annotation: 'Pop [1,4], push sum=7',
      },
      {
        id: 4,
        description: 'Pop minimum sum=7 → pair [1,6] (indices [0,2]). No more nums2 for row 0. Results=[[1,2],[1,4],[1,6]]. k=3 reached.',
        state: { results: [[1,2],[1,4],[1,6]], done: true },
        annotation: 'Pop [1,6]. k reached.',
      },
    ],
    complexity: {
      time: 'O(k log k)',
      space: 'O(min(m,k))',
      timeExplanation: 'Initial heap has min(m,k) elements. Each of k pops/pushes is O(log k). Total O(k log k).',
      spaceExplanation: 'Heap holds at most min(m,k) entries at any time.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function kSmallestPairs(nums1, nums2, k) {
  if (!nums1.length || !nums2.length) return [];

  // Min-heap: [sum, i, j]
  class MinHeap {
    constructor() { this.h = []; }
    push(v) {
      this.h.push(v);
      let i = this.h.length - 1;
      while (i > 0) {
        const p = (i-1)>>1;
        if (this.h[p][0] > this.h[i][0]) { [this.h[p],this.h[i]]=[this.h[i],this.h[p]]; i=p; } else break;
      }
    }
    pop() {
      const top = this.h[0], last = this.h.pop();
      if (this.h.length) {
        this.h[0] = last;
        let i = 0;
        while (true) {
          let s=i,l=2*i+1,r=2*i+2,n=this.h.length;
          if(l<n&&this.h[l][0]<this.h[s][0]) s=l;
          if(r<n&&this.h[r][0]<this.h[s][0]) s=r;
          if(s===i) break;
          [this.h[s],this.h[i]]=[this.h[i],this.h[s]]; i=s;
        }
      }
      return top;
    }
    size() { return this.h.length; }
  }

  const heap = new MinHeap();
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  const results = [];
  while (results.length < k && heap.size() > 0) {
    const [, i, j] = heap.pop();
    results.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }

  return results;
}`,
      },
      {
        language: 'python',
        code: `import heapq

def kSmallestPairs(nums1, nums2, k):
    if not nums1 or not nums2: return []
    heap = [(nums1[i]+nums2[0], i, 0) for i in range(min(len(nums1), k))]
    heapq.heapify(heap)
    result = []
    while result and len(result) == k or not result and heap:
        if len(result) == k: break
        s, i, j = heapq.heappop(heap)
        result.append([nums1[i], nums2[j]])
        if j + 1 < len(nums2):
            heapq.heappush(heap, (nums1[i]+nums2[j+1], i, j+1))
    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Generate all m*n pairs, sort by sum, take first k.',
        complexity: { time: 'O(m*n log(m*n))', space: 'O(m*n)', timeExplanation: 'Generate and sort all pairs', spaceExplanation: 'Store all pairs', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Min-heap with lazy candidate expansion. O(k log k) — only materializes k pairs.',
        complexity: { time: 'O(k log k)', space: 'O(min(m,k))', timeExplanation: 'k heap pops, heap size bounded by min(m,k)', spaceExplanation: 'Heap stores one candidate per nums1 row', visualization: 'nlogn' },
      },
      followUps: [
        'Kth Smallest Element in a Sorted Matrix (LC 378) — similar heap pattern',
        'Merge k Sorted Lists (LC 23) — heap to merge',
        'What if k > m*n? (Return all pairs)',
      ],
      edgeCases: [
        'k larger than m*n total pairs — return all pairs',
        'Either array empty → return []',
        'k=1 → just the pair with minimum sum',
      ],
      commonMistakes: [
        'Initializing heap with all m*n pairs — defeats the purpose, O(m*n) space',
        'Pushing (i+1, j) and (i, j+1) on pop — causes duplicates',
        'Only pushing nums1[0] with all nums2 indices — misses pairs from other rows',
      ],
      interviewerTips: [
        'The "push (i, j+1) on pop of (i,j)" invariant is the core insight — explain it clearly',
        'Only initialize with nums1 rows (fixed i, j=0). Never mix i and j advancement.',
        'Connect to "merge k sorted lists": each row of (nums1[i], nums2[j]) is a sorted list',
      ],
    },
    codeChallenge: {
      functionName: 'kSmallestPairs',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
function kSmallestPairs(nums1, nums2, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,7,11], [2,4,6], 3], expected: [[1,2],[1,4],[1,6]], description: 'First 3 pairs all from nums1[0]' },
        { input: [[1,1,2], [1,2,3], 2], expected: [[1,1],[1,1]], description: 'Duplicate values' },
        { input: [[1,2], [3], 3], expected: [[1,3],[2,3]], description: 'k larger than total pairs' },
        { input: [[1,7,11], [2,4,6], 9], expected: [[1,2],[1,4],[1,6],[7,2],[7,4],[7,6],[11,2],[11,4],[11,6]], description: 'All 9 pairs' },
        { input: [[1,2,3], [1,2,3], 4], expected: [[1,1],[1,2],[2,1],[1,3]], description: 'Four smallest pairs' },
      ],
    },
    xpRewards: { puzzle: 130, hints: 20, dryRun: 50, code: 70, coding: 170 },
    prerequisites: ['top-k-frequent-elements'],
    relatedPatterns: ['Min-Heap Candidate Expansion', 'Merge K Sorted Lists', 'Kth Smallest in Matrix'],
    intuitionSummary: 'Seed the heap with the best candidate from each nums1 row (j=0). On each pop, push the next best candidate from the same row.',
    patternName: 'Heap Candidate Expansion',
  },

  // ─── 19. Valid Sudoku ─────────────────────────────────────────────────────
  {
    id: 'valid-sudoku',
    slug: 'valid-sudoku',
    leetcodeNumber: 36,
    title: 'Valid Sudoku',
    category: 'matrix',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['hashmap', 'matrix', 'array', 'set'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Apple', 'Microsoft', 'Facebook', 'Google'],
    descriptions: {
      explorer: 'Check if a partially-filled 9×9 Sudoku board is valid. Each row, column, and 3×3 box must contain digits 1-9 without repetition.',
      engineer: 'Three arrays of sets: rows[9], cols[9], boxes[9]. For each cell with a digit, check all three. Box index = floor(r/3)*3 + floor(c/3).',
      interview: 'Single pass O(81) = O(1). Box index formula is the key trick. Check rows, cols, and boxes simultaneously.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 5, label: 'row 1 middle digit: 5' },
        { id: 'b', value: 3, label: 'row 1 first digit: 3' },
        { id: 'c', value: 45, label: 'expected row sum: 45' },
        { id: 'd', value: 8, label: '5+3=8' },
      ],
      target: 8,
      instruction: 'Valid Sudoku: a valid row contains digits 1-9 with no repeats. Select any two valid digits from the top-left box.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'For each filled cell, check three things: is the digit already in this row? In this column? In this 3×3 box?', xpCost: 0 },
      { id: 2, text: 'Use 9 sets for rows, 9 for cols, and 9 for boxes. Box index = Math.floor(r/3)*3 + Math.floor(c/3). This maps each cell to its 3×3 box (0-8).', xpCost: 0 },
      { id: 3, text: 'Single pass: for each cell (r,c) with a digit d, if d is in rows[r] or cols[c] or boxes[boxIdx] → invalid. Otherwise add d to all three sets.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Initialize rows[9]=[], cols[9]=[], boxes[9]=[]. All empty sets.',
        state: { rows: 9, cols: 9, boxes: 9, all_empty: true },
        annotation: '27 empty sets',
      },
      {
        id: 2,
        description: 'Cell (0,0)="5". boxIdx=floor(0/3)*3+floor(0/3)=0. Check rows[0],cols[0],boxes[0]: all empty. Add 5 to each.',
        state: { r: 0, c: 0, digit: '5', boxIdx: 0, added: true },
        annotation: 'rows[0]={5}, cols[0]={5}, boxes[0]={5}',
      },
      {
        id: 3,
        description: 'Cell (0,1)="3". boxIdx=0. Check: 3 not in rows[0], not in cols[1], not in boxes[0]. Add 3 to each.',
        state: { r: 0, c: 1, digit: '3', boxIdx: 0, added: true },
        annotation: 'rows[0]={5,3}, ...',
      },
      {
        id: 4,
        description: 'If cell (0,0) had "5" and cell (0,5) also had "5": rows[0] already has 5 → return false.',
        state: { conflict: 'row duplicate', r: 0, c: 5, digit: '5', result: false },
        annotation: 'Duplicate in row → invalid',
      },
      {
        id: 5,
        description: 'Continue scanning all 81 cells. Skip "." cells. If any duplicate found in row, col, or box → return false.',
        state: { totalCells: 81, skipped_empty: true },
        annotation: 'O(81) = O(1)',
      },
      {
        id: 6,
        description: 'No violations found → return true.',
        state: { result: true, done: true },
        annotation: 'Board is valid',
      },
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'Always exactly 81 cells to check. Fixed size regardless of input.',
      spaceExplanation: 'Always exactly 27 sets of size at most 9.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
        return false;
      }

      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIdx].add(val);
    }
  }

  return true;
}`,
      },
      {
        language: 'python',
        code: `def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]

    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.': continue
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)

    return True`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each row/col/box separately, check for duplicates.',
        complexity: { time: 'O(1)', space: 'O(1)', timeExplanation: 'Fixed 9x9 board — always O(1)', spaceExplanation: 'Fixed sets', visualization: 'linear' },
      },
      optimized: {
        description: 'Single pass with three sets arrays. Check and update all three simultaneously.',
        complexity: { time: 'O(1)', space: 'O(1)', timeExplanation: 'Single pass over 81 cells', spaceExplanation: '27 sets fixed size', visualization: 'linear' },
      },
      followUps: [
        'Sudoku Solver (LC 37) — backtracking to fill the board',
        'How would you check validity after every new number entry? (Same approach)',
        'Encode sets as bitmasks for faster ops',
      ],
      edgeCases: [
        'Completely empty board → valid',
        'Duplicate in same 3×3 box but different rows and columns',
        'Numbers as strings ("1"–"9") vs integers',
      ],
      commonMistakes: [
        'Box index formula wrong: floor(r/3)*3 + floor(c/3) is correct — confusing r and c floors',
        'Checking rows and cols but forgetting boxes',
        'Comparing numbers as integers when board stores strings',
      ],
      interviewerTips: [
        'The box index formula floor(r/3)*3+floor(c/3) is the key — work through examples on whiteboard',
        'Point out it\'s O(1) time/space since board is always 9x9',
        'Bitmask optimization: use a 9-bit integer per row/col/box instead of sets',
      ],
    },
    codeChallenge: {
      functionName: 'isValidSudoku',
      starterCode: {
        javascript: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
  // Your solution here
}`,
      },
      testCases: [
        {
          input: [[
            ["5","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"],
          ]], expected: true, description: 'Classic valid sudoku board',
        },
        {
          input: [[
            ["8","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"],
          ]], expected: false, description: 'Column 1 has duplicate 8',
        },
        {
          input: [[
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".",".",],
          ]], expected: true, description: 'All empty is valid',
        },
        {
          input: [[
            ["1",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","1"],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".",".",],
          ]], expected: true, description: 'Same digit in different rows/cols/boxes is valid',
        },
        {
          input: [[
            ["1","2","3","4","5","6","7","8","9"],
            [".",".",".",".",".",".",".",".","1"],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".","."],
            [".",".",".",".",".",".",".",".",".",],
          ]], expected: true, description: 'Row 0 has 1-9, col 8 has 9 and 1 in different boxes — valid',
        },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 50, coding: 130 },
    prerequisites: ['two-sum'],
    relatedPatterns: ['Hashmap/Set Tracking', 'Matrix Traversal', 'Sudoku Solver'],
    intuitionSummary: 'Three parallel sets (rows, cols, boxes) let you detect any violation in a single O(81) pass. The box index formula maps each cell to its 3×3 region.',
    patternName: 'Parallel Set Constraint Check',
  },

  // ─── 20. Task Scheduler ───────────────────────────────────────────────────
  {
    id: 'task-scheduler',
    slug: 'task-scheduler',
    leetcodeNumber: 621,
    title: 'Task Scheduler',
    category: 'greedy',
    difficulty: 'medium',
    engineType: 'heap',
    tags: ['greedy', 'heap', 'array', 'frequency'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Apple'],
    descriptions: {
      explorer: 'Schedule tasks so the same task type must wait n intervals before running again. You can insert idle intervals. Find the minimum total intervals needed!',
      engineer: 'Greedy formula: (maxFreq - 1) * (n + 1) + countOfMaxFreq. Take max with tasks.length (no idle needed if tasks are dense enough).',
      interview: 'Key formula: answer = max(tasks.length, (maxFreq-1)*(n+1)+countOfMaxFreq). Derives from fitting the most frequent task into frames of size (n+1).',
    },
    puzzleConfig: {
      elements: [3, 3, 1, 1],
      k: 1,
      instruction: 'Tasks ["A","A","A","B","B","B"], n=2: most frequent task appears 3 times. Find the HIGHEST frequency using a max-heap (k=1 means find the largest).',
      mode: 'kth-largest',
      correctAnswer: 3,
    },
    hints: [
      { id: 1, text: 'The most frequent task dictates the minimum schedule length. It must be placed with at least n idle slots between repetitions.', xpCost: 0 },
      { id: 2, text: 'Think in "frames" of size (n+1). The most frequent task (freq F) needs F-1 full frames plus 1 final slot. Each full frame has (n+1) slots.', xpCost: 0 },
      { id: 3, text: 'Formula: frames = (maxFreq-1). Minimum intervals = frames*(n+1) + countOfMaxFreq. But if tasks are dense, just doing tasks back-to-back is faster: answer = max(tasks.length, formula).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'tasks=["A","A","A","B","B","B"], n=2. Count frequencies: A=3, B=3.',
        state: { tasks: ['A','A','A','B','B','B'], n: 2, freq: { A: 3, B: 3 } },
        annotation: 'maxFreq=3, countOfMax=2',
      },
      {
        id: 2,
        description: 'maxFreq=3. Frames = maxFreq-1 = 2. Frame size = n+1 = 3. Total slots = 2*3 = 6.',
        state: { frames: 2, frameSize: 3, totalSlots: 6 },
        annotation: '2 full frames of 3',
      },
      {
        id: 3,
        description: 'countOfMaxFreq=2 (both A and B have freq 3). Add 2 more slots for the final partial frame. formula = 6+2 = 8.',
        state: { formula: 8, countOfMax: 2 },
        annotation: 'formula = 8',
      },
      {
        id: 4,
        description: 'tasks.length=6. answer = max(6, 8) = 8.',
        state: { tasksLen: 6, answer: 8 },
        annotation: 'max(6,8) = 8',
      },
      {
        id: 5,
        description: 'Schedule: A B _ A B _ A B → 8 intervals. Two idles in the frames.',
        state: { schedule: ['A','B','_','A','B','_','A','B'], length: 8 },
        annotation: 'Actual schedule: 8 intervals',
      },
      {
        id: 6,
        description: 'Return 8.',
        state: { result: 8, done: true },
        annotation: 'Minimum = 8',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Count frequencies O(26) = O(1). Formula computation O(1). Total O(n) to scan tasks.',
      spaceExplanation: 'Frequency array of fixed size 26.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) {
    freq[t.charCodeAt(0) - 65]++;
  }

  const maxFreq = Math.max(...freq);
  const countOfMaxFreq = freq.filter(f => f === maxFreq).length;

  const formula = (maxFreq - 1) * (n + 1) + countOfMaxFreq;
  return Math.max(tasks.length, formula);
}`,
      },
      {
        language: 'python',
        code: `def leastInterval(tasks, n):
    from collections import Counter
    freq = Counter(tasks)
    max_freq = max(freq.values())
    count_of_max = sum(1 for f in freq.values() if f == max_freq)
    formula = (max_freq - 1) * (n + 1) + count_of_max
    return max(len(tasks), formula)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Simulate the scheduler using a max-heap and a cooldown queue.',
        complexity: { time: 'O(tasks * log 26) = O(n)', space: 'O(1)', timeExplanation: 'Simulate each interval, heap has at most 26 elements', spaceExplanation: '26-element heap', visualization: 'linear' },
      },
      optimized: {
        description: 'Mathematical formula based on frame packing. O(n) to count, O(1) formula.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One frequency pass', spaceExplanation: 'Fixed 26-char frequency array', visualization: 'linear' },
      },
      followUps: [
        'What is the actual task order? (Use the simulation approach)',
        'Rearrange String k Distance Apart (LC 358) — similar framing',
        'What if tasks have different priorities?',
      ],
      edgeCases: [
        'n=0 → just tasks.length (no cooldown)',
        'All same task → (freq-1)*(n+1)+1',
        'Many diverse tasks (no idles needed) → tasks.length',
      ],
      commonMistakes: [
        'Not taking max with tasks.length — when tasks are dense, no idle needed',
        'Using (maxFreq-1)*n instead of (maxFreq-1)*(n+1) — forgetting the task itself takes a slot',
        'Counting tasks of maximum frequency incorrectly',
      ],
      interviewerTips: [
        'Draw the "frame" picture: [A, B, _, A, B, _, A, B] — it makes the formula obvious',
        'The max(...) is subtle but crucial: if tasks fill all idle slots, answer is just tasks.length',
        'Mention the simulation approach with a heap as an alternative that gives the actual order',
      ],
    },
    codeChallenge: {
      functionName: 'leastInterval',
      starterCode: {
        javascript: `/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
function leastInterval(tasks, n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [['A','A','A','B','B','B'], 2], expected: 8, description: 'A and B both freq 3, cooldown 2' },
        { input: [['A','A','A','B','B','B'], 0], expected: 6, description: 'No cooldown → just tasks.length' },
        { input: [['A','A','A','A','A','A','B','C','D','E','F','G'], 2], expected: 16, description: 'A dominates — many idles' },
        { input: [['A','A','A','B','B','B','C','C','C'], 2], expected: 9, description: 'Three tasks freq 3 — no idles needed' },
        { input: [['A','B','C'], 2], expected: 3, description: 'All unique tasks — no idles' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['top-k-frequent-elements'],
    relatedPatterns: ['Greedy Scheduling', 'Frame Packing', 'Frequency Analysis'],
    intuitionSummary: 'The most-frequent task creates a frame structure. Pack all other tasks into frames; idle slots fill any remaining space. Take max with tasks.length to handle dense task sets.',
    patternName: 'Greedy Frame Packing',
  },
];

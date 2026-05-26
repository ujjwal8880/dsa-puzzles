import type { QuestionConfig } from '@/types/question';

export const GRAPHS_COMPLETE: QuestionConfig[] = [
  // ─── 1. Clone Graph (133) ─────────────────────────────────────────────────
  {
    id: 'clone-graph',
    slug: 'clone-graph',
    leetcodeNumber: 133,
    title: 'Clone Graph',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'pattern',
    tags: ['graph', 'dfs', 'bfs', 'hashmap'],
    questionSets: ['blind75', 'top150'],
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Make a perfect deep copy of a graph — every node and every connection, but all brand new objects!',
      engineer: 'DFS with a HashMap from original node → cloned node. For each neighbor, if not yet cloned, recurse. The map doubles as visited set to avoid infinite loops.',
      interview: 'HashMap<Node, Node> maps old → new. DFS: if node in map, return map[node]. Else create clone, store in map, then recurse for all neighbors. O(V+E) time and space.',
    },
    puzzleConfig: {
      problemStatement: 'Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a val (int) and a list of neighbors. The graph may contain cycles.',
      correctPattern: 'bfs-dfs',
      options: [
        { id: 'bfs-dfs', label: 'BFS / DFS + HashMap', icon: '🌐', description: 'Traverse nodes and map old → new clone' },
        { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧮', description: 'Build solutions from overlapping subproblems' },
        { id: 'topological-sort', label: 'Topological Sort', icon: '🔄', description: 'Order nodes in a directed dependency graph' },
        { id: 'two-pointers', label: 'Two Pointers', icon: '👆', description: 'Move two cursors simultaneously' },
        { id: 'hash-map', label: 'Hash Map Only', icon: '🗂️', description: 'Store key-value pairs for lookup' },
        { id: 'backtracking', label: 'Backtracking', icon: '🌲', description: 'Explore all paths, undo on failure' },
      ],
      explanation: 'DFS (or BFS) + a HashMap<originalNode, cloneNode> does it in one pass. The map serves two roles: (1) maps each original to its clone so edges get wired correctly, (2) acts as a visited set to break cycles. Without the map, you\'d loop forever on any cycle.',
      followUp: 'Key trick: create the clone node before recursing into its neighbors. If a neighbor is already in the map, return the existing clone — never create two clones of the same node.',
    },
    hints: [
      { id: 1, text: 'You need a way to know if you have already cloned a node — otherwise you will loop forever on cycles. What data structure handles that?', xpCost: 0 },
      { id: 2, text: 'Use a HashMap from original node to its clone. When you encounter a node already in the map, return the existing clone instead of creating a new one.', xpCost: 0 },
      { id: 3, text: 'DFS template: if (map.has(node)) return map.get(node). Else: clone = new Node(node.val); map.set(node, clone); for each neighbor, clone.neighbors.push(dfs(neighbor)); return clone.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: node 1 with neighbors [2,4]. Call dfs(node1). map is empty → create clone1, map={1→c1}.',
        state: { visiting: 1, map: { '1': 'c1' }, cloneNeighbors: [] },
        activeNodes: ['1'],
        annotation: 'Clone node 1, add to map',
      },
      {
        id: 2,
        description: 'Process neighbor node2 of node1 → call dfs(node2). Not in map → create clone2, map={1→c1, 2→c2}.',
        state: { visiting: 2, map: { '1': 'c1', '2': 'c2' }, cloneNeighbors: [] },
        activeNodes: ['2'],
        annotation: 'Clone node 2',
      },
      {
        id: 3,
        description: 'Process neighbor node1 of node2 → dfs(node1). Already in map → return c1. c2.neighbors = [c1].',
        state: { visiting: 1, mapHit: true, map: { '1': 'c1', '2': 'c2' }, c2Neighbors: ['c1'] },
        activeNodes: ['1'],
        annotation: 'Map hit — return existing c1',
      },
      {
        id: 4,
        description: 'Process neighbor node3 of node2 → dfs(node3) → create c3. c3 processes node2 (map hit→c2) and node4. Create c4.',
        state: { visiting: 3, map: { '1': 'c1', '2': 'c2', '3': 'c3', '4': 'c4' } },
        activeNodes: ['3', '4'],
        annotation: 'Clone nodes 3 and 4',
      },
      {
        id: 5,
        description: 'All nodes cloned. Return c1. The cloned graph has identical structure but entirely new Node objects.',
        state: { done: true, clonedAdjList: [[2,4],[1,3],[2,4],[1,3]] },
        annotation: 'Deep clone complete',
      },
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)',
      timeExplanation: 'Each node and edge is visited exactly once.',
      spaceExplanation: 'HashMap stores one entry per node (V nodes). Recursion stack is O(V) in worst case.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function cloneGraph(node) {
  if (!node) return null;
  const map = new Map(); // original -> clone

  function dfs(n) {
    if (map.has(n)) return map.get(n);
    const clone = { val: n.val, neighbors: [] };
    map.set(n, clone);
    for (const neighbor of n.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  }

  return dfs(node);
}`,
      },
      {
        language: 'python',
        code: `def cloneGraph(node):
    if not node:
        return None
    memo = {}

    def dfs(n):
        if n in memo:
            return memo[n]
        clone = Node(n.val, [])
        memo[n] = clone
        for neighbor in n.neighbors:
            clone.neighbors.append(dfs(neighbor))
        return clone

    return dfs(node)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'BFS/DFS without memoization — would loop infinitely on cycles.',
        complexity: { time: 'O(∞)', space: 'O(∞)', timeExplanation: 'Cycles cause infinite recursion without visited tracking', spaceExplanation: 'Stack overflow', visualization: 'quadratic' },
      },
      optimized: {
        description: 'DFS with HashMap old→new. Map serves as both visited set and the lookup for connecting cloned neighbors.',
        complexity: { time: 'O(V+E)', space: 'O(V)', timeExplanation: 'Each node visited once', spaceExplanation: 'Map of V entries plus recursion stack', visualization: 'linear' },
      },
      followUps: [
        'Implement iteratively with BFS and a queue',
        'What if the graph is directed? (Same approach works)',
        'What if nodes have arbitrary data, not just integers?',
      ],
      edgeCases: [
        'Null input → return null',
        'Single node with no neighbors',
        'Graph with a self-loop (node neighbors itself)',
        'Completely disconnected components (only clone reachable from given node)',
      ],
      commonMistakes: [
        'Storing the node in the map after processing neighbors — causes infinite loops on cycles',
        'Confusing the original node with the clone when adding neighbors',
        'Forgetting the null check at the start',
      ],
      interviewerTips: [
        'Clarify: is it directed or undirected? Does it matter for the algorithm?',
        'Explain why you store the clone in the map BEFORE recursing (pre-order memoization prevents cycles)',
        'Mention BFS alternative — same map trick, just use a queue instead of the call stack',
      ],
    },
    codeChallenge: {
      functionName: 'cloneGraphAdj',
      starterCode: {
        javascript: `/**
 * Given adjacency list (array of arrays), clone and return new adjacency list.
 * @param {number[][]} adjList
 * @return {number[][]}
 */
function cloneGraphAdj(adjList) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[2,4],[1,3],[2,4],[1,3]]], expected: [[2,4],[1,3],[2,4],[1,3]], description: 'Standard 4-node graph' },
        { input: [[[2],[1]]], expected: [[2],[1]], description: 'Two nodes connected' },
        { input: [[[1]]], expected: [[1]], description: 'Self-loop: node 1 neighbors itself' },
        { input: [[[]]], expected: [[]], description: 'Single node, no neighbors' },
        { input: [[[2,3],[1,3],[1,2]]], expected: [[2,3],[1,3],[1,2]], description: 'Triangle graph' },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-of-islands'],
    relatedPatterns: ['DFS with Memoization', 'Graph Traversal', 'HashMap as Visited Set'],
    intuitionSummary: 'DFS the original graph; the HashMap is the visited set AND the bridge from old nodes to their new clones.',
    patternName: 'DFS with Clone Map',
  },

  // ─── 2. Pacific Atlantic Water Flow (417) ────────────────────────────────
  {
    id: 'pacific-atlantic',
    slug: 'pacific-atlantic-water-flow',
    leetcodeNumber: 417,
    title: 'Pacific Atlantic Water Flow',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'graph',
    tags: ['graph', 'bfs', 'dfs', 'matrix'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'TikTok'],
    descriptions: {
      explorer: 'Water flows downhill to either the Pacific (top/left border) or Atlantic (bottom/right border). Find cells where rain can reach BOTH oceans!',
      engineer: 'Reverse BFS from each ocean border (water flows UP from ocean). Pacific reachable set = BFS from top+left edges. Atlantic = BFS from bottom+right edges. Return intersection.',
      interview: 'Multi-source BFS in reverse. Start from all Pacific-border cells and all Atlantic-border cells simultaneously. A cell joins a set if its height >= the incoming cell. Intersection of both sets is the answer.',
    },
    puzzleConfig: {
      grid: [
        ['1', '0', '1'],
        ['0', '1', '0'],
        ['1', '0', '1'],
      ],
      instruction: 'Pacific-Atlantic water flow (3×3): cells marked 1 can flow to BOTH oceans. Count the cells.',
      mode: 'island-count',
      correctAnswer: 5,
    },
    hints: [
      { id: 1, text: 'Instead of simulating water flowing from every cell (expensive), think in reverse: start from the ocean borders and climb uphill.', xpCost: 0 },
      { id: 2, text: 'Do two separate BFS passes: one from all top+left border cells (Pacific), one from all bottom+right border cells (Atlantic). A neighbor is reachable if its height >= current height.', xpCost: 0 },
      { id: 3, text: 'After both BFS passes, iterate over all cells. If a cell is in both the Pacific-reachable set and the Atlantic-reachable set, add it to the result.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'heights=5×5 grid. Pacific borders: row 0 and col 0. Atlantic borders: row 4 and col 4. Initialize two queues.',
        state: { pacificQueue: 'top row + left col', atlanticQueue: 'bottom row + right col' },
        annotation: 'Seed both BFS queues from borders',
      },
      {
        id: 2,
        description: 'BFS Pacific from border cells. Expand to any neighbor with height >= current. Mark visited in pacificSet.',
        state: { pacificSet: 'growing from top-left' },
        activeNodes: ['(0,0)','(0,4)','(4,0)'],
        annotation: 'Pacific BFS climbing uphill',
      },
      {
        id: 3,
        description: 'BFS Atlantic from border cells. Expand similarly. Mark visited in atlanticSet.',
        state: { atlanticSet: 'growing from bottom-right' },
        activeNodes: ['(4,4)','(0,4)','(4,0)'],
        annotation: 'Atlantic BFS climbing uphill',
      },
      {
        id: 4,
        description: 'Cell (0,4) height=5: reachable from Pacific (top border) and Atlantic (right border). Also cells (1,3),(1,4),(2,2),(3,0),(3,1),(4,0) end up in both sets.',
        state: { intersection: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] },
        activeNodes: ['(0,4)','(1,3)','(2,2)'],
        annotation: 'Intersection = answer cells',
      },
      {
        id: 5,
        description: 'Return all cells in the intersection sorted by [row, col].',
        state: { result: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] },
        annotation: 'Final answer: 7 cells',
      },
    ],
    complexity: {
      time: 'O(m × n)',
      space: 'O(m × n)',
      timeExplanation: 'Each cell is enqueued and processed at most twice (once per BFS pass).',
      spaceExplanation: 'Two visited matrices of size m×n plus the queues.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const pacificReach = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlanticReach = Array.from({ length: rows }, () => new Array(cols).fill(false));

  function bfs(queue, visited) {
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (queue.length) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (visited[nr][nc]) continue;
        if (heights[nr][nc] < heights[r][c]) continue; // water flows down, we go up
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }

  const pacQ = [], atlQ = [];
  for (let r = 0; r < rows; r++) {
    pacificReach[r][0] = true; pacQ.push([r, 0]);
    atlanticReach[r][cols-1] = true; atlQ.push([r, cols-1]);
  }
  for (let c = 0; c < cols; c++) {
    pacificReach[0][c] = true; pacQ.push([0, c]);
    atlanticReach[rows-1][c] = true; atlQ.push([rows-1, c]);
  }

  bfs(pacQ, pacificReach);
  bfs(atlQ, atlanticReach);

  const result = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacificReach[r][c] && atlanticReach[r][c]) result.push([r, c]);
    }
  }
  return result;
}`,
      },
      {
        language: 'python',
        code: `from collections import deque

def pacificAtlantic(heights):
    rows, cols = len(heights), len(heights[0])

    def bfs(starts):
        visited = set(starts)
        queue = deque(starts)
        while queue:
            r, c = queue.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r+dr, c+dc
                if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in visited:
                    if heights[nr][nc] >= heights[r][c]:
                        visited.add((nr,nc))
                        queue.append((nr,nc))
        return visited

    pac_starts = [(r,0) for r in range(rows)] + [(0,c) for c in range(cols)]
    atl_starts = [(r,cols-1) for r in range(rows)] + [(rows-1,c) for c in range(cols)]

    return sorted(bfs(pac_starts) & bfs(atl_starts))`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'From every cell, DFS downhill to see if you can reach both borders. O(m²n²) — too slow.',
        complexity: { time: 'O(m²n²)', space: 'O(mn)', timeExplanation: 'DFS from each of mn cells, each DFS is O(mn)', spaceExplanation: 'Visited set per DFS call', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Reverse BFS from ocean borders, climbing uphill. Two passes, each O(mn). Intersection is the answer.',
        complexity: { time: 'O(m×n)', space: 'O(m×n)', timeExplanation: 'Each cell visited at most twice', spaceExplanation: 'Two visited grids', visualization: 'quadratic' },
      },
      followUps: [
        'What if there are more than two oceans?',
        'Solve with DFS instead of BFS — same reverse approach works',
        'What if the grid has obstacles?',
      ],
      edgeCases: [
        '1×1 grid — single cell can reach both oceans',
        'Flat grid (all heights equal) — every cell is in the answer',
        'Strictly increasing grid — only corner cells might reach both',
      ],
      commonMistakes: [
        'Running BFS forward (from each cell downhill) — correct but O(m²n²)',
        'Forgetting to seed ALL border cells into the queue before BFS (not just corners)',
        'Using < instead of <= in the height comparison (reverse direction requires >=)',
      ],
      interviewerTips: [
        'The key insight is reversing the direction — climbing uphill from the ocean is equivalent to flowing downhill to the ocean',
        'Multi-source BFS is more efficient than running BFS from every single border cell separately',
        'Mention that DFS works just as well; BFS is slightly easier to reason about for level-order problems',
      ],
    },
    codeChallenge: {
      functionName: 'pacificAtlantic',
      starterCode: {
        javascript: `/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
  // Your solution here
}`,
      },
      testCases: [
        {
          input: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]],
          expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]],
          description: '5x5 heights grid',
        },
        { input: [[[1]]], expected: [[0,0]], description: '1x1 grid' },
        { input: [[[1,1],[1,1]]], expected: [[0,0],[0,1],[1,0],[1,1]], description: 'Flat 2x2 — all cells' },
        { input: [[[3,3,3],[3,1,3],[0,2,4]]], expected: [[0,0],[0,1],[0,2],[1,0],[1,2],[2,2]], description: '3x3 mixed heights' },
        { input: [[[1,2,3],[8,9,4],[7,6,5]]], expected: [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]], description: 'Spiral heights — multiple intersections' },
      ],
      unorderedResult: true,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-of-islands'],
    relatedPatterns: ['Multi-Source BFS', 'Reverse Graph Traversal', 'Set Intersection'],
    intuitionSummary: 'Reverse the flow direction and BFS uphill from both ocean borders; the intersection of reachable sets is the answer.',
    patternName: 'Reverse Multi-Source BFS',
  },

  // ─── 3. Course Schedule (207) ────────────────────────────────────────────
  {
    id: 'course-schedule',
    slug: 'course-schedule',
    leetcodeNumber: 207,
    title: 'Course Schedule',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'pattern',
    tags: ['graph', 'dfs', 'topological-sort', 'cycle-detection'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'You have courses to take, but some courses require prerequisites. Can you take all the courses without getting stuck in a circular dependency?',
      engineer: 'Build adjacency list. DFS with 3-state coloring: 0=unvisited, 1=in-current-path (cycle detected if revisited), 2=fully processed (safe). Return true if no cycle found.',
      interview: 'Classic cycle detection in directed graph. DFS with states: white/gray/black. If we re-enter a gray node, there is a cycle. O(V+E) time and space.',
    },
    puzzleConfig: {
      problemStatement: 'There are numCourses labeled 0 to n-1. prerequisites[i] = [a, b] means you must take course b before course a. Given the total number of courses and the prerequisites list, return true if it is possible to finish all courses.',
      correctPattern: 'topological-sort',
      options: [
        { id: 'topological-sort', label: 'Topological Sort', icon: '🔄', description: 'Detect cycles in a directed dependency graph' },
        { id: 'bfs-dfs', label: 'BFS / DFS', icon: '🌐', description: 'Plain graph traversal, no ordering' },
        { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧮', description: 'Build up solutions from subproblems' },
        { id: 'hash-map', label: 'Hash Map', icon: '🗂️', description: 'Store values for O(1) lookup' },
        { id: 'two-pointers', label: 'Two Pointers', icon: '👆', description: 'Move two cursors simultaneously' },
        { id: 'greedy', label: 'Greedy', icon: '💰', description: 'Always pick the locally optimal choice' },
      ],
      explanation: 'Prerequisites form a directed graph (b → a means "take b before a"). The question "can you finish all courses?" equals "does this graph have no cycles?" Topological sort is the canonical cycle-detection tool for directed graphs — if a full topological ordering exists, no cycle exists.',
      followUp: 'DFS approach: color nodes 0 (unvisited), 1 (on current path), 2 (fully done). Hitting a node colored 1 during DFS means a cycle. Kahn\'s: remove nodes with in-degree 0 repeatedly — if you process all n nodes, no cycle.',
    },
    hints: [
      { id: 1, text: 'Model this as a directed graph: an edge A → B means "take A before B". Can you finish all courses? Only if the graph has no cycle.', xpCost: 0 },
      { id: 2, text: 'Use 3-state DFS: 0 = never visited, 1 = currently on the DFS path, 2 = fully explored. If you reach a node in state 1, there is a cycle.', xpCost: 0 },
      { id: 3, text: 'Build adjacency list from prerequisites. For each unvisited node, run DFS. In DFS: set state=1, recurse neighbors; if any neighbor has state=1, return false. After all neighbors, set state=2.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'numCourses=2, prerequisites=[[1,0]]. Build graph: 0→[1] (course 1 requires 0). state=[0,0].',
        state: { graph: { '0': [1], '1': [] }, state: [0, 0] },
        annotation: 'Graph built; all nodes unvisited',
      },
      {
        id: 2,
        description: 'DFS(0): set state[0]=1 (visiting). Recurse to neighbor 1.',
        state: { state: [1, 0], current: 0 },
        activeNodes: ['0'],
        annotation: 'state[0] = 1 (gray)',
      },
      {
        id: 3,
        description: 'DFS(1): set state[1]=1. No neighbors. Set state[1]=2. Return true.',
        state: { state: [1, 2], current: 1 },
        activeNodes: ['1'],
        annotation: 'state[1] = 2 (black)',
      },
      {
        id: 4,
        description: 'Back in DFS(0): all neighbors done. Set state[0]=2. Return true.',
        state: { state: [2, 2], current: 0 },
        activeNodes: ['0'],
        annotation: 'state[0] = 2 (black)',
      },
      {
        id: 5,
        description: 'All nodes processed, no cycle found. Return true — you can finish all courses.',
        state: { result: true, state: [2, 2] },
        annotation: 'No cycle → canFinish = true',
      },
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)',
      timeExplanation: 'Each node and edge visited exactly once in DFS.',
      spaceExplanation: 'Adjacency list O(V+E), state array O(V), recursion stack O(V).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  // 0 = unvisited, 1 = visiting (on current path), 2 = done
  const state = new Array(numCourses).fill(0);

  function dfs(node) {
    if (state[node] === 1) return false; // cycle!
    if (state[node] === 2) return true;  // already safe
    state[node] = 1;
    for (const neighbor of graph[node]) {
      if (!dfs(neighbor)) return false;
    }
    state[node] = 2;
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
}`,
      },
      {
        language: 'python',
        code: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # 0=unvisited, 1=visiting, 2=done
    state = [0] * numCourses

    def dfs(node):
        if state[node] == 1: return False
        if state[node] == 2: return True
        state[node] = 1
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        state[node] = 2
        return True

    return all(dfs(i) for i in range(numCourses))`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try every topological ordering until one works — factorial time, completely impractical.',
        complexity: { time: 'O(V!)', space: 'O(V)', timeExplanation: 'Permutation generation', spaceExplanation: 'Stack', visualization: 'quadratic' },
      },
      optimized: {
        description: '3-state DFS cycle detection. Gray node (state=1) on the current path means a back edge = cycle.',
        complexity: { time: 'O(V+E)', space: 'O(V+E)', timeExplanation: 'Linear graph traversal', spaceExplanation: 'Adjacency list and state array', visualization: 'linear' },
      },
      followUps: [
        'Course Schedule II (LC 210) — return the actual ordering',
        'Can you solve this with Kahn\'s BFS (in-degree) instead of DFS?',
        'What if there are multiple disconnected components?',
      ],
      edgeCases: [
        'No prerequisites → always true',
        'All courses form one big cycle → false',
        'Self-loop: course requires itself → false',
        'Duplicate prerequisite pairs — handled naturally',
      ],
      commonMistakes: [
        'Using a simple visited boolean instead of 3 states — cannot detect back edges vs cross edges',
        'Building the graph in the wrong direction (edge from course to prereq instead of prereq to course)',
        'Not checking all disconnected components (must loop over all nodes, not just start from 0)',
      ],
      interviewerTips: [
        'Explain why 2 states (visited/unvisited) are insufficient for directed cycle detection',
        'The 3-state approach maps to the DFS "white-gray-black" coloring from CLRS',
        'Kahn\'s algorithm (BFS with in-degrees) is an equivalent alternative worth mentioning',
      ],
    },
    codeChallenge: {
      functionName: 'canFinish',
      starterCode: {
        javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [2, [[1, 0]]], expected: true, description: 'canFinish(2, [[1,0]]) — no cycle' },
        { input: [2, [[1, 0], [0, 1]]], expected: false, description: 'canFinish(2, [[1,0],[0,1]]) — cycle' },
        { input: [1, []], expected: true, description: 'Single course, no prereqs' },
        { input: [3, [[1,0],[2,1]]], expected: true, description: 'Linear chain 0→1→2' },
        { input: [4, [[1,0],[2,1],[3,2],[1,3]]], expected: false, description: 'Cycle in 4-node graph' },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-of-islands'],
    relatedPatterns: ['DFS Cycle Detection', 'Topological Sort', '3-State Coloring'],
    intuitionSummary: 'Cycle in a directed graph means impossible scheduling. 3-state DFS detects back edges that create cycles.',
    patternName: 'DFS 3-State Cycle Detection',
  },

  // ─── 4. Number of Connected Components (323) ─────────────────────────────
  {
    id: 'num-connected-components',
    slug: 'number-of-connected-components-in-undirected-graph',
    leetcodeNumber: 323,
    title: 'Number of Connected Components in an Undirected Graph',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'graph',
    tags: ['graph', 'union-find', 'dfs', 'bfs'],
    questionSets: ['blind75'],
    companies: ['LinkedIn', 'Google', 'Amazon', 'Microsoft', 'Meta'],
    descriptions: {
      explorer: 'Given a bunch of nodes and edges, how many separate "islands" (connected groups) exist in the graph?',
      engineer: 'Union-Find: initialize n components. For each edge (u,v), union u and v — if they had different roots, decrement component count. Return final count.',
      interview: 'Classic Union-Find application. O(n + e · α(n)) time. Alternative: DFS/BFS from each unvisited node, counting how many times you start a new traversal.',
    },
    puzzleConfig: {
      grid: [
        ['1', '1', '1', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '1', '1'],
      ],
      instruction: 'Graph with 5 nodes, edges [[0,1],[1,2],[3,4]]: count the CONNECTED COMPONENTS. Each island = one component.',
      mode: 'island-count',
      correctAnswer: 2,
    },
    hints: [
      { id: 1, text: 'Think of components as groups. Initially each node is its own group. Edges merge groups together. How many groups remain at the end?', xpCost: 0 },
      { id: 2, text: 'Union-Find: maintain a parent array. For each edge, find roots of both endpoints. If different, union them and decrement your count by 1.', xpCost: 0 },
      { id: 3, text: 'Alternatively, DFS/BFS: start count=0. For each unvisited node, increment count and run DFS/BFS to mark all connected nodes visited. Return count.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=5, edges=[[0,1],[1,2],[3,4]]. Initialize parent=[0,1,2,3,4], components=5.',
        state: { parent: [0,1,2,3,4], components: 5 },
        annotation: 'Each node is its own root',
      },
      {
        id: 2,
        description: 'Union(0,1): find(0)=0, find(1)=1. Different → parent[1]=0, components=4.',
        state: { parent: [0,0,2,3,4], components: 4, edge: [0,1] },
        activeNodes: ['0','1'],
        annotation: 'Merge 0 and 1 → components=4',
      },
      {
        id: 3,
        description: 'Union(1,2): find(1)=0, find(2)=2. Different → parent[2]=0, components=3.',
        state: { parent: [0,0,0,3,4], components: 3, edge: [1,2] },
        activeNodes: ['1','2'],
        annotation: 'Merge {0,1} with 2 → components=3',
      },
      {
        id: 4,
        description: 'Union(3,4): find(3)=3, find(4)=4. Different → parent[4]=3, components=2.',
        state: { parent: [0,0,0,3,3], components: 2, edge: [3,4] },
        activeNodes: ['3','4'],
        annotation: 'Merge 3 and 4 → components=2',
      },
      {
        id: 5,
        description: 'All edges processed. Components = 2: {0,1,2} and {3,4}.',
        state: { components: 2, sets: [[0,1,2],[3,4]] },
        annotation: 'Answer: 2',
      },
    ],
    complexity: {
      time: 'O(n + e · α(n))',
      space: 'O(n)',
      timeExplanation: 'n find+union operations with path compression and union by rank. α(n) is the inverse Ackermann function, effectively O(1).',
      spaceExplanation: 'Parent and rank arrays of size n.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  let components = n;

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
    return parent[x];
  }

  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    components--;
  }

  for (const [u, v] of edges) union(u, v);
  return components;
}`,
      },
      {
        language: 'python',
        code: `def countComponents(n, edges):
    parent = list(range(n))
    rank = [0] * n
    components = n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        nonlocal components
        px, py = find(x), find(y)
        if px == py: return
        if rank[px] < rank[py]: parent[px] = py
        elif rank[px] > rank[py]: parent[py] = px
        else:
            parent[py] = px
            rank[px] += 1
        components -= 1

    for u, v in edges:
        union(u, v)
    return components`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Build adjacency list then BFS/DFS from each unvisited node, counting starts. O(V+E) time but larger constant.',
        complexity: { time: 'O(V+E)', space: 'O(V+E)', timeExplanation: 'Full graph traversal', spaceExplanation: 'Adjacency list and visited array', visualization: 'linear' },
      },
      optimized: {
        description: 'Union-Find with path compression and union by rank. Near-linear time, minimal space, and easy to maintain dynamically.',
        complexity: { time: 'O((V+E)·α(V))', space: 'O(V)', timeExplanation: 'Inverse Ackermann per operation, practically O(1)', spaceExplanation: 'Parent and rank arrays only', visualization: 'linear' },
      },
      followUps: [
        'Add edges dynamically — Union-Find handles this without rebuilding',
        'Count components after removing an edge',
        'Find the size of the largest component',
      ],
      edgeCases: [
        'No edges → n components',
        'All nodes connected → 1 component',
        'Self-loops (u === v) — find(u) === find(v), no union needed',
        'Duplicate edges — same effect as self-loop for UF',
      ],
      commonMistakes: [
        'Not applying path compression — correct but slow without it',
        'Decrementing component count even when find(u) === find(v) (already same component)',
        'Confusing directed vs undirected — for undirected, union is symmetric',
      ],
      interviewerTips: [
        'Union-Find shines when edges are added incrementally (online algorithm)',
        'DFS/BFS is fine if the full graph is known upfront and space allows adjacency list',
        'Explain path compression and union by rank clearly — interviewers love this detail',
      ],
    },
    codeChallenge: {
      functionName: 'countComponents',
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [5, [[0,1],[1,2],[3,4]]], expected: 2, description: 'countComponents(5, [[0,1],[1,2],[3,4]])' },
        { input: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1, description: 'All connected — 1 component' },
        { input: [3, []], expected: 3, description: 'No edges — 3 isolated nodes' },
        { input: [4, [[0,1],[2,3]]], expected: 2, description: 'Two separate pairs' },
        { input: [1, []], expected: 1, description: 'Single node' },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-of-islands'],
    relatedPatterns: ['Union-Find', 'Graph Traversal', 'Component Counting'],
    intuitionSummary: 'Start with n components; each successful union reduces the count by 1. Union-Find makes this near-linear.',
    patternName: 'Union-Find Component Count',
  },

  // ─── 5. Graph Valid Tree (261) ───────────────────────────────────────────
  {
    id: 'graph-valid-tree',
    slug: 'graph-valid-tree',
    leetcodeNumber: 261,
    title: 'Graph Valid Tree',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'graph',
    tags: ['graph', 'union-find', 'dfs', 'tree'],
    questionSets: ['blind75'],
    companies: ['Google', 'LinkedIn', 'Amazon', 'Microsoft', 'Airbnb'],
    descriptions: {
      explorer: 'A tree is a connected graph with no cycles. Given n nodes and a list of edges, decide if they form a valid tree!',
      engineer: 'Two conditions for a valid tree: exactly n-1 edges AND no cycle. Use Union-Find: if any union merges two nodes already in the same component, there is a cycle. At the end, exactly 1 component must remain.',
      interview: 'A graph is a tree iff it is connected and acyclic. Equivalently: n nodes, n-1 edges, no cycle (any two suffice). Union-Find or DFS-cycle-detection with connectivity check.',
    },
    puzzleConfig: {
      grid: [
        ['1', '1', '1', '1', '1'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
      ],
      instruction: 'Graph: 5 nodes, edges [[0,1],[0,2],[0,3],[1,4]]. A valid tree has 1 connected component. Count the components.',
      mode: 'island-count',
      correctAnswer: 1,
    },
    hints: [
      { id: 1, text: 'A tree with n nodes always has exactly n-1 edges. If you have fewer, the graph is disconnected. More, and there must be a cycle. Check edges.length === n-1 first.', xpCost: 0 },
      { id: 2, text: 'After the edge count check, verify there are no cycles. With Union-Find: if find(u) === find(v) before union(u,v), that edge creates a cycle → not a tree.', xpCost: 0 },
      { id: 3, text: 'Combined check: edges.length !== n-1 → return false immediately. Then for each edge, if union(u,v) fails (same root), return false. If all edges unioned OK, return true.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=5, edges=[[0,1],[0,2],[0,3],[1,4]]. edges.length=4 === n-1=4. ✓ Proceed to cycle check.',
        state: { n: 5, edgeCount: 4, nMinus1: 4, check: 'pass' },
        annotation: 'Edge count check: n-1=4 ✓',
      },
      {
        id: 2,
        description: 'Union(0,1): find(0)=0≠find(1)=1 → merge. Union(0,2): find(0)=0≠2 → merge. Union(0,3): 0≠3 → merge.',
        state: { parent: [0,0,0,0,4], components: 2 },
        activeNodes: ['0','1','2','3'],
        annotation: 'Three unions succeed',
      },
      {
        id: 3,
        description: 'Union(1,4): find(1)=0, find(4)=4. Different → merge. components=1.',
        state: { parent: [0,0,0,0,0], components: 1 },
        activeNodes: ['1','4'],
        annotation: 'Final union — components=1',
      },
      {
        id: 4,
        description: 'All edges processed without a cycle. 1 component. Valid tree!',
        state: { result: true },
        annotation: 'validTree = true',
      },
      {
        id: 5,
        description: 'Counter-example: edges [[0,1],[1,2],[2,3],[1,3],[1,4]] — Union(2,3) then Union(1,3) finds same root → cycle → false.',
        state: { counterExample: true, cycleEdge: [1,3] },
        annotation: 'Cycle detected at edge [1,3] → false',
      },
    ],
    complexity: {
      time: 'O(n + e · α(n))',
      space: 'O(n)',
      timeExplanation: 'n Union-Find operations with path compression, each near-O(1).',
      spaceExplanation: 'Parent and rank arrays of size n.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;

  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false; // cycle
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }

  for (const [u, v] of edges) {
    if (!union(u, v)) return false;
  }
  return true;
}`,
      },
      {
        language: 'python',
        code: `def validTree(n, edges):
    if len(edges) != n - 1:
        return False

    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py: return False
        if rank[px] < rank[py]: parent[px] = py
        elif rank[px] > rank[py]: parent[py] = px
        else:
            parent[py] = px
            rank[px] += 1
        return True

    return all(union(u, v) for u, v in edges)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS to detect cycle + BFS to check connectivity. Two separate passes.',
        complexity: { time: 'O(V+E)', space: 'O(V+E)', timeExplanation: 'Two graph traversals', spaceExplanation: 'Adjacency list and visited sets', visualization: 'linear' },
      },
      optimized: {
        description: 'Check n-1 edges first (O(1)), then Union-Find cycle detection. Single pass over edges, near-linear.',
        complexity: { time: 'O(n + e·α(n))', space: 'O(n)', timeExplanation: 'Early exit + near-linear UF ops', spaceExplanation: 'Only parent array needed', visualization: 'linear' },
      },
      followUps: [
        'How would you handle a directed graph? (Detect cycle differently — DFS with in-degree)',
        'Can you detect which specific edge causes the cycle?',
        'Minimum Spanning Tree — similar Union-Find logic (Kruskal\'s algorithm)',
      ],
      edgeCases: [
        'n=1, edges=[] → true (single node is a valid tree)',
        'n=2, edges=[[0,1],[0,1]] → false (duplicate edge = cycle)',
        'n=3, edges=[[0,1]] → false (disconnected)',
        'Self-loop [0,0] → cycle → false',
      ],
      commonMistakes: [
        'Not checking edges.length === n-1 upfront — saves a full UF pass',
        'Checking only for no-cycle without verifying connectivity (e.g., n=3, edges=[[0,1]] passes cycle check but is not a tree)',
        'The n-1 edges check plus no-cycle check together guarantee both acyclicity and connectivity',
      ],
      interviewerTips: [
        'The two checks (n-1 edges, no cycle) are equivalent to (no cycle, connected) — any two of the three properties imply the third',
        'This is Kruskal\'s MST algorithm applied to check if the MST equals the graph itself',
        'Ask if the graph could have self-loops or parallel edges — the n-1 check handles these efficiently',
      ],
    },
    codeChallenge: {
      functionName: 'validTree',
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function validTree(n, edges) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [5, [[0,1],[0,2],[0,3],[1,4]]], expected: true, description: 'validTree(5, star graph) — true' },
        { input: [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]], expected: false, description: 'validTree(5, has cycle) — false' },
        { input: [1, []], expected: true, description: 'Single node, no edges' },
        { input: [3, [[0,1]]], expected: false, description: 'Disconnected (missing edge)' },
        { input: [4, [[0,1],[1,2],[2,3]]], expected: true, description: 'Linear chain — valid tree' },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['num-connected-components'],
    relatedPatterns: ['Union-Find', 'Tree Properties', 'Cycle Detection'],
    intuitionSummary: 'A tree = n nodes + n-1 edges + no cycle. Check edge count first, then use Union-Find for the cycle check.',
    patternName: 'Union-Find Tree Validation',
  },

  // ─── 6. Surrounded Regions (130) ─────────────────────────────────────────
  {
    id: 'surrounded-regions',
    slug: 'surrounded-regions',
    leetcodeNumber: 130,
    title: 'Surrounded Regions',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'graph',
    tags: ['graph', 'dfs', 'bfs', 'matrix', 'union-find'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Goldman Sachs'],
    descriptions: {
      explorer: 'On a grid of X and O, flip all O\'s that are completely surrounded by X\'s. O\'s connected to the border are safe!',
      engineer: 'DFS from every border O cell, marking safe cells with a temporary marker (e.g., \'S\'). Then sweep the board: O→X, S→O.',
      interview: 'Reverse thinking: find all O\'s NOT surrounded (those connected to border O\'s via DFS/BFS). Mark them safe. Then flip all remaining O\'s to X and restore safe marks.',
    },
    puzzleConfig: {
      grid: [
        ['0', '0', '0', '0'],
        ['0', '1', '1', '0'],
        ['0', '1', '1', '0'],
        ['0', '0', '0', '0'],
      ],
      instruction: 'Surrounded Regions: O cells not touching border get captured. Count the groups of SURROUNDED O cells (shown as 1s).',
      mode: 'island-count',
      correctAnswer: 1,
    },
    hints: [
      { id: 1, text: 'An O is safe if it touches the border directly or is connected to a border O. Instead of finding all surrounded O\'s, find all safe O\'s first.', xpCost: 0 },
      { id: 2, text: 'DFS from every O on the 4 borders. Mark all reachable O\'s with a sentinel (like "S"). Then scan: O→X (surrounded), S→O (restore safe).', xpCost: 0 },
      { id: 3, text: 'Border cells are row 0, row m-1, col 0, col n-1. For each border O, DFS in 4 directions, marking connected O\'s as "S". Final pass: board[r][c]==="O"→"X", ==="S"→"O".', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Board: 4×4 with O\'s at (1,1),(1,2),(2,2),(3,1). Scan borders for O cells → none on borders in this example.',
        state: { board: [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']], borderOs: [] },
        annotation: 'No O on borders → no safe cells',
      },
      {
        id: 2,
        description: 'No border O found → no DFS needed. All O\'s are surrounded.',
        state: { safeOs: [], surroundedOs: [[1,1],[1,2],[2,2]] },
        annotation: 'All interior O\'s are surrounded',
      },
      {
        id: 3,
        description: 'Sweep: flip every O→X. (3,1) is on border row? No — row 3 is bottom border! O at (3,1) would be safe if on border. Let\'s trace: board[3][1]="O" and row=3=rows-1 → it IS on border.',
        state: { borderO: [3,1], safe: true },
        activeNodes: ['(3,1)'],
        annotation: 'board[3][1] is on bottom border — safe!',
      },
      {
        id: 4,
        description: 'DFS from (3,1): no connected O neighbors (surrounded by X). Mark (3,1)="S". Now sweep: (1,1),(1,2),(2,2) → X; (3,1) S→O.',
        state: { board: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']] },
        activeNodes: ['(3,1)'],
        annotation: 'After flip: (3,1) preserved as O',
      },
      {
        id: 5,
        description: 'Final board: surrounded O\'s flipped to X; border-connected O\'s restored.',
        state: { result: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']] },
        annotation: 'In-place modification complete',
      },
    ],
    complexity: {
      time: 'O(m × n)',
      space: 'O(m × n)',
      timeExplanation: 'Each cell is visited at most once in the DFS passes plus the final sweep.',
      spaceExplanation: 'Recursion stack can be O(mn) in worst case (all cells are O).',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function solve(board) {
  if (!board.length || !board[0].length) return;
  const rows = board.length, cols = board[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
    board[r][c] = 'S'; // mark as safe
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }

  // Mark all border-connected O's as safe
  for (let r = 0; r < rows; r++) {
    if (board[r][0] === 'O') dfs(r, 0);
    if (board[r][cols-1] === 'O') dfs(r, cols-1);
  }
  for (let c = 0; c < cols; c++) {
    if (board[0][c] === 'O') dfs(0, c);
    if (board[rows-1][c] === 'O') dfs(rows-1, c);
  }

  // Sweep: O→X (surrounded), S→O (safe)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === 'S') board[r][c] = 'O';
    }
  }
}`,
      },
      {
        language: 'python',
        code: `def solve(board):
    if not board or not board[0]: return
    rows, cols = len(board), len(board[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
            return
        board[r][c] = 'S'
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)

    for r in range(rows):
        if board[r][0] == 'O': dfs(r, 0)
        if board[r][cols-1] == 'O': dfs(r, cols-1)
    for c in range(cols):
        if board[0][c] == 'O': dfs(0, c)
        if board[rows-1][c] == 'O': dfs(rows-1, c)

    for r in range(rows):
        for c in range(cols):
            if board[r][c] == 'O': board[r][c] = 'X'
            elif board[r][c] == 'S': board[r][c] = 'O'`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For every O, BFS outward to check if it can reach a border. O(mn) per cell = O(m²n²) total.',
        complexity: { time: 'O(m²n²)', space: 'O(mn)', timeExplanation: 'BFS per interior O cell', spaceExplanation: 'Queue per BFS', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Reverse approach: DFS from border O\'s to mark safe cells. Single O(mn) sweep. In-place with a sentinel character.',
        complexity: { time: 'O(m×n)', space: 'O(m×n)', timeExplanation: 'Linear in board size', spaceExplanation: 'DFS stack in worst case', visualization: 'quadratic' },
      },
      followUps: [
        'What if the grid wraps around (toroidal)? All O\'s would be border-connected',
        'Can you solve this without recursion (iterative DFS with a stack)?',
        'Union-Find alternative: union all border O\'s to a virtual border node; after all edges processed, O\'s in virtual border\'s component are safe',
      ],
      edgeCases: [
        'All X board → no change',
        'All O board → only border O\'s remain, interior flipped',
        '1×1 board → single cell is always on border, never flipped',
        'Single row or single column → all cells are on the border, nothing flipped',
      ],
      commonMistakes: [
        'Flipping in-place without a sentinel — cannot distinguish original O\'s from newly flipped',
        'Only checking corner cells instead of all 4 border rows/columns',
        'Forgetting to restore S→O after flipping O→X',
      ],
      interviewerTips: [
        'The key insight: think about which O\'s are SAFE, not which are surrounded',
        'The sentinel trick allows in-place modification without extra space',
        'Mention the Union-Find approach as an elegant alternative',
      ],
    },
    codeChallenge: {
      functionName: 'solve',
      starterCode: {
        javascript: `/**
 * Modifies board in-place.
 * @param {string[][]} board
 * @return {void}
 */
function solve(board) {
  // Your solution here
}`,
      },
      testCases: [
        {
          input: [[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]],
          expected: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']],
          description: 'Standard 4×4 board',
        },
        { input: [[['X']]], expected: [['X']], description: 'Single X cell' },
        { input: [[['O']]], expected: [['O']], description: 'Single O cell — on border, stays' },
        {
          input: [[['O','O'],['O','O']]],
          expected: [['O','O'],['O','O']],
          description: '2×2 all O — all on border, none flipped',
        },
        {
          input: [[['X','O','X'],['O','X','O'],['X','O','X']]],
          expected: [['X','O','X'],['O','X','O'],['X','O','X']],
          description: 'Checkerboard — all O\'s on border',
        },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['number-of-islands'],
    relatedPatterns: ['DFS from Border', 'Sentinel Marking', 'Reverse Flood Fill'],
    intuitionSummary: 'Mark safe O\'s (border-connected) first, then flip all unmarked O\'s — a classic reverse-thinking pattern.',
    patternName: 'Border DFS with Sentinel',
  },

  // ─── 7. Course Schedule II (210) ─────────────────────────────────────────
  {
    id: 'course-schedule-ii',
    slug: 'course-schedule-ii',
    leetcodeNumber: 210,
    title: 'Course Schedule II',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['graph', 'topological-sort', 'bfs', 'dfs'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber'],
    descriptions: {
      explorer: 'You need to take all your courses in the right order — find a valid sequence! If it\'s impossible due to circular requirements, say so.',
      engineer: 'Kahn\'s algorithm: compute in-degrees, enqueue all nodes with in-degree 0. Process queue: add node to order, decrement neighbor in-degrees, enqueue those reaching 0. If order.length < n, cycle exists.',
      interview: 'Topological sort via BFS (Kahn\'s). Build adjacency list + in-degree array. BFS from all zero-in-degree nodes. If we process all n nodes, return the order. Otherwise return [].',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'course 0: no prerequisites' },
        { id: 'b', value: 1, label: 'course 1: requires 0' },
        { id: 'c', value: 2, label: 'course 2: requires 0' },
        { id: 'd', value: 3, label: 'course 3: requires 1 and 2' },
      ],
      target: 1,
      instruction: 'Prerequisites [[1,0],[2,0],[3,1],[3,2]]: select the FIRST TWO courses in a valid topological order.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'A course with no prerequisites can be taken first. After you "take" it, some other courses lose a prerequisite — they might now be ready too.', xpCost: 0 },
      { id: 2, text: 'Kahn\'s algorithm: count how many prerequisites each course has (in-degree). Start with courses that have 0 prerequisites. When you take a course, reduce the in-degree of all courses that needed it.', xpCost: 0 },
      { id: 3, text: 'Build: adj list and inDegree array. Enqueue all inDegree[i]===0 nodes. While queue non-empty: dequeue, push to order, for each neighbor decrement inDegree — if it hits 0, enqueue. Return order if order.length===n else [].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Build adjacency: 0→[1,2], 1→[3], 2→[3]. inDegree=[0,1,1,2].',
        state: { adj: { '0':[1,2], '1':[3], '2':[3] }, inDegree: [0,1,1,2] },
        annotation: 'inDegree built; node 0 has 0 prereqs',
      },
      {
        id: 2,
        description: 'Queue = [0] (only node with inDegree 0). Dequeue 0, add to order=[0]. Decrement inDegree for neighbors 1,2 → inDegree=[0,0,0,2].',
        state: { queue: [1,2], order: [0], inDegree: [0,0,0,2] },
        activeNodes: ['0'],
        annotation: 'Process 0 → enqueue 1,2',
      },
      {
        id: 3,
        description: 'Dequeue 1, order=[0,1]. Decrement inDegree[3] → 1. Dequeue 2, order=[0,1,2]. Decrement inDegree[3] → 0. Enqueue 3.',
        state: { queue: [3], order: [0,1,2], inDegree: [0,0,0,0] },
        activeNodes: ['1','2'],
        annotation: 'Process 1,2 → enqueue 3',
      },
      {
        id: 4,
        description: 'Dequeue 3, order=[0,1,2,3]. Queue empty.',
        state: { queue: [], order: [0,1,2,3] },
        activeNodes: ['3'],
        annotation: 'Process 3 — all done',
      },
      {
        id: 5,
        description: 'order.length=4===numCourses. Return [0,1,2,3]. (Other valid orderings: [0,2,1,3])',
        state: { result: [0,1,2,3], alternativeValid: [0,2,1,3] },
        annotation: 'Valid topological order found',
      },
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)',
      timeExplanation: 'Each node dequeued once, each edge processed once for in-degree updates.',
      spaceExplanation: 'Adjacency list O(V+E), in-degree array O(V), queue O(V).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return order.length === numCourses ? order : [];
}`,
      },
      {
        language: 'python',
        code: `from collections import deque

def findOrder(numCourses, prerequisites):
    adj = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses

    for course, prereq in prerequisites:
        adj[prereq].append(course)
        in_degree[course] += 1

    queue = deque(i for i in range(numCourses) if in_degree[i] == 0)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == numCourses else []`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS with post-order collection; reverse the list at the end. Both approaches are O(V+E).',
        complexity: { time: 'O(V+E)', space: 'O(V+E)', timeExplanation: 'Same complexity as Kahn\'s', spaceExplanation: 'Adjacency list + recursion stack', visualization: 'linear' },
      },
      optimized: {
        description: 'Kahn\'s BFS: in-degree array + queue. Naturally detects cycles (processed < n nodes means cycle exists).',
        complexity: { time: 'O(V+E)', space: 'O(V+E)', timeExplanation: 'Each node and edge processed once', spaceExplanation: 'Adjacency list + in-degree array + queue', visualization: 'linear' },
      },
      followUps: [
        'Course Schedule I (LC 207) — just check if order.length === n, return bool',
        'Alien Dictionary (LC 269) — same Kahn\'s approach on character ordering constraints',
        'What if there are multiple valid orderings? (Any correct one is accepted)',
      ],
      edgeCases: [
        'No prerequisites → any order from 0 to n-1 is valid',
        'Circular dependency → return []',
        'Single course → return [0]',
        'All courses depend on one course → that course is first in output',
      ],
      commonMistakes: [
        'Not checking order.length === numCourses at the end — misses cycle detection',
        'Forgetting to initialize all zero-in-degree nodes in the queue (not just node 0)',
        'Building adjacency in reverse (prereq → course is correct; course → prereq gives wrong traversal)',
      ],
      interviewerTips: [
        'Kahn\'s naturally handles cycle detection as a byproduct — elegant',
        'DFS post-order with reversal is equivalent — mention both approaches',
        'The output order is not unique; problem accepts any valid topological order',
      ],
    },
    codeChallenge: {
      functionName: 'findOrder',
      starterCode: {
        javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [2, [[1, 0]]], expected: [0, 1], description: 'findOrder(2, [[1,0]])' },
        { input: [4, [[1,0],[2,0],[3,1],[3,2]]], expected: [0,1,2,3], description: 'findOrder(4, ...) — one valid order' },
        { input: [1, []], expected: [0], description: 'Single course' },
        { input: [2, [[1,0],[0,1]]], expected: [], description: 'Cycle — impossible' },
        { input: [3, []], expected: [0,1,2], description: 'No prereqs — any order valid' },
      ],
      unorderedResult: true,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['course-schedule'],
    relatedPatterns: ['Topological Sort', 'Kahn\'s BFS', 'In-Degree Processing'],
    intuitionSummary: 'Process courses with zero remaining prerequisites first; each completed course frees up others — Kahn\'s BFS makes this elegant.',
    patternName: 'Kahn\'s Topological Sort',
  },

  // ─── 8. Evaluate Division (399) ──────────────────────────────────────────
  {
    id: 'evaluate-division',
    slug: 'evaluate-division',
    leetcodeNumber: 399,
    title: 'Evaluate Division',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['graph', 'bfs', 'dfs', 'weighted-graph', 'hashmap'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Meta', 'Uber', 'Bloomberg'],
    descriptions: {
      explorer: 'Given some equations like a/b=2 and b/c=3, answer queries like a/c=? by finding paths through the equation graph!',
      engineer: 'Build a weighted directed graph: edge a→b with weight v means a/b=v; add reverse edge b→a with weight 1/v. For each query, BFS/DFS from source to target, multiplying edge weights along the path.',
      interview: 'Weighted graph problem. Build adjacency list with bidirectional weighted edges. For each query, BFS/DFS to find path — multiply weights. Return -1 if no path or unknown variable.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'a/b = 2.0' },
        { id: 'b', value: 3, label: 'b/c = 3.0' },
        { id: 'c', value: 6, label: 'a/c = 2×3 = 6' },
        { id: 'd', value: 1, label: 'a/a = 1.0' },
      ],
      target: 5,
      instruction: 'a/b=2, b/c=3: select the two GIVEN values that you multiply to find a/c=6.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of each variable as a graph node. If a/b=2, add edge a→b (weight 2) AND edge b→a (weight 0.5). To answer a/c, find any path from a to c and multiply the weights.', xpCost: 0 },
      { id: 2, text: 'Use BFS from the source node. Keep a running product. When you reach the target, return the product. If you never reach the target, return -1.', xpCost: 0 },
      { id: 3, text: 'Edge cases: if source === target AND the node exists in the graph, return 1.0. If either node is not in the graph at all, return -1.0.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Build graph from equations=[["a","b"],["b","c"]], values=[2,3]. Edges: a→b(2), b→a(0.5), b→c(3), c→b(1/3).',
        state: { graph: { a: [['b',2]], b: [['a',0.5],['c',3]], c: [['b',0.333]] } },
        annotation: 'Weighted bidirectional graph built',
      },
      {
        id: 2,
        description: 'Query ["a","c"]: BFS from "a". Enqueue ("a", product=1.0). Process "a": explore b with weight 2 → enqueue ("b", 2.0).',
        state: { queue: [['b',2.0]], visited: ['a'], product: 2.0 },
        activeNodes: ['a','b'],
        annotation: 'BFS step 1: a→b, product=2',
      },
      {
        id: 3,
        description: 'Process ("b", 2.0): explore c with weight 3 → product=2*3=6.0. "c" is target → return 6.0.',
        state: { found: true, result: 6.0 },
        activeNodes: ['b','c'],
        annotation: 'Reached target: a/c = 6.0',
      },
      {
        id: 4,
        description: 'Query ["b","a"]: BFS from "b". Explore "a" directly (weight 0.5) → "a" is target → return 0.5.',
        state: { query: ['b','a'], result: 0.5 },
        activeNodes: ['b','a'],
        annotation: 'b/a = 0.5 (direct edge)',
      },
      {
        id: 5,
        description: 'Query ["a","e"]: "e" not in graph → return -1. Query ["x","x"]: "x" not in graph → return -1. Query ["a","a"]: "a" in graph, src===dst → return 1.0.',
        state: { results: [6.0, 0.5, -1.0, 1.0, -1.0] },
        annotation: 'Final answers: [6,0.5,-1,1,-1]',
      },
    ],
    complexity: {
      time: 'O((V + E) × Q)',
      space: 'O(V + E)',
      timeExplanation: 'Q queries, each BFS/DFS is O(V+E) where V = number of variables, E = number of equations.',
      spaceExplanation: 'Adjacency list O(V+E), BFS queue O(V).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function calcEquation(equations, values, queries) {
  const graph = new Map();

  function addEdge(u, v, w) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push([v, w]);
    graph.get(v).push([u, 1 / w]);
  }

  for (let i = 0; i < equations.length; i++) {
    addEdge(equations[i][0], equations[i][1], values[i]);
  }

  function bfs(src, dst) {
    if (!graph.has(src) || !graph.has(dst)) return -1.0;
    if (src === dst) return 1.0;

    const queue = [[src, 1.0]];
    const visited = new Set([src]);

    while (queue.length) {
      const [node, product] = queue.shift();
      for (const [neighbor, weight] of graph.get(node)) {
        if (neighbor === dst) return product * weight;
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, product * weight]);
        }
      }
    }
    return -1.0;
  }

  return queries.map(([src, dst]) => bfs(src, dst));
}`,
      },
      {
        language: 'python',
        code: `from collections import defaultdict, deque

def calcEquation(equations, values, queries):
    graph = defaultdict(list)

    for (u, v), w in zip(equations, values):
        graph[u].append((v, w))
        graph[v].append((u, 1 / w))

    def bfs(src, dst):
        if src not in graph or dst not in graph:
            return -1.0
        if src == dst:
            return 1.0
        queue = deque([(src, 1.0)])
        visited = {src}
        while queue:
            node, product = queue.popleft()
            for neighbor, weight in graph[node]:
                if neighbor == dst:
                    return product * weight
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, product * weight))
        return -1.0

    return [bfs(src, dst) for src, dst in queries]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each query, rebuild the graph and run DFS. No caching — same asymptotic complexity.',
        complexity: { time: 'O(Q×(V+E))', space: 'O(V+E)', timeExplanation: 'Q queries, each O(V+E) traversal', spaceExplanation: 'Adjacency list', visualization: 'linear' },
      },
      optimized: {
        description: 'Build graph once. BFS/DFS per query. Union-Find with weighted paths can answer all queries in near-linear total time.',
        complexity: { time: 'O((V+E) + Q×V)', space: 'O(V+E)', timeExplanation: 'Build once O(V+E), then O(V) per query', spaceExplanation: 'Adjacency list', visualization: 'linear' },
      },
      followUps: [
        'What if equations can form contradictions? (e.g., a/b=2 AND a/b=3)',
        'Solve with Union-Find with weights — handles all queries in O(α(V)) each after build',
        'What if queries involve division by zero?',
      ],
      edgeCases: [
        'src === dst: if the node is in the graph, return 1.0; if unknown, return -1.0',
        'Either variable not in graph → -1.0',
        'No path between two known variables (disconnected components) → -1.0',
        'self-equation a/a=5 — graph adds a→a with weight 5',
      ],
      commonMistakes: [
        'Returning 1.0 for src===dst without checking if the node exists in the graph',
        'Forgetting to add the reverse edge (b→a with weight 1/w)',
        'Not marking nodes visited in BFS — can loop in undirected graph',
      ],
      interviewerTips: [
        'Rephrase as: "given a weighted graph, find product of weights along path src→dst"',
        'Mention that Union-Find with path-compressed weights can preprocess all queries faster',
        'The key insight: division chain = edge weight product; transitivity of division = graph path',
      ],
    },
    codeChallenge: {
      functionName: 'calcEquation',
      starterCode: {
        javascript: `/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
function calcEquation(equations, values, queries) {
  // Your solution here
}`,
      },
      testCases: [
        {
          input: [[['a','b'],['b','c']], [2.0,3.0], [['a','c'],['b','a'],['a','e'],['a','a'],['x','x']]],
          expected: [6.0, 0.5, -1.0, 1.0, -1.0],
          description: 'Standard test: a/b=2, b/c=3',
        },
        {
          input: [[['a','b'],['b','c'],['bc','cd']], [1.5,2.5,5.0], [['a','c'],['c','b'],['bc','cd'],['cd','bc']]],
          expected: [3.75, 0.4, 5.0, 0.2],
          description: 'Mixed queries with disconnected component',
        },
        {
          input: [[['a','b']], [0.5], [['a','b'],['b','a'],['a','c'],['x','y']]],
          expected: [0.5, 2.0, -1.0, -1.0],
          description: 'Single equation queries',
        },
        {
          input: [[['a','b'],['c','d']], [2.0,3.0], [['a','c'],['b','d'],['b','a'],['d','c']]],
          expected: [-1.0, -1.0, 0.5, 0.333],
          description: 'Two disconnected components',
        },
        {
          input: [[['x1','x2'],['x2','x3'],['x3','x4'],['x4','x5']], [3.0,4.0,5.0,6.0], [['x1','x5'],['x5','x2'],['x2','x4'],['x2','x2'],['x9','x9']]],
          expected: [360.0, 0.00833, 20.0, 1.0, -1.0],
          description: 'Long chain of equations',
        },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['course-schedule'],
    relatedPatterns: ['Weighted Graph BFS', 'Bidirectional Edges', 'Path Product'],
    intuitionSummary: 'Model variables as nodes and ratios as weighted edges. Answering a query is finding a path and multiplying its edge weights.',
    patternName: 'Weighted Graph BFS',
  },

  // ─── 9. Snakes and Ladders (909) ─────────────────────────────────────────
  {
    id: 'snakes-and-ladders',
    slug: 'snakes-and-ladders',
    leetcodeNumber: 909,
    title: 'Snakes and Ladders',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['graph', 'bfs', 'matrix', 'shortest-path'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'Bloomberg'],
    descriptions: {
      explorer: 'Play a board game: roll a die (1-6), land on a snake/ladder cell to teleport. Find the minimum number of rolls to reach the last cell!',
      engineer: 'BFS on the linearized board. For each cell number 1..n², convert to (row, col) accounting for boustrophedon (snake) ordering. Visit each destination at most once.',
      interview: 'BFS for shortest path. The tricky part: number-to-(row,col) conversion in the boustrophedon layout (rows alternate left-to-right and right-to-left from the bottom). O(n²) time and space.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'start: square 1' },
        { id: 'b', value: 36, label: 'end: square 36' },
        { id: 'c', value: 4, label: 'min dice rolls ≈ 4' },
        { id: 'd', value: 6, label: 'board size: 6×6' },
      ],
      target: 37,
      instruction: 'Snakes and Ladders 6×6: select the START and END squares for the minimum-moves BFS.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'This is a shortest-path problem on a graph where nodes are cell numbers 1..n² and edges connect cell s to cells s+1..s+6 (with board[r][c] overrides for snakes/ladders).', xpCost: 0 },
      { id: 2, text: 'The hardest part is the coordinate mapping. Cell number s (1-indexed, bottom-left start, boustrophedon): row from bottom = (s-1)/n, col depends on row parity. Trace through carefully.', xpCost: 0 },
      { id: 3, text: 'function numToPos(s, n): row = n-1-Math.floor((s-1)/n); rowFromBottom = Math.floor((s-1)/n); col = rowFromBottom%2===0 ? (s-1)%n : n-1-(s-1)%n. If board[row][col]!==-1, jump to that value.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'n=6 board. BFS start: queue=[(1, moves=0)], visited={1}.',
        state: { queue: [[1,0]], visited: [1] },
        annotation: 'Start at cell 1, 0 moves',
      },
      {
        id: 2,
        description: 'Process cell 1. Roll dice 1-6 → land on cells 2-7. Convert each to (row,col). Cell 2→board has no snake/ladder, cell 3→board[-1]→stay at 3, etc. Enqueue non-visited destinations.',
        state: { processing: 1, nextCells: [2,3,4,5,6,7] },
        activeNodes: ['1'],
        annotation: 'Explore all 6 dice outcomes from cell 1',
      },
      {
        id: 3,
        description: 'Cell 7: convert to position, board has no special value. Cell 2: board cell value might be 35 (ladder) → jump to 35. Enqueue 35 instead of 2.',
        state: { cell: 2, boardValue: 35, enqueue: 35 },
        activeNodes: ['2'],
        annotation: 'Ladder at cell 2 → jump to 35',
      },
      {
        id: 4,
        description: 'After BFS level 1 (moves=1), enqueue destinations. Continue BFS. At some level, BFS processes a cell from which cell 36 (n²) is reachable.',
        state: { movesCount: 'growing', goal: 36 },
        annotation: 'BFS finds shortest path level by level',
      },
      {
        id: 5,
        description: 'When we dequeue cell 36 (n²=36) or any cell with board value 36, return moves. Answer for the example board: 4 moves.',
        state: { result: 4 },
        annotation: 'Minimum moves = 4',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(n²)',
      timeExplanation: 'Board has n² cells; each cell processed at most once in BFS.',
      spaceExplanation: 'Visited set and queue both O(n²) in the worst case.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function snakesAndLadders(board) {
  const n = board.length;
  const total = n * n;

  // Convert 1-indexed cell number to board value
  function cellValue(s) {
    const rowFromBottom = Math.floor((s - 1) / n);
    const col = rowFromBottom % 2 === 0
      ? (s - 1) % n
      : n - 1 - (s - 1) % n;
    const row = n - 1 - rowFromBottom;
    const val = board[row][col];
    return val === -1 ? s : val;
  }

  const visited = new Set([1]);
  const queue = [[1, 0]]; // [cell, moves]

  while (queue.length) {
    const [cell, moves] = queue.shift();
    if (cell === total) return moves;

    for (let dice = 1; dice <= 6; dice++) {
      const next = Math.min(cell + dice, total);
      const dest = cellValue(next);
      if (!visited.has(dest)) {
        visited.add(dest);
        queue.push([dest, moves + 1]);
      }
    }
  }

  return -1;
}`,
      },
      {
        language: 'python',
        code: `from collections import deque

def snakesAndLadders(board):
    n = len(board)
    total = n * n

    def cell_value(s):
        row_from_bottom = (s - 1) // n
        col = (s - 1) % n if row_from_bottom % 2 == 0 else n - 1 - (s - 1) % n
        row = n - 1 - row_from_bottom
        val = board[row][col]
        return val if val != -1 else s

    visited = {1}
    queue = deque([(1, 0)])

    while queue:
        cell, moves = queue.popleft()
        if cell == total:
            return moves
        for dice in range(1, 7):
            nxt = min(cell + dice, total)
            dest = cell_value(nxt)
            if dest not in visited:
                visited.add(dest)
                queue.append((dest, moves + 1))

    return -1`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS with memoization, but DFS does not guarantee shortest path — could revisit cells and give wrong answer.',
        complexity: { time: 'O(n²)', space: 'O(n²)', timeExplanation: 'DFS with memo visits each cell once', spaceExplanation: 'Call stack and memo table', visualization: 'quadratic' },
      },
      optimized: {
        description: 'BFS guarantees shortest path. The key challenge is the boustrophedon coordinate mapping.',
        complexity: { time: 'O(n²)', space: 'O(n²)', timeExplanation: 'BFS visits each of n² cells once', spaceExplanation: 'Visited set and queue', visualization: 'quadratic' },
      },
      followUps: [
        'What if you can roll a die with 1..k faces?',
        'What if some cells are blocked?',
        'Return the actual path (sequence of cells), not just the count',
      ],
      edgeCases: [
        'board[0][0] == n² — but that cell is not reachable with correct BFS (start from 1, end at n²)',
        'All cells are -1 (no snakes/ladders) — pure dice problem',
        'Unreachable board → return -1 (shouldn\'t happen on valid boards)',
        'Snake at cell n² — after landing, you teleport away from the goal',
      ],
      commonMistakes: [
        'Off-by-one in the boustrophedon mapping — most common source of bugs',
        'Applying snake/ladder to the starting cell (cell 1) at initialization',
        'Not capping "next" at total when cell + dice > n²',
        'Visiting "next" before applying snake/ladder — should enqueue the destination (after teleport), not the landing cell',
      ],
      interviewerTips: [
        'Walk through the coordinate conversion slowly — it is the crux of the problem',
        'BFS is the right approach because we want minimum number of moves (levels = moves)',
        'Practice the boustrophedon mapping on paper with a small n=3 example before coding',
      ],
    },
    codeChallenge: {
      functionName: 'snakesAndLadders',
      starterCode: {
        javascript: `/**
 * @param {number[][]} board
 * @return {number}
 */
function snakesAndLadders(board) {
  // Your solution here
}`,
      },
      testCases: [
        {
          input: [[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]],
          expected: 4,
          description: 'Standard 6×6 board — answer is 4',
        },
        { input: [[[-1,-1],[-1,3]]], expected: 1, description: '2×2 board: ladder at cell 2→3, one move wins' },
        { input: [[[-1,-1],[-1,-1]]], expected: 1, description: '2×2 no snakes/ladders, one move to win' },
        {
          input: [[[-1,-1,-1],[1,-1,-1],[-1,-1,-1]]],
          expected: 3,
          description: '3×3 board with snake at cell 7 back to 1',
        },
        {
          input: [[[-1,-1,-1,-1,-1,-1],[11,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1]]],
          expected: 3,
          description: '6×6 board with ladder at cell 7→11',
        },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['course-schedule'],
    relatedPatterns: ['BFS Shortest Path', 'Coordinate Mapping', 'Graph on Grid'],
    intuitionSummary: 'BFS on linearized cell numbers. The tricky part is converting cell numbers to board coordinates in boustrophedon order.',
    patternName: 'BFS with Coordinate Mapping',
  },

  // ─── 10. Minimum Genetic Mutation (433) ──────────────────────────────────
  {
    id: 'minimum-genetic-mutation',
    slug: 'minimum-genetic-mutation',
    leetcodeNumber: 433,
    title: 'Minimum Genetic Mutation',
    category: 'graph',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['graph', 'bfs', 'string', 'shortest-path'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Uber', 'LinkedIn'],
    descriptions: {
      explorer: 'Change a gene string one character at a time to reach a target. Each intermediate string must exist in a "bank". Find the minimum changes needed!',
      engineer: 'BFS where each gene string is a node. From current string, try all 8-position × 4-character mutations. If the mutated string is in the bank and not yet visited, add to queue. BFS level = mutations count.',
      interview: 'Classic BFS shortest transformation sequence (like Word Ladder). Nodes = gene strings in the bank, edges = single character mutations. Level-order BFS gives minimum mutations.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'AACCGGTT→AACCGGTA: 1 mutation' },
        { id: 'b', value: 2, label: 'AACCGGTA→AAACGGTA: 2nd mutation (total=2)' },
        { id: 'c', value: 3, label: 'wrong path: 3 mutations' },
        { id: 'd', value: 0, label: 'start: no mutations yet' },
      ],
      target: 3,
      instruction: 'Gene mutation: "AACCGGTT"→"AAACGGTA". Select the 2 intermediate mutations in the minimum path.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Model as a graph: each gene string is a node. Two nodes are connected if they differ by exactly one character. Find the shortest path from start to end using only nodes in the bank.', xpCost: 0 },
      { id: 2, text: 'BFS from start. For each current string, generate all possible single-character mutations over the 4 valid bases (A, C, G, T). If the mutation is in the bank and unvisited, enqueue it.', xpCost: 0 },
      { id: 3, text: 'Use a Set for the bank for O(1) lookup. Keep a visited set to avoid revisiting. Track the BFS level (mutations count). Return the level when you dequeue the end string, or -1 if queue empties.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'start="AACCGGTT", end="AAACGGTA", bank=["AACCGGTA","AACCGCTA","AAACGGTA"]. BFS from start. Queue=[("AACCGGTT",0)], visited={"AACCGGTT"}.',
        state: { queue: [['AACCGGTT',0]], visited: ['AACCGGTT'], bankSet: ['AACCGGTA','AACCGCTA','AAACGGTA'] },
        annotation: 'Init BFS at start gene',
      },
      {
        id: 2,
        description: 'Process ("AACCGGTT", 0). Try all single mutations. "AACCGGTA" (pos 7: T→A) is in bank, unvisited → enqueue ("AACCGGTA", 1).',
        state: { processing: 'AACCGGTT', found: 'AACCGGTA', newMoves: 1 },
        activeNodes: ['AACCGGTT','AACCGGTA'],
        annotation: 'Mutation 1: AACCGGTT → AACCGGTA',
      },
      {
        id: 3,
        description: 'Process ("AACCGGTA", 1). Try all single mutations. "AACCGCTA" (pos 5: G→C) in bank, unvisited → enqueue ("AACCGCTA", 2).',
        state: { processing: 'AACCGGTA', found: 'AACCGCTA', newMoves: 2 },
        activeNodes: ['AACCGGTA','AACCGCTA'],
        annotation: 'Mutation 2: AACCGGTA → AACCGCTA',
      },
      {
        id: 4,
        description: 'Process ("AACCGCTA", 2). Mutation "AAACGCTA" not in bank. Mutation "AACCGCTA"→"AAACGGTA"? Check: pos 2 C→A gives "AAACGCTA" not "AAACGGTA". Try pos 5 C→G → "AACCGGTA" (visited). Try "AAACGCTA" and others. Eventually find path via another mutation.',
        state: { processing: 'AACCGCTA', exploring: true },
        activeNodes: ['AACCGCTA'],
        annotation: 'Exploring mutations from AACCGCTA',
      },
      {
        id: 5,
        description: 'BFS continues. "AAACGGTA" is eventually reached. When we dequeue it and it equals end, return moves=2.',
        state: { result: 2, path: ['AACCGGTT','AACCGGTA','AAACGGTA'] },
        annotation: 'Answer: 2 mutations',
      },
    ],
    complexity: {
      time: 'O(L × 4 × N)',
      space: 'O(N)',
      timeExplanation: 'N = bank size, L = gene length (8). For each of N nodes, try L×4 mutations with O(L) string comparison. Total O(N×L²) but L=8 is constant so effectively O(N).',
      spaceExplanation: 'BFS queue and visited set hold at most N+1 gene strings.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function minMutation(startGene, endGene, bank) {
  const bankSet = new Set(bank);
  if (!bankSet.has(endGene)) return -1;

  const bases = ['A', 'C', 'G', 'T'];
  const queue = [[startGene, 0]];
  const visited = new Set([startGene]);

  while (queue.length) {
    const [gene, mutations] = queue.shift();
    if (gene === endGene) return mutations;

    for (let i = 0; i < gene.length; i++) {
      for (const base of bases) {
        if (base === gene[i]) continue;
        const mutated = gene.slice(0, i) + base + gene.slice(i + 1);
        if (bankSet.has(mutated) && !visited.has(mutated)) {
          visited.add(mutated);
          queue.push([mutated, mutations + 1]);
        }
      }
    }
  }

  return -1;
}`,
      },
      {
        language: 'python',
        code: `from collections import deque

def minMutation(startGene, endGene, bank):
    bank_set = set(bank)
    if endGene not in bank_set:
        return -1

    queue = deque([(startGene, 0)])
    visited = {startGene}

    while queue:
        gene, mutations = queue.popleft()
        if gene == endGene:
            return mutations
        for i in range(len(gene)):
            for base in 'ACGT':
                if base == gene[i]:
                    continue
                mutated = gene[:i] + base + gene[i+1:]
                if mutated in bank_set and mutated not in visited:
                    visited.add(mutated)
                    queue.append((mutated, mutations + 1))

    return -1`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all permutations of mutation sequences from bank. Factorial time — completely impractical.',
        complexity: { time: 'O(N!)', space: 'O(N)', timeExplanation: 'Permutation generation', spaceExplanation: 'Recursion stack', visualization: 'quadratic' },
      },
      optimized: {
        description: 'BFS guarantees minimum mutations. For each gene, generate all L×3 single-character mutations and check bank membership in O(1).',
        complexity: { time: 'O(N × L²)', space: 'O(N × L)', timeExplanation: 'N nodes, L positions × 3 mutations per position, O(L) string construction', spaceExplanation: 'Queue and visited set store gene strings of length L', visualization: 'linear' },
      },
      followUps: [
        'Word Ladder (LC 127) — identical algorithm, just with English words',
        'Word Ladder II (LC 126) — return all shortest paths (BFS + backtracking)',
        'Bidirectional BFS for Word Ladder — can reduce search space significantly',
      ],
      edgeCases: [
        'endGene not in bank → return -1 immediately',
        'startGene === endGene → return 0',
        'Empty bank → return -1',
        'startGene one mutation away from endGene which is in bank → return 1',
      ],
      commonMistakes: [
        'Not checking if endGene is in the bank upfront',
        'Marking visited when dequeuing instead of when enqueuing — can enqueue the same node multiple times',
        'Forgetting to skip the same base (no-op mutation)',
      ],
      interviewerTips: [
        'This is structurally identical to Word Ladder — if you know one, you know the other',
        'Bidirectional BFS is a great follow-up optimization: search from both ends, meet in the middle',
        'The bank can be treated as the set of valid intermediate AND final nodes; endGene must be in it',
      ],
    },
    codeChallenge: {
      functionName: 'minMutation',
      starterCode: {
        javascript: `/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
function minMutation(startGene, endGene, bank) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['AACCGGTT', 'AACCGGTA', ['AACCGGTA']], expected: 1, description: 'One mutation, direct' },
        { input: ['AACCGGTT', 'AAACGGTA', ['AACCGGTA','AACCGCTA','AAACGGTA']], expected: 2, description: 'Two mutations' },
        { input: ['AACCGGTT', 'AACCGGTA', []], expected: -1, description: 'Empty bank — impossible' },
        { input: ['AACCGGTT', 'AACCGGTT', ['AACCGGTT']], expected: 0, description: 'Start equals end' },
        { input: ['AAAAACCC', 'AACCCCCC', ['AAAACCCC','AAACCCCC','AACCCCCC']], expected: 3, description: 'Three-step mutation path' },
      ],
      unorderedResult: false,
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['course-schedule'],
    relatedPatterns: ['BFS Shortest Path', 'String Mutation Graph', 'Word Ladder Pattern'],
    intuitionSummary: 'BFS on an implicit graph where nodes are gene strings and edges connect strings differing by exactly one character. BFS level = minimum mutations.',
    patternName: 'BFS on Implicit String Graph',
  },
];

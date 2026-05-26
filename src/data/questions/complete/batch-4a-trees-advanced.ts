import type { QuestionConfig } from '@/types/question';

export const TREES_ADVANCED_COMPLETE: QuestionConfig[] = [
  // ─── 1. Validate Binary Search Tree (98) ─────────────────────────────────
  {
    id: 'validate-bst',
    slug: 'validate-binary-search-tree',
    leetcodeNumber: 98,
    title: 'Validate Binary Search Tree',
    category: 'bst',
    difficulty: 'medium',
    engineType: 'tree',
    tags: ['bst', 'dfs', 'recursion', 'range-propagation'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Is this tree a valid BST? Every node must be strictly greater than all left ancestors and strictly less than all right ancestors!',
      engineer: 'DFS with propagated (min, max) bounds. For each node: value must be in (min, max). Left child inherits max=node.val; right child inherits min=node.val.',
      interview: 'O(n) time, O(h) space. Pass a valid range down the recursion. The classic mistake is only comparing a node to its direct parent — you must enforce the full ancestral constraint.',
    },
    puzzleConfig: {
      nodes: [
        { val: 5, left: 3, right: 7, x: 0.5, y: 0 },
        { val: 3, left: 1, right: 4, x: 0.25, y: 1 },
        { val: 7, left: 6, right: 8, x: 0.75, y: 1 },
        { val: 1, left: null, right: null, x: 0.125, y: 2 },
        { val: 4, left: null, right: null, x: 0.375, y: 2 },
        { val: 6, left: null, right: null, x: 0.625, y: 2 },
        { val: 8, left: null, right: null, x: 0.875, y: 2 },
      ],
      p: 1,
      q: 4,
      instruction: 'Valid BST [5,3,7,1,4,6,8]: find the Lowest Common Ancestor (LCA) of nodes 1 and 4. In a BST, if both targets are less than current node, go left; if both greater, go right.',
      mode: 'lca',
      correctAnswer: 3,
    },
    hints: [
      { id: 1, text: 'Comparing each node only to its direct children is not enough. A node in the right subtree of an ancestor must also be greater than that ancestor.', xpCost: 0 },
      { id: 2, text: 'Pass a (min, max) range down the recursion. A node is valid only if min < node.val < max. Initially min = -Infinity and max = +Infinity.', xpCost: 0 },
      { id: 3, text: 'When going left, the new max becomes node.val. When going right, the new min becomes node.val. Recurse with the updated range.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [5,1,4,null,null,3,6]. Call validate(5, -Inf, +Inf). 5 is in range — OK.',
        state: { node: 5, min: '-Inf', max: '+Inf', valid: true },
        activeNodes: ['5'],
        annotation: '-Inf < 5 < +Inf ✓',
      },
      {
        id: 2,
        description: 'Go left to node 1. Call validate(1, -Inf, 5). 1 < 5 — OK.',
        state: { node: 1, min: '-Inf', max: 5, valid: true },
        activeNodes: ['1'],
        annotation: '-Inf < 1 < 5 ✓',
      },
      {
        id: 3,
        description: 'Go right from root to node 4. Call validate(4, 5, +Inf). 4 is NOT > 5 — INVALID!',
        state: { node: 4, min: 5, max: '+Inf', valid: false },
        activeNodes: ['4'],
        annotation: '4 < 5 (min) ✗ — return false',
      },
      {
        id: 4,
        description: 'validate(4, 5, +Inf) returns false. The BST is invalid.',
        state: { result: false },
        annotation: 'Return false ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Every node is visited exactly once.',
      spaceExplanation: 'Recursion stack depth equals the height h of the tree; O(log n) balanced, O(n) skewed.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left,  min,      node.val) &&
           validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Inorder traversal collecting all values, then check the resulting array is strictly increasing.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Full traversal plus linear scan of collected values', spaceExplanation: 'Array storing all n node values', visualization: 'linear' },
      },
      optimized: {
        description: 'DFS with (min, max) range propagation. No extra array needed; invalid nodes are caught as soon as they are visited.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Single pass visiting every node once', spaceExplanation: 'Recursion stack proportional to height', visualization: 'linear' },
      },
      followUps: [
        'Recover Binary Search Tree (LC 99) — two nodes are swapped; fix in-place',
        'Convert Sorted Array to BST (LC 108)',
        'Can you validate iteratively using an explicit stack?',
        'What changes if duplicates are allowed (<=, >= instead of strict)?',
      ],
      edgeCases: [
        'Single node — always valid',
        'Node equal to its bound (e.g. node.val === max) — invalid, must be strict',
        'Negative values and Integer.MIN/MAX overflow in other languages',
        'Very deep skewed tree — stack overflow risk with naive recursion',
      ],
      commonMistakes: [
        'Comparing node only to direct parent children instead of propagating bounds',
        'Using <= or >= when the problem requires strictly less/greater',
        'Not handling null nodes (base case must return true)',
      ],
      interviewerTips: [
        'Ask: are duplicates allowed? This changes the strict inequalities',
        'Mention inorder approach as an alternative — same complexity but uses O(n) space',
        'The range-propagation approach is cleaner and preferred in interviews',
      ],
    },
    codeChallenge: {
      functionName: 'isValidBST',
      starterCode: {
        javascript: `/**
 * Nodes are provided as a level-order array where null means no node.
 * A TreeNode is built for you internally; you receive the root.
 * @param {number[]} levelOrder
 * @return {boolean}
 */
function isValidBST(levelOrder) {
  // Build tree from level-order array, then validate
  // Your solution here
}`,
      },
      testCases: [
        { input: [[2, 1, 3]], expected: true, description: 'Valid BST [2,1,3]' },
        { input: [[5, 1, 4, null, null, 3, 6]], expected: false, description: 'Invalid: right child 4 < root 5' },
        { input: [[1]], expected: true, description: 'Single node' },
        { input: [[5, 4, 6, null, null, 3, 7]], expected: false, description: 'Invalid: 3 < root 5 in right subtree' },
        { input: [[3, 1, 5, null, 2, null, null]], expected: true, description: 'Valid BST with null nodes' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 130 },
    prerequisites: ['lca-bst'],
    relatedPatterns: ['DFS Range Propagation', 'Inorder Traversal'],
    intuitionSummary: 'Propagate valid (min, max) bounds down the tree. A node is valid only when its value falls strictly inside the inherited range.',
    patternName: 'BST Range Propagation',
  },

  // ─── 2. Kth Smallest Element in a BST (230) ──────────────────────────────
  {
    id: 'kth-smallest-bst',
    slug: 'kth-smallest-element-in-a-bst',
    leetcodeNumber: 230,
    title: 'Kth Smallest Element in a BST',
    category: 'bst',
    difficulty: 'medium',
    engineType: 'tree',
    tags: ['bst', 'inorder', 'dfs', 'recursion'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'LinkedIn'],
    descriptions: {
      explorer: 'An inorder traversal of a BST visits nodes in sorted order — count to k and stop!',
      engineer: 'Iterative inorder with an explicit stack. Decrement a counter on each visit; when it hits zero the current node is the answer.',
      interview: 'O(h+k) time with iterative inorder. The BST inorder property guarantees sorted visits. Early exit saves time versus full traversal.',
    },
    puzzleConfig: {
      nodes: [
        { val: 3, left: 1, right: 4, x: 0.5, y: 0 },
        { val: 1, left: null, right: 2, x: 0.25, y: 1 },
        { val: 4, left: null, right: null, x: 0.75, y: 1 },
        { val: 2, left: null, right: null, x: 0.375, y: 2 },
      ],
      p: 1,
      q: 2,
      instruction: 'BST [3,1,4,null,2], k=1: inorder traversal visits nodes in sorted order. Find the LCA of the 1st and 2nd smallest nodes. (Hint: LCA = the 1st smallest = kth smallest for k=1)',
      mode: 'lca',
      correctAnswer: 1,
    },
    hints: [
      { id: 1, text: 'An inorder traversal (left → node → right) of a BST always visits nodes in ascending sorted order.', xpCost: 0 },
      { id: 2, text: 'You do not need to collect all values. Keep a counter and decrement on each visit. When the counter reaches 0, return the current value.', xpCost: 0 },
      { id: 3, text: 'Use an iterative inorder with an explicit stack to avoid O(n) recursion space and to exit early as soon as the kth element is found.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [3,1,4,null,2], k=1. Start iterative inorder. Push leftmost path: push 3, push 1.',
        state: { stack: [3, 1], k: 1, count: 0 },
        activeNodes: ['3', '1'],
        annotation: 'Push left spine',
      },
      {
        id: 2,
        description: 'Pop 1 (no left child). count becomes 1. k=1 → count === k! Return 1.',
        state: { stack: [3], popped: 1, count: 1, k: 1 },
        activeNodes: ['1'],
        annotation: 'count=1 === k=1 → return 1 ✓',
      },
      {
        id: 3,
        description: 'Visit right subtree of 1: push 2. Would pop 2 (count=2), then 3 (count=3), then 4 (count=4) — but we already returned.',
        state: { result: 1 },
        annotation: 'Early exit — no further traversal needed',
      },
      {
        id: 4,
        description: 'Answer: kthSmallest([3,1,4,null,2], 1) = 1.',
        state: { result: 1 },
        annotation: 'Return 1 ✓',
      },
    ],
    complexity: {
      time: 'O(h + k)',
      space: 'O(h)',
      timeExplanation: 'Traverse h levels to reach the leftmost node, then k steps to count up to the answer.',
      spaceExplanation: 'Stack holds at most h nodes (height of the tree) at any time.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function kthSmallest(root, k) {
  const stack = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    // Go as far left as possible
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    k--;
    if (k === 0) return curr.val; // kth smallest found
    curr = curr.right;
  }

  return -1; // k is out of bounds (should not happen per constraints)
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all node values via any traversal into an array, sort it (or use inorder for free sort), then return index k-1.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Full traversal; sorting is free because inorder is already sorted', spaceExplanation: 'Array of all n values', visualization: 'linear' },
      },
      optimized: {
        description: 'Iterative inorder traversal with early exit when the counter reaches k.',
        complexity: { time: 'O(h + k)', space: 'O(h)', timeExplanation: 'h to reach leftmost, k more steps to find answer', spaceExplanation: 'Stack stores path from root to current node', visualization: 'logarithmic' },
      },
      followUps: [
        'What if the BST is modified frequently and you need to query kth smallest often? (Augment each node with subtree size)',
        'Kth Largest Element in a BST — traverse in reverse inorder',
        'Convert BST to Greater Sum Tree (LC 538)',
      ],
      edgeCases: [
        'k = 1 — return the minimum (leftmost) node',
        'k = n — return the maximum (rightmost) node',
        'Tree with a single node and k = 1',
      ],
      commonMistakes: [
        'Collecting all values into an array and sorting — wastes O(n) space',
        'Off-by-one: decrementing before visiting vs after',
        'Not handling the iterative stack correctly when curr.right is null',
      ],
      interviewerTips: [
        'Mention the follow-up about augmenting nodes with subtree sizes for O(log n) repeated queries',
        'Clarify whether BST has duplicate values',
        'The iterative version demonstrates understanding of how recursion maps to an explicit stack',
      ],
    },
    codeChallenge: {
      functionName: 'kthSmallest',
      starterCode: {
        javascript: `/**
 * @param {number[]} levelOrder - level-order array (null = no node)
 * @param {number} k
 * @return {number}
 */
function kthSmallest(levelOrder, k) {
  // Build tree, then find kth smallest via inorder
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3, 1, 4, null, 2], 1], expected: 1, description: 'k=1 in [3,1,4,null,2]' },
        { input: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3, description: 'k=3 in deeper BST' },
        { input: [[1], 1], expected: 1, description: 'Single node k=1' },
        { input: [[3, 1, 4, null, 2], 3], expected: 3, description: 'k=3 gives root value' },
        { input: [[5, 3, 6, 2, 4, null, null, 1], 1], expected: 1, description: 'k=1 in deeper BST' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 130 },
    prerequisites: ['validate-bst'],
    relatedPatterns: ['Inorder Traversal', 'Iterative DFS'],
    intuitionSummary: 'Inorder traversal of a BST is sorted. Count nodes visited; the kth is your answer. Use iterative inorder for O(h+k) early exit.',
    patternName: 'Inorder BST Enumeration',
  },

  // ─── 3. Construct Binary Tree from Preorder and Inorder (105) ─────────────
  {
    id: 'construct-from-preorder-inorder',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    leetcodeNumber: 105,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['binary-tree', 'divide-conquer', 'recursion', 'hashmap'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Given the preorder and inorder traversals of a tree, reconstruct the original tree! The first element of preorder is always the root.',
      engineer: 'Preorder[0] is the root. Find its index in inorder — everything left is the left subtree, everything right is the right subtree. Recurse on each half.',
      interview: 'O(n) with a HashMap for inorder index lookups. Recursive divide-and-conquer: each call consumes preorder[preIdx++] as root and uses inorder to determine left/right subtree sizes.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'root: 3 (first of preorder)' },
        { id: 'b', value: 1, label: 'left subtree size: 1 element (just 9)' },
        { id: 'c', value: 3, label: 'right subtree size: 3 elements' },
        { id: 'd', value: 9, label: 'only element in left subtree' },
      ],
      target: 4,
      instruction: 'preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]: select the root value and its LEFT subtree size.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'In preorder traversal the root is always the first element. Use it to build the current root node.', xpCost: 0 },
      { id: 2, text: 'Find the root\'s index in the inorder array. Everything to the left of that index forms the left subtree; everything to the right forms the right subtree.', xpCost: 0 },
      { id: 3, text: 'Store inorder indices in a HashMap for O(1) lookup. Track a preorder index pointer (passed by reference or via a closure) that advances as you build each node.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]. preorder[0]=3 is root. Find 3 in inorder: index 1. Left subtree has 1 node, right has 3.',
        state: { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], root: 3, rootInorderIdx: 1 },
        activeNodes: ['3'],
        annotation: 'root=3, leftSize=1, rightSize=3',
      },
      {
        id: 2,
        description: 'Build left subtree: preorder[1]=9, inorder[0..0]=[9]. No children. Node 9 is a leaf.',
        state: { preIdx: 1, inorderSlice: [9], root: 9 },
        activeNodes: ['9'],
        annotation: 'Left child = 9 (leaf)',
      },
      {
        id: 3,
        description: 'Build right subtree: preorder[2]=20, inorder[2..4]=[15,20,7]. Find 20 at inorder index 1 of slice → left child from [15], right child from [7].',
        state: { preIdx: 2, inorderSlice: [15,20,7], root: 20, leftSize: 1, rightSize: 1 },
        activeNodes: ['20'],
        annotation: 'Right subtree root=20',
      },
      {
        id: 4,
        description: 'Left of 20: preorder[3]=15 → leaf. Right of 20: preorder[4]=7 → leaf. Tree complete.',
        state: { result: [3,9,20,null,null,15,7] },
        annotation: 'Tree reconstructed ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Each node is processed once. HashMap gives O(1) root-index lookup instead of O(n) scan.',
      spaceExplanation: 'O(n) for the HashMap and O(h) for the recursion stack; HashMap dominates.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function buildTree(preorder, inorder) {
  const inorderMap = new Map();
  inorder.forEach((val, idx) => inorderMap.set(val, idx));

  let preIdx = 0;

  function build(left, right) {
    if (left > right) return null;

    const rootVal = preorder[preIdx++];
    const node = { val: rootVal, left: null, right: null };

    const mid = inorderMap.get(rootVal);
    node.left  = build(left, mid - 1);
    node.right = build(mid + 1, right);

    return node;
  }

  return build(0, inorder.length - 1);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursively scan the inorder array for the root on every call — O(n) per level giving O(n²) overall.',
        complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'Linear scan of inorder at each of n recursive calls', spaceExplanation: 'Recursion stack', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Precompute a HashMap from value to inorder index. Advance a global preorder index pointer. Each build call is O(1) excluding children.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'n nodes each processed in O(1) with the HashMap', spaceExplanation: 'HashMap of size n plus recursion stack', visualization: 'linear' },
      },
      followUps: [
        'Construct from postorder and inorder (LC 106) — similar, but root is last element of postorder',
        'Construct from preorder and postorder (LC 889) — result may not be unique',
        'Serialize/Deserialize a binary tree (LC 297)',
      ],
      edgeCases: [
        'Single node tree',
        'Left-skewed tree (every node only has a left child)',
        'Right-skewed tree',
        'All nodes have the same value — invalid input per problem constraints',
      ],
      commonMistakes: [
        'Using array slice instead of index boundaries — creates O(n²) copies',
        'Forgetting to advance the preorder index (off-by-one)',
        'Building right subtree before left subtree — breaks preorder consumption order',
      ],
      interviewerTips: [
        'Ask: are all values unique? (The problem guarantees it; duplicates would break the HashMap approach)',
        'Explain why left subtree must be built before right — preorder is root,left,right',
        'Mention that you can derive the size of each subtree from the inorder index',
      ],
    },
    codeChallenge: {
      functionName: 'buildTree',
      starterCode: {
        javascript: `/**
 * Build tree from preorder and inorder arrays.
 * Return the result serialized as a level-order string for comparison,
 * e.g. "[3,9,20,null,null,15,7]"
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {string}
 */
function buildTree(preorder, inorder) {
  // Your solution here — build the tree and serialize to level-order string
}`,
      },
      testCases: [
        { input: [[3,9,20,15,7], [9,3,15,20,7]], expected: '[3,9,20,null,null,15,7]', description: 'Standard 5-node tree' },
        { input: [[-1], [-1]], expected: '[-1]', description: 'Single node' },
        { input: [[1,2], [2,1]], expected: '[1,2]', description: 'Root with left child only' },
        { input: [[1,2], [1,2]], expected: '[1,null,2]', description: 'Root with right child only' },
        { input: [[3,9,20,15,7],[9,3,15,20,7]], expected: '[3,9,20,null,null,15,7]', description: 'Full balanced tree' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['validate-bst'],
    relatedPatterns: ['Divide and Conquer', 'Recursive Tree Construction'],
    intuitionSummary: 'Preorder\'s first element is always the root. Use a HashMap on inorder to find that root\'s position, splitting remaining nodes into left and right subtrees.',
    patternName: 'Preorder/Inorder Tree Construction',
  },

  // ─── 4. Binary Tree Maximum Path Sum (124) ───────────────────────────────
  {
    id: 'binary-tree-max-path',
    slug: 'binary-tree-maximum-path-sum',
    leetcodeNumber: 124,
    title: 'Binary Tree Maximum Path Sum',
    category: 'binary-tree',
    difficulty: 'hard',
    engineType: 'tree',
    tags: ['binary-tree', 'dfs', 'recursion', 'dynamic-programming'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Find the path through the tree with the largest sum. A path can start and end at any node, but it cannot fork — each node is used at most once!',
      engineer: 'Post-order DFS. Each node returns the max one-sided gain (max(0, left) + val or max(0, right) + val). At each node, update a global max using both sides simultaneously.',
      interview: 'O(n) DFS. The key insight: a path through a node can "bend" — using both children — but only if doing so increases the sum. The function returns the single-direction gain to the parent.',
    },
    puzzleConfig: {
      nodes: [
        { val: -10, left: 9, right: 20, x: 0.5, y: 0 },
        { val: 9, left: null, right: null, x: 0.25, y: 1 },
        { val: 20, left: 15, right: 7, x: 0.75, y: 1 },
        { val: 15, left: null, right: null, x: 0.625, y: 2 },
        { val: 7, left: null, right: null, x: 0.875, y: 2 },
      ],
      p: 15,
      q: 7,
      instruction: '[-10,9,20,null,null,15,7]: max path sum = 15+20+7 = 42. The optimal path passes through the LCA of nodes 15 and 7. Find that LCA.',
      mode: 'lca',
      correctAnswer: 20,
    },
    hints: [
      { id: 1, text: 'A path can curve through any node using both its left and right children. However, the caller (parent) can only use one branch — the higher-gain side.', xpCost: 0 },
      { id: 2, text: 'At each node: left_gain = max(0, dfs(left)); right_gain = max(0, dfs(right)). Update global_max = max(global_max, node.val + left_gain + right_gain).', xpCost: 0 },
      { id: 3, text: 'Return node.val + max(left_gain, right_gain) to the parent — you can only extend the path in one direction upward.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [-10,9,20,null,null,15,7]. DFS on leaves first (post-order).',
        state: { tree: [-10,9,20,null,null,15,7], globalMax: -Infinity },
        annotation: 'Post-order DFS',
      },
      {
        id: 2,
        description: 'Visit node 15 (leaf): left_gain=0, right_gain=0. Path through 15 = 15. globalMax=15. Return 15 to parent.',
        state: { node: 15, leftGain: 0, rightGain: 0, pathThroughNode: 15, globalMax: 15 },
        activeNodes: ['15'],
        annotation: 'globalMax=15',
      },
      {
        id: 3,
        description: 'Visit node 7 (leaf): path through 7 = 7. globalMax still 15. Return 7 to parent.',
        state: { node: 7, pathThroughNode: 7, globalMax: 15 },
        activeNodes: ['7'],
        annotation: 'Return 7',
      },
      {
        id: 4,
        description: 'Visit node 20: left_gain=15, right_gain=7. Path through 20 = 20+15+7=42. globalMax=42. Return 20+15=35 to parent.',
        state: { node: 20, leftGain: 15, rightGain: 7, pathThroughNode: 42, globalMax: 42, returnVal: 35 },
        activeNodes: ['20'],
        annotation: 'globalMax=42 ✓',
      },
      {
        id: 5,
        description: 'Visit node 9 and node -10. Node 9 contributes 9; path through -10 = -10+9+35=34 < 42. globalMax stays 42.',
        state: { globalMax: 42, result: 42 },
        annotation: 'Return 42 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Every node is visited exactly once in the post-order DFS.',
      spaceExplanation: 'Recursion stack depth equals tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxPathSum(root) {
  let globalMax = -Infinity;

  function dfs(node) {
    if (node === null) return 0;

    const leftGain  = Math.max(0, dfs(node.left));
    const rightGain = Math.max(0, dfs(node.right));

    // Path that curves through this node (cannot be extended further up)
    const pathThroughNode = node.val + leftGain + rightGain;
    globalMax = Math.max(globalMax, pathThroughNode);

    // Return the best single-direction gain for the parent
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return globalMax;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Enumerate all pairs of nodes and find the maximum-weight path between them using DFS — O(n²) time.',
        complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'n starting nodes each requiring an O(n) DFS', spaceExplanation: 'Recursion stack', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Single post-order DFS. At each node compute the local path sum using both children; return only the single-direction gain to the parent.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'One DFS visiting every node once', spaceExplanation: 'Recursion stack depth equals height', visualization: 'linear' },
      },
      followUps: [
        'Path Sum (LC 112) — does a root-to-leaf path sum equal target?',
        'Path Sum III (LC 437) — count paths summing to target (any start/end)',
        'Binary Tree Maximum Path Sum II — path must start at root',
        'What if node values can be very negative? (The max(0, gain) handles this)',
      ],
      edgeCases: [
        'All nodes have negative values — answer is the least negative single node',
        'Single node — answer is that node\'s value',
        'Left-skewed or right-skewed tree',
      ],
      commonMistakes: [
        'Returning left+right+val to the parent — this forks the path and is invalid',
        'Initialising globalMax to 0 instead of -Infinity — fails when all values are negative',
        'Not clamping gains to 0 with max(0, ...) — negative subtrees should be skipped',
      ],
      interviewerTips: [
        'The crux is explaining why the return value differs from the globalMax update',
        'Draw the "bent" path on a tree diagram to make the two uses of each node clear',
        'Always check the all-negative case first — it catches the 0-initialisation bug',
      ],
    },
    codeChallenge: {
      functionName: 'maxPathSum',
      starterCode: {
        javascript: `/**
 * @param {number[]} levelOrder - level-order array (null = no node)
 * @return {number}
 */
function maxPathSum(levelOrder) {
  // Build the tree, then find maximum path sum
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3]], expected: 6, description: '[1,2,3] path 2→1→3=6' },
        { input: [[-10, 9, 20, null, null, 15, 7]], expected: 42, description: 'Classic -10 tree: 15→20→7=42' },
        { input: [[-3]], expected: -3, description: 'Single negative node' },
        { input: [[2, -1]], expected: 2, description: 'Root better than root+negative child' },
        { input: [[1, -2, 3]], expected: 4, description: 'Best path uses right child: 1+3=4' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 80, coding: 180 },
    prerequisites: ['construct-from-preorder-inorder'],
    relatedPatterns: ['Post-Order DFS', 'Global State in DFS'],
    intuitionSummary: 'Post-order DFS where each node contributes at most one branch to its parent but can "bend" the path through both children to update the global maximum.',
    patternName: 'Path Sum with Global Max',
  },

  // ─── 5. Serialize and Deserialize Binary Tree (297) ──────────────────────
  {
    id: 'serialize-deserialize',
    slug: 'serialize-and-deserialize-binary-tree',
    leetcodeNumber: 297,
    title: 'Serialize and Deserialize Binary Tree',
    category: 'binary-tree',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['binary-tree', 'dfs', 'bfs', 'design', 'string'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'LinkedIn'],
    descriptions: {
      explorer: 'Convert a binary tree to a string and back again perfectly! You design both the format and the parser.',
      engineer: 'Preorder DFS serialization. Null nodes become "null" markers. Deserialization splits the string and recursively consumes tokens using a pointer/iterator.',
      interview: 'O(n) serialize and deserialize. Preorder with explicit null markers uniquely encodes any binary tree. Deserialize using an index pointer advanced as nodes are consumed.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'root: 1' },
        { id: 'b', value: 2, label: 'root left: 2' },
        { id: 'c', value: 3, label: 'root right: 3' },
        { id: 'd', value: 4, label: "3's left child: 4" },
      ],
      target: 3,
      instruction: 'Serialize [1,2,3,null,null,4,5]: in BFS (level-order) serialization, which TWO nodes appear first in the output?',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Preorder DFS naturally encodes the tree: record the root value, then recurse left, then right. Use a special token (e.g. "null") for absent nodes.', xpCost: 0 },
      { id: 2, text: 'Join all tokens with a comma. To deserialize, split on commas and use a pointer (or an iterator) that advances each time a token is consumed.', xpCost: 0 },
      { id: 3, text: 'If the current token is "null", return null and advance the pointer. Otherwise create a node with that value and recursively build its left and right children.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Serialize tree [1,2,3,null,null,4,5]. Preorder DFS: visit 1, recurse left.',
        state: { output: '1', node: 1 },
        activeNodes: ['1'],
        annotation: 'Serialize root=1',
      },
      {
        id: 2,
        description: 'Visit 2 (left child of 1). Its children are null. Output: "1,2,null,null".',
        state: { output: '1,2,null,null', node: 2 },
        activeNodes: ['2'],
        annotation: 'Node 2 + two nulls',
      },
      {
        id: 3,
        description: 'Visit 3 (right child of 1). Visit 4 (left of 3): "...,3,4,null,null". Visit 5 (right of 3): "...,5,null,null".',
        state: { output: '1,2,null,null,3,4,null,null,5,null,null' },
        activeNodes: ['3', '4', '5'],
        annotation: 'Full serialized string',
      },
      {
        id: 4,
        description: 'Deserialize: tokens=["1","2","null","null","3","4","null","null","5","null","null"]. ptr=0. Token "1" → create node 1, recurse left.',
        state: { tokens: ['1','2','null','null','3','4','null','null','5','null','null'], ptr: 0 },
        annotation: 'Deserialize from token stream',
      },
      {
        id: 5,
        description: 'Reconstruction complete. Tree matches original.',
        state: { result: [1,2,3,null,null,4,5] },
        annotation: 'Roundtrip successful ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Both serialize and deserialize visit every node exactly once.',
      spaceExplanation: 'Serialized string has O(n) tokens; recursion stack is O(h).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function serialize(root) {
  const parts = [];
  function dfs(node) {
    if (node === null) { parts.push('null'); return; }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return parts.join(',');
}

function deserialize(data) {
  const tokens = data.split(',');
  let idx = 0;

  function build() {
    const token = tokens[idx++];
    if (token === 'null') return null;
    const node = { val: parseInt(token), left: null, right: null };
    node.left  = build();
    node.right = build();
    return node;
  }

  return build();
}`,
        notes: 'For a coding challenge, serialize + deserialize can be tested together: deserialize(serialize(root)) should recreate an identical tree.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'BFS level-order serialization (similar to LeetCode\'s own format). Handles shape but is less elegant to parse.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Level-order visits every node', spaceExplanation: 'Queue can hold O(n) nodes', visualization: 'linear' },
      },
      optimized: {
        description: 'Preorder DFS with "null" markers. Simple recursive implementation; the preorder structure mirrors the deserialization recursion exactly.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single DFS for each operation', spaceExplanation: 'Serialized string plus recursion stack', visualization: 'linear' },
      },
      followUps: [
        'Serialize and Deserialize BST (LC 449) — can omit null markers because BST structure is constrained',
        'Encode N-ary Tree (LC 428)',
        'How would you handle very large trees (streaming serialization)?',
        'Design a more compact binary encoding instead of comma-separated ASCII',
      ],
      edgeCases: [
        'Empty tree (root = null) → serializes to "null"',
        'Tree with a single node',
        'Negative node values',
        'Very deep skewed tree — risk of recursion stack overflow for deserialize',
      ],
      commonMistakes: [
        'Forgetting to serialize null nodes — without them you cannot distinguish shapes',
        'Using a local index variable instead of a shared pointer — deserialization builds wrong trees',
        'Not handling the empty-tree case in deserialize',
      ],
      interviewerTips: [
        'Ask: any constraints on the serialization format? (Usually you can choose freely)',
        'Mention the BST variant where nulls can be omitted',
        'Discuss iterative BFS as an alternative and compare readability',
      ],
    },
    codeChallenge: {
      functionName: 'serializeDeserialize',
      starterCode: {
        javascript: `/**
 * Build a tree from levelOrder, serialize it, deserialize the string,
 * then serialize again. Both serialized strings must match.
 * @param {(number|null)[]} levelOrder
 * @return {string} the final serialized string (should equal the first)
 */
function serializeDeserialize(levelOrder) {
  // 1. Build tree from levelOrder
  // 2. serialize(tree) → string
  // 3. deserialize(string) → tree
  // 4. serialize(tree2) → string2
  // 5. return string2 (must equal step-2 result)
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, null, null, 4, 5]], expected: '1,2,null,null,3,4,null,null,5,null,null', description: 'Standard tree roundtrip' },
        { input: [[]], expected: 'null', description: 'Empty tree' },
        { input: [[1]], expected: '1,null,null', description: 'Single node' },
        { input: [[1, 2]], expected: '1,2,null,null,null', description: 'Root with left child only' },
        { input: [[1, null, 2]], expected: '1,null,2,null,null', description: 'Root with right child only' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 80, coding: 180 },
    prerequisites: ['binary-tree-max-path'],
    relatedPatterns: ['Preorder DFS', 'Tree Encoding'],
    intuitionSummary: 'Preorder DFS with explicit "null" tokens uniquely encodes any binary tree shape and values. Deserialization consumes tokens in the same preorder sequence.',
    patternName: 'Preorder Serialization with Null Markers',
  },

  // ─── 6. Flatten Binary Tree to Linked List (114) ─────────────────────────
  {
    id: 'flatten-binary-tree',
    slug: 'flatten-binary-tree-to-linked-list',
    leetcodeNumber: 114,
    title: 'Flatten Binary Tree to Linked List',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['binary-tree', 'dfs', 'in-place', 'morris-traversal'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Bloomberg'],
    descriptions: {
      explorer: 'Rearrange a binary tree in-place so that it looks like a right-skewed linked list following preorder order!',
      engineer: 'For each node: find the rightmost node of the left subtree, attach the right subtree there, then move the entire left subtree to the right. Repeat for every node top-down.',
      interview: 'O(n) time, O(1) space. Iterates top-down, re-wiring pointers without extra memory. This is essentially a Morris-like traversal.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'first node: 1 (root)' },
        { id: 'b', value: 2, label: 'second node: 2 (left child)' },
        { id: 'c', value: 5, label: 'fifth node: 5 (original right child)' },
        { id: 'd', value: 6, label: 'sixth/last node: 6' },
      ],
      target: 3,
      instruction: 'Flatten [1,2,5,3,4,null,6] to linked list (preorder). Select the FIRST TWO nodes in the result.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The flattened order is preorder: root, left subtree, right subtree. After flattening, every node\'s left pointer should be null.', xpCost: 0 },
      { id: 2, text: 'For each node with a left child: find the rightmost node of the left subtree. Attach the current right subtree to that rightmost node\'s right pointer.', xpCost: 0 },
      { id: 3, text: 'Then move node.left to node.right and set node.left = null. Advance to node.right and repeat. This runs in O(1) space with no recursion.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [1,2,5,3,4,null,6]. At node 1: left subtree root=2, right subtree root=5.',
        state: { curr: 1, leftSubtree: [2,3,4], rightSubtree: [5,null,6] },
        activeNodes: ['1'],
        annotation: 'Find rightmost of left',
      },
      {
        id: 2,
        description: 'Rightmost of left subtree (rooted at 2): traverse right spine of 2 → 3 has no right → 4 is rightmost. Attach right subtree (5) to 4.right.',
        state: { rightmost: 4, attachedRight: 5 },
        activeNodes: ['4'],
        annotation: '4.right = 5',
      },
      {
        id: 3,
        description: 'Move left subtree to right: 1.right = 2, 1.left = null. Now 1→2→3→4→5→6.',
        state: { curr: 1, tree: [1,null,2,null,3,null,4,null,5,null,6] },
        activeNodes: ['1', '2'],
        annotation: '1.right=2, 1.left=null',
      },
      {
        id: 4,
        description: 'Advance to node 2. Its left child is 3, right is 4. Find rightmost of left=3: rightmost is 3 itself. Attach 4 to 3.right, move 3 to 2.right.',
        state: { curr: 2, after: [1,null,2,null,3,null,4,null,5,null,6] },
        activeNodes: ['2', '3'],
        annotation: 'Flatten at node 2',
      },
      {
        id: 5,
        description: 'Continue advancing. Nodes 3,4,5,6 have no left children — nothing to do. Result: 1→2→3→4→5→6 (right-linked list).',
        state: { result: [1,null,2,null,3,null,4,null,5,null,6] },
        annotation: 'Flattened ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each node is visited at most twice (once as curr, once as rightmost). Total work is O(n).',
      spaceExplanation: 'No recursion stack or auxiliary data structures — purely pointer manipulation.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function flatten(root) {
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      // Find rightmost node of left subtree
      let rightmost = curr.left;
      while (rightmost.right !== null) {
        rightmost = rightmost.right;
      }

      // Attach current right subtree after the left subtree
      rightmost.right = curr.right;

      // Move left subtree to right
      curr.right = curr.left;
      curr.left  = null;
    }
    curr = curr.right;
  }
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all nodes in preorder into an array, then re-link them as a right-skewed list.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Full preorder traversal plus re-linking', spaceExplanation: 'Array of n node references', visualization: 'linear' },
      },
      optimized: {
        description: 'Morris-style in-place flattening. For each node with a left subtree, find the left subtree\'s rightmost node and re-wire in O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Each node touched at most twice', spaceExplanation: 'Constant extra pointers only', visualization: 'linear' },
      },
      followUps: [
        'Flatten to a doubly linked list (LC 426 — BST variant)',
        'Can you do it with a recursive post-order approach?',
        'What if the tree is very deep — would the recursive approach overflow the stack?',
      ],
      edgeCases: [
        'Root with no left child — advance directly to right',
        'Single node — nothing to flatten',
        'Already right-skewed tree — loop does nothing',
        'Left-skewed tree',
      ],
      commonMistakes: [
        'Not saving the right subtree before overwriting curr.right',
        'Finding the leftmost instead of the rightmost of the left subtree',
        'Forgetting to set curr.left = null after moving it',
      ],
      interviewerTips: [
        'Draw the pointer rewiring on paper — this problem is very visual',
        'Mention that the recursive reverse-postorder approach (right, left, root) is also O(n)/O(h)',
        'The O(1) space solution is the expected optimal answer in interviews',
      ],
    },
    codeChallenge: {
      functionName: 'flatten',
      starterCode: {
        javascript: `/**
 * Flatten the binary tree (given as level-order array) to a right-linked list.
 * Return the result as a level-order array of the flattened tree.
 * @param {(number|null)[]} levelOrder
 * @return {(number|null)[]}
 */
function flatten(levelOrder) {
  // Build tree, flatten in-place, then serialize back to level-order array
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 5, 3, 4, null, 6]], expected: [1,null,2,null,3,null,4,null,5,null,6], description: 'Standard 6-node tree' },
        { input: [[]], expected: [], description: 'Empty tree' },
        { input: [[1]], expected: [1], description: 'Single node' },
        { input: [[1, 2]], expected: [1, null, 2], description: 'Root with left child only' },
        { input: [[1, 2, 3]], expected: [1, null, 2, null, 3], description: 'Three-node tree' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['serialize-deserialize'],
    relatedPatterns: ['Morris Traversal', 'In-Place Tree Rewiring'],
    intuitionSummary: 'Iteratively find each left subtree\'s rightmost node and attach the right subtree there, then move the left branch to the right — O(1) space preorder flattening.',
    patternName: 'Morris-Style Tree Flattening',
  },

  // ─── 7. Binary Tree Zigzag Level Order Traversal (103) ───────────────────
  {
    id: 'binary-tree-zigzag',
    slug: 'binary-tree-zigzag-level-order-traversal',
    leetcodeNumber: 103,
    title: 'Binary Tree Zigzag Level Order Traversal',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['binary-tree', 'bfs', 'queue', 'level-order'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Bloomberg'],
    descriptions: {
      explorer: 'Traverse the tree level by level, but alternate direction each level — left-to-right on even levels, right-to-left on odd levels!',
      engineer: 'Standard BFS with a level parity flag. Collect each level into an array; if the current level index is odd, reverse the array before appending it to the result.',
      interview: 'O(n) BFS. The only difference from standard level-order is that odd-indexed levels are reversed. Track depth parity with a boolean or a counter.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 20, label: 'level 2 first (right-to-left): 20' },
        { id: 'b', value: 9, label: 'level 2 second (right-to-left): 9' },
        { id: 'c', value: 3, label: 'level 1 first: 3' },
        { id: 'd', value: 15, label: 'level 3 first: 15' },
      ],
      target: 29,
      instruction: '[3,9,20,null,null,15,7] zigzag: level 2 traverses RIGHT-TO-LEFT. Select the two nodes at level 2 in zigzag order.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Start with a standard BFS using a queue. Process all nodes of the current level before moving to the next.', xpCost: 0 },
      { id: 2, text: 'Collect each level\'s values into an array. After collecting a level, check whether the level index is odd. If so, reverse the array before adding it to the result.', xpCost: 0 },
      { id: 3, text: 'Alternatively use a deque: on even levels push to the back; on odd levels push to the front. This avoids an explicit reverse call.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [3,9,20,null,null,15,7]. BFS queue starts with [3]. Level 0 (left-to-right): collect [3]. Result: [[3]].',
        state: { queue: [9, 20], result: [[3]], level: 1 },
        activeNodes: ['3'],
        annotation: 'Level 0 → [3]',
      },
      {
        id: 2,
        description: 'Level 1 (right-to-left): dequeue 9 and 20. Collect [9,20] then reverse → [20,9]. Result: [[3],[20,9]].',
        state: { queue: [15, 7], result: [[3],[20,9]], level: 2 },
        activeNodes: ['9', '20'],
        annotation: 'Level 1 reversed → [20,9]',
      },
      {
        id: 3,
        description: 'Level 2 (left-to-right): dequeue 15 and 7. Collect [15,7] — no reverse. Result: [[3],[20,9],[15,7]].',
        state: { queue: [], result: [[3],[20,9],[15,7]], level: 3 },
        activeNodes: ['15', '7'],
        annotation: 'Level 2 → [15,7]',
      },
      {
        id: 4,
        description: 'Queue empty. Return [[3],[20,9],[15,7]].',
        state: { result: [[3],[20,9],[15,7]] },
        annotation: 'Return result ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Every node is enqueued and dequeued exactly once.',
      spaceExplanation: 'The queue holds at most the widest level, which can be O(n/2) = O(n) nodes.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function zigzagLevelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue  = [root];
  let   leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!leftToRight) level.reverse();
    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same as the optimal — BFS is already O(n). The "brute force" would be collecting all nodes with their (depth, position) metadata then sorting.',
        complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Collecting and sorting n nodes by depth then position', spaceExplanation: 'Array of all nodes with metadata', visualization: 'nlogn' },
      },
      optimized: {
        description: 'BFS with a left-to-right boolean toggled after each level. Reverse odd levels in-place.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single BFS pass; reverses are bounded by total nodes', spaceExplanation: 'Queue width at most O(n)', visualization: 'linear' },
      },
      followUps: [
        'Binary Tree Level Order Traversal (LC 102) — no zigzag',
        'Binary Tree Level Order Traversal II (LC 107) — bottom-up',
        'Can you do it with two stacks instead of a queue (classical deque approach)?',
      ],
      edgeCases: [
        'Empty tree → return []',
        'Single node → [[root.val]]',
        'Tree with only one side (left-skewed or right-skewed)',
      ],
      commonMistakes: [
        'Reversing at the wrong level index (off-by-one in even/odd tracking)',
        'Reversing in place while iterating — safer to build a reversed copy or reverse after collecting',
        'Using queue.shift() in a hot loop — prefer a dedicated queue class for large inputs',
      ],
      interviewerTips: [
        'Mention the two-stack approach as an alternative that avoids the reverse call',
        'Clarify: is level 0 always left-to-right? (Yes, per the problem statement)',
        'Discuss how to handle very wide trees where the queue can hold O(n) nodes',
      ],
    },
    codeChallenge: {
      functionName: 'zigzagLevelOrder',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - level-order array (null = no node)
 * @return {number[][]}
 */
function zigzagLevelOrder(levelOrder) {
  // Build tree from level-order array, then perform zigzag traversal
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3, 9, 20, null, null, 15, 7]], expected: [[3],[20,9],[15,7]], description: 'Standard 3-level tree' },
        { input: [[1]], expected: [[1]], description: 'Single node' },
        { input: [[]], expected: [], description: 'Empty tree' },
        { input: [[1, 2, 3, 4, 5]], expected: [[1],[3,2],[4,5]], description: '4 nodes two levels' },
        { input: [[1, 2, 3, 4, null, null, 5]], expected: [[1],[3,2],[4,5]], description: 'Sparse tree' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 130 },
    prerequisites: ['flatten-binary-tree'],
    relatedPatterns: ['BFS Level Order', 'Queue Processing'],
    intuitionSummary: 'Standard BFS; after collecting each level, reverse it if the level index is odd. Toggle a direction flag after each level.',
    patternName: 'BFS with Alternating Direction',
  },

  // ─── 8. Minimum Absolute Difference in BST (530) ─────────────────────────
  {
    id: 'min-absolute-diff-bst',
    slug: 'minimum-absolute-difference-in-bst',
    leetcodeNumber: 530,
    title: 'Minimum Absolute Difference in BST',
    category: 'bst',
    difficulty: 'easy',
    engineType: 'tree',
    tags: ['bst', 'inorder', 'dfs', 'greedy'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'The minimum difference between any two values in a BST is always between two adjacent nodes in the inorder traversal. Can you find it without storing the whole list?',
      engineer: 'Inorder DFS tracking a prev pointer. At each node compute abs(node.val - prev.val) and update a running minimum. O(n) time, O(h) space.',
      interview: 'Classic BST property exploitation: inorder is sorted, so adjacent inorder nodes give the smallest absolute differences. Track prev as a single variable.',
    },
    puzzleConfig: {
      nodes: [
        { val: 4, left: 2, right: 6, x: 0.5, y: 0 },
        { val: 2, left: 1, right: 3, x: 0.25, y: 1 },
        { val: 6, left: null, right: null, x: 0.75, y: 1 },
        { val: 1, left: null, right: null, x: 0.125, y: 2 },
        { val: 3, left: null, right: null, x: 0.375, y: 2 },
      ],
      p: 2,
      q: 3,
      instruction: 'BST [4,2,6,1,3]: minimum absolute difference = 1 (between inorder-adjacent nodes 2 and 3). Find their LCA.',
      mode: 'lca',
      correctAnswer: 2,
    },
    hints: [
      { id: 1, text: 'The minimum absolute difference in any BST must occur between two adjacent values — never between values that are far apart in sorted order.', xpCost: 0 },
      { id: 2, text: 'Inorder traversal of a BST visits nodes in sorted (ascending) order. Track the previously visited node and compute the difference at each step.', xpCost: 0 },
      { id: 3, text: 'Use a single prev variable initialized to null. When prev is not null, update minDiff = min(minDiff, node.val - prev.val). Then set prev = node.val.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [4,2,6,1,3]. Inorder: 1→2→3→4→6. prev=null, minDiff=Infinity.',
        state: { inorder: [1,2,3,4,6], prev: null, minDiff: Infinity },
        annotation: 'Inorder traversal',
      },
      {
        id: 2,
        description: 'Visit 1: prev=null → skip diff. Set prev=1.',
        state: { visited: 1, prev: 1, minDiff: Infinity },
        activeNodes: ['1'],
        annotation: 'prev=1',
      },
      {
        id: 3,
        description: 'Visit 2: diff=2-1=1. minDiff=1. Set prev=2.',
        state: { visited: 2, prev: 2, minDiff: 1 },
        activeNodes: ['2'],
        annotation: 'minDiff=1',
      },
      {
        id: 4,
        description: 'Visit 3: diff=3-2=1. minDiff still 1. Visit 4: diff=4-3=1. Visit 6: diff=6-4=2. minDiff=1.',
        state: { visited: 6, prev: 6, minDiff: 1 },
        annotation: 'Final minDiff=1 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Single inorder traversal visiting all n nodes.',
      spaceExplanation: 'Recursion stack depth equals tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function getMinimumDifference(root) {
  let prev    = null;
  let minDiff = Infinity;

  function inorder(node) {
    if (node === null) return;
    inorder(node.left);

    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev);
    }
    prev = node.val;

    inorder(node.right);
  }

  inorder(root);
  return minDiff;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values into an array, sort it, then scan adjacent pairs for the minimum difference.',
        complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Sorting dominates; traversal is O(n)', spaceExplanation: 'Array of all n values', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Inorder traversal with a running prev value. O(n) time because inorder is already sorted; no extra array needed.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Single traversal', spaceExplanation: 'Only the recursion stack', visualization: 'linear' },
      },
      followUps: [
        'Kth Smallest Element in a BST (LC 230) — same inorder technique',
        'Find Mode in BST (LC 501) — also inorder with prev tracking',
        'What if the tree is a general binary tree (not BST)? (Must collect all values first)',
      ],
      edgeCases: [
        'Tree with exactly two nodes',
        'All nodes have the same value — difference is 0 (but BST property requires uniqueness)',
        'Large balanced BST where the minimum difference is deep in the tree',
      ],
      commonMistakes: [
        'Forgetting to initialize minDiff to Infinity (or a very large number)',
        'Computing abs(node.val - prev) unnecessarily — inorder is sorted so node.val >= prev always',
        'Not handling prev = null on the first visited node',
      ],
      interviewerTips: [
        'This is the same pattern as "Find Mode in BST" and "Validate BST via inorder"',
        'Point out that the BST property is what makes the inorder approach valid and O(n)',
        'Mention iterative inorder as an O(1) extra-space alternative',
      ],
    },
    codeChallenge: {
      functionName: 'getMinimumDifference',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - BST as level-order array
 * @return {number}
 */
function getMinimumDifference(levelOrder) {
  // Build tree, then find minimum absolute difference between any two nodes
  // Your solution here
}`,
      },
      testCases: [
        { input: [[4, 2, 6, 1, 3]], expected: 1, description: '[4,2,6,1,3] min diff=1' },
        { input: [[1, 0, 48, null, null, 12, 49]], expected: 1, description: 'Larger gaps, min still 1' },
        { input: [[1, null, 5]], expected: 4, description: 'Two nodes, diff=4' },
        { input: [[236, 104, 701, null, 227, null, 911]], expected: 27, description: 'Multi-level BST' },
        { input: [[1, null, 3, null, null, 2]], expected: 1, description: 'Three-node BST' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['kth-smallest-bst'],
    relatedPatterns: ['Inorder Traversal', 'Running Minimum with Prev Pointer'],
    intuitionSummary: 'Inorder traversal of a BST yields sorted values. Track the previous value and compute adjacent differences on the fly to find the minimum in O(n).',
    patternName: 'Inorder Adjacent Difference',
  },

  // ─── 9. Sum Root to Leaf Numbers (129) ───────────────────────────────────
  {
    id: 'sum-root-to-leaf',
    slug: 'sum-root-to-leaf-numbers',
    leetcodeNumber: 129,
    title: 'Sum Root to Leaf Numbers',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'tree',
    tags: ['binary-tree', 'dfs', 'recursion'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Each root-to-leaf path forms a multi-digit number. Add all of those numbers together!',
      engineer: 'DFS passing a running number = prevNum * 10 + node.val. At a leaf, add the accumulated number to the global sum.',
      interview: 'O(n) DFS. No need to store paths — compute the number incrementally as you descend. At each leaf, the full number is already computed.',
    },
    puzzleConfig: {
      nodes: [
        { val: 1, left: 2, right: 3, x: 0.5, y: 0 },
        { val: 2, left: null, right: null, x: 0.25, y: 1 },
        { val: 3, left: null, right: null, x: 0.75, y: 1 },
      ],
      p: 2,
      q: 3,
      instruction: '[1,2,3]: paths form numbers 12 and 13, sum=25. The paths both originate from root via nodes 2 and 3. Find their LCA (the root they share).',
      mode: 'lca',
      correctAnswer: 1,
    },
    hints: [
      { id: 1, text: 'Each edge in the path shifts the current number left by one decimal place (multiply by 10) before adding the child\'s digit.', xpCost: 0 },
      { id: 2, text: 'Pass currNum = prevNum * 10 + node.val down the DFS. When you reach a leaf (no children), add currNum to a total.', xpCost: 0 },
      { id: 3, text: 'You can return the sum directly from each DFS call: return dfs(left, currNum) + dfs(right, currNum). No global variable needed.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [1,2,3]. Paths: 1→2 forms 12, 1→3 forms 13. DFS from root 1 with currNum=0.',
        state: { tree: [1,2,3], currNum: 0, total: 0 },
        activeNodes: ['1'],
        annotation: 'currNum = 0*10+1 = 1',
      },
      {
        id: 2,
        description: 'Go left to node 2: currNum = 1*10+2 = 12. Node 2 is a leaf → add 12 to total. total=12.',
        state: { currNum: 12, total: 12 },
        activeNodes: ['2'],
        annotation: 'Leaf! add 12 → total=12',
      },
      {
        id: 3,
        description: 'Go right to node 3: currNum = 1*10+3 = 13. Node 3 is a leaf → add 13. total=12+13=25.',
        state: { currNum: 13, total: 25 },
        activeNodes: ['3'],
        annotation: 'Leaf! add 13 → total=25',
      },
      {
        id: 4,
        description: 'DFS complete. Return 25.',
        state: { result: 25 },
        annotation: 'Return 25 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Every node is visited exactly once in the DFS.',
      spaceExplanation: 'Recursion stack depth equals tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function sumNumbers(root) {
  function dfs(node, currNum) {
    if (node === null) return 0;

    currNum = currNum * 10 + node.val;

    // Leaf node — return accumulated number
    if (node.left === null && node.right === null) return currNum;

    return dfs(node.left, currNum) + dfs(node.right, currNum);
  }

  return dfs(root, 0);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all root-to-leaf paths as arrays, then construct numbers from each path and sum them.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Full traversal; path storage proportional to n', spaceExplanation: 'Storing all path arrays', visualization: 'linear' },
      },
      optimized: {
        description: 'DFS with an accumulating currNum parameter. No path storage needed — the number is built incrementally.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Single DFS touching each node once', spaceExplanation: 'Only the recursion stack', visualization: 'linear' },
      },
      followUps: [
        'Path Sum (LC 112) — does any root-to-leaf path sum to a target?',
        'Path Sum II (LC 113) — return all such paths',
        'What if node values are not single digits? (Still works — just shifts by more)',
        'Sum Root to Leaf Binary Numbers (LC 1022) — same pattern, base 2',
      ],
      edgeCases: [
        'Single node (root is a leaf) → return root.val',
        'Root with only a left or only a right child',
        'Very deep tree where accumulation could overflow 32-bit integer',
      ],
      commonMistakes: [
        'Using a global mutable sum instead of a pure recursive return — both work but global state is error-prone',
        'Forgetting to handle null nodes in the base case',
        'Checking for a leaf as "node.left === null && node.right === null" — make sure both conditions are AND, not OR',
      ],
      interviewerTips: [
        'Ask if the tree can be very deep — mention the overflow risk',
        'The pattern is identical to "decoding" a number from a root-to-leaf path',
        'Contrast with Path Sum: here you collect the number, not compare it',
      ],
    },
    codeChallenge: {
      functionName: 'sumNumbers',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - level-order array (null = no node)
 * @return {number}
 */
function sumNumbers(levelOrder) {
  // Build tree, then sum all root-to-leaf numbers
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3]], expected: 25, description: 'Paths 12 + 13 = 25' },
        { input: [[4, 9, 0, 5, 1]], expected: 1026, description: 'Paths 495 + 491 + 40 = 1026' },
        { input: [[1]], expected: 1, description: 'Single node' },
        { input: [[1, 2]], expected: 12, description: 'Single path 1→2 = 12' },
        { input: [[1, 0, 1]], expected: 21, description: 'Paths 10 + 11 = 21' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 130 },
    prerequisites: ['binary-tree-max-path'],
    relatedPatterns: ['DFS with Accumulated State', 'Path Encoding'],
    intuitionSummary: 'Pass currNum = prevNum * 10 + node.val down the DFS. At each leaf the full path number is ready — sum all leaves\' accumulated values.',
    patternName: 'Root-to-Leaf Number Accumulation',
  },

  // ─── 10. Count Complete Tree Nodes (222) ─────────────────────────────────
  {
    id: 'count-complete-tree-nodes',
    slug: 'count-complete-tree-nodes',
    leetcodeNumber: 222,
    title: 'Count Complete Tree Nodes',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['binary-tree', 'binary-search', 'divide-conquer', 'complete-tree'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Apple'],
    descriptions: {
      explorer: 'Count nodes in a complete binary tree without visiting every single one! Use the structure of a complete tree to count entire subtrees at once.',
      engineer: 'Compare left and right subtree heights. If equal, the left subtree is a perfect binary tree of 2^h - 1 nodes; add that and recurse on the right. Otherwise recurse on the left.',
      interview: 'O(log²n) — smarter than O(n). At each node, compute left/right heights in O(log n) each. If heights match, left subtree is full (2^h - 1 nodes + root). Otherwise recurse into right.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'nodes in right subtree: 3' },
        { id: 'b', value: 3, label: 'nodes in left subtree: 3' },
        { id: 'c', value: 6, label: 'total nodes: 6' },
        { id: 'd', value: 2, label: 'tree height: 2' },
      ],
      target: 6,
      instruction: 'Complete tree [1,2,3,4,5,6]: select the node counts for the LEFT and RIGHT subtrees.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'A naive O(n) solution just traverses every node. Can you do better by exploiting the fact that the tree is complete?', xpCost: 0 },
      { id: 2, text: 'In a complete binary tree, the left and right subtrees are also complete. Measure the height of the leftmost path and the rightmost path from any node.', xpCost: 0 },
      { id: 3, text: 'If left height == right height, the left subtree is a perfect binary tree with 2^leftHeight - 1 nodes. Add those (plus 1 for the root) and recurse only on the right subtree.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [1,2,3,4,5,6]. At root: leftHeight (1→2→4) = 3, rightHeight (1→3→6) = 3. Heights equal → left subtree is perfect.',
        state: { root: 1, leftHeight: 3, rightHeight: 3, heightsEqual: true },
        activeNodes: ['1'],
        annotation: 'Left perfect: 2^2-1=3 nodes + root',
      },
      {
        id: 2,
        description: 'Left subtree is a full perfect tree of height 2: 2^2 - 1 = 3 nodes (nodes 2,4,5). Count from left = 1 (root) + 3 (left perfect) = 4. Recurse on right subtree rooted at 3.',
        state: { counted: 4, recurseOn: 3 },
        activeNodes: ['3'],
        annotation: 'Add 2^2=4, recurse right',
      },
      {
        id: 3,
        description: 'At node 3: leftHeight (3→6) = 2, rightHeight (3→null) = 1. Heights differ → right subtree is perfect of height 1.',
        state: { node: 3, leftHeight: 2, rightHeight: 1, heightsEqual: false },
        activeNodes: ['3', '6'],
        annotation: 'Right subtree is perfect h=1',
      },
      {
        id: 4,
        description: 'Right subtree of 3 has 2^1-1=1 node (node 6). Count += 1 (root 3) + 1 (right perfect). Recurse on left subtree of 3: node 6, which is a leaf.',
        state: { counted: 6, recurseOn: 6 },
        annotation: '6 is a leaf → +1. Total=6 ✓',
      },
    ],
    complexity: {
      time: 'O(log²n)',
      space: 'O(log n)',
      timeExplanation: 'At each of O(log n) recursive levels we compute heights in O(log n) time — giving O(log²n) total.',
      spaceExplanation: 'Recursion stack is O(log n) deep because we always recurse into one subtree.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function countNodes(root) {
  if (root === null) return 0;

  // Measure height going left-only
  function leftHeight(node) {
    let h = 0;
    while (node !== null) { h++; node = node.left; }
    return h;
  }

  // Measure height going right-only
  function rightHeight(node) {
    let h = 0;
    while (node !== null) { h++; node = node.right; }
    return h;
  }

  const lh = leftHeight(root);
  const rh = rightHeight(root);

  if (lh === rh) {
    // Left subtree is a perfect binary tree
    return (1 << lh) - 1; // 2^lh - 1
  }

  // Heights differ — recurse into both subtrees
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Simple recursive DFS or BFS that counts every node.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Visit all n nodes', spaceExplanation: 'Recursion stack', visualization: 'linear' },
      },
      optimized: {
        description: 'Compare left-only and right-only path heights. Equal heights indicate a perfect left subtree countable in O(1); recurse into one subtree per level.',
        complexity: { time: 'O(log²n)', space: 'O(log n)', timeExplanation: 'log n levels, each computing height in O(log n)', spaceExplanation: 'Recursion depth is log n', visualization: 'logarithmic' },
      },
      followUps: [
        'How would you verify that the input is actually a complete binary tree?',
        'Complete Binary Tree Inserter (LC 919) — insert while maintaining completeness',
        'What is the difference between a complete and a perfect binary tree?',
      ],
      edgeCases: [
        'Empty tree → 0',
        'Single node → 1',
        'Perfect binary tree (all levels full) → 2^h - 1',
        'Complete tree with exactly one extra node on the last level',
      ],
      commonMistakes: [
        'Using (1 << lh) which gives 2^lh (count of a full tree), not 2^lh - 1 (off-by-one). Use (1 << lh) - 1.',
        'Measuring both heights the same way — leftHeight must go left, rightHeight must go right',
        'Returning the brute-force O(n) solution without exploiting the complete-tree structure',
      ],
      interviewerTips: [
        'Ask the candidate to explain why equal heights implies a perfect left subtree',
        'Verify they use bit-shift for 2^h rather than Math.pow to avoid floating-point',
        'The O(log²n) complexity is the key differentiator — ask them to derive it',
      ],
    },
    codeChallenge: {
      functionName: 'countNodes',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - complete binary tree as level-order array
 * @return {number}
 */
function countNodes(levelOrder) {
  // Build tree from level-order array, then count nodes efficiently
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5, 6]], expected: 6, description: 'Complete tree with 6 nodes' },
        { input: [[1]], expected: 1, description: 'Single node' },
        { input: [[]], expected: 0, description: 'Empty tree' },
        { input: [[1, 2, 3, 4, 5, 6, 7]], expected: 7, description: 'Perfect tree height 3' },
        { input: [[1, 2, 3, 4, 5]], expected: 5, description: 'Complete tree 5 nodes' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 15, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['binary-tree-zigzag'],
    relatedPatterns: ['Divide and Conquer', 'Binary Search on Tree Height'],
    intuitionSummary: 'Compare left-only and right-only heights. Equal heights means the left subtree is a perfect tree countable with bit-shift. Recurse into one side per level for O(log²n).',
    patternName: 'Complete Tree Height Comparison',
  },
];

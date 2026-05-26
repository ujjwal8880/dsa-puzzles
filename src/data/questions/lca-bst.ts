import type { QuestionConfig } from '@/types/question';

export const lcaBst: QuestionConfig = {
  id: 'lca-bst',
  slug: 'lowest-common-ancestor-of-a-binary-search-tree',
  leetcodeNumber: 235,
  title: 'LCA of a Binary Search Tree',
  category: 'bst',
  difficulty: 'medium',
  engineType: 'tree',
  tags: ['bst', 'dfs', 'recursion'],
  questionSets: ['blind75', 'top150'],
  companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'LinkedIn'],
  descriptions: {
    explorer: 'Navigate the BST to find the meeting point of two nodes!',
    engineer: 'Exploit BST ordering: if both targets are less than root, go left. If both greater, go right. Otherwise root is LCA.',
    interview: 'O(h) time where h=tree height. For balanced BST: O(log n). Key insight: BST property eliminates half the tree at each step.',
  },
  puzzleConfig: {
    // BST: root=6, with [2, 8] as children, [0,4] under 2, [7,9] under 8
    nodes: [
      { val: 6,  x: 0.5,    y: 0 },
      { val: 2,  x: 0.25,   y: 1, left: 0,  right: 4  },
      { val: 8,  x: 0.75,   y: 1, left: 7,  right: 9  },
      { val: 0,  x: 0.125,  y: 2 },
      { val: 4,  x: 0.375,  y: 2 },
      { val: 7,  x: 0.625,  y: 2 },
      { val: 9,  x: 0.875,  y: 2 },
    ],
    p: 2,
    q: 8,
    instruction: 'Find the LCA of p=2 and q=8 in this BST. Navigate using Go Left / Go Right, then click "This is the LCA!" when you reach it.',
    mode: 'lca-bst',
    correctAnswer: 6,
  },
  hints: [
    { id: 1, text: 'The key insight: use the BST ordering property. You don\'t need to search randomly.', xpCost: 0 },
    { id: 2, text: 'At each node: if BOTH p and q are smaller → go left. If BOTH are larger → go right. Otherwise → current node is the LCA.', xpCost: 0 },
    { id: 3, text: 'At root=6: p=2 < 6 and q=8 > 6. They\'re on opposite sides — root IS the LCA!', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Start at root = 6. Check: is p=2 and q=8 both on same side?',
      state: { current: 6, p: 2, q: 8 },
      activeNodes: ['6'],
      annotation: 'At node 6:\np=2 < 6\nq=8 > 6',
    },
    {
      id: 2,
      description: 'p=2 < 6 but q=8 > 6. They\'re on OPPOSITE sides of 6. By definition, 6 is the LCA!',
      state: { current: 6, p: 2, q: 8, found: true },
      activeNodes: ['6'],
      annotation: 'One left, one right\n→ LCA = 6 ✓',
    },
  ],
  complexity: {
    time: 'O(h)',
    space: 'O(h)',
    timeExplanation: 'h = height of tree. Traverse from root down at most h levels. O(log n) for balanced BST, O(n) worst case (skewed).',
    spaceExplanation: 'O(h) for recursion stack. Iterative solution uses O(1) space.',
    visualization: 'logarithmic',
  },
  codeSolutions: [
    {
      language: 'javascript',
      code: `function lowestCommonAncestor(root, p, q) {
  let node = root;

  while (node) {
    if (p.val < node.val && q.val < node.val) {
      node = node.left; // both smaller → go left
    } else if (p.val > node.val && q.val > node.val) {
      node = node.right; // both larger → go right
    } else {
      return node; // split point = LCA
    }
  }

  return null;
}`,
      notes: 'Iterative O(1) space solution. Recursive version is also valid.',
    },
        {
      language: 'python',
      code: `def lowestCommonAncestor(root, p, q):
    node = root

    while node:
        if p.val < node.val and q.val < node.val:
            node = node.left
        elif p.val > node.val and q.val > node.val:
            node = node.right
        else:
            return node

    return None`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Find paths from root to p and q, then find last common node in both paths.',
      complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Full tree traversal for both paths', spaceExplanation: 'Two path arrays', visualization: 'linear' },
    },
    optimized: {
      description: 'Single-pass BST property check. At each node decide left/right/found in O(1).',
      complexity: { time: 'O(h)', space: 'O(1)', timeExplanation: 'h levels traversed (log n balanced)', spaceExplanation: 'Iterative uses no extra space', visualization: 'logarithmic' },
    },
    followUps: [
      'LCA of a general binary tree (not BST)? (LC 236 — need different approach)',
      'If tree is very deep, how to avoid stack overflow in recursive version?',
      'What if p or q might not exist in the tree?',
    ],
    edgeCases: [
      'p or q IS the LCA (one is ancestor of the other)',
      'p = q (same node)',
      'p or q is the root',
    ],
    commonMistakes: [
      'Forgetting that one of p/q can be the LCA itself',
      'Using the general LCA algorithm for a BST — much less efficient',
      'Not handling the case where p.val == node.val or q.val == node.val',
    ],
    interviewerTips: [
      'Distinguish this from LC 236 (general binary tree LCA)',
      'The BST property is the key — always mention it first',
      'Convert to iterative to show O(1) space optimization',
    ],
  },
  codeChallenge: {
    functionName: 'lcaVal',
    starterCode: {
      javascript: `// Given a BST as an array (level-order), find LCA of p and q.
// lcaVal(root, p, q) returns the VALUE of the LCA node.
// Assume BST property holds and p, q exist in the tree.
/**
 * @param {number} root - root value
 * @param {number} p
 * @param {number} q
 * @param {Map<number, {left: number|null, right: number|null}>} bstMap
 * @return {number}
 */
function lcaVal(root, p, q) {
  // Your solution here
  // Use BST property: p < node → left, p > node → right, split → LCA

}`,
    },
    testCases: [
      { input: [6, 2, 8, { 6: { l: 2, r: 8 }, 2: { l: 0, r: 4 }, 8: { l: 7, r: 9 } }], expected: 6, description: 'LCA(2, 8) in BST rooted at 6 = 6' },
    ],
  },
  xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 120 },
  prerequisites: ['binary-search'],
  relatedPatterns: ['BST Property Navigation', 'Recursive Tree Traversal'],
  intuitionSummary: 'In a BST, if both nodes are less than current root, go left. If both greater, go right. Otherwise root is the LCA.',
  patternName: 'BST Property Navigation',
};

import type { QuestionConfig } from '@/types/question';

export const MISC_COMPLETE: QuestionConfig[] = [
  // ─── 1. Reverse Nodes in k-Group (25) ────────────────────────────────────
  {
    id: 'reverse-nodes-k-group',
    slug: 'reverse-nodes-in-k-group',
    leetcodeNumber: 25,
    title: 'Reverse Nodes in k-Group',
    category: 'linked-list',
    difficulty: 'hard',
    engineType: 'linked-list',
    tags: ['linked-list', 'recursion', 'in-place'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Reverse every chunk of k nodes in a linked list. If fewer than k nodes remain at the end, leave them as-is!',
      engineer: 'Count k nodes from current head. If found, reverse them in-place (standard 3-pointer reversal). Attach the reversed segment\'s tail to the recursively processed rest.',
      interview: 'O(n) time, O(n/k) stack space. Verify k nodes exist before reversing. Reverse in-place and recurse on the remainder. The key is connecting the original head (now tail of reversed group) to recurse(kth.next).',
    },
    puzzleConfig: {
      nodes: [{ id: 'a', val: 1 }, { id: 'b', val: 2 }, { id: 'c', val: 3 }, { id: 'd', val: 4 }, { id: 'e', val: 5 }],
      instruction: 'Reverse in groups of k=2: [1→2→3→4→5] → [2→1→4→3→5]. Click the new HEAD.',
      mode: 'reverse',
      correctAnswer: 'b',
    },
    hints: [
      { id: 1, text: 'Before reversing, check that at least k nodes remain. Walk k steps; if you fall off the list, return the head unchanged.', xpCost: 0 },
      { id: 2, text: 'Reverse exactly k nodes using the standard prev/curr/next technique. Track the kth node before reversing — it becomes the tail of the reversed group.', xpCost: 0 },
      { id: 3, text: 'After reversing, connect the original head (now the tail) to reverseKGroup(nextGroupHead, k). Return the node that was the kth node (now the new head of this group).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1,2,3,4,5], k=2. Count 2 nodes from head=1: nodes 1,2 exist. Proceed to reverse.',
        state: { list: [1, 2, 3, 4, 5], k: 2, groupStart: 1, groupEnd: 2 },
        annotation: 'k nodes confirmed',
      },
      {
        id: 2,
        description: 'Reverse nodes 1→2: prev=null, curr=1. Save next=2, point 1.next→null, advance. Save next=3, point 2.next→1, advance. Group reversed: 2→1.',
        state: { reversedGroup: [2, 1], tail: 1, nextHead: 3 },
        annotation: '2→1, tail=node(1), next=node(3)',
      },
      {
        id: 3,
        description: 'Recurse: reverseKGroup([3,4,5], k=2). Count 2 nodes 3,4. Reverse: 4→3, tail=node(3), next=node(5).',
        state: { reversedGroup: [4, 3], tail: 3, nextHead: 5 },
        annotation: '4→3, tail=node(3), next=node(5)',
      },
      {
        id: 4,
        description: 'Recurse: reverseKGroup([5], k=2). Only 1 node remains, fewer than k=2. Return head=node(5) unchanged.',
        state: { remaining: [5], action: 'return as-is' },
        annotation: 'fewer than k nodes → no reversal',
      },
      {
        id: 5,
        description: 'Connect pieces: node(1).next→node(4) (result of second group). node(3).next→node(5). Final: 2→1→4→3→5.',
        state: { result: [2, 1, 4, 3, 5] },
        annotation: 'Return new head = node(2) ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n/k)',
      timeExplanation: 'Every node is visited once during reversal.',
      spaceExplanation: 'Recursion stack depth is n/k (one frame per group).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function reverseKGroup(head, k) {
  // Check if k nodes exist
  let count = 0;
  let node = head;
  while (node && count < k) {
    node = node.next;
    count++;
  }
  if (count < k) return head; // fewer than k nodes remain

  // Reverse k nodes
  let prev = null;
  let curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // head is now the tail of the reversed group
  // connect it to the recursively processed remainder
  head.next = reverseKGroup(curr, k);

  return prev; // prev is the new head of this group
}

// ── array-based wrapper for test harness ──
function reverseKGroupArr(arr, k) {
  if (!arr || arr.length === 0) return arr;
  // Build list
  const nodes = arr.map(v => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  const newHead = reverseKGroup(nodes[0], k);
  // Collect result
  const result = [];
  let cur = newHead;
  while (cur) { result.push(cur.val); cur = cur.next; }
  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all node values into an array, reverse segments of size k, rebuild the list.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Linear scan plus rebuild', spaceExplanation: 'Array copy of all values', visualization: 'linear' },
      },
      optimized: {
        description: 'In-place recursive reversal. Verify k nodes exist, reverse them, recurse on the tail. O(1) extra space per group.',
        complexity: { time: 'O(n)', space: 'O(n/k)', timeExplanation: 'Each node processed once', spaceExplanation: 'Recursive call stack depth n/k', visualization: 'linear' },
      },
      followUps: [
        'Can you do it iteratively with O(1) space? (Use a dummy head and manipulate pointers in a loop)',
        'Reverse Linked List II (LC 92) — reverse only a sublist from left to right',
        'What if k > list length? Return list unchanged',
        'What if you want to reverse only alternate k-groups?',
      ],
      edgeCases: [
        'k = 1 → no change (reversing groups of 1)',
        'k equals list length → entire list reversed',
        'List length not divisible by k → last partial group stays unchanged',
        'Empty list → return null',
      ],
      commonMistakes: [
        'Not checking if k nodes exist before reversing — causes null pointer errors',
        'Losing reference to next group head before completing reversal',
        'Forgetting that the original head becomes the tail after reversal and must be reconnected',
      ],
      interviewerTips: [
        'Draw the pointer changes for a concrete 4-node k=2 example before coding',
        'Mention both recursive and iterative approaches; iterative avoids stack overflow for huge inputs',
        'This combines Reverse Linked List (206) with careful pointer management — build on that foundation',
      ],
    },
    codeChallenge: {
      functionName: 'reverseKGroupArr',
      starterCode: {
        javascript: `/**
 * @param {number[]} arr - array representing linked list values
 * @param {number} k
 * @return {number[]} - values after reversing each k-group
 */
function reverseKGroupArr(arr, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5], description: 'k=2, length 5' },
        { input: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5], description: 'k=3, last group unchanged' },
        { input: [[1, 2, 3, 4], 4], expected: [4, 3, 2, 1], description: 'k equals list length' },
        { input: [[1], 1], expected: [1], description: 'Single node, k=1' },
        { input: [[1, 2, 3, 4, 5, 6], 2], expected: [2, 1, 4, 3, 6, 5], description: 'k=2, even length' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 80, coding: 200 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['In-Place Pointer Reversal', 'Recursive Linked List'],
    intuitionSummary: 'Confirm k nodes exist, reverse them with 3-pointer technique, then connect the (now-tail) original head to the recursively processed rest.',
    patternName: 'Recursive K-Group Reversal',
  },

  // ─── 2. Remove Duplicates from Sorted List II (82) ───────────────────────
  {
    id: 'remove-duplicates-sorted-list-ii',
    slug: 'remove-duplicates-from-sorted-list-ii',
    leetcodeNumber: 82,
    title: 'Remove Duplicates from Sorted List II',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', 'dummy-head'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Oracle', 'Bloomberg'],
    descriptions: {
      explorer: 'Remove every node that has a duplicate in a sorted linked list — not just the extras, but ALL copies of duplicated values!',
      engineer: 'Use a dummy head and a prev pointer. When curr and curr.next share the same value, advance curr past all nodes with that value, then skip them by pointing prev.next to curr.next.',
      interview: 'O(n) time, O(1) space. Dummy head simplifies head-deletion edge cases. When a duplicate run is detected (curr.val === curr.next.val), record the duplicate value, skip all nodes with that value, then bypass them from prev.',
    },
    puzzleConfig: {
      nodes: [{ id: 'a', val: 1 }, { id: 'b', val: 2 }, { id: 'c', val: 3 }, { id: 'd', val: 3 }, { id: 'e', val: 4 }, { id: 'f', val: 4 }, { id: 'g', val: 5 }],
      instruction: 'List 1→2→3→3→4→4→5: remove ALL duplicate nodes. Click the HEAD of the result.',
      mode: 'identify-head',
      correctAnswer: 'a',
    },
    hints: [
      { id: 1, text: 'Create a dummy node pointing to head. Maintain a prev pointer — it will always point to the last confirmed unique node.', xpCost: 0 },
      { id: 2, text: 'When curr.next exists and curr.val === curr.next.val, you found a duplicate value. Record it, then advance curr while curr.val equals that duplicate value.', xpCost: 0 },
      { id: 3, text: 'After skipping all duplicates, set prev.next = curr.next (bypass them all). If no duplicate was found, advance prev = curr normally.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: 1→2→3→3→4→4→5. Create dummy→1. prev=dummy, curr=1.',
        state: { list: [1, 2, 3, 3, 4, 4, 5], prev: 'dummy', curr: 1 },
        annotation: 'dummy→1→2→3→3→4→4→5',
      },
      {
        id: 2,
        description: 'curr=1: 1.next=2, 1≠2 → unique. Advance prev=1, curr=2.',
        state: { prev: 1, curr: 2, kept: [1] },
        annotation: 'node(1) is unique, advance',
      },
      {
        id: 3,
        description: 'curr=2: 2.next=3, 2≠3 → unique. Advance prev=2, curr=3.',
        state: { prev: 2, curr: 3, kept: [1, 2] },
        annotation: 'node(2) is unique, advance',
      },
      {
        id: 4,
        description: 'curr=3: 3.next=3, 3===3 → duplicate! Skip all 3s: curr moves to 3→3→4, now curr=4. Set prev.next=curr.next? No: prev.next=curr (the 4 node). Wait — set prev(2).next = node(4,4,5).',
        state: { prev: 2, curr: 4, skipped: [3, 3] },
        annotation: 'skip both 3s, prev.next=node(4)',
      },
      {
        id: 5,
        description: 'curr=4: 4.next=4, 4===4 → duplicate! Skip all 4s. curr becomes 5. prev(2).next=node(5). Final: 1→2→5.',
        state: { result: [1, 2, 5] },
        annotation: 'Return dummy.next = node(1) ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through all n nodes.',
      spaceExplanation: 'Only pointer variables — dummy node is constant space.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function deleteDuplicates(head) {
  const dummy = { val: -Infinity, next: head };
  let prev = dummy;
  let curr = head;

  while (curr) {
    // Check if curr starts a duplicate run
    if (curr.next && curr.val === curr.next.val) {
      const dupVal = curr.val;
      // Skip all nodes with this value
      while (curr && curr.val === dupVal) {
        curr = curr.next;
      }
      // Bypass the entire duplicate run
      prev.next = curr;
    } else {
      prev = curr;
      curr = curr.next;
    }
  }

  return dummy.next;
}

// ── array-based wrapper for test harness ──
function removeDuplicates(arr) {
  if (!arr || arr.length === 0) return arr;
  const nodes = arr.map(v => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  const newHead = deleteDuplicates(nodes[0]);
  const result = [];
  let cur = newHead;
  while (cur) { result.push(cur.val); cur = cur.next; }
  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values, use a Map to count occurrences, filter to only values with count=1, rebuild the list.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Two passes plus map construction', spaceExplanation: 'Map stores all distinct values', visualization: 'linear' },
      },
      optimized: {
        description: 'Single-pass with dummy head and prev pointer. Detect duplicate runs in-place and bypass them entirely.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Each node visited once', spaceExplanation: 'Constant extra pointer variables', visualization: 'linear' },
      },
      followUps: [
        'Remove Duplicates from Sorted List I (LC 83) — keep one copy of each duplicate',
        'What if the list is unsorted? (need a HashSet, O(n) space)',
        'Can you generalize to keep at most k copies of each value?',
      ],
      edgeCases: [
        'All nodes have the same value → return empty list',
        'No duplicates → return list unchanged',
        'Duplicates at the head → dummy node handles this correctly',
        'Empty list → return null',
      ],
      commonMistakes: [
        'Forgetting dummy head — deletion of head node requires special handling without it',
        'Only skipping one extra copy instead of ALL nodes with the duplicate value',
        'Advancing prev even when a duplicate run was found — prev should only advance on confirmed unique nodes',
      ],
      interviewerTips: [
        'Distinguish from LC 83 (keep one copy) — here we remove ALL copies',
        'The dummy head pattern is the key interview insight — mention it proactively',
        'Trace through a case where duplicates appear at the very start of the list',
      ],
    },
    codeChallenge: {
      functionName: 'removeDuplicates',
      starterCode: {
        javascript: `/**
 * @param {number[]} arr - sorted array representing linked list values
 * @return {number[]} - values with all duplicated elements removed
 */
function removeDuplicates(arr) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 3, 4, 4, 5]], expected: [1, 2, 5], description: 'Duplicates in the middle' },
        { input: [[1, 1, 1, 2, 3]], expected: [2, 3], description: 'Duplicates at the head' },
        { input: [[1, 2, 3]], expected: [1, 2, 3], description: 'No duplicates' },
        { input: [[1, 1]], expected: [], description: 'All duplicates → empty' },
        { input: [[1, 1, 2, 3, 3]], expected: [2], description: 'Duplicates at both ends' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['Dummy Head Pattern', 'Two-Pointer Linked List'],
    intuitionSummary: 'Dummy head + prev pointer. When a duplicate run starts, skip ALL nodes with that value and bypass from prev.',
    patternName: 'Dummy Head Skip Pattern',
  },

  // ─── 3. Rotate List (61) ─────────────────────────────────────────────────
  {
    id: 'rotate-list',
    slug: 'rotate-list',
    leetcodeNumber: 61,
    title: 'Rotate List',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', 'modular-arithmetic'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Bloomberg'],
    descriptions: {
      explorer: 'Rotate a linked list to the right by k places — the last k nodes jump to the front!',
      engineer: 'Find the length, make the list circular, then break it at position len - k % len. The new tail is at index len-k%len-1 and the new head is its next.',
      interview: 'O(n) time, O(1) space. Get length while finding tail. Form a circle (tail.next = head). New tail index = len - k % len - 1. Cut there: newHead = newTail.next, newTail.next = null.',
    },
    puzzleConfig: {
      nodes: [{ id: 'a', val: 1 }, { id: 'b', val: 2 }, { id: 'c', val: 3 }, { id: 'd', val: 4 }, { id: 'e', val: 5 }],
      instruction: 'Rotate [1→2→3→4→5] right by k=2. Click the new HEAD.',
      mode: 'identify-head',
      correctAnswer: 'd',
    },
    hints: [
      { id: 1, text: 'k can be larger than the list length. Use k % len to find the effective rotation. If k % len === 0, the list is unchanged.', xpCost: 0 },
      { id: 2, text: 'Connect the current tail to the current head to form a circle. The new tail is at position len - k%len - 1 (0-indexed from the original head).', xpCost: 0 },
      { id: 3, text: 'Walk len - k%len - 1 steps from head to find the new tail. The new head is newTail.next. Break the circle by setting newTail.next = null.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1,2,3,4,5], k=2. Walk the list: length=5, tail=node(5).',
        state: { list: [1, 2, 3, 4, 5], length: 5, tail: 5, k: 2 },
        annotation: 'len=5, effective k = 2%5 = 2',
      },
      {
        id: 2,
        description: 'Form a circle: node(5).next = node(1). List is now circular.',
        state: { circular: true, breakPoint: 'len - k%len - 1 = 5-2-1 = 2' },
        annotation: 'tail connects to head',
      },
      {
        id: 3,
        description: 'Walk 2 steps from head: node(1)→node(2)→node(3). New tail = node(3).',
        state: { newTail: 3, newHead: 4 },
        annotation: 'newTail=node(3), newHead=node(4)',
      },
      {
        id: 4,
        description: 'New head = node(3).next = node(4). Break circle: node(3).next = null.',
        state: { result: [4, 5, 1, 2, 3] },
        annotation: 'Return node(4) ✓',
      },
      {
        id: 5,
        description: 'Verify: [4,5,1,2,3] — nodes 4 and 5 (last 2) moved to front. Correct!',
        state: { final: [4, 5, 1, 2, 3] },
        annotation: 'Rotation complete ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'One pass to find length and tail, one pass to find new tail — both O(n).',
      spaceExplanation: 'Only pointer variables.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  // Find length and tail
  let len = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    len++;
  }

  const steps = k % len;
  if (steps === 0) return head;

  // Form circle
  tail.next = head;

  // New tail is at position len - steps - 1
  let newTail = head;
  for (let i = 0; i < len - steps - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}

// ── array-based wrapper for test harness ──
function rotateRightArr(arr, k) {
  if (!arr || arr.length === 0) return arr;
  const nodes = arr.map(v => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  const newHead = rotateRight(nodes[0], k);
  const result = [];
  let cur = newHead;
  while (cur) { result.push(cur.val); cur = cur.next; }
  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Perform k individual rotations, each time moving the last node to the front. O(n*k) time.',
        complexity: { time: 'O(n*k)', space: 'O(1)', timeExplanation: 'k rotations each taking O(n)', spaceExplanation: 'In-place', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Form a circular list, find the new break point using modular arithmetic. Single O(n) pass.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Two linear passes at most', spaceExplanation: 'Constant extra pointers', visualization: 'linear' },
      },
      followUps: [
        'Rotate Array (LC 189) — same concept for arrays using triple reversal',
        'What if k is negative (rotate left)?',
        'How would you rotate a doubly linked list?',
      ],
      edgeCases: [
        'k = 0 → return unchanged',
        'k is a multiple of len → return unchanged',
        'Single node → return as-is',
        'k > len — modular arithmetic handles this',
      ],
      commonMistakes: [
        'Not taking k % len — causes unnecessary extra iterations',
        'Off-by-one: walking to position len-k instead of len-k-1',
        'Forgetting to break the circle (newTail.next = null)',
      ],
      interviewerTips: [
        'The "form a circle then break it" pattern is elegant — mention it as the key insight',
        'Dry run k % len = 0 case explicitly to show you handle it',
        'Connect to Rotate Array (189) to show the same idea applies to arrays',
      ],
    },
    codeChallenge: {
      functionName: 'rotateRightArr',
      starterCode: {
        javascript: `/**
 * @param {number[]} arr - array representing linked list values
 * @param {number} k - rotation steps
 * @return {number[]} - values after rotating right by k
 */
function rotateRightArr(arr, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3], description: 'Standard rotation k=2' },
        { input: [[0, 1, 2], 4], expected: [2, 0, 1], description: 'k > length (k=4, len=3)' },
        { input: [[1, 2], 1], expected: [2, 1], description: 'Two nodes, k=1' },
        { input: [[1], 5], expected: [1], description: 'Single node' },
        { input: [[1, 2, 3], 3], expected: [1, 2, 3], description: 'k equals length, no change' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['Circular List', 'Modular Arithmetic'],
    intuitionSummary: 'Make circular, then use k % len to locate the new break point. Walk to new tail, cut, return new head.',
    patternName: 'Circular Rotation Pattern',
  },

  // ─── 4. Partition List (86) ───────────────────────────────────────────────
  {
    id: 'partition-list',
    slug: 'partition-list',
    leetcodeNumber: 86,
    title: 'Partition List',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', 'dummy-head'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Bloomberg'],
    descriptions: {
      explorer: 'Partition a linked list around a value x: all nodes less than x come before nodes greater than or equal to x, preserving relative order!',
      engineer: 'Maintain two separate dummy-headed lists: "less" for values < x, "greater" for values >= x. Append each node to the correct list, then join less-tail to greater-head.',
      interview: 'O(n) time, O(1) space. Two pointer approach with dummy heads. Iterate once, routing each node. After loop, set greaterTail.next = null and lessTail.next = greaterDummy.next.',
    },
    puzzleConfig: {
      nodes: [{ id: 'a', val: 1 }, { id: 'b', val: 4 }, { id: 'c', val: 3 }, { id: 'd', val: 2 }, { id: 'e', val: 5 }, { id: 'f', val: 2 }],
      instruction: 'Partition [1→4→3→2→5→2] around x=3. Click the HEAD of the result.',
      mode: 'identify-head',
      correctAnswer: 'a',
    },
    hints: [
      { id: 1, text: 'Create two dummy heads: one for the "less than x" partition and one for the "greater or equal" partition.', xpCost: 0 },
      { id: 2, text: 'Traverse all nodes once. If node.val < x, append to the less partition. Otherwise append to the greater partition.', xpCost: 0 },
      { id: 3, text: 'After processing all nodes, set the tail of the greater list to null (to avoid cycles), then connect the tail of the less list to the head of the greater list.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1,4,3,2,5,2], x=3. Create lessDummy and greaterDummy.',
        state: { list: [1, 4, 3, 2, 5, 2], x: 3, less: [], greater: [] },
        annotation: 'Two dummy heads initialized',
      },
      {
        id: 2,
        description: 'node=1: 1<3 → less. node=4: 4>=3 → greater. node=3: 3>=3 → greater. node=2: 2<3 → less.',
        state: { less: [1, 2], greater: [4, 3], remaining: [5, 2] },
        annotation: 'Processing first 4 nodes',
      },
      {
        id: 3,
        description: 'node=5: 5>=3 → greater. node=2: 2<3 → less. All nodes processed.',
        state: { less: [1, 2, 2], greater: [4, 3, 5] },
        annotation: 'All nodes distributed',
      },
      {
        id: 4,
        description: 'Connect: lessTail(2).next = greaterDummy.next (node 4). greaterTail(5).next = null.',
        state: { result: [1, 2, 2, 4, 3, 5] },
        annotation: 'Return lessDummy.next = node(1) ✓',
      },
      {
        id: 5,
        description: 'Final: [1,2,2,4,3,5]. All values < 3 come first, then >= 3, relative order preserved.',
        state: { final: [1, 2, 2, 4, 3, 5] },
        annotation: 'Partition complete ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through all n nodes.',
      spaceExplanation: 'Only two extra dummy nodes and four pointer variables.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function partition(head, x) {
  const lessDummy  = { val: 0, next: null };
  const greatDummy = { val: 0, next: null };
  let less  = lessDummy;
  let great = greatDummy;

  let curr = head;
  while (curr) {
    if (curr.val < x) {
      less.next = curr;
      less = less.next;
    } else {
      great.next = curr;
      great = great.next;
    }
    curr = curr.next;
  }

  great.next = null;           // avoid cycles
  less.next = greatDummy.next; // join the two lists

  return lessDummy.next;
}

// ── array-based wrapper for test harness ──
function partitionArr(arr, x) {
  if (!arr || arr.length === 0) return arr;
  const nodes = arr.map(v => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  const newHead = partition(nodes[0], x);
  const result = [];
  let cur = newHead;
  while (cur) { result.push(cur.val); cur = cur.next; }
  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect values < x, then values >= x, and rebuild the list.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Two passes plus array allocation', spaceExplanation: 'Two arrays holding all values', visualization: 'linear' },
      },
      optimized: {
        description: 'Two dummy-headed lists. Route each node in a single pass, then join. O(1) extra space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Four pointer variables plus two dummy nodes', visualization: 'linear' },
      },
      followUps: [
        'Sort Colors (LC 75) — Dutch National Flag problem, similar 3-way partition',
        'Can you partition into three groups: < x, = x, > x?',
        'What if you need the result to be a fully sorted list (not just partitioned)?',
      ],
      edgeCases: [
        'All values < x → greater list is empty',
        'All values >= x → less list is empty',
        'x not in the list — partition still works correctly',
        'Single node',
      ],
      commonMistakes: [
        'Forgetting great.next = null — original list still has old next pointer causing a cycle',
        'Not using dummy heads — head deletion requires special casing',
        'Mixing up < vs <= when routing nodes',
      ],
      interviewerTips: [
        'Emphasize that relative order within each partition is preserved — this is the hard constraint',
        'The two dummy head pattern is the canonical solution and shows clean pointer management',
        'great.next = null is a subtle but critical step — always call it out',
      ],
    },
    codeChallenge: {
      functionName: 'partitionArr',
      starterCode: {
        javascript: `/**
 * @param {number[]} arr - array representing linked list values
 * @param {number} x - partition value
 * @return {number[]} - partitioned list values
 */
function partitionArr(arr, x) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 4, 3, 2, 5, 2], 3], expected: [1, 2, 2, 4, 3, 5], description: 'Standard partition at 3' },
        { input: [[2, 1], 2], expected: [1, 2], description: 'Two nodes, swap needed' },
        { input: [[1, 2, 3, 4, 5], 3], expected: [1, 2, 3, 4, 5], description: 'Partition at middle, stable' },
        { input: [[5, 4, 3, 2, 1], 3], expected: [2, 1, 5, 4, 3], description: 'Descending input' },
        { input: [[3, 1], 3], expected: [1, 3], description: 'x equals first element' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['Dummy Head Pattern', 'Two-List Merge'],
    intuitionSummary: 'Two dummy-headed lists collect < x and >= x nodes in one pass. Join them at the end. Key: set greaterTail.next = null to avoid cycles.',
    patternName: 'Two-List Partition',
  },

  // ─── 5. Populating Next Right Pointers in Each Node II (117) ─────────────
  {
    id: 'populating-next-right-pointers-ii',
    slug: 'populating-next-right-pointers-in-each-node-ii',
    leetcodeNumber: 117,
    title: 'Populating Next Right Pointers in Each Node II',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['binary-tree', 'bfs', 'linked-list', 'level-order'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Adobe'],
    descriptions: {
      explorer: 'Connect each node to its right neighbor at the same level. If no right neighbor exists, point to null — for any binary tree, not just a perfect one!',
      engineer: 'Use the already-established next pointers of the current level to iterate across it and wire up the next level. A dummy head on the next level simplifies child linking.',
      interview: 'O(n) time, O(1) extra space (ignoring output). Traverse current level via next pointers. For each node, link its children to a dummy-headed chain forming the next level. Then move down.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'level 2 leftmost: node 2' },
        { id: 'b', value: 3, label: 'level 2 next: node 3' },
        { id: 'c', value: 4, label: 'level 3 leftmost: node 4' },
        { id: 'd', value: 7, label: 'level 3 rightmost: node 7' },
      ],
      target: 5,
      instruction: '[1,2,3,4,5,null,7]: at level 2, node 2 points to node 3. Select the two level-2 nodes.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Use the already-connected next pointers of the current level to walk across it. You don\'t need a queue!', xpCost: 0 },
      { id: 2, text: 'Maintain a dummy head for the next level and a tail pointer. For each node on the current level, append its non-null children to the next level\'s chain.', xpCost: 0 },
      { id: 3, text: 'After processing a level, move down: current level head = dummy.next, reset dummy and tail for the next level.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [1,2,3,4,5,null,7]. Level 0: curr=node(1). Dummy head for level 1.',
        state: { level: 0, curr: 1, nextLevelNodes: [] },
        annotation: 'Start at root',
      },
      {
        id: 2,
        description: 'node(1) has children 2 and 3. Link: dummy→node(2)→node(3). Level 1 chain built.',
        state: { level: 1, chain: [2, 3] },
        annotation: 'Level 1: 2→3→null',
      },
      {
        id: 3,
        description: 'Move to level 1. curr=node(2). children: 4,5. Append 4→5 to next level chain.',
        state: { level: 1, curr: 2, nextLevelNodes: [4, 5] },
        annotation: 'Process node(2)',
      },
      {
        id: 4,
        description: 'curr=node(3) (via next pointer). children: null, 7. Append 7. Next level chain: 4→5→7.',
        state: { level: 1, curr: 3, nextLevelNodes: [4, 5, 7] },
        annotation: 'Process node(3), chain: 4→5→7',
      },
      {
        id: 5,
        description: 'Move to level 2. curr=node(4). No children. node(5): no children. node(7): no children. Done.',
        state: { level: 2, chain: [4, 5, 7], result: 'all next pointers set' },
        annotation: 'All next pointers connected ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each node is visited once.',
      spaceExplanation: 'Only pointer variables — no queue. Dummy node is constant space.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function connect(root) {
  if (!root) return null;

  let curr = root; // current level's first node

  while (curr) {
    const dummy = { next: null }; // dummy head for next level
    let tail = dummy;

    // Walk across current level using next pointers
    while (curr) {
      if (curr.left) {
        tail.next = curr.left;
        tail = tail.next;
      }
      if (curr.right) {
        tail.next = curr.right;
        tail = tail.next;
      }
      curr = curr.next; // move right on current level
    }

    curr = dummy.next; // descend to next level
  }

  return root;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'BFS with a queue. For each level, connect nodes left to right.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Process every node', spaceExplanation: 'Queue holds up to n/2 nodes at widest level', visualization: 'linear' },
      },
      optimized: {
        description: 'Leverage already-set next pointers to walk current level. Dummy head chains next level. O(1) extra space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass over all nodes', spaceExplanation: 'Constant pointer variables', visualization: 'linear' },
      },
      followUps: [
        'Populating Next Right Pointers I (LC 116) — perfect binary tree, slightly simpler',
        'Level Order Traversal (LC 102) — related BFS pattern',
        'Can you use the same approach for an n-ary tree?',
      ],
      edgeCases: [
        'Only root node — no next pointers to set',
        'Completely left-skewed tree',
        'Nodes with only one child (the difference from LC 116)',
        'Null root → return null',
      ],
      commonMistakes: [
        'Using a queue when the problem asks for O(1) space',
        'Forgetting the dummy node — directly linking first child makes code messy with null checks',
        'Not resetting the dummy and tail when descending to the next level',
      ],
      interviewerTips: [
        'Emphasize that this works for imperfect trees (unlike LC 116) — that\'s the added difficulty',
        'The dummy head eliminates the need to special-case the first child at each level',
        'Draw the next-pointer "linked list" at each level to make the approach clear',
      ],
    },
    codeChallenge: {
      functionName: 'connectNextPointers',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - level-order tree representation
 * @return {string[]} - each level's values joined with "->" (e.g. "1->2->3->null")
 */
function connectNextPointers(levelOrder) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1, 2, 3, 4, 5, null, 7]]], expected: ['1->null', '2->3->null', '4->5->7->null'], description: 'Imperfect tree with missing node' },
        { input: [[[1]]], expected: ['1->null'], description: 'Single root node' },
        { input: [[[1, 2, 3]]], expected: ['1->null', '2->3->null'], description: 'Complete two-level tree' },
        { input: [[[1, 2, null, 3]]], expected: ['1->null', '2->null', '3->null'], description: 'Left-skewed tree' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 60, coding: 150 },
    prerequisites: ['binary-tree-level-order'],
    relatedPatterns: ['BFS Level Order', 'Next Pointer Linking'],
    intuitionSummary: 'Walk current level via established next pointers. Use a dummy head to build the next level\'s chain. Descend and repeat.',
    patternName: 'Level-by-Level Next Pointer',
  },

  // ─── 6. Average of Levels in Binary Tree (637) ───────────────────────────
  {
    id: 'average-levels-binary-tree',
    slug: 'average-of-levels-in-binary-tree',
    leetcodeNumber: 637,
    title: 'Average of Levels in Binary Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['binary-tree', 'bfs', 'level-order'],
    questionSets: ['top150'],
    companies: ['Facebook', 'Amazon', 'Google', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'Calculate the average value of nodes at each level of a binary tree. The answer is one average per level!',
      engineer: 'BFS with a queue. Process each level completely: snapshot the queue size, sum all values, divide by count.',
      interview: 'O(n) time, O(w) space where w is max width. Standard BFS level-order with per-level sum and count. Use floating-point division.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'level 0 average: 3' },
        { id: 'b', value: 14, label: 'level 1 average: (9+20)/2 ≈ 14' },
        { id: 'c', value: 11, label: 'level 2 average: (15+7)/2=11' },
        { id: 'd', value: 7, label: 'minimum value: 7' },
      ],
      target: 17,
      instruction: '[3,9,20,15,7]: level averages are [3, 14.5, 11]. Select level 0 avg (3) and closest-int of level 1 avg (14).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Use BFS. Before processing each level, snapshot the current queue size — that\'s exactly how many nodes are on this level.', xpCost: 0 },
      { id: 2, text: 'Sum all node values at the current level, then divide by the level size. Push children for the next level as you process.', xpCost: 0 },
      { id: 3, text: 'Collect one average per level into a result array. Continue until the queue is empty.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [3,9,20,15,7]. Queue=[node(3)]. Level 0: size=1, sum=3, avg=3.0.',
        state: { level: 0, nodes: [3], sum: 3, avg: 3.0, result: [3.0] },
        annotation: 'Level 0 avg = 3.0',
      },
      {
        id: 2,
        description: 'Enqueue children of 3: 9 and 20. Queue=[9,20]. Level 1: size=2, sum=29, avg=14.5.',
        state: { level: 1, nodes: [9, 20], sum: 29, avg: 14.5, result: [3.0, 14.5] },
        annotation: 'Level 1 avg = 14.5',
      },
      {
        id: 3,
        description: 'Enqueue children: 9→15,7; 20→no children. Queue=[15,7]. Level 2: size=2, sum=22, avg=11.0.',
        state: { level: 2, nodes: [15, 7], sum: 22, avg: 11.0, result: [3.0, 14.5, 11.0] },
        annotation: 'Level 2 avg = 11.0',
      },
      {
        id: 4,
        description: 'Queue empty. Return [3.0, 14.5, 11.0].',
        state: { result: [3.0, 14.5, 11.0] },
        annotation: 'Return result ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(w)',
      timeExplanation: 'Every node is processed exactly once.',
      spaceExplanation: 'Queue holds at most one full level — the widest level has w nodes.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function averageOfLevels(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelSum += node.val;
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(levelSum / levelSize);
  }

  return result;
}

// ── array-based wrapper for test harness ──
function averageOfLevelsArr(levelOrder) {
  if (!levelOrder || levelOrder.length === 0) return [];
  // Build tree from level-order array
  const nodes = levelOrder.map(v => v != null ? { val: v, left: null, right: null } : null);
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue;
    if (2*i+1 < nodes.length) nodes[i].left  = nodes[2*i+1];
    if (2*i+2 < nodes.length) nodes[i].right = nodes[2*i+2];
  }
  return averageOfLevels(nodes[0]);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS with a depth parameter. Accumulate (sum, count) per depth, then divide at the end.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Visit every node', spaceExplanation: 'DFS stack of height h', visualization: 'linear' },
      },
      optimized: {
        description: 'BFS naturally processes level by level. Snapshot queue size before each level to know how many nodes to sum.',
        complexity: { time: 'O(n)', space: 'O(w)', timeExplanation: 'Process every node once', spaceExplanation: 'Queue bounded by max width', visualization: 'linear' },
      },
      followUps: [
        'Binary Tree Level Order Traversal (LC 102) — return the nodes themselves',
        'Maximum Depth of Binary Tree (LC 104)',
        'What if node values can overflow int? (Use long or BigInt)',
      ],
      edgeCases: [
        'Null root → return empty array',
        'Single node → [root.val]',
        'Skewed tree → each level has exactly one node',
        'Large values — sum may overflow 32-bit int; use Number (64-bit float) in JS',
      ],
      commonMistakes: [
        'Not snapshotting queue length before the inner loop — queue grows during the loop',
        'Integer division instead of floating-point division',
        'Using forEach on the queue while also mutating it',
      ],
      interviewerTips: [
        'The queue size snapshot is the key technique — explain why you capture it before the loop',
        'Mention that DFS with depth accumulation also works but BFS is more natural here',
        'Note potential integer overflow for very large or many nodes',
      ],
    },
    codeChallenge: {
      functionName: 'averageOfLevelsArr',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - level-order tree representation
 * @return {number[]} - average value at each level
 */
function averageOfLevelsArr(levelOrder) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[3, 9, 20, 15, 7]]], expected: [3.0, 14.5, 11.0], description: 'Standard 3-level tree' },
        { input: [[[3, 9, 20]]], expected: [3.0, 14.5], description: 'Two-level tree' },
        { input: [[[1]]], expected: [1.0], description: 'Single node' },
        { input: [[[1, 2, 3, 4, 5]]], expected: [1.0, 2.5, 4.5], description: 'Complete 3-level tree' },
        { input: [[[0, -1, 1]]], expected: [0.0, 0.0], description: 'Negative values averaging to 0' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['binary-tree-level-order'],
    relatedPatterns: ['BFS Level Order', 'Running Average'],
    intuitionSummary: 'BFS with queue size snapshot before each level. Sum the level, divide by count, push to result.',
    patternName: 'BFS Level Average',
  },

  // ─── 7. Binary Tree Zigzag Level Order (103) ─────────────────────────────
  {
    id: 'binary-tree-zigzag',
    slug: 'binary-tree-zigzag-level-order-traversal',
    leetcodeNumber: 103,
    title: 'Binary Tree Zigzag Level Order Traversal',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['binary-tree', 'bfs', 'level-order', 'deque'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Traverse a binary tree level by level, but alternate direction each level: left-to-right, then right-to-left, then left-to-right again!',
      engineer: 'BFS with a level counter. For even levels collect values left-to-right; for odd levels reverse the collected values (or build the array right-to-left).',
      interview: 'O(n) time, O(w) space. Standard BFS with a leftToRight flag. At each level, either push to the end or unshift to the front of the current level array. Toggle the flag after each level.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 20, label: 'level 2 first (R→L): 20' },
        { id: 'b', value: 9, label: 'level 2 second (R→L): 9' },
        { id: 'c', value: 3, label: 'level 1 first: 3' },
        { id: 'd', value: 15, label: 'level 3 first: 15' },
      ],
      target: 29,
      instruction: '[3,9,20,null,null,15,7] zigzag: level 2 goes RIGHT-TO-LEFT. Select the two nodes at level 2.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Use BFS with a queue. Process levels one at a time using the queue-size snapshot technique.', xpCost: 0 },
      { id: 2, text: 'Maintain a boolean flag leftToRight. For each node on the level, push its value to the end if true, or to the front (index 0) if false.', xpCost: 0 },
      { id: 3, text: 'After finishing each level, toggle leftToRight = !leftToRight and push the level array to the result.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [3,9,20,null,null,15,7]. Queue=[3]. leftToRight=true. Level 0: collect [3].',
        state: { level: 0, direction: 'left-to-right', nodes: [3], levelResult: [3] },
        annotation: 'Level 0: [3]',
      },
      {
        id: 2,
        description: 'Enqueue 9,20. Toggle leftToRight=false. Level 1: size=2. Collect node(9)→front, node(20)→front? Actually collect right-to-left: [20,9].',
        state: { level: 1, direction: 'right-to-left', nodes: [9, 20], levelResult: [20, 9] },
        annotation: 'Level 1: [20,9] (right-to-left)',
      },
      {
        id: 3,
        description: 'Enqueue 15,7 (children of 20). Toggle leftToRight=true. Level 2: size=2. node(15) push end, node(7) push end → [15,7].',
        state: { level: 2, direction: 'left-to-right', nodes: [15, 7], levelResult: [15, 7] },
        annotation: 'Level 2: [15,7] (left-to-right)',
      },
      {
        id: 4,
        description: 'Queue empty. Result: [[3],[20,9],[15,7]].',
        state: { result: [[3], [20, 9], [15, 7]] },
        annotation: 'Return result ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(w)',
      timeExplanation: 'Every node visited once.',
      spaceExplanation: 'Queue holds at most one full level; result array holds all n values.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val); // insert at front for reverse order
      }
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}

// ── array-based wrapper for test harness ──
function zigzagLevelOrderArr(levelOrder) {
  if (!levelOrder || levelOrder.length === 0) return [];
  const nodes = levelOrder.map(v => v != null ? { val: v, left: null, right: null } : null);
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue;
    if (2*i+1 < nodes.length) nodes[i].left  = nodes[2*i+1];
    if (2*i+2 < nodes.length) nodes[i].right = nodes[2*i+2];
  }
  return zigzagLevelOrder(nodes[0]);
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'BFS normally, then reverse every odd-indexed level array after the fact.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Full BFS plus reversals', spaceExplanation: 'Store all level arrays', visualization: 'linear' },
      },
      optimized: {
        description: 'BFS with unshift vs push toggle. Avoids post-processing reversal — each value inserted at correct position during traversal.',
        complexity: { time: 'O(n)', space: 'O(w)', timeExplanation: 'One pass over all nodes', spaceExplanation: 'Queue bounded by max width', visualization: 'linear' },
      },
      followUps: [
        'Binary Tree Level Order (LC 102) — same without the zigzag',
        'Can you use a deque (double-ended queue) to avoid unshift O(n) cost?',
        'What about a spiral matrix? (LC 54) — similar direction-alternating pattern',
      ],
      edgeCases: [
        'Null root → return []',
        'Single node → [[root.val]]',
        'Right-skewed or left-skewed tree',
        'Perfect binary tree — all levels alternate cleanly',
      ],
      commonMistakes: [
        'Toggling direction inside the inner loop instead of outside',
        'Forgetting the queue size snapshot — queue grows during the inner loop',
        'Using level.reverse() after full collection — correct but less elegant than unshift',
      ],
      interviewerTips: [
        'Unshift is O(n) per insert — mention that a deque or pre-allocated array with index tracking is O(1)',
        'The leftToRight toggle is the only change from plain BFS level order',
        'Drawing the zigzag pattern on paper helps when explaining to an interviewer',
      ],
    },
    codeChallenge: {
      functionName: 'zigzagLevelOrderArr',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} levelOrder - level-order tree representation
 * @return {number[][]} - zigzag level order values
 */
function zigzagLevelOrderArr(levelOrder) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[3, 9, 20, null, null, 15, 7]]], expected: [[3], [20, 9], [15, 7]], description: 'Standard 3-level tree' },
        { input: [[[1]]], expected: [[1]], description: 'Single node' },
        { input: [[[1, 2, 3, 4, 5]]], expected: [[1], [3, 2], [4, 5]], description: 'Three levels' },
        { input: [[[1, 2]]], expected: [[1], [2]], description: 'Root with left child only' },
        { input: [[[1, 2, 3, 4, 5, 6, 7]]], expected: [[1], [3, 2], [4, 5, 6, 7]], description: 'Perfect 3-level tree' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 60, coding: 150 },
    prerequisites: ['binary-tree-level-order'],
    relatedPatterns: ['BFS Level Order', 'Direction Toggle'],
    intuitionSummary: 'BFS with a leftToRight flag. Alternate between push and unshift for each level. Toggle the flag after every level.',
    patternName: 'Zigzag BFS',
  },

  // ─── 8. Convert Sorted Array to BST (108) ────────────────────────────────
  {
    id: 'convert-sorted-array-bst',
    slug: 'convert-sorted-array-to-binary-search-tree',
    leetcodeNumber: 108,
    title: 'Convert Sorted Array to Binary Search Tree',
    category: 'divide-conquer',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['binary-tree', 'divide-conquer', 'bst', 'recursion'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Adobe'],
    descriptions: {
      explorer: 'Turn a sorted array into a height-balanced BST. Pick the middle element as the root to keep the tree balanced!',
      engineer: 'Divide and conquer. The middle element of any subarray becomes its subtree\'s root. Recurse on left half for left child, right half for right child.',
      interview: 'O(n) time, O(log n) stack space. Always pick mid = (lo + hi) >> 1 as root. Recursively build left subtree from [lo, mid-1] and right from [mid+1, hi]. The sorted order guarantees BST property.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'root: nums[2]=0 (middle)' },
        { id: 'b', value: 5, label: 'right child: nums[3]=5' },
        { id: 'c', value: -3, label: 'left child: nums[1]=-3' },
        { id: 'd', value: 9, label: 'right subtree right: nums[4]=9' },
      ],
      target: 5,
      instruction: '[-10,-3,0,5,9]: mid element=0 becomes root. Next level: -3 (left) and 5 (right). Select root and right child values.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'A height-balanced BST requires roughly equal-sized left and right subtrees. The middle element of a sorted array naturally achieves this.', xpCost: 0 },
      { id: 2, text: 'Use a recursive helper with lo and hi indices. Root = nums[mid] where mid = Math.floor((lo + hi) / 2).', xpCost: 0 },
      { id: 3, text: 'Base case: lo > hi returns null. Left child = helper(lo, mid-1), right child = helper(mid+1, hi). BST property is automatic because the array is sorted.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [-10,-3,0,5,9]. Call helper(0,4). mid=2, root=nums[2]=0.',
        state: { arr: [-10, -3, 0, 5, 9], lo: 0, hi: 4, mid: 2, root: 0 },
        annotation: 'Root = 0',
      },
      {
        id: 2,
        description: 'Left subtree: helper(0,1). mid=0, root=nums[0]=-10. Left child of 0.',
        state: { lo: 0, hi: 1, mid: 0, root: -10 },
        annotation: 'Left child of 0 = -10',
      },
      {
        id: 3,
        description: 'helper(1,1): mid=1, root=nums[1]=-3. Right child of -10. helper(0,-1) and helper(2,1) both return null.',
        state: { root: -3, leftChild: null, rightChild: null },
        annotation: '-10.right = -3',
      },
      {
        id: 4,
        description: 'Right subtree: helper(3,4). mid=3, root=nums[3]=5. Right child of 0.',
        state: { lo: 3, hi: 4, mid: 3, root: 5 },
        annotation: 'Right child of 0 = 5',
      },
      {
        id: 5,
        description: 'helper(4,4): root=9, right child of 5. Final BST: 0→{-10→{null,-3}, 5→{null,9}}. Height balanced.',
        state: { result: 'balanced BST', height: 3 },
        annotation: 'Height-balanced BST constructed ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(log n)',
      timeExplanation: 'Every element becomes exactly one node — n nodes created.',
      spaceExplanation: 'Recursion stack depth is O(log n) because we always split in half.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function sortedArrayToBST(nums) {
  function helper(lo, hi) {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1; // integer division
    const node = { val: nums[mid], left: null, right: null };
    node.left  = helper(lo, mid - 1);
    node.right = helper(mid + 1, hi);
    return node;
  }
  return helper(0, nums.length - 1);
}

// ── serialise result to level-order for test harness ──
function sortedArrayToBSTArr(nums) {
  const root = sortedArrayToBST(nums);
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node ? node.val : null);
    if (node) {
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  // Trim trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) result.pop();
  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Insert elements one by one into a BST. This can become O(n^2) if not balanced.',
        complexity: { time: 'O(n^2)', space: 'O(n)', timeExplanation: 'Each insert in unbalanced BST is O(n)', spaceExplanation: 'The BST itself', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Divide and conquer: always pick the midpoint as root. Guarantees height-balanced output in O(n).',
        complexity: { time: 'O(n)', space: 'O(log n)', timeExplanation: 'Create n nodes in O(n) total', spaceExplanation: 'Recursion depth log n', visualization: 'logarithmic' },
      },
      followUps: [
        'Convert Sorted List to BST (LC 109) — same idea but finding the midpoint in a linked list is O(n)',
        'Validate Binary Search Tree (LC 98)',
        'What if you want to favor the left child when there are two middle elements?',
      ],
      edgeCases: [
        'Single element → single node BST',
        'Two elements → root and one child',
        'Even-length array — two valid midpoints; either is acceptable',
        'Empty array → return null',
      ],
      commonMistakes: [
        'Using (lo + hi) / 2 with floating point — use Math.floor or bitwise >> 1',
        'Not understanding that BST property is guaranteed by the sorted array — no explicit comparison needed',
        'Forgetting base case lo > hi',
      ],
      interviewerTips: [
        'Mention that picking the middle element guarantees height balance',
        'The BST property comes free from the sorted array — you don\'t need to compare values during construction',
        'Connect to Binary Search — same mid-picking logic',
      ],
    },
    codeChallenge: {
      functionName: 'sortedArrayToBSTArr',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums - sorted array
 * @return {(number|null)[]} - level-order representation of the BST
 */
function sortedArrayToBSTArr(nums) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[-10, -3, 0, 5, 9]], expected: [0, -10, 5, null, -3, null, 9], description: 'Standard 5-element array' },
        { input: [[1, 3]], expected: [1, null, 3], description: 'Two elements' },
        { input: [[1]], expected: [1], description: 'Single element' },
        { input: [[-3, 0, 5]], expected: [0, -3, 5], description: 'Three elements' },
        { input: [[1, 2, 3, 4, 5]], expected: [3, 1, 4, null, 2, null, 5], description: 'Five elements, perfect split' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['binary-tree-level-order'],
    relatedPatterns: ['Divide and Conquer', 'BST Construction'],
    intuitionSummary: 'Pick the midpoint as root, recurse on each half. The sorted array guarantees BST property; mid-picking guarantees balance.',
    patternName: 'Midpoint Divide and Conquer',
  },

  // ─── 9. Construct Quad Tree (427) ────────────────────────────────────────
  {
    id: 'construct-quad-tree',
    slug: 'construct-quad-tree',
    leetcodeNumber: 427,
    title: 'Construct Quad Tree',
    category: 'divide-conquer',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['divide-conquer', 'tree', 'matrix', 'recursion'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Build a quad tree from a grid — if all cells in a region have the same value, it\'s a leaf. Otherwise split into four quadrants and recurse!',
      engineer: 'Check if all values in the current region are equal. If yes, create a leaf node. If no, split the region into 4 equal quadrants and recurse on each.',
      interview: 'O(n^2 log n) time. At each recursive call, scan the sub-grid to check uniformity. If uniform, return isLeaf=true node. Otherwise split at mid row/col and recurse on four quadrants.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 4, label: 'quadrant count: 4 leaf nodes' },
        { id: 'b', value: 0, label: 'root isLeaf: false (0)' },
        { id: 'c', value: 1, label: 'top-right: 1 (isLeaf=true, val=1)' },
        { id: 'd', value: 2, label: 'total nodes: non-leaf + 4 leaves' },
      ],
      target: 4,
      instruction: '[[0,1],[1,0]]: not uniform, so split into 4. Select the leaf count and root\'s isLeaf value.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Write a helper isUniform(r1, c1, r2, c2) that checks if all cells in that rectangle share the same value.', xpCost: 0 },
      { id: 2, text: 'If the region is uniform, return { isLeaf: true, val: grid[r1][c1], topLeft: null, ... }. Otherwise compute mid = (r2-r1)/2 and recurse on 4 quadrants.', xpCost: 0 },
      { id: 3, text: 'The four quadrants are: top-left (r1,c1)→(mid,mid), top-right (r1,mid)→(mid,c2), bottom-left (mid,c1)→(r2,mid), bottom-right (mid,mid)→(r2,c2).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'grid=[[0,1],[1,0]], size=2. Check if all values equal: 0,1,1,0 — not uniform. Split at mid=1.',
        state: { grid: [[0, 1], [1, 0]], uniform: false, mid: 1 },
        annotation: 'Not uniform → split into 4',
      },
      {
        id: 2,
        description: 'Top-left quadrant: grid[0][0]=0. Single cell, always uniform. Leaf {val:0, isLeaf:true}.',
        state: { quadrant: 'topLeft', val: 0, isLeaf: true },
        annotation: 'topLeft = leaf(0)',
      },
      {
        id: 3,
        description: 'Top-right: grid[0][1]=1. Leaf {val:1, isLeaf:true}.',
        state: { quadrant: 'topRight', val: 1, isLeaf: true },
        annotation: 'topRight = leaf(1)',
      },
      {
        id: 4,
        description: 'Bottom-left: grid[1][0]=1. Leaf {val:1}. Bottom-right: grid[1][1]=0. Leaf {val:0}.',
        state: { quadrant: 'bottomLeft/Right', vals: [1, 0], isLeaf: true },
        annotation: 'bottomLeft = leaf(1), bottomRight = leaf(0)',
      },
      {
        id: 5,
        description: 'Root node: isLeaf=false, val=1 (arbitrary for non-leaf), 4 children attached.',
        state: { root: { isLeaf: false }, children: ['leaf(0)', 'leaf(1)', 'leaf(1)', 'leaf(0)'] },
        annotation: 'Non-leaf root with 4 children ✓',
      },
    ],
    complexity: {
      time: 'O(n^2 log n)',
      space: 'O(log n)',
      timeExplanation: 'At each level we scan up to n^2 cells; there are log n levels. Can be optimized to O(n^2) with prefix sums.',
      spaceExplanation: 'Recursion depth is log n (grid halves each level).',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function construct(grid) {
  const n = grid.length;

  function isUniform(r1, c1, size) {
    const val = grid[r1][c1];
    for (let r = r1; r < r1 + size; r++) {
      for (let c = c1; c < c1 + size; c++) {
        if (grid[r][c] !== val) return false;
      }
    }
    return true;
  }

  function helper(r, c, size) {
    if (isUniform(r, c, size)) {
      return { val: grid[r][c] === 1, isLeaf: true, topLeft: null, topRight: null, bottomLeft: null, bottomRight: null };
    }
    const half = size / 2;
    return {
      val: true, // val is arbitrary for non-leaf nodes
      isLeaf: false,
      topLeft:     helper(r,        c,        half),
      topRight:    helper(r,        c + half, half),
      bottomLeft:  helper(r + half, c,        half),
      bottomRight: helper(r + half, c + half, half),
    };
  }

  return helper(0, 0, n);
}

// ── serialise to flat array for test harness ──
function constructQuadTree(grid) {
  const root = construct(grid);
  // Return [isLeaf, val] pairs in level-order
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) continue;
    result.push([node.isLeaf ? 1 : 0, node.val ? 1 : 0]);
    if (!node.isLeaf) {
      queue.push(node.topLeft, node.topRight, node.bottomLeft, node.bottomRight);
    }
  }
  return result;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same recursive approach but re-scan entire sub-grid at each level to check uniformity — O(n^2 log n).',
        complexity: { time: 'O(n^2 log n)', space: 'O(log n)', timeExplanation: 'Each level scans shrinking subgrids summing to n^2', spaceExplanation: 'Log n recursion depth', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Precompute 2D prefix sums to check uniformity in O(1) per region — reduces total to O(n^2).',
        complexity: { time: 'O(n^2)', space: 'O(n^2)', timeExplanation: 'Prefix sum build O(n^2), each query O(1)', spaceExplanation: 'Prefix sum array', visualization: 'quadratic' },
      },
      followUps: [
        'How do you intersect two quad trees? (LC 558)',
        'Can you use prefix sums to make uniformity check O(1)?',
        'How is a quad tree used in spatial indexing (e.g., collision detection)?',
      ],
      edgeCases: [
        '1×1 grid → always a leaf',
        'All zeros or all ones → single leaf node (root)',
        'Grid size must be a power of 2 (guaranteed by the problem)',
      ],
      commonMistakes: [
        'Not realizing that non-leaf node val is arbitrary — some solutions hardcode true or false',
        'Incorrect quadrant boundary calculations — off-by-one in row/col ranges',
        'Forgetting to set null children on leaf nodes',
      ],
      interviewerTips: [
        'Mention the prefix sum optimization — shows depth beyond naive recursion',
        'Clarify that val of a non-leaf node is irrelevant per the problem statement',
        'The 4-way split is the key divide-and-conquer insight; contrast with binary tree\'s 2-way split',
      ],
    },
    codeChallenge: {
      functionName: 'constructQuadTree',
      starterCode: {
        javascript: `/**
 * @param {number[][]} grid - n×n grid of 0s and 1s (n is a power of 2)
 * @return {[number,number][]} - level-order [isLeaf, val] pairs
 */
function constructQuadTree(grid) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[[0, 1], [1, 0]]]], expected: [[0, 1], [1, 0], [1, 1], [1, 1], [1, 0]], description: '2×2 mixed grid' },
        { input: [[[[1, 1], [1, 1]]]], expected: [[1, 1]], description: '2×2 all ones — single leaf' },
        { input: [[[[0, 0], [0, 0]]]], expected: [[1, 0]], description: '2×2 all zeros — single leaf' },
        { input: [[[[1]]]], expected: [[1, 1]], description: '1×1 grid' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 60, coding: 150 },
    prerequisites: ['convert-sorted-array-bst'],
    relatedPatterns: ['Divide and Conquer', 'Quad Tree'],
    intuitionSummary: 'Uniform region → leaf. Mixed region → split into 4 and recurse. Prefix sums can make uniformity check O(1).',
    patternName: 'Quad Tree Divide and Conquer',
  },

  // ─── 10. Interleaving String (97) ────────────────────────────────────────
  {
    id: 'interleaving-string',
    slug: 'interleaving-string',
    leetcodeNumber: 97,
    title: 'Interleaving String',
    category: 'dynamic-programming',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['dynamic-programming', 'string', '2d-dp'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Can you weave characters from two strings together (without reordering) to form a third string? This is the interleaving problem!',
      engineer: 'dp[i][j] = true if s1[0..i) and s2[0..j) can interleave to form s3[0..i+j). Transition: dp[i][j] = (dp[i-1][j] && s1[i-1]===s3[i+j-1]) || (dp[i][j-1] && s2[j-1]===s3[i+j-1]).',
      interview: 'O(m*n) time and space. Build a (m+1)×(n+1) DP table. dp[0][0]=true. Fill row 0 and col 0 as base cases. Answer is dp[m][n].',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'len(s1)=3' },
        { id: 'b', value: 3, label: 'len(s2)=3' },
        { id: 'c', value: 6, label: 'len(s3)=6=len(s1)+len(s2)' },
        { id: 'd', value: 2, label: 'chars from s2 used first: 2' },
      ],
      target: 6,
      instruction: '"aab" + "axy" interleave → "aaxaby": len(s1)+len(s2) must equal len(s3). Select len(s1) and len(s2).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Define dp[i][j] = true if s1[0..i) and s2[0..j) interleave to form s3[0..i+j). Start with dp[0][0]=true.', xpCost: 0 },
      { id: 2, text: 'At each cell, check two possibilities: did the last character of s3 come from s1 (dp[i-1][j] && s1[i-1]===s3[i+j-1]) or from s2 (dp[i][j-1] && s2[j-1]===s3[i+j-1])?', xpCost: 0 },
      { id: 3, text: 'Early exit: if s1.length + s2.length !== s3.length, return false immediately. The answer is dp[s1.length][s2.length].', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's1="aab", s2="bc", s3="aabbc" (trimmed example). dp is (4)×(3) table. dp[0][0]=true.',
        state: { s1: 'aab', s2: 'bc', s3: 'aabbc', dp: [[true, false, false], [false, false, false], [false, false, false], [false, false, false]] },
        annotation: 'dp[0][0] = true',
      },
      {
        id: 2,
        description: 'Fill row 0: dp[0][1] = dp[0][0] && s2[0]("b")===s3[1]("a")? false. dp[0][2]: false. All row-0 cells after [0][0] are false.',
        state: { row0: [true, false, false] },
        annotation: 'Base row (only s2 characters)',
      },
      {
        id: 3,
        description: 'Fill col 0: dp[1][0] = dp[0][0] && s1[0]("a")===s3[0]("a")? true. dp[2][0]: s1[1]("a")===s3[1]("a")? true. dp[3][0]: s1[2]("b")===s3[2]("b")? true.',
        state: { col0: [true, true, true, true] },
        annotation: 'Base column (only s1 characters)',
      },
      {
        id: 4,
        description: 'dp[3][2]: from top dp[2][2] && s1[2]("b")===s3[4]("c")? No. From left dp[3][1] && s2[1]("c")===s3[4]("c")? dp[3][1] && true. dp[3][1]: from dp[2][1] && s1[2]===s3[3]("b")? yes. So dp[3][2]=true.',
        state: { dp33: true },
        annotation: 'dp[3][2] = true',
      },
      {
        id: 5,
        description: 'dp[3][2]=true means s1="aab" and s2="bc" can interleave to form s3="aabbc". Answer: true.',
        state: { answer: true },
        annotation: 'Return dp[m][n] = true ✓',
      },
    ],
    complexity: {
      time: 'O(m*n)',
      space: 'O(m*n)',
      timeExplanation: 'Fill every cell of the (m+1)×(n+1) DP table once.',
      spaceExplanation: 'The DP table has (m+1)*(n+1) cells. Can be optimized to O(n) with rolling array.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;

  // dp[i][j] = can s1[0..i) and s2[0..j) form s3[0..i+j)
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  // Base case: using only s1
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i-1][0] && s1[i-1] === s3[i-1];
  }
  // Base case: using only s2
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j-1] && s2[j-1] === s3[j-1];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        (dp[i-1][j] && s1[i-1] === s3[i+j-1]) ||
        (dp[i][j-1] && s2[j-1] === s3[i+j-1]);
    }
  }

  return dp[m][n];
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive exploration: at each step pick the next character from s1 or s2, check if it matches s3. Exponential without memoization.',
        complexity: { time: 'O(2^(m+n))', space: 'O(m+n)', timeExplanation: 'Every character can come from s1 or s2', spaceExplanation: 'Recursion depth m+n', visualization: 'quadratic' },
      },
      optimized: {
        description: '2D DP or memoized recursion. dp[i][j] only depends on dp[i-1][j] and dp[i][j-1].',
        complexity: { time: 'O(m*n)', space: 'O(m*n)', timeExplanation: 'Fill m*n table once', spaceExplanation: 'O(n) with rolling-row optimization', visualization: 'quadratic' },
      },
      followUps: [
        'Space-optimize to O(n) using a 1D rolling array',
        'Edit Distance (LC 72) — another 2D DP on two strings',
        'What if characters can be drawn from more than 2 strings? (generalize the DP dimensions)',
      ],
      edgeCases: [
        's1 or s2 is empty — s3 must equal the other string',
        'Lengths don\'t add up → immediate false',
        'All characters identical — many valid interleavings',
      ],
      commonMistakes: [
        'Forgetting the length check — s1.length + s2.length !== s3.length is an immediate false',
        'Off-by-one: s1[i-1] and s3[i+j-1] indices when filling dp[i][j]',
        'Not initializing the base row and column',
      ],
      interviewerTips: [
        'Explain the state definition carefully: dp[i][j] represents first i chars of s1 + first j chars of s2',
        'The transition is: last character of s3[i+j-1] came from either s1 or s2',
        'Mention the O(n) space optimization with rolling array as a follow-up',
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
        { input: ['aabcc', 'dbbca', 'aadbbcbcac'], expected: true, description: 'Valid interleaving' },
        { input: ['aabcc', 'dbbca', 'aadbbbaccc'], expected: false, description: 'Invalid interleaving' },
        { input: ['', '', ''], expected: true, description: 'All empty strings' },
        { input: ['a', '', 'a'], expected: true, description: 's2 empty' },
        { input: ['a', 'b', 'ab'], expected: true, description: 'Single chars' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 70, coding: 160 },
    prerequisites: ['climbing-stairs'],
    relatedPatterns: ['2D Dynamic Programming', 'String DP'],
    intuitionSummary: 'dp[i][j] = can s1[0..i) + s2[0..j) form s3[0..i+j). Each cell checks if the last character came from s1 or s2.',
    patternName: '2D String DP',
  },

  // ─── 11. H-Index (274) ───────────────────────────────────────────────────
  {
    id: 'h-index',
    slug: 'h-index',
    leetcodeNumber: 274,
    title: 'H-Index',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'sort', 'counting-sort'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'LinkedIn', 'Bloomberg'],
    descriptions: {
      explorer: 'Find the h-index: the maximum h such that you have h papers each cited at least h times. Sort and scan!',
      engineer: 'Sort citations in descending order. The h-index is the maximum i+1 (1-indexed) such that citations[i] >= i+1.',
      interview: 'O(n log n) with sort. After sorting descending, scan: if citations[i] >= i+1, update h = i+1. When citations[i] < i+1 the condition can never be satisfied for larger i, so stop or just iterate fully.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'h=3' },
        { id: 'b', value: 3, label: 'papers with ≥3 citations: 3' },
        { id: 'c', value: 5, label: 'highest: 6 (not h)' },
        { id: 'd', value: 6, label: 'max citations: 6' },
      ],
      target: 6,
      instruction: 'citations=[3,0,6,1,5]: h=3 means 3 papers have ≥3 citations. Select h and qualifying paper count.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The h-index means h papers have at least h citations. Sort citations in descending order so the most-cited papers come first.', xpCost: 0 },
      { id: 2, text: 'After sorting, check each position i (0-indexed). If citations[i] >= i+1, then at least i+1 papers have at least i+1 citations.', xpCost: 0 },
      { id: 3, text: 'The answer is the largest i+1 satisfying the condition. Since the array is sorted descending, once citations[i] < i+1 it will never be satisfied for larger i — break early.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [3,0,6,1,5]. Sort descending: [6,5,3,1,0].',
        state: { original: [3, 0, 6, 1, 5], sorted: [6, 5, 3, 1, 0] },
        annotation: 'Sort descending',
      },
      {
        id: 2,
        description: 'i=0: citations[0]=6 >= 1? Yes. h=1.',
        state: { i: 0, citations: 6, threshold: 1, h: 1 },
        annotation: 'h = 1',
      },
      {
        id: 3,
        description: 'i=1: citations[1]=5 >= 2? Yes. h=2.',
        state: { i: 1, citations: 5, threshold: 2, h: 2 },
        annotation: 'h = 2',
      },
      {
        id: 4,
        description: 'i=2: citations[2]=3 >= 3? Yes. h=3.',
        state: { i: 2, citations: 3, threshold: 3, h: 3 },
        annotation: 'h = 3',
      },
      {
        id: 5,
        description: 'i=3: citations[3]=1 >= 4? No. i=4: citations[4]=0 >= 5? No. Return h=3.',
        state: { result: 3 },
        annotation: 'Return h = 3 ✓',
      },
    ],
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)',
      timeExplanation: 'Dominated by the sort. The scan after is O(n).',
      spaceExplanation: 'In-place sort uses O(log n) stack. Output is a single integer.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function hIndex(citations) {
  citations.sort((a, b) => b - a); // descending

  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      h = i + 1;
    } else {
      break; // sorted desc, can never satisfy condition again
    }
  }
  return h;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For every candidate h from n down to 0, count papers with citations >= h. Return the first h where count >= h. O(n^2).',
        complexity: { time: 'O(n^2)', space: 'O(1)', timeExplanation: 'n candidates × n count passes', spaceExplanation: 'Constant extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sort descending in O(n log n). Single O(n) scan. Can also use counting sort for O(n) total.',
        complexity: { time: 'O(n log n)', space: 'O(1)', timeExplanation: 'Sort dominates', spaceExplanation: 'In-place sort', visualization: 'nlogn' },
      },
      followUps: [
        'H-Index II (LC 275) — already sorted; binary search for O(log n)',
        'Counting sort approach: bucket[min(c,n)]++, scan from n to 0 accumulating count',
        'What does the h-index mean intuitively for a researcher\'s impact?',
      ],
      edgeCases: [
        'All zeros → h-index is 0',
        'Single paper with high citations → h=1 at most',
        'All citations equal → h = min(n, citations[0])',
        'Already sorted input — still works correctly',
      ],
      commonMistakes: [
        'Sorting ascending instead of descending',
        'Using i instead of i+1 for the threshold (off-by-one)',
        'Not breaking early when condition fails — still correct but unnecessarily slow',
      ],
      interviewerTips: [
        'Mention the counting sort O(n) approach as an optimization — it avoids the sort entirely',
        'H-Index II (binary search on sorted array) is a natural follow-up',
        'Explain the h-index definition clearly before coding — interviewers want to see you understand the problem',
      ],
    },
    codeChallenge: {
      functionName: 'hIndex',
      starterCode: {
        javascript: `/**
 * @param {number[]} citations
 * @return {number}
 */
function hIndex(citations) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3, 0, 6, 1, 5]], expected: 3, description: 'Classic example → 3' },
        { input: [[1, 3, 1]], expected: 1, description: 'h=1' },
        { input: [[0]], expected: 0, description: 'Zero citations' },
        { input: [[100]], expected: 1, description: 'Single paper, many citations' },
        { input: [[4, 4, 4, 4]], expected: 4, description: 'All equal → h equals count' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 50, coding: 130 },
    prerequisites: [],
    relatedPatterns: ['Sort and Scan', 'Counting Sort'],
    intuitionSummary: 'Sort descending. Scan: h = i+1 while citations[i] >= i+1. The largest such i+1 is the h-index.',
    patternName: 'Sort and Threshold Scan',
  },

  // ─── 12. Rotate Array (189) ───────────────────────────────────────────────
  {
    id: 'rotate-array',
    slug: 'rotate-array',
    leetcodeNumber: 189,
    title: 'Rotate Array',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'two-pointer', 'in-place', 'reverse'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Bloomberg'],
    descriptions: {
      explorer: 'Rotate an array to the right by k steps in-place. The last k elements jump to the front!',
      engineer: 'Triple reversal trick: reverse the entire array, reverse the first k elements, then reverse the rest. O(n) time, O(1) space.',
      interview: 'In-place O(n), O(1). k %= n to handle k >= n. (1) Reverse all. (2) Reverse nums[0..k-1]. (3) Reverse nums[k..n-1]. The composition of three reversals achieves the rotation.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 4, label: 'new head: nums[4]=5' },
        { id: 'b', value: 3, label: 'new tail: nums[3]=4' },
        { id: 'c', value: 3, label: 'k=3' },
        { id: 'd', value: 7, label: 'n=7' },
      ],
      target: 7,
      instruction: 'Rotate [1,2,3,4,5,6,7] by k=3 → [5,6,7,1,2,3,4]. Select original indices of new FIRST and LAST elements.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Always take k = k % n first. If k === 0 after this, the array is already correct.', xpCost: 0 },
      { id: 2, text: 'Write a helper reverse(nums, l, r) that reverses in-place using two pointers swapping from both ends.', xpCost: 0 },
      { id: 3, text: 'Three steps: reverse(0, n-1), reverse(0, k-1), reverse(k, n-1). This is the triple reversal pattern — try it on paper to see why it works.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1,2,3,4,5,6,7], k=3. k%7=3. Reverse all: [7,6,5,4,3,2,1].',
        state: { after_reverse_all: [7, 6, 5, 4, 3, 2, 1], k: 3 },
        annotation: 'Step 1: reverse entire array',
      },
      {
        id: 2,
        description: 'Reverse first k=3 elements: [7,6,5] → [5,6,7]. Array: [5,6,7,4,3,2,1].',
        state: { after_reverse_first_k: [5, 6, 7, 4, 3, 2, 1] },
        annotation: 'Step 2: reverse first 3',
      },
      {
        id: 3,
        description: 'Reverse remaining n-k=4 elements: [4,3,2,1] → [1,2,3,4]. Array: [5,6,7,1,2,3,4].',
        state: { after_reverse_rest: [5, 6, 7, 1, 2, 3, 4] },
        annotation: 'Step 3: reverse last 4',
      },
      {
        id: 4,
        description: 'Final: [5,6,7,1,2,3,4]. Last 3 elements (5,6,7) moved to front. Correct!',
        state: { result: [5, 6, 7, 1, 2, 3, 4] },
        annotation: 'Rotation complete ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each of the three reverse passes is O(n). Total: O(n).',
      spaceExplanation: 'In-place reversal uses only two pointer variables.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function rotate(nums, k) {
  const n = nums.length;
  k = k % n;
  if (k === 0) return;

  function reverse(l, r) {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }

  reverse(0, n - 1);     // reverse all
  reverse(0, k - 1);     // reverse first k
  reverse(k, n - 1);     // reverse the rest
}

// ── wrapper that returns the modified array for test harness ──
function rotateAndReturn(arr, k) {
  const nums = [...arr]; // copy to avoid mutating test input
  rotate(nums, k);
  return nums;
}`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Copy last k elements to a temp array, shift remaining elements right by k, copy temp back. O(n) time, O(k) space.',
        complexity: { time: 'O(n)', space: 'O(k)', timeExplanation: 'Two passes over the array', spaceExplanation: 'Temporary array of k elements', visualization: 'linear' },
      },
      optimized: {
        description: 'Triple reversal — in-place, O(1) space. Reverse all, then reverse first k, then reverse rest.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Three O(n/2) reverse passes = O(n)', spaceExplanation: 'Only swap variables', visualization: 'linear' },
      },
      followUps: [
        'Rotate List (LC 61) — same concept for linked lists',
        'Reverse Words in a String (LC 151) — uses similar triple-reverse idea',
        'Can you solve with cyclic replacements in O(n) time, O(1) space without reversals?',
      ],
      edgeCases: [
        'k = 0 → no change',
        'k >= n → use k % n; same as k % n rotation',
        'Single element → always unchanged',
        'k = n → no change (full rotation)',
      ],
      commonMistakes: [
        'Not reducing k with k % n — causes out-of-bounds or incorrect reversal ranges',
        'Reversing ranges [0, k] instead of [0, k-1] (off-by-one)',
        'Mutating the original input array when a copy is expected',
      ],
      interviewerTips: [
        'The triple reversal is the elegant O(1) space solution — mention it as the primary approach',
        'Always reduce k modulo n upfront — interviewers check if you handle k >= n',
        'Can also mention cyclic replacement as an alternative O(1) space technique (more complex to implement)',
      ],
    },
    codeChallenge: {
      functionName: 'rotateAndReturn',
      starterCode: {
        javascript: `/**
 * @param {number[]} arr - input array
 * @param {number} k - rotation steps
 * @return {number[]} - array after rotating right by k steps
 */
function rotateAndReturn(arr, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], description: 'Standard k=3 rotation' },
        { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], description: 'Negative values, k=2' },
        { input: [[1, 2], 3], expected: [2, 1], description: 'k > length (k=3, n=2)' },
        { input: [[1], 5], expected: [1], description: 'Single element' },
        { input: [[1, 2, 3], 3], expected: [1, 2, 3], description: 'k equals length, no change' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 30, code: 50, coding: 130 },
    prerequisites: [],
    relatedPatterns: ['Triple Reversal', 'In-Place Array Manipulation'],
    intuitionSummary: 'k %= n. Reverse all, reverse first k, reverse rest. Three reversals compose to a right rotation by k.',
    patternName: 'Triple Reversal Rotation',
  },
];

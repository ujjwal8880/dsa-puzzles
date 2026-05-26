import type { QuestionConfig } from '@/types/question';

export const LINKED_LIST_TREES_COMPLETE: QuestionConfig[] = [
  // ─── 1. Reverse Linked List (206) ────────────────────────────────────────
  {
    id: 'reverse-linked-list',
    slug: 'reverse-linked-list',
    leetcodeNumber: 206,
    title: 'Reverse Linked List',
    category: 'linked-list',
    difficulty: 'easy',
    engineType: 'linked-list',
    tags: ['linked-list', 'recursion', 'iteration'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Flip a chain of nodes so it reads backwards!',
      engineer: 'Use three pointers — prev, curr, next — to iteratively reverse each link in O(n) time and O(1) space.',
      interview: 'Classic in-place reversal. Track prev=null, curr=head. At each step: save next, point curr.next to prev, advance both. Return prev.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:2},{id:'c',val:3},{id:'d',val:4},{id:'e',val:5}],
      instruction: 'Linked list: 1→2→3→4→5. After REVERSING, which node becomes the new HEAD?',
      mode: 'reverse',
      correctAnswer: 'e',
    },
    hints: [
      { id: 1, text: 'You need to reverse each arrow. To do that without losing the rest of the list, save the next node before overwriting the pointer.', xpCost: 0 },
      { id: 2, text: 'Maintain three pointers: prev (starts null), curr (starts head), next (temporary). Each iteration: next = curr.next, curr.next = prev, prev = curr, curr = next.', xpCost: 0 },
      { id: 3, text: 'When curr becomes null, prev is the new head of the reversed list. Return prev.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Initial state: prev=null, curr=1→2→3. We will reverse each link.',
        state: { list: [1, 2, 3], prev: null, curr: 1 },
        pointers: { prev: -1, curr: 0 },
        annotation: 'prev=null, curr=1',
      },
      {
        id: 2,
        description: 'Save next=2. Point 1.next → null (prev). Advance: prev=1, curr=2.',
        state: { list: [1, 2, 3], prev: 1, curr: 2, reversed: [1] },
        pointers: { prev: 0, curr: 1 },
        annotation: 'null ← 1  2→3\nprev=1, curr=2',
      },
      {
        id: 3,
        description: 'Save next=3. Point 2.next → 1. Advance: prev=2, curr=3.',
        state: { list: [1, 2, 3], prev: 2, curr: 3, reversed: [2, 1] },
        pointers: { prev: 1, curr: 2 },
        annotation: 'null ← 1 ← 2  3\nprev=2, curr=3',
      },
      {
        id: 4,
        description: 'Save next=null. Point 3.next → 2. Advance: prev=3, curr=null.',
        state: { list: [1, 2, 3], prev: 3, curr: null, reversed: [3, 2, 1] },
        pointers: { prev: 2, curr: -1 },
        annotation: 'null ← 1 ← 2 ← 3\nprev=3, curr=null',
      },
      {
        id: 5,
        description: 'curr is null — loop ends. Return prev=3 as the new head. Result: 3→2→1.',
        state: { result: [3, 2, 1] },
        annotation: 'Return prev=3 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through all n nodes.',
      spaceExplanation: 'Only three pointer variables — no extra data structures.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // save next
    curr.next = prev;       // reverse link
    prev = curr;            // advance prev
    curr = next;            // advance curr
  }

  return prev; // new head
}`,
      },
      {
        language: 'python',
        code: `def reverseList(head):
    prev = None
    curr = head

    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    return prev`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values into an array, then re-assign values back in reverse order.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Two passes', spaceExplanation: 'Extra array of n values', visualization: 'linear' },
      },
      optimized: {
        description: 'In-place reversal with three pointers: prev, curr, next. Single pass, O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One pass through n nodes', spaceExplanation: 'Only pointer variables', visualization: 'linear' },
      },
      followUps: [
        'Reverse a sublist from position left to right (LC 92)',
        'Reverse nodes in k-group (LC 25)',
        'Can you do it recursively? (O(n) stack space)',
        'Palindrome Linked List (LC 234) — reverse second half',
      ],
      edgeCases: [
        'Empty list (head = null) → return null',
        'Single node → return as-is',
        'Two nodes — make sure both links are correctly reversed',
      ],
      commonMistakes: [
        'Forgetting to save next before overwriting curr.next — causes list loss',
        'Returning curr instead of prev at the end',
        'Not handling null head',
      ],
      interviewerTips: [
        'Draw arrows on paper — this problem is much clearer visually',
        'Mention recursive solution but prefer iterative for O(1) space',
        'This is a building block for Reorder List, Palindrome LL, and K-Group Reverse',
      ],
    },
    codeChallenge: {
      functionName: 'reverseList',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array representing linked list values
 * @return {number[]} - reversed list values
 */
function reverseList(head) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], description: 'Standard 5-node list' },
        { input: [[1, 2]], expected: [2, 1], description: 'Two-node list' },
        { input: [[]], expected: [], description: 'Empty list' },
        { input: [[1]], expected: [1], description: 'Single node' },
        { input: [[1, 2, 3]], expected: [3, 2, 1], description: 'Three-node list' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: [],
    relatedPatterns: ['In-Place Pointer Reversal', 'Three-Pointer Technique'],
    intuitionSummary: 'Use prev/curr/next pointers. At each step, reverse the link and advance all three pointers.',
    patternName: 'In-Place Pointer Reversal',
  },

  // ─── 2. Linked List Cycle (141) ──────────────────────────────────────────
  {
    id: 'linked-list-cycle',
    slug: 'linked-list-cycle',
    leetcodeNumber: 141,
    title: 'Linked List Cycle',
    category: 'linked-list',
    difficulty: 'easy',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', "floyd's", 'cycle-detection'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Two runners on a track — if one is faster, will they ever meet if there\'s a loop?',
      engineer: 'Floyd\'s cycle detection: slow moves 1 step, fast moves 2. If they meet, cycle exists. If fast reaches null, no cycle.',
      interview: 'O(n) time, O(1) space. Slow/fast pointers must meet within one full cycle length if a cycle exists.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:3},{id:'b',val:2},{id:'c',val:0},{id:'d',val:-4}],
      instruction: 'List: 3→2→0→-4→(back to node 2). Does this linked list have a CYCLE?',
      mode: 'cycle',
      correctAnswer: 'yes',
      hasCycle: true,
    },
    hints: [
      { id: 1, text: 'If two runners on a circular track run at different speeds, the faster one will eventually lap the slower one — they will meet.', xpCost: 0 },
      { id: 2, text: 'Slow pointer moves 1 step at a time, fast pointer moves 2. If fast ever reaches null (or fast.next is null), there is no cycle.', xpCost: 0 },
      { id: 3, text: 'If slow === fast at any point (after the start), a cycle has been detected. Return true.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'List: 3→2→0→-4→(back to 2). slow=3, fast=3.',
        state: { slow: 3, fast: 3, step: 0 },
        annotation: 'slow=fast=head=3',
      },
      {
        id: 2,
        description: 'Step 1: slow moves to 2, fast moves to 0.',
        state: { slow: 2, fast: 0, step: 1 },
        annotation: 'slow=2, fast=0',
      },
      {
        id: 3,
        description: 'Step 2: slow moves to 0, fast moves from 0→-4→2 (two steps). fast=2.',
        state: { slow: 0, fast: 2, step: 2 },
        annotation: 'slow=0, fast=2',
      },
      {
        id: 4,
        description: 'Step 3: slow moves to -4, fast moves from 2→0→-4. fast=-4.',
        state: { slow: -4, fast: -4, step: 3 },
        annotation: 'slow === fast = -4\nCycle detected! ✓',
      },
      {
        id: 5,
        description: 'slow === fast — they met inside the cycle. Return true.',
        state: { result: true },
        annotation: 'Return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'In the worst case, slow pointer traverses at most n + cycle_length steps before meeting fast.',
      spaceExplanation: 'Only two pointer variables — no hashset needed.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true; // cycle detected
  }

  return false; // fast reached end — no cycle
}`,
      },
      {
        language: 'python',
        code: `def hasCycle(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow is fast:
            return True

    return False`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Store every visited node in a HashSet. If we see a node again, there is a cycle.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single pass', spaceExplanation: 'HashSet of visited nodes', visualization: 'linear' },
      },
      optimized: {
        description: "Floyd's two-pointer (tortoise and hare). Slow moves 1, fast moves 2. They meet iff cycle exists.",
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'At most n + cycle steps', spaceExplanation: 'Two pointer variables only', visualization: 'linear' },
      },
      followUps: [
        'Find the start of the cycle (LC 142) — move one pointer to head after meeting, advance both by 1',
        'Length of the cycle — keep slow in place, count fast steps until it returns',
        'Happy Number (LC 202) — same cycle detection in digit sequences',
      ],
      edgeCases: [
        'Empty list (null head) → false',
        'Single node pointing to itself → cycle',
        'Single node with no cycle → false',
        'Cycle at the very last node connecting back to head',
      ],
      commonMistakes: [
        'Checking fast === null but forgetting fast.next === null — causes null pointer error',
        'Starting both pointers at head but immediately checking equality (false positive)',
        'Using slow === fast reference equality vs value equality — must compare node references',
      ],
      interviewerTips: [
        'Mention the HashSet approach first, then optimize to O(1) space',
        "Know the follow-up: LC 142 uses the same meeting point property to find cycle start",
        'The "runners on a track" analogy is always well-received',
      ],
    },
    codeChallenge: {
      functionName: 'hasCycle',
      starterCode: {
        javascript: `/**
 * @param {number[]} list - array of node values
 * @param {number} pos - index where tail connects (-1 if no cycle)
 * @return {boolean}
 */
function hasCycle(list, pos) {
  // Your solution here
  // Simulate Floyd's algorithm on the list/pos representation
}`,
      },
      testCases: [
        { input: [[3, 2, 0, -4], 1], expected: true, description: 'Cycle: tail connects to index 1' },
        { input: [[1, 2], 0], expected: true, description: 'Cycle: tail connects to head' },
        { input: [[1], -1], expected: false, description: 'Single node, no cycle' },
        { input: [[1, 2, 3, 4], -1], expected: false, description: 'No cycle' },
        { input: [[1, 2, 3, 4, 5], 2], expected: true, description: 'Cycle at index 2' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ["Floyd's Cycle Detection", 'Two Pointer'],
    intuitionSummary: 'Slow pointer moves 1 step, fast moves 2 steps. If they meet, there is a cycle.',
    patternName: "Floyd's Cycle Detection",
  },

  // ─── 3. Merge Two Sorted Lists (21) ──────────────────────────────────────
  {
    id: 'merge-two-sorted-lists',
    slug: 'merge-two-sorted-lists',
    leetcodeNumber: 21,
    title: 'Merge Two Sorted Lists',
    category: 'linked-list',
    difficulty: 'easy',
    engineType: 'linked-list',
    tags: ['linked-list', 'recursion', 'merge'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Meta'],
    descriptions: {
      explorer: 'Zip two sorted chains together, always picking the smaller next bead!',
      engineer: 'Dummy head simplifies edge cases. Compare both list heads, attach the smaller, advance that pointer. O(m+n) time.',
      interview: 'Classic merge step from merge sort. Dummy head avoids special-casing the first node. Attach remaining tail at the end.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:1},{id:'c',val:2},{id:'d',val:3},{id:'e',val:4}],
      instruction: 'Merge [1→2→4] and [1→3→4]. The merged list starts with which value? Click the first node.',
      mode: 'identify-head',
      correctAnswer: 'a',
    },
    hints: [
      { id: 1, text: 'Use a dummy head node. This lets you always do "current.next = smaller" without a special case for the first element.', xpCost: 0 },
      { id: 2, text: 'While both lists have nodes: compare l1.val and l2.val. Attach whichever is smaller. Advance only the pointer you consumed.', xpCost: 0 },
      { id: 3, text: 'When one list runs out, attach the remaining nodes of the other directly — they are already sorted.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'l1=1→2→4, l2=1→3→4. Create dummy head. curr=dummy.',
        state: { l1: [1, 2, 4], l2: [1, 3, 4], merged: [], i1: 0, i2: 0 },
        annotation: 'dummy → ?\ncurr = dummy',
      },
      {
        id: 2,
        description: 'l1[0]=1, l2[0]=1. Equal — take l1. curr.next=l1(1). Advance l1.',
        state: { l1: [2, 4], l2: [1, 3, 4], merged: [1], i1: 1, i2: 0 },
        annotation: 'merged: 1\nl1→2, l2→1',
      },
      {
        id: 3,
        description: 'l1[0]=2, l2[0]=1. l2 smaller. curr.next=l2(1). Advance l2.',
        state: { l1: [2, 4], l2: [3, 4], merged: [1, 1], i1: 1, i2: 1 },
        annotation: 'merged: 1→1\nl1→2, l2→3',
      },
      {
        id: 4,
        description: 'l1[0]=2, l2[0]=3. l1 smaller. curr.next=l1(2). Advance l1.',
        state: { l1: [4], l2: [3, 4], merged: [1, 1, 2], i1: 2, i2: 1 },
        annotation: 'merged: 1→1→2\nl1→4, l2→3',
      },
      {
        id: 5,
        description: 'l1[0]=4, l2[0]=3. l2 smaller. Attach 3. Then l2[1]=4. Attach 4. l2 exhausted — attach remaining l1(4). Done.',
        state: { l1: [], l2: [], merged: [1, 1, 2, 3, 4, 4], done: true },
        annotation: 'Result: 1→1→2→3→4→4 ✓',
      },
    ],
    complexity: {
      time: 'O(m + n)',
      space: 'O(1)',
      timeExplanation: 'Each node from both lists is visited exactly once.',
      spaceExplanation: 'Only a dummy head and a curr pointer — no new nodes created.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function mergeTwoLists(list1, list2) {
  const dummy = { next: null };
  let curr = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  // attach remaining
  curr.next = list1 !== null ? list1 : list2;

  return dummy.next;
}`,
      },
      {
        language: 'python',
        code: `def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    curr = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next

    curr.next = list1 if list1 else list2
    return dummy.next`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values from both lists, sort them, build a new list.',
        complexity: { time: 'O((m+n) log(m+n))', space: 'O(m+n)', timeExplanation: 'Sorting all values', spaceExplanation: 'Extra array and new nodes', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Two-pointer merge with dummy head. Compare heads, attach smaller, advance pointer.',
        complexity: { time: 'O(m + n)', space: 'O(1)', timeExplanation: 'Each node visited once', spaceExplanation: 'Constant extra pointers', visualization: 'linear' },
      },
      followUps: [
        'Merge K Sorted Lists (LC 23) — use this as the building block',
        'Recursive version — elegant but O(m+n) stack space',
        'Sort List (LC 148) — merge sort uses this merge step',
      ],
      edgeCases: [
        'One or both lists are empty — handle null inputs',
        'Lists of unequal length — remaining tail attached directly',
        'All elements in one list are smaller than all in other',
      ],
      commonMistakes: [
        'Forgetting to advance curr = curr.next each iteration',
        'Not attaching the remaining tail after one list is exhausted',
        'Skipping the dummy head and writing complex if-else for first node',
      ],
      interviewerTips: [
        'Dummy head is a clean pattern worth naming explicitly',
        'Recursive version is 4 lines — mention it as a follow-up',
        'This is the merge step in merge sort — connecting both concepts impresses',
      ],
    },
    codeChallenge: {
      functionName: 'mergeTwoLists',
      starterCode: {
        javascript: `/**
 * @param {number[]} list1
 * @param {number[]} list2
 * @return {number[]}
 */
function mergeTwoLists(list1, list2) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], description: 'Standard merge' },
        { input: [[], []], expected: [], description: 'Both empty' },
        { input: [[], [0]], expected: [0], description: 'First list empty' },
        { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6], description: 'Perfectly interleaved' },
        { input: [[1, 2, 3], [4, 5, 6]], expected: [1, 2, 3, 4, 5, 6], description: 'All of list1 before list2' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['Dummy Head', 'Two Pointer Merge'],
    intuitionSummary: 'Use a dummy head. Compare both list heads, attach the smaller one, advance that pointer.',
    patternName: 'Merge with Dummy Head',
  },

  // ─── 4. Reorder List (143) ───────────────────────────────────────────────
  {
    id: 'reorder-list',
    slug: 'reorder-list',
    leetcodeNumber: 143,
    title: 'Reorder List',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', 'stack', 'reverse'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Meta', 'Google', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'Interleave the front and back halves of a list like folding a deck of cards!',
      engineer: 'Three phases: find mid with slow/fast pointers, reverse the second half in-place, then merge both halves alternately.',
      interview: 'O(n) time, O(1) space. Combining three sub-problems: find middle, reverse list, merge two lists.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:2},{id:'c',val:3},{id:'d',val:4}],
      instruction: 'Reorder List [1→2→3→4]: the key step is finding the MIDDLE node to split. Click the middle node.',
      mode: 'find-middle',
      correctAnswer: 'b',
    },
    hints: [
      { id: 1, text: 'The goal is L0→Ln→L1→Ln-1→L2→... This means you need to pair the first element with the last, second with second-to-last, etc.', xpCost: 0 },
      { id: 2, text: 'Find the midpoint with slow/fast pointers. Reverse the second half. Now you have two lists: front half and reversed back half.', xpCost: 0 },
      { id: 3, text: 'Merge the two halves by alternating: take one from first, one from second. Stop when second half is exhausted.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: 1→2→3→4. Find middle using slow/fast. slow=2, fast=4 (or null). Mid is node 2.',
        state: { list: [1, 2, 3, 4], slow: 2, fast: 4 },
        pointers: { slow: 1, fast: 3 },
        annotation: 'slow=2 (mid), fast=4',
      },
      {
        id: 2,
        description: 'Split: first half = 1→2→null, second half = 3→4. Reverse second half → 4→3.',
        state: { firstHalf: [1, 2], secondHalf: [4, 3] },
        annotation: 'First: 1→2\nReversed second: 4→3',
      },
      {
        id: 3,
        description: 'Merge: take 1 (first), take 4 (second). 1.next=4, 4.next=2. Advance both.',
        state: { merged: [1, 4], first: 2, second: 3 },
        annotation: '1→4→ ... first=2, second=3',
      },
      {
        id: 4,
        description: 'Take 2 (first), take 3 (second). 2.next=3. Second half exhausted. Done.',
        state: { result: [1, 4, 2, 3], done: true },
        annotation: 'Result: 1→4→2→3 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Three O(n) passes: find mid, reverse, merge.',
      spaceExplanation: 'All pointer manipulation in-place.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function reorderList(head) {
  if (!head || !head.next) return;

  // Step 1: Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null, curr = slow.next;
  slow.next = null; // cut the list
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Merge two halves
  let first = head, second = prev;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}`,
      },
      {
        language: 'python',
        code: `def reorderList(head):
    if not head or not head.next:
        return

    # Find middle
    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    prev, curr = None, slow.next
    slow.next = None
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # Merge
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first = tmp1
        second = tmp2`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Store all nodes in an array, then use two pointers (lo, hi) to re-link nodes.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'One pass to fill, one to reorder', spaceExplanation: 'Array of n node references', visualization: 'linear' },
      },
      optimized: {
        description: 'Three in-place steps: find mid, reverse second half, interleave. O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Three linear passes', spaceExplanation: 'Pointer variables only', visualization: 'linear' },
      },
      followUps: [
        'Palindrome Linked List (LC 234) — same find-mid + reverse second half pattern',
        'What if list has odd length? The middle node stays in the first half',
        'Can you verify your reorder is correct without returning a value?',
      ],
      edgeCases: [
        'One or two nodes — no reordering needed',
        'Odd vs even length — slow pointer lands differently',
        'Must cut first half at slow.next = null before reversing',
      ],
      commonMistakes: [
        'Not cutting the list at the midpoint — causes infinite loop during merge',
        'Wrong slow/fast stopping condition — off-by-one on midpoint',
        'Losing next pointers during the merge step without saving tmp1 and tmp2',
      ],
      interviewerTips: [
        'This problem combines three fundamentals — show you can decompose it',
        'Draw the list state after each of the three phases',
        'Mention the array approach first, then explain the O(1) space optimization',
      ],
    },
    codeChallenge: {
      functionName: 'reorderList',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array of node values
 * @return {number[]} - reordered list values
 */
function reorderList(head) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4]], expected: [1, 4, 2, 3], description: 'Even length list' },
        { input: [[1, 2, 3, 4, 5]], expected: [1, 5, 2, 4, 3], description: 'Odd length list' },
        { input: [[1]], expected: [1], description: 'Single node' },
        { input: [[1, 2]], expected: [1, 2], description: 'Two nodes' },
        { input: [[1, 2, 3]], expected: [1, 3, 2], description: 'Three nodes' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list', 'merge-two-sorted-lists'],
    relatedPatterns: ['Find Mid + Reverse + Merge', 'Slow/Fast Pointers'],
    intuitionSummary: 'Find the middle, reverse the second half, then interleave the two halves.',
    patternName: 'Find Mid + Reverse + Merge',
  },

  // ─── 5. Remove Nth Node From End (19) ────────────────────────────────────
  {
    id: 'remove-nth-from-end',
    slug: 'remove-nth-node-from-end-of-list',
    leetcodeNumber: 19,
    title: 'Remove Nth Node From End of List',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google', 'Bloomberg'],
    descriptions: {
      explorer: 'Use two runners with a gap between them to find and remove the right node!',
      engineer: 'Advance fast pointer n+1 steps ahead (using dummy head). Move both until fast is null. slow.next is the node to remove.',
      interview: 'One-pass solution using a gap of n between two pointers. Dummy head avoids edge case when removing the actual head.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:2},{id:'c',val:3},{id:'d',val:4},{id:'e',val:5}],
      instruction: 'List 1→2→3→4→5, n=2. Click the node that gets REMOVED (2nd from end).',
      mode: 'remove-nth',
      correctAnswer: 'd',
      n: 2,
    },
    hints: [
      { id: 1, text: 'If you advance fast n steps, when fast reaches the end, slow will be exactly n nodes from the end.', xpCost: 0 },
      { id: 2, text: 'Use a dummy node before head. Advance fast n+1 steps (not n). This way slow lands on the node BEFORE the one to delete.', xpCost: 0 },
      { id: 3, text: 'When fast.next is null: slow.next = slow.next.next. This skips the nth-from-end node.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'List: 1→2→3→4→5, n=2. Add dummy before head. slow=dummy, fast=dummy.',
        state: { list: [1, 2, 3, 4, 5], n: 2, slow: 'dummy', fast: 'dummy' },
        annotation: 'dummy→1→2→3→4→5\nslow=fast=dummy',
      },
      {
        id: 2,
        description: 'Advance fast n+1=3 steps: dummy→1→2→3. fast=3.',
        state: { list: [1, 2, 3, 4, 5], slow: 'dummy', fast: 3 },
        pointers: { slow: -1, fast: 2 },
        annotation: 'fast moved 3 steps → node 3',
      },
      {
        id: 3,
        description: 'Move both until fast.next is null. fast=3→4→5. At fast=5 (fast.next=null), slow=dummy→1→2 → slow=2.',
        state: { list: [1, 2, 3, 4, 5], slow: 2, fast: 5 },
        pointers: { slow: 1, fast: 4 },
        annotation: 'slow=2, fast=5\nfast.next=null → stop',
      },
      {
        id: 4,
        description: 'slow.next is node 3 (2nd from end). Remove it: slow.next = slow.next.next = 4.',
        state: { list: [1, 2, 4, 5], removed: 3 },
        annotation: '2.next = 4 (skip 3)\nResult: 1→2→4→5 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass: fast travels n+len steps, slow travels len-n steps.',
      spaceExplanation: 'Two pointer variables and a dummy node.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let slow = dummy;
  let fast = dummy;

  // advance fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // move both until fast is null
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  // slow.next is the node to remove
  slow.next = slow.next.next;

  return dummy.next;
}`,
      },
      {
        language: 'python',
        code: `def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy

    for _ in range(n + 1):
        fast = fast.next

    while fast:
        slow = slow.next
        fast = fast.next

    slow.next = slow.next.next
    return dummy.next`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'First pass to find length L. Second pass to remove node at position L-n.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Two passes of length n', spaceExplanation: 'Constant extra space', visualization: 'linear' },
      },
      optimized: {
        description: 'Single-pass two-pointer with a gap of n. One traversal handles both finding and removing.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One pass', spaceExplanation: 'Two pointers plus dummy node', visualization: 'linear' },
      },
      followUps: [
        'What if n equals the list length? (Remove head — dummy handles this)',
        'Find the middle node — same slow/fast pattern',
        'Remove all nodes with a given value (LC 203)',
      ],
      edgeCases: [
        'n equals list length — removing the head node (dummy node saves you here)',
        'Single node list with n=1',
        'n=1 — removing the tail node',
      ],
      commonMistakes: [
        'Advancing fast only n steps instead of n+1 — slow ends up on the node to delete, not before it',
        'Not using a dummy node — special case when removing head',
        'Moving fast until fast.next === null vs fast === null — different stopping positions',
      ],
      interviewerTips: [
        'Dummy node is crucial here — explain why it eliminates the head-removal edge case',
        'Be precise: n+1 advance vs n advance changes where slow ends up',
        'One-pass vs two-pass is a common interview follow-up',
      ],
    },
    codeChallenge: {
      functionName: 'removeNthFromEnd',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array of node values
 * @param {number} n
 * @return {number[]}
 */
function removeNthFromEnd(head, n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5], description: 'Remove 2nd from end' },
        { input: [[1], 1], expected: [], description: 'Remove only node' },
        { input: [[1, 2], 1], expected: [1], description: 'Remove last node' },
        { input: [[1, 2], 2], expected: [2], description: 'Remove first node (n = length)' },
        { input: [[1, 2, 3], 3], expected: [2, 3], description: 'Remove head' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list', 'linked-list-cycle'],
    relatedPatterns: ['Two Pointer Gap', 'Dummy Head'],
    intuitionSummary: 'Advance fast pointer n steps ahead. Move both until fast reaches end. Slow is at the target.',
    patternName: 'Two Pointer Gap',
  },

  // ─── 6. Merge K Sorted Lists (23) ────────────────────────────────────────
  {
    id: 'merge-k-sorted',
    slug: 'merge-k-sorted-lists',
    leetcodeNumber: 23,
    title: 'Merge K Sorted Lists',
    category: 'linked-list',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['linked-list', 'heap', 'divide-conquer', 'merge'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Merge many sorted streams into one — always pick the globally smallest next element!',
      engineer: 'Divide and conquer: pair up lists, merge pairs repeatedly. O(N log k) where N = total nodes, k = number of lists.',
      interview: 'Two approaches: min-heap of size k (O(N log k)) or divide-and-conquer merge pairs (O(N log k)). Both are optimal.',
    },
    puzzleConfig: {
      items: [{id:'a',value:1,label:'list1 head'},{id:'b',value:1,label:'list2 head'},{id:'c',value:2,label:'list3 head'},{id:'d',value:4,label:'list1[1]'}],
      target: 2,
      instruction: 'Merge [[1,4,5],[1,3,4],[2,6]]: which two head values are the first to be added to the merged result?',
      correctAnswer: ['a','b'],
    },
    hints: [
      { id: 1, text: 'The brute-force is: collect all values, sort them, build a new list. But that\'s O(N log N). Can you do O(N log k)?', xpCost: 0 },
      { id: 2, text: 'Divide and conquer: merge list[0]+list[1], list[2]+list[3], etc. Each round halves the number of lists. There are log k rounds.', xpCost: 0 },
      { id: 3, text: 'Each round processes all N nodes (via the merge subroutine). log k rounds × N nodes = O(N log k) total.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [[1,4,5],[1,3,4],[2,6]]. 3 lists. Round 1: merge list0+list1, keep list2.',
        state: { lists: [[1,4,5],[1,3,4],[2,6]], round: 1 },
        annotation: 'k=3 lists\nRound 1: merge pairs',
      },
      {
        id: 2,
        description: 'Merge [1,4,5] and [1,3,4] → [1,1,3,4,4,5]. Now have [[1,1,3,4,4,5],[2,6]].',
        state: { lists: [[1,1,3,4,4,5],[2,6]], round: 1 },
        annotation: '[1,4,5]+[1,3,4] = [1,1,3,4,4,5]',
      },
      {
        id: 3,
        description: 'Round 2: merge [1,1,3,4,4,5] and [2,6] → [1,1,2,3,4,4,5,6]. One list remains.',
        state: { lists: [[1,1,2,3,4,4,5,6]], round: 2 },
        annotation: 'Final merge → [1,1,2,3,4,4,5,6] ✓',
      },
    ],
    complexity: {
      time: 'O(N log k)',
      space: 'O(1)',
      timeExplanation: 'log k rounds of merging, each round processes all N total nodes.',
      spaceExplanation: 'In-place merge uses no extra space (beyond the dummy head).',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  // Divide and conquer: merge pairs
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
}

function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}`,
      },
      {
        language: 'python',
        code: `import heapq

def mergeKLists(lists):
    # Min-heap approach
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,
        notes: 'Python version uses min-heap for clarity. JS version uses divide-and-conquer.',
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all node values into array, sort it, build a new linked list.',
        complexity: { time: 'O(N log N)', space: 'O(N)', timeExplanation: 'Sorting N total values', spaceExplanation: 'Array of all values', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Divide and conquer: merge pairs of lists in log k rounds. Each round processes all N nodes.',
        complexity: { time: 'O(N log k)', space: 'O(1)', timeExplanation: 'log k rounds × N nodes each', spaceExplanation: 'In-place merge, no extra nodes', visualization: 'nlogn' },
      },
      followUps: [
        'What if k is very large but N is small? Min-heap approach shines',
        'Merge K sorted arrays instead of linked lists',
        'Find the median from a data stream (LC 295) — related heap pattern',
      ],
      edgeCases: [
        'Empty input array of lists',
        'Some lists in the input are null/empty',
        'Single list in input — return it directly',
        'All lists have a single node',
      ],
      commonMistakes: [
        'Not handling null lists in the input array',
        'Using sequential merge (list[0] + list[1] + list[2]...) instead of pairwise — O(kN) not O(N log k)',
        'Off-by-one when pairing lists (missing the last unpaired list)',
      ],
      interviewerTips: [
        'Sequential merge is O(kN) — make sure to explain why pairwise is better',
        'Both heap and divide-and-conquer are O(N log k) — discuss tradeoffs (heap has better constant for large k)',
        'Reusing mergeTwoLists shows good code reuse',
      ],
    },
    codeChallenge: {
      functionName: 'mergeKLists',
      starterCode: {
        javascript: `/**
 * @param {number[][]} lists - array of sorted arrays representing linked lists
 * @return {number[]} - merged sorted array
 */
function mergeKLists(lists) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6], description: 'Three sorted lists' },
        { input: [[]], expected: [], description: 'Empty input' },
        { input: [[[]]], expected: [], description: 'Array containing one empty list' },
        { input: [[[1],[0]]], expected: [0,1], description: 'Two single-element lists' },
        { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,4,5,6,7,8,9], description: 'No interleaving needed' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: ['merge-two-sorted-lists'],
    relatedPatterns: ['Divide and Conquer', 'Min-Heap Merge'],
    intuitionSummary: 'Push the head of each list into a min-heap. Always pop the minimum and advance its list pointer.',
    patternName: 'Min-Heap Merge',
  },

  // ─── 7. Reverse Nodes in k-Group (25) ────────────────────────────────────
  {
    id: 'reverse-nodes-k-group',
    slug: 'reverse-nodes-in-k-group',
    leetcodeNumber: 25,
    title: 'Reverse Nodes in k-Group',
    category: 'linked-list',
    difficulty: 'hard',
    engineType: 'linked-list',
    tags: ['linked-list', 'recursion', 'reverse'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Flip every group of k nodes while leaving shorter leftover groups intact!',
      engineer: 'Check if k nodes exist from current position. If yes, reverse them in-place, connect to previous group tail, recurse on remainder.',
      interview: 'O(n) time, O(n/k) stack space for recursion. Key: reverse exactly k nodes, then attach the result of recursing on the rest.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:2},{id:'c',val:3},{id:'d',val:4},{id:'e',val:5}],
      instruction: 'Reverse in groups of k=2: [1→2→3→4→5] → [2→1→4→3→5]. Click the new HEAD.',
      mode: 'reverse',
      correctAnswer: 'b',
    },
    hints: [
      { id: 1, text: 'First check: do k nodes exist starting from current? If not, leave them as-is.', xpCost: 0 },
      { id: 2, text: 'Reverse exactly k nodes (same technique as Reverse Linked List). The original first node becomes the tail of the reversed group.', xpCost: 0 },
      { id: 3, text: 'After reversing k nodes, the original first node\'s .next should point to the result of recursing on the remaining list.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'List: 1→2→3→4→5, k=2. Check: 2 nodes exist from node 1. Yes → reverse group.',
        state: { list: [1,2,3,4,5], k: 2, groupStart: 1 },
        annotation: 'k=2 nodes exist\nReverse [1,2]',
      },
      {
        id: 2,
        description: 'Reverse first group [1,2] → [2,1]. Node 1 is now the tail of this group. Its next will point to the result of the next group.',
        state: { reversed1: [2,1], tail: 1, remaining: [3,4,5] },
        annotation: '2→1→ (recurse on 3→4→5)',
      },
      {
        id: 3,
        description: 'Recurse on 3→4→5, k=2. Check: 2 nodes exist from 3. Reverse [3,4] → [4,3].',
        state: { reversed2: [4,3], tail: 3, remaining: [5] },
        annotation: '4→3→ (recurse on 5)',
      },
      {
        id: 4,
        description: 'Recurse on 5, k=2. Only 1 node — less than k. Return 5 as-is.',
        state: { base: 5 },
        annotation: '1 < k=2 → return 5 unchanged',
      },
      {
        id: 5,
        description: 'Chain results: 2→1→4→3→5. Return 2 as the new head.',
        state: { result: [2,1,4,3,5] },
        annotation: 'Result: 2→1→4→3→5 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n/k)',
      timeExplanation: 'Each node is visited exactly once during reversal.',
      spaceExplanation: 'Recursive call stack depth is n/k (one call per group).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function reverseKGroup(head, k) {
  // Check if k nodes exist
  let check = head;
  for (let i = 0; i < k; i++) {
    if (!check) return head; // fewer than k nodes remain — leave as-is
    check = check.next;
  }

  // Reverse k nodes
  let prev = null, curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // head is now the tail of the reversed group
  // recurse on the remaining list
  head.next = reverseKGroup(curr, k);

  return prev; // prev is the new head of the reversed group
}`,
      },
      {
        language: 'python',
        code: `def reverseKGroup(head, k):
    # Check if k nodes exist
    check = head
    for _ in range(k):
        if not check:
            return head
        check = check.next

    # Reverse k nodes
    prev, curr = None, head
    for _ in range(k):
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # head is now the tail; recurse on remainder
    head.next = reverseKGroup(curr, k)
    return prev`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect nodes into chunks of k, reverse each chunk array, rebuild list.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single pass', spaceExplanation: 'Array of all nodes', visualization: 'linear' },
      },
      optimized: {
        description: 'Recursive in-place reversal. Check k nodes exist, reverse them, recurse on tail.',
        complexity: { time: 'O(n)', space: 'O(n/k)', timeExplanation: 'Each node reversed once', spaceExplanation: 'Recursion depth = n/k groups', visualization: 'linear' },
      },
      followUps: [
        'Iterative version to reduce stack space to O(1)',
        'What if you want to reverse every other group of k?',
        'Reverse Linked List II (LC 92) — reverse between positions left and right',
      ],
      edgeCases: [
        'k=1 — no reversal needed, return head',
        'k equals list length — reverse entire list',
        'List length not divisible by k — last group stays unchanged',
      ],
      commonMistakes: [
        'Forgetting to set head.next after reversal (leaves the tail disconnected)',
        'Checking fewer nodes than k before reversing',
        'Not returning head (original first node) when k nodes don\'t exist',
      ],
      interviewerTips: [
        'The key insight: after reversing, the original head becomes the TAIL, so head.next = recurse()',
        'Draw the state after reversing one group before coding',
        'Mention iterative version exists with O(1) space using a prev-group-tail pointer',
      ],
    },
    codeChallenge: {
      functionName: 'reverseKGroup',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array of node values
 * @param {number} k
 * @return {number[]}
 */
function reverseKGroup(head, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3,4,5], 2], expected: [2,1,4,3,5], description: 'k=2, last node unchanged' },
        { input: [[1,2,3,4,5], 3], expected: [3,2,1,4,5], description: 'k=3, last 2 unchanged' },
        { input: [[1,2,3,4], 2], expected: [2,1,4,3], description: 'k=2, even length' },
        { input: [[1], 1], expected: [1], description: 'Single node k=1' },
        { input: [[1,2,3], 3], expected: [3,2,1], description: 'k equals list length' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 40, code: 60, coding: 200 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['In-Place Group Reversal', 'Recursion on Sublist'],
    intuitionSummary: 'Check k nodes exist, reverse them, then recurse on the rest. Original head becomes group tail.',
    patternName: 'In-Place Group Reversal',
  },

  // ─── 8. Remove Duplicates from Sorted List II (82) ───────────────────────
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
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Keep only numbers that appear exactly once — toss out any that show up more than once!',
      engineer: 'Dummy head + prev pointer. When you see a duplicate value, skip all nodes with that value via inner while loop.',
      interview: 'O(n) time, O(1) space. prev pointer tracks the last confirmed unique node. Skip entire runs of duplicates.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:2},{id:'c',val:3},{id:'d',val:3},{id:'e',val:4},{id:'f',val:4},{id:'g',val:5}],
      instruction: 'List 1→2→3→3→4→4→5: remove ALL nodes with duplicate values. Click the HEAD of the result.',
      mode: 'identify-head',
      correctAnswer: 'a',
    },
    hints: [
      { id: 1, text: 'Unlike LC 83 (keep one duplicate), here you remove ALL nodes with a duplicated value. If 3 appears twice, both 3s go.', xpCost: 0 },
      { id: 2, text: 'Use a dummy head and a prev pointer. When curr.val == curr.next.val, you have a duplicate. Save that value and skip all nodes with that value.', xpCost: 0 },
      { id: 3, text: 'Inner loop: while curr and curr.val == dupVal: curr = curr.next. Then prev.next = curr (skip all the duplicates at once).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: 1→2→3→3→4→4→5. dummy→1→... prev=dummy, curr=1.',
        state: { list: [1,2,3,3,4,4,5], prev: 'dummy', curr: 1 },
        annotation: 'prev=dummy, curr=1',
      },
      {
        id: 2,
        description: 'curr=1, curr.next=2. 1≠2 — no duplicate. Advance prev=1, curr=2.',
        state: { list: [1,2,3,3,4,4,5], prev: 1, curr: 2 },
        annotation: 'No dup at 1. prev=1, curr=2',
      },
      {
        id: 3,
        description: 'curr=2, curr.next=3. 2≠3 — no duplicate. Advance prev=2, curr=3.',
        state: { list: [1,2,3,3,4,4,5], prev: 2, curr: 3 },
        annotation: 'No dup at 2. prev=2, curr=3',
      },
      {
        id: 4,
        description: 'curr=3, curr.next=3. Duplicate! Skip all 3s: curr advances past both 3s → curr=4. Set prev.next=curr.',
        state: { list: [1,2,4,4,5], prev: 2, curr: 4 },
        annotation: 'Dup val=3: skip both\nprev.next=4. prev=2, curr=4',
      },
      {
        id: 5,
        description: 'curr=4, curr.next=4. Duplicate! Skip all 4s → curr=5. Set prev.next=5. Then advance curr=5, curr.next=null → advance prev=5. Done.',
        state: { result: [1,2,5], done: true },
        annotation: 'Dup val=4: skip both\nResult: 1→2→5 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through all nodes.',
      spaceExplanation: 'Only prev and curr pointer variables.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function deleteDuplicates(head) {
  const dummy = { next: head };
  let prev = dummy;
  let curr = head;

  while (curr !== null) {
    // check if this is the start of a duplicate sequence
    if (curr.next !== null && curr.val === curr.next.val) {
      const dupVal = curr.val;
      // skip all nodes with this value
      while (curr !== null && curr.val === dupVal) {
        curr = curr.next;
      }
      prev.next = curr; // bypass all duplicates
    } else {
      prev = curr;      // unique node — advance prev
      curr = curr.next;
    }
  }

  return dummy.next;
}`,
      },
      {
        language: 'python',
        code: `def deleteDuplicates(head):
    dummy = ListNode(0, head)
    prev = dummy
    curr = head

    while curr:
        if curr.next and curr.val == curr.next.val:
            dup_val = curr.val
            while curr and curr.val == dup_val:
                curr = curr.next
            prev.next = curr
        else:
            prev = curr
            curr = curr.next

    return dummy.next`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values, find duplicates with a frequency map, rebuild list with only unique values.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Two passes', spaceExplanation: 'Frequency hashmap', visualization: 'linear' },
      },
      optimized: {
        description: 'Single-pass with prev pointer and inner skip loop. Detect and skip duplicate runs in-place.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Each node visited at most twice', spaceExplanation: 'Two pointer variables', visualization: 'linear' },
      },
      followUps: [
        'LC 83: Remove Duplicates from Sorted List — keep one copy instead of deleting all',
        'What if the list is unsorted? (Need hashmap first)',
        'Remove all occurrences of a specific value (LC 203)',
      ],
      edgeCases: [
        'All nodes are duplicates — return empty list',
        'No duplicates at all — return original list',
        'Only two nodes with same value',
        'Duplicates at the beginning or end of the list',
      ],
      commonMistakes: [
        'Only skipping one duplicate instead of the entire run',
        'Advancing prev even when duplicates are found (should only advance prev on unique nodes)',
        'Not using a dummy head — painful edge case when head itself is a duplicate',
      ],
      interviewerTips: [
        'Contrast with LC 83 immediately — shows you read carefully',
        'Dummy head is essential since head itself might be removed',
        'The prev pointer only advances on confirmed unique nodes — that\'s the core insight',
      ],
    },
    codeChallenge: {
      functionName: 'deleteDuplicates',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - sorted array of values
 * @return {number[]}
 */
function deleteDuplicates(head) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3,3,4,4,5]], expected: [1,2,5], description: 'Duplicates in middle' },
        { input: [[1,1,1,2,3]], expected: [2,3], description: 'Duplicates at start' },
        { input: [[1,2,3]], expected: [1,2,3], description: 'No duplicates' },
        { input: [[1,1]], expected: [], description: 'All duplicates — empty result' },
        { input: [[1,2,2,3,3,4]], expected: [1,4], description: 'Only first and last are unique' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list', 'remove-nth-from-end'],
    relatedPatterns: ['Dummy Head', 'Skip Duplicate Run'],
    intuitionSummary: 'Dummy head + prev pointer. When duplicates detected, skip entire run. Only advance prev on unique nodes.',
    patternName: 'Skip Duplicate Run',
  },

  // ─── 9. Rotate List (61) ─────────────────────────────────────────────────
  {
    id: 'rotate-list',
    slug: 'rotate-list',
    leetcodeNumber: 61,
    title: 'Rotate List',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', 'math'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google', 'Apple'],
    descriptions: {
      explorer: 'Rotate a linked chain so the last k elements jump to the front!',
      engineer: 'Find length, compute effective rotation k%len. Make list circular. New tail is at position len-k%len-1. Break the circle there.',
      interview: 'O(n) time, O(1) space. Key insight: k%len handles k>len. Make circular, find new tail, break link.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:2},{id:'c',val:3},{id:'d',val:4},{id:'e',val:5}],
      instruction: 'Rotate [1→2→3→4→5] right by k=2. Click the new HEAD after rotation.',
      mode: 'identify-head',
      correctAnswer: 'd',
    },
    hints: [
      { id: 1, text: 'If the list has length 5 and k=7, rotating by 7 is the same as rotating by 7%5=2. Always reduce k first.', xpCost: 0 },
      { id: 2, text: 'After finding the length, connect tail to head (make circular). The new tail is at position len - k%len - 1 from the original head.', xpCost: 0 },
      { id: 3, text: 'New head = newTail.next. Set newTail.next = null to break the circle. Return new head.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [1,2,3,4,5], k=2. First find length=5. tail is at node 5.',
        state: { list: [1,2,3,4,5], len: 5, k: 2 },
        annotation: 'len=5, k=2\neffective k = 2%5 = 2',
      },
      {
        id: 2,
        description: 'Connect tail(5) → head(1). List is now circular: 1→2→3→4→5→(back to 1).',
        state: { circular: true, tail: 5 },
        annotation: '5.next = 1 (circular)',
      },
      {
        id: 3,
        description: 'New tail is at index len-k-1 = 5-2-1 = 2 (0-indexed) → node with value 3.',
        state: { newTailIndex: 2, newTailVal: 3, newHeadVal: 4 },
        annotation: 'newTail = node 3 (index 2)\nnewHead = node 4',
      },
      {
        id: 4,
        description: 'newHead = newTail.next = node 4. Break circle: newTail.next = null. Return newHead.',
        state: { result: [4,5,1,2,3] },
        annotation: '3.next = null\nResult: 4→5→1→2→3 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Two passes: one to find length and tail, one to find new tail position.',
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

  // Effective rotation
  k = k % len;
  if (k === 0) return head;

  // Make circular
  tail.next = head;

  // Find new tail at position len - k - 1
  let newTail = head;
  for (let i = 0; i < len - k - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`,
      },
      {
        language: 'python',
        code: `def rotateRight(head, k):
    if not head or not head.next or k == 0:
        return head

    # Find length and tail
    length = 1
    tail = head
    while tail.next:
        tail = tail.next
        length += 1

    k = k % length
    if k == 0:
        return head

    # Make circular
    tail.next = head

    # Find new tail
    new_tail = head
    for _ in range(length - k - 1):
        new_tail = new_tail.next

    new_head = new_tail.next
    new_tail.next = None
    return new_head`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Rotate by 1 node k times: each time, move the last node to the front.',
        complexity: { time: 'O(n × k)', space: 'O(1)', timeExplanation: 'k rotations of O(n) each', spaceExplanation: 'Constant pointers', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Find length, reduce k%len, make circular, find new tail, break at that point.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Two linear passes', spaceExplanation: 'Pointer variables only', visualization: 'linear' },
      },
      followUps: [
        'Rotate an array right by k (LC 189) — same modulo insight',
        'Left rotation by k — equivalent to right rotation by len-k',
        'What if k is negative? (Left rotation)',
      ],
      edgeCases: [
        'k = 0 — return unchanged',
        'k is a multiple of length — return unchanged (k%len == 0)',
        'Single node list — return as-is',
        'k > length — must reduce with modulo',
      ],
      commonMistakes: [
        'Not reducing k with modulo — causes unnecessary extra rotations or wrong answer when k > len',
        'Not handling k%len == 0 after reduction (would otherwise break valid list)',
        'Off-by-one in finding new tail position (len - k - 1 vs len - k)',
      ],
      interviewerTips: [
        'The modulo reduction is the first thing to mention — shows awareness of edge cases',
        'Making the list circular is an elegant technique worth explaining clearly',
        'Verify new tail index with a small example before coding',
      ],
    },
    codeChallenge: {
      functionName: 'rotateRight',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array of values
 * @param {number} k
 * @return {number[]}
 */
function rotateRight(head, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3,4,5], 2], expected: [4,5,1,2,3], description: 'Rotate right by 2' },
        { input: [[0,1,2], 4], expected: [2,0,1], description: 'k > length (4 % 3 = 1)' },
        { input: [[1,2,3], 3], expected: [1,2,3], description: 'k = length, no change' },
        { input: [[1], 5], expected: [1], description: 'Single node' },
        { input: [[1,2], 1], expected: [2,1], description: 'Two-node rotation' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list'],
    relatedPatterns: ['Circular List', 'Modulo Length'],
    intuitionSummary: 'Make circular, find new tail at len - k%len - 1, break the circle there.',
    patternName: 'Circular List Rotation',
  },

  // ─── 10. Partition List (86) ─────────────────────────────────────────────
  {
    id: 'partition-list',
    slug: 'partition-list',
    leetcodeNumber: 86,
    title: 'Partition List',
    category: 'linked-list',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'two-pointer', 'partition'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Sort nodes into two groups — smaller-than-x first, then the rest — without changing relative order!',
      engineer: 'Two dummy-headed lists: "less" collects nodes < x, "greater" collects nodes >= x. Join them at the end.',
      interview: 'O(n) time, O(1) space. Stable partition — relative order within each group is preserved. Join less.tail to greater.head.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:1},{id:'b',val:4},{id:'c',val:3},{id:'d',val:2},{id:'e',val:5},{id:'f',val:2}],
      instruction: 'Partition [1→4→3→2→5→2] around x=3 (all <3 before all ≥3). Click the HEAD of the partitioned list.',
      mode: 'identify-head',
      correctAnswer: 'a',
    },
    hints: [
      { id: 1, text: 'Create two separate dummy-headed lists: one for nodes with val < x, and one for nodes with val >= x.', xpCost: 0 },
      { id: 2, text: 'Iterate through the original list. Append each node to the appropriate sub-list. This preserves relative order automatically.', xpCost: 0 },
      { id: 3, text: 'After the loop: set greater.next = null (avoid cycle), then connect less tail to greater.next. Return less dummy.next.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: 1→4→3→2→5→2, x=3. Create dummies: lessD and greaterD.',
        state: { list: [1,4,3,2,5,2], x: 3, less: [], greater: [] },
        annotation: 'lessD → ?\ngreaterD → ?',
      },
      {
        id: 2,
        description: 'Node 1: 1 < 3 → less list. Node 4: 4 >= 3 → greater. Node 3: 3 >= 3 → greater.',
        state: { less: [1], greater: [4,3] },
        annotation: 'less: 1\ngreater: 4→3',
      },
      {
        id: 3,
        description: 'Node 2: 2 < 3 → less. Node 5: 5 >= 3 → greater. Node 2: 2 < 3 → less.',
        state: { less: [1,2,2], greater: [4,3,5] },
        annotation: 'less: 1→2→2\ngreater: 4→3→5',
      },
      {
        id: 4,
        description: 'Join: set greater tail.next = null. Connect less tail → greater head. Return lessD.next.',
        state: { result: [1,2,2,4,3,5] },
        annotation: 'less.tail.next = greaterD.next\nResult: 1→2→2→4→3→5 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through all n nodes.',
      spaceExplanation: 'Two dummy nodes plus pointer variables — no new nodes created.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function partition(head, x) {
  const lessD = { next: null };
  const greaterD = { next: null };
  let less = lessD;
  let greater = greaterD;

  let curr = head;
  while (curr !== null) {
    if (curr.val < x) {
      less.next = curr;
      less = less.next;
    } else {
      greater.next = curr;
      greater = greater.next;
    }
    curr = curr.next;
  }

  greater.next = null;      // avoid cycle from original links
  less.next = greaterD.next; // join the two lists

  return lessD.next;
}`,
      },
      {
        language: 'python',
        code: `def partition(head, x):
    less_dummy = ListNode(0)
    greater_dummy = ListNode(0)
    less = less_dummy
    greater = greater_dummy

    curr = head
    while curr:
        if curr.val < x:
            less.next = curr
            less = less.next
        else:
            greater.next = curr
            greater = greater.next
        curr = curr.next

    greater.next = None
    less.next = greater_dummy.next
    return less_dummy.next`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values, partition into two arrays, rebuild list.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'One pass each', spaceExplanation: 'Two value arrays', visualization: 'linear' },
      },
      optimized: {
        description: 'Two dummy-headed sublists. Single pass routing each node to the correct list. Join at end.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Two dummy nodes only', visualization: 'linear' },
      },
      followUps: [
        'Odd Even Linked List (LC 328) — same two-list partition pattern',
        'Sort Colors (LC 75) — array version of three-way partition',
        'What if you want to partition in-place without dummy nodes?',
      ],
      edgeCases: [
        'All nodes less than x',
        'All nodes greater than or equal to x',
        'x is smaller than all values — result is same order',
        'Must set greater.next = null to avoid cycle from original list links',
      ],
      commonMistakes: [
        'Forgetting greater.next = null — original node\'s next may point back into the list',
        'Not using dummy heads — complex edge cases for first node in each list',
        'Connecting greater.next to greater.head instead of greaterDummy.next',
      ],
      interviewerTips: [
        'Stability of relative order is guaranteed by appending in iteration order',
        'Two dummies is a clean pattern — no if-else for empty list edge cases',
        'Always null-terminate the greater list before joining',
      ],
    },
    codeChallenge: {
      functionName: 'partition',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array of values
 * @param {number} x
 * @return {number[]}
 */
function partition(head, x) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,4,3,2,5,2], 3], expected: [1,2,2,4,3,5], description: 'Standard partition at x=3' },
        { input: [[2,1], 2], expected: [1,2], description: 'Two nodes, x=2' },
        { input: [[1,2,3], 4], expected: [1,2,3], description: 'All nodes less than x' },
        { input: [[4,5,6], 2], expected: [4,5,6], description: 'All nodes >= x' },
        { input: [[3,1,2], 3], expected: [1,2,3], description: 'Only first element equals x' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['merge-two-sorted-lists'],
    relatedPatterns: ['Two List Partition', 'Dummy Head'],
    intuitionSummary: 'Two dummy-headed lists: append nodes < x to "less", others to "greater". Join them.',
    patternName: 'Two List Partition',
  },

  // ─── 11. Invert Binary Tree (226) ────────────────────────────────────────
  {
    id: 'invert-binary-tree',
    slug: 'invert-binary-tree',
    leetcodeNumber: 226,
    title: 'Invert Binary Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['tree', 'bfs', 'dfs', 'recursion'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Microsoft'],
    descriptions: {
      explorer: 'Mirror the tree — swap every left and right child all the way down!',
      engineer: 'Recursively swap left and right children at every node. Post-order or pre-order both work.',
      interview: 'O(n) time, O(h) space for recursion stack. At each node: swap left and right, then recurse into both.',
    },
    puzzleConfig: {
      items: [{id:'a',value:7,label:'7'},{id:'b',value:2,label:'2'},{id:'c',value:4,label:'4'},{id:'d',value:1,label:'1'}],
      target: 9,
      instruction: 'Invert binary tree [4,2,7]: after inverting, what values become the left and right children of root 4?',
      correctAnswer: ['a','b'],
    },
    hints: [
      { id: 1, text: 'Think recursively: to invert a tree, invert the left subtree, invert the right subtree, then swap them.', xpCost: 0 },
      { id: 2, text: 'At each node: temp = node.left, node.left = node.right, node.right = temp. Then recurse on both children.', xpCost: 0 },
      { id: 3, text: 'Base case: if node is null, return null. The recursion handles everything else automatically.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Root = 4, children: left=2, right=7. Visit root first.',
        state: { node: 4, left: 2, right: 7 },
        activeNodes: ['4'],
        annotation: 'At node 4: swap children',
      },
      {
        id: 2,
        description: 'Swap: 4.left=7, 4.right=2. Now recurse into left subtree (was right, val=7).',
        state: { node: 4, left: 7, right: 2 },
        activeNodes: ['4', '7'],
        annotation: 'Swap done at 4\nRecurse on 7',
      },
      {
        id: 3,
        description: 'At node 7: children left=6, right=9. Swap → left=9, right=6. Leaf children have no children to swap.',
        state: { node: 7, left: 9, right: 6 },
        activeNodes: ['7'],
        annotation: 'Swap at 7: 6↔9',
      },
      {
        id: 4,
        description: 'Back to node 4, recurse right subtree (was left, val=2). At node 2: children left=1, right=3. Swap → left=3, right=1.',
        state: { node: 2, left: 3, right: 1 },
        activeNodes: ['2'],
        annotation: 'Swap at 2: 1↔3',
      },
      {
        id: 5,
        description: 'Done. Inverted tree: 4 with left=7(9,6) and right=2(3,1). Level-order: [4,7,2,9,6,3,1].',
        state: { result: [4,7,2,9,6,3,1] },
        annotation: 'Result: [4,7,2,9,6,3,1] ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Every node is visited exactly once.',
      spaceExplanation: 'Recursion stack depth equals tree height h. O(log n) balanced, O(n) skewed.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function invertTree(root) {
  if (root === null) return null;

  // Swap children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recurse
  invertTree(root.left);
  invertTree(root.right);

  return root;
}`,
      },
      {
        language: 'python',
        code: `def invertTree(root):
    if not root:
        return None

    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    return root`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'BFS level-order traversal, swap children of each dequeued node.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Visit all n nodes', spaceExplanation: 'Queue holds up to n/2 nodes at the widest level', visualization: 'linear' },
      },
      optimized: {
        description: 'Recursive DFS swap. Minimal code, O(h) stack space.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Every node visited once', spaceExplanation: 'Recursion stack = tree height', visualization: 'linear' },
      },
      followUps: [
        'Symmetric Tree (LC 101) — checks if a tree is its own mirror',
        'Iterative version using a queue (BFS) — O(n) space',
        'Same Tree (LC 100) — verify two trees are identical',
      ],
      edgeCases: [
        'Null root — return null immediately',
        'Single node — nothing to swap, return node',
        'Already symmetric tree — valid, just inverts to the same structure',
      ],
      commonMistakes: [
        'Swapping values instead of references — only works if values are unique',
        'Forgetting the base case (null check)',
        'Returning after recursion instead of returning root',
      ],
      interviewerTips: [
        'This is a famous "Homebrew" tweet problem — Homebrew author failed it',
        'Mention both recursive and iterative (BFS) approaches',
        'Show the one-liner Python swap: root.left, root.right = root.right, root.left',
      ],
    },
    codeChallenge: {
      functionName: 'invertTree',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} root - level-order array representation
 * @return {(number|null)[]}
 */
function invertTree(root) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1], description: 'Standard 7-node tree' },
        { input: [[2,1,3]], expected: [2,3,1], description: 'Three-node tree' },
        { input: [[]], expected: [], description: 'Empty tree' },
        { input: [[1]], expected: [1], description: 'Single node' },
        { input: [[1,2,null,3,null]], expected: [1,null,2,null,3], description: 'Left-skewed tree' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: [],
    relatedPatterns: ['Recursive Swap', 'DFS Tree Traversal'],
    intuitionSummary: 'For each node, swap its left and right children. Recursively do the same for both subtrees.',
    patternName: 'Recursive Swap',
  },

  // ─── 12. Maximum Depth of Binary Tree (104) ──────────────────────────────
  {
    id: 'max-depth-tree',
    slug: 'maximum-depth-of-binary-tree',
    leetcodeNumber: 104,
    title: 'Maximum Depth of Binary Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['tree', 'dfs', 'bfs', 'recursion'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'How deep does the tree go? Find the longest root-to-leaf path!',
      engineer: 'Recursive: depth = 1 + max(depth(left), depth(right)). BFS alternative: count levels.',
      interview: 'O(n) time, O(h) space. DFS is simpler. BFS counts levels explicitly — good for interviewer variety.',
    },
    puzzleConfig: {
      items: [{id:'a',value:1,label:'level 1'},{id:'b',value:2,label:'level 2'},{id:'c',value:3,label:'level 3'},{id:'d',value:2,label:'2'}],
      target: 5,
      instruction: '[3,9,20,null,null,15,7]: what depth number describes level 2, and what is the maximum depth of the entire tree?',
      correctAnswer: ['b','c'],
    },
    hints: [
      { id: 1, text: 'The depth of a tree is: if the root is null, 0. Otherwise, 1 (for the root) plus the depth of the deeper subtree.', xpCost: 0 },
      { id: 2, text: 'depth(node) = 1 + max(depth(node.left), depth(node.right)). Base case: depth(null) = 0.', xpCost: 0 },
      { id: 3, text: 'For [3,9,20,null,null,15,7]: depth(9)=1, depth(20)=1+max(1,1)=2, depth(3)=1+max(1,2)=3.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: root=3, left=9 (leaf), right=20 with children 15 and 7. Start at root=3.',
        state: { node: 3 },
        activeNodes: ['3'],
        annotation: 'maxDepth(3) = ?',
      },
      {
        id: 2,
        description: 'Recurse into left child 9. Node 9 has no children. maxDepth(9) = 1 + max(0, 0) = 1.',
        state: { node: 9, leftDepth: 0, rightDepth: 0, result: 1 },
        activeNodes: ['9'],
        annotation: 'maxDepth(9) = 1',
      },
      {
        id: 3,
        description: 'Recurse into right child 20. Its children are 15 and 7 (both leaves). maxDepth(15)=1, maxDepth(7)=1. maxDepth(20) = 1 + max(1,1) = 2.',
        state: { node: 20, leftDepth: 1, rightDepth: 1, result: 2 },
        activeNodes: ['20'],
        annotation: 'maxDepth(20) = 2',
      },
      {
        id: 4,
        description: 'Back at root=3. maxDepth(3) = 1 + max(1, 2) = 3. Return 3.',
        state: { node: 3, leftDepth: 1, rightDepth: 2, result: 3 },
        activeNodes: ['3'],
        annotation: 'maxDepth(3) = 1 + max(1,2) = 3 ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Every node is visited exactly once.',
      spaceExplanation: 'Recursion stack depth equals tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      },
      {
        language: 'python',
        code: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'BFS level-order traversal. Count the number of levels processed.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Visit all n nodes', spaceExplanation: 'Queue holds up to n/2 nodes at widest level', visualization: 'linear' },
      },
      optimized: {
        description: 'Recursive DFS. One-liner using 1 + max(left, right). O(h) stack space.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'All nodes visited once', spaceExplanation: 'Stack depth = tree height', visualization: 'linear' },
      },
      followUps: [
        'Minimum Depth (LC 111) — must reach a LEAF node, not just a null child',
        'Diameter of Binary Tree (LC 543) — longest path between any two nodes',
        'Balanced Binary Tree (LC 110) — max and min depths differ by at most 1 at every node',
      ],
      edgeCases: [
        'Null root — return 0',
        'Single node — return 1',
        'All nodes skewed to one side — depth = n',
      ],
      commonMistakes: [
        'Confusing minimum depth with maximum depth for a tree with one-sided nodes',
        'Returning depth without adding 1 for the current node',
      ],
      interviewerTips: [
        'The one-liner is impressive — show you can distill it',
        'Mention BFS approach as an alternative (counting levels)',
        'This is a building block for Balanced Binary Tree and Diameter problems',
      ],
    },
    codeChallenge: {
      functionName: 'maxDepth',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} root - level-order array
 * @return {number}
 */
function maxDepth(root) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3,9,20,null,null,15,7]], expected: 3, description: 'Standard tree depth 3' },
        { input: [[1,null,2]], expected: 2, description: 'Right-skewed 2 levels' },
        { input: [[]], expected: 0, description: 'Empty tree' },
        { input: [[1]], expected: 1, description: 'Single node' },
        { input: [[1,2,3,4,5]], expected: 3, description: 'Complete tree depth 3' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: [],
    relatedPatterns: ['Recursive Height', 'Post-Order DFS'],
    intuitionSummary: 'Depth = 1 + max(depth(left), depth(right)). Base case: null node has depth 0.',
    patternName: 'Recursive Height',
  },

  // ─── 13. Same Tree (100) ─────────────────────────────────────────────────
  {
    id: 'same-tree',
    slug: 'same-tree',
    leetcodeNumber: 100,
    title: 'Same Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['tree', 'dfs', 'recursion', 'bfs'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
    descriptions: {
      explorer: 'Walk both trees simultaneously — do they always have matching shapes and values?',
      engineer: 'Recurse both trees in parallel. Both null = true. One null = false. Values differ = false. Otherwise recurse both sides.',
      interview: 'O(n) time, O(h) space. Clean three-condition base case. Parallel DFS with short-circuit on first mismatch.',
    },
    puzzleConfig: {
      items: [{id:'a',value:1,label:'p root'},{id:'b',value:1,label:'q root'},{id:'c',value:2,label:'p.left'},{id:'d',value:3,label:'q.right'}],
      target: 2,
      instruction: 'Trees p=[1,2,3] and q=[1,2,3]: which pair of values must match first when checking whether two trees are identical?',
      correctAnswer: ['a','b'],
    },
    hints: [
      { id: 1, text: 'Walk both trees at the same time. At each step you have (nodeA, nodeB). What are the three base cases?', xpCost: 0 },
      { id: 2, text: 'Base cases: (1) both null → true (same empty subtree). (2) one null → false (different structure). (3) values differ → false.', xpCost: 0 },
      { id: 3, text: 'If none of the base cases fired: return isSame(p.left, q.left) AND isSame(p.right, q.right).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'p=[1,2,3], q=[1,2,3]. Compare roots: p.val=1, q.val=1. Match — recurse into children.',
        state: { p: 1, q: 1, match: true },
        activeNodes: ['1'],
        annotation: 'p.val=1 == q.val=1 ✓\nRecurse children',
      },
      {
        id: 2,
        description: 'Left subtrees: p.left=2, q.left=2. Values match. Both children are leaves with no children.',
        state: { p: 2, q: 2, match: true },
        activeNodes: ['2'],
        annotation: 'p.left=2 == q.left=2 ✓',
      },
      {
        id: 3,
        description: 'p.left.left=null, q.left.left=null → true. p.left.right=null, q.left.right=null → true.',
        state: { bothNull: true },
        annotation: 'Both null → true',
      },
      {
        id: 4,
        description: 'Right subtrees: p.right=3, q.right=3. Match. Both leaf nodes — null children match. Return true overall.',
        state: { result: true },
        annotation: 'p.right=3 == q.right=3 ✓\nResult: true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'In the worst case all n nodes are compared.',
      spaceExplanation: 'Recursion stack depth equals tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isSameTree(p, q) {
  if (p === null && q === null) return true;  // both empty
  if (p === null || q === null) return false; // one empty
  if (p.val !== q.val) return false;          // values differ

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      },
      {
        language: 'python',
        code: `def isSameTree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Serialize both trees to strings (e.g., preorder with null markers), compare strings.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Build two strings of length n', spaceExplanation: 'Two string representations', visualization: 'linear' },
      },
      optimized: {
        description: 'Parallel DFS with three-condition base case. Short-circuits on first mismatch.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'At most n comparisons', spaceExplanation: 'Recursion stack = height', visualization: 'linear' },
      },
      followUps: [
        'Subtree of Another Tree (LC 572) — call isSameTree at every node of the larger tree',
        'Symmetric Tree (LC 101) — check if tree equals its mirror',
        'Flip Equivalent Binary Trees (LC 951)',
      ],
      edgeCases: [
        'Both trees null — return true',
        'One tree null, other non-null — return false',
        'Same structure but different values',
        'Same values but different structure (one deeper)',
      ],
      commonMistakes: [
        'Checking p.val === q.val before checking for nulls — null pointer error',
        'Using || instead of && for the recursive call — fails to check both subtrees',
        'Forgetting that structure must also match, not just values',
      ],
      interviewerTips: [
        'The three base cases in order: both-null, one-null, value-differs — state them clearly',
        'This function is reused inside Subtree of Another Tree — mention that connection',
        'Can also be solved with BFS using two queues in parallel',
      ],
    },
    codeChallenge: {
      functionName: 'isSameTree',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} p
 * @param {(number|null)[]} q
 * @return {boolean}
 */
function isSameTree(p, q) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,3],[1,2,3]], expected: true, description: 'Identical trees' },
        { input: [[1,2],[1,null,2]], expected: false, description: 'Same values, different structure' },
        { input: [[1,2,1],[1,1,2]], expected: false, description: 'Same structure, different values' },
        { input: [[], []], expected: true, description: 'Both empty' },
        { input: [[1], [1]], expected: true, description: 'Both single node, same value' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['max-depth-tree'],
    relatedPatterns: ['Parallel DFS', 'Structural Comparison'],
    intuitionSummary: 'Recurse both trees simultaneously. At each node: values must match, and both subtrees must be the same.',
    patternName: 'Parallel DFS',
  },

  // ─── 14. Subtree of Another Tree (572) ───────────────────────────────────
  {
    id: 'subtree-of-another',
    slug: 'subtree-of-another-tree',
    leetcodeNumber: 572,
    title: 'Subtree of Another Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['tree', 'dfs', 'recursion'],
    questionSets: ['blind75'],
    companies: ['Amazon', 'Meta', 'Microsoft', 'Apple', 'Google'],
    descriptions: {
      explorer: 'Check if a smaller tree appears as a complete branch somewhere inside a larger tree!',
      engineer: 'For every node in root, call isSameTree(node, subRoot). If any call returns true, subRoot is a subtree.',
      interview: 'O(m × n) time where m=|root|, n=|subRoot|. At every node in root, do a full O(n) comparison. O(h_root) stack space.',
    },
    puzzleConfig: {
      items: [{id:'a',value:4,label:'4'},{id:'b',value:3,label:'3'},{id:'c',value:5,label:'5'},{id:'d',value:1,label:'1'}],
      target: 7,
      instruction: 'root=[3,4,5,1,2], subRoot=[4,1,2]: what is the root value of the subtree, and the root value of the main tree that contains it?',
      correctAnswer: ['a','b'],
    },
    hints: [
      { id: 1, text: 'Think of it as: for every node in the main tree, ask "does the tree rooted at this node look exactly like subRoot?"', xpCost: 0 },
      { id: 2, text: 'Reuse isSameTree. If isSameTree(root, subRoot) is true, return true. Otherwise check root.left and root.right recursively.', xpCost: 0 },
      { id: 3, text: 'isSubtree(root, subRoot) = isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'root=[3,4,5,1,2], subRoot=[4,1,2]. Check isSameTree(root=3, subRoot=4). Values differ → false.',
        state: { node: 3, subRoot: 4, sameTree: false },
        activeNodes: ['3'],
        annotation: 'isSameTree(3,4) = false\nCheck children',
      },
      {
        id: 2,
        description: 'Recurse left: isSubtree(node=4, subRoot=4). Call isSameTree(4, 4). Values match!',
        state: { node: 4, subRoot: 4, sameTree: true },
        activeNodes: ['4'],
        annotation: 'isSameTree(4,4): check...',
      },
      {
        id: 3,
        description: 'isSameTree(4,4): 4==4 ✓, left children 1==1 ✓, right children 2==2 ✓. Returns true.',
        state: { result: true },
        annotation: 'isSameTree = true!\nReturn true ✓',
      },
    ],
    complexity: {
      time: 'O(m × n)',
      space: 'O(h_root)',
      timeExplanation: 'For each of m nodes in root, isSameTree may visit up to n nodes.',
      spaceExplanation: 'Recursion depth = height of root tree.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isSubtree(root, subRoot) {
  if (root === null) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      },
      {
        language: 'python',
        code: `def isSubtree(root, subRoot):
    if not root:
        return False
    if isSameTree(root, subRoot):
        return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)

def isSameTree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    return p.val == q.val and isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Serialize both trees with null markers. Check if subRoot serialization is a substring of root serialization.',
        complexity: { time: 'O(m + n)', space: 'O(m + n)', timeExplanation: 'Linear string operations with KMP', spaceExplanation: 'Two serialization strings', visualization: 'linear' },
      },
      optimized: {
        description: 'For each of m nodes in root, call isSameTree(node, subRoot) which is O(n). Total O(m×n).',
        complexity: { time: 'O(m × n)', space: 'O(h_root)', timeExplanation: 'm nodes, each compared against n', spaceExplanation: 'Recursion stack depth', visualization: 'quadratic' },
      },
      followUps: [
        'O(m+n) solution via tree serialization + KMP string matching',
        'Count how many times subRoot appears in root',
        'Find the path to the matching subtree root',
      ],
      edgeCases: [
        'subRoot equals entire root tree',
        'subRoot is a single node that appears as a leaf',
        'Root is null but subRoot is not — return false',
        'Trees with duplicate values — must check full structural match',
      ],
      commonMistakes: [
        'Returning true when root.val == subRoot.val without doing a full isSameTree check',
        'Not returning false when root is null (meaning subRoot was not found)',
        'Checking only value equality, not structural equality',
      ],
      interviewerTips: [
        'The O(m×n) solution is fine for interviews — mention the O(m+n) serialization approach as a follow-up',
        'Reusing isSameTree shows good decomposition of the problem',
        'The short-circuit || in the recursive call is an optimization — isSameTree returns true early',
      ],
    },
    codeChallenge: {
      functionName: 'isSubtree',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} root
 * @param {(number|null)[]} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3,4,5,1,2],[4,1,2]], expected: true, description: 'subRoot matches left subtree' },
        { input: [[3,4,5,1,2,null,null,null,null,0],[4,1,2]], expected: false, description: 'Extra child breaks match' },
        { input: [[1,1],[1]], expected: true, description: 'Duplicate values — right child matches' },
        { input: [[1,2,3],[2]], expected: true, description: 'Single node subRoot' },
        { input: [[1], [2]], expected: false, description: 'No match' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['same-tree'],
    relatedPatterns: ['isSameTree at Every Node', 'DFS Tree Search'],
    intuitionSummary: 'For each node in root, check if the tree rooted there matches subRoot using isSameTree.',
    patternName: 'isSameTree at Every Node',
  },

  // ─── 15. Binary Tree Level Order Traversal (102) ─────────────────────────
  {
    id: 'binary-tree-level-order',
    slug: 'binary-tree-level-order-traversal',
    leetcodeNumber: 102,
    title: 'Binary Tree Level Order Traversal',
    category: 'binary-tree',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['tree', 'bfs', 'queue'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Read the tree level by level from top to bottom, left to right!',
      engineer: 'BFS with a queue. At each iteration, drain all nodes at the current level, enqueue their children, and store that level\'s values.',
      interview: 'O(n) time, O(n) space. Key: use queue size snapshot at the start of each level to know how many nodes to process.',
    },
    puzzleConfig: {
      items: [{id:'a',value:15,label:'15'},{id:'b',value:7,label:'7'},{id:'c',value:9,label:'9'},{id:'d',value:20,label:'20'}],
      target: 22,
      instruction: '[3,9,20,null,null,15,7]: which two node values are visited last in a level-order (BFS) traversal?',
      correctAnswer: ['a','b'],
    },
    hints: [
      { id: 1, text: 'Use a queue (FIFO). Start by enqueuing the root. Then process level by level.', xpCost: 0 },
      { id: 2, text: 'At the start of each level, the queue size tells you exactly how many nodes are in this level. Process exactly that many.', xpCost: 0 },
      { id: 3, text: 'For each node dequeued: add its value to the current level array, enqueue its non-null children. After processing levelSize nodes, push level array to result.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [3,9,20,null,null,15,7]. Queue=[3]. Level 0.',
        state: { queue: [3], result: [], level: 0 },
        annotation: 'Queue: [3]',
      },
      {
        id: 2,
        description: 'Level 0: size=1. Dequeue 3. Enqueue children 9 and 20. Level=[3].',
        state: { queue: [9, 20], result: [[3]], level: 1 },
        annotation: 'Level 0: [3]\nQueue: [9,20]',
      },
      {
        id: 3,
        description: 'Level 1: size=2. Dequeue 9 (no children), dequeue 20 (children 15,7). Level=[9,20].',
        state: { queue: [15, 7], result: [[3],[9,20]], level: 2 },
        annotation: 'Level 1: [9,20]\nQueue: [15,7]',
      },
      {
        id: 4,
        description: 'Level 2: size=2. Dequeue 15 (leaf), dequeue 7 (leaf). Level=[15,7]. Queue empty.',
        state: { queue: [], result: [[3],[9,20],[15,7]], level: 3 },
        annotation: 'Level 2: [15,7]\nResult: [[3],[9,20],[15,7]] ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Each node is enqueued and dequeued exactly once.',
      spaceExplanation: 'Queue holds at most the widest level of the tree — O(n/2) = O(n) nodes.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}`,
      },
      {
        language: 'python',
        code: `from collections import deque

def levelOrder(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS with depth tracking. Store values at depth d in result[d]. Sort by depth at end.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Visit all nodes', spaceExplanation: 'Recursion stack + result array', visualization: 'linear' },
      },
      optimized: {
        description: 'BFS with queue. Level boundary tracked by queue size snapshot at start of each level.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Each node enqueued/dequeued once', spaceExplanation: 'Queue up to widest level', visualization: 'linear' },
      },
      followUps: [
        'Level Order Bottom (LC 107) — reverse the result',
        'Zigzag Level Order (LC 103) — alternate left-to-right and right-to-left',
        'Right Side View (LC 199) — last node at each level',
        'Average of Levels (LC 637)',
      ],
      edgeCases: [
        'Null root — return []',
        'Single node — return [[root.val]]',
        'Unbalanced tree (some levels have one node)',
      ],
      commonMistakes: [
        'Not snapshotting queue size before the inner loop — new children corrupt the level count',
        'Using Array.shift() in JS (O(n)) for production code — use a proper deque or index pointer',
        'Pushing null children into the queue',
      ],
      interviewerTips: [
        'The levelSize snapshot is the key insight — state it explicitly',
        'In Python, always use collections.deque for O(1) popleft',
        'This pattern underlies many tree problems: Right Side View, Zigzag, Average of Levels',
      ],
    },
    codeChallenge: {
      functionName: 'levelOrder',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} root - level-order array
 * @return {number[][]}
 */
function levelOrder(root) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]], description: 'Standard 3-level tree' },
        { input: [[1]], expected: [[1]], description: 'Single node' },
        { input: [[]], expected: [], description: 'Empty tree' },
        { input: [[1,2,3,4,5]], expected: [[1],[2,3],[4,5]], description: 'Complete tree 3 levels' },
        { input: [[1,null,2,null,3]], expected: [[1],[2],[3]], description: 'Right-skewed tree' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['max-depth-tree'],
    relatedPatterns: ['BFS with Queue', 'Level Boundary Tracking'],
    intuitionSummary: 'Use a queue. At each level, dequeue all nodes, enqueue their children, store their values.',
    patternName: 'BFS with Queue',
  },

  // ─── 16. Symmetric Tree (101) ────────────────────────────────────────────
  {
    id: 'symmetric-tree',
    slug: 'symmetric-tree',
    leetcodeNumber: 101,
    title: 'Symmetric Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['tree', 'dfs', 'bfs', 'recursion'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Is the tree a perfect mirror of itself around the center?',
      engineer: 'Mirror check: isMirror(left, right) where left.val == right.val AND left.left mirrors right.right AND left.right mirrors right.left.',
      interview: 'O(n) time, O(h) space. Key: pass opposite subtrees down (left.left with right.right, left.right with right.left).',
    },
    puzzleConfig: {
      items: [{id:'a',value:3,label:'left-left'},{id:'b',value:3,label:'right-right'},{id:'c',value:4,label:'left-right'},{id:'d',value:4,label:'right-left'}],
      target: 6,
      instruction: '[1,2,2,3,4,4,3]: which pair of level-3 leaf values must be equal to confirm the tree is symmetric?',
      correctAnswer: ['a','b'],
    },
    hints: [
      { id: 1, text: 'A tree is symmetric if the left and right subtrees are mirror images of each other — not equal, but MIRRORED.', xpCost: 0 },
      { id: 2, text: 'Mirror means: left.val == right.val, left.LEFT mirrors right.RIGHT, left.RIGHT mirrors right.LEFT. Note the cross-matching.', xpCost: 0 },
      { id: 3, text: 'Base cases: both null → true (symmetric empty). One null → false (asymmetric). Values differ → false.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [1,2,2,3,4,4,3]. Root=1. Check isMirror(root.left=2, root.right=2).',
        state: { left: 2, right: 2 },
        activeNodes: ['1'],
        annotation: 'isMirror(2, 2)?',
      },
      {
        id: 2,
        description: 'left.val=2 == right.val=2 ✓. Now check crossed children: isMirror(2.left=3, 2.right=3) AND isMirror(2.right=4, 2.left=4).',
        state: { left: 2, right: 2, leftLeft: 3, rightRight: 3, leftRight: 4, rightLeft: 4 },
        activeNodes: ['2'],
        annotation: 'vals match\nCross-check: (3,3) and (4,4)',
      },
      {
        id: 3,
        description: 'isMirror(3, 3): vals equal, both leaves → true. isMirror(4, 4): vals equal, both leaves → true.',
        state: { mirror1: true, mirror2: true },
        annotation: 'Both mirrors = true',
      },
      {
        id: 4,
        description: 'All checks passed. Tree is symmetric. Return true.',
        state: { result: true },
        annotation: 'Symmetric! Return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'Each node pair is visited once.',
      spaceExplanation: 'Recursion stack depth = tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isSymmetric(root) {
  return isMirror(root.left, root.right);
}

function isMirror(left, right) {
  if (left === null && right === null) return true;
  if (left === null || right === null) return false;
  if (left.val !== right.val) return false;

  // Cross-check: outer pair and inner pair
  return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}`,
      },
      {
        language: 'python',
        code: `def isSymmetric(root):
    def isMirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        return (left.val == right.val
                and isMirror(left.left, right.right)
                and isMirror(left.right, right.left))

    return isMirror(root.left, root.right)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect level-order values for each level. Check if each level reads the same forwards and backwards.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'BFS traversal', spaceExplanation: 'Level arrays', visualization: 'linear' },
      },
      optimized: {
        description: 'Recursive mirror check with cross-matching children. O(h) stack space.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'Each node pair visited once', spaceExplanation: 'Recursion stack depth', visualization: 'linear' },
      },
      followUps: [
        'Invert Binary Tree (LC 226) — invert and check if same tree',
        'Iterative version using a queue of pairs',
        'Path Sum with symmetric paths',
      ],
      edgeCases: [
        'Single node root — symmetric by definition',
        'One child missing on one side but not the other',
        'All same values but asymmetric structure',
        '[1,2,2,null,3,null,3] — looks close but NOT symmetric',
      ],
      commonMistakes: [
        'Comparing left.left with right.left instead of left.left with right.right (wrong cross-match)',
        'Treating symmetric as "equal" — Same Tree logic would be wrong here',
        'Not handling the case where root itself is null',
      ],
      interviewerTips: [
        'Draw the cross-matching arrows clearly: (left.left ↔ right.right) and (left.right ↔ right.left)',
        'The iterative BFS version uses a queue of node pairs — valid alternative to show',
        'Contrast with Same Tree — shows you understand the difference between equality and mirror symmetry',
      ],
    },
    codeChallenge: {
      functionName: 'isSymmetric',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} root - level-order array
 * @return {boolean}
 */
function isSymmetric(root) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1,2,2,3,4,4,3]], expected: true, description: 'Perfectly symmetric tree' },
        { input: [[1,2,2,null,3,null,3]], expected: false, description: 'Asymmetric — inner children differ' },
        { input: [[1]], expected: true, description: 'Single node is symmetric' },
        { input: [[1,2,2]], expected: true, description: 'Three-node symmetric' },
        { input: [[1,2,3]], expected: false, description: 'Different values on left and right' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['same-tree', 'invert-binary-tree'],
    relatedPatterns: ['Mirror Check', 'Cross-Matching DFS'],
    intuitionSummary: 'Mirror check: left.val == right.val and recurse with crossed children (left.left ↔ right.right).',
    patternName: 'Mirror Check',
  },

  // ─── 17. Path Sum (112) ───────────────────────────────────────────────────
  {
    id: 'path-sum',
    slug: 'path-sum',
    leetcodeNumber: 112,
    title: 'Path Sum',
    category: 'binary-tree',
    difficulty: 'easy',
    engineType: 'tree',
    tags: ['tree', 'dfs', 'recursion'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Apple'],
    descriptions: {
      explorer: 'Find a root-to-leaf path where the values add up to the target sum!',
      engineer: 'DFS: subtract current node\'s value from target. At a leaf, check if remaining == 0. Recurse left OR right.',
      interview: 'O(n) time, O(h) space. Subtract as you go down. Only check at leaves (both children null).',
    },
    puzzleConfig: {
      nodes: [
        {val:5,left:4,right:8,x:0.5,y:0},
        {val:4,left:11,right:null,x:0.25,y:1},
        {val:8,left:13,right:4,x:0.75,y:1},
        {val:11,left:7,right:2,x:0.125,y:2},
        {val:7,left:null,right:null,x:0.0625,y:3},
        {val:2,left:null,right:null,x:0.1875,y:3},
      ],
      p: 7,
      q: 2,
      instruction: 'Tree with targetSum=22: find the node that is the lowest common ancestor of the two leaf nodes on the valid root-to-leaf path.',
      mode: 'lca',
      correctAnswer: 11,
    },
    hints: [
      { id: 1, text: 'DFS down from root. Subtract the current node\'s value from the target at each step.', xpCost: 0 },
      { id: 2, text: 'A "path" must end at a LEAF node (both children are null). Don\'t return true at an internal node with the right partial sum.', xpCost: 0 },
      { id: 3, text: 'At a leaf: return (remaining - leaf.val) === 0. For non-leaves: return hasPathSum(left, remaining - val) || hasPathSum(right, remaining - val).', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Tree: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum=22. Start at root=5, remaining=22.',
        state: { node: 5, remaining: 22 },
        activeNodes: ['5'],
        annotation: 'remaining = 22 - 5 = 17',
      },
      {
        id: 2,
        description: 'Go left to 4. remaining = 17 - 4 = 13. Go left to 11. remaining = 13 - 11 = 2.',
        state: { node: 11, remaining: 2 },
        activeNodes: ['11'],
        annotation: 'At 11: remaining=2',
      },
      {
        id: 3,
        description: 'At 11: try left child 7. remaining = 2 - 7 = -5. 11.left=7 is a leaf. -5 ≠ 0 → false.',
        state: { node: 7, remaining: -5, isLeaf: true, result: false },
        activeNodes: ['7'],
        annotation: 'Leaf 7: -5 ≠ 0 → false',
      },
      {
        id: 4,
        description: 'Try right child of 11: node 2. remaining = 2 - 2 = 0. Node 2 is a leaf. 0 == 0 → TRUE!',
        state: { node: 2, remaining: 0, isLeaf: true, result: true },
        activeNodes: ['2'],
        annotation: 'Leaf 2: 0 == 0 → true ✓\nPath: 5→4→11→2 = 22',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      timeExplanation: 'In worst case every node is visited (no early exit until leaf).',
      spaceExplanation: 'Recursion stack depth equals tree height h.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function hasPathSum(root, targetSum) {
  if (root === null) return false;

  // At a leaf node, check if remaining sum is zero
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  // Recurse with reduced target
  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}`,
      },
      {
        language: 'python',
        code: `def hasPathSum(root, targetSum):
    if not root:
        return False

    if not root.left and not root.right:
        return root.val == targetSum

    remaining = targetSum - root.val
    return hasPathSum(root.left, remaining) or hasPathSum(root.right, remaining)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Find all root-to-leaf paths (DFS with path tracking), compute each sum, check if any equals target.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Visit all nodes', spaceExplanation: 'Path array and recursion', visualization: 'linear' },
      },
      optimized: {
        description: 'Subtract as you descend. At each leaf check if remaining == 0. No path array needed.',
        complexity: { time: 'O(n)', space: 'O(h)', timeExplanation: 'DFS with early termination', spaceExplanation: 'Only recursion stack', visualization: 'linear' },
      },
      followUps: [
        'Path Sum II (LC 113) — return all valid root-to-leaf paths',
        'Path Sum III (LC 437) — any path (not just root-to-leaf) summing to target',
        'Binary Tree Maximum Path Sum (LC 124) — find path with maximum sum',
      ],
      edgeCases: [
        'Empty tree — return false',
        'Root is a leaf — check root.val === targetSum',
        'Negative node values — don\'t prune early based on sum > targetSum',
        'A node with only one child is NOT a leaf',
      ],
      commonMistakes: [
        'Returning true at an internal node with correct partial sum (not a leaf)',
        'Checking null node for leaf condition — need both children to be null',
        'Forgetting to handle empty tree (null root)',
      ],
      interviewerTips: [
        'Emphasize the leaf definition: a node with NO children (not just one)',
        'Subtracting as you go is cleaner than accumulating — less error-prone',
        'Mention Path Sum II as an immediate follow-up; same DFS with path array added',
      ],
    },
    codeChallenge: {
      functionName: 'hasPathSum',
      starterCode: {
        javascript: `/**
 * @param {(number|null)[]} root - level-order array
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[5,4,8,11,null,13,4,7,2,null,null,null,1], 22], expected: true, description: 'Path 5→4→11→2 = 22' },
        { input: [[1,2,3], 5], expected: false, description: 'No path sums to 5' },
        { input: [[], 0], expected: false, description: 'Empty tree' },
        { input: [[1,2], 1], expected: false, description: 'Path must end at leaf — 1 alone is not a leaf' },
        { input: [[1,2], 3], expected: true, description: 'Path 1→2 = 3' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 120 },
    prerequisites: ['max-depth-tree'],
    relatedPatterns: ['DFS Subtract Target', 'Root-to-Leaf Path'],
    intuitionSummary: 'DFS subtract current value. At leaf check remaining == 0.',
    patternName: 'DFS Subtract Target',
  },

  // ─── 18. Sort List (148) ─────────────────────────────────────────────────
  {
    id: 'sort-list',
    slug: 'sort-list',
    leetcodeNumber: 148,
    title: 'Sort List',
    category: 'divide-conquer',
    difficulty: 'medium',
    engineType: 'linked-list',
    tags: ['linked-list', 'merge-sort', 'divide-conquer', 'two-pointer'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Split the list in half repeatedly, sort each half, then merge them back together!',
      engineer: 'Merge sort on a linked list. Find midpoint via slow/fast pointers, split, recurse on both halves, merge sorted halves.',
      interview: 'O(n log n) time, O(log n) space for the recursion stack. The merge step is the same as Merge Two Sorted Lists.',
    },
    puzzleConfig: {
      nodes: [{id:'a',val:4},{id:'b',val:2},{id:'c',val:1},{id:'d',val:3}],
      instruction: 'Sort linked list [4→2→1→3] using merge sort. Click the HEAD of the sorted result.',
      mode: 'identify-head',
      correctAnswer: 'c',
    },
    hints: [
      { id: 1, text: 'Merge sort on a linked list: the base case is a list of 0 or 1 nodes (already sorted). Otherwise, split at the midpoint.', xpCost: 0 },
      { id: 2, text: 'Find the midpoint with slow/fast pointers. Cut the list at the midpoint by setting mid.next = null. Recurse on both halves.', xpCost: 0 },
      { id: 3, text: 'After sorting both halves, merge them with the same mergeTwoLists function you used in LC 21.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: 4→2→1→3. Find mid with slow/fast: slow=2, fast=3 (end). Mid is node 2.',
        state: { list: [4,2,1,3], slow: 2, fast: 3 },
        annotation: 'mid=2, slow after: 2\nSplit: [4,2] | [1,3]',
      },
      {
        id: 2,
        description: 'Left half: [4,2]. Find mid: slow=4. Split: [4] | [2]. Both single nodes — sorted.',
        state: { leftHalf: [4,2], split: [[4],[2]] },
        annotation: 'Left: [4]|[2] → sorted',
      },
      {
        id: 3,
        description: 'Merge [4] and [2]: 2 < 4 → 2→4.',
        state: { mergedLeft: [2,4] },
        annotation: 'Left merged: [2,4]',
      },
      {
        id: 4,
        description: 'Right half: [1,3]. Find mid: slow=1. Split: [1] | [3]. Both single nodes — sorted.',
        state: { rightHalf: [1,3], split: [[1],[3]] },
        annotation: 'Right: [1]|[3] → sorted',
      },
      {
        id: 5,
        description: 'Merge [1,3] and [2,4]: interleave → 1→2→3→4. Final result!',
        state: { result: [1,2,3,4] },
        annotation: 'Merge [1,3]+[2,4] = [1,2,3,4] ✓',
      },
    ],
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)',
      timeExplanation: 'log n levels of recursion, each level processes all n nodes during merge.',
      spaceExplanation: 'Recursion stack depth is log n (unlike array merge sort which needs O(n) auxiliary array).',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function sortList(head) {
  // Base case: 0 or 1 nodes
  if (!head || !head.next) return head;

  // Find midpoint and split
  let slow = head, fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const mid = slow.next;
  slow.next = null; // cut list in half

  // Sort both halves
  const left = sortList(head);
  const right = sortList(mid);

  // Merge sorted halves
  return merge(left, right);
}

function merge(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}`,
      },
      {
        language: 'python',
        code: `def sortList(head):
    if not head or not head.next:
        return head

    # Find midpoint
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    mid = slow.next
    slow.next = None  # split

    left = sortList(head)
    right = sortList(mid)
    return merge(left, right)

def merge(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next, l1 = l1, l1.next
        else:
            curr.next, l2 = l2, l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Collect all values into an array, sort the array, rebuild the linked list.',
        complexity: { time: 'O(n log n)', space: 'O(n)', timeExplanation: 'Array sort', spaceExplanation: 'Array of n values', visualization: 'nlogn' },
      },
      optimized: {
        description: 'Top-down merge sort in-place. Split at midpoint, recurse, merge. O(log n) stack space.',
        complexity: { time: 'O(n log n)', space: 'O(log n)', timeExplanation: 'log n levels × n merge work', spaceExplanation: 'Recursion stack depth = log n', visualization: 'nlogn' },
      },
      followUps: [
        'Bottom-up merge sort for O(1) space — merge sublists of size 1, 2, 4, 8...',
        'Why is merge sort preferred over quicksort for linked lists? (No random access for pivot selection)',
        'Insertion sort (LC 147) — O(n²) but stable and good for nearly sorted lists',
      ],
      edgeCases: [
        'Empty list or single node — return as-is',
        'Two-node list — split into two singles, merge',
        'Already sorted list — still O(n log n)',
        'Reverse sorted list — still O(n log n)',
      ],
      commonMistakes: [
        'Using fast = head instead of fast = head.next — slow lands on second half start, not true midpoint',
        'Forgetting slow.next = null — list remains circular causing infinite loops',
        'Returning head instead of merge result after recursion',
      ],
      interviewerTips: [
        'Linked list merge sort has O(log n) space vs array merge sort O(n) — mention this advantage',
        'The bottom-up iterative version achieves O(1) space — impressive follow-up',
        'Connecting to LC 21 (merge) and LC 143 (find mid) shows pattern recognition',
      ],
    },
    codeChallenge: {
      functionName: 'sortList',
      starterCode: {
        javascript: `/**
 * @param {number[]} head - array of values
 * @return {number[]} - sorted values
 */
function sortList(head) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[4,2,1,3]], expected: [1,2,3,4], description: 'Standard unsorted list' },
        { input: [[-1,5,3,4,0]], expected: [-1,0,3,4,5], description: 'Negative numbers' },
        { input: [[]], expected: [], description: 'Empty list' },
        { input: [[1]], expected: [1], description: 'Single node' },
        { input: [[3,1,2]], expected: [1,2,3], description: 'Three nodes' },
      ],
    },
    xpRewards: { puzzle: 120, hints: 20, dryRun: 40, code: 60, coding: 150 },
    prerequisites: ['reverse-linked-list', 'merge-two-sorted-lists'],
    relatedPatterns: ['Merge Sort', 'Find Mid + Split + Merge'],
    intuitionSummary: 'Merge sort: find mid with slow/fast, split, sort halves, merge. O(n log n) time, O(log n) space.',
    patternName: 'Merge Sort on Linked List',
  },
];

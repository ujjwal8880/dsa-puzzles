import type { QuestionConfig } from '@/types/question';

export const validParentheses: QuestionConfig = {
  id: 'valid-parentheses',
  slug: 'valid-parentheses',
  leetcodeNumber: 20,
  title: 'Valid Parentheses',
  category: 'stack',
  difficulty: 'easy',
  engineType: 'stack',
  tags: ['stack', 'string', 'matching'],
  descriptions: {
    explorer: 'Every opening bracket needs a matching closing bracket — in the right order! Can you figure out if all brackets are properly paired?',
    engineer: 'Process each character. Push opening brackets. Pop on closing brackets and verify the match. Stack empty at end = valid.',
    interview: 'Classic stack application. O(n) time, O(n) space. Key insight: LIFO ensures innermost brackets close first.',
  },
  puzzleConfig: {
    sequence: ['(', '{', '[', ']', '}', ')'],
    instruction: 'Simulate the stack: push opening brackets, pop closing brackets. Is the stack empty at the end?',
    mode: 'parentheses',
    operations: [
      { char: '(', action: 'push', description: 'Opening bracket → PUSH onto stack' },
      { char: '{', action: 'push', description: 'Opening bracket → PUSH onto stack' },
      { char: '[', action: 'push', description: 'Opening bracket → PUSH onto stack' },
      { char: ']', action: 'pop', description: 'Closing ] → POP and check for [' },
      { char: '}', action: 'pop', description: 'Closing } → POP and check for {' },
      { char: ')', action: 'pop', description: 'Closing ) → POP and check for (' },
    ],
    correctFinalState: 'empty',
  },
  hints: [
    { id: 1, text: 'Every closing bracket must match the MOST RECENT opening bracket. What data structure is perfect for "most recent"?', xpCost: 0 },
    { id: 2, text: 'A stack is LIFO — Last In, First Out. When you see a closing bracket, check what\'s on top of the stack.', xpCost: 0 },
    { id: 3, text: 'Push every opening bracket. When you see a closing bracket: pop and check the pair. If mismatch or stack empty → invalid.', xpCost: 10 },
  ],
  dryRunSteps: [
    {
      id: 1,
      description: 'Start with empty stack. Input: "({[]})"',
      state: { input: '({[]})', stack: [], position: -1, valid: null },
      highlight: [],
      annotation: 'stack = []',
    },
    {
      id: 2,
      description: 'See "(". It\'s an opener → PUSH',
      state: { input: '({[]})', stack: ['('], position: 0, valid: null },
      highlight: [0],
      annotation: 'stack = ["("]',
    },
    {
      id: 3,
      description: 'See "{". It\'s an opener → PUSH',
      state: { input: '({[]})', stack: ['(', '{'], position: 1, valid: null },
      highlight: [1],
      annotation: 'stack = ["(", "{"]',
    },
    {
      id: 4,
      description: 'See "[". It\'s an opener → PUSH',
      state: { input: '({[]})', stack: ['(', '{', '['], position: 2, valid: null },
      highlight: [2],
      annotation: 'stack = ["(", "{", "["]',
    },
    {
      id: 5,
      description: 'See "]". It\'s a closer → POP top which is "[". "[" matches "]" ✓',
      state: { input: '({[]})', stack: ['(', '{'], position: 3, valid: null },
      highlight: [3],
      annotation: 'POP "[" → matches "]" ✓\nstack = ["(", "{"]',
    },
    {
      id: 6,
      description: 'See "}". POP top which is "{". Matches ✓',
      state: { input: '({[]})', stack: ['('], position: 4, valid: null },
      highlight: [4],
      annotation: 'POP "{" → matches "}" ✓\nstack = ["("]',
    },
    {
      id: 7,
      description: 'See ")". POP top which is "(". Matches ✓. Stack now empty.',
      state: { input: '({[]})', stack: [], position: 5, valid: true },
      highlight: [5],
      annotation: 'POP "(" → matches ")" ✓\nstack = [] → VALID ✓',
    },
  ],
  complexity: {
    time: 'O(n)',
    space: 'O(n)',
    timeExplanation: 'Each character is processed exactly once.',
    spaceExplanation: 'Stack can hold at most n/2 characters in worst case (all openers).',
    visualization: 'linear',
  },
  codeSolutions: [
        {
      language: 'python',
      code: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return len(stack) == 0`,
    },
  ],
  interviewInsights: {
    bruteForce: {
      description: 'Replace innermost pairs repeatedly until no pairs remain or string cannot be reduced.',
      complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'Each pass O(n), up to n/2 passes', spaceExplanation: 'String manipulation', visualization: 'quadratic' },
    },
    optimized: {
      description: 'Single pass with stack. LIFO naturally matches innermost brackets.',
      complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single pass', spaceExplanation: 'Stack space', visualization: 'linear' },
    },
    followUps: [
      'What about wildcard characters like \'*\' that can be (, ), or empty?',
      'What\'s the minimum number of swaps to make a string valid?',
      'Score of Parentheses',
    ],
    edgeCases: ['Empty string (valid)', 'Single character "(", closing only ")"', 'Interleaved wrong types: "([)]"'],
    commonMistakes: [
      'Forgetting to check stack is non-empty before popping',
      'Checking stack.length === 0 only at the end without checking mismatches during',
      'Using a set instead of a map for pairs',
    ],
    interviewerTips: [
      'Explain why stack is the right data structure (LIFO matches innermost)',
      'Write the closing→opening map — cleaner than if/else chains',
      'The empty-stack check catches edge cases like "))))("',
    ],
  },
  codeChallenge: {
    functionName: 'isValid',
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your solution here

}`,
      typescript: `function isValid(s: string): boolean {
  // Your solution here

}`,
      python: `def isValid(s):
    # Your solution here
    pass`,
    },
    testCases: [
      { input: ['()'], expected: true, description: 'Simple valid: "()"' },
      { input: ['()[]{}'], expected: true, description: 'Multiple types: "()[]{}"' },
      { input: ['(]'], expected: false, description: 'Mismatch: "(]"' },
      { input: ['([)]'], expected: false, description: 'Interleaved wrong: "([)]"' },
      { input: ['{[]}'], expected: true, description: 'Nested: "{[]}"' },
      { input: [''], expected: true, description: 'Empty string is valid' },
      { input: [')'], expected: false, description: 'Closing only: ")"' },
      { input: ['(((('], expected: false, description: 'Unclosed: "(((("' },
    ],
  },
  xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
  prerequisites: [],
  relatedPatterns: ['Monotonic Stack', 'Min Stack', 'Expression Evaluation'],
  intuitionSummary: 'A stack is LIFO. Brackets must close in reverse order of opening. Stack is the perfect mental model.',
  patternName: 'Stack Matching',
  questionSets: ['blind75', 'top150'],
  companies: ['Google', 'Amazon', 'Meta', 'Bloomberg', 'Microsoft'],
};

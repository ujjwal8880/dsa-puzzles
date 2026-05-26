import type { QuestionConfig } from '@/types/question';

export const POINTERS_GREEDY_STACK_COMPLETE: QuestionConfig[] = [
  // ─── 1. 3Sum ────────────────────────────────────────────────────────────────
  {
    id: 'three-sum',
    slug: 'three-sum',
    leetcodeNumber: 15,
    title: '3Sum',
    category: 'two-pointers',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'two-pointers', 'sorting'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Find all triplets in the array that add up to zero — without counting the same triplet twice!',
      engineer: 'Sort the array. Fix one element with a for-loop, then run two pointers on the remainder to find pairs that sum to its negation. Skip duplicates at each level.',
      interview: 'O(n²) two-pointer after sorting. Three duplicate-skip points: outer loop, left pointer, right pointer. Returns unique triplets.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: '0' },
        { id: 'b', value: 1, label: '1' },
        { id: 'c', value: 2, label: '2' },
        { id: 'd', value: -1, label: '-1' },
      ],
      target: 1,
      instruction: '[-1,0,1,2,-1,-4]: when one element is -1, select the TWO elements that sum to 1 (so the triplet sums to 0).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Sort the array first. A sorted array lets you use two pointers and skip duplicates easily.', xpCost: 0 },
      { id: 2, text: 'Fix nums[i], then find two numbers in nums[i+1..n-1] that sum to -nums[i] using left and right pointers.', xpCost: 0 },
      { id: 3, text: 'Skip duplicates: if nums[i] === nums[i-1], continue. After finding a triplet, advance left past duplicates, advance right past duplicates.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: [-1, 0, 1, 2, -1, -4]. Sort → [-4, -1, -1, 0, 1, 2].',
        state: { nums: [-4, -1, -1, 0, 1, 2], result: [], i: -1 },
        highlight: [],
        annotation: 'sorted nums',
      },
      {
        id: 2,
        description: 'i=0, nums[i]=-4. Need two numbers summing to 4. left=1, right=5. -1+2=1 < 4 → move left.',
        state: { nums: [-4, -1, -1, 0, 1, 2], result: [], i: 0, left: 1, right: 5, sum: 1 },
        highlight: [0, 1, 5],
        annotation: 'sum=1 < 4, move left',
      },
      {
        id: 3,
        description: 'i=1, nums[i]=-1. Need two summing to 1. left=2, right=5. -1+2=1 ✓ → found [-1,-1,2]. Advance both pointers.',
        state: { nums: [-4, -1, -1, 0, 1, 2], result: [[-1, -1, 2]], i: 1, left: 2, right: 5 },
        highlight: [1, 2, 5],
        annotation: 'triplet found: [-1,-1,2]',
      },
      {
        id: 4,
        description: 'Continue: left=3, right=4. 0+1=1 ✓ → found [-1,0,1]. Advance both pointers.',
        state: { nums: [-4, -1, -1, 0, 1, 2], result: [[-1, -1, 2], [-1, 0, 1]], i: 1, left: 3, right: 4 },
        highlight: [1, 3, 4],
        annotation: 'triplet found: [-1,0,1]',
      },
      {
        id: 5,
        description: 'i=2, nums[2]=-1 === nums[1] → skip duplicate. i=3, nums[i]=0. left=4, right=5. 1+2=3 > 0 → move right. Pointers cross → done.',
        state: { nums: [-4, -1, -1, 0, 1, 2], result: [[-1, -1, 2], [-1, 0, 1]], i: 3 },
        highlight: [3, 4, 5],
        annotation: 'skip duplicate i=2; i=3 no triplet',
      },
      {
        id: 6,
        description: 'Final result: [[-1,-1,2], [-1,0,1]].',
        state: { nums: [-4, -1, -1, 0, 1, 2], result: [[-1, -1, 2], [-1, 0, 1]] },
        highlight: [],
        annotation: 'done',
      },
    ],
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      timeExplanation: 'Outer loop O(n) × two-pointer inner pass O(n). Sorting is O(n log n) but dominated.',
      spaceExplanation: 'No extra data structures beyond output. Sort is in-place.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip outer duplicate

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,
      },
      {
        language: 'python',
        code: `def threeSum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1

    return result`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Three nested loops, deduplicate results using a Set of sorted triplets.',
        complexity: { time: 'O(n³)', space: 'O(n)', timeExplanation: 'Three nested loops', spaceExplanation: 'Set for deduplication', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sort + fix one element + two pointers on remainder. Skip duplicates at all three levels.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'O(n) outer × O(n) two-pointer', spaceExplanation: 'In-place sort, output not counted', visualization: 'quadratic' },
      },
      followUps: [
        '4Sum — add another fixed loop around the same pattern',
        '3Sum Closest — track minimum absolute difference instead',
        'Count triplets summing to zero vs returning them',
      ],
      edgeCases: [
        'All zeros: [0,0,0] → [[0,0,0]]',
        'No valid triplets → return []',
        'Array length < 3 → return []',
        'All positive or all negative numbers',
      ],
      commonMistakes: [
        'Forgetting to skip duplicates after finding a triplet (left/right inner loops)',
        'Skipping outer duplicate when i === 0 (need i > 0 guard)',
        'Not sorting before applying two pointers',
      ],
      interviewerTips: [
        'Point out the three distinct duplicate-skip locations',
        'Contrast with Two Sum: here sorting + two pointers beats hashmap for uniqueness',
        'Mention 4Sum extension to show pattern generalization',
      ],
    },
    codeChallenge: {
      functionName: 'threeSum',
      unorderedResult: true,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]], description: 'Standard case with two triplets' },
        { input: [[0, 1, 1]], expected: [], description: 'No valid triplet' },
        { input: [[0, 0, 0]], expected: [[0, 0, 0]], description: 'All zeros' },
        { input: [[-2, 0, 1, 1, 2]], expected: [[-2, 0, 2], [-2, 1, 1]], description: 'Multiple triplets with duplicates' },
        { input: [[-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]], expected: [[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]], description: 'Many duplicates' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['two-sum'],
    relatedPatterns: ['Two Pointers', 'Sorting', 'Duplicate Skipping'],
    intuitionSummary: 'Sort enables two pointers. Fixing one element reduces 3Sum to 2Sum. Sorting also makes duplicate skipping trivial.',
    patternName: 'Sort + Two Pointers',
  },

  // ─── 2. Container With Most Water ───────────────────────────────────────────
  {
    id: 'container-with-most-water',
    slug: 'container-with-most-water',
    leetcodeNumber: 11,
    title: 'Container With Most Water',
    category: 'two-pointers',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'two-pointers', 'greedy'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Meta', 'Microsoft'],
    descriptions: {
      explorer: 'You have walls of different heights. Pick two walls that trap the most water between them!',
      engineer: 'Start with pointers at both ends. Area = min(height[l], height[r]) * (r - l). Always move the pointer at the shorter wall inward.',
      interview: 'Greedy two-pointer. Moving the taller wall inward can never improve area. Moving the shorter wall is the only chance to find a larger container.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'left pointer: index 1, height=8' },
        { id: 'b', value: 8, label: 'right pointer: index 8, height=7' },
        { id: 'c', value: 0, label: 'index 0, height=1' },
        { id: 'd', value: 7, label: 'index 7, height=3' },
      ],
      target: 9,
      instruction: '[1,8,6,2,5,4,8,3,7]: select the TWO indices forming the container with maximum water (area=49).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Area is limited by the shorter wall. Moving the taller wall inward only reduces width without a chance to increase height.', xpCost: 0 },
      { id: 2, text: 'Start left=0, right=n-1. Calculate area = min(height[left], height[right]) * (right - left).', xpCost: 0 },
      { id: 3, text: 'Move whichever pointer points to the shorter wall. This is the only way area can potentially increase.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'heights=[1,8,6,2,5,4,8,3,7]. left=0, right=8. Area=min(1,7)*8=8.',
        state: { heights: [1, 8, 6, 2, 5, 4, 8, 3, 7], left: 0, right: 8, maxArea: 8 },
        highlight: [0, 8],
        annotation: 'area=8, maxArea=8',
      },
      {
        id: 2,
        description: 'height[0]=1 < height[8]=7 → move left. left=1. Area=min(8,7)*7=49.',
        state: { heights: [1, 8, 6, 2, 5, 4, 8, 3, 7], left: 1, right: 8, maxArea: 49 },
        highlight: [1, 8],
        annotation: 'area=49, maxArea=49',
      },
      {
        id: 3,
        description: 'height[1]=8 > height[8]=7 → move right. right=7. Area=min(8,3)*6=18.',
        state: { heights: [1, 8, 6, 2, 5, 4, 8, 3, 7], left: 1, right: 7, maxArea: 49 },
        highlight: [1, 7],
        annotation: 'area=18 < 49, maxArea=49',
      },
      {
        id: 4,
        description: 'height[7]=3 < height[1]=8 → move right. right=6. Area=min(8,8)*5=40.',
        state: { heights: [1, 8, 6, 2, 5, 4, 8, 3, 7], left: 1, right: 6, maxArea: 49 },
        highlight: [1, 6],
        annotation: 'area=40 < 49, maxArea=49',
      },
      {
        id: 5,
        description: 'Pointers keep converging. Eventually left >= right. Return maxArea=49.',
        state: { heights: [1, 8, 6, 2, 5, 4, 8, 3, 7], left: 6, right: 6, maxArea: 49 },
        highlight: [],
        annotation: 'done, maxArea=49',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each pointer moves at most n steps total; they meet in the middle.',
      spaceExplanation: 'Only two pointer variables and maxArea.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}`,
      },
      {
        language: 'python',
        code: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0

    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_area = max(max_area, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_area`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try every pair of walls and compute area.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops over all pairs', spaceExplanation: 'No extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Two pointers from ends. Move the shorter wall inward greedily.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single linear scan with two pointers', spaceExplanation: 'Constant extra variables', visualization: 'linear' },
      },
      followUps: [
        'Trapping Rain Water — counts water trapped at every bar, not just one container',
        'What if heights can be equal? (move either pointer — doesn\'t matter)',
      ],
      edgeCases: ['Two elements — only one possible container', 'All same height — area decreases as width decreases'],
      commonMistakes: [
        'Moving the taller pointer (never productive)',
        'Using height[l] + height[r] instead of min',
        'Off-by-one: width is (r - l), not (r - l + 1)',
      ],
      interviewerTips: [
        'Explain WHY moving the shorter pointer is correct (proof by contradiction)',
        'Contrast with Trapping Rain Water to show similar setup, different logic',
      ],
    },
    codeChallenge: {
      functionName: 'maxArea',
      starterCode: {
        javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, description: 'Standard case' },
        { input: [[1, 1]], expected: 1, description: 'Two elements' },
        { input: [[4, 3, 2, 1, 4]], expected: 16, description: 'Same height walls at ends' },
        { input: [[1, 2, 1]], expected: 2, description: 'Symmetric, middle taller' },
        { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17, description: 'Tall walls near center' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['two-sum'],
    relatedPatterns: ['Two Pointers', 'Greedy'],
    intuitionSummary: 'Moving the shorter wall is the only action that could ever increase area. Moving the taller wall guarantees a smaller or equal area.',
    patternName: 'Two Pointers Greedy',
  },

  // ─── 3. Valid Palindrome ─────────────────────────────────────────────────────
  {
    id: 'valid-palindrome',
    slug: 'valid-palindrome',
    leetcodeNumber: 125,
    title: 'Valid Palindrome',
    category: 'two-pointers',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['string', 'two-pointers'],
    questionSets: ['blind75', 'top150'],
    companies: ['Facebook', 'Microsoft', 'Amazon', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Ignore spaces and punctuation — does the phrase read the same forwards and backwards?',
      engineer: 'Two pointers from both ends. Skip non-alphanumeric characters, compare lowercase versions. Move inward until they cross.',
      interview: 'O(n) time, O(1) space two-pointer. Use character code checks to avoid regex overhead. Classic string + two-pointer warm-up.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'left pointer start: index 0' },
        { id: 'b', value: 20, label: 'right pointer start: index 20' },
        { id: 'c', value: 1, label: 'left pointer at index 1' },
        { id: 'd', value: 19, label: 'right pointer at index 19' },
      ],
      target: 20,
      instruction: '"A man, a plan, a canal: Panama" has 21 alphanumeric chars. Select the INITIAL left and right pointer indices for palindrome check.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Only letters and digits matter. Skip everything else by advancing the pointer.', xpCost: 0 },
      { id: 2, text: 'Place left=0 and right=s.length-1. Advance left while non-alphanumeric; retreat right while non-alphanumeric.', xpCost: 0 },
      { id: 3, text: 'Compare s[left].toLowerCase() === s[right].toLowerCase(). If mismatch, return false. If match, move both inward.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: "A man, a plan, a canal: Panama". left=0, right=29.',
        state: { s: 'A man, a plan, a canal: Panama', left: 0, right: 29 },
        highlight: [0, 29],
        annotation: 'left=0 (A), right=29 (a)',
      },
      {
        id: 2,
        description: 'left=0 "A", right=29 "a". Both alphanumeric. toLower: "a"==="a" ✓. Move both inward.',
        state: { s: 'A man, a plan, a canal: Panama', left: 1, right: 28 },
        highlight: [0, 29],
        annotation: '"a"==="a" ✓',
      },
      {
        id: 3,
        description: 'left=1 " " → skip. left=2 "m". right=28 "m". "m"==="m" ✓. Move inward.',
        state: { s: 'A man, a plan, a canal: Panama', left: 3, right: 27 },
        highlight: [2, 28],
        annotation: '"m"==="m" ✓',
      },
      {
        id: 4,
        description: 'left=3 "a", right=27 "a". Match ✓. Continue converging — all characters match.',
        state: { s: 'A man, a plan, a canal: Panama', left: 4, right: 26 },
        highlight: [3, 27],
        annotation: '"a"==="a" ✓',
      },
      {
        id: 5,
        description: 'Pointers eventually cross. All comparisons passed → return true.',
        state: { s: 'A man, a plan, a canal: Panama', left: 15, right: 14, result: true },
        highlight: [],
        annotation: 'left >= right → true',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each character is visited at most once by one of the two pointers.',
      spaceExplanation: 'No extra arrays or strings allocated.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isPalindrome(s) {
  function isAlphanumeric(c) {
    return (c >= 'a' && c <= 'z') ||
           (c >= 'A' && c <= 'Z') ||
           (c >= '0' && c <= '9');
  }

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }

  return true;
}`,
      },
      {
        language: 'python',
        code: `def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1

    return True`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Filter string to alphanumeric, lowercase, then compare with its reverse.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Linear filter pass', spaceExplanation: 'Filtered string stored in memory', visualization: 'linear' },
      },
      optimized: {
        description: 'Two pointers in-place. Skip non-alphanumeric without building a new string.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Only pointer variables', visualization: 'linear' },
      },
      followUps: [
        'Valid Palindrome II — allowed to delete one character',
        'Palindrome Linked List — Floyd\'s for middle + reverse second half',
        'Palindromic Substrings — expand around center',
      ],
      edgeCases: ['Empty string → true', 'All non-alphanumeric → true', 'Single character → true', '"race a car" → false'],
      commonMistakes: [
        'Forgetting to guard the inner while loops with left < right',
        'Comparing before skipping non-alphanumeric on both sides',
        'Using regex — valid but slower and allocates a new string',
      ],
      interviewerTips: [
        'Mention O(1) space variant vs O(n) filter variant — shows awareness',
        'The inner while guards prevent left/right from crossing while skipping',
      ],
    },
    codeChallenge: {
      functionName: 'isPalindrome',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Your solution here

}`,
      },
      testCases: [
        { input: ['A man, a plan, a canal: Panama'], expected: true, description: 'Classic palindrome phrase' },
        { input: ['race a car'], expected: false, description: 'Not a palindrome' },
        { input: [' '], expected: true, description: 'Single space — no alphanumeric chars' },
        { input: ['0P'], expected: false, description: 'Digit vs letter' },
        { input: ['Was it a car or a cat I saw?'], expected: true, description: 'Punctuation and spaces' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Two Pointers', 'String Filtering'],
    intuitionSummary: 'Skip noise (non-alphanumeric) and compare from both ends. Two pointers do this in O(1) space without building a cleaned string.',
    patternName: 'Two Pointers Converging',
  },

  // ─── 4. Is Subsequence ───────────────────────────────────────────────────────
  {
    id: 'is-subsequence',
    slug: 'is-subsequence',
    leetcodeNumber: 392,
    title: 'Is Subsequence',
    category: 'two-pointers',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['string', 'two-pointers', 'dynamic-programming'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Facebook', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Can you find all letters of the word "ace" hiding in order inside "abcde"? Letters don\'t need to be adjacent!',
      engineer: 'Use a pointer i for s. Scan t with j. When s[i] === t[j], advance i. Return i === s.length at the end.',
      interview: 'Greedy two-pointer. O(n) where n = len(t). Follow-up: batch queries use binary search on precomputed character positions.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: "'a' matched at index 0" },
        { id: 'b', value: 2, label: "'b' matched at index 2" },
        { id: 'c', value: 5, label: "'c' matched at index 5" },
        { id: 'd', value: 3, label: "'b' in index 3? No" },
      ],
      target: 2,
      instruction: '"abc" in "ahbgdc": select the indices in t where the FIRST TWO chars of s are matched.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'You need to match every character of s in order within t. You don\'t need them adjacent.', xpCost: 0 },
      { id: 2, text: 'Use pointer i for s and pointer j for t. Advance j every step. Advance i only when s[i]===t[j].', xpCost: 0 },
      { id: 3, text: 'If i reaches s.length, all characters of s were matched. Return i === s.length.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's="ace", t="abcde". i=0, j=0.',
        state: { s: 'ace', t: 'abcde', i: 0, j: 0 },
        highlight: [],
        annotation: 'i=0, j=0',
      },
      {
        id: 2,
        description: 's[0]="a" === t[0]="a" ✓. Advance i=1, j=1.',
        state: { s: 'ace', t: 'abcde', i: 1, j: 1 },
        highlight: [0],
        annotation: 'match "a" at t[0]',
      },
      {
        id: 3,
        description: 's[1]="c" !== t[1]="b". Advance j=2 only.',
        state: { s: 'ace', t: 'abcde', i: 1, j: 2 },
        highlight: [1],
        annotation: 'no match, j++',
      },
      {
        id: 4,
        description: 's[1]="c" === t[2]="c" ✓. Advance i=2, j=3.',
        state: { s: 'ace', t: 'abcde', i: 2, j: 3 },
        highlight: [2],
        annotation: 'match "c" at t[2]',
      },
      {
        id: 5,
        description: 's[2]="e" !== t[3]="d". j=4. s[2]="e" === t[4]="e" ✓. i=3. i===s.length → return true.',
        state: { s: 'ace', t: 'abcde', i: 3, j: 5, result: true },
        highlight: [4],
        annotation: 'match "e" at t[4] → i===3===s.length → true',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through t (length n). Each character of t is visited once.',
      spaceExplanation: 'Only two integer pointers.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function isSubsequence(s, t) {
  let i = 0;

  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }

  return i === s.length;
}`,
      },
      {
        language: 'python',
        code: `def isSubsequence(s: str, t: str) -> bool:
    i = 0
    for char in t:
        if i < len(s) and char == s[i]:
            i += 1
    return i == len(s)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same as optimal for single query — two-pointer is already the simplest approach.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Two pointers', visualization: 'linear' },
      },
      optimized: {
        description: 'For many queries on same t: precompute next[i][c] = next position of char c at or after index i. Each query becomes O(m log n).',
        complexity: { time: 'O(n + m log n)', space: 'O(n)', timeExplanation: 'Preprocessing O(n), each query O(m log n) via binary search', spaceExplanation: 'Character position lists', visualization: 'logarithmic' },
      },
      followUps: [
        'Follow-up: Given 10^9 queries for the same t, how do you optimize? (Precompute next-char positions)',
        'Number of Matching Subsequences (LC 792)',
        'Distinct Subsequences (LC 115) — DP variant',
      ],
      edgeCases: ['s is empty → always true', 't is empty and s is non-empty → false', 's === t → true', 's longer than t → false'],
      commonMistakes: [
        'Advancing i when there\'s no match',
        'Checking s.length === t.length instead of i === s.length',
        'Not handling empty s',
      ],
      interviewerTips: [
        'Always mention the follow-up batch query optimization — it\'s specifically called out in the problem',
        'This is a great warm-up showing clean two-pointer thinking',
      ],
    },
    codeChallenge: {
      functionName: 'isSubsequence',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(s, t) {
  // Your solution here

}`,
      },
      testCases: [
        { input: ['ace', 'abcde'], expected: true, description: '"ace" is subsequence of "abcde"' },
        { input: ['aec', 'abcde'], expected: false, description: '"aec" is not a subsequence — wrong order' },
        { input: ['', 'ahbgdc'], expected: true, description: 'Empty s is always a subsequence' },
        { input: ['b', 'abc'], expected: true, description: 'Single char match' },
        { input: ['axc', 'ahbgdc'], expected: false, description: '"axc" not in "ahbgdc"' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Two Pointers', 'Greedy Matching'],
    intuitionSummary: 'Greedily match each character of s as early as possible in t. If all of s is consumed, it\'s a subsequence.',
    patternName: 'Greedy Two Pointer',
  },

  // ─── 5. Minimum Size Subarray Sum ────────────────────────────────────────────
  {
    id: 'minimum-size-subarray-sum',
    slug: 'minimum-size-subarray-sum',
    leetcodeNumber: 209,
    title: 'Minimum Size Subarray Sum',
    category: 'sliding-window',
    difficulty: 'medium',
    engineType: 'window',
    tags: ['array', 'sliding-window', 'two-pointers', 'prefix-sum'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Adobe'],
    descriptions: {
      explorer: 'Find the shortest contiguous chunk of numbers that adds up to at least the target!',
      engineer: 'Expand right pointer, add to windowSum. While windowSum >= target, record length and shrink from left.',
      interview: 'Variable-size sliding window. O(n) amortized — each element enters and leaves the window at most once.',
    },
    puzzleConfig: {
      sequence: [2, 3, 1, 2, 4, 3],
      windowConstraint: { type: 'no-repeat' },
      instruction: 'nums=[2,3,1,2,4,3], target=7. Find the minimum length subarray with sum ≥ 7. Answer: [4,3] at indices 4–5.',
      mode: 'min-sum',
      correctAnswer: { start: 4, end: 5, length: 2 },
    },
    hints: [
      { id: 1, text: 'Use two pointers: right expands the window, left shrinks it. Only shrink when the sum is large enough.', xpCost: 0 },
      { id: 2, text: 'When sum >= target, you have a valid window. Record its length. Then subtract nums[left] and advance left to try to find a smaller valid window.', xpCost: 0 },
      { id: 3, text: 'Initialize minLen = Infinity. At the end, return minLen === Infinity ? 0 : minLen.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[2,3,1,2,4,3], target=7. left=0, sum=0, minLen=∞.',
        state: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 0, right: -1, sum: 0, minLen: Infinity },
        highlight: [],
        annotation: 'initial state',
      },
      {
        id: 2,
        description: 'Expand: right=0,1,2,3 → sum=2+3+1+2=8 >= 7. minLen=4. Shrink: left=0→sum=6 < 7, stop.',
        state: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 1, right: 3, sum: 6, minLen: 4 },
        highlight: [0, 1, 2, 3],
        annotation: 'window [0..3]=8>=7 → minLen=4, shrink',
      },
      {
        id: 3,
        description: 'right=4 → sum=6+4=10 >= 7. minLen=min(4,4)=4. Shrink: left=1,sum=7>=7,minLen=3. left=2,sum=4<7,stop.',
        state: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 2, right: 4, sum: 4, minLen: 3 },
        highlight: [1, 2, 3, 4],
        annotation: 'shrink to [1..4] len=4 → [2..4] len=3',
      },
      {
        id: 4,
        description: 'right=5 → sum=4+3=7 >= 7. len=4. Shrink: left=2,sum=7>=7,minLen=min(3,4)=3. left=3,sum=6<7,stop.',
        state: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 3, right: 5, sum: 6, minLen: 3 },
        highlight: [2, 3, 4, 5],
        annotation: 'minLen stays 3',
      },
      {
        id: 5,
        description: 'right reaches end. Return minLen=2. (Actually [4,3] → sum=7 len=2. Let me retrace: shrink left=3→sum=3+3=6? No — 2+4+3=9, shrink: 4+3=7 → len=2)',
        state: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 4, right: 5, sum: 7, minLen: 2 },
        highlight: [4, 5],
        annotation: 'window [4..5]=7>=7 → minLen=2',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each element is added by right and removed by left at most once — O(2n) = O(n).',
      spaceExplanation: 'Constant extra variables: left, sum, minLen.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
      },
      {
        language: 'python',
        code: `def minSubArrayLen(target: int, nums: list[int]) -> int:
    left = 0
    total = 0
    min_len = float('inf')

    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            min_len = min(min_len, right - left + 1)
            total -= nums[left]
            left += 1

    return 0 if min_len == float('inf') else min_len`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all subarrays, compute their sums, track minimum length with sum >= target.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'Nested loops over all start/end pairs', spaceExplanation: 'No extra space', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sliding window: expand right, shrink left whenever sum meets target.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Each element enters/leaves window once', spaceExplanation: 'Three variables', visualization: 'linear' },
      },
      followUps: [
        'O(n log n) with prefix sums + binary search',
        'Minimum Window Substring — sliding window on characters',
        'Subarray Product Less Than K',
      ],
      edgeCases: ['No subarray meets target → return 0', 'Single element >= target → return 1', 'All elements needed'],
      commonMistakes: [
        'Forgetting to return 0 when no valid subarray found',
        'Moving left without removing from sum',
        'Using a fixed window instead of variable',
      ],
      interviewerTips: [
        'Explain why each element is processed at most twice (added by right, removed by left)',
        'The inner while vs if distinction matters — while allows maximum shrinking per step',
      ],
    },
    codeChallenge: {
      functionName: 'minSubArrayLen',
      starterCode: {
        javascript: `/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(target, nums) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [7, [2, 3, 1, 2, 4, 3]], expected: 2, description: 'Minimum subarray [4,3]' },
        { input: [4, [1, 4, 4]], expected: 1, description: 'Single element satisfies target' },
        { input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0, description: 'No subarray meets target' },
        { input: [15, [1, 2, 3, 4, 5]], expected: 5, description: 'Entire array needed' },
        { input: [7, [1, 2, 3, 4, 5]], expected: 2, description: 'Min subarray [3,4]=7 or [4,5]=9, both length 2' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['longest-substring-without-repeating'],
    relatedPatterns: ['Sliding Window', 'Two Pointers'],
    intuitionSummary: 'Grow the window until valid, then shrink from left to minimize. Each element moves in and out at most once.',
    patternName: 'Variable Sliding Window',
  },

  // ─── 6. Best Time to Buy and Sell Stock II ───────────────────────────────────
  {
    id: 'best-time-to-buy-and-sell-stock-ii',
    slug: 'best-time-to-buy-and-sell-stock-ii',
    leetcodeNumber: 122,
    title: 'Best Time to Buy and Sell Stock II',
    category: 'greedy',
    difficulty: 'medium',
    engineType: 'two-pointer',
    tags: ['array', 'greedy', 'dynamic-programming'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Apple', 'Bloomberg', 'Adobe'],
    descriptions: {
      explorer: 'You can buy and sell stocks as many times as you want. Collect every upward price movement for maximum profit!',
      engineer: 'Sum all positive daily differences: for each i, if prices[i+1] > prices[i], add prices[i+1] - prices[i] to profit.',
      interview: 'Greedy valley-to-peak equivalent. Every upswing contributes independently. Proof: sum of partial gains = total gain over any rising stretch.',
    },
    puzzleConfig: {
      array: [7, 1, 5, 3, 6, 4],
      instruction: 'Stock prices [7,1,5,3,6,4] — unlimited trades. Select the BEST single buy day and sell day.',
      mode: 'buy-sell',
      correctBuyIndex: 1,
      correctSellIndex: 4,
    },
    hints: [
      { id: 1, text: 'You can transact infinitely. Any upward move is profit you can capture.', xpCost: 0 },
      { id: 2, text: 'Compare each consecutive pair. If tomorrow is higher than today, that difference is free profit.', xpCost: 0 },
      { id: 3, text: 'Sum all max(0, prices[i+1] - prices[i]). This greedy is equivalent to finding all valley-to-peak segments.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'prices=[7,1,5,3,6,4]. profit=0.',
        state: { prices: [7, 1, 5, 3, 6, 4], profit: 0, i: 0 },
        highlight: [],
        annotation: 'profit=0',
      },
      {
        id: 2,
        description: 'i=0: 1-7=-6 < 0 → skip. i=1: 5-1=4 > 0 → profit=4.',
        state: { prices: [7, 1, 5, 3, 6, 4], profit: 4, i: 1 },
        highlight: [1, 2],
        annotation: 'profit += 4 → profit=4',
      },
      {
        id: 3,
        description: 'i=2: 3-5=-2 < 0 → skip.',
        state: { prices: [7, 1, 5, 3, 6, 4], profit: 4, i: 2 },
        highlight: [2, 3],
        annotation: 'skip negative diff',
      },
      {
        id: 4,
        description: 'i=3: 6-3=3 > 0 → profit=7.',
        state: { prices: [7, 1, 5, 3, 6, 4], profit: 7, i: 3 },
        highlight: [3, 4],
        annotation: 'profit += 3 → profit=7',
      },
      {
        id: 5,
        description: 'i=4: 4-6=-2 < 0 → skip. Return profit=7.',
        state: { prices: [7, 1, 5, 3, 6, 4], profit: 7, i: 4, done: true },
        highlight: [4, 5],
        annotation: 'done, profit=7',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through prices array.',
      spaceExplanation: 'One profit variable.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function maxProfit(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}`,
      },
      {
        language: 'python',
        code: `def maxProfit(prices: list[int]) -> int:
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try all buy/sell pairs with DP tracking state (holding or not holding).',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'All pair combinations', spaceExplanation: 'Constant', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Greedy: sum all positive consecutive differences.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single linear pass', spaceExplanation: 'One variable', visualization: 'linear' },
      },
      followUps: [
        'Stock I — single transaction only',
        'Stock III — at most 2 transactions (DP)',
        'Stock with Cooldown — DP with state machine',
        'Stock with Transaction Fee',
      ],
      edgeCases: ['All decreasing → return 0', 'Two elements, second > first', 'All same prices → 0'],
      commonMistakes: [
        'Thinking you need to track buy/sell pairs explicitly',
        'Using prices[i] - prices[i-1] without the positive guard',
      ],
      interviewerTips: [
        'Prove correctness: sum of partial gains = total valley-to-peak gain',
        'Contrast with Stock I to show how the constraint changes the approach',
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
        { input: [[7, 1, 5, 3, 6, 4]], expected: 7, description: 'Buy at 1, sell at 5; buy at 3, sell at 6' },
        { input: [[1, 2, 3, 4, 5]], expected: 4, description: 'Monotonically increasing' },
        { input: [[7, 6, 4, 3, 1]], expected: 0, description: 'All decreasing — no profit' },
        { input: [[1, 2]], expected: 1, description: 'Two days, one transaction' },
        { input: [[3, 3, 3, 3]], expected: 0, description: 'Flat prices — no profit' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['best-time-to-buy-and-sell-stock'],
    relatedPatterns: ['Greedy', 'Dynamic Programming'],
    intuitionSummary: 'Every upward day is independently profitable. Collecting all upswings is equivalent to the optimal trade sequence.',
    patternName: 'Greedy Profit Accumulation',
  },

  // ─── 7. Jump Game II ─────────────────────────────────────────────────────────
  {
    id: 'jump-game-ii',
    slug: 'jump-game-ii',
    leetcodeNumber: 45,
    title: 'Jump Game II',
    category: 'greedy',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'greedy', 'dynamic-programming', 'bfs'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Uber'],
    descriptions: {
      explorer: 'Each position tells you the maximum distance you can jump. Reach the last index using the fewest jumps!',
      engineer: 'BFS levels via greedy: track currentEnd (current level boundary) and farthest reachable. When i reaches currentEnd, increment jumps.',
      interview: 'Implicit BFS on jump levels. O(n) greedy — farthest tracks the next level, jumps increments when i exhausts current level.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 0, label: 'start: pos 0, jump=2' },
        { id: 'b', value: 1, label: 'pos 1, jump=3 (reaches end)' },
        { id: 'c', value: 2, label: 'pos 2, jump=1' },
        { id: 'd', value: 4, label: 'end: pos 4' },
      ],
      target: 1,
      instruction: '[2,3,1,1,4]: minimum jumps=2. Select the two positions visited: start(0) and first jump landing(1).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of it as BFS levels. From position 0 you can reach some range [1..nums[0]]. That is level 1.', xpCost: 0 },
      { id: 2, text: 'Track farthest = max reachable from current level. When your scan reaches currentEnd, one jump is complete. Set currentEnd = farthest.', xpCost: 0 },
      { id: 3, text: 'Increment jumps when i === currentEnd (and i < n-1). Update farthest = max(farthest, i + nums[i]) every step.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[2,3,1,1,4]. jumps=0, currentEnd=0, farthest=0.',
        state: { nums: [2, 3, 1, 1, 4], jumps: 0, currentEnd: 0, farthest: 0, i: 0 },
        highlight: [],
        annotation: 'initial',
      },
      {
        id: 2,
        description: 'i=0: farthest=max(0,0+2)=2. i===currentEnd(0) and i<4 → jumps=1, currentEnd=2.',
        state: { nums: [2, 3, 1, 1, 4], jumps: 1, currentEnd: 2, farthest: 2, i: 0 },
        highlight: [0],
        annotation: 'jump 1, reach up to index 2',
      },
      {
        id: 3,
        description: 'i=1: farthest=max(2,1+3)=4. i(1) < currentEnd(2), no new jump yet.',
        state: { nums: [2, 3, 1, 1, 4], jumps: 1, currentEnd: 2, farthest: 4, i: 1 },
        highlight: [1],
        annotation: 'farthest=4',
      },
      {
        id: 4,
        description: 'i=2: farthest=max(4,2+1)=4. i===currentEnd(2) → jumps=2, currentEnd=4.',
        state: { nums: [2, 3, 1, 1, 4], jumps: 2, currentEnd: 4, farthest: 4, i: 2 },
        highlight: [2],
        annotation: 'jump 2, reach up to index 4 (last)',
      },
      {
        id: 5,
        description: 'currentEnd(4) === n-1(4). Done. Return jumps=2.',
        state: { nums: [2, 3, 1, 1, 4], jumps: 2, currentEnd: 4, farthest: 4, result: 2 },
        highlight: [4],
        annotation: 'reached end in 2 jumps',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through array. Each index processed once.',
      spaceExplanation: 'Three variables: jumps, currentEnd, farthest.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}`,
      },
      {
        language: 'python',
        code: `def jump(nums: list[int]) -> int:
    jumps = 0
    current_end = 0
    farthest = 0

    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest

    return jumps`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DP: dp[i] = min jumps to reach index i. O(n²).',
        complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'For each i, scan all j < i that can reach i', spaceExplanation: 'DP array', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Greedy BFS levels: track current level end and farthest reach. O(n).',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Constant variables', visualization: 'linear' },
      },
      followUps: [
        'Jump Game I — just check reachability, not minimum jumps',
        'Jump Game III — can jump ±nums[i]',
        'Jump Game VII — range jumping with obstacles',
      ],
      edgeCases: ['Single element → 0 jumps', 'Already at end', 'All 1s — n-1 jumps needed'],
      commonMistakes: [
        'Looping to nums.length instead of nums.length - 1 (causes extra jump)',
        'Incrementing jumps before updating farthest',
        'Confusing currentEnd with farthest',
      ],
      interviewerTips: [
        'Draw the BFS levels analogy — it makes the intuition obvious',
        'Note the loop goes to n-2: once you\'re within range of end, no more jump counting needed',
      ],
    },
    codeChallenge: {
      functionName: 'jump',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function jump(nums) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[2, 3, 1, 1, 4]], expected: 2, description: 'Jump to index 1, then to end' },
        { input: [[2, 3, 0, 1, 4]], expected: 2, description: 'Skip index 2 (0 jump)' },
        { input: [[1, 1, 1, 1]], expected: 3, description: 'All 1s — must take every step' },
        { input: [[0]], expected: 0, description: 'Single element' },
        { input: [[5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0]], expected: 3, description: 'Larger jump from start' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['jump-game'],
    relatedPatterns: ['Greedy', 'BFS Levels'],
    intuitionSummary: 'Each "jump" covers a level of reachable positions. Greedily extend as far as possible each level.',
    patternName: 'Greedy BFS Levels',
  },

  // ─── 8. Jump Game ─────────────────────────────────────────────────────────
  {
    id: 'jump-game',
    slug: 'jump-game',
    leetcodeNumber: 55,
    title: 'Jump Game',
    category: 'greedy',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'greedy', 'dynamic-programming'],
    questionSets: ['blind75', 'top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Bloomberg'],
    descriptions: {
      explorer: 'Each cell tells you how far you can jump from it. Can you reach the last cell?',
      engineer: 'Track maxReach = max index reachable. If i ever exceeds maxReach, you\'re stuck. If maxReach >= n-1, return true.',
      interview: 'Greedy reachability scan. O(n) time, O(1) space. Key: if a zero creates an unreachable gap, maxReach will stall.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'max reach from index 0: 0+2=2' },
        { id: 'b', value: 4, label: 'max reach from index 1: 1+3=4 (≥ end index 4)' },
        { id: 'c', value: 3, label: 'max reach from index 2: 2+1=3' },
        { id: 'd', value: 0, label: 'start index' },
      ],
      target: 6,
      instruction: '[2,3,1,1,4]: select the max-reach values from indices 0 and 1 that prove you can reach the end.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'You don\'t need to find the path, just whether the end is reachable. Track the farthest index you can reach.', xpCost: 0 },
      { id: 2, text: 'maxReach = max(maxReach, i + nums[i]) at each index. If i > maxReach, you\'re stuck.', xpCost: 0 },
      { id: 3, text: 'Early exit: if maxReach >= n-1 at any point, return true immediately.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'nums=[3,2,1,0,4]. maxReach=0.',
        state: { nums: [3, 2, 1, 0, 4], maxReach: 0, i: 0 },
        highlight: [],
        annotation: 'show failing case',
      },
      {
        id: 2,
        description: 'i=0: maxReach=max(0,3)=3. i=1: maxReach=max(3,3)=3. i=2: maxReach=max(3,3)=3. i=3: maxReach=max(3,3+0)=3.',
        state: { nums: [3, 2, 1, 0, 4], maxReach: 3, i: 3 },
        highlight: [0, 1, 2, 3],
        annotation: 'maxReach stalls at 3',
      },
      {
        id: 3,
        description: 'i=4: 4 > maxReach(3) → return false. Can\'t reach index 4.',
        state: { nums: [3, 2, 1, 0, 4], maxReach: 3, i: 4, result: false },
        highlight: [4],
        annotation: 'i > maxReach → false',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the array.',
      spaceExplanation: 'One variable maxReach.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }

  return true;
}`,
      },
      {
        language: 'python',
        code: `def canJump(nums: list[int]) -> bool:
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
    return True`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'DFS/BFS from index 0, explore all reachable positions recursively.',
        complexity: { time: 'O(2^n)', space: 'O(n)', timeExplanation: 'Exponential without memoization', spaceExplanation: 'Recursion stack', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Greedy maxReach scan. If i ever exceeds maxReach, return false.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'One variable', visualization: 'linear' },
      },
      followUps: [
        'Jump Game II — minimum number of jumps',
        'Jump Game III — bidirectional jumps',
        'What is the minimum starting index to reach the end?',
      ],
      edgeCases: ['Single element → always true', 'First element is 0 and length > 1 → false', 'nums = [0] → true'],
      commonMistakes: [
        'Returning false when nums[i] === 0 (there might be other paths)',
        'Not updating maxReach before the i > maxReach check',
      ],
      interviewerTips: [
        'Phrase it as "can I ever get stuck?" rather than "can I reach the end?"',
        'The key insight: a zero only blocks you if you can\'t jump over it from a prior position',
      ],
    },
    codeChallenge: {
      functionName: 'canJump',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[2, 3, 1, 1, 4]], expected: true, description: 'Can reach end' },
        { input: [[3, 2, 1, 0, 4]], expected: false, description: 'Stuck at index 3 (zero)' },
        { input: [[0]], expected: true, description: 'Single element' },
        { input: [[1, 0, 1, 0]], expected: false, description: 'Can only reach index 1' },
        { input: [[2, 0, 0]], expected: true, description: 'Jump over zeros' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['Greedy', 'Reachability'],
    intuitionSummary: 'Maintain the farthest reachable index. If you ever reach an index beyond it, you\'re stuck and cannot proceed.',
    patternName: 'Greedy Max Reach',
  },

  // ─── 9. Gas Station ──────────────────────────────────────────────────────────
  {
    id: 'gas-station',
    slug: 'gas-station',
    leetcodeNumber: 134,
    title: 'Gas Station',
    category: 'greedy',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'greedy'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Facebook'],
    descriptions: {
      explorer: 'You\'re driving around a circular route of gas stations. Find the one starting point where you can complete the full circuit!',
      engineer: 'If totalGas >= totalCost, a solution exists. The starting station is the one after the last point where running tank dropped below 0.',
      interview: 'Two key insights: (1) if sum(gas-cost) >= 0 exactly one solution exists, (2) start after the last negative-tank position.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'net at station 3: 4-1=+3' },
        { id: 'b', value: 3, label: 'net at station 4: 5-2=+3' },
        { id: 'c', value: -2, label: 'net at station 0: 1-3=-2' },
        { id: 'd', value: 6, label: 'total gas surplus' },
      ],
      target: 6,
      instruction: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]: select the TWO stations with positive net gas (gas-cost>0) — starting from the first gives the circuit.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'If total gas < total cost across all stations, no solution exists. Otherwise exactly one solution exists.', xpCost: 0 },
      { id: 2, text: 'Simulate forward. Track running tank = gas[i] - cost[i]. If tank drops below 0, reset it to 0 and note the next index as candidate start.', xpCost: 0 },
      { id: 3, text: 'The start index is wherever you last had to reset the tank. This greedy works because the cumulative surplus guarantees completion from that point.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]. total=15-15=0 >= 0 → solution exists.',
        state: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2], tank: 0, start: 0, total: 0 },
        highlight: [],
        annotation: 'total surplus = 0',
      },
      {
        id: 2,
        description: 'i=0: tank=0+1-3=-2 < 0 → reset tank=0, start=1.',
        state: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2], tank: 0, start: 1, i: 0 },
        highlight: [0],
        annotation: 'tank<0, start=1',
      },
      {
        id: 3,
        description: 'i=1: tank=0+2-4=-2 < 0 → reset tank=0, start=2.',
        state: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2], tank: 0, start: 2, i: 1 },
        highlight: [1],
        annotation: 'tank<0, start=2',
      },
      {
        id: 4,
        description: 'i=2: tank=0+3-5=-2 < 0 → reset tank=0, start=3.',
        state: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2], tank: 0, start: 3, i: 2 },
        highlight: [2],
        annotation: 'tank<0, start=3',
      },
      {
        id: 5,
        description: 'i=3: tank=0+4-1=3. i=4: tank=3+5-2=6. No more resets. Total >= 0, return start=3.',
        state: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2], tank: 6, start: 3, result: 3 },
        highlight: [3, 4],
        annotation: 'start=3',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through stations.',
      spaceExplanation: 'Three variables: tank, start, total.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function canCompleteCircuit(gas, cost) {
  let total = 0;
  let tank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;

    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }

  return total >= 0 ? start : -1;
}`,
      },
      {
        language: 'python',
        code: `def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    total = 0
    tank = 0
    start = 0

    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if tank < 0:
            start = i + 1
            tank = 0

    return start if total >= 0 else -1`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try each starting station and simulate the full circuit.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'n starting points × n-step simulation each', spaceExplanation: 'Constant', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Single pass: track total surplus and reset start when tank goes negative.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'One pass', spaceExplanation: 'Three variables', visualization: 'linear' },
      },
      followUps: [
        'What if multiple valid starting points exist? (The problem guarantees at most one)',
        'Circular array — how does greedy handle wrap-around?',
      ],
      edgeCases: [
        'All gas < cost → return -1',
        'Single station with gas >= cost → return 0',
        'gas = cost at every station → return 0',
      ],
      commonMistakes: [
        'Not checking total surplus before returning start',
        'Resetting start to i instead of i+1',
        'Simulating the whole array from each start (O(n²))',
      ],
      interviewerTips: [
        'Explain the two-part proof: existence (total >= 0) and uniqueness (one valid start)',
        'The reset logic is the crux — why does the last reset point give the correct answer?',
      ],
    },
    codeChallenge: {
      functionName: 'canCompleteCircuit',
      starterCode: {
        javascript: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], expected: 3, description: 'Start at index 3' },
        { input: [[2, 3, 4], [3, 4, 3]], expected: -1, description: 'No valid starting point' },
        { input: [[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]], expected: 4, description: 'Start at last station' },
        { input: [[2], [2]], expected: 0, description: 'Single station, gas equals cost' },
        { input: [[1, 2], [2, 1]], expected: 1, description: 'Start at second station' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['Greedy', 'Circular Array'],
    intuitionSummary: 'If total gas >= total cost, a solution exists. The valid start is always right after where running fuel last went negative.',
    patternName: 'Greedy Reset',
  },

  // ─── 10. Candy ───────────────────────────────────────────────────────────────
  {
    id: 'candy',
    slug: 'candy',
    leetcodeNumber: 135,
    title: 'Candy',
    category: 'greedy',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['array', 'greedy'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Uber'],
    descriptions: {
      explorer: 'Give every child at least one candy. Children with higher ratings than their neighbors get more candies. What\'s the minimum total?',
      engineer: 'Two passes: left-to-right ensures higher rating than left neighbor → more candy. Right-to-left ensures higher rating than right neighbor → at least right+1 candies.',
      interview: 'Two-pass greedy. Left pass satisfies left constraint; right pass satisfies right constraint. Take max of both at each position.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'child 0: rating=1, gets 2 candies' },
        { id: 'b', value: 1, label: 'child 1: rating=0, gets 1 candy (minimum)' },
        { id: 'c', value: 2, label: 'child 2: rating=2, gets 2 candies' },
        { id: 'd', value: 5, label: 'total minimum candies' },
      ],
      target: 3,
      instruction: 'ratings=[1,0,2]: select the candy counts for child 0 and child 1. Each child gets ≥1, neighbors with higher rating get more.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Start by giving everyone 1 candy. Then make two passes to enforce the neighbor constraints.', xpCost: 0 },
      { id: 2, text: 'Left-to-right: if ratings[i] > ratings[i-1], set candies[i] = candies[i-1] + 1.', xpCost: 0 },
      { id: 3, text: 'Right-to-left: if ratings[i] > ratings[i+1], set candies[i] = max(candies[i], candies[i+1] + 1). Sum all candies.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'ratings=[1,0,2]. Initialize candies=[1,1,1].',
        state: { ratings: [1, 0, 2], candies: [1, 1, 1] },
        highlight: [],
        annotation: 'start: all 1s',
      },
      {
        id: 2,
        description: 'Left pass: i=1: ratings[1]=0 < ratings[0]=1 → no change. i=2: ratings[2]=2 > ratings[1]=0 → candies[2]=candies[1]+1=2.',
        state: { ratings: [1, 0, 2], candies: [1, 1, 2] },
        highlight: [2],
        annotation: 'after left pass: [1,1,2]',
      },
      {
        id: 3,
        description: 'Right pass: i=1 from right: ratings[1]=0 < ratings[2]=2 → no change. i=0: ratings[0]=1 > ratings[1]=0 → candies[0]=max(1, candies[1]+1)=max(1,2)=2.',
        state: { ratings: [1, 0, 2], candies: [2, 1, 2] },
        highlight: [0],
        annotation: 'after right pass: [2,1,2]',
      },
      {
        id: 4,
        description: 'Sum = 2+1+2 = 5.',
        state: { ratings: [1, 0, 2], candies: [2, 1, 2], total: 5 },
        highlight: [],
        annotation: 'total = 5',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Two linear passes over the array.',
      spaceExplanation: 'Extra array of size n for candy counts.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // Left pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right pass
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((a, b) => a + b, 0);
}`,
      },
      {
        language: 'python',
        code: `def candy(ratings: list[int]) -> int:
    n = len(ratings)
    candies = [1] * n

    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)

    return sum(candies)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Repeatedly scan and update until no changes — iterate until stable.',
        complexity: { time: 'O(n²)', space: 'O(n)', timeExplanation: 'Multiple passes until convergence', spaceExplanation: 'Candy array', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Two-pass greedy: left pass satisfies left neighbor constraint, right pass satisfies right.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Two linear passes', spaceExplanation: 'n-element candy array', visualization: 'linear' },
      },
      followUps: [
        'Can you solve it in O(1) space? (Yes, with slope counting on ascending/descending runs)',
        'What if children are arranged in a circle?',
      ],
      edgeCases: ['All same ratings → n candies total', 'Strictly increasing → 1,2,3,...,n', 'Strictly decreasing → n,n-1,...,1', 'Single child → 1'],
      commonMistakes: [
        'Only doing one pass (misses the right-neighbor constraint)',
        'Forgetting the max() in the right pass — can undo valid left-pass values',
        'Not initializing all to 1',
      ],
      interviewerTips: [
        'Explain why two independent passes work: each enforces one direction of the constraint',
        'The max() in the right pass reconciles both constraints at peaks',
      ],
    },
    codeChallenge: {
      functionName: 'candy',
      starterCode: {
        javascript: `/**
 * @param {number[]} ratings
 * @return {number}
 */
function candy(ratings) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[1, 0, 2]], expected: 5, description: 'Valley in middle: [2,1,2]' },
        { input: [[1, 2, 2]], expected: 4, description: 'Equal ratings at end: [1,2,1]' },
        { input: [[1, 2, 3, 4, 5]], expected: 15, description: 'Strictly increasing: [1,2,3,4,5]' },
        { input: [[5, 4, 3, 2, 1]], expected: 15, description: 'Strictly decreasing: [5,4,3,2,1]' },
        { input: [[1, 3, 2, 2, 1]], expected: 7, description: 'Mixed ratings' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 30, code: 50, coding: 200 },
    prerequisites: [],
    relatedPatterns: ['Greedy Two-Pass', 'Array'],
    intuitionSummary: 'Split the problem: enforce left-neighbor constraint going right, enforce right-neighbor constraint going left. Combine with max.',
    patternName: 'Two-Pass Greedy',
  },

  // ─── 11. Trapping Rain Water ─────────────────────────────────────────────────
  {
    id: 'trapping-rain-water',
    slug: 'trapping-rain-water',
    leetcodeNumber: 42,
    title: 'Trapping Rain Water',
    category: 'two-pointers',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['array', 'two-pointers', 'stack', 'dynamic-programming'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptions: {
      explorer: 'Bars of different heights form walls. How much rainwater can be trapped between them?',
      engineer: 'Two pointers. For each position, water = min(maxLeft, maxRight) - height. Process whichever side has the smaller max first.',
      interview: 'Two-pointer O(n)/O(1). Key: the water at any position is bounded by the shorter of the two tallest walls on each side.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'left max at index 5: 2' },
        { id: 'b', value: 3, label: 'right max at index 5: 3' },
        { id: 'c', value: 1, label: 'height at index 5: 0... use 1 for min' },
        { id: 'd', value: 6, label: 'total water trapped' },
      ],
      target: 5,
      instruction: 'height=[0,1,0,2,1,0,1,3,2,1,2,1]: at the deepest trapped point (index 5), select the left-max and right-max boundary heights.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Water at position i = min(maxLeft, maxRight) - height[i]. You only need the minimums.', xpCost: 0 },
      { id: 2, text: 'Two pointers from ends. If maxLeft <= maxRight, process left: water += maxLeft - height[left], else process right.', xpCost: 0 },
      { id: 3, text: 'The key: when maxLeft < maxRight, you know the water at left is exactly maxLeft - height[left] because the right wall is guaranteed taller.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'height=[0,1,0,2,1,0,1,3,2,1,2,1]. left=0, right=11, maxL=0, maxR=0, water=0.',
        state: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], left: 0, right: 11, maxL: 0, maxR: 0, water: 0 },
        highlight: [0, 11],
        annotation: 'initial',
      },
      {
        id: 2,
        description: 'maxL(0) <= maxR(0): process left. height[0]=0 <= maxL(0) → water+=0. maxL stays 0. left=1.',
        state: { left: 1, right: 11, maxL: 0, maxR: 0, water: 0 },
        highlight: [0],
        annotation: 'water+=0',
      },
      {
        id: 3,
        description: 'height[1]=1 > maxL(0) → update maxL=1. No water. left=2.',
        state: { left: 2, right: 11, maxL: 1, maxR: 0, water: 0 },
        highlight: [1],
        annotation: 'maxL=1',
      },
      {
        id: 4,
        description: 'maxL(1) > maxR(0): process right. height[11]=1 > maxR(0) → maxR=1. right=10.',
        state: { left: 2, right: 10, maxL: 1, maxR: 1, water: 0 },
        highlight: [11],
        annotation: 'maxR=1',
      },
      {
        id: 5,
        description: 'Continue: height[2]=0 <= maxL(1) → water+=1-0=1. height[10]=2 → maxR=2. height[3]=2 → maxL=2. Eventually water accumulates to 6.',
        state: { left: 6, right: 9, maxL: 2, maxR: 3, water: 4 },
        highlight: [2, 5],
        annotation: 'water accumulating...',
      },
      {
        id: 6,
        description: 'Pointers meet. Total water = 6.',
        state: { left: 7, right: 7, maxL: 3, maxR: 3, water: 6, result: 6 },
        highlight: [],
        annotation: 'total water = 6',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Each element visited once by one of the two pointers.',
      spaceExplanation: 'Four variables: left, right, maxL, maxR.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let water = 0;

  while (left < right) {
    if (maxLeft <= maxRight) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left];
      } else {
        water += maxLeft - height[left];
      }
      left++;
    } else {
      if (height[right] >= maxRight) {
        maxRight = height[right];
      } else {
        water += maxRight - height[right];
      }
      right--;
    }
  }

  return water;
}`,
      },
      {
        language: 'python',
        code: `def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_left = max_right = 0
    water = 0

    while left < right:
        if max_left <= max_right:
            if height[left] >= max_left:
                max_left = height[left]
            else:
                water += max_left - height[left]
            left += 1
        else:
            if height[right] >= max_right:
                max_right = height[right]
            else:
                water += max_right - height[right]
            right -= 1

    return water`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each bar, scan left for max and scan right for max. Water = min(maxL, maxR) - height[i].',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'For each element, two linear scans', spaceExplanation: 'No extra storage', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Two-pointer: process the side with the smaller max, guaranteeing the other side is tall enough.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'Single pass', spaceExplanation: 'Four variables', visualization: 'linear' },
      },
      followUps: [
        'Container with Most Water — similar setup, different computation',
        'Can you solve with a stack? (Yes, process bars as you see them)',
        '3D version: Trapping Rain Water II (LC 407)',
      ],
      edgeCases: ['All same height → 0', 'Monotonically increasing or decreasing → 0', 'Two bars only → 0', 'Single peak in middle'],
      commonMistakes: [
        'Processing the wrong side (must process the smaller-max side)',
        'Using height instead of max in the water calculation',
        'Off-by-one when comparing pointers',
      ],
      interviewerTips: [
        'Prove the invariant: when maxLeft <= maxRight, left pointer\'s water is bounded by maxLeft (right side guaranteed to be at least maxRight >= maxLeft)',
        'Precomputed left-max/right-max arrays is the O(n)/O(n) approach — mention it as a stepping stone',
      ],
    },
    codeChallenge: {
      functionName: 'trap',
      starterCode: {
        javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, description: 'Classic example' },
        { input: [[4, 2, 0, 3, 2, 5]], expected: 9, description: 'Large basin' },
        { input: [[1, 0, 1]], expected: 1, description: 'Simple valley' },
        { input: [[3, 0, 2, 0, 4]], expected: 7, description: 'Two valleys' },
        { input: [[1, 2, 3, 4, 5]], expected: 0, description: 'Monotonic increasing — no water' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 30, code: 50, coding: 200 },
    prerequisites: ['container-with-most-water'],
    relatedPatterns: ['Two Pointers', 'Monotonic Stack'],
    intuitionSummary: 'Water at any bar is determined by the shorter surrounding wall. Process the shorter-max side — you know exactly how much it can hold.',
    patternName: 'Two Pointer with Max Tracking',
  },

  // ─── 12. Simplify Path ───────────────────────────────────────────────────────
  {
    id: 'simplify-path',
    slug: 'simplify-path',
    leetcodeNumber: 71,
    title: 'Simplify Path',
    category: 'stack',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['string', 'stack'],
    questionSets: ['top150'],
    companies: ['Facebook', 'Google', 'Amazon', 'Microsoft', 'Uber'],
    descriptions: {
      explorer: 'Clean up a messy Unix file path — remove dots, double-dots, and extra slashes!',
      engineer: 'Split path on "/". For each part: ".." pops the stack, "." and "" are skipped, anything else is pushed. Rejoin with "/".',
      interview: 'Stack-based path normalization. O(n) time and space. The stack represents the current absolute directory hierarchy.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 1, label: 'depth after /a: 1' },
        { id: 'b', value: 2, label: 'depth after /a/b: 2' },
        { id: 'c', value: 1, label: 'depth after /a/b/..: 1' },
        { id: 'd', value: 2, label: 'depth after /a/b/../c: 2' },
      ],
      target: 3,
      instruction: 'Path "/a/b/../c": the stack depth after /a is 1 and final depth after resolving is 2. Select these two depth values.',
      correctAnswer: ['a', 'd'],
    },
    hints: [
      { id: 1, text: 'Split the path by "/" to get individual components. Many will be empty strings or dots.', xpCost: 0 },
      { id: 2, text: '"." means current directory — ignore it. ".." means go up — pop the stack if non-empty.', xpCost: 0 },
      { id: 3, text: 'Build the result as "/" + stack.join("/"). An empty stack means you\'re at root.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'Input: "/home//foo/../bar". Split by "/" → ["", "home", "", "foo", "..", "bar"].',
        state: { input: '/home//foo/../bar', parts: ['', 'home', '', 'foo', '..', 'bar'], stack: [] },
        highlight: [],
        annotation: 'split result',
      },
      {
        id: 2,
        description: '"" → skip. "home" → push. "" → skip. "foo" → push. Stack: ["home","foo"].',
        state: { stack: ['home', 'foo'] },
        highlight: [],
        annotation: 'stack=["home","foo"]',
      },
      {
        id: 3,
        description: '".." → pop "foo". Stack: ["home"].',
        state: { stack: ['home'] },
        highlight: [],
        annotation: 'popped foo',
      },
      {
        id: 4,
        description: '"bar" → push. Stack: ["home","bar"].',
        state: { stack: ['home', 'bar'] },
        highlight: [],
        annotation: 'stack=["home","bar"]',
      },
      {
        id: 5,
        description: 'Join: "/" + "home/bar" = "/home/bar".',
        state: { stack: ['home', 'bar'], result: '/home/bar' },
        highlight: [],
        annotation: 'result="/home/bar"',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Split and iteration each O(n) where n is path length.',
      spaceExplanation: 'Stack stores at most O(n/2) path components.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function simplifyPath(path) {
  const parts = path.split('/');
  const stack = [];

  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}`,
      },
      {
        language: 'python',
        code: `def simplifyPath(path: str) -> str:
    parts = path.split('/')
    stack = []

    for part in parts:
        if not part or part == '.':
            continue
        if part == '..':
            if stack:
                stack.pop()
        else:
            stack.append(part)

    return '/' + '/'.join(stack)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Same approach — there\'s no simpler characterization; the stack is already optimal.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Linear scan', spaceExplanation: 'Stack storage', visualization: 'linear' },
      },
      optimized: {
        description: 'Stack-based: split, filter, push/pop, rejoin.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'One pass after split', spaceExplanation: 'Stack of components', visualization: 'linear' },
      },
      followUps: [
        'Relative path simplification (not starting with /)',
        'What about Windows paths with backslashes?',
        'OS path normalization in real systems',
      ],
      edgeCases: [
        '"/../" → "/" (can\'t go above root)',
        '"/home/./foo" → "/home/foo"',
        '"/..." → "/..." (three dots is a valid directory name)',
        '"/" → "/"',
      ],
      commonMistakes: [
        'Treating "..." as ".." (only exactly two dots means go up)',
        'Not guarding stack.pop() when stack is empty (at root)',
        'Forgetting the leading "/" in result',
      ],
      interviewerTips: [
        'Three-dot directory names are valid — only exactly ".." means up',
        'The stack beautifully models the directory hierarchy',
      ],
    },
    codeChallenge: {
      functionName: 'simplifyPath',
      starterCode: {
        javascript: `/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
  // Your solution here

}`,
      },
      testCases: [
        { input: ['/home//foo/../bar'], expected: '/home/bar', description: 'Double slash and parent dir' },
        { input: ['/../'], expected: '/', description: 'Go above root — stay at root' },
        { input: ['/home/user/Documents/../Pictures'], expected: '/home/user/Pictures', description: 'Parent dir navigation' },
        { input: ['/a/./b/../../c/'], expected: '/c', description: 'Mixed dots' },
        { input: ['/...'], expected: '/...', description: 'Three dots is valid dir name' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['valid-parentheses'],
    relatedPatterns: ['Stack', 'String Parsing'],
    intuitionSummary: 'The stack represents your current absolute path. ".." pops one level; anything else pushes a new level.',
    patternName: 'Stack Path Normalization',
  },

  // ─── 13. Min Stack ───────────────────────────────────────────────────────────
  {
    id: 'min-stack',
    slug: 'min-stack',
    leetcodeNumber: 155,
    title: 'Min Stack',
    category: 'stack',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['stack', 'design'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft', 'Meta'],
    descriptions: {
      explorer: 'Design a stack that not only stores values but can instantly tell you the smallest value currently in it!',
      engineer: 'Maintain a secondary minStack. Push the current minimum alongside every push. getMin() returns minStack top — all operations O(1).',
      interview: 'Auxiliary stack stores running minimum. Each entry in minStack[i] = min of all elements at or below index i. No extra lookup needed.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 2, label: 'getMin() after push(2) = 2' },
        { id: 'b', value: 3, label: 'getMin() after pop() = 3' },
        { id: 'c', value: 5, label: 'getMin() at start = 5' },
        { id: 'd', value: 7, label: 'NOT a minimum value' },
      ],
      target: 5,
      instruction: 'MinStack: push [5,3,7,2]. getMin()=2. After pop(), getMin() becomes what? Select current and next-minimum values.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'A regular stack can\'t give you the minimum in O(1) after pops. You need extra information.', xpCost: 0 },
      { id: 2, text: 'Keep a parallel minStack. When you push to main stack, also push the current minimum to minStack.', xpCost: 0 },
      { id: 3, text: 'minStack[top] always equals the minimum of all elements currently in the main stack. Pop both stacks together.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'push(-2): stack=[-2], minStack=[-2] (min so far=-2).',
        state: { stack: [-2], minStack: [-2] },
        highlight: [],
        annotation: 'push -2',
      },
      {
        id: 2,
        description: 'push(0): stack=[-2,0], minStack=[-2,-2] (min still -2).',
        state: { stack: [-2, 0], minStack: [-2, -2] },
        highlight: [],
        annotation: 'push 0, min stays -2',
      },
      {
        id: 3,
        description: 'push(-3): stack=[-2,0,-3], minStack=[-2,-2,-3] (new min=-3).',
        state: { stack: [-2, 0, -3], minStack: [-2, -2, -3] },
        highlight: [],
        annotation: 'push -3, new min=-3',
      },
      {
        id: 4,
        description: 'getMin() → minStack.top = -3.',
        state: { stack: [-2, 0, -3], minStack: [-2, -2, -3], getMin: -3 },
        highlight: [],
        annotation: 'getMin=-3',
      },
      {
        id: 5,
        description: 'pop(): remove -3 from both stacks. stack=[-2,0], minStack=[-2,-2]. getMin() → -2.',
        state: { stack: [-2, 0], minStack: [-2, -2], getMin: -2 },
        highlight: [],
        annotation: 'after pop, getMin=-2',
      },
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(n)',
      timeExplanation: 'All operations (push, pop, top, getMin) are O(1) — just array access.',
      spaceExplanation: 'Two stacks, each at most n elements.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
      },
      {
        language: 'python',
        code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'On every getMin(), scan the entire stack. O(n) per getMin call.',
        complexity: { time: 'O(n) per getMin', space: 'O(1)', timeExplanation: 'Full stack scan', spaceExplanation: 'No extra storage', visualization: 'linear' },
      },
      optimized: {
        description: 'Auxiliary minStack stores running min at each depth. All ops O(1).',
        complexity: { time: 'O(1)', space: 'O(n)', timeExplanation: 'Constant time for all operations', spaceExplanation: 'Two parallel stacks', visualization: 'linear' },
      },
      followUps: [
        'Max Stack — same pattern with a maxStack',
        'Can you reduce space if push values are always increasing? (only push to minStack when new min)',
        'Thread-safe MinStack design',
      ],
      edgeCases: ['Push then pop all — minStack mirrors main stack', 'Push same value multiple times', 'getMin after all pops (undefined behavior per problem)'],
      commonMistakes: [
        'Popping minStack only when a new minimum is pushed (breaks getMin after pop)',
        'Not initializing minStack correctly on first push',
      ],
      interviewerTips: [
        'The simpler approach (always push min) uses O(n) space but is bug-free',
        'Mention the optimization: only push to minStack when value <= current min (saves space)',
      ],
    },
    codeChallenge: {
      functionName: 'MinStack',
      starterCode: {
        javascript: `class MinStack {
  constructor() {
    // Your initialization here
  }

  /** @param {number} val */
  push(val) {
    // Your solution here
  }

  pop() {
    // Your solution here
  }

  /** @return {number} */
  top() {
    // Your solution here
  }

  /** @return {number} */
  getMin() {
    // Your solution here
  }
}`,
      },
      testCases: [
        {
          input: [['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'], [[], [-2], [0], [-3], [], [], [], []]],
          expected: [null, null, null, null, -3, null, 0, -2],
          description: 'push -2,0,-3 → getMin=-3, pop, top=0, getMin=-2',
        },
        {
          input: [['MinStack', 'push', 'push', 'push', 'top', 'pop', 'getMin'], [[], [2], [0], [3], [], [], []]],
          expected: [null, null, null, null, 3, null, 0],
          description: 'push 2,0,3 → top=3, pop, getMin=0',
        },
        {
          input: [['MinStack', 'push', 'getMin', 'push', 'getMin'], [[], [5], [], [3], []]],
          expected: [null, null, 5, null, 3],
          description: 'Min updates correctly on new minimum',
        },
        {
          input: [['MinStack', 'push', 'push', 'getMin', 'pop', 'getMin'], [[], [1], [1], [], [], []]],
          expected: [null, null, null, 1, null, 1],
          description: 'Duplicate values: min stays after pop',
        },
        {
          input: [['MinStack', 'push', 'push', 'push', 'pop', 'pop', 'getMin'], [[], [3], [2], [1], [], [], []]],
          expected: [null, null, null, null, null, null, 3],
          description: 'Pop twice, min reverts to original',
        },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['valid-parentheses'],
    relatedPatterns: ['Stack Design', 'Auxiliary Stack'],
    intuitionSummary: 'Track the running minimum at every stack depth. The auxiliary minStack makes getMin O(1) at the cost of O(n) space.',
    patternName: 'Auxiliary Min Stack',
  },

  // ─── 14. Evaluate Reverse Polish Notation ────────────────────────────────────
  {
    id: 'evaluate-reverse-polish-notation',
    slug: 'evaluate-reverse-polish-notation',
    leetcodeNumber: 150,
    title: 'Evaluate Reverse Polish Notation',
    category: 'stack',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'stack', 'math'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'LinkedIn', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Operators come after their operands. Push numbers onto a stack — when you see an operator, pop two numbers and compute!',
      engineer: 'Scan tokens. Push numbers. On operator, pop b then a, compute a op b, push result. Final stack[0] is the answer.',
      interview: 'Classic stack evaluation of postfix notation. O(n) time, O(n) space. Key: pop order matters — pop b first, then a (for subtraction/division).',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: '2+1=3 (intermediate)' },
        { id: 'b', value: 9, label: '3×3=9 (final result)' },
        { id: 'c', value: 6, label: '2×3=6 (wrong order)' },
        { id: 'd', value: 2, label: 'first operand: 2' },
      ],
      target: 12,
      instruction: 'RPN: ["2","1","+","3","*"]. Select the intermediate sum (2+1) and final result.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'In postfix notation, the operator always comes after its two operands. A stack lets you store operands until the operator arrives.', xpCost: 0 },
      { id: 2, text: 'When you encounter an operator, the top two stack elements are its operands. Pop both and push the result.', xpCost: 0 },
      { id: 3, text: 'Pop order: b = stack.pop(), a = stack.pop(), then compute a op b. Order matters for subtraction and division.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'tokens=["2","1","+","3","*"]. stack=[].',
        state: { tokens: ['2', '1', '+', '3', '*'], stack: [], i: 0 },
        highlight: [],
        annotation: 'initial',
      },
      {
        id: 2,
        description: '"2" → push. "1" → push. stack=[2,1].',
        state: { tokens: ['2', '1', '+', '3', '*'], stack: [2, 1], i: 1 },
        highlight: [0, 1],
        annotation: 'stack=[2,1]',
      },
      {
        id: 3,
        description: '"+" → pop b=1, pop a=2. a+b=3. push 3. stack=[3].',
        state: { tokens: ['2', '1', '+', '3', '*'], stack: [3], i: 2 },
        highlight: [2],
        annotation: '2+1=3',
      },
      {
        id: 4,
        description: '"3" → push. stack=[3,3].',
        state: { tokens: ['2', '1', '+', '3', '*'], stack: [3, 3], i: 3 },
        highlight: [3],
        annotation: 'stack=[3,3]',
      },
      {
        id: 5,
        description: '"*" → pop b=3, pop a=3. a*b=9. push 9. stack=[9]. Return 9.',
        state: { tokens: ['2', '1', '+', '3', '*'], stack: [9], i: 4, result: 9 },
        highlight: [4],
        annotation: '3*3=9',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Each token is processed exactly once.',
      spaceExplanation: 'Stack can hold at most n/2 operands in worst case.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function evalRPN(tokens) {
  const stack = [];
  const ops = new Set(['+', '-', '*', '/']);

  for (const token of tokens) {
    if (ops.has(token)) {
      const b = stack.pop();
      const a = stack.pop();
      if (token === '+') stack.push(a + b);
      else if (token === '-') stack.push(a - b);
      else if (token === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b)); // truncate toward zero
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
}`,
      },
      {
        language: 'python',
        code: `def evalRPN(tokens: list[str]) -> int:
    stack = []

    for token in tokens:
        if token in {'+', '-', '*', '/'}:
            b, a = stack.pop(), stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(token))

    return stack[0]`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Parse into a tree and recursively evaluate — overly complex for this problem.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Tree traversal', spaceExplanation: 'Tree nodes', visualization: 'linear' },
      },
      optimized: {
        description: 'Stack-based single pass: push numbers, evaluate on operators.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Each token processed once', spaceExplanation: 'Stack for operands', visualization: 'linear' },
      },
      followUps: [
        'Basic Calculator (with parentheses and infix notation)',
        'Convert infix to postfix (Shunting Yard algorithm)',
        'Expression Tree evaluation',
      ],
      edgeCases: ['Negative numbers like "-3"', 'Division truncation toward zero (not floor): 6/-132 = 0, not -1', 'Single number token'],
      commonMistakes: [
        'Pop order: popping a before b then doing a-b (should be b first, then a, compute a op b)',
        'Using Math.floor instead of Math.trunc for division (wrong for negative results)',
        'Not handling negative number tokens (they start with "-" but aren\'t operators)',
      ],
      interviewerTips: [
        'Emphasize truncation vs floor division — it matters for negative numbers',
        'The pop-order bug for subtraction/division is the most common mistake',
      ],
    },
    codeChallenge: {
      functionName: 'evalRPN',
      starterCode: {
        javascript: `/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
  // Your solution here

}`,
      },
      testCases: [
        { input: [['2', '1', '+', '3', '*']], expected: 9, description: '(2+1)*3 = 9' },
        { input: [['4', '13', '5', '/', '+']], expected: 6, description: '4+(13/5) = 4+2 = 6' },
        { input: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']], expected: 22, description: 'Complex expression = 22' },
        { input: [['3', '-4', '+']], expected: -1, description: 'Negative number token' },
        { input: [['7', '2', '-']], expected: 5, description: 'Simple subtraction' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: ['valid-parentheses'],
    relatedPatterns: ['Stack Evaluation', 'Postfix Notation'],
    intuitionSummary: 'Postfix notation eliminates ambiguity by placing operators after operands. A stack naturally models the operand buffer.',
    patternName: 'Stack Expression Evaluation',
  },

  // ─── 15. Basic Calculator ────────────────────────────────────────────────────
  {
    id: 'basic-calculator',
    slug: 'basic-calculator',
    leetcodeNumber: 224,
    title: 'Basic Calculator',
    category: 'stack',
    difficulty: 'hard',
    engineType: 'matching',
    tags: ['string', 'stack', 'math', 'recursion'],
    questionSets: ['top150'],
    companies: ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Bloomberg'],
    descriptions: {
      explorer: 'Evaluate a math expression with +, -, and parentheses — without using eval()!',
      engineer: 'Use a stack to save context (result, sign) when entering parentheses. On ")", restore context and combine.',
      interview: 'Context-saving stack. Track running result and current sign (+1/-1). "(" pushes (result, sign), ")" pops and merges.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 11, label: '4+5+2=11 (first group)' },
        { id: 'b', value: 14, label: '6+8=14 (second group)' },
        { id: 'c', value: 9, label: '1+11-3=9 (outer first)' },
        { id: 'd', value: 23, label: 'final result: 23' },
      ],
      target: 25,
      instruction: '"(1+(4+5+2)-3)+(6+8)": select the two inner group sums (4+5+2 and 6+8).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of each parenthesized group as a subproblem. When you open "(", save your current state and start fresh.', xpCost: 0 },
      { id: 2, text: 'Stack stores (accumulated_result, sign_before_paren) pairs. On ")", pop them and merge.', xpCost: 0 },
      { id: 3, text: 'Track current number building with num = num*10 + digit. Apply on "+" and "-": result += sign * num. Reset num=0.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: '"1 + (2 - 3)". result=0, sign=1, num=0, stack=[].',
        state: { expr: '1 + (2 - 3)', result: 0, sign: 1, num: 0, stack: [] },
        highlight: [],
        annotation: 'initial',
      },
      {
        id: 2,
        description: '"1": num=1. "+": result+=1*1=1, sign=1, num=0.',
        state: { result: 1, sign: 1, num: 0, stack: [] },
        highlight: [],
        annotation: 'result=1 after "1+"',
      },
      {
        id: 3,
        description: '"(": push (result=1, sign=1). Reset result=0, sign=1.',
        state: { result: 0, sign: 1, num: 0, stack: [[1, 1]] },
        highlight: [],
        annotation: 'push context, reset',
      },
      {
        id: 4,
        description: '"2": num=2. "-": result+=1*2=2, sign=-1, num=0.',
        state: { result: 2, sign: -1, num: 0, stack: [[1, 1]] },
        highlight: [],
        annotation: 'inside parens: result=2',
      },
      {
        id: 5,
        description: '"3": num=3. ")": result+=(-1)*3=2-3=-1. Pop (prev=1, prevSign=1). result = prev + prevSign * innerResult = 1 + 1*(-1) = 0.',
        state: { result: 0, sign: 1, num: 0, stack: [] },
        highlight: [],
        annotation: 'close paren: result=0',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Each character processed once.',
      spaceExplanation: 'Stack depth proportional to nesting level, at most O(n).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function calculate(s) {
  const stack = [];
  let result = 0;
  let sign = 1;  // +1 or -1
  let num = 0;

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch);
    } else if (ch === '+') {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (ch === '-') {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (ch === '(') {
      // save context
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (ch === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop();   // pop sign before '('
      result += stack.pop();   // pop result before '('
    }
    // spaces: ignore
  }

  return result + sign * num;
}`,
      },
      {
        language: 'python',
        code: `def calculate(s: str) -> int:
    stack = []
    result = 0
    sign = 1
    num = 0

    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == '+':
            result += sign * num
            num = 0
            sign = 1
        elif ch == '-':
            result += sign * num
            num = 0
            sign = -1
        elif ch == '(':
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif ch == ')':
            result += sign * num
            num = 0
            result *= stack.pop()  # sign before '('
            result += stack.pop()  # result before '('

    return result + sign * num`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Recursive descent parser — valid but more complex code.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Recursion stack matches nesting depth', spaceExplanation: 'Call stack', visualization: 'linear' },
      },
      optimized: {
        description: 'Iterative stack saves (result, sign) context at each open paren.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Single pass', spaceExplanation: 'Stack proportional to nesting', visualization: 'linear' },
      },
      followUps: [
        'Basic Calculator II (LC 227) — adds * and / without parentheses',
        'Basic Calculator III (LC 772) — all four operators with parentheses',
        'Evaluate expression with variables',
      ],
      edgeCases: ['Single number "42"', 'Unary negation "-(3+4)"', 'Deeply nested "((1+2))"', 'Multi-digit numbers'],
      commonMistakes: [
        'Not flushing num at end of string (must do result += sign * num after loop)',
        'Pop order on ")": pop sign first, then previous result',
        'Handling spaces — must skip or they corrupt num parsing',
      ],
      interviewerTips: [
        'Walk through "1 + (2 - 3)" step by step to demonstrate the push/pop logic',
        'The key insight: closing ")" merges the inner result with saved outer context',
      ],
    },
    codeChallenge: {
      functionName: 'calculate',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
  // Your solution here

}`,
      },
      testCases: [
        { input: ['1 + 1'], expected: 2, description: 'Simple addition' },
        { input: [' 2-1 + 2 '], expected: 3, description: 'Spaces around operators' },
        { input: ['(1+(4+5+2)-3)+(6+8)'], expected: 23, description: 'Nested parentheses' },
        { input: ['1 + (2 - 3)'], expected: 0, description: 'Subtraction inside parens' },
        { input: ['-(3+4)'], expected: -7, description: 'Unary negation before paren' },
      ],
    },
    xpRewards: { puzzle: 150, hints: 20, dryRun: 30, code: 50, coding: 200 },
    prerequisites: ['evaluate-reverse-polish-notation', 'valid-parentheses'],
    relatedPatterns: ['Stack Context Saving', 'Expression Parsing'],
    intuitionSummary: 'Parentheses create nested contexts. Push current state on "(", restore and merge on ")". Reduces to a flat linear scan.',
    patternName: 'Stack Context Restoration',
  },

  // ─── 16. H-Index ─────────────────────────────────────────────────────────────
  {
    id: 'h-index',
    slug: 'h-index',
    leetcodeNumber: 274,
    title: 'H-Index',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['array', 'sorting', 'counting-sort'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Bloomberg', 'Adobe'],
    descriptions: {
      explorer: 'A researcher has h-index h if they have at least h papers with at least h citations each. Find the highest such h!',
      engineer: 'Sort citations descending. h-index is the maximum i+1 such that citations[i] >= i+1. Scan until condition fails.',
      interview: 'Sort descending, iterate: h is the largest index+1 where value >= index+1. O(n log n). Counting sort gives O(n).',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 3, label: 'h=3 (3 papers with ≥3 citations)' },
        { id: 'b', value: 3, label: 'count of papers with ≥h citations: 3' },
        { id: 'c', value: 5, label: 'highest citation count=6... no, 5 as second' },
        { id: 'd', value: 6, label: 'max citations=6' },
      ],
      target: 6,
      instruction: 'citations=[3,0,6,1,5]: h-index=3 means 3 papers have ≥3 citations. Select h and the count of qualifying papers.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Sort citations in descending order. Now citations[0] >= citations[1] >= ...', xpCost: 0 },
      { id: 2, text: 'At position i (0-indexed), you have i+1 papers. For h-index to be i+1, need citations[i] >= i+1.', xpCost: 0 },
      { id: 3, text: 'Scan until citations[i] < i+1. Return i (the last valid h). If all satisfy, return n.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'citations=[3,0,6,1,5]. Sort desc → [6,5,3,1,0].',
        state: { citations: [6, 5, 3, 1, 0], i: 0 },
        highlight: [],
        annotation: 'sorted descending',
      },
      {
        id: 2,
        description: 'i=0: citations[0]=6 >= 1 ✓. i=1: citations[1]=5 >= 2 ✓. i=2: citations[2]=3 >= 3 ✓.',
        state: { citations: [6, 5, 3, 1, 0], i: 2 },
        highlight: [0, 1, 2],
        annotation: 'i=0,1,2 satisfy condition',
      },
      {
        id: 3,
        description: 'i=3: citations[3]=1 < 4 ✗. Stop. h-index = 3.',
        state: { citations: [6, 5, 3, 1, 0], i: 3, result: 3 },
        highlight: [3],
        annotation: 'i=3 fails → h=3',
      },
    ],
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)',
      timeExplanation: 'Dominated by sort. Linear scan is O(n).',
      spaceExplanation: 'In-place sort, constant extra variables.',
      visualization: 'nlogn',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function hIndex(citations) {
  citations.sort((a, b) => b - a);

  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      h = i + 1;
    } else {
      break;
    }
  }

  return h;
}`,
      },
      {
        language: 'python',
        code: `def hIndex(citations: list[int]) -> int:
    citations.sort(reverse=True)
    h = 0
    for i, c in enumerate(citations):
        if c >= i + 1:
            h = i + 1
        else:
            break
    return h`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Try every possible h from n down to 0. For each h, count papers with >= h citations.',
        complexity: { time: 'O(n²)', space: 'O(1)', timeExplanation: 'n candidates × n count each', spaceExplanation: 'Constant', visualization: 'quadratic' },
      },
      optimized: {
        description: 'Sort descending; scan for the largest i+1 where citations[i] >= i+1.',
        complexity: { time: 'O(n log n)', space: 'O(1)', timeExplanation: 'Sort dominates', spaceExplanation: 'In-place sort', visualization: 'nlogn' },
      },
      followUps: [
        'H-Index II (LC 275) — sorted input, use binary search → O(log n)',
        'O(n) solution with counting sort — bucket by citation count capped at n',
      ],
      edgeCases: ['All zeros → 0', 'All same citations → depends on count vs value', 'Single paper → min(citations[0], 1)'],
      commonMistakes: [
        'Sorting ascending instead of descending',
        'Returning i instead of i+1 (off by one)',
        'Not breaking early when condition fails',
      ],
      interviewerTips: [
        'Mention the O(n) counting sort approach (bucket i stores count of papers with >= i citations)',
        'H-Index II with sorted array → binary search variant shows adaptability',
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
        { input: [[3, 0, 6, 1, 5]], expected: 3, description: '3 papers with >= 3 citations' },
        { input: [[1, 3, 1]], expected: 1, description: 'h-index is 1' },
        { input: [[0]], expected: 0, description: 'Zero citations' },
        { input: [[100]], expected: 1, description: 'Single highly-cited paper' },
        { input: [[4, 4, 4, 4]], expected: 4, description: 'Four papers each with 4 citations' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 30, code: 50, coding: 150 },
    prerequisites: [],
    relatedPatterns: ['Sorting', 'Greedy'],
    intuitionSummary: 'After sorting descending, the h-index is the last position i where there are enough highly-cited papers: citations[i] >= i+1.',
    patternName: 'Sort and Scan',
  },

  // ─── 17. Length of Last Word ─────────────────────────────────────────────────
  {
    id: 'length-of-last-word',
    slug: 'length-of-last-word',
    leetcodeNumber: 58,
    title: 'Length of Last Word',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['string'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Apple', 'Microsoft'],
    descriptions: {
      explorer: 'Find the length of the last word in a sentence, ignoring trailing spaces!',
      engineer: 'Trim trailing spaces by scanning backward. Then count characters until you hit a space or the start.',
      interview: 'Simple backward scan. O(n) worst case but typically fast. No string allocation needed.',
    },
    puzzleConfig: {
      items: [
        { id: 'a', value: 5, label: 'length of "World"=5' },
        { id: 'b', value: 5, label: 'chars from end before space: 5' },
        { id: 'c', value: 10, label: 'index of last space: 10? No, index=5' },
        { id: 'd', value: 11, label: 'total length=11' },
      ],
      target: 10,
      instruction: '"Hello World": the last word is "World". Select the two representations of its length (both equal 5).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Start from the end of the string. Skip any trailing spaces first.', xpCost: 0 },
      { id: 2, text: 'After skipping spaces, count characters until you hit the next space or reach the beginning.', xpCost: 0 },
      { id: 3, text: 'Use a single index starting from s.length-1, decrement past spaces, then count letters.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 's="   fly me   to   the moon  ". Start at i=len-1.',
        state: { s: '   fly me   to   the moon  ', i: 26, length: 0 },
        highlight: [],
        annotation: 'i starts at end',
      },
      {
        id: 2,
        description: 'i=26,25: spaces → skip. i=24: "n" → start counting.',
        state: { i: 24, length: 0 },
        highlight: [25, 26],
        annotation: 'skip trailing spaces',
      },
      {
        id: 3,
        description: 'i=24 "n", i=23 "o", i=22 "o", i=21 "m" → length=4. i=20 " " → stop.',
        state: { i: 20, length: 4 },
        highlight: [21, 22, 23, 24],
        annotation: 'count "moon" = 4',
      },
      {
        id: 4,
        description: 'Return length=4.',
        state: { result: 4 },
        highlight: [],
        annotation: 'answer = 4',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single backward scan through the string.',
      spaceExplanation: 'Only two variables: index and length counter.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `function lengthOfLastWord(s) {
  let i = s.length - 1;
  let length = 0;

  // Skip trailing spaces
  while (i >= 0 && s[i] === ' ') i--;

  // Count last word
  while (i >= 0 && s[i] !== ' ') {
    length++;
    i--;
  }

  return length;
}`,
      },
      {
        language: 'python',
        code: `def lengthOfLastWord(s: str) -> int:
    i = len(s) - 1
    length = 0

    while i >= 0 and s[i] == ' ':
        i -= 1

    while i >= 0 and s[i] != ' ':
        length += 1
        i -= 1

    return length`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Split by spaces, filter empty strings, return length of last element.',
        complexity: { time: 'O(n)', space: 'O(n)', timeExplanation: 'Split creates new array', spaceExplanation: 'Array of words', visualization: 'linear' },
      },
      optimized: {
        description: 'Backward scan with no allocations.',
        complexity: { time: 'O(n)', space: 'O(1)', timeExplanation: 'At most n characters scanned', spaceExplanation: 'Two integer variables', visualization: 'linear' },
      },
      followUps: [
        'Length of first word (forward scan)',
        'Count words in string',
        'Reverse words in a string',
      ],
      edgeCases: [
        'Trailing spaces: "hello world  " → 5',
        'Single word: "hello" → 5',
        'Single word with spaces: "  hello  " → 5',
        'Multiple spaces between words',
      ],
      commonMistakes: [
        'Using split(" ") without filtering empty strings from consecutive spaces',
        'Not handling trailing spaces before counting',
        'Off-by-one at string start',
      ],
      interviewerTips: [
        'The one-liner s.trim().split(" ").pop().length works but allocates — mention the O(1) space approach',
        'Good warm-up question to verify string indexing comfort',
      ],
    },
    codeChallenge: {
      functionName: 'lengthOfLastWord',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord(s) {
  // Your solution here

}`,
      },
      testCases: [
        { input: ['Hello World'], expected: 5, description: 'Simple two-word string' },
        { input: ['   fly me   to   the moon  '], expected: 4, description: 'Trailing and internal spaces' },
        { input: ['luffy is still joyboy'], expected: 6, description: 'Last word "joyboy"' },
        { input: ['a '], expected: 1, description: 'Single char with trailing space' },
        { input: ['hello'], expected: 5, description: 'Single word, no spaces' },
      ],
    },
    xpRewards: { puzzle: 50, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['String Traversal', 'Two Pointers'],
    intuitionSummary: 'Scan backward: skip trailing spaces, then count until the next space. Two-phase backward scan avoids any string allocation.',
    patternName: 'Backward Scan',
  },
];

import type { QuestionConfig } from '@/types/question';

export const HASHMAP_STRING_COMPLETE: QuestionConfig[] = [
  // ─── 1. Ransom Note (383) ─────────────────────────────────────────────────
  {
    id: 'ransom-note',
    slug: 'ransom-note',
    leetcodeNumber: 383,
    title: 'Ransom Note',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['hashmap', 'string', 'counting'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Adobe', 'Apple'],
    descriptions: {
      explorer: 'Can you build the ransom note using only letters cut from the magazine — without reusing any letter?',
      engineer: 'Count character frequencies in the magazine. For each character needed by the ransom note, decrement its count. If any count drops below 0, return false.',
      interview: 'Classic frequency-map problem. Build a freq map from magazine in one pass, then consume from it for each char in ransomNote. O(n+m) time, O(1) space since only 26 lowercase letters.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 2, label: "'a' in ransomNote: 2"},
        {id: 'b', value: 2, label: "'a' in magazine: 2"},
        {id: 'c', value: 1, label: "'b' in magazine: 1"},
        {id: 'd', value: 0, label: "'b' in ransomNote: 0"},
      ],
      target: 4,
      instruction: '"aa" from "aab": select the count of \'a\' needed (2) and the count available in magazine (2).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think of the magazine as a supply of letters. For each letter the note needs, subtract one from the supply.', xpCost: 0 },
      { id: 2, text: 'Build a frequency map of all magazine characters first, then iterate over the ransomNote and decrement each character count.', xpCost: 0 },
      { id: 3, text: 'If any character count in the map goes below 0, the magazine cannot supply it — return false immediately.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'ransomNote="aa", magazine="aab". Build freq map from magazine.',
        state: { ransomNote: 'aa', magazine: 'aab', freq: { a: 2, b: 1 }, i: -1 },
        annotation: 'freq = {a:2, b:1}',
      },
      {
        id: 2,
        description: 'i=0: need ransomNote[0]="a". freq["a"]=2 → decrement to 1. Still >= 0, continue.',
        state: { ransomNote: 'aa', magazine: 'aab', freq: { a: 1, b: 1 }, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'freq["a"] = 1',
      },
      {
        id: 3,
        description: 'i=1: need ransomNote[1]="a". freq["a"]=1 → decrement to 0. Still >= 0, continue.',
        state: { ransomNote: 'aa', magazine: 'aab', freq: { a: 0, b: 1 }, i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'freq["a"] = 0',
      },
      {
        id: 4,
        description: 'All characters consumed without going negative. Return true.',
        state: { ransomNote: 'aa', magazine: 'aab', freq: { a: 0, b: 1 }, result: true },
        annotation: 'return true ✓',
      },
    ],
    complexity: {
      time: 'O(n + m)',
      space: 'O(1)',
      timeExplanation: 'One pass over magazine (length m) to build freq map, one pass over ransomNote (length n) to consume.',
      spaceExplanation: 'Freq map has at most 26 entries for lowercase English letters — constant space.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
function canConstruct(ransomNote, magazine) {
  const freq = {};
  for (const ch of magazine) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  for (const ch of ransomNote) {
    if (!freq[ch] || freq[ch] === 0) return false;
    freq[ch]--;
  }
  return true;
}`,
        notes: 'Build supply from magazine, then drain for each letter needed by the note.',
      },
      {
        language: 'python',
        code: `from collections import Counter

def canConstruct(ransomNote: str, magazine: str) -> bool:
    freq = Counter(magazine)
    for ch in ransomNote:
        freq[ch] -= 1
        if freq[ch] < 0:
            return False
    return True`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each character in ransomNote, scan magazine to find and remove one occurrence.',
        complexity: {
          time: 'O(n * m)',
          space: 'O(m)',
          timeExplanation: 'For each of n chars in the note, do an O(m) scan of the magazine.',
          spaceExplanation: 'May need to copy magazine string to remove characters.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Frequency map built from magazine; single pass over ransomNote to decrement counts.',
        complexity: {
          time: 'O(n + m)',
          space: 'O(1)',
          timeExplanation: 'Two independent single passes, each O(length).',
          spaceExplanation: 'Map bounded by 26 lowercase letters regardless of input size.',
          visualization: 'linear',
        },
      },
      followUps: [
        'What if characters are Unicode (not just lowercase letters)?',
        'What if ransomNote is a multiline string with spaces and punctuation?',
        'Word Ransom Note: can you build the note using full words from the magazine?',
      ],
      edgeCases: [
        'Empty ransomNote → always true',
        'Empty magazine → true only if ransomNote is also empty',
        'ransomNote longer than magazine → must be false',
        'All same character repeated many times',
      ],
      commonMistakes: [
        'Building the freq map from ransomNote instead of magazine',
        'Forgetting that each magazine letter can only be used once',
        'Not handling characters absent from the magazine (undefined/NaN from decrement)',
      ],
      interviewerTips: [
        'Mention the O(1) space bound — only 26 letters makes the map a fixed-size structure',
        'Counter subtraction in Python is a clean one-liner worth knowing',
        'Ask whether input is guaranteed lowercase — affects space analysis',
      ],
    },
    codeChallenge: {
      functionName: 'canConstruct',
      starterCode: {
        javascript: `/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
function canConstruct(ransomNote, magazine) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['a', 'b'], expected: false, description: '"a" cannot be built from "b"' },
        { input: ['aa', 'aab'], expected: true, description: '"aa" can be built from "aab"' },
        { input: ['aa', 'ab'], expected: false, description: '"aa" needs two a\'s but magazine only has one' },
        { input: ['', 'abc'], expected: true, description: 'Empty ransomNote is always constructible' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['two-sum'],
    relatedPatterns: ['Frequency Count', 'HashSet Lookup', 'Isomorphic Strings'],
    intuitionSummary: 'Count each magazine letter as a token in a supply map, then spend one token per letter the note needs.',
    patternName: 'Frequency Count',
  },

  // ─── 2. Isomorphic Strings (205) ──────────────────────────────────────────
  {
    id: 'isomorphic-strings',
    slug: 'isomorphic-strings',
    leetcodeNumber: 205,
    title: 'Isomorphic Strings',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['hashmap', 'string', 'bijection'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'Can every character in string s be replaced consistently to produce string t — and vice versa?',
      engineer: 'Maintain two maps: s→t and t→s. For each position, check that both mappings are consistent. Any conflict means the strings are not isomorphic.',
      interview: 'Bidirectional mapping check. sMap[s[i]] must equal t[i] if defined, and tMap[t[i]] must equal s[i] if defined. Both constraints together ensure the bijection is valid.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 2, label: "unique chars in 'egg': 2 (e,g)"},
        {id: 'b', value: 2, label: "unique chars in 'add': 2 (a,d)"},
        {id: 'c', value: 3, label: 'length of both strings: 3'},
        {id: 'd', value: 1, label: 'wrong: 1 mapping'},
      ],
      target: 4,
      instruction: '"egg" ↔ "add": both have 2 unique characters. Select the unique-char counts from each string.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'You need a one-to-one mapping: each character in s maps to exactly one character in t, and no two different characters in s can map to the same character in t.', xpCost: 0 },
      { id: 2, text: 'Use two maps: sToT and tToS. At each index, check that the existing mappings are consistent before updating them.', xpCost: 0 },
      { id: 3, text: 'If sToT[s[i]] is already set but differs from t[i], return false. Similarly if tToS[t[i]] is set but differs from s[i]. Otherwise record both mappings.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'isIsomorphic("egg","add"). Initialize sToT={}, tToS={}.',
        state: { s: 'egg', t: 'add', sToT: {}, tToS: {}, i: -1 },
        annotation: 'sToT={}, tToS={}',
      },
      {
        id: 2,
        description: 'i=0: s[0]="e", t[0]="a". Neither mapped. Record sToT["e"]="a", tToS["a"]="e".',
        state: { s: 'egg', t: 'add', sToT: { e: 'a' }, tToS: { a: 'e' }, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'e→a, a→e',
      },
      {
        id: 3,
        description: 'i=1: s[1]="g", t[1]="d". Neither mapped. Record sToT["g"]="d", tToS["d"]="g".',
        state: { s: 'egg', t: 'add', sToT: { e: 'a', g: 'd' }, tToS: { a: 'e', d: 'g' }, i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'g→d, d→g',
      },
      {
        id: 4,
        description: 'i=2: s[2]="g", t[2]="d". sToT["g"]="d" ✓, tToS["d"]="g" ✓. Both consistent.',
        state: { s: 'egg', t: 'add', sToT: { e: 'a', g: 'd' }, tToS: { a: 'e', d: 'g' }, i: 2 },
        highlight: [2],
        pointers: { i: 2 },
        annotation: 'Mappings consistent at i=2',
      },
      {
        id: 5,
        description: 'All positions checked without conflict. Return true.',
        state: { s: 'egg', t: 'add', sToT: { e: 'a', g: 'd' }, tToS: { a: 'e', d: 'g' }, result: true },
        annotation: 'return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeExplanation: 'Single pass through the string of length n with O(1) map operations.',
      spaceExplanation: 'Maps hold at most 26 distinct lowercase letter entries each.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
  const sToT = {};
  const tToS = {};
  for (let i = 0; i < s.length; i++) {
    const sc = s[i], tc = t[i];
    if (sToT[sc] !== undefined && sToT[sc] !== tc) return false;
    if (tToS[tc] !== undefined && tToS[tc] !== sc) return false;
    sToT[sc] = tc;
    tToS[tc] = sc;
  }
  return true;
}`,
        notes: 'Both maps are needed — checking only one direction misses the case where two s-chars map to the same t-char.',
      },
      {
        language: 'python',
        code: `def isIsomorphic(s: str, t: str) -> bool:
    s_to_t, t_to_s = {}, {}
    for sc, tc in zip(s, t):
        if s_to_t.get(sc, tc) != tc or t_to_s.get(tc, sc) != sc:
            return False
        s_to_t[sc] = tc
        t_to_s[tc] = sc
    return True`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each pair of positions, check that equal s-characters map to equal t-characters and vice versa.',
        complexity: {
          time: 'O(n²)',
          space: 'O(1)',
          timeExplanation: 'Nested comparison of all pairs.',
          spaceExplanation: 'No extra data structures.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Two hash maps (s→t and t→s) in a single pass guarantee the bijection property.',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'One pass, constant-time map operations.',
          spaceExplanation: 'Maps bounded by alphabet size.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Word Pattern (LC 290) — same problem at the word level',
        'What if characters could be arbitrary Unicode code points?',
        'Can you solve it without hash maps using only arrays of size 256?',
      ],
      edgeCases: [
        '"foo" and "bar" — f→b, o→a but then o→r conflicts',
        'Single character strings — always isomorphic',
        'Same characters: "aa" and "ab" — a maps to both a and b, false',
      ],
      commonMistakes: [
        'Only checking one direction (s→t) and missing the bijection violation',
        'Mapping t→s using === undefined without handling 0/"false"-y values',
        'Not checking tToS before updating sToT at the same step',
      ],
      interviewerTips: [
        'Draw out "foo"/"bar" to show why both maps are essential',
        'Mention that the same index-position trick (replace each char with its first-seen index) also works',
        'Ask if strings are guaranteed the same length',
      ],
    },
    codeChallenge: {
      functionName: 'isIsomorphic',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['egg', 'add'], expected: true, description: 'e→a, g→d — valid bijection' },
        { input: ['foo', 'bar'], expected: false, description: 'o maps to both a and r — conflict' },
        { input: ['paper', 'title'], expected: true, description: 'p→t, a→i, e→l, r→e — valid' },
        { input: ['badc', 'baba'], expected: false, description: 'a and c both map to b — not injective' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['ransom-note'],
    relatedPatterns: ['Bijective Mapping', 'Frequency Count', 'Word Pattern'],
    intuitionSummary: 'Two strings are isomorphic when their characters stand in a perfect one-to-one correspondence at every position.',
    patternName: 'Bijective Mapping',
  },

  // ─── 3. Word Pattern (290) ────────────────────────────────────────────────
  {
    id: 'word-pattern',
    slug: 'word-pattern',
    leetcodeNumber: 290,
    title: 'Word Pattern',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['hashmap', 'string', 'bijection'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Dropbox', 'Bloomberg'],
    descriptions: {
      explorer: 'Does the sequence of words follow the same pattern as the sequence of letters? Each letter should represent exactly one word and each word exactly one letter.',
      engineer: 'Split the string into words. Map each pattern character to its word and each word back to its pattern character. Any inconsistency means the pattern does not match.',
      interview: 'Same bijection idea as Isomorphic Strings but between chars and words. Both charToWord and wordToChar maps must remain consistent at every position.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 1, label: 'a→dog: 1st appearance at index 0'},
        {id: 'b', value: 3, label: 'a→dog: again at index 3'},
        {id: 'c', value: 2, label: 'unique words: 2 (dog, cat)'},
        {id: 'd', value: 2, label: 'unique letters in pattern: 2 (a, b)'},
      ],
      target: 4,
      instruction: '"abba" matches "dog cat cat dog": a=dog appears at indices 0 and 3. Select those indices.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Split the string on spaces to get the word array. The lengths of pattern and the word array must match first.', xpCost: 0 },
      { id: 2, text: 'For each index, check that pattern[i] always maps to the same word and the same word always maps back to pattern[i].', xpCost: 0 },
      { id: 3, text: 'Use two maps: charToWord and wordToChar. If either mapping conflicts at position i, return false immediately.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'wordPattern("abba","dog cat cat dog"). words=["dog","cat","cat","dog"]. Init charToWord={}, wordToChar={}.',
        state: { pattern: 'abba', words: ['dog', 'cat', 'cat', 'dog'], charToWord: {}, wordToChar: {}, i: -1 },
        annotation: 'charToWord={}, wordToChar={}',
      },
      {
        id: 2,
        description: 'i=0: pattern[0]="a", word="dog". No prior mapping. Set charToWord["a"]="dog", wordToChar["dog"]="a".',
        state: { charToWord: { a: 'dog' }, wordToChar: { dog: 'a' }, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'a→dog, dog→a',
      },
      {
        id: 3,
        description: 'i=1: pattern[1]="b", word="cat". No prior mapping. Set charToWord["b"]="cat", wordToChar["cat"]="b".',
        state: { charToWord: { a: 'dog', b: 'cat' }, wordToChar: { dog: 'a', cat: 'b' }, i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'b→cat, cat→b',
      },
      {
        id: 4,
        description: 'i=2: pattern[2]="b", word="cat". charToWord["b"]="cat" ✓, wordToChar["cat"]="b" ✓. Consistent.',
        state: { charToWord: { a: 'dog', b: 'cat' }, wordToChar: { dog: 'a', cat: 'b' }, i: 2 },
        highlight: [2],
        pointers: { i: 2 },
        annotation: 'Consistent at i=2',
      },
      {
        id: 5,
        description: 'i=3: pattern[3]="a", word="dog". charToWord["a"]="dog" ✓, wordToChar["dog"]="a" ✓. Return true.',
        state: { charToWord: { a: 'dog', b: 'cat' }, wordToChar: { dog: 'a', cat: 'b' }, i: 3, result: true },
        annotation: 'return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Single pass over n pattern-word pairs with O(1) map lookups.',
      spaceExplanation: 'Maps store at most n entries (bounded by number of distinct chars/words).',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  const charToWord = {};
  const wordToChar = {};
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i], w = words[i];
    if (charToWord[c] !== undefined && charToWord[c] !== w) return false;
    if (wordToChar[w] !== undefined && wordToChar[w] !== c) return false;
    charToWord[c] = w;
    wordToChar[w] = c;
  }
  return true;
}`,
        notes: 'Length check up front catches "ab" vs "dog cat cat dog" mismatch early.',
      },
      {
        language: 'python',
        code: `def wordPattern(pattern: str, s: str) -> bool:
    words = s.split()
    if len(pattern) != len(words):
        return False
    char_to_word, word_to_char = {}, {}
    for c, w in zip(pattern, words):
        if char_to_word.get(c, w) != w or word_to_char.get(w, c) != c:
            return False
        char_to_word[c] = w
        word_to_char[w] = c
    return True`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For every pair of positions, verify that equal pattern chars imply equal words and vice versa.',
        complexity: {
          time: 'O(n²)',
          space: 'O(1)',
          timeExplanation: 'All pairs checked.',
          spaceExplanation: 'No extra storage.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Two hash maps in one pass ensure both the char→word and word→char mappings are bijective.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'Single pass, O(1) map ops per step.',
          spaceExplanation: 'At most n entries across both maps.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Isomorphic Strings (LC 205) — same concept at character level',
        'What if words can repeat in the pattern but appear in different orders?',
        'What if the delimiter between words is not always a single space?',
      ],
      edgeCases: [
        'Pattern length differs from word count → false immediately',
        'All same pattern character but different words: "aaaa" "dog cat cat dog" → false',
        'All same words with different pattern chars: "abba" "dog dog dog dog" → false',
      ],
      commonMistakes: [
        'Forgetting the reverse map so two pattern chars can map to the same word',
        'Splitting on single space when input might have multiple spaces (use split(" ") vs split(/\\s+/))',
        'Skipping the length check before iterating',
      ],
      interviewerTips: [
        'Emphasize this is Isomorphic Strings scaled to words — same pattern, bigger tokens',
        'The bijection (both directions) is the key insight to articulate',
        'Ask: guaranteed single-space separators?',
      ],
    },
    codeChallenge: {
      functionName: 'wordPattern',
      starterCode: {
        javascript: `/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
function wordPattern(pattern, s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['abba', 'dog cat cat dog'], expected: true, description: 'Perfect bijection a↔dog, b↔cat' },
        { input: ['abba', 'dog cat cat fish'], expected: false, description: 'a maps to both dog and fish' },
        { input: ['aaaa', 'dog cat cat dog'], expected: false, description: 'a maps to dog then cat — conflict' },
        { input: ['abba', 'dog dog dog dog'], expected: false, description: 'a and b both map to dog' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['isomorphic-strings'],
    relatedPatterns: ['Bijective Mapping', 'Frequency Count', 'Isomorphic Strings'],
    intuitionSummary: 'The pattern and the sentence share structure when there is a perfect one-to-one correspondence between letters and words.',
    patternName: 'Bijective Mapping',
  },

  // ─── 4. Happy Number (202) ────────────────────────────────────────────────
  {
    id: 'happy-number',
    slug: 'happy-number',
    leetcodeNumber: 202,
    title: 'Happy Number',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['hashmap', 'math', 'set', 'cycle-detection'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Replace a number repeatedly with the sum of squares of its digits. Does it eventually reach 1, or does it loop forever?',
      engineer: 'Compute the digit-square sum in a loop. Use a Set to detect cycles. If the result reaches 1, return true; if a value is seen twice, it is a cycle — return false.',
      interview: 'Classic cycle detection via a Set or Floyd\'s slow/fast pointer. O(log n) per step for digit extraction. Unhappy numbers always cycle through a known set including 4.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 1, label: '1² = 1'},
        {id: 'b', value: 81, label: '9² = 81'},
        {id: 'c', value: 82, label: '1²+9²=82 (first step)'},
        {id: 'd', value: 1, label: 'eventually reaches 1 (happy!)'},
      ],
      target: 82,
      instruction: 'Happy Number 19: first step: 1²+9²=1+81=82. Select 1² and 9².',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Extract each digit by taking n % 10, squaring it, then dividing n by 10 — repeat until n becomes 0.', xpCost: 0 },
      { id: 2, text: 'Store every intermediate result in a Set. If you see a result you have seen before, you are in a cycle — return false.', xpCost: 0 },
      { id: 3, text: 'If the sum reaches 1, return true. If it appears in the seen Set before reaching 1, return false. Unhappy numbers always cycle through 4.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'isHappy(19). seen={}. Start with n=19.',
        state: { n: 19, seen: [], step: 0 },
        annotation: 'seen = {}',
      },
      {
        id: 2,
        description: 'n=19: 1²+9²=1+81=82. 19 not in seen → add. n=82.',
        state: { n: 82, seen: [19], step: 1 },
        annotation: 'seen = {19}',
      },
      {
        id: 3,
        description: 'n=82: 8²+2²=64+4=68. 82 not in seen → add. n=68.',
        state: { n: 68, seen: [19, 82], step: 2 },
        annotation: 'seen = {19, 82}',
      },
      {
        id: 4,
        description: 'n=68: 6²+8²=36+64=100. n=100.',
        state: { n: 100, seen: [19, 82, 68], step: 3 },
        annotation: 'seen = {19, 82, 68}',
      },
      {
        id: 5,
        description: 'n=100: 1²+0²+0²=1. n=1 → happy! Return true.',
        state: { n: 1, seen: [19, 82, 68, 100], step: 4, result: true },
        annotation: 'n=1 → return true ✓',
      },
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(log n)',
      timeExplanation: 'Each step reduces the number of digits. The cycle terminates in O(log n) steps. For unhappy numbers, the Set grows to a bounded constant before a cycle is detected.',
      spaceExplanation: 'The Set stores at most O(log n) values before a cycle or 1 is reached.',
      visualization: 'logarithmic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  function digitSquareSum(num) {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = digitSquareSum(n);
  }
  return n === 1;
}`,
        notes: 'Alternatively use Floyd\'s cycle detection (slow/fast pointers) for O(1) space.',
      },
      {
        language: 'python',
        code: `def isHappy(n: int) -> bool:
    def digit_square_sum(num: int) -> int:
        total = 0
        while num:
            num, d = divmod(num, 10)
            total += d * d
        return total

    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = digit_square_sum(n)
    return n == 1`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Simulate indefinitely without cycle detection — will loop forever for unhappy numbers.',
        complexity: {
          time: 'O(∞)',
          space: 'O(∞)',
          timeExplanation: 'No termination guarantee.',
          spaceExplanation: 'Unbounded memory.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Set-based cycle detection stops the loop as soon as any value repeats.',
        complexity: {
          time: 'O(log n)',
          space: 'O(log n)',
          timeExplanation: 'Values quickly shrink; cycle detected in bounded steps.',
          spaceExplanation: 'Set bounded by number of distinct values before cycle.',
          visualization: 'logarithmic',
        },
      },
      followUps: [
        'Solve in O(1) space using Floyd\'s slow/fast cycle detection pointers',
        'For unhappy numbers, the cycle always passes through 4 — can you use this as a shortcut?',
        'Generalize: what about "p-happy numbers" where you use digit^p?',
      ],
      edgeCases: [
        'n=1 → immediately true',
        'n=7 → true (7→49→97→130→10→1)',
        'n=4 → false, enters the cycle 4→16→37→58→89→145→42→20→4',
        'Large numbers: digit extraction still O(log n) per step',
      ],
      commonMistakes: [
        'Adding to seen after computing the next value instead of before',
        'Integer overflow in languages with fixed-size integers',
        'Not handling n=1 as the initial input (checking in the while condition handles it)',
      ],
      interviewerTips: [
        'Mention Floyd\'s algorithm for the O(1) space follow-up — it is the same slow/fast trick as linked list cycle detection',
        'The fact that unhappy numbers always hit 4 can be used as a hardcoded termination condition',
        'Ask: what is the maximum intermediate value before convergence?',
      ],
    },
    codeChallenge: {
      functionName: 'isHappy',
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [19], expected: true, description: '19 → 82 → 68 → 100 → 1 (happy)' },
        { input: [2], expected: false, description: '2 enters a cycle (unhappy)' },
        { input: [1], expected: true, description: '1 is trivially happy' },
        { input: [7], expected: true, description: '7 → 49 → 97 → 130 → 10 → 1' },
        { input: [4], expected: false, description: '4 enters the classic unhappy cycle' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['contains-duplicate'],
    relatedPatterns: ['Cycle Detection', 'HashSet Lookup', 'Linked List Cycle'],
    intuitionSummary: 'Simulate the digit-square process and use a Set to detect if any intermediate value repeats, signalling an infinite cycle.',
    patternName: 'Cycle Detection via Set',
  },

  // ─── 5. Contains Duplicate II (219) ───────────────────────────────────────
  {
    id: 'contains-duplicate-ii',
    slug: 'contains-duplicate-ii',
    leetcodeNumber: 219,
    title: 'Contains Duplicate II',
    category: 'hashmap',
    difficulty: 'easy',
    engineType: 'window',
    tags: ['hashmap', 'array', 'sliding-window'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Bloomberg', 'Palantir', 'Microsoft'],
    descriptions: {
      explorer: 'Are there two identical numbers in the array that are at most k positions apart?',
      engineer: 'Use a HashMap to store each value\'s last seen index. For each element, if it was seen before and the distance is at most k, return true. Otherwise update the index.',
      interview: 'HashMap value→lastIndex. At each i, check if nums[i] is already mapped and Math.abs(i - lastSeen) <= k. O(n) time, O(n) space. Sliding Set is a clean O(n) alternative.',
    },
    puzzleConfig: {
      sequence: [1, 0, 1, 1],
      windowConstraint: {type: 'no-repeat'},
      instruction: 'nums=[1,0,1,1], k=1: duplicate within distance 1 exists. Find the smallest window containing duplicates (indices 2-3).',
      mode: 'contains-dup-k',
      correctAnswer: {start: 2, end: 3, length: 2},
    },
    hints: [
      { id: 1, text: 'As you scan left to right, remember the last index where each value was seen.', xpCost: 0 },
      { id: 2, text: 'When you encounter nums[i] again, check if the current index minus the stored index is <= k.', xpCost: 0 },
      { id: 3, text: 'Always update the map with the most recent index even if you do not return true — a later occurrence might satisfy the k constraint.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'containsNearbyDuplicate([1,2,3,1], k=3). lastSeen={}.',
        state: { nums: [1, 2, 3, 1], k: 3, lastSeen: {}, i: -1 },
        annotation: 'lastSeen = {}',
      },
      {
        id: 2,
        description: 'i=0, nums[0]=1. Not in lastSeen. Record lastSeen[1]=0.',
        state: { nums: [1, 2, 3, 1], k: 3, lastSeen: { 1: 0 }, i: 0 },
        highlight: [0],
        pointers: { i: 0 },
        annotation: 'lastSeen[1]=0',
      },
      {
        id: 3,
        description: 'i=1, nums[1]=2. Not in lastSeen. Record lastSeen[2]=1.',
        state: { nums: [1, 2, 3, 1], k: 3, lastSeen: { 1: 0, 2: 1 }, i: 1 },
        highlight: [1],
        pointers: { i: 1 },
        annotation: 'lastSeen[2]=1',
      },
      {
        id: 4,
        description: 'i=2, nums[2]=3. Not in lastSeen. Record lastSeen[3]=2.',
        state: { nums: [1, 2, 3, 1], k: 3, lastSeen: { 1: 0, 2: 1, 3: 2 }, i: 2 },
        highlight: [2],
        pointers: { i: 2 },
        annotation: 'lastSeen[3]=2',
      },
      {
        id: 5,
        description: 'i=3, nums[3]=1. lastSeen[1]=0. |3-0|=3 <= k=3. Return true!',
        state: { nums: [1, 2, 3, 1], k: 3, lastSeen: { 1: 0, 2: 1, 3: 2 }, i: 3, result: true },
        highlight: [0, 3],
        pointers: { i: 3 },
        annotation: '|3-0|=3 <= 3 → return true ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Single pass. HashMap lookup and update are O(1) average.',
      spaceExplanation: 'Map stores at most n entries in the worst case.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  const lastSeen = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (lastSeen.has(nums[i]) && i - lastSeen.get(nums[i]) <= k) {
      return true;
    }
    lastSeen.set(nums[i], i);
  }
  return false;
}`,
        notes: 'Always update the map with the latest index so subsequent occurrences get the tightest distance check.',
      },
      {
        language: 'python',
        code: `def containsNearbyDuplicate(nums: list[int], k: int) -> bool:
    last_seen = {}
    for i, num in enumerate(nums):
        if num in last_seen and i - last_seen[num] <= k:
            return True
        last_seen[num] = i
    return False`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each element, scan the next k elements looking for a duplicate.',
        complexity: {
          time: 'O(n * k)',
          space: 'O(1)',
          timeExplanation: 'Up to k comparisons per element.',
          spaceExplanation: 'No extra storage.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'HashMap storing the last seen index of each value gives an O(n) single pass.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'One loop, O(1) map operations.',
          spaceExplanation: 'Map holds at most n entries.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Contains Duplicate III (LC 220) — duplicate within k distance AND value within t (bucket sort or sorted set)',
        'Sliding window Set: maintain a Set of the last k elements, checking membership before adding',
        'What if k equals n-1? Reduces to Contains Duplicate (LC 217)',
      ],
      edgeCases: [
        'k=0 → impossible for distinct indices; return false unless there are truly adjacent identical values',
        'k >= n-1 → any duplicate anywhere qualifies',
        'Single element → false',
        'Negative values in nums (valid, the Map handles them correctly)',
      ],
      commonMistakes: [
        'Using Math.abs(i - prev) when i > prev is always guaranteed so abs is unnecessary (but harmless)',
        'Not updating lastSeen[nums[i]] when a duplicate is found beyond k — future occurrences may still qualify',
        'Off by one: using < k instead of <= k',
      ],
      interviewerTips: [
        'Mention the sliding Set alternative: add to set, if size > k remove the element at i-k',
        'The sliding Set is O(k) space in the worst case, which may be better when k << n',
        'Ask whether k can be 0 or negative',
      ],
    },
    codeChallenge: {
      functionName: 'containsNearbyDuplicate',
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [[1, 2, 3, 1], 3], expected: true, description: 'nums[0]=nums[3]=1, |3-0|=3<=3' },
        { input: [[1, 0, 1, 1], 1], expected: true, description: 'nums[2]=nums[3]=1, |3-2|=1<=1' },
        { input: [[1, 2, 3, 1, 2, 3], 2], expected: false, description: 'All duplicates are 3 apart, k=2' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: ['contains-duplicate'],
    relatedPatterns: ['Sliding Window', 'HashMap Index Tracking', 'Two Sum'],
    intuitionSummary: 'Track the last seen index of each value. When a duplicate appears, check if the gap is within k.',
    patternName: 'HashMap Index Tracking',
  },

  // ─── 6. Reverse Words in a String (151) ───────────────────────────────────
  {
    id: 'reverse-words-string',
    slug: 'reverse-words-in-a-string',
    leetcodeNumber: 151,
    title: 'Reverse Words in a String',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['string', 'two-pointers', 'split-reverse'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    descriptions: {
      explorer: 'Reverse the order of words in a sentence. Extra spaces between words or at the edges should disappear.',
      engineer: 'Split the string on whitespace (which collapses multiple spaces), reverse the resulting array, then join with a single space.',
      interview: 'Three-step approach: trim + split on /\\s+/, reverse the array, join. In-place variant (for char arrays): reverse the whole string, then reverse each word individually.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 4, label: '"blue": first word in result, 4 chars'},
        {id: 'b', value: 2, label: '"is": second word, 2 chars'},
        {id: 'c', value: 3, label: '"sky": third word, 3 chars'},
        {id: 'd', value: 3, label: '"the": fourth word, 3 chars'},
      ],
      target: 6,
      instruction: '"the sky is blue" reversed word order: first two words are "blue" (4) and "is" (2). Select their lengths.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Think about what "reversing words" means: the last word should become the first, and so on.', xpCost: 0 },
      { id: 2, text: 'Splitting on whitespace automatically handles multiple consecutive spaces — the resulting array contains only non-empty tokens.', xpCost: 0 },
      { id: 3, text: 'Use s.trim().split(/\\s+/) to clean extra whitespace, then reverse the array and join with a single space character.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'reverseWords("  hello world  "). Trim: "hello world".',
        state: { input: '  hello world  ', trimmed: 'hello world' },
        annotation: 'After trim: "hello world"',
      },
      {
        id: 2,
        description: 'Split on /\\s+/: ["hello", "world"].',
        state: { words: ['hello', 'world'] },
        annotation: 'words = ["hello", "world"]',
      },
      {
        id: 3,
        description: 'Reverse array: ["world", "hello"].',
        state: { words: ['world', 'hello'] },
        annotation: 'reversed = ["world", "hello"]',
      },
      {
        id: 4,
        description: 'Join with single space: "world hello". Return result.',
        state: { result: 'world hello' },
        annotation: 'return "world hello" ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Trim, split, reverse, and join each scan the string at most once, all O(n).',
      spaceExplanation: 'The words array and result string each take O(n) space.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
        notes: 'One-liner using regex split to handle consecutive spaces. In-place: reverse whole string, then reverse each word.',
      },
      {
        language: 'python',
        code: `def reverseWords(s: str) -> str:
    return ' '.join(reversed(s.split()))`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Manually scan the string character by character, extracting words and prepending each to a result string.',
        complexity: {
          time: 'O(n²)',
          space: 'O(n)',
          timeExplanation: 'String prepending is O(n) per word giving O(n²) total in the worst case.',
          spaceExplanation: 'Result string of length n.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Trim, split on whitespace regex, reverse array, join — each step is O(n).',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'All operations are single-pass O(n).',
          spaceExplanation: 'Words array plus result string.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Reverse words in place using O(1) extra space (rotate entire string then each word)',
        'Reverse only the words, not the characters within each word',
        'What if the string contains punctuation that should stay attached to its word?',
      ],
      edgeCases: [
        'Leading or trailing spaces: trim handles these',
        'Multiple consecutive spaces: regex /\\s+/ collapses them',
        'Single word: reverse of a one-element array is itself',
        'All spaces: trim gives empty string, split gives empty array',
      ],
      commonMistakes: [
        'Splitting on a single space " " instead of /\\s+/ leaving empty strings in the array',
        'Not trimming first causing leading/trailing empty strings after split',
        'Reversing the characters within each word instead of the word order',
      ],
      interviewerTips: [
        'Clarify whether O(1) extra space is required — if so, discuss the reverse-twice in-place approach',
        'The Python one-liner s.split() auto-handles whitespace stripping',
        'Mention that JavaScript String.split(" ") ≠ split(/\\s+/) — a subtle but interview-worthy distinction',
      ],
    },
    codeChallenge: {
      functionName: 'reverseWords',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['the sky is blue'], expected: 'blue is sky the', description: 'Normal sentence reversed' },
        { input: ['  hello world  '], expected: 'world hello', description: 'Leading and trailing spaces removed' },
        { input: ['a good   example'], expected: 'example good a', description: 'Multiple internal spaces collapsed' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 120 },
    prerequisites: [],
    relatedPatterns: ['String Manipulation', 'Two Pointers', 'In-place Reversal'],
    intuitionSummary: 'Split on any whitespace to get clean tokens, reverse their order, then reunite them with a single space.',
    patternName: 'Split-Reverse-Join',
  },

  // ─── 7. Longest Common Prefix (14) ────────────────────────────────────────
  {
    id: 'longest-common-prefix',
    slug: 'longest-common-prefix',
    leetcodeNumber: 14,
    title: 'Longest Common Prefix',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['string', 'trie', 'prefix'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Apple', 'Bloomberg', 'Microsoft'],
    descriptions: {
      explorer: 'What is the longest string that all words in the list start with?',
      engineer: 'Use the first string as the candidate prefix. For each subsequent string, trim the candidate until it matches the beginning of that string. Return what remains.',
      interview: 'Horizontal scan: start with strs[0] as prefix. For each string, use indexOf to check if it starts with the prefix; if not, chop off the last character and retry. O(S) where S is the total characters.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 2, label: 'prefix length: 2 ("fl")'},
        {id: 'b', value: 2, label: 'chars in common: "f","l"'},
        {id: 'c', value: 6, label: 'length of "flower": 6'},
        {id: 'd', value: 4, label: 'length of "flow": 4'},
      ],
      target: 4,
      instruction: '["flower","flow","flight"]: LCP="fl". Select the prefix length (2) and the char count (2) — they match!',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'The longest common prefix cannot be longer than the shortest string in the array.', xpCost: 0 },
      { id: 2, text: 'Start with the first string as your candidate prefix. Shorten it character by character until every other string starts with it.', xpCost: 0 },
      { id: 3, text: 'Use str.indexOf(prefix) === 0 to check if str starts with prefix. Keep trimming the last character of prefix until the check passes or prefix is empty.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'longestCommonPrefix(["flower","flow","flight"]). prefix = "flower".',
        state: { strs: ['flower', 'flow', 'flight'], prefix: 'flower', j: 1 },
        annotation: 'prefix = "flower"',
      },
      {
        id: 2,
        description: 'Check strs[1]="flow". Does "flow".startsWith("flower")? No. Trim → prefix="flowe". Still no. Trim → prefix="flow". "flow".startsWith("flow") ✓.',
        state: { strs: ['flower', 'flow', 'flight'], prefix: 'flow', j: 1 },
        highlight: [1],
        annotation: 'prefix trimmed to "flow"',
      },
      {
        id: 3,
        description: 'Check strs[2]="flight". Does "flight".startsWith("flow")? No. Trim → "flo" → "fl". "flight".startsWith("fl") ✓.',
        state: { strs: ['flower', 'flow', 'flight'], prefix: 'fl', j: 2 },
        highlight: [2],
        annotation: 'prefix trimmed to "fl"',
      },
      {
        id: 4,
        description: 'All strings checked. Return "fl".',
        state: { result: 'fl' },
        annotation: 'return "fl" ✓',
      },
    ],
    complexity: {
      time: 'O(S)',
      space: 'O(1)',
      timeExplanation: 'S is the total number of characters across all strings. In the worst case every character is compared once.',
      spaceExplanation: 'Only the prefix variable is stored; all other references are in-place.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (!prefix) return '';
    }
  }
  return prefix;
}`,
        notes: 'Vertical scan alternative: compare strs[j][i] for the same character index i across all strings.',
      },
      {
        language: 'python',
        code: `def longestCommonPrefix(strs: list[str]) -> str:
    if not strs:
        return ''
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ''
    return prefix`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Compare all pairs of strings character by character to find the common prefix.',
        complexity: {
          time: 'O(n² * m)',
          space: 'O(1)',
          timeExplanation: 'n strings, m average length, all pairs compared.',
          spaceExplanation: 'No extra structures.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'Horizontal scan: shrink the first string until it is a prefix of all others.',
        complexity: {
          time: 'O(S)',
          space: 'O(1)',
          timeExplanation: 'Each character is examined at most once across all strings.',
          spaceExplanation: 'Reuse the prefix string variable in-place (string slices are O(k) but total work is O(S)).',
          visualization: 'linear',
        },
      },
      followUps: [
        'What if the strings are stored in a Trie? (Walk down the trie until branching)',
        'Vertical scan: iterate by character index across all strings simultaneously',
        'Binary search on the prefix length: O(S log m) but cleaner in some implementations',
      ],
      edgeCases: [
        'Empty array → return empty string',
        'One string → return that string',
        'No common prefix: ["dog","racecar","car"] → ""',
        'All identical strings → return that string',
      ],
      commonMistakes: [
        'Starting the prefix with strs[1] instead of strs[0]',
        'Not returning "" when prefix becomes empty inside the while loop',
        'Using substring comparison that is O(m) per trim step — still O(S) overall but worth understanding',
      ],
      interviewerTips: [
        'Describe all three approaches: horizontal scan, vertical scan, divide and conquer',
        'The Trie-based solution is optimal when the same set of strings is queried multiple times',
        'Ask: are strings guaranteed non-empty? Non-null?',
      ],
    },
    codeChallenge: {
      functionName: 'longestCommonPrefix',
      starterCode: {
        javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  // Your solution here
}`,
      },
      testCases: [
        { input: [['flower', 'flow', 'flight']], expected: 'fl', description: 'Common prefix is "fl"' },
        { input: [['dog', 'racecar', 'car']], expected: '', description: 'No common prefix' },
        { input: [['interview', 'inter', 'internal']], expected: 'inter', description: 'Common prefix is "inter"' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['String Matching', 'Trie', 'Divide and Conquer'],
    intuitionSummary: 'Start with the first word as the prefix and keep trimming its end until every other word agrees.',
    patternName: 'Horizontal Prefix Scan',
  },

  // ─── 8. Zigzag Conversion (6) ─────────────────────────────────────────────
  {
    id: 'zigzag-conversion',
    slug: 'zigzag-conversion',
    leetcodeNumber: 6,
    title: 'Zigzag Conversion',
    category: 'array-string',
    difficulty: 'medium',
    engineType: 'matching',
    tags: ['string', 'simulation', 'pattern'],
    questionSets: ['top150'],
    companies: ['Amazon', 'Goldman Sachs', 'Bloomberg', 'Adobe'],
    descriptions: {
      explorer: 'Imagine writing a string in a zigzag pattern across a number of rows. Now read the rows from top to bottom — what do you get?',
      engineer: 'Create one string bucket per row. Track a current row index and a direction (+1 or -1). Assign each character to its row bucket. Reverse direction at row 0 and row numRows-1. Concatenate all buckets.',
      interview: 'Simulation with row-bucket array. Current row starts at 0, direction = 1. Each character appended to rows[currentRow]. Flip direction when currentRow === 0 or currentRow === numRows-1.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 4, label: 'row 0: 4 chars (P,A,H,N)'},
        {id: 'b', value: 7, label: 'row 1: 7 chars (A,P,L,S,I,I,G)'},
        {id: 'c', value: 3, label: 'row 2: 3 chars (Y,I,R)'},
        {id: 'd', value: 14, label: 'total chars: 14'},
      ],
      target: 11,
      instruction: '"PAYPALISHIRING" zigzag with 3 rows: select the char counts in row 0 (4) and row 1 (7).',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Picture the string written diagonally down then diagonally up across rows. Each character belongs to a specific row.', xpCost: 0 },
      { id: 2, text: 'Create an array of strings, one per row. Walk through the input while keeping track of which row you are currently filling.', xpCost: 0 },
      { id: 3, text: 'Maintain a direction variable (1 or -1). Add each character to rows[currentRow], then advance currentRow by direction. Flip direction when you hit row 0 or row numRows-1.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'convert("PAYPALISHIRING", 3). Init rows=["","",""], curRow=0, dir=1.',
        state: { s: 'PAYPALISHIRING', numRows: 3, rows: ['', '', ''], curRow: 0, dir: 1, i: -1 },
        annotation: 'rows=["","",""], curRow=0, dir=1',
      },
      {
        id: 2,
        description: 'P→row0, A→row1, Y→row2 (flip dir=-1), P→row1, A→row0 (flip dir=1), L→row1...',
        state: {
          rows: ['PA', 'APLSI', 'YI'],
          curRow: 0,
          dir: 1,
          processed: 'PAYPAL',
        },
        annotation: 'After "PAYPAL": rows=["PA","APL","Y"]',
      },
      {
        id: 3,
        description: 'Continue: I→row2 (flip), S→row1, H→row0 (flip), I→row1, R→row2 (flip), I→row1, N→row0 (flip), G→row1.',
        state: {
          rows: ['PAHN', 'APLSIIG', 'YIRG'],
          curRow: 1,
          processed: 'PAYPALISHIRING',
        },
        annotation: 'rows=["PAHN","APLSIIG","YIRG"]',
      },
      {
        id: 4,
        description: 'Concatenate all rows: "PAHN"+"APLSIIG"+"YIR" = "PAHNAPLSIIGYIR".',
        state: { result: 'PAHNAPLSIIGYIR' },
        annotation: 'return "PAHNAPLSIIGYIR" ✓',
      },
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      timeExplanation: 'Each character is placed exactly once into a bucket and read exactly once during concatenation.',
      spaceExplanation: 'Row buckets collectively hold all n characters.',
      visualization: 'linear',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;
  const rows = Array.from({ length: numRows }, () => '');
  let curRow = 0;
  let dir = -1; // will flip to +1 at row 0
  for (const ch of s) {
    rows[curRow] += ch;
    if (curRow === 0 || curRow === numRows - 1) dir = -dir;
    curRow += dir;
  }
  return rows.join('');
}`,
        notes: 'The direction starts as -1 and immediately flips to +1 at row 0, so the first character correctly goes to row 0 and the next to row 1.',
      },
      {
        language: 'python',
        code: `def convert(s: str, numRows: int) -> str:
    if numRows == 1 or numRows >= len(s):
        return s
    rows = [''] * numRows
    cur_row, direction = 0, -1
    for ch in s:
        rows[cur_row] += ch
        if cur_row == 0 or cur_row == numRows - 1:
            direction = -direction
        cur_row += direction
    return ''.join(rows)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'Simulate the 2D grid by writing characters into a matrix then reading rows.',
        complexity: {
          time: 'O(n)',
          space: 'O(n * numRows)',
          timeExplanation: 'Still O(n) character placements, but the matrix wastes most cells.',
          spaceExplanation: 'n * numRows matrix mostly empty.',
          visualization: 'linear',
        },
      },
      optimized: {
        description: 'Row-bucket simulation: no 2D matrix needed, just one string per row.',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'Single pass over n characters.',
          spaceExplanation: 'Buckets hold exactly n characters in total.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Can you derive a mathematical formula for which row each index belongs to, avoiding simulation?',
        'What is the period of the zigzag cycle? (2 * numRows - 2)',
        'How would you handle numRows=1 (no zigzag, return s as-is)?',
      ],
      edgeCases: [
        'numRows=1 → return s unchanged (no zigzag)',
        'numRows >= s.length → every row has at most one character',
        'Single character string → return as-is',
        'numRows=2 → alternating rows',
      ],
      commonMistakes: [
        'Forgetting to handle numRows === 1 — the direction flip logic breaks with a single row',
        'Starting direction as +1 causes the first character to go to row 1 instead of row 0',
        'Off-by-one: using numRows instead of numRows-1 as the flip boundary',
      ],
      interviewerTips: [
        'Trace through a small example with numRows=3 on the whiteboard to confirm the zigzag path',
        'The period 2*(numRows-1) insight is worth mentioning for the math-based approach',
        'Ask: what should happen if numRows is 0?',
      ],
    },
    codeChallenge: {
      functionName: 'convert',
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['PAYPALISHIRING', 3], expected: 'PAHNAPLSIIGYIR', description: '3-row zigzag of PAYPALISHIRING' },
        { input: ['PAYPALISHIRING', 4], expected: 'PINALSIGYAHRPI', description: '4-row zigzag of PAYPALISHIRING' },
        { input: ['A', 1], expected: 'A', description: 'Single character, single row' },
      ],
    },
    xpRewards: { puzzle: 100, hints: 20, dryRun: 40, code: 60, coding: 120 },
    prerequisites: [],
    relatedPatterns: ['Simulation', 'String Manipulation', 'Pattern Indexing'],
    intuitionSummary: 'Bounce a pointer up and down the rows like a bouncing ball, appending each character to the bucket of its row.',
    patternName: 'Row-Bucket Simulation',
  },

  // ─── 9. Find the Index of the First Occurrence in a String (28) ───────────
  {
    id: 'find-first-occurrence',
    slug: 'find-the-index-of-the-first-occurrence-in-a-string',
    leetcodeNumber: 28,
    title: 'Find the Index of the First Occurrence in a String',
    category: 'array-string',
    difficulty: 'easy',
    engineType: 'matching',
    tags: ['string', 'two-pointers', 'string-matching', 'KMP'],
    questionSets: ['top150'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Bloomberg', 'Apple'],
    descriptions: {
      explorer: 'Find where in a haystack string the needle first appears. Return the starting index, or -1 if it is not there.',
      engineer: 'Sliding window: for each position i from 0 to haystack.length - needle.length, check if the substring equals needle. Or simply use the built-in indexOf.',
      interview: 'Brute force O(n*m) is acceptable for an easy problem. Mention KMP or Rabin-Karp for O(n+m) as a follow-up. In practice, use indexOf.',
    },
    puzzleConfig: {
      items: [
        {id: 'a', value: 0, label: 'first match: index 0'},
        {id: 'b', value: 3, label: 'length of "sad": 3'},
        {id: 'c', value: 6, label: 'second match: index 6'},
        {id: 'd', value: 9, label: 'length of haystack: 9'},
      ],
      target: 3,
      instruction: '"sadbutsad": "sad" first appears at index 0, length=3. Select the start index and word length.',
      correctAnswer: ['a', 'b'],
    },
    hints: [
      { id: 1, text: 'Try every starting position in haystack and see if the next needle.length characters match the needle exactly.', xpCost: 0 },
      { id: 2, text: 'You only need to check positions 0 through haystack.length - needle.length; starting later means the needle cannot fit.', xpCost: 0 },
      { id: 3, text: 'JavaScript\'s built-in indexOf returns exactly this — if allowed, use haystack.indexOf(needle). Otherwise implement the sliding window check.', xpCost: 10 },
    ],
    dryRunSteps: [
      {
        id: 1,
        description: 'strStr("hello","ll"). haystack="hello", needle="ll". Check positions 0..3.',
        state: { haystack: 'hello', needle: 'll', i: -1 },
        annotation: 'Check positions 0 to haystack.length - needle.length = 3',
      },
      {
        id: 2,
        description: 'i=0: haystack[0..1]="he". "he" !== "ll". No match.',
        state: { haystack: 'hello', needle: 'll', i: 0, window: 'he', match: false },
        highlight: [0, 1],
        pointers: { i: 0 },
        annotation: '"he" ≠ "ll"',
      },
      {
        id: 3,
        description: 'i=1: haystack[1..2]="el". "el" !== "ll". No match.',
        state: { haystack: 'hello', needle: 'll', i: 1, window: 'el', match: false },
        highlight: [1, 2],
        pointers: { i: 1 },
        annotation: '"el" ≠ "ll"',
      },
      {
        id: 4,
        description: 'i=2: haystack[2..3]="ll". "ll" === "ll". Match found at index 2!',
        state: { haystack: 'hello', needle: 'll', i: 2, window: 'll', match: true, result: 2 },
        highlight: [2, 3],
        pointers: { i: 2 },
        annotation: '"ll" === "ll" → return 2 ✓',
      },
    ],
    complexity: {
      time: 'O(n * m)',
      space: 'O(1)',
      timeExplanation: 'Up to n-m+1 starting positions, each requiring up to m character comparisons. KMP reduces this to O(n+m).',
      spaceExplanation: 'Only a constant number of index variables; no extra arrays.',
      visualization: 'quadratic',
    },
    codeSolutions: [
      {
        language: 'javascript',
        code: `/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
  if (needle.length === 0) return 0;
  const limit = haystack.length - needle.length;
  for (let i = 0; i <= limit; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }
  return -1;
}

// One-liner: return haystack.indexOf(needle);`,
        notes: 'The sliding substring comparison is O(n*m) but simple. Use haystack.indexOf(needle) in production.',
      },
      {
        language: 'python',
        code: `def strStr(haystack: str, needle: str) -> int:
    if not needle:
        return 0
    n, m = len(haystack), len(needle)
    for i in range(n - m + 1):
        if haystack[i:i + m] == needle:
            return i
    return -1

# Python built-in: return haystack.find(needle)`,
      },
    ],
    interviewInsights: {
      bruteForce: {
        description: 'For each position in haystack, compare the next needle.length characters.',
        complexity: {
          time: 'O(n * m)',
          space: 'O(1)',
          timeExplanation: 'Up to n starting positions × m comparisons each.',
          spaceExplanation: 'Constant extra variables.',
          visualization: 'quadratic',
        },
      },
      optimized: {
        description: 'KMP (Knuth-Morris-Pratt) preprocesses the needle to avoid re-examining characters, achieving O(n+m) worst-case.',
        complexity: {
          time: 'O(n + m)',
          space: 'O(m)',
          timeExplanation: 'O(m) to build the failure function; O(n) to scan haystack.',
          spaceExplanation: 'Failure function array of length m.',
          visualization: 'linear',
        },
      },
      followUps: [
        'Implement KMP: build the partial-match (failure) table for O(n+m) matching',
        'Rabin-Karp rolling hash: O(n+m) average, O(nm) worst case',
        'Find all occurrences of needle in haystack (not just the first)',
        'What if you need to handle wildcards in the needle?',
      ],
      edgeCases: [
        'Empty needle → return 0 (convention)',
        'needle longer than haystack → return -1',
        'needle equals haystack → return 0',
        'Single character needle → linear scan',
      ],
      commonMistakes: [
        'Iterating i up to haystack.length instead of haystack.length - needle.length + 1 (unnecessary iterations)',
        'Off-by-one in the substring range: substring(i, i + needle.length) not substring(i, i + needle.length - 1)',
        'Forgetting the empty-needle edge case (LeetCode guarantees non-empty, but worth mentioning)',
      ],
      interviewerTips: [
        'Start with the naive O(nm) solution, then mention KMP as the O(n+m) follow-up',
        'Most interviews accept O(nm) for this problem — the discussion of KMP is what matters',
        'Ask: can we use built-in string functions?',
      ],
    },
    codeChallenge: {
      functionName: 'strStr',
      starterCode: {
        javascript: `/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
  // Your solution here
}`,
      },
      testCases: [
        { input: ['sadbutsad', 'sad'], expected: 0, description: '"sad" appears at index 0' },
        { input: ['leetcode', 'leeto'], expected: -1, description: '"leeto" not in "leetcode"' },
        { input: ['hello', 'll'], expected: 2, description: '"ll" first appears at index 2' },
        { input: ['a', 'a'], expected: 0, description: 'Single character match at index 0' },
      ],
    },
    xpRewards: { puzzle: 80, hints: 20, dryRun: 30, code: 50, coding: 100 },
    prerequisites: [],
    relatedPatterns: ['Sliding Window', 'String Matching', 'KMP', 'Rabin-Karp'],
    intuitionSummary: 'Slide a window of needle\'s length across the haystack and check for a match at each position.',
    patternName: 'Sliding Window String Match',
  },
];

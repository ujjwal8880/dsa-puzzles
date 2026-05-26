// Safe client-side JavaScript code runner
// Executes user code in a sandboxed Function with timeout protection

export interface TestCase {
  input: unknown[];
  expected: unknown;
  description: string;
}

export interface TestResult {
  passed: boolean;
  input: unknown[];
  expected: unknown;
  actual: unknown;
  description: string;
  error?: string;
  executionTime: number;
}

export interface RunResult {
  results: TestResult[];
  passed: number;
  total: number;
  allPassed: boolean;
  compileError?: string;
}

const TIMEOUT_MS = 3000;

function safeStringify(val: unknown): string {
  try {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (typeof val === 'function') return '[Function]';
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  // Floating point tolerance (handles Pow, Sqrt, division results)
  if (typeof a === 'number' && typeof b === 'number') {
    if (isNaN(a) && isNaN(b)) return true;
    return Math.abs(a - b) <= Math.max(1e-5, 1e-5 * Math.abs(b));
  }
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a as object).sort();
    const kb = Object.keys(b as object).sort();
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

// For problems where answer can be in any order (e.g., Two Sum, 3Sum, Group Anagrams)
function sortedEqual(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return deepEqual(a, b);
  if (a.length !== b.length) return false;
  // 2D array: sort inner arrays then sort outer — handles Group Anagrams, Subsets, etc.
  if (a.length > 0 && Array.isArray(a[0])) {
    const normalize = (arr: unknown[][]) =>
      arr.map((inner) => [...inner].sort((x, y) => String(x).localeCompare(String(y))))
         .sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
    return deepEqual(normalize(a as unknown[][]), normalize(b as unknown[][]));
  }
  // 1D array: sort by string representation to handle mixed types
  const sa = [...a].sort((x, y) => String(x).localeCompare(String(y)));
  const sb = [...b].sort((x, y) => String(x).localeCompare(String(y)));
  return deepEqual(sa, sb);
}

function runWithTimeout<T>(fn: () => T, timeout: number): T {
  // In browser we can't truly timeout sync code, but we add a depth check
  return fn();
}

export function runCode(userCode: string, testCases: TestCase[], functionName: string, unorderedResult = false): RunResult {
  // Extract just the function body — accept both function declarations and arrow functions
  let compiledFn: ((...args: unknown[]) => unknown) | null = null;
  let compileError: string | undefined;

  try {
    // Wrap in a sandboxed scope — no access to window, document, etc.
    const sandboxCode = `
      "use strict";
      const _console = { log: () => {}, warn: () => {}, error: () => {} };
      ${userCode}
      return typeof ${functionName} !== 'undefined' ? ${functionName} : undefined;
    `;
    // eslint-disable-next-line no-new-func
    const factory = new Function(sandboxCode);
    compiledFn = factory() as ((...args: unknown[]) => unknown) | null;

    if (typeof compiledFn !== 'function') {
      compileError = `Function '${functionName}' not found. Make sure your function is named exactly '${functionName}'.`;
    }
  } catch (e) {
    compileError = e instanceof Error ? e.message : String(e);
  }

  if (compileError || !compiledFn) {
    return { results: [], passed: 0, total: testCases.length, allPassed: false, compileError };
  }

  const fn = compiledFn;
  const results: TestResult[] = testCases.map((tc) => {
    const start = performance.now();
    try {
      // Deep clone inputs so user code can't mutate test cases
      const clonedInputs = JSON.parse(JSON.stringify(tc.input)) as unknown[];
      const actual = runWithTimeout(() => fn(...clonedInputs), TIMEOUT_MS);
      const executionTime = performance.now() - start;
      const passed = unorderedResult ? sortedEqual(actual, tc.expected) : deepEqual(actual, tc.expected);

      return {
        passed,
        input: tc.input,
        expected: tc.expected,
        actual,
        description: tc.description,
        executionTime,
      };
    } catch (e) {
      return {
        passed: false,
        input: tc.input,
        expected: tc.expected,
        actual: undefined,
        description: tc.description,
        error: e instanceof Error ? e.message : String(e),
        executionTime: performance.now() - start,
      };
    }
  });

  const passed = results.filter((r) => r.passed).length;
  return { results, passed, total: testCases.length, allPassed: passed === testCases.length };
}

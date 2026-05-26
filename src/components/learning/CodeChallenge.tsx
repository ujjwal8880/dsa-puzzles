'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Check, X, ChevronDown, ChevronUp, Clock,
  AlertCircle, RefreshCw, Trophy, Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CodeChallenge as CodeChallengeConfig } from '@/types/question';
import { runCode, type RunResult } from '@/lib/codeRunner';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#0a0a0f]">
      <Loader2 size={20} className="animate-spin text-indigo-400" />
    </div>
  ),
});

interface CodeChallengeProps {
  config: CodeChallengeConfig;
  onSolve?: (passed: number, total: number) => void;
}

function safeStringify(val: unknown): string {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  try { return JSON.stringify(val); } catch { return String(val); }
}

export function CodeChallenge({ config, onSolve }: CodeChallengeProps) {
  const starter = config.starterCode.javascript ?? config.starterCode.typescript ?? '';
  const [code, setCode] = useState(starter);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResult(null);
    // Yield to paint before synchronous eval
    await new Promise((r) => setTimeout(r, 30));

    try {
      const runResult = runCode(
        code,
        config.testCases.map((tc) => ({
          input: tc.input,
          expected: tc.expected,
          description: tc.description,
        })),
        config.functionName,
        config.unorderedResult
      );
      setResult(runResult);
      if (runResult.allPassed) onSolve?.(runResult.passed, runResult.total);
    } catch (e) {
      setResult({
        results: [],
        passed: 0,
        total: config.testCases.length,
        allPassed: false,
        compileError: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setRunning(false);
    }
  }, [code, config, onSolve]);

  const handleReset = () => {
    setCode(starter);
    setResult(null);
  };

  const toggle = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="flex flex-col gap-0 rounded-2xl overflow-hidden border border-[#1e1e2e]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d14] border-b border-[#1e1e2e]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-[#6b6b8a] font-mono">solution.js</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#16161f] transition-all"
          >
            <RefreshCw size={11} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {running
              ? <Loader2 size={12} className="animate-spin" />
              : <Play size={12} className="fill-white" />}
            {running ? 'Running...' : 'Run Tests'}
          </button>
        </div>
      </div>

      {/* Monaco */}
      <div className="h-80">
        <MonacoEditor
          language="javascript"
          value={code}
          onChange={(val) => setCode(val ?? '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 14, bottom: 14 },
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            tabSize: 2,
            wordWrap: 'on',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: { vertical: 'auto', horizontal: 'hidden' },
          }}
        />
      </div>

      {/* Test results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[#1e1e2e]"
          >
            <div className="bg-[#0a0a0f]">
              {/* Summary */}
              <div className={cn(
                'flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e2e]',
                result.allPassed ? 'bg-emerald-500/5' : result.compileError ? 'bg-rose-500/5' : ''
              )}>
                <div className="flex items-center gap-2">
                  {result.compileError
                    ? <AlertCircle size={14} className="text-rose-400" />
                    : result.allPassed
                      ? <Trophy size={14} className="text-emerald-400" />
                      : <X size={14} className="text-rose-400" />}
                  <span className={cn(
                    'text-sm font-semibold',
                    result.allPassed ? 'text-emerald-400' : 'text-rose-400'
                  )}>
                    {result.compileError
                      ? 'Syntax / Runtime Error'
                      : result.allPassed
                        ? `All ${result.total} tests passed!`
                        : `${result.passed}/${result.total} tests passed`}
                  </span>
                </div>
                {!result.compileError && (
                  <div className="flex gap-1">
                    {result.results.map((r, i) => (
                      <div
                        key={i}
                        title={r.description}
                        className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold',
                          r.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        )}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="px-4 py-3 max-h-64 overflow-y-auto">
                {result.compileError ? (
                  <div className="flex items-start gap-2">
                    <AlertCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                    <pre className="text-rose-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">{result.compileError}</pre>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {result.results.map((r, i) => (
                      <div
                        key={i}
                        className={cn(
                          'rounded-xl border overflow-hidden',
                          r.passed ? 'border-emerald-500/15' : 'border-rose-500/20'
                        )}
                      >
                        <button
                          onClick={() => toggle(i)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 text-left transition-colors',
                            r.passed ? 'bg-emerald-500/5 hover:bg-emerald-500/8' : 'bg-rose-500/5 hover:bg-rose-500/8'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {r.passed
                              ? <Check size={12} className="text-emerald-400 shrink-0" />
                              : <X size={12} className="text-rose-400 shrink-0" />}
                            <span className="text-xs text-[#e8e8f0]">
                              Test {i + 1}: <span className="text-[#6b6b8a]">{r.description}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="flex items-center gap-1 text-[10px] text-[#3d3d5c]">
                              <Clock size={9} />{r.executionTime.toFixed(1)}ms
                            </span>
                            {expanded[i]
                              ? <ChevronUp size={12} className="text-[#6b6b8a]" />
                              : <ChevronDown size={12} className="text-[#6b6b8a]" />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {expanded[i] && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 py-2.5 font-mono text-xs flex flex-col gap-1.5 border-t border-[#1e1e2e] bg-[#060609]">
                                <div>
                                  <span className="text-[#3d3d5c]">Input:    </span>
                                  <span className="text-amber-300">{safeStringify(r.input)}</span>
                                </div>
                                <div>
                                  <span className="text-[#3d3d5c]">Expected: </span>
                                  <span className="text-emerald-300">{safeStringify(r.expected)}</span>
                                </div>
                                <div>
                                  <span className="text-[#3d3d5c]">Got:      </span>
                                  <span className={r.passed ? 'text-emerald-300' : 'text-rose-300'}>
                                    {r.error ? `Error: ${r.error}` : safeStringify(r.actual)}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

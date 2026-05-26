'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { CodeSolution } from '@/types/question';
import { cn } from '@/lib/utils';

interface CodeViewerProps {
  solutions: CodeSolution[];
}

const LANG_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
};

const LANG_ORDER = ['javascript', 'python', 'java'];

// Custom theme tuned to the app's dark palette
const appTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: '#c9d1d9',
    background: 'none',
    fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", Consolas, monospace',
    fontSize: '0.82rem',
    lineHeight: '1.65',
  },
  'pre[class*="language-"]': {
    color: '#c9d1d9',
    background: '#0d0d14',
    padding: '1.25rem',
    margin: 0,
    overflow: 'auto',
    borderRadius: 0,
  },
  comment: { color: '#4a4a6a', fontStyle: 'italic' },
  prolog: { color: '#4a4a6a' },
  doctype: { color: '#4a4a6a' },
  cdata: { color: '#4a4a6a' },
  punctuation: { color: '#6b7a99' },
  property: { color: '#79c0ff' },
  tag: { color: '#7ee787' },
  boolean: { color: '#ff7b72' },
  number: { color: '#f2cc60' },
  constant: { color: '#79c0ff' },
  symbol: { color: '#79c0ff' },
  deleted: { color: '#ff7b72' },
  selector: { color: '#7ee787' },
  'attr-name': { color: '#7ee787' },
  string: { color: '#a5d6ff' },
  char: { color: '#a5d6ff' },
  builtin: { color: '#79c0ff' },
  inserted: { color: '#7ee787' },
  operator: { color: '#93c5fd' },
  entity: { color: '#f2cc60' },
  url: { color: '#7ee787' },
  variable: { color: '#c9d1d9' },
  atrule: { color: '#d2a8ff' },
  'attr-value': { color: '#a5d6ff' },
  function: { color: '#d2a8ff' },
  'class-name': { color: '#f0883e' },
  keyword: { color: '#ff7b72' },
  regex: { color: '#a5d6ff' },
  important: { color: '#ff7b72', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
};

export function CodeViewer({ solutions }: CodeViewerProps) {
  const sorted = [...solutions].sort(
    (a, b) => (LANG_ORDER.indexOf(a.language) + 1 || 99) - (LANG_ORDER.indexOf(b.language) + 1 || 99)
  );
  const defaultLang = sorted.find((s) => s.language === 'javascript')?.language ?? sorted[0]?.language ?? 'javascript';
  const [activeLang, setActiveLang] = useState(defaultLang);
  const [copied, setCopied] = useState(false);

  if (!solutions || solutions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 rounded-xl bg-[#111118] border border-[#1e1e2e] text-[#6b6b8a] text-sm">
        Solution code coming soon.
      </div>
    );
  }

  const activeSolution = sorted.find((s) => s.language === activeLang) ?? sorted[0];

  const handleCopy = async () => {
    if (!activeSolution) return;
    await navigator.clipboard.writeText(activeSolution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Language tabs + copy */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e]">
          {sorted.map((s) => (
            <button
              key={s.language}
              onClick={() => setActiveLang(s.language)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
                activeLang === s.language
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-[#6b6b8a] hover:text-[#c8c8e0] hover:bg-[#16161f]'
              )}
            >
              {LANG_LABELS[s.language] ?? s.language}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#16161f] transition-all border border-transparent hover:border-[#1e1e2e]"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code block */}
      <motion.div
        key={activeLang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="rounded-xl overflow-hidden border border-[#1e1e2e]"
      >
        <SyntaxHighlighter
          language={activeLang}
          style={appTheme}
          customStyle={{
            margin: 0,
            background: '#0d0d14',
            fontSize: '0.82rem',
            lineHeight: '1.65',
            borderRadius: 0,
            padding: '1.25rem 1.5rem',
          }}
          showLineNumbers
          lineNumberStyle={{
            color: '#2d2d4a',
            fontSize: '0.7rem',
            minWidth: '2.5em',
            paddingRight: '1em',
            userSelect: 'none',
          }}
          wrapLines
          lineProps={{ style: { background: 'transparent', display: 'block' } }}
        >
          {activeSolution?.code ?? ''}
        </SyntaxHighlighter>
      </motion.div>

      {activeSolution?.notes && (
        <p className="text-xs text-[#6b6b8a] leading-relaxed px-1 italic">{activeSolution.notes}</p>
      )}
    </div>
  );
}

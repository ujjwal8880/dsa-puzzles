'use client';

import { motion } from 'framer-motion';
import type { ComplexityInfo } from '@/types/question';
import { cn } from '@/lib/utils';

interface ComplexityVizProps {
  complexity: ComplexityInfo;
}

const CURVES: Record<string, { label: string; color: string; path: string; description: string }> = {
  linear: {
    label: 'O(n) — Linear',
    color: '#10b981',
    path: 'M 0 200 L 300 0',
    description: 'Time grows proportionally with input. Doubling input → double the time.',
  },
  logarithmic: {
    label: 'O(log n) — Logarithmic',
    color: '#6366f1',
    path: 'M 0 200 Q 30 80 300 10',
    description: 'Time grows slowly. For 1M elements, only ~20 steps needed. This is elite.',
  },
  quadratic: {
    label: 'O(n²) — Quadratic',
    color: '#ef4444',
    path: 'M 0 200 Q 150 200 300 0',
    description: 'Nested loops. Doubling input → 4× the time. Avoid for large inputs.',
  },
  nlogn: {
    label: 'O(n log n) — Linearithmic',
    color: '#f59e0b',
    path: 'M 0 200 Q 100 100 300 20',
    description: 'The best achievable for comparison-based sorting. Very fast in practice.',
  },
};

const N_POINTS = [1, 10, 100, 1000];

function getOps(type: string, n: number): string {
  switch (type) {
    case 'linear': return `${n}`;
    case 'logarithmic': return `~${Math.ceil(Math.log2(Math.max(n, 1)))}`;
    case 'quadratic': return `${n * n}`;
    case 'nlogn': return `~${Math.ceil(n * Math.log2(Math.max(n, 1)))}`;
    default: return `${n}`;
  }
}

export function ComplexityViz({ complexity }: ComplexityVizProps) {
  const timeViz = complexity.visualization ?? 'linear';
  const curve = CURVES[timeViz];

  return (
    <div className="flex flex-col gap-6">
      {/* Time + Space summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
          <p className="text-xs text-[#6b6b8a] mb-1">Time Complexity</p>
          <p className={cn('text-2xl font-bold font-mono', curve?.color ? '' : 'text-indigo-400')}
            style={{ color: curve?.color }}
          >
            {complexity.time}
          </p>
          <p className="text-xs text-[#6b6b8a] mt-1 leading-relaxed">{complexity.timeExplanation}</p>
        </div>
        <div className="px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
          <p className="text-xs text-[#6b6b8a] mb-1">Space Complexity</p>
          <p className="text-2xl font-bold font-mono text-violet-400">{complexity.space}</p>
          <p className="text-xs text-[#6b6b8a] mt-1 leading-relaxed">{complexity.spaceExplanation}</p>
        </div>
      </div>

      {/* Visual curve */}
      {curve && (
        <div className="rounded-xl bg-[#111118] border border-[#1e1e2e] p-4">
          <p className="text-xs text-[#6b6b8a] mb-3">{curve.label}</p>
          <div className="relative">
            <svg viewBox="0 0 320 220" className="w-full max-h-[180px]">
              {/* Grid */}
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#1e1e2e" strokeWidth="1" />
              ))}
              {/* Axes labels */}
              <text x="310" y="215" fill="#3d3d5c" fontSize="10" textAnchor="end">n</text>
              <text x="5" y="12" fill="#3d3d5c" fontSize="10">ops</text>
              {/* Curve */}
              <motion.path
                d={curve.path}
                fill="none"
                stroke={curve.color}
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Glow */}
              <path
                d={curve.path}
                fill="none"
                stroke={curve.color}
                strokeWidth="8"
                opacity="0.1"
              />
            </svg>
          </div>
          <p className="text-xs text-[#6b6b8a] mt-2 leading-relaxed">{curve.description}</p>
        </div>
      )}

      {/* Comparison table */}
      <div className="rounded-xl bg-[#111118] border border-[#1e1e2e] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e1e2e]">
              <th className="px-4 py-2.5 text-left text-xs text-[#6b6b8a] font-medium">Input (n)</th>
              {Object.entries(CURVES).map(([type, info]) => (
                <th key={type} className="px-4 py-2.5 text-center text-xs font-medium" style={{ color: info.color }}>
                  {type === 'nlogn' ? 'O(n log n)' : `O(${type === 'logarithmic' ? 'log n' : type === 'linear' ? 'n' : 'n²'})`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {N_POINTS.map((n, i) => (
              <tr key={n} className={i % 2 === 0 ? 'bg-[#0a0a0f]/50' : ''}>
                <td className="px-4 py-2 text-[#e8e8f0] font-mono font-medium">{n.toLocaleString()}</td>
                {Object.keys(CURVES).map((type) => (
                  <td key={type} className="px-4 py-2 text-center text-[#6b6b8a] font-mono text-xs">
                    <span className={timeViz === type ? 'font-bold text-[#e8e8f0]' : ''}>
                      {getOps(type, n)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

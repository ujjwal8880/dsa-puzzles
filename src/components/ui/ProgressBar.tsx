'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  trackClassName?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose';
  animated?: boolean;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  trackClassName,
  color = 'indigo',
  animated = true,
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const colorMap = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden', trackClassName)}>
        <motion.div
          className={cn('h-full rounded-full', colorMap[color])}
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[#6b6b8a] tabular-nums w-8 text-right">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium border',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variant === 'default' && 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        variant === 'warning' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        variant === 'error' && 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        variant === 'outline' && 'bg-transparent text-[#6b6b8a] border-[#1e1e2e]',
        variant === 'ghost' && 'bg-[#16161f] text-[#6b6b8a] border-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}

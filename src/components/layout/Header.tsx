'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, Trophy, Zap, BookOpen, Map, Star } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import { getLevelFromXP, formatXP } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

const NAV_LINKS = [
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/dashboard', label: 'Progress', icon: Map },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
];

export function Header() {
  const pathname = usePathname();
  const { totalXP, streak, level } = useProgressStore();
  const { progress, nextXP, title } = getLevelFromXP(totalXP);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e1e2e] bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
            <span className="text-white text-xs font-bold">⌘</span>
          </div>
          <span className="font-semibold text-[#e8e8f0] hidden sm:block">
            DSA<span className="text-indigo-400">Puzzles</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-indigo-600/10 text-indigo-400'
                    : 'text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#16161f]'
                  }`}
              >
                <Icon size={14} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e]">
            <Flame size={14} className="text-orange-400" />
            <span className="text-sm font-semibold text-[#e8e8f0]">{streak}</span>
          </div>

          {/* XP + Level */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e] min-w-[140px]">
            <div className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Star size={10} className="text-indigo-400 fill-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-[#6b6b8a] truncate">Lvl {level}</span>
                <span className="text-xs font-medium text-indigo-400">{formatXP(totalXP)} XP</span>
              </div>
              <ProgressBar value={progress * 100} animated={false} className="h-1" />
            </div>
          </div>

          {/* Mobile XP */}
          <div className="flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e]">
            <Zap size={14} className="text-indigo-400" />
            <span className="text-sm font-semibold text-[#e8e8f0]">{formatXP(totalXP)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

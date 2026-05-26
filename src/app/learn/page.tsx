'use client';

import { useState, useMemo, useCallback, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, Zap, Lock, Shuffle, ChevronDown, ChevronRight, Building2, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ALL_QUESTIONS, BLIND75_QUESTIONS, TOP150_QUESTIONS } from '@/data/questions';
import type { QuestionConfig } from '@/types/question';
import { useProgressStore } from '@/stores/progressStore';
import { getDifficultyBg, cn } from '@/lib/utils';
import type { Difficulty, QuestionSet, Category } from '@/types/question';

const DIFFICULTY_FILTERS: { label: string; value: Difficulty | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const SET_BADGE_STYLES: Record<QuestionSet, string> = {
  blind75: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  top150: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  neetcode150: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const SET_LABELS: Record<QuestionSet, string> = {
  blind75: 'Blind 75',
  top150: 'Top 150',
  neetcode150: 'NeetCode 150',
};

const COMPANY_COLORS: Record<string, string> = {
  'Amazon': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Google': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Meta': 'bg-blue-600/10 text-blue-300 border-blue-600/20',
  'Microsoft': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'Apple': 'bg-slate-400/10 text-slate-300 border-slate-400/20',
  'Bloomberg': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'LinkedIn': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Adobe': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Goldman Sachs': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'DoorDash': 'bg-red-500/10 text-red-400 border-red-500/20',
};

const CATEGORY_NAMES: Partial<Record<Category, string>> = {
  'array-string': 'Array / String',
  'two-pointers': 'Two Pointers',
  'sliding-window': 'Sliding Window',
  'matrix': 'Matrix',
  'hashmap': 'HashMap',
  'intervals': 'Intervals',
  'stack': 'Stack',
  'linked-list': 'Linked List',
  'binary-tree': 'Binary Tree',
  'bst': 'Binary Search Tree',
  'graph': 'Graph',
  'trie': 'Trie',
  'heap': 'Heap / Priority Queue',
  'backtracking': 'Backtracking',
  'divide-conquer': 'Divide & Conquer',
  'binary-search': 'Binary Search',
  'dynamic-programming': 'Dynamic Programming',
  'bit-manipulation': 'Bit Manipulation',
  'math': 'Math',
  'greedy': 'Greedy',
};

const CATEGORY_ORDER: Category[] = [
  'array-string', 'two-pointers', 'sliding-window', 'matrix', 'hashmap',
  'intervals', 'stack', 'linked-list', 'binary-tree', 'bst', 'graph', 'trie',
  'heap', 'backtracking', 'divide-conquer', 'binary-search', 'dynamic-programming',
  'bit-manipulation', 'math', 'greedy',
];

function LearnPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearchState] = useState(() => searchParams.get('q') ?? '');
  const [diffFilter, setDiffFilterState] = useState<Difficulty | 'all'>(
    () => (searchParams.get('diff') as Difficulty | 'all') ?? 'all'
  );
  const [setFilter, setSetFilterState] = useState<QuestionSet | 'all'>(
    () => (searchParams.get('set') as QuestionSet | 'all') ?? 'all'
  );
  const [viewMode, setViewModeState] = useState<'list' | 'category'>(
    () => (searchParams.get('view') as 'list' | 'category') ?? 'list'
  );
  const [statusFilter, setStatusFilterState] = useState<'all' | 'solved' | 'unsolved'>(
    () => (searchParams.get('status') as 'all' | 'solved' | 'unsolved') ?? 'all'
  );
  const [categoryFilter, setCategoryFilterState] = useState<Category | 'all'>(
    () => (searchParams.get('cat') as Category | 'all') ?? 'all'
  );
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const { solvedQuestions, _hasHydrated } = useProgressStore();

  const filterBarRef = useRef<HTMLDivElement>(null);
  const [filterBarHeight, setFilterBarHeight] = useState(112);

  // Scroll restoration
  useEffect(() => {
    const saved = sessionStorage.getItem('learn-scroll');
    if (saved) {
      requestAnimationFrame(() => window.scrollTo(0, parseInt(saved)));
      sessionStorage.removeItem('learn-scroll');
    }
    return () => {
      sessionStorage.setItem('learn-scroll', String(window.scrollY));
    };
  }, []);

  // Measure filter bar height so category headers can stick below it
  useEffect(() => {
    if (!filterBarRef.current) return;
    const observer = new ResizeObserver(() => {
      if (filterBarRef.current) setFilterBarHeight(filterBarRef.current.offsetHeight);
    });
    observer.observe(filterBarRef.current);
    return () => observer.disconnect();
  }, []);

  const updateURL = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `/learn?${qs}` : '/learn', { scroll: false });
  }, [router, searchParams]);

  const setSearch = useCallback((val: string) => {
    setSearchState(val);
    updateURL({ q: val || null });
  }, [updateURL]);

  const setDiffFilter = useCallback((val: Difficulty | 'all') => {
    setDiffFilterState(val);
    updateURL({ diff: val === 'all' ? null : val });
  }, [updateURL]);

  const setSetFilter = useCallback((val: QuestionSet | 'all') => {
    setSetFilterState(val);
    updateURL({ set: val === 'all' ? null : val });
  }, [updateURL]);

  const setViewMode = useCallback((val: 'list' | 'category') => {
    setViewModeState(val);
    updateURL({ view: val === 'list' ? null : val });
  }, [updateURL]);

  const setStatusFilter = useCallback((val: 'all' | 'solved' | 'unsolved') => {
    setStatusFilterState(val);
    updateURL({ status: val === 'all' ? null : val });
  }, [updateURL]);

  const setCategoryFilter = useCallback((val: Category | 'all') => {
    setCategoryFilterState(val);
    updateURL({ cat: val === 'all' ? null : val });
  }, [updateURL]);

  const sourceList = setFilter === 'blind75'
    ? BLIND75_QUESTIONS
    : setFilter === 'top150'
      ? TOP150_QUESTIONS
      : ALL_QUESTIONS;

  const filtered = useMemo(() => sourceList.filter((q) => {
    const matchSearch = !search ||
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.patternName.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      (q.companies?.some((c) => c.toLowerCase().includes(search.toLowerCase())) ?? false);
    const matchDiff = diffFilter === 'all' || q.difficulty === diffFilter;
    const matchCat = categoryFilter === 'all' || q.category === categoryFilter;
    const isSolvedQ = solvedQuestions[q.slug]?.status === 'solved' || solvedQuestions[q.slug]?.status === 'mastered';
    const matchStatus = !_hasHydrated || statusFilter === 'all'
      || (statusFilter === 'solved' && isSolvedQ)
      || (statusFilter === 'unsolved' && !isSolvedQ);
    return matchSearch && matchDiff && matchCat && matchStatus;
  }), [sourceList, search, diffFilter, categoryFilter, statusFilter, solvedQuestions, _hasHydrated]);

  const solvedCount = _hasHydrated
    ? ALL_QUESTIONS.filter((q) => {
        const p = solvedQuestions[q.slug];
        return p?.status === 'solved' || p?.status === 'mastered';
      }).length
    : 0;

  // Category grouping
  const byCategory = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const q of filtered) {
      const cat = q.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(q);
    }
    // Sort categories by CATEGORY_ORDER
    return CATEGORY_ORDER
      .filter((cat) => map.has(cat))
      .map((cat) => ({ cat, questions: map.get(cat)! }));
  }, [filtered]);

  const handleShuffle = () => {
    if (filtered.length === 0) return;
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    router.push(`/problem/${random.slug}`);
  };

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const sets = [
    { label: 'All Questions', value: 'all' as const, count: ALL_QUESTIONS.length },
    { label: 'Blind 75', value: 'blind75' as const, count: BLIND75_QUESTIONS.length },
    { label: 'Top Interview 150', value: 'top150' as const, count: TOP150_QUESTIONS.length },
  ];

  const hasActiveFilters = search || diffFilter !== 'all' || statusFilter !== 'all' || categoryFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setDiffFilter('all');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page header — not sticky */}
        <div className="pt-8 mb-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-[#e8e8f0] mb-1">Questions</h1>
            <p className="text-[#6b6b8a] text-sm">
              <span className="text-emerald-400 font-medium">{solvedCount}</span>
              <span>/{ALL_QUESTIONS.length} solved</span>
            </p>
          </div>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-sm font-medium transition-all hover:border-indigo-500/40 cursor-pointer"
          >
            <Shuffle size={15} />
            Random Question
          </button>
        </div>

        {/* ── Sticky filter bar ── */}
        <div
          ref={filterBarRef}
          className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-3 pb-4 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#1a1a28]"
        >
          {/* Question set filter */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {sets.map(({ label, value, count }) => (
              <button
                key={value}
                onClick={() => setSetFilter(value)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer',
                  setFilter === value
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-[#111118] border-[#1e1e2e] text-[#6b6b8a] hover:border-[#2a2a3e] hover:text-[#e8e8f0]'
                )}
              >
                {label}
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-md',
                  setFilter === value ? 'bg-white/20 text-white' : 'bg-[#16161f] text-[#6b6b8a]'
                )}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d3d5c]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions, patterns, companies..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#111118] border border-[#1e1e2e] text-[#e8e8f0] placeholder-[#3d3d5c] text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              {DIFFICULTY_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setDiffFilter(value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
                    diffFilter === value ? 'bg-[#16161f] text-[#e8e8f0]' : 'text-[#6b6b8a] hover:text-[#e8e8f0]'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              {(['all', 'solved', 'unsolved'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setStatusFilter(v)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize',
                    statusFilter === v ? 'bg-[#16161f] text-[#e8e8f0]' : 'text-[#6b6b8a] hover:text-[#e8e8f0]'
                  )}
                >
                  {v === 'all' ? 'All' : v === 'solved' ? 'Solved' : 'Unsolved'}
                </button>
              ))}
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-medium border bg-[#111118] border-[#1e1e2e] transition-all cursor-pointer appearance-none pr-7 focus:outline-none',
                categoryFilter !== 'all' ? 'text-[#e8e8f0] border-indigo-500/40' : 'text-[#6b6b8a] hover:text-[#e8e8f0]'
              )}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b8a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            >
              <option value="all">All Categories</option>
              {CATEGORY_ORDER.map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_NAMES[cat] ?? cat}</option>
              ))}
            </select>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-[#6b6b8a] hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X size={11} />
                Clear
              </button>
            )}

            {/* View toggle — pushed to the right */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#111118] border border-[#1e1e2e] ml-auto">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
                  viewMode === 'list' ? 'bg-[#16161f] text-[#e8e8f0]' : 'text-[#6b6b8a] hover:text-[#e8e8f0]'
                )}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('category')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
                  viewMode === 'category' ? 'bg-[#16161f] text-[#e8e8f0]' : 'text-[#6b6b8a] hover:text-[#e8e8f0]'
                )}
              >
                By Category
              </button>
            </div>
          </div>
        </div>

        {/* Questions content */}
        <div className="pt-5 pb-8">

          {/* Question list — flat view */}
          {viewMode === 'list' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-2"
            >
              {filtered.map((q) => (
                <QuestionRow key={q.slug} q={q} solvedQuestions={solvedQuestions} hasHydrated={_hasHydrated} />
              ))}
            </motion.div>
          )}

          {/* Question list — category view */}
          {viewMode === 'category' && (
            <div className="flex flex-col gap-4">
              {byCategory.map(({ cat, questions }) => {
                const isCollapsed = collapsedCategories.has(cat);
                const catName = CATEGORY_NAMES[cat as Category] ?? cat;
                const solvedInCat = questions.filter((q) => {
                  const p = solvedQuestions[q.slug];
                  return p?.status === 'solved' || p?.status === 'mastered';
                }).length;
                const progress = questions.length > 0 ? Math.round((solvedInCat / questions.length) * 100) : 0;

                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2"
                  >
                    {/* Category header — sticky flat row, no border box */}
                    <button
                      onClick={() => toggleCategory(cat)}
                      style={{ top: `calc(3.5rem + ${filterBarHeight}px)` }}
                      className="w-full sticky z-20 flex items-center gap-3 py-2.5 bg-[#0a0a0f]/95 backdrop-blur-sm hover:bg-[#0d0d14]/95 transition-colors cursor-pointer border-b border-[#1a1a28]"
                    >
                      <div className="flex-1 flex items-center gap-3 min-w-0">
                        <span className="text-[#e8e8f0] font-semibold text-sm">{catName}</span>
                        <span className="text-xs text-[#6b6b8a] shrink-0">{questions.length} questions</span>
                        {solvedInCat > 0 && (
                          <span className="text-xs text-emerald-400 shrink-0">{solvedInCat} solved</span>
                        )}
                      </div>
                      <div className="hidden sm:flex items-center gap-2 w-32 shrink-0">
                        <div className="flex-1 h-1.5 rounded-full bg-[#1e1e2e] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#6b6b8a] w-8 text-right">{progress}%</span>
                      </div>
                      {isCollapsed
                        ? <ChevronRight size={14} className="text-[#3d3d5c] shrink-0" />
                        : <ChevronDown size={14} className="text-[#3d3d5c] shrink-0" />
                      }
                    </button>

                    {/* Questions list */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1.5 pt-2">
                            {questions.map((q) => (
                              <QuestionRow key={q.slug} q={q} solvedQuestions={solvedQuestions} hasHydrated={_hasHydrated} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#6b6b8a] text-sm">No questions match your filters.</p>
            </div>
          )}
        </div> {/* end pt-5 pb-8 */}
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense>
      <LearnPageInner />
    </Suspense>
  );
}

function QuestionRow({
  q,
  solvedQuestions,
  hasHydrated = false,
  inCategory = false,
}: {
  q: QuestionConfig;
  solvedQuestions: Record<string, { status: string }>;
  hasHydrated?: boolean;
  inCategory?: boolean;
}) {
  const progress = solvedQuestions[q.slug];
  const isSolved = hasHydrated && (progress?.status === 'solved' || progress?.status === 'mastered');
  const isImplemented = !!q.codeSolutions?.length || !!q.codeChallenge;
  const topCompany = q.companies?.[0];
  const companyStyle = topCompany ? (COMPANY_COLORS[topCompany] ?? 'bg-[#16161f] text-[#6b6b8a] border-[#2a2a3e]') : null;

  return (
    <Link
      href={`/problem/${q.slug}`}
      className={cn(
        'group flex items-center gap-4 p-4 transition-all duration-200',
        inCategory
          ? 'bg-[#0d0d13] hover:bg-[#111118]'
          : 'rounded-xl bg-[#111118] border border-[#1e1e2e] hover:border-indigo-500/30 hover:bg-[#16161f]'
      )}
    >
      {/* Status / Number */}
      <div className={cn(
        'relative shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center',
        isSolved ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-[#16161f] border-[#2a2a3e]'
      )}>
        <span className={cn(
          'text-[10px] font-mono font-bold',
          isSolved ? 'text-emerald-400' : 'text-[#3d3d5c]'
        )}>{q.leetcodeNumber}</span>
        {isSolved && (
          <CheckCircle2 size={10} className="text-emerald-400 absolute -top-1 -right-1" />
        )}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-[#e8e8f0] font-medium text-sm group-hover:text-indigo-300 transition-colors truncate">
            {q.title}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border shrink-0 ${getDifficultyBg(q.difficulty)}`}>
            {q.difficulty}
          </span>
          {/* Question set badges */}
          {q.questionSets.map((set) => (
            <span
              key={set}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium border shrink-0 ${SET_BADGE_STYLES[set]}`}
            >
              {SET_LABELS[set]}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b6b8a]">{q.patternName}</span>
          {/* Top company badge */}
          {topCompany && companyStyle && (
            <span className={cn(
              'hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border shrink-0',
              companyStyle
            )}>
              <Building2 size={9} />
              {topCompany}
            </span>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="shrink-0 flex items-center gap-3">
        {!isImplemented && (
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-[#3d3d5c] bg-[#16161f] border border-[#1e1e2e] px-2 py-1 rounded-lg">
            <Lock size={9} />
            Coming soon
          </span>
        )}
        <div className="flex items-center gap-1 text-xs text-indigo-400/60">
          <Zap size={11} />
          {q.xpRewards.puzzle} XP
        </div>
      </div>
    </Link>
  );
}

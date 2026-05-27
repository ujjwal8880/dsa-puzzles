'use client';

import { useEffect } from 'react';
import { useProgressStore } from '@/stores/progressStore';

// Listens for localStorage changes from other tabs and rehydrates the store,
// keeping all open tabs in sync without a page refresh.
export function StorageSync() {
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'dsa-puzzles-progress') {
        useProgressStore.persist.rehydrate();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return null;
}

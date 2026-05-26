'use client';

import { create } from 'zustand';
import type { LearningStep } from '@/types/question';

interface XPPopEvent {
  id: string;
  amount: number;
  label: string;
  x: number;
  y: number;
}

interface UIState {
  currentStep: LearningStep;
  sidebarOpen: boolean;
  xpPopEvents: XPPopEvent[];
  pendingAchievement: string | null;
  confettiTrigger: number;

  setCurrentStep: (step: LearningStep) => void;
  setSidebarOpen: (open: boolean) => void;
  triggerXPPop: (event: Omit<XPPopEvent, 'id'>) => void;
  dismissXPPop: (id: string) => void;
  triggerAchievement: (achievementId: string) => void;
  dismissAchievement: () => void;
  triggerConfetti: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentStep: 'puzzle',
  sidebarOpen: false,
  xpPopEvents: [],
  pendingAchievement: null,
  confettiTrigger: 0,

  setCurrentStep: (step) => set({ currentStep: step }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  triggerXPPop: (event) =>
    set((state) => ({
      xpPopEvents: [
        ...state.xpPopEvents,
        { ...event, id: Math.random().toString(36).slice(2) },
      ],
    })),

  dismissXPPop: (id) =>
    set((state) => ({
      xpPopEvents: state.xpPopEvents.filter((e) => e.id !== id),
    })),

  triggerAchievement: (achievementId) =>
    set({ pendingAchievement: achievementId }),

  dismissAchievement: () => set({ pendingAchievement: null }),

  triggerConfetti: () =>
    set((state) => ({ confettiTrigger: state.confettiTrigger + 1 })),
}));

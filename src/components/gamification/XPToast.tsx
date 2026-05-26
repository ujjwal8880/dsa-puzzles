'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export function XPToastLayer() {
  const { xpPopEvents, dismissXPPop } = useUIStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {xpPopEvents.map((event) => (
          <XPToast key={event.id} event={event} onDone={() => dismissXPPop(event.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function XPToast({ event, onDone }: { event: { id: string; amount: number; label: string; x: number; y: number }; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-500/30 pointer-events-none"
      style={{ left: event.x, top: event.y }}
      initial={{ opacity: 0, y: 0, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-10, -50, -80, -110], scale: [0.6, 1.1, 1, 0.85] }}
      transition={{ duration: 1.5, times: [0, 0.2, 0.7, 1] }}
    >
      <Zap size={12} className="fill-white" />
      +{event.amount} XP
    </motion.div>
  );
}

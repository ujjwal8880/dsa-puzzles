import type { Variants } from 'framer-motion';

// Reusable animation variants used across all engines and UI
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 25 },
  },
};

export const highlight: Variants = {
  idle: { scale: 1, boxShadow: '0 0 0 0px rgba(99,102,241,0)' },
  active: {
    scale: 1.06,
    boxShadow: '0 0 0 3px rgba(99,102,241,0.6)',
    transition: { duration: 0.2 },
  },
  correct: {
    scale: [1, 1.12, 1],
    boxShadow: '0 0 0 3px rgba(52,211,153,0.7)',
    transition: { duration: 0.4 },
  },
  wrong: {
    x: [-4, 4, -4, 4, 0],
    boxShadow: '0 0 0 3px rgba(248,113,113,0.7)',
    transition: { duration: 0.4 },
  },
};

export const xpPop: Variants = {
  initial: { opacity: 0, y: 0, scale: 0.5 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [-10, -40, -60, -80],
    scale: [0.5, 1.2, 1, 0.8],
    transition: { duration: 1.5, times: [0, 0.2, 0.7, 1] },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// Spring configs
export const springSnappy = { type: 'spring', stiffness: 400, damping: 28 } as const;
export const springGentle = { type: 'spring', stiffness: 200, damping: 30 } as const;
export const springBouncy = { type: 'spring', stiffness: 500, damping: 20 } as const;

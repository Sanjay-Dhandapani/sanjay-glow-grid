import type { Variants, Transition } from "framer-motion";
import { useReducedMotion as fmUseReducedMotion } from "framer-motion";

export const defaultSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: (stagger = 0.1) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...defaultSpring, delay },
  }),
};

/**
 * kineticChar
 * A variant factory for per-character animations with slight randomized rotation/skew by index.
 */
export const kineticChar = (index: number, baseDelay = 0, perCharDelay = 0.03): Variants => {
  // Seeded randomness from index for deterministic variation
  const rot = ((index * 13) % 7) - 3; // -3..3
  const skew = ((index * 29) % 5) - 2; // -2..2
  const delay = baseDelay + index * perCharDelay;

  return {
    hidden: { opacity: 0, y: 12, rotate: rot, skewX: skew },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      skewX: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
};

/**
 * useReducedMotionSafe
 * Wraps framer-motion's useReducedMotion with SSR safety.
 */
export function useReducedMotionSafe(): boolean {
  // Guard against SSR where window is undefined
  if (typeof window === "undefined") return true;
  return fmUseReducedMotion() ?? true;
}
import { createContext, useContext, useMemo } from "react";
import type { PropsWithChildren } from "react";
import { useReducedMotion } from "framer-motion";

export type MotionContextValue = {
  reduced: boolean;
  revealOnce: true;
  rootMargin: string;
};

const defaultValue: MotionContextValue = {
  reduced: false,
  revealOnce: true,
  rootMargin: "0px 0px -10% 0px",
};

const MotionContext = createContext<MotionContextValue>(defaultValue);

export function useMotionSettings() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: PropsWithChildren) {
  const reduced = useReducedMotion();
  const value = useMemo<MotionContextValue>(
    () => ({
      reduced: !!reduced,
      revealOnce: true,
      rootMargin: "0px 0px -10% 0px",
    }),
    [reduced]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
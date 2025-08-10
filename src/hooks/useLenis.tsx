/** @jsxImportSource react */
import React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, PropsWithChildren } from "react";
import Lenis from "@studio-freight/lenis";
import { useMotionSettings } from "@/providers/MotionProvider";

type ScrollToTarget = string | HTMLElement | number;

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  lerp?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
};

type LenisContextType = {
  scrollTo: (target: ScrollToTarget, opts?: ScrollToOptions) => void;
  lenis?: Lenis;
};

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function useLenisProvider({ disabled = false }: { disabled?: boolean }) {
  const rafRef = useRef<number | null>(null);
  const [lenis, setLenis] = useState<Lenis | undefined>(undefined);

  useEffect(() => {
    if (disabled) {
      if (lenis) {
        lenis.destroy();
        setLenis(undefined);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
    });

    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      instance.destroy();
      setLenis(undefined);
    };
  }, [disabled, lenis]);

  const scrollTo = useCallback(
    (target: ScrollToTarget, opts?: ScrollToOptions) => {
      if (disabled || !lenis) {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "auto" });
          return;
        }
        let el: HTMLElement | null = null;
        if (typeof target === "string") {
          if (target.startsWith("#") || target.startsWith(".")) {
            el = document.querySelector(target) as HTMLElement | null;
          } else {
            el = document.getElementById(target);
          }
        } else if (target instanceof HTMLElement) {
          el = target;
        }
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        }
        return;
      }

      if (typeof target === "number") {
        lenis.scrollTo(target, { ...opts, immediate: opts?.immediate ?? false });
        return;
      }

      let to: HTMLElement | string | number | null = null;
      if (typeof target === "string") {
        if (target.startsWith("#") || target.startsWith(".")) {
          to = target;
        } else {
          const elById = document.getElementById(target);
          to = elById ?? target;
        }
      } else if (target instanceof HTMLElement) {
        to = target;
      }

      if (to !== null) {
        lenis.scrollTo(to as any, {
          offset: opts?.offset ?? 0,
          duration: opts?.duration,
          lerp: opts?.lerp,
          easing: opts?.easing,
          immediate: opts?.immediate ?? false,
        });
      }
    },
    [lenis, disabled]
  );

  const contextValue = useMemo(
    () => ({
      lenis,
      scrollTo,
    }),
    [lenis, scrollTo]
  );

  return contextValue;
}

export function LenisProvider({ children }: PropsWithChildren) {
  const { reduced } = useMotionSettings();
  const ctx = useLenisProvider({ disabled: !!reduced });

  return <LenisContext.Provider value={ctx}>{children}</LenisContext.Provider>;
}
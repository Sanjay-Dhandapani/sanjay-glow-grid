/**
 * Motion/animation preference utilities
 * Modes: 'full' | 'reduced' | 'off' | 'auto'
 * Applies data-motion on <html> and persists to localStorage.
 * Respects prefers-reduced-motion for 'auto' mode.
 */

export type MotionMode = 'full' | 'reduced' | 'off' | 'auto';
const STORAGE_KEY = 'site:motion-mode';

function systemPrefersReduced(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function applyMotion(mode: Exclude<MotionMode, 'auto'>) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-motion', mode);
}

export function getStoredMotion(): MotionMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (raw === 'full' || raw === 'reduced' || raw === 'off' || raw === 'auto') return raw;
    return null;
  } catch {
    return null;
  }
}

export function getInitialMotion(): MotionMode {
  return getStoredMotion() ?? 'auto';
}

export function resolveAuto(): Exclude<MotionMode, 'auto'> {
  // If system prefers reduced, choose 'reduced'
  return systemPrefersReduced() ? 'reduced' : 'full';
}

export function setMotion(mode: MotionMode) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore write errors
    }
  }
  const effective = mode === 'auto' ? resolveAuto() : mode;
  applyMotion(effective);
}

export function initMotion() {
  const mode = getInitialMotion();
  const effective = mode === 'auto' ? resolveAuto() : mode;
  applyMotion(effective);

  if (typeof window !== 'undefined' && mode === 'auto' && window.matchMedia) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => {
      const current = getStoredMotion() ?? 'auto';
      if (current === 'auto') applyMotion(resolveAuto());
    };
    try {
      mq.addEventListener('change', handler);
    } catch {
      // Safari fallback
      // @ts-ignore
      mq.addListener(handler);
    }
  }
}
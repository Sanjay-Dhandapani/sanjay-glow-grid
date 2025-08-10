/**
 * Theme management utilities
 * Modes: 'light' | 'dark' | 'auto'
 * Applies data-theme on <html> and persists to localStorage.
 * Progressive enhancement: defaults to dark (as globals.css sets color-scheme: dark)
 * Adds transition helpers that respect motion settings via [data-motion].
 */

export type ThemeMode = 'light' | 'dark' | 'auto';
const STORAGE_KEY = 'site:theme-mode';

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Enable a short color-scheme transition when motion is not reduced/off.
 * It adds a transient data-attr which CSS can target to animate safely.
 */
function enableThemeTransition() {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const motion = root.getAttribute('data-motion');
  // Only animate when motion is 'full' (or absent)
  if (motion && motion !== 'full') return;

  root.setAttribute('data-theme-transition', 'true');
  // Remove after next frame to keep it very short and avoid layout thrash
  window.setTimeout(() => {
    root.removeAttribute('data-theme-transition');
  }, 250);
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (mode === 'auto') {
    const dark = getSystemPrefersDark();
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', mode);
  }
}

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (raw === 'light' || raw === 'dark' || raw === 'auto') return raw;
    return null;
  } catch {
    return null;
  }
}

export function getInitialTheme(): ThemeMode {
  // On server or first paint, prefer 'auto' to let init script decide
  return getStoredTheme() ?? 'auto';
}

export function setTheme(mode: ThemeMode) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore write errors
    }
  }
  enableThemeTransition();
  applyTheme(mode);
}

export function initTheme() {
  const mode = getInitialTheme();
  applyTheme(mode);

  // If auto, react to system changes
  if (typeof window !== 'undefined' && mode === 'auto' && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      // Only respond when still in auto
      const current = getStoredTheme() ?? 'auto';
      if (current === 'auto') {
        enableThemeTransition();
        applyTheme('auto');
      }
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
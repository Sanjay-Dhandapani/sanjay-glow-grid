export type MotionSetting = 'full' | 'reduced' | 'off';

export function getMotionSetting(): MotionSetting {
  if (typeof window === 'undefined') return 'full';
  
  const stored = localStorage.getItem('motion') as MotionSetting;
  if (stored) return stored;
  
  // Check user's system preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReduced ? 'reduced' : 'full';
}

export function setMotionSetting(setting: MotionSetting) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('motion', setting);
  document.documentElement.setAttribute('data-motion', setting);
}

export function initMotion() {
  if (typeof window === 'undefined') return;
  
  const setting = getMotionSetting();
  setMotionSetting(setting);
}
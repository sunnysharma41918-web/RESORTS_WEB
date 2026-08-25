export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isMobileScreen() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

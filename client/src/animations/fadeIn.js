import { gsap } from './gsapConfig';

export function animateFadeIn(element, options = {}) {
  if (!element) return;
  const { duration = 0.5, delay = 0, y = 15 } = options;
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
}

import { gsap } from './gsapConfig';

export function animateTextReveal(element, options = {}) {
  if (!element) return;
  const { delay = 0 } = options;
  return gsap.fromTo(
    element,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
}

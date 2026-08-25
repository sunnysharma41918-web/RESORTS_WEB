import { gsap } from './gsapConfig';

export function animateImageReveal(element, options = {}) {
  if (!element) return;
  const { delay = 0 } = options;
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 0.6, delay, ease: 'power2.out' }
  );
}

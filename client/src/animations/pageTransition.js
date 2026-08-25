import { gsap } from './gsapConfig';

export function animatePageIn(element) {
  if (!element) return;
  return gsap.fromTo(
    element,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
  );
}

export function animatePageOut(element, onComplete) {
  if (!element) {
    if (onComplete) onComplete();
    return;
  }
  return gsap.to(element, {
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete,
  });
}

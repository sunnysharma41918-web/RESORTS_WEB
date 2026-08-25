import { gsap } from './gsapConfig';

export function createParallax(element, container, speed = 0.2) {
  if (!element || !container) return;
  return gsap.to(element, {
    yPercent: speed * 50,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

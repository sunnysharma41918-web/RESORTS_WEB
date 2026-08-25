import { gsap, ScrollTrigger } from './gsapConfig';

export function animateReveal(element, options = {}) {
  if (!element) return;
  const { delay = 0, y = 20 } = options;
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

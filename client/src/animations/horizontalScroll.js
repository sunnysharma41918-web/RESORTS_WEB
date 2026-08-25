import { gsap } from './gsapConfig';

export function setupHorizontalScroll(container, sectionWrapper) {
  if (!container || !sectionWrapper) return;
  return gsap.to(sectionWrapper, {
    x: () => -(sectionWrapper.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${sectionWrapper.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true,
    },
  });
}

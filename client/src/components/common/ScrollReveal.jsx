import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 500,
  threshold = 0.05,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsDone(true);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const effectiveMargin = isMobile ? '80px 0px 0px 0px' : '0px 0px -20px 0px';
    const effectiveThreshold = isMobile ? 0.01 : threshold;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold: effectiveThreshold, rootMargin: effectiveMargin }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveDelay = isMobile ? Math.min(delay, 80) : delay;
  const effectiveDuration = isMobile ? Math.min(duration, 350) : duration;

  useEffect(() => {
    if (isVisible && !isDone) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, effectiveDelay + effectiveDuration + 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isDone, effectiveDelay, effectiveDuration]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 16px, 0)';
      case 'down':
        return 'translate3d(0, -16px, 0)';
      case 'left':
        return 'translate3d(16px, 0, 0)';
      case 'right':
        return 'translate3d(-16px, 0, 0)';
      case 'scale':
        return 'scale(0.98)';
      case 'clip':
        return 'scale(1.02)';
      default:
        return 'translate3d(0, 16px, 0)';
    }
  };

  const isClip = direction === 'clip';

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
        clipPath: isClip
          ? isVisible
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(4% 4% 4% 4%)'
          : undefined,
        transitionProperty: isDone ? 'none' : 'opacity, transform, clip-path',
        transitionDuration: `${effectiveDuration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${effectiveDelay}ms`,
        willChange: isVisible && !isDone ? 'opacity, transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
}

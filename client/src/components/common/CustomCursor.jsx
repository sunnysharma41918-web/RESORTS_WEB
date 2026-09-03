import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer (non-touch)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return undefined;
    }

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let scrollTimeout;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element
      const target = e.target.closest('[data-cursor], a, button, [role="button"], input, textarea, select');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleWheel = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    let animationFrameId;
    const animateTrail = () => {
      // 60-120fps Smooth linear interpolation for outer ring
      trailX += (mouseX - trailX) * 0.22;
      trailY += (mouseY - trailY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Central exact dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF1F02] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform shadow-[0_0_8px_#FF1F02]"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      {/* Smooth trailing outer ring / text pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none will-change-transform transition-[width,height,background-color,border-color,opacity,transform] duration-200 ease-out border ${
          cursorText
            ? 'w-16 h-16 bg-[#FF1F02] text-white border-transparent font-bold text-[10px] uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(255,31,2,0.4)] scale-100'
            : isClicking
            ? 'w-6 h-6 border-[#FF1F02] bg-[#FF1F02]/20 rounded-full scale-90'
            : isScrolling
            ? 'w-10 h-10 border-[#FF1F02] bg-[#FF1F02]/5 rounded-full scale-105'
            : isHovered
            ? 'w-12 h-12 border-[#FF1F02] bg-[#FF1F02]/10 backdrop-blur-[1px] rounded-full scale-100'
            : 'w-8 h-8 border-white/40 dark:border-white/40 rounded-full scale-100'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {cursorText && <span className="font-manrope">{cursorText}</span>}
      </div>
    </div>
  );
}

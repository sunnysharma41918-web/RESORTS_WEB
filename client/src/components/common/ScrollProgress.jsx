import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0 && barRef.current) {
        const progress = Math.min(Math.max((totalScroll / windowHeight) * 100, 0), 100);
        barRef.current.style.transform = `translate3d(${progress - 100}%, 0, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none bg-transparent overflow-hidden">
      <div
        ref={barRef}
        className="w-full h-full bg-[#FF1F02] origin-left will-change-transform shadow-[0_0_8px_#FF1F02]"
        style={{ transform: 'translate3d(-100%, 0, 0)' }}
      />
    </div>
  );
}

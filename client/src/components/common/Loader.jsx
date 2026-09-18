import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import BrandLogo from './BrandLogo';

export default function Loader({
  className = '',
  size = 'md',
  text = 'THE COUNTRY HOLIDAYS HOTELS & RESORTS',
  fullscreen = false,
  onComplete,
}) {
  // Single animation: Royal Door / Parda Opening
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Smoothly glide curtains open at 400ms
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    // 2. Complete transition at 2.6s
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2600);

    // 60fps smooth hairline progress bar
    const startTime = Date.now();
    const duration = 2200;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 25);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  // Silky smooth easing curve
  const silkEase = [0.16, 1, 0.3, 1];

  const loaderContent = (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center p-6 select-none font-manrope overflow-hidden text-center',
        fullscreen ? 'w-full h-full min-h-screen' : 'py-16',
        className
      )}
    >
      {/* ========================================================================= */}
      {/* SINGLE ANIMATION: ROYAL DOOR / PARDA SLIDING OPEN                         */}
      {/* ========================================================================= */}
      {fullscreen && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {/* Left Panel */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: isOpen ? '-100%' : '0%' }}
            transition={{ duration: 1.6, ease: silkEase }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#0C0906] border-r border-[#B38738]/30 shadow-[20px_0_50px_rgba(0,0,0,0.9)] will-change-transform"
          />

          {/* Right Panel */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: isOpen ? '100%' : '0%' }}
            transition={{ duration: 1.6, ease: silkEase }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#0C0906] border-l border-[#B38738]/30 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] will-change-transform"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* BRAND EMBLEM & CLEAN TITLE (REVEALED BEHIND OPENING PANELS)               */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isOpen ? 1 : 0.3,
          scale: isOpen ? 1 : 0.96,
        }}
        transition={{ duration: 1.1, ease: silkEase }}
        className="relative z-10 flex flex-col items-center max-w-sm mx-auto"
      >
        {/* Soft Golden Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#B38738]/15 rounded-full blur-[70px] pointer-events-none" />

        {/* Brand Logo */}
        <div className="relative mb-4">
          <BrandLogo size={size === 'lg' ? 'xl' : size === 'sm' ? 'sm' : 'lg'} animated={true} />
        </div>

        {/* Clean Luxury Title */}
        <h1 className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.25em] uppercase text-[#F5EFE6] text-center leading-relaxed">
          {text}
        </h1>

        <span className="mt-1 text-[9px] uppercase font-manrope font-light tracking-[0.25em] text-[#B8A89A]">
          Sanctuaries of Timeless Luxury
        </span>
      </motion.div>

      {/* ========================================================================= */}
      {/* MINIMALIST PROGRESS TRACK                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-32 sm:w-40 mt-6">
        <div className="w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-transparent via-[#E8C97E] to-[#B38738] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(232,201,126,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070503] text-white overflow-hidden select-none">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
}

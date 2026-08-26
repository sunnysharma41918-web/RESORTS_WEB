import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

export default function HomeHero() {
  const { isDark } = useTheme();

  const scrollToDiscover = () => {
    const el = document.getElementById('intro-section') || document.querySelector('section:nth-of-type(2)');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative w-full h-screen h-[100dvh] max-h-screen overflow-hidden text-white select-none flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-6 sm:px-12 lg:px-16 xl:px-20 transition-colors duration-500 ${
      isDark ? 'bg-[#1C1C1C]' : 'bg-[#FAFDF2]'
    }`}>
      
      {/* 1. CINEMATIC MOUNTAIN LANDSCAPE BACKGROUND (DYNAMIC LIGHT / DARK ATMOSPHERE) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          key={isDark ? 'dark-bg' : 'light-bg'}
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src={
            isDark
              ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80'
              : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80'
          }
          alt="Scenic Mountain Wilderness"
          loading="eager"
          decoding="async"
          className={`w-full h-full object-cover object-center filter ${
            isDark ? 'brightness-[0.75] contrast-[1.1]' : 'brightness-[0.88] contrast-[1.05]'
          }`}
        />

        {/* Ambient Gradient Overlays for Razor-Sharp Typography Contrast */}
        <div className={`absolute inset-0 z-1 transition-opacity duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-black/90 via-black/30 to-black/40'
            : 'bg-gradient-to-t from-black/75 via-black/20 to-black/25'
        }`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 z-1" />
      </div>

      {/* 2. MAIN CENTERPIECE: MONUMENTAL TEXT HIERARCHY WITH STAGGERED REVEAL ANIMATIONS */}
      <div className="relative z-10 w-full my-auto flex flex-col justify-end py-1">
        
        {/* Eyebrow Spaced Tag with 5-Color Palette Accents */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] text-white/90 mb-1 drop-shadow flex items-center gap-2"
        >
          <span className="text-[#32ACE3]">✦</span>
          <span>DISCOVER THE 2026 COLLECTION</span>
          <span className="w-2 h-2 rounded-full bg-[#F2E20F] inline-block ml-1" />
        </motion.div>

        {/* Line 1: COUNTRY (Medium Large Display) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] select-none"
        >
          COUNTRY
        </motion.div>

        {/* Line 2: HOLIDAYS (GIANT Monumental Lettering with Exact 5-Color Combination) */}
        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black text-[12.5vw] sm:text-[13.5vw] md:text-[14vw] lg:text-[14.5vw] leading-[0.88] uppercase tracking-normal sm:tracking-[0.02em] text-hero-palette drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)] select-none"
        >
          HOLIDAYS
        </motion.div>

        {/* Line 3: HOTELS AND RESORTS (Medium Bold with Warm Amber & Crimson Red Gradient) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-end mt-0.5 sm:mt-1"
        >
          <h2 className="font-sans font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-hero-orange-red drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-right select-none">
            HOTELS AND RESORTS
          </h2>
        </motion.div>

      </div>

      {/* 4. BOTTOM BAR WITH PALETTE ACCENT WAYPOINTS */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        className="relative z-10 w-full flex items-center justify-between pt-2 text-xs text-white/80 font-medium"
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span>Chennai</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F50A3]" />
          <span>Noida</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#32ACE3]" />
          <span>Mumbai</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2E20F]" />
          <span>Delhi</span>
        </div>

        <button
          onClick={scrollToDiscover}
          type="button"
          className="text-xs text-white/80 hover:text-white uppercase tracking-wider font-semibold cursor-pointer transition-colors hover:translate-y-0.5"
        >
          Explore All Residences ↓
        </button>
      </motion.div>

    </section>
  );
}

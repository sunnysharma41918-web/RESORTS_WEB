import React from 'react';
import { motion } from 'framer-motion';

export default function HomeHero() {
  const scrollToDiscover = () => {
    const el = document.getElementById('intro-section') || document.querySelector('section:nth-of-type(2)');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen h-[100dvh] max-h-screen overflow-hidden bg-[#182a38] text-white select-none flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-6 sm:px-12 lg:px-16 xl:px-20">
      
      {/* 1. CINEMATIC MOUNTAIN LANDSCAPE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.12, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=3840&q=95"
          alt="Scenic Mountain Wilderness"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
        />

        {/* Ambient Gradient Overlays for Razor-Sharp Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50 z-1" />
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

        {/* Line 3: TRAVEL RESORTS (Medium Bold with Warm Amber & Crimson Red Gradient) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-end mt-0.5 sm:mt-1"
        >
          <h2 className="font-sans font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-hero-orange-red drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-right select-none">
            TRAVEL RESORTS
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
          <span>Goa</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F50A3]" />
          <span>Bengaluru</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#32ACE3]" />
          <span>Mumbai</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2E20F]" />
          <span>Dubai</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]" />
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

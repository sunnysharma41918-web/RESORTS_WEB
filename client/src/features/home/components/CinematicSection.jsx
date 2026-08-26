import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/common/ScrollReveal';

const cinematicVistas = [
  {
    id: 1,
    name: 'Coastal Sunset Horizon',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 2,
    name: 'Signature Suite Serenity',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 3,
    name: 'Grand Celebration Banquets',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 4,
    name: 'Starlit Evening Retreat',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=75',
  },
];

export default function CinematicSection() {
  const [activeVista, setActiveVista] = useState(cinematicVistas[0]);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] flex flex-col justify-between items-center py-20 sm:py-28 px-6 sm:px-12 overflow-hidden select-none transition-colors duration-300">

      {/* 1. Top Cinematic Tagline */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>05 — THE CINEMATIC JOURNEY</span>
          </div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] dark:text-white/90 text-[#0E0E0E]/90 leading-relaxed font-mono">
            FOR THOSE WHO SEEK COMFORT, EXPERIENCES & UNFORGETTABLE MEMORIES
          </p>
        </ScrollReveal>
      </div>

      {/* 2. Monumental Masked Typography (Poster Text-Fill Aesthetic) */}
      <div className="relative z-10 my-auto py-6 sm:py-10 text-center w-full max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={150}>
          <h2
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-[-0.03em] leading-[0.82] text-transparent bg-clip-text select-none drop-shadow-2xl transition-all duration-1000"
            style={{
              backgroundImage: `url(${activeVista.url})`,
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'contrast(1.25) brightness(1.15)',
            }}
          >
            THE<br />
            COUNTRY<br />
            JOURNEY
          </h2>
        </ScrollReveal>

        {/* Minimal Vista Style Switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {cinematicVistas.map((vista) => {
            const isActive = vista.id === activeVista.id;
            return (
              <button
                key={vista.id}
                onClick={() => setActiveVista(vista)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer ${isActive
                  ? 'border-b-2 border-[#FF1F02] dark:text-white text-[#0E0E0E] font-bold'
                  : 'dark:text-white/40 text-[#0E0E0E]/40 hover:text-[#FF1F02] border-b-2 border-transparent'
                  }`}
              >
                0{vista.id} {vista.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Cinematic Credits & Meta */}
      <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
        <ScrollReveal direction="up" delay={250}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] dark:text-[#D0D0D0] text-[#0E0E0E]/70">
            COUNTRY HOLIDAYS HOTELS & RESORTS • CRAFTING UNFORGETTABLE EXPERIENCES
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={350}>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-widest dark:text-[#B0B0B0] text-[#0E0E0E]/60">
            <span>CHENNAI (MAIN HQ)</span>
            <span className="hidden sm:inline">•</span>
            <span>NOIDA</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#FF1F02] font-bold">● 24/7 DEDICATED CONCIERGE</span>
            <span className="hidden sm:inline">•</span>
            <span>MUMBAI</span>
            <span className="hidden sm:inline">•</span>
            <span>DELHI</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={450}>
          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 border dark:border-white/40 border-[#0E0E0E]/40 hover:border-[#FF1F02] dark:text-white text-[#0E0E0E] hover:text-[#FF1F02] text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
            >
              <span>DISCOVER OUR STORY →</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}


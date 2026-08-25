import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/common/ScrollReveal';

const cinematicVistas = [
  {
    id: 1,
    name: 'Misty Alpine Sunrise',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=3000&q=95',
  },
  {
    id: 2,
    name: 'High Ridge Silhouette',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=3000&q=95',
  },
  {
    id: 3,
    name: 'Architectural Forest Sanctuary',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=3000&q=95',
  },
  {
    id: 4,
    name: 'Starry Mountain Summit',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=3000&q=95',
  },
];

export default function CinematicSection() {
  const [activeVista, setActiveVista] = useState(cinematicVistas[0]);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full bg-[#000000] text-white flex flex-col justify-between items-center py-20 sm:py-28 px-6 sm:px-12 overflow-hidden select-none">

      {/* 1. Top Cinematic Tagline */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
        <ScrollReveal direction="up">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-white/90 leading-relaxed font-mono">
            FOR THOSE WHO SEEK TRANQUILITY BEYOND THE REACH OF TIME
          </p>
        </ScrollReveal>
      </div>

      {/* 2. Monumental Masked Typography (Poster Text-Fill Aesthetic) */}
      <div className="relative z-10 my-auto py-6 sm:py-10 text-center w-full max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={150}>
          <h2
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-black uppercase tracking-[-0.03em] leading-[0.82] text-transparent bg-clip-text select-none drop-shadow-2xl transition-all duration-1000"
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
            SANCTUARY<br />
            JOURNEY
          </h2>
        </ScrollReveal>

        {/* Minimal Vista Style Switcher */}
        <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
          {cinematicVistas.map((vista) => {
            const isActive = vista.id === activeVista.id;
            return (
              <button
                key={vista.id}
                onClick={() => setActiveVista(vista)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-b-2 border-[#FF1F02] text-white font-bold'
                    : 'text-white/40 hover:text-white border-b-2 border-transparent'
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
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#D0D0D0]">
            AN ARCHITECTURAL RETREAT SCULPTED INTO THE HIGH HIMALAYAN RIDGE
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={350}>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#B0B0B0]">
            <span>500-ACRE WILDLIFE SANCTUARY</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#FF1F02] font-bold">● 100% OFF-GRID SOLAR</span>
            <span className="hidden sm:inline">•</span>
            <span>ELEVATION 1,850M</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={450}>
          <div className="pt-4">
            <Link
              to="/resorts"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/40 hover:border-[#FF1F02] text-white hover:text-[#FF1F02] text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span>EXPLORE ALL RESIDENCES →</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutVision() {
  return (
    <section className="py-24 md:py-36 bg-luxury-black text-luxury-light px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-luxury-border/60 select-none">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* 1. TOP HEADER (Matching the Reference Layout) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Where Nature Meets <br className="hidden sm:inline" />
            Architectural Serenity
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-luxury-muted font-light leading-relaxed max-w-2xl mx-auto">
            Our mission is to sculpt timeless sanctuaries between untouched earth and unhurried hospitality, ensuring every stay restores true personal equilibrium.
          </p>
        </div>

        {/* 2. BENTO GRID (Exact 3-Column Layout from Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMN 1 (Left Tall Card): Contemplative Architecture Portrait */}
          <div className="md:col-span-4 h-full min-h-[380px] md:min-h-[460px]">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-luxury-border/80 group relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                alt="Mindful Serenity"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* COLUMN 2 (Center Stack of 2 Cards): Colored Stat Card + Team Image Card */}
          <div className="md:col-span-4 flex flex-col gap-6 justify-between">
            {/* Top Accent Stat Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-sky-600 text-white shadow-2xl flex flex-col justify-between space-y-6 aspect-[4/3] sm:aspect-auto">
              <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight block">
                98%
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-95 block">
                Guest Renewal & Stillness Index
              </span>
            </div>

            {/* Bottom Team/Architects Image Card */}
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-luxury-border/80 group relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Hospitality Craftsmen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* COLUMN 3 (Right Stack of 2 Cards): Pavilion Image Card + Dark Stat Card */}
          <div className="md:col-span-4 flex flex-col gap-6 justify-between">
            {/* Top Architecture Image Card */}
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-luxury-border/80 group relative">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
                alt="Architectural Pavilion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Dark Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-luxury-card border border-luxury-border/80 text-white shadow-2xl flex flex-col justify-between space-y-6 aspect-[4/3] sm:aspect-auto">
              <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white block">
                100%
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-luxury-muted block">
                Off-Grid Sustainable Footprint
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

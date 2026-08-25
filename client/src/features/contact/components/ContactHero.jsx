import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

export default function ContactHero({ data }) {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-end overflow-hidden bg-luxury-black pt-32 pb-16 px-6 sm:px-12 lg:px-16 xl:px-20 select-none">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2560&q=85"
          alt="Country Holidays Concierge"
          className="w-full h-full object-cover object-center brightness-[0.70]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs uppercase tracking-luxury text-luxury-accent">
          <Phone className="w-3.5 h-3.5" />
          <span>Global Slowhouse Concierge</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-white">
          Begin Your Private Journey
        </h1>

        <p className="text-base sm:text-lg text-white/80 font-light max-w-xl leading-relaxed">
          Direct communication for bespoke villa bookings, helicopter transfers, and custom dining itineraries.
        </p>
      </div>
    </section>
  );
}

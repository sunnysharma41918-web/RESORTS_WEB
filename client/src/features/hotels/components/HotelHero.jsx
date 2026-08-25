import React from 'react';
import { Sparkles, MapPin, Star, Building2 } from 'lucide-react';

export default function HotelHero({ hotel }) {
  const { name, tagline, location, heroImage, rating } = hotel || {};

  return (
    <section className="relative w-full min-h-[75vh] flex flex-col justify-between overflow-hidden bg-luxury-black pt-32 pb-12 px-6 sm:px-12 lg:px-16 xl:px-20 select-none">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2560&q=85'}
          alt={name}
          className="w-full h-full object-cover object-center brightness-[0.72]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
      </div>

      <div className="relative z-10 max-w-4xl pt-8 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-xs uppercase tracking-luxury text-white">
          <Building2 className="w-3.5 h-3.5 text-luxury-accent" />
          <span>Metropolitan Tower & Boutique Residence</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-white">
          {name}
        </h1>

        <p className="text-base sm:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
          {tagline}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
        <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-luxury-accent" />
          <span>{location}</span>
        </div>

        <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white flex items-center space-x-1.5">
          <Star className="w-3.5 h-3.5 text-luxury-accent fill-current" />
          <span>{rating || 4.95} Rating</span>
        </div>
      </div>
    </section>
  );
}

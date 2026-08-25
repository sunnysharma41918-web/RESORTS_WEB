import React from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function GalleryHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-between overflow-hidden bg-luxury-black pt-32 pb-14 px-6 sm:px-12 lg:px-16 xl:px-20 select-none">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2560&q=85"
          alt="Visual Slowhouse Gallery"
          className="w-full h-full object-cover object-center brightness-[0.70] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-transparent to-black/50" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-orange-500/40 backdrop-blur-xl text-xs uppercase tracking-luxury text-orange-400 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
          <ImageIcon className="w-3.5 h-3.5 text-orange-500" />
          <span>Visual Architecture & Atmosphere</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-extrabold tracking-tight leading-[0.95] text-white">
          The Slowhouse <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-300">
            Imagery
          </span>
        </h1>

        <p className="text-base sm:text-xl text-white/80 font-light max-w-xl leading-relaxed">
          Moments of light, raw earth, alpine mist, and architectural stillness captured across our destinations.
        </p>
      </div>

      <div className="relative z-10 flex items-center space-x-3 pt-6">
        <div className="px-4 py-2 bg-black/55 backdrop-blur-xl border border-orange-500/30 rounded-full text-xs font-medium text-white flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Click Any Image to Open Cinematic Lightbox</span>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

export default function AboutStory({ data }) {
  const { heading, subheading, paragraphs, image } = data || {};

  return (
    <section className="py-24 md:py-36 bg-luxury-dark text-luxury-light px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-luxury-border/60 relative overflow-hidden">
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative Statement */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-orange-500/30 backdrop-blur-xl text-xs uppercase tracking-luxury text-orange-400">
              <Compass className="w-3.5 h-3.5" />
              <span>{heading || 'OUR ORIGIN'}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {subheading || 'Sculpting spaces that awaken the senses and calm the mind.'}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-luxury-muted font-light leading-relaxed">
            {paragraphs && paragraphs.length > 0 ? (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <>
                <p>
                  Country Holidays began with a singular premise: to create hospitality destinations that feel like living architectural art. Rather than building generic hotels, we discover untamed landscapes—rugged ocean cliffs, ancient alpine forests, and quiet desert dunes—and shape intimate sanctuaries that celebrate their context.
                </p>
                <p>
                  Every stone, timber beam, and water channel is meticulously oriented to frame natural light, breezes, and celestial vistas. We collaborate with master stonemasons, botanists, and contemporary architects to craft timeless spaces of pure serenity.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Floating Asymmetric Glass Frame */}
        <div className="lg:col-span-6 relative">
          <div className="relative z-10 overflow-hidden rounded-3xl border border-orange-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.8)]">
            <img
              src={image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'}
              alt="Architecture story"
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center space-x-3 p-4 bg-black/80 border border-orange-500/40 backdrop-blur-2xl rounded-2xl shadow-2xl z-20">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              Harmonizing With The Wild
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

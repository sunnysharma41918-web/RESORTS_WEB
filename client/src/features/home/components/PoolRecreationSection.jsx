import React from 'react';
import { Sparkles, Sun, Waves, Wine } from 'lucide-react';

export default function PoolRecreationSection() {
  const highlights = [
    { title: 'Heated Mineral Water', desc: 'Maintained at a soothing 29°C year-round', icon: Waves },
    { title: 'Private Daybed Cabanas', desc: 'Complimentary sunscreen, chilled towels & fruit mist', icon: Sun },
    { title: 'Sunken Poolside Bar', desc: 'Fresh cold-pressed juices and vintage champagne', icon: Wine },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#171C28] text-white overflow-hidden select-none border-t border-[#5E6575]/25">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@700;800;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .pl-display { font-family: 'Rokkitt', Georgia, serif; }
        .pl-body { font-family: 'Ubuntu', sans-serif; }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#3FD3C9]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#5E6575]/30">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.25em] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LEISURE & RECREATION</span>
            </div>
            <h2 className="pl-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Make Time For <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FD3C9] via-white to-[#B72257]">What Matters</span>
            </h2>
          </div>

          <p className="pl-body max-w-md text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            Floating between the azure sky and emerald mountain valleys. Our multi-tiered 
            pools and private sun cabanas create an oasis of unhurried bliss.
          </p>
        </div>

        {/* Cinematic Wide Image with Floating Cards */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[360px] shadow-2xl border border-[#5E6575]/35 group bg-[#1F2536]">
          <img
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=90"
            alt="Horizon Infinity Pool and Lounges"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171C28]/90 via-[#171C28]/30 to-transparent" />

          {/* Bottom Floating Telemetry Pills */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-1 sm:grid-cols-3 gap-3 z-20">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="p-4 rounded-2xl bg-[#171C28]/85 backdrop-blur-xl border border-[#5E6575]/30 flex items-center space-x-3.5 shadow-xl"
                >
                  <div className="p-2.5 rounded-xl bg-[#3FD3C9]/15 border border-[#3FD3C9]/30 text-[#3FD3C9]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="pl-display text-sm font-bold text-white">{h.title}</h4>
                    <p className="pl-body text-[11px] text-white/65">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AboutPhilosophy({ data }) {
  const { heading, items } = data || {};

  const pillars = items && items.length > 0 ? items : [
    {
      number: '01',
      title: 'Architectural Singularity',
      description: 'No two Country Holidays properties share a blueprint. Each structure emerges organically from its topography, combining raw basalt, slate, warm timbers, and floor-to-ceiling glass.',
    },
    {
      number: '02',
      title: 'Stillness as Luxury',
      description: 'We eliminate the noise of modern life. Expansive spatial proportions, acoustic buffering, and private open-sky pools return you to pure personal equilibrium.',
    },
    {
      number: '03',
      title: 'Elemental Context',
      description: 'Architecture that respects the land. Natural thermal heating, indigenous flora conservation, and solar integration ensure minimal environmental footprint.',
    },
    {
      number: '04',
      title: 'Unhurried Hospitality',
      description: 'No rigid schedules. Private dining when you desire, tailored excursions at your pace, and discreet 24/7 personal concierge care.',
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-luxury-black text-luxury-light px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-orange-500/30 backdrop-blur-xl text-xs uppercase tracking-luxury text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{heading || 'THE FOUR PILLARS'}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
            Guiding Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-8 bg-luxury-card border border-luxury-border/80 hover:border-orange-500/50 rounded-3xl flex flex-col justify-between space-y-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(255,107,0,0.15)] group"
            >
              <span className="font-mono text-3xl font-extrabold text-orange-500/70 group-hover:text-orange-400 transition-colors">
                {pillar.number}
              </span>

              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-200 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

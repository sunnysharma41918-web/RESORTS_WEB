import React, { useState } from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

export default function ExperienceGrid({ experiences = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Ocean & Water', 'Adventure', 'Spa & Wellness', 'Culinary & Heritage', 'Fine Dining'];

  const filtered = activeCategory === 'All'
    ? experiences
    : experiences.filter((e) => e.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-20 bg-luxury-dark text-luxury-light px-6 sm:px-12 lg:px-16 xl:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Category Filter Pills with Glowing Orange Active State */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-luxury-border/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-luxury transition-all duration-300',
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-orange-500 text-black font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)] scale-105 border border-orange-400'
                  : 'bg-black/50 border border-luxury-border text-luxury-muted hover:border-orange-500/40 hover:text-white backdrop-blur-md'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experiences Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="group bg-luxury-card border border-luxury-border/80 hover:border-orange-500/50 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-luxury-stone">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1 bg-black/65 backdrop-blur-md border border-orange-500/30 rounded-full text-[10px] uppercase tracking-luxury font-bold text-orange-400">
                  {exp.category}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-200 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-luxury-border/60 flex items-center justify-between text-xs text-luxury-muted">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

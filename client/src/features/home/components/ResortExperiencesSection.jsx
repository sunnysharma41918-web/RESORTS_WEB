import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';

const experiences = [
  {
    num: '01',
    name: 'SPA & AYURVEDIC WELLNESS',
    tag: 'Restoration',
    desc: 'Geothermal thermal pools, Himalayan salt stone therapy, and bespoke Ayurvedic balancing rituals overseen by master practitioners.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=90',
  },
  {
    num: '02',
    name: 'CLIFFTOP PRIVATE DINING',
    tag: 'Gastronomy',
    desc: 'Private seven-course chef tasting menu served under celestial night skies overlooking sheer mountain rockfaces.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90',
  },
  {
    num: '03',
    name: 'BOTANICAL FOREST EXPEDITIONS',
    tag: 'Exploration',
    desc: 'Guided dawn trek through 500 acres of protected wildlife corridors, discovering ancient spice trees and rare avian habitats.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    num: '04',
    name: 'SUNSET HORIZON CRUISE',
    tag: 'Voyage',
    desc: 'Private luxury catamaran journey along tranquil coastal fjords with vintage champagne and artisanal hors d\'oeuvres.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90',
  },
  {
    num: '05',
    name: 'MOUNTAIN HELI ADVENTURE',
    tag: 'Aviation',
    desc: 'Exclusive heli-charter ascending to untouched alpine peaks for private champagne picnics and aerial ridge views.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=90',
  },
];

export default function ResortExperiencesSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#000000] text-white py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#333333]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>04 — EXPERIENCES</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
                EXPERIENCES <br />
                THAT STAY <br />
                WITH YOU.
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-4 max-w-sm">
            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light text-[#D0D0D0] leading-relaxed">
                Curated moments that awaken the senses and deepen your connection with the wild beauty of the surrounding wilderness.
              </p>
            </ScrollReveal>

            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous experiences"
                className="w-12 h-12 rounded-none border border-[#333333] text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next experiences"
                className="w-12 h-12 rounded-none border border-[#333333] text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Stream */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.num}
              className="min-w-[300px] sm:min-w-[380px] lg:min-w-[420px] snap-start flex flex-col justify-between p-6 sm:p-8 bg-[#1C1C1C] border border-[#333333] hover:border-[#FF1F02] transition-all duration-500 group cursor-pointer"
              data-cursor="VIEW"
            >
              {/* Image Frame */}
              <div className="relative rounded-none overflow-hidden aspect-[4/3] bg-black mb-6">
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono font-bold text-[#FF1F02] bg-black/80 px-2.5 py-1 border border-[#333333]">
                    {exp.num}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B0B0B0] block">
                    {exp.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#FF1F02] transition-colors leading-tight">
                    {exp.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#D0D0D0] leading-relaxed line-clamp-3">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D0D0D0] group-hover:text-white transition-colors">
                    RESERVE EXPERIENCE
                  </span>
                  <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-[#FF1F02] group-hover:text-[#FF1F02] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
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
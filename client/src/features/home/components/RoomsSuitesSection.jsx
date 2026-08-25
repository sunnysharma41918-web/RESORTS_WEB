import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

const villas = [
  {
    tier: '01',
    name: 'THE FOREST POOL VILLA',
    category: 'Cantilevered Over Emerald Cliffs',
    price: '$1,250',
    specs: ['Private Pool', '2–4 Guests', '1,990 SQ FT'],
    description:
      'Private infinity plunge pool cantilevered over emerald coastal cliffs, featuring floor-to-ceiling glass pavilions, private sundeck, and outdoor stone soaking tub.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=90',
  },
  {
    tier: '02',
    name: 'THE MONOLITH GLASS CHALET',
    category: 'Alpine Pine Ridge Sanctuary',
    price: '$1,680',
    specs: ['Skyroof Stargazing', '4–6 Guests', '2,580 SQ FT'],
    description:
      'Heated timber floors, a panoramic glass sky-roof for celestial stargazing, and an outdoor cedarwood hot tub directly overlooking high-altitude pine peaks.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90',
  },
  {
    tier: '03',
    name: 'BOTANICAL SANCTUARY SUITE',
    category: 'Ancient Spice Garden Estate',
    price: '$890',
    specs: ['Zen Courtyard', '2 Guests', '1,500 SQ FT'],
    description:
      'Surrounded by ancient spice trees and a private zen water courtyard, hand-crafted with locally quarried slate, teak finishings, and open-air botanical garden bath.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=90',
  },
];

export default function RoomsSuitesSection() {
  return (
    <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-36 relative z-10">

        {/* Section Header with Oversized Number */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>03 — ACCOMMODATION</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                STAY <br />
                YOUR <br />
                WAY.
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-3 md:text-right max-w-sm">
            <span className="text-6xl sm:text-8xl font-extrabold text-[#FF1F02] leading-none block">
              03
            </span>
            <p className="text-sm font-light text-[#0E0E0E]/70 leading-relaxed">
              Each villa is an architectural pavilion set apart, facing its own uninterrupted slice of high-altitude mountain horizon.
            </p>
          </div>
        </div>

        {/* Alternating Large Editorial Compositions (Instead of generic cards) */}
        <div className="space-y-28 sm:space-y-40">
          {villas.map((villa, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={villa.tier}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Large Photography Plate (7 Cols) */}
                <div
                  className={`lg:col-span-7 relative ${
                    isEven ? 'lg:col-start-6' : 'lg:col-start-1'
                  }`}
                >
                  <ScrollReveal direction="clip" delay={100}>
                    <div
                      className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#E9E9DE] shadow-xl group bg-[#FAFDF2]"
                      data-cursor="VIEW"
                    >
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      {/* Top Corner Pill */}
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-3.5 py-1 text-[11px] uppercase font-mono tracking-widest bg-[#FAFDF2]/90 backdrop-blur-md text-[#0E0E0E] font-semibold border border-[#E9E9DE]">
                          {villa.category}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Editorial Metadata & Minimal Button (5 Cols) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <ScrollReveal direction="up" delay={150}>
                    <div className="flex items-baseline justify-between border-b border-[#E9E9DE] pb-4">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#FF1F02] tracking-tight">
                        {villa.tier}
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] text-[#0E0E0E]/50 uppercase tracking-widest block font-semibold">Starting from</span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#0E0E0E]">{villa.price}</span>
                        <span className="text-xs text-[#0E0E0E]/60 ml-1">/ night</span>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={250}>
                    <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-tight">
                      {villa.name}
                    </h3>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={350}>
                    <p className="text-sm sm:text-base font-light text-[#0E0E0E]/70 leading-relaxed">
                      {villa.description}
                    </p>
                  </ScrollReveal>

                  {/* Minimal Specs Tag Line */}
                  <ScrollReveal direction="up" delay={450}>
                    <div className="flex flex-wrap gap-4 py-3 border-y border-[#E9E9DE] text-xs font-mono uppercase tracking-wider text-[#0E0E0E]/70">
                      {villa.specs.map((spec, sIdx) => (
                        <span key={sIdx} className="inline-flex items-center gap-2">
                          {sIdx > 0 && <span className="text-[#FF1F02]">/</span>}
                          <span>{spec}</span>
                        </span>
                      ))}
                    </div>
                  </ScrollReveal>

                  {/* Editorial Button */}
                  <ScrollReveal direction="up" delay={550}>
                    <div className="pt-2">
                      <MagneticButton>
                        <Link
                          to="/resorts"
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-[#0E0E0E] text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all duration-300 group"
                        >
                          <span>EXPLORE →</span>
                        </Link>
                      </MagneticButton>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
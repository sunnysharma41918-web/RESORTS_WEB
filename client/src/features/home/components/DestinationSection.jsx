import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

const distances = [
  { destination: 'DELHI', time: '04 HRS', mode: 'Executive Chauffeur' },
  { destination: 'AIRPORT', time: '02 HRS', mode: 'Direct Highway' },
  { destination: 'CITY', time: '45 MIN', mode: 'Scenic Drive' },
  { destination: 'HELIPAD', time: 'ON-SITE', mode: 'Direct Landing Zone' },
];

export default function DestinationSection() {
  return (
    <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements - strictly in top-right whitespace away from left text */}
      <EditorialBackgroundElements variant="light" position="top-right" />
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Reusable Editorial Label */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>06 — LOCATION</span>
          </div>
        </ScrollReveal>

        {/* Editorial Location Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Heading & Travel Times (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                FAR FROM <br />
                THE <br />
                ORDINARY.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-base sm:text-lg font-normal text-[#0E0E0E]/80 leading-relaxed">
                Tucked into the high-altitude folds of the mountain ridge, offering absolute seclusion while remaining effortlessly reachable.
              </p>
            </ScrollReveal>

            {/* Travel Times Telemetry Rail with Thin Strokes */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-4 pt-4 border-t border-[#E9E9DE]">
                {distances.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-[#E9E9DE]"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E0E0E]">
                        {item.destination}
                      </span>
                      <span className="text-[10px] text-[#0E0E0E]/50 uppercase tracking-widest block font-mono">
                        {item.mode}
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0E0E0E]">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={450}>
              <div className="pt-2">
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-[#0E0E0E] text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all duration-300 group"
                  >
                    <span>GET DIRECTIONS →</span>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Landscape Photography with Upper Overlapping Monumental Text (7 Cols) */}
          <div className="lg:col-span-7 relative pt-12 sm:pt-16 lg:pt-20">
            {/* Monumental Text Positioned Upper & Overlapping Image Top */}
            <div className="absolute top-0 -left-4 sm:-left-8 lg:-left-12 z-30 pointer-events-none select-none">
              <span className="text-7xl sm:text-9xl lg:text-[10rem] font-extrabold uppercase tracking-[-0.05em] leading-none text-[#0E0E0E] block">
                TERRAIN
              </span>
            </div>

            <ScrollReveal direction="clip" delay={200}>
              <div
                className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#E9E9DE] shadow-2xl group bg-[#FAFDF2] z-10"
                data-cursor="VIEW"
              >
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90"
                  alt="High Mountain Panoramic Location"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                  <span className="tracking-widest uppercase">GPS: 31.1048° N, 77.1734° E</span>
                  <span className="text-[#FF1F02] font-bold">PRIVATE SANCTUARY</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

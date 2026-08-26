import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import { accommodationService, DEFAULT_ACCOMMODATIONS } from '../../../services/accommodationService';

export default function RoomsSuitesSection() {
  const [villas, setVillas] = useState(DEFAULT_ACCOMMODATIONS);

  useEffect(() => {
    async function loadVillas() {
      try {
        const data = await accommodationService.getAllAccommodations();
        if (data && data.length > 0) {
          setVillas(data);
        }
      } catch (err) {
        console.error('Failed to load accommodations:', err);
      }
    }
    loadVillas();
  }, []);

  const totalCountFormatted = String(villas.length).padStart(2, '0');

  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-36 relative z-10">

        {/* Section Header with Oversized Number */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b dark:border-[#333333] border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>02 — ACCOMMODATION</span>
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
              {totalCountFormatted}
            </span>
            <p className="text-sm font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70 leading-relaxed">
              Each villa is an architectural pavilion set apart, facing its own uninterrupted slice of high-altitude mountain horizon.
            </p>
          </div>
        </div>

        {/* Alternating Large Editorial Compositions */}
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
                      className="relative rounded-none overflow-hidden aspect-[16/11] border dark:border-[#333333] border-[#E9E9DE] shadow-xl group dark:bg-[#0E0E0E] bg-[#FAFDF2]"
                      data-cursor="VIEW"
                    >
                      <img
                        src={villa.image}
                        alt={villa.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Tier Floating Plate */}
                      <div className="absolute top-6 left-6 px-4 py-1.5 dark:bg-[#0E0E0E]/90 bg-white/90 backdrop-blur-md border dark:border-[#333333] border-[#E9E9DE] text-xs font-mono font-bold dark:text-white text-[#0E0E0E]">
                        TIER {villa.tier}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Editorial Details & Specifications (5 Cols) */}
                <div
                  className={`lg:col-span-5 space-y-8 ${
                    isEven ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <ScrollReveal direction="up" delay={200}>
                    <div className="space-y-3">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF1F02] font-semibold block">
                        {villa.category}
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E] leading-[0.95]">
                        {villa.name}
                      </h3>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={300}>
                    <p className="text-sm sm:text-base font-light dark:text-[#A0A0A0] text-[#0E0E0E]/75 leading-relaxed">
                      {villa.description}
                    </p>
                  </ScrollReveal>

                  {/* Architecture Specs Pills */}
                  <ScrollReveal direction="up" delay={400}>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {villa.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider border dark:border-[#333333] border-[#E9E9DE] dark:bg-[#0E0E0E] bg-white dark:text-white text-[#0E0E0E]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </ScrollReveal>

                  {/* Action Link */}
                  <ScrollReveal direction="up" delay={500}>
                    <div className="pt-4">
                      <MagneticButton>
                        <Link
                          to="/offers"
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-none border dark:border-white border-[#0E0E0E] dark:text-white text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all duration-300 group cursor-pointer"
                        >
                          <span>DISCOVER RESIDENCE</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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
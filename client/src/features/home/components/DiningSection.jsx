import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

export default function DiningSection() {
  return (
    <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Reusable Editorial Label */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>04 — DINING</span>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Culinary Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Overlapping Editorial Imagery with Upper Monumental Text (7 Cols) */}
          <div className="lg:col-span-7 relative pt-12 sm:pt-16 lg:pt-20">
            {/* Monumental Text Positioned Upper & Overlapping Image Top with Cross Red Slash */}
            <div className="absolute top-0 -left-4 sm:-left-8 lg:-left-12 z-30 pointer-events-none select-none">
              <span className="text-7xl sm:text-9xl lg:text-[10rem] font-extrabold uppercase tracking-[-0.05em] leading-none text-art-orange block">
                CUISINE
              </span>
            </div>

            <ScrollReveal direction="clip" delay={200}>
              <div
                className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#E9E9DE] shadow-2xl group bg-[#FAFDF2] z-10"
                data-cursor="VIEW"
              >
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90"
                  alt="Fine Dining Gastronomy Pavilion"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 text-white text-xs font-mono tracking-widest uppercase">
                  <span>THE CLIFFTOP CELLAR • 2 MICHELIN STARS</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Overlapping Secondary Image Plate */}
            <div className="hidden sm:block absolute -bottom-10 -right-8 w-56 lg:w-64 z-20">
              <ScrollReveal direction="scale" delay={250}>
                <div className="rounded-none overflow-hidden aspect-square border-2 border-[#FAFDF2] shadow-2xl bg-[#FAFDF2]">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
                    alt="Artisanal Plating Detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Narrative (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <ScrollReveal direction="up" delay={150}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange">
                FOOD <br />
                WORTH <br />
                REMEMBERING.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-lg font-normal text-[#0E0E0E]/80 leading-relaxed">
                Zero-kilometer culinary craft celebrating the unhurried passage of mountain seasons. Ingredients harvested at dawn from 500-acre organic estate gardens.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350}>
              <p className="text-sm sm:text-base font-light text-[#0E0E0E]/65 leading-relaxed">
                Paired with biodynamic vintages from our sommelier cellar, carved into subterranean rock strata beneath the ridge pavilion.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={450}>
              <div className="pt-2">
                <MagneticButton>
                  <Link
                    to="/experiences"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-[#0E0E0E] text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all duration-300 group"
                  >
                    <span>DISCOVER DINING →</span>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

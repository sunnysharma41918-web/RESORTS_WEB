import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';

export default function ResortIntro() {
  return (
    <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Reusable Editorial Label */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>01 — ABOUT THE RESORT</span>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Monumental Editorial Typography & Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
                A QUIETER <br />
                WAY TO <br />
                ESCAPE.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-lg font-normal text-[#0E0E0E]/80 leading-relaxed max-w-xl">
                A sanctuary dedicated to the unhurried life. Set high along the high mountain ridge, where morning mist rises through ancient cedar forests and clock time dissolves into horizon vistas.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="text-sm sm:text-base font-light text-[#0E0E0E]/65 leading-relaxed max-w-lg">
                Crafted from locally quarried granite slate, reclaimed cedar, and panoramic low-iron glass walls. Every suite is positioned to face undisturbed mountain horizons, offering a profound reconnection with natural circadian rhythms.
              </p>
            </ScrollReveal>

            {/* Small Offset Accent Image */}
            <ScrollReveal direction="scale" delay={350}>
              <div className="pt-4 max-w-sm">
                <div
                  className="relative rounded-sm overflow-hidden aspect-[4/3] border border-[#E9E9DE] group bg-[#FAFDF2]"
                  data-cursor="VIEW"
                >
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85"
                    alt="Sanctuary Architecture Detail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest uppercase text-[#0E0E0E] bg-[#FAFDF2]/90 backdrop-blur-sm px-2.5 py-1 border border-[#E9E9DE]">
                    Slate & Timber Pavilion
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={450}>
              <div className="pt-2">
                <MagneticButton>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-[#0E0E0E] text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all duration-300 group"
                  >
                    <span>EXPLORE THE ESTATE</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Master Image with Upper Overlapping Monumental Text (5 Cols) */}
          <div className="lg:col-span-5 relative pt-10 sm:pt-14">
            {/* Monumental Text Positioned Upper & Overlapping Image Top - Cleanly fitted with rich color */}
            <div className="absolute top-0 left-0 z-30 pointer-events-none select-none">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-none text-art-trio block">
                SANCTUARY
              </span>
            </div>

            {/* Animated Red CHHR Heritage Stamp Overlapping Corner */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-40">
              <EditorialHeritageStamp size={100} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " />
            </div>

            <ScrollReveal direction="clip" delay={200}>
              <div
                className="relative rounded-none overflow-hidden aspect-[3/4] border border-[#E9E9DE] shadow-2xl group bg-[#FAFDF2] z-10"
                data-cursor="VIEW"
              >
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=90"
                  alt="High Altitude Mountain Sanctuary"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                  <span className="tracking-widest uppercase">ELEVATION 1,850M</span>
                  <span className="text-[#FF1F02] font-bold">● 2026</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
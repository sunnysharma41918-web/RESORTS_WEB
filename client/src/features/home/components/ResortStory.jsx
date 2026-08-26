import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';

export default function ResortStory() {
  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="dark" position="bottom-left" />
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Reusable Editorial Label */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>01 — OUR STORY</span>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Editorial Composition with Overlapping Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Overlapping Large Resort Master Imagery (7 Cols) */}
          <div className="lg:col-span-7 relative">
            {/* Animated CHHR Stamp Overlapping Top Right of Image */}
            <div className="absolute -top-10 -right-6 sm:-top-12 sm:-right-8 z-30">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " year="EST 2026" />
            </div>

            <ScrollReveal direction="clip" delay={100}>
              <div
                className="relative rounded-none overflow-hidden aspect-[16/11] border dark:border-[#333333] border-[#E9E9DE] shadow-2xl group dark:bg-[#000000] bg-white"
                data-cursor="VIEW"
              >
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=75"
                  alt="Untouched Mountain Valley Sanctuary"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-[#1C1C1C]/90 from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Editorial Telemetry Rail */}
                <div className="absolute bottom-6 left-6 right-6 p-5 border dark:border-[#333333] border-[#E9E9DE] dark:bg-[#1C1C1C]/90 bg-white/95 backdrop-blur-md flex items-center justify-between shadow-lg">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-semibold block">
                      OUR HOSPITALITY VISION
                    </span>
                    <h4 className="text-sm sm:text-base font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                      Memories That Last a Lifetime
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full border dark:border-white/20 border-[#0E0E0E]/20 flex items-center justify-center dark:text-white/70 text-[#0E0E0E]">
                    <Compass className="w-4 h-4 text-[#FF1F02]" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Narrative & Typography (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <ScrollReveal direction="up" delay={150}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[0.95] text-art-orange-dark">
                A JOURNEY OF <br />
                COMFORT, <br />
                EXPERIENCES <br />
                & MEMORIES.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-lg font-normal dark:text-white text-[#0E0E0E] leading-relaxed">
                Country Holidays Hotels & Resorts was created with a simple vision — to make every holiday comfortable, memorable, and truly special.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350}>
              <p className="text-sm sm:text-base font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 leading-relaxed">
                From peaceful retreats to exciting getaways, we focus on bringing together warm hospitality, relaxing stays, and experiences worth remembering.
              </p>
            </ScrollReveal>

            {/* Quick Metrics Rail with Thin Stroke */}
            <ScrollReveal direction="up" delay={450}>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t dark:border-[#333333] border-[#E9E9DE]">
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold dark:text-white text-[#0E0E0E] tracking-tight">100%</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] dark:text-[#B0B0B0] text-[#0E0E0E]/60 block">
                    Warm Hospitality
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#FF1F02] tracking-tight">24/7</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] dark:text-[#B0B0B0] text-[#0E0E0E]/60 block">
                    Dedicated Concierge
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={550}>
              <div className="pt-2">
                <MagneticButton>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none border dark:border-white border-[#0E0E0E] dark:text-white text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all duration-300 group cursor-pointer"
                  >
                    <span>READ OUR STORY</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';

export default function ResortStory() {
  return (
    <section className="relative bg-[#1C1C1C] text-white py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="dark" position="bottom-left" />
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Reusable Editorial Label */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>02 — OUR STORY</span>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Editorial Composition with Overlapping Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Overlapping Large Resort Master Imagery (7 Cols) */}
          <div className="lg:col-span-7 relative">
            {/* Animated CHTR Stamp Overlapping Top Right of Image */}
            <div className="absolute -top-10 -right-6 sm:-top-12 sm:-right-8 z-30">
              <EditorialHeritageStamp size={110} centerText="CHTR" year="EST 2026" />
            </div>

            <ScrollReveal direction="clip" delay={100}>
              <div
                className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#333333] shadow-2xl group bg-[#000000]"
                data-cursor="VIEW"
              >
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=90"
                  alt="Untouched Mountain Valley Sanctuary"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Editorial Telemetry Rail */}
                <div className="absolute bottom-6 left-6 right-6 p-5 border border-[#333333] bg-[#1C1C1C]/90 backdrop-blur-md flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-semibold block">
                      ARCHITECTURAL MANIFESTO
                    </span>
                    <h4 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white">
                      The Geometry of Slow Living
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70">
                    <Compass className="w-4 h-4 text-[#FF1F02]" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Narrative & Typography (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <ScrollReveal direction="up" delay={150}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
                NOT JUST <br />
                A PLACE <br />
                TO STAY.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-lg font-normal text-[#D0D0D0] leading-relaxed">
                Before laying a single foundation stone, our master architects studied the seasonal winds, celestial night skies, and centuries-old mountain topography.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350}>
              <p className="text-sm sm:text-base font-light text-[#B0B0B0] leading-relaxed">
                Here, luxury is not measured in gilded excesses, but in uninterrupted hours of silence, dawn mist rising over your private plunge pool, and the scent of wild cedar burning on stone hearths.
              </p>
            </ScrollReveal>

            {/* Quick Metrics Rail with Thin Stroke */}
            <ScrollReveal direction="up" delay={450}>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#333333]">
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">100%</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#B0B0B0] block">
                    Solar Micro-Grid
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#FF1F02] tracking-tight">500</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#B0B0B0] block">
                    Acres Nature Corridor
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={550}>
              <div className="pt-2">
                <MagneticButton>
                  <Link
                    to="/sanctuary-ethos"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-white text-white font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] transition-all duration-300 group"
                  >
                    <span>READ OUR ETHOS</span>
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
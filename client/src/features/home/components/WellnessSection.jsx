import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

export default function WellnessSection() {
  return (
    <section className="relative bg-[#1C1C1C] text-white py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements - strictly in bottom-left whitespace away from right text */}
      <EditorialBackgroundElements variant="dark" position="bottom-left" />
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Reusable Editorial Label */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>05 — WELLNESS</span>
          </div>
        </ScrollReveal>

        {/* Calm Minimalist Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Atmospheric Spa Master Photography (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal direction="clip" delay={150}>
              <div
                className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#333333] shadow-2xl group bg-[#000000]"
                data-cursor="VIEW"
              >
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=90"
                  alt="Atmospheric Thermal Spa Sanctuary"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 text-white text-xs font-mono tracking-widest uppercase">
                  <span>GEOTHERMAL THERMAL SANCTUARY • SOUND THERAPY</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative & Stillness Focus (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <ScrollReveal direction="up" delay={200}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-yellow-dark">
                REST. <br />
                RESET. <br />
                RECONNECT.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="text-base sm:text-lg font-normal text-[#D0D0D0] leading-relaxed">
                Step into a sanctuary dedicated to silence, natural circadian alignment, and ancient Ayurvedic restoration.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <p className="text-sm sm:text-base font-light text-[#B0B0B0] leading-relaxed">
                Featuring heated mineral spring pools, Tibetan bowl resonance chambers, and private cedar steam pavilions overlooking mountain cloud forests.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <div className="pt-2">
                <MagneticButton>
                  <Link
                    to="/sanctuary-rituals"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-white text-white font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#FF1F02] hover:border-[#FF1F02] transition-all duration-300 group"
                  >
                    <span>EXPLORE WELLNESS →</span>
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

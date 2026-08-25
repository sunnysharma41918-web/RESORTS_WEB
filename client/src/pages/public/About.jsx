import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, TreePine, Sun, Moon, Sparkles, Layers } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';

const pillars = [
  {
    number: '01',
    title: 'BIO-HARMONIC ARCHITECTURE',
    desc: 'Every pavilion is sculpted directly into high-altitude rock faces using locally quarried slate, timber, and low-iron acoustic glass.',
    accent: '#FF1F02',
  },
  {
    number: '02',
    title: 'DEEP ECOLOGICAL STEWARDSHIP',
    desc: '500-acre private conservation corridor operating 100% off-grid with clean solar micro-grids and zero single-use plastics.',
    accent: '#EAB308',
  },
  {
    number: '03',
    title: 'THE GASTRONOMY OF TIME',
    desc: 'Zero-kilometer culinary craft celebrating unhurried seasonal harvests from our subterranean cellars and organic estate gardens.',
    accent: '#16A34A',
  },
  {
    number: '04',
    title: 'UNHURRIED SILENCE',
    desc: 'Protected night skies with zero light pollution, Ayurvedic geothermal realignment, and sound chambers designed for deep restorative sleep.',
    accent: '#FF1F02',
  },
];

const milestones = [
  { year: '2020', title: 'Topographical Survey', desc: '500 acres of high-altitude Himalayan ridge mapped with zero tree felling.' },
  { year: '2022', title: 'Stone Quarrying & Foundation', desc: 'Architects and master stonemasons sculpt the first subterranean pavilions.' },
  { year: '2024', title: 'Solar Micro-Grid Activation', desc: 'Full off-grid energetic independence achieved with renewable solar storage.' },
  { year: '2026', title: 'Global Inauguration', desc: 'Opening the sanctuary to travelers seeking uncompromised architectural tranquility.' },
];

export default function About() {
  return (
    <div className="w-full bg-[#1C1C1C] text-white overflow-hidden font-manrope">

      {/* 1. HERO SECTION: CINEMATIC MONUMENTAL BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b border-[#333333] overflow-hidden select-none">
        {/* Background Subtle Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3000&q=90"
            alt="Mountain Sanctuary Mist Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>THE ARCHITECTURAL MANIFESTO</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8.5rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              BORN FROM <br />
              STONE & <br />
              <span className="text-art-trio">STILLNESS.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-2xl mx-auto leading-relaxed">
              We built CHTR not as a hotel, but as a sanctuary of deceleration — where architecture bows to the wilderness and time is measured only by the sun.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Editorial Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● CHTR SANCTUARY RESORT</span>
          <span>ELEVATION: 1,850 METERS</span>
          <span>EST. 2026</span>
        </div>
      </section>


      {/* 2. SECTION 01: OUR VISION IN IVORY (#FAFDF2) WITH TEXT-OVER-IMAGE */}
      <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">
          
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>01 — THE VISION</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Typography Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
                  A QUIETER <br />
                  WAY TO <br />
                  EXIST.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <p className="text-base sm:text-lg font-normal text-[#0E0E0E]/80 leading-relaxed max-w-xl">
                  Modern life operates at relentless speed. We created a high-altitude sanctuary where sensory clutter falls away, replaced by sweeping mountain horizons, crackling cedar hearths, and unhurried hospitality.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="text-sm sm:text-base font-light text-[#0E0E0E]/65 leading-relaxed max-w-xl">
                  Every villa is oriented toward the morning sun, designed with low-iron acoustic glass that dampens exterior noise to an extraordinary 24 decibels — the sound of quiet breathing.
                </p>
              </ScrollReveal>

              {/* Offset Material Plate */}
              <ScrollReveal direction="scale" delay={350}>
                <div className="pt-4 max-w-sm">
                  <div className="p-6 bg-white border border-[#E9E9DE] shadow-md space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block">
                      ARCHITECTURAL MATERIALITY
                    </span>
                    <h4 className="text-base font-bold uppercase text-[#0E0E0E]">
                      Locally Quarried Valley Slate & Cedar
                    </h4>
                    <p className="text-xs text-[#0E0E0E]/70 font-light">
                      Naturally insulating materials that absorb daytime mountain sunlight and radiate soothing warmth through the cool evening hours.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Master Image with Upper Overlapping SANCTUARY Typography (5 Cols) */}
            <div className="lg:col-span-5 relative pt-10 sm:pt-14">
              
              {/* Monumental Text Positioned Upper & Overlapping Image Top - Cleanly fitted with rich color */}
              <div className="absolute top-0 left-0 z-30 pointer-events-none select-none">
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-none text-art-trio block">
                  SANCTUARY
                </span>
              </div>

              {/* Animated Red CHTR Stamp Overlapping Corner */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-40">
                <EditorialHeritageStamp size={100} centerText="CHTR" year="EST 2026" />
              </div>

              <ScrollReveal direction="clip" delay={200}>
                <div className="relative rounded-none overflow-hidden aspect-[3/4] border border-[#E9E9DE] shadow-2xl group bg-[#FAFDF2] z-10" data-cursor="VIEW">
                  <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=90"
                    alt="High Mountain Sanctuary Architecture"
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


      {/* 3. SECTION 02: THE 4 FOUNDATIONAL PILLARS IN DARK (#1C1C1C) */}
      <section className="relative bg-[#1C1C1C] text-white py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="dark" position="bottom-left" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#333333]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>02 — OUR PILLARS</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
                  GUIDED BY <br />
                  PURPOSE.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light text-[#D0D0D0] max-w-sm leading-relaxed">
                Four immovable commitments that define our architecture, our zero-emission estate, and our hospitality.
              </p>
            </ScrollReveal>
          </div>

          {/* 4 Pillars Grid with Thin Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.number} direction="up" delay={idx * 80}>
                <div className="p-8 bg-[#000000] border border-[#333333] hover:border-[#FF1F02] transition-all duration-300 h-full flex flex-col justify-between group">
                  <div className="space-y-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FF1F02]">
                      ● {pillar.number}
                    </span>
                    <h3 className="text-xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#FF1F02] transition-colors leading-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#B0B0B0] font-light leading-relaxed pt-8 border-t border-[#333333]/60 mt-8">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* 4. SECTION 03: ARCHITECTURAL CHRONOLOGY TIMELINE IN IVORY (#FAFDF2) */}
      <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>03 — CHRONOLOGY</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                  THE MAKING <br />
                  OF CHTR.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light text-[#0E0E0E]/70 max-w-sm leading-relaxed">
                Six years of unhurried craftsmanship, topographic reverence, and zero-compromise sustainable engineering.
              </p>
            </ScrollReveal>
          </div>

          {/* Timeline Rail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <ScrollReveal key={m.year} direction="up" delay={idx * 100}>
                <div className="space-y-4 border-t-2 border-[#0E0E0E] pt-6 group">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#0E0E0E] font-mono block group-hover:text-[#FF1F02] transition-colors">
                    {m.year}
                  </span>
                  <h4 className="text-base font-bold uppercase tracking-tight text-[#0E0E0E]">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0E0E0E]/70 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* 5. FINAL CTA: INVITATION TO EXPERIENCE THE ESTATE IN PURE BLACK */}
      <section className="relative bg-[#000000] text-white py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Background Photography Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Sunrise Mountain Peak Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHTR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHTR" year="EST 2026" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>04 — INVITATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
              EXPERIENCE <br />
              THE SANCTUARY.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Step beyond the ordinary. Reserve your private residence high above the clouds and discover the art of unhurried living.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/resorts"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
                >
                  <span>EXPLORE RESIDENCES</span>
                  <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300"
                >
                  <span>DIRECT INQUIRIES</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
              <span>● 100% OFF-GRID SOLAR</span>
              <span>● 500-ACRE CONSERVATION ESTATE</span>
              <span>● 24/7 DEDICATED BUTLER</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}

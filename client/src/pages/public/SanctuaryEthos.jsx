import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Moon,
  Leaf,
  Compass,
  Layers,
  TreePine,
  Maximize2
} from 'lucide-react';
import Container from '../../components/common/Container';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';

const pillars = [
  {
    id: '01',
    title: 'BIO-HARMONIC ARCHITECTURE',
    subtitle: 'Villas sculpted into high-altitude rock faces.',
    desc: 'Every pavilion is built from locally quarried slate and panoramic low-iron glass walls.',
    icon: Layers,
    accent: '#FF1F02',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    rotation: '',
    offset: '',
  },
  {
    id: '02',
    title: 'DEEP ECOLOGICAL STEWARDSHIP',
    subtitle: '100% renewable solar micro-grid.',
    desc: '500-acre private wildlife sanctuary operating fully off-grid with purified botanical reed beds.',
    icon: Leaf,
    accent: '#FF1F02',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    rotation: '',
    offset: '',
  },
  {
    id: '03',
    title: 'THE GASTRONOMY OF TIME',
    subtitle: 'Zero-kilometer culinary art.',
    desc: 'Michelin-inspired farm-to-table dining celebrating unhurried seasonal harvests and wild honey.',
    icon: Sun,
    accent: '#FF1F02',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    rotation: '',
    offset: '',
  },
  {
    id: '04',
    title: 'UNHURRIED CONSCIOUSNESS',
    subtitle: 'Sacred silence & restorative wellness.',
    desc: 'Zero light pollution, Tibetan sound therapy, and geothermal mineral spring realignment.',
    icon: Moon,
    accent: '#FF1F02',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    rotation: '',
    offset: '',
  },
];

const materials = [
  {
    name: 'Quarried Valley Slate',
    origin: 'Local Mountain Quarry',
    desc: 'High thermal inertia stone that keeps interiors naturally cool during midday sun and radiates soothing warmth through twilight.',
  },
  {
    name: 'Reclaimed Teak & Cedar',
    origin: 'Certified Heritage Salvage',
    desc: 'Decades-cured timber finished with non-toxic natural beeswax, emitting a grounding aromatic cedar scent in every suite.',
  },
  {
    name: 'Mineral Copper & Brass',
    origin: 'Artisan Coppersmiths',
    desc: 'Hand-hammered soaking tubs that retain geothermal mineral heat and infuse water with natural antimicrobial properties.',
  },
  {
    name: 'Low-Iron Acoustic Glass',
    origin: 'Precision Optics',
    desc: 'Eliminates optical tint for 100% color-true mountain vistas while soundproofing suites to a whisper-quiet 24 decibels.',
  },
];

const manifestoChapters = [
  {
    chapter: 'Chapter I',
    title: 'THE GEOMETRY OF STILLNESS',
    text: 'Modern life exists at high velocity. We built this sanctuary as a sanctuary of deceleration — where time expands, clock-watching dissolves, and days are guided by morning mist, zenith sun, and evening starlight.',
  },
  {
    chapter: 'Chapter II',
    title: 'HONORING THE INDIGENOUS TERRAIN',
    text: 'Before laying a single stone, our architects studied the migration paths of native hornbills and the root systems of 300-year-old banyan trees. Every villa curves around the topography rather than altering it.',
  },
  {
    chapter: 'Chapter III',
    title: 'THE ART OF INTUITIVE CARE',
    text: 'Hospitality here is never transactional. Your dedicated private butler anticipates unspoken preferences — brewing herbal mountain teas as you return from dawn walks and lighting cedar hearth fires before evening chill.',
  },
];

export default function SanctuaryEthos() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activePillar, setActivePillar] = useState(pillars[0]);

  return (
    <div className="w-full bg-[#1C1C1C] text-white min-h-screen select-none overflow-x-hidden font-manrope">

      {/* 1. HERO SHOWCASE WITH PEDESTAL & FLOATING CARDS */}
      <section className="relative pt-28 pb-20 px-4 sm:px-8 lg:px-12 border-b border-[#333333] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10 mb-12 lg:mb-16">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-[#FF1F02] text-[#FF1F02] text-xs uppercase tracking-[0.16em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
              <span>OUR SANCTUARY ETHOS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white leading-[0.9] max-w-4xl mx-auto">
              THE ART OF{' '}
              <span className="text-[#FF1F02]">
                SLOW LIVING
              </span>{' '}
              <br className="hidden sm:block" />
              & ARCHITECTURAL SERENITY.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <p className="text-[#D0D0D0] text-sm sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              A manifesto for unhurried existence, bio-harmonic architecture, and nature stewardship high above the coastal valleys.
            </p>
          </ScrollReveal>
        </div>

        {/* 3D Showcase Grid */}
        <div className="max-w-7xl mx-auto relative z-20 pt-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Cards (Pillars 01 & 02) */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 order-2 lg:order-1">
              {[pillars[0], pillars[1]].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-[#FAFDF2] text-[#0E0E0E] p-6 sm:p-7 border border-[#E9E9DE] flex flex-col justify-between h-[270px] hover:border-[#FF1F02] transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#0E0E0E]/60 uppercase">
                          {pillar.id}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#0E0E0E]">
                          <Icon className="w-4 h-4 text-[#FF1F02]" />
                        </div>
                      </div>

                      <div className="space-y-2 my-auto">
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase leading-tight text-[#0E0E0E] tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#0E0E0E]/75 leading-relaxed font-light line-clamp-3">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0E0E0E]/50 group-hover:text-[#FF1F02] transition-colors">
                        <span>Explore Principle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central Active Preview Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 my-6 lg:my-0 relative">
              <div className="relative z-20 w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] overflow-hidden border border-[#333333] shadow-2xl group bg-black">
                <img
                  src={activePillar.image}
                  alt={activePillar.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                  <span className="px-3 py-1 bg-black/80 text-[#FF1F02] text-[10px] font-mono uppercase tracking-widest font-bold border border-[#333333]">
                    ACTIVE VILLA
                  </span>
                  <span className="w-8 h-8 bg-black/80 text-white flex items-center justify-center border border-[#333333]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="text-xs font-mono text-[#FF1F02] font-bold block">
                    PILLAR {activePillar.id}
                  </span>
                  <h4 className="text-xl font-bold uppercase text-white leading-tight">
                    {activePillar.title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Right Cards (Pillars 03 & 04) */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 order-3">
              {[pillars[2], pillars[3]].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-[#FAFDF2] text-[#0E0E0E] p-6 sm:p-7 border border-[#E9E9DE] flex flex-col justify-between h-[270px] hover:border-[#FF1F02] transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#0E0E0E]/60 uppercase">
                          {pillar.id}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#0E0E0E]">
                          <Icon className="w-4 h-4 text-[#FF1F02]" />
                        </div>
                      </div>

                      <div className="space-y-2 my-auto">
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase leading-tight text-[#0E0E0E] tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#0E0E0E]/75 leading-relaxed font-light line-clamp-3">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0E0E0E]/50 group-hover:text-[#FF1F02] transition-colors">
                        <span>Explore Principle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="max-w-7xl mx-auto pt-10 border-t border-[#333333]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">100%</span>
              <span className="block text-xs uppercase tracking-wider text-[#B0B0B0] font-medium">Solar Micro-Grid</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#FF1F02]">500</span>
              <span className="block text-xs uppercase tracking-wider text-[#B0B0B0] font-medium">Acres Nature Corridor</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">0%</span>
              <span className="block text-xs uppercase tracking-wider text-[#B0B0B0] font-medium">Single-Use Plastics</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#FF1F02]">24 dB</span>
              <span className="block text-xs uppercase tracking-wider text-[#B0B0B0] font-medium">Acoustic Stillness</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUSTAINABLE MATERIALITY IN IVORY */}
      <section className="py-24 sm:py-32 bg-[#FAFDF2] text-[#0E0E0E] border-b border-[#E9E9DE]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#0E0E0E]">
                <TreePine className="w-3.5 h-3.5 text-[#FF1F02]" />
                <span>HONEST MATERIALITY</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                Materials That Breathe With Nature
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="text-xs sm:text-sm font-light text-[#0E0E0E]/70 leading-relaxed max-w-xl mx-auto">
                Every texture inside our suites has been selected for its natural provenance, acoustic dampening, and age-defying patina.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((mat, idx) => (
              <ScrollReveal key={mat.name} direction="up" delay={idx * 80}>
                <div
                  className="p-7 bg-[#FAFDF2] border border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-300 space-y-3 h-full flex flex-col justify-between group"
                  data-cursor="VIEW"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#FF1F02] font-bold">0{idx + 1}</span>
                    <h4 className="text-lg font-bold uppercase text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors">
                      {mat.name}
                    </h4>
                    <span className="text-[11px] uppercase tracking-wider text-[#0E0E0E]/50 block">
                      {mat.origin}
                    </span>
                  </div>
                  <p className="text-xs text-[#0E0E0E]/70 font-light leading-relaxed">
                    {mat.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. MANIFESTO CHAPTERS IN DARK */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-b border-[#333333] bg-[#1C1C1C]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Chapter Selector */}
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal direction="up">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#FF1F02] mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>THE SANCTUARY MANIFESTO</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  Chapters of Purpose
                </h2>
              </ScrollReveal>

              <div className="space-y-3 pt-4">
                {manifestoChapters.map((chap, idx) => {
                  const isActive = idx === activeChapter;
                  return (
                    <button
                      key={chap.chapter}
                      type="button"
                      onClick={() => setActiveChapter(idx)}
                      className={`w-full p-5 text-left transition-all duration-300 border cursor-pointer ${
                        isActive
                          ? 'bg-black border-[#FF1F02] text-white'
                          : 'bg-[#1C1C1C] border-[#333333] text-[#B0B0B0] hover:text-white hover:border-white/40'
                      }`}
                    >
                      <span className="text-xs font-mono text-[#FF1F02] font-bold block mb-1">
                        {chap.chapter}
                      </span>
                      <h4 className="text-base font-bold uppercase text-white">
                        {chap.title}
                      </h4>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reading Canvas */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <div className="p-8 sm:p-14 bg-black border border-[#333333] shadow-2xl space-y-6">
                  <span className="text-xs font-mono tracking-widest text-[#FF1F02] uppercase font-bold">
                    {manifestoChapters[activeChapter].chapter} • READ & REFLECT
                  </span>

                  <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                    {manifestoChapters[activeChapter].title}
                  </h3>

                  <p className="text-[#D0D0D0] text-base sm:text-lg font-light leading-relaxed italic border-l-2 border-[#FF1F02] pl-6">
                    “{manifestoChapters[activeChapter].text}”
                  </p>

                  <div className="pt-4 flex items-center gap-4 text-xs font-mono text-[#B0B0B0]">
                    <span>Verified by Founder & Master Architect</span>
                    <span>•</span>
                    <span>2026 Edition</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. FINAL INVITATION CTA IN BLACK */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-24 px-6 sm:px-12 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Sunrise Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF1F02] text-[#FF1F02] text-xs uppercase tracking-[0.16em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
              <span>EXPERIENCE THE ETHOS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <h2 className="text-4xl sm:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Immerse Yourself In <br />
              <span className="text-[#FF1F02]">
                Authentic Stillness.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  to="/resorts"
                  className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <span>Explore Sanctuaries</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/sanctuary-rituals"
                  className="w-full sm:w-auto px-8 py-4 border border-white text-white hover:border-[#FF1F02] hover:text-[#FF1F02] font-semibold text-xs uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2"
                >
                  <span>Sanctuary Rituals</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
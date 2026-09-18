import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Moon,
  Leaf,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import Container from '../../components/common/Container';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';

const pillars = [
  {
    id: '01',
    title: 'BIO-HARMONIC ARCHITECTURE',
    subtitle: 'Villas sculpted into high-altitude rock faces.',
    desc: 'Every pavilion is built from locally quarried slate, hand-hewn cedar, and panoramic low-iron glass walls.',
    icon: Layers,
    accent: '#8F6B2E',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '02',
    title: 'DEEP ECOLOGICAL STEWARDSHIP',
    subtitle: '100% renewable solar micro-grid.',
    desc: '500-acre private wildlife sanctuary operating fully off-grid with purified botanical reed beds.',
    icon: Leaf,
    accent: '#8F6B2E',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '03',
    title: 'THE GASTRONOMY OF TIME',
    subtitle: 'Zero-kilometer culinary art.',
    desc: 'Palatial farm-to-table dining celebrating unhurried seasonal harvests and wild mountain honey.',
    icon: Sun,
    accent: '#8F6B2E',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '04',
    title: 'UNHURRIED CONSCIOUSNESS',
    subtitle: 'Sacred silence & restorative wellness.',
    desc: 'Zero light pollution, Vedic sound therapy, and geothermal mineral spring realignment.',
    icon: Moon,
    accent: '#8F6B2E',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  },
];

const materials = [
  {
    name: 'Locally Quarried Valley Slate',
    origin: 'Hand-Hewn by Master Stonemasons',
    desc: 'Thermal mass insulation that captures daily sunlight and releases gentle warmth during crisp mountain evenings.',
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
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] min-h-screen select-none overflow-x-hidden font-manrope transition-colors duration-500">

      {/* 1. HERO SHOWCASE IN ROYAL PALATIAL THEME WITH FULL DARK & LIGHT MODE */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
            alt="Sanctuary Architecture"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.95] opacity-25 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#8F6B2E] dark:text-[#D4AF37] bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 px-4 py-1 rounded-full border border-[#8F6B2E]/30 dark:border-[#8F6B2E]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
              <span>PHILOSOPHY OF TIMELESS LIVING</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#2A1F17] dark:text-[#F3EEE0] uppercase leading-[1.05]">
              THE ART OF <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">
                SLOW LIVING
              </span> <br />
              & SERENITY
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-2xl mx-auto leading-relaxed">
              A manifesto for unhurried existence, bio-harmonic architecture, and nature stewardship high above the valleys.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. PILLARS GRID */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal direction="up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
                THE FOUR FOUNDATIONAL PILLARS
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <RoyalOrnamentDivider color="#8F6B2E" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Cards */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-6">
              {[pillars[0], pillars[1]].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-[#FAF6F0] dark:bg-[#1C1814] text-[#2A1F17] dark:text-[#F3EEE0] p-6 sm:p-7 border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 rounded-2xl flex flex-col justify-between h-[260px] hover:border-[#8F6B2E] dark:hover:border-[#D4AF37] transition-all duration-300 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#8F6B2E] dark:text-[#D4AF37] uppercase">
                          {pillar.id}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#8F6B2E] dark:text-[#D4AF37]" />
                        </div>
                      </div>

                      <div className="space-y-2 my-auto">
                        <h3 className="font-serif text-lg sm:text-xl font-normal uppercase text-[#2A1F17] dark:text-[#F3EEE0]">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed font-light line-clamp-3">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#8F6B2E] dark:text-[#D4AF37] group-hover:underline">
                        <span>Explore Principle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central Active Preview Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center my-6 lg:my-0">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] overflow-hidden border border-[#8F6B2E]/30 rounded-2xl shadow-2xl bg-black">
                <img
                  src={activePillar.image}
                  alt={activePillar.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                  <span className="px-3 py-1 bg-[#14110E]/90 text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest font-bold border border-[#8F6B2E]/40 rounded-full">
                    ACTIVE ETHOS
                  </span>
                  <span className="w-8 h-8 bg-[#14110E]/90 text-[#FAF6F0] flex items-center justify-center border border-[#8F6B2E]/40 rounded-full">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    Pillar {activePillar.id}
                  </span>
                  <h3 className="font-serif text-2xl font-normal leading-tight">
                    {activePillar.title}
                  </h3>
                  <p className="text-xs text-[#FAF6F0]/80 font-light line-clamp-2">
                    {activePillar.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-6">
              {[pillars[2], pillars[3]].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-[#FAF6F0] dark:bg-[#1C1814] text-[#2A1F17] dark:text-[#F3EEE0] p-6 sm:p-7 border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 rounded-2xl flex flex-col justify-between h-[260px] hover:border-[#8F6B2E] dark:hover:border-[#D4AF37] transition-all duration-300 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#8F6B2E] dark:text-[#D4AF37] uppercase">
                          {pillar.id}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#8F6B2E] dark:text-[#D4AF37]" />
                        </div>
                      </div>

                      <div className="space-y-2 my-auto">
                        <h3 className="font-serif text-lg sm:text-xl font-normal uppercase text-[#2A1F17] dark:text-[#F3EEE0]">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed font-light line-clamp-3">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#8F6B2E] dark:text-[#D4AF37] group-hover:underline">
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
      </section>

      {/* 3. SUSTAINABLE MATERIALS SECTION */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 border-y border-[#8F6B2E]/20">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
              REVERENT MATERIALITY
            </h2>
            <RoyalOrnamentDivider color="#8F6B2E" />
            <p className="text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif max-w-xl mx-auto">
              Every texture is sourced with environmental consciousness, natural beauty, and acoustic tranquility in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {materials.map((mat, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 bg-[#FAF6F0] dark:bg-[#1C1814] border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 rounded-2xl space-y-3"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg text-[#2A1F17] dark:text-[#F3EEE0]">
                    {mat.name}
                  </h3>
                  <span className="text-[11px] font-mono uppercase text-[#8F6B2E] dark:text-[#D4AF37]">
                    {mat.origin}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-light leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. MANIFESTO CHAPTERS */}
      <section className="py-20 sm:py-28 px-4 sm:px-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8F6B2E] dark:text-[#D4AF37]">
                OUR MANIFESTO
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-[#2A1F17] dark:text-[#F3EEE0]">
                ARCHITECTURE IN CONVERSATION WITH NATURE
              </h2>
              <div className="space-y-2 pt-6">
                {manifestoChapters.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChapter(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                      activeChapter === idx
                        ? 'bg-[#8F6B2E]/15 border-[#8F6B2E] text-[#8F6B2E] dark:text-[#D4AF37]'
                        : 'border-transparent text-[#6E5D4F] dark:text-[#B8A89A] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="font-serif text-sm uppercase tracking-wider font-semibold">
                      {item.chapter}: {item.title}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${activeChapter === idx ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF6F0] dark:bg-[#1C1814] p-8 sm:p-12 border border-[#8F6B2E]/30 rounded-2xl">
              <span className="text-xs font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-widest">
                {manifestoChapters[activeChapter].chapter}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif mt-2 mb-6 text-[#2A1F17] dark:text-[#F3EEE0]">
                {manifestoChapters[activeChapter].title}
              </h3>
              <p className="text-base sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed italic border-l-2 border-[#8F6B2E] pl-6">
                “{manifestoChapters[activeChapter].text}”
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Jaali Border */}
      <div className="w-full">
        <IndianJaaliBorder />
      </div>
    </div>
  );
}
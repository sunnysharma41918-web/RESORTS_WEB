import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Clock, MapPin, Sparkles, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';

const curatedExperiences = [
  {
    id: '01',
    title: 'High-Altitude Sunrise Ridge Hike',
    category: 'EXPEDITION',
    duration: '3.5 Hours',
    timing: '05:30 AM Daily',
    specs: 'Elevation 2,100m • Private Alpine Naturalist',
    desc: 'Guided dawn ascent through ancient deodar and pine groves to witness first sunlight breaking over Himalayan snow peaks.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=90',
    span: 'lg:col-span-8',
    aspect: 'aspect-[16/10]',
  },
  {
    id: '02',
    title: 'Tibetan Sound Resonance Healing',
    category: 'WELLNESS',
    duration: '90 Minutes',
    timing: 'Morning & Twilight',
    specs: 'Geothermal Chamber • Master Sound Healer',
    desc: 'Deep vibrational acoustic sound bath using handmade bronze bowls to re-align circadian rhythms and alleviate tension.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    span: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '03',
    title: 'Sommelier Subterranean Vault Tasting',
    category: 'CULINARY',
    duration: '2 Hours',
    timing: '06:00 PM Daily',
    specs: 'Rock-Carved Cellar • 6 Biodynamic Vintages',
    desc: 'Private tasting of reserve biodynamic wines paired with artisanal mountain cheeses inside our underground limestone cellar.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85',
    span: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '04',
    title: 'Celestial Astro-Observatory Night',
    category: 'ASTRONOMY',
    duration: '2 Hours',
    timing: '09:00 PM (Clear Skies)',
    specs: 'High-Power Refractor • Deep Sky Astrophotography',
    desc: 'Zero light pollution celestial mapping with estate astronomers to view Saturn’s rings and deep Milky Way nebulae.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=90',
    span: 'lg:col-span-8',
    aspect: 'aspect-[16/10]',
  },
  {
    id: '05',
    title: 'Botanical Apiary & Dawn Honey Harvest',
    category: 'NATURE',
    duration: '2 Hours',
    timing: '07:00 AM Daily',
    specs: '500-Acre Conservation Corridor • Master Beekeeper',
    desc: 'Hands-on morning honey collection from private mountain hives followed by a fresh honeycomb and herbal tea tasting.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=85',
    span: 'lg:col-span-6',
    aspect: 'aspect-[16/11]',
  },
  {
    id: '06',
    title: 'Helicopter Alpine Ridge Tour',
    category: 'EXPEDITION',
    duration: '45 Minutes',
    timing: 'Custom Departure',
    specs: 'Private Twin-Engine Chopper • On-Site Helipad',
    desc: 'Soar above inaccessible Himalayan glaciers, sacred high valleys, and towering ridge peaks with direct landing at the resort.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    span: 'lg:col-span-6',
    aspect: 'aspect-[16/11]',
  },
];

const categories = ['ALL', 'EXPEDITION', 'WELLNESS', 'CULINARY', 'ASTRONOMY', 'NATURE'];

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = selectedCategory === 'ALL'
    ? curatedExperiences
    : curatedExperiences.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full bg-[#1C1C1C] text-white overflow-hidden font-manrope">

      {/* 1. HERO SECTION: CINEMATIC MONUMENTAL BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b border-[#333333] overflow-hidden select-none">
        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=3000&q=90"
            alt="Mountain Expedition Vista"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>UNHURRIED EXPEDITIONS & RITUALS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8.5rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              CURATED <br />
              MOMENTS OF <br />
              <span className="text-art-trio">WONDER.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-2xl mx-auto leading-relaxed">
              From dawn glacier hikes to subterranean sommelier vaults, explore distinct journeys curated exclusively for our sanctuary guests.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● BESPOKE CONCIERGE</span>
          <span>500-ACRE CORRIDOR</span>
          <span>EST. 2026</span>
        </div>
      </section>


      {/* 2. MAIN EXPERIENCES SHOWCASE IN IVORY (#FAFDF2) */}
      <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">

          {/* Section Header with Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>01 — EXPEDITIONS</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                  SANCTUARY <br />
                  JOURNEYS.
                </h2>
              </ScrollReveal>
            </div>

            {/* Filter Tabs */}
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {categories.map((cat) => {
                  const isActive = cat === selectedCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#0E0E0E] text-white'
                          : 'border border-[#E9E9DE] text-[#0E0E0E]/70 hover:border-[#0E0E0E] hover:text-[#0E0E0E] bg-white/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {filtered.map((exp, idx) => (
              <div key={exp.id} className={`w-full ${exp.span} group`}>
                <ScrollReveal direction="clip" delay={idx * 60}>
                  
                  {/* Image Plate */}
                  <div className={`relative overflow-hidden ${exp.aspect} border border-[#E9E9DE] bg-[#FAFDF2] shadow-xl group`} data-cursor="VIEW">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[#FF1F02] text-[10px] font-mono uppercase tracking-widest font-bold border border-white/20">
                        {exp.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white text-xs font-mono">
                      <span>{exp.duration} • {exp.timing}</span>
                      <span className="text-[#FF1F02] font-bold">0{exp.id}</span>
                    </div>
                  </div>

                  {/* Editorial Narrative & Specs Below Image */}
                  <div className="pt-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E9E9DE] pb-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors">
                        {exp.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#0E0E0E]/50 uppercase tracking-widest">
                        ● {exp.specs.split('•')[0]}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#0E0E0E]/75 font-light leading-relaxed">
                      {exp.desc}
                    </p>

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0E0E0E] hover:text-[#FF1F02] transition-colors group/link"
                      >
                        <span>Reserve Experience</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                </ScrollReveal>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 3. FINAL INVITATION CTA IN PURE BLACK */}
      <section className="relative bg-[#000000] text-white py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Mountain Summit Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHHR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE SANCTUARY • " year="EST 2026" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>02 — BESPOKE ITINERARIES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
              DESIGN YOUR <br />
              STAY.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Our master concierge tailors every expedition to your cadence. Connect with us to curate private sunrise hikes, sommelier cellars, and sound therapy rituals.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
                >
                  <span>CONNECT CONCIERGE</span>
                  <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#FF1F02]" />
                  <span>DIRECT INQUIRIES</span>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
              <span>● PRIVATE NATURALISTS</span>
              <span>● BESPOKE TIMING</span>
              <span>● INCLUDED CONCIERGE CARE</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}

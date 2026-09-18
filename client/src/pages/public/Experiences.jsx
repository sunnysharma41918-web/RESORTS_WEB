import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Clock, MapPin, Sparkles, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';

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
    title: 'Vedic Sound Resonance Healing',
    category: 'WELLNESS',
    duration: '90 Minutes',
    timing: 'Morning & Twilight',
    specs: 'Heritage Chamber • Master Sound Healer',
    desc: 'Deep vibrational acoustic sound bath using handmade bronze bowls and sacred chants to re-align energy and alleviate tension.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    span: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '03',
    title: 'Royal Subterranean Vault Tasting',
    category: 'CULINARY',
    duration: '2 Hours',
    timing: '06:00 PM Daily',
    specs: 'Rock-Carved Cellar • Reserve Vintages',
    desc: 'Private tasting of reserve fine wines and royal teas paired with artisanal local delicacies inside our cellar vault.',
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
    desc: 'Zero light pollution celestial mapping with estate astronomers to view Saturn’s rings and deep Milky Way constellations.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=90',
    span: 'lg:col-span-8',
    aspect: 'aspect-[16/10]',
  },
  {
    id: '05',
    title: 'Botanical Spice Garden & Dawn Harvest',
    category: 'NATURE',
    duration: '2 Hours',
    timing: '06:30 AM Daily',
    specs: 'Estate Apiary • Hand-Harvested Honey & Herbs',
    desc: 'Wander through organic herb terraces, participate in raw honey extraction, and blend your bespoke herbal tea infusion.',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=85',
    span: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '06',
    title: 'Royal Sunset Aarti & Sitar Recital',
    category: 'CULTURAL',
    duration: '1.5 Hours',
    timing: '06:30 PM (Daily at Twilight)',
    specs: 'Open-Air Amphitheatre • Master Musicians',
    desc: 'An evening of classical sitar, earthen lamps, and royal Indian hospitality by the bonfire under starlit skies.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90',
    span: 'lg:col-span-8',
    aspect: 'aspect-[16/10]',
  },
];

const categories = ['ALL', 'EXPEDITION', 'WELLNESS', 'CULINARY', 'ASTRONOMY', 'NATURE', 'CULTURAL'];

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = selectedCategory === 'ALL'
    ? curatedExperiences
    : curatedExperiences.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden font-manrope transition-colors duration-500">

      {/* 1. HERO SECTION: ROYAL PALATIAL THEME WITH FULL DARK & LIGHT MODE */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 overflow-hidden select-none">
        
        {/* Indian Royal Art & Arch Background */}
        <IndianArtBackground variant="full" opacity="opacity-[0.05] dark:opacity-[0.07]" />

        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=75"
            alt="Mountain Expedition Vista"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.95] opacity-25 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 my-auto w-full">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37] px-4 py-1 bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/30 dark:border-[#8F6B2E]/40 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block animate-pulse" />
              <span>ROYAL EXPEDITIONS & HERITAGE RITUALS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight leading-[1.05] text-[#2A1F17] dark:text-[#F3EEE0] break-words">
              CURATED <br />
              EXPEDITIONS & <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">ROYAL RITUALS.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-2xl mx-auto leading-relaxed px-2">
              From dawn nature expeditions to twilight musical aartis and sacred rituals under high-altitude starlit skies.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* 2. MAIN EXPERIENCES SHOWCASE (ROYAL HERITAGE THEME) */}
      <section className="relative dark:bg-[#14110E] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] py-24 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">

          {/* Section Header with Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b dark:border-[#8F6B2E]/30 border-[#8F6B2E]/30">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block shrink-0" />
                  <span>01 — ROYAL EXPERIENCES</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal uppercase tracking-tight text-[#2A1F17] dark:text-[#F3EEE0]">
                  SANCTUARY <br />
                  <span className="text-[#8F6B2E] dark:text-[#D4AF37]">JOURNEYS.</span>
                </h2>
                <RoyalOrnamentDivider color="#8F6B2E" className="justify-start my-3" />
              </ScrollReveal>
            </div>

            {/* Filter Tabs */}
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
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


      {/* 3. FINAL INVITATION CTA (ADAPTIVE DARK/LIGHT) */}
      <section className="relative bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-500 border-t border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=75"
            alt="Mountain Summit Horizon"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.95] opacity-20 dark:opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHHR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE SANCTUARY • " />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37] bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 px-3.5 py-1.5 rounded-full border border-[#8F6B2E]/30">
              <span className="w-2 h-2 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block shrink-0" />
              <span>02 — INVITATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal uppercase tracking-tight leading-[0.95] text-[#2A1F17] dark:text-[#F3EEE0]">
              DESIGN YOUR <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">ROYAL STAY.</span>
            </h2>
            <RoyalOrnamentDivider color="#8F6B2E" className="my-4" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg font-light dark:text-[#EAE5D9]/80 text-[#2A1F17]/80 max-w-xl mx-auto leading-relaxed">
              Our master concierge tailors every expedition to your cadence. Connect with us to curate private sunrise hikes, wine tastings, and sound therapy rituals.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-[#8F6B2E] hover:bg-[#A67C38] dark:bg-[#D4AF37] dark:hover:bg-[#C5A880] text-white dark:text-[#14110E] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-xl group cursor-pointer"
                >
                  <span>CONNECT CONCIERGE</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-[#8F6B2E]/40 hover:border-[#8F6B2E] text-[#2A1F17] dark:text-[#F3EEE0] font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#8F6B2E] dark:text-[#D4AF37]" />
                  <span>DIRECT INQUIRIES</span>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-widest">
              <span>✦ PRIVATE GUIDES</span>
              <span>✦ BESPOKE TIMING</span>
              <span>✦ INCLUDED ROYAL CARE</span>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom Jaali Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <IndianJaaliBorder />
        </div>
      </section>

    </div>
  );
}

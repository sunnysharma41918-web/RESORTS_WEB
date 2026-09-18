import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BedDouble, Maximize2, Sparkles, Compass, Eye, ShieldCheck, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';

const residencesList = [
  {
    id: '01',
    name: 'The Royal Pool Villa',
    category: 'VILLAS',
    size: '2,400 SQ FT',
    occupancy: 'Up to 3 Guests',
    view: 'High Valley & Pine Canopy',
    price: '₹24,500',
    tag: 'SIGNATURE RESIDENCE',
    specs: ['Private Heated Plunge Pool', 'Locally Quarried Slate Hearth', '24/7 Dedicated Butler'],
    desc: 'Sculpted into the high mountain slope with cantilevered cedar viewing decks, heated stone floors, and an unhurried horizon vista.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: '02',
    name: 'Monolith Glass Chalet',
    category: 'CHALETS',
    size: '1,850 SQ FT',
    occupancy: 'Up to 2 Guests',
    view: '360° Stargazing Mountain Ridge',
    price: '₹18,500',
    tag: 'ARCHITECTURAL ICON',
    specs: ['Acoustic Glass Sky-Roof', 'Geothermal Mineral Bath', 'Sommelier Cellar Vault'],
    desc: 'A sanctuary of low-iron panoramic acoustic glass offering absolute silence and celestial night sky observation from your bed.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: '03',
    name: 'Botanical Sanctuary Suite',
    category: 'ESTATE SUITES',
    size: '3,100 SQ FT',
    occupancy: 'Up to 4 Guests',
    view: '500-Acre Private Forest Ridge',
    price: '₹32,000',
    tag: 'EXCLUSIVE ESTATE',
    specs: ['Dual Master Pavilions', 'Private Organic Tea Terrace', 'Sound Healing Chamber'],
    desc: 'Surrounded by organic estate herb gardens, featuring reclaimed heritage teak finishes, open-air rainwater shower, and dining deck.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: '04',
    name: 'The Cliffside Stone Slowhouse',
    category: 'SLOWHOUSES',
    size: '1,600 SQ FT',
    occupancy: 'Up to 2 Guests',
    view: 'High-Altitude Sunset Vista',
    price: '₹16,500',
    tag: 'ULTIMATE SECLUSION',
    specs: ['High-Altitude Sunken Hot Tub', 'Artisan Cedar Hearth', 'Private Trail Access'],
    desc: 'Carved into native valley rock with floor-to-ceiling glass doors opening onto an expansive outdoor terrace suspended above cloud valleys.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: '05',
    name: 'Ridge Horizon Grand Penthouse',
    category: 'ESTATE SUITES',
    size: '4,200 SQ FT',
    occupancy: 'Up to 6 Guests',
    view: 'Panoramic Himalayan Horizon',
    price: '₹48,000',
    tag: 'FLAGSHIP RESIDENCE',
    specs: ['Wraparound Rooftop Deck', 'Private Dining Pavilion', 'Personal Chauffeur & Range Rover'],
    desc: 'The crowning jewel of the estate. Spanning the entire top tier with multiple living salons, double infinity spa, and butler pantry.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=90',
  },
];

const categories = ['ALL', 'VILLAS', 'CHALETS', 'ESTATE SUITES', 'SLOWHOUSES'];

export default function Resorts() {
  const [searchParams] = useSearchParams();
  const stateQuery = searchParams.get('state');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = selectedCategory === 'ALL'
    ? residencesList
    : residencesList.filter((r) => r.category === selectedCategory);

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden font-manrope transition-colors duration-500">

      {/* 1. HERO BANNER IN ROYAL PALATIAL THEME WITH FULL DARK & LIGHT MODE */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 overflow-hidden select-none">
        
        {/* Indian Royal Paisley Damask & Arch Background */}
        <IndianArtBackground variant="paisley" opacity="opacity-[0.055] dark:opacity-[0.08]" />

        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=75"
            alt="Mountain Sanctuary Residences"
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
              <span>PRIVATE RESIDENCES & ROYAL PAVILIONS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight leading-[1.05] text-[#2A1F17] dark:text-[#F3EEE0] break-words">
              SANCTUARIES <br />
              OF UNBROKEN <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">ROYAL CALM.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-2xl mx-auto leading-relaxed px-2">
              Five monolithic residential tiers carved into high-altitude mountain rock, each offering uninterrupted panoramic horizon views.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* 2. MAIN RESIDENCES SHOWCASE (ROYAL HERITAGE THEME) */}
      <section className="relative dark:bg-[#14110E] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] py-24 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28 relative z-10">

          {/* Section Header with Category Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b dark:border-[#8F6B2E]/30 border-[#8F6B2E]/30">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block shrink-0" />
                  <span>01 — ACCOMMODATION PORTFOLIO</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal uppercase tracking-tight text-[#2A1F17] dark:text-[#F3EEE0]">
                  STAY YOUR <br />
                  <span className="text-[#8F6B2E] dark:text-[#D4AF37]">ROYAL WAY.</span>
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
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#8F6B2E] dark:bg-[#D4AF37] text-white dark:text-[#14110E] shadow-md'
                          : 'border dark:border-[#8F6B2E]/30 border-[#8F6B2E]/30 dark:text-[#EAE5D9]/75 text-[#2A1F17]/75 hover:border-[#8F6B2E] hover:text-[#8F6B2E] dark:bg-[#1A1613] bg-[#F2ECE1]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Alternating Large Residence Showcases */}
          <div className="space-y-32 sm:space-y-44">
            {filtered.map((villa, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={villa.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Imagery Column (7 Cols) */}
                  <div className={`lg:col-span-7 relative ${isEven ? 'lg:col-start-6' : ''}`}>
                    <ScrollReveal direction="clip" delay={150}>
                      <div
                        className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#E9E9DE] shadow-2xl group bg-[#FAFDF2] z-10"
                        data-cursor="VIEW"
                      >
                        <img
                          src={villa.image}
                          alt={villa.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                        {/* Top Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[#FF1F02] text-[10px] font-mono uppercase tracking-widest font-bold border border-white/20">
                            {villa.tag}
                          </span>
                        </div>

                        {/* Bottom Metadata */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white text-xs font-mono">
                          <span className="uppercase tracking-widest">{villa.size} • {villa.occupancy}</span>
                          <span className="text-[#FF1F02] font-bold">0{villa.id}</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Editorial Typography & Narrative Column (5 Cols) */}
                  <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <ScrollReveal direction="up" delay={100}>
                      <div className="flex items-center justify-between border-b border-[#E9E9DE] pb-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF1F02]">
                          ● {villa.category}
                        </span>
                        <span className="text-xs font-mono text-[#0E0E0E]/60 uppercase">
                          From <strong className="text-sm font-bold text-[#0E0E0E]">{villa.price}</strong> / night
                        </span>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={200}>
                      <h3 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-tight">
                        {villa.name}
                      </h3>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={300}>
                      <p className="text-sm sm:text-base font-light text-[#0E0E0E]/75 leading-relaxed">
                        {villa.desc}
                      </p>
                    </ScrollReveal>

                    {/* Specs Pills */}
                    <ScrollReveal direction="up" delay={400}>
                      <div className="space-y-2 pt-2 border-t border-[#E9E9DE]">
                        {villa.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2.5 text-xs text-[#0E0E0E]/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={500}>
                      <div className="pt-4 flex items-center gap-4">
                        <MagneticButton>
                          <Link
                            to={`/resorts/${villa.id}`}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-none bg-[#0E0E0E] hover:bg-[#FF1F02] text-white font-semibold text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-xl group cursor-pointer"
                          >
                            <span>RESERVE RESIDENCE</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </MagneticButton>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 3. FINAL INVITATION CTA (ADAPTIVE DARK/LIGHT) */}
      <section className="relative bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-500 border-t border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=75"
            alt="Mountain Sanctuary Horizon"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.95] opacity-20 dark:opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHHR Stamp */}
          <div className="absolute -top-10 -right-4 sm:-right-8 z-20">
            <MagneticButton distance={0.25}>
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " />
            </MagneticButton>
          </div>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37] bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 px-3.5 py-1.5 rounded-full border border-[#8F6B2E]/30">
              <span className="w-2 h-2 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block shrink-0" />
              <span>02 — INVITATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal uppercase tracking-tight leading-[0.95] text-[#2A1F17] dark:text-[#F3EEE0]">
              RESERVE <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">YOUR ROYAL STAY.</span>
            </h2>
            <RoyalOrnamentDivider color="#8F6B2E" className="my-4" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg font-light dark:text-[#EAE5D9]/80 text-[#2A1F17]/80 max-w-xl mx-auto leading-relaxed">
              Every royal pavilion includes dedicated 24/7 butler care, private culinary consultation, and bespoke heritage transfers.
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
              <span>✦ GUARANTEED SECLUSION</span>
              <span>✦ PRIVATE HEATED POOLS</span>
              <span>✦ 24/7 DEDICATED CARE</span>
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

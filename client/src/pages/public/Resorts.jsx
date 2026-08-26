import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, Maximize2, Sparkles, Compass, Eye, ShieldCheck, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';

const residencesList = [
  {
    id: '01',
    name: 'The Forest Pool Villa',
    category: 'VILLAS',
    size: '2,400 SQ FT',
    occupancy: 'Up to 3 Guests',
    view: 'High Valley & Pine Canopy',
    price: '$1,250',
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
    price: '$980',
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
    price: '$1,650',
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
    price: '$890',
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
    price: '$2,400',
    tag: 'FLAGSHIP RESIDENCE',
    specs: ['Private Helipad Landing Privilege', 'Chef Tasting Kitchen', '3 Cantilevered Decks'],
    desc: 'The pinnacle of high-altitude luxury. Spanning the entire top tier with multiple living salons, sommelier cellar, and 360° mountain views.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90',
  },
];

const categories = ['ALL', 'VILLAS', 'CHALETS', 'ESTATE SUITES', 'SLOWHOUSES'];

export default function Resorts() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = selectedCategory === 'ALL'
    ? residencesList
    : residencesList.filter((r) => r.category === selectedCategory);

  return (
    <div className="w-full bg-[#1C1C1C] text-white overflow-hidden font-manrope">

      {/* 1. HERO BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b border-[#333333] overflow-hidden select-none">
        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3000&q=90"
            alt="Mountain Sanctuary Residences"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>PRIVATE RESIDENCES & PAVILIONS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8.5rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              SANCTUARIES <br />
              OF UNBROKEN <br />
              <span className="text-art-trio">CALM.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-2xl mx-auto leading-relaxed">
              Individually sculpted into high mountain rock faces. Each residence is an architectural retreat of native slate, timber, and acoustic stillness.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● 5 DISTINCT TIERS</span>
          <span>ELEVATION: 1,850M</span>
          <span>EST. 2026</span>
        </div>
      </section>


      {/* 2. MAIN RESIDENCES SHOWCASE IN IVORY (#FAFDF2) */}
      <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-36 relative z-10">

          {/* Section Header with Category Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>01 — ACCOMMODATION PORTFOLIO</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                  STAY YOUR <br />
                  WAY.
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


      {/* 3. FINAL INVITATION CTA IN PURE BLACK */}
      <section className="relative bg-[#000000] text-white py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3840&q=95"
            alt="Mountain Sanctuary Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHHR Stamp */}
          <div className="absolute -top-10 -right-4 sm:-right-8 z-20">
            <MagneticButton distance={0.25}>
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " year="EST 2026" />
            </MagneticButton>
          </div>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>02 — BESPOKE BOOKING</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
              RESERVE <br />
              YOUR STAY.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Every residence includes dedicated 24/7 butler care, private sommelier consultation, and high-altitude transfers.
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
              <span>● GUARANTEED SECLUSION</span>
              <span>● HEATED GEOTHERMAL POOLS</span>
              <span>● 100% OFF-GRID SOLAR</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}

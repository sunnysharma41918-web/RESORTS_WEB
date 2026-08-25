import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Flower2,
  Droplets,
  Feather,
  Compass,
  X,
  Sunrise,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import Container from '../../components/common/Container';

const experiences = [
  {
    id: '01',
    tier: '01',
    category: 'Nature & Botanical',
    title: 'NATURE & BOTANICAL TRAIL',
    subtitle: 'Guided morning birdwatching through 500-acre native sanctuaries and ancient canopy.',
    time: '06:30 AM • Daily',
    duration: '90 Min',
    price: '$180 per guest',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=90',
    description:
      'Begin as the first sunlight breaks through ancient pine treetops. A guided expedition traversing private forest trails, identifying indigenous botanical herbs and rare high-altitude birds.',
    highlights: [
      '500-Acre Private Native Sanctuary Access',
      'Indigenous Botanist Guide',
      'Wild Mountain Pine Tea Ceremony',
      'Macro-Photography Observation Stations',
    ],
  },
  {
    id: '02',
    tier: '02',
    category: 'Spa & Ayurveda',
    title: 'SPA & AYURVEDIC WELLNESS',
    subtitle: 'Sound bath therapy, ancient herbal compresses, and oceanfront massage pavilions.',
    time: '09:00 AM - 09:00 PM',
    duration: '120 Min',
    price: '$340 per guest',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=90',
    description:
      'Ancient holistic healing modalities combined with four-hand synchronized massage, warm herbal compress poultices, and Tibetan singing bowl resonance on private oceanfront decks.',
    highlights: [
      'Authentic Ayurvedic Herbal Poultices',
      'Chakra-Tuned 432Hz Sound Immersion',
      'Cold-Pressed Estate Jasmine Oils',
      'Private Mineral Copper Soaking Tub',
    ],
  },
  {
    id: '03',
    tier: '03',
    category: 'Thermal Waters',
    title: 'HORIZON INFINITY POOL',
    subtitle: 'Temperature-controlled heated mineral water floating high above the valley.',
    time: 'All-Day Access',
    duration: 'Unlimited',
    price: 'Complimentary for Residents',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=90',
    description:
      'Cantilevered over the mountain ridge, the infinity pool uses geo-thermally heated mineral water with pure Himalayan salt balances for zero eye irritation and effortless buoyancy.',
    highlights: [
      '38°C Heated Volcanic Mineral Water',
      'Submerged Sunset Sun-Loungers',
      'Artisanal Coconut & Chlorophyll Bar',
      'Private Floating Cabana Service',
    ],
  },
  {
    id: '04',
    tier: '04',
    category: 'Culinary & Heritage',
    title: 'CLIFFTOP CANDLELIGHT DINING',
    subtitle: 'Farm-to-table tasting menu paired with sommelier vintage selections under the stars.',
    time: '07:30 PM • Reservation Required',
    duration: '150 Min',
    price: '$260 per guest',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90',
    description:
      'A multi-course sensory dinner perched on the highest ocean cliff. Fresh organic produce harvested daily from our bio-dynamic estate, paired with cellared vintage wines.',
    highlights: [
      '7-Course Chef Degustation Menu',
      'Biodynamic Vineyard Pairings',
      'Private Clifftop Hearth & Candles',
      'Personal Dedicated Butler',
    ],
  },
  {
    id: '05',
    tier: '05',
    category: 'Nature & Expeditions',
    title: 'MOUNTAIN BIKING & EXPEDITIONS',
    subtitle: 'High-altitude trails, hidden waterfalls, and wilderness excursions.',
    time: '08:00 AM • Guided Tours',
    duration: '3 Hours',
    price: '$210 per guest',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=90',
    description:
      'High-performance electric mountain bikes designed for rugged rocky ascents. Discover secluded glacial swimming lagoons and panoramic vistas inaccessible by vehicle.',
    highlights: [
      'Custom Trek Carbon E-Mountain Bikes',
      'Expedition Safety & Wilderness Guide',
      'Hydration & Gourmet Trail Packs',
      'Hidden Canyon Waterfall Swim Stop',
    ],
  },
  {
    id: '06',
    tier: '06',
    category: 'Nightfall Ceremonies',
    title: 'TWILIGHT BONFIRE & ACOUSTICS',
    subtitle: 'Artisanal cocktails, live acoustic cellists, and celestial telescope viewing.',
    time: '08:30 PM • Every Evening',
    duration: '120 Min',
    price: 'Complimentary for Residents',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=90',
    description:
      'As twilight settles over the mountain horizon, gather around open cedar fire hearths with master acoustic musicians, craft botanical cocktails, and deep-space telescope viewings.',
    highlights: [
      'Live Ambient Acoustic Cello & Handpan',
      'Botanical Distilled Nightcap Cocktails',
      'Deep-Space Astronomical Telescope',
      'Artisanal S’mores & Roasting Stations',
    ],
  },
];

const apothecaryIngredients = [
  {
    name: 'Wild Mountain Pine',
    origin: 'Alpine Highlands',
    benefit: 'Opens respiratory pathways & enhances mental clarity',
    icon: Feather,
  },
  {
    name: 'Raw Himalayan Salt',
    origin: 'Ancient Sea Beds',
    benefit: '84 essential trace minerals for deep cellular detox',
    icon: Droplets,
  },
  {
    name: 'Indigenous Blue Lotus',
    origin: 'Sacred Waterways',
    benefit: 'Natural mild euphoric that melts deep nervous tension',
    icon: Flower2,
  },
  {
    name: 'Cold-Pressed Jasmine',
    origin: 'Estate Gardens',
    benefit: 'Soothes autonomic nervous system & elevates mood',
    icon: Sparkles,
  },
];

export default function SanctuaryRituals() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [bookingModal, setBookingModal] = useState(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const activeExp = experiences[activeIndex] || experiences[0];

  const categories = [
    'All',
    'Spa & Ayurveda',
    'Nature & Botanical',
    'Thermal Waters',
    'Culinary & Heritage',
    'Nightfall Ceremonies',
  ];

  const filteredExperiences =
    selectedFilter === 'All'
      ? experiences
      : experiences.filter((e) => e.category.toLowerCase().includes(selectedFilter.toLowerCase()) || e.category === selectedFilter);

  const handleOpenBooking = (exp) => {
    setBookingModal(exp);
    setBookingSubmitted(false);
  };

  return (
    <div className="w-full bg-[#171C28] text-white min-h-screen select-none overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@700;800;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .sr-display { font-family: 'Rokkitt', Georgia, serif; }
        .sr-body { font-family: 'Ubuntu', sans-serif; }
      `}</style>

      {/* 1. HERO & INTERACTIVE SHOWCASE */}
      <section className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-12 border-b border-[#5E6575]/25 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#3FD3C9]/10 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#B72257]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#5E6575]/30">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.25em] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CURATED SANCTUARY RITUALS</span>
              </div>
              <h1 className="sr-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#3FD3C9]/70 leading-none">
                EVERY MOMENT CRAFTED
              </h1>
            </div>

            {/* Header Action Button */}
            <a
              href="#all-rituals"
              className="py-2.5 px-6 rounded-full bg-white hover:bg-stone-200 text-[#171C28] font-bold text-xs transition-all duration-300 flex items-center justify-between gap-3 self-start sm:self-end group shadow-lg hover:scale-105"
            >
              <span className="uppercase tracking-wider">VIEW ALL RITUALS</span>
              <span className="w-7 h-7 rounded-full bg-[#B72257] flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Interactive Split Grid Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: 6 Interactive Navigation Items */}
            <div className="lg:col-span-6 space-y-3">
              {experiences.map((exp, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={exp.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl ${
                      isActive
                        ? 'p-5 sm:p-6 bg-[#1F2536] backdrop-blur-xl border border-[#3FD3C9]/60 shadow-2xl space-y-3'
                        : 'py-3.5 px-4 sm:px-6 hover:bg-[#1F2536]/50 border border-transparent rounded-2xl flex items-center justify-between group'
                    }`}
                  >
                    {isActive ? (
                      <div>
                        {/* Active Title Row with Cyan Badge */}
                        <div className="flex items-center justify-between">
                          <h3 className="sr-display text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                            {exp.title}
                          </h3>
                          <span className="w-8 h-8 rounded-full bg-[#3FD3C9] text-[#171C28] font-mono font-bold text-xs flex items-center justify-center shadow-md">
                            {exp.tier}
                          </span>
                        </div>

                        {/* Active Description */}
                        <p className="sr-body text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-2">
                          {exp.subtitle}
                        </p>

                        {/* Active Time Tag with Clock Icon */}
                        <div className="flex items-center space-x-2 text-[#3FD3C9] text-xs font-semibold pt-3 tracking-wide">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{exp.time}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="sr-body text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                          {exp.title}
                        </span>
                        <span className="w-7 h-7 rounded-full bg-[#1F2536] text-white/40 group-hover:text-white group-hover:bg-[#1F2536]/80 font-mono text-xs flex items-center justify-center transition-colors">
                          {exp.tier}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Big Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[#5E6575]/35 group bg-[#1F2536]">
                
                {/* Visual Image */}
                <img
                  key={activeExp.id}
                  src={activeExp.image}
                  alt={activeExp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="px-4 py-1.5 rounded-full bg-[#171C28]/80 backdrop-blur-md border border-[#5E6575]/40 text-xs uppercase font-mono tracking-widest text-[#3FD3C9] shadow-lg">
                    EXPERIENCE {activeExp.tier} / 06
                  </span>
                </div>

                {/* Gradient Shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171C28]/95 via-[#171C28]/25 to-transparent pointer-events-none" />

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 z-20 p-5 sm:p-6 rounded-2xl bg-[#171C28]/85 backdrop-blur-xl border border-[#5E6575]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1 max-w-sm">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3FD3C9] block">
                      SIGNATURE EXPERIENCE
                    </span>
                    <h3 className="sr-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-tight">
                      {activeExp.title}
                    </h3>
                    <p className="sr-body text-xs text-white/70 font-light truncate max-w-xs sm:max-w-sm">
                      {activeExp.subtitle}
                    </p>
                  </div>

                  {/* Book Ritual Button */}
                  <button
                    onClick={() => handleOpenBooking(activeExp)}
                    className="py-2.5 px-5 rounded-full bg-white hover:bg-stone-200 text-[#171C28] font-bold text-xs transition-all duration-300 flex items-center justify-center gap-3 shrink-0 group/btn shadow-lg hover:scale-105"
                  >
                    <span className="uppercase tracking-wider">BOOK RITUAL</span>
                    <span className="w-6 h-6 rounded-full bg-[#B72257] flex items-center justify-center text-white transition-transform group-hover/btn:translate-x-0.5">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. COMPLETE PORTFOLIO CATALOG */}
      <section id="all-rituals" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-12 border-b border-[#5E6575]/25">
        <Container>
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#5E6575]/30 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[#3FD3C9] text-xs uppercase tracking-[0.25em] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMPLETE 2026 ARCHIVE</span>
              </div>
              <h2 className="sr-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                All Sanctuary Ceremonies
              </h2>
            </div>
            <span className="sr-body text-xs text-white/60 font-light max-w-xs">
              Every ritual is individually tailored to your energetic constitution upon arrival.
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 border ${
                  selectedFilter === cat
                    ? 'bg-[#3FD3C9] text-[#171C28] border-[#3FD3C9] font-bold shadow-lg shadow-[#3FD3C9]/20 scale-105'
                    : 'bg-[#1F2536] text-white/70 border-[#5E6575]/30 hover:border-[#3FD3C9]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-3xl overflow-hidden border border-[#5E6575]/35 bg-[#1F2536]/80 hover:border-[#3FD3C9]/60 transition-all duration-500 flex flex-col justify-between group shadow-2xl"
              >
                {/* Visual Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2536] via-transparent to-black/30" />

                  {/* Top Tier Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#171C28]/80 backdrop-blur-md border border-[#5E6575]/30 text-[11px] text-[#3FD3C9] font-mono font-bold">
                      EXP {exp.tier}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#171C28]/80 backdrop-blur-md border border-[#5E6575]/30 text-[11px] text-white/90 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#3FD3C9]" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-[11px] uppercase tracking-widest font-bold text-[#3FD3C9]">
                      {exp.category}
                    </div>

                    <h3 className="sr-display text-xl font-bold uppercase tracking-tight text-white leading-snug group-hover:text-[#3FD3C9] transition-colors">
                      {exp.title}
                    </h3>

                    <p className="sr-body text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 py-4 border-y border-[#5E6575]/30 text-xs">
                    {exp.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/80 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3FD3C9] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tariff & Action */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] uppercase text-white/40 block">Tariff</span>
                      <span className="sr-display text-sm sm:text-base font-bold text-white">
                        {exp.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(exp)}
                      className="px-5 py-2.5 rounded-full bg-white hover:bg-[#3FD3C9] text-[#171C28] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md hover:scale-105"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* 3. BOTANICAL APOTHECARY SECTION */}
      <section className="py-20 sm:py-28 bg-[#121620] border-b border-[#5E6575]/25">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.3em] font-bold">
              <Flower2 className="w-3.5 h-3.5" />
              <span>THE LIVING APOTHECARY</span>
            </div>
            <h2 className="sr-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              Raw, Indigenous Botanicals
            </h2>
            <p className="sr-body text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
              We harvest wild flora from surrounding mountain slopes and certified organic biodynamic gardens, cold-pressing oils within 24 hours of treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apothecaryIngredients.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-6 rounded-3xl bg-[#1F2536]/60 border border-[#5E6575]/30 hover:border-[#3FD3C9]/50 transition-all duration-300 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-white/30">0{idx + 1}</span>
                    <div className="w-9 h-9 rounded-full bg-[#3FD3C9]/15 border border-[#3FD3C9]/30 flex items-center justify-center text-[#3FD3C9] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="sr-display text-lg text-white font-bold">{item.name}</h3>
                    <p className="text-[11px] uppercase tracking-wider text-[#3FD3C9] mt-0.5">
                      {item.origin}
                    </p>
                  </div>
                  <p className="sr-body text-xs text-white/60 leading-relaxed font-light">
                    {item.benefit}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. FINAL INVITATION CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=90"
            alt="Sanctuary Horizon"
            className="w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171C28] via-transparent to-[#171C28]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.3em] font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>PERSONAL WELLNESS CURATION</span>
          </div>

          <h2 className="sr-display text-3xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Design Your Custom <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FD3C9] via-white to-[#B72257]">
              Multi-Day Immersion.
            </span>
          </h2>

          <p className="sr-body max-w-xl mx-auto text-white/70 text-sm sm:text-base font-light leading-relaxed">
            Our wellness concierges will coordinate personalized daily schedules including Ayurvedic doctors, private yoga masters, and thermal bath transitions throughout your stay.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#3FD3C9] hover:bg-[#2EC4BA] text-[#171C28] font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(63,211,201,0.35)] hover:scale-105 text-center"
            >
              Consult Wellness Concierge
            </Link>
            <Link
              to="/resorts"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-200 text-[#171C28] font-bold text-xs uppercase tracking-widest transition-all duration-300 text-center"
            >
              Explore Sanctuaries
            </Link>
          </div>
        </div>
      </section>

      {/* 5. RESERVATION MODAL */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#1F2536] border border-[#5E6575]/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setBookingModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#B72257] text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3FD3C9]/20 border border-[#3FD3C9]/40 flex items-center justify-center mx-auto text-[#3FD3C9]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="sr-display text-2xl font-bold uppercase tracking-tight text-white">Ritual Reserved</h3>
                <p className="sr-body text-white/70 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you. Our Master Practitioner will prepare your bespoke oils and confirm your time via concierge dispatch.
                </p>
                <button
                  onClick={() => setBookingModal(null)}
                  className="px-6 py-2.5 rounded-full bg-[#3FD3C9] text-[#171C28] text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1 pr-8">
                  <span className="text-[11px] uppercase tracking-widest text-[#3FD3C9] font-bold">
                    Reservation Request
                  </span>
                  <h3 className="sr-display text-2xl font-bold uppercase tracking-tight text-white">{bookingModal.title}</h3>
                  <p className="sr-body text-xs text-white/50">
                    {bookingModal.duration} • {bookingModal.price}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-white/70 mb-1 font-semibold">Guest Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#171C28] border border-[#5E6575]/40 text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FD3C9]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1 font-semibold">Preferred Date</label>
                      <input
                        required
                        type="date"
                        defaultValue="2026-10-15"
                        className="w-full px-4 py-3 rounded-xl bg-[#171C28] border border-[#5E6575]/40 text-white focus:outline-none focus:border-[#3FD3C9]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 font-semibold">Guests</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-[#171C28] border border-[#5E6575]/40 text-white focus:outline-none focus:border-[#3FD3C9]">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>Private Group (3-6)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold">Special Wellness Intentions or Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Mention any physical tensions, preferred pressure, or botanical sensitivities..."
                      className="w-full px-4 py-3 rounded-xl bg-[#171C28] border border-[#5E6575]/40 text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FD3C9]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#3FD3C9] hover:bg-[#2EC4BA] text-[#171C28] font-extrabold uppercase tracking-widest text-xs transition-all shadow-lg hover:scale-[1.01]"
                  >
                    Confirm Ritual Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
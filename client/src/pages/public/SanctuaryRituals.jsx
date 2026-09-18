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
import ScrollReveal from '../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';

const experiences = [
  {
    id: '01',
    tier: '01',
    category: 'Nature & Botanical',
    title: 'SACRED BOTANICAL & FOREST TRAIL',
    subtitle: 'Guided morning birdwatching through 500-acre native Himalayan sanctuary and ancient cedar canopy.',
    time: '06:30 AM • Daily',
    duration: '90 Min',
    price: '₹ 3,500 per guest',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=90',
    description:
      'Begin as the first sunlight breaks through ancient pine treetops. A guided expedition traversing private forest trails, identifying indigenous botanical herbs, sacred banyans, and rare mountain birds.',
    highlights: [
      '500-Acre Private Native Sanctuary Access',
      'Indigenous Botanist & Naturalist Guide',
      'Wild Mountain Pine & Honey Tea Ceremony',
      'Macro-Photography Observation Stations',
    ],
  },
  {
    id: '02',
    tier: '02',
    category: 'Spa & Ayurveda',
    title: 'VEDIC SPA & AYURVEDIC WELLNESS',
    subtitle: 'Sound bath therapy, ancient herbal compresses, and tranquil massage pavilions.',
    time: '09:00 AM - 09:00 PM',
    duration: '120 Min',
    price: '₹ 5,800 per guest',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=90',
    description:
      'Ancient holistic healing modalities combined with four-hand synchronized massage, warm herbal compress poultices, and Tibetan singing bowl resonance on private pavilions.',
    highlights: [
      'Authentic Ayurvedic Herbal Poultices',
      'Chakra-Tuned 432Hz Sound Immersion',
      'Cold-Pressed Estate Jasmine & Sandalwood Oils',
      'Private Mineral Copper Soaking Tub',
    ],
  },
  {
    id: '03',
    tier: '03',
    category: 'Thermal Waters',
    title: 'GEOTHERMAL MINERAL SPRINGS',
    subtitle: 'Natural heated saltwater pools overlooking breathtaking mountain horizons.',
    time: 'All Day Access • 07:00 AM - 10:00 PM',
    duration: 'Unlimited',
    price: 'Complimentary for Residents',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90',
    description:
      'Cantilevered over the mountain ridge, the infinity pool uses geo-thermally heated mineral water with pure Himalayan salt balances for effortless relaxation and rejuvenation.',
    highlights: [
      '38°C Heated Volcanic Mineral Water',
      'Submerged Sunset Sun-Loungers',
      'Artisanal Coconut & Chlorophyll Refreshments',
      'Private Floating Cabana Service',
    ],
  },
  {
    id: '04',
    tier: '04',
    category: 'Culinary & Heritage',
    title: 'CLIFFTOP ROYAL THALI & CANDLELIGHT',
    subtitle: 'Palatial multi-course royal tasting menu paired with traditional vintage refreshments under the stars.',
    time: '07:30 PM • Reservation Required',
    duration: '150 Min',
    price: '₹ 4,800 per guest',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90',
    description:
      'A multi-course sensory dinner perched on the highest mountain deck. Fresh organic produce harvested daily from our bio-dynamic estate, prepared by royal culinary chefs.',
    highlights: [
      '7-Course Royal Thali Tasting Menu',
      'Artisanal Heritage Beverage Pairings',
      'Private Clifftop Hearth & Diyas',
      'Dedicated Royal Butler Service',
    ],
  },
  {
    id: '05',
    tier: '05',
    category: 'Nature & Expeditions',
    title: 'MOUNTAIN EXPEDITIONS & GLACIAL TRAILS',
    subtitle: 'High-altitude trails, hidden waterfalls, and wilderness excursions.',
    time: '08:00 AM • Guided Tours',
    duration: '3 Hours',
    price: '₹ 4,200 per guest',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=90',
    description:
      'High-performance guided treks and electric mountain rides designed for rugged rocky ascents. Discover secluded mountain lagoons and panoramic vistas.',
    highlights: [
      'Expedition Safety & Wilderness Guide',
      'Hydration & Gourmet Trail Packs',
      'Hidden Canyon Waterfall Lagoon Visit',
      'Panoramic High Peak Photo Points',
    ],
  },
  {
    id: '06',
    tier: '06',
    category: 'Nightfall Ceremonies',
    title: 'TWILIGHT BONFIRE & SITAR ACOUSTICS',
    subtitle: 'Traditional refreshments, live classical musicians, and celestial telescope viewing.',
    time: '08:30 PM • Every Evening',
    duration: '120 Min',
    price: 'Complimentary for Residents',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=90',
    description:
      'As twilight settles over the mountain horizon, gather around open cedar fire hearths with master classical Sitar & flute players, herbal drinks, and deep-space star observation.',
    highlights: [
      'Live Classical Sitar & Ambient Flute',
      'Spiced Kashmiri Kahwa & Herbal Teas',
      'Deep-Space Astronomical Telescope',
      'Artisanal Evening Roasting Hearth',
    ],
  },
];

const apothecaryIngredients = [
  {
    name: 'Wild Himalayan Cedar',
    origin: 'Alpine Highlands',
    benefit: 'Opens respiratory pathways & enhances deep mental clarity',
    icon: Feather,
  },
  {
    name: 'Raw Himalayan Pink Salt',
    origin: 'Ancient Mountain Beds',
    benefit: '84 essential trace minerals for deep cellular rejuvenation',
    icon: Droplets,
  },
  {
    name: 'Sacred Blue Lotus',
    origin: 'Serene Waterways',
    benefit: 'Natural soothing botanical that dissolves nervous tension',
    icon: Flower2,
  },
  {
    name: 'Cold-Pressed Jasmine & Sandalwood',
    origin: 'Palace Botanical Gardens',
    benefit: 'Soothes the senses, cools the spirit & elevates calmness',
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
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] min-h-screen select-none overflow-x-hidden transition-colors duration-500 font-sans">
      {/* 1. HERO BANNER IN ROYAL LIGHT & DARK */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80"
            alt="Sanctuary Rituals"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.95] opacity-25 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#8F6B2E] dark:text-[#D4AF37] bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 px-4 py-1 rounded-full border border-[#8F6B2E]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
              <span>SACRED SANCTUARY EXPERIENCES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#2A1F17] dark:text-[#F3EEE0] uppercase leading-[1.05]">
              TIMELESS RITUALS & <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">
                VEDIC WELLNESS
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-2xl mx-auto leading-relaxed">
              Every moment crafted for rejuvenation, ancient Ayurvedic healing, and authentic connection with nature.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. INTERACTIVE SPLIT SHOWCASE */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal direction="up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
                FEATURED SANCTUARY RITUALS
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <RoyalOrnamentDivider color="#8F6B2E" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: Navigation Items */}
            <div className="lg:col-span-6 space-y-3">
              {experiences.map((exp, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={exp.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl ${
                      isActive
                        ? 'p-5 sm:p-6 bg-[#FAF6F0] dark:bg-[#1C1814] border border-[#8F6B2E] shadow-xl space-y-3'
                        : 'py-3.5 px-4 sm:px-6 hover:bg-[#8F6B2E]/5 border border-transparent rounded-2xl flex items-center justify-between group'
                    }`}
                  >
                    {isActive ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-base sm:text-lg font-normal uppercase tracking-wider text-[#2A1F17] dark:text-[#F3EEE0]">
                            {exp.title}
                          </h3>
                          <span className="w-8 h-8 rounded-full bg-[#8F6B2E] text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
                            {exp.tier}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif font-light leading-relaxed mt-2">
                          {exp.subtitle}
                        </p>

                        <div className="flex items-center space-x-2 text-[#8F6B2E] dark:text-[#D4AF37] text-xs font-semibold pt-3 tracking-wide">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{exp.time}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="font-serif text-xs sm:text-sm font-normal uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] group-hover:text-[#8F6B2E] dark:group-hover:text-[#D4AF37] transition-colors">
                          {exp.title}
                        </span>
                        <span className="w-7 h-7 rounded-full bg-[#8F6B2E]/10 text-[#8F6B2E] dark:text-[#D4AF37] font-mono text-xs flex items-center justify-center transition-colors">
                          {exp.tier}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Active Showcase Frame */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/12] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-[#8F6B2E]/30 group bg-black">
                <img
                  src={activeExp.image}
                  alt={activeExp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 space-y-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#8F6B2E]/90 text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                      {activeExp.category}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#D4AF37]">
                      {activeExp.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug">
                    {activeExp.title}
                  </h3>

                  <p className="text-xs text-[#FAF6F0]/80 font-light line-clamp-2">
                    {activeExp.description}
                  </p>

                  <button
                    onClick={() => handleOpenBooking(activeExp)}
                    className="mt-2 px-6 py-2.5 rounded-full bg-[#8F6B2E] hover:bg-[#6E511E] text-white text-xs font-serif uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                  >
                    Reserve This Ritual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APOTHECARY INGREDIENTS */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-[#8F6B2E]/20">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
              SACRED BOTANICAL APOTHECARY
            </h2>
            <RoyalOrnamentDivider color="#8F6B2E" />
            <p className="text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif max-w-xl mx-auto">
              Pure botanical remedies formulated from cold-pressed mountain florals, sacred oils, and mineral salts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apothecaryIngredients.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-[#FAF6F0] dark:bg-[#1C1814] border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 rounded-2xl text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 mx-auto flex items-center justify-center text-[#8F6B2E] dark:text-[#D4AF37]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base text-[#2A1F17] dark:text-[#F3EEE0]">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-[#8F6B2E] dark:text-[#D4AF37] block">
                    {item.origin}
                  </span>
                  <p className="text-xs text-[#6E5D4F] dark:text-[#B8A89A] font-light leading-relaxed">
                    {item.benefit}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom Jaali Border */}
      <div className="w-full">
        <IndianJaaliBorder />
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#FAF6F0] dark:bg-[#1C1814] border border-[#8F6B2E]/40 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-4 relative text-[#2A1F17] dark:text-[#F3EEE0]">
            <button
              onClick={() => setBookingModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F6B2E] dark:text-[#D4AF37]">
              EXPERIENCE RESERVATION
            </span>
            <h3 className="font-serif text-xl font-normal">
              {bookingModal.title}
            </h3>

            {bookingSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-serif text-lg">Inquiry Confirmed</h4>
                <p className="text-xs text-[#6E5D4F] dark:text-[#B8A89A]">
                  Our sanctuary concierge has received your request and will contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingSubmitted(true);
                  setTimeout(() => setBookingModal(null), 2500);
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[#8F6B2E]/30 focus:outline-none text-sm"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[#8F6B2E]/30 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8F6B2E] hover:bg-[#6E511E] text-white font-serif text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  Confirm Reservation Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Search,
  Star,
  Mountain,
  Thermometer,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  X,
  Navigation,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { RoyalOrnamentDivider } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';
import { NORTH_INDIA_ROUTE, SOUTH_INDIA_ROUTE } from '../../features/home/components/DestinationSection';
import { getWhatsAppBookingUrl } from '../../data/contact';

// Combined Pan-India Master Catalog
const ALL_DESTINATIONS = [
  ...NORTH_INDIA_ROUTE.map(d => ({ ...d, circuit: 'north' })),
  ...SOUTH_INDIA_ROUTE.map(d => ({ ...d, circuit: 'south' }))
];

const CIRCUITS = [
  { id: 'all', label: 'All 30+ Destinations' },
  { id: 'north', label: 'North India Grand Circuit' },
  { id: 'south', label: 'South & Coastal Circuit' },
  { id: 'Himalayas', label: 'Himalayan Escapes', filterKey: 'region' },
  { id: 'Heritage', label: 'Royal Rajasthan & Heritage', filterKey: 'region' },
  { id: 'Coastal', label: 'Coastal & Beaches', filterKey: 'region' },
  { id: 'Spiritual', label: 'Spiritual Havens', filterKey: 'region' },
  { id: 'Tea & Hills', label: 'Hill Stations & Estates', filterKey: 'region' },
];

export default function Destinations() {
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDest, setActiveModalDest] = useState(null);

  // Filtered List
  const filteredDestinations = useMemo(() => {
    return ALL_DESTINATIONS.filter((item) => {
      // Circuit / Region Filter
      let matchesCircuit = true;
      if (selectedCircuit === 'north') {
        matchesCircuit = item.circuit === 'north';
      } else if (selectedCircuit === 'south') {
        matchesCircuit = item.circuit === 'south';
      } else if (selectedCircuit !== 'all') {
        matchesCircuit = item.region?.toLowerCase().includes(selectedCircuit.toLowerCase());
      }

      // Search Filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.highlights.toLowerCase().includes(q);

      return matchesCircuit && matchesSearch;
    });
  }, [selectedCircuit, searchQuery]);

  return (
    <div className="w-full bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] overflow-hidden font-sans transition-colors duration-500 min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          1. MONUMENTAL HERO BANNER: OUR DESTINATIONS
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center py-24 sm:py-32 px-4 sm:px-10 lg:px-16 border-b border-[#B38738]/25 dark:border-[#B38738]/35 overflow-hidden select-none">
        
        {/* Authentic Indian Royal Palace Art & Jaali Lattice */}
        <IndianArtBackground variant="full" opacity="opacity-[0.05] dark:opacity-[0.07]" />

        {/* Ambient Vista Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80"
            alt="Country Holidays Destinations Across India"
            className="w-full h-full object-cover filter brightness-[0.88] opacity-25 dark:opacity-15 scale-105 transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/95 via-[#FAF6ED]/85 to-[#FAF6ED] dark:from-[#0D0A07]/95 dark:via-[#0D0A07]/85 dark:to-[#0D0A07]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 my-auto w-full">
          
          {/* Eyebrow Badge */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] px-4 py-1.5 bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/35 dark:border-[#B38738]/45 rounded-full shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>✦ PAN-INDIA ROYAL SANCTUARIES ✦</span>
            </div>
          </ScrollReveal>

          {/* Main Title */}
          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-marcellus font-bold uppercase tracking-[0.02em] leading-[1.08] text-[#241A12] dark:text-[#F5EFE6]">
              OUR DESTINATIONS
            </h1>
          </ScrollReveal>

          {/* Royal Spearhead Divider */}
          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          {/* Subtitle / Description */}
          <ScrollReveal direction="up" delay={200}>
            <p className="text-xs sm:text-sm md:text-base text-[#635142] dark:text-[#BFB0A2] max-w-2xl mx-auto leading-relaxed font-sans font-light">
              From the snow-crowned summits of Manali & Kashmir to the regal palaces of Rajasthan, the sunlit beaches of Goa, and the tranquil backwaters of Kerala — explore our 30+ palatial retreats across India.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. INTERACTIVE SEARCH & CIRCUIT SELECTION BAR
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-8 select-none">
        <div className="bg-[#FAF6ED]/95 dark:bg-[#140F0A]/95 backdrop-blur-2xl border-2 border-[#B38738]/40 rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-5">
          
          {/* Top Row: Search Input & Quick Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, state, or circuit..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-xs sm:text-sm text-[#241A12] dark:text-[#F5EFE6] placeholder:text-[#635142]/50 dark:placeholder:text-[#BFB0A2]/50 focus:outline-none focus:border-[#B38738] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#635142] hover:text-[#B38738]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Count Badge */}
            <div className="text-xs font-cinzel font-bold tracking-widest text-[#B38738] dark:text-[#E8C97E]">
              SHOWING {filteredDestinations.length} OF {ALL_DESTINATIONS.length} ROYAL SANCTUARIES
            </div>
          </div>

          {/* Bottom Row: Circuit Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#B38738]/20">
            {CIRCUITS.map((c) => {
              const isActive = selectedCircuit === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCircuit(c.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] text-white shadow-[0_4px_14px_rgba(179,135,56,0.3)] scale-105'
                      : 'bg-white/60 dark:bg-[#1A130D]/60 text-[#635142] dark:text-[#BFB0A2] border border-[#DDD4C4] dark:border-[#3A2C17] hover:border-[#B38738] hover:text-[#B38738]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 30+ DESTINATIONS GRID
      ───────────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden">
        
        {/* Subtle Indian Jaali Lattice Texture */}
        <IndianArtBackground variant="jaali" opacity="opacity-[0.04] dark:opacity-[0.06]" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-white/40 dark:bg-black/20 rounded-3xl border border-[#B38738]/20">
              <Compass className="w-12 h-12 text-[#B38738] mx-auto opacity-40 animate-pulse" />
              <h3 className="text-2xl font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6]">
                No Destinations Found
              </h3>
              <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] max-w-md mx-auto">
                We could not find any sanctuaries matching "{searchQuery}". Try resetting your filter or searching for another location.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCircuit('all');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#B38738] text-white font-cinzel text-xs font-bold uppercase tracking-wider"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
              {filteredDestinations.map((dest, idx) => {
                const whatsappUrl = getWhatsAppBookingUrl(
                  `Hello Country Holidays Concierge, I would like to inquire about reservation options for ${dest.name}, ${dest.state} (${dest.tagline}).`
                );

                return (
                  <ScrollReveal key={`${dest.id}-${dest.name}`} direction="up" delay={idx * 40}>
                    <div className="group relative rounded-2xl sm:rounded-3xl border-2 border-[#B38738]/30 dark:border-[#B38738]/35 bg-[#FAF6ED] dark:bg-[#140F0A] hover:border-[#E8C97E] shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(179,135,56,0.25)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
                      
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0A07]">
                        <img
                          src={dest.image}
                          alt={`${dest.name} - ${dest.state}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.95]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A07]/90 via-transparent to-black/30" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          {/* State Tag */}
                          <div className="px-3 py-1 rounded-full bg-[#0D0A07]/80 backdrop-blur-md text-[#E8C97E] text-[10px] font-cinzel font-bold uppercase tracking-wider border border-[#B38738]/40 shadow-sm">
                            {dest.state}
                          </div>

                          {/* Temp & Elevation */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D0A07]/80 backdrop-blur-md text-white text-[10px] font-sans font-semibold border border-white/15 shadow-sm">
                            <Thermometer className="w-3 h-3 text-[#E8C97E]" />
                            <span>{dest.temp}</span>
                          </div>
                        </div>

                        {/* Bottom Image Overlay: Name & Tagline */}
                        <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
                          <span className="text-[10px] font-cinzel font-bold tracking-[0.2em] text-[#E8C97E] uppercase block">
                            ✦ {dest.region || 'Royal Destination'} ✦
                          </span>
                          <h3 className="text-2xl font-marcellus font-bold tracking-wide text-white drop-shadow-md">
                            {dest.name}
                          </h3>
                          <p className="text-[11px] font-sans text-white/80 line-clamp-1 italic">
                            "{dest.tagline}"
                          </p>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                        
                        {/* Description */}
                        <p className="text-xs text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans line-clamp-3">
                          {dest.description}
                        </p>

                        {/* Highlights & Elevation Row */}
                        <div className="pt-2 border-t border-[#B38738]/20 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-[#635142] dark:text-[#BFB0A2]">
                            <Sparkles className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E] shrink-0" />
                            <span className="truncate font-sans font-medium">{dest.highlights}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#635142] dark:text-[#BFB0A2]">
                            <Mountain className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E] shrink-0" />
                            <span className="font-sans">Elevation: {dest.elevation}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-[#B38738]/20 flex items-center gap-2.5">
                          
                          {/* Details Modal Trigger */}
                          <button
                            type="button"
                            onClick={() => setActiveModalDest(dest)}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-white/70 dark:bg-[#1A130D] border border-[#B38738]/40 hover:border-[#B38738] text-[#241A12] dark:text-[#F5EFE6] hover:text-[#B38738] dark:hover:text-[#E8C97E] font-cinzel font-bold text-[11px] uppercase tracking-wider transition-all text-center cursor-pointer"
                          >
                            Explore Itinerary
                          </button>

                          {/* WhatsApp Direct */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct Concierge WhatsApp"
                            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-cinzel font-bold text-[11px] uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Inquire</span>
                          </a>

                        </div>

                      </div>

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE DESTINATION MODAL
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModalDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF6ED] dark:bg-[#140F0A] border-2 border-[#B38738]/50 shadow-2xl p-6 sm:p-8 space-y-6 text-[#241A12] dark:text-[#F5EFE6]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalDest(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#B38738]/15 dark:bg-[#B38738]/25 text-[#B38738] dark:text-[#E8C97E] flex items-center justify-center hover:bg-[#B38738] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Media */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-[#B38738]/30">
                <img
                  src={activeModalDest.image}
                  alt={activeModalDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-cinzel font-bold text-[#E8C97E] uppercase tracking-widest block">
                    {activeModalDest.state} • {activeModalDest.region}
                  </span>
                  <h3 className="text-3xl font-marcellus font-bold">
                    {activeModalDest.name}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <p className="text-[#635142] dark:text-[#BFB0A2] leading-relaxed">
                  {activeModalDest.description}
                </p>

                {/* Nearby Excursions */}
                {activeModalDest.nearby && activeModalDest.nearby.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-[#B38738]/25">
                    <span className="font-cinzel font-bold text-[#B38738] dark:text-[#E8C97E] uppercase tracking-wider block">
                      ✦ NEARBY EXCURSIONS & LANDMARKS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4A3E36] dark:text-[#D1C7BD]">
                      {activeModalDest.nearby.map((place, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0" />
                          <span>{place}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#B38738]/25 text-center">
                  <div className="p-2.5 rounded-xl bg-white/60 dark:bg-[#1A130D] border border-[#B38738]/20">
                    <span className="text-[10px] font-mono text-[#635142] dark:text-[#BFB0A2] uppercase block">Rating</span>
                    <span className="text-sm font-bold text-[#B38738] dark:text-[#E8C97E]">5.0 ★ Luxury</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/60 dark:bg-[#1A130D] border border-[#B38738]/20">
                    <span className="text-[10px] font-mono text-[#635142] dark:text-[#BFB0A2] uppercase block">Elevation</span>
                    <span className="text-sm font-bold text-[#241A12] dark:text-[#F5EFE6]">{activeModalDest.elevation}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/60 dark:bg-[#1A130D] border border-[#B38738]/20">
                    <span className="text-[10px] font-mono text-[#635142] dark:text-[#BFB0A2] uppercase block">Climate</span>
                    <span className="text-sm font-bold text-[#241A12] dark:text-[#F5EFE6]">{activeModalDest.temp}</span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-4 flex items-center gap-3">
                  <a
                    href={getWhatsAppBookingUrl(`Hello Country Holidays Concierge, I would like to book our stay for ${activeModalDest.name}, ${activeModalDest.state}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] text-white font-cinzel font-bold text-xs uppercase tracking-widest text-center shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    Reserve on WhatsApp Priority Desk
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

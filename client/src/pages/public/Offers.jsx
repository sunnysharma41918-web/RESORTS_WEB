import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  ShieldCheck,
  Crown,
  Building2,
  PartyPopper,
  Compass,
  X,
  MessageCircle,
  Utensils
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder, RoyalCornerOrnaments } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';
import { offerService } from '../../services/offerService';
import { storage } from '../../services/storage';
import { getWhatsAppBookingUrl } from '../../data/contact';

const PROPERTY_TYPES = [
  { label: 'ALL EXPERIENCES', value: 'All', icon: Sparkles },
  { label: '🏰 LUXURY RESORTS', value: 'Resort', icon: Crown },
  { label: '🏢 PREMIER HOTELS', value: 'Hotel', icon: Building2 },
];

const REGION_FILTERS = [
  { label: 'ALL DESTINATIONS', value: 'All' },
  { label: '🌴 SOUTH INDIA (Goa, Kerala, Chennai, Coorg, Bengaluru)', value: 'South India' },
  { label: '🏔️ NORTH INDIA (Rajasthan, Manali, Delhi NCR, Varanasi, Rishikesh)', value: 'North India' },
];

const ROYAL_PRIVILEGES = [
  {
    icon: Crown,
    title: '50+ Royal Venues',
    desc: 'Palaces, oceanfront lawns & grand ballrooms across premier South & North destinations.',
  },
  {
    icon: Utensils,
    title: 'Master Chef Banquets',
    desc: 'Bespoke regional royal spreads, Satvik kitchens & live artisanal counters.',
  },
  {
    icon: Sparkles,
    title: 'Tailored Event Décor',
    desc: 'Custom royal mandaps, mood lighting rigs & personalized floral styling.',
  },
  {
    icon: ShieldCheck,
    title: '24/7 Royal Concierge',
    desc: 'Dedicated personal hospitality director ensuring flawless execution.',
  },
];

export default function Offers() {
  const [offers, setOffers] = useState(() => {
    try {
      const stored = storage.getOffers() || [];
      return stored.filter(
        (o) =>
          o.title !== 'Corporate Leadership Conclave Privilege' &&
          o.title !== 'Royal Destination Wedding Package'
      );
    } catch {
      return [];
    }
  });
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedModalPkg, setSelectedModalPkg] = useState(null);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await offerService.getOffers();
        if (data && data.length > 0) {
          const clean = data.filter(
            (o) =>
              o.title !== 'Corporate Leadership Conclave Privilege' &&
              o.title !== 'Royal Destination Wedding Package'
          );
          setOffers(clean);
        }
      } catch (err) {
        console.error('Failed to load offers:', err);
      }
    }
    loadOffers();
  }, []);

  // Filtered Offers by Property Type and South/North Region
  const filteredOffers = useMemo(() => {
    return offers
      .filter(
        (o) =>
          o.title !== 'Corporate Leadership Conclave Privilege' &&
          o.title !== 'Royal Destination Wedding Package'
      )
      .filter((item) => {
        const matchType =
          selectedType === 'All' ||
          (item.propertyType || '').toLowerCase() === selectedType.toLowerCase() ||
          (item.category || '').toLowerCase().includes(selectedType.toLowerCase());

        const matchRegion =
          selectedRegion === 'All' ||
          (item.region || '').toLowerCase().includes(selectedRegion.toLowerCase()) ||
          (item.location || '').toLowerCase().includes(selectedRegion.toLowerCase());

        return matchType && matchRegion;
      });
  }, [offers, selectedType, selectedRegion]);

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden font-manrope transition-colors duration-500 min-h-screen">

      {/* 1. HERO BANNER IN ROYAL PALATIAL THEME */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 overflow-hidden select-none">
        
        {/* Traditional Royal Corner Ornaments */}
        <RoyalCornerOrnaments opacity="opacity-25 dark:opacity-30" />

        {/* Indian Royal Art & Arch Background */}
        <IndianArtBackground variant="full" opacity="opacity-[0.06] dark:opacity-[0.08]" />

        {/* Background Vista with Soft Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=3000&q=95"
            alt="Country Holidays Curated Royal Selection"
            className="w-full h-full object-cover filter brightness-[0.92] opacity-25 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 my-auto w-full">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#8F6B2E] dark:text-[#D4AF37] px-5 py-1.5 bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/30 dark:border-[#8F6B2E]/40 rounded-full shadow-sm backdrop-blur-sm">
              <Crown className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37] animate-pulse" />
              <span>✦ RESORTS & HOTELS • SOUTH & NORTH INDIA ✦</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-tight leading-[1.1] text-[#2A1F17] dark:text-[#F3EEE0]">
              EXCLUSIVE RESORT & <br />
              HOTEL PACKAGES <br />
              <span className="bg-gradient-to-r from-[#8F6B2E] via-[#B38738] to-[#D4AF37] bg-clip-text text-transparent font-medium">
                SOUTH & NORTH TOURIST DESTINATIONS
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-base md:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-3xl mx-auto leading-relaxed px-2">
              Explore bespoke stays across iconic tourist sanctuaries in Goa, Kerala, Chennai, Bengaluru, Coorg, Rajasthan Palaces, Himalayan Solang Valley, Delhi NCR, Varanasi Ghats, and Rishikesh.
            </p>
          </ScrollReveal>

          {/* Quick Stats Badges */}
          <ScrollReveal direction="up" delay={250}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-[#8F6B2E] dark:text-[#D4AF37]">
              <span className="px-3.5 py-1.5 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/20 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" /> 50+ Palaces & Sanctuaries
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/20 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> South & North Circuits
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/20 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 24/7 Dedicated Concierge
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MAIN OFFERS & CURATED SELECTION SECTION */}
      <section className="relative dark:bg-[#14110E] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] py-16 sm:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10">

          {/* Header & Controls: Property Type & Region Filter Tabs */}
          <div className="space-y-6 pb-8 border-b dark:border-[#8F6B2E]/30 border-[#8F6B2E]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] animate-ping" />
                  <span className="text-xs font-mono font-bold text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-[0.2em] block">
                    ✦ CURATED ROYAL SELECTION ✦
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-normal uppercase dark:text-[#F3EEE0] text-[#2A1F17] tracking-tight">
                  SELECT RESORT & HOTEL PACKAGES
                </h2>
                <RoyalOrnamentDivider color="#8F6B2E" className="justify-start my-1" />
              </div>

              <span className="text-xs font-mono text-[#8F6B2E] dark:text-[#D4AF37]">
                Showing {filteredOffers.length} {filteredOffers.length === 1 ? 'Package' : 'Packages'}
              </span>
            </div>

            {/* 1. Property Type Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8F6B2E] dark:text-[#D4AF37] font-bold block">
                FILTER BY PROPERTY TYPE:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {PROPERTY_TYPES.map((pt) => {
                  const isActive = pt.value === selectedType;
                  const IconComp = pt.icon;
                  return (
                    <button
                      key={pt.value}
                      onClick={() => setSelectedType(pt.value)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                        isActive
                          ? 'bg-gradient-to-r from-[#8F6B2E] to-[#B38738] text-white border-[#8F6B2E] shadow-md dark:from-[#8F6B2E] dark:to-[#D4AF37] dark:text-[#14110E] dark:font-bold'
                          : 'border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 dark:text-[#D4AF37] text-[#6E5D4F] hover:border-[#8F6B2E] hover:text-[#8F6B2E] dark:hover:text-[#F3EEE0] dark:bg-[#1C1814]/70 bg-white/80 backdrop-blur-sm'
                      }`}
                    >
                      <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-[#14110E]' : 'text-[#8F6B2E] dark:text-[#D4AF37]'}`} />
                      <span>{pt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. South & North Region Selector */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8F6B2E] dark:text-[#D4AF37] font-bold block">
                FILTER BY TOURIST DESTINATION:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {REGION_FILTERS.map((rf) => {
                  const isActive = rf.value === selectedRegion;
                  return (
                    <button
                      key={rf.value}
                      onClick={() => setSelectedRegion(rf.value)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? 'bg-[#2A1F17] text-[#D4AF37] border-[#8F6B2E] shadow-md dark:bg-white dark:text-[#14110E] dark:font-bold'
                          : 'border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 dark:text-[#B8A89A] text-[#6E5D4F] hover:border-[#8F6B2E] hover:text-[#8F6B2E] dark:hover:text-[#F3EEE0] dark:bg-[#1C1814]/40 bg-white/50'
                      }`}
                    >
                      {rf.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Offers Cards Grid - Compact Small Cards */}
          {filteredOffers.length === 0 ? (
            <div className="py-16 text-center space-y-4 rounded-3xl border border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 bg-white/40 dark:bg-[#1C1814]/40 backdrop-blur-sm">
              <Crown className="w-10 h-10 text-[#8F6B2E] dark:text-[#D4AF37] mx-auto opacity-50" />
              <div className="space-y-1">
                <p className="text-lg font-serif uppercase dark:text-[#F3EEE0] text-[#2A1F17]">No Packages Found</p>
                <p className="text-xs dark:text-[#B8A89A] text-[#6E5D4F] font-mono">Try switching destination regions or viewing all experiences.</p>
              </div>
              <button
                onClick={() => { setSelectedType('All'); setSelectedRegion('All'); }}
                className="px-5 py-2 rounded-xl bg-[#8F6B2E] hover:bg-[#A67C38] dark:bg-[#D4AF37] dark:hover:bg-[#C5A880] text-white dark:text-[#14110E] font-mono text-xs uppercase font-bold cursor-pointer transition-all shadow-md"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredOffers.map((pkg, idx) => (
                <ScrollReveal key={pkg.id} direction="up" delay={idx * 50}>
                  <div className="group relative flex flex-col justify-between h-full rounded-2xl overflow-hidden dark:bg-[#1C1814] bg-white border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 hover:border-[#8F6B2E] dark:hover:border-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_rgba(143,107,46,0.15)] dark:hover:shadow-[0_8px_24px_rgba(212,175,55,0.1)]">
                    
                    {/* Media Header (Compact) */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-black/90">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Corner Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
                        <span className="px-2 py-0.5 rounded bg-gradient-to-r from-[#8F6B2E] to-[#B38738] text-white text-[9px] font-mono uppercase tracking-wider font-bold shadow-sm flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5 text-amber-200" />
                          {pkg.propertyType === 'Resort' ? 'RESORT' : 'HOTEL'}
                        </span>

                        {pkg.region && (
                          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-mono uppercase tracking-wider font-medium">
                            {pkg.region.includes('South') ? '🌴 South' : '🏔️ North'}
                          </span>
                        )}
                      </div>

                      {/* Privilege Banner Ribbon */}
                      {pkg.discount && (
                        <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-[#FAF6F0]/95 dark:bg-[#14110E]/95 backdrop-blur-md text-[#2A1F17] dark:text-[#F3EEE0] border border-[#8F6B2E]/30 text-[10px] font-mono font-semibold flex items-center gap-1.5 shadow">
                          <Sparkles className="w-3 h-3 text-[#8F6B2E] dark:text-[#D4AF37] shrink-0" />
                          <span className="truncate">{pkg.discount}</span>
                        </div>
                      )}
                    </div>

                    {/* Body Content (Compact) */}
                    <div className="p-4 sm:p-4.5 space-y-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        
                        {/* Title */}
                        <h3 className="text-base font-serif font-normal uppercase dark:text-[#F3EEE0] text-[#2A1F17] group-hover:text-[#8F6B2E] dark:group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                          {pkg.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] sm:text-xs dark:text-[#B8A89A] text-[#6E5D4F] font-light leading-relaxed line-clamp-2">
                          {pkg.description}
                        </p>

                        {/* Key Inclusions Preview */}
                        {pkg.inclusions && pkg.inclusions.length > 0 && (
                          <div className="pt-2 space-y-1.5 border-t border-[#8F6B2E]/15 dark:border-[#8F6B2E]/20">
                            <span className="text-[9px] font-mono dark:text-[#D4AF37]/80 text-[#8F6B2E] uppercase tracking-widest block font-bold">
                              KEY PRIVILEGES:
                            </span>
                            <ul className="space-y-1">
                              {pkg.inclusions.slice(0, 2).map((inc, iIdx) => (
                                <li key={iIdx} className="flex items-start gap-1.5 text-[11px] dark:text-[#E0D7CD] text-[#2A1F17]/85 font-light">
                                  <CheckCircle2 className="w-3 h-3 text-[#8F6B2E] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Footer Info & Action Buttons */}
                      <div className="space-y-2.5 pt-3 border-t border-[#8F6B2E]/20 dark:border-[#8F6B2E]/25">
                        <div className="flex items-center justify-between text-[10px] font-mono dark:text-[#B8A89A] text-[#6E5D4F]">
                          <span className="flex items-center gap-1 truncate max-w-[130px]">
                            <MapPin className="w-3 h-3 text-[#8F6B2E] dark:text-[#D4AF37] shrink-0" />
                            <span className="truncate">{pkg.location || 'India'}</span>
                          </span>
                          <span className="text-[#8F6B2E] dark:text-[#D4AF37] font-semibold text-right shrink-0">
                            2026
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <button
                            onClick={() => setSelectedModalPkg(pkg)}
                            className="py-2 px-2 rounded-lg border border-[#8F6B2E]/40 hover:border-[#8F6B2E] dark:border-[#8F6B2E]/40 dark:hover:border-[#D4AF37] dark:text-[#F3EEE0] text-[#2A1F17] font-bold text-[10px] uppercase font-mono tracking-wider transition-all hover:bg-[#8F6B2E]/10 cursor-pointer text-center"
                          >
                            DOSSIER
                          </button>
                          
                          <a
                            href={getWhatsAppBookingUrl(`Hello Country Holidays Concierge, I would like to inquire about the package: "${pkg.title}"`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2 rounded-lg bg-gradient-to-r from-[#8F6B2E] to-[#B38738] hover:from-[#A67C38] hover:to-[#8F6B2E] dark:from-[#8F6B2E] dark:to-[#D4AF37] text-white dark:text-[#14110E] text-center font-bold text-[10px] uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                          >
                            <span>RESERVE</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 3. ROYAL PILLARS & CONCIERGE PROMISE */}
      <section className="relative dark:bg-[#1A1612] bg-[#F5EFEB] py-16 sm:py-24 px-4 sm:px-10 lg:px-16 border-t border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[11px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-[0.2em] font-bold block">
              ✦ THE ROYAL HOSPITALITY ADVANTAGE ✦
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal uppercase dark:text-[#F3EEE0] text-[#2A1F17] tracking-tight">
              WHY CHOOSE OUR CURATED PACKAGES
            </h2>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROYAL_PRIVILEGES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                  <div className="p-6 rounded-2xl dark:bg-[#14110E] bg-white border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 space-y-4 hover:border-[#8F6B2E] transition-all h-full flex flex-col justify-start">
                    <div className="w-12 h-12 rounded-xl bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/30 flex items-center justify-center text-[#8F6B2E] dark:text-[#D4AF37]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-normal uppercase dark:text-[#F3EEE0] text-[#2A1F17]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-light dark:text-[#B8A89A] text-[#6E5D4F] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. DETAILS DOSSIER MODAL WITH ANIMATION */}
      <AnimatePresence>
        {selectedModalPkg && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedModalPkg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="dark:bg-[#1C1814] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] border-2 border-[#8F6B2E]/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative rounded-3xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#8F6B2E]/25 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-gradient-to-r from-[#8F6B2E] to-[#B38738] text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                      {selectedModalPkg.badge || 'ROYAL DOSSIER'}
                    </span>
                    {selectedModalPkg.propertyType && (
                      <span className="px-2.5 py-1 rounded-md bg-[#8F6B2E]/15 border border-[#8F6B2E]/30 text-[#8F6B2E] dark:text-[#D4AF37] text-[10px] font-mono uppercase tracking-wider font-bold">
                        {selectedModalPkg.propertyType === 'Resort' ? '🏰 RESORT PACKAGE' : '🏢 HOTEL PACKAGE'}
                      </span>
                    )}
                    {selectedModalPkg.region && (
                      <span className="px-2.5 py-1 rounded-md bg-black/80 text-[#D4AF37] text-[10px] font-mono uppercase tracking-wider">
                        {selectedModalPkg.region.includes('South') ? '🌴 South India' : '🏔️ North India'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal uppercase dark:text-[#F3EEE0] text-[#2A1F17] leading-tight">
                    {selectedModalPkg.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedModalPkg(null)}
                  className="w-9 h-9 rounded-full border border-[#8F6B2E]/30 hover:border-[#8F6B2E] dark:text-white text-[#2A1F17] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Banner */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black border border-[#8F6B2E]/30 shadow-inner">
                <img
                  src={selectedModalPkg.image}
                  alt={selectedModalPkg.title}
                  className="w-full h-full object-cover filter brightness-95"
                />
                {selectedModalPkg.discount && (
                  <div className="absolute bottom-3 left-3 right-3 px-3.5 py-1.5 rounded-lg bg-black/85 backdrop-blur-md text-[#D4AF37] text-xs font-mono font-bold flex items-center gap-2 border border-[#D4AF37]/30">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selectedModalPkg.discount}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-widest font-bold block">
                    PACKAGE OVERVIEW
                  </span>
                  <p className="text-sm dark:text-[#B8A89A] text-[#6E5D4F] font-light leading-relaxed">
                    {selectedModalPkg.description}
                  </p>
                </div>

                {selectedModalPkg.inclusions && selectedModalPkg.inclusions.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase text-[#8F6B2E] dark:text-[#D4AF37] tracking-widest font-bold block">
                      ✦ COMPLETE ROYAL INCLUSIONS:
                    </span>
                    <ul className="grid grid-cols-1 gap-2.5 bg-white/50 dark:bg-black/30 p-4 rounded-xl border border-[#8F6B2E]/20">
                      {selectedModalPkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm dark:text-[#E0D7CD] text-[#2A1F17]">
                          <CheckCircle2 className="w-4 h-4 text-[#8F6B2E] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Location & Validity Strip */}
                <div className="p-3.5 rounded-xl dark:bg-[#14110E] bg-white border border-[#8F6B2E]/25 flex flex-col sm:flex-row items-center justify-between text-xs font-mono dark:text-[#B8A89A] text-[#6E5D4F] gap-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#8F6B2E] dark:text-[#D4AF37]" />
                    <span>Location: {selectedModalPkg.location || 'All Properties'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#8F6B2E] dark:text-[#D4AF37] font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>Validity: {selectedModalPkg.validTill || 'Year-Round'}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#8F6B2E]/25 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getWhatsAppBookingUrl(`Hello Country Holidays, I would like to book the royal package: "${selectedModalPkg.title}"`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8F6B2E] to-[#B38738] hover:from-[#A67C38] hover:to-[#8F6B2E] dark:from-[#8F6B2E] dark:to-[#D4AF37] text-white dark:text-[#14110E] font-bold text-xs uppercase font-mono tracking-widest text-center transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>RESERVE ON WHATSAPP</span>
                </a>
                <Link
                  to="/contact"
                  className="w-full py-3.5 rounded-xl border border-[#8F6B2E]/40 hover:border-[#8F6B2E] dark:border-[#8F6B2E]/40 dark:hover:border-[#D4AF37] dark:text-[#F3EEE0] text-[#2A1F17] text-center font-bold text-xs uppercase font-mono tracking-widest transition-all cursor-pointer hover:bg-[#8F6B2E]/10"
                >
                  SUBMIT DIRECT INQUIRY
                </Link>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. BESPOKE ROYAL CELEBRATION & GROUP BANQUETS CTA */}
      <section className="relative dark:bg-[#14110E] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-[#8F6B2E]/30 overflow-hidden text-center space-y-8 transition-colors duration-300">
        <IndianArtBackground variant="minimal" opacity="opacity-[0.04] dark:opacity-[0.06]" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOM PACKAGES & GROUP BOOKINGS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal uppercase dark:text-[#F3EEE0] text-[#2A1F17] tracking-tight">
            NEED A BESPOKE ROYAL CELEBRATION OR CORPORATE PACKAGE?
          </h2>

          <RoyalOrnamentDivider color="#8F6B2E" className="my-2" />

          <p className="text-sm sm:text-base font-light dark:text-[#B8A89A] text-[#6E5D4F] max-w-xl mx-auto leading-relaxed">
            Contact our dedicated event director & concierge team in Chennai, Noida, Mumbai, or Delhi to design a tailor-made royal itinerary for your guests.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppBookingUrl('Hello Country Holidays Concierge, I would like to consult with an event specialist regarding a custom group package.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#8F6B2E] to-[#B38738] hover:from-[#A67C38] hover:to-[#8F6B2E] dark:from-[#8F6B2E] dark:to-[#D4AF37] text-white dark:text-[#14110E] font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT WITH CONCIERGE</span>
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl border border-[#8F6B2E]/40 hover:border-[#8F6B2E] dark:border-[#8F6B2E]/40 dark:hover:border-[#D4AF37] dark:text-[#F3EEE0] text-[#2A1F17] font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer hover:bg-[#8F6B2E]/10"
            >
              SEND DIRECT INQUIRY
            </Link>
          </div>
        </div>

        {/* Bottom Jaali Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <IndianJaaliBorder />
        </div>
      </section>

    </div>
  );
}


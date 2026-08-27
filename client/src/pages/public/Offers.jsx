import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift, CheckCircle2, MapPin, Calendar, Search, Phone, ShieldCheck, Tag } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { offerService } from '../../services/offerService';
import { getWhatsAppBookingUrl } from '../../data/contact';
import Loader from '../../components/common/Loader';

const CATEGORIES = [
  { label: 'ALL PACKAGES', value: 'All' },
  { label: 'WEDDINGS & BANQUETS', value: 'Weddings' },
  { label: 'CORPORATE OFFSITES', value: 'Corporate' },
  { label: 'FAMILY HOLIDAYS', value: 'Holidays' },
  { label: 'CELEBRATIONS', value: 'Celebrations' },
  { label: 'ROMANCE & HONEYMOONS', value: 'Romance' },
];

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedModalPkg, setSelectedModalPkg] = useState(null);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await offerService.getOffers();
        setOffers(data || []);
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  const filteredOffers = useMemo(() => {
    return offers.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' ||
        (item.category || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes((item.category || '').toLowerCase());

      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [offers, selectedCategory, searchQuery]);

  if (loading) {
    return <Loader fullscreen text="LOADING SPECIAL OFFERS & PACKAGES" />;
  }

  return (
    <div className="w-full dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] overflow-hidden font-manrope transition-colors duration-300">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center py-20 sm:py-32 px-4 sm:px-12 bg-black border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=3000&q=95"
            alt="Country Holidays Special Offers Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 my-auto w-full">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02] px-3 py-1 bg-black/40 border border-[#FF1F02]/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] inline-block animate-pulse" />
              <span>SPECIAL OFFERS & CURATED PACKAGES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-[clamp(1.95rem,7.5vw,7.5rem)] font-extrabold uppercase tracking-tight sm:tracking-[-0.04em] leading-[0.98] sm:leading-[0.88] text-white break-words">
              EXCLUSIVE <br />
              EXPERIENCES & <br />
              <span className="text-art-orange-dark">CURATED PACKAGES.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-xs sm:text-lg lg:text-xl font-light text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed px-2">
              Discover exceptional holiday value with our tailor-made getaway offers, destination wedding packages, corporate summits, and bespoke family escapes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MAIN OFFERS SECTION (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-20 sm:py-36 px-4 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">

          {/* Controls: Search & Category Tabs */}
          <div className="space-y-8 pb-10 border-b dark:border-[#333333] border-[#E9E9DE]">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#FF1F02] uppercase tracking-widest block">
                  ● CURATED SELECTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase dark:text-white text-[#0E0E0E] tracking-tight">
                  SELECT YOUR EXPERIENCE
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <Search className="w-4 h-4 dark:text-white/40 text-[#0E0E0E]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search package name, city, or event..."
                  className="w-full pl-11 pr-4 py-3 dark:bg-[#0E0E0E] dark:border-[#333333] dark:text-white dark:placeholder:text-white/40 bg-white border border-[#E9E9DE] focus:border-[#FF1F02] text-[#0E0E0E] text-xs font-mono placeholder:text-[#0E0E0E]/40 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category Filter Tabs matching Admin */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              {CATEGORIES.map((cat) => {
                const isActive = cat.value === selectedCategory;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF1F02] text-white shadow-md'
                        : 'border dark:border-[#333333] border-[#E9E9DE] dark:text-[#D0D0D0] text-[#0E0E0E]/75 hover:border-[#FF1F02] hover:text-[#FF1F02] dark:bg-[#0E0E0E] bg-white/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Offers Cards Grid */}
          {filteredOffers.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-xl font-bold uppercase dark:text-white text-[#0E0E0E]">No packages found</p>
              <p className="text-xs dark:text-white/60 text-[#0E0E0E]/60 font-mono">Try adjusting your search query or category filter.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 bg-[#FF1F02] text-white font-mono text-xs uppercase font-bold cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOffers.map((pkg, idx) => (
                <ScrollReveal key={pkg.id} direction="up" delay={idx * 60}>
                  <div className="dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between group h-full overflow-hidden">
                    
                    {/* Media Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Corner Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        <span className="px-2.5 py-0.5 bg-[#FF1F02] text-white text-[10px] font-mono uppercase tracking-wider font-extrabold">
                          {pkg.badge || 'SPECIAL'}
                        </span>
                        <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm text-[#EAB308] text-[10px] font-mono uppercase tracking-wider">
                          {pkg.tag}
                        </span>
                      </div>

                      {/* Discount / Inclusions Ribbon */}
                      {pkg.discount && (
                        <div className="absolute bottom-3 left-3 right-3 px-3 py-1 dark:bg-black/90 bg-white/95 backdrop-blur-sm dark:text-white text-[#0E0E0E] text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                          <Gift className="w-3.5 h-3.5 text-[#FF1F02]" />
                          <span className="truncate">{pkg.discount}</span>
                        </div>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="text-xl font-extrabold uppercase dark:text-white text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors leading-tight">
                          {pkg.title}
                        </h3>
                        <p className="text-xs sm:text-sm dark:text-[#A0A0A0] text-[#0E0E0E]/75 font-light leading-relaxed line-clamp-3">
                          {pkg.description}
                        </p>

                        {/* Inclusions Preview */}
                        {pkg.inclusions && pkg.inclusions.length > 0 && (
                          <div className="pt-2 space-y-1.5">
                            <span className="text-[10px] font-mono dark:text-white/50 text-[#0E0E0E]/50 uppercase tracking-widest block font-semibold">
                              KEY INCLUSIONS:
                            </span>
                            <ul className="space-y-1">
                              {pkg.inclusions.slice(0, 2).map((inc, iIdx) => (
                                <li key={iIdx} className="flex items-start gap-2 text-xs dark:text-[#D0D0D0] text-[#0E0E0E]/80 font-light">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F02] shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Footer Info & Action */}
                      <div className="space-y-3 pt-4 border-t dark:border-[#333333] border-[#E9E9DE]">
                        <div className="flex items-center justify-between text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF1F02]" />
                            {pkg.location || 'All Destinations'}
                          </span>
                          <span className="text-[#FF1F02] font-semibold">{pkg.validTill}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => setSelectedModalPkg(pkg)}
                            className="py-2.5 border dark:border-white/30 dark:hover:border-white dark:text-white border-[#0E0E0E]/30 hover:border-[#0E0E0E] text-[#0E0E0E] font-bold text-xs uppercase font-mono tracking-wider transition-colors cursor-pointer"
                          >
                            DETAILS
                          </button>
                          <a
                            href={getWhatsAppBookingUrl(`Hello Country Holidays, I would like to book the package: ${pkg.title}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 bg-[#FF1F02] hover:bg-black text-white text-center font-bold text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>BOOK</span>
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

      {/* 3. DETAILS MODAL */}
      {selectedModalPkg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedModalPkg(null)}
        >
          <div
            className="dark:bg-[#161616] bg-white dark:text-white text-[#0E0E0E] border dark:border-[#333333] border-[#E9E9DE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b dark:border-[#333333] border-[#E9E9DE] pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-[#FF1F02] text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                  {selectedModalPkg.badge || 'SPECIAL PACKAGE'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase dark:text-white text-[#0E0E0E]">
                  {selectedModalPkg.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalPkg(null)}
                className="w-8 h-8 rounded-full border dark:border-white/20 border-[#0E0E0E]/20 hover:border-[#FF1F02] dark:text-white text-[#0E0E0E] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] overflow-hidden bg-black border dark:border-[#333333] border-[#E9E9DE]">
              <img
                src={selectedModalPkg.image}
                alt={selectedModalPkg.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm dark:text-[#D0D0D0] text-[#0E0E0E]/80 font-light leading-relaxed">
                {selectedModalPkg.description}
              </p>

              {selectedModalPkg.inclusions && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono uppercase text-[#EAB308] tracking-widest font-bold block">
                    COMPLETE PACKAGE INCLUSIONS:
                  </span>
                  <ul className="space-y-2">
                    {selectedModalPkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm dark:text-[#E0E0E0] text-[#0E0E0E]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#FF1F02] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 dark:bg-black/60 bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex flex-col sm:flex-row items-center justify-between text-xs font-mono dark:text-[#B0B0B0] text-[#0E0E0E]/70 gap-2">
                <span>📍 {selectedModalPkg.location}</span>
                <span>⏳ {selectedModalPkg.validTill}</span>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-[#333333] border-[#E9E9DE] flex flex-col sm:flex-row items-center gap-4">
              <a
                href={getWhatsAppBookingUrl(`Hello Country Holidays, I would like to book the package: ${selectedModalPkg.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#FF1F02] hover:bg-black text-white font-bold text-xs uppercase font-mono tracking-widest text-center transition-all cursor-pointer"
              >
                RESERVE ON WHATSAPP
              </a>
              <Link
                to="/contact"
                className="w-full py-4 border dark:border-white/40 border-[#0E0E0E]/40 hover:border-[#FF1F02] dark:text-white text-[#0E0E0E] text-center font-bold text-xs uppercase font-mono tracking-widest transition-all cursor-pointer"
              >
                SUBMIT INQUIRY
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* 4. FINAL CTA (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-24 sm:py-36 px-6 sm:px-10 lg:px-16 border-t dark:border-[#333333] border-[#E9E9DE] overflow-hidden text-center space-y-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[11px] font-mono text-[#FF1F02] uppercase tracking-widest font-bold block">
            ● CUSTOM PACKAGES & GROUP BOOKINGS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold uppercase dark:text-white text-[#0E0E0E] tracking-tight">
            NEED A BESPOKE CELEBRATION OR CORPORATE PACKAGE?
          </h2>
          <p className="text-sm sm:text-base font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70 max-w-xl mx-auto">
            Contact our dedicated event concierge team in Chennai, Noida, Mumbai, or Delhi to design a custom itinerary tailored to your guests.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppBookingUrl('Hello Country Holidays, I would like to consult with an event specialist about a custom group package.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#FF1F02] hover:bg-black text-white font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer"
            >
              CHAT WITH CONCIERGE
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 border dark:border-white/40 border-[#0E0E0E]/40 hover:border-[#FF1F02] dark:text-white text-[#0E0E0E] font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer"
            >
              SEND DIRECT INQUIRY
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

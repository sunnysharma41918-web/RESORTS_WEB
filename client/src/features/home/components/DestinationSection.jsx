import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

const ALL_STATES = [
  { id: '01', name: 'Andaman & Nicobar Islands', region: 'south' },
  { id: '02', name: 'Andhra Pradesh', region: 'south' },
  { id: '03', name: 'Arunachal Pradesh', region: 'northeast' },
  { id: '04', name: 'Assam', region: 'northeast' },
  { id: '05', name: 'Bihar', region: 'east' },
  { id: '06', name: 'Chandigarh', region: 'north' },
  { id: '07', name: 'Chhattisgarh', region: 'central' },
  { id: '08', name: 'Dadra & Nagar Haveli and Daman & Diu', region: 'west' },
  { id: '09', name: 'Delhi NCR', region: 'north' },
  { id: '10', name: 'Goa', region: 'west' },
  { id: '11', name: 'Gujarat', region: 'west' },
  { id: '12', name: 'Haryana', region: 'north' },
  { id: '13', name: 'Himachal Pradesh', region: 'north' },
  { id: '14', name: 'Jammu & Kashmir', region: 'north' },
  { id: '15', name: 'Jharkhand', region: 'east' },
  { id: '16', name: 'Karnataka', region: 'south' },
  { id: '17', name: 'Kerala', region: 'south' },
  { id: '18', name: 'Ladakh', region: 'north' },
  { id: '19', name: 'Lakshadweep', region: 'south' },
  { id: '20', name: 'Madhya Pradesh', region: 'central' },
  { id: '21', name: 'Maharashtra', region: 'west' },
  { id: '22', name: 'Manipur', region: 'northeast' },
  { id: '23', name: 'Meghalaya', region: 'northeast' },
  { id: '24', name: 'Mizoram', region: 'northeast' },
  { id: '25', name: 'Nagaland', region: 'northeast' },
  { id: '26', name: 'Odisha', region: 'east' },
  { id: '27', name: 'Puducherry', region: 'south' },
  { id: '28', name: 'Punjab', region: 'north' },
  { id: '29', name: 'Rajasthan', region: 'west' },
  { id: '30', name: 'Sikkim', region: 'northeast' },
  { id: '31', name: 'Tamil Nadu', region: 'south' },
  { id: '32', name: 'Telangana', region: 'south' },
  { id: '33', name: 'Tripura', region: 'northeast' },
  { id: '34', name: 'Uttar Pradesh', region: 'north' },
  { id: '35', name: 'Uttarakhand', region: 'north' },
  { id: '36', name: 'West Bengal', region: 'east' },
];

const POPULAR = new Set([
  'Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Tamil Nadu', 'Uttarakhand', 'Jammu & Kashmir',
]);

const REGIONS = [
  { key: 'all', label: 'All Regions', color: '#0E0E0E' },
  { key: 'north', label: 'North', color: '#EAB308' },
  { key: 'south', label: 'South', color: '#16A34A' },
  { key: 'east', label: 'East', color: '#A855F7' },
  { key: 'west', label: 'West', color: '#FF1F02' },
  { key: 'central', label: 'Central', color: '#06B6D4' },
  { key: 'northeast', label: 'Northeast', color: '#F97316' },
];

const regionMeta = (key) => REGIONS.find((r) => r.key === key) || REGIONS[0];

const slugify = (name) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Deterministic per-state image so each card gets a distinct, stable photo.
const imageSrcFor = (name) => `https://picsum.photos/seed/${slugify(name)}/120/120`;

export default function DestinationSection() {
  const [activeRegion, setActiveRegion] = useState('all');

  const filteredStates = ALL_STATES.filter(
    (st) => activeRegion === 'all' || st.region === activeRegion
  );

  const activeLabel = regionMeta(activeRegion).label;

  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden font-manrope transition-colors duration-300">
      {/* Background Subtle Graphic */}
      <EditorialBackgroundElements variant="light" position="top-right" />

      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16 relative z-10">

        {/* 1. SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>04 — OUR WIDE RANGE OF LOCATIONS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                OUR WIDE RANGE <br />
                OF LOCATIONS.
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-4 max-w-md">
            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 leading-relaxed">
                Country Holidays Hotels & Resorts delivers warm hospitality, comfortable stays, and memorable celebrations across every state nationwide.
              </p>
            </ScrollReveal>
          </div>
        </div>


        {/* 2. STATES LISTING */}
        <div className="space-y-6">

          {/* Region filters */}
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {REGIONS.map((r) => {
                const isActive = activeRegion === r.key;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setActiveRegion(r.key)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-[10.5px] font-mono font-bold uppercase tracking-wider border transition-all duration-200 ${isActive
                        ? 'bg-[#0E0E0E] text-white border-[#0E0E0E] dark:bg-white dark:text-[#0E0E0E] dark:border-white'
                        : 'dark:border-[#333333] border-[#E9E9DE] dark:text-white/60 text-[#0E0E0E]/60 hover:border-[#FF1F02] hover:text-[#FF1F02]'
                      }`}
                  >
                    {r.key !== 'all' && (
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: isActive ? 'currentColor' : r.color }} />
                    )}
                    {r.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Count row */}
          <div className="flex items-center justify-between pb-2 border-b dark:border-[#333333] border-[#E9E9DE]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02]">
              ● {filteredStates.length} {filteredStates.length === 1 ? 'LOCATION' : 'LOCATIONS'}
              {activeRegion !== 'all' ? ` — ${activeLabel.toUpperCase()}` : ' — PAN-INDIA PRESENCE'}
            </span>
            <span className="hidden sm:inline text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest">
              {ALL_STATES.length} States & UTs Covered
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStates.map((st, i) => {
              const meta = regionMeta(st.region);
              const isPopular = POPULAR.has(st.name);
              return (
                <ScrollReveal key={st.id} direction="up" delay={Math.min(i * 20, 300)}>
                  <div className="group relative flex items-center gap-3 p-3.5 border dark:bg-[#0E0E0E] dark:border-[#333333] bg-white border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden h-full">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${meta.color}14, transparent 70%)` }}
                    />

                    <img
                      src={imageSrcFor(st.name)}
                      alt={st.name}
                      className="relative w-11 h-11 shrink-0 object-cover"
                      loading="lazy"
                    />

                    <div className="relative min-w-0 flex-1 space-y-1">
                      <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest" style={{ color: meta.color }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: meta.color }} />
                        {meta.label}
                      </span>
                      <span className="block text-sm font-bold uppercase leading-snug dark:text-white text-[#0E0E0E] truncate">
                        {st.name}
                      </span>
                      {isPopular && (
                        <span className="inline-block text-[8.5px] font-mono font-bold uppercase tracking-widest text-[#EAB308]">
                          ★ Popular
                        </span>
                      )}
                    </div>

                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 dark:text-white text-[#0E0E0E]" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>


        {/* 3. PROMINENT CHECK AVAILABILITY BUTTON */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-8 sm:p-10 bg-black text-white border border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest font-bold block">
                ✦ PAN-INDIA RESERVATIONS & EVENT CONCIERGE ✦
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white">
                Looking for Stays or Event Venues Across India?
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A0A0] font-light">
                Explore our celebrations and submit a structured inquiry to check venue dates and pricing.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/celebrations#inquiry"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-widest transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
              >
                <span>CHECK AVAILABILITY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
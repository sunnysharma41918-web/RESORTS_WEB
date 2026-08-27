import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Utensils,
  Waves,
  HeartHandshake,
  Calendar,
  Smile,
  ShieldCheck,
  Phone
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import { getWhatsAppBookingUrl } from '../../../data/contact';

const amenitiesList = [
  {
    id: '01',
    title: 'Luxury Swimming Pools',
    category: 'LEISURE',
    desc: 'Temperature-controlled swimming pools, sunken sun loungers, and poolside refreshments across our premier properties.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=75',
  },
  {
    id: '02',
    title: 'Multi-Cuisine Fine Dining & Bar',
    category: 'GASTRONOMY',
    desc: 'Gourmet master chefs crafting authentic Indian regional delicacies, international buffets, and private candlelit dinners.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=75',
  },
  {
    id: '03',
    title: 'Grand Banquets & Wedding Lawns',
    category: 'CELEBRATIONS',
    desc: 'Spacious pillarless indoor banquet halls and lush manicured lawns managed by expert wedding and event planners.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=75',
  },
  {
    id: '04',
    title: '24/7 Dedicated Concierge & Help Desk',
    category: 'HOSPITALITY',
    desc: 'Round-the-clock guest support, airport transfers, customized sightseeing tours, and transparent booking services.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=75',
  },
  {
    id: '05',
    title: 'Rejuvenating Spa & Wellness Therapies',
    category: 'WELLNESS',
    desc: 'Bespoke Ayurvedic body treatments, aromatherapy steam rooms, and modern fitness facilities for total rejuvenation.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=75',
  },
  {
    id: '06',
    title: 'Kids Play Zones & Family Recreation',
    category: 'RECREATION',
    desc: 'Dedicated indoor game arcades, outdoor activity arenas, and curated entertainment for guests of all ages.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=75',
  },
];

export default function AmenitiesSection() {
  const [activeAmenity, setActiveAmenity] = useState(amenitiesList[0]);

  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />

      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>04 — RESORT & HOTEL AMENITIES</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
                CURATED FOR <br />
                EFFORTLESS <br />
                COMFORT.
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 max-w-sm leading-relaxed">
              From lavish banquet lawns and multi-cuisine gastronomy to tranquil wellness pools, every amenity at Country Holidays Hotels & Resorts is designed to make your stay extraordinary.
            </p>
          </ScrollReveal>
        </div>

        {/* Asymmetrical Editorial Composition: List + Master Overlaid Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Interactive Amenities Telemetry Rail (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            {amenitiesList.map((item, idx) => {
              const isActive = item.id === activeAmenity.id;
              return (
                <ScrollReveal key={item.id} direction="up" delay={idx * 50}>
                  <div
                    onClick={() => setActiveAmenity(item)}
                    className={`p-5 sm:p-6 border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'dark:bg-[#0E0E0E] bg-white border-[#FF1F02] shadow-md ring-1 ring-[#FF1F02]/20'
                        : 'dark:bg-[#161616] bg-white/40 dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono font-bold tracking-widest ${isActive ? 'text-[#FF1F02]' : 'dark:text-white/40 text-[#0E0E0E]/40'}`}>
                          {item.id}
                        </span>
                        <h4 className={`text-base sm:text-lg font-bold uppercase tracking-tight ${isActive ? 'dark:text-white text-[#0E0E0E]' : 'dark:text-[#D0D0D0] text-[#0E0E0E]/80'}`}>
                          {item.title}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border ${isActive ? 'bg-[#FF1F02] text-white border-[#FF1F02]' : 'dark:bg-[#1C1C1C] bg-white dark:text-white/70 text-[#0E0E0E]/60 dark:border-[#333333] border-[#E9E9DE]'}`}>
                        {item.category}
                      </span>
                    </div>

                    {isActive && (
                      <p className="text-xs sm:text-sm dark:text-[#A0A0A0] text-[#0E0E0E]/75 font-light leading-relaxed pt-3 mt-3 border-t dark:border-[#333333] border-[#E9E9DE]">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column: Master Overlaid Visual Frame with Upper COMFORT Typography (6 Cols) */}
          <div className="lg:col-span-6 relative pt-10 sm:pt-14">
            {/* Monumental Upper Overlaid Text */}
            <div className="absolute top-0 left-0 z-30 pointer-events-none select-none">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-none text-art-trio block">
                COMFORT
              </span>
            </div>

            {/* Animated Red CHHR Stamp Overlapping Corner */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-40">
              <EditorialHeritageStamp size={100} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE HOSPITALITY • " />
            </div>

            <ScrollReveal direction="clip" delay={200}>
              <div
                className="relative rounded-none overflow-hidden aspect-[4/3] border dark:border-[#333333] border-[#E9E9DE] shadow-2xl group dark:bg-[#0E0E0E] bg-[#FAFDF2] z-10"
                data-cursor="VIEW"
              >
                <img
                  src={activeAmenity.image}
                  alt={activeAmenity.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                  <span className="tracking-widest uppercase">{activeAmenity.title}</span>
                  <span className="text-[#FF1F02] font-bold">● {activeAmenity.category}</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8 flex items-center justify-between">
              <a
                href={getWhatsAppBookingUrl(`Hello Country Holidays, I would like to know more about the amenity: ${activeAmenity.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FF1F02] hover:text-white dark:hover:text-white transition-colors"
              >
                <span>INQUIRE ABOUT AMENITIES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

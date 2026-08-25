import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Wine,
  Moon,
  Compass,
  TreePine,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

const amenitiesList = [
  {
    id: '01',
    title: 'Heated Geothermal Pool',
    category: 'WELLNESS',
    desc: '38°C mineral spring water cantilevered over the mountain ridge with panoramic cloud vistas.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '02',
    title: 'Subterranean Sommelier Cellar',
    category: 'GASTRONOMY',
    desc: '2,500 rare biodynamic vintages carved into underground valley stone with private tasting vaults.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '03',
    title: 'On-Site Helicopter Landing Zone',
    category: 'TRANSIT',
    desc: 'Private secure mountain helipad offering seamless direct air transfer from major international hubs.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '04',
    title: '24/7 Dedicated Estate Butler',
    category: 'HOSPITALITY',
    desc: 'Intuitive personal concierge anticipating hearth fires, mountain dawn teas, and bespoke itineraries.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '05',
    title: 'Stargazing Astro-Observatory',
    category: 'SANCTUARY',
    desc: 'Deep mountain acoustic isolation and zero light pollution for pristine celestial sky observation.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: '06',
    title: 'Organic Botanical Apiary & Farm',
    category: 'ESTATE',
    desc: '500-acre private conservation gardens harvesting wild mountain honey and heirloom produce at dawn.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=85',
  },
];

export default function AmenitiesSection() {
  const [activeAmenity, setActiveAmenity] = useState(amenitiesList[0]);

  return (
    <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />

      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>05 — ESTATE AMENITIES</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
                CURATED FOR <br />
                EFFORTLESS <br />
                LIVING.
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm font-light text-[#0E0E0E]/70 max-w-sm leading-relaxed">
              Every facility within our 500-acre high mountain sanctuary is designed to elevate silence, nourishment, and bespoke restorative comfort.
            </p>
          </ScrollReveal>
        </div>

        {/* Asymmetrical Editorial Composition: List + Master Overlaid Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Interactive Amenities Telemetry Rail (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {amenitiesList.map((item, idx) => {
              const isActive = item.id === activeAmenity.id;
              return (
                <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
                  <div
                    onClick={() => setActiveAmenity(item)}
                    className={`p-6 border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#0E0E0E] shadow-lg'
                        : 'bg-transparent border-[#E9E9DE] hover:border-[#0E0E0E]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono font-bold tracking-widest ${isActive ? 'text-[#FF1F02]' : 'text-[#0E0E0E]/40'}`}>
                          {item.id}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0E0E0E]">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#0E0E0E]/50 uppercase tracking-widest">
                        {item.category}
                      </span>
                    </div>

                    {isActive && (
                      <p className="text-xs sm:text-sm text-[#0E0E0E]/75 font-light leading-relaxed pt-3 mt-3 border-t border-[#E9E9DE]">
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
            {/* Monumental Upper Overlaid Text - Kept cleanly inside the display with rich artistic color */}
            <div className="absolute top-0 left-0 z-30 pointer-events-none select-none">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-none text-art-trio block">
                COMFORT
              </span>
            </div>

            {/* Animated Red CHTR Stamp Overlapping Corner */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-40">
              <EditorialHeritageStamp size={100} centerText="CHTR" year="EST 2026" />
            </div>

            <ScrollReveal direction="clip" delay={200}>
              <div
                className="relative rounded-none overflow-hidden aspect-[4/3] border border-[#E9E9DE] shadow-2xl group bg-[#FAFDF2] z-10"
                data-cursor="VIEW"
              >
                <img
                  src={activeAmenity.image}
                  alt={activeAmenity.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                  <span className="tracking-widest uppercase font-bold">{activeAmenity.title}</span>
                  <span className="text-[#FF1F02] font-bold">● {activeAmenity.category}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

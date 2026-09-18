import React from 'react';
import { Building2, Sparkles, Compass } from 'lucide-react';
import HotelCard from '../../features/hotels/components/HotelCard';
import FinalBookingCTA from '../../features/home/components/FinalBookingCTA';
import { useHotels } from '../../features/hotels/hooks/useHotels';
import Loader from '../../components/common/Loader';
import ScrollReveal from '../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';

export default function Hotels() {
  const { hotels, loading } = useHotels();

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] min-h-screen transition-colors duration-500 font-sans">
      {/* 1. HERO BANNER IN ROYAL PALATIAL THEME WITH FULL DARK & LIGHT MODE */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 overflow-hidden select-none">
        
        {/* Indian Royal Paisley Damask Background */}
        <IndianArtBackground variant="paisley" opacity="opacity-[0.055] dark:opacity-[0.08]" />

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2560&q=85"
            alt="Boutique Heritage Hotels"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.95] opacity-25 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#8F6B2E] dark:text-[#D4AF37] bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 px-4 py-1 rounded-full border border-[#8F6B2E]/30 dark:border-[#8F6B2E]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
              <span>THE ROYAL PALATIAL HOTEL COLLECTION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#2A1F17] dark:text-[#F3EEE0] uppercase leading-[1.05]">
              HERITAGE PALACES & <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">
                BOUTIQUE TOWERS
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-2xl mx-auto leading-relaxed">
              Timeless architectural heritage, discrete palatial luxury, and curated royal suites across prime Indian destinations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SECTION HEADER & HOTELS GRID */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal direction="up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
                CURATED HOTEL RESIDENCIES
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <RoyalOrnamentDivider color="#8F6B2E" />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-xs sm:text-sm md:text-[15px] text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed font-serif font-light max-w-2xl mx-auto">
                Explore handpicked boutique properties featuring private dining, courtyard salons, and 24/7 dedicated royal butler care.
              </p>
            </ScrollReveal>
          </div>

          {/* Hotels Grid */}
          {loading ? (
            <div className="py-24 flex justify-center">
              <Loader text="Curating palatial hotels..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {hotels && hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <HotelCard key={hotel.id || hotel._id || hotel.slug} hotel={hotel} />
                ))
              ) : (
                <div className="col-span-full text-center py-16 text-[#6E5D4F] dark:text-[#B8A89A] font-serif">
                  <p>Our concierge team is updating the royal hotel directory.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Jaali Border */}
        <div className="mt-20">
          <IndianJaaliBorder />
        </div>
      </section>

      {/* 3. FINAL BOOKING CTA */}
      <FinalBookingCTA />
    </div>
  );
}

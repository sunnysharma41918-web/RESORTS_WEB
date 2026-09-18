import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';

export default function ResortStory({
  videoSrc = '/videos/company-promo.mp4',
  fallbackVideoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-resort-with-swimming-pool-42562-large.mp4',
  videoPoster = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
}) {
  const [currentSrc, setCurrentSrc] = useState(videoSrc);
  const videoRef = useRef(null);

  return (
    <section className="relative bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-500 font-sans border-t border-[#B38738]/20 dark:border-[#B38738]/30">
      
      {/* Indian Royal Palace Art & Jaali Lattice */}
      <IndianArtBackground variant="full" opacity="opacity-[0.045] dark:opacity-[0.065]" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Royal Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/30 text-[#B38738] dark:text-[#E8C97E] text-[11px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.22em] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
              <span>THE HERITAGE OF COUNTRY HOLIDAYS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em] leading-tight">
              Crafting Living Architectural Sanctuaries Across India
            </h2>
          </ScrollReveal>

          {/* Royal Ornamental Spearhead Divider */}
          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans font-light max-w-2xl mx-auto">
              Founded on the belief that true luxury is not excess, but stillness, proportion, and immersive natural beauty. Experience world-class hospitality tailored to your rhythm.
            </p>
          </ScrollReveal>
        </div>

        {/* Content Composition: Left (About the Company) & Right (Experience Film) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: About the Company (Exact Reference Layout) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={200}>
              <div className="space-y-6">
                
                {/* Eyebrow & Title */}
                <div className="space-y-2">
                  <span className="text-[12px] sm:text-[13px] font-cinzel uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] font-bold block">
                    ABOUT OUR COMPANY
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em] leading-tight">
                    Country Holidays
                  </h3>
                </div>

                {/* Company Story Description */}
                <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans font-light">
                  Country Holidays Hotels & Resorts was created with a vision to make luxury holidays comfortable, memorable, and accessible. We curate living architectural sanctuaries and bespoke holiday memberships across India.
                </p>

                {/* Highlight Table / Card (Company Metrics) */}
                <div className="rounded-2xl border border-[#B38738]/30 dark:border-[#B38738]/40 bg-[#F8F4EC]/95 dark:bg-[#140F0A]/95 backdrop-blur-sm overflow-hidden text-center shadow-sm">
                  {/* Header Row */}
                  <div className="grid grid-cols-3 py-3 px-4 text-xs sm:text-sm font-sans font-semibold text-[#635142] dark:text-[#BFB0A2] border-b border-[#B38738]/25 dark:border-[#B38738]/35">
                    <div>Hospitality</div>
                    <div>Destinations</div>
                    <div>Happy Guests</div>
                  </div>
                  {/* Value Row */}
                  <div className="grid grid-cols-3 py-3.5 px-4 items-center">
                    <div className="text-xs sm:text-sm font-bold text-[#B38738] dark:text-[#E8C97E] font-cinzel">
                      5-Star Rated
                    </div>
                    <div className="text-sm sm:text-base font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6]">
                      30+ Pan-India
                    </div>
                    <div className="text-sm sm:text-base font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6]">
                      50,000+
                    </div>
                  </div>
                </div>

                {/* Company Highlights Checklist (2 columns) */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs sm:text-[13px] text-[#4A3E36] dark:text-[#D1C7BD] font-sans">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 stroke-[2]" />
                    <span>Trusted Hospitality Brand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 stroke-[2]" />
                    <span>24/7 Dedicated Concierge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 stroke-[2]" />
                    <span>Holiday Memberships</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 stroke-[2]" />
                    <span>Bespoke Travel Circuits</span>
                  </div>
                </div>

                {/* Bottom Action Buttons (Matching Reference) */}
                <div className="pt-2 flex items-center gap-5 sm:gap-6">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-cinzel font-bold text-xs uppercase tracking-widest transition-all shadow-[0_4px_16px_rgba(179,135,56,0.3)] cursor-pointer active:scale-95"
                  >
                    READ OUR STORY
                  </Link>

                  <Link
                    to="/resorts"
                    className="text-xs sm:text-[13px] font-cinzel uppercase tracking-[0.2em] text-[#B38738] dark:text-[#E8C97E] hover:underline font-bold inline-flex items-center gap-1.5 transition-colors"
                  >
                    EXPLORE DESTINATIONS →
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Promotional Video / Suite Showcase */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal direction="clip" delay={250}>
              <div className="relative rounded-2xl sm:rounded-3xl border-2 border-[#B38738]/50 p-2 sm:p-2.5 bg-gradient-to-br from-[#FAF6ED]/80 via-white/50 to-[#FAF6ED]/80 dark:from-[#1A130D]/80 dark:via-[#140F0A] dark:to-[#0D0A07]/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] group overflow-hidden">
                
                {/* Media Container - Pure Clean Video Only */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] bg-[#0D0A07] border border-[#B38738]/30">
                  <video
                    ref={videoRef}
                    src={currentSrc}
                    poster={videoPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onError={() => {
                      if (currentSrc !== fallbackVideoSrc) {
                        setCurrentSrc(fallbackVideoSrc);
                      }
                    }}
                  />
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>

      {/* Bottom Jaali Border */}
      <div className="absolute bottom-0 left-0 right-0">
        <IndianJaaliBorder />
      </div>
    </section>
  );
}

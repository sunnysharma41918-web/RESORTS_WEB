import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Phone,
  Crown,
  HeartHandshake,
  Check
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';
import { getWhatsAppBookingUrl } from '../../data/contact';

// Growth Stats Counter Ticker with Real Graphics
const GROWTH_STATS = [
  { 
    value: '30+', 
    label: 'Royal Destinations', 
    detail: 'Across North, South & Coastal India',
    graphic: '/images/metrics/metric_destinations.jpg',
    alt: 'Royal Heritage Palaces & Resorts'
  },
  { 
    value: '50K+', 
    label: 'Delighted Families', 
    detail: 'Creating timeless vacation memories',
    graphic: '/images/metrics/metric_families.jpg',
    alt: 'Happy Families on Royal Vacation'
  },
  { 
    value: '100%', 
    label: 'Bespoke Itineraries', 
    detail: 'Handcrafted for every traveler',
    graphic: '/images/metrics/metric_itineraries.jpg',
    alt: 'Bespoke Travel Compass & Route Map'
  },
  { 
    value: '4.9★', 
    label: 'Guest Rating', 
    detail: 'From over 12,000+ verified reviews',
    graphic: '/images/metrics/metric_rating.jpg',
    alt: '5-Star Excellence Award Trophy'
  },
];

export default function About() {

  return (
    <div className="w-full bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] overflow-hidden font-serif transition-colors duration-500">

      {/* ─────────────────────────────────────────────────────────────
          1. HERO BANNER: EDITORIAL PALATIAL INTRODUCTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex flex-col justify-center py-24 sm:py-32 px-4 sm:px-10 lg:px-16 border-b border-[#B38738]/25 dark:border-[#B38738]/35 overflow-hidden select-none">
        
        {/* Indian Royal Palace Art & Jaali Lattice */}
        <IndianArtBackground variant="full" opacity="opacity-[0.05] dark:opacity-[0.07]" />

        {/* Ambient Vista Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80"
            alt="Country Holidays Palace Architecture"
            className="w-full h-full object-cover filter brightness-[0.88] opacity-25 dark:opacity-15 scale-105 transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/95 via-[#FAF6F0]/85 to-[#FAF6F0] dark:from-[#14110E]/95 dark:via-[#14110E]/85 dark:to-[#14110E]" />
          
          {/* Subtle Grid / Architectural Watermark */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#8F6B2E_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 my-auto w-full">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-cinzel font-semibold uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] px-4 py-1.5 bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/35 dark:border-[#B38738]/45 rounded-full shadow-sm">
              <Crown className="w-3.5 h-3.5" />
              <span>THE STORY OF COUNTRY HOLIDAYS HOTELS & RESORTS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-marcellus font-bold uppercase tracking-[0.02em] leading-[1.08] text-[#241A12] dark:text-[#F5EFE6]">
              WHERE MEMORIES BEGIN & <br />
              <span className="text-royal-gold">COMFORT LIVES.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-base md:text-lg font-sans font-light text-[#635142] dark:text-[#BFB0A2] max-w-2xl mx-auto leading-relaxed">
              Founded on the belief that true luxury is not excess, but stillness, royal proportion, and warm Indian hospitality. Explore our story, our journey of growth, and our vision for living architectural sanctuaries across India.
            </p>
          </ScrollReveal>

          {/* 4-Metric Key Performance Stat Bar with Compact Graphics */}
          <ScrollReveal direction="up" delay={250}>
            <div className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {GROWTH_STATS.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-3.5 sm:p-4 rounded-xl bg-[#F8F4EC]/95 dark:bg-[#140F0A]/95 border border-[#B38738]/30 dark:border-[#C59B4E]/35 hover:border-[#C59B4E] transition-all backdrop-blur-sm text-center shadow-[0_4px_20px_rgba(179,135,56,0.08)] hover:shadow-[0_8px_30px_rgba(179,135,56,0.18)] flex flex-col items-center justify-between space-y-2.5"
                >
                  {/* Compact 3D Graphic Image */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-[#B38738]/40 shadow-sm bg-black/5 dark:bg-black/40 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <img 
                      src={stat.graphic} 
                      alt={stat.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-0.5 w-full">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#B38738] via-[#E8C97E] to-[#C59B4E] bg-clip-text text-transparent block font-serif tracking-tight leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[#241A12] dark:text-[#F5EFE6] block">
                      {stat.label}
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-[11px] font-sans text-[#635142] dark:text-[#BFB0A2] block font-light leading-snug pt-1.5 border-t border-[#B38738]/20 dark:border-[#B38738]/30 w-full">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. SECTION 01: THE ROYAL ART OF WELCOMING (PADHARO MHARE DESH)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-10 lg:px-16 border-b border-[#B38738]/25 dark:border-[#B38738]/35 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#B38738]/25 dark:border-[#B38738]/35">
            <div>
              <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] font-bold block mb-2">
                ✦ 01 — THE ROYAL ART OF WELCOMING ✦
              </span>
              <h2 className="text-3xl sm:text-5xl font-marcellus font-bold uppercase tracking-[0.02em] text-[#241A12] dark:text-[#F5EFE6]">
                PADHARO MHARE DESH
              </h2>
              <RoyalOrnamentDivider color="#B38738" className="justify-start my-2" />
            </div>
            <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] font-sans font-light max-w-md leading-relaxed">
              "Atithi Devo Bhava" — The guest is divine. Heartfelt Indian hospitality, time-honored welcome rituals, and personalized 24/7 concierge care across every sanctuary.
            </p>
          </div>

          {/* ✦ Dedicated Royal Welcoming Showcase (Atithi Devo Bhava) ✦ */}
          <ScrollReveal direction="up" delay={150}>
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#B38738]/40 bg-[#F8F4EC] dark:bg-[#140F0A] shadow-[0_10px_40px_rgba(179,135,56,0.18)]">
              
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B38738]/15 dark:bg-[#E8C97E]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Welcoming Mascot Graphic */}
                <div className="lg:col-span-5 relative p-6 sm:p-8 flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B38738]/50 group bg-gradient-to-b from-[#F7EFE1] via-[#EFE5D0] to-[#E3D3B5] dark:from-[#241A12] dark:via-[#1A130D] dark:to-[#140F0A] flex flex-col items-center justify-center p-6">
                    
                    {/* Radial Golden Halo Behind Mascot */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#B38738]/30 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Top Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 dark:bg-black/85 backdrop-blur-md text-[#E8C97E] border border-[#B38738]/60 text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-widest shadow-md">
                        <Crown className="w-3.5 h-3.5 text-[#E8C97E]" />
                        <span>PADHARO MHARE DESH</span>
                      </span>
                    </div>

                    {/* The Mascot Image */}
                    <img
                      src="/images/padharo_mhare_desh.png"
                      alt="Traditional Royal Indian Welcoming Concierge Mascot"
                      loading="lazy"
                      className="w-full h-full object-contain max-h-[340px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-500 z-10 pt-4 pb-6"
                    />

                    {/* Bottom Floating Caption on Card */}
                    <div className="absolute bottom-4 left-4 right-4 text-center space-y-0.5 z-10 bg-black/70 dark:bg-black/85 backdrop-blur-md py-1.5 px-3 rounded-xl border border-[#B38738]/40 shadow-md">
                      <span className="text-[11px] font-cinzel font-bold uppercase text-[#E8C97E] tracking-widest block">
                        ✦ ATITHI DEVO BHAVA ✦
                      </span>
                      <p className="text-[11px] font-cormorant italic text-white/95">
                        "The Guest is Akin to the Divine"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Welcoming Ethos & Rituals */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:pr-12 space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-[11px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] block">
                      ✦ THE ROYAL ART OF WELCOMING ✦
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-marcellus font-normal text-[#241A12] dark:text-[#F5EFE6] leading-tight">
                      Warmth, Reverence & Personal Care from the First Step
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans font-light">
                    Every arrival at Country Holidays Hotels & Resorts is orchestrated as a heartfelt royal homecoming. Rather than a routine check-in desk, you are welcomed with folded hands, fragrant marigold garlands, traditional cooling sandalwood tilak, and refreshing regional welcome elixirs.
                  </p>

                  {/* 4 Welcoming Ritual Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans pt-2">
                    <div className="p-3.5 rounded-xl bg-[#F8F4EC] dark:bg-[#1A130D] border border-[#B38738]/30 shadow-sm">
                      <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#B38738] dark:text-[#E8C97E] block">
                        Traditional Aarti & Garlanding
                      </span>
                      <span className="text-[11px] text-[#635142] dark:text-[#BFB0A2] block mt-1">
                        Time-honored royal Indian welcome rituals upon arrival.
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8F4EC] dark:bg-[#1A130D] border border-[#B38738]/30 shadow-sm">
                      <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#B38738] dark:text-[#E8C97E] block">
                        24/7 Dedicated Butler Desk
                      </span>
                      <span className="text-[11px] text-[#635142] dark:text-[#BFB0A2] block mt-1">
                        Personalized assistance for dining, excursions & leisure.
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8F4EC] dark:bg-[#1A130D] border border-[#B38738]/30 shadow-sm">
                      <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#B38738] dark:text-[#E8C97E] block">
                        Handcrafted Welcome Elixirs
                      </span>
                      <span className="text-[11px] text-[#635142] dark:text-[#BFB0A2] block mt-1">
                        Authentic local herbal refreshments and organic infusions.
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8F4EC] dark:bg-[#1A130D] border border-[#B38738]/30 shadow-sm">
                      <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#B38738] dark:text-[#E8C97E] block">
                        Bespoke Daily Itineraries
                      </span>
                      <span className="text-[11px] text-[#635142] dark:text-[#BFB0A2] block mt-1">
                        Tailored sightseeing, temple circuits & private banquets.
                      </span>
                    </div>
                  </div>

                  {/* Quote Banner */}
                  <div className="p-4 rounded-xl border-l-2 border-[#B38738] bg-[#B38738]/10 dark:bg-[#B38738]/15">
                    <p className="text-sm sm:text-base font-cormorant italic text-[#241A12] dark:text-[#F5EFE6]">
                      "In our sanctuaries, hospitality is never an afterthought—it is our timeless cultural heritage and greatest honor."
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Visual Graphic Banner */}
          <ScrollReveal direction="scale">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 border border-[#B38738]/35 bg-gradient-to-r from-[#B38738]/15 via-[#B38738]/5 to-[#B38738]/15 dark:from-[#B38738]/25 dark:via-[#140F0A] dark:to-[#B38738]/20 backdrop-blur-sm shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B38738] dark:text-[#E8C97E] font-bold block">
                    ✦ OUR SUSTAINABLE HOSPITALITY PLEDGE ✦
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-normal text-[#241A12] dark:text-[#F5EFE6]">
                    Growing With Purpose & Local Empowerment
                  </h4>
                  <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] font-light leading-relaxed">
                    Over 70% of our on-ground team members are hired and trained from surrounding heritage villages, fostering local craft, sustainable organic dining, and authentic culinary heritage.
                  </p>
                </div>

                <div className="md:col-span-4 flex md:justify-end">
                  <Link
                    to="/resorts"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(179,135,56,0.3)] cursor-pointer"
                  >
                    <span>View Our Destinations</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. FINAL CTA: INVITATION TO EXPERIENCE
      ───────────────────────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-10 lg:px-16 overflow-hidden select-none bg-gradient-to-b from-transparent via-[#B38738]/5 to-[#B38738]/10">
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">

          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="COUNTRY HOLIDAYS • HOTELS & RESORTS • " />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-cinzel font-semibold uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] bg-[#B38738]/15 dark:bg-[#B38738]/25 px-4 py-1.5 rounded-full border border-[#B38738]/40 shadow-sm">
              <Crown className="w-3.5 h-3.5" />
              <span>02 — INVITATION TO LUXURY</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-marcellus font-bold uppercase tracking-[0.02em] leading-[0.98] text-[#241A12] dark:text-[#F5EFE6]">
              EXPERIENCE <br />
              <span className="text-royal-gold">THE ROYAL DIFFERENCE.</span>
            </h2>
            <RoyalOrnamentDivider color="#B38738" className="my-4" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-base md:text-lg font-sans font-light text-[#635142] dark:text-[#BFB0A2] max-w-xl mx-auto leading-relaxed">
              Step into a world of comfort, heartfelt hospitality, and unforgettable memories. Book your stay or plan your next celebration with our personal concierge today.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <a
                  href={getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to know more about your bespoke memberships and stays.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-[0_6px_25px_rgba(179,135,56,0.35)] group cursor-pointer"
                >
                  <span>CONNECT ON WHATSAPP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-[#B38738]/50 hover:border-[#B38738] text-[#241A12] dark:text-[#F5EFE6] font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer bg-white/60 dark:bg-[#140F0A]/80 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E]" />
                  <span>CONTACT CONCIERGE</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[#B38738] dark:text-[#E8C97E] uppercase tracking-widest font-bold">
              <span>✦ WARM HOSPITALITY</span>
              <span>✦ 30+ ROYAL RETREATS</span>
              <span>✦ 24/7 DEDICATED CARE</span>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom Jaali Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <IndianJaaliBorder />
        </div>
      </section>

    </div>
  );
}

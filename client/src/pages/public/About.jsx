import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Heart, Sparkles, Star, Users, MapPin, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { getWhatsAppBookingUrl } from '../../data/contact';

const pillars = [
  {
    number: '01',
    title: 'WARM & INTENTIONAL HOSPITALITY',
    desc: 'A heartfelt guest-first philosophy with 24/7 dedicated concierge teams ensuring every guest feels truly valued and at home.',
    accent: '#FF1F02',
  },
  {
    number: '02',
    title: 'CURATED LUXURY STAYS',
    desc: 'From serene coastal retreats to prime city hotels, each property is thoughtfully selected for premium comfort, cleanliness, and peace.',
    accent: '#EAB308',
  },
  {
    number: '03',
    title: 'MEMORABLE EXPERIENCES',
    desc: 'Expertly managed destination weddings, festive celebrations, and authentic local excursions crafted by specialist event advisors.',
    accent: '#16A34A',
  },
  {
    number: '04',
    title: 'UNWAVERING QUALITY & TRUST',
    desc: 'Transparent booking, attentive staff, and continuous dedication to making every family vacation and executive retreat effortless.',
    accent: '#FF1F02',
  },
];

const milestones = [
  { year: '2020', title: 'The Founding Vision', desc: 'Conceived with a clear mission: to make luxury holiday stays accessible, transparent, and warmly hospitable.' },
  { year: '2022', title: 'Curated Destinations', desc: 'Expanded signature stays across premier leisure gateways, coastal havens, and heritage properties.' },
  { year: '2024', title: 'Banquets & Event Desks', desc: 'Introduced dedicated event advisory desks for destination weddings, corporate summits, and grand galas.' },
  { year: '2026', title: 'Country Holidays Milestone', desc: 'Delivering exceptional holiday experiences to thousands of delighted families across Chennai, Noida, Mumbai, and Delhi.' },
];

export default function About() {
  return (
    <div className="w-full dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] overflow-hidden font-manrope transition-colors duration-300">

      {/* 1. HERO SECTION: CINEMATIC MONUMENTAL BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden select-none">
        {/* Background Subtle Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=75"
            alt="Country Holidays Hotels & Resorts Horizon"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>ABOUT COUNTRY HOLIDAYS HOTELS & RESORTS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              WHERE MEMORIES <br />
              BEGIN & <br />
              <span className="text-art-trio">COMFORT LIVES.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed">
              Country Holidays Hotels & Resorts was created with a simple vision — to make every holiday comfortable, memorable, and truly special.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Editorial Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● COUNTRY HOLIDAYS HOTELS & RESORTS (CHHR)</span>
          <span>CHENNAI • NOIDA • MUMBAI • DELHI</span>
          <span>EST. 2026</span>
        </div>
      </section>


      {/* 2. SECTION 01: OUR VISION (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          <ScrollReveal direction="up">
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>01 — ABOUT OUR HOSPITALITY</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Typography Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
                  YOUR PERFECT <br />
                  GETAWAY <br />
                  BEGINS HERE.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <p className="text-base sm:text-lg font-normal dark:text-[#D0D0D0] text-[#0E0E0E]/85 leading-relaxed max-w-xl">
                  We are committed to delivering warm hospitality, comfortable stays, quality services, and experiences that make every visit special.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="text-sm sm:text-base font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70 leading-relaxed max-w-xl">
                  Our team works with passion to ensure that every guest feels valued, relaxed, and truly at home across all our signature hotels, resorts, and vacation suites.
                </p>
              </ScrollReveal>

              {/* Offset Material Plate */}
              <ScrollReveal direction="scale" delay={350}>
                <div className="pt-4 max-w-sm">
                  <div className="p-6 dark:bg-[#0E0E0E] dark:border-[#333333] bg-white border border-[#E9E9DE] shadow-md space-y-2 transition-colors">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block">
                      OUR CORE COMMITMENT
                    </span>
                    <h4 className="text-base font-bold uppercase dark:text-white text-[#0E0E0E]">
                      Comfort, Excellence & Warmth
                    </h4>
                    <p className="text-xs dark:text-[#A0A0A0] text-[#0E0E0E]/70 font-light">
                      Dedicated 24/7 guest support, personalized itineraries, and authentic local experiences crafted for families, couples, and corporate travelers.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Master Image with Upper Overlapping SANCTUARY Typography (5 Cols) */}
            <div className="lg:col-span-5 relative pt-10 sm:pt-14">
              <ScrollReveal direction="scale">
                <div className="aspect-[4/5] bg-black overflow-hidden relative shadow-2xl border dark:border-[#333333] border-[#E9E9DE]">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=75"
                    alt="Luxury Hospitality Experience"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block font-bold">
                      ✦ CHHR SIGNATURE HOSPITALITY ✦
                    </span>
                    <p className="text-xs font-light text-white/90">
                      Tailor-made vacation memories across India's most scenic destinations.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>


      {/* 3. SECTION 02: GUIDING PILLARS */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 border-t border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>02 — PHILOSOPHY & VALUES</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
                  GUIDED BY <br />
                  PURPOSE.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/70 max-w-sm leading-relaxed">
                Four core commitments that define our hospitality, our service standards, and every guest stay.
              </p>
            </ScrollReveal>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.number} direction="up" delay={idx * 80}>
                <div className="p-8 dark:bg-[#0E0E0E] dark:border-[#333333] bg-white border border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-300 h-full flex flex-col justify-between group shadow-sm">
                  <div className="space-y-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FF1F02]">
                      ● {pillar.number}
                    </span>
                    <h3 className="text-xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors leading-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm dark:text-[#B0B0B0] text-[#0E0E0E]/70 font-light leading-relaxed pt-8 border-t dark:border-[#333333]/60 border-[#E9E9DE] mt-8">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* 4. SECTION 03: CORPORATE & REGIONAL OFFICES */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-t border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b dark:border-[#2A2A2A] border-[#E9E9DE]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block mb-2">
                ● 03 — REGIONAL OFFICES & HUBS
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                WHERE WE RESIDE
              </h2>
            </div>
            <p className="text-xs sm:text-sm dark:text-[#A0A0A0] text-[#0E0E0E]/70 font-light max-w-md">
              Our network of corporate headquarters and regional guest advisory offices across India's key metropolitan centers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: 'Chennai',
                type: 'Main Corporate Headquarters',
                isMain: true,
                desc: 'Principal Management, Central Operations & Nationwide Concierge Headquarters.',
                image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=75',
                address: 'Anna Salai / OMR Business Corridor, Chennai, Tamil Nadu',
              },
              {
                city: 'Noida',
                type: 'Northern Regional Hub',
                isMain: false,
                desc: 'North Zone Operations, Partner Relations & Regional Concierge Desk.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=75',
                address: 'Commercial Sector Hub, Sector 62, Noida, Uttar Pradesh',
              },
              {
                city: 'Delhi',
                type: 'Capital Regional Office',
                isMain: false,
                desc: 'Executive Guest Relations, Event Advisory & Corporate Desk.',
                image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=75',
                address: 'Aerocity / CP Business District, New Delhi',
              },
              {
                city: 'Mumbai',
                type: 'Western Regional Office',
                isMain: false,
                desc: 'West Coast Hospitality Services, Banquet Planning & Media Desk.',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75',
                address: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra',
              },
            ].map((office, idx) => (
              <ScrollReveal key={office.city} direction="up" delay={idx * 100}>
                <div className={`group relative dark:bg-[#0E0E0E] bg-white border ${office.isMain ? 'border-[#FF1F02]/80 ring-1 ring-[#FF1F02]/40' : 'dark:border-[#333333] border-[#E9E9DE]'} hover:border-[#FF1F02] transition-all overflow-hidden flex flex-col justify-between h-full shadow-sm`}>
                  {/* Office Glass / Corporate Interior Photo */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-black">
                    <img
                      src={office.image}
                      alt={`${office.city} Office`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className={`absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 backdrop-blur-sm border ${office.isMain ? 'bg-[#FF1F02] text-white border-[#FF1F02] font-black' : 'bg-black/80 text-[#EAB308] border-[#333333] font-bold'}`}>
                      {office.isMain ? 'MAIN HQ' : `HUB 0${idx + 1}`}
                    </span>
                  </div>

                  {/* Office Info Body */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${office.isMain ? 'text-[#FF1F02]' : 'text-[#EAB308]'}`}>
                        {office.type}
                      </span>
                      <h4 className="text-xl font-bold uppercase dark:text-white text-[#0E0E0E] tracking-tight">
                        {office.city}
                      </h4>
                      <p className="text-xs dark:text-[#A0A0A0] text-[#0E0E0E]/70 font-light leading-relaxed">
                        {office.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t dark:border-[#2A2A2A] border-[#E9E9DE] space-y-1 text-xs font-mono dark:text-[#888888] text-[#0E0E0E]/60">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FF1F02] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{office.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* 5. SECTION 04: ARCHITECTURAL CHRONOLOGY TIMELINE */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>04 — OUR JOURNEY</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                  THE JOURNEY <br />
                  OF CHHR.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/70 max-w-sm leading-relaxed">
                Years of building authentic hospitality, trusted service standards, and memorable vacations.
              </p>
            </ScrollReveal>
          </div>

          {/* Timeline Rail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <ScrollReveal key={m.year} direction="up" delay={idx * 100}>
                <div className="space-y-4 border-t-2 dark:border-white border-[#0E0E0E] pt-6 group">
                  <span className="text-4xl sm:text-5xl font-extrabold dark:text-white text-[#0E0E0E] font-mono block group-hover:text-[#FF1F02] transition-colors">
                    {m.year}
                  </span>
                  <h4 className="text-base font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm dark:text-[#A0A0A0] text-[#0E0E0E]/70 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* 6. FINAL CTA: INVITATION TO EXPERIENCE (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300 border-t dark:border-[#333333] border-[#E9E9DE]">
        {/* Background Photography Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=75"
            alt="Country Holidays Hotels & Resorts Horizon"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black dark:via-black/80 dark:to-black/60 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">

          {/* Animated Red CHHR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE ESTATE • " year="EST 2026" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>05 — INVITATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
              EXPERIENCE <br />
              THE DIFFERENCE.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Step into a world of comfort, warm hospitality, and unforgettable memories. Book your stay or plan your next celebration with our concierge today.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <a
                  href={getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to plan our holiday stay.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
                >
                  <span>BOOK YOUR STAY</span>
                  <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#FF1F02]" />
                  <span>DIRECT INQUIRIES</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
              <span>● WARM HOSPITALITY</span>
              <span>● CURATED HOLIDAY RETREATS</span>
              <span>● 24/7 DEDICATED CARE</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}

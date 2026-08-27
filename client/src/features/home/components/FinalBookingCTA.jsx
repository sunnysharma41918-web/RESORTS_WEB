import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, MapPin, Star, Clock3 } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import { CONTACT_INFO, getWhatsAppBookingUrl } from '../../../data/contact';

const STATS = [
  { icon: MapPin, label: '36 States & UTs', sub: 'Pan-India Presence' },
  { icon: Star, label: '4.9 / 5 Rating', sub: 'Delighted Guests' },
  { icon: Clock3, label: '24/7 Concierge', sub: 'Immediate Response' },
];

const MARQUEE_ITEMS = [
  'PAN-INDIA ESCAPES',
  'HERITAGE STAYS',
  'DESTINATION WEDDINGS',
  'CORPORATE OFFSITES',
  'PRIVATE CELEBRATIONS',
  'MOUNTAIN RETREATS',
];

export default function FinalBookingCTA() {
  const whatsappUrl = getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to plan our holiday stay.');

  return (
    <section className="relative bg-[#0E0E0E] text-white overflow-hidden font-manrope">
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marqueeScroll 28s linear infinite;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .float-slow { animation: none; }
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-[92vh]">

        {/* LEFT — Message & Call to Actions */}
        <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-16 order-2 lg:order-1">
          <EditorialBackgroundElements variant="dark" position="bottom-left" />

          <div className="relative z-10 max-w-xl space-y-8">

            <ScrollReveal direction="scale">
              <EditorialHeritageStamp size={88} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " />
            </ScrollReveal>

            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>06 — INVITATION</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.92] text-white">
                YOUR NEXT
                <br />
                ESCAPE
                <br />
                <span className="text-[#FF1F02]">STARTS HERE.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-base sm:text-lg font-light text-[#D0D0D0] leading-relaxed">
                Leave the ordinary behind. Reserve your private pavilion high above the clouds and experience the art of slow living across our Pan-India destinations.
              </p>
            </ScrollReveal>

            {/* UPGRADED CTA BUTTONS */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  {/* Primary CTA - WhatsApp Booking */}
                  <MagneticButton className="w-full sm:w-auto">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-xl shadow-[#FF1F02]/20 group cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>RESERVE ON WHATSAPP</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </MagneticButton>

                  {/* Secondary CTA - Explore Destinations */}
                  <MagneticButton className="w-full sm:w-auto">
                    <Link
                      to="/resorts"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-white/10 hover:bg-white text-white hover:text-[#0E0E0E] border border-white/20 hover:border-white font-bold text-xs uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer"
                    >
                      <span>EXPLORE RESORTS</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </MagneticButton>
                </div>

                {/* Direct Call & Offers Links */}
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-[#FF1F02] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF1F02]" />
                    <span>Call Concierge: {CONTACT_INFO.phone}</span>
                  </a>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <Link
                    to="/offers"
                    className="text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-[#FF1F02] transition-colors"
                  >
                    View Exclusive Packages & Offers
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Trust stats row */}
            <ScrollReveal direction="up" delay={400}>
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <s.icon className="w-4 h-4 text-[#FF1F02]" />
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">{s.label}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wide text-white/40">{s.sub}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* RIGHT — Floating Photo Collage */}
        <div className="relative min-h-[420px] lg:min-h-0 order-1 lg:order-2 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=75"
            alt="Sunrise Mountain Peak Horizon"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/10 to-transparent lg:bg-gradient-to-r lg:from-[#0E0E0E] lg:via-[#0E0E0E]/0 lg:to-transparent" />

          {/* Secondary floating image card */}
          <ScrollReveal direction="scale" delay={200} className="float-slow hidden md:block absolute top-10 right-10 z-20">
            <div className="w-40 lg:w-48 aspect-[3/4] border-4 border-[#0E0E0E] shadow-2xl overflow-hidden rotate-3">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70"
                alt="Resort poolside detail"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Live concierge chat card */}
          <ScrollReveal direction="up" delay={300} className="absolute bottom-8 left-8 right-8 sm:right-auto z-20 sm:w-72">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/95 backdrop-blur border border-white/50 shadow-2xl hover:-translate-y-1 transition-transform duration-300 group"
            >
              <span className="relative flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-[#0E0E0E] group-hover:bg-[#FF1F02] transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white">
                  <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping" />
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors">Chat with Concierge</span>
                <span className="block text-[11px] font-mono text-[#0E0E0E]/60">Online now • replies instantly</span>
              </span>
            </a>
          </ScrollReveal>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="relative border-y border-white/10 bg-[#0E0E0E] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/40 px-6"
            >
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

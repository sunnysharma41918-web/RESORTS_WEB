import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, MapPin, Star, Clock3, Sparkles } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';
import { CONTACT_INFO, getWhatsAppBookingUrl } from '../../../data/contact';

const STATS = [
  { icon: MapPin, label: '36 States & UTs', sub: 'Pan-India Presence' },
  { icon: Star, label: '4.9 / 5 Rating', sub: 'Delighted Guests' },
  { icon: Clock3, label: '24/7 Concierge', sub: 'Immediate Response' },
];

const MARQUEE_ITEMS = [
  'PAN-INDIA ESCAPES',
  'HERITAGE PALACE STAYS',
  'DESTINATION WEDDINGS',
  'CORPORATE SUMMITS',
  'ROYAL CELEBRATIONS',
  'MOUNTAIN SANCTUARIES',
];

export default function FinalBookingCTA() {
  const whatsappUrl = getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to plan our holiday stay.');

  return (
    <section className="relative bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] overflow-hidden font-sans border-t border-[#B38738]/20 dark:border-[#B38738]/30 transition-colors duration-500">
      
      {/* Indian Palace Art & Jaali Lattice */}
      <IndianArtBackground variant="full" opacity="opacity-[0.045] dark:opacity-[0.065]" />

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

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-[85vh]">

        {/* LEFT — Message & Call to Actions */}
        <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 order-2 lg:order-1">
          <div className="relative z-10 max-w-xl space-y-7">

            <ScrollReveal direction="scale">
              <EditorialHeritageStamp size={80} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " />
            </ScrollReveal>

            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-cinzel font-semibold uppercase tracking-[0.25em] text-[#B38738] dark:text-[#E8C97E] px-3.5 py-1 bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/30 dark:border-[#B38738]/40 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                <span>ROYAL INVITATION</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="font-marcellus text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] leading-[1.05] text-[#241A12] dark:text-[#F5EFE6]">
                YOUR NEXT <br />
                ROYAL ESCAPE <br />
                <span className="text-royal-gold">STARTS HERE.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-sm sm:text-base font-sans font-light text-[#635142] dark:text-[#BFB0A2] leading-relaxed">
                Leave the ordinary behind. Reserve your private palace pavilion or mountain villa and experience timeless royal hospitality across India.
              </p>
            </ScrollReveal>

            {/* CTA BUTTONS */}
            <ScrollReveal direction="up" delay={200}>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  {/* Primary CTA - WhatsApp Booking */}
                  <MagneticButton className="w-full sm:w-auto">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-serif font-medium text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_6px_25px_rgba(179,135,56,0.35)] rounded-full cursor-pointer"
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
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-[#B38738]/10 dark:hover:bg-[#E8C97E]/10 text-[#241A12] dark:text-[#F5EFE6] border border-[#B38738]/40 dark:border-[#E8C97E]/40 font-serif font-medium text-xs uppercase tracking-widest transition-all duration-300 rounded-full cursor-pointer"
                    >
                      <span>EXPLORE RESORTS</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </MagneticButton>
                </div>

                {/* Direct Call & Offers Links */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-serif">
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-[#635142] dark:text-[#BFB0A2] hover:text-[#B38738] dark:hover:text-[#E8C97E] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                    <span>Call Concierge: {CONTACT_INFO.phone}</span>
                  </a>
                  <span className="text-[#B38738]/40 hidden sm:inline">•</span>
                  <Link
                    to="/offers"
                    className="text-[#635142] dark:text-[#BFB0A2] hover:text-[#B38738] dark:hover:text-[#E8C97E] underline underline-offset-4 decoration-[#B38738]/40 transition-colors"
                  >
                    View Exclusive Packages & Offers
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Trust stats row */}
            <ScrollReveal direction="up" delay={300}>
              <div className="pt-6 border-t border-[#B38738]/20 dark:border-[#B38738]/30 grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <s.icon className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E]" />
                    <div className="text-xs sm:text-sm font-serif font-medium text-[#241A12] dark:text-[#F5EFE6] leading-tight">{s.label}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wide text-[#635142] dark:text-[#BFB0A2]">{s.sub}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* RIGHT — Photo Frame */}
        <div className="relative min-h-[380px] lg:min-h-0 order-1 lg:order-2 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=75"
            alt="Sunrise Mountain Peak Horizon"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.95] dark:brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6ED] dark:from-[#0D0A07] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#FAF6ED] lg:dark:from-[#0D0A07] lg:via-transparent lg:to-transparent" />

          {/* Secondary floating image card */}
          <ScrollReveal direction="scale" delay={200} className="float-slow hidden md:block absolute top-10 right-10 z-20">
            <div className="w-40 lg:w-48 aspect-[3/4] border-4 border-[#FAF6ED] dark:border-[#140F0A] rounded-2xl shadow-2xl overflow-hidden rotate-3">
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
              className="flex items-center gap-3 p-4 bg-[#FAF6ED]/95 dark:bg-[#140F0A]/95 backdrop-blur border border-[#B38738]/40 rounded-2xl shadow-2xl hover:-translate-y-1 transition-transform duration-300 group"
            >
              <span className="relative flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] text-white">
                <MessageCircle className="w-5 h-5 text-current" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white dark:border-black">
                  <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping" />
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-serif font-bold uppercase tracking-wide text-[#241A12] dark:text-[#F5EFE6] group-hover:text-[#B38738] dark:group-hover:text-[#E8C97E] transition-colors">Chat with Concierge</span>
                <span className="block text-[11px] font-mono text-[#635142] dark:text-[#BFB0A2]">Online now • replies instantly</span>
              </span>
            </a>
          </ScrollReveal>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="relative border-y border-[#B38738]/20 dark:border-[#B38738]/30 bg-[#FAF6ED] dark:bg-[#0D0A07] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#B38738] dark:text-[#E8C97E] px-6"
            >
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E] inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Jaali Border */}
      <div className="w-full">
        <IndianJaaliBorder />
      </div>
    </section>
  );
}

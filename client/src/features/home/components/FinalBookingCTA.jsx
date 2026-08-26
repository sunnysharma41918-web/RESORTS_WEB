import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import { getWhatsAppBookingUrl } from '../../../data/contact';

export default function FinalBookingCTA() {
  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
      {/* Background Resort Photography with Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=75"
          alt="Sunrise Mountain Peak Horizon"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover filter brightness-[0.25]"
        />
        <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black dark:via-black/80 dark:to-black/60 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">

        {/* Animated Red CHHR Heritage Stamp */}
        <ScrollReveal direction="scale">
          <div className="flex justify-center mb-2">
            <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " year="EST 2026" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>06 — INVITATION</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
            YOUR NEXT <br />
            ESCAPE <br />
            STARTS HERE.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
            Leave the ordinary behind. Reserve your private pavilion high above the clouds and experience the art of slow living.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticButton>
              <a
                href={getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to plan our stay.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
              >
                <span>CONNECT WITH CONCIERGE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link
                to="/offers"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.14em] transition-colors"
              >
                <span>VIEW EXCLUSIVE OFFERS</span>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          {/* Floating Telemetry Coordinates Bar */}
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 uppercase tracking-widest gap-4">
            <span>● PRIVATE RESERVATIONS</span>
            <span>ESTATE HELIPAD COORDINATES: 32.2396° N, 77.1887° E</span>
            <span>2026 EDITION</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

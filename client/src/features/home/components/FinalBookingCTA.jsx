import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';

export default function FinalBookingCTA() {
  return (
    <section className="relative bg-[#000000] text-white py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Resort Photography with Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
          alt="Sunrise Mountain Peak Horizon"
          className="w-full h-full object-cover filter brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">

        {/* Animated Red CHTR Heritage Stamp */}
        <ScrollReveal direction="scale">
          <div className="flex justify-center mb-2">
            <EditorialHeritageStamp size={110} centerText="CHTR" year="EST 2026" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>09 — INVITATION</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
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
              <Link
                to="/resorts"
                className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
              >
                <span>PLAN YOUR STAY</span>
                <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#FF1F02]" />
                <span>DIRECT CONCIERGE</span>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
            <span>● 100% OFF-GRID SOLAR</span>
            <span>● ZERO SINGLE-USE PLASTICS</span>
            <span>● 24/7 DEDICATED BUTLER</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

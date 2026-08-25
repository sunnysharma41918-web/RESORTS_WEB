import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SignatureStaySection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between py-20 px-6 sm:px-12 lg:px-20 overflow-hidden select-none bg-[#171C28] text-white border-t border-[#5E6575]/25">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@700;800;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .ss-display { font-family: 'Rokkitt', Georgia, serif; }
        .ss-body { font-family: 'Ubuntu', sans-serif; }

        .btn-sig {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          border: 2px solid #3FD3C9;
          border-radius: 9999px;
          text-transform: uppercase;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.2em;
          transition: all 0.3s ease;
          background: rgba(23, 28, 40, 0.6);
          backdrop-filter: blur(12px);
          box-shadow: 0 0 25px rgba(63, 211, 201, 0.2);
        }
        .btn-sig:hover {
          background: #3FD3C9;
          color: #171C28;
          box-shadow: 0 0 35px rgba(63, 211, 201, 0.45);
          transform: scale(1.04);
        }
      `}</style>

      {/* 1. Cinematic Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
          alt="Sunrise Resort Horizon"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-110 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171C28] via-[#171C28]/40 to-[#171C28]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171C28]/80 via-transparent to-[#171C28]/80" />
      </div>

      {/* Ambient glowing highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#3FD3C9]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header Glow Indicator */}
      <div className="relative z-10 w-full flex justify-center pt-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1F2536]/80 backdrop-blur-md border border-[#3FD3C9]/40 text-[#3FD3C9] text-[11px] uppercase tracking-[0.3em] font-bold shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The 2026 Sanctuary Experience</span>
        </div>
      </div>

      {/* 2. Overlaid Editorial Narrative */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 my-auto py-12">
        <h2 className="ss-display text-4xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 leading-[0.95]">
          Wake Up Somewhere <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FD3C9] via-white to-[#B72257]">
            Extraordinary.
          </span>
        </h2>

        <p className="ss-body max-w-2xl mx-auto text-white/70 text-sm sm:text-base font-light leading-relaxed tracking-wide">
          Golden morning light filtering through high-altitude pine canopy. Savor unhurried breakfasts
          prepared by private Michelin-trained chefs as morning mist lifts over untouchable coastal valleys.
        </p>

        {/* Quick Highlights Ribbon */}
        <div className="ss-body py-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white/90 font-medium">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2536]/80 backdrop-blur-md border border-[#5E6575]/30">
            <Compass className="w-4 h-4 text-[#3FD3C9]" />
            <span>100% Unobstructed Vistas</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2536]/80 backdrop-blur-md border border-[#5E6575]/30">
            <ShieldCheck className="w-4 h-4 text-[#B72257]" />
            <span>24/7 Private Butler</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2536]/80 backdrop-blur-md border border-[#5E6575]/30">
            <MapPin className="w-4 h-4 text-[#3FD3C9]" />
            <span>Helipad Access</span>
          </div>
        </div>

        {/* Single Signature CTA */}
        <div className="pt-6 flex justify-center">
          <Link to="/resorts" className="btn-sig group">
            <span>Book Your Stay</span>
            <span className="w-6 h-6 rounded-full bg-[#B72257] group-hover:bg-[#171C28] group-hover:text-[#3FD3C9] text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
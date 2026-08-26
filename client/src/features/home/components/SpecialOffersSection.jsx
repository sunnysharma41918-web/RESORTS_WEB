import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag, CheckCircle2, Calendar, MapPin, Gift, Phone } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import MagneticButton from '../../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import { offerService } from '../../../services/offerService';
import { getWhatsAppBookingUrl } from '../../../data/contact';

export default function SpecialOffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await offerService.getOffers({ featured: true });
        setOffers(data && data.length > 0 ? data.slice(0, 4) : []);
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  return (
    <section className="relative bg-[#000000] text-white py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="dark" position="bottom-left" />

      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#333333]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>05 — SPECIAL OFFERS & PACKAGES</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
                EXCLUSIVE <br />
                PACKAGES & <br />
                EXPERIENCES.
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-4 max-w-sm">
            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light text-[#D0D0D0] leading-relaxed">
                Curated holiday escapes, destination weddings, and celebratory packages crafted to deliver extraordinary memories and genuine comfort.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <Link
                to="/offers"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#FF1F02] hover:text-white transition-colors"
              >
                <span>VIEW ALL PACKAGES ({offers.length}+)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>
        </div>

        {/* Offers 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((pkg, idx) => (
            <ScrollReveal key={pkg.id} direction="up" delay={idx * 100}>
              <div className="group bg-[#161616] border border-[#333333] hover:border-[#FF1F02] transition-all duration-500 overflow-hidden flex flex-col justify-between h-full">
                
                {/* Media Banner with Badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="px-3 py-1 bg-[#FF1F02] text-white text-[10px] font-mono uppercase tracking-wider font-extrabold shadow-md">
                      {pkg.badge || 'SPECIAL OFFER'}
                    </span>
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-sm text-[#EAB308] border border-[#EAB308]/40 text-[10px] font-mono uppercase tracking-wider">
                      {pkg.tag}
                    </span>
                  </div>

                  {/* Discount / Benefit Ribbon */}
                  {pkg.discount && (
                    <div className="absolute bottom-3 right-4 px-3 py-1 bg-black/90 backdrop-blur-sm border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#FF1F02]" />
                      <span>{pkg.discount}</span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase text-white group-hover:text-[#FF1F02] transition-colors leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B0B0B0] font-light leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Key Inclusions */}
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <div className="pt-3 space-y-1.5">
                        <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block font-bold">
                          PACKAGE INCLUSIONS:
                        </span>
                        <ul className="space-y-1">
                          {pkg.inclusions.slice(0, 3).map((inc, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2 text-xs text-[#CCCCCC] font-light">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F02] shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer Action Rail */}
                  <div className="pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] font-mono text-[#888888]">
                      <span>{pkg.location}</span>
                    </div>

                    <a
                      href={getWhatsAppBookingUrl(`Hello Country Holidays, I would like to book or inquire about: ${pkg.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-black text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>BOOK THIS OFFER</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner with Event Concierge */}
        <ScrollReveal direction="up" delay={300}>
          <div className="p-8 bg-gradient-to-r from-[#1C1C1C] via-[#161616] to-[#1C1C1C] border border-[#333333] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest font-bold">
                ✦ CUSTOM CELEBRATIONS & GROUP PACKAGES ✦
              </span>
              <h4 className="text-xl sm:text-2xl font-bold uppercase text-white">
                Looking for a Tailor-Made Holiday or Event Package?
              </h4>
              <p className="text-xs sm:text-sm text-[#A0A0A0] font-light">
                Our dedicated event advisors create bespoke itineraries for weddings, conferences, and family reunions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={getWhatsAppBookingUrl('Hello Country Holidays, I would like to discuss a custom package for our upcoming event/stay.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white hover:bg-[#FF1F02] text-black hover:text-white font-bold text-xs uppercase font-mono tracking-wider transition-all duration-300"
              >
                TALK TO PACKAGE ADVISOR
              </a>
              <Link
                to="/offers"
                className="px-6 py-3 border border-white/40 hover:border-white text-white font-bold text-xs uppercase font-mono tracking-wider transition-all duration-300"
              >
                BROWSE ALL OFFERS
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

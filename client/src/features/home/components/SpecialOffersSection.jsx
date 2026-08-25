import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift, Percent, Calendar } from 'lucide-react';

export default function SpecialOffersSection() {
  const offers = [
    {
      id: 'weekend-escape',
      title: 'The Weekend Sanctuary Escape',
      validity: 'Valid Fri - Sun throughout 2026',
      desc: 'Includes luxury return airport sedan transfers, daily champagne breakfast, and $250 Ayurvedic Spa credit.',
      discount: 'Save 20%',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      tag: 'MOST POPULAR',
      tagBg: '#3FD3C9',
      tagColor: '#171C28',
    },
    {
      id: 'extended-stay',
      title: 'Extended Horizon Residency',
      validity: '5+ Nights Bookings',
      desc: 'Complimentary private sommelier wine tasting, bespoke in-villa dinner, and complimentary laundry service.',
      discount: 'Up to 30% Off',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
      tag: 'LONG STAY',
      tagBg: '#B72257',
      tagColor: '#FFFFFF',
    },
    {
      id: 'romantic-retreat',
      title: 'Romantic Sunset & Sea Voyage',
      validity: 'Couples & Anniversaries',
      desc: 'Private catamaran sunset cruise, floral bath ritual setup, and a 5-course candlelit clifftop dinner.',
      discount: 'Bespoke Experience',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
      tag: 'HONEYMOON',
      tagBg: '#3FD3C9',
      tagColor: '#171C28',
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#171C28] text-white overflow-hidden select-none border-t border-[#5E6575]/25">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@700;800;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .so-display { font-family: 'Rokkitt', Georgia, serif; }
        .so-body { font-family: 'Ubuntu', sans-serif; }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#B72257]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#5E6575]/30">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.25em] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEASONAL EXPERIENCES</span>
            </div>
            <h2 className="so-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              Curated Special Offers
            </h2>
          </div>
          <p className="so-body text-xs sm:text-sm text-white/60 font-light max-w-sm">
            Exclusive privileges designed to enrich your sanctuary journey with unforgettable moments.
          </p>
        </div>

        {/* 3 Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl overflow-hidden bg-[#1F2536]/85 border border-[#5E6575]/35 hover:border-[#3FD3C9]/60 shadow-2xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2536] via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold tracking-widest uppercase shadow-lg"
                    style={{ backgroundColor: offer.tagBg, color: offer.tagColor }}
                  >
                    {offer.tag}
                  </span>
                </div>

                {/* Discount Tag */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#171C28]/80 backdrop-blur-md border border-[#5E6575]/30 text-xs font-mono font-bold text-[#3FD3C9]">
                    {offer.discount}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="so-body text-[11px] font-mono text-white/50 block">
                    {offer.validity}
                  </span>
                  <h3 className="so-display text-lg font-bold text-white group-hover:text-[#3FD3C9] transition-colors leading-snug">
                    {offer.title}
                  </h3>
                  <p className="so-body text-xs text-white/65 font-light leading-relaxed">
                    {offer.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#5E6575]/30">
                  <Link
                    to="/resorts"
                    className="inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#3FD3C9] hover:text-white transition-colors"
                  >
                    <span>Claim Package</span>
                    <span className="w-6 h-6 rounded-full bg-[#B72257] text-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

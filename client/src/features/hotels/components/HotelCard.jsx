import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Building2, Sparkles, ShieldCheck } from 'lucide-react';

export default function HotelCard({ hotel }) {
  const specs = hotel.amenities ? hotel.amenities.slice(0, 3).map(a => a.name || a) : [
    'Palace Courtyard',
    'Royal Dining',
    'Chauffeur Arrival'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to={`/hotels/${hotel.slug}`}
        className="flex flex-col h-full bg-[#FAF6F0] dark:bg-[#1C1814] border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/30 hover:border-[#8F6B2E] dark:hover:border-[#D4AF37] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-md hover:shadow-2xl"
      >
        {/* Top Image Frame */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 isolate">
          <img
            src={hotel.featuredImage || hotel.heroImage || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top-Left Location Pill */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 bg-[#14110E]/85 backdrop-blur-md border border-[#8F6B2E]/40 rounded-full text-[11px] font-medium text-[#F3EEE0] flex items-center space-x-1.5 shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{hotel.location}</span>
          </div>

          {/* Top-Right Star Rating Pill */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#14110E]/85 backdrop-blur-md border border-[#8F6B2E]/40 rounded-full text-[11px] font-bold text-[#F3EEE0] flex items-center space-x-1 shadow-lg">
            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
            <span>{hotel.rating || 4.95}</span>
          </div>

          {/* Bottom Left Floating Urban/Royal Tag on Image */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-[#8F6B2E]/30 border border-[#D4AF37]/50 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-[#FAF6F0]">
              {hotel.city || 'Heritage Collection'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
          <div className="space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2A1F17] dark:text-[#F3EEE0] group-hover:text-[#8F6B2E] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
              {hotel.name}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif font-light leading-relaxed line-clamp-2">
              {hotel.shortDescription || hotel.tagline || 'Experience palatial opulence, bespoke royal hospitality, and tranquil residential retreats.'}
            </p>

            {/* Spec Capsules */}
            <div className="flex flex-wrap gap-2 pt-1">
              {specs.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/20 text-[10px] uppercase tracking-wider text-[#8F6B2E] dark:text-[#D4AF37] font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#8F6B2E]/15 dark:border-[#8F6B2E]/20 flex items-center justify-between text-xs text-[#2A1F17] dark:text-[#F3EEE0]">
            <span className="font-serif font-medium uppercase tracking-widest text-[#8F6B2E] dark:text-[#D4AF37] group-hover:text-[#6E511E] dark:group-hover:text-[#E5C158] transition-colors flex items-center gap-1.5">
              <span>View Suites & Residencies</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/25 border border-[#8F6B2E]/30 group-hover:bg-[#8F6B2E] group-hover:text-white dark:group-hover:bg-[#D4AF37] dark:group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

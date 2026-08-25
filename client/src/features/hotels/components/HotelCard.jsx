import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export default function HotelCard({ hotel }) {
  const specs = hotel.amenities ? hotel.amenities.slice(0, 3).map(a => a.name || a) : [
    'Skyline Penthouse',
    'Michelin Dining',
    'Helipad Arrival'
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
        className="flex flex-col h-full bg-luxury-card border border-luxury-border/80 hover:border-sky-400 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_20px_50px_rgba(56,189,248,0.22)]"
      >
        {/* Top Image Frame */}
        <div className="relative aspect-[16/10] overflow-hidden bg-luxury-stone isolate">
          <img
            src={hotel.featuredImage || hotel.heroImage}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top-Left Location Pill */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 bg-black/70 backdrop-blur-md border border-sky-500/30 rounded-full text-[11px] font-medium text-white flex items-center space-x-1.5 shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{hotel.location}</span>
          </div>

          {/* Top-Right Star Rating Pill */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-sky-500/30 rounded-full text-[11px] font-bold text-white flex items-center space-x-1 shadow-lg">
            <Star className="w-3.5 h-3.5 text-sky-400 fill-current" />
            <span>{hotel.rating || 4.95}</span>
          </div>

          {/* Bottom Left Floating Urban Tag on Image */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 backdrop-blur-md text-[10px] uppercase tracking-luxury font-bold text-sky-300">
              {hotel.city || 'Metropolitan Skyline'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-sky-200 transition-colors uppercase leading-snug">
              {hotel.name}
            </h3>
            
            <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed line-clamp-2">
              {hotel.shortDescription || hotel.tagline || 'High-rise architectural modernity and discrete luxury suites in prime metropolitan centers.'}
            </p>

            {/* Spec Capsules */}
            <div className="flex flex-wrap gap-2 pt-2">
              {specs.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-[10px] uppercase tracking-wider text-sky-300 font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-luxury-border/60 flex items-center justify-between text-xs text-white">
            <span className="font-semibold uppercase tracking-luxury text-sky-400 group-hover:text-sky-300 transition-colors">
              Explore Suite Collection
            </span>
            <div className="w-9 h-9 rounded-full bg-sky-500/15 border border-sky-500/30 group-hover:bg-sky-400 group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

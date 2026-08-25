import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export default function ResortCard({ resort }) {
  return (
    <Link
      to={`/resorts/${resort.slug}`}
      className="group flex flex-col bg-luxury-card border border-luxury-border/80 hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-2xl"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-luxury-stone">
        <img
          src={resort.featuredImage || resort.heroImage}
          alt={resort.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-medium text-white flex items-center space-x-1.5">
          <MapPin className="w-3 h-3 text-luxury-accent" />
          <span>{resort.location}</span>
        </div>

        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-semibold text-white flex items-center space-x-1">
          <Star className="w-3 h-3 text-luxury-accent fill-current" />
          <span>{resort.rating || 4.95}</span>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-luxury text-luxury-accent font-semibold">
            {resort.region || 'Slowhouse Sanctuary'}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-luxury-sand transition-colors">
            {resort.name}
          </h3>
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed line-clamp-2">
            {resort.shortDescription || resort.tagline}
          </p>
        </div>

        <div className="pt-4 border-t border-luxury-border/60 flex items-center justify-between text-xs text-white/90">
          <span className="font-medium group-hover:underline">Explore Sanctuary</span>
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-luxury-black flex items-center justify-center transition-all">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

import React from 'react';
import LazyImage from '../../../components/common/LazyImage';
import Button from '../../../components/common/Button';

export default function ExperienceCard({ experience }) {
  if (!experience) return null;

  return (
    <div className="bg-luxury-card border border-luxury-border flex flex-col justify-between overflow-hidden group">
      <div className="relative overflow-hidden">
        <LazyImage
          src={experience.image}
          alt={experience.title}
          aspect="aspect-[16/10]"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-luxury-black/80 backdrop-blur-md text-[10px] uppercase tracking-luxury text-luxury-accent">
          {experience.category}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs tracking-luxury text-luxury-accent">
            <span>{experience.location}</span>
            <span className="text-luxury-light/80">{experience.duration}</span>
          </div>

          <h3 className="text-2xl font-serif text-luxury-light">
            {experience.title}
          </h3>

          <p className="text-xs md:text-sm text-luxury-muted font-light leading-relaxed">
            {experience.description}
          </p>
        </div>

        <div className="pt-4 border-t border-luxury-border/60">
          <Button to="/contact" variant="outline" size="sm" className="w-full">
            Inquire Experience
          </Button>
        </div>
      </div>
    </div>
  );
}

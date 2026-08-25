import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  return (
    <div className="p-8 bg-luxury-card border border-luxury-border space-y-6 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center space-x-1 text-luxury-accent">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <p className="text-sm font-serif italic text-luxury-sand leading-relaxed">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="pt-4 border-t border-luxury-border/60">
        <h5 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
          {testimonial.author}
        </h5>
        <span className="text-[11px] text-luxury-muted">
          {testimonial.role} • {testimonial.location}
        </span>
      </div>
    </div>
  );
}

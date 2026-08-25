import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

export default function TestimonialSlider({ testimonials }) {
  const [index, setIndex] = useState(0);
  const items = testimonials || [];

  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <TestimonialCard testimonial={items[index]} />
      {items.length > 1 && (
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
            className="p-2 border border-luxury-border text-luxury-muted hover:text-luxury-accent hover:border-luxury-accent transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % items.length)}
            className="p-2 border border-luxury-border text-luxury-muted hover:text-luxury-accent hover:border-luxury-accent transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

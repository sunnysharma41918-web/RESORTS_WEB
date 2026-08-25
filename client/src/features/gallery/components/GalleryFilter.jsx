import React from 'react';
import { cn } from '../../../utils/cn';

export default function GalleryFilter({
  categories = [],
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 pb-8 border-b border-luxury-border/60">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            'px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-luxury transition-all duration-300',
            activeCategory.toLowerCase() === cat.toLowerCase()
              ? 'bg-orange-500 text-black font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)] scale-105 border border-orange-400'
              : 'bg-black/50 border border-luxury-border text-luxury-muted hover:border-orange-500/40 hover:text-white backdrop-blur-md'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

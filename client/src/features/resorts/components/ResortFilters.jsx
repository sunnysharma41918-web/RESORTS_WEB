import React from 'react';
import { cn } from '../../../utils/cn';

export default function ResortFilters({
  activeRegion,
  onRegionChange,
  sortBy,
  onSortChange,
}) {
  const regions = ['all', 'coastal', 'alpine', 'wilderness', 'desert'];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-luxury-border/60">
      {/* Filter Capsule Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {regions.map((reg) => (
          <button
            key={reg}
            onClick={() => onRegionChange(reg)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-luxury transition-all duration-300',
              activeRegion.toLowerCase() === reg.toLowerCase()
                ? 'bg-white text-luxury-black font-semibold shadow-lg scale-105'
                : 'bg-luxury-card border border-luxury-border text-luxury-muted hover:border-white/30 hover:text-white'
            )}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Sort Select */}
      <div className="flex items-center space-x-2 text-xs text-luxury-muted">
        <span className="uppercase tracking-luxury">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-luxury-card border border-luxury-border text-white text-xs px-3 py-1.5 rounded-full outline-none"
        >
          <option value="featured">Featured First</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}

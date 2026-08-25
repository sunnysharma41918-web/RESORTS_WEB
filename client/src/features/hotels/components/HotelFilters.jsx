import React from 'react';
import { cn } from '../../../utils/cn';

export default function HotelFilters({ currentFilter, onFilterChange, currentSort, onSortChange }) {
  const filters = [
    { label: 'All Hotels', value: 'all' },
    { label: 'Featured', value: 'featured' },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Bengaluru', value: 'bengaluru' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 mb-10 border-b border-luxury-border">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              'text-xs tracking-luxury uppercase px-4 py-2.5 transition-all duration-200 border',
              currentFilter === f.value
                ? 'bg-luxury-light text-luxury-black border-luxury-light font-medium'
                : 'bg-transparent text-luxury-muted border-luxury-border hover:border-luxury-accent/50 hover:text-luxury-light'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-xs uppercase tracking-luxury text-luxury-muted">Sort:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-luxury-stone border border-luxury-border text-luxury-light text-xs uppercase tracking-wider px-3 py-2 outline-none focus:border-luxury-accent"
        >
          <option value="default">Curated Order</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}

import React from 'react';
import ResortCard from './ResortCard';

export default function ResortGrid({ resorts }) {
  if (!resorts || resorts.length === 0) {
    return (
      <div className="text-center py-16 bg-luxury-stone/20 border border-luxury-border">
        <p className="text-sm text-luxury-muted">No resorts matching this selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {resorts.map((resort) => (
        <ResortCard key={resort.id} resort={resort} />
      ))}
    </div>
  );
}

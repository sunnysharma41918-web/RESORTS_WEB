import React from 'react';
import { Sparkles } from 'lucide-react';

export default function RoomAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {amenities.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-3 p-3 bg-luxury-stone/40 border border-luxury-border">
          <Sparkles className="w-4 h-4 text-luxury-accent" />
          <span className="text-xs text-luxury-light font-medium">{item}</span>
        </div>
      ))}
    </div>
  );
}

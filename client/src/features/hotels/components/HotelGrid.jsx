import React from 'react';
import HotelCard from './HotelCard';

export default function HotelGrid({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-16 bg-luxury-stone/20 border border-luxury-border">
        <p className="text-sm text-luxury-muted">No boutique hotels matching this criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

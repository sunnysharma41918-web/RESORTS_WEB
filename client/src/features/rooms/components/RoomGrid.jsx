import React from 'react';
import RoomCard from './RoomCard';

export default function RoomGrid({ rooms }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-16 bg-luxury-stone/20 border border-luxury-border">
        <p className="text-sm text-luxury-muted">No suites available matching this selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

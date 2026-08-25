import React from 'react';
import { BedDouble, Users, Maximize } from 'lucide-react';

export default function ResortRooms({ rooms = [] }) {
  if (!rooms || rooms.length === 0) return null;

  return (
    <section className="py-20 bg-luxury-black text-luxury-light px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-xs uppercase tracking-luxury text-luxury-accent">
            <BedDouble className="w-3.5 h-3.5" />
            <span>Living Accommodations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
            Villas & Private Suites
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <div
              key={idx}
              className="bg-luxury-card border border-luxury-border/80 hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-luxury-stone">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-medium text-white flex items-center space-x-1.5">
                  <Maximize className="w-3 h-3 text-luxury-accent" />
                  <span>{room.size}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-luxury-border/60 flex items-center justify-between text-xs text-luxury-muted">
                  <span className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-luxury-accent" />
                    <span>{room.capacity}</span>
                  </span>
                  <span className="text-white/80 font-medium">{room.bedType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

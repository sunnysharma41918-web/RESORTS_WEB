import React from 'react';
import { Maximize2, Users, BedDouble, MessageCircle } from 'lucide-react';
import LazyImage from '../../../components/common/LazyImage';
import { getWhatsAppBookingUrl } from '../../../data/contact';

export default function RoomCard({ room }) {
  if (!room) return null;

  return (
    <div className="bg-luxury-card border border-luxury-border flex flex-col justify-between overflow-hidden group">
      <div className="relative overflow-hidden">
        <LazyImage
          src={room.image}
          alt={room.name}
          aspect="aspect-[16/10]"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-luxury-black/80 backdrop-blur-md text-[10px] uppercase tracking-luxury text-luxury-accent">
          {room.propertyName}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-luxury text-luxury-accent block">
            {room.view}
          </span>
          <h3 className="text-2xl font-serif text-luxury-light">
            {room.name}
          </h3>
          <p className="text-xs md:text-sm text-luxury-muted font-light leading-relaxed">
            {room.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-y border-luxury-border/60 text-center">
          <div className="flex flex-col items-center space-y-1">
            <Maximize2 className="w-3.5 h-3.5 text-luxury-accent" />
            <span className="text-[10px] uppercase text-luxury-muted">{room.size}</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Users className="w-3.5 h-3.5 text-luxury-accent" />
            <span className="text-[10px] uppercase text-luxury-muted">{room.capacity}</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <BedDouble className="w-3.5 h-3.5 text-luxury-accent" />
            <span className="text-[10px] uppercase text-luxury-muted">{room.bedType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <a
            href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I would like to enquire about booking ${room.name} (${room.propertyName || 'Luxury Stay'}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22C55E] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}

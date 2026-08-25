import React from 'react';
import { Eye } from 'lucide-react';
import LazyImage from '../../../components/common/LazyImage';

export default function GalleryItem({ item, onClick }) {
  if (!item) return null;

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden bg-luxury-stone border border-luxury-border"
    >
      <LazyImage
        src={item.image}
        alt={item.title}
        aspect={item.aspect || 'aspect-[16/11]'}
        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
        <span className="text-[10px] uppercase tracking-luxury text-luxury-accent">
          {item.category}
        </span>

        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-base sm:text-lg font-serif text-luxury-light">{item.title}</h4>
            <p className="text-xs text-luxury-muted">{item.location}</p>
          </div>
          <div className="p-2 bg-luxury-accent/20 rounded-full text-luxury-accent">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

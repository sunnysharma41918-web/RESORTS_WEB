import React from 'react';
import { useUI } from '../../../context/UIContext';
import { Eye } from 'lucide-react';

export default function GalleryGrid({ items = [] }) {
  const { openLightbox } = useUI();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={item.id || index}
          onClick={() => openLightbox(items, index)}
          className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-luxury-stone cursor-pointer border border-luxury-border hover:border-orange-500/50 shadow-2xl transition-all duration-500 hover:-translate-y-1"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
            <span className="self-start px-3 py-1 bg-black/60 backdrop-blur-md border border-orange-500/40 rounded-full text-[10px] uppercase tracking-luxury text-orange-400 font-semibold">
              {item.category}
            </span>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-base font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-luxury-muted">{item.location}</p>
              </div>

              <div className="w-9 h-9 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-lg">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

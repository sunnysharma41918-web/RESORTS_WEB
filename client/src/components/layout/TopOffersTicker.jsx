import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Tag, ArrowRight, Gift } from 'lucide-react';
import { storage } from '../../services/storage';

export default function TopOffersTicker() {
  const [items, setItems] = useState(() => {
    try {
      const stored = storage.getTickerOffers();
      return (stored && stored.length > 0) ? stored.filter((i) => i.isActive !== false) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = storage.getTickerOffers();
        setItems((stored && stored.length > 0) ? stored.filter((i) => i.isActive !== false) : []);
      } catch (err) {
        console.error('Ticker update error:', err);
      }
    };

    window.addEventListener('chhr_ticker_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('chhr_ticker_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full bg-[#0A0A0A] text-white border-b border-white/10 text-xs overflow-hidden select-none relative z-50 py-1.5 font-manrope">
      {/* Ambient Red/Gold hairline indicator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F02] to-transparent opacity-80" />

      {/* Infinite Marquee Track with pause on hover */}
      <div className="flex overflow-hidden group">
        <div className="animate-marquee-infinite flex items-center shrink-0">
          {/* TRACK 1 */}
          {items.map((item) => (
            <Link
              key={`t1-${item.id}`}
              to={item.link || '/offers'}
              className="inline-flex items-center space-x-2.5 mx-6 py-0.5 hover:text-[#FF1F02] transition-colors group/item"
            >
              <span
                className={`text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none flex items-center gap-1 ${item.badgeColor || 'bg-[#FF1F02] text-white'}`}
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{item.badge}</span>
              </span>
              <span className="text-[11px] sm:text-xs font-medium tracking-tight whitespace-nowrap text-white/90 group-hover/item:text-white">
                {item.text}
              </span>
              <ArrowRight className="w-3 h-3 text-[#FF1F02] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
              <span className="text-white/20 pl-4">✦</span>
            </Link>
          ))}

          {/* TRACK 2 (Seamless loop duplicate) */}
          {items.map((item) => (
            <Link
              key={`t2-${item.id}`}
              to={item.link || '/offers'}
              className="inline-flex items-center space-x-2.5 mx-6 py-0.5 hover:text-[#FF1F02] transition-colors group/item"
            >
              <span
                className={`text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none flex items-center gap-1 ${item.badgeColor || 'bg-[#FF1F02] text-white'}`}
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{item.badge}</span>
              </span>
              <span className="text-[11px] sm:text-xs font-medium tracking-tight whitespace-nowrap text-white/90 group-hover/item:text-white">
                {item.text}
              </span>
              <ArrowRight className="w-3 h-3 text-[#FF1F02] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
              <span className="text-white/20 pl-4">✦</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

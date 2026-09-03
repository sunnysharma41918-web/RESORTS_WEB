import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { storage } from '../../services/storage';
import { settingsService } from '../../services/settingsService';

export default function TopOffersTicker() {
  const [items, setItems] = useState(() => {
    try {
      const stored = storage.getTickerOffers();
      return Array.isArray(stored) ? stored.filter((i) => i.isActive !== false) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let isMounted = true;

    // Fetch latest live ticker from backend database & sync
    async function loadLiveTicker() {
      try {
        const live = await settingsService.getTickerOffers();
        if (isMounted && Array.isArray(live)) {
          setItems(live.filter((i) => i.isActive !== false));
        }
      } catch (err) {
        console.warn('Ticker load error:', err);
      }
    }

    loadLiveTicker();

    const handleUpdate = () => {
      try {
        const stored = storage.getTickerOffers();
        if (isMounted) {
          setItems(Array.isArray(stored) ? stored.filter((i) => i.isActive !== false) : []);
        }
      } catch (err) {
        console.error('Ticker update error:', err);
      }
    };

    window.addEventListener('chhr_ticker_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('chhr_ticker_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Guarantee seamless infinite loop by repeating if few items
  const repeatedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (items.length === 1) return [items[0], items[0], items[0], items[0]];
    if (items.length === 2) return [...items, ...items];
    return items;
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full bg-[#0A0A0A] text-white border-b border-white/10 text-xs overflow-hidden select-none relative z-50 py-1 sm:py-1.5 font-manrope">
      {/* Ambient Red/Gold hairline indicator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F02] to-transparent opacity-80" />

      {/* Infinite Marquee Track with pause on hover */}
      <div className="flex overflow-hidden group">
        <div className="animate-marquee-infinite flex items-center shrink-0">
          {/* TRACK 1 */}
          {repeatedItems.map((item, idx) => (
            <Link
              key={`t1-${item.id}-${idx}`}
              to={item.link || '/offers'}
              className="inline-flex items-center space-x-2 sm:space-x-2.5 mx-3.5 sm:mx-6 py-0.5 hover:text-[#FF1F02] transition-colors group/item shrink-0"
            >
              <span
                className={`text-[8.5px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-none flex items-center gap-1 shrink-0 ${
                  item.badgeColor || 'bg-[#FF1F02] text-white'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                <span>{item.badge}</span>
              </span>
              <span className="text-[10.5px] sm:text-xs font-medium tracking-tight whitespace-nowrap text-white/90 group-hover/item:text-white">
                {item.text}
              </span>
              <ArrowRight className="w-3 h-3 text-[#FF1F02] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all hidden sm:inline" />
              <span className="text-white/20 pl-2 sm:pl-4">✦</span>
            </Link>
          ))}

          {/* TRACK 2 (Seamless loop duplicate) */}
          {repeatedItems.map((item, idx) => (
            <Link
              key={`t2-${item.id}-${idx}`}
              to={item.link || '/offers'}
              className="inline-flex items-center space-x-2 sm:space-x-2.5 mx-3.5 sm:mx-6 py-0.5 hover:text-[#FF1F02] transition-colors group/item shrink-0"
            >
              <span
                className={`text-[8.5px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-none flex items-center gap-1 shrink-0 ${
                  item.badgeColor || 'bg-[#FF1F02] text-white'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                <span>{item.badge}</span>
              </span>
              <span className="text-[10.5px] sm:text-xs font-medium tracking-tight whitespace-nowrap text-white/90 group-hover/item:text-white">
                {item.text}
              </span>
              <ArrowRight className="w-3 h-3 text-[#FF1F02] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all hidden sm:inline" />
              <span className="text-white/20 pl-2 sm:pl-4">✦</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

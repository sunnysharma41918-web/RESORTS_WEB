import React from 'react';
import { Crown, Sparkles, Heart } from 'lucide-react';

export default function WelcomingManGraphic({ className = "" }) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-6 select-none ${className}`}>
      
      {/* Golden Mandala Ambient Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-gradient-to-tr from-[#8F6B2E]/20 via-[#D4AF37]/15 to-transparent blur-2xl animate-pulse" />
      </div>

      {/* Decorative Ornate SVG Halo Disc */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        
        {/* Background Rotating / Ornate Sunburst Ring */}
        <svg 
          viewBox="0 0 200 200" 
          className="absolute inset-0 w-full h-full text-[#8F6B2E]/25 dark:text-[#D4AF37]/30"
        >
          {/* Outer Petal Ring */}
          <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Radial Rays */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="10"
              x2="100"
              y2="18"
              stroke="currentColor"
              strokeWidth="1.5"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}

          {/* Inner Lotus Petal Pattern */}
          <circle cx="100" cy="100" r="70" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* 👑 Central Royal Welcoming Figure (Vector Graphic Illustration) */}
        <svg 
          viewBox="0 0 160 200" 
          className="relative z-10 w-48 h-60 sm:w-56 sm:h-70 filter drop-shadow-xl"
        >
          <defs>
            {/* Royal Gold & Maroon Gradients */}
            <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5A880" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8F6B2E" />
            </linearGradient>

            <linearGradient id="sherwaniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A1C1C" />
              <stop offset="50%" stopColor="#5C1212" />
              <stop offset="100%" stopColor="#3F0A0A" />
            </linearGradient>

            <linearGradient id="goldEmbroidery" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2B184" />
              <stop offset="100%" stopColor="#C48E60" />
            </linearGradient>
          </defs>

          {/* 1. Shoulders & Royal Sherwani Body */}
          <path
            d="M40 135 C40 115, 60 110, 80 110 C100 110, 120 115, 120 135 L126 200 L34 200 Z"
            fill="url(#sherwaniGrad)"
          />

          {/* Golden Center Placket & Embroidery */}
          <path d="M75 110 L85 110 L85 200 L75 200 Z" fill="url(#goldEmbroidery)" />
          
          {/* Royal Buttons on Placket */}
          <circle cx="80" cy="125" r="2" fill="#FFF1B8" />
          <circle cx="80" cy="140" r="2" fill="#FFF1B8" />
          <circle cx="80" cy="155" r="2" fill="#FFF1B8" />
          <circle cx="80" cy="170" r="2" fill="#FFF1B8" />

          {/* Sherwani Royal Shoulder Epaulettes & Floral Gold Patterns */}
          <path d="M42 135 Q60 145 75 130" stroke="url(#goldEmbroidery)" strokeWidth="2.5" fill="none" />
          <path d="M118 135 Q100 145 85 130" stroke="url(#goldEmbroidery)" strokeWidth="2.5" fill="none" />

          {/* 2. Neck & Royal Collar (Mandarin Collar) */}
          <path d="M70 95 L90 95 L92 112 L68 112 Z" fill="url(#skinTone)" />
          <path d="M66 102 C72 108, 88 108, 94 102 L94 112 C88 116, 72 116, 66 112 Z" fill="url(#sherwaniGrad)" stroke="url(#goldEmbroidery)" strokeWidth="1.5" />

          {/* Royal Pearl Necklace (Kanthi Mala) */}
          <path d="M58 118 Q80 140 102 118" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
          <circle cx="80" cy="130" r="3.5" fill="url(#goldEmbroidery)" />
          <circle cx="80" cy="130" r="1.5" fill="#7A1C1C" />

          {/* 3. Face & Features */}
          <ellipse cx="80" cy="78" rx="20" ry="24" fill="url(#skinTone)" />
          
          {/* Royal Beard & Mustache */}
          <path d="M67 80 Q80 92 93 80 Q85 86 80 86 Q75 86 67 80 Z" fill="#2A1A12" />
          <path d="M63 78 Q72 88 80 84 Q88 88 97 78 Q88 98 80 98 Q72 98 63 78 Z" fill="#2A1A12" />

          {/* Gentle Welcoming Smile */}
          <path d="M74 88 Q80 93 86 88" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Eyes & Royal Tilak */}
          <ellipse cx="73" cy="70" rx="2.5" ry="1.5" fill="#2A1A12" />
          <ellipse cx="87" cy="70" rx="2.5" ry="1.5" fill="#2A1A12" />
          {/* Eyebrows */}
          <path d="M69 66 Q74 64 78 66" stroke="#2A1A12" strokeWidth="1.5" fill="none" />
          <path d="M82 66 Q86 64 91 66" stroke="#2A1A12" strokeWidth="1.5" fill="none" />
          
          {/* Sacred Sandalwood & Vermilion Tilak */}
          <path d="M79 57 L81 57 L81 66 L79 66 Z" fill="#FF1F02" />
          <circle cx="80" cy="62" r="1.5" fill="#FFE57F" />

          {/* 4. Grand Rajput Royal Turban (Pagri) */}
          <path
            d="M58 64 C52 46, 60 30, 80 28 C100 30, 108 46, 102 64 C95 56, 65 56, 58 64 Z"
            fill="url(#turbanGrad)"
          />
          {/* Turban Folds / Swirls */}
          <path d="M56 55 Q80 40 104 55" stroke="#7A1C1C" strokeWidth="2.5" fill="none" />
          <path d="M58 46 Q80 32 102 46" stroke="#FFF1B8" strokeWidth="2" fill="none" />
          <path d="M62 38 Q80 26 98 38" stroke="#7A1C1C" strokeWidth="2.5" fill="none" />

          {/* Top Turban Fan (Turra) */}
          <path d="M88 32 C95 16, 112 18, 114 36 Z" fill="url(#goldEmbroidery)" />
          <path d="M92 30 L110 20" stroke="#7A1C1C" strokeWidth="1.5" />
          <path d="M96 32 L112 26" stroke="#7A1C1C" strokeWidth="1.5" />

          {/* Royal Sarpech (Jeweled Feather Brooch) */}
          <path d="M80 32 L83 24 L80 15 L77 24 Z" fill="url(#goldEmbroidery)" />
          <circle cx="80" cy="34" r="3.5" fill="#7A1C1C" stroke="#FFF1B8" strokeWidth="1" />
          <circle cx="80" cy="34" r="1.5" fill="#FFF1B8" />

          {/* 5. Folded Hands in Traditional Namaste (Anjali Mudra) */}
          {/* Forearms rising together */}
          <path d="M48 165 L72 138 L78 144 L58 178 Z" fill="url(#sherwaniGrad)" stroke="url(#goldEmbroidery)" strokeWidth="1" />
          <path d="M112 165 L88 138 L82 144 L102 178 Z" fill="url(#sherwaniGrad)" stroke="url(#goldEmbroidery)" strokeWidth="1" />

          {/* Golden Embroidered Cuffs */}
          <path d="M68 142 L76 134 L80 138 L72 146 Z" fill="url(#goldEmbroidery)" />
          <path d="M92 142 L84 134 L80 138 L88 146 Z" fill="url(#goldEmbroidery)" />

          {/* Palms Folded in Namaste */}
          <path
            d="M74 134 C74 122, 78 116, 80 114 C82 116, 86 122, 86 134 C86 142, 74 142, 74 134 Z"
            fill="url(#skinTone)"
            stroke="#A36B3D"
            strokeWidth="0.8"
          />
          {/* Finger separation line */}
          <line x1="80" y1="116" x2="80" y2="136" stroke="#A36B3D" strokeWidth="1" />

          {/* Golden Royal Finger Ring */}
          <circle cx="80" cy="126" r="1.8" fill="#FFF1B8" stroke="#996515" strokeWidth="0.6" />
        </svg>

      </div>

      {/* Ribbon Banner Below Mascot */}
      <div className="relative z-10 -mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8F6B2E] via-[#D4AF37] to-[#8F6B2E] text-white text-[11px] font-mono font-bold uppercase tracking-[0.2em] shadow-md border border-[#FFF1B8]/40">
        <Sparkles className="w-3.5 h-3.5" />
        <span>NAMASTE • ATITHI DEVO BHAVA</span>
      </div>

    </div>
  );
}

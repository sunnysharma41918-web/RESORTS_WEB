import React from 'react';

// Indian Royal Filigree / Spearhead Ornament Divider
export function RoyalOrnamentDivider({ className = '', color = '#B38738' }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-3 select-none pointer-events-none ${className}`}>
      {/* Left Flourish Line */}
      <div className="flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
        <span className="w-12 sm:w-20 md:w-28 h-[1.5px] bg-[#B38738] dark:bg-[#E8C97E] opacity-85" />
      </div>

      {/* Center Royal Lotus / Spearhead Motif */}
      <svg viewBox="0 0 40 20" width="38" height="19" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B38738] dark:text-[#E8C97E]">
        <path
          d="M20 2C21.5 6 25 8 28 8C24 9 22 12 20 18C18 12 16 9 12 8C15 8 18.5 6 20 2Z"
          fill="currentColor"
        />
        <circle cx="20" cy="10" r="1.6" fill="#FAF6F0" className="dark:fill-[#14110E]" />
        <circle cx="8" cy="10" r="1.8" fill="currentColor" />
        <circle cx="32" cy="10" r="1.8" fill="currentColor" />
        <path d="M4 10C5.5 8.5 6.5 8.5 8 10C6.5 11.5 5.5 11.5 4 10Z" fill="currentColor" />
        <path d="M36 10C34.5 8.5 33.5 8.5 32 10C33.5 11.5 34.5 11.5 36 10Z" fill="currentColor" />
      </svg>

      {/* Right Flourish Line */}
      <div className="flex items-center">
        <span className="w-12 sm:w-20 md:w-28 h-[1.5px] bg-[#B38738] dark:bg-[#E8C97E] opacity-85" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
      </div>
    </div>
  );
}

// Indian Traditional Jaali Lace Border disabled to keep layout clean without 3D lines
export function IndianJaaliBorder({ position = 'bottom', className = '' }) {
  return null;
}

// Background spline curves disabled to keep design clean without extra lines
export function RoyalBackgroundCurves() {
  return null;
}

/**
 * 4 Royal Traditional Mandala Corner Ornaments
 * Positioned in all 4 corners (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
 */
export function RoyalCornerOrnaments({ 
  size = 'w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32', 
  opacity = 'opacity-30 dark:opacity-35', 
  className = '' 
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}>
      {/* Top Left Corner */}
      <img
        src="/images/ornaments/royal_mandala_corner.png"
        alt="Royal Mandala Corner Top Left"
        className={`absolute top-0 left-0 ${size} -scale-x-100 -scale-y-100 ${opacity} transition-opacity`}
      />

      {/* Top Right Corner */}
      <img
        src="/images/ornaments/royal_mandala_corner.png"
        alt="Royal Mandala Corner Top Right"
        className={`absolute top-0 right-0 ${size} -scale-y-100 ${opacity} transition-opacity`}
      />

      {/* Bottom Left Corner */}
      <img
        src="/images/ornaments/royal_mandala_corner.png"
        alt="Royal Mandala Corner Bottom Left"
        className={`absolute bottom-0 left-0 ${size} -scale-x-100 ${opacity} transition-opacity`}
      />

      {/* Bottom Right Corner */}
      <img
        src="/images/ornaments/royal_mandala_corner.png"
        alt="Royal Mandala Corner Bottom Right"
        className={`absolute bottom-0 right-0 ${size} ${opacity} transition-opacity`}
      />
    </div>
  );
}

import React from 'react';

export default function EditorialBackgroundElements({
  variant = 'light', // 'light' | 'dark'
  position = 'top-right', // 'top-right' | 'bottom-left' | 'gutter-flank'
  className = '',
}) {
  const isLight = variant === 'light';
  const primaryOrange = '#FF1F02';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>

      {/* TOP-RIGHT MARGIN ANCHOR: Pure Minimal Sweeping Curve & Wave */}
      {position === 'top-right' && (
        <div className="absolute top-0 right-0 w-[300px] sm:w-[450px] lg:w-[500px] h-[300px] sm:h-[420px] pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smooth Edge-Flanking Orange Curve */}
            <path
              d="M 520 60 C 380 30, 310 160, 410 270 C 460 330, 480 380, 520 400"
              stroke={primaryOrange}
              strokeWidth="2"
              strokeOpacity={isLight ? "0.35" : "0.45"}
              strokeLinecap="round"
              fill="none"
            />

            {/* Squiggly Accent Wave Flourish */}
            <path
              d="M 310 35 Q 325 24, 340 35 T 370 35 T 400 35 T 430 35"
              stroke={primaryOrange}
              strokeWidth="1.8"
              strokeOpacity={isLight ? "0.4" : "0.5"}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* BOTTOM-LEFT MARGIN ANCHOR: Pure Minimal Sweeping Curve & Wave */}
      {position === 'bottom-left' && (
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[450px] lg:w-[500px] h-[300px] sm:h-[420px] pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smooth Edge-Flanking Orange Curve */}
            <path
              d="M -20 360 C 90 390, 160 270, 80 150 C 35 85, 10 30, -20 10"
              stroke={primaryOrange}
              strokeWidth="2"
              strokeOpacity={isLight ? "0.35" : "0.45"}
              strokeLinecap="round"
              fill="none"
            />

            {/* Squiggly Accent Wave Flourish */}
            <path
              d="M 170 380 Q 185 369, 200 380 T 230 380 T 260 380 T 290 380"
              stroke={primaryOrange}
              strokeWidth="1.8"
              strokeOpacity={isLight ? "0.4" : "0.5"}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      )}

    </div>
  );
}

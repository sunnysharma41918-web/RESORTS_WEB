import React from 'react';

export default function EditorialHeritageStamp({
  size = 140, // pixel diameter
  text = 'CHHR HOTELS & RESORTS • PRIVATE SANCTUARY • ',
  centerText = 'CHHR',
  year = '',
  className = '',
}) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-auto group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* 1. Rotating Circular SVG Stamp with Scalloped Outer Edge & Curved Text */}
      <svg
        className="w-full h-full animate-[spin_22s_linear_infinite] group-hover:[animation-play-state:paused]"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Circular Text Path */}
          <path
            id="stampCirclePath"
            d="M 80, 80 m -56, 0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
          />
        </defs>

        {/* Scalloped / Serrated Outer Stamp Ring in #FF1F02 */}
        <circle
          cx="80"
          cy="80"
          r="74"
          stroke="#FF1F02"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
        />

        {/* Inner Solid Border Ring */}
        <circle
          cx="80"
          cy="80"
          r="68"
          stroke="#FF1F02"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Rotating Circular Text */}
        <text
          fill="#FF1F02"
          fontSize="9.5"
          fontWeight="700"
          fontFamily="Manrope, sans-serif"
          letterSpacing="0.22em"
          className="uppercase"
        >
          <textPath
            href="#stampCirclePath"
            startOffset="0%"
            textLength={circumference * 0.95}
          >
            {text}
          </textPath>
        </text>
      </svg>

      {/* 2. Static Center Monogram & Year Badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-base sm:text-lg font-extrabold tracking-widest text-[#FF1F02] font-mono leading-none">
          {centerText}
        </span>
        {year ? (
          <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-[#FF1F02]/80 uppercase font-mono mt-1">
            {year}
          </span>
        ) : null}
      </div>
    </div>
  );
}

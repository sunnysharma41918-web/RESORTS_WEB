import React from 'react';

export default function ConnectingVisualSpine() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 9000"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vibrant Multi-Color Snake Body Gradient */}
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            {/* About (Top) */}
            <stop offset="0%" stopColor="#FF1F02" stopOpacity="0.85" />
            <stop offset="8%" stopColor="#FF1F02" stopOpacity="0.8" />
            {/* Story */}
            <stop offset="16%" stopColor="#EAB308" stopOpacity="0.8" />
            {/* Accommodation */}
            <stop offset="26%" stopColor="#16A34A" stopOpacity="0.8" />
            {/* Experiences */}
            <stop offset="38%" stopColor="#FF1F02" stopOpacity="0.85" />
            {/* Cinematic Journey */}
            <stop offset="50%" stopColor="#EAB308" stopOpacity="0.8" />
            {/* Dining */}
            <stop offset="62%" stopColor="#FF1F02" stopOpacity="0.85" />
            {/* Wellness */}
            <stop offset="74%" stopColor="#EAB308" stopOpacity="0.8" />
            {/* Location */}
            <stop offset="82%" stopColor="#16A34A" stopOpacity="0.8" />
            {/* Gallery & CTA */}
            <stop offset="92%" stopColor="#FF1F02" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF1F02" stopOpacity="0.9" />
          </linearGradient>

          {/* Glowing Aura Filter for Snake Body */}
          <filter id="snakeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Secondary Dashed Outer Trail Gradient */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF1F02" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#EAB308" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#16A34A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF1F02" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* 1. Secondary Delicate Dashed Shadow Trail */}
        <path
          d="
            M 1340, 300
            C 1480, 800 1180, 1300 240, 1800
            C -80, 2250 180, 2800 1280, 3300
            C 1520, 3800 1140, 4400 200, 4900
            C -100, 5350 200, 6000 1300, 6500
            C 1500, 7000 1100, 7600 220, 8100
            C -50, 8450 400, 8750 720, 8950
          "
          stroke="url(#trailGradient)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          fill="none"
        />

        {/* 2. Main Continuous Winding Snake Spline (Connecting Every Section) */}
        <path
          d="
            M 1300, 200
            C 1450, 700 1150, 1200 200, 1700
            C -120, 2150 150, 2700 1250, 3200
            C 1500, 3700 1100, 4300 160, 4800
            C -120, 5250 160, 5900 1260, 6400
            C 1480, 6900 1060, 7500 180, 8000
            C -80, 8380 350, 8700 720, 8900
          "
          stroke="url(#snakeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#snakeGlow)"
          fill="none"
        />

        {/* 3. Glowing Coordinate Scales & Waypoint Markers along the Snake's Body */}
        {/* Section 02 About Head */}
        <circle cx="1300" cy="200" r="5" fill="#FF1F02" />
        <circle cx="1300" cy="200" r="12" stroke="#FF1F02" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Section 03 Story Curve */}
        <circle cx="200" cy="1700" r="5" fill="#EAB308" />
        <circle cx="200" cy="1700" r="12" stroke="#EAB308" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Section 04 Accommodation Sweep */}
        <circle cx="1250" cy="3200" r="5" fill="#16A34A" />
        <circle cx="1250" cy="3200" r="12" stroke="#16A34A" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Section 05 Experiences Crest */}
        <circle cx="680" cy="4000" r="4" fill="#FF1F02" />
        <circle cx="680" cy="4000" r="10" stroke="#FF1F02" strokeWidth="1" strokeOpacity="0.35" />

        {/* Section 06 Cinematic Peak */}
        <circle cx="160" cy="4800" r="5" fill="#EAB308" />
        <circle cx="160" cy="4800" r="12" stroke="#EAB308" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Section 07 Dining Loop */}
        <circle cx="800" cy="5600" r="4" fill="#FF1F02" />
        <circle cx="800" cy="5600" r="10" stroke="#FF1F02" strokeWidth="1" strokeOpacity="0.35" />

        {/* Section 08 Wellness Arc */}
        <circle cx="1260" cy="6400" r="5" fill="#EAB308" />
        <circle cx="1260" cy="6400" r="12" stroke="#EAB308" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Section 09 Location Turn */}
        <circle cx="180" cy="8000" r="5" fill="#16A34A" />
        <circle cx="180" cy="8000" r="12" stroke="#16A34A" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Section 12 Final CTA Tail */}
        <circle cx="720" cy="8900" r="6" fill="#FF1F02" />
        <circle cx="720" cy="8900" r="14" stroke="#FF1F02" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}

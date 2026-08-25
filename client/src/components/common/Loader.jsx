import React from 'react';
import { cn } from '../../utils/cn';
import logoImg from '../../assets/images/hero/New Logo CHT.png';

export default function Loader({
  className = '',
  size = 'md',
  text = 'Sculpting Architectural Serenity',
  fullscreen = false,
}) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center p-6 space-y-6 text-center select-none', className)}>
      
      {/* Brand Logo with Ambient Cyan Glow */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-4 bg-sky-500/15 rounded-full blur-xl animate-pulse" />
        <img
          src={logoImg}
          alt="Country Holidays"
          className={cn(
            'w-auto object-contain brightness-110 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]',
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-16' : 'h-11 sm:h-12'
          )}
        />
      </div>

      {/* Hairline Cyan Gradient Loading Line */}
      <div className="w-44 sm:w-52 space-y-2">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-[shimmer_1.8s_infinite] shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
        </div>
      </div>

      {/* Narrative Subtitle */}
      {text && (
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/60 font-light animate-pulse">
          {text}
        </p>
      )}

    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070e17] text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="relative z-10">{content}</div>
      </div>
    );
  }

  return content;
}

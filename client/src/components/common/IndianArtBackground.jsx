import React from 'react';

/**
 * IndianArtBackground
 * Injects subtle, authentic Rajasthani palace jaali lattice,
 * mandala lotus motifs, and arch watermarks into section backgrounds.
 */
export default function IndianArtBackground({
  variant = 'jaali', // 'jaali' | 'mandala' | 'arch' | 'full'
  opacity = 'opacity-[0.04] dark:opacity-[0.06]',
  className = '',
  showMandala = true
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}>
      
      {/* 1. Seamless Indian Jaali Lattice Texture with Feathered Radial Mask */}
      {(variant === 'jaali' || variant === 'full') && (
        <div 
          className={`absolute inset-0 ${opacity} mix-blend-color-burn dark:mix-blend-screen transition-opacity duration-500`}
          style={{
            backgroundImage: `url('/images/art/indian_jaali_pattern.jpg')`,
            backgroundSize: '360px 360px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
          }}
        />
      )}

      {/* 1b. Distinctive Royal Indian Paisley & Lotus Damask Tapestry (For Accommodations & Suites) */}
      {(variant === 'paisley' || variant === 'damask') && (
        <div 
          className={`absolute inset-0 ${opacity} mix-blend-color-burn dark:mix-blend-screen transition-opacity duration-500`}
          style={{
            backgroundImage: `url('/images/art/indian_paisley_damask.jpg')`,
            backgroundSize: '340px 340px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 92%)',
          }}
        />
      )}

      {/* 2. Panoramic Indian Palace Arch Silhouette */}
      {(variant === 'arch' || variant === 'full') && (
        <div 
          className="absolute inset-x-0 bottom-0 h-96 opacity-[0.03] dark:opacity-[0.055] bg-bottom bg-no-repeat bg-cover mix-blend-color-burn dark:mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('/images/art/indian_palace_arch.jpg')`,
            maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          }}
        />
      )}

      {/* 3. Floating Royal Mandala Lotus Motif in Background with Soft Feathering */}
      {showMandala && (
        <>
          {/* Top-Right Floating Mandala */}
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 sm:w-[480px] sm:h-[480px] opacity-[0.035] dark:opacity-[0.06] mix-blend-color-burn dark:mix-blend-screen pointer-events-none transition-all duration-700"
            style={{
              backgroundImage: `url('/images/art/indian_royal_mandala.jpg')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 75%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 75%)',
            }}
          />

          {/* Bottom-Left Floating Mandala */}
          <div 
            className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-[420px] sm:h-[420px] opacity-[0.03] dark:opacity-[0.055] mix-blend-color-burn dark:mix-blend-screen pointer-events-none transition-all duration-700"
            style={{
              backgroundImage: `url('/images/art/indian_royal_mandala.jpg')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 75%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 75%)',
            }}
          />
        </>
      )}

      {/* Subtle Dark Gold Radial Vignette Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#B38738]/5 via-[#E8C97E]/3 to-transparent rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}

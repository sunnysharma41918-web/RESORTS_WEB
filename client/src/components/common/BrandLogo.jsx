import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/images/hero/country_holidays_logo.png';
import { cn } from '../../utils/cn';

/**
 * BrandLogo - Displays the new Country Holidays Hotels & Resorts logo
 * with smooth ambient rotating motion aura & starry circular orbital animations.
 */
export default function BrandLogo({
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  animated = true,
  showText = true,
  inverted = false,
}) {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12 lg:h-13',
    lg: 'h-14 sm:h-16 lg:h-18',
    xl: 'h-20 sm:h-24',
  };

  return (
    <div className={cn('relative inline-flex items-center gap-3 select-none group', className)}>
      {/* Outer Rotating Motion Orbital Ring */}
      {animated && (
        <div className="absolute -inset-1.5 pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full rounded-full border border-dashed border-[#EAB308]/30 group-hover:border-[#FF1F02]/60 transition-colors duration-500 scale-105"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dotted border-[#16A34A]/25 scale-120"
          />
        </div>
      )}

      {/* Main Logo Image with interactive hover pulse */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative z-10 flex items-center justify-center bg-white rounded-full p-1 shadow-md border border-[#E9E9DE]/60 overflow-hidden"
      >
        <img
          src={logoImg}
          alt="Country Holidays Hotels & Resorts"
          className={cn(
            'w-auto object-contain rounded-full transition-transform duration-500',
            sizeClasses[size] || sizeClasses.md
          )}
        />
      </motion.div>
    </div>
  );
}

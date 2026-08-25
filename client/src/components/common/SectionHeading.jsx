import React from 'react';
import { cn } from '../../utils/cn';

export default function SectionHeading({
  tagline,
  title,
  subtitle,
  align = 'left', // left, center, right
  className = '',
  light = false,
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('mb-10 md:mb-16 max-w-3xl', alignClasses[align], className)}>
      {tagline && (
        <span className="block text-xs md:text-sm font-medium tracking-luxury text-luxury-accent uppercase mb-3">
          {tagline}
        </span>
      )}
      {title && (
        <h2 className={cn(
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-tight',
          light ? 'text-luxury-light' : 'text-luxury-light'
        )}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-luxury-muted font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

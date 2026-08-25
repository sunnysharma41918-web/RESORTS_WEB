import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export default function LazyImage({
  src,
  alt = 'Luxury Showcase Image',
  className = '',
  aspect = 'aspect-[16/10]',
  loading = 'lazy',
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-luxury-stone', aspect, className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-700 ease-out',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        )}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-luxury-stone animate-pulse" />
      )}
    </div>
  );
}

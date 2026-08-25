import React from 'react';
import { cn } from '../../utils/cn';

export default function Skeleton({ className = '', variant = 'rectangular' }) {
  const variants = {
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
    circular: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-luxury-stone/60 animate-pulse border border-white/5',
        variants[variant],
        className
      )}
    />
  );
}

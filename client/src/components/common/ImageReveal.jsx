import React from 'react';
import LazyImage from './LazyImage';
import { cn } from '../../utils/cn';

export default function ImageReveal({ src, alt, className = '', aspect = 'aspect-cinematic', ...props }) {
  return (
    <div className={cn('relative overflow-hidden group', className)}>
      <LazyImage src={src} alt={alt} aspect={aspect} {...props} />
    </div>
  );
}

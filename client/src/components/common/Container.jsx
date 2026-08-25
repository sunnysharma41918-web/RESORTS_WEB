import React from 'react';
import { cn } from '../../utils/cn';

export default function Container({ children, className = '', fluid = false, ...props }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24',
        fluid ? 'max-w-none' : 'max-w-7xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

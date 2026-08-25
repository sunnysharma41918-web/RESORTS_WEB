import React from 'react';
import { cn } from '../../utils/cn';

export default function Section({
  children,
  className = '',
  id,
  dark = false,
  py = 'py-16 md:py-24 lg:py-32',
  ...props
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden',
        dark ? 'bg-luxury-black text-luxury-light' : 'bg-luxury-dark text-luxury-light',
        py,
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

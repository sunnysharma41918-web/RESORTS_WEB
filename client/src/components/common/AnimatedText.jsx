import React from 'react';
import { cn } from '../../utils/cn';

export default function AnimatedText({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={cn('transition-opacity duration-500', className)} {...props}>
      {children}
    </Component>
  );
}

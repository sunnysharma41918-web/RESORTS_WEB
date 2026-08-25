import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // primary, secondary, outline, text
  size = 'md', // sm, md, lg
  className = '',
  icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 disabled:opacity-50 select-none';
  
  const variants = {
    primary: 'bg-luxury-light text-luxury-black hover:bg-luxury-sand border border-luxury-light',
    secondary: 'bg-luxury-accent text-luxury-black hover:bg-luxury-accentHover border border-luxury-accent',
    outline: 'bg-transparent text-luxury-light border border-luxury-border hover:border-luxury-accent hover:text-luxury-accent',
    text: 'bg-transparent text-luxury-light hover:text-luxury-accent border-none underline-offset-4 hover:underline p-0',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 space-x-2',
    md: 'text-xs md:text-sm px-6 py-3 space-x-3',
    lg: 'text-sm md:text-base px-8 py-4 space-x-3',
  };

  const combinedClass = cn(
    baseStyles,
    variants[variant],
    variant !== 'text' ? sizes[size] : '',
    className
  );

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        <span>{children}</span>
        {icon && <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} target="_blank" rel="noopener noreferrer" {...props}>
        <span>{children}</span>
        {icon && <span className="inline-block">{icon}</span>}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass} {...props}>
      <span>{children}</span>
      {icon && <span className="inline-block">{icon}</span>}
    </button>
  );
}

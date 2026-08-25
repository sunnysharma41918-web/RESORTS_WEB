import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div
        className="fixed inset-0 bg-luxury-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-2xl bg-luxury-card border border-luxury-border p-6 sm:p-8 md:p-10 shadow-2xl text-luxury-light',
          className
        )}
      >
        <div className="flex items-center justify-between pb-6 border-b border-luxury-border">
          {title && <h3 className="text-xl sm:text-2xl font-serif text-luxury-light">{title}</h3>}
          <button
            onClick={onClose}
            className="p-2 text-luxury-muted hover:text-luxury-light transition-colors ml-auto"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-6 max-h-[75vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Lightbox() {
  const { lightboxState, closeLightbox, nextLightboxImage, prevLightboxImage } = useUI();
  const { isOpen, images, currentIndex } = lightboxState;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
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
  }, [isOpen, closeLightbox, nextLightboxImage, prevLightboxImage]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imgSrc = typeof currentImage === 'string' ? currentImage : currentImage?.image || currentImage?.src;
  const imgTitle = typeof currentImage === 'object' ? currentImage?.title || currentImage?.name : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/95 backdrop-blur-xl">
      {/* Close button */}
      <button
        onClick={closeLightbox}
        className="absolute top-6 right-6 z-20 p-3 text-luxury-muted hover:text-luxury-light hover:bg-white/5 rounded-full transition-all"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-6 z-20 text-xs uppercase tracking-luxury text-luxury-muted">
        <span>{currentIndex + 1}</span> / <span>{images.length}</span>
        {imgTitle && <span className="ml-4 text-luxury-light font-serif normal-case">{imgTitle}</span>}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevLightboxImage}
            className="absolute left-4 md:left-8 z-20 p-3 text-luxury-muted hover:text-luxury-light hover:bg-white/5 rounded-full transition-all"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextLightboxImage}
            className="absolute right-4 md:right-8 z-20 p-3 text-luxury-muted hover:text-luxury-light hover:bg-white/5 rounded-full transition-all"
            aria-label="Next Image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image Display */}
      <div className="relative max-w-5xl max-h-[85vh] w-full p-4 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={imgTitle || 'Enlarged Sanctuary View'}
          className="max-h-[80vh] max-w-full object-contain shadow-2xl select-none"
        />
      </div>
    </div>
  );
}

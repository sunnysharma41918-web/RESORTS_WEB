import React from 'react';
import Container from '../../../components/common/Container';
import LazyImage from '../../../components/common/LazyImage';

export default function HotelOverview({ hotel }) {
  if (!hotel) return null;

  return (
    <section className="py-20 md:py-32 bg-luxury-dark text-luxury-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-luxury-accent">
              Urban Architectural Profile
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
              METROPOLITAN ELEGANCE & QUIET SANCTUARY
            </h2>
            <p className="text-base text-luxury-muted font-light leading-relaxed">
              {hotel.description}
            </p>
          </div>

          <div className="lg:col-span-6">
            <LazyImage
              src={hotel.featuredImage || hotel.heroImage}
              alt={hotel.name}
              aspect="aspect-[16/11]"
              className="border border-luxury-border shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

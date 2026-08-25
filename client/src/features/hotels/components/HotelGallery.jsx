import React from 'react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import LazyImage from '../../../components/common/LazyImage';
import { useUI } from '../../../context/UIContext';

export default function HotelGallery({ gallery, hotelName }) {
  const { openLightbox } = useUI();
  const images = gallery || [];

  if (images.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-luxury-black text-luxury-light">
      <Container>
        <SectionHeading
          tagline="Visual Perspectives"
          title="HOTEL GALLERY"
          subtitle={`Curated imagery of ${hotelName}.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(images, idx)}
              className="cursor-pointer overflow-hidden border border-luxury-border group bg-luxury-stone"
            >
              <LazyImage
                src={img}
                alt={`${hotelName} view ${idx + 1}`}
                aspect="aspect-[16/11]"
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

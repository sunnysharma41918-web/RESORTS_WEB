import React, { useState, useEffect } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

const categories = ['ALL', 'ARCHITECTURE', 'VILLAS', 'WELLNESS', 'GASTRONOMY'];

const galleryItems = [
  {
    id: 1,
    title: 'High-Altitude Ridge Horizon',
    category: 'ARCHITECTURE',
    specs: 'Elevation 1,850m • Morning Mist',
    aspect: 'aspect-[16/10]',
    gridSpan: 'lg:col-span-8',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: 2,
    title: 'Cantilevered Slate Soaking Tub',
    category: 'VILLAS',
    specs: 'Forest Pool Villa • Private Deck',
    aspect: 'aspect-[3/4]',
    gridSpan: 'lg:col-span-4',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 3,
    title: 'Sommelier Subterranean Cellar',
    category: 'GASTRONOMY',
    specs: 'Biodynamic Vintages • Natural Stone',
    aspect: 'aspect-[4/5]',
    gridSpan: 'lg:col-span-4',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 4,
    title: 'Geothermal Mineral Thermal Spa',
    category: 'WELLNESS',
    specs: 'Sound Therapy • 38°C Spring Water',
    aspect: 'aspect-[16/10]',
    gridSpan: 'lg:col-span-8',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: 5,
    title: '500-Acre Wildlife Pine Corridor',
    category: 'ARCHITECTURE',
    specs: 'Zero-Emission Conservation Zone',
    aspect: 'aspect-square',
    gridSpan: 'lg:col-span-4',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 6,
    title: 'Monolith Stargazing Sky-Roof Chalet',
    category: 'VILLAS',
    specs: 'Heated Timber • Panoramic Ridge Views',
    aspect: 'aspect-[16/9]',
    gridSpan: 'lg:col-span-8',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90',
  },
];

export default function ResortGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = selectedCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Graphic Elements */}
      <EditorialBackgroundElements variant="light" position="top-right" />

      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">

        {/* Section Header with Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>08 — GALLERY</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                THE LIVING <br />
                GALLERY.
              </h2>
            </ScrollReveal>
          </div>

          {/* Editorial Category Filter Tabs */}
          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = cat === selectedCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#0E0E0E] text-white'
                        : 'border border-[#E9E9DE] text-[#0E0E0E]/70 hover:border-[#0E0E0E] hover:text-[#0E0E0E] bg-white/40'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Staggered Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className={`w-full ${item.gridSpan} group cursor-pointer`}
              onClick={() => setLightboxIndex(idx)}
              data-cursor="VIEW"
            >
              <ScrollReveal direction="clip" delay={idx * 60}>
                <div className={`relative overflow-hidden ${item.aspect} border border-[#E9E9DE] bg-[#FAFDF2] shadow-sm`}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Corner Expand Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#0E0E0E] flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Metadata Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] block font-bold">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold uppercase tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-white/70">
                      {item.specs}
                    </span>
                  </div>
                </div>

                {/* Subtitle Caption Below Image */}
                <div className="pt-3 flex items-baseline justify-between text-xs border-b border-[#E9E9DE] pb-2">
                  <span className="font-bold uppercase tracking-tight text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#0E0E0E]/50 uppercase tracking-widest">
                    0{item.id}
                  </span>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Full-Screen Navigation */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 border border-white/30 text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next Arrow Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Display */}
          <div
            className="max-w-5xl w-full max-h-[85vh] relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].url}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain border border-[#333333]"
            />
            <div className="mt-4 flex items-center justify-between w-full text-white text-xs font-mono">
              <span className="text-[#FF1F02] uppercase font-bold">
                {filteredItems[lightboxIndex].category} • 0{filteredItems[lightboxIndex].id}
              </span>
              <span className="uppercase font-bold">{filteredItems[lightboxIndex].title}</span>
              <span className="text-white/60">{filteredItems[lightboxIndex].specs}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

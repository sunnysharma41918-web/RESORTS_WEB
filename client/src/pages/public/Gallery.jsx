import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Maximize2, ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';

const galleryCollection = [
  {
    id: 1,
    title: 'High-Altitude Sunrise Ridge Horizon',
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
    specs: 'Forest Pool Villa • Private Cedar Deck',
    aspect: 'aspect-[3/4]',
    gridSpan: 'lg:col-span-4',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 3,
    title: 'Sommelier Subterranean Cellar',
    category: 'GASTRONOMY',
    specs: 'Biodynamic Vintages • Natural Rock Vault',
    aspect: 'aspect-[4/5]',
    gridSpan: 'lg:col-span-4',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 4,
    title: 'Geothermal Mineral Thermal Lagoon',
    category: 'WELLNESS',
    specs: 'Sound Therapy • 38°C Spring Water',
    aspect: 'aspect-[16/10]',
    gridSpan: 'lg:col-span-8',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: 5,
    title: '500-Acre Wildlife Pine Corridor',
    category: 'LANDSCAPES',
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
  {
    id: 7,
    title: 'High-Mountain Ridge Panorama',
    category: 'LANDSCAPES',
    specs: 'Himalayan Ridge Crest • 360° Panorama',
    aspect: 'aspect-[16/10]',
    gridSpan: 'lg:col-span-6',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=90',
  },
  {
    id: 8,
    title: 'Sunset Rock Slowhouse Terrace',
    category: 'ARCHITECTURE',
    specs: 'Hand-Carved Stone • Suspended Deck',
    aspect: 'aspect-[16/10]',
    gridSpan: 'lg:col-span-6',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=90',
  },
];

const categories = ['ALL', 'ARCHITECTURE', 'VILLAS', 'GASTRONOMY', 'WELLNESS', 'LANDSCAPES'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = selectedCategory === 'ALL'
    ? galleryCollection
    : galleryCollection.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="w-full bg-[#1C1C1C] text-white overflow-hidden font-manrope">

      {/* 1. HERO BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b border-[#333333] overflow-hidden select-none">
        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3000&q=90"
            alt="Sanctuary Visual Gallery"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>THE LIVING VISUAL ARCHIVE</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8.5rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              THE ART OF <br />
              ARCHITECTURAL <br />
              <span className="text-art-trio">PERSPECTIVE.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-2xl mx-auto leading-relaxed">
              A curated photographic portrait of mountain mist, native slate architecture, and unhurried stillness across our 500-acre sanctuary.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● CURATED COLLECTION</span>
          <span>HIGH-RESOLUTION ARCHIVE</span>
          <span>EST. 2026</span>
        </div>
      </section>


      {/* 2. MAIN GALLERY SECTION IN IVORY (#FAFDF2) */}
      <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">

          {/* Section Header with Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>01 — VISUAL CURATION</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                  THE LIVING <br />
                  GALLERY.
                </h2>
              </ScrollReveal>
            </div>

            {/* Filter Tabs */}
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

          {/* Asymmetrical Staggered Collage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`w-full ${item.gridSpan} group cursor-pointer`}
                onClick={() => setLightboxIndex(idx)}
                data-cursor="VIEW"
              >
                <ScrollReveal direction="clip" delay={idx * 60}>
                  
                  {/* Image Frame */}
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

                  {/* Caption Below Image */}
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

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 border border-white/30 text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % filtered.length);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="max-w-5xl w-full max-h-[85vh] relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain border border-[#333333]"
              />
              <div className="mt-4 flex items-center justify-between w-full text-white text-xs font-mono">
                <span className="text-[#FF1F02] uppercase font-bold">
                  {filtered[lightboxIndex].category} • 0{filtered[lightboxIndex].id}
                </span>
                <span className="uppercase font-bold">{filtered[lightboxIndex].title}</span>
                <span className="text-white/60">{filtered[lightboxIndex].specs}</span>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* 3. FINAL INVITATION CTA IN PURE BLACK */}
      <section className="relative bg-[#000000] text-white py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHTR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHTR" year="EST 2026" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>02 — IMMERSE YOURSELF</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
              EXPERIENCE <br />
              IT LIVE.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Photographs capture the geometry, but only being here reveals the profound stillness and scent of cedar hearths.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/resorts"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
                >
                  <span>EXPLORE RESIDENCES</span>
                  <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300"
                >
                  <span>CONNECT CONCIERGE</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
              <span>● 500-ACRE ESTATE</span>
              <span>● HIGH HIMALAYAN RIDGE</span>
              <span>● PRIVACY GUARANTEED</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}

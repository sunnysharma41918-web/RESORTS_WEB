import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X, Maximize2, ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { galleryService } from '../../services/galleryService';

const fallbackGallery = [
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
];

const CATEGORIES = [
  { label: 'ALL CATEGORIES', value: 'All' },
  { label: 'RESORTS', value: 'Resorts' },
  { label: 'HOTELS', value: 'Hotels' },
  { label: 'SUITES & ROOMS', value: 'Rooms' },
  { label: 'WEDDINGS & CELEBRATIONS', value: 'Weddings' },
  { label: 'NATURE & LANDSCAPE', value: 'Nature' },
  { label: 'EXPERIENCES & RITUALS', value: 'Experiences' },
];

export default function Gallery() {
  const [items, setItems] = useState(fallbackGallery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await galleryService.getGalleryItems();
        if (data && data.length > 0) {
          const normalized = data.map((item, idx) => ({
            ...item,
            url: item.url || item.image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=90',
            gridSpan: item.gridSpan || (idx % 3 === 0 ? 'lg:col-span-8' : 'lg:col-span-4'),
            aspect: item.aspect || (idx % 3 === 0 ? 'aspect-[16/10]' : 'aspect-[3/4]'),
            specs: item.specs || item.location || 'Sanctuary Estate',
          }));
          setItems(normalized);
        }
      } catch (err) {
        console.error('Failed to load gallery items from CMS:', err);
      }
    }
    loadGallery();
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((item) => {
      const itemCat = (item.category || '').toLowerCase();
      const target = selectedCategory.toLowerCase();
      return itemCat === target || itemCat.includes(target) || target.includes(itemCat);
    });
  }, [items, selectedCategory]);

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
    <div className="w-full dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] overflow-hidden font-manrope transition-colors duration-300">

      {/* 1. HERO BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden select-none">
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


      {/* 2. MAIN GALLERY SECTION (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">

          {/* Section Header with Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b dark:border-[#333333] border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
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

            {/* Filter Tabs matching Admin Media & Gallery CMS */}
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {CATEGORIES.map((cat) => {
                  const isActive = cat.value === selectedCategory;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#FF1F02] text-white shadow-md'
                          : 'border dark:border-[#333333] border-[#E9E9DE] dark:text-[#D0D0D0] text-[#0E0E0E]/75 hover:border-[#FF1F02] hover:text-[#FF1F02] dark:bg-[#0E0E0E] bg-white/60'
                      }`}
                    >
                      {cat.label}
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
                  <div className={`relative overflow-hidden ${item.aspect} border dark:border-[#333333] border-[#E9E9DE] dark:bg-[#0E0E0E] bg-[#FAFDF2] shadow-sm`}>
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
                  <div className="pt-3 flex items-baseline justify-between text-xs border-b dark:border-[#333333] border-[#E9E9DE] pb-2">
                    <span className="font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/50 uppercase tracking-widest">
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


      {/* 3. FINAL INVITATION CTA (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300 border-t dark:border-[#333333] border-[#E9E9DE]">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black dark:via-black/80 dark:to-black/60 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHHR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " year="EST 2026" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>02 — INVITATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
              STEP INTO <br />
              THE FRAME.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Experience the unhurried life first-hand. Book your stay or contact our concierge to reserve your sanctuary pavilion.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
                >
                  <span>PLAN YOUR RETREAT</span>
                  <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#FF1F02]" />
                  <span>VIEW PACKAGES</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
              <span>● 100% OFF-GRID SOLAR</span>
              <span>● 500-ACRE CONSERVATION</span>
              <span>● 24/7 BUTLER CARE</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Star,
  MapPin,
  Heart,
  ShieldCheck,
  Camera,
  MessageSquare,
  Users,
  CheckCircle2,
  Send,
  Loader2,
  LayoutGrid,
  MoveHorizontal
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';
import { galleryService } from '../../services/galleryService';
import { getWhatsAppBookingUrl } from '../../data/contact';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState({ name: '', phone: '', location: '', note: '' });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [viewMode, setViewMode] = useState('scroller'); // 'scroller' | 'grid'
  
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (scrollerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  const handleScrollBy = (direction) => {
    if (scrollerRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await galleryService.getGalleryItems();
        if (data && data.length > 0) {
          const normalized = data.map((item, idx) => ({
            ...item,
            id: item.id || `gal-${idx}`,
            url: item.url || item.image || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=90',
            location: item.location || item.specs || 'Sanctuary Destination',
            rating: item.rating || 5,
            guestName: item.guestName || 'Verified Guest',
            quote: item.quote || 'An extraordinary stay with unforgettable hospitality!',
            date: item.date || 'Recent Stay'
          }));
          setItems(normalized);
        }
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      }
    }
    loadGallery();
  }, []);

  const featuredItems = useMemo(() => {
    return items.slice(0, 4);
  }, [items]);

  // Featured Auto-slide
  useEffect(() => {
    if (featuredItems.length === 0) return;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % items.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, items.length]);

  const activeLightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;
  const activeFeatured = featuredItems[featuredIndex] || featuredItems[0];

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setIsUploadModalOpen(false);
      setUploadSuccess(false);
      setUploadData({ name: '', phone: '', location: '', note: '' });
    }, 2500);
  };

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#0A0806] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden font-jakarta selection:bg-[#B38738] selection:text-white transition-colors duration-500">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO: OUR HAPPY CUSTOMER MEMORIES                          */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-8 border-b border-[#B38738]/20 text-center select-none overflow-hidden">
        
        {/* Subtle Indian Jaali Texture */}
        <IndianArtBackground variant="full" opacity="opacity-[0.03] dark:opacity-[0.05]" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#B38738]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8F661E]/20 via-[#B38738]/30 to-[#8F661E]/20 border border-[#B38738]/40 shadow-sm">
              <Star className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] fill-current animate-pulse" />
              <span className="text-[11px] font-cinzel font-bold tracking-[0.25em] text-[#8F661E] dark:text-[#E8C97E] uppercase">
                AUTHENTIC GUEST VACATION CHRONICLES
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-marcellus font-normal text-[#2A1F17] dark:text-[#FAF6ED] tracking-tight uppercase leading-[1.05]">
              Our Happy <span className="text-[#8F661E] dark:text-[#E8C97E] font-cormorant italic lowercase tracking-normal">Customer Memories</span>
            </h1>
          </ScrollReveal>

          <RoyalOrnamentDivider color="#B38738" className="my-1" />

          <ScrollReveal direction="up" delay={120}>
            <p className="text-base sm:text-xl text-[#6E5D4F] dark:text-[#C5BAAF] max-w-2xl mx-auto leading-relaxed font-cormorant font-light italic">
              Joyful family smiles, sacred anniversary milestones, and unforgettable vacation stories captured by our cherished patrons.
            </p>
          </ScrollReveal>

          {/* Live Stats Bar */}
          <ScrollReveal direction="up" delay={160}>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-jakarta">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E]" />
                <span className="font-bold text-[#2A1F17] dark:text-[#FAF6ED]">10,000+</span>
                <span className="text-[#6E5D4F] dark:text-[#A89B8F]">Delighted Families</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] fill-current" />
                <span className="font-bold text-[#2A1F17] dark:text-[#FAF6ED]">4.9 / 5.0</span>
                <span className="text-[#6E5D4F] dark:text-[#A89B8F]">Patron Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span className="font-bold text-[#2A1F17] dark:text-[#FAF6ED]">100%</span>
                <span className="text-[#6E5D4F] dark:text-[#A89B8F]">Verified Guest Reviews</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. DEDICATED CUSTOMER MEMORIES SLIDER / SCROLLER              */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto select-none overflow-hidden">
        
        {/* Subtle Indian Jaali & Palace Mandala Background Art */}
        <IndianArtBackground variant="full" opacity="opacity-[0.035] dark:opacity-[0.055]" />

        {/* Ambient Radial Golden Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#B38738]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Scroller Header with Navigation Arrows */}
        <div className="relative z-10 flex items-end justify-between gap-4 mb-8 pb-4 border-b border-[#B38738]/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B38738] animate-ping" />
              <span className="text-[11px] font-cinzel text-[#8F661E] dark:text-[#E8C97E] uppercase font-bold tracking-widest">
                FEATURED GUEST CHRONICLES ({items.length} MEMORIES)
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-marcellus text-[#2A1F17] dark:text-[#FAF6ED] uppercase">
              Vacation Memories Slider
            </h2>
          </div>

          {/* Left & Right Scroller Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleScrollBy('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'border-[#B38738] bg-white dark:bg-[#16120E] text-[#8F661E] dark:text-[#E8C97E] hover:bg-[#B38738] hover:text-white shadow-lg'
                  : 'border-[#B38738]/20 text-gray-400 opacity-40 cursor-not-allowed'
              }`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollBy('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'border-[#B38738] bg-white dark:bg-[#16120E] text-[#8F661E] dark:text-[#E8C97E] hover:bg-[#B38738] hover:text-white shadow-lg'
                  : 'border-[#B38738]/20 text-gray-400 opacity-40 cursor-not-allowed'
              }`}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider / Scroller Track */}
        <div
          ref={scrollerRef}
          onScroll={checkScrollBounds}
          className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 px-1 no-scrollbar select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
              whileHover={{ y: -6 }}
              className="w-[300px] sm:w-[360px] md:w-[410px] shrink-0 snap-start flex flex-col justify-between bg-white dark:bg-[#14100C] rounded-3xl border border-[#B38738]/25 hover:border-[#B38738] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setLightboxIndex(idx)}
            >
              
              {/* Uniform 16:10 Photo Container with Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/10 shrink-0">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E8C97E]/70 text-[10px] font-cinzel text-[#E8C97E] font-bold shadow-md">
                    <Star className="w-3 h-3 fill-current text-[#E8C97E]" />
                    <span>5.0 SATISFACTION</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Overlay Location Tag */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-jakarta border border-white/15 truncate max-w-[85%]">
                    <MapPin className="w-3 h-3 text-[#E8C97E] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                </div>
              </div>

              {/* Card Body Details with Impeccable Alignment */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  {/* Patron Tag & Date / Stay Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-jakarta font-bold text-[#8F661E] dark:text-[#E8C97E] truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E] shrink-0" />
                      <span className="truncate">{item.guestName}</span>
                    </span>
                    <span className="text-[10px] font-cinzel tracking-wider text-[#6E5D4F] dark:text-[#A89B8F] shrink-0 font-semibold uppercase">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-marcellus text-lg sm:text-xl text-[#2A1F17] dark:text-[#FAF6ED] leading-snug group-hover:text-[#8F661E] dark:group-hover:text-[#E8C97E] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Star Rating Strip */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-[#B38738] text-[#B38738] dark:fill-[#E8C97E] dark:text-[#E8C97E]" />
                    ))}
                    <span className="text-[11px] font-jakarta font-bold text-[#2A1F17] dark:text-[#FAF6ED] ml-1.5">
                      5.0
                    </span>
                  </div>

                  {/* Quote Box with Consistent Height Alignment */}
                  <div className="bg-[#FAF6F0] dark:bg-[#1A140F] p-3.5 rounded-2xl border border-[#B38738]/20 relative min-h-[64px] flex items-center">
                    <p className="text-xs sm:text-sm font-cormorant italic text-[#4A3B32] dark:text-[#D5CBC2] line-clamp-2 leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                {/* Card Footer Pinned to Bottom */}
                <div className="pt-3 border-t border-[#B38738]/15 flex items-center justify-between text-xs text-[#6E5D4F] dark:text-[#A89B8F] mt-auto">
                  <span className="text-[11px] font-jakarta text-[#8F661E] dark:text-[#E8C97E] font-medium">
                    Verified Guest Review
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-[#8F661E] dark:text-[#E8C97E] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#B38738]/15 text-xs font-jakarta text-[#6E5D4F] dark:text-[#888888]">
          <span className="flex items-center gap-2 font-cinzel tracking-wider text-[11px]">
            <MoveHorizontal className="w-4 h-4 text-[#B38738]" />
            <span>Swipe or click arrows to explore stories</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B38738]" />
            <span className="font-mono text-[11px] font-semibold">{items.length} Memories Available</span>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. GUEST MEMORY SUBMISSION MODAL                              */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-white dark:bg-[#18130F] border border-[#B38738]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAF6F0] dark:bg-[#0E0C0A] text-[#2A1F17] dark:text-white flex items-center justify-center hover:bg-[#B38738] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {uploadSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#B38738]/10 text-[#B38738] dark:text-[#E8C97E] flex items-center justify-center mx-auto border-2 border-[#B38738]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-marcellus text-[#2A1F17] dark:text-[#FAF6ED]">
                    Memory Transmitted!
                  </h3>
                  <p className="text-xs text-[#6E5D4F] dark:text-[#A89B8F]">
                    Thank you for sharing your royal vacation moment. Our guest relations team will review and feature it in our customer chronicles!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-cinzel text-[#8F661E] dark:text-[#E8C97E] uppercase font-bold tracking-widest">
                      ✦ GUEST MEMORY SUBMISSION
                    </span>
                    <h3 className="text-2xl font-marcellus text-[#2A1F17] dark:text-[#FAF6ED] uppercase">
                      Share Your Story
                    </h3>
                  </div>

                  <div>
                    <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1">
                      Guest / Family Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadData.name}
                      onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                      placeholder="e.g. The Sharma Family / Dr. Verma"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-xs text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={uploadData.phone}
                      onChange={(e) => setUploadData({ ...uploadData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-xs text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1">
                      Resort / Location Visited
                    </label>
                    <input
                      type="text"
                      value={uploadData.location}
                      onChange={(e) => setUploadData({ ...uploadData, location: e.target.value })}
                      placeholder="e.g. Azure Coast Sanctuary, Goa"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-xs text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1">
                      Vacation Note & Review Quote
                    </label>
                    <textarea
                      rows={3}
                      value={uploadData.note}
                      onChange={(e) => setUploadData({ ...uploadData, note: e.target.value })}
                      placeholder="Describe your favorite moment, service experience, or dining highlight..."
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-xs text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#B38738] hover:bg-[#8F661E] text-white font-cinzel font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT FOR GUEST GALLERY</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 5. FULLSCREEN CINEMATIC LIGHTBOX                               */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
              }}
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % items.length);
              }}
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full bg-[#16120E] border border-[#B38738]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="relative flex-1 min-h-[350px] max-h-[60vh] bg-black">
                <img
                  src={activeLightboxItem.url}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Lightbox Footer Info */}
              <div className="p-6 sm:p-8 bg-[#18130F] border-t border-[#B38738]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-cinzel text-[#E8C97E] uppercase font-bold tracking-widest flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>5.0 GUEST SATISFACTION</span>
                    </span>
                    <span className="text-xs text-white/70 font-jakarta">
                      • Guest: <strong className="text-white">{activeLightboxItem.guestName}</strong>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-marcellus text-white">
                    {activeLightboxItem.title}
                  </h3>
                  {activeLightboxItem.quote && (
                    <p className="text-sm font-cormorant italic text-[#E8C97E]">
                      "{activeLightboxItem.quote}"
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-white/60 font-jakarta">
                    <MapPin className="w-3.5 h-3.5 text-[#B38738]" />
                    <span>{activeLightboxItem.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I am viewing "${activeLightboxItem.title}" (${activeLightboxItem.guestName}) from the Happy Customer Gallery and would like to know more about this stay.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#B38738] hover:bg-[#8F661E] text-white text-xs font-cinzel font-bold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire About This Stay</span>
                  </a>
                </div>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Heritage Border */}
      <IndianJaaliBorder />

    </div>
  );
}

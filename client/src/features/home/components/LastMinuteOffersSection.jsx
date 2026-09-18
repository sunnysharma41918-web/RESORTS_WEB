import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Check,
  Calendar,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';

// Curated Last Minute Stays & Sanctuary Offers matching reference UI
export const LAST_MINUTE_OFFERS = [
  {
    id: 1,
    name: 'Bella Vista Resort',
    stars: 3,
    location: 'Miami',
    destination: 'Coastal Sanctuary',
    price: '$ 56',
    priceInr: '₹ 4,650',
    unit: 'night',
    originalPrice: '$ 95',
    discountBadge: '41% OFF',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
    description: 'Bright ocean-view modern master suite with private balcony, breakfast buffet, and beach club access.',
    amenities: ['Ocean Balcony', 'Free WiFi', 'Complimentary Breakfast', 'Beach Access'],
  },
  {
    id: 2,
    name: 'Island Palace hotel',
    stars: 4,
    location: 'Ibiza',
    destination: 'Turquoise Bay',
    price: '$ 180',
    priceInr: '₹ 14,900',
    unit: 'night',
    originalPrice: '$ 260',
    discountBadge: '30% OFF',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85',
    description: 'Cliffside luxury infinity pool villa overlooking the Mediterranean blue waters with sunset terrace lounge.',
    amenities: ['Private Infinity Pool', 'Spa Access', 'Sunset Terrace', 'Cocktail Lounge'],
  },
  {
    id: 3,
    name: 'Serenity Cove Hotel',
    stars: 5,
    location: 'New York',
    destination: 'Urban Retreat',
    price: '$ 240',
    priceInr: '₹ 19,800',
    unit: 'night',
    originalPrice: '$ 350',
    discountBadge: '31% OFF',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85',
    description: 'Ultra-contemporary architectural sanctuary with indoor thermal pool, gold-leaf acoustics, and wellness lounge.',
    amenities: ['Thermal Spa Pool', 'Fine Dining', '24/7 Butler', 'City Skyline View'],
  },
  {
    id: 4,
    name: 'White Sea Hotel',
    stars: 5,
    location: 'Toronto',
    destination: 'Lakeside Skyline',
    price: '$ 380',
    priceInr: '₹ 31,500',
    unit: 'night',
    originalPrice: '$ 520',
    discountBadge: 'POPULAR CHOICE',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=85',
    description: 'Heated open-air rooftop infinity pool overlooking modern high-rise architecture with private sun loungers.',
    amenities: ['Rooftop Infinity Pool', 'Heated Daybeds', 'Michelin Chef Dining', 'VIP Airport Transfer'],
  },
  {
    id: 5,
    name: 'LuxEco',
    stars: 4,
    location: 'New York',
    destination: 'Nordic Forest Hills',
    price: '$ 324',
    priceInr: '₹ 26,900',
    unit: 'night',
    originalPrice: '$ 440',
    discountBadge: 'ECO LUXURY',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=85',
    description: 'Minimalist warm timber aesthetic penthouse with floor-to-ceiling glass panoramic windows and smart climate suite.',
    amenities: ['Panoramic Glass Walls', 'Organic Spa Menu', 'Forest Trail Access', 'Zero-Carbon Stay'],
  },
  {
    id: 6,
    name: 'Royal Heritage Palace',
    stars: 5,
    location: 'Udaipur',
    destination: 'Lake Pichola',
    price: '$ 290',
    priceInr: '₹ 24,000',
    unit: 'night',
    originalPrice: '$ 410',
    discountBadge: 'ROYAL HERITAGE',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=85',
    description: 'Authentic marble archways, jharokha balconies, boat transfer across Pichola lake, and private royal dining.',
    amenities: ['Lake View Jharokha', 'Private Royal Boat', 'Live Classical Sitar', 'Heritage Courtyard'],
  },
  {
    id: 7,
    name: 'Himalayan Pine Chalet',
    stars: 5,
    location: 'Manali',
    destination: 'Solang Valley',
    price: '$ 165',
    priceInr: '₹ 13,700',
    unit: 'night',
    originalPrice: '$ 250',
    discountBadge: 'MOUNTAIN ESCAPE',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=85',
    description: 'Cedar wood winter chalet surrounded by snow-capped peaks, stone fireplace, and alpine stargazing deck.',
    amenities: ['Stone Fireplace', 'Stargazing Deck', 'Heated Floors', 'Guided Mountain Treks'],
  },
];

export default function LastMinuteOffersSection() {
  const [selectedOffer, setSelectedOffer] = useState(LAST_MINUTE_OFFERS[3]); // White Sea Hotel selected by default as in reference image
  const [activeModalOffer, setActiveModalOffer] = useState(null);
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-14 dark:bg-[#0D1017] bg-[#FAFAFA] text-[#1B1B16] dark:text-white font-manrope transition-colors duration-300 overflow-hidden">
      
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER BAR: "Last minute offers"                                          */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
              Last minute offers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal">
              Handpicked luxury stays &amp; special discounted escapes available for immediate reservation.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL CARD CAROUSEL (EXACT DESIGN AS USER IMAGE)                     */}
        {/* ========================================================================= */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-3 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {LAST_MINUTE_OFFERS.map((hotel) => {
            const isSelected = selectedOffer?.id === hotel.id;

            return (
              <motion.div
                key={hotel.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedOffer(hotel)}
                className={`w-[260px] sm:w-[280px] lg:w-[290px] shrink-0 rounded-2xl bg-white dark:bg-[#141923] cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-[#1E88E5] ring-4 ring-[#1E88E5]/15 shadow-2xl scale-[1.03] -translate-y-2'
                    : 'border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {/* Hotel Image (Top Rounded) */}
                <div className="relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  {hotel.discountBadge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                      {hotel.discountBadge}
                    </div>
                  )}
                </div>

                {/* Hotel Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-1.5">
                    {/* Hotel Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white leading-snug">
                      {hotel.name}
                    </h3>

                    {/* Star Rating Icons */}
                    <div className="flex items-center gap-1 text-[#111827] dark:text-gray-200">
                      {Array.from({ length: hotel.stars }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className="w-3.5 h-3.5 fill-current text-gray-900 dark:text-gray-200"
                        />
                      ))}
                    </div>

                    {/* Location Name */}
                    <div className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400 pt-1">
                      {hotel.location}
                    </div>

                    {/* Price per night */}
                    <div className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white pt-0.5">
                      {hotel.price}{' '}
                      <span className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
                        {hotel.unit}
                      </span>
                    </div>
                  </div>

                  {/* "View more" Blue Outline Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalOffer(hotel);
                      }}
                      className="w-full py-2.5 px-4 rounded-lg border border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white dark:hover:text-white text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      <span>View more</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* QUICK VIEW DETAILS MODAL                                                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModalOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
            onClick={() => setActiveModalOffer(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#121622] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={activeModalOffer.image}
                  alt={activeModalOffer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                <button
                  type="button"
                  onClick={() => setActiveModalOffer(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {Array.from({ length: activeModalOffer.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
                    {activeModalOffer.name}
                  </h3>
                  <span className="text-sm text-white/80">
                    📍 {activeModalOffer.location} • {activeModalOffer.destination}
                  </span>
                </div>
              </div>

              {/* Modal Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-[#1E88E5] font-bold mb-1">
                    Sanctuary Highlights
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                    {activeModalOffer.description}
                  </p>
                </div>

                {/* Key Amenities Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {activeModalOffer.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200"
                    >
                      <Check className="w-3.5 h-3.5 text-[#1E88E5] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Booking Footer */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      Special Rate
                    </span>
                    <div className="text-2xl font-black text-[#0F172A] dark:text-white">
                      {activeModalOffer.price}{' '}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        /{activeModalOffer.unit} ({activeModalOffer.priceInr})
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/celebrations#inquiry"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E88E5] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <span>Reserve Stay Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

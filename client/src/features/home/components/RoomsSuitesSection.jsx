import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  Building2, 
  Palmtree, 
  Sparkles, 
  Mountain, 
  Check, 
  Crown,
  Waves
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder, RoyalBackgroundCurves } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';
import { getWhatsAppBookingUrl } from '../../../data/contact';
import { accommodationService } from '../../../services/accommodationService';

const ROYAL_ROOM_CATEGORIES = [
  { id: 'all', label: 'All Rooms' },
  { id: 'deluxe', label: 'Deluxe' },
  { id: 'executive', label: 'Executive' },
  { id: 'royal', label: 'Royal' },
];

const DEFAULT_ROOMS_DATA = [
  {
    id: '1',
    category: 'royal',
    title: 'Maharaja Royal Palace Suite',
    subtitle: 'Palatial Courtyards & Private Plunge Pool',
    price: '₹ 5,450 / night',
    occupancy: '2 Adults, 1 Child',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Hand-Carved Jharokha', 'Jacuzzi Plunge', '24/7 Butler', 'Royal Breakfast'],
    link: '/hotels',
  },
  {
    id: '2',
    category: 'executive',
    title: 'Heritage Executive Pavilion',
    subtitle: 'Forest Valley & Horizon Terrace',
    price: '₹ 4,250 / night',
    occupancy: '2 Adults',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Panoramic Horizon', 'Plush King Bedding', 'Espresso Lounge', 'High-Speed Wi-Fi'],
    link: '/resorts',
  },
  {
    id: '3',
    category: 'deluxe',
    title: 'Grand Deluxe Courtyard Room',
    subtitle: 'Classic Marble Hearth & Garden View',
    price: '₹ 3,450 / night',
    occupancy: '2 Adults',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Marble Bathroom', 'Garden Verandah', 'In-Room Dining', 'Climate Control'],
    link: '/hotels',
  },
  {
    id: '4',
    category: 'royal',
    title: 'Himalayan Cloud Chalet Suite',
    subtitle: 'Panoramic Skyroof & Cedar Hearth',
    price: '₹ 6,250 / night',
    occupancy: '2 Adults, 2 Children',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Glass Skyroof', 'Private Cedar Hearth', 'Stargazing Balcony', 'Heated Floors'],
    link: '/resorts',
  },
  {
    id: '5',
    category: 'executive',
    title: 'Azure Oceanfront Sunset Villa',
    subtitle: 'Private Sandy Deck & Infinity Horizon',
    price: '₹ 4,950 / night',
    occupancy: '2 Adults',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Direct Beach Access', 'Infinity Pool', 'Seafood Grill', 'Sundeck Lounge'],
    link: '/resorts',
  },
  {
    id: '6',
    category: 'deluxe',
    title: 'Ayurvedic Sanctuary Forest Suite',
    subtitle: 'Surrounded by Ancient Flora & Waterfalls',
    price: '₹ 3,850 / night',
    occupancy: '2 Adults',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Herbal Spa Access', 'Zen Verandah', 'Organic Breakfast', 'Yoga Lawn'],
    link: '/hotels',
  },
];

export default function RoomsSuitesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [rooms, setRooms] = useState(DEFAULT_ROOMS_DATA);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const data = await accommodationService.getAllAccommodations();
        if (data && data.length > 0) {
          // Normalize CMS items into Section 02 Room structure
          const mapped = data.map((item, idx) => ({
            id: item.id || String(idx + 1),
            category: item.category?.toLowerCase().includes('royal')
              ? 'royal'
              : item.category?.toLowerCase().includes('executive')
              ? 'executive'
              : item.category?.toLowerCase().includes('deluxe')
              ? 'deluxe'
              : (idx % 3 === 0 ? 'royal' : idx % 3 === 1 ? 'executive' : 'deluxe'),
            title: item.name,
            subtitle: item.category || 'Luxury Panoramic Living',
            price: item.price || '₹ 4,500 / night',
            occupancy: item.specs && item.specs[1] ? item.specs[1] : '2 Adults',
            image: item.image,
            highlights: Array.isArray(item.specs) && item.specs.length > 0 
              ? item.specs 
              : ['Private Jacuzzi', '24/7 Butler Service', 'Panoramic Balcony', 'Royal Breakfast'],
            link: (item.propertyType === 'Hotel' || item.name?.toLowerCase().includes('hotel')) ? '/hotels' : '/resorts',
          }));
          setRooms(mapped);
        }
      } catch (err) {
        console.error('Failed to load dynamic accommodations:', err);
      }
    }
    fetchAccommodations();
  }, []);

  const filteredRooms = activeCategory === 'all' 
    ? rooms 
    : rooms.filter((r) => r.category === activeCategory);

  return (
    <section className="relative bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-500 font-sans border-t border-[#B38738]/20 dark:border-[#B38738]/30">
      
      {/* Distinct Royal Indian Paisley & Floral Damask Tapestry Art */}
      <IndianArtBackground variant="paisley" opacity="opacity-[0.055] dark:opacity-[0.08]" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 font-sans">
          
          {/* Section 02 Royal Badge */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/30 text-[#B38738] dark:text-[#E8C97E] text-[11px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.22em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
              <span>02 — ACCOMMODATION — RESORTS, HOTELS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={50}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em] uppercase leading-tight">
              YOUR LUXURY, OUR RESPONSIBILITY
            </h2>
          </ScrollReveal>

          {/* Royal Ornamental Spearhead Divider */}
          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans font-light max-w-2xl mx-auto">
              Experience luxury at its finest in our hotels & resorts, where every detail has been carefully crafted to ensure your comfort and satisfaction. From plush bedding to world-class amenities, find everything you need for an unforgettable stay.
            </p>
          </ScrollReveal>

          {/* Royal Filter Tabs */}
          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
              {ROYAL_ROOM_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#C5A880] text-[#1A1612] border-[#C5A880] font-semibold shadow-sm scale-105'
                      : 'bg-white/80 dark:bg-[#1C1713]/80 text-[#6E5D4F] dark:text-[#B8A89A] border-[#C5A880]/40 hover:border-[#C5A880]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <Link
                to="/hotels"
                className="px-5 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider bg-[#2A1F17] text-[#FAF6F0] dark:bg-[#F3EEE0] dark:text-[#1A1612] hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-[#1A1612] transition-colors border border-transparent font-medium"
              >
                View All Rooms
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Room Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 font-sans">
          {filteredRooms.map((room, idx) => (
            <ScrollReveal key={room.id} direction="up" delay={idx * 100}>
              <div className="group bg-white/95 dark:bg-[#1C1713]/95 border border-[#C5A880]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#C5A880] transition-all duration-300 flex flex-col h-full">
                
                {/* Photo with gold border */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#1A1612]">
                  <img
                    src={room.image}
                    alt={room.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C5A880] text-[10px] font-serif uppercase tracking-widest font-semibold border border-[#C5A880]/30">
                      {room.category}
                    </span>
                  </div>

                  {/* Bottom Price Pill */}
                  <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-[#1C1713]/95 backdrop-blur-md px-3 py-1 rounded-lg border border-[#C5A880]/40 text-xs font-serif font-bold text-[#2A1F17] dark:text-[#C5A880]">
                    {room.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-serif text-[#2A1F17] dark:text-[#F3EEE0] group-hover:text-[#C5A880] transition-colors">
                      {room.title}
                    </h3>
                    <p className="text-xs text-[#6E5D4F] dark:text-[#B8A89A] font-light font-serif">
                      {room.subtitle}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6E5D4F] dark:text-[#B8A89A] border-t border-b border-[#C5A880]/20 py-2.5">
                    {room.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#C5A880] shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <Link
                      to={room.link}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C5A880] hover:bg-[#B39366] text-[#1A1612] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <a
                      href={getWhatsAppBookingUrl(`Inquiry about ${room.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#6E5D4F] dark:text-[#C5A880] hover:text-[#2A1F17] dark:hover:text-white font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Bottom Jaali Border */}
      <div className="absolute bottom-0 left-0 right-0">
        <IndianJaaliBorder />
      </div>
    </section>
  );
}
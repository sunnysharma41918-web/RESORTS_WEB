import React from 'react';
import { Star, Crown, Quote } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder, RoyalBackgroundCurves } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';

const ALL_REVIEWS = [
  {
    id: 'r-1',
    author: 'Malik Johnson',
    role: 'Founder, GrowthLoop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    quote: 'We were struggling to organize our annual leadership offsite smoothly. Country Holidays delivered an exceptional stay where our team could truly focus on what matters.',
    rating: 5,
  },
  {
    id: 'r-2',
    author: 'Marcus Lee',
    role: 'Product Manager, NovaTech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    quote: 'Before, we wasted time going back and forth with venues. Now we get clean, clear reservations on the first try. The resort ambiance and service were world-class.',
    rating: 5,
  },
  {
    id: 'r-3',
    author: 'Bruno Rivera',
    role: 'Brand Strategist, Studio Hive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    quote: 'It’s not just about looking good. It’s about showing up confidently. The villa architecture and scenic mountain views completely recharged our team.',
    rating: 5,
  },
  {
    id: 'r-4',
    author: 'Ananya Sharma',
    role: 'Design Director, Atelier One',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    quote: 'Country Holidays made our anniversary retreat effortless. Clean aesthetics, warm attentive staff, and flawless dining from sunset to dawn.',
    rating: 5,
  },
  {
    id: 'r-5',
    author: 'Michael Kith',
    role: 'Indie App Dev',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    quote: 'Country Holidays helped us look polished and organized for our team getaway. Clean rooms, high-speed WiFi, and quiet poolside cabanas.',
    rating: 5,
  },
  {
    id: 'r-6',
    author: 'Ayla Noor',
    role: 'Founder, Sunday Studio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    quote: 'The team made planning our wedding weekend feel effortless. The decor coordination was prompt, aesthetic, and surprisingly flexible.',
    rating: 5,
  },
  {
    id: 'r-7',
    author: 'Rui Hachi',
    role: 'Solo Traveler',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    quote: 'As a solo traveler seeking peace, the private cedar suite in Manali was breathtaking. The views looked incredible right out of the box.',
    rating: 5,
  },
  {
    id: 'r-8',
    author: 'Sneha Iyer',
    role: 'Partner, Horizon Ventures',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    quote: 'Stayed across four properties this year. The consistent quality, verified concierge bookings, and warm welcome make them our go-to choice.',
    rating: 5,
  },
  {
    id: 'r-9',
    author: 'Arjun Nair',
    role: 'VP Operations, Apex Media',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    quote: 'Hosted our 120-person summit in Udaipur. The banquet management, sound setup, and hospitality coordination exceeded all expectations.',
    rating: 5,
  },
  {
    id: 'r-10',
    author: 'Rohan Mehta',
    role: 'Co-Founder, Pulse Analytics',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&auto=format&fit=crop&q=80',
    quote: 'Booked a luxury beach resort in Goa for a family reunion. Smooth check-in, pristine pools, and personalized care from beginning to end.',
    rating: 5,
  },
];

function ReviewCard({ review }) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[350px] lg:w-[380px] p-6 sm:p-7 rounded-2xl bg-white/95 dark:bg-[#1C1713]/95 border border-[#C5A880]/40 shadow-sm hover:shadow-md hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between select-none font-sans">
      <div className="space-y-3.5">
        {/* Star Rating & Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#C5A880]">
            {[...Array(review.rating || 5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
            ))}
          </div>
          <Quote className="w-5 h-5 text-[#C5A880]/30" />
        </div>

        {/* Review Quote */}
        <p className="text-xs sm:text-sm leading-relaxed text-[#6E5D4F] dark:text-[#D1C7BD] font-serif font-light">
          "{review.quote}"
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3 pt-5 mt-4 border-t border-[#C5A880]/20">
        <img
          src={review.avatar}
          alt={review.author}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-[#C5A880]/50 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <h4 className="text-sm font-serif font-bold text-[#2A1F17] dark:text-[#F3EEE0] truncate">
            {review.author}
          </h4>
          <p className="text-[11px] text-[#6E5D4F] dark:text-[#B8A89A] truncate font-sans">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GuestReviewsSection() {
  return (
    <section className="relative bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] py-20 sm:py-28 overflow-hidden font-serif transition-colors duration-500 border-t border-[#C5A880]/20">
      
      {/* Indian Heritage Art: Palace Jaali, Lotus Mandala & Arch Motifs */}
      <IndianArtBackground variant="full" opacity="opacity-[0.055] dark:opacity-[0.08]" showMandala={true} />
      
      <RoyalBackgroundCurves />

      <style>{`
        @keyframes marqueeTrack {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-single {
          display: flex;
          width: max-content;
          animation: marqueeTrack 45s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee-single {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 sm:mb-14 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 font-sans">
          <ScrollReveal direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-[0.14em] uppercase">
              ROYAL TESTIMONIALS
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#C5A880" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed font-serif font-light max-w-2xl mx-auto">
              Read how our guests, families, and corporate patrons experienced our warm hospitality and serene sanctuaries across India.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Infinite Review Slider */}
      <div className="relative w-full overflow-hidden pause-on-hover py-4">
        {/* Left & Right Gradient Shadows for seamless edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF6F0] dark:from-[#14110E] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF6F0] dark:from-[#14110E] to-transparent z-20" />

        <div className="animate-marquee-single flex gap-5 sm:gap-6 pl-4">
          {[...ALL_REVIEWS, ...ALL_REVIEWS].map((rev, index) => (
            <ReviewCard key={`${rev.id}-${index}`} review={rev} />
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
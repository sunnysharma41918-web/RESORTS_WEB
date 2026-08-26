import React from 'react';
import { Star } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';

const reviews = [
  {
    id: 1,
    quote: 'When, while lovely valley teems with vapour around me and meridian sun strikes the upper impenetrable.',
    author: 'Bruce Hardy',
    role: 'paypal.ink',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 2,
    quote: 'When, while lovely valley teems with vapour around me and meridian sun strikes the upper impenetrable.',
    author: 'Mark Smith',
    role: 'google.inc',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 3,
    quote: 'When, while lovely valley teems with vapour around me and meridian sun strikes the upper impenetrable.',
    author: 'Mark Smith',
    role: 'google.inc',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 4,
    quote: 'When, while lovely valley teems with vapour around me and meridian sun strikes the upper impenetrable.',
    author: 'Vera Duncan',
    role: 'amazon.inc',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

export default function GuestReviewsSection() {
  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>05 — TESTIMONIALS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0E0E0E] dark:text-white">
              WHAT OUR GUESTS SAY
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 pt-10">
          {reviews.map((item, index) => (
            <ScrollReveal direction="up" delay={index * 100} key={item.id}>
              <div className="relative bg-white dark:bg-[#0E0E0E] rounded-2xl p-6 sm:p-8 pt-14 shadow-xl shadow-black/5 dark:shadow-none border border-[#E9E9DE] dark:border-[#333333] flex flex-col items-center text-center justify-between h-full transition-transform duration-300 hover:-translate-y-1">

                {/* Floating Top Avatar */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-[#FAFDF2] dark:border-[#1C1C1C] shadow-md">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Author Info */}
                <div className="space-y-0.5 mt-2">
                  <h3 className="text-base font-bold uppercase tracking-tight text-[#0E0E0E] dark:text-white">
                    {item.author}
                  </h3>
                  <p className="text-xs font-mono text-[#0E0E0E]/40 dark:text-white/40">
                    {item.role}
                  </p>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[#0E0E0E]/70 dark:text-[#D0D0D0] leading-relaxed my-6 font-light">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#FF1F02] mt-auto">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
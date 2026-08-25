import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';

const reviews = [
  {
    quote: 'Some places are visited. Others are remembered.',
    author: 'Elena & Marcus Vance',
    role: 'Verified Residence Guest',
    stay: 'Forest Pool Villa • 6 Nights',
    year: '2026',
  },
  {
    quote: 'An architectural triumph of stone, cedar, and profound silence.',
    author: 'David H. Sterling',
    role: 'Architecture & Design Critic',
    stay: 'Monolith Glass Chalet • 4 Nights',
    year: '2026',
  },
  {
    quote: 'The dawn sound therapy and private butler care redefined hospitality for us forever.',
    author: 'Sophia Chen-Laurent',
    role: 'Private Estate Member',
    stay: 'Botanical Sanctuary Suite • 5 Nights',
    year: '2026',
  },
];

export default function GuestReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section className="relative bg-[#000000] text-white py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-16 lg:space-y-24 relative z-10">

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-6">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>07 — TESTIMONIAL</span>
            </div>
          </ScrollReveal>

          {/* Minimal Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevReview}
              aria-label="Previous quote"
              className="w-10 h-10 rounded-none border border-[#333333] text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextReview}
              aria-label="Next quote"
              className="w-10 h-10 rounded-none border border-[#333333] text-white hover:border-[#FF1F02] hover:text-[#FF1F02] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Monumental Single Editorial Quote */}
        <div className="space-y-10 min-h-[220px] flex flex-col justify-between">
          <ScrollReveal direction="up" delay={100} key={currentIndex}>
            <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-art-yellow-dark">
              “{current.quote}”
            </blockquote>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} key={`meta-${currentIndex}`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-6 border-t border-[#333333]">
              <div className="space-y-1">
                <span className="text-lg font-bold text-white uppercase tracking-tight block">
                  {current.author}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B0B0B0]">
                  {current.role}
                </span>
              </div>

              <div className="text-xs font-mono text-[#D0D0D0] sm:text-right">
                <span>{current.stay}</span>
                <span className="text-[#FF1F02] ml-2">● {current.year}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

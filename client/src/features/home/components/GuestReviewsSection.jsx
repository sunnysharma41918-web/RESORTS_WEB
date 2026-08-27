import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';

const REVIEWS = [
  {
    id: 1,
    author: 'Ananya Sharma',
    rating: 4.9,
    date: '29 Aug, 2024',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    quote: 'Country Holidays Hotels & Resorts made our anniversary weekend effortless. Clean rooms, warm staff, would book again.',
  },
  {
    id: 2,
    author: 'Rohan Mehta',
    rating: 4.8,
    date: '14 Jun, 2024',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=80',
    quote: 'Booked a resort in Goa through them for a family trip. Smooth check-in, great location, kids loved the pool.',
  },
  {
    id: 3,
    author: 'Kavita Reddy',
    rating: 5.0,
    date: '02 Mar, 2024',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    quote: 'Hosted our office offsite here. Great banquet space, food was excellent, and the team handled everything on time.',
  },
  {
    id: 4,
    author: 'Arjun Nair',
    rating: 4.9,
    date: '18 Jan, 2024',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    quote: 'Our wedding stay was flawless. Country Holidays coordinated every detail — highly recommend for events.',
  },
  {
    id: 5,
    author: 'Sneha Iyer',
    rating: 4.7,
    date: '05 Nov, 2023',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&auto=format&fit=crop&q=80',
    quote: 'Stayed at two of their properties this year. Consistent quality and always a comfortable, hassle-free stay.',
  },
];

const AUTOPLAY_MS = 5000;

export default function GuestReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const active = REVIEWS[activeIndex];

  const select = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % REVIEWS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden font-manrope transition-colors duration-300">
      <style>{`
        @keyframes drawPath {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
        .review-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawPath 2.2s ease forwards;
        }
        @keyframes quoteIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .quote-enter {
          animation: quoteIn 0.5s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .review-path { animation: none; stroke-dashoffset: 0; }
          .quote-enter { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">

        {/* Header */}
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

        <div
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14 lg:gap-20 items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Left: curved reviewer path */}
          <ScrollReveal direction="up" delay={150}>
            <div className="relative w-full max-w-[260px] mx-auto lg:mx-0">
              <svg
                viewBox="0 0 100 520"
                preserveAspectRatio="none"
                className="absolute -left-3 top-0 w-[70px] h-full pointer-events-none dark:text-white/15 text-[#0E0E0E]/15"
              >
                <path
                  d="M 40 20 C -10 55, 90 90, 55 130 C 20 170, -10 195, 40 240 C 90 285, 90 305, 45 345 C 5 380, -10 405, 40 450 C 70 480, 60 495, 40 500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  pathLength="1"
                  className="review-path"
                />
              </svg>

              <div className="relative flex flex-col gap-9">
                {REVIEWS.map((r, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => select(idx)}
                      className={`relative flex items-center gap-3 text-left transition-all duration-400 ease-out ${isActive ? 'pl-8' : 'pl-2'
                        }`}
                      style={{ transitionProperty: 'padding-left, transform' }}
                    >
                      <span
                        className={`relative shrink-0 rounded-full overflow-hidden border-2 transition-all duration-400 ease-out ${isActive
                          ? 'w-16 h-16 border-[#FF1F02] shadow-lg shadow-[#FF1F02]/20'
                          : 'w-10 h-10 dark:border-[#333333] border-[#E9E9DE] grayscale opacity-70'
                          }`}
                      >
                        <img src={r.image} alt={r.author} className="w-full h-full object-cover" />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block truncate transition-all duration-300 uppercase ${isActive
                            ? 'text-base font-bold dark:text-white text-[#0E0E0E]'
                            : 'text-sm font-semibold dark:text-white/50 text-[#0E0E0E]/50'
                            }`}
                        >
                          {r.author}
                        </span>
                        <span
                          className={`flex items-center gap-1 text-[11px] font-mono transition-colors duration-300 ${isActive ? 'text-[#FF1F02]' : 'dark:text-white/30 text-[#0E0E0E]/30'
                            }`}
                        >
                          <Star className="w-3 h-3 fill-current" />
                          {r.rating} on {r.date}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: active quote */}
          <ScrollReveal direction="up" delay={250}>
            <div className="relative pt-4 lg:pt-10 min-h-[160px] lg:sticky lg:top-32">
              <Quote className="absolute -top-2 left-0 w-9 h-9 dark:text-white/10 text-[#0E0E0E]/10 -scale-x-100" />
              <blockquote key={active.id} className="quote-enter relative pl-10 sm:pl-14">
                <p className="text-lg sm:text-2xl leading-relaxed font-light dark:text-[#D0D0D0] text-[#0E0E0E]/80">
                  <span className="float-left text-5xl sm:text-6xl leading-[0.75] mr-2 mt-1 font-extrabold dark:text-white text-[#0E0E0E]">
                    {active.quote.charAt(0)}
                  </span>
                  {active.quote.slice(1)}
                </p>
                <span className="mt-6 block text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02]">
                  — {active.author}
                </span>
              </blockquote>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
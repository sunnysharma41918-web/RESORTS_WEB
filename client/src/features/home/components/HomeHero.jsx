import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, X, Compass, Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const SANCTUARIES = [
  {
    slug: 'rishikesh',
    name: 'RISHIKESH',
    state: 'Uttarakhand',
    temp: '24°C',
    category: 'SPIRITUAL JOURNEYS',
    tagline: 'PEACE • NATURE • ADVENTURE',
    flourish: 'Feel Closer\nto What Matters',
    image: 'https://images.unsplash.com/photo-1650341259809-9314b0de9268?auto=format&fit=crop&w=2560&q=90',
    fallbackImage: 'https://images.unsplash.com/photo-1650341259809-9314b0de9268?q=80&w=1170&auto=format&fit=crop',
  },
  {
    slug: 'goa',
    name: 'GOA',
    state: 'South Coast',
    temp: '29°C',
    category: 'COASTAL SANCTUARIES',
    tagline: 'TURQUOISE TIDES • GOLDEN SUNSETS',
    flourish: 'Escape to\nthe Turquoise Waves',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2560&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=85',
  },
  {
    slug: 'manali',
    name: 'MANALI',
    state: 'Himachal Pradesh',
    temp: '14°C',
    category: 'HIMALAYAN ESCAPES',
    tagline: 'SNOW PEAKS • ALPINE PINES',
    flourish: 'Where Peaks\nTouch the Sky',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2560&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=2560&q=85',
  },
  {
    slug: 'ujjain',
    name: 'UJJAIN',
    state: 'Madhya Pradesh',
    temp: '28°C',
    category: 'SACRED HERITAGE',
    tagline: 'MAHAKAL SANCTUARY • SHIPRA GHATS',
    flourish: 'Timeless Faith\n& Ancient Grace',
    image: 'https://images.unsplash.com/photo-1695185577116-3513f730f722?auto=format&fit=crop&w=2560&q=90',
    fallbackImage: 'https://images.unsplash.com/photo-1695185577116-3513f730f722?q=80&w=1170&auto=format&fit=crop',
  },
  {
    slug: 'vrindavan',
    name: 'VRINDAVAN',
    state: 'Uttar Pradesh',
    temp: '26°C',
    category: 'DIVINE RETREATS',
    tagline: 'SACRED TEMPLES • INNER HARMONY',
    flourish: 'Awaken\nYour Soul',
    image: 'https://cdn.pixabay.com/photo/2020/01/21/08/09/indian-temple-4782304_1280.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=2560&q=90',
  },
];

const AUTO_SLIDE_MS = 3500;

export default function HomeHero() {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);

  const active = SANCTUARIES[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SANCTUARIES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SANCTUARIES.length) % SANCTUARIES.length);
  };

  useEffect(() => {
    if (isPaused || isLocationsOpen) return undefined;
    timerRef.current = setInterval(nextSlide, AUTO_SLIDE_MS);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isPaused, isLocationsOpen]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <section
      className={`relative w-full min-w-full h-screen h-[100vh] h-[100dvh] overflow-hidden text-white select-none flex flex-col justify-between font-manrope transition-colors duration-500 ${
        isDark ? 'bg-[#0A0D12]' : 'bg-[#12161E]'
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setMouseOffset({ x: 0, y: 0 });
      }}
    >
      <style>{`
        /* Hand-Drawn Highlighter Button (from Uiverse.io by AatreyuShau) */
        .hand-drawn-btn {
          text-align: center;
          transition: 0.3s ease-in-out;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          filter: url(#handDrawnNoise);
          display: inline-flex;
          align-items: center;
          user-select: none;
          font-family: "Courier New", monospace;
          font-size: 1rem;
          font-weight: bold;
          padding: 0.7em 1.4em;
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          border-radius: 2rem;
          box-shadow: rgba(0, 0, 0, 0.5) 4px 4px 0 1px;
          animation: handDrawnIdle 1.2s infinite ease-in-out;
          position: relative;
        }

        .hand-drawn-btn .highlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: rgba(255, 225, 0, 0.5);
          stroke: rgba(255, 225, 0, 0.6);
          stroke-width: 10;
          stroke-linecap: round;
          pointer-events: none;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 0.5s ease-in-out;
        }

        @keyframes handDrawnIdle {
          0% {
            filter: url(#handDrawnNoise);
          }
          50% {
            rotate: 2.5deg;
            filter: url(#handDrawnNoise2);
          }
          100% {
            filter: url(#handDrawnNoise);
          }
        }

        .hand-drawn-btn .button-cosm {
          fill: #F59E0B;
          transition: 0.3s ease-out;
          scale: 0.45;
          position: absolute;
          translate: calc(-100% + 24px) 1.2rem;
        }

        .hand-drawn-btn:hover {
          font-weight: bold;
          border-radius: 2rem;
          rotate: -2.5deg;
          animation: handDrawnHover 2.5s infinite ease-in-out;
        }

        .hand-drawn-btn:hover .highlight {
          stroke-dashoffset: 0;
        }

        .hand-drawn-btn:active .highlight {
          stroke-dashoffset: 1000;
          animation:
            handDrawnHighlight 5s infinite,
            handDrawnCol 0.5s forwards;
          stroke: #bc4e2666;
        }

        @keyframes handDrawnCol {
          0% {
            stroke: rgba(255, 225, 0, 0.6);
          }
          100% {
            stroke: #1c98eb66;
          }
        }

        @keyframes handDrawnHighlight {
          0% {
            stroke-dashoffset: 0;
          }
          25% {
            stroke-dashoffset: 1000;
          }
          50% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes handDrawnHover {
          0% {
            rotate: 0deg;
            filter: url(#handDrawnNoise);
            translate: 0 0px;
          }
          25% {
            rotate: -1deg;
            filter: url(#handDrawnNoise2);
            translate: 0 -2px;
          }
          50% {
            rotate: 0deg;
            filter: url(#handDrawnNoise);
            translate: 0 2px;
          }
          75% {
            rotate: -1deg;
            filter: url(#handDrawnNoise2);
            translate: 0 -2px;
          }
          100% {
            rotate: 0deg;
            filter: url(#handDrawnNoise);
            translate: 0 0px;
          }
        }

        .hand-drawn-btn:hover .button-cosm {
          rotate: -15deg;
          translate: calc(-100% + 22px) 1.5rem;
        }

        .hand-drawn-btn:active .button-cosm {
          fill: #ffffff;
          rotate: -135deg;
          translate: calc(-100% + 55px) 1.4rem;
          animation: none;
        }

        .hand-drawn-btn:active {
          font-weight: bold;
          border-radius: 2rem;
          box-shadow: inset #333333f1 4px 4px 0 1px;
          rotate: -2.5deg;
          animation: handDrawnActive 1s infinite ease-in-out;
        }

        @keyframes handDrawnActive {
          0% {
            filter: url(#handDrawnNoiset);
            translate: 0 -1px;
          }
          25% {
            rotate: -3deg;
          }
          50% {
            filter: url(#handDrawnNoiset2);
            translate: 0 1px;
          }
          66% {
            rotate: 1.5deg;
          }
          100% {
            filter: url(#handDrawnNoiset);
            translate: 0 -1px;
          }
        }
      `}</style>

      {/* SVG Hand Drawn Noise Filters */}
      <svg height="0" width="0" className="absolute pointer-events-none opacity-0">
        <defs>
          <filter id="handDrawnNoise">
            <feTurbulence
              result="noise"
              numOctaves="8"
              baseFrequency="0.1"
              type="fractalNoise"
            />
            <feDisplacementMap
              yChannelSelector="G"
              xChannelSelector="R"
              scale="3"
              in2="noise"
              in="SourceGraphic"
            />
          </filter>
          <filter id="handDrawnNoise2">
            <feTurbulence
              result="noise"
              numOctaves="8"
              baseFrequency="0.1"
              seed="1010"
              type="fractalNoise"
            />
            <feDisplacementMap
              yChannelSelector="G"
              xChannelSelector="R"
              scale="3"
              in2="noise"
              in="SourceGraphic"
            />
          </filter>
          <filter id="handDrawnNoiset">
            <feTurbulence
              result="noise"
              numOctaves="8"
              baseFrequency="0.1"
              type="fractalNoise"
            />
            <feDisplacementMap
              yChannelSelector="G"
              xChannelSelector="R"
              scale="6"
              in2="noise"
              in="SourceGraphic"
            />
          </filter>
          <filter id="handDrawnNoiset2">
            <feTurbulence
              result="noise"
              numOctaves="8"
              baseFrequency="0.1"
              seed="1010"
              type="fractalNoise"
            />
            <feDisplacementMap
              yChannelSelector="G"
              xChannelSelector="R"
              scale="6"
              in2="noise"
              in="SourceGraphic"
            />
          </filter>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* LAYER 0: SCENIC BACKGROUND LANDSCAPE & SKY (Z-0)                          */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouseOffset.x * -12,
              y: mouseOffset.y * -8,
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              opacity: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
              scale: { duration: 1.1, ease: [0.25, 1, 0.5, 1] },
              x: { duration: 0.25, ease: 'easeOut' },
              y: { duration: 0.25, ease: 'easeOut' },
            }}
            className="absolute inset-[-2%] w-[104%] h-[104%]"
          >
            <img
              src={active.image}
              alt={active.name}
              onError={(e) => {
                if (active.fallbackImage && e.target.src !== active.fallbackImage) {
                  e.target.src = active.fallbackImage;
                }
              }}
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                isDark
                  ? 'filter brightness-[0.72] contrast-[1.22] saturate-[1.05]'
                  : 'filter brightness-[1.05] contrast-[1.02] saturate-[1.18]'
              }`}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Sky Gradient & Vignette */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
            isDark
              ? 'bg-gradient-to-t from-[#0A0D12]/70 via-black/20 to-black/35'
              : 'bg-gradient-to-t from-black/40 via-transparent to-black/20'
          }`}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 1: TOP BRANDING HEADER (Z-30)                                       */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full px-6 sm:px-12 lg:px-16 pt-28 sm:pt-32 md:pt-36 lg:pt-40 flex flex-col items-center justify-center text-center pointer-events-none gap-2">
        <motion.div
          animate={{
            x: mouseOffset.x * 9,
            y: mouseOffset.y * 5,
          }}
          transition={{
            x: { duration: 0.25, ease: 'easeOut' },
            y: { duration: 0.25, ease: 'easeOut' },
          }}
          className="flex flex-col items-center justify-center text-center gap-2"
        >
          <motion.h2
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-normal uppercase tracking-[0.14em] text-white select-none pointer-events-auto leading-none text-center"
            style={{
              fontFamily: "'Abril Fatface', serif",
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.45) 85%, rgba(0, 0, 0, 0.15) 100%)',
              maskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.45) 85%, rgba(0, 0, 0, 0.15) 100%)',
            }}
          >
            Country Holidays
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 pointer-events-none mt-0.5"
            style={{
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.25) 100%)',
              maskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.25) 100%)',
            }}
          >
            <span className="w-5 h-[2px] bg-[#F59E0B]" />
            <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-[0.4em] text-[#F59E0B]">
              HOTELS &amp; RESORTS
            </span>
            <span className="w-5 h-[2px] bg-[#F59E0B]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl font-normal tracking-wider text-white mt-1 pointer-events-none select-none"
            style={{
              fontFamily: "'Schoolbell', cursive, sans-serif",
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.55) 88%, rgba(0, 0, 0, 0.2) 100%)',
              maskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.55) 88%, rgba(0, 0, 0, 0.2) 100%)',
            }}
          >
            Handpicked stays for your perfect getaway.
          </motion.p>
        </motion.div>
      </header>

      {/* ========================================================================= */}
      {/* LAYER 2: 3D EMBEDDED TYPOGRAPHY (Z-25 — SITS DIRECTLY IN 3D SPACE)        */}
      {/* ========================================================================= */}
      <main className="relative z-25 my-auto flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-6 w-full pointer-events-none">
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mouseOffset.x * 14,
                y: mouseOffset.y * 7,
              }}
              exit={{ opacity: 0, scale: 1.04, y: -20 }}
              transition={{
                opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.55 },
                x: { duration: 0.25, ease: 'easeOut' },
                y: { duration: 0.25, ease: 'easeOut' },
              }}
              className="flex flex-col items-center w-full relative"
            >
              {/* 3D Giant Monumental Destination Typography (Clean, Equal Size across all Slides with Bottom Transparency Fade) */}
              <div className="relative w-full max-w-[100vw] flex items-center justify-center my-[-1.5vw] sm:my-[-0.8vw] px-2 sm:px-4 overflow-hidden">
                <h1
                  className="font-black uppercase leading-[0.88] select-none text-center text-white whitespace-nowrap text-[11vw] sm:text-[12vw] md:text-[12.5vw] lg:text-[13vw] tracking-[0.03em]"
                  style={{
                    fontFamily: "'Gagalin', 'Russo One', 'Bebas Neue', 'Lilita One', 'Syne', sans-serif",
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                    WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.45) 85%, rgba(0, 0, 0, 0.15) 100%)',
                    maskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.45) 85%, rgba(0, 0, 0, 0.15) 100%)',
                  }}
                >
                  {active.name}
                </h1>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* LAYER 3: FOREGROUND 3D SPATIAL OVERLAY (Z-20 — CREATES DEPTH GROUNDING)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] sm:h-[40%] md:h-[42%] z-20 pointer-events-none overflow-hidden flex flex-col justify-end">
        <AnimatePresence mode="sync">
          <motion.div
            key={`fg-${active.slug}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: mouseOffset.x * -7,
              y: mouseOffset.y * -4,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
            }}
          >
            <img
              src={active.image}
              alt={active.name}
              onError={(e) => {
                if (active.fallbackImage && e.target.src !== active.fallbackImage) {
                  e.target.src = active.fallbackImage;
                }
              }}
              className={`w-full h-full object-cover object-bottom transition-all duration-700 ${
                isDark
                  ? 'filter brightness-[0.78] contrast-[1.12] saturate-[1.05]'
                  : 'filter brightness-[1.05] contrast-[1.02] saturate-[1.18]'
              }`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Ground Shimmer */}
        <div
          className={`absolute inset-x-0 bottom-0 h-28 sm:h-36 opacity-50 transition-all duration-700 ${
            isDark
              ? 'bg-gradient-to-t from-[#0A0D12]/70 via-black/20 to-transparent'
              : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
          }`}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 4: BOTTOM BAR WITH ARROWS & UIVERSE EXPLORE BUTTON (Z-30)           */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full px-6 sm:px-12 lg:px-16 pb-8 sm:pb-10 flex items-center justify-between gap-4">
        
        {/* Left: Slider Arrows */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-black border border-white/20 hover:border-[#F59E0B] flex items-center justify-center text-white transition-all duration-200 active:scale-90 cursor-pointer backdrop-blur-md shadow-lg group"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-black border border-white/20 hover:border-[#F59E0B] flex items-center justify-center text-white transition-all duration-200 active:scale-90 cursor-pointer backdrop-blur-md shadow-lg group"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Right Action: Uiverse Hand-Drawn Highlighter Button linking to /offers */}
        <div className="flex items-center gap-4 pointer-events-auto shrink-0">
          
          <Link
            to="/offers"
            className="hand-drawn-btn text-white no-underline hover:text-white"
            aria-label="Explore Special Offers & Packages"
          >
            <svg
              className="button-cosm"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 256 256"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
            >
              <path d="M243.07324,157.43945c-1.2334-1.47949-23.18847-27.34619-60.46972-41.05859-1.67579-17.97412-8.25293-34.36328-18.93653-46.87158C149.41309,52.8208,128.78027,44,104,44,54.51074,44,22.10059,88.57715,20.74512,90.4751a3.99987,3.99987,0,0,0,6.50781,4.65234C27.5625,94.6958,58.68359,52,104,52c22.36816,0,40.89648,7.85107,53.584,22.70508,8.915,10.437,14.65625,23.9541,16.65528,38.894A133.54185,133.54185,0,0,0,136,108c-25.10742,0-46.09473,6.48486-60.69434,18.75391-12.65234,10.63379-19.91015,25.39355-19.91015,40.49463a43.61545,43.61545,0,0,0,12.69336,31.21923C76.98438,207.3208,89.40234,212,104,212c23.98047,0,44.37305-9.4668,58.97461-27.37744,12.74512-15.6333,20.05566-37.145,20.05566-59.01953,0-.1128-.001-.22559-.001-.33838,33.62988,13.48486,53.62207,36.96631,53.89746,37.2959a4.00015,4.00015,0,0,0,6.14648-5.1211ZM104,204c-27.89746,0-40.60449-19.05078-40.60449-36.75146C63.39551,142.56592,86.11621,116,136,116a124.37834,124.37834,0,0,1,38.97266,6.32617q.05712,1.63038.05761,3.27686C175.03027,177.07129,139.29785,204,104,204Z" />
            </svg>
            <svg
              className="highlight"
              viewBox="0 0 144.75738 77.18431"
              preserveAspectRatio="none"
            >
              <g transform="translate(-171.52826,-126.11624)">
                <g
                  fill="none"
                  strokeWidth="17"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                >
                  <path d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336 37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286" />
                </g>
              </g>
            </svg>
            <span>EXPLORE</span>
          </Link>
        </div>

      </footer>

      {/* ========================================================================= */}
      {/* LAYER 5: ANIMATED LOCATIONS MODAL / DRAWER (TRIGGERS ON ANATOMY BUTTON)   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isLocationsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg"
            onClick={() => setIsLocationsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#10141D] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Accent Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3470fa]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Compass className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] font-bold uppercase block">
                      Explore Destinations
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                      Select Sanctuary Location
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLocationsOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Close Locations Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of 5 Animated Destination Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 max-h-[60vh] overflow-y-auto pr-1">
                {SANCTUARIES.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <motion.div
                      key={item.slug}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsLocationsOpen(false);
                      }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 p-4 flex flex-col justify-between min-h-[170px] ${
                        isActive
                          ? 'border-[#F59E0B] bg-gradient-to-br from-[#1C2333] to-[#121622] shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                          : 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:bg-white/10'
                      }`}
                    >
                      {/* Background Thumbnail preview */}
                      <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#10141D] via-[#10141D]/70 to-transparent" />
                      </div>

                      {/* Card Top Meta */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-white/80">
                          {item.temp}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-[#F59E0B] font-bold px-2 py-0.5 rounded-md bg-[#F59E0B]/20 border border-[#F59E0B]/40">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>

                      {/* Card Bottom Info */}
                      <div className="relative z-10 mt-auto pt-4">
                        <div className="flex items-center gap-1.5 text-xs text-white/60 mb-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <span>{item.state}</span>
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-wider group-hover:text-[#F59E0B] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-white/70 font-mono tracking-wide mt-1 line-clamp-1">
                          {item.tagline}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Modal Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 relative z-10">
                <span className="flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Click any location to instantly switch view
                </span>
                <span className="font-mono text-[#F59E0B] font-semibold">
                  5 Luxury Sanctuaries Active
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}


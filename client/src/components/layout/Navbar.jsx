import React, { useState, useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import MobileMenu from './MobileMenu';
import TopOffersTicker from './TopOffersTicker';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300">
        {/* TOP OFFERS & FESTIVAL DISCOUNTS SCROLLER TICKER */}
        <TopOffersTicker />

        {/* MAIN NAVIGATION BAR */}
        <div
          className={`transition-all duration-300 border-b ${
            scrolled
              ? 'py-3.5 dark:bg-[#1C1C1C]/95 bg-[#FAFDF2]/95 backdrop-blur-2xl dark:border-white/10 border-[#E9E9DE] shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
              : 'py-4 bg-gradient-to-b from-black/85 via-black/45 to-transparent border-white/10'
          }`}
        >
          <DesktopNavbar isScrolled={scrolled} />
          <MobileNavbar isScrolled={scrolled} />
        </div>
      </header>

      <MobileMenu />
    </>
  );
}


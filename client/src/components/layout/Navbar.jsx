import React, { useState, useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import MobileMenu from './MobileMenu';

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none border-b ${
          scrolled
            ? 'py-3.5 bg-luxury-black/95 backdrop-blur-2xl border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent border-white/10'
        }`}
      >
        <DesktopNavbar isScrolled={scrolled} />
        <MobileNavbar isScrolled={scrolled} />
      </header>

      <MobileMenu />
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { CONTACT_INFO } from '../../data/contact';
import BrandLogo from '../common/BrandLogo';
import ThemeToggle from '../common/ThemeToggle';

export default function MobileNavbar({ isScrolled }) {
  const { isMobileMenuOpen, toggleMobileMenu } = useUI();

  return (
    <div className="flex lg:hidden items-center justify-between w-full px-6">
      {/* Brand Capsule with Refined Animated Logo */}
      <Link
        to="/"
        className="flex items-center space-x-2 py-0.5"
      >
        <BrandLogo size="sm" animated={true} />
      </Link>

      <div className="flex items-center space-x-2">
        {/* Day / Dark Mode Toggle */}
        <ThemeToggle />

        {/* Quick Phone Call Pill */}
        <a
          href={`tel:${CONTACT_INFO.phoneRaw}`}
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-[#FF1F02] hover:text-white transition-colors cursor-pointer"
          aria-label="Call Concierge"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
        </a>

        {/* Hamburger Toggle Pill */}
        <button
          onClick={toggleMobileMenu}
          className="w-9 h-9 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:border-[#FF1F02] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4 text-[#FF1F02]" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}


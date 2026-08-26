import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import ThemeToggle from '../common/ThemeToggle';
import { getWhatsAppBookingUrl } from '../../data/contact';

export default function DesktopNavbar({ isScrolled }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Offers & Packages', path: '/offers' },
    { name: 'Celebrations', path: '/celebrations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="hidden lg:grid grid-cols-12 items-center w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

      {/* 1. LEFT: Brand Logo with Round Motion Animation (Left 3 Columns) */}
      <div className="col-span-3 flex items-center justify-start">
        <Link
          to="/"
          className="flex items-center shrink-0 hover:opacity-95 transition-opacity"
        >
          <BrandLogo size="md" animated={true} />
        </Link>
      </div>

      {/* 2. CENTER: Clean Spaced Navigation Links (Center 6 Columns - Perfectly Centered) */}
      <nav className="col-span-6 flex items-center justify-center space-x-7 lg:space-x-8 text-[13px] font-normal">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors duration-150 py-1 ${
                isScrolled
                  ? isActive
                    ? 'dark:text-white text-[#FF1F02] font-semibold'
                    : 'dark:text-white/75 text-[#0E0E0E]/80 dark:hover:text-white hover:text-[#FF1F02]'
                  : isActive
                    ? 'text-white font-semibold'
                    : 'text-white/85 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* 3. RIGHT: Day / Dark Mode Toggle & Book Stay CTA */}
      <div className="col-span-3 flex items-center justify-end space-x-3 shrink-0">
        
        {/* Day / Dark Mode Toggle */}
        <ThemeToggle />

        {/* High-Visibility Brand Orange/Red Pill Button */}
        <a
          href={getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to book a stay.')}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
        >
          <span>Book Your Stay</span>
        </a>

      </div>

    </div>
  );
}


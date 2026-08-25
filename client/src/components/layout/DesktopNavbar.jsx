import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/hero/New Logo CHT.png';

export default function DesktopNavbar({ isScrolled }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Amenities', path: '/experiences' },
    { name: 'Residences', path: '/resorts' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="hidden lg:grid grid-cols-12 items-center w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

      {/* 1. LEFT: Brand Logo (Left 3 Columns) */}
      <div className="col-span-3 flex items-center justify-start">
        <Link
          to="/"
          className="flex items-center shrink-0 hover:opacity-90 transition-opacity"
        >
          <img
            src={logoImg}
            alt="Country Holidays Travel Resorts"
            className="h-11 lg:h-12 xl:h-13 w-auto object-contain brightness-105 contrast-105 drop-shadow-md"
          />
        </Link>
      </div>

      {/* 2. CENTER: Clean Spaced Navigation Links (Center 6 Columns - Perfectly Centered) */}
      <nav className="col-span-6 flex items-center justify-center space-x-7 lg:space-x-8 text-[13px] font-normal text-white/75">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors duration-150 py-1 hover:text-white ${isActive ? 'text-white font-semibold' : ''
                }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* 3. RIGHT: Book Stay CTA (Right 3 Columns) */}
      <div className="col-span-3 flex items-center justify-end shrink-0">

        {/* High-Visibility Brand Orange/Red Pill Button */}
        <Link
          to="/resorts"
          className="px-5 py-2.5 rounded-full bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105"
        >
          <span>Book Your Stay</span>
        </Link>

      </div>

    </div>
  );
}

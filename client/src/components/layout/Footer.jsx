import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/contact';
import BrandLogo from '../common/BrandLogo';
import EditorialHeritageStamp from '../common/EditorialHeritageStamp';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter / X', icon: Twitter, href: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer className="relative dark:bg-[#111111] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] border-t dark:border-[#333333] border-[#E9E9DE] pt-20 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden select-none font-manrope transition-colors duration-300">

      {/* Subtle Brand Red Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#FF1F02]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* 4-Column Editorial Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Brand Logo, Heritage Stamp & Social Media Icons (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <BrandLogo size="lg" animated={true} />
            </Link>

            <p className="text-xs sm:text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 leading-relaxed max-w-sm">
              A high-altitude architectural sanctuary dedicated to the unhurried life. Set high along the mountain ridge where silence is preserved.
            </p>

            {/* Interactive Social Media Icons */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] block">
                FOLLOW OUR CHANNELS
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-10 h-10 rounded-none border dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02] dark:bg-[#1C1C1C] bg-white hover:bg-[#FF1F02] dark:text-[#D0D0D0] text-[#0E0E0E] hover:text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-md"
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: CONTACT INFORMATION (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
              <span>DIRECT CONTACT</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm dark:text-[#D0D0D0] text-[#0E0E0E]/75 font-light leading-relaxed">
              <div>
                <span className="text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest block">Direct Concierge</span>
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-[#FF1F02] transition-colors font-medium dark:text-white text-[#0E0E0E]">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest block">Reservations Email</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#FF1F02] transition-colors font-medium dark:text-white text-[#0E0E0E]">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest block">Sanctuary Location</span>
                <p className="dark:text-white/70 text-[#0E0E0E]/80 text-xs leading-normal">
                  {CONTACT_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: QUICK NAVIGATION (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
              <span>NAVIGATION</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm dark:text-[#D0D0D0] text-[#0E0E0E]/75 font-light">
              <li>
                <Link to="/" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Discover
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Offers & Packages
                </Link>
              </li>
              <li>
                <Link to="/celebrations" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Celebrations & Weddings
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Animated Heritage Seal & Assurance (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-start lg:items-end">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
              <span>ESTATE AUTHENTICITY</span>
            </div>

            <div className="pt-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE ESTATE • " />
            </div>
          </div>

        </div>

        {/* Monumental Editorial Brand Signoff with Thanks for Visiting */}
        <div className="pt-10 border-t dark:border-[#333333] border-[#E9E9DE] w-full overflow-hidden flex flex-col items-center justify-center text-center select-none space-y-3">
          <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#FF1F02]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] animate-pulse" />
            <span>THANKS FOR VISITING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] animate-pulse" />
          </div>
          <h2 className="text-[clamp(0.95rem,4.3vw,3.75rem)] font-extrabold uppercase tracking-tight leading-none whitespace-nowrap dark:text-white/90 text-[#0E0E0E]/90">
            COUNTRY HOLIDAYS <span className="text-art-trio">HOTELS & RESORTS.</span>
          </h2>
        </div>

        {/* Bottom Copyright & Legal Notice Line */}
        <div className="pt-6 border-t dark:border-[#333333]/60 border-[#E9E9DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono dark:text-white/50 text-[#0E0E0E]/50 tracking-wider">
          <div>
            Country Holidays Hotels & Resorts Group © {new Date().getFullYear()} • All Rights Reserved.
          </div>
          <div className="flex items-center space-x-5">
            <Link to="/privacy" className="hover:text-[#FF1F02] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#FF1F02] transition-colors">Terms of Stay</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-[#FF1F02] transition-colors">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

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
import logoImg from '../../assets/images/hero/New Logo CHT.png';
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
    <footer className="relative bg-[#000000] text-white border-t border-[#333333] pt-20 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden select-none font-manrope">

      {/* Subtle Brand Red Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#FF1F02]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* 4-Column Editorial Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Brand Logo, Heritage Stamp & Social Media Icons (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block hover:opacity-85 transition-opacity">
              <img
                src={logoImg}
                alt="Country Holidays Travel Resorts"
                className="h-10 sm:h-12 w-auto object-contain brightness-110"
              />
            </Link>

            <p className="text-xs sm:text-sm font-light text-[#D0D0D0] leading-relaxed max-w-sm">
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
                      className="w-10 h-10 rounded-none border border-[#333333] hover:border-[#FF1F02] bg-[#1C1C1C] hover:bg-[#FF1F02] text-[#D0D0D0] hover:text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-md"
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

            <div className="space-y-3 text-xs sm:text-sm text-[#D0D0D0] font-light leading-relaxed">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Direct Concierge</span>
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-[#FF1F02] transition-colors font-medium text-white">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Reservations Email</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#FF1F02] transition-colors font-medium text-white">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Sanctuary Location</span>
                <p className="text-white/70 text-xs leading-normal">
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

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D0D0D0] font-light">
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
                <Link to="/resorts" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Residences
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#FF1F02] transition-colors inline-block hover:translate-x-1 duration-200">
                  Experiences
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
              <EditorialHeritageStamp size={110} centerText="CHTR" year="EST 2026" />
            </div>

            <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest text-left lg:text-right">
              ● 100% OFF-GRID SOLAR <br />
              ● 500-ACRE CONSERVATION <br />
              ● 24/7 BUTLER CARE
            </p>
          </div>

        </div>

        {/* Monumental Editorial Brand Signoff */}
        <div className="pt-10 border-t border-[#333333] w-full overflow-hidden flex justify-center text-center select-none">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight text-white/90">
            COUNTRY HOLIDAYS <span className="text-art-trio">TRAVEL RESORTS.</span>
          </h2>
        </div>

        {/* Bottom Copyright & Legal Notice Line */}
        <div className="pt-6 border-t border-[#333333]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 tracking-wider">
          <div>
            Country Holidays Travel Resorts Group © {new Date().getFullYear()} • All Rights Reserved.
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

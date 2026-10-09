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
import { RoyalOrnamentDivider, IndianJaaliBorder, RoyalBackgroundCurves } from '../common/RoyalOrnamentDivider';
import IndianArtBackground from '../common/IndianArtBackground';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter / X', icon: Twitter, href: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] border-t border-[#8F6B2E]/30 dark:border-[#8F6B2E]/30 pt-20 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden select-none transition-colors duration-300 font-glacial">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/glacial-indifference');
        .font-glacial {
          font-family: 'Glacial Indifference', 'Plus Jakarta Sans', system-ui, sans-serif;
        }
      `}</style>

      {/* Indian Heritage Art: Palace Jaali Lattice, Royal Mandala & Arch Motifs */}
      <IndianArtBackground variant="full" opacity="opacity-[0.05] dark:opacity-[0.075]" showMandala={true} />

      {/* Indian Jaali Lace Top Accent */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <IndianJaaliBorder position="top" />
      </div>

      {/* Trajectory Background Spline */}
      <RoyalBackgroundCurves />

      {/* Subtle Brand Red & Gold Ambient Glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C5A880]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[200px] bg-[#FF1F02]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ============================================================ */}
      {/* MAIN FOOTER CONTENT                                          */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* 4-Column Editorial Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Brand Logo, Heritage Stamp & Social Media Icons (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <BrandLogo size="lg" animated={true} />
            </Link>

            <p className="text-xs sm:text-sm font-light dark:text-[#EAE5D9] text-[#2D2823] leading-relaxed max-w-sm">
              A high-altitude architectural sanctuary dedicated to the unhurried life. Set high along the mountain ridge where royal heritage and tranquility are preserved.
            </p>

            {/* Interactive 3D Social Media Icons */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-cinzel font-bold uppercase tracking-widest text-[#B38738] dark:text-[#E8C97E] block">
                ✦ FOLLOW OUR ROYAL CHANNELS
              </span>
              <div className="flex items-center gap-3">
                
                {/* Instagram 3D */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0.5 border border-[#B38738]/40 hover:border-[#E8C97E] bg-gradient-to-br from-[#E8C97E]/30 to-transparent hover:shadow-[0_4px_16px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden cursor-pointer"
                >
                  <img
                    src="/images/icon_3d_instagram.jpg"
                    alt="Instagram 3D"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </a>

                {/* WhatsApp 3D */}
                <a
                  href={`https://wa.me/${(CONTACT_INFO.phoneRaw || '919899108543').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0.5 border border-[#B38738]/40 hover:border-[#E8C97E] bg-gradient-to-br from-[#E8C97E]/30 to-transparent hover:shadow-[0_4px_16px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden cursor-pointer"
                >
                  <img
                    src="/images/icon_3d_whatsapp.jpg"
                    alt="WhatsApp 3D"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </a>

                {/* YouTube 3D */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0.5 border border-[#B38738]/40 hover:border-[#E8C97E] bg-gradient-to-br from-[#E8C97E]/30 to-transparent hover:shadow-[0_4px_16px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden cursor-pointer"
                >
                  <img
                    src="/images/icon_3d_youtube.jpg"
                    alt="YouTube 3D"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </a>

                {/* Facebook 3D */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0.5 border border-[#B38738]/40 hover:border-[#E8C97E] bg-gradient-to-br from-[#E8C97E]/30 to-transparent hover:shadow-[0_4px_16px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden cursor-pointer"
                >
                  <img
                    src="/images/icon_3d_facebook.jpg"
                    alt="Facebook 3D"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </a>

              </div>
            </div>
          </div>

          {/* Column 2: CONTACT INFORMATION (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#C5A880]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>DIRECT ROYAL CONCIERGE</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm dark:text-[#EAE5D9] text-[#2D2823] font-light leading-relaxed">
              <div>
                <span className="text-[10px] font-mono dark:text-[#C5A880]/80 text-[#8C7355] uppercase tracking-widest block">Telephone / Concierge</span>
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-[#C5A880] transition-colors font-medium dark:text-white text-[#0E0E0E]">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono dark:text-[#C5A880]/80 text-[#8C7355] uppercase tracking-widest block">Official Email</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#C5A880] transition-colors font-medium dark:text-white text-[#0E0E0E]">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono dark:text-[#C5A880]/80 text-[#8C7355] uppercase tracking-widest block">Registered & Operational Office</span>
                <p className="font-medium text-[11px] dark:text-[#E8C97E] text-[#8F6B2E]">
                  {CONTACT_INFO.legalEntityName}
                </p>
                <p className="dark:text-[#EAE5D9]/80 text-[#2D2823]/80 text-xs leading-normal mt-0.5">
                  {CONTACT_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: QUICK NAVIGATION (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#C5A880]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>NAVIGATION</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm dark:text-[#EAE5D9] text-[#2D2823] font-light">
              <li>
                <Link to="/" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Discover Stays
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Our Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Royal Heritage
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Offers & Packages
                </Link>
              </li>
              <li>
                <Link to="/celebrations" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Celebrations & Weddings
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors inline-block hover:translate-x-1 duration-200">
                  ✦ Concierge Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Animated Heritage Seal & Assurance (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-start lg:items-end">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#C5A880]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>ESTATE AUTHENTICITY</span>
            </div>

            <div className="pt-2">
              <EditorialHeritageStamp size={115} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE ESTATE • " />
            </div>
          </div>

        </div>

        {/* Monumental Editorial Brand Signoff with Ornamental Flourish */}
        <div className="relative pt-12 border-t dark:border-[#C5A880]/25 border-[#C5A880]/30 w-full overflow-hidden flex flex-col items-center justify-center text-center select-none space-y-4">
          
          <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#C5A880] relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span>THANKS FOR VISITING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          </div>

          <RoyalOrnamentDivider color="#C5A880" className="opacity-90 relative z-10 my-1" />

          <h2 className="text-[clamp(1.1rem,4.5vw,3.8rem)] font-extrabold uppercase tracking-tight leading-none whitespace-nowrap dark:text-white/95 text-[#0E0E0E]/95 relative z-10">
            COUNTRY HOLIDAYS <span className="text-[#C5A880]">HOTELS & RESORTS.</span>
          </h2>
        </div>

        {/* Bottom Copyright & Legal Notice Line */}
        <div className="pt-6 border-t dark:border-[#C5A880]/20 border-[#C5A880]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono dark:text-[#EAE5D9]/60 text-[#2D2823]/60 tracking-wider">
          <div>
            {CONTACT_INFO.legalEntityName} © {new Date().getFullYear()} • All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-[#C5A880] transition-colors">Privacy Policy</Link>
            <span className="text-[#C5A880]/40">•</span>
            <Link to="/terms" className="hover:text-[#C5A880] transition-colors">Terms of Stay</Link>
            <span className="text-[#C5A880]/40">•</span>
            <Link to="/cancellation-policy" className="hover:text-[#C5A880] transition-colors">Cancellation Policy</Link>
            <span className="text-[#C5A880]/40">•</span>
            <Link to="/admin" className="hover:text-[#C5A880] transition-colors">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}


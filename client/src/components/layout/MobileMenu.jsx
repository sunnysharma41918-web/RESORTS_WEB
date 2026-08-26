import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO, getWhatsAppBookingUrl } from '../../data/contact';
import { useUI } from '../../context/UIContext';
import { cn } from '../../utils/cn';
import EditorialHeritageStamp from '../common/EditorialHeritageStamp';

const mobileNavLinks = [
  { number: '01', name: 'Discover', path: '/' },
  { number: '02', name: 'About Us', path: '/about' },
  { number: '03', name: 'Offers & Packages', path: '/offers' },
  { number: '04', name: 'Celebrations', path: '/celebrations' },
  { number: '05', name: 'Gallery', path: '/gallery' },
  { number: '06', name: 'Contact', path: '/contact' },
];

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUI();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 lg:hidden dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-8 overflow-y-auto font-manrope select-none transition-colors duration-300"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#FF1F02]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Navigation Links */}
          <div className="space-y-6 z-10 my-auto py-4">
            <div className="flex items-center justify-between border-b dark:border-[#333333] border-[#E9E9DE] pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1F02]">
                ● DIRECTORY NAVIGATION
              </span>
              <ThemeToggle variant="button" />
            </div>

            <nav className="flex flex-col space-y-3.5">
              {mobileNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between py-2 border-b dark:border-white/5 border-[#E9E9DE] text-2xl font-extrabold uppercase tracking-tight transition-all duration-300',
                      isActive ? 'text-[#FF1F02] pl-2' : 'dark:text-white text-[#0E0E0E] hover:text-[#FF1F02] hover:pl-2'
                    )
                  }
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold dark:text-white/40 text-[#0E0E0E]/40 group-hover:text-[#FF1F02]">
                      {link.number}
                    </span>
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#FF1F02]" />
                </NavLink>
              ))}
            </nav>

            {/* Quick CTA Button rendering to WhatsApp */}
            <div className="pt-2">
              <a
                href={getWhatsAppBookingUrl('Hello Country Holidays Hotels & Resorts, I would like to book a stay.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="w-full py-4 rounded-full bg-[#FF1F02] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Concierge Footer */}
          <div className="pt-6 border-t dark:border-[#333333] border-[#E9E9DE] flex flex-col space-y-4 z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest dark:text-[#D0D0D0] text-[#0E0E0E]/60">
                Direct Concierge
              </span>
              <EditorialHeritageStamp size={45} centerText="CHHR" text="CHHR HOTELS & RESORTS • " year="2026" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-none dark:bg-black bg-white border dark:border-[#333333] border-[#E9E9DE] dark:text-[#D0D0D0] text-[#0E0E0E] hover:text-[#FF1F02] hover:border-[#FF1F02] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF1F02]" />
                <span className="truncate">Direct Call</span>
              </a>

              <a
                href={getWhatsAppBookingUrl('Hello Country Holidays Concierge, I need assistance.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2.5 rounded-none dark:bg-black bg-white border dark:border-[#333333] border-[#E9E9DE] dark:text-[#D0D0D0] text-[#0E0E0E] hover:text-[#FF1F02] hover:border-[#FF1F02] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF1F02]" />
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

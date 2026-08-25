import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { CONTACT_INFO } from '../../data/contact';
import { useUI } from '../../context/UIContext';
import { cn } from '../../utils/cn';

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden bg-luxury-black/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-12 px-8 overflow-y-auto">
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-6 mt-4">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                'text-2xl font-serif tracking-wide transition-colors duration-200',
                isActive ? 'text-luxury-accent' : 'text-luxury-light'
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Quick Contact Actions */}
      <div className="pt-8 border-t border-luxury-border/60 flex flex-col space-y-4">
        <span className="text-xs uppercase tracking-luxury text-luxury-muted">
          Direct Concierge
        </span>
        <div className="flex flex-col space-y-3">
          <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="flex items-center space-x-3 text-sm text-luxury-light hover:text-luxury-accent"
          >
            <Phone className="w-4 h-4 text-luxury-accent" />
            <span>{CONTACT_INFO.phone}</span>
          </a>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-sm text-luxury-light hover:text-luxury-accent"
          >
            <MessageSquare className="w-4 h-4 text-green-400" />
            <span>WhatsApp Concierge</span>
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center space-x-3 text-sm text-luxury-light hover:text-luxury-accent"
          >
            <Mail className="w-4 h-4 text-luxury-accent" />
            <span>{CONTACT_INFO.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

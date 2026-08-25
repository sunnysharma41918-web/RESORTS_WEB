import React from 'react';
import { Menu, User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="h-20 bg-luxury-black/90 backdrop-blur-xl border-b border-luxury-border px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 select-none">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-luxury-light hover:text-orange-400 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-xs uppercase tracking-luxury text-luxury-muted hidden sm:inline-block font-medium">
          Executive Slowhouse Control Panel
        </span>
      </div>

      <div className="flex items-center space-x-5">
        <ThemeToggle variant="icon" className="w-9 h-9 border-orange-500/30 text-orange-400" />

        <Link
          to="/"
          target="_blank"
          className="hidden md:flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs uppercase tracking-luxury text-orange-400 hover:bg-orange-500 hover:text-black transition-all font-semibold"
        >
          <span>Live Website</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </Link>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-luxury-border">
          <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-[0_0_12px_rgba(255,107,0,0.25)]">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white">Executive Director</div>
            <div className="text-[10px] text-orange-400 uppercase tracking-luxury font-medium">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

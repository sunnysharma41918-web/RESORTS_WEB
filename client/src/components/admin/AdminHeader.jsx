import React from 'react';
import { Menu, User, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminHeader({ onMenuClick, title = 'CHHR Control Center' }) {
  return (
    <header className="h-16 bg-[#0E0E0E] border-b border-[#333333] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none font-manrope">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-white hover:text-[#FF1F02] bg-[#1C1C1C] border border-[#333333] transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#FF1F02] animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            {title}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#1C1C1C] border border-[#333333] hover:border-[#FF1F02] text-xs font-mono uppercase tracking-wider text-white hover:text-[#FF1F02] transition-all font-semibold"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF1F02]" />
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
        </Link>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3 pl-3 border-l border-[#333333]">
          <div className="w-8 h-8 rounded-none bg-[#1C1C1C] border border-[#FF1F02]/60 flex items-center justify-center text-[#FF1F02]">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-white uppercase tracking-tight">Concierge Admin</div>
            <div className="text-[10px] text-[#888888] font-mono uppercase tracking-widest">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

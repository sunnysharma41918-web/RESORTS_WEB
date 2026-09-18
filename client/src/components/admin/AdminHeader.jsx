import React, { useState } from 'react';
import {
  Menu,
  ExternalLink,
  ChevronDown,
  Sparkles,
  User,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../common/BrandLogo';

export default function AdminHeader({ onMenuClick, title = 'CHHR Control Center' }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const displayName = user?.name || 'Estate Concierge';
  const displayEmail = user?.email || 'concierge@countryholidaysresorts.com';

  return (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-[#E5EAE7] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none font-manrope">
      
      {/* Left: Mobile Menu & Mobile Logo */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-gray-700 hover:text-[#134E39] bg-[#F4F6F5] hover:bg-[#EBF5EE] rounded-xl transition-colors shrink-0"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <BrandLogo size="sm" animated={false} />
        </div>
      </div>

      {/* Right: Live Preview & Profile Pill */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Live Site Link */}
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F4F6F5] hover:bg-[#EBF5EE] text-[#134E39] rounded-full text-xs font-semibold border border-transparent hover:border-[#134E39]/30 transition-all shadow-2xs"
          title="Preview Live Resort Experience"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 ml-0.5 text-gray-400" />
        </Link>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-gray-200 hover:border-gray-300 rounded-full transition-all shadow-2xs cursor-pointer"
          >
            {/* Avatar with soft green halo */}
            <div className="w-9 h-9 rounded-full bg-[#EBF5EE] border border-[#134E39]/20 flex items-center justify-center overflow-hidden shrink-0 text-[#134E39]">
              <User className="w-4 h-4" />
            </div>

            <div className="hidden sm:block text-left pr-1">
              <div className="text-xs font-bold text-[#111827] leading-tight">{displayName}</div>
              <div className="text-[10px] text-gray-400 font-normal leading-tight truncate max-w-[150px]">{displayEmail}</div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-[#111827]">{displayName}</p>
                <p className="text-[11px] text-gray-400 truncate">{displayEmail}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#EBF5EE] text-[#134E39] text-[9px] font-bold uppercase rounded-full">
                  Executive Admin
                </span>
              </div>

              <div className="py-1">
                <Link
                  to="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#F4F6F5] hover:text-[#134E39]"
                >
                  System Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

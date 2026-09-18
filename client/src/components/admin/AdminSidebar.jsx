import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BedDouble,
  Image as ImageIcon,
  Tag,
  Flame,
  MessageSquare,
  Settings,
  BookOpen,
  LogOut,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../common/BrandLogo';

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: '02. Accommodations (Resorts & Hotels)', path: '/admin/accommodations', icon: BedDouble },
    { label: 'Offers & Packages', path: '/admin/offers', icon: Tag },
    { label: 'Marquee Ticker', path: '/admin/ticker', icon: Flame },
    { label: 'Media Gallery', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Guest Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  const generalItems = [
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'w-64 lg:w-72 bg-white text-[#111827] border-r border-[#E5EAE7] flex flex-col justify-between p-5 select-none shrink-0 transition-transform duration-300 font-manrope z-50',
        isOpen ? 'fixed inset-y-0 left-0 shadow-2xl' : 'hidden lg:flex'
      )}
    >
      <div className="space-y-7">
        
        {/* Official Brand Logo */}
        <div className="flex items-center justify-between px-1 pt-1">
          <Link to="/admin" className="flex items-center gap-3 group">
            <BrandLogo size="sm" animated={false} />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase text-[#111827] tracking-wider leading-tight">
                Country Holidays
              </span>
              <span className="text-[10px] text-[#134E39] font-bold uppercase tracking-widest">
                Hotels & Resorts CMS
              </span>
            </div>
          </Link>

          {isOpen && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation - Section 1: MANAGEMENT */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 block">
            MANAGEMENT
          </span>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative',
                      isActive
                        ? 'text-[#134E39] font-bold bg-[#EBF5EE]'
                        : 'text-gray-500 hover:text-[#111827] hover:bg-gray-50'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Left green active indicator pill if active */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#134E39] rounded-r-full" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon className={cn('w-4 h-4 transition-colors', isActive ? 'text-[#134E39]' : 'text-gray-400 group-hover:text-gray-600')} />
                        <span>{item.label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Navigation - Section 2: SYSTEM */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 block">
            SYSTEM
          </span>

          <nav className="space-y-1">
            {generalItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative',
                      isActive
                        ? 'text-[#134E39] font-bold bg-[#EBF5EE]'
                        : 'text-gray-500 hover:text-[#111827] hover:bg-gray-50'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer / Live Site & Sign Out */}
      <div className="pt-4 border-t border-gray-100 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F4F6F5] hover:bg-[#EBF5EE] text-xs font-semibold text-[#134E39] transition-all group"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#134E39]" />
            <span>Live Showcase</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#134E39]" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500" />
          <span>Exit Session</span>
        </button>
      </div>

    </aside>
  );
}

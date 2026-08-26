import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BedDouble,
  Image as ImageIcon,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import BrandLogo from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };
  const menuItems = [
    { label: 'Overview & Telemetry', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Accommodations (Suites)', path: '/admin/accommodations', icon: BedDouble },
    { label: 'Offers & Packages', path: '/admin/offers', icon: Tag },
    { label: 'Media & Gallery', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Inquiries CRM (Leads)', path: '/admin/inquiries', icon: MessageSquare },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'w-64 lg:w-68 bg-[#1C1C1C] text-white border-r border-[#333333] flex flex-col justify-between p-6 select-none shrink-0 transition-transform duration-300 font-manrope',
        isOpen ? 'fixed inset-y-0 left-0 z-40' : 'hidden lg:flex'
      )}
    >
      <div className="space-y-8">
        
        {/* Brand Header */}
        <Link to="/admin" className="flex items-center space-x-3 px-1 group">
          <BrandLogo size="sm" animated={true} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-black text-[#FF1F02] border border-[#333333] px-2 py-0.5">
            CMS
          </span>
        </Link>

        {/* Navigation Menu */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] px-3 block">
            ● MANAGEMENT
          </span>

          <nav className="space-y-1.5">
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
                      'flex items-center space-x-3 px-3.5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-200 group border',
                      isActive
                        ? 'bg-[#FF1F02] text-white border-[#FF1F02] shadow-lg font-bold'
                        : 'text-[#D0D0D0] hover:text-white hover:bg-white/5 border-transparent'
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer / Live Site & Sign Out */}
      <div className="pt-6 border-t border-[#333333] space-y-2.5">
        <Link
          to="/"
          target="_blank"
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-none bg-black hover:bg-[#FF1F02] border border-[#333333] text-xs font-mono uppercase tracking-wider text-white hover:text-white transition-all group"
        >
          <span className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FF1F02] group-hover:text-white" />
            <span>Live Showcase</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2.5 px-4 py-2.5 rounded-none bg-transparent hover:bg-red-950/40 border border-transparent hover:border-[#FF1F02] text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Session</span>
        </button>
      </div>
    </aside>
  );
}

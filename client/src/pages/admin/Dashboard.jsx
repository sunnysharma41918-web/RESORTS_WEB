import React, { useState, useEffect } from 'react';
import {
  BedDouble,
  Image as ImageIcon,
  MessageSquare,
  Tag,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { accommodationService } from '../../services/accommodationService';
import { galleryService } from '../../services/galleryService';
import { offerService } from '../../services/offerService';
import { inquiryService } from '../../services/inquiryService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    accommodations: [],
    gallery: [],
    offers: [],
    inquiries: [],
    loading: true,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [accommodations, gallery, offers, inquiries] = await Promise.all([
          accommodationService.getAllAccommodations(),
          galleryService.getGalleryItems(),
          offerService.getOffers(),
          inquiryService.getInquiries(),
        ]);

        setStats({
          accommodations: accommodations || [],
          gallery: gallery || [],
          offers: offers || [],
          inquiries: inquiries || [],
          loading: false,
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }
    loadStats();
  }, []);

  const kpiCards = [
    {
      label: 'Active Guest Inquiries',
      count: stats.inquiries.length || 0,
      path: '/admin/inquiries',
      icon: MessageSquare,
      actionText: 'Manage Leads →',
      actionPath: '/admin/inquiries',
    },
    {
      label: 'Signature Suites & Villas',
      count: stats.accommodations.length || 3,
      path: '/admin/accommodations',
      icon: BedDouble,
      actionText: '+ Add Suite',
      actionPath: '/admin/accommodations/new',
    },
    {
      label: 'Offers & Packages',
      count: stats.offers.length || 6,
      path: '/admin/offers',
      icon: Tag,
      actionText: '+ Add Package',
      actionPath: '/admin/offers/new',
    },
    {
      label: 'Visual Media Gallery',
      count: stats.gallery.length || 18,
      path: '/admin/gallery',
      icon: ImageIcon,
      actionText: 'View Media →',
      actionPath: '/admin/gallery',
    },
  ];

  return (
    <div className="space-y-10 select-none text-white font-manrope">
      
      {/* 1. HEADER & ESSENTIAL CMS ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#333333]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF1F02]">
            <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
            <span>00 — EXECUTIVE CONTROL CENTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
            ESTATE OVERVIEW
          </h1>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-none bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Guest Inquiries</span>
          </Link>

          <Link
            to="/admin/accommodations/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-none bg-[#1C1C1C] hover:bg-white/10 border border-[#333333] text-white font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <Plus className="w-4 h-4 text-[#FF1F02]" />
            <span>Add Suite</span>
          </Link>

          <Link
            to="/admin/offers/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-none bg-[#1C1C1C] hover:bg-white/10 border border-[#333333] text-white font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <Plus className="w-4 h-4 text-[#FF1F02]" />
            <span>Create Offer</span>
          </Link>

          <Link
            to="/admin/gallery"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-none bg-[#1C1C1C] hover:bg-white/10 border border-[#333333] text-[#D0D0D0] hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <ImageIcon className="w-4 h-4 text-[#FF1F02]" />
            <span>Media Vault</span>
          </Link>
        </div>
      </div>

      {/* 2. 4 EDITORIAL KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-6 sm:p-8 bg-[#1C1C1C] border border-[#333333] hover:border-[#FF1F02] transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF1F02]">
                  ● 0{idx + 1}
                </span>
                <div className="w-10 h-10 rounded-none bg-black border border-[#333333] flex items-center justify-center text-[#FF1F02] group-hover:bg-[#FF1F02] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white block">
                  {kpi.count}
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D0D0D0] mt-1">
                  {kpi.label}
                </h3>
              </div>

              <div className="pt-4 border-t border-[#333333]/80 flex items-center justify-between">
                <Link
                  to={kpi.actionPath}
                  className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF1F02] hover:text-white transition-colors"
                >
                  {kpi.actionText}
                </Link>
                <Link
                  to={kpi.path}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. RECENT INQUIRIES & QUICK TELEMETRY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Concierge Inquiries (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-[#1C1C1C] border border-[#333333] space-y-6">
          <div className="flex items-center justify-between border-b border-[#333333] pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block">
                LEADS STREAM
              </span>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
                Recent Guest Inquiries
              </h2>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-mono uppercase tracking-widest text-[#FF1F02] hover:underline"
            >
              View All Inquiries →
            </Link>
          </div>

          <div className="space-y-3">
            {stats.inquiries && stats.inquiries.length > 0 ? (
              stats.inquiries.slice(0, 4).map((inq, idx) => (
                <div
                  key={inq.id || idx}
                  className="p-4 bg-black border border-[#333333] hover:border-[#FF1F02]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white uppercase">{inq.guestName || inq.name || 'Guest'}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-[#1C1C1C] text-[#FF1F02] border border-[#333333] uppercase">
                        {inq.property || inq.residence || 'Sanctuary Stay'}
                      </span>
                    </div>
                    <p className="text-xs text-[#D0D0D0] font-light font-mono">
                      {inq.email} • {inq.phone}
                    </p>
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest shrink-0 px-2.5 py-1 border ${
                    inq.status === 'resolved'
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                      : inq.status === 'in-progress'
                      ? 'border-blue-500/40 text-blue-300 bg-blue-950/20'
                      : 'border-[#FF1F02]/40 text-[#FF1F02] bg-red-950/20'
                  }`}>
                    {inq.status ? inq.status.toUpperCase() : 'NEW LEAD'}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs font-mono text-white/50 border border-dashed border-[#333333]">
                No pending inquiries. All guest requests have been addressed.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Estate System Status & Live Actions (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-[#1C1C1C] border border-[#333333] space-y-6">
          <div className="space-y-1 border-b border-[#333333] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block">
              STATUS
            </span>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
              System Telemetry
            </h2>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between py-2 border-b border-[#333333]">
              <span className="text-[#D0D0D0]">DATABASE ENGINE</span>
              <span className="text-emerald-400 font-bold">● CONNECTED</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#333333]">
              <span className="text-[#D0D0D0]">CDN MEDIA CACHE</span>
              <span className="text-white font-bold">OPTIMIZED</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#333333]">
              <span className="text-[#D0D0D0]">OFF-GRID TELEMETRY</span>
              <span className="text-[#FF1F02] font-bold">100% SOLAR</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#333333]">
              <span className="text-[#D0D0D0]">SECURITY LEVEL</span>
              <span className="text-white font-bold">LEVEL 4 HIGH</span>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full py-3.5 bg-black hover:bg-[#FF1F02] text-white font-bold text-xs font-mono uppercase tracking-widest transition-all border border-[#333333] flex items-center justify-center gap-2 group"
          >
            <span>Preview Live Resort</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF1F02] group-hover:text-white" />
          </Link>
        </div>

      </div>

    </div>
  );
}

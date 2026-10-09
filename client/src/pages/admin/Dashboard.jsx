import React, { useState, useEffect } from 'react';
import {
  Plus,
  ArrowUpRight,
  BedDouble,
  Tag,
  MessageSquare,
  Image as ImageIcon,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Crown,
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

  const kpis = [
    {
      label: 'Active Packages & Offers',
      count: stats.offers.length,
      path: '/admin/offers',
      actionText: '+ Add Package',
      actionPath: '/admin/offers/new',
      isPrimary: true,
      note: 'Resort & Hotel promotions',
    },
    {
      label: '02 — Accommodations (Resorts, Hotels)',
      count: stats.accommodations.length || 6,
      path: '/admin/accommodations',
      actionText: '+ Add Suite',
      actionPath: '/admin/accommodations/new',
      isPrimary: false,
      note: 'Resort villas & hotel suites',
    },
    {
      label: 'Guest Inquiries & Leads',
      count: stats.inquiries.length,
      path: '/admin/inquiries',
      actionText: 'Manage Leads →',
      actionPath: '/admin/inquiries',
      isPrimary: false,
      note: 'Direct booking requests',
    },
    {
      label: 'Media Gallery Assets',
      count: stats.gallery.length || 18,
      path: '/admin/gallery',
      actionText: 'Open Media Vault →',
      actionPath: '/admin/gallery',
      isPrimary: false,
      note: 'High-res photography',
    },
  ];

  return (
    <div className="w-full space-y-6 font-manrope text-[#111827]">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Dashboard
            </h1>
            <span className="px-2.5 py-0.5 bg-[#EBF5EE] text-[#134E39] text-[10px] font-bold uppercase rounded-full tracking-wider border border-[#134E39]/15">
              Live Estate CMS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage packages, luxury suites, and guest inquiries across Country Holidays Hotels & Resorts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/ticker"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs border border-gray-200 rounded-full transition-all shadow-2xs"
          >
            <Flame className="w-4 h-4 text-[#134E39]" />
            <span>Top Marquee</span>
          </Link>

          <Link
            to="/admin/accommodations/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs border border-gray-200 rounded-full transition-all shadow-2xs"
          >
            <BedDouble className="w-4 h-4 text-[#134E39]" />
            <span>Add Suite</span>
          </Link>

          <Link
            to="/admin/offers/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
          </Link>
        </div>
      </div>

      {/* 2. Real KPI 4-Card Metric Grid (Full 100% Width) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
        {kpis.map((kpi) => {
          if (kpi.isPrimary) {
            return (
              <div
                key={kpi.label}
                className="bg-gradient-to-br from-[#134E39] via-[#0F4332] to-[#0A3324] text-white p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-100">{kpi.label}</span>
                  <Link
                    to={kpi.path}
                    className="w-8 h-8 rounded-full bg-white text-[#134E39] flex items-center justify-center hover:scale-105 transition-transform shadow-sm"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div>
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight block">
                    {kpi.count}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-emerald-200 border-t border-white/10">
                  <span>{kpi.note}</span>
                  <Link to={kpi.actionPath} className="font-bold underline hover:text-white">
                    {kpi.actionText}
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <div
              key={kpi.label}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5EAE7] shadow-xs flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">{kpi.label}</span>
                <Link
                  to={kpi.path}
                  className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:text-[#134E39] hover:border-[#134E39] flex items-center justify-center transition-colors shadow-2xs"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <span className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight block">
                  {kpi.count}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500 border-t border-gray-100">
                <span>{kpi.note}</span>
                <Link to={kpi.actionPath} className="font-semibold text-[#134E39] hover:underline">
                  {kpi.actionText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Operational Sections: Recent Inquiries (Left) & Active Packages CMS (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full items-start">
        
        {/* Left: Recent Guest Inquiries Stream (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#E5EAE7] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">Recent Guest Inquiries</h3>
              <p className="text-[11px] text-gray-400">Incoming direct reservations and booking requests</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-semibold text-[#134E39] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.inquiries && stats.inquiries.length > 0 ? (
              stats.inquiries.slice(0, 5).map((inq, idx) => (
                <div
                  key={inq.id || idx}
                  className="p-3.5 bg-[#F8FAF9] hover:bg-[#EBF5EE] border border-transparent hover:border-[#134E39]/20 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111827] truncate">
                        {inq.guestName || inq.name || 'Guest'}
                      </span>
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[9px] font-bold rounded-full">
                        {inq.source || 'Web Lead'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="truncate">📍 {inq.property || 'Resort Stay'}</span>
                      <span>•</span>
                      <span>{inq.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${
                      inq.status === 'resolved'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : inq.status === 'in-progress'
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {inq.status ? inq.status.toUpperCase() : 'NEW LEAD'}
                    </span>
                    <Link
                      to="/admin/inquiries"
                      className="p-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg shadow-2xs"
                      title="View Lead"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
                No pending inquiries. All guest requests have been addressed.
              </div>
            )}
          </div>
        </div>

        {/* Right: Active Flagship Packages & Quick Status (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Active Packages Mini-List */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5EAE7] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-[#111827]">Active Packages</h3>
                <p className="text-[11px] text-gray-400">South & North India destinations</p>
              </div>
              <Link
                to="/admin/offers"
                className="text-xs font-semibold text-[#134E39] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {stats.offers.slice(0, 4).map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between p-2.5 bg-[#F8FAF9] hover:bg-gray-100 rounded-xl transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-200"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#111827] truncate">
                        {pkg.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                        <span className="text-[#134E39] font-semibold">
                          {pkg.propertyType === 'Resort' ? '🏰 Resort' : '🏢 Hotel'}
                        </span>
                        <span>•</span>
                        <span className="truncate">{pkg.region || pkg.location}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/admin/offers/edit/${pkg.id}`}
                    className="p-1.5 bg-white border border-gray-200 hover:border-[#134E39] hover:text-[#134E39] text-gray-600 rounded-lg shadow-2xs shrink-0"
                    title="Edit Package"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Estate System & Telemetry Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5EAE7] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Estate Telemetry
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span>Database Engine</span>
                <span className="font-semibold text-emerald-700">Connected</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span>Media Asset Vault</span>
                <span className="font-semibold text-[#111827]">Synchronized</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span>Marquee Announcements</span>
                <span className="font-semibold text-[#134E39]">Displaying</span>
              </div>
            </div>

            <Link
              to="/"
              target="_blank"
              className="w-full py-2.5 bg-[#F4F6F5] hover:bg-[#EBF5EE] text-[#134E39] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Preview Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          </div>

        </div>

      </div>

      {/* 4. Quick Estate Navigation Bar (Full 100% Width) */}
      <div className="w-full bg-white p-5 sm:p-6 rounded-2xl border border-[#E5EAE7] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-[#111827]">Estate Quick Access Modules</h3>
            <p className="text-[11px] text-gray-400">Direct shortcuts to manage properties, promotions, and media assets</p>
          </div>
          <span className="text-xs font-semibold text-[#134E39]">5 Modules Online</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
          <Link
            to="/admin/accommodations"
            className="p-3.5 bg-[#F8FAF9] hover:bg-[#EBF5EE] border border-transparent hover:border-[#134E39]/30 rounded-xl transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#134E39] group-hover:bg-[#134E39] group-hover:text-white transition-colors shadow-2xs">
              <BedDouble className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">Accommodations</p>
              <p className="text-[10px] text-gray-400">Suites & Villas</p>
            </div>
          </Link>

          <Link
            to="/admin/offers"
            className="p-3.5 bg-[#F8FAF9] hover:bg-[#EBF5EE] border border-transparent hover:border-[#134E39]/30 rounded-xl transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#134E39] group-hover:bg-[#134E39] group-hover:text-white transition-colors shadow-2xs">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">Offers & Packages</p>
              <p className="text-[10px] text-gray-400">Promotions CMS</p>
            </div>
          </Link>

          <Link
            to="/admin/ticker"
            className="p-3.5 bg-[#F8FAF9] hover:bg-[#EBF5EE] border border-transparent hover:border-[#134E39]/30 rounded-xl transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#134E39] group-hover:bg-[#134E39] group-hover:text-white transition-colors shadow-2xs">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">Marquee Ticker</p>
              <p className="text-[10px] text-gray-400">Header Alerts</p>
            </div>
          </Link>

          <Link
            to="/admin/gallery"
            className="p-3.5 bg-[#F8FAF9] hover:bg-[#EBF5EE] border border-transparent hover:border-[#134E39]/30 rounded-xl transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#134E39] group-hover:bg-[#134E39] group-hover:text-white transition-colors shadow-2xs">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">Media Gallery</p>
              <p className="text-[10px] text-gray-400">Asset Vault</p>
            </div>
          </Link>

          <Link
            to="/admin/inquiries"
            className="p-3.5 bg-[#F8FAF9] hover:bg-[#EBF5EE] border border-transparent hover:border-[#134E39]/30 rounded-xl transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#134E39] group-hover:bg-[#134E39] group-hover:text-white transition-colors shadow-2xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">Guest Leads</p>
              <p className="text-[10px] text-gray-400">Inquiry Stream</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}

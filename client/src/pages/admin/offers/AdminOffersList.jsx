import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Tag,
  Gift,
  CheckCircle2,
  Eye,
  MapPin,
  Flame,
  Building2,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { offerService } from '../../../services/offerService';

const PROPERTY_TYPES = [
  { label: 'All Types', value: 'All' },
  { label: 'Resorts', value: 'Resort' },
  { label: 'Hotels', value: 'Hotel' },
];

const REGIONS = [
  { label: 'All Regions', value: 'All' },
  { label: 'South India', value: 'South India' },
  { label: 'North India', value: 'North India' },
];

export default function AdminOffersList() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const data = await offerService.getOffers();
      setOffers(data || []);
    } catch (err) {
      console.error('Failed to load offers:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await offerService.deleteOffer(id);
      setOffers(offers.filter((o) => o.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete offer: ' + err.message);
    }
  }

  const filteredOffers = offers.filter((o) => {
    const matchType =
      selectedType === 'All' ||
      (o.propertyType || '').toLowerCase() === selectedType.toLowerCase() ||
      (o.category || '').toLowerCase().includes(selectedType.toLowerCase());

    const matchRegion =
      selectedRegion === 'All' ||
      (o.region || '').toLowerCase().includes(selectedRegion.toLowerCase()) ||
      (o.location || '').toLowerCase().includes(selectedRegion.toLowerCase());

    const matchSearch =
      search === '' ||
      o.title?.toLowerCase().includes(search.toLowerCase()) ||
      o.description?.toLowerCase().includes(search.toLowerCase()) ||
      o.location?.toLowerCase().includes(search.toLowerCase());

    return matchType && matchRegion && matchSearch;
  });

  return (
    <div className="space-y-6 font-manrope text-[#111827]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Offers & Packages
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage resort and hotel package promotions across South and North India ({offers.length} active).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/ticker"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-xs rounded-full transition-all shadow-2xs shrink-0"
          >
            <Flame className="w-4 h-4 text-[#134E39]" />
            <span>Top Marquee</span>
          </Link>

          <Link
            to="/admin/offers/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5EAE7] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Property Type Tabs */}
          <div className="flex items-center bg-[#F4F6F5] p-1 rounded-xl">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => setSelectedType(pt.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedType === pt.value
                    ? 'bg-white text-[#134E39] shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-[#111827]'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center bg-[#F4F6F5] p-1 rounded-xl">
            {REGIONS.map((rf) => (
              <button
                key={rf.value}
                onClick={() => setSelectedRegion(rf.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedRegion === rf.value
                    ? 'bg-[#134E39] text-white shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-[#111827]'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search package or destination..."
            className="w-full pl-9 pr-3.5 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] placeholder:text-gray-400 rounded-xl outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid of Offers Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white border border-[#E5EAE7] rounded-2xl overflow-hidden shadow-xs animate-pulse">
              <div className="aspect-[16/10] bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E5EAE7] space-y-3 rounded-2xl shadow-xs">
          <p className="text-[#111827] font-bold text-base">No packages found</p>
          <p className="text-xs text-gray-500">Create a new package promotion or adjust your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredOffers.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-[#E5EAE7] hover:border-[#134E39]/40 transition-all flex flex-col justify-between overflow-hidden rounded-2xl shadow-xs hover:shadow-md group"
            >
              {/* Media Thumbnail */}
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-[#134E39] text-white text-[9px] font-bold uppercase rounded-full shadow-xs">
                    {pkg.badge || 'OFFER'}
                  </span>
                  {pkg.propertyType && (
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold uppercase rounded-full">
                      {pkg.propertyType === 'Resort' ? '🏰 Resort' : '🏢 Hotel'}
                    </span>
                  )}
                </div>

                {pkg.region && (
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[#111827] text-[9px] font-bold uppercase rounded-full shadow-2xs">
                    {pkg.region}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-[#134E39] uppercase tracking-wider block font-bold">
                    {pkg.tag}
                  </span>
                  <h3 className="text-sm font-bold text-[#111827] leading-snug line-clamp-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                  {pkg.discount && (
                    <div className="text-[11px] text-[#134E39] font-semibold flex items-center gap-1.5 pt-1">
                      <Gift className="w-3 h-3 text-[#134E39]" />
                      <span>{pkg.discount}</span>
                    </div>
                  )}
                </div>

                {/* Actions & Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium truncate max-w-[140px]">
                    📍 {pkg.location || 'All Destinations'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/admin/offers/edit/${pkg.id}`}
                      className="p-2 border border-gray-200 hover:border-[#134E39] hover:bg-[#EBF5EE] text-gray-600 hover:text-[#134E39] transition-colors rounded-lg shadow-2xs"
                      title="Edit Package"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(pkg.id)}
                      className="p-2 border border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors cursor-pointer rounded-lg shadow-2xs"
                      title="Delete Package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-100 p-6 max-w-sm w-full space-y-4 shadow-2xl rounded-2xl">
            <h3 className="text-base font-bold text-[#111827]">Delete Package?</h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to delete this offer package? It will be removed from the public website immediately.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

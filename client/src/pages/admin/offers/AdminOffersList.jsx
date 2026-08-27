import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Tag, Gift, CheckCircle2, Eye, MapPin, Flame } from 'lucide-react';
import { offerService } from '../../../services/offerService';
import Loader from '../../../components/common/Loader';

const CATEGORIES = [
  'All',
  'Weddings',
  'Corporate',
  'Holidays',
  'Celebrations',
  'Romance',
];

export default function AdminOffersList() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    setLoading(true);
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
    const matchCategory =
      selectedCategory === 'All' ||
      (o.category || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      search === '' ||
      o.title?.toLowerCase().includes(search.toLowerCase()) ||
      o.description?.toLowerCase().includes(search.toLowerCase()) ||
      o.location?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) return <Loader text="LOADING OFFERS & PACKAGES CMS..." />;

  return (
    <div className="space-y-8 font-manrope">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1F02]">
            <Tag className="w-3.5 h-3.5" />
            <span>SPECIAL OFFERS & PACKAGES CMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
            DEALS & PACKAGES
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A0A0] font-light">
            Manage public package promotions, destination wedding deals, and holiday offers ({offers.length} active).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/ticker"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#1C1C1C] hover:bg-[#2A2A2A] border border-[#333333] text-white font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-md shrink-0"
          >
            <Flame className="w-4 h-4 text-[#FF1F02]" />
            <span>Top Marquee Ticker</span>
          </Link>

          <Link
            to="/admin/offers/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW PACKAGE</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FF1F02] text-white font-bold'
                  : 'bg-[#161616] text-[#A0A0A0] hover:text-white border border-[#333333]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search package name..."
            className="w-full pl-9 pr-3 py-2 bg-[#161616] border border-[#333333] focus:border-[#FF1F02] text-white text-xs font-mono placeholder:text-[#666666] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Offers */}
      {filteredOffers.length === 0 ? (
        <div className="p-12 text-center bg-[#161616] border border-[#333333] space-y-4">
          <p className="text-white font-bold uppercase text-lg">No offers found</p>
          <p className="text-xs text-[#888888] font-mono">Create your first package promotion or clear your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#161616] border border-[#333333] hover:border-[#555555] transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Media Thumbnail */}
              <div className="aspect-[16/9] relative overflow-hidden bg-black">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 bg-[#FF1F02] text-white text-[10px] font-mono uppercase font-bold">
                    {pkg.badge || 'OFFER'}
                  </span>
                  <span className="px-2 py-0.5 bg-black/80 text-[#EAB308] border border-[#EAB308]/40 text-[10px] font-mono uppercase">
                    {pkg.category}
                  </span>
                </div>

                {pkg.featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#16A34A] text-white text-[10px] font-mono uppercase font-bold">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#FF1F02] uppercase tracking-widest block font-bold">
                    {pkg.tag}
                  </span>
                  <h3 className="text-lg font-bold uppercase text-white leading-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] font-light line-clamp-2">
                    {pkg.description}
                  </p>
                  {pkg.discount && (
                    <div className="text-xs font-mono text-[#EAB308] flex items-center gap-1.5 pt-1">
                      <Gift className="w-3.5 h-3.5" />
                      <span>{pkg.discount}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#777777]">
                    📍 {pkg.location || 'All Destinations'}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/offers/edit/${pkg.id}`}
                      className="p-2 border border-[#333333] hover:border-[#FF1F02] hover:text-[#FF1F02] text-[#A0A0A0] transition-colors"
                      title="Edit Package"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(pkg.id)}
                      className="p-2 border border-[#333333] hover:border-red-500 hover:text-red-500 text-[#A0A0A0] transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#333333] p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold uppercase text-white">Delete Package?</h3>
            <p className="text-xs text-[#A0A0A0]">
              Are you sure you want to delete this offer package? It will be removed from the public website immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-[#333333] text-white text-xs font-mono uppercase"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono uppercase font-bold"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

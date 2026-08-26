import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Star, MapPin } from 'lucide-react';
import { hotelService } from '../../../services/hotelService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminHotelsList() {
  const [hotels, setHotels] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const loadHotels = async () => {
    const data = await hotelService.getAllHotels();
    setHotels(data);
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await hotelService.deleteHotel(deleteTarget.id);
    addToast(`Hotel "${deleteTarget.name}" was successfully removed.`);
    setDeleteTarget(null);
    loadHotels();
  };

  const handleToggleFeatured = async (hotel) => {
    await hotelService.updateHotel(hotel.id, {
      ...hotel,
      featured: !hotel.featured,
    });
    addToast(`Featured status updated for "${hotel.name}".`);
    loadHotels();
  };

  const columns = [
    {
      header: 'Hotel Name',
      key: 'name',
      render: (h) => (
        <div className="flex items-center space-x-3.5">
          <img
            src={h.featuredImage || h.heroImage}
            alt={h.name}
            className="w-12 h-10 object-cover border border-[#333333] shrink-0"
          />
          <div>
            <div className="text-sm text-white font-bold">{h.name}</div>
            <div className="text-[10px] text-[#FF1F02] font-mono uppercase">{h.slug}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'City & Location',
      key: 'location',
      render: (h) => (
        <span className="flex items-center gap-1 text-xs text-[#D0D0D0]">
          <MapPin className="w-3 h-3 text-[#FF1F02]" />
          <span>{h.location}</span>
        </span>
      ),
    },
    {
      header: 'Rating',
      key: 'rating',
      render: (h) => (
        <span className="flex items-center space-x-1 text-[#EAB308] font-mono font-bold text-xs">
          <Star className="w-3 h-3 fill-current" />
          <span>{h.rating || 5.0}</span>
        </span>
      ),
    },
    {
      header: 'Featured Status',
      key: 'featured',
      render: (h) => (
        <button
          onClick={() => handleToggleFeatured(h)}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold border transition-all cursor-pointer ${
            h.featured
              ? 'bg-[#FF1F02]/20 border-[#FF1F02] text-[#FF1F02] shadow-[0_0_12px_rgba(255,31,2,0.3)]'
              : 'bg-[#1C1C1C] border-[#333333] text-[#888888] hover:text-white'
          }`}
        >
          {h.featured ? '★ Featured' : 'Standard'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8 select-none font-manrope">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
            <span>URBAN & HERITAGE COLLECTION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Boutique Hotels CMS
          </h1>
        </div>

        <Link
          to="/admin/hotels/new"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hotel</span>
        </Link>
      </div>

      <AdminTable
        columns={columns}
        data={hotels}
        searchKey="name"
        searchPlaceholder="Search boutique hotels..."
        actions={(hotel) => (
          <div className="flex items-center justify-end space-x-2">
            <Link
              to={`/hotels/${hotel.slug}`}
              target="_blank"
              className="p-2 border border-[#333333] text-[#888888] hover:text-white hover:border-[#FF1F02] transition-colors"
              title="Preview on live site"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>

            <Link
              to={`/admin/hotels/edit/${hotel.id}`}
              className="p-2 border border-[#333333] text-[#888888] hover:text-[#EAB308] hover:border-[#EAB308] transition-colors"
              title="Edit Hotel"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDeleteTarget(hotel)}
              className="p-2 border border-[#333333] text-[#888888] hover:text-[#FF1F02] hover:border-[#FF1F02] transition-colors cursor-pointer"
              title="Delete Hotel"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Hotel Property"
        message={`Are you sure you wish to delete "${deleteTarget?.name}"?`}
      />
    </div>
  );
}

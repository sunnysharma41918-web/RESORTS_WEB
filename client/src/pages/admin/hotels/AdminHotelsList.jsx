import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Star } from 'lucide-react';
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
        <div className="flex items-center space-x-3">
          <img
            src={h.featuredImage || h.heroImage}
            alt={h.name}
            className="w-12 h-9 object-cover rounded-xl border border-white/10"
          />
          <div>
            <div className="font-display text-sm text-white font-bold">{h.name}</div>
            <div className="text-[10px] text-orange-400 font-mono">{h.slug}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'City & Location',
      key: 'location',
      render: (h) => <span className="text-luxury-sand">{h.location}</span>,
    },
    {
      header: 'Rating',
      key: 'rating',
      render: (h) => (
        <span className="flex items-center space-x-1 text-orange-400 font-bold">
          <Star className="w-3 h-3 fill-current" />
          <span>{h.rating || 5.0}</span>
        </span>
      ),
    },
    {
      header: 'Featured',
      key: 'featured',
      render: (h) => (
        <button
          onClick={() => handleToggleFeatured(h)}
          className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all ${
            h.featured
              ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 shadow-[0_0_12px_rgba(255,107,0,0.3)]'
              : 'bg-luxury-stone/30 border-luxury-border text-luxury-muted'
          }`}
        >
          {h.featured ? 'Featured' : 'Standard'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-orange-400 font-bold block mb-1">
            Urban Collection
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Boutique Hotels CMS</h1>
        </div>

        <Link
          to="/admin/hotels/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-luxury transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105"
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
              className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-white hover:border-orange-500/40 transition-colors"
              title="Preview on live site"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>

            <Link
              to={`/admin/hotels/edit/${hotel.id}`}
              className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-orange-400 hover:border-orange-500/40 transition-colors"
              title="Edit Hotel"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDeleteTarget(hotel)}
              className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
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

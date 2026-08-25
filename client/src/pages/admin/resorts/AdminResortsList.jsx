import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Star } from 'lucide-react';
import { resortService } from '../../../services/resortService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminResortsList() {
  const [resorts, setResorts] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const loadResorts = async () => {
    const data = await resortService.getAllResorts();
    setResorts(data);
  };

  useEffect(() => {
    loadResorts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await resortService.deleteResort(deleteTarget.id);
    addToast(`Sanctuary "${deleteTarget.name}" was successfully removed.`);
    setDeleteTarget(null);
    loadResorts();
  };

  const handleToggleFeatured = async (resort) => {
    await resortService.updateResort(resort.id, {
      ...resort,
      featured: !resort.featured,
    });
    addToast(`Featured status updated for "${resort.name}".`);
    loadResorts();
  };

  const columns = [
    {
      header: 'Sanctuary Name',
      key: 'name',
      render: (r) => (
        <div className="flex items-center space-x-3">
          <img
            src={r.featuredImage || r.heroImage}
            alt={r.name}
            className="w-12 h-9 object-cover rounded-xl border border-white/10"
          />
          <div>
            <div className="font-display text-sm text-white font-bold">{r.name}</div>
            <div className="text-[10px] text-orange-400 font-mono">{r.slug}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      key: 'location',
      render: (r) => <span className="text-luxury-sand">{r.location}</span>,
    },
    {
      header: 'Rating',
      key: 'rating',
      render: (r) => (
        <span className="flex items-center space-x-1 text-orange-400 font-bold">
          <Star className="w-3 h-3 fill-current" />
          <span>{r.rating || 5.0}</span>
        </span>
      ),
    },
    {
      header: 'Featured',
      key: 'featured',
      render: (r) => (
        <button
          onClick={() => handleToggleFeatured(r)}
          className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all ${
            r.featured
              ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 shadow-[0_0_12px_rgba(255,107,0,0.3)]'
              : 'bg-luxury-stone/30 border-luxury-border text-luxury-muted'
          }`}
        >
          {r.featured ? 'Featured' : 'Standard'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-orange-400 font-bold block mb-1">
            Properties Management
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Sanctuaries & Resorts CMS</h1>
        </div>

        <Link
          to="/admin/resorts/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-luxury transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Sanctuary</span>
        </Link>
      </div>

      {/* Resorts Table */}
      <AdminTable
        columns={columns}
        data={resorts}
        searchKey="name"
        searchPlaceholder="Search sanctuaries by name..."
        actions={(resort) => (
          <div className="flex items-center justify-end space-x-2">
            <Link
              to={`/resorts/${resort.slug}`}
              target="_blank"
              className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-white hover:border-orange-500/40 transition-colors"
              title="Preview live"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>

            <Link
              to={`/admin/resorts/edit/${resort.id}`}
              className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-orange-400 hover:border-orange-500/40 transition-colors"
              title="Edit Sanctuary"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDeleteTarget(resort)}
              className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
              title="Delete Sanctuary"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Resort Sanctuary"
        message={`Are you sure you wish to delete "${deleteTarget?.name}"? It will be removed from all public listings.`}
      />
    </div>
  );
}

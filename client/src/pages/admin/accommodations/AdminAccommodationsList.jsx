import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, BedDouble, Eye } from 'lucide-react';
import { accommodationService } from '../../../services/accommodationService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminAccommodationsList() {
  const [accommodations, setAccommodations] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const loadData = async () => {
    const data = await accommodationService.getAllAccommodations();
    setAccommodations(data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await accommodationService.deleteAccommodation(deleteTarget.id);
    addToast(`"${deleteTarget.name}" removed from accommodations.`);
    setDeleteTarget(null);
    loadData();
  };

  const columns = [
    {
      header: 'Villa / Suite',
      key: 'name',
      render: (item) => (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-12 bg-black border border-[#333333] shrink-0 overflow-hidden">
            <img
              src={item.image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=75'}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#FF1F02]/15 text-[#FF1F02] border border-[#FF1F02]/40 font-bold uppercase">
                TIER {item.tier || '01'}
              </span>
              <span className="text-sm font-bold text-white uppercase">{item.name}</span>
            </div>
            <div className="text-xs text-[#A0A0A0] font-light mt-0.5">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Specifications',
      key: 'specs',
      render: (item) => (
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {(Array.isArray(item.specs) ? item.specs : []).map((spec, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 bg-black border border-[#333333] text-[#D0D0D0] uppercase"
            >
              {spec}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Starting Rate',
      key: 'price',
      render: (item) => (
        <span className="text-xs font-mono font-bold text-[#EAB308]">
          {item.price || 'Bespoke Quote'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 select-none font-manrope text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
            <span>02 — ACCOMMODATION CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Signature Suites & Villas
          </h1>
        </div>

        <Link
          to="/admin/accommodations/new"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-widest transition-all shadow-xl self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Suite</span>
        </Link>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={accommodations}
        searchKey="name"
        searchPlaceholder="Search villa or suite..."
        actions={(item) => (
          <div className="flex items-center gap-1.5">
            <Link
              to={`/admin/accommodations/edit/${item.id}`}
              className="p-2 border border-[#333333] text-[#D0D0D0] hover:text-white hover:border-white transition-colors"
              title="Edit Suite"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setDeleteTarget(item)}
              className="p-2 border border-[#333333] text-[#888888] hover:text-[#FF1F02] hover:border-[#FF1F02] transition-colors cursor-pointer"
              title="Delete Suite"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Accommodation"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? It will be removed from the Home page.`}
      />
    </div>
  );
}

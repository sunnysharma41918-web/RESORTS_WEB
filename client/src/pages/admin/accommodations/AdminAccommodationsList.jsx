import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, BedDouble, Eye, Building2, Palmtree } from 'lucide-react';
import { accommodationService } from '../../../services/accommodationService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

const PROPERTY_FILTERS = [
  { label: 'All Accommodations', value: 'All' },
  { label: 'Resorts', value: 'Resort' },
  { label: 'Hotels', value: 'Hotel' },
];

export default function AdminAccommodationsList() {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
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

  const filteredAccommodations = accommodations.filter((item) => {
    if (selectedType === 'All') return true;
    const itemType = item.propertyType || (item.name?.toLowerCase().includes('hotel') ? 'Hotel' : 'Resort');
    return itemType.toLowerCase() === selectedType.toLowerCase();
  });

  const columns = [
    {
      header: 'Villa / Suite',
      key: 'name',
      render: (item) => (
        <div className="flex items-center space-x-3.5">
          <div className="w-16 h-12 rounded-xl bg-gray-100 border border-gray-200 shrink-0 overflow-hidden shadow-2xs">
            <img
              src={item.image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=75'}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#EBF5EE] text-[#134E39] rounded-md uppercase">
                TIER {item.tier || '01'}
              </span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-md">
                {item.propertyType === 'Hotel' ? '🏢 Hotel' : '🏰 Resort'}
              </span>
              <span className="text-xs font-bold text-[#111827]">{item.name}</span>
            </div>
            <div className="text-[11px] text-gray-500 font-normal mt-0.5">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Amenities & Specs',
      key: 'specs',
      render: (item) => (
        <div className="flex flex-wrap gap-1.5 max-w-sm">
          {(Array.isArray(item.specs) ? item.specs : []).map((spec, i) => (
            <span
              key={i}
              className="text-[10px] font-medium px-2 py-0.5 bg-[#F4F6F5] border border-gray-200 text-gray-700 rounded-md"
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
        <span className="text-xs font-bold text-[#134E39]">
          {item.price || 'Bespoke Quote'}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 select-none font-manrope text-[#111827]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5EE] text-[#134E39] text-[10px] font-bold uppercase tracking-widest mb-1.5 border border-[#134E39]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#134E39]" />
            <span>02 — ACCOMMODATION — RESORTS, HOTELS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Accommodations CMS
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage living suites, villas, and luxury hotel rooms across South & North India destinations.
          </p>
        </div>

        <Link
          to="/admin/accommodations/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Suite</span>
        </Link>
      </div>

      {/* Property Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#E5EAE7] rounded-2xl shadow-xs w-fit">
        {PROPERTY_FILTERS.map((pf) => (
          <button
            key={pf.value}
            onClick={() => setSelectedType(pf.value)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedType === pf.value
                ? 'bg-[#134E39] text-white font-bold shadow-xs'
                : 'text-gray-600 hover:text-[#111827] hover:bg-gray-50'
            }`}
          >
            {pf.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredAccommodations}
        searchKey="name"
        searchPlaceholder="Search villa or suite..."
        actions={(item) => (
          <div className="flex items-center gap-1.5">
            <Link
              to={`/admin/accommodations/edit/${item.id}`}
              className="p-2 border border-gray-200 hover:border-[#134E39] hover:bg-[#EBF5EE] text-gray-600 hover:text-[#134E39] transition-colors rounded-lg shadow-2xs"
              title="Edit Suite"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setDeleteTarget(item)}
              className="p-2 border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors rounded-lg shadow-2xs cursor-pointer"
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
        message={`Are you sure you want to delete "${deleteTarget?.name}"? It will be removed from the public accommodations section.`}
      />
    </div>
  );
}

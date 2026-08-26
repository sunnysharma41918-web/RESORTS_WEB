import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Compass, MapPin, Clock } from 'lucide-react';
import { experienceService } from '../../../services/experienceService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminExperiencesList() {
  const [experiences, setExperiences] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const loadExperiences = async () => {
    const data = await experienceService.getAllExperiences();
    setExperiences(data);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await experienceService.deleteExperience(deleteTarget.id);
    addToast(`Experience "${deleteTarget.title}" was removed.`);
    setDeleteTarget(null);
    loadExperiences();
  };

  const handleToggleFeatured = async (exp) => {
    await experienceService.updateExperience(exp.id, {
      ...exp,
      featured: !exp.featured,
    });
    addToast(`Featured status updated for "${exp.title}".`);
    loadExperiences();
  };

  const columns = [
    {
      header: 'Experience Title',
      key: 'title',
      render: (e) => (
        <div className="flex items-center space-x-3.5">
          <img src={e.image} alt={e.title} className="w-12 h-10 object-cover border border-[#333333] shrink-0" />
          <div>
            <div className="text-sm text-white font-bold">{e.title}</div>
            <div className="text-[10px] text-[#FF1F02] font-mono uppercase tracking-wider">{e.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      key: 'location',
      render: (e) => (
        <span className="flex items-center gap-1 text-xs text-[#D0D0D0]">
          <MapPin className="w-3 h-3 text-[#FF1F02]" />
          <span>{e.location}</span>
        </span>
      ),
    },
    {
      header: 'Duration',
      key: 'duration',
      render: (e) => (
        <span className="flex items-center gap-1 text-xs text-[#888888] font-mono">
          <Clock className="w-3 h-3 text-[#EAB308]" />
          <span>{e.duration}</span>
        </span>
      ),
    },
    {
      header: 'Featured Status',
      key: 'featured',
      render: (e) => (
        <button
          onClick={() => handleToggleFeatured(e)}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold border transition-all cursor-pointer ${
            e.featured
              ? 'bg-[#FF1F02]/20 border-[#FF1F02] text-[#FF1F02] shadow-[0_0_12px_rgba(255,31,2,0.3)]'
              : 'bg-[#1C1C1C] border-[#333333] text-[#888888] hover:text-white'
          }`}
        >
          {e.featured ? '★ Featured' : 'Standard'}
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
            <span>CURATED EXPEDITIONS & RITUALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Experiences & Journeys CMS
          </h1>
        </div>

        <Link
          to="/admin/experiences/new"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </Link>
      </div>

      <AdminTable
        columns={columns}
        data={experiences}
        searchKey="title"
        searchPlaceholder="Search curated experiences..."
        actions={(exp) => (
          <div className="flex items-center justify-end space-x-2">
            <Link
              to={`/admin/experiences/edit/${exp.id}`}
              className="p-2 border border-[#333333] text-[#888888] hover:text-[#EAB308] hover:border-[#EAB308] transition-colors"
              title="Edit Experience"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDeleteTarget(exp)}
              className="p-2 border border-[#333333] text-[#888888] hover:text-[#FF1F02] hover:border-[#FF1F02] transition-colors cursor-pointer"
              title="Delete Experience"
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
        title="Delete Signature Experience"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />
    </div>
  );
}

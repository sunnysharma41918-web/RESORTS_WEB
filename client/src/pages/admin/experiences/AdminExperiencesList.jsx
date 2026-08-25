import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Compass } from 'lucide-react';
import { experienceService } from '../../../services/experienceService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import Button from '../../../components/common/Button';
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

  const columns = [
    {
      header: 'Experience Title',
      key: 'title',
      render: (e) => (
        <div className="flex items-center space-x-3">
          <img src={e.image} alt={e.title} className="w-12 h-9 object-cover border border-white/10" />
          <div>
            <div className="font-serif text-sm text-luxury-light font-medium">{e.title}</div>
            <div className="text-[10px] text-luxury-accent uppercase tracking-luxury">{e.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      key: 'location',
      render: (e) => <span className="text-luxury-sand">{e.location}</span>,
    },
    {
      header: 'Duration',
      key: 'duration',
      render: (e) => <span className="text-luxury-muted font-mono">{e.duration}</span>,
    },
    {
      header: 'Featured',
      key: 'featured',
      render: (e) => (
        <span
          className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border ${
            e.featured
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-luxury-stone/30 border-luxury-border text-luxury-muted'
          }`}
        >
          {e.featured ? 'Featured' : 'Standard'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-border">
        <div>
          <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-1">
            Curated Journeys
          </span>
          <h1 className="text-3xl font-serif text-luxury-light">Experiences CMS</h1>
        </div>

        <Button to="/admin/experiences/new" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
          Add Experience
        </Button>
      </div>

      <AdminTable
        columns={columns}
        data={experiences}
        searchKey="title"
        searchPlaceholder="Search experiences..."
        actions={(exp) => (
          <div className="flex items-center justify-end space-x-2">
            <Link
              to={`/admin/experiences/edit/${exp.id}`}
              className="p-2 border border-luxury-border text-luxury-muted hover:text-luxury-accent hover:border-luxury-accent transition-colors"
              title="Edit Experience"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDeleteTarget(exp)}
              className="p-2 border border-luxury-border text-luxury-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
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

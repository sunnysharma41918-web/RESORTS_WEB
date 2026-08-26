import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { experienceService } from '../../../services/experienceService';
import { FormField, FormInput, FormTextarea, FormSelect, FormToggle } from '../../../components/admin/AdminFormField';
import { useToast } from '../../../components/admin/ToastNotification';

const CATEGORIES = [
  { label: 'Ocean & Water', value: 'Ocean & Water' },
  { label: 'Adventure & Safari', value: 'Adventure' },
  { label: 'Spa & Ayurvedic Rituals', value: 'Spa & Wellness' },
  { label: 'Culinary & Royal Feasts', value: 'Culinary & Heritage' },
  { label: 'Bespoke Celebrations', value: 'Celebrations' },
  { label: 'Nature & Wildlife', value: 'Nature' },
];

export default function AdminExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Ocean & Water',
    location: '',
    duration: 'Half Day',
    description: '',
    image: '',
    featured: false,
  });

  useEffect(() => {
    if (isEditing) {
      experienceService.getExperienceById(id).then((e) => {
        if (e) setFormData(e);
      });
    }
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await experienceService.updateExperience(id, formData);
      addToast(`Experience "${formData.title}" updated.`);
    } else {
      await experienceService.createExperience(formData);
      addToast(`Experience "${formData.title}" created.`);
    }

    navigate('/admin/experiences');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl font-manrope text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/experiences"
            className="p-2.5 bg-[#1C1C1C] border border-[#333333] text-[#888888] hover:text-white hover:border-[#FF1F02] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#FF1F02] font-bold block mb-1">
              {isEditing ? 'MODIFY SIGNATURE JOURNEY' : 'NEW CURATED EXPEDITION'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              {isEditing ? `Edit: ${formData.title}` : 'Add Experience'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/experiences"
            className="px-5 py-2.5 bg-[#1C1C1C] border border-[#333333] text-xs font-mono uppercase text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Create Experience'}</span>
          </button>
        </div>
      </div>

      <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
        <FormField label="Experience Title" required>
          <FormInput
            required
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Sunset Yacht Charter & Marine Safari"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FormField label="Category" required>
            <FormSelect
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              options={CATEGORIES}
            />
          </FormField>

          <FormField label="Location" required>
            <FormInput
              required
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Goa Coast"
            />
          </FormField>

          <FormField label="Duration">
            <FormInput
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g. Half Day / 3 Hours"
            />
          </FormField>
        </div>

        <FormField label="Image URL" required>
          <FormInput
            required
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
          />
        </FormField>

        {formData.image && (
          <div className="relative aspect-[16/9] border border-[#333333] overflow-hidden bg-black max-w-md">
            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <FormField label="Full Description" required>
          <FormTextarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Detailed overview of what guests will experience..."
          />
        </FormField>

        <FormToggle
          label="Featured Experience"
          checked={formData.featured}
          onChange={(v) => handleChange('featured', v)}
          description="Display in curated highlights on the main portal"
        />
      </div>
    </form>
  );
}

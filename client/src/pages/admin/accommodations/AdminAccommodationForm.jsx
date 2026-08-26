import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, BedDouble } from 'lucide-react';
import { accommodationService } from '../../../services/accommodationService';
import { FormField, FormInput, FormTextarea, FormToggle } from '../../../components/admin/AdminFormField';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminAccommodationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    tier: '01',
    name: '',
    category: '',
    specs: 'Private Pool, 2–4 Guests, 1,990 SQ FT',
    description: '',
    image: '',
    price: '₹45,000 / Night',
    featured: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      accommodationService.getAccommodationById(id).then((item) => {
        if (item) {
          setFormData({
            tier: item.tier || '01',
            name: item.name || '',
            category: item.category || '',
            specs: Array.isArray(item.specs) ? item.specs.join(', ') : item.specs || '',
            description: item.description || '',
            image: item.image || '',
            price: item.price || '',
            featured: item.featured ?? true,
          });
        }
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const payload = {
      ...formData,
      specs: formData.specs.split(',').map((s) => s.trim()).filter(Boolean),
    };

    if (isEditing) {
      await accommodationService.updateAccommodation(id, payload);
      addToast(`"${formData.name}" updated successfully.`);
    } else {
      await accommodationService.createAccommodation(payload);
      addToast(`"${formData.name}" added to accommodations.`);
    }

    navigate('/admin/accommodations');
  };

  if (loading) {
    return <div className="p-8 text-center text-xs font-mono text-white/50">Loading suite brief...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl font-manrope text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/accommodations"
            className="p-2.5 bg-[#1C1C1C] border border-[#333333] hover:border-[#FF1F02] text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
              <span>{isEditing ? 'UPDATE SPECIFICATION' : 'NEW SUITE ENTRY'}</span>
            </div>
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white">
              {isEditing ? `Edit Suite: ${formData.name}` : 'Add Signature Suite / Villa'}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-widest transition-all shadow-xl cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="p-6 sm:p-8 bg-[#1C1C1C] border border-[#333333] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          
          {/* Tier Number */}
          <div className="sm:col-span-3">
            <FormField label="Tier / Position No." required hint="e.g. 01, 02, 03">
              <FormInput
                type="text"
                value={formData.tier}
                onChange={(e) => handleChange('tier', e.target.value)}
                placeholder="01"
                required
              />
            </FormField>
          </div>

          {/* Suite Name */}
          <div className="sm:col-span-9">
            <FormField label="Suite / Villa Name" required hint="e.g. THE FOREST POOL VILLA">
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="THE MONOLITH GLASS CHALET"
                required
              />
            </FormField>
          </div>

          {/* Category Tagline */}
          <div className="sm:col-span-7">
            <FormField label="Architectural Setting / Category" required hint="e.g. Cantilevered Over Emerald Cliffs">
              <FormInput
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Alpine Pine Ridge Sanctuary"
                required
              />
            </FormField>
          </div>

          {/* Price */}
          <div className="sm:col-span-5">
            <FormField label="Starting Price Rate" hint="e.g. ₹45,000 / Night">
              <FormInput
                type="text"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="₹45,000 / Night"
              />
            </FormField>
          </div>

          {/* Specifications Pills */}
          <div className="sm:col-span-12">
            <FormField label="Specifications & Amenities (Comma Separated)" hint="Enter comma-separated features e.g. Private Pool, 2–4 Guests, 1,990 SQ FT">
              <FormInput
                type="text"
                value={formData.specs}
                onChange={(e) => handleChange('specs', e.target.value)}
                placeholder="Private Pool, 2–4 Guests, 1,990 SQ FT, Glass Pavilion"
                required
              />
            </FormField>
          </div>

          {/* Image URL */}
          <div className="sm:col-span-12">
            <FormField label="Photography Image URL" required hint="High-resolution Unsplash or Cloudinary image URL">
              <FormInput
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=75"
                required
              />
            </FormField>
            {formData.image && (
              <div className="mt-3 aspect-[16/9] max-w-sm overflow-hidden border border-[#333333] bg-black">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-12">
            <FormField label="Editorial Architectural Narrative" required>
              <FormTextarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Private infinity plunge pool cantilevered over emerald coastal cliffs, featuring floor-to-ceiling glass pavilions, private sundeck..."
                required
              />
            </FormField>
          </div>

          {/* Featured */}
          <div className="sm:col-span-12 pt-2">
            <FormToggle
              label="Publish on Landing Page (Section 02 — Accommodation)"
              description="Toggle to show or hide this suite on the public landing page showcase."
              checked={formData.featured}
              onChange={(checked) => handleChange('featured', checked)}
            />
          </div>

        </div>
      </div>
    </form>
  );
}

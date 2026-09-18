import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, BedDouble, Building2, Palmtree } from 'lucide-react';
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
    propertyType: 'Resort',
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
            propertyType: item.propertyType || (item.name?.toLowerCase().includes('hotel') ? 'Hotel' : 'Resort'),
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
    return <div className="p-8 text-center text-xs text-gray-500">Loading suite details...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 font-manrope text-[#111827] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/accommodations"
            className="p-2.5 bg-white border border-gray-200 hover:border-[#134E39] text-gray-700 hover:text-[#134E39] rounded-xl transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#134E39] text-[10px] font-bold uppercase tracking-wider mb-1 border border-[#134E39]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#134E39]" />
              <span>02 — ACCOMMODATION — RESORTS, HOTELS</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
              {isEditing ? `Edit Suite: ${formData.name}` : 'Add Signature Suite / Villa'}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="p-6 sm:p-8 bg-white border border-[#E5EAE7] rounded-2xl shadow-xs space-y-5">
        
        {/* Property Type Radio Selector */}
        <div className="space-y-1.5 pb-4 border-b border-gray-100">
          <label className="text-xs font-bold text-gray-700 block">
            Property Classification *
          </label>
          <div className="flex items-center gap-3">
            {[
              { value: 'Resort', label: 'Resort (Villas, Pavilions & Cottages)', icon: '🏰' },
              { value: 'Hotel', label: 'Hotel (Suites, Urban Chambers & Palaces)', icon: '🏢' },
            ].map((pt) => {
              const active = formData.propertyType === pt.value;
              return (
                <button
                  type="button"
                  key={pt.value}
                  onClick={() => handleChange('propertyType', pt.value)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#EBF5EE] border-[#134E39] text-[#134E39] font-bold shadow-2xs'
                      : 'bg-[#F4F6F5] border-transparent text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span>{pt.icon}</span>
                  <span>{pt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          
          {/* Tier Number */}
          <div className="sm:col-span-3">
            <FormField label="Tier / Display Rank" required helperText="e.g. 01, 02, 03">
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
            <FormField label="Suite / Villa Name" required helperText="e.g. THE MAHARAJA ROYAL PALACE SUITE">
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
            <FormField label="Setting / Category Tagline" required helperText="e.g. Palatial Courtyards & Private Plunge Pool">
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
            <FormField label="Starting Price Rate" helperText="e.g. ₹5,450 / night">
              <FormInput
                type="text"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="₹5,450 / night"
              />
            </FormField>
          </div>

          {/* Specifications Pills */}
          <div className="sm:col-span-12">
            <FormField label="Specifications & Amenities (Comma Separated)" helperText="e.g. Hand-Carved Jharokha, Jacuzzi Plunge, 24/7 Butler, Royal Breakfast">
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
            <FormField label="Photography Image URL" required helperText="High-resolution Unsplash image link">
              <FormInput
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=75"
                required
              />
            </FormField>
            {formData.image && (
              <div className="mt-2.5 aspect-[16/9] max-w-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-2xs">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-12">
            <FormField label="Architectural & Experience Narrative" required>
              <FormTextarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Private plunge pool overlooking lush gardens, featuring marble accents, hand-carved heritage craftwork, and luxury king bedding..."
                required
              />
            </FormField>
          </div>

          {/* Featured Toggle */}
          <div className="sm:col-span-12 pt-2">
            <FormToggle
              label="Publish on Section 02 — Accommodation (Resorts & Hotels)"
              description="Toggle to feature this suite in the public 02 — ACCOMMODATION section."
              checked={formData.featured}
              onChange={(checked) => handleChange('featured', checked)}
            />
          </div>

        </div>
      </div>
    </form>
  );
}

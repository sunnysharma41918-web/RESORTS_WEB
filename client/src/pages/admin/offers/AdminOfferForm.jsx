import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Tag,
  Gift,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Building2,
  Compass,
  MapPin,
  Calendar,
  Image as ImageIcon,
  ShieldCheck,
  Crown,
  Eye,
} from 'lucide-react';
import { offerService } from '../../../services/offerService';
import Loader from '../../../components/common/Loader';

const CATEGORIES = [
  'Resort Package',
  'Hotel Package',
  'Weddings & Celebrations',
  'Corporate Retreats',
  'Heritage & Cultural',
  'Seasonal Holidays',
  'Wellness & Spa',
];

const PROPERTY_TYPES = [
  { value: 'Resort', label: 'Resort Package', icon: '🏰', desc: 'Beachfront, Rainforest, Hill Sanctuaries' },
  { value: 'Hotel', label: 'Hotel Package', icon: '🏢', desc: 'Urban Palaces, City Centers, Heritage Havens' },
];

const REGIONS = [
  { value: 'South India', label: 'South India', icon: '🌴', desc: 'Goa, Bengaluru, Kerala, Ooty, Coorg' },
  { value: 'North India', label: 'North India', icon: '🏔️', desc: 'Jaipur, Udaipur, Manali, Shimla, Himalayas' },
];

const QUICK_LOCATIONS = [
  'Goa & Coastal Karnataka',
  'Bengaluru, Ooty & Coorg',
  'Jaipur, Udaipur & Jodhpur',
  'Manali, Shimla & Dharamshala',
  'Kovalam & Kumarakom Backwaters',
  'Rishikesh & Uttarakhand Hills',
];

export default function AdminOfferForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    propertyType: 'Resort',
    region: 'South India',
    category: 'Resort Package',
    badge: 'ROYAL PRIVILEGE',
    discount: '',
    validTill: 'Valid Year-Round 2026',
    location: 'Goa & Coastal Karnataka',
    description: '',
    image: '',
    featured: true,
    inclusions: [''],
  });

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      loadOffer();
    }
  }, [id]);

  async function loadOffer() {
    try {
      const data = await offerService.getOfferById(id);
      if (data) {
        setFormData({
          title: data.title || '',
          tag: data.tag || '',
          propertyType: data.propertyType || (data.title?.toLowerCase().includes('hotel') ? 'Hotel' : 'Resort'),
          region: data.region || (data.location?.toLowerCase().includes('manali') || data.location?.toLowerCase().includes('jaipur') || data.location?.toLowerCase().includes('shimla') || data.location?.toLowerCase().includes('udaipur') ? 'North India' : 'South India'),
          category: data.category === 'Romance' ? 'Resort Package' : (data.category || 'Resort Package'),
          badge: data.badge || 'ROYAL PRIVILEGE',
          discount: data.discount || '',
          validTill: data.validTill || 'Valid Year-Round 2026',
          location: data.location || '',
          description: data.description || '',
          image: data.image || '',
          featured: data.featured !== undefined ? data.featured : true,
          inclusions: data.inclusions && data.inclusions.length > 0 ? data.inclusions : [''],
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load package details');
    } finally {
      setLoading(false);
    }
  }

  function handleInclusionChange(index, value) {
    const updated = [...formData.inclusions];
    updated[index] = value;
    setFormData({ ...formData, inclusions: updated });
  }

  function addInclusion() {
    setFormData({ ...formData, inclusions: [...formData.inclusions, ''] });
  }

  function removeInclusion(index) {
    const updated = formData.inclusions.filter((_, i) => i !== index);
    setFormData({ ...formData, inclusions: updated.length > 0 ? updated : [''] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.image || !formData.description) {
      alert('Please fill out the Package Title, Image URL, and Description.');
      return;
    }

    setSubmitting(true);
    try {
      const cleanedInclusions = formData.inclusions.filter((inc) => inc.trim() !== '');
      const payload = {
        ...formData,
        inclusions: cleanedInclusions.length > 0 ? cleanedInclusions : ['Complimentary Heritage Breakfast', 'VIP Welcome Refreshment & Concierge'],
      };

      if (isEditing) {
        await offerService.updateOffer(id, payload);
      } else {
        await offerService.createOffer(payload);
      }
      navigate('/admin/offers');
    } catch (err) {
      setError(err.message || 'Failed to save offer package');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loader text="LOADING PACKAGE DETAILS..." />;

  return (
    <div className="w-full space-y-6 font-manrope text-[#111827]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            to="/admin/offers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#134E39] transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all packages</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            {isEditing ? 'Edit Package Promotion' : 'Create New Package'}
          </h1>
          <p className="text-xs text-gray-500 font-normal">
            Configure resort and hotel packages for South & North India tourist destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/offers"
            className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors rounded-full shadow-2xs"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Saving...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form: 8 Cols */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6 bg-white p-6 sm:p-8 border border-[#E5EAE7] rounded-2xl shadow-xs">
          
          {/* Section 1: Classification */}
          <div className="space-y-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134E39]">
              <Compass className="w-4 h-4" />
              <span>01. Property & Region Classification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Property Type Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  Property Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map((pt) => {
                    const active = formData.propertyType === pt.value;
                    return (
                      <button
                        type="button"
                        key={pt.value}
                        onClick={() => setFormData({ ...formData, propertyType: pt.value })}
                        className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                          active
                            ? 'bg-[#EBF5EE] border-[#134E39] text-[#134E39]'
                            : 'bg-[#F4F6F5] border-transparent text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-base mb-1">{pt.icon}</div>
                        <div className="text-xs font-bold">{pt.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Region Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  Tourist Region *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {REGIONS.map((reg) => {
                    const active = formData.region === reg.value;
                    return (
                      <button
                        type="button"
                        key={reg.value}
                        onClick={() => setFormData({ ...formData, region: reg.value })}
                        className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                          active
                            ? 'bg-[#EBF5EE] border-[#134E39] text-[#134E39]'
                            : 'bg-[#F4F6F5] border-transparent text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-base mb-1">{reg.icon}</div>
                        <div className="text-xs font-bold">{reg.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Package Titles & Highlights */}
          <div className="space-y-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134E39]">
              <Crown className="w-4 h-4" />
              <span>02. Package Details & Highlights</span>
            </div>

            {/* Title & Tag */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Goa Coastal Sanctuary Resort Package"
                  className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Subtitle / Region Tag
                </label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. South India • Arabian Sea Haven"
                  className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                />
              </div>
            </div>

            {/* Category, Badge, Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Theme Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. ROYAL PRIVILEGE"
                  className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Discount / Privilege
                </label>
                <input
                  type="text"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="e.g. 20% OFF ALL-INCLUSIVE"
                  className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                />
              </div>
            </div>

            {/* Location & Validity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Applicable Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Goa & Coastal Karnataka"
                  className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_LOCATIONS.map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => setFormData({ ...formData, location: loc })}
                      className="px-2 py-0.5 bg-[#F4F6F5] text-gray-600 hover:text-[#134E39] border border-gray-200 hover:border-[#134E39] text-[10px] rounded-md transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Validity Period
                </label>
                <input
                  type="text"
                  value={formData.validTill}
                  onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                  placeholder="e.g. Valid Season 2026 / Year-Round"
                  className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Photography & Description */}
          <div className="space-y-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134E39]">
              <ImageIcon className="w-4 h-4" />
              <span>03. Photography & Narrative</span>
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Cover Photo URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Overview Narrative *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the experience, luxury amenities, and guest privileges included in this package..."
                className="w-full px-4 py-2.5 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Section 4: Package Inclusions */}
          <div className="space-y-3 pb-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134E39]">
                <Sparkles className="w-4 h-4" />
                <span>04. Package Inclusions</span>
              </div>
              <button
                type="button"
                onClick={addInclusion}
                className="text-xs font-semibold text-[#134E39] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Inclusion</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#134E39] shrink-0" />
                  <input
                    type="text"
                    value={inc}
                    onChange={(e) => handleInclusionChange(idx, e.target.value)}
                    placeholder={`Inclusion ${idx + 1} (e.g. Private Beach Access & Butler Service)`}
                    className="flex-1 px-4 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-xs text-[#111827] rounded-xl outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeInclusion(idx)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Homepage Feature Toggle */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 accent-[#134E39] cursor-pointer rounded"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-gray-700 cursor-pointer">
                Feature on Public Landing Page & Offers Showcase
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {submitting ? 'Saving...' : 'Save & Publish'}
            </button>
          </div>

        </form>

        {/* Right Live Preview: 4 Cols */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#134E39] uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Card Preview</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              {formData.propertyType} • {formData.region}
            </span>
          </div>

          {/* Card Preview */}
          <div className="bg-white border border-[#E5EAE7] rounded-2xl overflow-hidden shadow-md">
            <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.title || 'Preview'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                  <ImageIcon className="w-7 h-7 mb-1 text-gray-300" />
                  <span className="text-[10px]">Provide Image URL</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-[#134E39] text-white text-[9px] font-bold uppercase rounded-full shadow-xs">
                  {formData.badge || 'OFFER'}
                </span>
                <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold uppercase rounded-full">
                  {formData.propertyType === 'Resort' ? '🏰 Resort' : '🏢 Hotel'}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              <div>
                <span className="text-[9px] text-[#134E39] uppercase tracking-wider block font-bold">
                  {formData.tag || 'FLAGSHIP SELECTION'}
                </span>
                <h3 className="text-sm font-bold text-[#111827] line-clamp-1">
                  {formData.title || 'Package Title Preview'}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#134E39] shrink-0" />
                  <span className="truncate">{formData.location || 'Pan-India'}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                {formData.description || 'Package overview text will appear here...'}
              </p>

              {formData.discount && (
                <div className="p-2 bg-[#EBF5EE] text-[#134E39] text-[10px] font-semibold rounded-lg flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{formData.discount}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E5EAE7] rounded-2xl text-[11px] text-gray-500 space-y-1 shadow-2xs">
            <p className="text-[#111827] font-bold text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#134E39]" />
              <span>Real-time Sync</span>
            </p>
            <p>Saved packages immediately update on the public website and booking concierge.</p>
          </div>
        </div>

      </div>

    </div>
  );
}

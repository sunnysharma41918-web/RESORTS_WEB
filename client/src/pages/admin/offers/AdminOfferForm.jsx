import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Tag, Gift, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { offerService } from '../../../services/offerService';
import Loader from '../../../components/common/Loader';

const CATEGORIES = [
  'Weddings',
  'Wellness',
  'Corporate',
  'Holidays',
  'Celebrations',
  'Romance',
];

export default function AdminOfferForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    category: 'Weddings',
    badge: 'SPECIAL OFFER',
    discount: '',
    validTill: 'Valid Year-Round 2026',
    location: 'Chennai & Mumbai Properties',
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
          ...data,
          inclusions: data.inclusions && data.inclusions.length > 0 ? data.inclusions : [''],
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load offer');
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
      alert('Please fill out title, image URL, and description.');
      return;
    }

    setSubmitting(true);
    try {
      const cleanedInclusions = formData.inclusions.filter((inc) => inc.trim() !== '');
      const payload = {
        ...formData,
        inclusions: cleanedInclusions,
      };

      if (isEditing) {
        await offerService.updateOffer(id, payload);
      } else {
        await offerService.createOffer(payload);
      }
      navigate('/admin/offers');
    } catch (err) {
      setError(err.message || 'Failed to save offer');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loader text="LOADING PACKAGE DETAILS..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-manrope">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#333333]">
        <div className="space-y-1">
          <Link
            to="/admin/offers"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#A0A0A0] hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO OFFERS</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
            {isEditing ? 'EDIT OFFER PACKAGE' : 'CREATE NEW PACKAGE'}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-wider transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? 'SAVING...' : 'SAVE PACKAGE'}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/40 border border-red-500 text-red-200 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-[#161616] p-6 sm:p-8 border border-[#333333]">
        
        {/* Title & Tag */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Package Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Royal Destination Wedding Package"
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Subtitle Tag
            </label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="e.g. Celebration Special / Family Holiday Escape"
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Category, Badge, Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Badge Label
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. MOST POPULAR / EARLY BIRD"
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Highlight Benefit / Discount
            </label>
            <input
              type="text"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              placeholder="e.g. Complimentary Decor Consultation"
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Location & Validity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Applicable Location(s)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Chennai, Noida, Mumbai & Delhi"
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
              Validity Note
            </label>
            <input
              type="text"
              value={formData.validTill}
              onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
              placeholder="e.g. Valid Year-Round 2026 / Weekend Stays"
              className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
            Cover Image URL *
          </label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
          />
          {formData.image && (
            <div className="aspect-[16/9] max-w-sm overflow-hidden mt-2 border border-[#333333]">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold block">
            Package Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the inclusions, experience, and value provided by this package..."
            className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-sm focus:outline-none"
          />
        </div>

        {/* Package Inclusions List */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase text-[#A0A0A0] font-bold">
              Package Inclusions (Bullet Points)
            </label>
            <button
              type="button"
              onClick={addInclusion}
              className="text-xs font-mono uppercase text-[#FF1F02] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD INCLUSION</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.inclusions.map((inc, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF1F02] shrink-0" />
                <input
                  type="text"
                  value={inc}
                  onChange={(e) => handleInclusionChange(idx, e.target.value)}
                  placeholder={`Inclusion ${idx + 1} (e.g. 2 Nights Luxury Suite Stay)`}
                  className="flex-1 px-4 py-2.5 bg-black border border-[#333333] focus:border-[#FF1F02] text-white text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeInclusion(idx)}
                  className="p-2.5 text-[#888888] hover:text-red-500 border border-[#333333] cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="pt-4 border-t border-[#333333] flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 accent-[#FF1F02] cursor-pointer"
          />
          <label htmlFor="featured" className="text-xs font-mono uppercase text-white font-bold cursor-pointer">
            Feature on Landing Page ("05 — SPECIAL OFFERS & PACKAGES")
          </label>
        </div>

        {/* Bottom Submit Button */}
        <div className="pt-6 border-t border-[#333333] flex items-center justify-end gap-4">
          <Link
            to="/admin/offers"
            className="px-6 py-3 border border-[#333333] hover:border-white text-white text-xs font-mono uppercase"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-wider transition-all disabled:opacity-50"
          >
            {submitting ? 'SAVING...' : 'SAVE & PUBLISH'}
          </button>
        </div>

      </form>

    </div>
  );
}

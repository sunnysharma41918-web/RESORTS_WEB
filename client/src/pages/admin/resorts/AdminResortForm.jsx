import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Sparkles, BedDouble, Save } from 'lucide-react';
import { resortService } from '../../../services/resortService';
import { FormField, FormInput, FormTextarea, FormToggle } from '../../../components/admin/AdminFormField';
import { slugify } from '../../../utils/slugify';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminResortForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    location: '',
    city: '',
    state: '',
    country: 'India',
    region: 'Coastal',
    rating: 4.95,
    featured: false,
    status: 'active',
    heroImage: '',
    featuredImage: '',
    shortDescription: '',
    description: '',
    contactPhone: '+91 98765 43210',
    contactWhatsapp: '+919876543210',
    contactEmail: 'concierge@countryholidays-resorts.com',
    contactAddress: '',
    galleryUrls: '',
    amenities: [
      { name: 'Private Cliff Infinity Pool', icon: 'Waves' },
      { name: 'Ayurvedic Thermal Spa', icon: 'Sparkles' },
      { name: 'Seafood Pavilion & Cellar', icon: 'Utensils' },
      { name: 'Helipad & Chauffeur Fleet', icon: 'Compass' },
    ],
    rooms: [
      {
        name: 'The Oceanfront Cantilever Villa',
        size: '2,800 sq ft',
        capacity: 'Up to 3 Guests',
        bedType: 'Custom King Bed',
        view: 'Panoramic Ocean',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        description: 'Suspended above the coastal rocks with private plunge pool.',
      },
    ],
  });

  useEffect(() => {
    if (isEditing) {
      resortService.getResortById(id).then((r) => {
        if (r) {
          setFormData({
            ...r,
            contactPhone: r.contact?.phone || '',
            contactWhatsapp: r.contact?.whatsapp || '',
            contactEmail: r.contact?.email || '',
            contactAddress: r.contact?.address || '',
            galleryUrls: Array.isArray(r.gallery) ? r.gallery.join('\n') : '',
            amenities: r.amenities || [],
            rooms: r.rooms || [],
          });
        }
      });
    }
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !isEditing) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleAddRoom = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        {
          name: 'New Luxury Pavilion',
          size: '2,000 sq ft',
          capacity: '2 Guests',
          bedType: 'King Bed',
          view: 'Horizon View',
          image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
          description: 'A serene luxury suite crafted with natural timbers and stone.',
        },
      ],
    }));
  };

  const handleRemoveRoom = (index) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const handleRoomChange = (index, field, value) => {
    setFormData((prev) => {
      const newRooms = [...prev.rooms];
      newRooms[index] = { ...newRooms[index], [field]: value };
      return { ...prev, rooms: newRooms };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const galleryArray = formData.galleryUrls
      ? formData.galleryUrls.split('\n').map((u) => u.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      gallery: galleryArray.length > 0 ? galleryArray : [formData.heroImage || formData.featuredImage],
      contact: {
        phone: formData.contactPhone,
        whatsapp: formData.contactWhatsapp,
        email: formData.contactEmail,
        address: formData.contactAddress || formData.location,
      },
    };

    if (isEditing) {
      await resortService.updateResort(id, payload);
      addToast(`Resort "${payload.name}" updated successfully.`);
    } else {
      await resortService.createResort(payload);
      addToast(`Resort "${payload.name}" created successfully.`);
    }

    navigate('/admin/resorts');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 font-manrope text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/resorts"
            className="p-2.5 bg-[#1C1C1C] border border-[#333333] text-[#888888] hover:text-white hover:border-[#FF1F02] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#FF1F02] font-bold block mb-1">
              {isEditing ? 'MODIFY RESORT RECORD' : 'NEW RESORT SANCTUARY'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              {isEditing ? `Edit: ${formData.name}` : 'Add Resort Sanctuary'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/resorts"
            className="px-5 py-2.5 bg-[#1C1C1C] border border-[#333333] text-xs font-mono uppercase text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Create Resort'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Core Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Resort Name" required>
                <FormInput
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Azure Coast Sanctuary"
                />
              </FormField>

              <FormField label="URL Slug" required helperText="Generated automatically or customize">
                <FormInput
                  required
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="e.g. azure-coast-sanctuary"
                />
              </FormField>
            </div>

            <FormField label="Tagline / Subheading">
              <FormInput
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="e.g. Oceanfront Brutalism & Coastal Serenity"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FormField label="Location / Area" required>
                <FormInput
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Goa, India"
                />
              </FormField>

              <FormField label="City">
                <FormInput
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="e.g. Goa"
                />
              </FormField>

              <FormField label="Region">
                <FormInput
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  placeholder="e.g. Coastal West"
                />
              </FormField>
            </div>

            <FormField label="Short Description (For Cards & Previews)" required>
              <FormTextarea
                rows={2}
                required
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
                placeholder="Brief evocative summary of the resort..."
              />
            </FormField>

            <FormField label="Full Editorial Description" required>
              <FormTextarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Deep architectural and experiential narrative..."
              />
            </FormField>
          </div>

          {/* Media & Imagery */}
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Imagery & Media URLs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Hero Banner Image URL" required>
                <FormInput
                  required
                  value={formData.heroImage}
                  onChange={(e) => handleChange('heroImage', e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </FormField>

              <FormField label="Card / Featured Image URL" required>
                <FormInput
                  required
                  value={formData.featuredImage}
                  onChange={(e) => handleChange('featuredImage', e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </FormField>
            </div>

            <FormField label="Gallery Images (1 URL per line)">
              <FormTextarea
                rows={4}
                value={formData.galleryUrls}
                onChange={(e) => handleChange('galleryUrls', e.target.value)}
                placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              />
            </FormField>
          </div>

          {/* Rooms & Villas Section */}
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <BedDouble className="w-4 h-4 text-[#FF1F02]" />
                <span>Villas & Living Suites ({formData.rooms.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleAddRoom}
                className="text-xs font-mono uppercase tracking-widest text-[#FF1F02] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Villa</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.rooms.map((room, idx) => (
                <div key={idx} className="p-4 bg-black border border-[#333333] space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#EAB308] font-bold">
                      Villa #{idx + 1}
                    </span>
                    {formData.rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRoom(idx)}
                        className="text-[#888888] hover:text-[#FF1F02] transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Suite Name">
                      <FormInput
                        value={room.name}
                        onChange={(e) => handleRoomChange(idx, 'name', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Size / Dimensions">
                      <FormInput
                        value={room.size}
                        onChange={(e) => handleRoomChange(idx, 'size', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Capacity">
                      <FormInput
                        value={room.capacity}
                        onChange={(e) => handleRoomChange(idx, 'capacity', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Bed Type">
                      <FormInput
                        value={room.bedType}
                        onChange={(e) => handleRoomChange(idx, 'bedType', e.target.value)}
                      />
                    </FormField>
                    <FormField label="View / Vista">
                      <FormInput
                        value={room.view}
                        onChange={(e) => handleRoomChange(idx, 'view', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Suite Image URL">
                      <FormInput
                        value={room.image}
                        onChange={(e) => handleRoomChange(idx, 'image', e.target.value)}
                      />
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Featured & Direct Contact */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Featured */}
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Publishing Options
            </h3>

            <FormToggle
              label="Featured on Homepage"
              checked={formData.featured}
              onChange={(v) => handleChange('featured', v)}
              description="Showcase in the primary cinematic editorial row"
            />

            <FormField label="Showcase Rating (1-5)">
              <FormInput
                type="number"
                step="0.01"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
              />
            </FormField>
          </div>

          {/* Concierge & Direct Contact */}
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Sanctuary Concierge
            </h3>

            <FormField label="Direct Phone">
              <FormInput
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
              />
            </FormField>

            <FormField label="WhatsApp Number">
              <FormInput
                value={formData.contactWhatsapp}
                onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
              />
            </FormField>

            <FormField label="Inquiry Email">
              <FormInput
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
              />
            </FormField>

            <FormField label="Physical Sanctuary Address">
              <FormTextarea
                rows={2}
                value={formData.contactAddress}
                onChange={(e) => handleChange('contactAddress', e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </form>
  );
}

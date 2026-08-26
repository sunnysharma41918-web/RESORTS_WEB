import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, BedDouble, Save } from 'lucide-react';
import { hotelService } from '../../../services/hotelService';
import { FormField, FormInput, FormTextarea, FormToggle } from '../../../components/admin/AdminFormField';
import { slugify } from '../../../utils/slugify';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminHotelForm() {
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
    rating: 4.95,
    featured: false,
    status: 'active',
    heroImage: '',
    featuredImage: '',
    shortDescription: '',
    description: '',
    contactPhone: '+91 98765 43220',
    contactWhatsapp: '+919876543220',
    contactEmail: 'concierge@countryholidays-resorts.com',
    contactAddress: '',
    galleryUrls: '',
    facilities: [
      { name: '54th Floor Rooftop Sky Pool', icon: 'Waves' },
      { name: 'Artisan Rooftop Bar & Lounge', icon: 'Wine' },
      { name: 'Private Executive Boardrooms', icon: 'Briefcase' },
    ],
    rooms: [
      {
        name: 'The Skyline Presidential Penthouse',
        size: '3,500 sq ft',
        capacity: '4 Guests',
        bedType: 'Dual King Master Suites',
        view: 'City & Sea View',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
        description: 'Featuring private elevator access, marble fireplace, and wraparound terrace.',
      },
    ],
  });

  useEffect(() => {
    if (isEditing) {
      hotelService.getHotelById(id).then((h) => {
        if (h) {
          setFormData({
            ...h,
            contactPhone: h.contact?.phone || '',
            contactWhatsapp: h.contact?.whatsapp || '',
            contactEmail: h.contact?.email || '',
            contactAddress: h.contact?.address || '',
            galleryUrls: Array.isArray(h.gallery) ? h.gallery.join('\n') : '',
            facilities: h.facilities || [],
            rooms: h.rooms || [],
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
          name: 'Executive Studio Suite',
          size: '1,500 sq ft',
          capacity: '2 Guests',
          bedType: 'King Bed',
          view: 'Urban Skyline',
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
          description: 'Contemporary suite designed for international travelers and executives.',
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
      await hotelService.updateHotel(id, payload);
      addToast(`Hotel "${payload.name}" updated successfully.`);
    } else {
      await hotelService.createHotel(payload);
      addToast(`Hotel "${payload.name}" created successfully.`);
    }

    navigate('/admin/hotels');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 font-manrope text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/hotels"
            className="p-2.5 bg-[#1C1C1C] border border-[#333333] text-[#888888] hover:text-white hover:border-[#FF1F02] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#FF1F02] font-bold block mb-1">
              {isEditing ? 'MODIFY HOTEL RECORD' : 'NEW BOUTIQUE HOTEL'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              {isEditing ? `Edit: ${formData.name}` : 'Add Boutique Hotel'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/hotels"
            className="px-5 py-2.5 bg-[#1C1C1C] border border-[#333333] text-xs font-mono uppercase text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Create Hotel'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Hotel Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Hotel Name" required>
                <FormInput
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. The Grand Vista Urban Tower"
                />
              </FormField>

              <FormField label="URL Slug" required helperText="Generated automatically or customize">
                <FormInput
                  required
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="e.g. grand-vista-hotel"
                />
              </FormField>
            </div>

            <FormField label="Tagline">
              <FormInput
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="e.g. High-Rise Architectural Modernity"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="City & Location" required>
                <FormInput
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Mumbai, Maharashtra"
                />
              </FormField>

              <FormField label="Metropolitan City">
                <FormInput
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="e.g. Mumbai"
                />
              </FormField>
            </div>

            <FormField label="Short Description" required>
              <FormTextarea
                rows={2}
                required
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
              />
            </FormField>

            <FormField label="Full Editorial Description" required>
              <FormTextarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </FormField>
          </div>

          <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Imagery URLs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Hero Banner Image URL" required>
                <FormInput
                  required
                  value={formData.heroImage}
                  onChange={(e) => handleChange('heroImage', e.target.value)}
                />
              </FormField>

              <FormField label="Featured Thumbnail Image URL" required>
                <FormInput
                  required
                  value={formData.featuredImage}
                  onChange={(e) => handleChange('featuredImage', e.target.value)}
                />
              </FormField>
            </div>

            <FormField label="Gallery Images (1 URL per line)">
              <FormTextarea
                rows={4}
                value={formData.galleryUrls}
                onChange={(e) => handleChange('galleryUrls', e.target.value)}
              />
            </FormField>
          </div>

          {/* Rooms / Suites */}
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <BedDouble className="w-4 h-4 text-[#FF1F02]" />
                <span>Executive Suites ({formData.rooms.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleAddRoom}
                className="text-xs font-mono uppercase tracking-widest text-[#FF1F02] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Suite</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.rooms.map((room, idx) => (
                <div key={idx} className="p-4 bg-black border border-[#333333] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#EAB308] font-bold">
                      Suite #{idx + 1}
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
                    <FormField label="Dimensions">
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

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0E0E0E] border border-[#333333] p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Publishing Options
            </h3>

            <FormToggle
              label="Featured on Homepage"
              checked={formData.featured}
              onChange={(v) => handleChange('featured', v)}
            />

            <FormField label="Rating (1-5)">
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

          <div className="bg-[#0E0E0E] border border-[#333333] p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-[#222222] pb-3">
              Hotel Concierge
            </h3>

            <FormField label="Desk Phone">
              <FormInput
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
              />
            </FormField>

            <FormField label="WhatsApp">
              <FormInput
                value={formData.contactWhatsapp}
                onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
              />
            </FormField>

            <FormField label="Concierge Email">
              <FormInput
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </form>
  );
}

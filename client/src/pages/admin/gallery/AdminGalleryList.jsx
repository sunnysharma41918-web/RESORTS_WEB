import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Eye, Image as ImageIcon, Sparkles, MapPin } from 'lucide-react';
import { galleryService } from '../../../services/galleryService';
import Modal from '../../../components/common/Modal';
import { FormField, FormInput, FormSelect } from '../../../components/admin/AdminFormField';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';
import { cn } from '../../../utils/cn';

const CATEGORIES = [
  { label: 'All Categories', value: 'All' },
  { label: 'Customer Satisfaction', value: 'Customer Satisfaction' },
  { label: 'Resorts', value: 'Resorts' },
  { label: 'Hotels', value: 'Hotels' },
  { label: 'Suites & Rooms', value: 'Rooms' },
  { label: 'Weddings & Celebrations', value: 'Weddings' },
  { label: 'Nature & Landscape', value: 'Nature' },
  { label: 'Experiences & Rituals', value: 'Experiences' },
];

export default function AdminGalleryList() {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Resorts',
    location: '',
    image: '',
    aspect: 'aspect-cinematic',
  });

  const loadGallery = async () => {
    const data = await galleryService.getGalleryItems();
    setItems(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const filteredItems = useMemo(() => {
    if (categoryFilter === 'All') return items;
    return items.filter((i) => i.category?.toLowerCase() === categoryFilter.toLowerCase());
  }, [items, categoryFilter]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.image || !newItem.title) return;

    await galleryService.addGalleryItem(newItem);
    addToast('Gallery media asset added successfully.');
    setIsAddModalOpen(false);
    setNewItem({
      title: '',
      category: 'Resorts',
      location: '',
      image: '',
      aspect: 'aspect-cinematic',
    });
    loadGallery();
  };

  const handleDeleteItem = async () => {
    if (!deleteTarget) return;
    await galleryService.deleteGalleryItem(deleteTarget.id);
    addToast('Media asset removed from gallery.');
    setDeleteTarget(null);
    loadGallery();
  };

  return (
    <div className="w-full space-y-6 select-none font-manrope text-[#111827]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Media & Gallery Assets
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage public photography assets, architectural showcases, and guest moments.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#E5EAE7] rounded-2xl shadow-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            className={cn(
              'px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer',
              categoryFilter.toLowerCase() === cat.value.toLowerCase()
                ? 'bg-[#134E39] text-white font-bold shadow-xs'
                : 'text-gray-600 hover:text-[#111827] hover:bg-gray-50'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-[#E5EAE7] hover:border-[#134E39]/40 flex flex-col justify-between overflow-hidden rounded-2xl shadow-xs hover:shadow-md transition-all"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[9px] font-bold uppercase tracking-wider text-[#134E39] rounded-full shadow-2xs">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2.5">
              <div>
                <h4 className="text-xs font-bold text-[#111827] line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#134E39] shrink-0" />
                  <span>{item.location}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-500 hover:text-[#134E39] flex items-center space-x-1 font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Gallery Media Asset"
      >
        <form onSubmit={handleAddItem} className="space-y-4 font-manrope text-[#111827]">
          <FormField label="Asset Title" required>
            <FormInput
              required
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="e.g. Royal Courtyard at Sunset"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" required>
              <FormSelect
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                options={CATEGORIES.filter((c) => c.value !== 'All')}
              />
            </FormField>

            <FormField label="Location / Property Name" required>
              <FormInput
                required
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                placeholder="e.g. Udaipur Royal Heritage Estate"
              />
            </FormField>
          </div>

          <FormField label="Image URL" required helperText="Provide high-resolution direct image link">
            <FormInput
              required
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
          </FormField>

          {newItem.image && (
            <div className="relative aspect-[16/9] border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
              <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs"
            >
              Save Asset
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteItem}
        title="Remove Media Asset"
        message={`Delete "${deleteTarget?.title}" from the public gallery showcase?`}
      />
    </div>
  );
}

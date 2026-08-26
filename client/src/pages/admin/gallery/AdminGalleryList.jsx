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
    <div className="space-y-8 select-none font-manrope">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
            <span>VISUAL ARCHIVE & MEDIA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Media & Gallery Assets CMS
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#333333]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            className={cn(
              'px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer',
              categoryFilter.toLowerCase() === cat.value.toLowerCase()
                ? 'bg-[#FF1F02] text-white border-[#FF1F02] font-bold shadow-md'
                : 'bg-[#0E0E0E] text-[#888888] border-[#333333] hover:border-white/40 hover:text-white'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-[#0E0E0E] border border-[#333333] hover:border-[#FF1F02]/50 flex flex-col justify-between overflow-hidden relative shadow-lg transition-all"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-black/80 backdrop-blur-md text-[9px] font-mono font-bold uppercase tracking-widest text-[#EAB308] border border-[#EAB308]/30">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                <p className="text-xs text-[#888888] line-clamp-1 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#FF1F02] shrink-0" />
                  <span>{item.location}</span>
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#222222] flex items-center justify-between">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#888888] hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 text-[#888888] hover:text-[#FF1F02] transition-colors cursor-pointer"
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
        <form onSubmit={handleAddItem} className="space-y-6 text-white font-manrope">
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
            <div className="relative aspect-[16/9] border border-[#333333] overflow-hidden bg-black">
              <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#333333]">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 bg-[#1C1C1C] border border-[#333333] text-xs font-mono uppercase text-white hover:bg-[#2A2A2A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase transition-all shadow-lg"
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

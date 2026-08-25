import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Eye, Image as ImageIcon } from 'lucide-react';
import { galleryService } from '../../../services/galleryService';
import Modal from '../../../components/common/Modal';
import { FormField, FormInput, FormSelect } from '../../../components/admin/AdminFormField';
import Button from '../../../components/common/Button';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';
import { cn } from '../../../utils/cn';

const CATEGORIES = [
  { label: 'Resorts', value: 'Resorts' },
  { label: 'Hotels', value: 'Hotels' },
  { label: 'Rooms', value: 'Rooms' },
  { label: 'Dining', value: 'Dining' },
  { label: 'Nature', value: 'Nature' },
  { label: 'Experiences', value: 'Experiences' },
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
    return items.filter((i) => i.category.toLowerCase() === categoryFilter.toLowerCase());
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-border">
        <div>
          <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-1">
            Media & Visual Assets
          </span>
          <h1 className="text-3xl font-serif text-luxury-light">Gallery Assets CMS</h1>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
        >
          Add Media Asset
        </Button>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-luxury-border">
        {['All', 'Resorts', 'Hotels', 'Rooms', 'Dining', 'Nature', 'Experiences'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              'px-3.5 py-1.5 text-xs uppercase tracking-luxury border transition-all',
              categoryFilter.toLowerCase() === cat.toLowerCase()
                ? 'bg-luxury-light text-luxury-black border-luxury-light font-medium'
                : 'bg-transparent text-luxury-muted border-luxury-border hover:border-luxury-accent/50 hover:text-luxury-light'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-luxury-card border border-luxury-border flex flex-col justify-between overflow-hidden relative"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-luxury-stone">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-luxury-black/80 backdrop-blur-md text-[9px] uppercase tracking-luxury text-luxury-accent">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-sm font-serif text-luxury-light line-clamp-1">{item.title}</h4>
                <p className="text-xs text-luxury-muted line-clamp-1">{item.location}</p>
              </div>

              <div className="pt-2 border-t border-luxury-border/60 flex items-center justify-between">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-luxury-muted hover:text-luxury-light flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Raw</span>
                </a>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 text-luxury-muted hover:text-red-400 transition-colors"
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
        <form onSubmit={handleAddItem} className="space-y-6">
          <FormField label="Asset Title" required>
            <FormInput
              required
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="e.g. Cliffside Infinity Pool at Dusk"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" required>
              <FormSelect
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                options={CATEGORIES}
              />
            </FormField>

            <FormField label="Location / Property Name" required>
              <FormInput
                required
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                placeholder="e.g. Azure Coast Sanctuary"
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

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-luxury-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Asset
            </Button>
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

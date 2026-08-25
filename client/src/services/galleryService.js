import api from './api';
import { storage } from './storage';

export const galleryService = {
  async getGalleryItems(params = {}) {
    try {
      const response = await api.get('/gallery', { params });
      return response.data || response;
    } catch {
      return storage.getGallery();
    }
  },

  async addGalleryItem(item) {
    try {
      const response = await api.post('/gallery', item);
      return response.data || response;
    } catch {
      const gallery = storage.getGallery();
      const newItem = {
        ...item,
        id: item.id || `gal-${Date.now()}`,
        aspect: item.aspect || 'aspect-cinematic',
      };
      const updated = [newItem, ...gallery];
      storage.saveGallery(updated);
      return newItem;
    }
  },

  async deleteGalleryItem(id) {
    try {
      const response = await api.delete(`/gallery/${id}`);
      return response.data || response;
    } catch {
      const gallery = storage.getGallery();
      const filtered = gallery.filter((g) => g.id !== id);
      storage.saveGallery(filtered);
      return { success: true, id };
    }
  },
};

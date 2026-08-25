import api from './api';
import { storage } from './storage';

export const resortService = {
  async getAllResorts(params = {}) {
    try {
      const response = await api.get('/resorts', { params });
      return response.data || response;
    } catch {
      return storage.getResorts();
    }
  },

  async getResortById(id) {
    try {
      const response = await api.get(`/resorts/${id}`);
      return response.data || response;
    } catch {
      const resorts = storage.getResorts();
      const resort = resorts.find((r) => r.id === id);
      if (!resort) throw new Error('Resort not found');
      return resort;
    }
  },

  async getResortBySlug(slug) {
    try {
      const response = await api.get(`/resorts/slug/${slug}`);
      return response.data || response;
    } catch {
      const resorts = storage.getResorts();
      const resort = resorts.find((r) => r.slug === slug);
      if (!resort) throw new Error('Resort not found');
      return resort;
    }
  },

  async getFeaturedResorts() {
    try {
      const response = await api.get('/resorts/featured');
      return response.data || response;
    } catch {
      const resorts = storage.getResorts();
      return resorts.filter((r) => r.featured);
    }
  },

  async createResort(resortData) {
    try {
      const response = await api.post('/resorts', resortData);
      return response.data || response;
    } catch {
      const resorts = storage.getResorts();
      const newResort = {
        ...resortData,
        id: resortData.id || `resort-${Date.now()}`,
        status: resortData.status || 'active',
        featured: !!resortData.featured,
        gallery: resortData.gallery || [],
        rooms: resortData.rooms || [],
        amenities: resortData.amenities || [],
        experiences: resortData.experiences || [],
      };
      const updated = [newResort, ...resorts];
      storage.saveResorts(updated);
      return newResort;
    }
  },

  async updateResort(id, resortData) {
    try {
      const response = await api.put(`/resorts/${id}`, resortData);
      return response.data || response;
    } catch {
      const resorts = storage.getResorts();
      const index = resorts.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Resort not found');
      
      const updatedResort = { ...resorts[index], ...resortData, id };
      resorts[index] = updatedResort;
      storage.saveResorts(resorts);
      return updatedResort;
    }
  },

  async deleteResort(id) {
    try {
      const response = await api.delete(`/resorts/${id}`);
      return response.data || response;
    } catch {
      const resorts = storage.getResorts();
      const filtered = resorts.filter((r) => r.id !== id);
      storage.saveResorts(filtered);
      return { success: true, id };
    }
  },
};

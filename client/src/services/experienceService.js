import api from './api';
import { storage } from './storage';

export const experienceService = {
  async getAllExperiences(params = {}) {
    try {
      const response = await api.get('/experiences', { params });
      return response.data || response;
    } catch {
      return storage.getExperiences();
    }
  },

  async getExperienceById(id) {
    try {
      const response = await api.get(`/experiences/${id}`);
      return response.data || response;
    } catch {
      const experiences = storage.getExperiences();
      const exp = experiences.find((e) => e.id === id);
      if (!exp) throw new Error('Experience not found');
      return exp;
    }
  },

  async getFeaturedExperiences() {
    try {
      const response = await api.get('/experiences/featured');
      return response.data || response;
    } catch {
      const experiences = storage.getExperiences();
      return experiences.filter((e) => e.featured);
    }
  },

  async createExperience(data) {
    try {
      const response = await api.post('/experiences', data);
      return response.data || response;
    } catch {
      const experiences = storage.getExperiences();
      const newExp = {
        ...data,
        id: data.id || `exp-${Date.now()}`,
        featured: !!data.featured,
      };
      const updated = [newExp, ...experiences];
      storage.saveExperiences(updated);
      return newExp;
    }
  },

  async updateExperience(id, data) {
    try {
      const response = await api.put(`/experiences/${id}`, data);
      return response.data || response;
    } catch {
      const experiences = storage.getExperiences();
      const index = experiences.findIndex((e) => e.id === id);
      if (index === -1) throw new Error('Experience not found');

      const updated = { ...experiences[index], ...data, id };
      experiences[index] = updated;
      storage.saveExperiences(experiences);
      return updated;
    }
  },

  async deleteExperience(id) {
    try {
      const response = await api.delete(`/experiences/${id}`);
      return response.data || response;
    } catch {
      const experiences = storage.getExperiences();
      const filtered = experiences.filter((e) => e.id !== id);
      storage.saveExperiences(filtered);
      return { success: true, id };
    }
  },
};

import api from './api';
import { storage } from './storage';

export const offerService = {
  async getOffers(params = {}) {
    try {
      const response = await api.get('/offers', { params });
      return response.data || response;
    } catch {
      let offers = storage.getOffers();
      if (params.category && params.category !== 'All') {
        offers = offers.filter(
          (o) => o.category?.toLowerCase() === params.category.toLowerCase()
        );
      }
      if (params.featured) {
        offers = offers.filter((o) => o.featured);
      }
      return offers;
    }
  },

  async getOfferById(id) {
    try {
      const response = await api.get(`/offers/${id}`);
      return response.data || response;
    } catch {
      const offers = storage.getOffers();
      const found = offers.find((o) => o.id === id || String(o.id) === String(id));
      if (!found) throw new Error('Package/Offer not found');
      return found;
    }
  },

  async createOffer(offerData) {
    try {
      const response = await api.post('/offers', offerData);
      return response.data || response;
    } catch {
      const offers = storage.getOffers();
      const newOffer = {
        ...offerData,
        id: offerData.id || `pkg-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newOffer, ...offers];
      storage.saveOffers(updated);
      return newOffer;
    }
  },

  async updateOffer(id, offerData) {
    try {
      const response = await api.put(`/offers/${id}`, offerData);
      return response.data || response;
    } catch {
      const offers = storage.getOffers();
      const idx = offers.findIndex((o) => o.id === id || String(o.id) === String(id));
      if (idx === -1) throw new Error('Package/Offer not found');
      offers[idx] = { ...offers[idx], ...offerData, updatedAt: new Date().toISOString() };
      storage.saveOffers(offers);
      return offers[idx];
    }
  },

  async deleteOffer(id) {
    try {
      const response = await api.delete(`/offers/${id}`);
      return response.data || response;
    } catch {
      const offers = storage.getOffers();
      const filtered = offers.filter((o) => o.id !== id && String(o.id) !== String(id));
      storage.saveOffers(filtered);
      return { success: true, id };
    }
  },
};

import api from './api';
import { storage } from './storage';

export const settingsService = {
  async getSettings() {
    try {
      const response = await api.get('/settings');
      return response.data || response;
    } catch {
      return storage.getSettings();
    }
  },

  async updateSettings(newSettings) {
    try {
      const response = await api.put('/settings', newSettings);
      return response.data || response;
    } catch {
      storage.saveSettings(newSettings);
      return newSettings;
    }
  },

  async getTickerOffers() {
    try {
      const response = await api.get('/settings/ticker');
      const data = response?.data !== undefined ? response.data : response;
      if (Array.isArray(data)) {
        storage.saveTickerOffers(data);
        return data;
      }
      return storage.getTickerOffers();
    } catch {
      return storage.getTickerOffers();
    }
  },

  async updateTickerOffers(items) {
    const list = Array.isArray(items) ? items : [];
    // Always persist locally and trigger UI update immediately
    storage.saveTickerOffers(list);

    try {
      const response = await api.put('/settings/ticker', { items: list });
      return response?.data || list;
    } catch (err) {
      console.warn('[settingsService] Failed to sync ticker to backend, saved in localStorage:', err);
      return list;
    }
  },
};

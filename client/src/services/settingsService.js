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
};

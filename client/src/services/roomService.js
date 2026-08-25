import api from './api';
import { ALL_ROOMS } from '../features/rooms/roomData';

export const roomService = {
  async getAllRooms(params = {}) {
    try {
      const response = await api.get('/rooms', { params });
      return response.data || response;
    } catch {
      return ALL_ROOMS;
    }
  },

  async getFeaturedRooms() {
    try {
      const response = await api.get('/rooms/featured');
      return response.data || response;
    } catch {
      return ALL_ROOMS.filter((r) => r.featured);
    }
  },

  async getRoomsByProperty(propertyId) {
    try {
      const response = await api.get(`/rooms/property/${propertyId}`);
      return response.data || response;
    } catch {
      return ALL_ROOMS.filter((r) => r.propertyId === propertyId);
    }
  },
};

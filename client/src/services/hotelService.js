import api from './api';
import { storage } from './storage';

export const hotelService = {
  async getAllHotels(params = {}) {
    try {
      const response = await api.get('/hotels', { params });
      return response.data || response;
    } catch {
      return storage.getHotels();
    }
  },

  async getHotelById(id) {
    try {
      const response = await api.get(`/hotels/${id}`);
      return response.data || response;
    } catch {
      const hotels = storage.getHotels();
      const hotel = hotels.find((h) => h.id === id);
      if (!hotel) throw new Error('Hotel not found');
      return hotel;
    }
  },

  async getHotelBySlug(slug) {
    try {
      const response = await api.get(`/hotels/slug/${slug}`);
      return response.data || response;
    } catch {
      const hotels = storage.getHotels();
      const hotel = hotels.find((h) => h.slug === slug);
      if (!hotel) throw new Error('Hotel not found');
      return hotel;
    }
  },

  async getFeaturedHotels() {
    try {
      const response = await api.get('/hotels/featured');
      return response.data || response;
    } catch {
      const hotels = storage.getHotels();
      return hotels.filter((h) => h.featured);
    }
  },

  async createHotel(hotelData) {
    try {
      const response = await api.post('/hotels', hotelData);
      return response.data || response;
    } catch {
      const hotels = storage.getHotels();
      const newHotel = {
        ...hotelData,
        id: hotelData.id || `hotel-${Date.now()}`,
        status: hotelData.status || 'active',
        featured: !!hotelData.featured,
        gallery: hotelData.gallery || [],
        rooms: hotelData.rooms || [],
        facilities: hotelData.facilities || [],
      };
      const updated = [newHotel, ...hotels];
      storage.saveHotels(updated);
      return newHotel;
    }
  },

  async updateHotel(id, hotelData) {
    try {
      const response = await api.put(`/hotels/${id}`, hotelData);
      return response.data || response;
    } catch {
      const hotels = storage.getHotels();
      const index = hotels.findIndex((h) => h.id === id);
      if (index === -1) throw new Error('Hotel not found');

      const updatedHotel = { ...hotels[index], ...hotelData, id };
      hotels[index] = updatedHotel;
      storage.saveHotels(hotels);
      return updatedHotel;
    }
  },

  async deleteHotel(id) {
    try {
      const response = await api.delete(`/hotels/${id}`);
      return response.data || response;
    } catch {
      const hotels = storage.getHotels();
      const filtered = hotels.filter((h) => h.id !== id);
      storage.saveHotels(filtered);
      return { success: true, id };
    }
  },
};

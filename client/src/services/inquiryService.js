import api from './api';
import { storage } from './storage';

export const inquiryService = {
  async getInquiries() {
    try {
      const response = await api.get('/inquiries');
      return response.data || response;
    } catch {
      return storage.getInquiries();
    }
  },

  async createInquiry(data) {
    try {
      const response = await api.post('/inquiries', data);
      return response.data || response;
    } catch {
      const inquiries = storage.getInquiries();
      const newInquiry = {
        ...data,
        id: `inq-${Date.now()}`,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      const updated = [newInquiry, ...inquiries];
      storage.saveInquiries(updated);
      return newInquiry;
    }
  },

  async updateInquiryStatus(id, status) {
    try {
      const response = await api.patch(`/inquiries/${id}/status`, { status });
      return response.data || response;
    } catch {
      const inquiries = storage.getInquiries();
      const index = inquiries.findIndex((i) => i.id === id);
      if (index === -1) throw new Error('Inquiry not found');

      inquiries[index].status = status;
      storage.saveInquiries(inquiries);
      return inquiries[index];
    }
  },

  async deleteInquiry(id) {
    try {
      const response = await api.delete(`/inquiries/${id}`);
      return response.data || response;
    } catch {
      const inquiries = storage.getInquiries();
      const filtered = inquiries.filter((i) => i.id !== id);
      storage.saveInquiries(filtered);
      return { success: true, id };
    }
  },
};

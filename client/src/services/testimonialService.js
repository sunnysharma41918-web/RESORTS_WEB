import api from './api';
import { TESTIMONIALS_DATA } from '../features/testimonials/testimonialData';

export const testimonialService = {
  async getTestimonials() {
    try {
      const response = await api.get('/testimonials');
      return response.data || response;
    } catch {
      return TESTIMONIALS_DATA;
    }
  },
};

import api from './api';

export const knowledgeBaseService = {
  /**
   * Get all knowledge documents
   */
  async getDocuments(params = {}) {
    try {
      const response = await api.get('/knowledge-base', { params });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching knowledge documents:', error);
      return [];
    }
  },

  /**
   * Get document by ID with chunk previews
   */
  async getDocumentById(id) {
    try {
      const response = await api.get(`/knowledge-base/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      return null;
    }
  },

  /**
   * Upload file document (PDF, DOCX, TXT, CSV)
   */
  async uploadDocument(formData) {
    try {
      const response = await api.post('/knowledge-base/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Upload failed';
      throw new Error(message);
    }
  },

  /**
   * Create manual text knowledge entry
   */
  async createTextKnowledge(payload) {
    try {
      const response = await api.post('/knowledge-base/text', payload);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Creation failed';
      throw new Error(message);
    }
  },

  /**
   * Toggle document active state
   */
  async toggleActive(id) {
    try {
      const response = await api.patch(`/knowledge-base/${id}/toggle`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Toggle failed';
      throw new Error(message);
    }
  },

  /**
   * Delete knowledge document
   */
  async deleteDocument(id) {
    try {
      const response = await api.delete(`/knowledge-base/${id}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Deletion failed';
      throw new Error(message);
    }
  },
};

export default knowledgeBaseService;

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization Token to outgoing requests
api.interceptors.request.use(
  (config) => {
    try {
      const authRaw = localStorage.getItem('country_holidays_admin_auth');
      if (authRaw) {
        const parsed = JSON.parse(authRaw);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      }
    } catch (err) {
      console.warn('[API Service] Failed to retrieve auth token:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor with graceful error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.warn('[API Service] Backend response error or offline:', error.message);
    return Promise.reject(error);
  }
);

export default api;

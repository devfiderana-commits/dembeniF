import axios from 'axios';

// Determine API base URL based on environment
// In production: use VITE_API_URL from .env.production
// In development: use /api (which proxies to localhost via vite.config.js)
const getBaseURL = () => {
  if (import.meta.env.MODE === 'production' && import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/api`;
  }
  return '/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Enable sending credentials (cookies) with requests
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  // Log API calls in development
  if (import.meta.env.MODE === 'development') {
    console.debug(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  }
  return config;
});

// Handle responses and errors globally
API.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === 'development') {
      console.debug(`[API] Response:`, response.status, response.data);
    }
    return response;
  },
  (error) => {
    // Handle 401 (Unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Log errors in development
    if (import.meta.env.MODE === 'development') {
      console.error('[API] Error:', error.response?.status, error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

export default API;

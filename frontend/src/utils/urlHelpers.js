/**
 * Utility functions for constructing API URLs
 */

/**
 * Get the full URL for asset paths (images, avatars, uploads, etc.)
 * @param {string} path - The relative path from the server (e.g., '/uploads/avatar.jpg', '/images/photo.jpg')
 * @returns {string} The full URL for the asset
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  
  // If path is already a full URL (http/https), return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Determine the base URL
  const isProduction = import.meta.env.MODE === 'production';
  const baseUrl = isProduction 
    ? import.meta.env.VITE_API_URL || 'https://dembenif.onrender.com'
    : 'http://localhost:5000';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
};

/**
 * Get the full API base URL
 * @returns {string} The API base URL
 */
export const getApiBaseUrl = () => {
  const isProduction = import.meta.env.MODE === 'production';
  const baseUrl = isProduction 
    ? import.meta.env.VITE_API_URL || 'https://dembenif.onrender.com'
    : 'http://localhost:5000';
  
  return baseUrl;
};

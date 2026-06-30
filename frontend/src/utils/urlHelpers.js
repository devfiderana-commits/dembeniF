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

  // If the path is already absolute, return it as is.
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (import.meta.env.MODE === 'production') {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://dembenif.onrender.com';
    return `${apiUrl}${normalizedPath}`;
  }

  // In development, use relative paths so the Vite proxy handles backend asset requests.
  return normalizedPath;
};

/**
 * Get the full API base URL
 * @returns {string} The API base URL
 */
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || '/api';
};

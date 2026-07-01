import API from './axios';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const serviceAPI = {
  getAll: (params) => API.get('/services', { params }),
  getOne: (id) => API.get(`/services/${id}`),
  create: (data) => API.post('/services', data),
  update: (id, data) => API.put(`/services/${id}`, data),
  delete: (id) => API.delete(`/services/${id}`),
};

export const actualiteAPI = {
  getAll: (params) => API.get('/actualites', { params }),
  create: (data) => API.post('/actualites', data),
  update: (id, data) => API.put(`/actualites/${id}`, data),
  delete: (id) => API.delete(`/actualites/${id}`),
};

export const evenementAPI = {
  getAll: (params) => API.get('/evenements', { params }),
  create: (data) => API.post('/evenements', data),
  update: (id, data) => API.put(`/evenements/${id}`, data),
  delete: (id) => API.delete(`/evenements/${id}`),
};

export const demandeAPI = {
  create: (data) => API.post('/demandes', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getMes: (params) => API.get('/demandes', { params }),
  getAll: (params) => API.get('/demandes', { params }),
  getOne: (id) => API.get(`/demandes/${id}`),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
  getMyMessages: () => API.get('/contact/my'),
  getAllMessages: (params) => API.get('/contact/all', { params }),
  deleteMessage: (id) => API.delete(`/contact/${id}`),
};

export const publicationAPI = {
  getAll: (params) => API.get('/publications', { params }),
  getOne: (id) => API.get(`/publications/${id}`),
  create: (data) => API.post('/publications', data),
  update: (id, data) => API.put(`/publications/${id}`, data),
  delete: (id) => API.delete(`/publications/${id}`),
};

export const demarcheAPI = {
  getAll: (params) => API.get('/demarches', { params }),
  create: (data) => API.post('/demarches', data),
  update: (id, data) => API.put(`/demarches/${id}`, data),
  delete: (id) => API.delete(`/demarches/${id}`),
};

export const projetAPI = {
  getAll: (params) => API.get('/projets', { params }),
  create: (data) => API.post('/projets', data),
  update: (id, data) => API.put(`/projets/${id}`, data),
  delete: (id) => API.delete(`/projets/${id}`),
};

export const adminAPI = {
  getUsers: (params) => API.get('/admin/users', { params }),
  validateUser: (id) => API.put(`/admin/users/${id}/validate`),
  rejectUser: (id) => API.put(`/admin/users/${id}/reject`),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  getDemandes: (params) => API.get('/admin/demandes', { params }),
  respondToDemande: (id, data) => API.post(`/admin/demandes/${id}/respond`, data),
  getStats: () => API.get('/admin/stats'),
};

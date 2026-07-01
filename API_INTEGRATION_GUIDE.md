# API Integration Guide - Dembéni Platform

## Overview
This document provides a complete guide to the available API endpoints and how to use them in the frontend.

## Base URL
- **Development**: `http://localhost:5000/api` (if running locally)
- **Production**: `https://dembenif.onrender.com/api`

The frontend automatically detects the base URL from the `VITE_API_URL` environment variable.

---

## Authentication API

### Register User
```javascript
import { authAPI } from '../api';

const response = await authAPI.register({
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  phone: '+261xxxxxxxxx',
  password: 'secure_password',
  address: '123 Main St',
  quartier: 'Downtown'
});
// Returns: { success: true, data: { _id, firstname, lastname, email, role, status } }
```

### Login User
```javascript
const response = await authAPI.login({
  email: 'john@example.com',
  password: 'secure_password'
});
// Returns: { success: true, data: { _id, firstname, lastname, email, role, status, token } }
```

---

## Services API

### Get All Services
```javascript
import { serviceAPI } from '../api';

const response = await serviceAPI.getAll({ limit: 10, page: 1 });
// Returns: { success: true, data: [services...] }
```

### Get Single Service
```javascript
const response = await serviceAPI.getOne(serviceId);
// Returns: { success: true, data: service }
```

### Create Service (Admin only)
```javascript
const response = await serviceAPI.create({
  title: 'Service Title',
  desc: 'Short description',
  fullDesc: 'Full description',
  icon: 'FiIcon',
  category: 'Health',
  location: 'Address',
  hours: 'Mon-Fri 9am-5pm',
  phone: '+261xxx',
  email: 'email@example.com'
});
```

---

## Actualités (News) API

### Get All Actualités
```javascript
import { actualiteAPI } from '../api';

const response = await actualiteAPI.getAll();
// Returns: { success: true, data: [actualites...] }
```

### Create Actualité (Admin only)
```javascript
const response = await actualiteAPI.create({
  titre: 'News Title',
  contenu: 'News content',
  categorie: 'INFO',
  image: 'image_url'
});
```

### Update Actualité (Admin only)
```javascript
const response = await actualiteAPI.update(actualiteId, {
  titre: 'Updated title',
  contenu: 'Updated content'
});
```

### Delete Actualité (Admin only)
```javascript
const response = await actualiteAPI.delete(actualiteId);
```

---

## Demandes (Citizens Requests) API

### Get My Demands
```javascript
import { demandeAPI } from '../api';

const response = await demandeAPI.getMes({ statut: 'en_attente' });
// Returns: { success: true, data: [demands...] }
```

### Get Single Demand
```javascript
const response = await demandeAPI.getOne(demandeId);
// Returns: { success: true, data: demand }
```

### Create New Demand
```javascript
const formData = new FormData();
formData.append('service', serviceId);
formData.append('description', 'My request description');
formData.append('documents', file1);
formData.append('documents', file2);

const response = await demandeAPI.create(formData);
// Returns: { success: true, data: demand }
```

---

## Contact API

### Send Contact Message
```javascript
import { contactAPI } from '../api';

const response = await contactAPI.send({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+261xxx',
  service: 'Service Name',
  message: 'Your message here'
});
```

### Get My Messages (Protected)
```javascript
const response = await contactAPI.getMyMessages();
```

### Get All Messages (Admin only)
```javascript
const response = await contactAPI.getAllMessages();
```

### Delete Message (Admin only)
```javascript
const response = await contactAPI.deleteMessage(messageId);
```

---

## Events (Événements) API

### Get All Events
```javascript
import { evenementAPI } from '../api';

const response = await evenementAPI.getAll();
```

### Create Event (Admin only)
```javascript
const response = await evenementAPI.create({
  titre: 'Event Title',
  description: 'Event description',
  date: '2024-07-01',
  location: 'Event location'
});
```

---

## Projects (Projets) API

### Get All Projects
```javascript
import { projetAPI } from '../api';

const response = await projetAPI.getAll();
```

### Create Project (Admin only)
```javascript
const response = await projetAPI.create({
  titre: 'Project Title',
  description: 'Project description',
  statut: 'En cours'
});
```

---

## Procedures (Démarches) API

### Get All Procedures
```javascript
import { demarcheAPI } from '../api';

const response = await demarcheAPI.getAll();
```

---

## Publications API

### Get All Publications
```javascript
import { publicationAPI } from '../api';

const response = await publicationAPI.getAll();
```

### Get Single Publication
```javascript
const response = await publicationAPI.getOne(publicationId);
```

---

## Admin API

### Get All Citizens
```javascript
import { adminAPI } from '../api';

const response = await adminAPI.getUsers();
// Returns: { success: true, count: X, data: [users...] }
```

### Validate User Account
```javascript
const response = await adminAPI.validateUser(userId);
// Sets user status to 'approved'
```

### Reject User Account
```javascript
const response = await adminAPI.rejectUser(userId);
// Sets user status to 'rejected'
```

### Delete User
```javascript
const response = await adminAPI.deleteUser(userId);
```

### Get All Demands (Admin View)
```javascript
const response = await adminAPI.getDemandes({ limit: 10 });
// Returns all demands from all citizens
```

### Respond to Demand (Admin)
```javascript
const response = await adminAPI.respondToDemande(demandeId, {
  statut: 'acceptee',
  commentaireAdmin: 'Your response'
});
```

### Get Dashboard Statistics
```javascript
const response = await adminAPI.getStats();
// Returns: { success: true, stats: { total, en_attente, terminee, users } }
```

---

## Error Handling

All API calls should be wrapped in try-catch blocks:

```javascript
try {
  const response = await serviceAPI.getAll();
  // Use response.data
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized - token expired or invalid
    // User is automatically redirected to login
  } else if (error.response?.status === 403) {
    // Forbidden - not allowed to access this resource
  } else if (error.response?.status === 404) {
    // Not found
  } else {
    // Other error
    console.error(error.response?.data?.message || error.message);
  }
}
```

---

## Authentication

All protected endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer {token}
```

The token is automatically attached to all requests by the axios interceptor.

---

## Response Format

All successful responses follow this format:
```javascript
{
  success: true,
  data: {...}  // or [...] for arrays
}
```

Error responses:
```javascript
{
  success: false,
  message: "Error description"
}
```

---

## Unavailable Features

The following features are not yet implemented in the backend and should not be used:

- ❌ Gallery API (`galleryAPI`)
- ❌ Reclamations API (`reclamationAPI`)
- ❌ Auth profile endpoints (getMe, updateProfile, updateAvatar, changePassword)
- ❌ User management endpoints (toggle, changeRole)

---

## Environment Variables

Set these in your `.env.local` file:

```
VITE_API_URL=https://dembenif.onrender.com
```

If not set, defaults to `https://dembenif.onrender.com`

---

## Testing API Endpoints

You can test these endpoints using:
- **Postman**: https://www.postman.com/
- **curl**: Command line tool
- **Thunder Client**: VS Code extension
- **REST Client**: VS Code extension

Example curl command:
```bash
curl -X GET https://dembenif.onrender.com/api/services \
  -H "Authorization: Bearer {token}"
```

---

## Common Issues

### 401 Unauthorized
- Token expired or invalid
- Check localStorage for token
- Token is automatically refreshed on login

### 403 Forbidden
- User doesn't have permission
- Check user role (admin vs citizen)

### CORS Issues
- Ensure VITE_API_URL is in allowed origins
- Check backend CORS configuration

### Data Structure Mismatch
- Some endpoints return `data` array, others return wrapped in `data` object
- Always check the actual response structure


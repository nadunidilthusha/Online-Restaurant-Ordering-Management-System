import api from './axios';

// GET /admin/search?q=pizza  ->  [{ type: 'page' | 'order' | 'dish' | 'message', id, title, subtitle, link }]
export const search = (q) => api.get('/admin/search', { params: { q } }).then((r) => r.data);

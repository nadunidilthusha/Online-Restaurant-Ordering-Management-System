import api from './axios';

// GET should return: [{ id, type: 'order' | 'message' | 'system', title, text, createdAt, read, link }]
export const getNotifications = () => api.get('/admin/notifications').then((r) => r.data);
export const markRead = (id) => api.patch(`/admin/notifications/${id}/read`).then((r) => r.data);
export const markAllRead = () => api.patch('/admin/notifications/read-all').then((r) => r.data);

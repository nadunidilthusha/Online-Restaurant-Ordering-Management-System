import api from './axios';

// page = 'home' | 'about'
export const getContent = (page) => api.get(`/content/${page}`).then((r) => r.data);
export const saveContent = (page, data) => api.put(`/content/${page}`, data).then((r) => r.data);
export const getBanners = () => api.get('/banners').then((r) => r.data);
export const getGallery = () => api.get('/gallery').then((r) => r.data);

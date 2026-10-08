import api from './axios';

export const getAll = (params) => api.get('/contact', { params }).then((r) => r.data);
export const getOne = (id) => api.get(`/contact/${id}`).then((r) => r.data);
export const create = (data) => api.post('/contact', data).then((r) => r.data);
export const update = (id, data) => api.put(`/contact/${id}`, data).then((r) => r.data);
export const remove = (id) => api.delete(`/contact/${id}`).then((r) => r.data);

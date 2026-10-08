import api from './axios';

export const getAll = (params) => api.get('/images', { params }).then((r) => r.data);
export const getOne = (id) => api.get(`/images/${id}`).then((r) => r.data);
export const create = (data) => api.post('/images', data).then((r) => r.data);
export const update = (id, data) => api.put(`/images/${id}`, data).then((r) => r.data);
export const remove = (id) => api.delete(`/images/${id}`).then((r) => r.data);

import api from './axios';

export const getAll = (params) => api.get('/chefs', { params }).then((r) => r.data);
export const getOne = (id) => api.get(`/chefs/${id}`).then((r) => r.data);
export const create = (data) => api.post('/chefs', data).then((r) => r.data);
export const update = (id, data) => api.put(`/chefs/${id}`, data).then((r) => r.data);
export const remove = (id) => api.delete(`/chefs/${id}`).then((r) => r.data);

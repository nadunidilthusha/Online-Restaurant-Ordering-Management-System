import api from './axios';

export const getAll = (params) => api.get('/menu', { params }).then((r) => r.data);
export const getOne = (id) => api.get(`/menu/${id}`).then((r) => r.data);
export const create = (data) => api.post('/menu', data).then((r) => r.data);
export const update = (id, data) => api.put(`/menu/${id}`, data).then((r) => r.data);
export const remove = (id) => api.delete(`/menu/${id}`).then((r) => r.data);

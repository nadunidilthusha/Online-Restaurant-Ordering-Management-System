import api from './axios';

export const getAll = (params) => api.get('/orders', { params }).then((r) => r.data);
export const getOne = (id) => api.get(`/orders/${id}`).then((r) => r.data);
export const create = (data) => api.post('/orders', data).then((r) => r.data);
export const update = (id, data) => api.put(`/orders/${id}`, data).then((r) => r.data);
export const remove = (id) => api.delete(`/orders/${id}`).then((r) => r.data);
export const updateStatus = (id, status) => api.patch(`/orders/${id}/status`, { status }).then((r) => r.data);

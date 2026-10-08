import api from './axios';

export const getDashboard = () => api.get('/admin/dashboard').then((r) => r.data);

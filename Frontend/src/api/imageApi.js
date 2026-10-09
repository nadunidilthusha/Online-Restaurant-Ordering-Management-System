import api from './axios';

export const getAll = (params) => api.get('/images', { params }).then((r) => r.data);
export const remove = (id) => api.delete(`/images/${id}`).then((r) => r.data);

// uploads one file, returns { id, url }
export const upload = (file) => {
  const form = new FormData();
  form.append('image', file);
  return api.post('/images', form).then((r) => r.data);
};

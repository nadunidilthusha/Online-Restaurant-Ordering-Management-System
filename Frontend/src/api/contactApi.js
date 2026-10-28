import api from './axios';

export const getAll = (params) => api.get('/contact', { params }).then((r) => r.data);
export const getOne = (id) => api.get(`/contact/${id}`).then((r) => r.data);
export const create = (data) => api.post('/contact', data).then((r) => r.data);
export const update = (id, data) => api.put(`/contact/${id}`, data).then((r) => r.data);
export const reply = (id, data) => api.post(`/contact/${id}/reply`, data).then((r) => r.data);
export const remove = (id) => api.delete(`/contact/${id}`).then((r) => r.data);

export const getInfo = async () => {
  try {
    const res = await api.get('/contact/info');
    if (res.data) {
      localStorage.setItem('sf_public_contact_info', JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    console.warn('Backend getInfo offline, falling back to local cache:', err.message);
  }
  const cached = localStorage.getItem('sf_public_contact_info');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }
  return {
    phone: '+94 11 234 5678',
    email: 'concierge@saffronfig.com',
    address: '24 Galle Road, Colombo 03, Sri Lanka',
    hours: 'Mon-Sun: 11:00 AM – 11:00 PM',
    valet: 'Complimentary Valet at North Carriage Gate',
  };
};

export const updateInfo = async (data) => {
  localStorage.setItem('sf_public_contact_info', JSON.stringify(data));
  try {
    const res = await api.put('/contact/info', data);
    return res.data;
  } catch (err) {
    console.warn('Backend updateInfo offline, saved to local cache:', err.message);
    return { success: true, data };
  }
};


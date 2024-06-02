import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url.com',
});

export const getPackages = () => api.get('/packages');
export const purchasePackage = (packageId, duration) => api.post('/purchase', { packageId, duration });

export default api;
  
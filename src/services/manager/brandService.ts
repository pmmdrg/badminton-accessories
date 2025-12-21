import api from '@/lib/api';

export async function getAllBrandManager() {
  const res = await api.get('/manager/brand');
  return res.data;
}

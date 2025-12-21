import api from '@/lib/api';

export async function getAllColorManager() {
  const res = await api.get('/manager/color');
  return res.data;
}

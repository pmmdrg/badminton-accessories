import api from '@/lib/api';

export async function getAllSizeManager() {
  const res = await api.get('/manager/size');
  return res.data;
}

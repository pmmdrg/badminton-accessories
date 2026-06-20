import api from '@/lib/api';

export async function getStoreInfoManager() {
  const res = await api.get('/manager/store');

  return res.data;
}

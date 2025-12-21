import api from '@/lib/api';

export async function getAllSizeTypeManager() {
  const res = await api.get('/manager/sizetype');
  return res.data;
}

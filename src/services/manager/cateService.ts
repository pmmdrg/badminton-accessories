import api from '@/lib/api';

export async function getAllCateManager() {
  const res = await api.get('/manager/cate');
  return res.data;
}

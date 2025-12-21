import api from '@/lib/api';

export async function getAllUserManager() {
  const res = await api.get('/manager/get-all-user');
  return res.data;
}

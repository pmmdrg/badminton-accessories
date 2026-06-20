import api from '@/lib/api';

export async function getUserInfo() {
  const res = await api.get('/user/profile');

  return res.data;
}

export async function updateUser(payload: {
  avatar?: string;
  bio?: string;
  fullname?: string;
}) {
  const res = await api.put('/user/update', payload);

  return res.data;
}

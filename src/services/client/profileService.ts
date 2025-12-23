import api from '@/lib/api';

export async function getUserInfo() {
  const res = await api.get('/users/get-profile');

  return res.data;
}

export async function updateUser(payload: {
  avatar?: string;
  bio?: string;
  fullname?: string;
}) {
  const res = await api.put('/users/update-user', payload);

  return res.data;
}

import api from '@/lib/api';

export async function updateProfile(payload: { bio: string }) {
  const res = await api.put('/users/update-profile', payload);

  return res.data;
}

export async function updateUser(payload: { bio: string }) {
  const res = await api.put('/users/update-user', payload);

  return res.data;
}

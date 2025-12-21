import api from '@/lib/api';

export async function getImageKitToken(payload: FormData) {
  const res = await api.post('/imagekit/upload', payload);

  return res.data;
}

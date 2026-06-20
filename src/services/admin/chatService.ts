import api from '@/lib/api';

export async function getAllChatAdmin() {
  const res = await api.get('/admin/conservation');

  return res.data;
}

export async function getMessageByIdAdmin(id: string) {
  const res = await api.get(`/admin/conservation/id?conservationId=${id}`);

  return res.data;
}

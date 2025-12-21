import api from '@/lib/api';

export async function getAllAddressAdmin() {
  const res = await api.get('/admin/address');
  return res.data;
}

export async function getAllAddressByUserIdAdmin(id: string) {
  const res = await api.get(`/admin/address/search/userId?id=${id}`);

  return res.data;
}

export async function getAddressByIdAdmin(id: string) {
  const res = await api.get(`/admin/address/search?id=${id}`);

  return res.data;
}

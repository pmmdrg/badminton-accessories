import api from '@/lib/api';

export async function updateAddress(id: string, payload: { address: string }) {
  const res = await api.put(`/address/update?id=${id}`, payload);

  return res.data;
}

export async function getAllAddressByUser() {
  const res = await api.get('/address/search-by-user');

  return res.data;
}

export async function createAddress(payload: {
  address: string;
  city: string;
  province: string;
  phone: string;
}) {
  const res = await api.post('/address/create', payload);

  return res.data;
}

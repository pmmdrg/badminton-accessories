import api from '@/lib/api';

export async function findAllBrandActive() {
  const res = await api.get('/brand');

  return res.data;
}

export async function findBrandById(id: string) {
  const res = await api.get(`/brand/id?id=${id}`);

  return res.data;
}

export async function findBrandByName(name: string) {
  const res = await api.get(`/brand/name?brandName=${name}`);

  return res.data;
}

import api from '@/lib/api';

export async function findAllProductActive() {
  const res = await api.get('/product');
  return res.data;
}

export async function findProductById(id: string) {
  const res = await api.get(`/product/id?id=${id}`);
  return res.data;
}

export async function findProductByName(name: string) {
  const res = await api.get(`/product/name?nameProduct=${name}`);
  return res.data;
}

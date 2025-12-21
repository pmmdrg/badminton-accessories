import api from '@/lib/api';

export async function createProduct(payload: {
  brandId: string;
  cateId: string;
  nameProduct: string;
  imageProduct: string;
  description: string;
}) {
  const res = await api.post('/manager/product/create', payload);
  return res.data;
}

export async function getAllProductManager() {
  const res = await api.get('/manager/product');
  return res.data;
}

export async function getAllActiveProductManager() {
  const res = await api.get('/manager/product/active');
  return res.data;
}

export async function getAllInactiveProductManager() {
  const res = await api.get('/manager/product/inactive');
  return res.data;
}

export async function getProductByIdManager(id: string) {
  const res = await api.get(`/manager/product/search/id?id=${id}`);

  return res.data;
}

export async function getProductByNameManager(name: string) {
  const res = await api.get(`/manager/product/search/name?nameProduct=${name}`);

  return res.data;
}

export async function updateProduct(
  id: string,
  payload: {
    brandId?: string;
    cateId?: string;
    nameProduct?: string;
    imageProduct?: string;
    description?: string;
  }
) {
  const res = await api.put(`/manager/product/update?id=${id}`, payload);
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await api.put(`/manager/product/delete?id=${id}`);
  return res.data;
}

export async function restoreProduct(id: string) {
  const res = await api.put(`/manager/product/restore?id=${id}`);
  return res.data;
}

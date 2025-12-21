import api from '@/lib/api';

export async function createProduct(payload: {
  brandId: string;
  cateId: string;
  sizeTypeId: string;
  nameProduct: string;
  imageProduct: string;
  description: string;
}) {
  const res = await api.post('/admin/product/create', payload);
  return res.data;
}

export async function getAllProductAdmin() {
  const res = await api.get('/admin/product');
  return res.data;
}

export async function getAllActiveProductAdmin() {
  const res = await api.get('/admin/product/active');
  return res.data;
}

export async function getAllInactiveProductAdmin() {
  const res = await api.get('/admin/product/inactive');
  return res.data;
}

export async function getProductByIdAdmin(id: string) {
  const res = await api.get(`/admin/product/search/id?id=${id}`);

  return res.data;
}

export async function getProductByNameAdmin(name: string) {
  const res = await api.get(`/admin/product/search/name?nameProduct=${name}`);

  return res.data;
}

export async function updateProduct(
  id: string,
  payload: {
    brandId?: string;
    cateId?: string;
    sizeTypeId?: string;
    nameProduct?: string;
    imageProduct?: string;
    description?: string;
  }
) {
  const res = await api.put(`/admin/product/update?id=${id}`, payload);
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await api.put(`/admin/product/delete?id=${id}`);
  return res.data;
}

export async function restoreProduct(id: string) {
  const res = await api.put(`/admin/product/restore?id=${id}`);
  return res.data;
}

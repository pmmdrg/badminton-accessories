import api from '@/lib/api';

export async function createProductItem(payload: {
  productId: string;
  sizeId: string;
  colorId: string;
  nameProductItem: string;
  imageProductItem: string[];
  description: string;
  price: number;
}) {
  const res = await api.post('/admin/productitem/create', payload);
  return res.data;
}

export async function getAllProductItemAdmin() {
  const res = await api.get('/admin/productitem');
  return res.data;
}

export async function getAllActiveProductItemAdmin() {
  const res = await api.get('/admin/productitem/active');
  return res.data;
}

export async function getAllInactiveProductItemAdmin() {
  const res = await api.get('/admin/productitem/inactive');
  return res.data;
}

export async function getProductItemByIdAdmin(id: string) {
  const res = await api.get(`/admin/productitem/search/id?id=${id}`);

  return res.data;
}

export async function getProductItemByNameAdmin(name: string) {
  const res = await api.get(
    `/admin/productitem/search/name?nameProductItem=${name}`
  );

  return res.data;
}

export async function updateProductItem(
  id: string,
  payload: {
    productId?: string;
    sizeId?: string;
    colorId?: string;
    nameProductItem?: string;
    imageProductItem?: string[];
    description?: string;
    price?: number;
    quantity?: number;
  }
) {
  const res = await api.put(`/admin/productitem/update?id=${id}`, payload);
  return res.data;
}

export async function deleteProductItem(id: string) {
  const res = await api.put(`/admin/productitem/delete?id=${id}`);
  return res.data;
}

export async function restoreProductItem(id: string) {
  const res = await api.put(`/admin/productitem/restore?id=${id}`);
  return res.data;
}

import api from '@/lib/api';

export async function createProductItem(payload: {
  productId: string;
  sizeId: string;
  colorId: string;
  nameProductItem: string;
  imageProductItem: string;
  description: string;
  price: number;
  quantity: number;
}) {
  const res = await api.post('/manager/productitem/create', payload);
  return res.data;
}

export async function getAllProductItemManager() {
  const res = await api.get('/manager/productitem');
  return res.data;
}

export async function getAllActiveProductItemManager() {
  const res = await api.get('/manager/productitem/active');
  return res.data;
}

export async function getAllInactiveProductItemManager() {
  const res = await api.get('/manager/productitem/inactive');
  return res.data;
}

export async function getProductItemByIdManager(id: string) {
  const res = await api.get(`/manager/productitem/search/id?id=${id}`);

  return res.data;
}

export async function getProductItemByNameManager(name: string) {
  const res = await api.get(
    `/manager/productitem/search/name?nameProductItem=${name}`
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
    imageProductItem?: string;
    description?: string;
    price?: number;
    quantity?: number;
  }
) {
  const res = await api.put(`/manager/productitem/update?id=${id}`, payload);
  return res.data;
}

export async function deleteProductItem(id: string) {
  const res = await api.put(`/manager/productitem/delete?id=${id}`);
  return res.data;
}

export async function restoreProductItem(id: string) {
  const res = await api.put(`/manager/productitem/restore?id=${id}`);
  return res.data;
}

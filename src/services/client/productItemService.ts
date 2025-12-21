import api from '@/lib/api';

export async function findAllProductItemActive() {
  const res = await api.get('/productitem');
  return res.data;
}

export async function findProductItemById(id: string) {
  const res = await api.get(`/productitem/id?id=${id}`);

  return res.data;
}

export async function findProductItemByName(name: string) {
  const res = await api.get(`/productitem/name?nameProductItem=${name}`);

  return res.data;
}

export async function findProductItemByBrandId(id: string) {
  const res = await api.get(`/productitem/brand?id=${id}`);

  return res.data;
}

export async function findProductItemByCateId(id: string) {
  const res = await api.get(`/productitem/cate?id=${id}`);

  return res.data;
}

export async function findProductItemByProductId(id: string) {
  const res = await api.get(`/productitem/product?id=${id}`);

  return res.data;
}

export async function findProductItemBySizeId(id: string) {
  const res = await api.get(`/productitem/size?id=${id}`);

  return res.data;
}

export async function findProductItemByColorId(id: string) {
  const res = await api.get(`/productitem/color?id=${id}`);

  return res.data;
}

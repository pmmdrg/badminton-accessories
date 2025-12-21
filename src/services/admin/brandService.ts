import api from '@/lib/api';

export async function createBrand(payload: {
  nameBrand: string;
  imageBrand: string;
  country: string;
  description: string;
}) {
  const res = await api.post('/admin/brand/create', payload);
  return res.data;
}

export async function getAllBrandAdmin() {
  const res = await api.get('/admin/brand');
  return res.data;
}

export async function getAllActiveBrandAdmin() {
  const res = await api.get('/admin/brand/active');
  return res.data;
}

export async function getAllInactiveBrandAdmin() {
  const res = await api.get('/admin/brand/inactive');
  return res.data;
}

export async function getBrandByIdAdmin(id: string) {
  const res = await api.get(`/admin/brand/search/id?id=${id}`);

  return res.data;
}

export async function getBrandByNameAdmin(name: string) {
  const res = await api.get(`/admin/brand/search/name?nameBrand=${name}`);

  return res.data;
}

export async function updateBrand(
  id: string,
  payload: {
    nameBrand?: string;
    imageBrand?: string;
    country?: string;
    description?: string;
  }
) {
  const res = await api.put(`/admin/brand/update?id=${id}`, payload);
  return res.data;
}

export async function deleteBrand(id: string) {
  const res = await api.put(`/admin/brand/delete?id=${id}`);
  return res.data;
}

export async function restoreBrand(id: string) {
  const res = await api.put(`/admin/brand/restore?id=${id}`);
  return res.data;
}

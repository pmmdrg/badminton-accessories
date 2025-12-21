import api from '@/lib/api';

export async function createCate(payload: {
  nameCate: string;
  imageCate: string;
  description: string;
}) {
  const res = await api.post('/admin/cate/create', payload);
  return res.data;
}

export async function getAllCateAdmin() {
  const res = await api.get('/admin/cate');
  return res.data;
}

export async function getAllActiveCateAdmin() {
  const res = await api.get('/admin/cate/active');
  return res.data;
}

export async function getAllInactiveCateAdmin() {
  const res = await api.get('/admin/cate/inactive');
  return res.data;
}

export async function getCateByIdAdmin(id: string) {
  const res = await api.get(`/admin/cate/search/id?id=${id}`);

  return res.data;
}

export async function getCateByNameAdmin(name: string) {
  const res = await api.get(`/admin/cate/search/name?nameCate=${name}`);

  return res.data;
}

export async function updateCate(
  id: string,
  payload: {
    nameCate?: string;
    imageCate?: string;
    description?: string;
  }
) {
  const res = await api.put(`/admin/cate/update?id=${id}`, payload);
  return res.data;
}

export async function deleteCate(id: string) {
  const res = await api.put(`/admin/cate/delete?id=${id}`);
  return res.data;
}

export async function restoreCate(id: string) {
  const res = await api.put(`/admin/cate/restore?id=${id}`);
  return res.data;
}

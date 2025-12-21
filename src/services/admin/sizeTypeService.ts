import api from '@/lib/api';

export async function createSizeType(payload: {
  nameSizeType: string;
  description: string;
}) {
  const res = await api.post('/admin/sizetype/create', payload);
  return res.data;
}

export async function getAllSizeTypeAdmin() {
  const res = await api.get('/admin/sizetype');
  return res.data;
}

export async function getAllActiveSizeTypeAdmin() {
  const res = await api.get('/admin/sizetype/active');
  return res.data;
}

export async function getAllInactiveSizeTypeAdmin() {
  const res = await api.get('/admin/sizetype/inactive');
  return res.data;
}

export async function getSizeTypeByIdAdmin(id: string) {
  const res = await api.get(`/admin/sizetype/search/id?id=${id}`);

  return res.data;
}

export async function getSizeTypeByNameAdmin(name: string) {
  const res = await api.get(`/admin/sizetype/search/name?nameSizeType=${name}`);

  return res.data;
}

export async function updateSizeType(
  id: string,
  payload: {
    nameSizeType?: string;
    description?: string;
  }
) {
  const res = await api.put(`/admin/sizetype/update?id=${id}`, payload);
  return res.data;
}

export async function deleteSizeType(id: string) {
  const res = await api.put(`/admin/sizetype/delete?id=${id}`);
  return res.data;
}

export async function restoreSizeType(id: string) {
  const res = await api.put(`/admin/sizetype/restore?id=${id}`);
  return res.data;
}

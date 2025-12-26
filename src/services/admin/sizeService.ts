import api from '@/lib/api';

export async function createSize(payload: {
  nameSize: string;
  sizeTypeId: string;
  description: string;
}) {
  const res = await api.post('/admin/size/create', payload);
  return res.data;
}

export async function getAllSizeAdmin() {
  const res = await api.get('/admin/size');
  return res.data;
}

export async function getAllActiveSizeAdmin() {
  const res = await api.get('/admin/size/active');
  return res.data;
}

export async function getAllInactiveSizeAdmin() {
  const res = await api.get('/admin/size/inactive');
  return res.data;
}

export async function getSizeByIdAdmin(id: string) {
  const res = await api.get(`/admin/size/search/id?id=${id}`);

  return res.data;
}

export async function getSizeByNameAdmin(name: string) {
  const res = await api.get(`/admin/size/search/name?nameSize=${name}`);

  return res.data;
}

export async function updateSize(
  id: string,
  payload: {
    nameSize?: string;
    description?: string;
  }
) {
  const res = await api.put(`/admin/size/update?id=${id}`, payload);
  return res.data;
}

export async function deleteSize(id: string) {
  const res = await api.put(`/admin/size/delete?id=${id}`);
  return res.data;
}

export async function restoreSize(id: string) {
  const res = await api.put(`/admin/size/restore?id=${id}`);
  return res.data;
}

export async function getSizeBySizeTypeId(id: string) {
  const res = await api.get(`/admin/size/search/sizetypeid?sizeTypeId=${id}`);

  return res.data;
}

export async function getSizeBySizeTypeName(name: string) {
  const res = await api.get(
    `/admin/size/search/sizetypename?sizeTypeName=${name}`
  );

  return res.data;
}

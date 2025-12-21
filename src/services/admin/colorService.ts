import api from '@/lib/api';

export async function createColor(payload: {
  nameColor: string;
  description: string;
}) {
  const res = await api.post('/admin/color/create', payload);
  return res.data;
}

export async function getAllColorAdmin() {
  const res = await api.get('/admin/color');
  return res.data;
}

export async function getAllActiveColorAdmin() {
  const res = await api.get('/admin/color/active');
  return res.data;
}

export async function getAllInactiveColorAdmin() {
  const res = await api.get('/admin/color/inactive');
  return res.data;
}

export async function getColorByIdAdmin(id: string) {
  const res = await api.get(`/admin/color/search/id?id=${id}`);

  return res.data;
}

export async function getColorByNameAdmin(name: string) {
  const res = await api.get(`/admin/color/search/name?nameColor=${name}`);

  return res.data;
}

export async function updateColor(
  id: string,
  payload: {
    nameColor?: string;
    description?: string;
  }
) {
  const res = await api.put(`/admin/color/update?id=${id}`, payload);
  return res.data;
}

export async function deleteColor(id: string) {
  const res = await api.put(`/admin/color/delete?id=${id}`);
  return res.data;
}

export async function restoreColor(id: string) {
  const res = await api.put(`/admin/color/restore?id=${id}`);
  return res.data;
}

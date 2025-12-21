import api from '@/lib/api';

export async function createImportAdmin(payload: {
  supplierId: string;
  title: string;
  description: string;
}) {
  const res = await api.post('/admin/import/create', payload);
  return res.data;
}

export async function getAllImportAdmin() {
  const res = await api.get('/admin/import');
  return res.data;
}

export async function getImportByIdAdmin(id: string) {
  const res = await api.get(`/admin/import/search/id?id=${id}`);
  return res.data;
}

export async function getAllImportByTitleAdmin(title: string) {
  const res = await api.get(`/admin/import/search/title?title${title}`);
  return res.data;
}

export async function getAllImportByTimeRangeAdmin(
  startDate: string,
  endDate: string
) {
  const res = await api.get(
    `/admin/import/search/time-range?startDate=${startDate}&endDate=${endDate}`
  );
  return res.data;
}

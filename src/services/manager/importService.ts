import api from '@/lib/api';

export async function createImportManager(payload: {
  supplierId: string;
  title: string;
  description: string;
}) {
  const res = await api.post('/manager/import/create', payload);
  return res.data;
}

export async function getAllImportManager() {
  const res = await api.get('/manager/import');
  return res.data;
}

export async function getImportByIdManager(id: string) {
  const res = await api.get(`/manager/import/search/id?id=${id}`);
  return res.data;
}

export async function getAllImportByTitleManager(title: string) {
  const res = await api.get(`/manager/import/search/title?title${title}`);
  return res.data;
}

export async function getAllImportByTimeRangeManager(
  startDate: string,
  endDate: string
) {
  const res = await api.get(
    `/manager/import/search/time-range?startDate=${startDate}&endDate=${endDate}`
  );
  return res.data;
}

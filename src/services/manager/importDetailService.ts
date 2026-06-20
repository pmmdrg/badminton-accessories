import api from '@/lib/api';

export async function createImportDetailManager(payload: {
  importId: string;
  productItemId: string;
  nameProductItem: string;
  imgProductItem: string;
  quantity: number;
}) {
  const res = await api.post('/manager/import/import-detail/create', payload);

  return res.data;
}

export async function getAllImportDetailManager() {
  const res = await api.get('/manager/import/import-detail');

  return res.data;
}

export async function getImportDetailByIdManager(id: string) {
  const res = await api.get(`/manager/import/import-detail/search/id?id=${id}`);
  
  return res.data;
}

export async function getImportDetailByImportIdManager(id: string) {
  const res = await api.get(
    `/manager/import/import-detail/search/import-id?importId=${id}`,
  );

  return res.data;
}

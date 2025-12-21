import api from '@/lib/api';

export async function createImportDetailAdmin(payload: {
  importId: string;
  productItemId: string;
  colorId: string;
  sizeId: string;
  productItemName: string;
  imgProductItem: string;
  quantity: number;
}) {
  const res = await api.post('/admin/import/import-detail/create', payload);
  return res.data;
}

export async function getAllImportDetailAdmin() {
  const res = await api.get('/admin/import/import-detail');
  return res.data;
}

export async function getImportDetailByIdAdmin(id: string) {
  const res = await api.get(`/admin/import/import-detail/search/id?id=${id}`);
  return res.data;
}

export async function getImportDetailByImportIdAdmin(id: string) {
  const res = await api.get(
    `/admin/import/import-detail/search/import-id?importid${id}`
  );
  return res.data;
}

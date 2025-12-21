import api from '@/lib/api';

export async function createSupplier(payload: {
  nameSupplier: string;
  address: string;
}) {
  const res = await api.post('/admin/supplier/create', payload);
  return res.data;
}

export async function getAllSupplierAdmin() {
  const res = await api.get('/admin/supplier');
  return res.data;
}

export async function getAllActiveSupplierAdmin() {
  const res = await api.get('/admin/supplier/active');
  return res.data;
}

export async function getAllInactiveSupplierAdmin() {
  const res = await api.get('/admin/supplier/inactive');
  return res.data;
}

export async function getSupplierByIdAdmin(id: string) {
  const res = await api.get(`/admin/supplier/search/id?id=${id}`);

  return res.data;
}

export async function getSupplierByNameAdmin(name: string) {
  const res = await api.get(`/admin/supplier/search/name?nameSupplier=${name}`);

  return res.data;
}

export async function updateSupplier(
  id: string,
  payload: {
    nameSupplier?: string;
    address?: string;
  }
) {
  const res = await api.put(`/admin/supplier/update?id=${id}`, payload);
  return res.data;
}

export async function deleteSupplier(id: string) {
  const res = await api.put(`/admin/supplier/delete?id=${id}`);
  return res.data;
}

export async function restoreSupplier(id: string) {
  const res = await api.put(`/admin/supplier/restore?id=${id}`);
  return res.data;
}

import api from '@/lib/api';
import { STATUS } from '@/lib/constants';

export async function createDiscount(payload: {
  codePromotion: string;
  valuePromotion: string;
}) {
  const res = await api.post('/admin/promotion/create', payload);
  return res.data;
}

export async function getAllDiscountAdmin() {
  const res = await api.get('/admin/promotion');
  return res.data;
}

export async function getAllActiveDiscountAdmin() {
  const res = await api.get('/admin/promotion/active');
  return res.data;
}

export async function getAllInactiveDiscountAdmin() {
  const res = await api.get('/admin/promotion/inactive');
  return res.data;
}

export async function getDiscountByIdAdmin(id: string) {
  const res = await api.get(`/admin/promotion/search/id?id=${id}`);

  return res.data;
}

export async function getDiscountByNameAdmin(name: string) {
  const res = await api.get(
    `/admin/promotion/search/name?codePromotion=${name}`,
  );

  return res.data;
}

export async function updateDiscount(
  id: string,
  payload: {
    codePromotion?: string;
    valuePromotion?: string;
  },
) {
  const res = await api.put(`/admin/promotion/update?id=${id}`, payload);
  return res.data;
}

export async function deleteDiscount(id: string) {
  const res = await api.put(`/admin/promotion/delete?id=${id}`);
  return res.data;
}

export async function restoreDiscount(id: string) {
  const res = await api.put(`/admin/promotion/restore?id=${id}`);
  return res.data;
}

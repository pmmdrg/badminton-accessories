import api from '@/lib/api';

export async function createPayment(payload: { namePayment: string }) {
  const res = await api.post('/admin/payment/create', payload);
  return res.data;
}

export async function getAllPaymentAdmin() {
  const res = await api.get('/admin/payment');
  return res.data;
}

export async function getAllActivePaymentAdmin() {
  const res = await api.get('/admin/payment/active');
  return res.data;
}

export async function getAllInactivePaymentAdmin() {
  const res = await api.get('/admin/payment/inactive');
  return res.data;
}

export async function getPaymentByIdAdmin(id: string) {
  const res = await api.get(`/admin/payment/search/id?id=${id}`);

  return res.data;
}

export async function getPaymentByNameAdmin(name: string) {
  const res = await api.get(`/admin/payment/search/name?namePayment=${name}`);

  return res.data;
}

export async function updatePayment(
  id: string,
  payload: {
    namePayment?: string;
  }
) {
  const res = await api.put(`/admin/payment/update?id=${id}`, payload);
  return res.data;
}

export async function deletePayment(id: string) {
  const res = await api.put(`/admin/payment/delete?id=${id}`);
  return res.data;
}

export async function restorePayment(id: string) {
  const res = await api.put(`/admin/payment/restore?id=${id}`);
  return res.data;
}

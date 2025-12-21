import api from '@/lib/api';

export async function findAllPaymentActive() {
  const res = await api.get('/payment');

  return res.data;
}

export async function findPaymentById(id: string) {
  const res = await api.get(`/payment/id?id=${id}`);

  return res.data;
}

export async function findPaymentByName(name: string) {
  const res = await api.get(`/payment/name?namePayment=${name}`);

  return res.data;
}

export async function codPayment() {
  const res = await api.post('/payment/cod');

  return res.data;
}

export async function vnpayPayment(payload: { amount: string }) {
  const res = await api.post('/payment/vnpay', payload);

  return res.data;
}

export async function vnpayPaymentReturn() {
  const res = await api.get('/payment/vnpay');

  return res.data;
}

import api from '@/lib/api';

export async function getAllOrder() {
  const res = await api.get('/order/all-order');

  return res.data;
}

export async function getDetailOrder(id: string) {
  const res = await api.get(`/order/id?id=${id}`);

  return res.data;
}

export async function getAllOrderProcessing() {
  const res = await api.get('/order/all-order-processing');

  return res.data;
}

export async function getAllOrderShipped() {
  const res = await api.get('/order/all-order-shipped');

  return res.data;
}

export async function getAllOrderDelivered() {
  const res = await api.get('/order/all-order-delivered');

  return res.data;
}

export async function getAllOrderCompleted() {
  const res = await api.get('/order/all-order-completed');

  return res.data;
}

export async function getAllOrderCancelled() {
  const res = await api.get('/order/all-order-cancelled');

  return res.data;
}

export async function takeOrderCompleted(id: string) {
  const res = await api.post(`/order/take-order-completed?id=${id}`);

  return res.data;
}

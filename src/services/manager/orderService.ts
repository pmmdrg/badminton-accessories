import api from '@/lib/api';

export async function getAllOrderManager() {
  const res = await api.get('/manager/order/all-order');

  return res.data;
}

export async function getDetailOrder(id: string) {
  const res = await api.get(`/manager/order/detail-order?id=${id}`);

  return res.data;
}

export async function getAllOrderProcessing() {
  const res = await api.get('/manager/order/all-order-processing');

  return res.data;
}

export async function getAllOrderShipped() {
  const res = await api.get('/manager/order/all-order-shipped');

  return res.data;
}

export async function getAllOrderDelivered() {
  const res = await api.get('/manager/order/all-order-delivered');

  return res.data;
}

export async function getAllOrderCompleted() {
  const res = await api.get('/manager/order/all-order-completed');

  return res.data;
}

export async function getAllOrderCancelled() {
  const res = await api.get('/manager/order/all-order-cancelled');

  return res.data;
}

export async function getAllOrderCreatedByTime(
  startDate: string,
  endDate: string
) {
  const res = await api.get(
    `/manager/order/order-created/time?startDate=${startDate}&endDate=${endDate}`
  );

  return res.data;
}

export async function getAllOrderShippedByTime(
  startDate: string,
  endDate: string
) {
  const res = await api.get(
    `/manager/order/order-shipped/time?startDate=${startDate}&endDate=${endDate}`
  );

  return res.data;
}

export async function getAllOrderDeliveredByTime(
  startDate: string,
  endDate: string
) {
  const res = await api.get(
    `/manager/order/order-delivered/time?startDate=${startDate}&endDate=${endDate}`
  );

  return res.data;
}

export async function getAllOrderCompletedByTime(
  startDate: string,
  endDate: string
) {
  const res = await api.get(
    `/manager/order/order-completed/time?startDate=${startDate}&endDate=${endDate}`
  );

  return res.data;
}

export async function getAllOrderByNameUser(fullname: string) {
  const res = await api.get(
    `/manager/order/search-by-name?fullname=${fullname}`
  );

  return res.data;
}

export async function getAllOrderByUserId(id: string) {
  const res = await api.get(`/manager/order/search-by-userid?id=${id}`);

  return res.data;
}

export async function getOrderByOrderId(id: string) {
  const res = await api.get(`/manager/order/search-by-orderid?id=${id}`);

  return res.data;
}

export async function takeOrderDelivered(id: string) {
  const res = await api.post(`/manager/order/take-delivered?id=${id}`);

  return res.data;
}

import api from '@/lib/api';

export async function getCartByUserId() {
  const res = await api.get('/cart');

  return res.data;
}

export async function updateCartTotal() {
  const res = await api.put('cart/updatetotal');

  return res.data;
}

export async function calculateShippingFee(payload: {
  from_districtid: number;
  from_ward_code: string;
  to_districtid: number;
  to_ward_code: string;
}) {
  const res = await api.post('cart/calculate-shipping-fee', payload);

  return res.data;
}

export async function calculateTotalFee() {
  const res = await api.post('cart/calculate-total-cart');

  return res.data;
}

export async function untickCartItem(id: string) {
  const res = await api.put(`cart/items/untick?id=${id}`);

  return res.data;
}

export async function tickCartItem(id: string) {
  const res = await api.put(`cart/items/tick?id=${id}`);

  return res.data;
}

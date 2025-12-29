import api from '@/lib/api';
import { isAxiosError } from 'axios';

export async function getCartByUserId() {
  const res = await api.get('/cart');

  return res.data;
}

export async function updateCartTotal() {
  const res = await api.put('cart/updatetotal');

  return res.data;
}

export async function calculateShippingFee(payload: {
  from_district_id: number;
  from_ward_code: string;
  to_district_id: number;
  to_ward_code: string;
}) {
  const res = await api.post('cart/calculate-shipping-fee', payload);

  return res.data;
}

export async function calculateTotalFee(payload: {
  from_district_id: number;
  from_ward_code: string;
  to_district_id: number;
  to_ward_code: string;
  address: string;
  phonenumber: string;
}) {
  try {
    const res = await api.post('cart/calculate-total-cart', payload);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Lỗi chưa rõ');
    }

    throw err;
  }
}

export async function untickCartItem(id: string) {
  const res = await api.put(`cart/items/untick?id=${id}`);

  return res.data;
}

export async function tickCartItem(id: string) {
  const res = await api.put(`cart/items/tick?id=${id}`);

  return res.data;
}

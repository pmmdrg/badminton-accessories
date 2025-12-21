import api from '@/lib/api';

export async function getCartItemByUserId() {
  const res = await api.get('/cart/items');

  return res.data;
}

export async function insertCartItem(payload: {
  cartId: string;
  productItemId: string;
  nameProductItem: string;
  price: number;
  quantity: number;
  imageProductItem: string;
}) {
  const res = await api.post('cart/items/insert', payload);

  return res.data;
}

export async function updateCartItem(
  id: string,
  payload: { quantity: number }
) {
  const res = await api.put(`cart/items/update?id=${id}`, payload);

  return res.data;
}

export async function deleteCartItem(id: string) {
  const res = await api.delete(`cart/items/delete?id=${id}`);

  return res.data;
}

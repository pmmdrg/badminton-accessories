export interface CartItem {
  _id: string;
  cartId: string;
  productItemId: string;
  nameProductItem: string;
  status: 'tick' | 'untick';
  price: number;
  quantity: number;
  imageProductItem: string;
  totalPriceCartItem: number;
}

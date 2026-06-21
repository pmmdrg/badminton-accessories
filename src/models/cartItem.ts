export interface CartItem {
  id: string;
  cartId: string;
  productItemId: string;
  nameProductItem: string;
  status: 'tick' | 'untick';
  price: number;
  pricePromotion: number;
  quantity: number;
  imageProductItem: string;
  totalPriceCartItem: number;
}

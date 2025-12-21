import { CartItem } from './cartItem';

export interface Cart {
  _id: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  items: CartItem[];
}

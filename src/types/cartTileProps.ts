import { CartItem } from '@/models/cartItem';

export interface CartTileProps {
  cartItem: CartItem;
  onQuantityChange: (id: string, newQty: number) => void;
  onRemove: (id: string) => void;
}

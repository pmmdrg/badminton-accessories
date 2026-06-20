import { STATUS } from '@/lib/constants';
import { Product } from './product';
import { Size } from './size';
import { Color } from './color';

export interface ProductItem {
  id: string;
  productId: string;
  promotionId?: string;
  sizeId: string;
  colorId: string;
  nameProductItem: string;
  normalizedNameProductItem: string;
  imageProductItem?: string[];
  description?: string;
  quantity: number;
  price: number;
  pricePromotion?: number;
  status: STATUS;
  color: Color;
  size: Size;
  product: Product;
  updated_at: string;
  created_at: string;
}

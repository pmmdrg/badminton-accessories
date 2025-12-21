import { STATUS } from '@/lib/constants';

export interface ProductItem {
  _id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  nameProductItem: string;
  normalizedNameProductItem: string;
  imageProductItem?: string[];
  description?: string;
  quantity: number;
  price: number;
  status: STATUS;
  created_at: string;
}

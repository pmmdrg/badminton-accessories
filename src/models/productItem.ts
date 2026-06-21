import { STATUS } from '@/lib/constants';

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
  pricePromotion: number | null;
  status: STATUS;
  updated_at: string;
  created_at: string;
}

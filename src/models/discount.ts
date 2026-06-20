import { STATUS } from '@/lib/constants';
import { ProductItem } from './productItem';

export interface Discount {
  id: string;
  codePromotion: string;
  valuePromotion: number;
  status: STATUS;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  restored_at: string;
  productItems: ProductItem[];
}

import { STATUS } from '@/lib/constants';

export interface Product {
  id: string;
  brandId: string;
  cateId: string;
  sizeTypeId: string;
  nameProduct: string;
  imageProduct?: string;
  description: string;
  status: STATUS;
  created_at: string;
}

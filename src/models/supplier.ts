import { STATUS } from '@/lib/constants';

export interface Supplier {
  _id: string;
  nameSupplier: string;
  address: string;
  created_at: string;
  status: STATUS;
}

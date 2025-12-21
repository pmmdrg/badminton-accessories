import { STATUS } from '@/lib/constants';

export interface Address {
  _id: string;
  userId: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  status: STATUS;
  created_at: string;
}

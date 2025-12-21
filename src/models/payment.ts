import { STATUS } from '@/lib/constants';

export interface Payment {
  _id: string;
  namePayment: string;
  status: STATUS;
  created_at: string;
}

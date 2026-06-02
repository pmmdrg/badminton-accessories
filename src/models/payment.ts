import { STATUS } from '@/lib/constants';

export interface Payment {
  id: string;
  namePayment: string;
  status: STATUS;
  created_at: string;
}

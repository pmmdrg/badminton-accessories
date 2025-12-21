import { STATUS } from '@/lib/constants';

export interface Color {
  _id: string;
  nameColor: string;
  description: string;
  created_at: string;
  status: STATUS;
}

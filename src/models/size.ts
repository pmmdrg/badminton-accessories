import { STATUS } from '@/lib/constants';

export interface Size {
  _id: string;
  sizeTypeId: string;
  nameSize: string;
  description: string;
  created_at: string;
  status: STATUS;
}

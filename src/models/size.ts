import { STATUS } from '@/lib/constants';

export interface Size {
  id: string;
  sizeTypeId: string;
  nameSize: string;
  description: string;
  created_at: string;
  status: STATUS;
}

import { STATUS } from '@/lib/constants';

export interface Size {
  id: string;
  sizeTypeId: string;
  nameSize: string;
  nameSizeType: string;
  created_at: string;
  status: STATUS;
}

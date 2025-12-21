import { STATUS } from '@/lib/constants';

export interface Cate {
  _id: string;
  nameCate: string;
  imageCate?: string;
  description?: string;
  status: STATUS;
  created_at: string;
}

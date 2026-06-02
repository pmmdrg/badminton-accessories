import { STATUS } from '@/lib/constants';

export interface Brand {
  id: string;
  nameBrand: string;
  imageBrand?: string;
  description?: string;
  country?: string;
  status: STATUS;
  created_at: string;
}

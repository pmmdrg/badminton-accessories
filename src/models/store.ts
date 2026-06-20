import { STATUS } from '@/lib/constants';

export interface Store {
  activated_at: string;
  created_at: string;
  from_address: string;
  from_district: number;
  from_province: number;
  from_ward: string;
  id: string;
  inactivated_at: string;
  nameStore: string;
  status: STATUS;
  updated_at: string | null;
}

import { ROLE, STATUS } from '@/lib/constants';

export interface User {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  created_at: string;
  status: STATUS;
  role: ROLE;
  bio: string;
  avatar: string;
}

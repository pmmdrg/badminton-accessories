import { ROLE } from '@/lib/constants';

export interface SendbirdUser {
  user_id: string;
  nickname: string;
  role: ROLE;
}

export interface Message {
  user: SendbirdUser;
  message: string;
  created_at: string;
}

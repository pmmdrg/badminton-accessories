import { SendbirdUser } from './message';

export interface Channel {
  channel_url: string;
  name: string;
  last_message: {
    user: SendbirdUser;
    message: string;
    created_at: string;
    unread_message_count: number;
  };
}

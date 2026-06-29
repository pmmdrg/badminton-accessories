import {
  getAllChannelsAdmin,
  getAllMessagesByChannelAdmin,
} from '@/services/admin/chatService';
import { useQuery } from '@tanstack/react-query';

export function useChatAdmin(channelUrl?: string) {
  const getAllChannels = useQuery({
    queryKey: ['admin-channels'],
    queryFn: getAllChannelsAdmin,
  });

  const getMessageByChannel = useQuery({
    queryKey: ['channel_url', channelUrl],
    queryFn: () => getAllMessagesByChannelAdmin(channelUrl || ''),
    enabled: !!channelUrl,
  });

  return { getAllChannels, getMessageByChannel };
}

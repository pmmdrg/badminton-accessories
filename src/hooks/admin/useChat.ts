import {
  getAllChatAdmin,
  getMessageByIdAdmin,
} from '@/services/admin/chatService';
import { useQuery } from '@tanstack/react-query';

export function useChatAdmin(id?: string) {
  const getAll = useQuery({
    queryKey: ['admin-chats'],
    queryFn: getAllChatAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getMessageByIdAdmin(id || ''),
    enabled: !!id,
  });

  return { getAll, getById };
}

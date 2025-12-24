'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllActiveUser,
  getAllUserAdmin,
  getAllInactiveUser,
  restoreUser,
  lockUser,
} from '@/services/admin/userService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useUserAdmin() {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUserAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-users'],
    queryFn: getAllActiveUser,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-users'],
    queryFn: getAllInactiveUser,
  });

  const lock = useMutation({
    mutationFn: (id: string) => lockUser(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khoá người dùng',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreUser(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục người dùng',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
    },
  });

  return {
    getAll,
    getAllActive,
    getAllInactive,
    lock,
    restore,
  };
}

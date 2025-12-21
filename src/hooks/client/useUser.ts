'use client';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { updateProfile, updateUser } from '@/services/client/profileService';

export function useUserClient() {
  const { addToast } = useToast();

  const editProfile = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa hồ sơ',
      });
    },
  });

  const editUser = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa người dùng',
      });
    },
  });

  return {
    editProfile,
    editUser,
  };
}

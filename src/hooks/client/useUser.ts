'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { getUserInfo, updateUser } from '@/services/client/profileService';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useUserClient() {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const getInfo = useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
  });

  const editUser = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa hồ sơ',
      });

      queryClient.invalidateQueries({ queryKey: ['user-info'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa hồ sơ, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  return {
    getInfo,
    editUser,
  };
}

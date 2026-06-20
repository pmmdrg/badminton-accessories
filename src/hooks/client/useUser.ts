'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { getUserInfo, updateUser } from '@/services/client/profileService';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useUserClient() {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const getInfo = useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
  });

  const editUser = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa hồ sơ',
      });

      queryClient.invalidateQueries({ queryKey: ['user-info'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa hồ sơ, vui lòng đợi',
      });

      return { toastId };
    },
    onError: (err: AxiosError<ApiError>, _, ctx) => {
      updateToast(ctx!.toastId, {
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

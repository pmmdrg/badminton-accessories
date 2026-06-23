'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/providers/toastProvider';
import { TOAST_TYPE } from '@/lib/constants';
import {
  getUserInfo,
  updateAddressUser,
  updateUser,
} from '@/services/client/profileService';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';
import useAuth from '../useAuth';

export function useUserClient() {
  const { addToast, updateToast } = useToast();
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const getInfo = useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
    enabled: !!(userId && userId !== ''),
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

  const editAddress = useMutation({
    mutationFn: updateAddressUser,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa địa chỉ',
      });

      queryClient.invalidateQueries({ queryKey: ['user-info'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa địa chỉ, vui lòng đợi',
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
    editAddress,
  };
}

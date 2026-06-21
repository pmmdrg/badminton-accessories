'use client';
import { useMutation } from '@tanstack/react-query';
import { getImageKitToken } from '@/services/uploadService';
import { useToast } from '@/providers/toastProvider';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useUpload() {
  const { addToast, updateToast } = useToast();

  const getIKToken = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append('file', file);

      const res = await getImageKitToken(formData);

      return res;
    },
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Bắt đầu tải ảnh',
      });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chuẩn bị tải ảnh',
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

  return { getIKToken };
}

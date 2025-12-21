'use client';
import { useMutation } from '@tanstack/react-query';
import { getImageKitToken } from '@/services/uploadService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useUpload() {
  const { addToast } = useToast();

  const getIKToken = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append('file', file);

      const res = await getImageKitToken(formData);

      return res;
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chuẩn bị tải ảnh',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  return { getIKToken };
}

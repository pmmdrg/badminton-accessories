'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createImportDetailAdmin,
  getAllImportDetailAdmin,
  getImportDetailByIdAdmin,
  getImportDetailByImportIdAdmin,
} from '@/services/admin/importDetailService';
import { useToast } from '@/components/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useImportDetailAdmin(id?: string, importId?: string) {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createImportDetailAdmin,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo hàng nhập mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-import-details'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo hàng nhập mới, vui lòng đợi',
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

  const getAll = useQuery({
    queryKey: ['admin-import-details'],
    queryFn: getAllImportDetailAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getImportDetailByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByImportId = useQuery({
    queryKey: ['import-id', importId],
    queryFn: () => getImportDetailByImportIdAdmin(importId || ''),
    enabled: !!importId,
  });

  return {
    add,
    getAll,
    getById,
    getByImportId,
  };
}

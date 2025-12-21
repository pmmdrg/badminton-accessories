'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createImportDetailAdmin,
  getAllImportDetailAdmin,
  getImportDetailByIdAdmin,
  getImportDetailByImportIdAdmin,
} from '@/services/admin/importDetailService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useImportDetailAdmin(id?: string, importId?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createImportDetailAdmin,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo hàng nhập mới',
      });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo hàng nhập mới, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
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
    queryKey: ['importid', importId],
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

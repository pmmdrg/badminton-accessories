'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createImportDetailManager,
  getAllImportDetailManager,
  getImportDetailByIdManager,
  getImportDetailByImportIdManager,
} from '@/services/manager/importDetailService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useImportDetailManager(id?: string, importId?: string) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createImportDetailManager,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo hàng nhập mới',
      });

      queryClient.invalidateQueries({ queryKey: ['manager-import-details'] });
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
    queryKey: ['manager-import-details'],
    queryFn: getAllImportDetailManager,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getImportDetailByIdManager(id || ''),
    enabled: !!id,
  });

  const getByImportId = useQuery({
    queryKey: ['importid', importId],
    queryFn: () => getImportDetailByImportIdManager(importId || ''),
    enabled: !!importId,
  });

  return {
    add,
    getAll,
    getById,
    getByImportId,
  };
}

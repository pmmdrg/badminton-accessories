'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createImportManager,
  getAllImportByTimeRangeManager,
  getAllImportByTitleManager,
  getAllImportManager,
  getImportByIdManager,
} from '@/services/manager/importService';
import { useToast } from '@/providers/toastProvider';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useImportManager(
  id?: string,
  title?: string,
  startDate?: string,
  endDate?: string,
) {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createImportManager,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo lô nhập hàng mới',
      });

      queryClient.invalidateQueries({ queryKey: ['manager-import'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo lô hàng mới, vui lòng đợi',
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
    queryKey: ['manager-import'],
    queryFn: getAllImportManager,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getImportByIdManager(id || ''),
    enabled: !!id,
  });

  const getByTitle = useQuery({
    queryKey: ['title', title],
    queryFn: () => getAllImportByTitleManager(title || ''),
    enabled: !!title,
  });

  const getByTimeRange = useQuery({
    queryKey: ['time-range', startDate, endDate],
    queryFn: () =>
      getAllImportByTimeRangeManager(startDate || '', endDate || ''),
    enabled: !!startDate && !!endDate,
  });

  return {
    add,
    getAll,
    getById,
    getByTitle,
    getByTimeRange,
  };
}

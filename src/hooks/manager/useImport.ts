'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createImportManager,
  getAllImportByTimeRangeManager,
  getAllImportByTitleManager,
  getAllImportManager,
  getImportByIdManager,
} from '@/services/manager/importService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useImportManager(
  id?: string,
  title?: string,
  startDate?: string,
  endDate?: string
) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createImportManager,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo lô nhập hàng mới',
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

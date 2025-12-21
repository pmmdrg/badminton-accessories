'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createImportAdmin,
  getAllImportAdmin,
  getAllImportByTimeRangeAdmin,
  getAllImportByTitleAdmin,
  getImportByIdAdmin,
} from '@/services/admin/importService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useImportAdmin(
  id?: string,
  title?: string,
  startDate?: string,
  endDate?: string
) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createImportAdmin,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo lô nhập hàng mới',
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-import'],
    queryFn: getAllImportAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getImportByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByTitle = useQuery({
    queryKey: ['title', title],
    queryFn: () => getAllImportByTitleAdmin(title || ''),
    enabled: !!title,
  });

  const getByTimeRange = useQuery({
    queryKey: ['time-range', startDate, endDate],
    queryFn: () => getAllImportByTimeRangeAdmin(startDate || '', endDate || ''),
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

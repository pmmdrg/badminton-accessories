'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createImportDetailManager,
  getAllImportDetailManager,
  getImportDetailByIdManager,
  getImportDetailByImportIdManager,
} from '@/services/manager/importDetailService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useImportDetailManager(id?: string, importId?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createImportDetailManager,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo hàng nhập mới',
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

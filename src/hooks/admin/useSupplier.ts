'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSupplier,
  deleteSupplier,
  getAllActiveSupplierAdmin,
  getAllSupplierAdmin,
  getAllInactiveSupplierAdmin,
  getSupplierByIdAdmin,
  getSupplierByNameAdmin,
  restoreSupplier,
  updateSupplier,
} from '@/services/admin/supplierService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useSupplierAdmin(id?: string, name?: string) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo nhà cung cấp mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo nhà cung cấp mới, vui lòng đợi',
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
    queryKey: ['admin-suppliers'],
    queryFn: getAllSupplierAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-suppliers'],
    queryFn: getAllActiveSupplierAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-suppliers'],
    queryFn: getAllInactiveSupplierAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getSupplierByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameSupplier', name],
    queryFn: () => getSupplierByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameSupplier?: string;
        address?: string;
      };
    }) => updateSupplier(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa nhà cung cấp',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa nhà cung cấp, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá nhà cung cấp',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreSupplier(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục nhà cung cấp',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
    },
  });

  return {
    add,
    getAll,
    getAllActive,
    getAllInactive,
    getById,
    getByName,
    edit,
    remove,
    restore,
  };
}

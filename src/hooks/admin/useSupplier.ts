'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
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

export function useSupplierAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo nhà cung cấp mới',
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
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá nhà cung cấp',
      });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreSupplier(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục nhà cung cấp',
      });
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

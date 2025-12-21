'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPayment,
  deletePayment,
  getAllActivePaymentAdmin,
  getAllPaymentAdmin,
  getAllInactivePaymentAdmin,
  getPaymentByIdAdmin,
  getPaymentByNameAdmin,
  restorePayment,
  updatePayment,
} from '@/services/admin/paymentService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function usePaymentAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo phương thức thanh toán mới',
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-payments'],
    queryFn: getAllPaymentAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-payments'],
    queryFn: getAllActivePaymentAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-payments'],
    queryFn: getAllInactivePaymentAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getPaymentByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['namePayment', name],
    queryFn: () => getPaymentByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        namePayment?: string;
      };
    }) => updatePayment(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa phương thức thanh toán',
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deletePayment(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá phương thức thanh toán',
      });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restorePayment(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục phương thức thanh toán',
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

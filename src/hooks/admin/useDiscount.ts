'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDiscount,
  deleteDiscount,
  getAllActiveDiscountAdmin,
  getAllDiscountAdmin,
  getAllInactiveDiscountAdmin,
  getDiscountByIdAdmin,
  getDiscountByNameAdmin,
  restoreDiscount,
  updateDiscount,
} from '@/services/admin/discountService';
import { useToast } from '@/components/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useDiscountAdmin(id?: string, name?: string) {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createDiscount,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo mã giảm giá mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-discounts'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo mã giảm giá mới, vui lòng đợi',
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
    queryKey: ['admin-discounts'],
    queryFn: getAllDiscountAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-discounts'],
    queryFn: getAllActiveDiscountAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-discounts'],
    queryFn: getAllInactiveDiscountAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getDiscountByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameDiscount', name],
    queryFn: () => getDiscountByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        codePromotion?: string;
        valuePromotion?: string;
      };
    }) => updateDiscount(id, payload),
    onSuccess: (_, variables, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa mã giảm giá',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-discounts'] });
      queryClient.invalidateQueries({ queryKey: ['id', variables.id] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa mã giảm giá, vui lòng đợi',
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

  const remove = useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá mã giảm giá',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-discounts'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreDiscount(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục mã giảm giá',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-discounts'] });
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

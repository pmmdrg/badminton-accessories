'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProductItem,
  deleteProductItem,
  getAllActiveProductItemAdmin,
  getAllProductItemAdmin,
  getAllInactiveProductItemAdmin,
  getProductItemByIdAdmin,
  getProductItemByNameAdmin,
  restoreProductItem,
  updateProductItem,
  addDiscountToProductItem,
  deleteDiscountFromProductItem,
} from '@/services/admin/productItemService';
import { useToast } from '@/providers/toastProvider';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useProductItemAdmin(id?: string, name?: string) {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createProductItem,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo mặt hàng sản phẩm mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product-items'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo mặt hàng sản phẩm mới, vui lòng đợi',
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
    queryKey: ['admin-product-items'],
    queryFn: getAllProductItemAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-product-items'],
    queryFn: getAllActiveProductItemAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-product-items'],
    queryFn: getAllInactiveProductItemAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getProductItemByIdAdmin(id!),
    enabled: id !== undefined && id !== '',
  });

  const getByName = useQuery({
    queryKey: ['nameProductItem', name],
    queryFn: () => getProductItemByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameProductItem?: string;
        imageProductItem?: string[];
        description?: string;
        price?: number;
        quantity?: number;
      };
    }) => updateProductItem(id, payload),
    onSuccess: (_, variables, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa mặt hàng sản phẩm',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product-items'] });
      queryClient.invalidateQueries({
        queryKey: ['id', variables.id],
      });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa mặt hàng sản phẩm, vui lòng đợi',
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
    mutationFn: (id: string) => deleteProductItem(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá mặt hàng sản phẩm',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product-items'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreProductItem(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục mặt hàng sản phẩm',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product-items'] });
    },
  });

  const addDiscount = useMutation({
    mutationFn: ({ id, discountId }: { id: string; discountId: string }) =>
      addDiscountToProductItem(id, discountId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-product-items'] });
      queryClient.invalidateQueries({ queryKey: ['id', variables.id] });
    },
  });

  const removeDiscount = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDiscountFromProductItem(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-product-items'] });
      queryClient.invalidateQueries({ queryKey: ['id', variables.id] });
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
    addDiscount,
    removeDiscount,
  };
}

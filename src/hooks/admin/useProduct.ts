'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  getAllActiveProductAdmin,
  getAllProductAdmin,
  getAllInactiveProductAdmin,
  getProductByIdAdmin,
  getProductByNameAdmin,
  restoreProduct,
  updateProduct,
} from '@/services/admin/productService';
import { useToast } from '@/components/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useProductAdmin(id?: string, name?: string) {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createProduct,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo sản phẩm mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo sản phẩm mới, vui lòng đợi',
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
    queryKey: ['admin-product'],
    queryFn: getAllProductAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-product'],
    queryFn: getAllActiveProductAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-product'],
    queryFn: getAllInactiveProductAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getProductByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProduct', name],
    queryFn: () => getProductByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameProduct?: string;
        imageProduct?: string;
        description?: string;
      };
    }) => updateProduct(id, payload),
    onSuccess: (_, variables, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa sản phẩm',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product'] });
      queryClient.invalidateQueries({ queryKey: ['id', variables.id] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa sản phẩm, vui lòng đợi',
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
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá sản phẩm',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreProduct(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục sản phẩm',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-product'] });
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
